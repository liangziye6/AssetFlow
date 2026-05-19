const nodes = {
  dropZone: document.querySelector("#dropZone"),
  fileInput: document.querySelector("#fileInput"),
  previewImage: document.querySelector("#previewImage"),
  imageStack: document.querySelector("#imageStack"),
  imageName: document.querySelector("#imageName"),
  imageSize: document.querySelector("#imageSize"),
  clearImageBtn: document.querySelector("#clearImageBtn"),
  promptInput: document.querySelector("#promptInput"),
  promptResizeHandle: document.querySelector("#promptResizeHandle"),
  copyPromptBtn: document.querySelector("#copyPromptBtn"),
  mascotBtn: document.querySelector("#mascotBtn"),
  reversePromptBtn: document.querySelector("#reversePromptBtn"),
  clearPromptBtn: document.querySelector("#clearPromptBtn"),
  textToImageModeBtn: document.querySelector("#textToImageModeBtn"),
  imageToImageModeBtn: document.querySelector("#imageToImageModeBtn"),
  apiToggleBtn: document.querySelector("#apiToggleBtn"),
  pinWindowBtn: document.querySelector("#pinWindowBtn"),
  resetAllBtn: document.querySelector("#resetAllBtn"),
  sizeMode: document.querySelector("#sizeMode"),
  sizePicker: document.querySelector("#sizePicker"),
  sizePickerBtn: document.querySelector("#sizePickerBtn"),
  sizePickerText: document.querySelector("#sizePickerText"),
  sizeMenu: document.querySelector("#sizeMenu"),
  ratioGrid: document.querySelector("#ratioGrid"),
  resolutionTabs: document.querySelector("#resolutionTabs"),
  modelSelect: document.querySelector("#modelSelect"),
  modelPicker: document.querySelector("#modelPicker"),
  modelPickerBtn: document.querySelector("#modelPickerBtn"),
  modelPickerText: document.querySelector("#modelPickerText"),
  modelMenu: document.querySelector("#modelMenu"),
  widthInput: document.querySelector("#widthInput"),
  heightInput: document.querySelector("#heightInput"),
  countInput: document.querySelector("#countInput"),
  countUpBtn: document.querySelector("#countUpBtn"),
  countDownBtn: document.querySelector("#countDownBtn"),
  generateBtn: document.querySelector("#generateBtn"),
  statusText: document.querySelector("#statusText"),
  galleryMeta: document.querySelector("#galleryMeta"),
  galleryGrid: document.querySelector("#galleryGrid"),
  lightbox: document.querySelector("#lightbox"),
  lightboxClose: document.querySelector("#lightboxClose"),
  lightboxImage: document.querySelector("#lightboxImage"),
  lightboxMeta: document.querySelector("#lightboxMeta"),
  lightboxPrompt: document.querySelector("#lightboxPrompt"),
  lightboxStrip: document.querySelector("#lightboxStrip"),
  lightboxDownloadBtn: document.querySelector("#lightboxDownloadBtn"),
  eagleCollectBtn: document.querySelector("#eagleCollectBtn"),
  apiPanel: document.querySelector("#apiPanel"),
  apiMeta: document.querySelector("#apiMeta"),
  promptApiProvider: document.querySelector("#promptApiProvider"),
  promptApiBaseUrl: document.querySelector("#promptApiBaseUrl"),
  promptApiKey: document.querySelector("#promptApiKey"),
  imageApiProvider: document.querySelector("#imageApiProvider"),
  imageApiBaseUrl: document.querySelector("#imageApiBaseUrl"),
  imageApiKey: document.querySelector("#imageApiKey"),
  promptModelSelect: document.querySelector("#promptModelSelect"),
  apiImageModelSelect: document.querySelector("#apiImageModelSelect"),
  runningHubApiModeField: document.querySelector("#runningHubApiModeField"),
  runningHubApiMode: document.querySelector("#runningHubApiMode"),
  customModelField: document.querySelector("#customModelField"),
  customModelName: document.querySelector("#customModelName"),
  eagleApiMode: document.querySelector("#eagleApiMode"),
  eagleApiBaseUrl: document.querySelector("#eagleApiBaseUrl"),
  eagleApiToken: document.querySelector("#eagleApiToken"),
  saveApiBtn: document.querySelector("#saveApiBtn"),
  apiSaveFeedback: document.querySelector("#apiSaveFeedback")
};

let imageState = {
  src: "",
  name: "",
  width: 0,
  height: 0,
  dataUrl: "",
  objectUrl: ""
};
let imageItems = [];
let activeImageId = "";
let selectedImageIds = new Set();
let lastConsumedContextImageKey = "";

let generationTimer = 0;
let galleryItems = [];
let apiConfig = null;
let activeLightboxItem = null;
let activePageLightboxTabId = 0;
let generationMode = "text";
const runningHubAppDemoCache = new Map();
let promptMeta = {
  source: "",
  chinese: "",
  english: "",
  structure: ""
};

function generationModeLabel(mode) {
  return mode === "image" ? "图生图" : "文生图";
}

function normalizeGalleryMode(value) {
  return value === "text" ? "text" : "image";
}

const API_STORAGE_KEY = "imageSparkApiConfig";
const APP_STATE_KEY = "imageSparkWorkspaceState";
const GALLERY_STORAGE_KEY = "imageSparkGalleryItems";
const PENDING_CONTEXT_IMAGE_KEY = "imageSparkPendingContextImage";
const LOCAL_IMAGE_DB_NAME = "imageSparkLocalImages";
const LOCAL_IMAGE_DB_VERSION = 1;
const LOCAL_IMAGE_STORE = "images";
const MAX_UPLOAD_IMAGES = 4;
const ENABLE_EAGLE_INTEGRATION = false;
const RUNNINGHUB_G2_MODEL = "runninghub-rhart-image-g-2";
const RUNNINGHUB_API_MODE_CONSUMER = "consumer";
const RUNNINGHUB_API_MODE_ENTERPRISE = "enterprise";
const RUNNINGHUB_G2_TEXT_APP_ID = "2046794551444119554";
const RUNNINGHUB_G2_IMAGE_APP_ID = "2046794946094571522";
const RUNNINGHUB_API_PATHS = {
  appDemo: "/api/webapp/apiCallDemo",
  appRun: "/task/openapi/ai-app/run",
  appOutputs: "/task/openapi/outputs",
  appUpload: "/task/openapi/upload",
  standardUpload: "/openapi/v2/media/upload/binary",
  standardQuery: "/openapi/v2/query",
  standardTextToImage: "/openapi/v2/rhart-image-g-2/text-to-image",
  standardImageToImage: "/openapi/v2/rhart-image-g-2/image-to-image"
};
const SIZE_OPTIONS = {
  auto: { label: "自适应", ratio: "auto", resolution: "auto" },
  square: { label: "1:1", ratio: "1:1", resolution: "1k", width: 1024, height: 1024 },
  portrait: { label: "2:3", ratio: "2:3", resolution: "1k", width: 1024, height: 1536 },
  landscape: { label: "3:2", ratio: "3:2", resolution: "1k", width: 1536, height: 1024 },
  "16-9": { label: "16:9", ratio: "16:9", resolution: "1k", width: 1536, height: 864 },
  "9-16": { label: "9:16", ratio: "9:16", resolution: "1k", width: 864, height: 1536 },
  "3-4": { label: "3:4", ratio: "3:4", resolution: "1k", width: 1152, height: 1536 },
  "4-3": { label: "4:3", ratio: "4:3", resolution: "1k", width: 1536, height: 1152 },
  "2k": { label: "16:9", ratio: "16:9", resolution: "2k", width: 1920, height: 1080 },
  "4k": { label: "16:9", ratio: "16:9", resolution: "4k", width: 3840, height: 2160 },
  custom: { label: "自定义", ratio: "custom", resolution: "custom" }
};
const RATIO_OPTIONS = [
  { value: "auto", label: "自适应" },
  { value: "square", label: "1:1" },
  { value: "portrait", label: "2:3" },
  { value: "landscape", label: "3:2" },
  { value: "16-9", label: "16:9" },
  { value: "9-16", label: "9:16" },
  { value: "3-4", label: "3:4" },
  { value: "4-3", label: "4:3" },
  { value: "custom", label: "自定义" }
];
const RESOLUTION_OPTIONS = [
  { value: "auto", label: "自适应" },
  { value: "square", label: "1k" },
  { value: "2k", label: "2k" },
  { value: "4k", label: "4k" }
];
const REVERSE_PROMPT_TEMPLATE = [
  "根据上传图片进行分析，并生成一个能够指导AI作图工具重新创作类似作品的文生图提示词。",
  "提示词需含以下信息:主体内容、场景设定、风格参考、色彩色调、构图视角、附加细节。",
  "请直接输出最终提示词，不要解释分析过程。"
].join("\n");
let isRestoringState = false;

if (new URLSearchParams(window.location.search).has("standalone")) {
  document.documentElement.classList.add("standalone");
}

const cnToEn = [
  ["产品", "product"],
  ["人像", "portrait"],
  ["头像", "profile portrait"],
  ["建筑", "architecture"],
  ["室内", "interior"],
  ["海报", "poster"],
  ["珠宝", "jewelry"],
  ["手表", "watch"],
  ["汽车", "car"],
  ["食物", "food"],
  ["极简", "minimal"],
  ["高级", "premium"],
  ["柔和", "soft"],
  ["自然光", "natural light"],
  ["黑色背景", "black background"],
  ["白色背景", "white background"],
  ["高清", "high detail"],
  ["真实", "photorealistic"],
  ["商业摄影", "commercial photography"],
  ["霓虹", "neon"],
  ["水晶", "crystal"],
  ["紫色", "purple"],
  ["发光", "glowing"]
];

const enToCn = [
  ["product", "产品"],
  ["portrait", "人像"],
  ["profile", "头像"],
  ["architecture", "建筑"],
  ["interior", "室内"],
  ["poster", "海报"],
  ["jewelry", "珠宝"],
  ["watch", "手表"],
  ["car", "汽车"],
  ["food", "食物"],
  ["minimal", "极简"],
  ["premium", "高级"],
  ["soft", "柔和"],
  ["natural light", "自然光"],
  ["black background", "黑色背景"],
  ["white background", "白色背景"],
  ["high detail", "高清细节"],
  ["photorealistic", "真实摄影"],
  ["commercial photography", "商业摄影"],
  ["neon", "霓虹"],
  ["crystal", "水晶"],
  ["purple", "紫色"],
  ["glowing", "发光"]
];

function hasChinese(text) {
  return /[\u4e00-\u9fa5]/.test(text);
}

function setStatus(text) {
  nodes.statusText.textContent = text;
}

function syncPointerGlow(event) {
  const x = `${Math.round((event.clientX / Math.max(1, window.innerWidth)) * 100)}%`;
  const y = `${Math.round((event.clientY / Math.max(1, window.innerHeight)) * 100)}%`;
  document.documentElement.style.setProperty("--mx", x);
  document.documentElement.style.setProperty("--my", y);
}

function playMascot() {
  const actions = ["is-peeking", "is-bouncing", "is-waving"];
  const action = actions[Math.floor(Math.random() * actions.length)];
  nodes.mascotBtn.classList.remove(...actions);
  void nodes.mascotBtn.offsetWidth;
  nodes.mascotBtn.classList.add(action);
  setStatus(nodes.promptInput.value.trim()
    ? "IP 形象已就位，可以继续优化提示词。"
    : "IP 形象已就位，先输入或反推一段提示词。");
}

function workspaceStateFromDom() {
  return {
    image: imageState.dataUrl || imageState.src
      ? {
        src: imageState.dataUrl || imageState.src,
        name: imageState.name,
        width: imageState.width,
        height: imageState.height
      }
      : null,
    images: imageItems.map((item) => ({
      id: item.id,
      src: item.dataUrl || item.src,
      name: item.name,
      width: item.width,
      height: item.height
    })),
    activeImageId,
    selectedImageIds: [...selectedImageIds],
    prompt: nodes.promptInput.value,
    promptMeta,
    generationMode,
    options: {
      sizeMode: nodes.sizeMode.value,
      width: nodes.widthInput.value,
      height: nodes.heightInput.value,
      count: nodes.countInput.value,
      model: nodes.modelSelect.value
    },
    gallery: serializeGalleryItems(galleryItems)
  };
}

function serializeGalleryItems(items) {
  return items.map((item) => {
    const next = { ...item };
    delete next.isGenerating;
    delete next.generationId;
    delete next.progress;
    delete next.progressLabel;
    delete next.localObjectUrl;
    if (next.localStoreId) {
      next.url = next.originalUrl || next.url || "";
    }
    return next;
  });
}

function saveWorkspaceState() {
  if (isRestoringState) return;
  try {
    const state = workspaceStateFromDom();
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(serializeGalleryItems(galleryItems)));
  } catch {
    setStatus("当前图片或图库过大，浏览器本地存储失败。");
  }
}

function clearGalleryStorage() {
  localStorage.removeItem(GALLERY_STORAGE_KEY);
  try {
    const state = JSON.parse(localStorage.getItem(APP_STATE_KEY) || "{}");
    if (state && typeof state === "object") {
      state.gallery = [];
      localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
    }
  } catch {
    localStorage.removeItem(APP_STATE_KEY);
  }
}

function normalizeGalleryItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item && (item.url || item.src || item.localStoreId))
    .map((item, index) => ({
      index: item.index || `#${index + 1}`,
      model: item.model || "Generated Image",
      width: Number(item.width) || 1024,
      height: Number(item.height) || 1024,
      prompt: item.prompt || "",
      promptCn: item.promptCn || "",
      promptEn: item.promptEn || "",
      promptStructure: item.promptStructure || "",
      mode: normalizeGalleryMode(item.mode),
      url: item.url || item.src,
      originalUrl: item.originalUrl || "",
      localPath: item.localPath || "",
      localStoreId: item.localStoreId || "",
      localMimeType: item.localMimeType || "",
      isGenerating: false
    }));
}

function loadStoredGalleryItems(stateGallery = []) {
  const fromState = normalizeGalleryItems(stateGallery);
  let fromStandalone = [];

  try {
    fromStandalone = normalizeGalleryItems(JSON.parse(localStorage.getItem(GALLERY_STORAGE_KEY) || "[]"));
  } catch {
    localStorage.removeItem(GALLERY_STORAGE_KEY);
  }

  const seen = new Set();
  const loaded = [...fromState, ...fromStandalone].filter((item) => {
    const key = item.url;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (!loaded.length) {
    clearGalleryStorage();
  }
  return loaded;
}

function imageItemFromSource(image, index = 0) {
  if (!image?.src) return null;
  const src = image.src;
  return {
    id: image.id || `image-${Date.now()}-${index}`,
    src,
    name: image.name || `图片 ${index + 1}`,
    width: Number(image.width) || 0,
    height: Number(image.height) || 0,
    dataUrl: src.startsWith("data:image/") ? src : "",
    objectUrl: ""
  };
}

function syncActiveImageState() {
  const active = imageItems.find((item) => item.id === activeImageId) || imageItems[0];
  if (!active) {
    imageState = { src: "", name: "", width: 0, height: 0, dataUrl: "", objectUrl: "" };
    selectedImageIds = new Set();
    nodes.previewImage.removeAttribute("src");
    nodes.dropZone.classList.remove("has-image", "is-single-image", "is-multi-image");
    nodes.clearImageBtn.hidden = true;
    nodes.imageName.textContent = "未选择图片";
    nodes.imageSize.textContent = "尺寸待获取";
    renderImageStack();
    return;
  }

  activeImageId = active.id;
  selectedImageIds = new Set([...selectedImageIds].filter((id) => imageItems.some((item) => item.id === id)));
  if (!selectedImageIds.size) {
    selectedImageIds.add(active.id);
  }
  imageState = {
    src: active.src,
    name: active.name,
    width: active.width,
    height: active.height,
    dataUrl: active.dataUrl,
    objectUrl: active.objectUrl
  };
  nodes.previewImage.src = active.src;
  nodes.clearImageBtn.hidden = false;
  nodes.dropZone.classList.add("has-image");
  nodes.dropZone.classList.toggle("is-single-image", imageItems.length === 1);
  nodes.dropZone.classList.toggle("is-multi-image", imageItems.length > 1);
  nodes.imageName.textContent = imageItems.length > 1
    ? `${imageItems.length} 张图片 · ${active.name}`
    : active.name;
  nodes.imageSize.textContent = active.width && active.height
    ? `${active.width} × ${active.height}`
    : "尺寸待获取";
  renderImageStack();
}

function renderImageStack() {
  nodes.imageStack.innerHTML = "";
  nodes.imageStack.dataset.count = String(imageItems.length);
  if (imageItems.length <= 1) return;

  imageItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "image-thumb";
    if (selectedImageIds.has(item.id)) {
      card.classList.add("is-selected");
    }
    if (item.id === activeImageId) {
      card.classList.add("is-active");
    }
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", selectedImageIds.has(item.id) ? "true" : "false");
    card.setAttribute("aria-label", `选择图片 ${index + 1}：${item.name}`);
    card.tabIndex = 0;
    card.title = `${item.name}${item.width && item.height ? ` · ${item.width} × ${item.height}` : ""}。按 Ctrl/Shift 点击可多选批量反推。`;
    card.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const multiSelect = event.ctrlKey || event.metaKey || event.shiftKey;
      if (multiSelect) {
        if (selectedImageIds.has(item.id) && selectedImageIds.size > 1) {
          selectedImageIds.delete(item.id);
        } else {
          selectedImageIds.add(item.id);
        }
      } else {
        selectedImageIds = new Set([item.id]);
      }
      activeImageId = item.id;
      syncActiveImageState();
      if (nodes.sizeMode.value === "auto" && item.width && item.height) {
        syncSizeInputs(item.width, item.height);
      }
      saveWorkspaceState();
      setStatus(selectedImageIds.size > 1
        ? `已选择 ${selectedImageIds.size} 张图片，点击反推提示词会批量处理。`
        : "已选择当前图片，点击反推提示词会处理这张图片。");
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.name;

    const badge = document.createElement("span");
    badge.textContent = `#${index + 1}`;

    const removeButton = document.createElement("button");
    removeButton.className = "image-delete";
    removeButton.type = "button";
    removeButton.title = "删除图片";
    removeButton.setAttribute("aria-label", `删除图片 ${index + 1}`);
    removeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      removeImageItem(item.id);
    });

    card.append(img, badge, removeButton);
    nodes.imageStack.append(card);
  });
}

