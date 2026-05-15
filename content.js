(() => {
  if (window.__imageSparkContentLoaded) return;
  window.__imageSparkContentLoaded = true;

  const MAX_IMAGES = 80;
  const MAX_TEXT = 180;
  const VIEWER_ID = "image-spark-page-viewer";
  let lastContextImage = null;
  let lastContextPoint = null;
  let viewerState = {
    items: [],
    activeIndex: 0,
    zoom: 1,
    imageExpanded: false,
    eagle: {
      mode: "protocol",
      baseUrl: "http://localhost:41595"
    }
  };

  function cleanText(value, max = MAX_TEXT) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, max);
  }

  function absoluteUrl(value) {
    try {
      return new URL(value, location.href).href;
    } catch {
      return "";
    }
  }

  function getBackgroundImageUrl(element) {
    const style = getComputedStyle(element);
    const bg = style.backgroundImage || "";
    const match = bg.match(/url\((['"]?)(.*?)\1\)/);
    return match ? absoluteUrl(match[2]) : "";
  }

  function imageFromContextTarget(event) {
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    const candidates = path.length ? path : [event.target];

    for (const node of candidates) {
      if (!(node instanceof Element)) continue;

      const image = node.closest?.("img");
      if (image) {
        const rect = image.getBoundingClientRect();
        const src = absoluteUrl(image.currentSrc || image.src || image.getAttribute("data-src") || "");
        if (src) {
          return {
            src,
            name: cleanText(image.alt || image.title || "网页右键图片", 80),
            width: Math.round(rect.width || image.naturalWidth || 0),
            height: Math.round(rect.height || image.naturalHeight || 0),
            pageUrl: location.href
          };
        }
      }

      const backgroundUrl = getBackgroundImageUrl(node);
      if (backgroundUrl) {
        const rect = node.getBoundingClientRect();
        return {
          src: backgroundUrl,
          name: cleanText(node.getAttribute("aria-label") || node.textContent || "网页右键图片", 80),
          width: Math.round(rect.width || 0),
          height: Math.round(rect.height || 0),
          pageUrl: location.href
        };
      }
    }

    return null;
  }

  function firstSrcFromSrcset(srcset) {
    return String(srcset || "")
      .split(",")
      .map((part) => part.trim().split(/\s+/)[0])
      .find(Boolean) || "";
  }

  function contextImageSrcFromElement(element) {
    if (!(element instanceof Element)) return "";

    if (element instanceof HTMLImageElement) {
      return absoluteUrl(
        element.currentSrc ||
        element.src ||
        element.getAttribute("data-src") ||
        element.getAttribute("data-lazy-src") ||
        element.getAttribute("data-original") ||
        element.getAttribute("data-pin-media") ||
        firstSrcFromSrcset(element.getAttribute("srcset"))
      );
    }

    if (element.tagName === "SOURCE") {
      return absoluteUrl(element.getAttribute("src") || firstSrcFromSrcset(element.getAttribute("srcset")));
    }

    return absoluteUrl(
      element.getAttribute("data-src") ||
      element.getAttribute("data-lazy-src") ||
      element.getAttribute("data-original") ||
      element.getAttribute("data-pin-media") ||
      element.getAttribute("content")
    );
  }

  function contextImageItemFromElement(element) {
    if (!(element instanceof Element)) return null;

    const image = element instanceof HTMLImageElement
      ? element
      : element.tagName === "SOURCE"
        ? element.closest("picture")?.querySelector("img") || element
        : null;
    if (!image) return null;

    const src = contextImageSrcFromElement(image);
    if (!src) return null;

    const rect = image.getBoundingClientRect?.() || { width: 0, height: 0 };
    const naturalWidth = image instanceof HTMLImageElement ? image.naturalWidth : 0;
    const naturalHeight = image instanceof HTMLImageElement ? image.naturalHeight : 0;
    return {
      src,
      name: cleanText(
        image.getAttribute("alt") ||
        image.getAttribute("title") ||
        image.getAttribute("aria-label") ||
        document.title ||
        "\u7f51\u9875\u53f3\u952e\u56fe\u7247",
        80
      ),
      width: Math.round(rect.width || naturalWidth || 0),
      height: Math.round(rect.height || naturalHeight || 0),
      pageUrl: location.href
    };
  }

  function contextImageScore(item) {
    return Math.max(1, Number(item?.width) || 0) * Math.max(1, Number(item?.height) || 0);
  }

  function bestDescendantContextImage(scope) {
    if (!(scope instanceof Element)) return null;

    const items = [...scope.querySelectorAll("img, picture source")]
      .map(contextImageItemFromElement)
      .filter((item) => item?.src && item.width >= 24 && item.height >= 24);
    return items.sort((a, b) => contextImageScore(b) - contextImageScore(a))[0] || null;
  }

  function nearbyContextImageScope(element) {
    if (!(element instanceof Element)) return null;

    const preferred = element.closest("a, article, figure, [role='listitem'], [data-test-id], [data-grid-item], [aria-label]");
    if (preferred && preferred !== document.body && preferred !== document.documentElement) {
      return preferred;
    }

    let node = element;
    for (let depth = 0; depth < 6 && node?.parentElement; depth += 1) {
      if (node.querySelector?.("img, picture source")) return node;
      node = node.parentElement;
      if (node === document.body || node === document.documentElement) break;
    }
    return element;
  }

  function contextBackgroundImageItemFromElement(element) {
    if (!(element instanceof Element)) return null;
    const src = getBackgroundImageUrl(element);
    if (!src) return null;

    const rect = element.getBoundingClientRect();
    return {
      src,
      name: cleanText(element.getAttribute("aria-label") || element.textContent || document.title || "\u7f51\u9875\u53f3\u952e\u56fe\u7247", 80),
      width: Math.round(rect.width || 0),
      height: Math.round(rect.height || 0),
      pageUrl: location.href
    };
  }

  function contextImageFromElementCandidate(element) {
    if (!(element instanceof Element)) return null;

    const directImage = element.matches("img, picture source")
      ? contextImageItemFromElement(element)
      : null;
    if (directImage?.src) return directImage;

    const closestImageItem = contextImageItemFromElement(element.closest?.("img"));
    if (closestImageItem?.src) return closestImageItem;

    const scopedImage = bestDescendantContextImage(nearbyContextImageScope(element));
    if (scopedImage?.src) return scopedImage;

    return contextBackgroundImageItemFromElement(element);
  }

  function enhancedImageFromContextTarget(event) {
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    const pointElement = document.elementFromPoint(event.clientX, event.clientY);
    const candidates = [...new Set([pointElement, event.target, ...path].filter(Boolean))];

    for (const node of candidates) {
      if (!(node instanceof Element)) continue;
      const item = contextImageFromElementCandidate(node);
      if (item?.src) return item;
    }

    return contextImageFromElementCandidate(pointElement);
  }

  function nearbyText(element) {
    const candidates = [];
    const figure = element.closest("figure");
    const card = element.closest("article, section, li, [class*='card'], [class*='item'], [role='listitem']");

    if (figure) {
      candidates.push(cleanText(figure.querySelector("figcaption")?.innerText));
      candidates.push(cleanText(figure.innerText));
    }

    if (card && card !== figure) {
      candidates.push(cleanText(card.innerText));
    }

    candidates.push(cleanText(element.parentElement?.innerText));
    candidates.push(cleanText(document.title, 120));

    return [...new Set(candidates.filter(Boolean))].slice(0, 3).join(" | ");
  }

  function inferType(src, width, height, text) {
    const lower = `${src} ${text}`.toLowerCase();
    if (/logo|brand|favicon|icon/.test(lower)) return "logo/icon";
    if (/avatar|profile|portrait|headshot/.test(lower)) return "portrait";
    if (/product|sku|shop|store|buy|cart/.test(lower)) return "product";
    if (/banner|hero|cover/.test(lower)) return "hero/banner";
    if (width > height * 2) return "wide banner";
    if (height > width * 1.8) return "vertical image";
    return "general image";
  }

  function buildPrompt(item) {
    const parts = [];
    if (item.alt) parts.push(item.alt);
    if (item.title && item.title !== item.alt) parts.push(item.title);
    if (item.context) parts.push(`context: ${item.context}`);

    const subject = parts.join(", ") || "webpage image";
    const sizeHint = item.width && item.height ? `${item.width}x${item.height}` : "unknown size";

    return [
      `Create an image inspired by this ${item.kind}: ${subject}.`,
      `Style: polished, high-detail, platform-ready visual.`,
      `Composition: preserve the main subject and visual intent; adapt cleanly for modern digital use.`,
      `Source hints: ${sizeHint}, ${item.pageTitle || "webpage source"}.`
    ].join(" ");
  }

  function collectImgElements() {
    return [...document.images]
      .map((img) => {
        const rect = img.getBoundingClientRect();
        const src = absoluteUrl(img.currentSrc || img.src || img.getAttribute("data-src") || "");
        const alt = cleanText(img.alt, 160);
        const title = cleanText(img.title || img.getAttribute("aria-label"), 160);
        const context = nearbyText(img);
        const width = Math.round(rect.width || img.naturalWidth || 0);
        const height = Math.round(rect.height || img.naturalHeight || 0);

        return {
          src,
          alt,
          title,
          context,
          width,
          height,
          kind: inferType(src, width, height, `${alt} ${title} ${context}`),
          pageTitle: cleanText(document.title, 120),
          pageUrl: location.href
        };
      })
      .filter((item) => item.src && item.width >= 40 && item.height >= 40);
  }

  function collectBackgroundImages() {
    const elements = [...document.querySelectorAll("article, section, header, main, div, a, button")]
      .slice(0, 700);

    return elements
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const src = getBackgroundImageUrl(element);
        const context = nearbyText(element);
        const width = Math.round(rect.width || 0);
        const height = Math.round(rect.height || 0);

        return {
          src,
          alt: "",
          title: cleanText(element.getAttribute("aria-label") || element.title, 160),
          context,
          width,
          height,
          kind: inferType(src, width, height, context),
          pageTitle: cleanText(document.title, 120),
          pageUrl: location.href
        };
      })
      .filter((item) => item.src && item.width >= 80 && item.height >= 80);
  }

  function dedupe(items) {
    const seen = new Set();
    return items.filter((item) => {
      const key = item.src.split("?")[0];
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function safeFilename(value) {
    return String(value || "image-spark")
      .replace(/[\\/:*?"<>|]+/g, "-")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80) || "image-spark";
  }

  function closeViewer() {
    document.getElementById(VIEWER_ID)?.remove();
    document.documentElement.style.removeProperty("overflow");
    viewerState.imageExpanded = false;
  }

  function languageBlocks(prompt, item = {}) {
    if (item.promptCn || item.promptEn) {
      return {
        english: item.promptEn || "No English prompt yet. Use reverse prompt again to create one.",
        chinese: item.promptCn || "暂无中文提示词。可重新点击「反推提示词」生成中文版本。"
      };
    }

    const lines = String(prompt || "").split(/\n+/).map((line) => line.trim()).filter(Boolean);
    const english = lines.filter((line) => /[A-Za-z]/.test(line)).join("\n\n");
    const chinese = lines.filter((line) => /[\u3400-\u9fff]/.test(line)).join("\n\n");
    return {
      english: english || "No English prompt yet. Use the translation tool in the side panel to create one.",
      chinese: chinese || "暂无中文提示词。可在侧栏点击「反推提示词」生成中文版本。"
    };
  }

  function promptSections(prompt) {
    const text = String(prompt || "").trim();
    if (!text) return [];

    const matches = [...text.matchAll(/\*\*([^:*：]+)[:：]?\*\*\s*([\s\S]*?)(?=\n?\s*\*\*[^:*：]+[:：]?\*\*|$)/g)];
    const rawSections = matches.length
      ? matches.map((match) => ({ title: match[1].trim(), text: match[2].trim() }))
      : text.split(/\n{2,}/).map((part, index) => ({
        title: ["主体与画面", "风格与质感", "构图与细节", "补充要求"][index] || "其他",
        text: part.trim()
      }));

    const groups = [
      { title: "主体", keys: /主体|角色|人物|subject|character|main/i, items: [] },
      { title: "构图", keys: /构图|镜头|视角|composition|camera|view|framing/i, items: [] },
      { title: "风格", keys: /风格|艺术|参考|style|art|aesthetic/i, items: [] },
      { title: "光影色彩", keys: /光|影|色|调|lighting|color|palette|tone/i, items: [] },
      { title: "细节元素", keys: /细节|材质|服装|背景|detail|texture|background|props/i, items: [] },
      { title: "文字信息", keys: /文字|标题|typography|text|banner|logo/i, items: [] },
      { title: "其他", keys: /.^/, items: [] }
    ];

    rawSections.forEach((section) => {
      const target = groups.find((group) => group.keys.test(`${section.title} ${section.text}`)) || groups[groups.length - 1];
      target.items.push(section.text ? `${section.title}：${section.text}` : section.title);
    });

    return groups
      .filter((group) => group.items.length)
      .map((group) => ({ title: group.title, text: group.items.join("\n") }));
  }

  function copyText(text) {
    const value = String(text || "");
    if (!value) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => fallbackCopyText(value));
    } else {
      fallbackCopyText(value);
    }
    showViewerNotice("复制成功。");
  }

  function fallbackCopyText(text) {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.left = "-9999px";
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }

  function sendRuntimeMessage(message) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          resolve(null);
          return;
        }
        resolve(response || null);
      });
    });
  }

  function renderPromptCard(root, title, text, className = "") {
    const card = document.createElement("section");
    card.className = `prompt-card ${className}`.trim();

    const head = document.createElement("div");
    head.className = "prompt-card-head";
    const label = document.createElement("span");
    label.textContent = title;
    const copy = document.createElement("button");
    copy.className = "copy-text";
    copy.type = "button";
    copy.setAttribute("aria-label", `复制${title}`);
    copy.title = `复制${title}`;
    copy.addEventListener("click", () => copyText(text));
    head.append(label, copy);

    const body = document.createElement("pre");
    body.textContent = text;
    card.append(head, body);
    root.append(card);
  }

  function renderPromptPanels(item) {
    const host = document.getElementById(VIEWER_ID);
    if (!host?.shadowRoot) return;

    const root = host.shadowRoot.querySelector(".prompt-stack");
    root.innerHTML = "";
    const prompt = item.prompt || "无提示词";
    const blocks = languageBlocks(prompt, item);
    renderPromptCard(root, "中文", blocks.chinese, "is-language");
    renderPromptCard(root, "ENGLISH", blocks.english, "is-language");

    const template = document.createElement("section");
    template.className = "prompt-template";
    const head = document.createElement("div");
    head.className = "prompt-template-head";
    const title = document.createElement("span");
    title.textContent = "提示词结构";
    const copy = document.createElement("button");
    copy.className = "copy-text";
    copy.type = "button";
    copy.setAttribute("aria-label", "复制提示词结构");
    copy.title = "复制提示词结构";
    const structureSource = item.promptStructure || item.promptCn || prompt;
    copy.addEventListener("click", () => copyText(promptSections(structureSource).map((section) => `${section.title}：${section.text}`).join("\n\n")));
    head.append(title, copy);
    template.append(head);

    const body = document.createElement("div");
    body.className = "prompt-template-body";
    promptSections(structureSource).forEach((section) => {
      const row = document.createElement("div");
      row.className = "prompt-section-row";
      const sectionTitle = document.createElement("strong");
      sectionTitle.textContent = section.title;
      const sectionText = document.createElement("p");
      sectionText.textContent = section.text;
      row.append(sectionTitle, sectionText);
      body.append(row);
    });
    template.append(body);
    root.append(template);
  }

  function setActiveViewerItem(index) {
    viewerState.activeIndex = Math.max(0, Math.min(index, viewerState.items.length - 1));
    const host = document.getElementById(VIEWER_ID);
    if (!host?.shadowRoot) return;

    closeViewerImageZoom();
    const item = viewerState.items[viewerState.activeIndex];
    host.shadowRoot.querySelector(".main-image").src = item.url;
    host.shadowRoot.querySelector(".stage-title").textContent = `${item.model} · ${item.width} × ${item.height} · ${item.index}`;
    setViewerZoom(1);
    renderPromptPanels(item);
    host.shadowRoot.querySelectorAll(".thumb").forEach((button, buttonIndex) => {
      button.setAttribute("aria-current", buttonIndex === viewerState.activeIndex ? "true" : "false");
    });
  }

  function openViewerImageZoom() {
    const host = document.getElementById(VIEWER_ID);
    const shadow = host?.shadowRoot;
    const item = viewerState.items[viewerState.activeIndex];
    if (!shadow || !item?.url) return;

    const zoomLayer = shadow.querySelector(".image-zoom");
    const zoomImage = shadow.querySelector(".image-zoom img");
    if (!zoomLayer || !zoomImage) return;

    zoomImage.src = item.url;
    zoomImage.alt = `${item.model} ${item.index}`;
    zoomLayer.hidden = false;
    viewerState.imageExpanded = true;
    zoomLayer.focus({ preventScroll: true });
  }

  function closeViewerImageZoom() {
    const host = document.getElementById(VIEWER_ID);
    const shadow = host?.shadowRoot;
    const zoomLayer = shadow?.querySelector(".image-zoom");
    const zoomImage = shadow?.querySelector(".image-zoom img");
    if (!zoomLayer || zoomLayer.hidden) {
      viewerState.imageExpanded = false;
      return false;
    }

    zoomLayer.hidden = true;
    zoomImage?.removeAttribute("src");
    viewerState.imageExpanded = false;
    return true;
  }

  function setViewerZoom(value) {
    viewerState.zoom = Math.max(0.5, Math.min(4, value));
    const host = document.getElementById(VIEWER_ID);
    const image = host?.shadowRoot?.querySelector(".main-image");
    if (!image) return;
    image.style.transform = `scale(${viewerState.zoom})`;
    image.style.cursor = viewerState.zoom > 1 ? "zoom-out" : "zoom-in";
  }

  async function downloadViewerImage() {
    const item = viewerState.items[viewerState.activeIndex];
    if (!item?.url) return;

    const filename = `${safeFilename(`${item.model}-${item.index}`)}.png`;
    if (!item.url.startsWith("data:")) {
      try {
        const response = await fetch(item.url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        triggerDownload(objectUrl, filename);
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1200);
        return;
      } catch {
        // Some pages/providers block fetching image blobs. The direct URL can still be saved in many cases.
      }
    }

    triggerDownload(item.url, filename);
  }

  function triggerDownload(url, filename) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    document.body.append(link);
    link.click();
    link.remove();
  }

  async function collectViewerImageToEagle() {
    const item = viewerState.items[viewerState.activeIndex];
    if (!item?.url) return;

    if (await collectViewerImageToEagleApi(item)) {
      return;
    }

    if (viewerState.eagle?.mode === "api") {
      showViewerNotice("Eagle Local API 暂不可用，请确认 Eagle 已开启本地 API 服务。");
      return;
    }

    collectViewerImageToEagleProtocol(item);
  }

  async function collectViewerImageToEagleApi(item) {
    const eagle = viewerState.eagle || {};
    if (eagle.mode !== "api") {
      return false;
    }

    try {
      const response = await sendRuntimeMessage({
        type: "IMAGE_SPARK_COLLECT_EAGLE",
        payload: {
          item: {
            url: item.originalUrl || item.url,
            model: item.model,
            index: item.index,
            prompt: item.prompt || "",
            website: location.href
          },
          eagle
        }
      });
      if (!response?.ok) {
        throw new Error(response?.error || "EAGLE_API_FAILED");
      }
      const host = document.getElementById(VIEWER_ID);
      const button = host?.shadowRoot?.querySelector(".eagle");
      if (button) {
        button.classList.add("is-collected");
        button.textContent = "已收集";
      }
      showViewerNotice("已通过 Eagle Local API 收集图片。");
      return true;
    } catch {
      return false;
    }
  }

  function showViewerNotice(text) {
    const host = document.getElementById(VIEWER_ID);
    const notice = host?.shadowRoot?.querySelector(".notice");
    if (!notice) return;
    notice.textContent = text;
    notice.hidden = false;
    clearTimeout(showViewerNotice.timer);
    showViewerNotice.timer = setTimeout(() => {
      notice.hidden = true;
    }, 2600);
  }

  function collectViewerImageToEagleProtocol(item) {
    const params = new URLSearchParams({
      url: item.originalUrl || item.url,
      name: `${item.model}-${item.index}`,
      annotation: item.prompt || ""
    });
    window.location.href = `eagle://save?${params.toString()}`;
  }

  function openViewer(payload) {
    const items = Array.isArray(payload?.items)
      ? payload.items.filter((item) => item?.url).slice(0, 24)
      : [];
    if (!items.length) return false;

    closeViewer();
    viewerState = {
      items,
      activeIndex: Math.max(0, Math.min(Number(payload?.activeIndex) || 0, items.length - 1)),
      zoom: 1,
      imageExpanded: false,
      eagle: {
        mode: payload?.eagle?.mode || "protocol",
        baseUrl: payload?.eagle?.baseUrl || "http://localhost:41595",
        token: payload?.eagle?.token || ""
      }
    };

    const host = document.createElement("div");
    host.id = VIEWER_ID;
    const shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          all: initial;
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          color-scheme: dark;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        * {
          box-sizing: border-box;
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }
        *:hover {
          scrollbar-color: rgba(255, 255, 255, 0.38) transparent;
        }
        *::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          border: 3px solid transparent;
          border-radius: 999px;
          background: transparent;
          background-clip: content-box;
        }
        *:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.42);
          background-clip: content-box;
        }
        .viewer {
          display: grid;
          grid-template-rows: auto auto minmax(0, 1fr);
          gap: 14px;
          width: 100vw;
          height: 100vh;
          padding: 18px;
          overflow: auto;
          color: #f7f7fb;
          background: rgba(4, 5, 12, 0.9);
          backdrop-filter: blur(18px);
        }
        .actions {
          position: sticky;
          top: 0;
          z-index: 2;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        button {
          height: 34px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          color: #f7f7fb;
          background: rgba(255, 255, 255, 0.08);
          font: 700 13px/1 inherit;
          cursor: pointer;
          backdrop-filter: blur(14px);
        }
        button:hover {
          border-color: rgba(167, 139, 250, 0.58);
          color: #f4f0ff;
          background:
            linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(30, 64, 175, 0.16)),
            rgba(255, 255, 255, 0.08);
        }
        .action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 14px;
        }
        .action-btn.eagle::before {
          content: "";
          width: 15px;
          height: 15px;
          flex: 0 0 auto;
          background: currentColor;
          mask: url("${chrome.runtime.getURL("assets/eagle.svg")}") center / contain no-repeat;
        }
        .action-btn.is-collected {
          border-color: rgba(167, 139, 250, 0.68);
          color: #f4f0ff;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.34), rgba(30, 64, 175, 0.28));
        }
        .action-btn.eagle.is-collected::before {
          mask: url("${chrome.runtime.getURL("assets/check.svg")}") center / contain no-repeat;
        }
        .notice {
          justify-self: end;
          max-width: min(520px, 100%);
          padding: 8px 12px;
          border: 1px solid rgba(167, 139, 250, 0.3);
          border-radius: 999px;
          color: #f4f0ff;
          background: rgba(10, 14, 22, 0.72);
          font-size: 12px;
          font-weight: 700;
        }
        .notice[hidden] {
          display: none;
        }
        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(300px, 430px);
          gap: 14px;
          min-height: 0;
        }
        .stage {
          position: relative;
          display: grid;
          min-height: 0;
          padding: 12px;
          overflow: auto;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.035);
          place-items: center;
        }
        .stage-title {
          position: absolute;
          inset: 0 0 auto;
          z-index: 2;
          min-height: 82px;
          padding: 14px 18px 34px;
          color: #ffffff;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0));
          font-size: 13px;
          font-weight: 760;
          line-height: 1.35;
          pointer-events: none;
        }
        .main-image {
          max-width: 100%;
          max-height: calc(100vh - 102px);
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.46);
          transform-origin: center center;
          transition: transform 120ms ease;
          cursor: zoom-in;
        }
        .image-zoom {
          position: fixed;
          inset: 0;
          z-index: 5;
          display: grid;
          padding: clamp(18px, 4vw, 58px);
          background: rgba(3, 4, 10, 0.94);
          backdrop-filter: blur(22px);
          place-items: center;
          outline: 0;
        }
        .image-zoom[hidden] {
          display: none;
        }
        .image-zoom img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 28px 110px rgba(0, 0, 0, 0.58);
          cursor: zoom-out;
        }
        .side {
          display: grid;
          grid-template-rows: minmax(0, 1fr) minmax(132px, auto);
          gap: 12px;
          min-height: 0;
        }
        .panel {
          min-width: 0;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.055);
        }
        .meta {
          color: rgba(230, 229, 245, 0.72);
          font-size: 12px;
          line-height: 1.55;
        }
        .prompt-stack {
          display: grid;
          gap: 12px;
          min-height: 0;
          overflow: auto;
        }
        .prompt-card,
        .prompt-template {
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.055);
        }
        .prompt-card-head,
        .prompt-template-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-height: 38px;
          padding: 0 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(205, 214, 230, 0.86);
          background: rgba(255, 255, 255, 0.04);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0;
        }
        .prompt-card pre {
          margin: 0;
          padding: 14px;
          max-height: 280px;
          overflow: auto;
          color: #f7f7fb;
          font-size: 13px;
          line-height: 1.65;
          white-space: pre-wrap;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
        }
        .prompt-card:not(.is-language) pre {
          font-family: inherit;
        }
        .copy-text {
          position: relative;
          width: 28px;
          height: 28px;
          padding: 0;
          border-color: transparent;
          border-radius: 8px;
          color: #ffffff;
          background: transparent;
          font-size: 12px;
        }
        .copy-text:hover,
        .copy-text:focus-visible {
          border-color: rgba(196, 181, 253, 0.52);
          background:
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 9rem),
            linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04)),
            rgba(12, 12, 22, 0.52);
        }
        .copy-text::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 16px;
          height: 16px;
          background: currentColor;
          mask: url("${chrome.runtime.getURL("assets/copy.svg")}") center / contain no-repeat;
          opacity: 0.86;
          transform: translate(-50%, -50%);
        }
        .prompt-template {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          max-height: 420px;
          overflow: hidden;
        }
        .prompt-template-body {
          min-height: 0;
          overflow: auto;
        }
        .prompt-section-row {
          display: grid;
          gap: 5px;
          padding: 12px 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }
        .prompt-section-row:first-of-type {
          border-top: 0;
        }
        .prompt-section-row strong {
          color: #ffffff;
          font-size: 12px;
        }
        .prompt-section-row p {
          margin: 0;
          color: rgba(247, 247, 251, 0.82);
          font-size: 13px;
          line-height: 1.55;
          white-space: pre-wrap;
        }
        .thumbs {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
          align-content: start;
          gap: 8px;
          overflow: auto;
        }
        .thumbs::before {
          content: "其他生成图";
          grid-column: 1 / -1;
          color: rgba(230, 229, 245, 0.72);
          font-size: 12px;
          font-weight: 800;
        }
        .thumb {
          display: block;
          position: relative;
          width: 100%;
          height: auto;
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          aspect-ratio: 1;
          background: rgba(255, 255, 255, 0.06);
        }
        .thumb[aria-current="true"] {
          border-color: transparent;
          background:
            linear-gradient(rgba(5, 5, 7, 0.95), rgba(5, 5, 7, 0.95)) padding-box,
            linear-gradient(110deg, rgba(34, 211, 238, 0.95), rgba(168, 85, 247, 0.95), rgba(20, 184, 166, 0.82)) border-box;
          box-shadow:
            0 0 0 1px rgba(5, 5, 7, 0.94),
            0 0 16px rgba(59, 130, 246, 0.3);
        }
        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 860px) {
          .viewer { padding: 12px; }
          .layout { grid-template-columns: minmax(0, 1fr); }
          .main-image { max-height: 68vh; }
          .prompt-stack { max-height: none; }
        }
      </style>
      <div class="viewer" role="dialog" aria-modal="true" aria-label="Image Spark 图片预览">
        <div class="actions">
          <button class="action-btn download" type="button">下载图片</button>
          <button class="action-btn eagle" type="button">收集到 Eagle</button>
          <button class="action-btn close" type="button">关闭</button>
        </div>
        <div class="notice" hidden></div>
        <div class="layout">
          <div class="stage">
            <div class="stage-title"></div>
            <img class="main-image" alt="放大预览">
          </div>
          <div class="image-zoom" hidden tabindex="-1" role="dialog" aria-modal="true" aria-label="图片放大预览">
            <img alt="整屏图片预览">
          </div>
          <div class="side">
            <div class="prompt-stack"></div>
            <div class="panel thumbs"></div>
          </div>
        </div>
      </div>
    `;
    shadow.querySelector(".eagle")?.classList.remove("is-collected");

    shadow.querySelector(".close").addEventListener("click", closeViewer);
    shadow.querySelector(".download").addEventListener("click", downloadViewerImage);
    shadow.querySelector(".eagle").addEventListener("click", collectViewerImageToEagle);
    shadow.querySelector(".stage").addEventListener("wheel", (event) => {
      event.preventDefault();
      setViewerZoom(viewerState.zoom + (event.deltaY < 0 ? 0.12 : -0.12));
    }, { passive: false });
    shadow.querySelector(".main-image").addEventListener("click", openViewerImageZoom);
    shadow.querySelector(".main-image").addEventListener("dblclick", () => setViewerZoom(1));
    shadow.querySelector(".image-zoom").addEventListener("click", closeViewerImageZoom);
    shadow.querySelector(".viewer").addEventListener("click", (event) => {
      if (event.target.classList.contains("viewer")) closeViewer();
    });

    const thumbs = shadow.querySelector(".thumbs");
    items.forEach((item, index) => {
      const button = document.createElement("button");
      button.className = "thumb";
      button.type = "button";
      button.title = `${item.model} · ${item.index}`;
      button.addEventListener("click", () => setActiveViewerItem(index));
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.index || `#${index + 1}`;
      button.append(img);
      thumbs.append(button);
    });

    document.documentElement.append(host);
    document.documentElement.style.overflow = "hidden";
    setActiveViewerItem(viewerState.activeIndex);
    return true;
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.getElementById(VIEWER_ID)) {
      if (closeViewerImageZoom()) {
        event.preventDefault();
        return;
      }
      closeViewer();
    }
  });

  document.addEventListener("contextmenu", (event) => {
    lastContextPoint = { x: event.clientX, y: event.clientY };
    lastContextImage = enhancedImageFromContextTarget(event) || imageFromContextTarget(event);
  }, true);

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "IMAGE_SPARK_GET_CONTEXT_IMAGE") {
      if (!lastContextImage?.src && lastContextPoint) {
        lastContextImage = contextImageFromElementCandidate(document.elementFromPoint(lastContextPoint.x, lastContextPoint.y));
      }
      sendResponse({ ok: Boolean(lastContextImage?.src), item: lastContextImage });
      return;
    }

    if (message?.type === "IMAGE_SPARK_OPEN_VIEWER") {
      sendResponse({ ok: openViewer(message.payload) });
      return;
    }

    if (message?.type === "IMAGE_SPARK_CLOSE_VIEWER") {
      closeViewer();
      sendResponse({ ok: true });
      return;
    }

    if (message?.type !== "PROMPT_LINK_API_EXTRACT") return;

    const items = dedupe([...collectImgElements(), ...collectBackgroundImages()])
      .sort((a, b) => b.width * b.height - a.width * a.height)
      .slice(0, MAX_IMAGES)
      .map((item, index) => ({
        id: index + 1,
        ...item,
        prompt: buildPrompt(item)
      }));

    sendResponse({
      ok: true,
      pageTitle: cleanText(document.title, 120),
      pageUrl: location.href,
      count: items.length,
      items
    });
  });
})();
