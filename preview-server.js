const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 4173);
const root = __dirname;
const imageProxyPath = "/__assetflow/image-proxy";
const maxProxyImageBytes = 7 * 1024 * 1024;
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(payload));
}

function isPrivatePreviewTarget(targetUrl) {
  const hostname = targetUrl.hostname.toLowerCase();
  return hostname === "localhost"
    || hostname === "::1"
    || hostname === "0.0.0.0"
    || /^127\./.test(hostname)
    || /^10\./.test(hostname)
    || /^192\.168\./.test(hostname)
    || /^169\.254\./.test(hostname)
    || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname);
}

async function readImageResponse(upstream) {
  const contentType = String(upstream.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  if (!contentType.startsWith("image/")) {
    throw new Error("远程资源不是图片");
  }

  const contentLength = Number(upstream.headers.get("content-length") || 0);
  if (contentLength > maxProxyImageBytes) {
    throw new Error("图片超过 7 MB，无法用于千问视觉输入");
  }

  const reader = upstream.body?.getReader();
  if (!reader) {
    throw new Error("远程图片没有可读取内容");
  }

  const chunks = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > maxProxyImageBytes) {
      await reader.cancel();
      throw new Error("图片超过 7 MB，无法用于千问视觉输入");
    }
    chunks.push(Buffer.from(value));
  }

  return {
    contentType,
    body: Buffer.concat(chunks, totalBytes),
  };
}

async function proxyPreviewImage(requestUrl, req, res) {
  const source = requestUrl.searchParams.get("url") || "";
  let targetUrl;
  try {
    targetUrl = new URL(source);
  } catch {
    sendJson(res, 400, { ok: false, error: "图片 URL 无效" });
    return;
  }

  if (!["http:", "https:"].includes(targetUrl.protocol) || isPrivatePreviewTarget(targetUrl)) {
    sendJson(res, 403, { ok: false, error: "不允许代理该图片地址" });
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  try {
    const upstream = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": "AssetFlow-Local-Preview/1.0",
      },
    });
    if (!upstream.ok) {
      throw new Error(`远程图片返回 HTTP ${upstream.status}`);
    }

    const finalUrl = new URL(upstream.url);
    if (isPrivatePreviewTarget(finalUrl)) {
      throw new Error("远程图片重定向到了不允许的地址");
    }

    const image = await readImageResponse(upstream);
    res.writeHead(200, {
      "Content-Type": image.contentType,
      "Content-Length": image.body.length,
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    res.end(image.body);
  } catch (error) {
    const message = error?.name === "AbortError"
      ? "读取远程图片超时"
      : (error?.message || "读取远程图片失败");
    sendJson(res, 502, { ok: false, error: message });
  } finally {
    clearTimeout(timeoutId);
  }
}

http
  .createServer(async (req, res) => {
    const requestUrl = new URL(req.url, `http://127.0.0.1:${port}`);

    if (req.method !== "GET" && req.method !== "HEAD") {
      sendJson(res, 405, { ok: false, error: "Method not allowed" });
      return;
    }

    if (requestUrl.pathname === imageProxyPath) {
      await proxyPreviewImage(requestUrl, req, res);
      return;
    }

    const requestPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
    const safePath = decodeURIComponent(requestPath).replace(/^\/+/, "");
    const fullPath = path.resolve(root, safePath);

    if (fullPath !== root && !fullPath.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(fullPath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": mimeTypes[path.extname(fullPath).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store, max-age=0",
      });
      res.end(data);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`AssetFlow preview: http://127.0.0.1:${port}/popup.html`);
  });