function removeImageItem(id) {
  const item = imageItems.find((image) => image.id === id);
  if (item?.objectUrl) {
    URL.revokeObjectURL(item.objectUrl);
  }
  clearPendingContextImageIfMatches(item?.src || item?.dataUrl || "");
  imageItems = imageItems.filter((image) => image.id !== id);
  selectedImageIds.delete(id);
  if (activeImageId === id) {
    activeImageId = [...selectedImageIds][0] || imageItems[0]?.id || "";
  }
  syncActiveImageState();
  if (nodes.sizeMode.value === "auto" && imageState.width && imageState.height) {
    syncSizeInputs(imageState.width, imageState.height);
  }
  if (!imageItems.length) {
    clearPendingContextImageIfMatches();
    lastConsumedContextImageKey = "";
  }
  saveWorkspaceState();
  setStatus(imageItems.length ? "图片已删除。" : "图片已清空。");
}

function removeActiveImage() {
  if (!activeImageId) return;
  removeImageItem(activeImageId);
}

function applyRestoredImage(image, images = [], restoredActiveId = "") {
  const restored = Array.isArray(images) && images.length
    ? images.map(imageItemFromSource).filter(Boolean).slice(0, MAX_UPLOAD_IMAGES)
    : [imageItemFromSource(image)].filter(Boolean);
  imageItems = restored;
  activeImageId = restoredActiveId && restored.some((item) => item.id === restoredActiveId)
    ? restoredActiveId
    : restored[0]?.id || "";
  selectedImageIds = new Set([activeImageId].filter(Boolean));
  syncActiveImageState();
}

function loadWorkspaceState() {
  const raw = localStorage.getItem(APP_STATE_KEY);
  if (!raw) {
    galleryItems = loadStoredGalleryItems();
    renderGallery();
    return;
  }

  try {
    isRestoringState = true;
    const state = JSON.parse(raw);
    applyRestoredImage(state.image, state.images, state.activeImageId);
    if (Array.isArray(state.selectedImageIds)) {
      selectedImageIds = new Set(state.selectedImageIds.filter((id) => imageItems.some((item) => item.id === id)));
      if (!selectedImageIds.size && activeImageId) {
        selectedImageIds.add(activeImageId);
      }
      renderImageStack();
    }
    nodes.promptInput.value = state.prompt || "";
    promptMeta = {
      source: state.promptMeta?.source || state.prompt || "",
      chinese: state.promptMeta?.chinese || "",
      english: state.promptMeta?.english || "",
      structure: state.promptMeta?.structure || ""
    };
    const hasRestoredImage = Boolean(imageItems.length || state.image?.src || state.images?.length);
    setGenerationMode(state.generationMode === "image" && hasRestoredImage ? "image" : "text", { silent: true });
    if (state.options) {
      nodes.sizeMode.value = state.options.sizeMode || "auto";
      nodes.modelSelect.value = state.options.model || "gpt-image-1";
      nodes.widthInput.value = state.options.width || 1024;
      nodes.heightInput.value = state.options.height || 1024;
      nodes.countInput.value = state.options.count || 1;
    }
    galleryItems = loadStoredGalleryItems(state.gallery);
    renderGallery();
  } catch {
    localStorage.removeItem(APP_STATE_KEY);
  } finally {
    isRestoringState = false;
  }
}

function maskedKey(value) {
  if (!value) return "";
  return value.length <= 8 ? "已保存" : `${value.slice(0, 4)}...${value.slice(-4)}`;
}

function selectedOptionText(select, fallback = "") {
  return select?.options?.[select.selectedIndex]?.text || fallback;
}

function setSelectValue(select, value, fallback) {
  if (!select) return fallback;
  select.value = value || fallback;
  if (select.value !== value && fallback !== undefined) {
    select.value = fallback;
  }
  return select.value;
}

function defaultBaseUrl(provider) {
  const urls = {
    openai: "https://api.openai.com/v1",
    gemini: "https://generativelanguage.googleapis.com/v1beta",
    apimart: "https://api.apimart.ai/v1",
    runninghub: "https://www.runninghub.cn",
    siliconflow: "https://api.siliconflow.cn/v1",
    replicate: "https://api.replicate.com/v1",
    jimeng: "https://ark.cn-beijing.volces.com/api/v3",
    custom: ""
  };
  return urls[provider] || "";
}

function defaultEagleBaseUrl() {
  return "http://localhost:41595";
}

function currentEagleConfig() {
  const saved = apiConfig?.eagle || {};
  const baseUrl = (nodes.eagleApiBaseUrl?.value || saved.baseUrl || defaultEagleBaseUrl()).trim();
  let token = (nodes.eagleApiToken?.value || saved.token || "").trim();
  if (!token) {
    try {
      token = new URL(baseUrl).searchParams.get("token") || "";
    } catch {
      token = "";
    }
  }
  return {
    mode: nodes.eagleApiMode?.value || saved.mode || "api",
    baseUrl,
    token
  };
}

function setupOptionalLocalIntegrations() {
  if (ENABLE_EAGLE_INTEGRATION) return;

  nodes.eagleApiMode?.closest(".api-section")?.setAttribute("hidden", "");
  if (nodes.eagleCollectBtn) {
    nodes.eagleCollectBtn.hidden = true;
  }
}

function selectedModelLabel() {
  return nodes.modelSelect.options[nodes.modelSelect.selectedIndex]?.text || "GPT Image";
}

function syncModelPicker() {
  if (!nodes.modelPickerText || !nodes.modelMenu) return;
  nodes.modelPickerText.textContent = selectedModelLabel();
  [...nodes.modelMenu.querySelectorAll(".model-option")].forEach((button) => {
    button.setAttribute("aria-selected", button.dataset.value === nodes.modelSelect.value ? "true" : "false");
  });
}

function setModelMenuOpen(isOpen) {
  if (!nodes.modelPicker || !nodes.modelPickerBtn || !nodes.modelMenu) return;
  nodes.modelPicker.classList.toggle("is-open", isOpen);
  nodes.modelPickerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  nodes.modelMenu.hidden = !isOpen;
}

function selectModel(value) {
  nodes.modelSelect.value = value;
  nodes.modelSelect.dispatchEvent(new Event("change", { bubbles: true }));
  setModelMenuOpen(false);
  syncModelPicker();
}

function renderModelMenu() {
  if (!nodes.modelMenu) return;
  nodes.modelMenu.innerHTML = "";
  [...nodes.modelSelect.options].forEach((option) => {
    const button = document.createElement("button");
    button.className = "model-option";
    button.type = "button";
    button.role = "option";
    button.dataset.value = option.value;
    button.textContent = option.text;
    button.addEventListener("click", () => selectModel(option.value));
    nodes.modelMenu.append(button);
  });
  syncModelPicker();
}

function revokeObjectUrl() {
  imageItems.forEach((item) => {
    if (item.objectUrl) {
      URL.revokeObjectURL(item.objectUrl);
    }
  });
}

function extractImageUrlFromHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.querySelector("img")?.src || "";
}

function normalizeDroppedUrl(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const firstLine = text.split(/\r?\n/).find(Boolean) || "";
  return /^https?:\/\/|^data:image\//i.test(firstLine) ? firstLine : "";
}

function readImageDimensions(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("图片读取失败"));
    image.src = src;
  });
}

async function setImage(src, name = "网页图片") {
  revokeObjectUrl();
  const item = {
    id: `image-${Date.now()}-0`,
    src,
    name,
    width: 0,
    height: 0,
    dataUrl: src.startsWith("data:image/") ? src : "",
    objectUrl: ""
  };
  imageItems = [item];
  activeImageId = item.id;
  selectedImageIds = new Set([item.id]);
  syncActiveImageState();
  nodes.imageSize.textContent = "正在获取尺寸...";

  try {
    const size = await readImageDimensions(src);
    item.width = size.width;
    item.height = size.height;
    syncActiveImageState();
    nodes.imageSize.textContent = `${size.width} × ${size.height}`;

    if (nodes.sizeMode.value === "auto") {
      syncSizeInputs(size.width, size.height);
    }
    saveWorkspaceState();
  } catch {
    nodes.imageSize.textContent = "尺寸获取失败";
    saveWorkspaceState();
  }
}

