const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

const port = Number(process.env.PORT || 4173);
const root = __dirname;
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
const outputDir = path.join(root, "Output");

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });
  res.end(JSON.stringify(payload));
}

function safeOutputName(name, fallback = "generated-image") {
  const ext = path.extname(name || "").toLowerCase();
  const allowedExt = [".png", ".jpg", ".jpeg", ".webp"].includes(ext) ? ext : ".png";
  const base = path.basename(name || fallback, ext)
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || fallback;
  return `${base}${allowedExt}`;
}

function bodyFromRequest(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
      if (Buffer.concat(chunks).length > 50 * 1024 * 1024) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function imageBufferFromPayload(payload) {
  const source = payload.dataUrl || payload.url || "";
  const dataUrlMatch = source.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (dataUrlMatch) {
    return {
      buffer: Buffer.from(dataUrlMatch[2], "base64"),
      ext: dataUrlMatch[1].includes("jpeg") ? ".jpg" : `.${dataUrlMatch[1].split("/")[1].replace("svg+xml", "svg")}`,
    };
  }

  if (!/^https?:\/\//i.test(source)) {
    throw new Error("Only data URL or http(s) image URL is supported.");
  }

  const response = await fetch(source);
  if (!response.ok) {
    throw new Error(`Image download failed: ${response.status}`);
  }
  const contentType = response.headers.get("content-type") || "";
  const ext = contentType.includes("jpeg")
    ? ".jpg"
    : contentType.includes("webp")
      ? ".webp"
      : ".png";
  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    ext,
  };
}

http
  .createServer(async (req, res) => {
    const requestUrl = new URL(req.url, `http://127.0.0.1:${port}`);

    if (req.method === "OPTIONS") {
      sendJson(res, 204, {});
      return;
    }

    if (req.method === "POST" && requestUrl.pathname === "/api/save-output") {
      try {
        const payload = JSON.parse(await bodyFromRequest(req) || "{}");
        const image = await imageBufferFromPayload(payload);
        await fsp.mkdir(outputDir, { recursive: true });
        const filename = safeOutputName(payload.filename, `generated-${Date.now()}${image.ext}`);
        const finalName = filename.endsWith(image.ext) ? filename : filename.replace(/\.[^.]+$/, image.ext);
        const fullPath = path.join(outputDir, finalName);
        await fsp.writeFile(fullPath, image.buffer);
        sendJson(res, 200, {
          ok: true,
          filename: finalName,
          url: `/Output/${encodeURIComponent(finalName)}`,
          path: fullPath,
        });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error.message || "Save failed" });
      }
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      sendJson(res, 405, { ok: false, error: "Method not allowed" });
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
    console.log(`Image Prompt Builder preview: http://127.0.0.1:${port}/popup.html`);
  });
