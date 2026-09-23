(() => {
  if (window.__imageSparkContentLoaded) return;
  window.__imageSparkContentLoaded = true;

  const MAX_IMAGES = 80;
  const MAX_TEXT = 180;
  const VIEWER_THUMB_PAGE_SIZE = 20;
  const VIEWER_ID = "image-spark-page-viewer";
  const VIEWER_ROLE_LABELS = { subject: "主体与动作", composition: "构图与留白", layout: "排版与字体", typography: "排版与字体", style: "风格与材质", color_material: "色彩与光影", decoration: "装饰与细节", auxiliary: "装饰与细节", auto: "自动判断" };
  let sourcePreviewToken = 0;
  let viewerPageOverflow = null;
  const ENABLE_EAGLE_INTEGRATION = true;
  let lastContextImage = null;
  let lastContextPoint = null;
  let viewerState = {
    items: [],
    activeIndex: 0,
    thumbPage: 1,
    zoom: 1,
    panX: 0,
    panY: 0,
    spacePressed: false,
    panning: false,
    panStartX: 0,
    panStartY: 0,
    panOriginX: 0,
    panOriginY: 0,
    panClickSuppressed: false,
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

  function viewerSourceLabel(item = {}) {
    const source = String(item.source || item.generationSource || "").trim();
    if (source === "reuse" || source === "visual-reuse") return "视觉复用";
    return item.mode === "image" ? "图生图" : "文生图";
  }

  function closeViewer() {
    const host = document.getElementById(VIEWER_ID);
    if (host) {
      host.remove();
      if (viewerPageOverflow?.value) {
        document.documentElement.style.setProperty("overflow", viewerPageOverflow.value, viewerPageOverflow.priority);
      } else {
        document.documentElement.style.removeProperty("overflow");
      }
      viewerPageOverflow = null;
    }
    sourcePreviewToken += 1;
    viewerState.imageExpanded = false;
    viewerState.spacePressed = false;
    viewerState.panning = false;
  }

  function resetViewerPan() {
    viewerState.panX = 0;
    viewerState.panY = 0;
  }

  function updateViewerPanUi() {
    const host = document.getElementById(VIEWER_ID);
    const shadow = host?.shadowRoot;
    const stage = shadow?.querySelector(".stage");
    const image = shadow?.querySelector(".main-image");
    if (!stage || !image) return;

    image.style.transform = `translate(${viewerState.panX}px, ${viewerState.panY}px) scale(${viewerState.zoom})`;
    image.style.cursor = viewerState.panning
      ? "grabbing"
      : viewerState.spacePressed
        ? "grab"
        : viewerState.zoom > 1
          ? "zoom-out"
          : "zoom-in";
    stage.classList.toggle("is-pan-ready", Boolean(viewerState.spacePressed));
    stage.classList.toggle("is-panning", Boolean(viewerState.panning));

    const zoomLayer = shadow?.querySelector(".image-zoom");
    const zoomImage = shadow?.querySelector(".image-zoom img");
    if (zoomLayer && zoomImage) {
      zoomImage.style.transform = `translate(${viewerState.panX}px, ${viewerState.panY}px) scale(${viewerState.zoom})`;
      zoomImage.style.cursor = viewerState.panning
        ? "grabbing"
        : viewerState.spacePressed
          ? "grab"
          : "zoom-out";
      zoomLayer.classList.toggle("is-pan-ready", Boolean(viewerState.spacePressed));
      zoomLayer.classList.toggle("is-panning", Boolean(viewerState.panning));
      const zoomReadout = zoomLayer.querySelector(".zoom-readout");
      if (zoomReadout) zoomReadout.textContent = `${Math.round(viewerState.zoom * 100)}%`;
    }
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

  function hasViewerImage(item) {
    return Boolean(item?.url || item?.localStoreId);
  }

  async function resolveViewerImageUrl(item, variant = "full") {
    if (!item) return "";
    if (variant === "thumbnail" && item.thumbnailUrl) return item.thumbnailUrl;
    if (variant !== "thumbnail" && item.url) return item.url;
    if (!item.localStoreId) return item.url || item.originalUrl || "";

    const response = await sendRuntimeMessage({
      type: "IMAGE_SPARK_GET_LOCAL_IMAGE",
      payload: {
        id: item.localStoreId,
        variant
      }
    });
    const dataUrl = response?.dataUrl || "";
    if (dataUrl) {
      if (variant === "thumbnail") {
        item.thumbnailUrl = dataUrl;
      } else {
        item.url = dataUrl;
      }
      return dataUrl;
    }
    return item.url || item.originalUrl || "";
  }

  function applyViewerImage(image, item, variant = "full") {
    if (!image || !item) return;
    const token = `${item.galleryId || item.localStoreId || item.index || ""}-${variant}-${Date.now()}-${Math.random()}`;
    image.dataset.imageToken = token;
    const immediate = item.localStoreId
      ? (variant === "thumbnail" ? item.thumbnailUrl : item.url)
      : (variant === "thumbnail" ? (item.thumbnailUrl || item.url || item.originalUrl) : (item.url || item.originalUrl));
    if (immediate) {
      image.src = immediate;
    } else {
      image.removeAttribute("src");
    }
    resolveViewerImageUrl(item, variant).then((url) => {
      if (url && image.dataset.imageToken === token) {
        image.src = url;
      }
    });
  }

  function renderPromptCard(root, title, text, className = "") {
    const card = document.createElement("section");
    card.className = `prompt-card ${className}`.trim();

    const head = document.createElement("div");
    head.className = "prompt-card-head";
    const label = document.createElement("span");
    label.textContent = title;
    const tools = document.createElement("div");
    tools.className = "prompt-card-tools";
    const copy = document.createElement("button");
    copy.className = "copy-text";
    copy.type = "button";
    copy.setAttribute("aria-label", `复制${title}`);
    copy.title = `复制${title}`;
    copy.addEventListener("click", () => copyText(text));
    const collapse = document.createElement("button");
    collapse.className = "collapse-text";
    collapse.type = "button";
    collapse.setAttribute("aria-label", `收起${title}`);
    collapse.setAttribute("aria-expanded", "true");
    collapse.title = "收起/展开";
    const setCollapsed = (isCollapsed) => {
      card.classList.toggle("is-collapsed", isCollapsed);
      collapse.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
      collapse.setAttribute("aria-label", `${isCollapsed ? "展开" : "收起"}${title}`);
    };
    const toggleCollapsed = () => setCollapsed(!card.classList.contains("is-collapsed"));
    collapse.addEventListener("click", toggleCollapsed);
    head.addEventListener("dblclick", (event) => {
      if (event.target.closest("button")) return;
      toggleCollapsed();
    });
    tools.append(copy, collapse);
    head.append(label, tools);

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
    const panels = [
      { title: "中文", text: blocks.chinese || item.promptCn || prompt || "暂无中文提示词。" }
    ];
    if (item.promptEn) {
      panels.push({ title: "ENGLISH", text: item.promptEn });
    }
    if (item.promptStructure) {
      const structureText = promptSections(item.promptStructure)
        .map((section) => `${section.title}：\n${section.text}`)
        .join("\n\n") || item.promptStructure;
      panels.push({ title: "提示词结构", text: structureText || "暂无提示词结构。" });
    }

    const card = document.createElement("section");
    card.className = "prompt-switch-card";
    const head = document.createElement("div");
    head.className = "prompt-switch-head";
    const tabs = document.createElement("div");
    tabs.className = "prompt-switch-tabs";
    tabs.setAttribute("role", "tablist");
    tabs.dataset.count = String(panels.length);
    tabs.style.setProperty("--active-index", "0");
    tabs.style.setProperty("--panel-count", String(panels.length));
    const copy = document.createElement("button");
    copy.className = "copy-text";
    copy.type = "button";
    copy.setAttribute("aria-label", "复制当前提示词");
    copy.title = "复制当前提示词";
    const body = document.createElement("pre");
    body.className = "prompt-switch-body";
    let activeIndex = 0;
    const setActivePanel = (nextIndex) => {
      activeIndex = Math.max(0, Math.min(nextIndex, panels.length - 1));
      tabs.style.setProperty("--active-index", String(activeIndex));
      tabs.querySelectorAll(".prompt-switch-tab").forEach((button, buttonIndex) => {
        button.setAttribute("aria-selected", buttonIndex === activeIndex ? "true" : "false");
      });
      body.textContent = panels[activeIndex].text;
      body.scrollTop = 0;
    };
    panels.forEach((panel, panelIndex) => {
      const tab = document.createElement("button");
      tab.className = "prompt-switch-tab";
      tab.type = "button";
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", panelIndex === 0 ? "true" : "false");
      tab.textContent = panel.title;
      tab.addEventListener("click", () => setActivePanel(panelIndex));
      tabs.append(tab);
    });
    copy.addEventListener("click", () => copyText(panels[activeIndex].text));
    head.append(tabs, copy);
    card.append(head, body);
    root.append(card);
    setActivePanel(0);
  }

  function viewerSourceFallbackUrl(source) {
    return source?.previewUrl || source?.source?.uri || "";
  }

  async function resolveViewerSourceImageUrl(source, variant = "thumbnail") {
    if (source?.previewStoreId) {
      const response = await sendRuntimeMessage({
        type: "IMAGE_SPARK_GET_LOCAL_IMAGE",
        payload: { id: source.previewStoreId, variant }
      });
      if (response?.dataUrl) return response.dataUrl;
    }
    return viewerSourceFallbackUrl(source);
  }

  function populateViewerSourceThumbnail(image, source) {
    const fallback = viewerSourceFallbackUrl(source);
    if (fallback) image.src = fallback;
    if (!source?.previewStoreId) return;
    const host = document.getElementById(VIEWER_ID);
    resolveViewerSourceImageUrl(source, "thumbnail").then((url) => {
      if (url && image.isConnected && document.getElementById(VIEWER_ID) === host) {
        image.src = url;
      }
    });
  }

  function renderViewerSources(item) {
    const host = document.getElementById(VIEWER_ID);
    const panel = host?.shadowRoot?.querySelector(".source-panel");
    if (!panel) return;
    panel.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "生成来源";
    const mode = document.createElement("p");
    mode.className = "source-mode";
    mode.textContent = "生成模式：" + viewerSourceLabel(item);
    panel.append(heading, mode);

    const lineage = item.assetLineage;
    const assets = lineage?.sourceAssets;
    const traceable = Array.isArray(assets)
      && Array.isArray(lineage?.directReferenceIds)
      && Array.isArray(lineage?.analysisReferenceIds)
      && assets.every((source) => source.participation === "direct" || source.participation === "analysis");
    if (!traceable || !assets.length) {
      const empty = document.createElement("p");
      empty.className = "source-empty";
      empty.textContent = !traceable
        ? "该资产生成于来源追踪功能上线前，无法确认实际输入图片。"
        : item.mode === "text" ? "无直接参考图" : "本次供应商请求未包含图片输入。";
      panel.append(empty);
      return;
    }

    for (const [participation, title] of [["direct", "直接参与供应商生成"], ["analysis", "仅用于分析"]]) {
      const group = assets.filter((source) => source.participation === participation);
      if (!group.length) continue;
      const section = document.createElement("section");
      section.className = "source-group";
      const groupHeading = document.createElement("h4");
      groupHeading.textContent = title + " · " + group.length;
      section.append(groupHeading);
      for (const source of group) {
        const card = document.createElement("button");
        card.className = "source-card";
        card.type = "button";
        card.title = "预览" + (source.name || "来源图");
        const image = document.createElement("img");
        image.alt = source.name || "来源图";
        image.loading = "lazy";
        populateViewerSourceThumbnail(image, source);
        const copy = document.createElement("span");
        copy.className = "source-card-copy";
        const name = document.createElement("strong");
        name.textContent = `图${source.order || assets.indexOf(source) + 1} · ${source.name || "来源图"}`;
        const roles = document.createElement("small");
        const roleLabels = [...new Set((Array.isArray(source.roles) ? source.roles : [])
          .map((role) => VIEWER_ROLE_LABELS[role] || String(role || "").trim())
          .filter(Boolean))];
        roles.textContent = roleLabels.join("＋") || (participation === "direct" ? "生成参考" : "分析参考");
        copy.append(name, roles);
        card.append(image, copy);
        card.addEventListener("click", () => openViewerSourcePreview(source));
        section.append(card);
      }
      panel.append(section);
    }
  }


  async function openViewerSourcePreview(source) {
    closeViewerImageZoom();
    const host = document.getElementById(VIEWER_ID);
    const token = ++sourcePreviewToken;
    const url = await resolveViewerSourceImageUrl(source, "full");
    if (token !== sourcePreviewToken || document.getElementById(VIEWER_ID) !== host) return;
    if (!url) {
      showViewerNotice("来源图预览不可用；来源关系和角色仍已保留。");
      return;
    }
    const shadow = host?.shadowRoot;
    const layer = shadow?.querySelector(".image-zoom");
    const image = shadow?.querySelector(".image-zoom img");
    if (!layer || !image) return;
    resetViewerPan();
    setViewerZoom(1);
    image.src = url;
    image.alt = source.name || "来源图";
    const back = shadow.querySelector(".source-preview-back");
    if (back) back.hidden = false;
    const caption = shadow.querySelector(".source-preview-caption");
    if (caption) {
      caption.textContent = source.name || "来源图";
      caption.hidden = false;
    }
    layer.hidden = false;
    viewerState.imageExpanded = true;
    updateViewerPanUi();
    layer.focus({ preventScroll: true });
  }

  function renderViewerThumbs() {
    const host = document.getElementById(VIEWER_ID);
    const shadow = host?.shadowRoot;
    const thumbs = shadow?.querySelector(".thumbs");
    if (!thumbs) return;

    const totalItems = viewerState.items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / VIEWER_THUMB_PAGE_SIZE));
    viewerState.thumbPage = Math.max(1, Math.min(Number(viewerState.thumbPage) || 1, totalPages));

    const pageStart = (viewerState.thumbPage - 1) * VIEWER_THUMB_PAGE_SIZE;
    const pageItems = viewerState.items.slice(pageStart, pageStart + VIEWER_THUMB_PAGE_SIZE);
    thumbs.innerHTML = "";
    pageItems.forEach((item, offset) => {
      const index = pageStart + offset;
      const button = document.createElement("button");
      button.className = "thumb";
      button.type = "button";
      button.title = `${item.model} - ${item.index}`;
      button.dataset.label = viewerSourceLabel(item);
      button.setAttribute("aria-current", index === viewerState.activeIndex ? "true" : "false");
      button.addEventListener("click", () => setActiveViewerItem(index));
      const img = document.createElement("img");
      img.alt = item.index || `#${index + 1}`;
      button.append(img);
      applyViewerImage(img, item, "thumbnail");
      thumbs.append(button);
    });

    const pager = shadow?.querySelector(".thumbs-pager");
    if (!pager) return;
    pager.hidden = totalPages <= 1;
    const info = pager.querySelector(".thumb-page-info");
    const prev = pager.querySelector(".thumb-page-prev");
    const next = pager.querySelector(".thumb-page-next");
    if (info) info.textContent = `${viewerState.thumbPage} / ${totalPages}`;
    if (prev) prev.disabled = viewerState.thumbPage <= 1;
    if (next) next.disabled = viewerState.thumbPage >= totalPages;
  }

  function setActiveViewerItem(index) {
    viewerState.activeIndex = Math.max(0, Math.min(index, viewerState.items.length - 1));
    viewerState.thumbPage = Math.floor(viewerState.activeIndex / VIEWER_THUMB_PAGE_SIZE) + 1;
    const host = document.getElementById(VIEWER_ID);
    if (!host?.shadowRoot) return;

    closeViewerImageZoom();
    const item = viewerState.items[viewerState.activeIndex];
    const mainImage = host.shadowRoot.querySelector(".main-image");
    mainImage.alt = `${item.model} ${item.index}`;
    applyViewerImage(mainImage, item, "full");
    host.shadowRoot.querySelector(".stage-title").textContent = `${item.model} · ${item.width} × ${item.height} · ${item.index}`;
    resetViewerPan();
    setViewerZoom(1);
    renderPromptPanels(item);
    renderViewerSources(item);
    const previous = host.shadowRoot.querySelector(".stage-prev");
    const next = host.shadowRoot.querySelector(".stage-next");
    if (previous) previous.disabled = viewerState.activeIndex === 0;
    if (next) next.disabled = viewerState.activeIndex === viewerState.items.length - 1;
    renderViewerThumbs();
  }

  function openViewerImageZoom() {
    const host = document.getElementById(VIEWER_ID);
    const shadow = host?.shadowRoot;
    const item = viewerState.items[viewerState.activeIndex];
    if (!shadow || !hasViewerImage(item)) return;

    const zoomLayer = shadow.querySelector(".image-zoom");
    const zoomImage = shadow.querySelector(".image-zoom img");
    if (!zoomLayer || !zoomImage) return;

    sourcePreviewToken += 1;
    const back = shadow.querySelector(".source-preview-back");
    const caption = shadow.querySelector(".source-preview-caption");
    if (back) back.hidden = true;
    if (caption) caption.hidden = true;
    zoomImage.alt = `${item.model} ${item.index}`;
    applyViewerImage(zoomImage, item, "full");
    const zoomReadout = shadow.querySelector(".image-zoom .zoom-readout");
    if (zoomReadout) zoomReadout.textContent = `${Math.round(viewerState.zoom * 100)}%`;
    zoomLayer.hidden = false;
    viewerState.imageExpanded = true;
    updateViewerPanUi();
    zoomLayer.focus({ preventScroll: true });
  }

  function closeViewerImageZoom() {
    sourcePreviewToken += 1;
    const host = document.getElementById(VIEWER_ID);
    const shadow = host?.shadowRoot;
    const zoomLayer = shadow?.querySelector(".image-zoom");
    const zoomImage = shadow?.querySelector(".image-zoom img");
    const back = shadow?.querySelector(".source-preview-back");
    const caption = shadow?.querySelector(".source-preview-caption");
    if (back) back.hidden = true;
    if (caption) caption.hidden = true;
    if (!zoomLayer || zoomLayer.hidden) {
      viewerState.imageExpanded = false;
      return false;
    }

    zoomLayer.hidden = true;
    zoomImage?.removeAttribute("src");
    zoomImage?.style.removeProperty("transform");
    viewerState.imageExpanded = false;
    return true;
  }

  function setViewerZoom(value) {
    viewerState.zoom = Math.max(0.5, Math.min(4, value));
    const host = document.getElementById(VIEWER_ID);
    const shadow = host?.shadowRoot;
    const image = shadow?.querySelector(".main-image");
    if (!image) return;
    image.style.cursor = viewerState.zoom > 1 ? "zoom-out" : "zoom-in";
    const percent = `${Math.round(viewerState.zoom * 100)}%`;
    const stage = shadow.querySelector(".stage");
    const readout = shadow.querySelector(".stage .zoom-readout");
    if (readout) readout.textContent = percent;
    stage?.classList.toggle("is-zoomed", viewerState.zoom > 1.01);
    updateViewerPanUi();
  }

  async function downloadViewerImage() {
    const item = viewerState.items[viewerState.activeIndex];
    if (!hasViewerImage(item)) return;
    const imageUrl = await resolveViewerImageUrl(item, "full");
    if (!imageUrl) return;

    const filename = `${safeFilename(`${item.model}-${item.index}`)}.png`;
    if (!imageUrl.startsWith("data:")) {
      try {
        const response = await fetch(imageUrl);
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

    triggerDownload(imageUrl, filename);
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
    if (!hasViewerImage(item)) return;
    await resolveViewerImageUrl(item, "full");

    if (await collectViewerImageToEagleApi(item)) {
      return;
    }

    if (viewerState.eagle?.mode === "api") {
      showViewerNotice("Eagle Local API 暂不可用，已改用 eagle:// 协议尝试收集。");
    }

    collectViewerImageToEagleProtocol(item, { fallbackFromApi: viewerState.eagle?.mode === "api" });
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

  function collectViewerImageToEagleProtocol(item, options = {}) {
    const params = new URLSearchParams({
      url: item.originalUrl || item.url,
      name: `${item.model}-${item.index}`,
      annotation: item.prompt || ""
    });
    window.location.href = `eagle://save?${params.toString()}`;
    showViewerNotice(options.fallbackFromApi
      ? "Eagle Local API 暂不可用，已改用 eagle:// 协议尝试收集。"
      : "已尝试通过 eagle:// 协议发送到 Eagle。");
  }

  function openViewer(payload) {
    const items = Array.isArray(payload?.items)
      ? payload.items.filter(hasViewerImage).slice(0, 24)
      : [];
    if (!items.length) return false;

    closeViewer();
    viewerState = {
      items,
      activeIndex: Math.max(0, Math.min(Number(payload?.activeIndex) || 0, items.length - 1)),
      thumbPage: 1,
      zoom: 1,
      panX: 0,
      panY: 0,
      spacePressed: false,
      panning: false,
      panStartX: 0,
      panStartY: 0,
      panOriginX: 0,
      panOriginY: 0,
      panClickSuppressed: false,
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
          font-family: Manrope, Inter, "Noto Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
          font-family: Manrope, Inter, "Noto Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
          height: 100%;
          min-height: 0;
          overflow: hidden;
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
        .stage.is-pan-ready,
        .stage.is-pan-ready .main-image,
        .image-zoom.is-pan-ready,
        .image-zoom.is-pan-ready img {
          cursor: grab;
        }
        .stage.is-panning,
        .stage.is-panning .main-image,
        .image-zoom.is-panning,
        .image-zoom.is-panning img {
          cursor: grabbing;
        }
        .stage.is-panning .main-image,
        .image-zoom.is-panning img {
          transition: none;
        }
        .zoom-readout {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          min-width: 54px;
          padding: 7px 10px;
          border: 1px solid rgba(255, 255, 255, 0.32);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.94);
          background: rgba(255, 255, 255, 0.22);
          box-shadow:
            0 12px 34px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.22);
          font-size: 12px;
          font-weight: 850;
          text-align: center;
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0.96);
          transition: opacity 160ms ease, transform 160ms ease;
          backdrop-filter: blur(14px);
        }
        .stage.is-zoomed .zoom-readout {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
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

        .stage-nav {
          position: absolute;
          top: 50%;
          z-index: 3;
          width: 38px;
          height: 44px;
          padding: 0;
          border-radius: 10px;
          background: rgba(5, 7, 16, 0.64);
          font-size: 28px;
          line-height: 1;
          transform: translateY(-50%);
        }
        .stage-prev { left: 18px; }
        .stage-next { right: 18px; }
        .stage-nav:disabled { opacity: 0.32; cursor: default; }
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
          transform-origin: center center;
          transition: transform 120ms ease;
          cursor: zoom-out;
        }

        .source-preview-back {
          position: absolute;
          top: 22px;
          right: 22px;
          z-index: 6;
          padding: 0 14px;
        }
        .source-preview-back[hidden],
        .source-preview-caption[hidden] { display: none; }
        .source-preview-caption {
          position: absolute;
          bottom: 22px;
          left: 50%;
          z-index: 6;
          max-width: min(720px, 88vw);
          padding: 8px 14px;
          border-radius: 999px;
          color: #f7f7fb;
          background: rgba(5, 7, 16, 0.75);
          font-size: 12px;
          text-align: center;
          transform: translateX(-50%);
        }
        .image-zoom .zoom-readout {
          opacity: 1;
        }
        .side {
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
          min-height: 0;
          overflow: hidden;
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
          grid-auto-rows: minmax(0, 1fr);
          align-content: start;
          gap: 12px;
          flex: 1 1 auto;
          min-height: 0;
          max-height: none;
          overflow: auto;
        }
        .prompt-switch-card {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          height: 100%;
          min-height: 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.055);
        }
        .prompt-switch-head {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 8px;
          align-items: center;
          min-height: 42px;
          padding: 7px 8px 7px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
        }
        .prompt-switch-tabs {
          --active-index: 0;
          --panel-count: 1;
          position: relative;
          display: grid;
          justify-self: start;
          grid-template-columns: repeat(var(--panel-count), max-content);
          width: max-content;
          max-width: 100%;
          min-width: 0;
          height: 30px;
          padding: 3px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          background: rgba(4, 5, 10, 0.52);
        }
        .prompt-switch-tabs::before {
          content: "";
          position: absolute;
          inset: 3px auto 3px 3px;
          width: calc((100% - 6px) / var(--panel-count));
          border-radius: 999px;
          background: linear-gradient(110deg, rgba(168, 85, 247, 0.68), rgba(59, 130, 246, 0.58));
          box-shadow: 0 8px 26px rgba(59, 130, 246, 0.18);
          transform: translateX(calc(var(--active-index) * 100%));
          transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .prompt-switch-tab {
          position: relative;
          z-index: 1;
          min-width: 0;
          height: 100%;
          padding: 0 18px;
          border: 0;
          border-radius: 999px;
          color: rgba(235, 236, 248, 0.62);
          background: transparent;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
          cursor: pointer;
        }
        .prompt-switch-tab[aria-selected="true"] {
          color: #ffffff;
        }
        .prompt-switch-tabs[data-count="1"] .prompt-switch-tab {
          min-width: 92px;
        }
        .prompt-switch-tabs[data-count="2"] .prompt-switch-tab {
          min-width: 92px;
        }
        .prompt-switch-tabs[data-count="3"] {
          width: min(100%, 300px);
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .prompt-switch-tabs[data-count="3"] .prompt-switch-tab {
          padding: 0 10px;
        }
        .prompt-switch-body {
          margin: 0;
          padding: 15px 16px;
          max-height: none;
          min-height: 0;
          overflow: auto;
          color: #f7f7fb;
          font-size: 13px;
          line-height: 1.72;
          white-space: pre-wrap;
          font-family: "Roboto Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
        }
        .prompt-card,
        .prompt-template {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.055);
          transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
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
        .prompt-card-head > span,
        .prompt-template-head > span {
          min-width: 0;
        }
        .prompt-card-tools {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-left: auto;
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
          font-family: "Roboto Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
          transition: max-height 220ms ease, opacity 160ms ease, padding 180ms ease;
        }
        .prompt-card:not(.is-language) pre {
          font-family: inherit;
        }
        .copy-text {
          position: relative;
          width: 28px;
          height: 28px;
          padding: 0;
          border: 0;
          border-radius: 8px;
          color: #ffffff;
          background: transparent !important;
          box-shadow: none;
          appearance: none;
          backdrop-filter: none;
          font-size: 12px;
          transition: background 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
        }
        .collapse-text {
          position: relative;
          width: 28px;
          height: 28px;
          padding: 0;
          border: 0;
          border-radius: 8px;
          color: rgba(247, 247, 251, 0.86);
          background: transparent !important;
          box-shadow: none;
          appearance: none;
          backdrop-filter: none;
          transition: background 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
        }
        .copy-text:hover,
        .copy-text:focus-visible,
        .collapse-text:hover,
        .collapse-text:focus-visible {
          background: transparent !important;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.22);
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
        .collapse-text::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 14px;
          height: 14px;
          background: currentColor;
          mask: url("${chrome.runtime.getURL("assets/chevron-down.svg")}") center / contain no-repeat;
          transform: translate(-50%, -50%) rotate(0deg);
          transition: transform 160ms ease;
        }
        .prompt-card.is-collapsed .collapse-text::before,
        .prompt-template.is-collapsed .collapse-text::before {
          transform: translate(-50%, -50%) rotate(-90deg);
        }
        .prompt-card.is-collapsed pre,
        .prompt-template.is-collapsed .prompt-template-body {
          max-height: 0;
          padding-top: 0;
          padding-bottom: 0;
          opacity: 0;
          overflow: hidden;
        }
        .prompt-template {
          max-height: 420px;
        }
        .prompt-template-body {
          min-height: 0;
          max-height: 382px;
          overflow: auto;
          opacity: 1;
          transition: max-height 220ms ease, opacity 160ms ease;
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

        .source-panel {
          display: grid;
          gap: 8px;
          flex: 0 0 auto;
          max-height: min(32vh, 270px);
          overflow: auto;
        }
        .source-panel h3,
        .source-group h4 { margin: 0; font-size: 12px; }
        .source-panel h3 { font-size: 13px; color: #ffffff; }
        .source-mode,
        .source-empty {
          margin: 0;
          color: rgba(230, 229, 245, 0.72);
          font-size: 11px;
          line-height: 1.55;
        }
        .source-group { display: grid; gap: 6px; }
        .source-group h4 { color: #cfc5ff; }
        .source-card {
          display: grid;
          grid-template-columns: 52px minmax(0, 1fr);
          align-items: center;
          gap: 9px;
          width: 100%;
          height: auto;
          min-height: 64px;
          padding: 6px;
          border-radius: 9px;
          text-align: left;
          background: rgba(255, 255, 255, 0.035);
        }
        .source-card img {
          width: 52px;
          height: 52px;
          border-radius: 6px;
          object-fit: cover;
          background: rgba(255, 255, 255, 0.06);
        }
        .source-card-copy { display: grid; min-width: 0; gap: 4px; }
        .source-card-copy strong,
        .source-card-copy small {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .source-card-copy strong { font-size: 11px; }
        .source-card-copy small {
          color: rgba(210, 205, 232, 0.72);
          font-size: 10px;
        }
        .thumbs-panel {
          --gallery-glow-x: 50%;
          --gallery-glow-y: 50%;
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-rows: auto auto;
          align-content: start;
          gap: 10px;
          flex: 0 0 auto;
          padding: 12px;
          min-height: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          background: rgba(11, 12, 21, 0.7);
          overflow: visible;
        }
        .thumbs-panel::before,
        .thumbs-panel::after {
          content: "";
          position: absolute;
          pointer-events: none;
          border-radius: inherit;
        }
        .thumbs-panel::before {
          z-index: 0;
          inset: -1px;
          padding: 1px;
          opacity: 0;
          background: radial-gradient(
            112px circle at var(--gallery-glow-x) var(--gallery-glow-y),
            rgba(34, 211, 238, 0.92) 0%,
            rgba(167, 139, 250, 0.96) 30%,
            rgba(59, 130, 246, 0.62) 48%,
            transparent 73%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: opacity 180ms ease;
        }
        .thumbs-panel::after {
          z-index: 0;
          inset: -7px;
          opacity: 0;
          background: radial-gradient(
            128px circle at var(--gallery-glow-x) var(--gallery-glow-y),
            rgba(34, 211, 238, 0.32) 0%,
            rgba(167, 139, 250, 0.5) 34%,
            rgba(59, 130, 246, 0.3) 52%,
            transparent 74%
          );
          filter: blur(11px);
          transition: opacity 220ms ease;
        }
        .thumbs-panel.is-glow-active::before {
          opacity: 1;
        }
        .thumbs-panel.is-glow-active::after {
          opacity: 0.58;
        }
        @media (prefers-reduced-motion: reduce) {
          .thumbs-panel::before,
          .thumbs-panel::after {
            transition: none;
          }
        }
        .thumbs {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-content: start;
          gap: 8px;
          min-height: 0;
          overflow: visible;
        }
        .thumbs::before {
          content: "已生成";
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
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
          transform-origin: center center;
          cursor: zoom-in;
        }
        .thumb:hover {
          z-index: 2;
          transform: translateY(-2px) scale(1.04);
          border-color: rgba(196, 181, 253, 0.42);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.32);
        }
        .thumb[aria-current="true"] {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: none;
        }
        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .thumb::after {
          content: none;
          position: absolute;
          left: 7px;
          top: 7px;
          z-index: 1;
          min-width: 42px;
          padding: 3px 8px;
          border: 1px solid rgba(255, 255, 255, 0.32);
          border-radius: 999px;
          color: #ffffff;
          background: rgba(4, 7, 16, 0.48);
          font-size: 10px;
          font-weight: 850;
          line-height: 1.2;
          backdrop-filter: blur(10px);
        }
        .thumbs-pager {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 28px;
        }
        .thumbs-pager[hidden] {
          display: none;
        }
        .thumb-page-btn {
          width: 28px;
          height: 28px;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: rgba(247, 247, 251, 0.82);
          box-shadow: none;
          backdrop-filter: none;
        }
        .thumb-page-btn:hover:not(:disabled),
        .thumb-page-btn:focus-visible:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
        }
        .thumb-page-btn:disabled {
          opacity: 0.32;
          cursor: default;
        }
        .thumb-page-info {
          min-width: 44px;
          text-align: center;
          color: rgba(230, 229, 245, 0.68);
          font-size: 11px;
          font-weight: 800;
        }
        @media (max-width: 860px) {
          .viewer { padding: 12px; }
          .layout {
            grid-template-columns: minmax(0, 1fr);
            height: auto;
            overflow: visible;
          }
          .main-image { max-height: 68vh; }
          .side {
            height: auto;
            overflow: visible;
          }
          .prompt-stack {
            grid-auto-rows: max-content;
            flex: 0 1 auto;
            max-height: none;
            overflow: visible;
          }
          .prompt-switch-card {
            height: auto;
          }
          .prompt-switch-body {
            max-height: none;
          }
          .source-panel { max-height: none; overflow: visible; }
          .thumbs-panel {
            flex: 0 1 auto;
          }
          .thumbs {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      </style>
      <div class="viewer" role="dialog" aria-modal="true" aria-label="Image Spark 图片预览">
        <div class="actions">
          <button class="action-btn download" type="button">下载图片</button>
          ${ENABLE_EAGLE_INTEGRATION ? '<button class="action-btn eagle" type="button">收集到 Eagle</button>' : ''}
          <button class="action-btn close" type="button">关闭</button>
        </div>
        <div class="notice" hidden></div>
        <div class="layout">
          <div class="stage">
            <div class="stage-title"></div>
            <img class="main-image" alt="放大预览">
            <button class="stage-nav stage-prev" type="button" aria-label="上一张">‹</button>
            <button class="stage-nav stage-next" type="button" aria-label="下一张">›</button>
            <div class="zoom-readout" aria-live="polite">100%</div>
          </div>
          <div class="image-zoom" hidden tabindex="-1" role="dialog" aria-modal="true" aria-label="图片放大预览">
            <img alt="整屏图片预览">
            <button class="source-preview-back" type="button" hidden>返回生成图</button>
            <div class="source-preview-caption" hidden></div>
            <div class="zoom-readout" aria-live="polite">100%</div>
          </div>
          <div class="side">
            <div class="prompt-stack"></div>
            <section class="panel source-panel" aria-label="生成来源"></section>
            <div class="panel thumbs-panel">
              <div class="thumbs"></div>
              <div class="thumbs-pager" hidden>
                <button class="thumb-page-btn thumb-page-prev" type="button" aria-label="Previous page">&lsaquo;</button>
                <span class="thumb-page-info"></span>
                <button class="thumb-page-btn thumb-page-next" type="button" aria-label="Next page">&rsaquo;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    shadow.querySelector(".eagle")?.classList.remove("is-collected");

    shadow.querySelector(".close").addEventListener("click", closeViewer);
    shadow.querySelector(".download").addEventListener("click", downloadViewerImage);
    shadow.querySelector(".stage-prev").addEventListener("click", () => setActiveViewerItem(viewerState.activeIndex - 1));
    shadow.querySelector(".stage-next").addEventListener("click", () => setActiveViewerItem(viewerState.activeIndex + 1));
    shadow.querySelector(".source-preview-back").addEventListener("click", (event) => {
      event.stopPropagation();
      closeViewerImageZoom();
    });
    shadow.querySelector(".eagle")?.addEventListener("click", collectViewerImageToEagle);
    const stage = shadow.querySelector(".stage");
    const zoomLayer = shadow.querySelector(".image-zoom");
    const thumbsPanel = shadow.querySelector(".thumbs-panel");
    let thumbsGlowFrame = 0;
    let thumbsGlowPoint = null;
    const updateThumbsGlow = () => {
      thumbsGlowFrame = 0;
      if (!thumbsPanel || !thumbsGlowPoint) return;
      const rect = thumbsPanel.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((thumbsGlowPoint.x - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((thumbsGlowPoint.y - rect.top) / rect.height) * 100));
      thumbsPanel.style.setProperty("--gallery-glow-x", `${x}%`);
      thumbsPanel.style.setProperty("--gallery-glow-y", `${y}%`);
    };
    thumbsPanel?.addEventListener("pointermove", (event) => {
      thumbsGlowPoint = { x: event.clientX, y: event.clientY };
      thumbsPanel.classList.add("is-glow-active");
      if (!thumbsGlowFrame) thumbsGlowFrame = requestAnimationFrame(updateThumbsGlow);
    });
    thumbsPanel?.addEventListener("pointerleave", () => {
      thumbsGlowPoint = null;
      thumbsPanel.classList.remove("is-glow-active");
      if (thumbsGlowFrame) cancelAnimationFrame(thumbsGlowFrame);
      thumbsGlowFrame = 0;
    });
    const bindViewerPanSurface = (surface) => {
      if (!surface) return;
      surface.addEventListener("wheel", (event) => {
        event.preventDefault();
        setViewerZoom(viewerState.zoom + (event.deltaY < 0 ? 0.12 : -0.12));
      }, { passive: false });
      surface.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || !viewerState.spacePressed) return;
        event.preventDefault();
        event.stopPropagation();
        viewerState.panning = true;
        viewerState.panClickSuppressed = false;
        viewerState.panStartX = event.clientX;
        viewerState.panStartY = event.clientY;
        viewerState.panOriginX = viewerState.panX;
        viewerState.panOriginY = viewerState.panY;
        surface.setPointerCapture?.(event.pointerId);
        updateViewerPanUi();
      });
      surface.addEventListener("pointermove", (event) => {
        if (!viewerState.panning) return;
        if ((event.buttons & 1) !== 1) {
          viewerState.panning = false;
          updateViewerPanUi();
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        viewerState.panX = viewerState.panOriginX + event.clientX - viewerState.panStartX;
        viewerState.panY = viewerState.panOriginY + event.clientY - viewerState.panStartY;
        viewerState.panClickSuppressed = true;
        updateViewerPanUi();
      });
      surface.addEventListener("pointerup", (event) => stopViewerPan(surface, event));
      surface.addEventListener("pointercancel", (event) => stopViewerPan(surface, event));
      surface.addEventListener("mouseleave", () => {
        if (!viewerState.panning) return;
        viewerState.panning = false;
        updateViewerPanUi();
      });
      surface.addEventListener("contextmenu", (event) => {
        if (!viewerState.spacePressed && !viewerState.panning && !viewerState.panClickSuppressed) return;
        event.preventDefault();
        event.stopPropagation();
      });
    };
    const stopViewerPan = (surface, event) => {
      if (!viewerState.panning) return;
      event?.preventDefault?.();
      event?.stopPropagation?.();
      viewerState.panning = false;
      if (event?.pointerId !== undefined) surface?.releasePointerCapture?.(event.pointerId);
      updateViewerPanUi();
    };
    bindViewerPanSurface(stage);
    bindViewerPanSurface(zoomLayer);
    let mainImageClickTimer = 0;
    const mainImage = shadow.querySelector(".main-image");
    const zoomImage = shadow.querySelector(".image-zoom img");
    mainImage.draggable = false;
    zoomImage.draggable = false;
    mainImage.addEventListener("dragstart", (event) => event.preventDefault());
    zoomImage.addEventListener("dragstart", (event) => event.preventDefault());
    mainImage.addEventListener("click", () => {
      window.clearTimeout(mainImageClickTimer);
      mainImageClickTimer = window.setTimeout(openViewerImageZoom, 180);
    });
    mainImage.addEventListener("dblclick", (event) => {
      event.preventDefault();
      window.clearTimeout(mainImageClickTimer);
      resetViewerPan();
      setViewerZoom(1);
    });
    stage.addEventListener("dblclick", (event) => {
      if (event.target.closest?.("button")) return;
      event.preventDefault();
      window.clearTimeout(mainImageClickTimer);
      resetViewerPan();
      setViewerZoom(1);
    });
    zoomLayer.addEventListener("click", () => {
      if (viewerState.panClickSuppressed) {
        viewerState.panClickSuppressed = false;
        return;
      }
      closeViewerImageZoom();
    });
    shadow.querySelector(".viewer").addEventListener("click", (event) => {
      if (event.target.classList.contains("viewer")) closeViewer();
    });
    shadow.querySelector(".thumb-page-prev")?.addEventListener("click", () => {
      viewerState.thumbPage = Math.max(1, viewerState.thumbPage - 1);
      renderViewerThumbs();
    });
    shadow.querySelector(".thumb-page-next")?.addEventListener("click", () => {
      const totalPages = Math.max(1, Math.ceil(viewerState.items.length / VIEWER_THUMB_PAGE_SIZE));
      viewerState.thumbPage = Math.min(totalPages, viewerState.thumbPage + 1);
      renderViewerThumbs();
    });

    document.documentElement.append(host);
    viewerPageOverflow = {
      value: document.documentElement.style.getPropertyValue("overflow"),
      priority: document.documentElement.style.getPropertyPriority("overflow")
    };
    document.documentElement.style.overflow = "hidden";
    setActiveViewerItem(viewerState.activeIndex);
    return true;
  }

  document.addEventListener("keydown", (event) => {
    const viewerOpen = Boolean(document.getElementById(VIEWER_ID));
    if (viewerOpen && (event.code === "Space" || event.key === " ")) {
      const target = event.target;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      event.preventDefault();
      viewerState.spacePressed = true;
      updateViewerPanUi();
      return;
    }

    if (viewerOpen && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      const target = event.composedPath?.()[0] || event.target;
      if (!target || !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        event.preventDefault();
        setActiveViewerItem(viewerState.activeIndex + (event.key === "ArrowRight" ? 1 : -1));
        return;
      }
    }

    if (event.key === "Escape" && document.getElementById(VIEWER_ID)) {
      if (closeViewerImageZoom()) {
        event.preventDefault();
        return;
      }
      closeViewer();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (!document.getElementById(VIEWER_ID)) return;
    if (event.code !== "Space" && event.key !== " ") return;
    event.preventDefault();
    if (viewerState.panning) viewerState.panClickSuppressed = true;
    viewerState.spacePressed = false;
    viewerState.panning = false;
    updateViewerPanUi();
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