async function addImageFromUrl(src, name = "网页右键图片") {
  const imageUrl = normalizeDroppedUrl(src);
  if (!imageUrl) {
    setStatus("没有识别到可添加的图片地址。");
    return false;
  }

  const existing = imageItems.find((item) => item.src === imageUrl || item.dataUrl === imageUrl);
  if (existing) {
    activeImageId = existing.id;
    selectedImageIds = new Set([existing.id]);
    syncActiveImageState();
    setStatus("这张图片已在插件中，已为你选中。");
    return true;
  }

  const item = {
    id: `image-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    src: imageUrl,
    name,
    width: 0,
    height: 0,
    dataUrl: imageUrl.startsWith("data:image/") ? imageUrl : "",
    objectUrl: ""
  };

  try {
    const size = await readImageDimensions(imageUrl);
    item.width = size.width;
    item.height = size.height;
  } catch {
    item.width = 0;
    item.height = 0;
  }

  imageItems = imageItems.length >= MAX_UPLOAD_IMAGES
    ? [...imageItems.slice(1), item]
    : [...imageItems, item];
  activeImageId = item.id;
  selectedImageIds = new Set([item.id]);
  syncActiveImageState();

  if (nodes.sizeMode.value === "auto" && item.width && item.height) {
    syncSizeInputs(item.width, item.height);
  }

  saveWorkspaceState();
  setStatus("已从右键菜单添加图片。");
  return true;
}

function clearPendingContextImageIfMatches(src = "") {
  if (!window.chrome?.storage?.local) return;

  chrome.storage.local.get(PENDING_CONTEXT_IMAGE_KEY, (result) => {
    const pending = result?.[PENDING_CONTEXT_IMAGE_KEY];
    if (!pending?.src) return;
    if (!src || pending.src === src) {
      chrome.storage.local.remove(PENDING_CONTEXT_IMAGE_KEY);
    }
  });
}

function consumePendingContextImage() {
  if (!window.chrome?.storage?.local) return;

  chrome.storage.local.get(PENDING_CONTEXT_IMAGE_KEY, async (result) => {
    const pending = result?.[PENDING_CONTEXT_IMAGE_KEY];
    if (!pending?.src) return;
    const pendingKey = `${pending.src}|${pending.createdAt || ""}`;
    if (pendingKey === lastConsumedContextImageKey) return;
    lastConsumedContextImageKey = pendingKey;

    chrome.storage.local.remove(PENDING_CONTEXT_IMAGE_KEY);
    try {
      await addImageFromUrl(pending.src, pending.name || "网页右键图片");
    } catch (error) {
      setStatus(error.message || "右键图片添加失败。");
    }
  });
}

window.chrome?.runtime?.onMessage?.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "IMAGE_SPARK_ADD_CONTEXT_IMAGE") return false;

  const payload = message.payload || {};
  const pendingKey = `${payload.src || ""}|${payload.createdAt || ""}`;
  lastConsumedContextImageKey = pendingKey;
  addImageFromUrl(payload.src, payload.name || "网页右键图片")
    .then((ok) => {
      if (window.chrome?.storage?.local) {
        chrome.storage.local.remove(PENDING_CONTEXT_IMAGE_KEY);
      }
      sendResponse({ ok });
    })
    .catch((error) => {
      sendResponse({ ok: false, error: error?.message || "ADD_IMAGE_FAILED" });
    });
  return true;
});

async function setImageFromFile(file) {
  if (!file?.type?.startsWith("image/")) return;
  await setImagesFromFiles([file]);
}

async function setImagesFromFiles(files) {
  const imageFiles = [...(files || [])].filter((file) => file?.type?.startsWith("image/"));
  if (!imageFiles.length) return;

  const availableSlots = Math.max(0, MAX_UPLOAD_IMAGES - imageItems.length);
  const picked = imageFiles.slice(0, availableSlots || MAX_UPLOAD_IMAGES);
  if (!availableSlots && imageItems.length >= MAX_UPLOAD_IMAGES) {
    setStatus(`最多上传 ${MAX_UPLOAD_IMAGES} 张图片。`);
    return;
  }

  const startIndex = imageItems.length;
  const newItems = await Promise.all(picked.map(async (file, index) => {
    const objectUrl = URL.createObjectURL(file);
    const dataUrl = await fileToDataUrl(file);
    const item = {
      id: `image-${Date.now()}-${startIndex + index}`,
      src: objectUrl,
      name: file.name || `本地图片 ${startIndex + index + 1}`,
      width: 0,
      height: 0,
      dataUrl,
      objectUrl
    };

    try {
      const size = await readImageDimensions(objectUrl);
      item.width = size.width;
      item.height = size.height;
    } catch {
      item.width = 0;
      item.height = 0;
    }

    return item;
  }));

  imageItems = [...imageItems, ...newItems].slice(0, MAX_UPLOAD_IMAGES);
  activeImageId = newItems[0]?.id || activeImageId || imageItems[0]?.id || "";
  selectedImageIds = new Set(newItems.length ? newItems.map((item) => item.id) : [activeImageId].filter(Boolean));
  syncActiveImageState();

  if (nodes.sizeMode.value === "auto" && imageState.width && imageState.height) {
    syncSizeInputs(imageState.width, imageState.height);
  }

  saveWorkspaceState();
  const selectedTip = picked.length > 1 ? "已选中新图，可直接批量反推。" : "已选中当前图片。";
  setStatus(imageFiles.length > picked.length
    ? `已添加 ${picked.length} 张图片，最多支持 ${MAX_UPLOAD_IMAGES} 张。${selectedTip}`
    : `已添加 ${picked.length} 张图片。${selectedTip}`);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("图片读取失败"));
    reader.readAsDataURL(file);
  });
}

async function urlToDataUrl(url) {
  if (!url || url.startsWith("data:")) return url || "";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`图片读取失败：HTTP ${response.status}`);
  }
  return fileToDataUrl(await response.blob());
}

function isLocalPreviewHttpUrl(url) {
  try {
    const parsed = new URL(url, location.href);
    return parsed.protocol === "http:"
      && ["127.0.0.1", "localhost"].includes(parsed.hostname)
      && parsed.pathname.startsWith("/Output/");
  } catch {
    return false;
  }
}

async function viewerSafeImageUrl(url, tabUrl = "") {
  if (!isLocalPreviewHttpUrl(url)) return url;

  try {
    const target = new URL(tabUrl || "");
    if (target.protocol !== "https:") return url;
  } catch {
    return url;
  }

  return urlToDataUrl(url);
}

function syncSizeInputs(width, height) {
  nodes.widthInput.value = Math.max(128, Math.min(4096, width || 1024));
  nodes.heightInput.value = Math.max(128, Math.min(4096, height || 1024));
  syncSizePicker();
}

function sizePickerLabel() {
  const mode = nodes.sizeMode.value;
  if (mode === "custom") {
    return `${nodes.widthInput.value || 1024} × ${nodes.heightInput.value || 1024}`;
  }
  if (mode === "auto") {
    return "自适应";
  }
  const option = SIZE_OPTIONS[mode] || SIZE_OPTIONS.auto;
  const resolution = option.resolution && option.resolution !== "auto" ? ` / ${option.resolution}` : "";
  return `${option.label}${resolution}`;
}

function syncSizePicker() {
  if (!nodes.sizePickerText) return;
  const mode = nodes.sizeMode.value;
  nodes.sizePickerText.textContent = sizePickerLabel();
  nodes.ratioGrid?.querySelectorAll(".ratio-option").forEach((button) => {
    const option = SIZE_OPTIONS[mode] || SIZE_OPTIONS.auto;
    button.setAttribute("aria-selected", button.dataset.mode === mode || button.dataset.ratio === option.ratio ? "true" : "false");
  });
  nodes.resolutionTabs?.querySelectorAll(".resolution-option").forEach((button) => {
    const option = SIZE_OPTIONS[mode] || SIZE_OPTIONS.auto;
    button.setAttribute("aria-selected", button.dataset.mode === mode || button.dataset.resolution === option.resolution ? "true" : "false");
  });
}

function setSizeMenuOpen(isOpen) {
  if (!nodes.sizePicker || !nodes.sizePickerBtn || !nodes.sizeMenu) return;
  nodes.sizePicker.classList.toggle("is-open", isOpen);
  nodes.sizePickerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  nodes.sizeMenu.hidden = !isOpen;
}

function selectSizeMode(mode) {
  nodes.sizeMode.value = mode;
  nodes.sizeMode.dispatchEvent(new Event("change", { bubbles: true }));
  setSizeMenuOpen(false);
}

async function copyPrompt() {
  const text = nodes.promptInput.value.trim();
  if (!text) {
    setStatus("提示词为空，暂时没有内容可复制。");
    nodes.promptInput.focus();
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    nodes.promptInput.select();
    document.execCommand("copy");
    nodes.promptInput.setSelectionRange(text.length, text.length);
  }

  nodes.copyPromptBtn.classList.add("is-copied");
  setStatus("复制成功。");
  window.clearTimeout(copyPrompt.resetTimer);
  copyPrompt.resetTimer = window.setTimeout(() => {
    nodes.copyPromptBtn.classList.remove("is-copied");
  }, 1200);
}

function startPromptResize(event) {
  event.preventDefault();
  const startY = event.clientY;
  const startHeight = nodes.promptInput.offsetHeight;

  function move(moveEvent) {
    const nextHeight = Math.max(96, Math.min(360, startHeight + moveEvent.clientY - startY));
    nodes.promptInput.style.height = `${nextHeight}px`;
  }

  function stop() {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
    saveWorkspaceState();
  }

  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function renderSizeMenu() {
  if (!nodes.ratioGrid || !nodes.resolutionTabs) return;
  nodes.ratioGrid.innerHTML = "";
  nodes.resolutionTabs.innerHTML = "";

  RATIO_OPTIONS.forEach((option) => {
    const button = document.createElement("button");
    button.className = "ratio-option";
    button.type = "button";
    button.dataset.mode = option.value;
    button.dataset.ratio = SIZE_OPTIONS[option.value]?.ratio || option.value;
    button.textContent = option.label;
    button.setAttribute("aria-selected", "false");
    button.addEventListener("click", () => selectSizeMode(option.value));
    nodes.ratioGrid.append(button);
  });

  RESOLUTION_OPTIONS.forEach((option) => {
    const button = document.createElement("button");
    button.className = "resolution-option";
    button.type = "button";
    button.dataset.mode = option.value;
    button.dataset.resolution = SIZE_OPTIONS[option.value]?.resolution || option.value;
    button.textContent = option.label;
    button.setAttribute("aria-selected", "false");
    button.addEventListener("click", () => selectSizeMode(option.value));
    nodes.resolutionTabs.append(button);
  });

  syncSizePicker();
}

function syncCustomModelField() {
  const isCustom = nodes.apiImageModelSelect.value === "custom";
  nodes.customModelField.hidden = !isCustom;
  syncRunningHubApiModeField();
}

function syncRunningHubApiModeField() {
  if (!nodes.runningHubApiModeField) return;
  const isRunningHub = nodes.imageApiProvider.value === "runninghub"
    || nodes.apiImageModelSelect.value === RUNNINGHUB_G2_MODEL
    || nodes.modelSelect.value === RUNNINGHUB_G2_MODEL;
  nodes.runningHubApiModeField.hidden = !isRunningHub;
}

function setCountValue(value) {
  const min = Number(nodes.countInput.min) || 1;
  const max = Number(nodes.countInput.max) || 8;
  const next = Math.max(min, Math.min(max, Number(value) || min));
  nodes.countInput.value = String(next);
  nodes.countInput.dispatchEvent(new Event("input", { bubbles: true }));
  nodes.countInput.dispatchEvent(new Event("change", { bubbles: true }));
}

function stepCount(delta) {
  setCountValue((Number(nodes.countInput.value) || 1) + delta);
}

function applySizeMode() {
  const mode = nodes.sizeMode.value;
  const presets = {
    square: [1024, 1024],
    portrait: [1024, 1536],
    landscape: [1536, 1024],
    "16-9": [1536, 864],
    "9-16": [864, 1536],
    "3-4": [1152, 1536],
    "4-3": [1536, 1152],
    "2k": [1920, 1080],
    "4k": [3840, 2160]
  };

  if (mode === "auto" && imageState.width && imageState.height) {
    syncSizeInputs(imageState.width, imageState.height);
    syncSizePicker();
    return;
  }

  if (presets[mode]) {
    syncSizeInputs(...presets[mode]);
  }
  syncSizePicker();
}

function shouldUsePromptApi() {
  const config = currentApiConfigFromForm();
  const hasAuth = Boolean(config.prompt.apiKey || config.prompt.provider === "custom");
  return Boolean(config.prompt.baseUrl && hasAuth && getPromptTargetImages().length);
}

function getPromptTargetImages() {
  const selected = imageItems.filter((item) => selectedImageIds.has(item.id));
  if (selected.length) return selected;
  const active = imageItems.find((item) => item.id === activeImageId);
  return active ? [active] : [];
}

async function callPromptApi(imageItem = imageState) {
  const config = currentApiConfigFromForm();
  const prompt = config.prompt;
  const imageUrl = imageItem.dataUrl || imageItem.src;

  if (!imageUrl || imageUrl.startsWith("blob:")) {
    throw new Error("本地图片需要重新上传一次，才能发送给反推提示词 API。");
  }

  if (prompt.provider === "gemini") {
    const dataUrl = await imageSourceAsDataUrl(imageItem);
    const parsed = parseDataUrl(dataUrl);
    if (!parsed) {
      throw new Error("图片需要是可转换为 base64 的格式。");
    }

    const response = await fetch(baseUrlWithPath(prompt.baseUrl, `/models/${prompt.model}:generateContent`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": prompt.apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inline_data: {
                  mime_type: parsed.mimeType,
                  data: parsed.data
                }
              },
              {
                text: REVERSE_PROMPT_TEMPLATE
              }
            ]
          }
        ]
      })
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    if (!response.ok) {
      throw new Error(friendlyApiErrorMessage(data?.error?.message || `Gemini 反推提示词请求失败：${response.status}`, prompt.providerLabel));
    }

    const content = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!content) {
      throw new Error("Gemini 已返回，但没有识别到文本结果。");
    }

    return content;
  }

  const headers = {
    "Content-Type": "application/json"
  };
  if (prompt.apiKey) {
    headers.Authorization = `Bearer ${prompt.apiKey}`;
  }

  const response = await fetch(baseUrlWithPath(prompt.baseUrl, "/chat/completions"), {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: prompt.model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: REVERSE_PROMPT_TEMPLATE
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      max_tokens: 360
    })
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(friendlyApiErrorMessage(data?.error?.message || data?.message || `反推提示词请求失败：${response.status}`, prompt.providerLabel));
  }

  const content = data?.choices?.[0]?.message?.content || data?.output_text || data?.text;
  if (!content) {
    throw new Error("反推提示词 API 已返回，但没有识别到文本结果。");
  }

  return String(content).trim();
}

async function reversePrompt() {
  if (shouldUsePromptApi()) {
    try {
      const targets = getPromptTargetImages();
      setStatus(targets.length > 1 ? `正在批量反推 ${targets.length} 张图片。` : "正在调用反推提示词 API。");
      const outputs = [];

      for (let index = 0; index < targets.length; index += 1) {
        const item = targets[index];
        setStatus(targets.length > 1
          ? `正在反推 ${index + 1}/${targets.length}：${item.name}`
          : "正在调用反推提示词 API。");
        const content = await callPromptApi(item);
        const meta = await buildBilingualPromptMeta(content);
        outputs.push({
          item,
          meta,
          text: targets.length > 1
            ? `========== 图片 ${index + 1} · ${item.name} ==========\n${meta.chinese || meta.english || content}`
            : (meta.chinese || meta.english || content)
        });
      }

      nodes.promptInput.value = outputs.map((output) => output.text).join("\n\n");
      promptMeta = {
        source: nodes.promptInput.value.trim(),
        chinese: outputs.map((output) => output.meta.chinese).filter(Boolean).join("\n\n"),
        english: outputs.map((output) => output.meta.english).filter(Boolean).join("\n\n"),
        structure: outputs.map((output) => output.meta.structure).filter(Boolean).join("\n\n")
      };
      saveWorkspaceState();
      setStatus(targets.length > 1 ? "已完成批量反推，并同步生成中英文提示词。" : "已通过反推提示词 API 生成中英文提示词。");
      return;
    } catch (error) {
      setStatus(error.message || "反推提示词 API 调用失败，文本框保持空白。");
      return;
    }
  }

  nodes.promptInput.value = "";
  saveWorkspaceState();
  setStatus("请先添加图片并配置反推提示词 API。多图时请点击选择要反推的图片。");
}

function translatePrompt() {
  const current = nodes.promptInput.value.trim();
  if (!current) {
    setStatus("文本框为空，先输入或反推一段提示词。");
    return;
  }

  if (hasChinese(current)) {
    let translated = current;
    cnToEn.forEach(([cn, en]) => {
      translated = translated.replaceAll(cn, en);
    });
    nodes.promptInput.value = translated === current
      ? `${current}\n\nEnglish prompt: polished, high-detail, cinematic composition, clean visual focus.`
      : translated;
    saveWorkspaceState();
    setStatus("已做中文到英文的轻量转换。");
    return;
  }

  let translated = current;
  enToCn.forEach(([en, cn]) => {
    translated = translated.replaceAll(new RegExp(en, "gi"), cn);
  });
  nodes.promptInput.value = translated === current
    ? `${current}\n\n中文提示词：高质感画面，主体清晰，构图干净，细节丰富。`
    : translated;
  saveWorkspaceState();
  setStatus("已做英文到中文的轻量转换。");
}

function translationInstruction(text, targetLanguage = "") {
  if (targetLanguage === "en" || (!targetLanguage && hasChinese(text))) {
    return [
      "把下面内容翻译并整理成英文 AI 文生图提示词。",
      "要求：保留主体、场景、风格、色彩、构图、细节；直接输出英文提示词，不要解释。",
      "",
      text
    ].join("\n");
  }

  if (targetLanguage === "zh") {
    return [
      "把下面 AI 文生图提示词翻译成自然中文。",
      "要求：保留主体、场景、风格、色彩、构图、细节；直接输出中文，不要解释。",
      "",
      text
    ].join("\n");
  }

  return [
    "把下面英文 AI 文生图提示词翻译成自然中文。",
    "要求：保留主体、场景、风格、色彩、构图、细节；直接输出中文，不要解释。",
    "",
    text
  ].join("\n");
}

async function callTextTranslateApi(text, targetLanguage = "") {
  const config = currentApiConfigFromForm();
  const prompt = config.prompt;

  if (!prompt.baseUrl || !prompt.apiKey) {
    throw new Error("no translate api");
  }

  const instruction = translationInstruction(text, targetLanguage);

  if (prompt.provider === "gemini") {
    const response = await fetch(baseUrlWithPath(prompt.baseUrl, `/models/${prompt.model}:generateContent`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": prompt.apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: instruction }] }]
      })
    });

    const raw = await response.text();
    const data = raw ? JSON.parse(raw) : {};
    if (!response.ok) {
      throw new Error(data?.error?.message || `翻译 API 请求失败：${response.status}`);
    }

    const translated = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();
    if (!translated) throw new Error("翻译 API 没有返回文本。");
    return translated;
  }

  const response = await fetch(baseUrlWithPath(prompt.baseUrl, "/chat/completions"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${prompt.apiKey}`
    },
    body: JSON.stringify({
      model: prompt.model,
      messages: [{ role: "user", content: instruction }],
      max_tokens: 500
    })
  });

  const raw = await response.text();
  const data = raw ? JSON.parse(raw) : {};
  if (!response.ok) {
    throw new Error(data?.error?.message || data?.message || `翻译 API 请求失败：${response.status}`);
  }

  const translated = data?.choices?.[0]?.message?.content || data?.output_text || data?.text;
  if (!translated) throw new Error("翻译 API 没有返回文本。");
  return String(translated).trim();
}

function localTranslateToEnglish(text) {
  const phraseMap = [
    ["火山爆发", "volcanic eruption"],
    ["火山", "volcano"],
    ["爆发", "eruption"],
    ["熔岩", "lava"],
    ["烟雾", "smoke"],
    ["麦克风", "microphone"],
    ["羽毛球拍", "badminton racket"],
    ["吉祥物", "mascot"],
    ["薯条", "french fries"],
    ["人物", "character"],
    ["人像", "portrait"],
    ["产品", "product"],
    ["海报", "poster"],
    ["商业摄影", "commercial photography"],
    ["白色背景", "white background"],
    ["黑色背景", "black background"],
    ["背景空间留白", "generous negative space"],
    ["留白", "negative space"],
    ["简约高端", "minimalist, premium"],
    ["简约", "minimalist"],
    ["高端", "premium"],
    ["高级", "luxury"],
    ["可爱", "cute"],
    ["真实", "photorealistic"],
    ["柔和", "soft"],
    ["发光", "glowing"],
    ["微光", "subtle glow"],
    ["玻璃", "glass"],
    ["水晶", "crystal"],
    ["紫色", "purple"],
    ["蓝色", "blue"],
    ["干净", "clean"],
    ["清晰", "sharp"],
    ["高细节", "high detail"],
    ["电影感", "cinematic"],
    ["正面", "front view"],
    ["侧面", "side view"],
    ["俯视", "top-down view"],
    ["居中", "centered composition"]
  ];

  let translated = text;
  phraseMap.forEach(([cn, en]) => {
    translated = translated.replaceAll(cn, en);
  });
  translated = translated
    .replace(/[，、；。]/g, ", ")
    .replace(/[：:]/g, ": ")
    .replace(/\s+/g, " ")
    .trim();

  if (hasChinese(translated)) {
    const readable = translated.replace(/[\u4e00-\u9fa5]+/g, "").replace(/\s*,\s*,/g, ",").trim();
    return `${readable ? `${readable}, ` : ""}high-quality AI image, polished visual design, clean subject separation, refined lighting, balanced composition, rich details`;
  }

  return translated;
}

function localTranslateToChinese(text) {
  const phraseMap = [
    ["volcanic eruption", "火山爆发"],
    ["volcano", "火山"],
    ["lava", "熔岩"],
    ["smoke", "烟雾"],
    ["microphone", "麦克风"],
    ["badminton racket", "羽毛球拍"],
    ["mascot", "吉祥物"],
    ["french fries", "薯条"],
    ["portrait", "人像"],
    ["product", "产品"],
    ["poster", "海报"],
    ["commercial photography", "商业摄影"],
    ["white background", "白色背景"],
    ["black background", "黑色背景"],
    ["negative space", "留白"],
    ["minimalist", "简约"],
    ["premium", "高端"],
    ["luxury", "高级"],
    ["cute", "可爱"],
    ["photorealistic", "真实摄影"],
    ["soft", "柔和"],
    ["glowing", "发光"],
    ["glass", "玻璃"],
    ["crystal", "水晶"],
    ["purple", "紫色"],
    ["blue", "蓝色"],
    ["clean", "干净"],
    ["sharp", "清晰"],
    ["high detail", "高细节"],
    ["cinematic", "电影感"],
    ["front view", "正面视角"],
    ["side view", "侧面视角"],
    ["centered composition", "居中构图"]
  ];

  let translated = text;
  phraseMap.forEach(([en, cn]) => {
    translated = translated.replaceAll(new RegExp(en, "gi"), cn);
  });
  return translated;
}

function extractPromptStructureText(text) {
  const matches = [...String(text || "").matchAll(/\*\*([^:*：]+)[:：]?\*\*\s*([\s\S]*?)(?=\n?\s*\*\*[^:*：]+[:：]?\*\*|$)/g)];
  if (matches.length) {
    return matches
      .map((match) => `${match[1].trim()}：${match[2].trim()}`)
      .filter((line) => line.length > 1)
      .join("\n\n");
  }

  return String(text || "")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 6)
    .join("\n\n");
}

async function buildBilingualPromptMeta(text) {
  const source = String(text || "").trim();
  if (!source) {
    return { source: "", chinese: "", english: "", structure: "" };
  }

  const meta = {
    source,
    chinese: "",
    english: "",
    structure: ""
  };

  if (hasChinese(source)) {
    meta.chinese = source;
    try {
      meta.english = await callTextTranslateApi(source, "en");
    } catch {
      meta.english = localTranslateToEnglish(source);
    }
  } else {
    meta.english = source;
    try {
      meta.chinese = await callTextTranslateApi(source, "zh");
    } catch {
      meta.chinese = localTranslateToChinese(source);
    }
  }

  meta.structure = summarizeChineseStructure(meta.chinese || source);
  return meta;
}

function promptMetaFromInput() {
  const text = nodes.promptInput.value.trim();
  if (!text) {
    return { source: "", chinese: "", english: "", structure: "" };
  }
  if (promptMeta.source === text && (promptMeta.chinese || promptMeta.english)) {
    return promptMeta;
  }
  return {
    source: text,
    chinese: hasChinese(text) ? text : "",
    english: hasChinese(text) ? "" : text,
    structure: hasChinese(text) ? summarizeChineseStructure(text) : extractPromptStructureText(text)
  };
}

async function translatePromptSmart() {
  const current = nodes.promptInput.value.trim();
  if (!current) {
    setStatus("文本框为空，先输入或反推一段提示词。");
    return;
  }

  try {
    setStatus("正在翻译提示词...");
    nodes.promptInput.value = await callTextTranslateApi(current);
    saveWorkspaceState();
    setStatus(hasChinese(current) ? "已通过 API 翻译为英文提示词。" : "已通过 API 翻译为中文。");
    return;
  } catch {
    nodes.promptInput.value = hasChinese(current)
      ? localTranslateToEnglish(current)
      : localTranslateToChinese(current);
    saveWorkspaceState();
    setStatus("未检测到可用翻译 API，已使用本地轻量转译。");
  }
}

function clearPrompt() {
  nodes.promptInput.value = "";
  promptMeta = { source: "", chinese: "", english: "", structure: "" };
  setStatus("提示词已清空。");
  saveWorkspaceState();
}

function setGenerationMode(mode, options = {}) {
  generationMode = mode === "text" ? "text" : "image";
  nodes.textToImageModeBtn?.setAttribute("aria-selected", generationMode === "text" ? "true" : "false");
  nodes.imageToImageModeBtn?.setAttribute("aria-selected", generationMode === "image" ? "true" : "false");

  if (!options.silent) {
    setStatus(generationMode === "image"
      ? "已切换到图生图：生成时会参考上传区的图片。"
      : "已切换到文生图：生成时只使用提示词。");
    saveWorkspaceState();
  }
}

function hasChineseHeading(text) {
  return /(?:主体|场景|风格|色彩|构图|细节|文字|光影|镜头|背景|材质|情绪)[^，。；\n]{0,8}[：:]/.test(String(text || ""));
}

function summarizeChineseStructure(text) {
  const source = String(text || "").trim();
  if (!source) return "";
  if (hasChineseHeading(source) || /\*\*[^*]+[:：]?\*\*/.test(source)) return source;

  const sentences = source
    .replace(/\s+/g, "")
    .split(/(?<=[。！？；])/)
    .map((part) => part.trim())
    .filter(Boolean);
  const pick = (pattern, fallbackIndex = -1) => {
    const found = sentences.find((sentence) => pattern.test(sentence));
    return found || (fallbackIndex >= 0 ? sentences[fallbackIndex] : "");
  };
  const sections = [
    ["主体内容", pick(/人物|角色|主体|人像|产品|动物|物体|男人|女人|男|女/, 0)],
    ["场景设定", pick(/背景|场景|环境|空间|室内|户外|画布|海报|封面/, 1)],
    ["风格参考", pick(/风格|美学|电影感|摄影|插画|概念|平面设计|杂志|海报/)],
    ["光影色彩", pick(/色彩|颜色|色调|光|影|高对比|明亮|昏暗|红|蓝|紫|黑|白|金/)],
    ["构图视角", pick(/构图|视角|镜头|居中|近景|半身|全身|俯视|仰视|正面|侧面/)],
    ["附加细节", pick(/细节|文字|标题|材质|纹理|装饰|配饰|服装|盔甲|面具/)]
  ];

  return sections
    .filter(([, value]) => value)
    .map(([title, value]) => `**${title}:** ${value}`)
    .join("\n");
}

function openPinnedWindow() {
  saveWorkspaceState();
  const targetUrl = "popup.html?standalone=1";

  if (window.chrome?.runtime?.sendMessage) {
    chrome.runtime.sendMessage({ type: "OPEN_SIDE_PANEL" }, (response) => {
      if (chrome.runtime.lastError || !response?.ok) {
        window.open(targetUrl, "image-spark-window", "width=1040,height=860,resizable=yes,scrollbars=yes");
      }
    });
    return;
  }

  window.open(targetUrl, "image-spark-window", "width=1040,height=860,resizable=yes,scrollbars=yes");
}

function clearGenerationState() {
  window.clearInterval(generationTimer);
  galleryItems = galleryItems.filter((item) => !item.isGenerating);
  renderGallery();
}

function resetAll() {
  nodes.promptInput.value = "";
  promptMeta = { source: "", chinese: "", english: "", structure: "" };
  clearGenerationState();
  saveWorkspaceState();
  setStatus("已清空提示词和生成中占位，图片、图库和选项已保留。");
}

function normalizedProgress(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.max(0, Math.min(99, Math.round(number)));
}

function updateGeneratingItemProgress(target, progress, label = "") {
  const targetIndex = galleryItemIndexForTarget(target);
  if (targetIndex === -1) return;
  const nextProgress = normalizedProgress(progress);
  if (nextProgress === null) return;
  galleryItems[targetIndex] = {
    ...galleryItems[targetIndex],
    progress: nextProgress,
    progressLabel: label || galleryItems[targetIndex].progressLabel || ""
  };
  renderGallery();
}

function openLocalImageDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(LOCAL_IMAGE_DB_NAME, LOCAL_IMAGE_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(LOCAL_IMAGE_STORE)) {
        db.createObjectStore(LOCAL_IMAGE_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withLocalImageStore(mode, callback) {
  const db = await openLocalImageDb();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(LOCAL_IMAGE_STORE, mode);
      const store = transaction.objectStore(LOCAL_IMAGE_STORE);
      const result = callback(store);
      transaction.oncomplete = () => resolve(result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function blobFromImageUrl(url) {
  if (!url) throw new Error("图片地址为空");
  if (url.startsWith("data:image/")) {
    const response = await fetch(url);
    return response.blob();
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`图片下载失败：${response.status}`);
  }
  return response.blob();
}

async function saveImageToIndexedDb(item) {
  const blob = await blobFromImageUrl(item.url);
  const id = item.localStoreId || `image-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  await withLocalImageStore("readwrite", (store) => {
    store.put({
      id,
      blob,
      mimeType: blob.type || "image/png",
      createdAt: Date.now(),
      meta: {
        model: item.model,
        index: item.index,
        width: item.width,
        height: item.height
      }
    });
  });
  const localObjectUrl = URL.createObjectURL(blob);
  return {
    ...item,
    originalUrl: item.originalUrl || item.url,
    localStoreId: id,
    localMimeType: blob.type || "image/png",
    localObjectUrl,
    url: localObjectUrl
  };
}

async function imageFromIndexedDb(id) {
  if (!id) return null;
  return withLocalImageStore("readonly", (store) => requestToPromise(store.get(id)));
}

async function hydrateGalleryItemsFromIndexedDb() {
  let changed = false;
  const hydrated = [];

  for (const item of galleryItems) {
    if (!item.localStoreId) {
      hydrated.push(item);
      continue;
    }

    try {
      const stored = await imageFromIndexedDb(item.localStoreId);
      if (!stored?.blob) {
        changed = true;
        continue;
      }
      const localObjectUrl = URL.createObjectURL(stored.blob);
      hydrated.push({
        ...item,
        localObjectUrl,
        localMimeType: stored.mimeType || item.localMimeType || "image/png",
        url: localObjectUrl
      });
      changed = true;
    } catch {
      hydrated.push(item);
    }
  }

  if (changed) {
    galleryItems = hydrated;
    if (!galleryItems.length) {
      clearGalleryStorage();
    }
    renderGallery();
  }
}

function removeBrokenGalleryItem(item) {
  const before = galleryItems.length;
  galleryItems = galleryItems.filter((galleryItem) => galleryItem !== item && galleryItem.url !== item.url);
  if (galleryItems.length === before) return;

  if (!galleryItems.length) {
    clearGalleryStorage();
    setStatus("图库图片记录已失效，已清空本地图库记录。");
  } else {
    saveWorkspaceState();
    setStatus("已移除一条失效的图库图片记录。");
  }
  renderGallery();
}

async function handleGalleryImageError(item) {
  if (item.localStoreId) {
    try {
      const stored = await imageFromIndexedDb(item.localStoreId);
      if (stored?.blob) {
        const localObjectUrl = URL.createObjectURL(stored.blob);
        galleryItems = galleryItems.map((galleryItem) => galleryItem === item || galleryItem.localStoreId === item.localStoreId
          ? { ...galleryItem, localObjectUrl, url: localObjectUrl }
          : galleryItem);
        renderGallery();
        return;
      }
    } catch {
      // Fall through and remove the broken record.
    }
  }
  removeBrokenGalleryItem(item);
}

async function persistGalleryItemImage(item) {
  if (!item?.url) {
    return item;
  }

  try {
    const storedItem = await saveImageToIndexedDb(item);
    setStatus("图片已保存到浏览器本地图库。");
    return storedItem;
  } catch (error) {
    setStatus(`图片已生成，但保存到本地图库失败：${error.message || "浏览器本地存储不可用"}。`);
    return item;
  }
}

function createGalleryItem(item) {
  const card = document.createElement("article");
  card.className = "gallery-card";
  if (item.isGenerating) {
    card.classList.add("is-generating");
  }
  card.dataset.label = generationModeLabel(item.mode);
  card.title = `${item.model} · ${item.width} × ${item.height}`;
  card.style.setProperty("--image-ratio", `${Math.max(1, item.width || 1)} / ${Math.max(1, item.height || 1)}`);

  const visual = document.createElement("div");
  visual.className = "gallery-visual";
  if (item.isGenerating) {
    const video = document.createElement("video");
    video.className = "gallery-loading-video";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("aria-hidden", "true");
    const movSource = document.createElement("source");
    movSource.src = "assets/loading-animation.mov";
    movSource.type = "video/quicktime";
    const mp4Source = document.createElement("source");
    mp4Source.src = "assets/loading-animation.mp4";
    mp4Source.type = "video/mp4";
    video.append(movSource, mp4Source);

    const label = document.createElement("span");
    label.className = "gallery-loading-label";
    label.textContent = item.progressLabel || "正在生成中";

    const progress = document.createElement("span");
    progress.className = "gallery-progress";
    progress.textContent = `${Math.max(0, Math.min(99, Math.round(Number(item.progress) || 0)))}%`;

    const progressWrap = document.createElement("div");
    progressWrap.className = "gallery-progress-wrap";
    progressWrap.append(label, progress);
    visual.append(video, progressWrap);
  } else if (item.url) {
    const img = document.createElement("img");
    img.src = item.url;
    img.alt = item.index;
    img.addEventListener("error", () => handleGalleryImageError(item), { once: true });
    visual.append(img);
    const downloadButton = document.createElement("button");
    downloadButton.className = "gallery-download-btn";
    downloadButton.type = "button";
    downloadButton.title = "下载图片";
    downloadButton.setAttribute("aria-label", `下载 ${item.index}`);
    downloadButton.addEventListener("click", (event) => {
      event.stopPropagation();
      downloadImage(item);
    });
    visual.append(downloadButton);
  } else {
    visual.textContent = item.index;
  }

  const detail = document.createElement("div");
  detail.className = "gallery-detail";

  const title = document.createElement("strong");
  title.textContent = item.model;

  const meta = document.createElement("span");
  meta.textContent = `${item.width} × ${item.height} · ${item.index}`;

  const prompt = document.createElement("span");
  prompt.textContent = item.prompt || "无提示词";

  detail.append(title, meta, prompt);
  card.append(visual, detail);
  if (!item.isGenerating) {
    card.addEventListener("click", () => openLightbox(item));
  }
  return card;
}

async function openLightbox(item, options = {}) {
  if (!item.url) return;
  if (!options.forceLocal && await openPageLightbox(item)) {
    return;
  }
  openLocalLightbox(item);
}

function openLocalLightbox(item) {
  activePageLightboxTabId = 0;
  activeLightboxItem = item;
  nodes.eagleCollectBtn.classList.remove("is-collected");
  nodes.eagleCollectBtn.textContent = "收集到 Eagle";
  nodes.lightboxImage.src = item.url;
  nodes.lightboxImage.title = "点击右侧图片可切换预览";
  nodes.lightboxMeta.textContent = `${item.model} · ${item.width} × ${item.height} · ${item.index}`;
  nodes.lightboxPrompt.textContent = item.prompt || "无提示词";
  renderLightboxStrip();
  nodes.lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
}

async function openPageLightbox(item) {
  if (!window.chrome?.tabs || !window.chrome?.scripting || !window.chrome?.runtime?.id) {
    return false;
  }

  const tab = await queryActiveTab();
  if (!tab?.id || !canInjectIntoTab(tab)) {
    return false;
  }

  const rawItems = galleryItems
    .filter((galleryItem) => !galleryItem.isGenerating && galleryItem.url)
    .map((galleryItem) => ({
      index: galleryItem.index,
      model: galleryItem.model,
      width: galleryItem.width,
      height: galleryItem.height,
      prompt: galleryItem.prompt || "",
      promptCn: galleryItem.promptCn || "",
      promptEn: galleryItem.promptEn || "",
      promptStructure: galleryItem.promptStructure || "",
      mode: normalizeGalleryMode(galleryItem.mode),
      url: galleryItem.url,
      originalUrl: galleryItem.originalUrl || galleryItem.url
    }));
  const activeIndex = Math.max(0, rawItems.findIndex((galleryItem) => galleryItem.index === item.index));

  let items;
  try {
    items = await Promise.all(rawItems.map(async (galleryItem) => ({
      ...galleryItem,
      url: await viewerSafeImageUrl(galleryItem.url, tab.url)
    })));
  } catch {
    return false;
  }

  const injected = await injectContentScript(tab.id);
  if (!injected) {
    return false;
  }

  const response = await sendTabMessage(tab.id, {
    type: "IMAGE_SPARK_OPEN_VIEWER",
    payload: {
      items,
      activeIndex,
      eagle: currentEagleConfig()
    }
  });
  const ok = Boolean(response?.ok);
  activePageLightboxTabId = ok ? tab.id : 0;
  return ok;
}

function queryActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        resolve(null);
        return;
      }
      resolve(tabs?.[0] || null);
    });
  });
}

function canInjectIntoTab(tab) {
  return /^(https?:|file:)/i.test(tab.url || "");
}

function injectContentScript(tabId) {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        files: ["content.js"]
      },
      () => {
        resolve(!chrome.runtime.lastError);
      }
    );
  });
}

function sendTabMessage(tabId, message) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        resolve(null);
        return;
      }
      resolve(response || null);
    });
  });
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

function closeLightbox() {
  activeLightboxItem = null;
  nodes.lightbox.hidden = true;
  nodes.lightboxImage.removeAttribute("src");
  nodes.lightboxMeta.textContent = "";
  nodes.lightboxPrompt.textContent = "";
  nodes.lightboxStrip.innerHTML = "";
  document.body.classList.remove("lightbox-open");
}

async function closePageLightbox() {
  if (!activePageLightboxTabId || !window.chrome?.tabs) {
    return false;
  }

  const response = await sendTabMessage(activePageLightboxTabId, {
    type: "IMAGE_SPARK_CLOSE_VIEWER"
  });
  activePageLightboxTabId = 0;
  return Boolean(response?.ok);
}

function renderLightboxStrip() {
  nodes.lightboxStrip.innerHTML = "";
  const items = galleryItems.filter((item) => !item.isGenerating && item.url);
  items.forEach((item) => {
    const button = document.createElement("button");
    button.className = "lightbox-thumb";
    button.type = "button";
    button.setAttribute("aria-current", item === activeLightboxItem ? "true" : "false");
    button.title = `${item.model} · ${item.index}`;
    const img = document.createElement("img");
    img.src = item.url;
    img.alt = item.index;
    button.append(img);
    button.addEventListener("click", () => openLightbox(item, { forceLocal: true }));
    nodes.lightboxStrip.append(button);
  });
}

function safeFilename(value) {
  return String(value || "image-spark")
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80) || "image-spark";
}

async function downloadImage(item = activeLightboxItem) {
  if (!item?.url) {
    setStatus("没有可下载的图片。");
    return;
  }

  const filename = `${safeFilename(`${item.model}-${item.index}`)}.png`;
  if (!item.url.startsWith("data:")) {
    try {
      const response = await fetch(item.url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      triggerDownload(objectUrl, filename);
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1200);
      setStatus("已开始下载图片。");
      return;
    } catch {
      // Fall back to the source URL. Some providers disallow blob fetching,
      // but the browser may still allow saving the direct image link.
    }
  }

  triggerDownload(item.url, filename);
  setStatus("已开始下载图片。");
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

async function collectToEagle() {
  if (!activeLightboxItem?.url) {
    setStatus("没有可收集的图片。");
    return;
  }

  if (await collectToEagleApi(activeLightboxItem)) {
    return;
  }

  if (currentEagleConfig().mode === "api") {
    return;
  }

  collectToEagleProtocol(activeLightboxItem);
}

async function collectToEagleApi(item) {
  const eagle = currentEagleConfig();
  if (eagle.mode !== "api") {
    return false;
  }

  try {
    const response = await sendRuntimeMessage({
      type: "IMAGE_SPARK_COLLECT_EAGLE",
      payload: {
        item: {
          url: item.url,
          model: item.model,
          index: item.index,
          prompt: item.prompt || "",
          website: window.location.href
        },
        eagle
      }
    });
    if (!response?.ok) {
      throw new Error(response?.error || "EAGLE_API_FAILED");
    }

    setStatus("已通过 Eagle Local API 收集图片。");
    nodes.eagleCollectBtn.classList.add("is-collected");
    nodes.eagleCollectBtn.textContent = "已收集";
    return true;
  } catch {
    setStatus("Eagle Local API 暂不可用，请确认 Eagle 已开启本地 API 服务。");
    return false;
  }
}

function collectToEagleProtocol(item) {
  const params = new URLSearchParams({
    url: item.url,
    name: `${item.model}-${item.index}`,
    annotation: item.prompt || ""
  });

  window.location.href = `eagle://save?${params.toString()}`;
  setStatus("已尝试发送到 Eagle。如果没有响应，可以在大图上右键另存。");
}

function renderGallery() {
  nodes.galleryGrid.innerHTML = "";

  if (!galleryItems.length) {
    nodes.galleryMeta.textContent = "图库为空";
    return;
  }

  const completedCount = galleryItems.filter((item) => !item.isGenerating).length;
  const generatingCount = galleryItems.length - completedCount;
  nodes.galleryMeta.textContent = generatingCount
    ? `${completedCount} 张 · ${generatingCount} 张生成中`
    : `${completedCount} 张 · 本地记录`;
  galleryItems.forEach((item) => {
    nodes.galleryGrid.append(createGalleryItem(item));
  });
}

function baseUrlWithPath(baseUrl, path) {
  const rawBase = String(baseUrl || "").trim();
  const cleanPath = `/${String(path || "").replace(/^\/+/, "")}`;
  if (!rawBase) return "";

  try {
    const url = new URL(rawBase);
    const basePath = url.pathname.replace(/\/+$/, "");
    const baseHasPath = basePath && basePath !== "/";
    if (baseHasPath && basePath.endsWith(cleanPath)) {
      return url.toString();
    }
    const knownApiPrefixes = [
      "/openapi/v2",
      "/task/openapi",
      "/api/webapp",
      "/api/v3",
      "/v1",
      "/v1beta"
    ];
    const baseHasKnownApiPrefix = knownApiPrefixes.some((prefix) => (
      basePath === prefix || basePath.startsWith(`${prefix}/`)
    ));
    const pathHasKnownApiPrefix = knownApiPrefixes.some((prefix) => (
      cleanPath === prefix || cleanPath.startsWith(`${prefix}/`)
    ));
    const sharedApiPrefix = knownApiPrefixes.some((prefix) => (
      basePath.startsWith(`${prefix}/`)
      && cleanPath.startsWith(`${prefix}/`)
    ));
    if (!baseHasPath || basePath === cleanPath || cleanPath.startsWith(`${basePath}/`) || sharedApiPrefix || (baseHasKnownApiPrefix && pathHasKnownApiPrefix)) {
      url.pathname = cleanPath;
    } else {
      url.pathname = `${basePath}/${cleanPath.slice(1)}`.replace(/\/{2,}/g, "/");
    }
    return url.toString();
  } catch {
    const cleanBase = rawBase.replace(/\/+$/, "");
    if (cleanBase.endsWith(cleanPath)) return cleanBase;
    return `${cleanBase}${cleanPath}`;
  }
}

function isLocalPreviewPage() {
  return /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i.test(window.location.href);
}

function networkErrorMessage(error, url) {
  const target = (() => {
    try {
      return new URL(url).host;
    } catch {
      return "远程 API";
    }
  })();

  if (error?.message === "Failed to fetch" && isLocalPreviewPage()) {
    return `本地预览页被浏览器跨域策略拦截，无法直接请求 ${target}。请加载 dist/image-prompt-builder 为 Chrome 扩展后再生成图片。`;
  }

  if (error?.message === "Failed to fetch") {
    return `无法连接到 ${target}。请检查 Base URL、网络连接，或确认该接口允许当前插件访问。`;
  }

  return error?.message || "网络请求失败。";
}

function isSuccessfulApiCode(code) {
  if (code === undefined || code === null || code === "") return true;
  return ["0", "200", "success", "ok"].includes(String(code).trim().toLowerCase());
}

function normalizedApiCode(code) {
  return String(code ?? "").trim();
}

async function fetchJson(url, options, contextLabel = "请求", requestOptions = {}) {
  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error(networkErrorMessage(error, url));
  }

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(data?.error?.message || data?.errorMessage || data?.message || `${contextLabel}失败：${response.status}`);
  }

  const allowedCodes = new Set((requestOptions.allowCodes || []).map(normalizedApiCode));
  const code = normalizedApiCode(data?.code);
  if (!isSuccessfulApiCode(data?.code) && !allowedCodes.has(code)) {
    throw new Error(data?.error?.message || data?.errorMessage || data?.message || `${contextLabel}失败：${data.code}`);
  }

  const errorCode = normalizedApiCode(data?.errorCode);
  if (data?.errorCode && !allowedCodes.has(errorCode)) {
    throw new Error(data?.errorMessage || data?.message || `${contextLabel}失败：${data.errorCode}`);
  }

  return data;
}

function friendlyApiErrorMessage(message, providerLabel = "当前服务") {
  const text = String(message || "");
  if (/Standard Model API is restricted to Enterprise-Shared API Keys/i.test(text)) {
    return `${providerLabel} 权限拒绝：RunningHub Standard-API 需要企业共享 Key。请刷新插件，使用已切换的 AI 应用接口重新生成。`;
  }
  if (/User location is not supported/i.test(text)) {
    return `${providerLabel} 返回：当前网络地区不支持使用该 API。可以切换到 Google Gemini、SiliconFlow，或使用可用地区的 OpenAI-compatible 中转服务。`;
  }
  if (/invalid api key|incorrect api key|unauthorized|authentication/i.test(text)) {
    return `${providerLabel} 鉴权失败，请检查 API Key 是否正确。`;
  }
  if (/insufficient_quota|quota|billing/i.test(text)) {
    return `${providerLabel} 额度或账单不可用，请检查账户余额/额度。`;
  }
  return text;
}

function parseDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:([^;,]+);base64,(.+)$/);
  return match ? { mimeType: match[1], data: match[2] } : null;
}

async function imageSourceAsDataUrl(imageItem = imageState) {
  if (imageItem.dataUrl) return imageItem.dataUrl;

  if (!imageItem.src || imageItem.src.startsWith("blob:")) {
    throw new Error("请先上传/粘贴一张可读取的图片。");
  }

  if (imageItem.src.startsWith("data:image/")) {
    return imageItem.src;
  }

  const response = await fetch(imageItem.src);
  if (!response.ok) {
    throw new Error(`图片读取失败：${response.status}`);
  }

  const blob = await response.blob();
  if (!blob.type.startsWith("image/")) {
    throw new Error("读取到的资源不是图片。");
  }

  return fileToDataUrl(blob);
}

function sizeForApi() {
  const mode = nodes.sizeMode.value;
  const width = Number(nodes.widthInput.value) || 1024;
  const height = Number(nodes.heightInput.value) || 1024;

  if (mode === "2k") return "1920x1080";
  if (mode === "4k") return "3840x2160";
  return `${width}x${height}`;
}

function sizeForSeedreamApi() {
  const mode = nodes.sizeMode.value;
  if (mode === "2k") return "2K";
  if (mode === "4k") return "4K";
  return sizeForApi();
}

function sizeForApimartApi() {
  const mode = nodes.sizeMode.value;
  const width = Number(nodes.widthInput.value) || 1024;
  const height = Number(nodes.heightInput.value) || 1024;
  const presets = {
    auto: "auto",
    square: "1:1",
    portrait: "2:3",
    landscape: "3:2",
    "2k": "16:9",
    "4k": "16:9"
  };

  return presets[mode] || `${width}x${height}`;
}

function resolutionForApimartApi() {
  const mode = nodes.sizeMode.value;
  if (mode === "2k") return "2k";
  if (mode === "4k") return "4k";
  return "1k";
}

function nearestRunningHubRatio(width, height) {
  const ratios = [
    { label: "1:1", value: 1 },
    { label: "2:3", value: 2 / 3 },
    { label: "3:2", value: 3 / 2 },
    { label: "16:9", value: 16 / 9 },
    { label: "9:16", value: 9 / 16 },
    { label: "3:4", value: 3 / 4 },
    { label: "4:3", value: 4 / 3 }
  ];
  const target = Math.max(1, Number(width) || 1) / Math.max(1, Number(height) || 1);
  return ratios.reduce((best, ratio) => (
    Math.abs(ratio.value - target) < Math.abs(best.value - target) ? ratio : best
  ), ratios[0]).label;
}

function aspectRatioForRunningHubApi(width, height) {
  const mode = nodes.sizeMode.value;
  const option = SIZE_OPTIONS[mode];
  if (option?.ratio && !["auto", "custom"].includes(option.ratio)) {
    return option.ratio;
  }
  return nearestRunningHubRatio(width, height);
}

function resolutionForRunningHubApi() {
  const mode = nodes.sizeMode.value;
  if (mode === "2k") return "2k";
  if (mode === "4k") return "4k";
  return "1k";
}

function normalizeRunningHubApiMode(value) {
  return value === RUNNINGHUB_API_MODE_ENTERPRISE
    ? RUNNINGHUB_API_MODE_ENTERPRISE
    : RUNNINGHUB_API_MODE_CONSUMER;
}

function runningHubApiModeLabel(value) {
  return normalizeRunningHubApiMode(value) === RUNNINGHUB_API_MODE_ENTERPRISE
    ? "企业级共享 Standard-API"
    : "消费级会员 AI应用";
}

function isRunningHubPendingCode(code) {
  return normalizedApiCode(code) === "804";
}

function valueAtPath(source, path) {
  return path.reduce((value, key) => (
    value && typeof value === "object" ? value[key] : undefined
  ), source);
}

function firstStringAtPaths(source, paths) {
  for (const path of paths) {
    const value = valueAtPath(source, path);
    if ((typeof value === "string" || typeof value === "number") && value !== "") {
      return String(value);
    }
  }
  return "";
}

function extractGeneratedImages(data) {
  const candidates = [];
  const seenObjects = new Set();
  function walk(value) {
    if (!value) return;
    if (typeof value === "string") {
      if (/^https?:\/\//i.test(value) || /^data:image\//i.test(value)) {
        candidates.push(value);
      }
      return;
    }
    if (typeof value !== "object" || seenObjects.has(value)) return;
    seenObjects.add(value);
    Object.entries(value).forEach(([key, entry]) => {
      if ([
        "url",
        "imageUrl",
        "image_url",
        "image",
        "outputUrl",
        "output_url",
        "fileUrl",
        "file_url",
        "downloadUrl",
        "download_url",
        "src"
      ].includes(key) && typeof entry === "string") {
        candidates.push(entry);
        return;
      }
      if (["b64_json", "base64", "image_base64"].includes(key) && typeof entry === "string") {
        candidates.push(entry.startsWith("data:") ? entry : `data:image/png;base64,${entry}`);
        return;
      }
      walk(entry);
    });
  }
  const arrays = [
    data?.data,
    data?.images,
    data?.output,
    data?.result?.images,
    data?.result?.data
  ].filter(Array.isArray);

  arrays.forEach((items) => {
    items.forEach((item) => {
      if (typeof item === "string") {
        candidates.push(item);
        return;
      }

      const url = item?.url || item?.imageUrl || item?.image_url || item?.image || item?.outputUrl || item?.output_url || item?.fileUrl || item?.file_url || item?.downloadUrl || item?.download_url || item?.src;
      const b64 = item?.b64_json || item?.base64 || item?.image_base64;
      if (Array.isArray(url)) candidates.push(...url);
      else if (url) candidates.push(url);
      if (b64) candidates.push(b64.startsWith("data:") ? b64 : `data:image/png;base64,${b64}`);
    });
  });

  if (data?.url) candidates.push(data.url);
  if (data?.b64_json) candidates.push(`data:image/png;base64,${data.b64_json}`);

  walk(data);

  return [...new Set(candidates)];
}

function extractApimartTaskId(data) {
  const task = Array.isArray(data?.data) ? data.data[0] : data?.data;
  return task?.task_id || task?.id || data?.task_id || "";
}

function extractApimartTaskImages(data) {
  const images = data?.data?.result?.images || data?.result?.images || [];
  const urls = images.flatMap((image) => Array.isArray(image?.url) ? image.url : [image?.url]).filter(Boolean);
  return urls.length ? urls : extractGeneratedImages(data);
}

function extractRunningHubTaskId(data) {
  return firstStringAtPaths(data, [
    ["taskId"],
    ["task_id"],
    ["taskID"],
    ["id"],
    ["data"],
    ["data", "taskId"],
    ["data", "task_id"],
    ["data", "taskID"],
    ["data", "id"],
    ["data", "task", "taskId"],
    ["data", "task", "task_id"],
    ["result", "taskId"],
    ["result", "task_id"],
    ["response", "taskId"],
    ["response", "task_id"]
  ]);
}

function extractRunningHubImages(data) {
  const result = data?.data?.eventData || data?.eventData || data?.data || data?.result || data;
  const results = result?.results || result?.result || result?.images || result?.outputs || result?.output || result?.files || result?.data || [];
  const items = Array.isArray(results) ? results : [results];
  const urls = items.flatMap((item) => {
    if (!item) return [];
    if (typeof item === "string") return [item];
    if (Array.isArray(item?.url)) return item.url;
    return [
      item.url,
      item.imageUrl,
      item.image_url,
      item.fileUrl,
      item.file_url,
      item.download_url,
      item.src
    ].filter(Boolean);
  });
  return urls.length ? urls : extractGeneratedImages(data);
}

function extractTaskStatus(data, fallback = "processing") {
  const task = data?.data?.eventData || data?.eventData || data?.data || data;
  return task?.status || task?.taskStatus || task?.state || task?.task_status || data?.status || data?.taskStatus || fallback;
}

function extractTaskErrorMessage(data, fallback = "\u4efb\u52a1\u751f\u6210\u5931\u8d25\u3002") {
  const task = data?.data?.eventData || data?.eventData || data?.data || data;
  const message = task?.error?.message
    || task?.errorMessage
    || task?.failedReason?.message
    || task?.failedReason?.reason
    || task?.message
    || data?.error?.message
    || data?.errorMessage
    || data?.message
    || fallback;
  const code = task?.errorCode || data?.errorCode || data?.code;
  return code ? `${message}\uff08\u9519\u8bef\u7801 ${code}\uff09` : message;
}

/*
function extractTaskErrorMessage(data, fallback = "任务生成失败。") {
  const task = data?.data?.eventData || data?.eventData || data?.data || data;
  const message = task?.error?.message
    || task?.errorMessage
    || task?.failedReason?.message
    || task?.failedReason?.reason
    || task?.message
    || data?.error?.message
    || data?.errorMessage
    || data?.message
    || fallback;
  const code = task?.errorCode || data?.errorCode || data?.code;
  return code ? `${message}（错误码 ${code}）` : message;
}

/*
function extractTaskErrorMessage(data, fallback = "任务生成失败。") {
  const task = data?.data?.eventData || data?.eventData || data?.data || data;
  const message = task?.error?.message
    || task?.errorMessage
    || task?.failedReason?.message
    || task?.failedReason?.reason
    || task?.message
    || data?.error?.message
    || data?.errorMessage
    || data?.message
    || fallback;
  const code = task?.errorCode || data?.errorCode || data?.code;
  return code ? `${message}（错误码 ${code}）` : message;
}

*/

function normalizeTaskStatus(status) {
  return String(status || "").toLowerCase();
}

function isCompletedTaskStatus(status) {
  return ["completed", "complete", "succeeded", "success", "successful", "done", "finished"].includes(normalizeTaskStatus(status));
}

function isFailedTaskStatus(status) {
  return ["failed", "failure", "error", "rejected", "reject"].includes(normalizeTaskStatus(status));
}

function isCancelledTaskStatus(status) {
  return ["cancelled", "canceled", "cancel"].includes(normalizeTaskStatus(status));
}

async function selectedImageDataUrlsForApi(options = {}) {
  const max = options.max || MAX_UPLOAD_IMAGES;
  const selected = (options.useAll
    ? imageItems
    : imageItems.filter((item) => selectedImageIds.has(item.id))
  ).slice(0, max);
  const urls = [];

  for (const item of selected) {
    try {
      urls.push(await imageSourceAsDataUrl(item));
    } catch {
      // Ignore unreadable optional reference images; prompt-only generation should still work.
    }
  }

  return urls;
}

function runningHubG2AppId(useImageReferences) {
  return useImageReferences ? RUNNINGHUB_G2_IMAGE_APP_ID : RUNNINGHUB_G2_TEXT_APP_ID;
}

function runningHubAppDemoUrl(baseUrl, apiKey, webappId) {
  const url = new URL(baseUrlWithPath(baseUrl, RUNNINGHUB_API_PATHS.appDemo));
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("webappId", webappId);
  return url.toString();
}

async function fetchRunningHubAppDemo({ baseUrl, apiKey, webappId }) {
  const cacheKey = `${String(baseUrl || "").replace(/\/+$/, "")}|${webappId}`;
  const cached = runningHubAppDemoCache.get(cacheKey);
  if (cached) return cached;

  const data = await fetchJson(runningHubAppDemoUrl(baseUrl, apiKey, webappId), {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  }, "RunningHub AI应用参数读取");
  const nodeInfoList = data?.data?.nodeInfoList || data?.nodeInfoList || [];
  if (!Array.isArray(nodeInfoList) || !nodeInfoList.length) {
    throw new Error("RunningHub AI应用没有返回可调用的输入参数，请确认 API Key 是否能访问该应用。");
  }

  const demo = { nodeInfoList };
  runningHubAppDemoCache.set(cacheKey, demo);
  return demo;
}

function cloneRunningHubNode(node) {
  return {
    nodeId: String(node?.nodeId || ""),
    fieldName: String(node?.fieldName || ""),
    fieldValue: node?.fieldValue ?? "",
    fieldType: String(node?.fieldType || ""),
    description: String(node?.description || node?.descriptionEn || "")
  };
}

function runningHubFieldValueSet(node) {
  const values = new Set();
  function add(value) {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      const text = String(value).trim();
      if (text) values.add(text);
    }
  }
  function walk(value) {
    if (value === null || value === undefined) return;
    if (typeof value === "string") {
      add(value);
      const trimmed = value.trim();
      if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
        try {
          walk(JSON.parse(trimmed));
        } catch {
          // Field metadata is provider-authored, so malformed JSON should not block defaults.
        }
      }
      return;
    }
    if (typeof value !== "object") {
      add(value);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    ["index", "name", "value", "default"].forEach((key) => add(value[key]));
    Object.values(value).forEach(walk);
  }
  walk(node?.fieldData);
  return values;
}

function chooseRunningHubFieldValue(node, candidates, fallback) {
  const available = runningHubFieldValueSet(node);
  if (!available.size) return candidates.find(Boolean) || fallback;
  return candidates.find((candidate) => available.has(String(candidate))) || fallback;
}

function runningHubNodeText(node) {
  return `${node.fieldName} ${node.fieldType} ${node.description}`.toLowerCase();
}

function isRunningHubPromptNode(node) {
  const field = node.fieldName.toLowerCase();
  const text = runningHubNodeText(node);
  return field === "prompt"
    || field.includes("prompt")
    || (/string/.test(text) && /提示|文本|text|prompt/.test(text));
}

function isRunningHubImageNode(node) {
  const field = node.fieldName.toLowerCase();
  const text = runningHubNodeText(node);
  return field === "image"
    || field === "upload"
    || field.includes("image")
    || /image|图片|图像|上传/.test(text);
}

function isRunningHubRatioNode(node) {
  const field = node.fieldName.toLowerCase();
  const text = runningHubNodeText(node);
  return field === "aspect_ratio"
    || field === "aspectratio"
    || field.includes("ratio")
    || /比例|ratio/.test(text);
}

function isRunningHubResolutionNode(node) {
  const field = node.fieldName.toLowerCase();
  const text = runningHubNodeText(node);
  return field.includes("resolution")
    || /分辨率|清晰度|resolution/.test(text);
}

function prepareRunningHubAppNodeInfoList({
  demo,
  prompt,
  width,
  height,
  useImageReferences,
  imageValues
}) {
  const nodesForSubmit = demo.nodeInfoList.map(cloneRunningHubNode);
  const promptNode = nodesForSubmit.find(isRunningHubPromptNode);
  if (!promptNode) {
    throw new Error("RunningHub AI应用缺少提示词输入节点，无法自动提交。");
  }
  promptNode.fieldValue = prompt;

  const ratioNode = nodesForSubmit.find(isRunningHubRatioNode);
  if (ratioNode) {
    const ratio = aspectRatioForRunningHubApi(width, height);
    ratioNode.fieldValue = chooseRunningHubFieldValue(
      ratioNode,
      useImageReferences ? ["match_input_image", ratio, "auto"] : [ratio, "auto", "1:1"],
      ratio
    );
  }

  const resolutionNode = nodesForSubmit.find(isRunningHubResolutionNode);
  if (resolutionNode) {
    const resolution = resolutionForRunningHubApi();
    resolutionNode.fieldValue = chooseRunningHubFieldValue(resolutionNode, [resolution, resolution.toUpperCase(), "1k"], resolution);
  }

  if (useImageReferences) {
    const imageNode = nodesForSubmit.find(isRunningHubImageNode);
    if (!imageNode) {
      throw new Error("RunningHub 图生图 AI应用缺少图片输入节点，无法自动提交。");
    }
    if (!imageValues.length) {
      throw new Error("RunningHub 图生图需要先上传或粘贴参考图片。");
    }
    imageNode.fieldValue = imageValues[0];
  }

  return nodesForSubmit
    .filter((node) => node.nodeId && node.fieldName)
    .map((node) => ({
      nodeId: node.nodeId,
      fieldName: node.fieldName,
      fieldValue: node.fieldValue,
      ...(node.description ? { description: node.description } : {})
    }));
}

async function uploadRunningHubImage({ baseUrl, apiKey, apiMode, imageItem, index }) {
  const dataUrl = await imageSourceAsDataUrl(imageItem);
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) {
    throw new Error("RunningHub 参考图读取失败，请重新上传图片。");
  }

  const bytes = Uint8Array.from(atob(parsed.data), (char) => char.charCodeAt(0));
  const blob = new Blob([bytes], { type: parsed.mimeType || "image/png" });
  const extension = parsed.mimeType?.includes("jpeg") ? "jpg" : (parsed.mimeType?.split("/")[1] || "png").replace("svg+xml", "svg");
  const formData = new FormData();
  formData.append("file", blob, imageItem.name || `reference-${index + 1}.${extension}`);
  const normalizedMode = normalizeRunningHubApiMode(apiMode);
  if (normalizedMode === RUNNINGHUB_API_MODE_CONSUMER) {
    formData.append("apiKey", apiKey);
    formData.append("fileType", "input");
  }

  let response;
  const url = baseUrlWithPath(baseUrl, normalizedMode === RUNNINGHUB_API_MODE_ENTERPRISE
    ? RUNNINGHUB_API_PATHS.standardUpload
    : RUNNINGHUB_API_PATHS.appUpload);
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`
      },
      body: formData
    });
  } catch (error) {
    throw new Error(networkErrorMessage(error, url));
  }

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok || !isSuccessfulApiCode(data?.code)) {
    throw new Error(data?.error?.message || data?.errorMessage || data?.message || data?.msg || `RunningHub 参考图上传失败：${response.status}`);
  }

  if (normalizedMode === RUNNINGHUB_API_MODE_ENTERPRISE) {
    const downloadUrl = data?.data?.download_url || data?.data?.downloadUrl || data?.download_url || data?.downloadUrl;
    if (!downloadUrl) {
      throw new Error("RunningHub 企业级参考图上传成功，但没有返回 download_url。");
    }
    return downloadUrl;
  }

  const fileName = data?.data?.fileName || data?.data?.filename || data?.fileName || data?.filename;
  if (!fileName) {
    throw new Error("RunningHub 参考图上传成功，但没有返回 fileName。");
  }

  return fileName;
}

async function selectedImageUrlsForRunningHubApi({ baseUrl, apiKey, apiMode, max = 1, onProgress }) {
  const selected = imageItems
    .filter((item) => selectedImageIds.has(item.id))
    .slice(0, max);
  const images = selected.length ? selected : imageItems.slice(0, max);
  const values = [];

  for (let index = 0; index < images.length; index += 1) {
    const item = images[index];
    const source = item?.dataUrl || item?.src || "";
    if (/^https?:\/\//i.test(source) && !isLocalPreviewHttpUrl(source)) {
      values.push(source);
      continue;
    }

    onProgress?.(8 + index, "正在上传参考图");
    values.push(await uploadRunningHubImage({ baseUrl, apiKey, apiMode, imageItem: item, index }));
  }

  return values;
}

async function pollApimartTask({ baseUrl, apiKey, taskId, count, onProgress }) {
  const maxAttempts = 75;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, attempt === 1 ? 10000 : 4000));

    const data = await fetchJson(baseUrlWithPath(baseUrl, `/tasks/${taskId}`), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`
      }
    }, "任务查询");

    const task = data?.data || data;
    const status = extractTaskStatus(data, "processing");
    const progress = Number.isFinite(Number(task?.progress)) ? Number(task.progress) : null;
    const progressText = progress === null ? "" : `，${progress}%`;
    if (progress !== null) {
      onProgress?.(progress, "APIMart 正在生成");
    } else {
      onProgress?.(Math.min(94, 18 + attempt * 3), "APIMart 正在生成");
    }
    console.debug("APIMart task status", { taskId, status, progress, data });

    if (isFailedTaskStatus(status)) {
      throw new Error(extractTaskErrorMessage(data, "APIMart 任务生成失败。"));
    }

    if (isCancelledTaskStatus(status)) {
      throw new Error("APIMart 任务已取消。");
    }

    if (isCompletedTaskStatus(status)) {
      const urls = extractApimartTaskImages(data);
      if (!urls.length) {
        throw new Error("APIMart 任务已完成，但没有返回图片 URL。");
      }
      return urls.slice(0, count);
    }

    setStatus(`APIMart 任务 ${taskId} 正在生成：${status}${progressText}。`);
  }

  throw new Error(`APIMart 任务 ${taskId} 仍在处理中。任务可能还没完成，请稍后用任务 ID 查询结果。`);
}

async function callApimartGptImage2({
  prompt,
  count,
  width,
  height,
  model,
  apiKey,
  baseUrl,
  useImageReferences,
  displayPrompt,
  promptCn,
  promptEn,
  promptStructure,
  mode,
  onProgress
}) {
  const body = {
    model: "gpt-image-2",
    prompt,
    n: 1,
    size: sizeForApimartApi(),
    resolution: resolutionForApimartApi()
  };
  const imageUrls = useImageReferences
    ? await selectedImageDataUrlsForApi({ useAll: true, max: 16 })
    : [];

  if (imageUrls.length) {
    body.image_urls = imageUrls;
    setStatus(`GPT-Image-2 正在使用 ${imageUrls.length} 张参考图生成。`);
  }

  onProgress?.(6, "正在提交任务");
  const data = await fetchJson(baseUrlWithPath(baseUrl, "/images/generations"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  }, "APIMart 提交");

  const taskId = extractApimartTaskId(data);
  if (!taskId) {
    throw new Error("APIMart 已响应，但没有返回 task_id。");
  }

  onProgress?.(12, "任务已提交");
  setStatus(`APIMart 任务已提交：${taskId}。GPT-Image-2 是异步生成，通常需要几十秒。`);
  const urls = await pollApimartTask({ baseUrl, apiKey, taskId, count, onProgress });
  return urls.map((url, index) => ({
    index: `#${galleryItems.length + index + 1}`,
    model,
    width,
    height,
    prompt: displayPrompt || prompt,
    promptCn,
    promptEn,
    promptStructure,
    mode,
    url
  }));
}

async function pollRunningHubTask({ baseUrl, apiKey, apiMode, taskId, count, onProgress }) {
  const maxAttempts = 75;
  const normalizedMode = normalizeRunningHubApiMode(apiMode);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, attempt === 1 ? 5000 : 4000));

    const data = await fetchJson(baseUrlWithPath(baseUrl, normalizedMode === RUNNINGHUB_API_MODE_ENTERPRISE
      ? RUNNINGHUB_API_PATHS.standardQuery
      : RUNNINGHUB_API_PATHS.appOutputs), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(normalizedMode === RUNNINGHUB_API_MODE_ENTERPRISE
        ? { taskId }
        : { apiKey, taskId })
    }, "RunningHub 任务查询", { allowCodes: ["804"] });

    const task = data?.data?.eventData || data?.eventData || data?.data || data;
    const status = extractTaskStatus(data, "RUNNING");
    const progress = Number.isFinite(Number(task?.progress)) ? Number(task.progress) : null;
    const progressText = progress === null ? "" : ` ${progress}%`;
    if (progress !== null) {
      onProgress?.(progress, "RunningHub 正在生成");
    } else {
      onProgress?.(Math.min(94, 16 + attempt * 4), "RunningHub 正在生成");
    }

    if (isRunningHubPendingCode(data?.code)) {
      setStatus(`RunningHub 任务 ${taskId} 正在生成，继续等待结果。`);
      continue;
    }

    if (isFailedTaskStatus(status)) {
      throw new Error(extractTaskErrorMessage(data, "RunningHub 任务生成失败。"));
    }

    if (isCancelledTaskStatus(status)) {
      throw new Error("RunningHub 任务已取消。");
    }

    const urls = extractRunningHubImages(data);
    if (urls.length) {
      return urls.slice(0, count);
    }

    if (isCompletedTaskStatus(status)) {
      throw new Error("RunningHub 任务已完成，但没有返回图片 URL。");
    }

    setStatus(`RunningHub 任务 ${taskId} 正在生成：${status}${progressText}。`);
  }

  throw new Error(`RunningHub 任务 ${taskId} 仍在处理中，请稍后重试。`);
}

async function callRunningHubG2({
  prompt,
  count,
  width,
  height,
  model,
  apiKey,
  baseUrl,
  displayPrompt,
  promptCn,
  promptEn,
  promptStructure,
  useImageReferences,
  apiMode,
  mode,
  onProgress
}) {
  const normalizedMode = normalizeRunningHubApiMode(apiMode);
  if (normalizedMode === RUNNINGHUB_API_MODE_ENTERPRISE) {
    const body = {
      prompt,
      aspectRatio: aspectRatioForRunningHubApi(width, height),
      resolution: resolutionForRunningHubApi(),
      quality: "medium"
    };
    let endpoint = RUNNINGHUB_API_PATHS.standardTextToImage;

    if (useImageReferences) {
      const imageUrls = await selectedImageUrlsForRunningHubApi({
        baseUrl,
        apiKey,
        apiMode: normalizedMode,
        max: 16,
        onProgress
      });
      if (!imageUrls.length) {
        throw new Error("RunningHub 企业级图生图需要先上传或粘贴参考图片。");
      }
      body.imageUrls = imageUrls;
      endpoint = RUNNINGHUB_API_PATHS.standardImageToImage;
      setStatus(`RunningHub 企业级共享接口正在使用 ${imageUrls.length} 张参考图生成。`);
    } else {
      setStatus("RunningHub 企业级共享接口正在使用低价渠道文生图生成。");
    }

    onProgress?.(6, "正在提交任务");
    const data = await fetchJson(baseUrlWithPath(baseUrl, endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    }, "RunningHub 企业级提交");

    const taskId = extractRunningHubTaskId(data);
    if (!taskId) {
      const urls = extractRunningHubImages(data);
      if (urls.length) {
        onProgress?.(99, "正在载入图片");
        return urls.slice(0, count).map((url, index) => ({
          index: `#${galleryItems.length + index + 1}`,
          model,
          width,
          height,
          prompt: displayPrompt || prompt,
          promptCn,
          promptEn,
          promptStructure,
          mode,
          url
        }));
      }
      const responseMessage = extractTaskErrorMessage(data, "");
      const fields = data && typeof data === "object" ? Object.keys(data).join(", ") : "";
      throw new Error(responseMessage
        ? `RunningHub 返回：${responseMessage}`
        : `RunningHub 已响应，但没有返回 taskId 或图片 URL。返回字段：${fields || "空响应"}。`);
    }

    onProgress?.(12, "任务已提交");
    setStatus(`RunningHub 企业级任务已提交：${taskId}。正在等待生成结果。`);
    const urls = await pollRunningHubTask({ baseUrl, apiKey, apiMode: normalizedMode, taskId, count, onProgress });
    return urls.map((url, index) => ({
      index: `#${galleryItems.length + index + 1}`,
      model,
      width,
      height,
      prompt: displayPrompt || prompt,
      promptCn,
      promptEn,
      promptStructure,
      mode,
      url
    }));
  }

  const webappId = runningHubG2AppId(useImageReferences);
  onProgress?.(4, "正在读取AI应用参数");
  const demo = await fetchRunningHubAppDemo({ baseUrl, apiKey, webappId });
  let imageValues = [];
  if (useImageReferences) {
    imageValues = await selectedImageUrlsForRunningHubApi({ baseUrl, apiKey, apiMode: normalizedMode, max: 1, onProgress });
    if (!imageValues.length) {
      throw new Error("RunningHub 图生图需要先上传或粘贴参考图片。");
    }
    setStatus("RunningHub 全能图片G-2.0 低价渠道版正在使用图生图 AI应用生成。");
  } else {
    setStatus("RunningHub 全能图片G-2.0 低价渠道版正在使用文生图 AI应用生成。");
  }

  const nodeInfoList = prepareRunningHubAppNodeInfoList({
    demo,
    prompt,
    width,
    height,
    useImageReferences,
    imageValues
  });

  onProgress?.(6, "正在提交任务");
  const data = await fetchJson(baseUrlWithPath(baseUrl, RUNNINGHUB_API_PATHS.appRun), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      webappId,
      apiKey,
      nodeInfoList
    })
  }, "RunningHub AI应用提交");

  const taskId = extractRunningHubTaskId(data);
  if (!taskId) {
    const urls = extractRunningHubImages(data);
    if (urls.length) {
      onProgress?.(99, "正在载入图片");
      return urls.slice(0, count).map((url, index) => ({
        index: `#${galleryItems.length + index + 1}`,
        model,
        width,
        height,
        prompt: displayPrompt || prompt,
        promptCn,
        promptEn,
        promptStructure,
        mode,
        url
      }));
    }
    const responseMessage = extractTaskErrorMessage(data, "");
    const fields = data && typeof data === "object" ? Object.keys(data).join(", ") : "";
    throw new Error(responseMessage
      ? `RunningHub 返回：${responseMessage}`
      : `RunningHub 已响应，但没有返回 taskId 或图片 URL。返回字段：${fields || "空响应"}。`);
  }

  onProgress?.(12, "任务已提交");
  setStatus(`RunningHub 任务已提交：${taskId}。正在等待生成结果。`);
  const urls = await pollRunningHubTask({ baseUrl, apiKey, apiMode: normalizedMode, taskId, count, onProgress });
  return urls.map((url, index) => ({
    index: `#${galleryItems.length + index + 1}`,
    model,
    width,
    height,
    prompt: displayPrompt || prompt,
    promptCn,
    promptEn,
    promptStructure,
    mode,
    url
  }));
}

async function callImageGenerationApi({
  prompt,
  displayPrompt,
  promptCn,
  promptEn,
  promptStructure,
  useImageReferences,
  count,
  width,
  height,
  model,
  mode,
  onProgress
}) {
  const config = currentApiConfigFromForm();
  const image = config.image;
  const provider = image.provider;
  const apiKey = image.apiKey;
  const baseUrl = image.baseUrl || defaultBaseUrl(provider);
  const imageModel = image.model || nodes.modelSelect.value;

  if (!baseUrl) {
    throw new Error("请先填写生图 API 的 Base URL。");
  }

  if (!apiKey) {
    throw new Error("请先填写生图 API Key。");
  }

  if (/^https?:\/\//i.test(apiKey) || apiKey.startsWith("/")) {
    throw new Error("生图 API Key 填写不正确。接口地址/路径请放在 Base URL，API Key 只填写密钥。");
  }

  if (provider === "replicate") {
    throw new Error("Replicate 需要具体模型 version，当前请先用自定义 OpenAI-compatible 接口。");
  }

  if (provider === "apimart" && imageModel === "gpt-image-2") {
    return callApimartGptImage2({
      prompt,
      displayPrompt,
      promptCn,
      promptEn,
      promptStructure,
      count,
      width,
      height,
      model,
      apiKey,
      baseUrl,
      useImageReferences: useImageReferences && imageItems.length > 0,
      mode,
      onProgress
    });
  }

  if (provider === "runninghub" && imageModel === RUNNINGHUB_G2_MODEL) {
    return callRunningHubG2({
      prompt,
      displayPrompt,
      promptCn,
      promptEn,
      promptStructure,
      count,
      width,
      height,
      model,
      apiKey,
      baseUrl,
      useImageReferences,
      apiMode: image.runninghubMode,
      mode,
      onProgress
    });
  }

  const body = {
    model: imageModel,
    prompt,
    n: count,
    size: sizeForApi()
  };

  if (provider === "jimeng") {
    body.model = imageModel;
    body.size = sizeForSeedreamApi();
    body.response_format = "url";
    body.stream = false;
    body.watermark = false;
    delete body.n;

    if (count > 1) {
      body.sequential_image_generation = "auto";
      body.sequential_image_generation_options = {
        max_images: count
      };
    } else {
      body.sequential_image_generation = "disabled";
    }
  }

  onProgress?.(18, "正在提交请求");
  const data = await fetchJson(baseUrlWithPath(baseUrl, "/images/generations"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  }, "生图请求");

  const urls = extractGeneratedImages(data);
  if (!urls.length) {
    throw new Error("API 已返回，但没有识别到图片 URL 或 base64 图片。");
  }

  onProgress?.(96, "正在载入图片");
  return urls.slice(0, count).map((url, index) => ({
    index: `#${galleryItems.length + index + 1}`,
    model,
    width,
    height,
    prompt: displayPrompt || prompt,
    promptCn,
    promptEn,
    promptStructure,
    mode,
    url
  }));
}

function createGeneratingItems({ count, model, width, height, prompt, promptCn, promptEn, promptStructure, mode }) {
  const batchId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return Array.from({ length: count }, (_value, index) => ({
    index: `#${galleryItems.length + index + 1}`,
    generationId: `${batchId}-${index}`,
    model,
    width,
    height,
    prompt,
    promptCn,
    promptEn,
    promptStructure,
    mode,
    url: "",
    isGenerating: true,
    progress: 0,
    progressLabel: "等待生成"
  }));
}

function galleryItemIndexForTarget(target) {
  if (!target) return -1;
  const byReference = galleryItems.indexOf(target);
  if (byReference !== -1) return byReference;
  if (!target.generationId) return -1;
  return galleryItems.findIndex((item) => item.generationId === target.generationId);
}

function replaceGeneratingItem(target, item) {
  const targetIndex = galleryItemIndexForTarget(target);
  if (targetIndex === -1) return false;
  galleryItems[targetIndex] = {
    ...target,
    ...item,
    index: target.index,
    generationId: "",
    progress: 100,
    isGenerating: false
  };
  renderGallery();
  saveWorkspaceState();
  return true;
}

async function runRealGeneration(payload, placeholders) {
  try {
    setStatus("正在调用生图 API，请稍等。");

    const items = [];

    for (let index = 0; index < placeholders.length; index += 1) {
      setStatus(`正在生成 ${index + 1}/${placeholders.length}。`);
      updateGeneratingItemProgress(placeholders[index], 8, `正在生成 ${index + 1}/${placeholders.length}`);
      const [item] = await callImageGenerationApi({
        ...payload,
        count: 1,
        onProgress: (progress, label) => updateGeneratingItemProgress(placeholders[index], progress, label)
      });
      if (item) {
        updateGeneratingItemProgress(placeholders[index], 99, "正在载入图片");
        item.index = placeholders[index].index;
        const savedItem = await persistGalleryItemImage(item);
        items.push(savedItem);
        if (!replaceGeneratingItem(placeholders[index], savedItem)) {
          galleryItems = [{ ...savedItem, isGenerating: false }, ...galleryItems.filter((entry) => entry.generationId !== placeholders[index].generationId)].slice(0, 12);
          renderGallery();
          saveWorkspaceState();
        }
      }
    }

    if (items.length !== placeholders.length) {
      throw new Error(`API 只返回了 ${items.length} 张图片，少于请求数量 ${placeholders.length}。`);
    }

    setStatus("真实 API 已返回图片，结果已加入已生成图库。");
  } catch (error) {
    galleryItems = galleryItems.filter((item) => !item.isGenerating);
    renderGallery();
    saveWorkspaceState();
    setStatus(friendlyApiErrorMessage(error.message || "生图 API 调用失败。", payload.model || "生图 API"));
  }
}

function shouldUseRealImageApi() {
  const config = currentApiConfigFromForm();
  return Boolean(config.image.baseUrl && config.image.apiKey);
}

function generate() {
  const bundle = promptMetaFromInput();
  promptMeta = bundle;
  const inputPrompt = nodes.promptInput.value.trim();
  const displayPrompt = bundle.chinese || inputPrompt;
  const prompt = bundle.english || bundle.chinese || displayPrompt;
  const count = Math.max(1, Math.min(8, Number(nodes.countInput.value) || 1));
  const width = Number(nodes.widthInput.value) || 1024;
  const height = Number(nodes.heightInput.value) || 1024;
  const model = nodes.modelSelect.options[nodes.modelSelect.selectedIndex].text;
  const effectiveGenerationMode = generationMode === "image" && imageItems.length > 0 ? "image" : "text";
  if (generationMode === "image" && effectiveGenerationMode === "text") {
    setGenerationMode("text", { silent: true });
  }

  if (!displayPrompt && !prompt) {
    setStatus("请先填写提示词，或点击反推提示词。");
    nodes.promptInput.focus();
    return;
  }

  clearGenerationState();
  const placeholders = createGeneratingItems({
    count,
    model,
    width,
    height,
    prompt: displayPrompt || prompt,
    promptCn: bundle.chinese,
    promptEn: bundle.english,
    promptStructure: bundle.structure,
    mode: effectiveGenerationMode
  });
  galleryItems = [...placeholders, ...galleryItems].slice(0, 12);
  renderGallery();
  saveWorkspaceState();

  if (shouldUseRealImageApi()) {
    runRealGeneration({
      prompt,
      displayPrompt: displayPrompt || prompt,
      promptCn: bundle.chinese,
      promptEn: bundle.english,
      promptStructure: bundle.structure,
      useImageReferences: effectiveGenerationMode === "image",
      count,
      width,
      height,
      model,
      mode: effectiveGenerationMode
    }, placeholders);
    return;
  }

  let progress = 0;
  generationTimer = window.setInterval(() => {
    progress = Math.min(100, progress + 8 + Math.round(Math.random() * 11));
    setStatus(progress >= 100 ? "正在收尾。" : `模拟生成中 ${progress}%。`);
    placeholders.forEach((placeholder) => {
      updateGeneratingItemProgress(placeholder, Math.min(99, progress), progress >= 100 ? "正在收尾" : "模拟生成中");
    });

    if (progress >= 100) {
      window.clearInterval(generationTimer);
      placeholders.forEach((placeholder, index) => {
        replaceGeneratingItem(placeholder, {
          index: placeholder.index,
          model,
          width,
          height,
          prompt,
          url: ""
        });
      });
      setStatus("模拟生成完成。配置真实 API 后会显示生成图片。");
    }
  }, 180);

  if (apiConfig?.image?.apiKey) {
    setStatus(`正在用 ${apiConfig.image.providerLabel} 生图 API 配置模拟提交任务；接入网络请求后会调用真实生图 API。`);
  } else {
    setStatus("正在模拟生成进度。保存生图 API 配置后，可把这里接到真实任务状态。");
  }
}

function currentApiConfigFromForm() {
  const promptProvider = nodes.promptApiProvider.value || "openai";
  const imageProvider = nodes.imageApiProvider.value || "openai";
  const imageModel = nodes.apiImageModelSelect.value === "custom"
    ? nodes.customModelName.value.trim()
    : nodes.apiImageModelSelect.value;
  return {
    prompt: {
      provider: promptProvider,
      providerLabel: selectedOptionText(nodes.promptApiProvider, "OpenAI"),
      baseUrl: nodes.promptApiBaseUrl.value.trim(),
      apiKey: nodes.promptApiKey.value.trim(),
      model: nodes.promptModelSelect.value
    },
    image: {
      provider: imageProvider,
      providerLabel: selectedOptionText(nodes.imageApiProvider, "OpenAI"),
      baseUrl: nodes.imageApiBaseUrl.value.trim(),
      apiKey: nodes.imageApiKey.value.trim(),
      model: imageModel,
      runninghubMode: normalizeRunningHubApiMode(nodes.runningHubApiMode?.value),
      customModelName: nodes.customModelName.value.trim()
    },
    eagle: {
      mode: nodes.eagleApiMode?.value || "api",
      baseUrl: nodes.eagleApiBaseUrl?.value.trim() || defaultEagleBaseUrl(),
      token: nodes.eagleApiToken?.value.trim() || ""
    }
  };
}

function applyApiConfig(config) {
  if (!config) {
    nodes.apiMeta.textContent = "未配置";
    return;
  }

  if (!config.prompt && !config.image) {
    config = {
      prompt: {
        provider: config.provider || "openai",
        providerLabel: config.providerLabel || "OpenAI",
        baseUrl: config.baseUrl || "",
        apiKey: config.apiKey || "",
        model: config.promptModel || "gpt-4.1-mini"
      },
      image: {
        provider: config.provider || "openai",
        providerLabel: config.providerLabel || "OpenAI",
        baseUrl: config.baseUrl || "",
        apiKey: config.apiKey || "",
        model: config.imageModel || "gpt-image-1",
        runninghubMode: config.runninghubMode || RUNNINGHUB_API_MODE_CONSUMER,
        customModelName: config.customModelName || ""
      }
    };
  }

  config.eagle = {
    mode: config.eagle?.mode || "api",
    baseUrl: config.eagle?.baseUrl || defaultEagleBaseUrl(),
    token: config.eagle?.token || ""
  };

  apiConfig = config;
  const rawPromptProvider = config.prompt?.provider || "openai";
  const promptProvider = setSelectValue(nodes.promptApiProvider, rawPromptProvider, "openai");
  nodes.promptApiBaseUrl.value = promptProvider === rawPromptProvider
    ? (config.prompt?.baseUrl || defaultBaseUrl(promptProvider))
    : defaultBaseUrl(promptProvider);
  nodes.promptApiKey.value = config.prompt?.apiKey || "";
  nodes.promptModelSelect.value = config.prompt?.model || "gpt-4.1-mini";
  const rawImageProvider = config.image?.provider || "openai";
  const imageProvider = setSelectValue(nodes.imageApiProvider, rawImageProvider, "openai");
  nodes.imageApiBaseUrl.value = imageProvider === rawImageProvider
    ? (config.image?.baseUrl || defaultBaseUrl(imageProvider))
    : defaultBaseUrl(imageProvider);
  nodes.imageApiKey.value = config.image?.apiKey || "";
  if (nodes.runningHubApiMode) {
    nodes.runningHubApiMode.value = normalizeRunningHubApiMode(config.image?.runninghubMode);
  }
  const savedImageModel = config.image?.model || "gpt-image-1";
  nodes.apiImageModelSelect.value = [...nodes.apiImageModelSelect.options].some((option) => option.value === savedImageModel)
    ? savedImageModel
    : "custom";
  nodes.customModelName.value = config.image?.customModelName || "";
  if (nodes.eagleApiMode) nodes.eagleApiMode.value = config.eagle.mode;
  if (nodes.eagleApiBaseUrl) nodes.eagleApiBaseUrl.value = config.eagle.baseUrl;
  if (nodes.eagleApiToken) nodes.eagleApiToken.value = config.eagle.token;
  nodes.modelSelect.value = config.image?.model && [...nodes.modelSelect.options].some((option) => option.value === config.image.model)
    ? config.image.model
    : nodes.modelSelect.value;
  const runningHubMeta = imageProvider === "runninghub"
    ? ` · ${runningHubApiModeLabel(nodes.runningHubApiMode?.value)}`
    : "";
  nodes.apiMeta.textContent = `反推:${config.prompt?.providerLabel || "未配置"} · 生图:${config.image?.providerLabel || "未配置"}${runningHubMeta}`;
  syncCustomModelField();
  syncModelPicker();
}

function loadApiConfig() {
  const raw = localStorage.getItem(API_STORAGE_KEY);
  if (!raw) {
    nodes.promptApiBaseUrl.value = defaultBaseUrl(nodes.promptApiProvider.value);
    nodes.imageApiBaseUrl.value = defaultBaseUrl(nodes.imageApiProvider.value);
    if (nodes.eagleApiBaseUrl) nodes.eagleApiBaseUrl.value = defaultEagleBaseUrl();
    if (nodes.eagleApiMode) nodes.eagleApiMode.value = "api";
    if (nodes.eagleApiToken) nodes.eagleApiToken.value = "";
    showApiSaveFeedback("首次使用，请填写后保存", "idle");
    return;
  }

  try {
    applyApiConfig(JSON.parse(raw));
    showApiSaveFeedback("已加载上次保存的配置", "saved");
  } catch {
    localStorage.removeItem(API_STORAGE_KEY);
    showApiSaveFeedback("配置读取失败，请重新保存", "idle");
  }
}

function showApiSaveFeedback(text, state = "saved") {
  if (!nodes.apiSaveFeedback) return;
  nodes.apiSaveFeedback.textContent = text;
  nodes.apiSaveFeedback.dataset.state = state;
}

function markApiConfigDirty() {
  showApiSaveFeedback(apiConfig ? "有未保存修改" : "填写后记得保存", "dirty");
}

function saveApiConfig() {
  const config = currentApiConfigFromForm();

  if (!config.prompt.baseUrl) {
    config.prompt.baseUrl = defaultBaseUrl(config.prompt.provider);
    nodes.promptApiBaseUrl.value = config.prompt.baseUrl;
  }

  if (!config.image.baseUrl) {
    config.image.baseUrl = defaultBaseUrl(config.image.provider);
    nodes.imageApiBaseUrl.value = config.image.baseUrl;
  }

  if (!config.eagle.baseUrl) {
    config.eagle.baseUrl = defaultEagleBaseUrl();
    if (nodes.eagleApiBaseUrl) nodes.eagleApiBaseUrl.value = config.eagle.baseUrl;
  }
  if (!config.eagle.token) {
    try {
      config.eagle.token = new URL(config.eagle.baseUrl).searchParams.get("token") || "";
      if (nodes.eagleApiToken) nodes.eagleApiToken.value = config.eagle.token;
    } catch {
      config.eagle.token = "";
    }
  }

  if (config.image.model && [...nodes.modelSelect.options].some((option) => option.value === config.image.model)) {
    nodes.modelSelect.value = config.image.model;
  }

  apiConfig = config;
  localStorage.setItem(API_STORAGE_KEY, JSON.stringify(config));
  const runningHubMeta = config.image.provider === "runninghub"
    ? ` · ${runningHubApiModeLabel(config.image.runninghubMode)}`
    : "";
  nodes.apiMeta.textContent = `已保存 · 反推:${config.prompt.providerLabel} · 生图:${config.image.providerLabel}${runningHubMeta}`;
  showApiSaveFeedback("已保存，刷新后仍会保留", "saved");
  nodes.saveApiBtn.classList.add("is-saved");
  nodes.saveApiBtn.textContent = "已保存";
  window.clearTimeout(saveApiConfig.resetTimer);
  saveApiConfig.resetTimer = window.setTimeout(() => {
    nodes.saveApiBtn.classList.remove("is-saved");
    nodes.saveApiBtn.textContent = "保存配置";
  }, 1500);
  setStatus("两组 API 配置已保存：反推提示词和生图会分别使用自己的服务配置。");
}

nodes.fileInput.addEventListener("change", () => {
  setImagesFromFiles(nodes.fileInput.files);
  nodes.fileInput.value = "";
});
nodes.dropZone.addEventListener("click", (event) => {
  if (event.target === nodes.fileInput || event.target.closest("button") || event.target.closest(".image-thumb")) {
    return;
  }
  nodes.fileInput.click();
});
nodes.dropZone.addEventListener("keydown", (event) => {
  if (event.target !== nodes.dropZone) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    nodes.fileInput.click();
  }
});
nodes.clearImageBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  removeActiveImage();
});

nodes.dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  nodes.dropZone.classList.add("is-dragover");
});

nodes.dropZone.addEventListener("dragleave", () => {
  nodes.dropZone.classList.remove("is-dragover");
});

nodes.dropZone.addEventListener("drop", async (event) => {
  event.preventDefault();
  nodes.dropZone.classList.remove("is-dragover");

  const files = [...(event.dataTransfer.files || [])].filter((item) => item.type.startsWith("image/"));
  if (files.length) {
    await setImagesFromFiles(files);
    return;
  }

  const htmlUrl = extractImageUrlFromHtml(event.dataTransfer.getData("text/html"));
  const uriUrl = normalizeDroppedUrl(event.dataTransfer.getData("text/uri-list"));
  const textUrl = normalizeDroppedUrl(event.dataTransfer.getData("text/plain"));
  const url = htmlUrl || uriUrl || textUrl;

  if (url) {
    await setImage(url, "网页图片");
    return;
  }

  setStatus("没有识别到图片，请拖入图片本身或图片地址。");
});

window.addEventListener("paste", async (event) => {
  const file = [...(event.clipboardData.files || [])].find((item) => item.type.startsWith("image/"));
  if (file) {
    await setImageFromFile(file);
    return;
  }

  const textUrl = normalizeDroppedUrl(event.clipboardData.getData("text/plain"));
  if (textUrl) {
    await setImage(textUrl, "粘贴的图片");
  }
});

nodes.sizeMode.addEventListener("change", applySizeMode);
nodes.promptInput.addEventListener("input", () => {
  const text = nodes.promptInput.value.trim();
  if (text !== promptMeta.source) {
    promptMeta = {
      source: text,
      chinese: hasChinese(text) ? text : "",
      english: hasChinese(text) ? "" : text,
      structure: extractPromptStructureText(text)
    };
  }
  saveWorkspaceState();
});
nodes.copyPromptBtn?.addEventListener("click", copyPrompt);
nodes.promptResizeHandle?.addEventListener("pointerdown", startPromptResize);
[
  nodes.widthInput,
  nodes.heightInput,
  nodes.countInput,
  nodes.sizeMode,
  nodes.modelSelect
].forEach((node) => {
  node.addEventListener("change", saveWorkspaceState);
  node.addEventListener("input", saveWorkspaceState);
});
[
  nodes.widthInput,
  nodes.heightInput
].forEach((node) => {
  node.addEventListener("input", syncSizePicker);
  node.addEventListener("change", syncSizePicker);
});
nodes.apiToggleBtn.addEventListener("click", () => {
  nodes.apiPanel.hidden = !nodes.apiPanel.hidden;
});
nodes.promptApiProvider.addEventListener("change", () => {
  nodes.promptApiBaseUrl.value = defaultBaseUrl(nodes.promptApiProvider.value);
  if (nodes.promptApiProvider.value === "gemini") {
    nodes.promptModelSelect.value = "gemini-2.5-flash";
  }
  markApiConfigDirty();
});
nodes.imageApiProvider.addEventListener("change", () => {
  nodes.imageApiBaseUrl.value = defaultBaseUrl(nodes.imageApiProvider.value);
  if (nodes.imageApiProvider.value === "apimart") {
    nodes.apiImageModelSelect.value = "gpt-image-2";
    nodes.modelSelect.value = "gpt-image-2";
    syncModelPicker();
    syncCustomModelField();
  }
  if (nodes.imageApiProvider.value === "jimeng") {
    nodes.apiImageModelSelect.value = "doubao-seedream-4-5-251128";
    nodes.modelSelect.value = "doubao-seedream-4-5-251128";
    syncModelPicker();
  }
  if (nodes.imageApiProvider.value === "runninghub") {
    nodes.apiImageModelSelect.value = RUNNINGHUB_G2_MODEL;
    nodes.modelSelect.value = RUNNINGHUB_G2_MODEL;
    syncModelPicker();
  }
  syncRunningHubApiModeField();
  markApiConfigDirty();
});
nodes.apiImageModelSelect.addEventListener("change", () => {
  syncCustomModelField();
  if ([...nodes.modelSelect.options].some((option) => option.value === nodes.apiImageModelSelect.value)) {
    nodes.modelSelect.value = nodes.apiImageModelSelect.value;
    syncModelPicker();
  }
  if (nodes.apiImageModelSelect.value.startsWith("doubao-seedream-")) {
    nodes.imageApiProvider.value = "jimeng";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("jimeng");
  }
  if (nodes.apiImageModelSelect.value === "gpt-image-2") {
    nodes.imageApiProvider.value = "apimart";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("apimart");
  }
  if (nodes.apiImageModelSelect.value === RUNNINGHUB_G2_MODEL) {
    nodes.imageApiProvider.value = "runninghub";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("runninghub");
  }
  syncRunningHubApiModeField();
  markApiConfigDirty();
  saveWorkspaceState();
});
nodes.countUpBtn?.addEventListener("click", () => stepCount(1));
nodes.countDownBtn?.addEventListener("click", () => stepCount(-1));
nodes.sizePickerBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  setSizeMenuOpen(nodes.sizeMenu.hidden);
});
nodes.sizeMenu?.addEventListener("click", (event) => {
  event.stopPropagation();
});
document.querySelectorAll(".secret-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    if (!input) return;
    const shouldShow = input.type === "password";
    input.type = shouldShow ? "text" : "password";
    button.classList.toggle("is-visible", shouldShow);
    button.setAttribute("aria-pressed", shouldShow ? "true" : "false");
    button.setAttribute("aria-label", shouldShow ? "隐藏 API Key" : "查看 API Key");
  });
});
nodes.modelSelect.addEventListener("change", () => {
  syncModelPicker();
  if ([...nodes.apiImageModelSelect.options].some((option) => option.value === nodes.modelSelect.value)) {
    nodes.apiImageModelSelect.value = nodes.modelSelect.value;
  }
  if (nodes.modelSelect.value.startsWith("doubao-seedream-")) {
    nodes.imageApiProvider.value = "jimeng";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("jimeng");
  }
  if (nodes.modelSelect.value === "gpt-image-2") {
    nodes.imageApiProvider.value = "apimart";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("apimart");
  }
  if (nodes.modelSelect.value === RUNNINGHUB_G2_MODEL) {
    nodes.imageApiProvider.value = "runninghub";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("runninghub");
  }
  syncRunningHubApiModeField();
  saveWorkspaceState();
});
[
  nodes.promptApiBaseUrl,
  nodes.promptApiKey,
  nodes.promptModelSelect,
  nodes.imageApiBaseUrl,
  nodes.imageApiKey,
  nodes.runningHubApiMode,
  nodes.customModelName,
  nodes.eagleApiMode,
  nodes.eagleApiBaseUrl,
  nodes.eagleApiToken
].forEach((node) => {
  if (!node) return;
  node.addEventListener("input", markApiConfigDirty);
  node.addEventListener("change", markApiConfigDirty);
});
nodes.modelPickerBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  setModelMenuOpen(nodes.modelMenu.hidden);
});
nodes.modelMenu?.addEventListener("click", (event) => {
  event.stopPropagation();
});
document.addEventListener("click", (event) => {
  if (!nodes.modelPicker?.contains(event.target)) {
    setModelMenuOpen(false);
  }
  if (!nodes.sizePicker?.contains(event.target)) {
    setSizeMenuOpen(false);
  }
});
nodes.saveApiBtn.addEventListener("click", saveApiConfig);
nodes.mascotBtn?.addEventListener("click", playMascot);
nodes.pinWindowBtn?.addEventListener("click", openPinnedWindow);
nodes.textToImageModeBtn?.addEventListener("click", () => setGenerationMode("text"));
nodes.imageToImageModeBtn?.addEventListener("click", () => setGenerationMode("image"));
nodes.reversePromptBtn.addEventListener("click", reversePrompt);
nodes.clearPromptBtn.addEventListener("click", clearPrompt);
nodes.resetAllBtn?.addEventListener("click", resetAll);
nodes.generateBtn.addEventListener("click", generate);
nodes.lightboxClose.addEventListener("click", closeLightbox);
nodes.eagleCollectBtn?.addEventListener("click", collectToEagle);
nodes.lightboxDownloadBtn.addEventListener("click", () => downloadImage(activeLightboxItem));
nodes.lightbox.addEventListener("click", (event) => {
  if (event.target === nodes.lightbox) {
    closeLightbox();
  }
});
window.addEventListener("keydown", async (event) => {
  if (event.key === "Escape") {
    setModelMenuOpen(false);
    setSizeMenuOpen(false);
  }
  if (event.key === "Escape" && !nodes.lightbox.hidden) {
    closeLightbox();
    return;
  }
  if (event.key === "Escape" && activePageLightboxTabId) {
    await closePageLightbox();
  }
});
window.addEventListener("pointermove", syncPointerGlow, { passive: true });
window.chrome?.storage?.onChanged?.addListener((changes, areaName) => {
  if (areaName === "local" && changes[PENDING_CONTEXT_IMAGE_KEY]?.newValue) {
    consumePendingContextImage();
  }
});

renderModelMenu();
renderSizeMenu();
setupOptionalLocalIntegrations();
syncSizeInputs(1024, 1024);
syncCustomModelField();
loadApiConfig();
loadWorkspaceState();
consumePendingContextImage();
hydrateGalleryItemsFromIndexedDb();
syncModelPicker();
renderGallery();
