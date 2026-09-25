const nodes = {
  appShell: document.querySelector(".app-shell"),
  heroTitle: document.querySelector("#heroTitle"),
  heroTitleText: document.querySelector("#heroTitleText"),
  heroDescriptionText: document.querySelector("#heroDescriptionText"),
  apiHeroModeTag: document.querySelector("#apiHeroModeTag"),
  referenceUploadPanel: document.querySelector("#referenceUploadPanel"),
  dropZone: document.querySelector("#dropZone"),
  fileInput: document.querySelector("#fileInput"),
  previewImage: document.querySelector("#previewImage"),
  imageStack: document.querySelector("#imageStack"),
  imageName: document.querySelector("#imageName"),
  imageSize: document.querySelector("#imageSize"),
  clearImageBtn: document.querySelector("#clearImageBtn"),
  dropZoneTitle: document.querySelector("#dropZoneTitle"),
  dropZoneHint: document.querySelector("#dropZoneHint"),
  generationModeNav: document.querySelector("#generationModeNav"),
  generationModeIndicator: document.querySelector("#generationModeIndicator"),
  generationWorkspace: document.querySelector("#generationWorkspace"),
  promptComposer: document.querySelector(".prompt-composer"),
  promptInput: document.querySelector("#promptInput"),
  reuseCompiledPromptDetails: document.querySelector("#reuseCompiledPromptDetails"),
  reuseCompiledPromptPreview: document.querySelector("#reuseCompiledPromptPreview"),
  promptCharCount: document.querySelector("#promptCharCount"),
  promptResizeHandle: document.querySelector("#promptResizeHandle"),
  copyPromptBtn: document.querySelector("#copyPromptBtn"),
  mascotBtn: document.querySelector("#mascotBtn"),
  reversePromptBtn: document.querySelector("#reversePromptBtn"),
  reverseDetailToggle: document.querySelector("#reverseDetailToggle"),
  clearPromptBtn: document.querySelector("#clearPromptBtn"),
  visualReuseBtn: document.querySelector("#visualReuseBtn"),
  visualReusePanel: document.querySelector("#visualReusePanel"),
  visualReuseAssetType: document.querySelector("#visualReuseAssetType"),
  visualReuseStrength: document.querySelector("#visualReuseStrength"),
  visualReuseStyle: document.querySelector("#visualReuseStyle"),
  visualReuseTextMode: document.querySelector("#visualReuseTextMode"),
  visualReuseTextContentField: document.querySelector("#visualReuseTextContentField"),
  visualReuseTextContent: document.querySelector("#visualReuseTextContent"),
  visualReuseTextSubtitle: document.querySelector("#visualReuseTextSubtitle"),
  visualReuseNotes: document.querySelector("#visualReuseNotes"),
  visualReusePlanBtn: document.querySelector("#visualReusePlanBtn"),
  visualReusePlan: document.querySelector("#visualReusePlan"),
  visualReusePlanTitle: document.querySelector("#visualReusePlanTitle"),
  visualReusePlanStatus: document.querySelector("#visualReusePlanStatus"),
  visualReusePlanSummary: document.querySelector("#visualReusePlanSummary"),
  visualReusePlanFacts: document.querySelector("#visualReusePlanFacts"),
  visualReuseLineageList: document.querySelector("#visualReuseLineageList"),
  visualReuseFullAnalysis: document.querySelector("#visualReuseFullAnalysis"),
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
  statusAlert: document.querySelector("#statusAlert"),
  statusTitle: document.querySelector("#statusTitle"),
  statusText: document.querySelector("#statusText"),
  statusActionBtn: document.querySelector("#statusActionBtn"),
  galleryMeta: document.querySelector("#galleryMeta"),
  galleryRecoverBtn: document.querySelector("#galleryRecoverBtn"),
  galleryGrid: document.querySelector("#galleryGrid"),
  galleryPager: document.querySelector("#galleryPager"),
  galleryPrevBtn: document.querySelector("#galleryPrevBtn"),
  galleryNextBtn: document.querySelector("#galleryNextBtn"),
  galleryPageText: document.querySelector("#galleryPageText"),
  lightbox: document.querySelector("#lightbox"),
  lightboxClose: document.querySelector("#lightboxClose"),
  lightboxImage: document.querySelector("#lightboxImage"),
  lightboxMeta: document.querySelector("#lightboxMeta"),
  lightboxAssetTitle: document.querySelector("#lightboxAssetTitle"),
  lightboxPrompt: document.querySelector("#lightboxPrompt"),
  lightboxLineage: document.querySelector("#lightboxLineage"),
  lightboxSourcePreview: document.querySelector("#lightboxSourcePreview"),
  lightboxSourceImage: document.querySelector("#lightboxSourceImage"),
  lightboxSourceBack: document.querySelector("#lightboxSourceBack"),
  lightboxStrip: document.querySelector("#lightboxStrip"),
  lightboxDownloadBtn: document.querySelector("#lightboxDownloadBtn"),
  eagleCollectBtn: document.querySelector("#eagleCollectBtn"),
  apiPanel: document.querySelector("#apiPanel"),
  apiMeta: document.querySelector("#apiMeta"),
  apiTabs: document.querySelector("#apiTabs"),
  apiTabIndicator: document.querySelector("#apiTabIndicator"),
  apiTabButtons: [...document.querySelectorAll("[data-api-tab]")],
  apiTabPanels: [...document.querySelectorAll("[data-api-panel]")],
  promptApiProvider: document.querySelector("#promptApiProvider"),
  promptApiBaseUrl: document.querySelector("#promptApiBaseUrl"),
  promptApiKey: document.querySelector("#promptApiKey"),
  promptCustomProviderHint: document.querySelector("#promptCustomProviderHint"),
  promptCustomProviderModelReadonly: document.querySelector("#promptCustomProviderModelReadonly"),
  promptCustomProviderModelValue: document.querySelector("#promptCustomProviderModelValue"),
  imageApiProvider: document.querySelector("#imageApiProvider"),
  imageApiBaseUrl: document.querySelector("#imageApiBaseUrl"),
  imageApiKey: document.querySelector("#imageApiKey"),
  imageCustomProviderHint: document.querySelector("#imageCustomProviderHint"),
  imageCustomProviderModelReadonly: document.querySelector("#imageCustomProviderModelReadonly"),
  imageCustomProviderModelValue: document.querySelector("#imageCustomProviderModelValue"),
  apiImageModelField: document.querySelector("#apiImageModelField"),
  promptModelSelect: document.querySelector("#promptModelSelect"),
  promptCustomModelField: document.querySelector("#promptCustomModelField"),
  promptCustomModelName: document.querySelector("#promptCustomModelName"),
  promptLanguageModelField: document.querySelector("#promptLanguageModelField"),
  promptLanguageModelSelect: document.querySelector("#promptLanguageModelSelect"),
  promptLanguageCustomField: document.querySelector("#promptLanguageCustomField"),
  promptLanguageModelName: document.querySelector("#promptLanguageModelName"),
  promptVisionModelField: document.querySelector("#promptVisionModelField"),
  deepSeekThinkingField: document.querySelector("#deepSeekThinkingField"),
  deepSeekThinkingMode: document.querySelector("#deepSeekThinkingMode"),
  apiImageModelSelect: document.querySelector("#apiImageModelSelect"),
  runningHubApiModeField: document.querySelector("#runningHubApiModeField"),
  runningHubApiMode: document.querySelector("#runningHubApiMode"),
  customModelField: document.querySelector("#customModelField"),
  customModelName: document.querySelector("#customModelName"),
  eagleApiMode: document.querySelector("#eagleApiMode"),
  eagleApiBaseUrl: document.querySelector("#eagleApiBaseUrl"),
  eagleApiToken: document.querySelector("#eagleApiToken"),
  saveApiBtn: document.querySelector("#saveApiBtn"),
  apiSaveFeedback: document.querySelector("#apiSaveFeedback"),
  apiSaveFeedbackText: document.querySelector("#apiSaveFeedbackText"),
  addCustomProviderBtn: document.querySelector("#addCustomProviderBtn"),
  customProviderEmpty: document.querySelector("#customProviderEmpty"),
  customProviderList: document.querySelector("#customProviderList"),
  customProviderForm: document.querySelector("#customProviderForm"),
  customProviderId: document.querySelector("#customProviderId"),
  customProviderFormTitle: document.querySelector("#customProviderFormTitle"),
  customProviderKind: document.querySelector("#customProviderKind"),
  customProviderName: document.querySelector("#customProviderName"),
  customProviderBaseUrl: document.querySelector("#customProviderBaseUrl"),
  customProviderApiKey: document.querySelector("#customProviderApiKey"),
  customProviderModel: document.querySelector("#customProviderModel"),
  customProviderFormStatus: document.querySelector("#customProviderFormStatus"),
  cancelCustomProviderBtn: document.querySelector("#cancelCustomProviderBtn"),
  saveCustomProviderBtn: document.querySelector("#saveCustomProviderBtn")
};

function ensureApiPanelPlacement() {
  if (!nodes.apiPanel || !nodes.referenceUploadPanel) return;
  if (nodes.apiPanel.nextElementSibling !== nodes.referenceUploadPanel) {
    nodes.referenceUploadPanel.before(nodes.apiPanel);
  }
}

ensureApiPanelPlacement();

const HOME_HERO_TITLE = "AssetFlow";
const HOME_HERO_DESCRIPTION = "把参考图整理成可追溯的复用方案，再生成新的视觉资产。";
const API_TAB_ORDER = ["prompt", "image", "custom", "eagle"];
let activeApiTab = "prompt";

function setApiTab(tabName) {
  const nextTab = API_TAB_ORDER.includes(tabName) ? tabName : "prompt";
  activeApiTab = nextTab;
  const tabIndex = API_TAB_ORDER.indexOf(nextTab);
  nodes.apiTabButtons.forEach((button) => {
    const isActive = button.dataset.apiTab === nextTab;
    button.setAttribute("aria-selected", isActive ? "true" : "false");
    button.tabIndex = isActive ? 0 : -1;
  });
  nodes.apiTabPanels.forEach((panel) => {
    panel.hidden = panel.dataset.apiPanel !== nextTab;
  });
  if (nodes.apiTabIndicator) {
    nodes.apiTabIndicator.style.transform = `translateX(calc(${tabIndex * 100}% + ${tabIndex * 4}px))`;
  }
}

function selectedApiProviderLabel(select, fallback) {
  const label = selectedOptionText(select, fallback);
  return label.replace(/（自定义）$/, "").trim();
}

function updateCustomProviderManagedUi() {
  const promptProvider = customProviderFromSelectValue(nodes.promptApiProvider?.value);
  const imageProvider = customProviderFromSelectValue(nodes.imageApiProvider?.value);
  const promptManaged = Boolean(promptProvider);
  const imageManaged = Boolean(imageProvider);

  if (nodes.promptApiBaseUrl) nodes.promptApiBaseUrl.disabled = promptManaged;
  if (nodes.promptApiKey) nodes.promptApiKey.disabled = promptManaged;
  if (nodes.promptCustomProviderHint) nodes.promptCustomProviderHint.hidden = !promptManaged;
  if (nodes.promptVisionModelField) nodes.promptVisionModelField.hidden = promptManaged;
  if (nodes.promptCustomProviderModelReadonly) nodes.promptCustomProviderModelReadonly.hidden = !promptManaged;
  if (nodes.promptCustomProviderModelValue) {
    nodes.promptCustomProviderModelValue.textContent = promptProvider?.model || "未填写";
  }

  if (nodes.imageApiBaseUrl) nodes.imageApiBaseUrl.disabled = imageManaged;
  if (nodes.imageApiKey) nodes.imageApiKey.disabled = imageManaged;
  if (nodes.imageCustomProviderHint) nodes.imageCustomProviderHint.hidden = !imageManaged;
  if (nodes.apiImageModelField) nodes.apiImageModelField.hidden = imageManaged;
  if (nodes.imageCustomProviderModelReadonly) nodes.imageCustomProviderModelReadonly.hidden = !imageManaged;
  if (nodes.imageCustomProviderModelValue) {
    nodes.imageCustomProviderModelValue.textContent = imageProvider?.model || "未填写";
  }
  if (imageManaged && nodes.runningHubApiModeField) {
    nodes.runningHubApiModeField.hidden = true;
  }
}

function updateApiHeroSummary() {
  const promptLabel = selectedApiProviderLabel(nodes.promptApiProvider, "未配置");
  const imageLabel = selectedApiProviderLabel(nodes.imageApiProvider, "未配置");
  let imageDetail = "";
  let modeTag = "";

  if (nodes.imageApiProvider?.value === "runninghub") {
    const mode = normalizeRunningHubApiMode(nodes.runningHubApiMode?.value);
    if (mode === RUNNINGHUB_API_MODE_ENTERPRISE) {
      imageDetail = " · 企业级共享低价渠道";
      modeTag = "Standard-API";
    } else if (mode === RUNNINGHUB_API_MODE_OFFICIAL) {
      imageDetail = " · 官方稳定版 · quality: low";
      modeTag = "Standard-API";
    } else {
      imageDetail = " · 消费级会员 AI应用";
    }
  }

  const summary = `反推:${promptLabel} · 生图:${imageLabel}${imageDetail}`;
  if (nodes.apiMeta) nodes.apiMeta.textContent = summary;
  if (!nodes.appShell?.classList.contains("is-api-view")) return;
  nodes.heroDescriptionText.textContent = summary;
  nodes.apiHeroModeTag.textContent = modeTag;
  nodes.apiHeroModeTag.hidden = !modeTag;
}

function setApiView(isOpen) {
  ensureApiPanelPlacement();
  const open = Boolean(isOpen);
  nodes.appShell?.classList.toggle("is-api-view", open);
  nodes.apiPanel.hidden = !open;
  nodes.apiToggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
  nodes.apiToggleBtn.setAttribute("aria-label", open ? "返回首页" : "设置");
  nodes.apiToggleBtn.title = open ? "返回首页" : "设置";
  nodes.heroTitle.classList.toggle("is-api", open);
  nodes.heroTitle.setAttribute("aria-label", open ? "API 接入" : HOME_HERO_TITLE);
  nodes.heroTitleText.hidden = !open;
  nodes.heroTitleText.textContent = open ? "API 接入" : HOME_HERO_TITLE;
  if (open) {
    setApiTab(activeApiTab);
    updateCustomProviderManagedUi();
    updateApiHeroSummary();
  } else {
    nodes.heroDescriptionText.textContent = HOME_HERO_DESCRIPTION;
    nodes.apiHeroModeTag.hidden = true;
    nodes.apiHeroModeTag.textContent = "";
  }
}

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

const generationTimers = new Set();
let pendingGenerationResumeTimer = 0;
let progressSmoothingFrame = 0;
let progressSmoothingLastTime = 0;
let galleryItems = [];
let apiConfig = null;
let customApiProviders = [];
let activeLightboxItem = null;
let localGalleryExpanded = false;
let activePageLightboxTabId = 0;
let generationMode = "text";
let promptMethod = "none";
let galleryImageObserver = null;
const runningHubAppDemoCache = new Map();
let promptMeta = emptyPromptMeta();
let reversePromptDetailed = false;
let galleryPage = 1;
const GALLERY_PAGE_SIZE_SINGLE = 3;
const GALLERY_PAGE_SIZE_DOUBLE = 4;
const GALLERY_PAGE_SIZE_WIDE = 6;
let galleryPageSize = GALLERY_PAGE_SIZE_SINGLE;

function emptyPromptMeta(extra = {}) {
  return {
    source: "",
    chinese: "",
    english: "",
    structure: "",
    roleCheck: "",
    selfCheck: "",
    visualReuseFingerprint: "",
    reusePlan: null,
    reusePlanFingerprint: "",
    ...extra
  };
}

function generationModeLabel(mode) {
  return mode === "image" ? "图生图" : "文生图";
}

function normalizeGalleryMode(value) {
  return value === "text" ? "text" : "image";
}

function normalizeGallerySource(value, mode) {
  const source = String(value || "").trim();
  if (source === "reuse" || source === "visual-reuse") return "reuse";
  if (source === "image" || source === "text") return source;
  return normalizeGalleryMode(mode);
}

function gallerySourceLabel(item = {}) {
  return normalizeGallerySource(item.source || item.generationSource, item.mode) === "reuse"
    ? "视觉复用"
    : generationModeLabel(item.mode);
}

function galleryCardSourceLabel(item = {}) {
  const mode = gallerySourceLabel(item);
  const lineage = item.assetLineage;
  const count = Array.isArray(lineage?.sourceAssets) && lineage.sourceAssets.every((asset) => ["direct", "analysis"].includes(asset.participation))
    ? lineage.sourceAssets.length : 0;
  return count ? `${mode} · ${count}张${mode === "视觉复用" ? "参考" : "来源"}` : mode;
}

const API_STORAGE_KEY = "imageSparkApiConfig";
const CUSTOM_API_PROVIDERS_STORAGE_KEY = "assetflowCustomApiProvidersV1";
const CUSTOM_PROVIDER_OPTION_PREFIX = "custom-provider:";
const CUSTOM_PROVIDER_MODEL_PREFIX = "custom-provider-model:";
const APP_STATE_KEY = "imageSparkWorkspaceState";
const GALLERY_STORAGE_KEY = "imageSparkGalleryItems";
const PENDING_GENERATION_TASKS_KEY = "imageSparkPendingGenerationTasks";
const PENDING_GENERATION_TASK_PREFIX = `${PENDING_GENERATION_TASKS_KEY}:`;
const COMPLETED_GENERATION_RESULTS_KEY = "imageSparkCompletedGenerationResults";
const PENDING_CONTEXT_IMAGE_KEY = "imageSparkPendingContextImage";
const PENDING_CONTINUE_CREATION_KEY = "imageSparkPendingContinueCreation";
const LOCAL_IMAGE_DB_NAME = "imageSparkLocalImages";
const LOCAL_IMAGE_DB_VERSION = 2;
const LOCAL_IMAGE_STORE = "images";
const LOCAL_GALLERY_STORE = "gallery";
const MAX_UPLOAD_IMAGES = 4;
const MAX_WORKSPACE_STATE_CHARS = 2_500_000;
let workspacePersistenceDegraded = false;

function reusePlanApi() {
  if (!window.AssetFlowReusePlan) {
    throw new Error("ReusePlan 模块未加载，请重新打开插件。");
  }
  return window.AssetFlowReusePlan;
}

function normalizeVisualReuseTextMode(value) {
  return window.AssetFlowReusePlan?.normalizeTextMode(value)
    || (["none", "reserve", "with-text", "keep-original"].includes(value) ? value : "auto");
}

function safeAssetSourceUrl(value) {
  const url = String(value || "").trim();
  return /^(data|blob):/i.test(url) ? "" : url;
}

function createAssetSource(kind, details = {}) {
  return {
    kind: String(kind || details.kind || "legacy"),
    uri: safeAssetSourceUrl(details.uri || details.url),
    pageUrl: safeAssetSourceUrl(details.pageUrl),
    mimeType: String(details.mimeType || ""),
    byteSize: Math.max(0, Number(details.byteSize) || 0),
    lastModified: Math.max(0, Number(details.lastModified) || 0)
  };
}

function normalizeAssetSource(value, fallbackSrc = "") {
  const source = value && typeof value === "object" ? value : {};
  const fallbackKind = /^https?:\/\//i.test(fallbackSrc) ? "web-url" : "legacy";
  return createAssetSource(source.kind || source.type || fallbackKind, {
    ...source,
    uri: source.uri || source.url || fallbackSrc
  });
}

function chromeStorageLocalGet(keys) {
  return new Promise((resolve) => {
    if (!window.chrome?.storage?.local) {
      resolve({});
      return;
    }
    chrome.storage.local.get(keys, (result) => {
      resolve(chrome.runtime?.lastError ? {} : (result || {}));
    });
  });
}

function chromeStorageLocalSet(items) {
  return new Promise((resolve) => {
    if (!window.chrome?.storage?.local) {
      resolve(false);
      return;
    }
    chrome.storage.local.set(items, () => {
      resolve(!chrome.runtime?.lastError);
    });
  });
}

function chromeStorageLocalRemove(keys) {
  return new Promise((resolve) => {
    if (!window.chrome?.storage?.local) {
      resolve(false);
      return;
    }
    chrome.storage.local.remove(keys, () => {
      resolve(!chrome.runtime?.lastError);
    });
  });
}

function notifyBackgroundPendingTasksUpdated() {
  try {
    window.chrome?.runtime?.sendMessage?.({ type: "IMAGE_SPARK_PENDING_TASKS_UPDATED" }, () => {
      void chrome.runtime?.lastError;
    });
  } catch {
    // Local preview has no extension background page.
  }
}

function mirrorApiConfigToExtensionStorage(config) {
  if (!config) return;
  chromeStorageLocalSet({ [API_STORAGE_KEY]: config });
}

function pendingGenerationTaskStorageKey(task) {
  const id = task?.id || `${task?.provider || "api"}-${task?.taskId || "task"}-${task?.generationId || "generation"}`;
  return `${PENDING_GENERATION_TASK_PREFIX}${encodeURIComponent(id)}`;
}

function mirrorPendingGenerationTasksToExtensionStorage(tasks, previousTasks = []) {
  const list = Array.isArray(tasks) ? tasks : [];
  const nextKeys = new Set(list.map(pendingGenerationTaskStorageKey));
  const writes = Object.fromEntries(list.map((task) => [pendingGenerationTaskStorageKey(task), task]));
  const staleKeys = (Array.isArray(previousTasks) ? previousTasks : [])
    .map(pendingGenerationTaskStorageKey)
    .filter((key) => !nextKeys.has(key));
  const actions = [chromeStorageLocalRemove(PENDING_GENERATION_TASKS_KEY)];
  if (Object.keys(writes).length) actions.push(chromeStorageLocalSet(writes));
  if (staleKeys.length) actions.push(chromeStorageLocalRemove(staleKeys));
  Promise.all(actions).then((results) => {
    if (results.some((ok) => !ok)) {
      setStatus("后台任务队列保存失败，请保持插件窗口打开后重试。");
      return;
    }
    notifyBackgroundPendingTasksUpdated();
  });
}

function currentImageUploadLimit() {
  return MAX_UPLOAD_IMAGES;
}

function currentImageUploadLimitLabel() {
  return `最多 ${MAX_UPLOAD_IMAGES} 张`;
}

function syncImageUploadLimitUi() {
  if (nodes.fileInput) {
    nodes.fileInput.multiple = currentImageUploadLimit() > 1;
  }
  nodes.dropZone?.dataset && (nodes.dropZone.dataset.uploadLimit = String(currentImageUploadLimit()));
}

function revokeImageItemObjectUrls(items) {
  (items || []).forEach((item) => {
    if (item?.objectUrl) {
      URL.revokeObjectURL(item.objectUrl);
    }
  });
}

function trimImagesToCurrentModeLimit({ silent = false } = {}) {
  const limit = currentImageUploadLimit();
  if (imageItems.length <= limit) return false;

  const active = imageItems.find((item) => item.id === activeImageId) || imageItems[0];
  const kept = active ? [active] : imageItems.slice(0, limit);
  const keptIds = new Set(kept.map((item) => item.id));
  revokeImageItemObjectUrls(imageItems.filter((item) => !keptIds.has(item.id)));
  imageItems = kept.slice(0, limit);
  activeImageId = imageItems[0]?.id || "";
  selectedImageIds = new Set(activeImageId ? [activeImageId] : []);
  syncActiveImageState();
  saveWorkspaceState();

  if (!silent) {
    setStatus("当前模式仅支持 1 张图片，已保留当前选中的图片。");
  }
  return true;
}
const VISUAL_REUSE_IMAGE_ROLES = [
  {
    value: "subject",
    label: "主体与动作",
    prompt: "Subject reference: inherit the subject type, pose, action, outfit structure, hair silhouette, body angle, expression mood, gesture, props, subject scale, and camera relationship inside this role. At high strength, do not change pose, outfit structure, or subject mood unless the user explicitly asks."
  },
  {
    value: "composition",
    label: "构图与留白",
    prompt: "Composition reference: inherit the framing, subject placement, subject scale, visual center, whitespace direction, camera angle, depth relationship, and composition skeleton inside this role. At high strength, do not change core framing unless the user explicitly asks."
  },
  {
    value: "layout",
    label: "排版与字体",
    prompt: "Layout reference: inherit the title area, title scale, text hierarchy, text direction, information zones, spacing rhythm, and text-image relationship inside this role. At high strength, do not remove or weaken the title area unless the user chooses no text."
  },
  {
    value: "typography",
    label: "排版与字体",
    prompt: "Typography reference: inherit font feeling, weight, width, compression, title scale, deformation style, text impact, material feeling, and relationship with the subject. Do not copy original wording, brand names, logos, or trademark text unless explicitly requested."
  },
  {
    value: "style",
    label: "风格与材质",
    prompt: "Style reference: inherit the overall aesthetic, commercial polish, artistic direction, rendering style, visual language, and design maturity. Do not copy unnecessary subjects or brand identifiers."
  },
  {
    value: "color_material",
    label: "色彩与光影",
    prompt: "Color and material reference: inherit the main palette, secondary colors, color ratio, contrast, saturation, brightness, lighting direction, highlight style, shadow style, texture, grain, material, and atmosphere. At high strength, do not change the main color system unless the user asks."
  },
  {
    value: "decoration",
    label: "装饰与细节",
    prompt: "Decoration reference: inherit decoration type, line language, light trails, particles, geometric accents, decoration density, and relationship with the subject. Decoration must always remain secondary and must never become the main subject, dominate composition, or occupy the core visual center."
  },
  {
    value: "auxiliary",
    label: "装饰与细节",
    prompt: "Auxiliary reference: use small props, local details, and secondary visual features. It must not override subject, composition, layout, typography, color, or style references."
  },
  {
    value: "auto",
    label: "自动判断",
    prompt: "Auto analysis reference: decide which small secondary traits are useful, but never override explicit Subject, Composition, Layout, Typography, Color / Material, Style, or Decoration references."
  }
];
const VISUAL_REUSE_PRIMARY_ROLE_VALUES = new Set(["subject", "composition", "layout", "color_material", "style", "decoration"]);
const VISUAL_REUSE_ROLE_ALIASES = {
  primary: "subject",
  color: "color_material",
  support: "auxiliary",
  analyze: "auto"
};
const VISUAL_REUSE_FALLBACK_ROLES = [
  ["subject"],
  ["auto"],
  ["auto"],
  ["auto"]
];
const VISUAL_REUSE_WEIGHT_OPTIONS = [
  { value: "high", label: "严格保持", prompt: "High strength: accurately inherit the selected role traits and keep them as close to the reference as possible." },
  { value: "medium", label: "明显参考", prompt: "Medium strength: preserve core traits while allowing controlled local changes." },
  { value: "low", label: "灵感参考", prompt: "Low strength: borrow only the general direction and allow clear changes." }
];
const ENABLE_EAGLE_INTEGRATION = true;
const RUNNINGHUB_G2_MODEL = "runninghub-rhart-image-g-2";
const RUNNINGHUB_G2_OFFICIAL_MODEL = "runninghub-rhart-image-g-2-official";
const RUNNINGHUB_API_MODE_CONSUMER = "consumer";
const RUNNINGHUB_API_MODE_ENTERPRISE = "enterprise";
const RUNNINGHUB_API_MODE_OFFICIAL = "official";
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
  standardImageToImage: "/openapi/v2/rhart-image-g-2/image-to-image",
  officialTextToImage: "/openapi/v2/rhart-image-g-2-official/text-to-image",
  officialImageToImage: "/openapi/v2/rhart-image-g-2-official/image-to-image"
};
const SIZE_OPTIONS = {
  auto: { label: "自适应", ratio: "auto", resolution: "auto" },
  square: { label: "1:1", ratio: "1:1", resolution: "1k", width: 1024, height: 1024 },
  portrait: { label: "2:3", ratio: "2:3", resolution: "1k", width: 1024, height: 1536 },
  landscape: { label: "3:2", ratio: "3:2", resolution: "1k", width: 1536, height: 1024 },
  "21-9": { label: "21:9", ratio: "21:9", resolution: "1k", width: 1792, height: 768 },
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
  { value: "21-9", label: "21:9" },
  { value: "16-9", label: "16:9" },
  { value: "landscape", label: "3:2" },
  { value: "4-3", label: "4:3" },
  { value: "square", label: "1:1" },
  { value: "3-4", label: "3:4" },
  { value: "portrait", label: "2:3" },
  { value: "9-16", label: "9:16" },
  { value: "custom", label: "自定义" }
];
const RATIO_ICON_SIZES = {
  auto: [18, 18],
  "21-9": [28, 8],
  "16-9": [26, 10],
  landscape: [24, 14],
  "4-3": [22, 16],
  square: [18, 18],
  "3-4": [16, 22],
  portrait: [14, 24],
  "9-16": [12, 26],
  custom: [20, 14]
};
const RESOLUTION_OPTIONS = [
  { value: "auto", label: "自适应" },
  { value: "1k", label: "1k" },
  { value: "2k", label: "2k" },
  { value: "4k", label: "4k" }
];
const RESOLUTION_LONG_EDGE = {
  "2k": 1920,
  "4k": 3840
};
const REVERSE_PROMPT_TEMPLATE = [
  "根据上传图片进行分析，并生成一个能够指导AI作图工具重新创作类似作品的文生图提示词。",
  "提示词需含以下信息:主体内容、场景设定、风格参考、色彩色调、构图视角、附加细节。",
  "请直接输出最终提示词，不要解释分析过程。"
].join("\n");
let isRestoringState = false;
let activeResolution = "auto";

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

function syncPromptCharCount() {
  if (!nodes.promptCharCount || !nodes.promptInput) return;
  nodes.promptCharCount.textContent = `${nodes.promptInput.value.length} 字`;
}

function statusPresentation(text) {
  const message = String(text || "");
  const isGalleryStorageError = /图库.*(?:空间不足|保存失败|未能保存|已满|不可用)|(?:空间不足|保存失败|未能保存|已满).*(?:图库)/i.test(message);
  const isError = isGalleryStorageError
    || /失败|错误|无法|拒绝|缺少|拦截|超出|失效|不可用|没有识别|请先|为空|未配置|未能保存|上限/i.test(message);
  const isSuccess = /成功|完成|已保存|已添加|已复制|复制成功|已清空|已建立|已校验|已恢复|已导入|已移除|已切换|已开启|已关闭/i.test(message);
  const isProgress = /正在|等待|处理中|生成中|已提交|继续查询|调用 API|校验/i.test(message);

  if (isError) {
    return {
      tone: "error",
      title: isGalleryStorageError ? "图库空间不足" : "操作未完成",
      showStorageAction: isGalleryStorageError
    };
  }
  if (isSuccess) {
    return { tone: "success", title: "操作完成", showStorageAction: false };
  }
  if (isProgress) {
    return { tone: "progress", title: "正在处理", showStorageAction: false };
  }
  return { tone: "info", title: "状态提示", showStorageAction: false };
}

function setStatus(text) {
  nodes.statusText.textContent = text;
  const presentation = statusPresentation(text);
  if (nodes.statusAlert) {
    nodes.statusAlert.dataset.tone = presentation.tone;
  }
  if (nodes.statusTitle) {
    nodes.statusTitle.textContent = presentation.title;
  }
  if (nodes.statusActionBtn) {
    nodes.statusActionBtn.hidden = !presentation.showStorageAction;
  }
  syncPromptCharCount();
}

function setPromptThinking(active) {
  if (!nodes.promptComposer) return;
  nodes.promptComposer.classList.toggle("is-thinking", Boolean(active));
  nodes.promptComposer.setAttribute("aria-busy", active ? "true" : "false");
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
      height: item.height,
      assetSource: normalizeAssetSource(item.assetSource, item.src),
      dimensionsVerified: Boolean(item.dimensionsVerified),
      dimensionsVerifiedAt: item.dimensionsVerifiedAt || "",
      visualReuseRoles: normalizeVisualReuseRoles(item.visualReuseRoles || item.visualReuseRole),
      visualReuseRole: "",
      visualReuseWeight: normalizeVisualReuseWeight(item.visualReuseWeight),
      visualReuseWeightManual: Boolean(item.visualReuseWeightManual),
      visualReuseLocked: item.visualReuseLocked !== false,
      visualReuseRolesManual: Boolean(item.visualReuseRolesManual),
      visualReuseConflictAcknowledged: item.visualReuseConflictAcknowledged || ""
    })),
    activeImageId,
    selectedImageIds: [...selectedImageIds],
    prompt: nodes.promptInput.value,
    promptMeta,
    reversePromptDetailed,
    generationMode,
    promptMethod,
    visualReuse: {
      assetType: nodes.visualReuseAssetType?.value || "auto",
      strength: normalizeVisualReuseMode(nodes.visualReuseStrength?.value),
      style: nodes.visualReuseStyle?.value || "original",
      textMode: normalizeVisualReuseTextMode(nodes.visualReuseTextMode?.value),
      textContent: nodes.visualReuseTextContent?.value || "",
      textSubtitle: nodes.visualReuseTextSubtitle?.value || "",
      notes: nodes.visualReuseNotes?.value || ""
    },
    options: {
      sizeMode: nodes.sizeMode.value,
      resolution: activeResolution,
      width: nodes.widthInput.value,
      height: nodes.heightInput.value,
      count: nodes.countInput.value,
      model: nodes.modelSelect.value
    },
    gallery: []
  };
}

function serializeGalleryItems(items) {
  return items.map((item) => {
    const next = { ...item };
    delete next.isGenerating;
    delete next.generationId;
    delete next.progress;
    delete next.progressTarget;
    delete next.progressTargetAt;
    delete next.hasRealProgress;
    delete next.lastRenderedProgress;
    delete next.lastRenderedLabel;
    delete next.lastProgressPaintAt;
    delete next.progressLabel;
    delete next.localObjectUrl;
    delete next.thumbnailObjectUrl;
    if (next.localStoreId) {
      next.url = next.originalUrl || next.url || "";
    }
    return next;
  });
}

function isEmbeddedWorkspaceImage(image) {
  return /^(?:data:image\/|blob:)/i.test(String(image?.src || ""));
}

function compactWorkspaceStateForStorage(state) {
  const persistentImages = (state.images || []).filter((image) => !isEmbeddedWorkspaceImage(image));
  const persistentIds = new Set(persistentImages.map((image) => image.id).filter(Boolean));
  return {
    ...state,
    image: state.image && !isEmbeddedWorkspaceImage(state.image) ? state.image : null,
    images: persistentImages,
    activeImageId: persistentIds.has(state.activeImageId) ? state.activeImageId : "",
    selectedImageIds: (state.selectedImageIds || []).filter((id) => persistentIds.has(id))
  };
}

function saveWorkspaceState() {
  if (isRestoringState) return { skipped: true };
  let state;
  let serialized;

  try {
    state = workspaceStateFromDom();
    serialized = JSON.stringify(state);
  } catch {
    setStatus("工作区状态未能保存，本次会话仍可继续使用。");
    return { failed: true };
  }

  try {
    if (serialized.length > MAX_WORKSPACE_STATE_CHARS) {
      throw new DOMException("Workspace image payload is too large", "QuotaExceededError");
    }
    localStorage.setItem(APP_STATE_KEY, serialized);
    workspacePersistenceDegraded = false;
    return { degraded: false };
  } catch {
    const alreadyDegraded = workspacePersistenceDegraded;
    try {
      localStorage.setItem(APP_STATE_KEY, JSON.stringify(compactWorkspaceStateForStorage(state)));
      workspacePersistenceDegraded = true;
      if (!alreadyDegraded) {
        setStatus("参考图数据较大，本次会话可继续使用；为避免占满存储，重新打开后需要再次添加本地参考图。");
      }
      return { degraded: true };
    } catch {
      workspacePersistenceDegraded = true;
      if (!alreadyDegraded) {
        setStatus("工作区状态未能保存，本次会话仍可继续使用。");
      }
      return { failed: true };
    }
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

function loadPendingGenerationTasks() {
  try {
    const raw = JSON.parse(localStorage.getItem(PENDING_GENERATION_TASKS_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((task) => task && task.taskId && task.provider && task.generationId)
      .map((task) => ({
        ...task,
        createdAt: Number(task.createdAt) || Date.now(),
        width: Number(task.width) || 1024,
        height: Number(task.height) || 1024,
        count: Math.max(1, Number(task.count) || 1),
        mode: normalizeGalleryMode(task.mode),
        source: normalizeGallerySource(task.source || task.generationSource, task.mode)
      }));
  } catch {
    return [];
  }
}

function savePendingGenerationTasks(tasks, previousTasks = loadPendingGenerationTasks()) {
  const list = Array.isArray(tasks) ? tasks.filter((task) => task?.taskId && task?.generationId) : [];
  if (!list.length) {
    localStorage.removeItem(PENDING_GENERATION_TASKS_KEY);
    mirrorPendingGenerationTasksToExtensionStorage([], previousTasks);
    return;
  }
  localStorage.setItem(PENDING_GENERATION_TASKS_KEY, JSON.stringify(list));
  mirrorPendingGenerationTasksToExtensionStorage(list, previousTasks);
}

function upsertPendingGenerationTask(task) {
  if (!task?.taskId || !task?.generationId) return "";
  const id = task.id || `${task.provider || "api"}-${task.taskId}-${task.generationId}`;
  const nextTask = {
    ...task,
    id,
    createdAt: Number(task.createdAt) || Date.now(),
    count: Math.max(1, Number(task.count) || 1)
  };
  const previousTasks = loadPendingGenerationTasks();
  const tasks = previousTasks.filter((item) => item.id !== id);
  tasks.push(nextTask);
  savePendingGenerationTasks(tasks, previousTasks);
  return id;
}

function removePendingGenerationTask(match) {
  if (!match) return;
  const previousTasks = loadPendingGenerationTasks();
  const tasks = previousTasks.filter((task) => {
    if (match.id && task.id === match.id) return false;
    if (match.generationId && task.generationId === match.generationId) return false;
    if (match.provider && match.taskId && task.provider === match.provider && task.taskId === match.taskId) return false;
    return true;
  });
  savePendingGenerationTasks(tasks, previousTasks);
}

class PendingGenerationTaskError extends Error {
  constructor(message) {
    super(message);
    this.name = "PendingGenerationTaskError";
    this.isPendingGenerationTask = true;
  }
}

function isPendingGenerationTaskError(error) {
  if (error?.isPendingGenerationTask || error?.name === "PendingGenerationTaskError") return true;
  return /仍在处理中|仍在生成|稍后重试|processing|running/i.test(error?.message || "");
}

function schedulePendingGenerationResume(delayMs = 90000) {
  if (pendingGenerationResumeTimer || !loadPendingGenerationTasks().length) return;
  pendingGenerationResumeTimer = window.setTimeout(() => {
    pendingGenerationResumeTimer = 0;
    resumePendingGenerationTasks();
  }, delayMs);
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
      reusePlan: item.reusePlan || null,
      assetLineage: item.assetLineage || null,
      generationContext: item.generationContext || null,
      mode: normalizeGalleryMode(item.mode),
      url: item.url || item.src,
      originalUrl: item.originalUrl || "",
      localPath: item.localPath || "",
      localStoreId: item.localStoreId || "",
      localMimeType: item.localMimeType || "",
      galleryId: item.galleryId || item.localStoreId || "",
      thumbnailObjectUrl: item.thumbnailObjectUrl || "",
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
  const visualReuseRoles = normalizeVisualReuseRoles(image.visualReuseRoles || image.visualReuseRole);
  return {
    id: image.id || `image-${Date.now()}-${index}`,
    src,
    name: image.name || `图片 ${index + 1}`,
    width: Number(image.width) || 0,
    height: Number(image.height) || 0,
    dataUrl: src.startsWith("data:image/") ? src : "",
    objectUrl: "",
    assetSource: normalizeAssetSource(image.assetSource, src),
    dimensionsVerified: Boolean(image.dimensionsVerified || (image.width && image.height)),
    dimensionsVerifiedAt: image.dimensionsVerifiedAt || "",
    visualReuseRoles,
    visualReuseRole: "",
    visualReuseWeight: normalizeVisualReuseWeight(image.visualReuseWeight),
    visualReuseWeightManual: Boolean(image.visualReuseWeightManual),
    visualReuseLocked: image.visualReuseLocked !== false,
    visualReuseRolesManual: Boolean(image.visualReuseRolesManual || image.visualReuseRole || visualReuseRoles.length),
    visualReuseConflictAcknowledged: image.visualReuseConflictAcknowledged || ""
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
  nodes.imageName.textContent = `${imageItems.length} 张图片`;
  nodes.imageName.title = active.name;
  nodes.imageSize.textContent = active.width && active.height
    ? `${active.width} × ${active.height}`
    : "尺寸待获取";
  renderImageStack();
}

function renderImageStack() {
  nodes.imageStack.innerHTML = "";
  nodes.imageStack.dataset.count = String(imageItems.length);
  if (!imageItems.length) return;

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
    card.draggable = imageItems.length > 1;
    card.dataset.imageId = item.id;
    card.dataset.referenceRole = effectiveVisualReuseRoles(item, index).join(" ");
    card.addEventListener("dragstart", (event) => {
      closeVisualReuseRoleEditors();
      event.stopPropagation();
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-image-spark-image-id", item.id);
      event.dataTransfer.setData("text/plain", item.id);
      requestAnimationFrame(() => card.classList.add("is-dragging"));
    });
    card.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "move";
      card.classList.add("is-dragover");
    });
    card.addEventListener("dragleave", () => {
      card.classList.remove("is-dragover");
    });
    card.addEventListener("drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      card.classList.remove("is-dragover");
      const draggedId = event.dataTransfer.getData("application/x-image-spark-image-id")
        || event.dataTransfer.getData("text/plain");
      reorderImageItem(draggedId, item.id);
    });
    card.addEventListener("dragend", () => {
      document.querySelectorAll(".image-thumb.is-dragging, .image-thumb.is-dragover").forEach((node) => {
        node.classList.remove("is-dragging", "is-dragover");
      });
    });
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
    badge.className = "reference-index-badge";
    badge.textContent = `#${index + 1}`;

    const roleEditor = document.createElement("div");
    roleEditor.className = "visual-reuse-role-editor";
    roleEditor.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    const roleButton = document.createElement("button");
    roleButton.className = "visual-reuse-role-button";
    roleButton.type = "button";
    roleButton.title = `图 ${index + 1} 的视觉复用角色`;
    roleButton.setAttribute("aria-haspopup", "true");
    roleButton.setAttribute("aria-expanded", "false");
    updateVisualReuseRoleButton(roleButton, item, index);
    roleButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !roleEditor.classList.contains("is-open");
      closeVisualReuseRoleEditors();
      roleEditor.classList.toggle("is-open", willOpen);
      roleButton.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    const roleMenu = document.createElement("div");
    roleMenu.className = "visual-reuse-role-menu";
    roleMenu.setAttribute("role", "menu");
    roleMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    const roleList = document.createElement("div");
    roleList.className = "visual-reuse-role-list";
    const syncRoleOptionLimit = () => {
      const checkedCount = roleList.querySelectorAll("input:checked").length;
      roleList.querySelectorAll("input").forEach((input) => {
        input.disabled = checkedCount >= 2 && !input.checked;
      });
    };
    const effectiveRoles = effectiveVisualReuseRoles(item, index);
    VISUAL_REUSE_IMAGE_ROLES.filter((role) => VISUAL_REUSE_PRIMARY_ROLE_VALUES.has(role.value)).forEach((role) => {
      const row = document.createElement("label");
      row.className = "visual-reuse-role-option";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = role.value;
      input.checked = effectiveRoles.includes(role.value);
      input.addEventListener("change", () => {
        let checkedRoles = [...roleList.querySelectorAll("input:checked")]
          .map((node) => node.value)
          .filter(Boolean);
        if (checkedRoles.length > 2) {
          input.checked = false;
          checkedRoles = [...roleList.querySelectorAll("input:checked")]
            .map((node) => node.value)
            .filter(Boolean);
          setStatus("每张参考图最多选择 2 个标签，避免角色冲突。");
        }
        item.visualReuseRoles = checkedRoles;
        item.visualReuseRole = "";
        item.visualReuseRolesManual = checkedRoles.length > 0;
        if (!item.visualReuseWeightManual) {
          item.visualReuseWeight = item.visualReuseRolesManual ? "high" : "";
          weightSelect.value = item.visualReuseWeight || defaultVisualReuseWeight(index, checkedRoles, false);
        }
        updateVisualReuseRoleButton(roleButton, item, index);
        syncRoleOptionLimit();
        clearGeneratedPromptForReferenceChange("参考图标签已变化，请重新查看方案。");
        saveWorkspaceState();
      });

      const label = document.createElement("span");
      label.textContent = role.label;
      row.append(input, label);
      roleList.append(row);
    });
    syncRoleOptionLimit();

    const roleFooter = document.createElement("div");
    roleFooter.className = "visual-reuse-role-footer";

    const weightLabel = document.createElement("label");
    weightLabel.className = "visual-reuse-mini-field";
    const weightText = document.createElement("span");
    weightText.textContent = "参考强度";
    const weightSelect = document.createElement("select");
    weightSelect.className = "visual-reuse-weight-select";
    VISUAL_REUSE_WEIGHT_OPTIONS.forEach((weight) => {
      const option = document.createElement("option");
      option.value = weight.value;
      option.textContent = weight.label;
      weightSelect.append(option);
    });
    const initialWeight = item.visualReuseWeightManual && item.visualReuseWeight
      ? item.visualReuseWeight
      : defaultVisualReuseWeight(index, effectiveRoles, item.visualReuseRolesManual);
    item.visualReuseWeight = initialWeight;
    weightSelect.value = initialWeight;
    weightSelect.addEventListener("change", () => {
      item.visualReuseWeight = normalizeVisualReuseWeight(weightSelect.value);
      item.visualReuseWeightManual = true;
      updateVisualReuseRoleButton(roleButton, item, index);
      clearGeneratedPromptForReferenceChange("复用强度已变化，请重新查看方案。");
      saveWorkspaceState();
    });
    weightLabel.append(weightText, weightSelect);

    const lockLabel = document.createElement("label");
    lockLabel.className = "visual-reuse-lock-field";
    const lockInput = document.createElement("input");
    lockInput.type = "checkbox";
    lockInput.checked = item.visualReuseLocked !== false;
    lockInput.addEventListener("change", () => {
      item.visualReuseLocked = lockInput.checked;
      updateVisualReuseRoleButton(roleButton, item, index);
      clearGeneratedPromptForReferenceChange("参考图锁定状态已变化，请重新查看方案。");
      saveWorkspaceState();
    });
    const lockText = document.createElement("span");
    lockText.textContent = "锁定角色";
    lockLabel.append(lockInput, lockText);

    const advancedCaption = document.createElement("span");
    advancedCaption.className = "visual-reuse-role-advanced-title";
    advancedCaption.textContent = "单张参考高级设置";
    roleFooter.prepend(advancedCaption);
    roleFooter.append(weightLabel, lockLabel);
    roleMenu.append(roleList, roleFooter);
    roleEditor.append(roleButton, roleMenu);

    const removeButton = document.createElement("button");
    removeButton.className = "image-delete reference-card-close";
    removeButton.type = "button";
    removeButton.title = "删除图片";
    removeButton.setAttribute("aria-label", `删除图片 ${index + 1}`);
    removeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      removeImageItem(item.id);
    });

    const cardHead = document.createElement("div");
    cardHead.className = "reference-card-head";
    cardHead.append(roleEditor, removeButton);

    const cardMedia = document.createElement("div");
    cardMedia.className = "reference-card-media";
    cardMedia.append(img, badge);

    card.append(cardHead, cardMedia);
    nodes.imageStack.append(card);
  });

  const remainingSlots = currentImageUploadLimit() - imageItems.length;
  const addCardCount = imageItems.length === 1 ? 1 : Math.max(0, remainingSlots);
  for (let addIndex = 0; addIndex < addCardCount; addIndex += 1) {
    const addCard = document.createElement("button");
    addCard.className = imageItems.length === 1 ? "image-add-more-row" : "image-add-card";
    addCard.type = "button";
    addCard.setAttribute("aria-label", "继续添加参考图");
    addCard.title = imageItems.length === 1
      ? "添加参考图，切换为四宫格"
      : `添加参考图（${imageItems.length}/${currentImageUploadLimit()}）`;

    const addIcon = document.createElement("span");
    addIcon.className = "image-add-card-icon";
    addIcon.setAttribute("aria-hidden", "true");

    const addLabel = document.createElement("span");
    addLabel.textContent = imageItems.length === 1
      ? "添加参考图，切换为四宫格"
      : "添加参考图";

    addCard.append(addIcon, addLabel);
    addCard.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      nodes.fileInput.click();
    });
    nodes.imageStack.append(addCard);
  }

  if (imageItems.length >= currentImageUploadLimit()) {
    const limitNote = document.createElement("p");
    limitNote.className = "reference-limit-note";
    limitNote.textContent = `已达到 ${currentImageUploadLimit()} 张参考图上限`;
    nodes.imageStack.append(limitNote);
  }
}

function visualReuseReferenceFingerprint(items = imageItems) {
  return normalizeVisualReuseImages(items).map((item, index) => {
    const roles = effectiveVisualReuseRoles(item, index).join("+");
    const manualRoles = item.visualReuseRolesManual ? "manual" : "default";
    const weight = item.visualReuseWeightManual
      ? normalizeVisualReuseWeight(item.visualReuseWeight)
      : defaultVisualReuseWeight(index, effectiveVisualReuseRoles(item, index), item.visualReuseRolesManual);
    return [
      index + 1,
      item.id || "",
      item.name || "",
      item.width || 0,
      item.height || 0,
      roles,
      manualRoles,
      weight,
      item.visualReuseLocked !== false ? "locked" : "unlocked"
    ].join("::");
  }).join("||");
}

function clearGeneratedPromptForReferenceChange(message = "参考图已变化，请重新生成提示词。") {
  if (isRestoringState || (promptMethod !== "reuse" && promptMethod !== "reverse")) return false;
  const hasPrompt = Boolean(nodes.promptInput?.value?.trim());
  const hasMeta = Boolean(promptMeta.source || promptMeta.chinese || promptMeta.english || promptMeta.structure);
  if (!hasPrompt && !hasMeta) return false;
  nodes.promptInput.value = "";
  promptMeta = emptyPromptMeta({
    visualReuseFingerprint: promptMethod === "reuse" ? visualReuseReferenceFingerprint() : ""
  });
  renderVisualReusePlan(null);
  syncGenerateAction();
  setStatus(message);
  return true;
}

function reorderImageItem(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return false;
  const fromIndex = imageItems.findIndex((item) => item.id === sourceId);
  const toIndex = imageItems.findIndex((item) => item.id === targetId);
  if (fromIndex < 0 || toIndex < 0) return false;

  const [moved] = imageItems.splice(fromIndex, 1);
  imageItems.splice(toIndex, 0, moved);
  selectedImageIds = new Set([...selectedImageIds].filter((id) => imageItems.some((item) => item.id === id)));
  if (!selectedImageIds.size) {
    selectedImageIds.add(moved.id);
  }
  activeImageId = imageItems.some((item) => item.id === activeImageId) ? activeImageId : moved.id;
  clearGeneratedPromptForReferenceChange("参考图顺序已变化，请重新查看方案。");
  syncActiveImageState();
  saveWorkspaceState();
  setStatus("参考图顺序已更新，请重新查看方案。");
  return true;
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
  clearGeneratedPromptForReferenceChange(imageItems.length ? "参考图已删除，请重新生成提示词。" : "图片已清空，提示词已重置。");
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
    setPromptMethod("none");
    setVisualReusePanelOpen(false);
    syncVisualReuseTextStrategyUi();
    renderVisualReusePlan(null);
    galleryItems = loadStoredGalleryItems();
    renderGallery();
    return;
  }

  try {
    isRestoringState = true;
    const state = JSON.parse(raw);
    promptMethod = state.promptMethod === "reuse" || state.promptMethod === "reverse" ? state.promptMethod : "none";
    reversePromptDetailed = Boolean(state.reversePromptDetailed);
    if (nodes.reverseDetailToggle) {
      nodes.reverseDetailToggle.checked = reversePromptDetailed;
    }
    setVisualReusePanelOpen(promptMethod === "reuse");
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
      structure: state.promptMeta?.structure || "",
      roleCheck: state.promptMeta?.roleCheck || "",
      selfCheck: state.promptMeta?.selfCheck || "",
      visualReuseFingerprint: state.promptMeta?.visualReuseFingerprint || "",
      reusePlan: state.promptMeta?.reusePlan || null,
      reusePlanFingerprint: state.promptMeta?.reusePlanFingerprint || state.promptMeta?.reusePlan?.inputFingerprint || ""
    };
    if (!reversePromptDetailed && promptMethod !== "reuse") {
      promptMeta.english = "";
      promptMeta.structure = "";
    }
    if (state.visualReuse) {
      if (nodes.visualReuseAssetType) nodes.visualReuseAssetType.value = state.visualReuse.assetType || "auto";
      if (nodes.visualReuseStrength) nodes.visualReuseStrength.value = normalizeVisualReuseMode(state.visualReuse.strength);
      if (nodes.visualReuseStyle) nodes.visualReuseStyle.value = state.visualReuse.style || "original";
      if (nodes.visualReuseTextMode) nodes.visualReuseTextMode.value = normalizeVisualReuseTextMode(state.visualReuse.textMode);
      if (nodes.visualReuseTextContent) nodes.visualReuseTextContent.value = state.visualReuse.textContent || "";
      if (nodes.visualReuseTextSubtitle) nodes.visualReuseTextSubtitle.value = state.visualReuse.textSubtitle || "";
      if (nodes.visualReuseNotes) nodes.visualReuseNotes.value = state.visualReuse.notes || "";
    }
    const hasRestoredImage = Boolean(imageItems.length || state.image?.src || state.images?.length);
    setGenerationMode(state.generationMode === "image" && hasRestoredImage ? "image" : "text", { silent: true });
    setPromptMethod(promptMethod);
    if (state.options) {
      const restoredMode = state.options.sizeMode || "auto";
      const legacyResolution = restoredMode === "2k" || restoredMode === "4k"
        ? restoredMode
        : "";
      nodes.sizeMode.value = legacyResolution ? "16-9" : restoredMode;
      activeResolution = normalizeResolutionTier(
        state.options.resolution
          || legacyResolution
          || SIZE_OPTIONS[nodes.sizeMode.value]?.resolution
          || "auto"
      );
      nodes.modelSelect.value = state.options.model || RUNNINGHUB_G2_MODEL;
      nodes.widthInput.value = state.options.width || 1024;
      nodes.heightInput.value = state.options.height || 1024;
      nodes.countInput.value = state.options.count || 1;
    }
    syncSizePicker();
    syncVisualReuseTextStrategyUi();
    renderVisualReusePlan(promptMeta.reusePlan);
    syncGenerateAction();
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
    volcengine: "https://ark.cn-beijing.volces.com/api/v3",
    aliyun: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    deepseek: "https://api.deepseek.com",
    apimart: "https://api.apimart.ai/v1",
    grsai: "https://grsai.dakka.com.cn",
    runninghub: "https://www.runninghub.cn",
    siliconflow: "https://api.siliconflow.cn/v1",
    replicate: "https://api.replicate.com/v1",
    jimeng: "https://ark.cn-beijing.volces.com/api/v3",
    custom: ""
  };
  return urls[provider] || "";
}

function normalizeDeepSeekThinkingMode(value) {
  return ["flash-off", "flash-on", "pro-off", "pro-on"].includes(value) ? value : "flash-off";
}

function deepSeekModelFromMode(value) {
  return normalizeDeepSeekThinkingMode(value).startsWith("pro") ? "deepseek-v4-pro" : "deepseek-v4-flash";
}

function deepSeekThinkingEnabled(value) {
  return normalizeDeepSeekThinkingMode(value).endsWith("-on");
}

function deepSeekModeFromModel(model, thinkingEnabled = false) {
  const isPro = model === "deepseek-v4-pro";
  return `${isPro ? "pro" : "flash"}-${thinkingEnabled ? "on" : "off"}`;
}

function syncDeepSeekPromptUi(options = {}) {
  if (!nodes.deepSeekThinkingField || !nodes.deepSeekThinkingMode) return;
  const isDeepSeek = nodes.promptApiProvider.value === "deepseek";
  nodes.deepSeekThinkingField.hidden = !isDeepSeek;
  if (!isDeepSeek) return;

  if (options.fromModel) {
    nodes.deepSeekThinkingMode.value = deepSeekModeFromModel(nodes.promptModelSelect.value, deepSeekThinkingEnabled(nodes.deepSeekThinkingMode.value));
  }
  nodes.promptModelSelect.value = deepSeekModelFromMode(nodes.deepSeekThinkingMode.value);
}

function syncPromptCustomModelField() {
  if (!nodes.promptCustomModelField) return;
  nodes.promptCustomModelField.hidden = nodes.promptModelSelect?.value !== "custom";
  const isVolcengine = nodes.promptApiProvider?.value === "volcengine";
  if (nodes.promptLanguageModelField) {
    nodes.promptLanguageModelField.hidden = !isVolcengine;
  }
  if (nodes.promptLanguageCustomField) {
    nodes.promptLanguageCustomField.hidden = !isVolcengine || nodes.promptLanguageModelSelect?.value !== "custom";
  }
}

function promptProviderSupportsImageInput(provider) {
  return provider !== "deepseek";
}

function assertPromptProviderSupportsImageInput(prompt, featureLabel = "图片分析") {
  if (promptProviderSupportsImageInput(prompt.provider)) return;
  throw new Error(`${prompt.providerLabel || "DeepSeek"} 当前不支持图片识别，不能用于${featureLabel}。请切换到阿里云百炼 qwen-vl-plus、Google Gemini 或 OpenAI 视觉模型。`);
}

function openAiCompatibleChatPayload(prompt, messages, maxTokens) {
  const payload = { model: prompt.model, messages };
  if (prompt.provider === "grsai") payload.stream = false;
  else payload.max_tokens = maxTokens;
  if (prompt.provider === "deepseek") {
    const thinking = Boolean(prompt.deepSeekThinking);
    payload.thinking = { type: thinking ? "enabled" : "disabled" };
    if (thinking) {
      payload.reasoning_effort = "high";
    }
  }
  return payload;
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
  return nodes.modelSelect.options[nodes.modelSelect.selectedIndex]?.text || "RunningHub 全能图片G-2.0 低价渠道版";
}

function syncGrsaiModelOptions() {
  const provider = nodes.imageApiProvider.value;
  [nodes.apiImageModelSelect, nodes.modelSelect].forEach((select) => {
    const gptImage2 = [...select.options].find((option) => option.value === "gpt-image-2");
    const gptImage25 = [...select.options].find((option) => option.value === "gpt-image-2.5");
    if (gptImage2) gptImage2.hidden = !["apimart", "grsai"].includes(provider);
    if (gptImage25) gptImage25.hidden = provider !== "grsai";
  });
  renderModelMenu();
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
  [...nodes.modelSelect.options]
    .filter((option) => !option.hidden || option.selected)
    .forEach((option) => {
    const button = document.createElement("button");
    button.className = "model-option";
    button.type = "button";
    button.role = "option";
    button.dataset.value = option.value;
    const dot = document.createElement("span");
    dot.className = "model-option-dot";
    dot.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.className = "model-option-label";
    label.textContent = option.text;
    button.append(dot, label);
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

function uniqueValues(values) {
  const seen = new Set();
  return values.filter((value) => {
    const key = String(value || "").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeImageUrlCandidate(value) {
  const text = String(value || "").trim().replace(/^['"]|['"]$/g, "");
  if (!text || text === "about:blank" || text === "#") return "";
  if (/^data:image\//i.test(text)) return text;
  if (/^https?:\/\//i.test(text)) return text;
  if (/^\/\//.test(text)) return `${window.location.protocol}${text}`;
  return "";
}

function parseSrcsetUrls(value) {
  return String(value || "")
    .split(",")
    .map((item) => normalizeImageUrlCandidate(item.trim().split(/\s+/)[0]))
    .filter(Boolean);
}

function bestSrcsetUrl(value) {
  const urls = parseSrcsetUrls(value);
  return urls[urls.length - 1] || "";
}

function firstImageUrlCandidate(values) {
  for (const value of values) {
    const url = normalizeImageUrlCandidate(value);
    if (url) return url;
  }
  return "";
}

function bestImageUrlFromElement(image) {
  if (!image) return "";
  return firstImageUrlCandidate([
    image.getAttribute("data-full"),
    image.getAttribute("data-large"),
    image.getAttribute("data-original"),
    image.getAttribute("data-pin-media"),
    image.getAttribute("data-media"),
    image.getAttribute("data-image"),
    image.getAttribute("data-lazy-src"),
    image.getAttribute("data-src"),
    image.getAttribute("src"),
    image.src,
    bestSrcsetUrl(image.getAttribute("srcset")),
    bestSrcsetUrl(image.getAttribute("data-srcset"))
  ]);
}

function extractCssImageUrls(value) {
  const urls = [];
  const pattern = /url\((['"]?)(.*?)\1\)/gi;
  let match = pattern.exec(String(value || ""));
  while (match) {
    const url = normalizeImageUrlCandidate(match[2]);
    if (url) urls.push(url);
    match = pattern.exec(String(value || ""));
  }
  return urls;
}

function normalizeDroppedUrls(value) {
  const text = String(value || "").trim();
  if (!text) return [];
  if (/^data:image\//i.test(text)) return [text];

  const urls = [];
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  lines.forEach((line) => {
    const direct = normalizeImageUrlCandidate(line);
    if (direct) {
      urls.push(direct);
      return;
    }

    const matches = line.match(/https?:\/\/[^\s"'<>）)]+/gi) || [];
    matches.forEach((url) => {
      const normalized = normalizeImageUrlCandidate(url);
      if (normalized) urls.push(normalized);
    });
  });

  return uniqueValues(urls);
}

function normalizeDroppedUrl(value) {
  return normalizeDroppedUrls(value)[0] || "";
}

function extractImageUrlsFromHtml(html) {
  const text = String(html || "").trim();
  if (!text) return [];

  const urls = [];
  const doc = new DOMParser().parseFromString(text, "text/html");
  const add = (value) => {
    const url = normalizeImageUrlCandidate(value);
    if (url) urls.push(url);
  };
  const addSrcset = (value) => {
    parseSrcsetUrls(value).forEach((url) => urls.push(url));
  };

  const imageUrls = uniqueValues([...doc.querySelectorAll("img")]
    .map((image) => bestImageUrlFromElement(image))
    .filter(Boolean));
  if (imageUrls.length) {
    return imageUrls;
  }

  doc.querySelectorAll("img").forEach((image) => {
    [
      "src",
      "currentSrc",
      "data-src",
      "data-original",
      "data-lazy-src",
      "data-full",
      "data-large",
      "data-image",
      "data-url",
      "data-media",
      "data-pin-media"
    ].forEach((attr) => add(image.getAttribute(attr)));
    addSrcset(image.getAttribute("srcset"));
    addSrcset(image.getAttribute("data-srcset"));
  });

  doc.querySelectorAll("source").forEach((source) => {
    addSrcset(source.getAttribute("srcset"));
    addSrcset(source.getAttribute("data-srcset"));
  });

  doc.querySelectorAll("meta[property='og:image'], meta[name='twitter:image']").forEach((meta) => {
    add(meta.getAttribute("content"));
  });

  doc.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (/\.(png|jpe?g|webp|gif|avif|bmp|svg)(\?|#|$)/i.test(href || "")) {
      add(href);
    }
  });

  doc.querySelectorAll("[style]").forEach((element) => {
    extractCssImageUrls(element.getAttribute("style")).forEach((url) => urls.push(url));
  });

  doc.querySelectorAll("*").forEach((element) => {
    [...element.attributes].forEach((attr) => {
      if (!/(src|image|img|media|thumb|poster|url)/i.test(attr.name)) return;
      if (attr.name === "srcset" || attr.name === "data-srcset") {
        addSrcset(attr.value);
      } else {
        add(attr.value);
      }
    });
  });

  const extracted = uniqueValues(urls);
  return extracted.length ? extracted : normalizeDroppedUrls(text);
}

function extractImageUrlFromHtml(html) {
  return extractImageUrlsFromHtml(html)[0] || "";
}

function readImageDimensions(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("图片读取失败"));
    image.src = src;
  });
}

async function setImage(src, name = "网页图片", sourceContext = {}) {
  revokeObjectUrl();
  const item = {
    id: `image-${Date.now()}-0`,
    src,
    name,
    width: 0,
    height: 0,
    dataUrl: src.startsWith("data:image/") ? src : "",
    objectUrl: "",
    assetSource: createAssetSource(sourceContext.kind || "web-url", {
      ...sourceContext,
      uri: sourceContext.uri || src
    }),
    dimensionsVerified: false,
    dimensionsVerifiedAt: "",
    visualReuseRoles: [],
    visualReuseRole: "",
    visualReuseWeight: "",
    visualReuseWeightManual: false,
    visualReuseLocked: true,
    visualReuseRolesManual: false
  };
  imageItems = [item];
  activeImageId = item.id;
  selectedImageIds = new Set([item.id]);
  clearGeneratedPromptForReferenceChange("图片已更换，请重新生成提示词。");
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

async function buildImageItemFromUrl(imageUrl, name, sourceContext = {}) {
  const item = {
    id: `image-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    src: imageUrl,
    name,
    width: 0,
    height: 0,
    dataUrl: imageUrl.startsWith("data:image/") ? imageUrl : "",
    objectUrl: "",
    assetSource: createAssetSource(sourceContext.kind || "web-url", {
      ...sourceContext,
      uri: sourceContext.uri || imageUrl
    }),
    dimensionsVerified: false,
    dimensionsVerifiedAt: "",
    visualReuseRoles: [],
    visualReuseRole: "",
    visualReuseWeight: "",
    visualReuseWeightManual: false,
    visualReuseLocked: true,
    visualReuseRolesManual: false
  };

  try {
    const size = await readImageDimensions(imageUrl);
    item.width = size.width;
    item.height = size.height;
    item.dimensionsVerified = true;
    item.dimensionsVerifiedAt = new Date().toISOString();
    item.dimensionsVerified = true;
    item.dimensionsVerifiedAt = new Date().toISOString();
  } catch {
    return null;
  }

  return item;
}

async function addImagesFromUrls(srcList, name = "网页拖入图片", sourceContext = {}) {
  const urls = uniqueValues([...(Array.isArray(srcList) ? srcList : [srcList])]
    .flatMap((src) => normalizeDroppedUrls(src)));
  if (!urls.length) {
    setStatus("没有识别到可添加的图片地址。");
    return false;
  }

  const limit = currentImageUploadLimit();
  const existingItems = [];
  const newUrls = [];
  urls.forEach((imageUrl) => {
    const existing = imageItems.find((item) => item.src === imageUrl || item.dataUrl === imageUrl);
    if (existing) {
      existingItems.push(existing);
    } else {
      newUrls.push(imageUrl);
    }
  });

  if (limit === 1) {
    const targetExisting = existingItems[0];
    if (targetExisting && !newUrls.length) {
      const removed = imageItems.filter((item) => item !== targetExisting);
      revokeImageItemObjectUrls(removed);
      imageItems = [targetExisting];
      activeImageId = targetExisting.id;
      selectedImageIds = new Set([targetExisting.id]);
      syncActiveImageState();
      saveWorkspaceState();
      setStatus("这张图片已在插件中，已为你选中。");
      return true;
    }

    const pickedUrl = newUrls[0] || urls[0];
    const item = targetExisting || await buildImageItemFromUrl(pickedUrl, name, sourceContext);
    if (!item) {
      setStatus("图片地址无法加载，已跳过。");
      return false;
    }
    revokeImageItemObjectUrls(imageItems.filter((image) => image !== item));
    imageItems = [item];
    activeImageId = item.id;
    selectedImageIds = new Set([item.id]);
    clearGeneratedPromptForReferenceChange("图片已更换，请重新生成提示词。");
    syncActiveImageState();

    if (nodes.sizeMode.value === "auto" && imageState.width && imageState.height) {
      syncSizeInputs(imageState.width, imageState.height);
    }

    saveWorkspaceState();
    setStatus(urls.length > 1
      ? "当前模式仅支持 1 张图片，已使用第一张网页图片。"
      : "已添加网页图片。");
    return true;
  }

  const availableSlots = Math.max(0, limit - imageItems.length);
  const pickedUrls = newUrls.slice(0, availableSlots || limit);
  if (!pickedUrls.length && existingItems.length) {
    activeImageId = existingItems[0].id;
    selectedImageIds = new Set(existingItems.map((item) => item.id));
    syncActiveImageState();
    setStatus(existingItems.length > 1 ? "这些图片已在插件中，已为你选中。" : "这张图片已在插件中，已为你选中。");
    return true;
  }
  if (!pickedUrls.length) {
    setStatus(`${currentImageUploadLimitLabel()}，请先删除不需要的参考图。`);
    return false;
  }

  const newItems = await Promise.all(pickedUrls.map((imageUrl, index) => (
    buildImageItemFromUrl(
      imageUrl,
      pickedUrls.length > 1 ? `${name} ${index + 1}` : name,
      { ...sourceContext, uri: imageUrl }
    )
  )));
  const validNewItems = newItems.filter(Boolean);
  if (!validNewItems.length) {
    setStatus("这些网页图片地址无法加载，已跳过。");
    return false;
  }

  imageItems = imageItems.length >= MAX_UPLOAD_IMAGES
    ? [...imageItems.slice(validNewItems.length), ...validNewItems].slice(-MAX_UPLOAD_IMAGES)
    : [...imageItems, ...validNewItems].slice(-MAX_UPLOAD_IMAGES);
  activeImageId = validNewItems[0]?.id || existingItems[0]?.id || activeImageId;
  selectedImageIds = new Set([...existingItems, ...validNewItems].map((item) => item.id));
  clearGeneratedPromptForReferenceChange("参考图已变化，请重新查看方案。");
  syncActiveImageState();

  if (nodes.sizeMode.value === "auto" && imageState.width && imageState.height) {
    syncSizeInputs(imageState.width, imageState.height);
  }

  saveWorkspaceState();
  const omitted = newUrls.length - pickedUrls.length;
  const skipped = pickedUrls.length - validNewItems.length;
  const suffix = omitted > 0
    ? `，已达到最多 ${limit} 张，另有 ${omitted} 张未加入。`
    : skipped > 0
      ? `，另有 ${skipped} 张无法加载已跳过。`
      : "。";
  setStatus(`已添加 ${validNewItems.length} 张网页图片${suffix}`);
  return true;
}

async function addImageFromUrl(src, name = "网页右键图片", sourceContext = {}) {
  return addImagesFromUrls([src], name, { ...sourceContext, uri: src });
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
      await addImageFromUrl(pending.src, pending.name || "网页右键图片", {
        kind: "context-menu",
        pageUrl: pending.pageUrl || ""
      });
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
  addImageFromUrl(payload.src, payload.name || "网页右键图片", {
    kind: "context-menu",
    pageUrl: payload.pageUrl || ""
  })
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

async function setImageFromFile(file, sourceContext = {}) {
  if (!file?.type?.startsWith("image/")) return;
  await setImagesFromFiles([file], sourceContext);
}

async function setImagesFromFiles(files, sourceContext = {}) {
  const imageFiles = [...(files || [])].filter((file) => file?.type?.startsWith("image/"));
  if (!imageFiles.length) return;

  const limit = currentImageUploadLimit();
  const shouldReplaceSingle = limit === 1;
  const availableSlots = shouldReplaceSingle ? 1 : Math.max(0, limit - imageItems.length);
  const picked = imageFiles.slice(0, availableSlots || limit);
  if (!shouldReplaceSingle && !availableSlots && imageItems.length >= limit) {
    setStatus(`最多上传 ${limit} 张图片。`);
    return;
  }

  const startIndex = shouldReplaceSingle ? 0 : imageItems.length;
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
      objectUrl,
      assetSource: createAssetSource(sourceContext.kind || "local-file", {
        ...sourceContext,
        mimeType: file.type,
        byteSize: file.size,
        lastModified: file.lastModified
      }),
      dimensionsVerified: false,
      dimensionsVerifiedAt: "",
      visualReuseRoles: [],
      visualReuseRole: "",
      visualReuseWeight: "",
      visualReuseWeightManual: false,
      visualReuseLocked: true,
      visualReuseRolesManual: false
    };

    try {
      const size = await readImageDimensions(objectUrl);
      item.width = size.width;
      item.height = size.height;
      item.dimensionsVerified = true;
      item.dimensionsVerifiedAt = new Date().toISOString();
    } catch {
      item.width = 0;
      item.height = 0;
    }

    return item;
  }));

  if (shouldReplaceSingle) {
    revokeImageItemObjectUrls(imageItems);
    imageItems = newItems.slice(0, 1);
  } else {
    imageItems = [...imageItems, ...newItems].slice(0, limit);
  }
  activeImageId = newItems[0]?.id || activeImageId || imageItems[0]?.id || "";
  selectedImageIds = new Set(newItems.length ? newItems.map((item) => item.id) : [activeImageId].filter(Boolean));
  clearGeneratedPromptForReferenceChange("参考图已变化，请重新生成提示词。");
  syncActiveImageState();

  if (nodes.sizeMode.value === "auto" && imageState.width && imageState.height) {
    syncSizeInputs(imageState.width, imageState.height);
  }

  const persistence = saveWorkspaceState();
  const selectedTip = picked.length > 1 ? "已选中新图，可直接批量反推。" : "已选中当前图片。";
  if (persistence?.degraded) {
    setStatus(`已添加 ${picked.length} 张图片。参考图数据较大，本次会话可继续使用；重新打开后需要再次添加本地参考图。`);
    return;
  }
  if (persistence?.failed) {
    setStatus(`已添加 ${picked.length} 张图片，但工作区状态未能保存；本次会话仍可继续使用。`);
    return;
  }
  if (shouldReplaceSingle && imageFiles.length > 1) {
    setStatus("当前模式仅支持 1 张图片，已使用第一张本地图片。");
    return;
  }
  setStatus(imageFiles.length > picked.length
    ? `已添加 ${picked.length} 张图片，最多支持 ${limit} 张。${selectedTip}`
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

function isBlobUrl(url) {
  return /^blob:/i.test(String(url || ""));
}

async function galleryItemDataUrlFromStore(item) {
  if (!item?.localStoreId) return "";
  const stored = await imageFromIndexedDb(item.localStoreId);
  if (!stored?.blob) return "";
  return fileToDataUrl(stored.blob);
}

function isSameGalleryItem(a, b) {
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.galleryId && b.galleryId && a.galleryId === b.galleryId) return true;
  if (a.localStoreId && b.localStoreId && a.localStoreId === b.localStoreId) return true;
  if (a.generationId && b.generationId && a.generationId === b.generationId) return true;
  return false;
}

function patchGalleryItem(item, patch) {
  const next = { ...item, ...patch };
  galleryItems = galleryItems.map((galleryItem) => isSameGalleryItem(galleryItem, item) ? next : galleryItem);
  Object.assign(item, patch);
  if (activeLightboxItem && isSameGalleryItem(activeLightboxItem, item)) {
    activeLightboxItem = { ...activeLightboxItem, ...patch };
  }
  return next;
}

function galleryItemPreviewUrl(item) {
  return item?.thumbnailObjectUrl || item?.localObjectUrl || item?.url || "";
}

async function ensureGalleryPreviewObjectUrl(item) {
  if (!item?.localStoreId) return item?.url || "";
  const existing = galleryItemPreviewUrl(item);
  if (existing) return existing;

  const stored = await imageFromIndexedDb(item.localStoreId);
  const blob = stored?.thumbnailBlob || stored?.blob;
  if (!blob) return "";
  const objectUrl = URL.createObjectURL(blob);
  patchGalleryItem(item, stored.thumbnailBlob ? { thumbnailObjectUrl: objectUrl } : { localObjectUrl: objectUrl, url: objectUrl });
  return objectUrl;
}

async function ensureGalleryFullObjectUrl(item) {
  if (!item?.localStoreId) return item;
  if (item.localObjectUrl && item.url === item.localObjectUrl) return item;

  const stored = await imageFromIndexedDb(item.localStoreId);
  if (!stored?.blob) return item;
  const localObjectUrl = URL.createObjectURL(stored.blob);
  return patchGalleryItem(item, {
    localObjectUrl,
    localMimeType: stored.mimeType || item.localMimeType || "image/png",
    url: localObjectUrl
  });
}

async function portableGalleryImageUrl(item, tabUrl = "") {
  const originalUrl = item?.originalUrl || "";
  const sourceUrl = item?.url || "";

  if (isBlobUrl(sourceUrl) || item?.localStoreId) {
    try {
      const storedDataUrl = await galleryItemDataUrlFromStore(item);
      if (storedDataUrl) return storedDataUrl;
    } catch {
      // Fall back below; generated image URLs are often still reachable remotely.
    }
    if (/^https?:\/\//i.test(originalUrl) && !isLocalPreviewHttpUrl(originalUrl)) {
      return originalUrl;
    }
    try {
      return await urlToDataUrl(sourceUrl);
    } catch {
      return originalUrl || sourceUrl;
    }
  }

  return viewerSafeImageUrl(sourceUrl, tabUrl);
}

function syncSizeInputs(width, height) {
  nodes.widthInput.value = Math.max(128, Math.min(4096, width || 1024));
  nodes.heightInput.value = Math.max(128, Math.min(4096, height || 1024));
  syncSizePicker();
}

function normalizeResolutionTier(value) {
  return ["auto", "1k", "2k", "4k", "custom"].includes(value) ? value : "1k";
}

function normalizeRatioMode(value) {
  if (value === "2k" || value === "4k") return "16-9";
  return RATIO_OPTIONS.some((option) => option.value === value) ? value : "auto";
}

function nearestRatioMode(width, height) {
  const target = Math.max(1, Number(width) || 1) / Math.max(1, Number(height) || 1);
  const candidates = RATIO_OPTIONS
    .map((option) => option.value)
    .filter((value) => !["auto", "custom"].includes(value))
    .map((value) => {
      const option = SIZE_OPTIONS[value];
      return {
        value,
        ratio: Math.max(1, option?.width || 1) / Math.max(1, option?.height || 1)
      };
    });
  return candidates.reduce((best, candidate) => (
    Math.abs(candidate.ratio - target) < Math.abs(best.ratio - target) ? candidate : best
  ), candidates[0]).value;
}

function dimensionsForSizeSelection(mode, resolution = activeResolution) {
  const ratioMode = normalizeRatioMode(mode);
  const option = SIZE_OPTIONS[ratioMode];
  if (!option?.width || !option?.height) return null;
  const targetLongEdge = RESOLUTION_LONG_EDGE[normalizeResolutionTier(resolution)];
  const scale = targetLongEdge
    ? targetLongEdge / Math.max(option.width, option.height)
    : 1;
  const boundedScale = Math.min(scale, 4096 / option.width, 4096 / option.height);
  const roundToEight = (value) => Math.max(128, Math.min(4096, Math.round(value / 8) * 8));
  return [
    roundToEight(option.width * boundedScale),
    roundToEight(option.height * boundedScale)
  ];
}

function sizePickerLabel() {
  const mode = normalizeRatioMode(nodes.sizeMode.value);
  if (mode === "custom") {
    return `${nodes.widthInput.value || 1024} × ${nodes.heightInput.value || 1024}`;
  }
  if (mode === "auto") {
    return "自适应";
  }
  const option = SIZE_OPTIONS[mode] || SIZE_OPTIONS.auto;
  const resolution = !["auto", "custom"].includes(activeResolution) ? ` / ${activeResolution}` : "";
  return `${option.label}${resolution}`;
}

function syncSizePicker() {
  if (!nodes.sizePickerText) return;
  const mode = normalizeRatioMode(nodes.sizeMode.value);
  nodes.sizePickerText.textContent = sizePickerLabel();
  nodes.ratioGrid?.querySelectorAll(".ratio-option").forEach((button) => {
    button.setAttribute("aria-selected", button.dataset.mode === mode ? "true" : "false");
  });
  nodes.resolutionTabs?.querySelectorAll(".resolution-option").forEach((button) => {
    button.setAttribute("aria-selected", button.dataset.resolution === activeResolution ? "true" : "false");
  });
}

function setSizeMenuOpen(isOpen) {
  if (!nodes.sizePicker || !nodes.sizePickerBtn || !nodes.sizeMenu) return;
  nodes.sizePicker.classList.toggle("is-open", isOpen);
  nodes.sizePickerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  nodes.sizeMenu.hidden = !isOpen;
}

function selectAspectRatio(mode) {
  const ratioMode = normalizeRatioMode(mode);
  nodes.sizeMode.value = ratioMode;
  if (ratioMode === "auto") {
    activeResolution = "auto";
  } else if (ratioMode === "custom") {
    activeResolution = "custom";
  } else if (["auto", "custom"].includes(activeResolution)) {
    activeResolution = "1k";
  }
  nodes.sizeMode.dispatchEvent(new Event("change", { bubbles: true }));
  setSizeMenuOpen(true);
}

function selectResolutionTier(resolution) {
  activeResolution = normalizeResolutionTier(resolution);
  if (activeResolution === "auto") {
    nodes.sizeMode.value = "auto";
  } else {
    const currentMode = normalizeRatioMode(nodes.sizeMode.value);
    nodes.sizeMode.value = ["auto", "custom"].includes(currentMode)
      ? nearestRatioMode(nodes.widthInput.value, nodes.heightInput.value)
      : currentMode;
  }
  nodes.sizeMode.dispatchEvent(new Event("change", { bubbles: true }));
  setSizeMenuOpen(true);
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
    const [iconWidth, iconHeight] = RATIO_ICON_SIZES[option.value] || RATIO_ICON_SIZES.custom;
    button.style.setProperty("--ratio-icon-width", `${iconWidth}px`);
    button.style.setProperty("--ratio-icon-height", `${iconHeight}px`);
    const icon = document.createElement("span");
    icon.className = "ratio-icon";
    icon.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.className = "ratio-label";
    label.textContent = option.label;
    button.append(icon, label);
    button.setAttribute("aria-selected", "false");
    button.addEventListener("click", () => selectAspectRatio(option.value));
    nodes.ratioGrid.append(button);
  });

  RESOLUTION_OPTIONS.forEach((option) => {
    const button = document.createElement("button");
    button.className = "resolution-option";
    button.type = "button";
    button.dataset.resolution = option.value;
    button.textContent = option.label;
    button.setAttribute("aria-selected", "false");
    button.addEventListener("click", () => selectResolutionTier(option.value));
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
    || isRunningHubG2Model(nodes.apiImageModelSelect.value)
    || isRunningHubG2Model(nodes.modelSelect.value);
  nodes.runningHubApiModeField.hidden = !isRunningHub;
}

function syncRunningHubModeForModel(modelValue) {
  if (!nodes.runningHubApiMode) return;
  if (modelValue === RUNNINGHUB_G2_OFFICIAL_MODEL) {
    nodes.runningHubApiMode.value = RUNNINGHUB_API_MODE_OFFICIAL;
    return;
  }
  if (modelValue === RUNNINGHUB_G2_MODEL
    && normalizeRunningHubApiMode(nodes.runningHubApiMode.value) === RUNNINGHUB_API_MODE_OFFICIAL) {
    nodes.runningHubApiMode.value = RUNNINGHUB_API_MODE_CONSUMER;
  }
}

function syncRunningHubModelForApiMode() {
  const mode = normalizeRunningHubApiMode(nodes.runningHubApiMode?.value);
  const targetModel = mode === RUNNINGHUB_API_MODE_OFFICIAL
    ? RUNNINGHUB_G2_OFFICIAL_MODEL
    : RUNNINGHUB_G2_MODEL;
  if (isRunningHubG2Model(nodes.apiImageModelSelect.value)) {
    nodes.apiImageModelSelect.value = targetModel;
  }
  if (isRunningHubG2Model(nodes.modelSelect.value)) {
    nodes.modelSelect.value = targetModel;
    syncModelPicker();
  }
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
  const originalMode = nodes.sizeMode.value;
  if (originalMode === "2k" || originalMode === "4k") {
    activeResolution = originalMode;
    nodes.sizeMode.value = "16-9";
  }
  const mode = normalizeRatioMode(nodes.sizeMode.value);

  if (mode === "auto" && imageState.width && imageState.height) {
    activeResolution = "auto";
    syncSizeInputs(imageState.width, imageState.height);
    syncSizePicker();
    return;
  }

  if (mode === "custom") {
    activeResolution = "custom";
    syncSizePicker();
    return;
  }

  if (mode !== "auto") {
    if (["auto", "custom"].includes(activeResolution)) {
      activeResolution = "1k";
    }
    const dimensions = dimensionsForSizeSelection(mode, activeResolution);
    if (dimensions) syncSizeInputs(...dimensions);
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

function getVisualReuseTargetImages() {
  return imageItems.slice(0, MAX_UPLOAD_IMAGES);
}

function isVisualReusePromptCurrent() {
  if (promptMethod !== "reuse") return true;
  if (!nodes.promptInput.value.trim() || !isReusePlanCurrent()) return false;
  const currentFingerprint = visualReuseReferenceFingerprint(getVisualReuseTargetImages());
  return Boolean(
    promptMeta.visualReuseFingerprint
    && promptMeta.visualReuseFingerprint === currentFingerprint
    && promptMeta.reusePlanFingerprint === promptMeta.reusePlan?.inputFingerprint
  );
}

async function callPromptApi(imageItem = imageState) {
  const config = currentApiConfigFromForm();
  const prompt = config.prompt;
  const imageUrl = imageItem.dataUrl || imageItem.src;
  assertPromptProviderSupportsImageInput(prompt, "反推提示词");

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

  const requestImageUrl = prompt.provider === "aliyun"
    ? await qwenInlineImageDataUrl(imageItem)
    : imageUrl;
  const headers = {
    "Content-Type": "application/json"
  };
  if (prompt.apiKey) {
    headers.Authorization = `Bearer ${prompt.apiKey}`;
  }

  const response = await fetch(baseUrlWithPath(prompt.baseUrl, prompt.provider === "grsai" ? "/v1/chat/completions" : "/chat/completions"), {
    method: "POST",
    headers,
    body: JSON.stringify(openAiCompatibleChatPayload(prompt, [
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
                url: requestImageUrl
              }
            }
          ]
        }
      ], 520))
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(friendlyApiErrorMessage(apiResponseErrorText(data, `反推提示词请求失败：${response.status}`), prompt.providerLabel));
  }

  const content = data?.choices?.[0]?.message?.content || data?.output_text || data?.text;
  if (!content) {
    throw new Error("反推提示词 API 已返回，但没有识别到文本结果。");
  }

  const visualAnalysis = String(content).trim();
  if (prompt.provider === "volcengine" && prompt.languageModel) {
    return compileReversePromptWithLanguageModel(prompt, visualAnalysis);
  }
  return visualAnalysis;
}

async function compileReversePromptWithLanguageModel(prompt, visualAnalysis) {
  const response = await fetch(baseUrlWithPath(prompt.baseUrl, prompt.provider === "grsai" ? "/v1/chat/completions" : "/chat/completions"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${prompt.apiKey}`
    },
    body: JSON.stringify({
      model: prompt.languageModel,
      messages: [
        {
          role: "system",
          content: "你是专业的视觉生成提示词编译器。仅依据给定的视觉分析，输出一段可直接用于 AI 生图的完整中文提示词。保留主体、构图、镜头、材质、光影、色彩、文字与限制条件，不补写画面中不存在的事实，也不要解释。"
        },
        {
          role: "user",
          content: `请把下面的视觉分析编译为最终生图提示词：\n\n${visualAnalysis}`
        }
      ],
      max_tokens: 1200
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
    throw new Error(friendlyApiErrorMessage(
      data?.error?.message || data?.message || `GLM-5.2 提示词编译请求失败：${response.status}`,
      prompt.providerLabel
    ));
  }

  const content = data?.choices?.[0]?.message?.content || data?.output_text || data?.text;
  if (!content) {
    throw new Error("GLM-5.2 已返回，但没有识别到提示词文本。");
  }
  return String(content).trim();
}

async function reversePrompt() {
  setPromptMethod("reverse");
  setVisualReusePanelOpen(false);
  reversePromptDetailed = Boolean(nodes.reverseDetailToggle?.checked);
  if (shouldUsePromptApi()) {
    setPromptThinking(true);
    try {
      const targets = getPromptTargetImages();
      const includeDetailed = reversePromptDetailed;
      setStatus(targets.length > 1 ? `正在批量反推 ${targets.length} 张图片。` : "正在调用反推提示词 API。");
      const outputs = [];

      for (let index = 0; index < targets.length; index += 1) {
        const item = targets[index];
        setStatus(targets.length > 1
          ? `正在反推 ${index + 1}/${targets.length}：${item.name}`
          : "正在调用反推提示词 API。");
        const content = await callPromptApi(item);
        let meta = includeDetailed
          ? await buildBilingualPromptMeta(content)
          : {
            source: cleanHomepagePromptText(content),
            chinese: formatChinesePromptSections(cleanHomepagePromptText(content)),
            english: "",
            structure: "",
            roleCheck: "",
            selfCheck: ""
          };
        const homepageChinese = await resolveChineseHomepagePrompt(meta, content);
        meta = {
          ...meta,
          source: homepageChinese || meta.source,
          chinese: homepageChinese || meta.chinese
        };
        outputs.push({
          item,
          meta,
          text: targets.length > 1
            ? `========== 图片 ${index + 1} · ${item.name} ==========\n${cleanHomepagePromptText(meta.chinese || content)}`
            : cleanHomepagePromptText(meta.chinese || content)
        });
      }

      nodes.promptInput.value = outputs.map((output) => output.text).join("\n\n");
      promptMeta = {
        source: nodes.promptInput.value.trim(),
        chinese: outputs.map((output) => output.meta.chinese).filter(Boolean).join("\n\n"),
        english: includeDetailed ? outputs.map((output) => output.meta.english).filter(Boolean).join("\n\n") : "",
        structure: includeDetailed ? outputs.map((output) => output.meta.structure).filter(Boolean).join("\n\n") : "",
        roleCheck: "",
        selfCheck: "",
        visualReuseFingerprint: ""
      };
      saveWorkspaceState();
      setStatus(includeDetailed
        ? (targets.length > 1 ? "已完成批量反推，并同步生成中英文提示词。" : "已通过反推提示词 API 生成中英文提示词。")
        : (targets.length > 1 ? "已完成批量反推，已按节省模式只保留中文提示词。" : "已完成反推，已按节省模式只保留中文提示词。"));
      return;
    } catch (error) {
      setStatus(error.message || "反推提示词 API 调用失败，文本框保持空白。");
      return;
    } finally {
      setPromptThinking(false);
    }
  }

  nodes.promptInput.value = "";
  saveWorkspaceState();
  setStatus("请先添加图片并配置反推提示词 API。多图时请点击选择要反推的图片。");
}

function selectText(node) {
  return node?.options?.[node.selectedIndex]?.text || "";
}

function defaultVisualReuseRole(index) {
  return fallbackVisualReuseRoles(index)[0] || "auxiliary";
}

function fallbackVisualReuseRoles(index = 0) {
  return VISUAL_REUSE_FALLBACK_ROLES[Math.min(Math.max(Number(index) || 0, 0), VISUAL_REUSE_FALLBACK_ROLES.length - 1)]
    || ["auxiliary"];
}

function normalizeVisualReuseRoleValue(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const aliased = VISUAL_REUSE_ROLE_ALIASES[raw] || raw;
  return VISUAL_REUSE_IMAGE_ROLES.some((role) => role.value === aliased) ? aliased : "";
}

function normalizeVisualReuseRoles(roles) {
  const rawRoles = Array.isArray(roles) ? roles : (roles ? [roles] : []);
  return [...new Set(rawRoles.map(normalizeVisualReuseRoleValue).filter(Boolean))].slice(0, 2);
}

function normalizeVisualReuseWeight(value) {
  const raw = String(value || "").trim();
  return VISUAL_REUSE_WEIGHT_OPTIONS.some((weight) => weight.value === raw) ? raw : "";
}

function rolesFromCoreRequirement(index, requirement = nodes.visualReuseNotes?.value || "") {
  const text = String(requirement || "");
  const markers = [...text.matchAll(/图(?:片)?\s*([1-4])/g)];
  const marker = markers.find((entry) => Number(entry[1]) === index + 1);
  if (!marker) return [];
  const markerIndex = markers.indexOf(marker);
  const fragment = text.slice(marker.index + marker[0].length, markers[markerIndex + 1]?.index ?? text.length);
  const roles = [];
  if (/人物|角色|主体|产品|动作|姿势|服装|发型/.test(fragment)) roles.push("subject");
  if (/构图|留白|画面布局|镜头|视角/.test(fragment)) roles.push("composition");
  if (/排版|标题|字体|字形|文字位置/.test(fragment)) roles.push("layout");
  if (/色彩|颜色|光影|光线|配色/.test(fragment)) roles.push("color_material");
  if (/风格|材质|质感|肌理/.test(fragment)) roles.push("style");
  if (/装饰|线条|细节|点缀|纹样/.test(fragment)) roles.push("decoration");
  return roles.slice(0, 2);
}

function visualReuseRoleConflicts() {
  return imageItems.flatMap((item, index) => {
    const manual = normalizeVisualReuseRoles(item.visualReuseRoles || item.visualReuseRole);
    const suggested = rolesFromCoreRequirement(index);
    if (!manual.length || !suggested.length || suggested.some((role) => manual.includes(role))) return [];
    const signature = `${manual.join(",")}|${suggested.join(",")}`;
    if (item.visualReuseConflictAcknowledged === signature) return [];
    return {
      item,
      index,
      suggested,
      signature,
      message: `图${index + 1}：需求提到“${suggested.map((role) => visualReuseRoleMeta(role).label).join("、")}”，当前角色为“${manual.map((role) => visualReuseRoleMeta(role).label).join("、")}”。`
    };
  });
}
function effectiveVisualReuseRoles(item, index = 0) {
  const manualRoles = normalizeVisualReuseRoles(item?.visualReuseRoles || item?.visualReuseRole);
  return manualRoles.length ? manualRoles : (rolesFromCoreRequirement(index).length ? rolesFromCoreRequirement(index) : fallbackVisualReuseRoles(index));
}

function visualReuseRoleMeta(value, index = 0) {
  const normalized = normalizeVisualReuseRoleValue(value) || defaultVisualReuseRole(index);
  return VISUAL_REUSE_IMAGE_ROLES.find((role) => role.value === normalized)
    || VISUAL_REUSE_IMAGE_ROLES[0];
}

function visualReuseRoleMetas(values, index = 0) {
  return effectiveVisualReuseRoles({ visualReuseRoles: values }, index).map((value) => visualReuseRoleMeta(value, index));
}

function defaultVisualReuseWeight(index = 0, roles = [], isManual = false) {
  return isManual ? "high" : "medium";
}

function visualReuseWeightLabel(value) {
  return VISUAL_REUSE_WEIGHT_OPTIONS.find((weight) => weight.value === value)?.label || "明显参考";
}

function normalizeVisualReuseMode(value) {
  const raw = String(value || "").trim();
  if (raw === "precise_inherit" || raw === "high" || raw === "system") return "precise_inherit";
  if (raw === "balanced_reuse" || raw === "medium") return "balanced_reuse";
  if (raw === "creative_rewrite" || raw === "light" || raw === "low") return "creative_rewrite";
  return "precise_inherit";
}

function visualReuseRoleSummary(item, index = 0) {
  const roles = effectiveVisualReuseRoles(item, index);
  const labels = roles.map((role) => visualReuseRoleMeta(role, index).label);
  return [...new Set(labels)].join(" + ");
}

function updateVisualReuseRoleButton(button, item, index = 0) {
  if (!button) return;
  const roles = effectiveVisualReuseRoles(item, index);
  const manualRoles = normalizeVisualReuseRoles(item?.visualReuseRoles || item?.visualReuseRole);
  const weight = item?.visualReuseWeightManual
    ? normalizeVisualReuseWeight(item.visualReuseWeight)
    : defaultVisualReuseWeight(index, roles, Boolean(item?.visualReuseRolesManual || manualRoles.length));
  button.textContent = `图${index + 1} · ${visualReuseRoleSummary(item, index)}`;
  button.setAttribute("aria-label", `图 ${index + 1} 角色：${button.textContent}`);
}

function closeVisualReuseRoleEditors() {
  document.querySelectorAll(".visual-reuse-role-editor.is-open").forEach((editor) => {
    editor.classList.remove("is-open");
    editor.querySelector(".visual-reuse-role-button")?.setAttribute("aria-expanded", "false");
  });
}

function setVisualReusePanelOpen(isOpen) {
  if (!nodes.visualReusePanel) return;
  window.clearTimeout(setVisualReusePanelOpen.closeTimer);
  if (isOpen) {
    nodes.visualReusePanel.hidden = false;
    nodes.visualReusePanel.offsetHeight;
    requestAnimationFrame(() => {
      nodes.visualReusePanel.classList.add("is-open");
    });
    return;
  }
  nodes.visualReusePanel.classList.remove("is-open");
  setVisualReusePanelOpen.closeTimer = window.setTimeout(() => {
    if (!nodes.visualReusePanel.classList.contains("is-open")) {
      nodes.visualReusePanel.hidden = true;
    }
  }, 260);
}

function resetPromptViewportToTop() {
  const input = nodes.promptInput;
  if (!input) return;
  requestAnimationFrame(() => {
    input.scrollTop = 0;
    if (document.activeElement === input) {
      input.setSelectionRange(0, 0);
    }
  });
}

function setPromptMethod(method) {
  promptMethod = method === "reuse" || method === "reverse" ? method : "none";
  syncImageUploadLimitUi();
  if (promptMethod !== "reuse") {
    trimImagesToCurrentModeLimit({ silent: true });
  }
  nodes.reversePromptBtn?.setAttribute("aria-selected", method === "reverse" ? "true" : "false");
  nodes.visualReuseBtn?.setAttribute("aria-selected", method === "reuse" ? "true" : "false");
  nodes.dropZone?.classList.toggle("is-reuse-mode", method === "reuse");
  if (nodes.promptInput) {
    nodes.promptInput.readOnly = method === "reuse";
    nodes.promptInput.placeholder = method === "reuse"
      ? "查看方案后，这里会显示由 ReusePlan 编译的可执行提示词。"
      : "图片提示词会出现在这里，也可以直接输入中文或英文。";
  }
  syncGenerationModeTabs();
  renderImageStack();
  syncVisualReuseTextStrategyUi();
  renderVisualReusePlan(method === "reuse" ? promptMeta.reusePlan : null);
  syncGenerateAction();
}

function syncVisualReuseTextStrategyUi() {
  const mode = normalizeVisualReuseTextMode(nodes.visualReuseTextMode?.value);
  if (nodes.visualReuseTextMode && nodes.visualReuseTextMode.value !== mode) {
    nodes.visualReuseTextMode.value = mode;
  }
  const needsCopy = mode === "with-text";
  if (nodes.visualReuseTextContentField) {
    nodes.visualReuseTextContentField.hidden = !needsCopy;
  }
  if (nodes.visualReuseTextContent) {
    nodes.visualReuseTextContent.required = needsCopy;
    nodes.visualReuseTextContent.setAttribute("aria-required", needsCopy ? "true" : "false");
  }
}

function visualReuseCopyContent() {
  const title = nodes.visualReuseTextContent?.value.trim() || "";
  const subtitle = nodes.visualReuseTextSubtitle?.value.trim() || "";
  return [title, subtitle].filter(Boolean).join("\n");
}

function currentReusePlanInput(targets = getVisualReuseTargetImages()) {
  const width = Number(nodes.widthInput?.value);
  const height = Number(nodes.heightInput?.value);
  if (!Number.isFinite(width) || width < 128 || width > 4096) {
    throw new Error("目标宽度需在 128-4096 之间。");
  }
  if (!Number.isFinite(height) || height < 128 || height > 4096) {
    throw new Error("目标高度需在 128-4096 之间。");
  }

  const options = visualReuseOptions();
  const textMode = normalizeVisualReuseTextMode(nodes.visualReuseTextMode?.value);
  if (textMode === "with-text" && !nodes.visualReuseTextContent?.value.trim()) {
    throw new Error("请填写要生成的标题。");
  }
  return {
    coreRequirement: nodes.visualReuseNotes?.value.trim() || "",
    assetType: options.assetTypeValue,
    assetTypeLabel: selectText(nodes.visualReuseAssetType, "按图片自动判断"),
    reuseMode: options.reuseModeValue,
    reuseModeLabel: selectText(nodes.visualReuseStrength, "精准继承"),
    style: options.styleValue,
    styleLabel: selectText(nodes.visualReuseStyle, "保持原图风格"),
    generationMode,
    textMode,
    textContent: textMode === "with-text" ? visualReuseCopyContent() : "",
    width,
    height,
    sizeMode: nodes.sizeMode?.value || "custom",
    resolution: activeResolution,
    ratioLabel: nodes.sizePickerText?.textContent || `${width} × ${height}`,
    references: targets.map((item, index) => ({
      id: item.id,
      name: item.name,
      width: item.width,
      height: item.height,
      dimensionsVerified: Boolean(item.dimensionsVerified),
      dimensionsVerifiedAt: item.dimensionsVerifiedAt || "",
      assetSource: normalizeAssetSource(item.assetSource, item.src),
      roles: effectiveVisualReuseRoles(item, index),
      rolesManual: Boolean(item.visualReuseRolesManual),
      rolesNaturalLanguage: !item.visualReuseRolesManual && rolesFromCoreRequirement(index).length > 0,
      strength: item.visualReuseWeightManual
        ? normalizeVisualReuseWeight(item.visualReuseWeight)
        : defaultVisualReuseWeight(index, effectiveVisualReuseRoles(item, index), item.visualReuseRolesManual),
      locked: item.visualReuseLocked !== false
    }))
  };
}

function createCurrentReusePlanDraft(targets = getVisualReuseTargetImages(), extra = {}) {
  return reusePlanApi().createDraft({
    ...currentReusePlanInput(targets),
    ...extra
  });
}

function isReusePlanCurrent(plan = promptMeta.reusePlan) {
  if (promptMethod !== "reuse" || !plan) return false;
  try {
    return plan.inputFingerprint === createCurrentReusePlanDraft().inputFingerprint;
  } catch {
    return false;
  }
}

async function ensureActualReferenceDimensions(targets) {
  let correctedCount = 0;
  for (let index = 0; index < targets.length; index += 1) {
    const item = targets[index];
    const source = item.dataUrl || item.src;
    if (!source) {
      throw new Error(`参考图 ${index + 1} 缺少可读取的图片来源。`);
    }
    let dimensions;
    try {
      dimensions = await readImageDimensions(source);
    } catch {
      throw new Error(`参考图 ${index + 1} 无法完成真实尺寸校验，请重新添加这张图片。`);
    }
    if (!dimensions.width || !dimensions.height) {
      throw new Error(`参考图 ${index + 1} 没有可用的真实像素尺寸。`);
    }
    if (item.width !== dimensions.width || item.height !== dimensions.height) {
      correctedCount += 1;
    }
    item.width = dimensions.width;
    item.height = dimensions.height;
    item.dimensionsVerified = true;
    item.dimensionsVerifiedAt = new Date().toISOString();
  }

  if (correctedCount) {
    syncActiveImageState();
  } else {
    renderImageStack();
  }
  saveWorkspaceState();
  return correctedCount;
}

function sourceKindLabel(kind) {
  return {
    "local-file": "本地文件",
    "clipboard-file": "剪贴板文件",
    "clipboard-url": "粘贴链接",
    "page-drag": "网页拖入",
    "context-menu": "网页右键",
    "web-url": "网页链接",
    legacy: "旧数据"
  }[kind] || "其他来源";
}

function renderVisualReusePlan(planInput) {
  if (!nodes.visualReusePlan) return;
  if (!planInput || promptMethod !== "reuse") {
    nodes.visualReusePlan.hidden = true;
    if (nodes.reuseCompiledPromptDetails) {
      nodes.reuseCompiledPromptDetails.hidden = true;
      nodes.reuseCompiledPromptDetails.open = false;
    }
    nodes.visualReusePlanFacts.replaceChildren();
    nodes.visualReuseFullAnalysis?.replaceChildren();
    nodes.visualReuseLineageList.replaceChildren();
    nodes.visualReusePlanBtn.textContent = "查看方案";
    return;
  }
  let plan;
  try { plan = reusePlanApi().normalizePlan(planInput); }
  catch {
    nodes.visualReusePlan.hidden = true;
    if (nodes.reuseCompiledPromptDetails) nodes.reuseCompiledPromptDetails.hidden = true;
    return;
  }
  const issues = Array.isArray(plan.validation?.issues) ? plan.validation.issues : [];
  const errorCount = issues.filter((issue) => issue.severity === "error").length;
  const warningCount = issues.filter((issue) => issue.severity === "warning").length;
  nodes.visualReusePlan.hidden = false;
  if (nodes.reuseCompiledPromptDetails) {
    nodes.reuseCompiledPromptDetails.hidden = !nodes.promptInput.value.trim();
    if (nodes.reuseCompiledPromptPreview) nodes.reuseCompiledPromptPreview.textContent = nodes.promptInput.value;
  }
  nodes.visualReusePlanTitle.textContent = `复用方案 · ${plan.references.length} 张参考图`;
  nodes.visualReusePlanStatus.textContent = errorCount ? `${errorCount} 项待修正`
    : warningCount ? `已建立 · ${warningCount} 项提示` : "已校验";
  nodes.visualReusePlanSummary.textContent = plan.analysis?.summary || plan.intent?.coreRequirement || "方案已建立。";
  const roleSections = [
    ["主体", ["subject"], "保持主体与动作"],
    ["构图与留白", ["composition"], "参考构图、主体位置和留白"],
    ["排版与字体", ["layout", "typography"], "参考标题比例、位置与字体气质"],
    ["色彩与光影", ["color_material"], "参考配色与光影"],
    ["风格与材质", ["style"], "参考风格与材质"],
    ["装饰", ["decoration", "auxiliary"], "借鉴装饰语言"]
  ];
  const facts = roleSections.flatMap(([label, roles, guidance]) => {
    const references = plan.references.filter((reference) => roles.some((role) => reference.roles.includes(role)));
    if (!references.length) return [];
    const origins = references.map((reference) => reference.order).join("、");
    return [[label, `来自图${origins} · ${guidance}`]];
  });
  const textLabel = {
    reserve: "参考排版，文字后期添加",
    "with-text": plan.textStrategy.content ? `生成指定文字：${plan.textStrategy.content.replace(/\n/g, " / ")}` : "生成指定文字",
    none: "不需要文字",
    "keep-original": "保留原图文字",
    auto: "按资产用途判断"
  }[plan.textStrategy?.mode] || "按资产用途判断";
  facts.push(
    ["固定", plan.analysis?.inheritedTraits?.slice(0, 3).join("、") || "按参考角色保留核心特征"],
    ["变化", plan.analysis?.changedTraits?.slice(0, 3).join("、") || plan.intent?.coreRequirement || "按核心需求调整"],
    ["文字", textLabel],
    ["生成策略", expectedReferenceStrategy(plan)]
  );
  nodes.visualReusePlanFacts.replaceChildren();
  facts.forEach(([label, value]) => {
    const fact = document.createElement("div");
    fact.className = "visual-reuse-plan-fact";
    const name = document.createElement("span");
    name.textContent = label;
    const content = document.createElement("strong");
    content.textContent = value;
    fact.append(name, content);
    nodes.visualReusePlanFacts.append(fact);
  });
  visualReuseRoleConflicts().forEach((conflict) => {
    const card = document.createElement("div");
    card.className = "visual-reuse-plan-conflict";
    const message = document.createElement("strong");
    message.textContent = conflict.message;
    const actions = document.createElement("div");
    actions.className = "visual-reuse-plan-conflict-actions";
    const update = document.createElement("button");
    update.type = "button";
    update.textContent = "更新角色";
    update.addEventListener("click", () => {
      conflict.item.visualReuseRoles = conflict.suggested;
      conflict.item.visualReuseRole = "";
      conflict.item.visualReuseRolesManual = true;
      conflict.item.visualReuseConflictAcknowledged = "";
      renderImageStack();
      clearGeneratedPromptForReferenceChange("已按核心需求更新参考角色，请重新查看方案。");
      saveWorkspaceState();
    });
    const keep = document.createElement("button");
    keep.type = "button";
    keep.textContent = "保持当前设置";
    keep.addEventListener("click", () => {
      conflict.item.visualReuseConflictAcknowledged = conflict.signature;
      card.remove();
      saveWorkspaceState();
    });
    actions.append(update, keep);
    card.append(message, actions);
    nodes.visualReusePlanFacts.append(card);
  });
  const analysis = plan.analysis || {};
  const fields = [
    ["画面类型", analysis.imageType], ["主体", analysis.subject],
    ["动作姿态", analysis.action], ["场景", analysis.scene],
    ["构图", analysis.composition], ["排版文字", analysis.layout],
    ["色彩光照", analysis.colorLighting], ["材质质感", analysis.materialTexture],
    ["风格", analysis.style], ["装饰", analysis.decoration],
    ["继承要求", analysis.inheritedTraits?.join("、")],
    ["变化要求", analysis.changedTraits?.join("、")],
    ["避免", analysis.negativeConstraints?.join("、")],
    ["Role Check", plan.roleCheck?.join("；")],
    ["Self Check", plan.selfCheck?.join("；")],
    ["Prompt Structure", promptMeta.structure]
  ];
  nodes.visualReuseFullAnalysis?.replaceChildren();
  fields.forEach(([label, value]) => {
    if (!value) return;
    const row = document.createElement("p");
    row.textContent = `${label}：${value}`;
    nodes.visualReuseFullAnalysis?.append(row);
  });
  nodes.visualReuseLineageList.replaceChildren();
  plan.references.forEach((reference) => {
    const entry = document.createElement("li");
    entry.textContent = `图${reference.order} · ${reference.name} · ${reference.dimensions.width} × ${reference.dimensions.height} · ${reference.roleLabels.join("＋")}`;
    nodes.visualReuseLineageList.append(entry);
  });
  nodes.visualReusePlanBtn.textContent = "更新方案";
}

function expectedReferenceStrategy(plan) {
  const config = currentApiConfigFromForm().image;
  const model = config.model || nodes.modelSelect.value;
  let direct = [];
  if (config.provider === "apimart" && model === "gpt-image-2") {
    direct = plan.references.map((reference) => reference.order);
  } else if (config.provider === "runninghub" && isRunningHubG2Model(model)) {
    const mode = model === RUNNINGHUB_G2_OFFICIAL_MODEL ? RUNNINGHUB_API_MODE_OFFICIAL : config.runninghubMode;
    const selected = imageItems.map((item, index) => selectedImageIds.has(item.id) ? index + 1 : 0).filter(Boolean);
    direct = isRunningHubStandardApiMode(normalizeRunningHubApiMode(mode)) ? selected : selected.slice(0, 1);
    if (!direct.length && plan.references.length) direct = [1];
  }
  const analysis = plan.references.map((reference) => reference.order).filter((order) => !direct.includes(order));
  return `${direct.length ? `图${direct.join("、")}预计直接参与生成` : "该模型当前使用纯文本请求"}${analysis.length ? `；图${analysis.join("、")}用于分析` : ""}。实际来源以提交请求为准。`;
}

function syncGenerateAction() {
  if (!nodes.generateBtn) return;
  if (promptMethod === "reuse") {
    const ready = isReusePlanCurrent();
    nodes.generateBtn.disabled = !ready;
    nodes.generateBtn.textContent = ready ? "生成新视觉" : "先查看方案";
    return;
  }
  nodes.generateBtn.disabled = false;
  nodes.generateBtn.textContent = "生成图片";
}

function compileReusePlanToPrompt(planInput) {
  const compiled = reusePlanApi().compile(planInput);
  nodes.promptInput.value = compiled.chinese;
  promptMeta = {
    source: compiled.chinese,
    chinese: compiled.chinese,
    english: compiled.english,
    structure: compiled.structure,
    roleCheck: compiled.roleCheck,
    selfCheck: compiled.selfCheck,
    visualReuseFingerprint: visualReuseReferenceFingerprint(getVisualReuseTargetImages()),
    reusePlan: compiled.plan,
    reusePlanFingerprint: compiled.plan.inputFingerprint
  };
  renderVisualReusePlan(compiled.plan);
  syncGenerateAction();
  syncPromptCharCount();
  return compiled;
}

function adaptReusePlanToCurrentCanvas(planInput) {
  const previous = reusePlanApi().normalizePlan(planInput);
  const draft = createCurrentReusePlanDraft(getVisualReuseTargetImages(), {
    id: previous.id,
    createdAt: previous.createdAt,
    parentPlanId: previous.lineage?.parentPlanId
  });
  const next = {
    ...draft,
    status: previous.status === "draft" ? "ready" : previous.status,
    analysis: previous.analysis,
    analysisEn: previous.analysisEn,
    referenceInsights: previous.referenceInsights,
    roleCheck: previous.roleCheck,
    selfCheck: previous.selfCheck,
    textStrategy: {
      ...draft.textStrategy,
      layout: previous.textStrategy?.layout || "",
      rationale: previous.textStrategy?.rationale || ""
    },
    lineage: {
      ...previous.lineage,
      sourceAssetIds: draft.lineage.sourceAssetIds
    },
    compiler: previous.compiler
  };
  next.validation = reusePlanApi().validate(next);
  return next;
}

function syncReusePlanForCanvasChange() {
  if (isRestoringState || promptMethod !== "reuse" || !promptMeta.reusePlan) return;
  try {
    const compiled = compileReusePlanToPrompt(adaptReusePlanToCurrentCanvas(promptMeta.reusePlan));
    saveWorkspaceState();
    setStatus(`目标尺寸已更新为 ${compiled.plan.canvas.width} × ${compiled.plan.canvas.height}，复用方案与提示词已同步保留。`);
  } catch (error) {
    syncGenerateAction();
    setStatus(error?.message || "目标尺寸更新失败，请检查尺寸后重试。");
  }
}

// Legacy v1.5/v1.7 response helpers are retained for old workspace compatibility.
// The AssetFlow main path now analyzes into ReusePlan and compiles prompts in reuse-plan.js.
function visualReuseReferenceLine(item, index = 0) {
  const roles = effectiveVisualReuseRoles(item, index);
  const roleMetas = roles.map((role) => visualReuseRoleMeta(role, index));
  const manualRoles = normalizeVisualReuseRoles(item.visualReuseRoles || item.visualReuseRole);
  const hasManualRoles = Boolean(item.visualReuseRolesManual || manualRoles.length);
  const weight = item.visualReuseWeightManual
    ? (normalizeVisualReuseWeight(item.visualReuseWeight) || defaultVisualReuseWeight(index, roles, hasManualRoles))
    : defaultVisualReuseWeight(index, roles, hasManualRoles);
  const locked = item.visualReuseLocked !== false;
  const tagSource = manualRoles.length
    ? "user-selected"
    : "default fallback";
  const size = item.width && item.height ? item.width + "x" + item.height : "size unknown";
  const name = item.name || "reference-" + (index + 1);
  const roleLimits = [];
  if (!roles.includes("subject")) {
    roleLimits.push("non-subject rule: do not inherit this image's main person, product, vehicle, character, object, scene, or story as the final subject");
  }
  if (roles.includes("subject")) {
    roleLimits.push("subject ownership: this image is allowed to define the final subject within the selected strength");
  }
  if (roles.includes("color_material")) {
    roleLimits.push("color/material scope: inherit only palette, lighting, contrast, texture, material, and atmosphere unless another selected role says otherwise");
  }
  if (roles.includes("composition")) {
    roleLimits.push("composition scope: inherit framing and spatial structure, not this image's subject unless subject is also selected");
  }
  if (roles.includes("layout") || roles.includes("typography")) {
    roleLimits.push("layout/typography scope: inherit text hierarchy, title area, type mood, and text-image rhythm, not original wording or subject");
  }
  if (roles.includes("decoration")) {
    roleLimits.push("decoration scope: decoration stays secondary and cannot become the main subject");
  }
  if (roles.includes("auto")) {
    roleLimits.push("auto analysis scope: extract only useful secondary visual traits; do not override explicit role images");
  }
  return [
    "Image " + (index + 1),
    "roles: " + roleMetas.map((role) => role.label + " (" + role.value + ")").join(", "),
    "tag source: " + tagSource,
    "weight: " + weight + " (" + visualReuseWeightLabel(weight) + ")",
    "weight rule: " + (VISUAL_REUSE_WEIGHT_OPTIONS.find((option) => option.value === weight)?.prompt || ""),
    "locked: " + (locked ? "true" : "false"),
    "role boundaries: " + roleMetas.map((role) => role.prompt).join(" | "),
    roleLimits.join(" | "),
    "file: " + name,
    "size: " + size
  ].filter(Boolean).join(" | ");
}

function visualReuseReferenceBrief(images) {
  return images.map(visualReuseReferenceLine).join("\n");
}

function visualReuseSubjectOwnershipRule(images) {
  const subjectIndexes = images
    .map((item, index) => effectiveVisualReuseRoles(item, index).includes("subject") ? index + 1 : 0)
    .filter(Boolean);
  if (!subjectIndexes.length) {
    return "No explicit Subject Reference is selected. Infer the subject from the most suitable reference, but still obey each role boundary.";
  }
  return [
    "Explicit Subject Reference images: " + subjectIndexes.map((index) => "Image " + index).join(", ") + ".",
    "The final main subject must come from these Subject Reference image(s).",
    "When exactly one Subject Reference image is selected, the Subject field in Chinese Prompt and English Prompt must describe only that image's subject.",
    "Images without Subject Reference must not introduce their own main person, product, vehicle, character, object, scene, or story into the final subject.",
    "For non-subject reference images, ignore their visible main object when writing the Subject field unless the user explicitly assigns Subject Reference to that image.",
    "For example, a Color / Material Reference may affect palette and texture only; its visible object must not become the final subject unless that image is also tagged as Subject Reference.",
    "In Role Check, explicitly state which image owns the final subject and which images are forbidden from changing it."
  ].join(" ");
}

function normalizeVisualReuseImages(input) {
  return (Array.isArray(input) ? input : [input]).filter(Boolean).slice(0, MAX_UPLOAD_IMAGES);
}

function visualReuseLabel(map, value, fallback) {
  return map[value] || fallback || value || "";
}

function visualReuseOptions() {
  const assetTypeValue = nodes.visualReuseAssetType?.value || "auto";
  const reuseModeValue = normalizeVisualReuseMode(nodes.visualReuseStrength?.value);
  const styleValue = nodes.visualReuseStyle?.value || "original";
  const textModeValue = normalizeVisualReuseTextMode(nodes.visualReuseTextMode?.value);
  const assetTypeMap = {
    auto: "Auto detect",
    poster: "Poster",
    "brand-kv": "Brand key visual",
    xiaohongshu: "Xiaohongshu cover",
    ecommerce: "E-commerce hero image",
    advertising: "Advertising visual",
    ip: "IP character extension",
    ui: "UI screen",
    video: "Video keyframe",
    "event-kv": "Event key visual",
    product: "Product promotion image",
    social: "Social media image"
  };
  const reuseModeMap = {
    precise_inherit: "Precise inheritance",
    balanced_reuse: "Balanced reuse",
    creative_rewrite: "Creative rewrite"
  };
  const styleMap = {
    original: "Keep original style direction",
    auto: "Auto detect from references",
    premium: "More premium",
    commercial: "More commercial",
    minimal: "More minimal",
    fashion: "More fashionable",
    tech: "More technology-driven",
    young: "Younger and more social-media friendly",
    stable: "More stable",
    impact: "More visually impactful",
    cinematic: "More cinematic",
    light: "Lighter",
    real: "More realistic",
    artistic: "More artistic",
    luxury: "More luxury",
    future: "More futuristic"
  };
  const textModeMap = {
    auto: "Decide text treatment by use case",
    "with-text": "Generate visible text",
    reserve: "Reserve text area only",
    none: "No visible text",
    "enhance-title": "Enhance title expression",
    "weaken": "Weaken text",
    "generate-title-style": "Generate title style",
    "replace-copy": "Replace original copy",
    "typography-only": "Extract typography only",
    "title-position": "Keep title position logic"
  };

  return {
    assetTypeValue,
    reuseModeValue,
    styleValue,
    textModeValue,
    assetType: visualReuseLabel(assetTypeMap, assetTypeValue, "Auto detect"),
    reuseMode: visualReuseLabel(reuseModeMap, reuseModeValue, "Precise inheritance"),
    style: visualReuseLabel(styleMap, styleValue, "Keep original style direction"),
    textMode: visualReuseLabel(textModeMap, textModeValue, "Decide text treatment by use case"),
    notes: nodes.visualReuseNotes?.value.trim() || "",
    coreRequirement: nodes.visualReuseNotes?.value.trim() || "",
    textContent: visualReuseCopyContent(),
    ratio: nodes.sizePickerText?.textContent || selectText(nodes.sizeMode) || "Auto",
    generation: generationMode === "image" ? "Image to image" : "Text to image"
  };
}

function visualReuseInstruction(options, images = []) {
  const referenceBrief = visualReuseReferenceBrief(images);
  const subjectOwnershipRule = visualReuseSubjectOwnershipRule(images);
  const includeDetailedOutput = options.includeDetailed !== false;
  const reuseModeRule = {
    precise_inherit: "Default mode. Accurately inherit the user-specified traits inside each image role. Do not randomly redesign selected traits.",
    balanced_reuse: "Preserve the core selected traits, while allowing controlled cleanup, optimization, and local variation.",
    creative_rewrite: "Borrow the main visual language only and allow clear changes, but still respect locked roles and user notes."
  }[options.reuseModeValue] || "Accurately inherit user-specified traits inside each selected role.";

  return [
    "You are a senior visual designer and AI image prompt engineer.",
    "",
    "Task:",
    "Create a visual reuse generation prompt from one or more reference images.",
    "The goal is to combine user-specified traits from different reference images into one coherent final image.",
    "",
    "Version: Visual Reuse Prompt Template v1.7 - Precise Extraction & Structured Execution Edition.",
    "",
    "Core Logic:",
    "Visual reuse means accurate inheritance within the user-specified role.",
    "Do not randomly redesign the traits assigned by the user.",
    "Use two output layers: complete internal analysis for overview/debug, and a structured execution prompt for the homepage textbox and image-generation API.",
    "The homepage prompt and the image-generation API prompt must be a structured execution prompt, not an ultra-short paragraph and not a long analysis report.",
    "The complete reasoning structure is only for the overview/detail view.",
    "If an image is marked as Subject Reference with high reuse strength, preserve the subject's pose, action, outfit structure, body angle, camera relationship, mood, and key visible traits as closely as possible.",
    "If an image is marked as Color / Material Reference with high reuse strength, preserve its palette, color ratio, lighting, material, texture, contrast, and atmosphere as closely as possible.",
    "If an image is marked as Composition Reference with high reuse strength, preserve its framing, subject placement, visual center, whitespace, camera angle, and spatial structure as closely as possible.",
    "If an image is marked as Layout or Typography Reference with high reuse strength, preserve its title position, text hierarchy, title scale, font feeling, text-image relationship, and visual rhythm as closely as possible.",
    "If an image is marked as Decoration Reference, preserve its decorative language only within a secondary visual role. Decoration must never become the main subject.",
    "If an image is marked as Auto Analysis, extract only useful secondary visual traits after all explicit role images have been respected.",
    "",
    "Subject Ownership Rule:",
    subjectOwnershipRule,
    "This rule is mandatory. Do not let non-subject reference images replace or redefine the final main subject.",
    "If there is any conflict, Subject Reference wins over Style, Color / Material, Decoration, Auxiliary, and Auto Analysis.",
    "",
    "Change Rules:",
    "Only change a specified trait when:",
    "1. The user explicitly asks for the change.",
    "2. The image reuse strength is medium or low.",
    "3. Different reference roles conflict and must be resolved.",
    "4. The element is a logo, trademark, watermark, exact original text, real-person identity, protected character identity, private UI detail, or other element that should be transformed into a general visual trait.",
    "Extra notes are the main change switch. If the user does not ask for a change, preserve the selected traits according to each role and strength.",
    "",
    "Reference Images:",
    referenceBrief || "Image 1 | Primary reference.",
    "",
    "Global Options:",
    "Reuse mode: " + options.reuseMode,
    "Reuse mode rule: " + reuseModeRule,
    "Asset goal: " + options.assetType,
    "Style direction: " + options.style,
    "Text treatment: " + options.textMode,
    "Target ratio or size: " + options.ratio,
    "Generation mode: " + options.generation,
    "Extra notes: " + (options.notes || "None"),
    "",
    "Hard Canvas Rule:",
    "The selected target ratio or size has absolute priority over all reference images and prompt wording.",
    "If the selected target is wide, write a full-width horizontal composition. If the selected target is portrait, write a full-height portrait composition. If the selected target is square, write a square composition.",
    "Never describe a poster-in-frame, letterboxed image, cropped mockup, or canvas that contradicts the selected target size.",
    "",
    "Reuse strength rule:",
    "- If the user manually assigns a role but does not choose a strength, use High Strength by default.",
    "- If the role is automatically inferred, use Medium Strength by default.",
    "- High strength means accurate inheritance within that role.",
    "- Medium strength means preserve core traits with controlled changes.",
    "- Low strength means borrow only the general direction.",
    "",
    "Role rules:",
    "1. Subject Reference",
    "High strength: preserve subject type, pose, action, outfit structure, hair silhouette, body angle, expression mood, gesture, props, subject scale, and camera relationship.",
    "Medium strength: preserve subject type, general pose, mood, and outfit style, while allowing detail changes.",
    "Low strength: preserve only subject category and emotional direction.",
    "Do not change pose, outfit structure, or subject mood at high strength unless the user asks.",
    "",
    "2. Composition Reference",
    "High strength: preserve framing, subject placement, subject scale, visual center, whitespace direction, camera angle, depth relationship, and composition skeleton.",
    "Medium strength: preserve visual center, approximate placement, and whitespace logic.",
    "Low strength: preserve only the general composition direction.",
    "Do not change the core framing at high strength unless the user asks.",
    "",
    "3. Layout Reference",
    "High strength: preserve title area, title scale, text hierarchy, text direction, information zones, spacing rhythm, and text-image relationship.",
    "Medium strength: preserve main title position, hierarchy, and general text-image relationship.",
    "Low strength: preserve only the layout mood.",
    "Do not remove or weaken the title area at high strength unless the user chooses no text.",
    "",
    "4. Typography Reference",
    "High strength: preserve font feeling, weight, width, compression, title scale, deformation style, text impact, material feeling, and relationship with the subject.",
    "Medium strength: preserve font mood, scale, and general weight.",
    "Low strength: preserve only the typography direction.",
    "Do not copy original wording unless the user explicitly asks.",
    "",
    "5. Color / Material Reference",
    "High strength: preserve main palette, secondary colors, color ratio, contrast, saturation, brightness, lighting direction, highlight style, shadow style, texture, grain, material, and atmosphere.",
    "Medium strength: preserve palette direction, lighting mood, and material type.",
    "Low strength: preserve only the color mood.",
    "Do not change the main color system at high strength unless the user asks.",
    "",
    "6. Style Reference",
    "High strength: preserve overall aesthetic, commercial polish, artistic direction, rendering style, visual language, and design maturity.",
    "Medium strength: preserve overall mood and visual language.",
    "Low strength: preserve only the style direction.",
    "",
    "7. Decoration Reference",
    "High strength: preserve decoration type, line language, light trails, particles, geometric accents, decoration density, and relationship with the subject.",
    "Medium strength: preserve decorative style and some local accents.",
    "Low strength: preserve only subtle decorative mood.",
    "Decoration must always remain secondary and must never become the main subject or dominate the composition.",
    "",
    "8. Auxiliary Reference",
    "Use for small props, local details, and secondary visual features.",
    "Auxiliary reference must not override subject, composition, layout, typography, color, or style references.",
    "",
    "9. Auto Analysis Reference",
    "Use only after all explicit role tags have been applied. Extract helpful secondary traits, but do not override the subject owner or introduce unrelated subjects.",
    "",
    "Priority order when resolving conflicts:",
    "1. Selected canvas ratio/size.",
    "2. Explicit user extra notes.",
    "3. Locked image roles.",
    "4. Subject reference.",
    "5. Composition reference.",
    "6. Layout reference.",
    "7. Typography reference.",
    "8. Color / Material reference.",
    "9. Style reference.",
    "10. Decoration reference.",
    "11. Auxiliary reference.",
    "12. Auto analysis reference.",
    "",
    "Analysis steps:",
    "1. Read the role tags for each image.",
    "2. Read the reuse strength for each image.",
    "3. Decide which traits must be accurately inherited, which traits may change, and which traits must be avoided.",
    "4. Resolve conflicts according to the priority order.",
    "5. Write the complete structure for the overview/detail view.",
    "6. Compress the final result into the 12-field structured execution prompt for the homepage and image-generation API.",
    "",
    "Two-layer output rule:",
    "- Chinese Prompt and English Prompt are structured execution prompts. They are used directly by the homepage and image-generation API.",
    "- Prompt Structure, Role Check, and Self Check are complete explanations for the overview/detail view only.",
    "- Chinese Prompt must use exactly these 12 labels: 画面类型, 主体, 动作姿态, 构图, 排版文字, 色彩光照, 材质质感, 风格, 装饰, 继承要求, 变化要求, 避免.",
    "- Each label must contain one concise paragraph. Keep the prompt precise enough for image generation.",
    "- Suggested Chinese Prompt length: single-image 300-500 Chinese characters, 2-3 image visual reuse 500-900 Chinese characters, complex commercial poster up to 900-1200 Chinese characters.",
    "- Do not include process explanations such as 'from image 1' or 'from image 2' inside Chinese Prompt or English Prompt.",
    "- Do not mention unavailable references, Role Check, Self Check, internal reasoning, or repeated inheritance checklists inside Chinese Prompt or English Prompt.",
    "- Mention only traits that affect generation. Remove redundant inheritance wording and any reference details that were not selected by the user.",
    "",
    "Return exactly these sections:",
    "Chinese Prompt:",
    "画面类型：...",
    "主体：...",
    "动作姿态：...",
    "构图：...",
    "排版文字：...",
    "色彩光照：...",
    "材质质感：...",
    "风格：...",
    "装饰：...",
    "继承要求：...",
    "变化要求：...",
    "避免：...",
    "",
    "English Prompt:",
    "Image Type: ...",
    "Subject: ...",
    "Pose and Action: ...",
    "Composition: ...",
    "Layout and Text: ...",
    "Color and Lighting: ...",
    "Material and Texture: ...",
    "Style: ...",
    "Decoration: ...",
    "Inheritance Requirements: ...",
    "Change Requirements: ...",
    "Avoid: ...",
    "",
    "Prompt Structure:",
    "Subject: ...",
    "Pose and Action: ...",
    "Composition: ...",
    "Layout and Text: ...",
    "Color and Lighting: ...",
    "Material and Texture: ...",
    "Style: ...",
    "Decoration: ...",
    "Inherited Traits: ...",
    "Changed Traits: ...",
    "Negative Constraints: ...",
    "",
    "Role Check:",
    "Image 1: ...",
    "Image 2: ...",
    "Image 3: ...",
    "Image 4: ...",
    "",
    "Self Check:",
    "- Are the user-specified traits inherited accurately?",
    "- Are high-strength references preserved instead of randomly redesigned?",
    "- Are changes only made where the user requested or where strength allows?",
    "- Does decoration remain secondary?",
    "- Is the final prompt a coherent new image made from the selected traits?",
    "",
    includeDetailedOutput
      ? "Detailed output is enabled. Return Chinese Prompt, English Prompt, Prompt Structure, Role Check, and Self Check."
      : "Detailed output is disabled. Override the detailed template above and return only Chinese Prompt. Do not return English Prompt, Prompt Structure, Role Check, or Self Check.",
    "",
    "Do not include markdown fences. Do not mention that you are an AI."
  ].join("\n");
}

function visualReuseEscapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractVisualReuseSection(text, startLabels, stopLabels = []) {
  const source = String(text || "");
  if (!source.trim()) return "";
  const starts = startLabels.map(visualReuseEscapeRegExp).join("|");
  const headingPrefix = "(?:#{1,6}\\s*)?(?:[-*]\\s*)?(?:\\*\\*)?";
  const headingSuffix = "(?:\\*\\*)?";
  const startRegex = new RegExp("(?:^|\\n)\\s*" + headingPrefix + "(?:" + starts + ")" + headingSuffix + "\\s*[:：]?\\s*", "i");
  const startMatch = source.match(startRegex);
  if (!startMatch || startMatch.index === undefined) return "";
  const start = startMatch.index + startMatch[0].length;
  const rest = source.slice(start);
  let end = rest.length;
  if (stopLabels.length) {
    const stops = stopLabels.map(visualReuseEscapeRegExp).join("|");
    const stopRegex = new RegExp("\\n\\s*" + headingPrefix + "(?:" + stops + ")" + headingSuffix + "\\s*[:：]?\\s*", "i");
    const stopMatch = rest.match(stopRegex);
    if (stopMatch && stopMatch.index !== undefined) {
      end = stopMatch.index;
    }
  }
  return rest.slice(0, end).trim();
}

const CHINESE_PROMPT_SECTION_LABELS = [
  "画面类型",
  "主体",
  "动作姿态",
  "动作姿势",
  "构图",
  "排版文字",
  "色彩光照",
  "材质质感",
  "风格",
  "装饰",
  "继承要求",
  "变化要求",
  "避免"
];

const ENGLISH_PROMPT_SECTION_LABELS = [
  "Image Type",
  "Subject",
  "Pose and Action",
  "Composition",
  "Layout and Text",
  "Color and Lighting",
  "Material and Texture",
  "Style",
  "Decoration",
  "Inheritance Requirements",
  "Change Requirements",
  "Avoid"
];

function stripPromptSectionChrome(text) {
  return String(text || "")
    .replace(/^\s*(?:-{3,}|\*{3,})\s*$/gm, "")
    .replace(/^\s*#{1,6}\s*/gm, "")
    .trim();
}

function normalizePromptSectionTitle(title) {
  return String(title || "")
    .replace(/^\*+|\*+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatPromptSections(text, labels) {
  const source = stripPromptSectionChrome(text);
  if (!source) return "";
  const labelPattern = labels
    .map((label) => visualReuseEscapeRegExp(label))
    .join("|");
  const sectionRegex = new RegExp(
    "(?:^|\\n)\\s*(?:[-*]\\s*)?(?:\\*\\*)?(" + labelPattern + ")(?:\\*\\*)?\\s*[:：]\\s*([\\s\\S]*?)(?=\\n\\s*(?:[-*]\\s*)?(?:\\*\\*)?(?:" + labelPattern + ")(?:\\*\\*)?\\s*[:：]|$)",
    "gi"
  );
  const sections = [];
  const usedCanonicalTitles = new Set();
  let match;
  while ((match = sectionRegex.exec(source))) {
    const rawTitle = normalizePromptSectionTitle(match[1]);
    const canonical = labels.find((label) => label.toLowerCase() === rawTitle.toLowerCase()) || rawTitle;
    if (usedCanonicalTitles.has(canonical)) continue;
    const body = String(match[2] || "")
      .replace(/^\s*[-*]\s+/gm, "")
      .replace(/\*\*/g, "")
      .replace(/^\s*#{1,6}\s*/gm, "")
      .replace(/[ \t]+\n/g, "\n")
      .trim();
    if (!body) continue;
    usedCanonicalTitles.add(canonical);
    sections.push(`${canonical}：\n${body}`);
  }

  if (sections.length) {
    return sections.join("\n\n");
  }

  return source
    .replace(/\*\*([^*：:]+)[:：]?\*\*\s*[:：]?\s*/g, "$1：\n")
    .replace(/\*\*/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function formatChinesePromptSections(text) {
  return formatPromptSections(text, CHINESE_PROMPT_SECTION_LABELS);
}

function formatEnglishPromptSections(text) {
  return formatPromptSections(text, ENGLISH_PROMPT_SECTION_LABELS);
}

function cleanHomepagePromptText(text) {
  return String(text || "")
    .replace(/\*\*([^*\n：:]+)[:：]?\*\*\s*[:：]?\s*/g, "$1：\n")
    .replace(/\*\*/g, "")
    .replace(/^\s*#{1,6}\s*/gm, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseVisualReusePromptResponse(text) {
  const source = String(text || "").trim();
  const chinese = extractVisualReuseSection(source, ["Chinese Prompt"], ["English Prompt", "Prompt Structure", "Role Check", "Self Check"]);
  const english = extractVisualReuseSection(source, ["English Prompt"], ["Prompt Structure", "Role Check", "Self Check"]);
  const structure = extractVisualReuseSection(source, ["Prompt Structure"], ["Role Check", "Self Check"]);
  const roleCheck = extractVisualReuseSection(source, ["Role Check"], ["Self Check"]);
  const selfCheck = extractVisualReuseSection(source, ["Self Check"]);
  const fallbackChinese = hasChinese(source) ? source : "";
  const fallbackEnglish = hasChinese(source) ? "" : source;
  const cleanChinese = chinese
    ? cleanHomepagePromptText(formatChinesePromptSections(chinese))
    : (fallbackChinese ? cleanHomepagePromptText(formatChinesePromptSections(fallbackChinese)) : "");
  const structureWithChecks = [
    structure || extractPromptStructureText(source),
    roleCheck ? "Role Check:\n" + roleCheck : "",
    selfCheck ? "Self Check:\n" + selfCheck : ""
  ].filter(Boolean).join("\n\n");
  return {
    chinese: cleanChinese,
    english: cleanHomepagePromptText(formatEnglishPromptSections(english || fallbackEnglish)),
    structure: structureWithChecks,
    roleCheck,
    selfCheck
  };
}

function safeParseJsonResponse(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return { raw };
  }
}

async function callVisualReusePromptApi(imageInput, instruction) {
  const config = currentApiConfigFromForm();
  const prompt = config.prompt;
  const images = normalizeVisualReuseImages(imageInput);
  assertPromptProviderSupportsImageInput(prompt, "视觉复用");

  if (!images.length) {
    throw new Error("请先添加至少 1 张参考图，再使用视觉复用。");
  }

  if (!prompt.baseUrl || (!prompt.apiKey && prompt.provider !== "custom")) {
    throw new Error("请先保存反推提示词 API 设置。");
  }

  const dataUrls = [];
  for (const imageItem of images) {
    const imageUrl = imageItem.dataUrl || imageItem.src;
    if (!imageUrl || imageUrl.startsWith("blob:")) {
      throw new Error("这张图片需要真实 URL 或上传数据后才能分析。");
    }
    dataUrls.push(await imageSourceAsDataUrl(imageItem));
  }

  if (prompt.provider === "gemini") {
    const imageParts = dataUrls.flatMap((dataUrl, index) => {
      const parsed = parseDataUrl(dataUrl);
      if (!parsed) {
        throw new Error("无法把上传图片解析为 base64 数据。");
      }
      return [
        {
          text: "Reference image binding:\n" + visualReuseReferenceLine(images[index], index)
        },
        {
          inline_data: {
            mime_type: parsed.mimeType,
            data: parsed.data
          }
        }
      ];
    });

    const response = await fetch(baseUrlWithPath(prompt.baseUrl, "/models/" + prompt.model + ":generateContent"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": prompt.apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: instruction },
              ...imageParts
            ]
          }
        ]
      })
    });

    const raw = await response.text();
    const data = safeParseJsonResponse(raw);
    if (!response.ok) {
      throw new Error(friendlyApiErrorMessage(data?.error?.message || "视觉复用 API 请求失败：HTTP " + response.status, prompt.providerLabel));
    }

    const content = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();
    if (!content) throw new Error("视觉复用 API 没有返回文本。");
    return content;
  }

  const headers = {
    "Content-Type": "application/json"
  };
  if (prompt.apiKey) {
    headers.Authorization = "Bearer " + prompt.apiKey;
  }

  const contentParts = [
    { type: "text", text: instruction },
    ...dataUrls.flatMap((url, index) => ([
      {
        type: "text",
        text: "Reference image binding:\n" + visualReuseReferenceLine(images[index], index)
      },
      {
        type: "image_url",
        image_url: { url }
      }
    ]))
  ];

  const response = await fetch(baseUrlWithPath(prompt.baseUrl, prompt.provider === "grsai" ? "/v1/chat/completions" : "/chat/completions"), {
    method: "POST",
    headers,
    body: JSON.stringify(openAiCompatibleChatPayload(prompt, [
        {
          role: "user",
          content: contentParts
        }
      ], 3600))
  });

  const raw = await response.text();
  const data = safeParseJsonResponse(raw);
  if (!response.ok) {
    throw new Error(friendlyApiErrorMessage(apiResponseErrorText(data, "视觉复用 API 请求失败：HTTP " + response.status), prompt.providerLabel));
  }

  const content = data?.choices?.[0]?.message?.content || data?.output_text || data?.text;
  if (!content) throw new Error("视觉复用 API 没有返回文本。");
  return String(content).trim();
}

async function generateVisualReusePrompt() {
  setPromptMethod("reuse");
  const targets = getVisualReuseTargetImages();
  if (!targets.length) {
    setStatus("请先添加至少 1 张参考图，再使用视觉复用。");
    return;
  }
  if (!nodes.visualReuseNotes?.value.trim()) {
    setStatus("请先填写核心需求，说明最终要做什么以及需要保留或改变什么。");
    nodes.visualReuseNotes?.focus();
    return;
  }

  setPromptThinking(true);
  try {
    setStatus(`正在校验 ${targets.length} 张参考图的真实尺寸...`);
    const correctedCount = await ensureActualReferenceDimensions(targets);
    const draft = createCurrentReusePlanDraft(targets);
    const draftValidation = reusePlanApi().validate(draft);
    const draftErrors = draftValidation.issues.filter((issue) => issue.severity === "error");
    if (draftErrors.length) {
      throw new Error(draftErrors.map((issue) => issue.message).join(" "));
    }
    const instruction = reusePlanApi().buildAnalysisInstruction(draft);
    setStatus(targets.length > 1
      ? `正在分析 ${targets.length} 张参考图，建立 ReusePlan...`
      : "正在分析参考图，建立 ReusePlan...");
    const content = await callVisualReusePromptApi(targets, instruction);
    const plan = reusePlanApi().applyAnalysisResponse(draft, content);
    compileReusePlanToPrompt(plan);
    saveWorkspaceState();
    resetPromptViewportToTop();
    const correctionTip = correctedCount ? `，并修正了 ${correctedCount} 张图片的记录尺寸` : "";
    setStatus(`ReusePlan 已建立${correctionTip}。确认方案后可生成新视觉。`);
  } catch (error) {
    renderVisualReusePlan(null);
    syncGenerateAction();
    setStatus(error.message || "复用方案建立失败，请检查反推 API 设置。");
  } finally {
    setPromptThinking(false);
  }
}

function generateNewVisualFromReusePlan() {
  if (!isReusePlanCurrent()) {
    setStatus("当前参考图、核心需求或尺寸已变化，请先查看并更新方案。");
    setVisualReusePanelOpen(true);
    return;
  }
  try {
    compileReusePlanToPrompt(promptMeta.reusePlan);
    saveWorkspaceState();
    generate();
  } catch (error) {
    setStatus(error.message || "ReusePlan 编译失败，请更新方案后重试。");
  }
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

  const response = await fetch(baseUrlWithPath(prompt.baseUrl, prompt.provider === "grsai" ? "/v1/chat/completions" : "/chat/completions"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${prompt.apiKey}`
    },
    body: JSON.stringify(openAiCompatibleChatPayload(prompt, [{ role: "user", content: instruction }], 500))
  });

  const raw = await response.text();
  const data = raw ? JSON.parse(raw) : {};
  if (!response.ok) {
    throw new Error(apiResponseErrorText(data, `翻译 API 请求失败：${response.status}`));
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
    return { source: "", chinese: "", english: "", structure: "", roleCheck: "", selfCheck: "" };
  }

  const structuredChinese = extractVisualReuseSection(source, ["Chinese Prompt"], ["English Prompt", "Prompt Structure", "Role Check", "Self Check"]);
  const structuredEnglish = extractVisualReuseSection(source, ["English Prompt"], ["Prompt Structure", "Role Check", "Self Check"]);
  const structuredStructure = extractVisualReuseSection(source, ["Prompt Structure"], ["Role Check", "Self Check"]);
  const structuredRoleCheck = extractVisualReuseSection(source, ["Role Check"], ["Self Check"]);
  const structuredSelfCheck = extractVisualReuseSection(source, ["Self Check"]);

  if (structuredChinese || structuredEnglish || structuredStructure || structuredRoleCheck || structuredSelfCheck) {
    const parsed = parseVisualReusePromptResponse(source);
    const chinese = parsed.chinese || (structuredEnglish ? "" : formatChinesePromptSections(source));
    const english = parsed.english || "";
    return {
      source: cleanHomepagePromptText(chinese || english || source),
      chinese,
      english,
      structure: parsed.structure || summarizeChineseStructure(chinese || source),
      roleCheck: parsed.roleCheck || "",
      selfCheck: parsed.selfCheck || ""
    };
  }

  const meta = {
    source,
    chinese: "",
    english: "",
    structure: "",
    roleCheck: "",
    selfCheck: ""
  };

  if (hasChinese(source)) {
    meta.chinese = formatChinesePromptSections(source);
    try {
      meta.english = await callTextTranslateApi(meta.chinese || source, "en");
    } catch {
      meta.english = localTranslateToEnglish(meta.chinese || source);
    }
  } else {
    meta.english = formatEnglishPromptSections(source);
    try {
      meta.chinese = await callTextTranslateApi(source, "zh");
    } catch {
      meta.chinese = localTranslateToChinese(source);
    }
    meta.chinese = formatChinesePromptSections(meta.chinese);
  }

  meta.structure = summarizeChineseStructure(meta.chinese || source);
  return meta;
}

async function resolveChineseHomepagePrompt(meta = {}, fallbackText = "") {
  const candidate = cleanHomepagePromptText(meta.chinese || "");
  if (candidate && hasChinese(candidate)) {
    return formatChinesePromptSections(candidate);
  }

  const source = cleanHomepagePromptText(fallbackText || meta.english || meta.source || "");
  if (!source) return "";
  if (hasChinese(source)) {
    return formatChinesePromptSections(source);
  }

  try {
    return formatChinesePromptSections(await callTextTranslateApi(source, "zh"));
  } catch {
    return formatChinesePromptSections(localTranslateToChinese(source));
  }
}

function promptMetaFromInput() {
  const text = nodes.promptInput.value.trim();
  const includeDetailed = Boolean(nodes.reverseDetailToggle?.checked);
  if (!text) {
    return emptyPromptMeta();
  }
  if (promptMeta.source === text && (promptMeta.chinese || promptMeta.english)) {
    return includeDetailed || promptMethod === "reuse"
      ? promptMeta
      : {
        ...promptMeta,
        english: "",
        structure: "",
        roleCheck: "",
        selfCheck: ""
      };
  }
  return {
    source: text,
    chinese: hasChinese(text) ? text : "",
    english: includeDetailed && !hasChinese(text) ? text : "",
    structure: includeDetailed
      ? (hasChinese(text) ? summarizeChineseStructure(text) : extractPromptStructureText(text))
      : "",
    roleCheck: "",
    selfCheck: ""
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
  promptMeta = emptyPromptMeta();
  renderVisualReusePlan(null);
  syncGenerateAction();
  syncPromptCharCount();
  setStatus("提示词已清空。");
  saveWorkspaceState();
}

function syncGenerationModeTabs() {
  const shouldDimGenerationMode = promptMethod === "reuse";
  const activeMode = shouldDimGenerationMode ? "reuse" : generationMode;
  nodes.textToImageModeBtn?.setAttribute("aria-selected", !shouldDimGenerationMode && generationMode === "text" ? "true" : "false");
  nodes.imageToImageModeBtn?.setAttribute("aria-selected", !shouldDimGenerationMode && generationMode === "image" ? "true" : "false");
  nodes.visualReuseBtn?.setAttribute("aria-selected", shouldDimGenerationMode ? "true" : "false");
  nodes.textToImageModeBtn?.classList.toggle("is-dimmed-by-method", shouldDimGenerationMode);
  nodes.imageToImageModeBtn?.classList.toggle("is-dimmed-by-method", shouldDimGenerationMode);
  if (nodes.generationModeNav) {
    nodes.generationModeNav.dataset.activeMode = activeMode;
  }
  if (nodes.generationModeIndicator) {
    const index = activeMode === "image" ? 1 : activeMode === "reuse" ? 2 : 0;
    nodes.generationModeIndicator.style.transform = `translateX(calc(${index * 100}% + ${index * 4}px))`;
  }
  if (nodes.generationWorkspace) {
    nodes.generationWorkspace.dataset.mode = activeMode;
  }
  if (nodes.referenceUploadPanel) {
    nodes.referenceUploadPanel.hidden = false;
    nodes.referenceUploadPanel.setAttribute("aria-hidden", "false");
  }
  if (nodes.dropZoneTitle) {
    nodes.dropZoneTitle.textContent = "拖拽图片到此处";
  }
  if (nodes.dropZoneHint) {
    nodes.dropZoneHint.textContent = `或点击上传参考图，最多 ${MAX_UPLOAD_IMAGES} 张`;
  }
  window.AssetFlowTemplateUI?.onModeChange();
}

function setGenerationMode(mode, options = {}) {
  generationMode = mode === "text" ? "text" : "image";
  if (promptMethod === "reuse") {
    promptMethod = "none";
    setVisualReusePanelOpen(false);
    nodes.visualReuseBtn?.setAttribute("aria-selected", "false");
    nodes.dropZone?.classList.remove("is-reuse-mode");
    nodes.promptInput.readOnly = false;
    nodes.promptInput.placeholder = "图片提示词会出现在这里，也可以直接输入中文或英文。";
    renderVisualReusePlan(null);
  }
  syncImageUploadLimitUi();
  if (promptMethod !== "reuse") {
    trimImagesToCurrentModeLimit({ silent: true });
  }
  syncGenerationModeTabs();
  syncGenerateAction();
  resetPromptViewportToTop();

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
  generationTimers.forEach((timer) => window.clearInterval(timer));
  generationTimers.clear();
  if (progressSmoothingFrame) {
    window.cancelAnimationFrame(progressSmoothingFrame);
    progressSmoothingFrame = 0;
  }
  galleryItems = galleryItems.filter((item) => !item.isGenerating);
  renderGallery();
}

function resetAll() {
  nodes.promptInput.value = "";
  promptMeta = emptyPromptMeta();
  clearGenerationState();
  saveWorkspaceState();
  setStatus("已清空提示词和生成中占位，图片、图库和选项已保留。");
}

function normalizedProgress(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.max(0, Math.min(99, Math.round(number)));
}

function updateGeneratingItemProgress(target, progress, label = "") {
  const targetIndex = galleryItemIndexForTarget(target);
  if (targetIndex === -1) return;
  const item = galleryItems[targetIndex];
  if (label) {
    item.progressLabel = label;
  }
  const nextProgress = normalizedProgress(progress);
  if (nextProgress !== null) {
    item.hasRealProgress = true;
    item.progressTarget = Math.max(Number(item.progressTarget) || 0, nextProgress);
    item.progressTargetAt = performance.now();
    startProgressSmoothing();
  }
  applyGeneratingItemProgress(item, { forceLabel: Boolean(label) });
}

function generationTaskLabel(item, label = "正在生成") {
  const taskId = String(item?.taskId || "").trim();
  if (!taskId) return label;
  const shortTaskId = taskId.slice(-8);
  return String(label || "正在生成").includes(shortTaskId)
    ? String(label || "正在生成")
    : `${label || "正在生成"} · ${shortTaskId}`;
}

function generationCardSelector(id) {
  return `[data-generation-id="${String(id || "").replace(/"/g, "\\\"")}"]`;
}

function applyGeneratingItemProgress(item, options = {}) {
  if (!item?.generationId) return;
  const card = nodes.galleryGrid.querySelector(generationCardSelector(item.generationId));
  if (!card) return;
  const progressText = item.hasRealProgress
    ? `${Math.max(0, Math.min(99, Math.round(Number(item.progress) || 0)))}%`
    : "等待中";
  const progressNode = card.querySelector(".gallery-progress");
  const labelNode = card.querySelector(".gallery-loading-label");
  if (progressNode && item.lastRenderedProgress !== progressText) {
    progressNode.textContent = progressText;
    item.lastRenderedProgress = progressText;
  }
  const labelText = item.progressLabel || "正在生成中";
  if (labelNode && (options.forceLabel || item.lastRenderedLabel !== labelText)) {
    labelNode.textContent = labelText;
    item.lastRenderedLabel = labelText;
  }
}

function startProgressSmoothing() {
  if (progressSmoothingFrame) return;
  progressSmoothingLastTime = performance.now();
  progressSmoothingFrame = window.requestAnimationFrame(smoothGeneratingProgress);
}

function smoothGeneratingProgress(timestamp) {
  const delta = Math.min(260, Math.max(16, timestamp - progressSmoothingLastTime));
  progressSmoothingLastTime = timestamp;
  let shouldContinue = false;

  galleryItems.forEach((item) => {
    if (!item.isGenerating) return;
    const realTarget = Number(item.progressTarget);
    if (!item.hasRealProgress || !Number.isFinite(realTarget)) {
      applyGeneratingItemProgress(item);
      return;
    }
    const current = Number(item.progress) || 0;
    const easing = Math.min(0.42, Math.max(0.08, delta / 760));
    const distance = realTarget - current;
    if (Math.abs(distance) <= 0.05) {
      item.progress = realTarget;
      item.lastProgressPaintAt = timestamp;
      applyGeneratingItemProgress(item);
      return;
    } else {
      item.progress = Math.max(0, Math.min(99, current + distance * easing));
      shouldContinue = true;
    }

    if (!item.lastProgressPaintAt || timestamp - item.lastProgressPaintAt >= 120) {
      item.lastProgressPaintAt = timestamp;
      applyGeneratingItemProgress(item);
    }
  });

  if (shouldContinue) {
    progressSmoothingFrame = window.requestAnimationFrame(smoothGeneratingProgress);
  } else {
    progressSmoothingFrame = 0;
  }
}

function openLocalImageDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(LOCAL_IMAGE_DB_NAME, LOCAL_IMAGE_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(LOCAL_IMAGE_STORE)) {
        db.createObjectStore(LOCAL_IMAGE_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(LOCAL_GALLERY_STORE)) {
        const galleryStore = db.createObjectStore(LOCAL_GALLERY_STORE, { keyPath: "id" });
        galleryStore.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withLocalStore(storeName, mode, callback) {
  const db = await openLocalImageDb();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      const result = callback(store);
      transaction.oncomplete = () => resolve(result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
}

function withLocalImageStore(mode, callback) {
  return withLocalStore(LOCAL_IMAGE_STORE, mode, callback);
}

function withLocalGalleryStore(mode, callback) {
  return withLocalStore(LOCAL_GALLERY_STORE, mode, callback);
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

async function assertGalleryStorageCapacity(blob) {
  if (!blob?.size || !navigator.storage?.estimate) return;
  const estimate = await navigator.storage.estimate();
  const usage = Number(estimate.usage) || 0;
  const quota = Number(estimate.quota) || 0;
  if (quota && usage + blob.size > quota * 0.9) {
    throw new Error("浏览器本地图库空间不足，请清理部分已生成图片后重试");
  }
}

async function createImageThumbnailBlob(blob, maxEdge = 520) {
  if (!blob?.type?.startsWith("image/") || !window.createImageBitmap) return null;

  let bitmap = null;
  try {
    bitmap = await createImageBitmap(blob);
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.drawImage(bitmap, 0, 0, width, height);
    return await new Promise((resolve) => {
      canvas.toBlob((thumbnail) => resolve(thumbnail), "image/webp", 0.78);
    });
  } catch {
    return null;
  } finally {
    bitmap?.close?.();
  }
}

async function saveImageToIndexedDb(item) {
  const blob = await blobFromImageUrl(item.url);
  await assertGalleryStorageCapacity(blob);
  const id = item.localStoreId || `image-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const thumbnailBlob = await createImageThumbnailBlob(blob);
  await withLocalImageStore("readwrite", (store) => {
    store.put({
      id,
      blob,
      thumbnailBlob,
      mimeType: blob.type || "image/png",
      thumbnailMimeType: thumbnailBlob?.type || "",
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
  const thumbnailObjectUrl = thumbnailBlob ? URL.createObjectURL(thumbnailBlob) : "";
  return {
    ...item,
    originalUrl: item.originalUrl || item.url,
    localStoreId: id,
    localMimeType: blob.type || "image/png",
    thumbnailObjectUrl,
    localObjectUrl,
    url: localObjectUrl
  };
}

async function sourceAssetPreviewStoreId(item) {
  if (!item?.id) return "";
  const id = `source-${item.id}`;
  try {
    if ((await imageFromIndexedDb(id))?.blob) return id;
    const blob = await blobFromImageUrl(item.dataUrl || item.src);
    await assertGalleryStorageCapacity(blob);
    const thumbnailBlob = await createImageThumbnailBlob(blob, 360);
    await withLocalImageStore("readwrite", (store) => {
      store.put({
        id, blob, thumbnailBlob,
        mimeType: blob.type || "image/png",
        thumbnailMimeType: thumbnailBlob?.type || "",
        createdAt: Date.now(),
        meta: { name: item.name || "来源图", sourceAsset: true }
      });
    });
    return id;
  } catch {
    return "";
  }
}

async function generationLineageFromRequest(payload, directIds = []) {
  const direct = new Set(directIds);
  const referenceItems = payload.referenceItems || [];
  const planReferences = payload.source === "reuse" ? (payload.reusePlan?.references || []) : [];
  const references = payload.source === "reuse"
    ? planReferences.map((reference) => ({
        assetId: reference.assetId,
        name: reference.name,
        roles: reference.roles,
        order: reference.order,
        source: reference.source
      }))
    : referenceItems.filter((item) => direct.has(item.id)).map((item, index) => ({
        assetId: item.id,
        name: item.name,
        roles: [],
        order: index + 1,
        source: normalizeAssetSource(item.assetSource, item.src)
      }));
  const sourceAssets = await Promise.all(references.map(async (reference) => {
    const item = referenceItems.find((candidate) => candidate.id === reference.assetId);
    return {
      assetId: reference.assetId,
      name: reference.name,
      order: reference.order,
      roles: reference.roles || [],
      participation: direct.has(reference.assetId) ? "direct" : "analysis",
      source: reference.source || null,
      previewStoreId: await sourceAssetPreviewStoreId(item),
      previewUrl: safeAssetSourceUrl(item?.src || reference.source?.uri)
    };
  }));
  return {
    ...(payload.assetLineage || {}),
    relationshipType: payload.source === "reuse" ? "visual-reuse"
      : payload.mode === "image" ? "image-to-image" : "text-to-image",
    sourceAssetIds: sourceAssets.map((asset) => asset.assetId),
    directReferenceIds: sourceAssets.filter((asset) => asset.participation === "direct").map((asset) => asset.assetId),
    analysisReferenceIds: sourceAssets.filter((asset) => asset.participation === "analysis").map((asset) => asset.assetId),
    sourceAssets
  };
}

function captureGenerationContext({ mode, prompt, model, width, height, count, referenceItems, selectedReferenceIds, reusePlan }) {
  const sources = mode === "reuse" ? referenceItems : mode === "image" ? referenceItems.filter((item) => selectedReferenceIds.includes(item.id)) : [];
  return {
    mode, prompt, model, modelValue: nodes.modelSelect.value, size: width + "x" + height,
    options: { sizeMode: nodes.sizeMode.value, resolution: activeResolution, width, height, count },
    promptMeta: { ...promptMeta, reusePlan: reusePlan || null },
    visualReuse: {
      assetType: nodes.visualReuseAssetType?.value || "auto", strength: nodes.visualReuseStrength?.value || "balanced_reuse",
      style: nodes.visualReuseStyle?.value || "original", textMode: nodes.visualReuseTextMode?.value || "auto",
      textContent: nodes.visualReuseTextContent?.value || "", textSubtitle: nodes.visualReuseTextSubtitle?.value || "",
      notes: nodes.visualReuseNotes?.value || ""
    },
    sourceImages: sources.map((item) => ({
      assetId: item.id, name: item.name, width: item.width, height: item.height,
      src: safeAssetSourceUrl(item.src), assetSource: normalizeAssetSource(item.assetSource, item.src),
      dimensionsVerified: Boolean(item.dimensionsVerified), dimensionsVerifiedAt: item.dimensionsVerifiedAt || "",
      visualReuseRoles: normalizeVisualReuseRoles(item.visualReuseRoles || item.visualReuseRole),
      visualReuseRolesManual: Boolean(item.visualReuseRolesManual), visualReuseWeight: item.visualReuseWeight || "",
      visualReuseWeightManual: Boolean(item.visualReuseWeightManual), visualReuseLocked: item.visualReuseLocked !== false,
      visualReuseConflictAcknowledged: item.visualReuseConflictAcknowledged || "", previewStoreId: ""
    })),
    reusePlan: reusePlan || null
  };
}

function generationContextWithLineage(context, lineage) {
  if (!context) return null;
  const sourceAssets = lineage?.sourceAssets || [];
  const byId = new Map(context.sourceImages.map((image) => [image.assetId, image]));
  return { ...context, sourceImages: sourceAssets.map((asset) => ({
    ...(byId.get(asset.assetId) || { assetId: asset.assetId, name: asset.name }),
    roles: asset.roles || [], previewStoreId: asset.previewStoreId || "",
    src: byId.get(asset.assetId)?.src || asset.previewUrl || ""
  })) };
}
async function imageFromIndexedDb(id) {
  if (!id) return null;
  return withLocalImageStore("readonly", (store) => requestToPromise(store.get(id)));
}

function galleryRecordFromItem(item) {
  const id = item.galleryId || item.localStoreId || `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  return {
    id,
    galleryId: id,
    localStoreId: item.localStoreId || "",
    localMimeType: item.localMimeType || "",
    originalUrl: item.originalUrl || (!isBlobUrl(item.url) ? item.url : ""),
    url: item.localStoreId ? "" : item.url || "",
    index: item.index,
    model: item.model,
    width: item.width,
    height: item.height,
    prompt: item.prompt || "",
    promptCn: item.promptCn || "",
    promptEn: item.promptEn || "",
    promptStructure: item.promptStructure || "",
    reusePlan: item.reusePlan || null,
    assetLineage: item.assetLineage || null,
    generationContext: item.generationContext || null,
    mode: normalizeGalleryMode(item.mode),
    source: normalizeGallerySource(item.source || item.generationSource, item.mode),
    createdAt: item.createdAt || Date.now()
  };
}

function galleryItemFromRecord(record, index = 0) {
  return {
    index: record.index || `#${index + 1}`,
    model: record.model || "Generated Image",
    width: Number(record.width) || 1024,
    height: Number(record.height) || 1024,
    prompt: record.prompt || "",
    promptCn: record.promptCn || "",
    promptEn: record.promptEn || "",
    promptStructure: record.promptStructure || "",
    reusePlan: record.reusePlan || null,
    assetLineage: record.assetLineage || null,
    generationContext: record.generationContext || null,
    mode: normalizeGalleryMode(record.mode),
    source: normalizeGallerySource(record.source || record.generationSource, record.mode),
    url: record.url || "",
    originalUrl: record.originalUrl || record.url || "",
    localStoreId: record.localStoreId || "",
    localMimeType: record.localMimeType || "",
    galleryId: record.galleryId || record.id || "",
    createdAt: record.createdAt || Date.now(),
    thumbnailObjectUrl: "",
    localObjectUrl: "",
    isGenerating: false
  };
}

async function saveGalleryRecord(item) {
  if (!item || item.isGenerating || (!item.localStoreId && !item.url)) return item;
  const record = galleryRecordFromItem(item);
  await withLocalGalleryStore("readwrite", (store) => {
    store.put(record);
  });
  return {
    ...item,
    galleryId: record.id,
    createdAt: record.createdAt
  };
}

async function loadGalleryRecordsFromIndexedDb() {
  try {
    const records = await withLocalGalleryStore("readonly", (store) => requestToPromise(store.getAll()));
    return (records || [])
      .sort((a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0))
      .map(galleryItemFromRecord);
  } catch {
    return [];
  }
}

async function removeGalleryRecordFromIndexedDb(item) {
  const recordId = item?.galleryId || item?.localStoreId;
  if (!recordId && !item?.localStoreId) return;

  try {
    await withLocalGalleryStore("readwrite", (store) => {
      if (recordId) store.delete(recordId);
    });
  } catch {
    // The visual cleanup should still continue even if the metadata delete fails.
  }

  if (item?.localStoreId) {
    try {
      await withLocalImageStore("readwrite", (store) => {
        store.delete(item.localStoreId);
      });
    } catch {
      // Ignore image-store cleanup failures.
    }
  }
}

async function removeOrphanedSourceAssets(removedItems) {
  const retained = new Set([...galleryItems, ...loadPendingGenerationTasks()]
    .flatMap((item) => item?.assetLineage?.sourceAssets || [])
    .map((source) => source.previewStoreId)
    .filter(Boolean));
  const orphaned = [...new Set(removedItems.flatMap((item) => item?.assetLineage?.sourceAssets || [])
    .map((source) => source.previewStoreId).filter((id) => id && !retained.has(id)))];
  if (!orphaned.length) return;
  try {
    await withLocalImageStore("readwrite", (store) => {
      orphaned.forEach((id) => store.delete(id));
    });
  } catch {
    // A failed cleanup must not delete gallery metadata or interrupt generation.
  }
}

async function clearGalleryFromStatusAction() {
  const completedItems = galleryItems.filter((item) => !item.isGenerating);
  if (!completedItems.length) {
    setStatus("图库已经为空，无需清理。");
    return;
  }

  const confirmed = window.confirm(`确定清理 ${completedItems.length} 条已生成图片吗？此操作无法撤销。`);
  if (!confirmed) return;

  if (nodes.statusActionBtn) {
    nodes.statusActionBtn.disabled = true;
  }

  try {
    for (const item of completedItems) {
      await removeGalleryRecordFromIndexedDb(item);
      if (item.localObjectUrl) URL.revokeObjectURL(item.localObjectUrl);
      if (item.thumbnailObjectUrl) URL.revokeObjectURL(item.thumbnailObjectUrl);
    }
    galleryItems = galleryItems.filter((item) => item.isGenerating);
    await removeOrphanedSourceAssets(completedItems);
    clearGalleryStorage();
    renderGallery();
    saveWorkspaceState();
    setStatus("图库已清理，可以继续保存新图片。");
  } catch (error) {
    setStatus(`图库清理失败：${error?.message || "浏览器本地存储不可用"}。`);
  } finally {
    if (nodes.statusActionBtn) {
      nodes.statusActionBtn.disabled = false;
    }
  }
}

async function migrateLegacyGalleryItemsToIndexedDb() {
  const legacyItems = galleryItems.filter((item) => !item.isGenerating && (item.url || item.localStoreId));
  if (!legacyItems.length) return;

  const migrated = [];
  for (const item of legacyItems) {
    try {
      const savedItem = item.localStoreId ? item : await saveImageToIndexedDb(item);
      migrated.push(await saveGalleryRecord(savedItem));
    } catch {
      if (item.localStoreId) {
        migrated.push(await saveGalleryRecord(item));
      }
    }
  }

  if (migrated.length) {
    galleryItems = migrated;
    clearGalleryStorage();
    renderGallery();
  }
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

async function removeBrokenGalleryItem(item) {
  const before = galleryItems.length;
  galleryItems = galleryItems.filter((galleryItem) => !isSameGalleryItem(galleryItem, item));
  if (galleryItems.length === before) return;
  await removeGalleryRecordFromIndexedDb(item);
  await removeOrphanedSourceAssets([item]);

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
      const previewUrl = await ensureGalleryPreviewObjectUrl(item);
      if (previewUrl) {
        renderGallery();
        return;
      }
    } catch {
      // Fall through and remove the broken record.
    }
  }
  await removeBrokenGalleryItem(item);
}

async function persistGalleryItemImage(item) {
  if (!item?.url && !item?.localStoreId) {
    return item;
  }

  try {
    const storedItem = await saveImageToIndexedDb(item);
    const galleryItem = await saveGalleryRecord(storedItem);
    setStatus("图片已保存到浏览器本地图库。");
    return galleryItem;
  } catch (error) {
    setStatus(`图片已生成，但保存到本地图库失败：${error.message || "浏览器本地存储不可用"}。`);
    return item;
  }
}

function observeGalleryImage(img, item) {
  img.__galleryItem = item;
  if (item?.localStoreId) {
    loadGalleryImageIntoElement(img, item);
    return;
  }

  if (!window.IntersectionObserver) {
    loadGalleryImageIntoElement(img, item);
    return;
  }

  if (!galleryImageObserver) {
    galleryImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        galleryImageObserver.unobserve(entry.target);
        const targetItem = entry.target.__galleryItem;
        loadGalleryImageIntoElement(entry.target, targetItem);
      });
    }, { rootMargin: "240px 0px" });
  }

  galleryImageObserver.observe(img);
}

async function loadGalleryImageIntoElement(img, item) {
  try {
    const url = await ensureGalleryPreviewObjectUrl(item);
    if (!url) throw new Error("NO_GALLERY_IMAGE");
    img.src = url;
    img.hidden = false;
  } catch {
    await handleGalleryImageError(item);
  }
}

function createGalleryItem(item) {
  const card = document.createElement("article");
  card.className = "gallery-card";
  if (item.isGenerating) {
    card.dataset.generationId = item.generationId || "";
    card.classList.add("is-generating");
  }
  card.dataset.label = galleryCardSourceLabel(item);
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
    video.preload = "auto";
    video.disableRemotePlayback = true;
    video.setAttribute("aria-hidden", "true");
    const mp4Source = document.createElement("source");
    mp4Source.src = "assets/loading-animation.mp4";
    mp4Source.type = "video/mp4";
    video.append(mp4Source);

    const label = document.createElement("span");
    label.className = "gallery-loading-label";
    label.textContent = item.progressLabel || "正在生成中";

    const progress = document.createElement("span");
    progress.className = "gallery-progress";
    progress.textContent = item.hasRealProgress
      ? `${Math.max(0, Math.min(99, Math.round(Number(item.progress) || 0)))}%`
      : "等待中";

    const progressWrap = document.createElement("div");
    progressWrap.className = "gallery-progress-wrap";
    progressWrap.append(label, progress);
    visual.append(video, progressWrap);
  } else if (item.url || item.localStoreId) {
    const img = document.createElement("img");
    const previewUrl = galleryItemPreviewUrl(item);
    if (previewUrl) {
      img.src = previewUrl;
    } else {
      img.hidden = true;
      observeGalleryImage(img, item);
    }
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
  const taskSuffix = item.isGenerating && item.taskId
    ? ` · 任务 ${String(item.taskId).slice(-8)}`
    : "";
  meta.textContent = `${item.width} × ${item.height} · ${item.index}${taskSuffix}`;

  const prompt = document.createElement("span");
  prompt.textContent = item.prompt || "无提示词";

  detail.append(title, meta, prompt);
  card.append(visual, detail);
  if (!item.isGenerating) {
    card.addEventListener("click", () => openLightbox(item));
  }
  return card;
}

const sourceThumbnailUrls = new Set();
let sourcePreviewObjectUrl = "";

function clearSourceThumbnailUrls() {
  sourceThumbnailUrls.forEach((url) => URL.revokeObjectURL(url));
  sourceThumbnailUrls.clear();
}

function closeSourcePreview() {
  if (sourcePreviewObjectUrl) URL.revokeObjectURL(sourcePreviewObjectUrl);
  sourcePreviewObjectUrl = "";
  nodes.lightboxSourceImage?.removeAttribute("src");
  if (nodes.lightboxSourcePreview) nodes.lightboxSourcePreview.hidden = true;
  if (nodes.lightboxImage) nodes.lightboxImage.hidden = false;
}

async function openSourcePreview(source) {
  closeSourcePreview();
  let url = source.previewUrl || source.source?.uri || "";
  if (source.previewStoreId) {
    try {
      const stored = await imageFromIndexedDb(source.previewStoreId);
      if (stored?.blob) {
        sourcePreviewObjectUrl = URL.createObjectURL(stored.blob);
        url = sourcePreviewObjectUrl;
      }
    } catch {
      // A remote source URL may still be available.
    }
  }
  if (!url) {
    setStatus("来源图预览不可用；来源关系和角色仍已保留。");
    return;
  }
  nodes.lightboxSourceImage.src = url;
  nodes.lightboxImage.hidden = true;
  nodes.lightboxSourcePreview.hidden = false;
}

async function populateSourceThumbnail(img, source) {
  if (source.previewStoreId) {
    try {
      const stored = await imageFromIndexedDb(source.previewStoreId);
      const blob = stored?.thumbnailBlob || stored?.blob;
      if (blob && img.isConnected) {
        const url = URL.createObjectURL(blob);
        sourceThumbnailUrls.add(url);
        img.src = url;
        return;
      }
    } catch {
      // Use the original remote address if present.
    }
  }
  img.src = source.previewUrl || source.source?.uri || "";
}

function lightboxPromptSummaryFields(text) {
  const categories = [
    ["画面类型", /^(?:画面类型|Image Type)$/i],
    ["主体", /^(?:主体|Subject)$/i],
    ["动作", /^(?:动作姿态|动作|Pose and Action|Action)$/i],
    ["构图", /^(?:构图|Composition)$/i],
    ["风格", /^(?:风格|Style)$/i],
    ["色彩光影", /^(?:色彩光照|色彩光影|Color and Lighting|Color and Light)$/i]
  ];
  const entries = String(text || "").split(/\n\s*\n/).map((block) => {
    const match = block.trim().match(/^([^\n：:]{1,32})[：:]\s*([\s\S]*)$/);
    return match ? { key: match[1].trim(), value: match[2].trim() } : null;
  }).filter(Boolean);
  const fields = categories.map(([label, key]) => ({
    label, value: entries.find((entry) => key.test(entry.key))?.value || ""
  })).filter((field) => field.value);
  if (fields.length) return fields;
  const plain = String(text || "").trim();
  return [{
    label: "画面描述",
    value: plain.length > 240 ? plain.slice(0, 240).trimEnd() + "…" : plain || "暂无提示词。"
  }];
}

function lightboxAssetName(item) {
  for (const text of [item.promptCn, item.prompt, item.promptEn]) {
    if (!text) continue;
    const type = lightboxPromptSummaryFields(text).find((field) => field.label === "画面类型")?.value;
    if (type) return type.replace(/\s+/g, " ").trim().slice(0, 80);
  }
  return "视觉资产 " + (item.index || "");
}

function renderLightboxDetails(item) {
  clearSourceThumbnailUrls();
  const prompt = nodes.lightboxPrompt;
  prompt.replaceChildren();
  const languages = [
    ["中文", item.promptCn || item.prompt || "无提示词"],
    ["English", item.promptEn]
  ].filter((entry) => entry[1]);
  const buttons = document.createElement("div");
  buttons.className = "lightbox-language-switch";
  const summary = document.createElement("div");
  summary.className = "lightbox-prompt-summary";
  const full = document.createElement("details");
  full.className = "lightbox-prompt-full";
  const fullToggle = document.createElement("summary");
  fullToggle.textContent = "查看完整提示词";
  const fullText = document.createElement("pre");
  full.append(fullToggle, fullText);
  const showLanguage = (index) => {
    const value = languages[index]?.[1] || "无提示词";
    buttons.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.setAttribute("aria-pressed", buttonIndex === index ? "true" : "false");
    });
    summary.replaceChildren();
    lightboxPromptSummaryFields(value).forEach(({ label, value: description }) => {
      const row = document.createElement("div");
      row.className = "lightbox-prompt-row";
      const name = document.createElement("strong");
      name.textContent = label;
      const text = document.createElement("p");
      text.textContent = description;
      row.append(name, text);
      summary.append(row);
    });
    fullText.textContent = value;
    full.open = false;
  };
  languages.forEach(([label], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => showLanguage(index));
    buttons.append(button);
  });
  prompt.append(buttons, summary, full);
  showLanguage(0);
  if (item.promptStructure || item.reusePlan) {
    const details = document.createElement("details");
    const toggle = document.createElement("summary");
    toggle.textContent = "查看完整解析";
    const analysis = document.createElement("pre");
    analysis.textContent = item.promptStructure || JSON.stringify(item.reusePlan?.analysis || {}, null, 2);
    details.append(toggle, analysis);
    prompt.append(details);
  }

  const section = nodes.lightboxLineage;
  section.replaceChildren();
  section.open = false;
  const lineage = item.assetLineage;
  const assets = lineage?.sourceAssets;
  const traceable = Array.isArray(assets)
    && Array.isArray(lineage?.directReferenceIds)
    && Array.isArray(lineage?.analysisReferenceIds)
    && assets.every((asset) => asset.participation === "direct" || asset.participation === "analysis");
  const sourceSummary = document.createElement("summary");
  const title = document.createElement("strong");
  title.textContent = "生成来源";
  const overview = document.createElement("span");
  overview.textContent = gallerySourceLabel(item) + " · " + (traceable ? assets.length + " 张参考" : "来源待确认");
  sourceSummary.append(title, overview);
  section.append(sourceSummary);
  const sourceContent = document.createElement("div");
  sourceContent.className = "lightbox-source-content";
  const mode = document.createElement("p");
  mode.textContent = "生成模式：" + gallerySourceLabel(item);
  sourceContent.append(mode);
  if (!traceable || !assets.length) {
    const empty = document.createElement("p");
    empty.textContent = !traceable
      ? "该资产生成于来源追踪功能上线前，无法确认实际输入图片。"
      : item.mode === "text" ? "无直接参考图" : "本次供应商请求未包含图片输入。";
    sourceContent.append(empty);
  } else {
    for (const [participation, label] of [["direct", "直接参与生成"], ["analysis", "仅用于分析"]]) {
      const group = assets.filter((asset) => asset.participation === participation);
      if (!group.length) continue;
      const groupTitle = document.createElement("h4");
      groupTitle.textContent = label + " · " + group.length;
      sourceContent.append(groupTitle);
      group.forEach((source) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "lightbox-source-card";
        const image = document.createElement("img");
        image.alt = source.name || "来源图";
        image.loading = "lazy";
        populateSourceThumbnail(image, source);
        const body = document.createElement("span");
        const name = document.createElement("strong");
        name.textContent = "图" + (source.order || assets.indexOf(source) + 1) + " · " + (source.name || "来源图");
        const roles = document.createElement("small");
        roles.textContent = (Array.isArray(source.roles) ? source.roles : [])
          .map((role) => visualReuseRoleMeta(role).label).join("＋")
          || (participation === "analysis" ? "用于分析" : "图像输入");
        body.append(name, roles);
        card.append(image, body);
        card.addEventListener("click", () => openSourcePreview(source));
        sourceContent.append(card);
      });
    }
  }
  const restore = document.createElement("button");
  restore.className = "lightbox-source-restore";
  restore.type = "button";
  restore.textContent = "恢复创作链";
  restore.addEventListener("click", () => requestLocalContinuation(
    normalizeGallerySource(item.source, item.mode) === "reuse" ? "reuse" : item.mode === "image" ? "image" : "text"
  ));
  sourceContent.append(restore);
  section.append(sourceContent);

  nodes.lightboxAssetTitle.textContent = lightboxAssetName(item);
  const meta = nodes.lightboxMeta;
  meta.replaceChildren();
  const date = Number(item.createdAt);
  const generatedAt = Number.isFinite(date) && date > 0
    ? new Intl.DateTimeFormat("zh-CN", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit"
    }).format(new Date(date)) : "未知";
  for (const [label, value] of [
    ["模型", String(item.model || "未知模型").replace(/^Grsai\s+/i, "")],
    ["尺寸", item.width && item.height ? item.width + " × " + item.height : "未知"],
    ["生成时间", generatedAt]
  ]) {
    const row = document.createElement("div");
    const key = document.createElement("span");
    key.textContent = label;
    const detail = document.createElement("strong");
    detail.textContent = value;
    detail.title = value;
    row.append(key, detail);
    meta.append(row);
  }
}


function continuationContextForItem(item) {
  if (item.generationContext) return item.generationContext;
  const lineage = item.assetLineage;
  return {
    mode: normalizeGallerySource(item.source, item.mode),
    prompt: item.promptCn || item.prompt || "",
    model: item.model,
    modelValue: "",
    options: { sizeMode: "custom", resolution: "custom", width: item.width, height: item.height, count: 1 },
    promptMeta: emptyPromptMeta({
      source: item.prompt || "",
      chinese: item.promptCn || "",
      english: item.promptEn || "",
      structure: item.promptStructure || "",
      reusePlan: item.reusePlan || null
    }),
    visualReuse: null,
    sourceImages: (lineage?.sourceAssets || []).map((asset) => ({
      assetId: asset.assetId,
      name: asset.name,
      roles: asset.roles || [],
      visualReuseRoles: asset.roles || [],
      visualReuseRolesManual: true,
      previewStoreId: asset.previewStoreId || "",
      src: asset.previewUrl || "",
      assetSource: asset.source || null
    })),
    reusePlan: item.reusePlan || null
  };
}

async function continuationImageSource(source) {
  const stored = source.previewStoreId ? await imageFromIndexedDb(source.previewStoreId) : null;
  const src = stored?.blob ? await fileToDataUrl(stored.blob) : safeAssetSourceUrl(source.src || source.assetSource?.uri);
  if (!src) throw new Error("原参考图文件不可用，当前工作区未改变。");
  return imageItemFromSource({
    ...source,
    id: source.assetId || source.id,
    src,
    visualReuseRoles: source.visualReuseRoles || source.roles || []
  });
}

async function continuationGeneratedImage(item) {
  const stored = item.localStoreId ? await imageFromIndexedDb(item.localStoreId) : null;
  const src = stored?.blob ? await fileToDataUrl(stored.blob)
    : safeAssetSourceUrl(item.originalUrl || item.url);
  if (!src) throw new Error("生成图文件不可用，当前工作区未改变。");
  return imageItemFromSource({
    id: "continuation-" + (item.galleryId || item.localStoreId || Date.now()),
    src, name: lightboxAssetName(item), width: item.width, height: item.height,
    assetSource: createAssetSource("generated-gallery", { uri: item.originalUrl || "" }),
    dimensionsVerified: Boolean(item.width && item.height)
  });
}

function restoreContinuationOptions(context, item) {
  const options = context.options || {};
  const width = Number(options.width) || Number(item.width) || 1024;
  const height = Number(options.height) || Number(item.height) || 1024;
  nodes.sizeMode.value = [...nodes.sizeMode.options].some((option) => option.value === options.sizeMode)
    ? options.sizeMode : "custom";
  activeResolution = normalizeResolutionTier(options.resolution || "custom");
  nodes.widthInput.value = width;
  nodes.heightInput.value = height;
  nodes.countInput.value = Math.max(1, Math.min(8, Number(options.count) || 1));
  syncSizePicker();

  const targetModel = [...nodes.modelSelect.options].find((option) =>
    option.value === context.modelValue || option.text === context.model || option.text === item.model
  );
  if (targetModel) selectModel(targetModel.value);
  return Boolean(targetModel);
}

function restoreContinuationReuseOptions(context) {
  const values = context.visualReuse || {};
  for (const [node, value] of [
    [nodes.visualReuseAssetType, values.assetType],
    [nodes.visualReuseStrength, values.strength],
    [nodes.visualReuseStyle, values.style],
    [nodes.visualReuseTextMode, values.textMode],
    [nodes.visualReuseTextContent, values.textContent],
    [nodes.visualReuseTextSubtitle, values.textSubtitle],
    [nodes.visualReuseNotes, values.notes]
  ]) {
    if (node && value !== undefined) node.value = value;
  }
  syncVisualReuseTextStrategyUi();
}

async function restoreContinuation(item, action) {
  if (!item || !["text", "image", "reuse"].includes(action)) return false;
  const context = continuationContextForItem(item);
  const sourceImages = context.sourceImages || [];
  let restoredImages = [];
  if (action === "image") {
    restoredImages = [await continuationGeneratedImage(item)];
  } else if (action === "reuse") {
    if (!context.reusePlan || !sourceImages.length) {
      throw new Error("该资产没有可恢复的视觉复用方案和原参考图，当前工作区未改变。");
    }
    restoredImages = await Promise.all(sourceImages.map(continuationImageSource));
    if (restoredImages.some((image) => !image)) throw new Error("原参考图无法恢复，当前工作区未改变。");
  }

  isRestoringState = true;
  try {
    setGenerationMode(action === "text" ? "text" : "image", { silent: true });
    revokeImageItemObjectUrls(imageItems);
    imageItems = restoredImages;
    activeImageId = restoredImages[0]?.id || "";
    selectedImageIds = new Set(restoredImages.map((image) => image.id));
    syncActiveImageState();
    restoreContinuationReuseOptions(context);
    const modelRestored = restoreContinuationOptions(context, item);
    nodes.promptInput.value = context.prompt || item.promptCn || item.prompt || "";
    promptMeta = emptyPromptMeta({
      ...context.promptMeta,
      source: context.prompt || item.prompt || "",
      chinese: context.promptMeta?.chinese || item.promptCn || "",
      english: context.promptMeta?.english || item.promptEn || "",
      structure: context.promptMeta?.structure || item.promptStructure || "",
      reusePlan: action === "reuse" ? context.reusePlan : null
    });
    if (action === "reuse") {
      promptMeta.visualReuseFingerprint = visualReuseReferenceFingerprint(restoredImages);
      promptMeta.reusePlanFingerprint = context.reusePlan.inputFingerprint || "";
      setPromptMethod("reuse");
      setVisualReusePanelOpen(true);
    } else {
      setPromptMethod("none");
      setVisualReusePanelOpen(false);
    }
    syncPromptCharCount();
    syncGenerateAction();
    renderModelMenu();
    if (!nodes.lightbox.hidden) closeLightbox();
    activePageLightboxTabId = 0;
    setApiView(false);
    nodes.generationWorkspace?.scrollIntoView({ behavior: "smooth", block: "start" });
    isRestoringState = false;
    const persistence = saveWorkspaceState();
    const modeLabel = action === "text" ? "文生图" : action === "image" ? "图生图" : "视觉复用";
    const caution = !modelRestored ? "；原模型当前不可选，请检查模型" :
      persistence?.degraded ? "；本地参考图较大，重新打开后可能需要再次添加" : "";
    setStatus("已恢复" + modeLabel + "创作状态" + caution + "。");
    return true;
  } finally {
    isRestoringState = false;
  }
}

let continuationInProgress = false;
async function consumePendingContinuation() {
  if (continuationInProgress) return;
  continuationInProgress = true;
  try {
    const pending = (await chromeStorageLocalGet(PENDING_CONTINUE_CREATION_KEY))[PENDING_CONTINUE_CREATION_KEY];
    if (!pending) return;
    const records = await loadGalleryRecordsFromIndexedDb();
    const item = [...galleryItems, ...records].find((entry) =>
      (pending.galleryId && (entry.galleryId === pending.galleryId || entry.localStoreId === pending.galleryId))
      || (pending.originalUrl && entry.originalUrl === pending.originalUrl)
    );
    if (!item) throw new Error("未找到这张图库图片，请先恢复图库。");
    await restoreContinuation(item, pending.action);
    await chromeStorageLocalRemove(PENDING_CONTINUE_CREATION_KEY);
  } catch (error) {
    setStatus(error.message || "继续创作恢复失败。");
    await chromeStorageLocalRemove(PENDING_CONTINUE_CREATION_KEY);
  } finally {
    continuationInProgress = false;
  }
}

function requestLocalContinuation(action) {
  if (!activeLightboxItem) return;
  setLocalContinueMenuOpen(false);
  restoreContinuation(activeLightboxItem, action).catch((error) => {
    setStatus(error.message || "继续创作恢复失败。");
  });
}

async function openLightbox(item, options = {}) {
  const readyItem = await ensureGalleryFullObjectUrl(item);
  if (!readyItem?.url && !readyItem?.localStoreId) return;
  if (!options.forceLocal) {
    try {
      if (await openPageLightbox(readyItem)) return;
    } catch {
      // Restricted pages and unavailable tabs use the extension fallback.
    }
  }
  openLocalLightbox(readyItem);
}

function openLocalLightbox(item) {
  setLocalContinueMenuOpen(false);
  activePageLightboxTabId = 0;
  activeLightboxItem = item;
  nodes.eagleCollectBtn.classList.remove("is-collected");
  nodes.eagleCollectBtn.textContent = "收集到 Eagle";
  nodes.lightboxImage.src = item.url;
  nodes.lightboxImage.title = "点击右侧图片可切换预览";
  closeSourcePreview();
  renderLightboxDetails(item);
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

  const availableItems = galleryItems
    .filter((galleryItem) => !galleryItem.isGenerating && (galleryItem.url || galleryItem.localStoreId));
  const selectedIndex = availableItems.findIndex((galleryItem) => isSameGalleryItem(galleryItem, item));
  if (selectedIndex < 0) return false;
  const rawItems = availableItems
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
      source: normalizeGallerySource(galleryItem.source || galleryItem.generationSource, galleryItem.mode),
      assetLineage: galleryItem.assetLineage || null,
      url: galleryItem.localStoreId ? "" : galleryItem.url,
      originalUrl: galleryItem.originalUrl || galleryItem.url,
      localStoreId: galleryItem.localStoreId || "",
      galleryId: galleryItem.galleryId || "",
      createdAt: galleryItem.createdAt || 0
    }));
  const activeIndex = selectedIndex;

  let items;
  try {
    items = await Promise.all(rawItems.map(async (galleryItem) => ({
      ...galleryItem,
      url: galleryItem.localStoreId ? "" : await portableGalleryImageUrl(galleryItem, tab.url)
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
      eagle: { mode: currentEagleConfig().mode }
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
  setLocalContinueMenuOpen(false);
  activeLightboxItem = null;
  localGalleryExpanded = false;
  nodes.lightbox.hidden = true;
  nodes.lightboxImage.removeAttribute("src");
  nodes.lightboxMeta.textContent = "";
  nodes.lightboxPrompt.textContent = "";
  nodes.lightboxLineage.replaceChildren();
  closeSourcePreview();
  clearSourceThumbnailUrls();
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
  nodes.lightboxStrip.replaceChildren();
  const items = galleryItems.filter((item) => !item.isGenerating && (item.url || item.localStoreId));
  const activeIndex = Math.max(0, items.findIndex((item) => isSameGalleryItem(item, activeLightboxItem)));
  const start = localGalleryExpanded ? 0 : Math.floor(activeIndex / 16) * 16;
  const visible = localGalleryExpanded ? items : items.slice(start, start + 16);
  const heading = document.createElement("div");
  heading.className = "lightbox-strip-head";
  const count = document.createElement("strong");
  count.textContent = "已生成 " + items.length;
  heading.append(count);
  if (items.length > 16) {
    const showAll = document.createElement("button");
    showAll.type = "button";
    showAll.textContent = localGalleryExpanded ? "收起图库" : "查看全部 →";
    showAll.setAttribute("aria-expanded", localGalleryExpanded ? "true" : "false");
    showAll.addEventListener("click", () => {
      localGalleryExpanded = !localGalleryExpanded;
      renderLightboxStrip();
    });
    heading.append(showAll);
  }
  nodes.lightboxStrip.append(heading);
  visible.forEach((item) => {
    const button = document.createElement("button");
    button.className = "lightbox-thumb";
    button.type = "button";
    const current = isSameGalleryItem(item, activeLightboxItem);
    button.setAttribute("aria-current", current ? "true" : "false");
    button.setAttribute("aria-label", item.index + (current ? "，当前图片" : ""));
    button.title = item.model + " · " + item.index;
    const img = document.createElement("img");
    const previewUrl = galleryItemPreviewUrl(item);
    if (previewUrl) {
      img.src = previewUrl;
    } else {
      img.hidden = true;
      observeGalleryImage(img, item);
    }
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
  if (!item?.url && !item?.localStoreId) {
    setStatus("No image available to download.");
    return;
  }

  const filename = `${safeFilename(`${item.model}-${item.index}`)}.png`;
  if (item.localStoreId) {
    try {
      const stored = await imageFromIndexedDb(item.localStoreId);
      if (stored?.blob) {
        const objectUrl = URL.createObjectURL(stored.blob);
        triggerDownload(objectUrl, filename);
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1200);
        setStatus("Download started.");
        return;
      }
    } catch {
      // Fall back to the visible URL.
    }
  }

  if (!item.url) {
    setStatus("No image available to download.");
    return;
  }

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
      setStatus("Download started.");
      return;
    } catch {
      // Fall back to the source URL. Some providers disallow blob fetching,
      // but the browser may still allow saving the direct image link.
    }
  }

  triggerDownload(item.url, filename);
  setStatus("Download started.");
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

  const isApiMode = currentEagleConfig().mode === "api";
  if (await collectToEagleApi(activeLightboxItem)) {
    return;
  }

  collectToEagleProtocol(activeLightboxItem, { fallbackFromApi: isApiMode });
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
          url: item.originalUrl || item.url,
          model: item.model,
          index: item.index,
          prompt: item.prompt || "",
          website: window.location.href
        }
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

function collectToEagleProtocol(item, options = {}) {
  const params = new URLSearchParams({
    url: item.originalUrl || item.url,
    name: `${item.model}-${item.index}`,
    annotation: item.prompt || ""
  });

  window.location.href = `eagle://save?${params.toString()}`;
  setStatus(options.fallbackFromApi
    ? "Eagle Local API 暂不可用，已改用 eagle:// 协议尝试收集。如果没有响应，请确认 Eagle 已安装并允许协议打开。"
    : "已尝试通过 eagle:// 协议发送到 Eagle。如果没有响应，请确认 Eagle 已安装并允许协议打开。");
}

function galleryPageSizeForWidth(width) {
  const columns = width >= 800 ? 3 : width >= 500 ? 2 : 1;
  if (columns >= 3) return GALLERY_PAGE_SIZE_WIDE;
  if (columns === 2) return GALLERY_PAGE_SIZE_DOUBLE;
  return GALLERY_PAGE_SIZE_SINGLE;
}

function currentGalleryPageSize() {
  const grid = nodes.galleryGrid;
  return galleryPageSizeForWidth(grid?.clientWidth || 0);
}

function renderGallery() {
  galleryImageObserver?.disconnect?.();
  galleryImageObserver = null;
  nodes.galleryGrid.innerHTML = "";

  if (!galleryItems.length) {
    nodes.galleryMeta.textContent = "图库为空";
    if (nodes.galleryPager) nodes.galleryPager.hidden = true;
    return;
  }

  const completedCount = galleryItems.filter((item) => !item.isGenerating).length;
  const generatingCount = galleryItems.length - completedCount;
  nodes.galleryMeta.textContent = generatingCount
    ? `${completedCount} 张 · ${generatingCount} 张生成中`
    : `${completedCount} 张 · 本地记录`;
  galleryPageSize = currentGalleryPageSize();
  const totalPages = Math.max(1, Math.ceil(galleryItems.length / galleryPageSize));
  galleryPage = Math.max(1, Math.min(galleryPage, totalPages));
  const start = (galleryPage - 1) * galleryPageSize;
  const pageItems = galleryItems.slice(start, start + galleryPageSize);

  pageItems.forEach((item) => {
    nodes.galleryGrid.append(createGalleryItem(item));
  });

  if (nodes.galleryPager) {
    nodes.galleryPager.hidden = totalPages <= 1;
    if (nodes.galleryPageText) nodes.galleryPageText.textContent = `${galleryPage} / ${totalPages}`;
    if (nodes.galleryPrevBtn) nodes.galleryPrevBtn.disabled = galleryPage <= 1;
    if (nodes.galleryNextBtn) nodes.galleryNextBtn.disabled = galleryPage >= totalPages;
  }
}

async function restoreGalleryItemsFromIndexedDb() {
  const indexedItems = await loadGalleryRecordsFromIndexedDb();
  if (indexedItems.length) {
    galleryItems = indexedItems;
    renderGallery();
    return;
  }

  if (galleryItems.length) {
    renderGallery();
    window.setTimeout(() => {
      migrateLegacyGalleryItemsToIndexedDb();
    }, 0);
    return;
  }

  renderGallery();
}

function galleryRecoveryKey(item) {
  return item?.galleryId
    || item?.localStoreId
    || item?.originalUrl
    || item?.url
    || `${item?.index || ""}|${item?.model || ""}|${item?.createdAt || ""}`;
}

async function recoverGalleryFromStorage() {
  if (!nodes.galleryRecoverBtn || nodes.galleryRecoverBtn.disabled) return;
  nodes.galleryRecoverBtn.disabled = true;
  setStatus("正在重新扫描当前插件身份下的本地图库和已完成任务。");

  try {
    const indexedItems = await loadGalleryRecordsFromIndexedDb();
    const runningItems = galleryItems.filter((item) => item.isGenerating);
    const completedItems = galleryItems.filter((item) => !item.isGenerating);
    const seen = new Set();
    const recoveredItems = [...indexedItems, ...completedItems].filter((item) => {
      const key = galleryRecoveryKey(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    galleryItems = [...runningItems, ...recoveredItems];
    galleryPage = 1;
    renderGallery();
    await consumeCompletedGenerationResults();
    renderGallery();
    saveWorkspaceState();

    const recoveredCount = galleryItems.filter((item) => !item.isGenerating).length;
    if (recoveredCount) {
      setStatus(`图库扫描完成，当前插件身份下共找到 ${recoveredCount} 张已生成图片。`);
    } else {
      setStatus("当前插件身份下没有找到旧图库；请在 Chrome 中重新加载原来的插件目录后再恢复。");
    }
  } catch (error) {
    setStatus(`图库恢复失败：${error?.message || "浏览器本地图库不可用"}。`);
  } finally {
    nodes.galleryRecoverBtn.disabled = false;
  }
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
    return `本地预览页被浏览器跨域策略拦截，无法直接请求 ${target}。请加载 dist/assetflow 为 Chrome 扩展后再生成图片。`;
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

function apiResponseErrorText(data, fallback) {
  const error = typeof data?.error === "string" ? data.error : data?.error?.message;
  return error || data?.errorMessage || data?.message || fallback;
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
    throw new Error(apiResponseErrorText(data, `${contextLabel}失败：${response.status}`));
  }

  const allowedCodes = new Set((requestOptions.allowCodes || []).map(normalizedApiCode));
  const code = normalizedApiCode(data?.code);
  if (!isSuccessfulApiCode(data?.code) && !allowedCodes.has(code)) {
    throw new Error(apiResponseErrorText(data, `${contextLabel}失败：${data.code}`));
  }

  const errorCode = normalizedApiCode(data?.errorCode);
  if (data?.errorCode && !allowedCodes.has(errorCode)) {
    throw new Error(apiResponseErrorText(data, `${contextLabel}失败：${data.errorCode}`));
  }

  return data;
}

function friendlyApiErrorMessage(message, providerLabel = "当前服务") {
  const text = String(message || "");
  if (/Download multimodal file timed out|Failed to download multimodal (?:file|content)|Failed to download image/i.test(text)) {
    return `${providerLabel} 无法下载网页参考图。AssetFlow 会优先改用 Base64 传图；请重新点击“反推提示词”。若仍失败，请先把图片下载到本地，再从上传区添加。`;
  }
  if (/Standard Model API is restricted to Enterprise-Shared API Keys/i.test(text)) {
    return `${providerLabel} 权限拒绝：当前 API Key 未开通所选 RunningHub Standard-API。请在 RunningHub 密钥页确认接口权限，或切换到“消费级会员（AI应用）”。`;
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

function base64ByteLength(value) {
  const base64 = String(value || "").replace(/\s/g, "");
  if (!base64) return 0;
  const padding = base64.endsWith("==") ? 2 : (base64.endsWith("=") ? 1 : 0);
  return Math.floor(base64.length * 3 / 4) - padding;
}

function isStandaloneLocalPreview() {
  return ["127.0.0.1", "localhost"].includes(location.hostname)
    && new URLSearchParams(location.search).has("standalone");
}

async function fetchImageResponse(sourceUrl) {
  let directResponse = null;
  let directError = null;
  const directController = new AbortController();
  const directTimeoutId = setTimeout(() => directController.abort(), 12000);
  try {
    directResponse = await fetch(sourceUrl, { signal: directController.signal });
    if (directResponse.ok) return directResponse;
  } catch (error) {
    directError = error;
  } finally {
    clearTimeout(directTimeoutId);
  }

  if (isStandaloneLocalPreview() && /^https?:\/\//i.test(sourceUrl)) {
    const proxyUrl = `/__assetflow/image-proxy?url=${encodeURIComponent(sourceUrl)}`;
    const proxyResponse = await fetch(proxyUrl);
    if (proxyResponse.ok) return proxyResponse;

    let proxyMessage = "";
    try {
      proxyMessage = (await proxyResponse.json())?.error || "";
    } catch {
      // The HTTP status below is enough when the preview proxy has no JSON body.
    }
    throw new Error(proxyMessage || `本地预览读取网页图片失败：HTTP ${proxyResponse.status}`);
  }

  if (directResponse) {
    throw new Error(`图片读取失败：HTTP ${directResponse.status}`);
  }
  throw new Error(directError?.message || "图片读取失败");
}

async function imageSourceAsDataUrl(imageItem = imageState) {
  if (imageItem.dataUrl) return imageItem.dataUrl;

  if (!imageItem.src || imageItem.src.startsWith("blob:")) {
    throw new Error("请先上传/粘贴一张可读取的图片。");
  }

  if (imageItem.src.startsWith("data:image/")) {
    return imageItem.src;
  }

  const response = await fetchImageResponse(imageItem.src);
  const blob = await response.blob();
  if (!blob.type.startsWith("image/")) {
    throw new Error("读取到的资源不是图片。");
  }

  return fileToDataUrl(blob);
}

async function qwenInlineImageDataUrl(imageItem = imageState) {
  let dataUrl;
  try {
    dataUrl = await imageSourceAsDataUrl(imageItem);
  } catch (error) {
    throw new Error(`千问无法读取这张网页参考图：${error?.message || "图片读取失败"}。请先下载图片，再从上传区添加。`);
  }

  const parsed = parseDataUrl(dataUrl);
  if (!parsed || !parsed.mimeType.startsWith("image/")) {
    throw new Error("千问视觉输入必须是可读取的图片格式。");
  }
  if (base64ByteLength(parsed.data) > 7 * 1024 * 1024) {
    throw new Error("参考图超过 7 MB，无法以内嵌方式发送给千问。请压缩图片后重新上传。");
  }
  return dataUrl;
}

function grsaiAspectRatio(width, height) {
  const ratios = [
    ["1:1", 1], ["16:9", 16 / 9], ["9:16", 9 / 16],
    ["4:3", 4 / 3], ["3:4", 3 / 4], ["3:2", 3 / 2],
    ["2:3", 2 / 3], ["5:4", 5 / 4], ["4:5", 4 / 5],
    ["21:9", 21 / 9], ["9:21", 9 / 21], ["2:1", 2], ["1:2", 1 / 2]
  ];
  const target = Math.max(1, Number(width) || 1) / Math.max(1, Number(height) || 1);
  return ratios.reduce((best, item) => (
    Math.abs(Math.log(item[1] / target)) < Math.abs(Math.log(best[1] / target)) ? item : best
  ), ratios[0])[0];
}

function sizeForApi() {
  const width = Number(nodes.widthInput.value) || 1024;
  const height = Number(nodes.heightInput.value) || 1024;
  return `${width}x${height}`;
}

function sizeForSeedreamApi() {
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
    "21-9": "21:9",
    "16-9": "16:9",
    "9-16": "9:16",
    "3-4": "3:4",
    "4-3": "4:3",
    "2k": "16:9",
    "4k": "16:9"
  };

  return presets[mode] || `${width}x${height}`;
}

function resolutionForApimartApi() {
  return ["2k", "4k"].includes(activeResolution) ? activeResolution : "1k";
}

function nearestRunningHubRatio(width, height) {
  const ratios = [
    { label: "1:1", value: 1 },
    { label: "2:3", value: 2 / 3 },
    { label: "3:2", value: 3 / 2 },
    { label: "21:9", value: 21 / 9 },
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
  return ["2k", "4k"].includes(activeResolution) ? activeResolution : "1k";
}

function selectedSizeRule(width, height) {
  const mode = nodes.sizeMode.value;
  const option = SIZE_OPTIONS[mode];
  const safeWidth = Math.max(128, Number(width) || Number(option?.width) || 1024);
  const safeHeight = Math.max(128, Number(height) || Number(option?.height) || 1024);
  const ratio = option?.ratio && option.ratio !== "auto"
    ? option.ratio
    : nearestRunningHubRatio(safeWidth, safeHeight);
  const orientation = safeWidth > safeHeight
    ? "横版宽画幅"
    : safeWidth < safeHeight
      ? "竖版画幅"
      : "正方形画幅";

  return {
    width: safeWidth,
    height: safeHeight,
    ratio,
    orientation,
    label: `${ratio} · ${safeWidth} × ${safeHeight}`
  };
}

function promptWithSizePriority(prompt, width, height) {
  const cleanPrompt = String(prompt || "").trim();
  if (!cleanPrompt) return cleanPrompt;
  const rule = selectedSizeRule(width, height);
  const isAuto = nodes.sizeMode.value === "auto";
  const level = isAuto ? "当前画布尺寸约束" : "最高优先级画布尺寸约束";
  const horizontalWarning = rule.width > rule.height
    ? "必须是横向完整画布，不要生成竖版海报、竖向构图、画中画海报或留黑边。"
    : "";
  const verticalWarning = rule.width < rule.height
    ? "必须是竖向完整画布，不要生成横版画面塞进竖版画布或留黑边。"
    : "";
  const squareWarning = rule.width === rule.height
    ? "必须是正方形完整画布，不要生成横版或竖版画面塞进正方形画布。"
    : "";

  return [
    cleanPrompt,
    "",
    `${level}：最终输出必须严格使用 ${rule.label}，${rule.orientation}。${horizontalWarning}${verticalWarning}${squareWarning}`,
    `Canvas rule with highest priority: render a full-canvas ${rule.ratio} image at ${rule.width}x${rule.height}. Ignore and override any conflicting aspect-ratio, size, portrait, vertical, landscape, horizontal, poster-ratio, or canvas instructions inside the prompt or reference images. Fill the entire canvas in this selected ratio.`
  ].join("\n");
}

function normalizeRunningHubApiMode(value) {
  if (value === RUNNINGHUB_API_MODE_ENTERPRISE) return RUNNINGHUB_API_MODE_ENTERPRISE;
  if (value === RUNNINGHUB_API_MODE_OFFICIAL) return RUNNINGHUB_API_MODE_OFFICIAL;
  return RUNNINGHUB_API_MODE_CONSUMER;
}

function isRunningHubStandardApiMode(value) {
  return normalizeRunningHubApiMode(value) !== RUNNINGHUB_API_MODE_CONSUMER;
}

function isRunningHubG2Model(value) {
  return value === RUNNINGHUB_G2_MODEL || value === RUNNINGHUB_G2_OFFICIAL_MODEL;
}

function runningHubApiModeLabel(value) {
  const normalizedMode = normalizeRunningHubApiMode(value);
  if (normalizedMode === RUNNINGHUB_API_MODE_OFFICIAL) {
    return "官方稳定版 Standard-API";
  }
  if (normalizedMode === RUNNINGHUB_API_MODE_ENTERPRISE) {
    return "企业级共享低价渠道 Standard-API";
  }
  return "消费级会员 AI应用";
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
  const sourceItems = options.items || imageItems;
  const selected = (options.useAll
    ? sourceItems
    : sourceItems.filter((item) => selectedImageIds.has(item.id))
  ).slice(0, max);
  const urls = [];
  const usedItems = [];

  for (const item of selected) {
    try {
      urls.push(await imageSourceAsDataUrl(item));
      usedItems.push(item);
    } catch {
      // Ignore unreadable optional reference images; prompt-only generation should still work.
    }
  }
  await options.onReferencesPrepared?.(usedItems.map((item) => item.id));
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
      useImageReferences ? [ratio, "auto", "match_input_image"] : [ratio, "auto", "1:1"],
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
  const url = baseUrlWithPath(baseUrl, isRunningHubStandardApiMode(normalizedMode)
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

  if (isRunningHubStandardApiMode(normalizedMode)) {
    const downloadUrl = data?.data?.download_url || data?.data?.downloadUrl || data?.download_url || data?.downloadUrl;
    if (!downloadUrl) {
      throw new Error("RunningHub Standard-API 参考图上传成功，但没有返回 download_url。");
    }
    return downloadUrl;
  }

  const fileName = data?.data?.fileName || data?.data?.filename || data?.fileName || data?.filename;
  if (!fileName) {
    throw new Error("RunningHub 参考图上传成功，但没有返回 fileName。");
  }

  return fileName;
}

async function selectedImageUrlsForRunningHubApi({ baseUrl, apiKey, apiMode, max = 1, onProgress, onReferencesPrepared, referenceItems = imageItems, selectedReferenceIds = [...selectedImageIds] }) {
  const selected = referenceItems
    .filter((item) => selectedReferenceIds.includes(item.id))
    .slice(0, max);
  const images = selected.length ? selected : referenceItems.slice(0, max);
  const values = [];

  for (let index = 0; index < images.length; index += 1) {
    const item = images[index];
    const source = item?.dataUrl || item?.src || "";
    if (/^https?:\/\//i.test(source) && !isLocalPreviewHttpUrl(source)) {
      values.push(source);
      continue;
    }

    onProgress?.(null, "正在上传参考图");
    values.push(await uploadRunningHubImage({ baseUrl, apiKey, apiMode, imageItem: item, index }));
  }

  await onReferencesPrepared?.(images.map((item) => item.id));
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
      onProgress?.(null, "APIMart 正在生成");
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

  throw new PendingGenerationTaskError(`APIMart 任务 ${taskId} 仍在处理中。插件已保留任务，会继续查询结果。`);
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
  source,
  onProgress,
  onReferencesPrepared,
  referenceItems,
  onTaskSubmitted
}) {
  const body = {
    model: "gpt-image-2",
    prompt,
    n: 1,
    size: sizeForApimartApi(),
    resolution: resolutionForApimartApi()
  };
  const imageUrls = useImageReferences
    ? await selectedImageDataUrlsForApi({ useAll: true, max: 16, onReferencesPrepared, items: referenceItems })
    : [];
  if (!useImageReferences) await onReferencesPrepared?.([]);

  if (imageUrls.length) {
    body.image_urls = imageUrls;
    setStatus(`GPT-Image-2 正在使用 ${imageUrls.length} 张参考图生成。`);
  }

  onProgress?.(null, "正在提交任务");
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

  onProgress?.(null, "任务已提交");
  onTaskSubmitted?.({
    provider: "apimart",
    taskId,
    baseUrl
  });
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
    source: normalizeGallerySource(source, mode),
    url
  }));
}

function grsaiResultUrls(data) {
  const results = Array.isArray(data?.results) ? data.results : [];
  return results.flatMap((result) => Array.isArray(result?.url) ? result.url : [result?.url])
    .filter((url) => typeof url === "string" && /^https?:\/\//i.test(url));
}

async function pollGrsaiTask({ baseUrl, apiKey, taskId, count, onProgress }) {
  const resultUrl = new URL(baseUrlWithPath(baseUrl, "/v1/api/result"));
  resultUrl.searchParams.set("id", taskId);
  for (let attempt = 1; attempt <= 75; attempt += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, attempt === 1 ? 5000 : 4000));
    const data = await fetchJson(resultUrl.toString(), {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` }
    }, "Grsai 任务查询");
    const status = extractTaskStatus(data, "processing");
    if (isFailedTaskStatus(status) || normalizeTaskStatus(status) === "violation") {
      throw new Error(typeof data?.error === "string" ? data.error : extractTaskErrorMessage(data, "Grsai 任务生成失败或内容违规。"));
    }
    if (isCancelledTaskStatus(status)) throw new Error("Grsai 任务已取消。");
    const urls = grsaiResultUrls(data);
    if (isCompletedTaskStatus(status)) {
      if (!urls.length) throw new Error("Grsai 任务已完成，但没有返回图片 URL。");
      return urls.slice(0, count);
    }
    const progress = Number(data?.progress);
    onProgress?.(Number.isFinite(progress) ? progress : null, "Grsai 正在生成");
    setStatus(`Grsai 任务 ${taskId} 正在生成：${status}。`);
  }
  throw new PendingGenerationTaskError(`Grsai 任务 ${taskId} 仍在处理中。插件已保留任务，会继续查询结果。`);
}

async function callGrsaiGptImage({
  prompt, displayPrompt, promptCn, promptEn, promptStructure,
  count, width, height, model, imageModel, apiKey, baseUrl,
  useImageReferences, mode, source, onProgress, onReferencesPrepared,
  referenceItems, selectedReferenceIds = [], onTaskSubmitted
}) {
  if (!["gpt-image-2", "gpt-image-2.5"].includes(imageModel)) {
    throw new Error("Grsai GPT Image API 请选用 GPT Image 2 或 GPT Image 2.5 模型。");
  }
  if (width > 1920 || height > 1920 || width * height > 1920 * 1024) {
    throw new Error("Grsai GPT Image 2 / 2.5 仅支持 1K 尺寸，请在尺寸设置中选择 1K。");
  }
  const selectedItems = referenceItems.filter((item) => selectedReferenceIds.includes(item.id));
  const directItems = selectedItems.length ? selectedItems : referenceItems;
  const images = useImageReferences
    ? await selectedImageDataUrlsForApi({ useAll: true, max: 16, onReferencesPrepared, items: directItems })
    : [];
  if (!useImageReferences) await onReferencesPrepared?.([]);
  if (useImageReferences && !images.length) {
    throw new Error("Grsai 图生图未能读取参考图，请重新上传后再试。");
  }
  onProgress?.(null, "正在提交任务");
  const data = await fetchJson(baseUrlWithPath(baseUrl, "/v1/api/generate"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: imageModel,
      prompt,
      images,
      aspectRatio: grsaiAspectRatio(width, height),
      quality: "auto",
      replyType: "async"
    })
  }, "Grsai 提交");
  const status = extractTaskStatus(data, "processing");
  if (isFailedTaskStatus(status) || normalizeTaskStatus(status) === "violation") {
    throw new Error(typeof data?.error === "string" ? data.error : extractTaskErrorMessage(data, "Grsai 任务生成失败或内容违规。"));
  }
  if (isCancelledTaskStatus(status)) throw new Error("Grsai 任务已取消。");
  let urls = grsaiResultUrls(data);
  if (!urls.length && isCompletedTaskStatus(status)) {
    throw new Error("Grsai 任务已完成，但没有返回图片 URL。");
  }
  if (!urls.length) {
    const taskId = String(data?.id || data?.taskId || data?.task_id || "");
    if (!taskId) throw new Error("Grsai 未返回图片，也没有返回可查询的任务 ID。");
    onTaskSubmitted?.({ provider: "grsai", taskId, baseUrl });
    onProgress?.(null, "Grsai 正在生成");
    urls = await pollGrsaiTask({ baseUrl, apiKey, taskId, count, onProgress });
  }
  return urls.slice(0, count).map((url, index) => ({
    index: `#${galleryItems.length + index + 1}`,
    model, width, height, prompt: displayPrompt || prompt,
    promptCn, promptEn, promptStructure, mode,
    source: normalizeGallerySource(source, mode), url
  }));
}

async function pollRunningHubTask({ baseUrl, apiKey, apiMode, taskId, count, onProgress }) {
  const maxAttempts = 180;
  const normalizedMode = normalizeRunningHubApiMode(apiMode);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, attempt === 1 ? 5000 : 4000));

    const data = await fetchJson(baseUrlWithPath(baseUrl, isRunningHubStandardApiMode(normalizedMode)
      ? RUNNINGHUB_API_PATHS.standardQuery
      : RUNNINGHUB_API_PATHS.appOutputs), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(isRunningHubStandardApiMode(normalizedMode)
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
      onProgress?.(null, "RunningHub 正在生成");
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

  throw new PendingGenerationTaskError(`RunningHub 任务 ${taskId} 仍在处理中。插件已保留任务，会继续查询结果。`);
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
  source,
  onProgress,
  onReferencesPrepared,
  referenceItems,
  selectedReferenceIds,
  onTaskSubmitted
}) {
  const normalizedMode = normalizeRunningHubApiMode(apiMode);
  if (isRunningHubStandardApiMode(normalizedMode)) {
    const isOfficial = normalizedMode === RUNNINGHUB_API_MODE_OFFICIAL;
    const apiLabel = isOfficial ? "官方稳定版（quality: low）" : "企业级共享低价渠道";
    const body = {
      prompt,
      aspectRatio: aspectRatioForRunningHubApi(width, height),
      resolution: resolutionForRunningHubApi(),
      quality: isOfficial ? "low" : "medium"
    };
    let endpoint = isOfficial
      ? RUNNINGHUB_API_PATHS.officialTextToImage
      : RUNNINGHUB_API_PATHS.standardTextToImage;

    if (useImageReferences) {
      const imageUrls = await selectedImageUrlsForRunningHubApi({
        baseUrl,
        apiKey,
        apiMode: normalizedMode,
        max: 16,
        onProgress,
        onReferencesPrepared,
        referenceItems,
        selectedReferenceIds
      });
      if (!imageUrls.length) {
        throw new Error(`RunningHub ${apiLabel}图生图需要先上传或粘贴参考图片。`);
      }
      body.imageUrls = imageUrls;
      endpoint = isOfficial
        ? RUNNINGHUB_API_PATHS.officialImageToImage
        : RUNNINGHUB_API_PATHS.standardImageToImage;
      setStatus(`RunningHub ${apiLabel}接口正在使用 ${imageUrls.length} 张参考图生成。`);
    } else {
      setStatus(`RunningHub ${apiLabel}接口正在进行文生图生成。`);
      await onReferencesPrepared?.([]);
    }

    onProgress?.(null, "正在提交任务");
    const data = await fetchJson(baseUrlWithPath(baseUrl, endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    }, `RunningHub ${apiLabel}提交`);

    const taskId = extractRunningHubTaskId(data);
    if (!taskId) {
      const urls = extractRunningHubImages(data);
      if (urls.length) {
        onProgress?.(null, "正在载入图片");
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
          source: normalizeGallerySource(source, mode),
          url
        }));
      }
      const responseMessage = extractTaskErrorMessage(data, "");
      const fields = data && typeof data === "object" ? Object.keys(data).join(", ") : "";
      throw new Error(responseMessage
        ? `RunningHub 返回：${responseMessage}`
        : `RunningHub 已响应，但没有返回 taskId 或图片 URL。返回字段：${fields || "空响应"}。`);
    }

    onProgress?.(null, "任务已提交");
    onTaskSubmitted?.({
      provider: "runninghub",
      taskId,
      baseUrl,
      apiMode: normalizedMode
    });
    setStatus(`RunningHub ${apiLabel}任务已提交：${taskId}。正在等待生成结果。`);
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
      source: normalizeGallerySource(source, mode),
      url
    }));
  }

  const webappId = runningHubG2AppId(useImageReferences);
  onProgress?.(null, "正在读取AI应用参数");
  const demo = await fetchRunningHubAppDemo({ baseUrl, apiKey, webappId });
  let imageValues = [];
  if (useImageReferences) {
    imageValues = await selectedImageUrlsForRunningHubApi({ baseUrl, apiKey, apiMode: normalizedMode, max: 1, onProgress, onReferencesPrepared, referenceItems, selectedReferenceIds });
    if (!imageValues.length) {
      throw new Error("RunningHub 图生图需要先上传或粘贴参考图片。");
    }
    setStatus("RunningHub 全能图片G-2.0 低价渠道版正在使用图生图 AI应用生成。");
  } else {
    setStatus("RunningHub 全能图片G-2.0 低价渠道版正在使用文生图 AI应用生成。");
    await onReferencesPrepared?.([]);
  }

  const nodeInfoList = prepareRunningHubAppNodeInfoList({
    demo,
    prompt,
    width,
    height,
    useImageReferences,
    imageValues
  });

  onProgress?.(null, "正在提交任务");
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
      onProgress?.(null, "正在载入图片");
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
          source: normalizeGallerySource(source, mode),
          url
        }));
    }
    const responseMessage = extractTaskErrorMessage(data, "");
    const fields = data && typeof data === "object" ? Object.keys(data).join(", ") : "";
    throw new Error(responseMessage
      ? `RunningHub 返回：${responseMessage}`
      : `RunningHub 已响应，但没有返回 taskId 或图片 URL。返回字段：${fields || "空响应"}。`);
  }

  onProgress?.(null, "任务已提交");
  onTaskSubmitted?.({
    provider: "runninghub",
    taskId,
    baseUrl,
    apiMode: normalizedMode
  });
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
    source: normalizeGallerySource(source, mode),
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
  source,
  onProgress,
  onReferencesPrepared,
  referenceItems,
  selectedReferenceIds,
  onTaskSubmitted
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

  if (provider === "grsai") {
    return callGrsaiGptImage({
      prompt, displayPrompt, promptCn, promptEn, promptStructure,
      count, width, height, model, imageModel, apiKey, baseUrl,
      useImageReferences: useImageReferences && referenceItems.length > 0,
      mode, source, onProgress, onReferencesPrepared, referenceItems, selectedReferenceIds,
      onTaskSubmitted: (task) => onTaskSubmitted?.({ ...task, apiKey, baseUrl })
    });
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
      useImageReferences: useImageReferences && referenceItems.length > 0,
      mode,
      source,
      onProgress,
      onReferencesPrepared,
      referenceItems,
      onTaskSubmitted: (task) => onTaskSubmitted?.({
        ...task,
        apiKey,
        baseUrl,
        apiMode: image.runninghubMode
      })
    });
  }

  if (provider === "runninghub" && isRunningHubG2Model(imageModel)) {
    const runningHubMode = imageModel === RUNNINGHUB_G2_OFFICIAL_MODEL
      ? RUNNINGHUB_API_MODE_OFFICIAL
      : image.runninghubMode;
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
      apiMode: runningHubMode,
      mode,
      source,
      onProgress,
      onReferencesPrepared,
      referenceItems,
      selectedReferenceIds,
      onTaskSubmitted: (task) => onTaskSubmitted?.({
        ...task,
        apiKey,
        baseUrl,
        apiMode: runningHubMode
      })
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

  await onReferencesPrepared?.([]);
  onProgress?.(null, "正在提交请求");
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

  onProgress?.(null, "正在载入图片");
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
    source: normalizeGallerySource(source, mode),
    url
  }));
}

function createGeneratingItems({
  count,
  model,
  width,
  height,
  prompt,
  promptCn,
  promptEn,
  promptStructure,
  reusePlan,
  assetLineage,
  generationContext,
  mode,
  source
}) {
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
    reusePlan: reusePlan || null,
    assetLineage: assetLineage || null,
    generationContext: generationContext || null,
    mode,
    source: normalizeGallerySource(source, mode),
    url: "",
    isGenerating: true,
    progress: 0,
    progressTarget: 0,
    progressTargetAt: performance.now(),
    hasRealProgress: false,
    progressLabel: "等待生成"
  }));
}

function pendingTaskToGeneratingItem(task) {
  return {
    index: task.index || `#${galleryItems.length + 1}`,
    generationId: task.generationId,
    pendingTaskId: task.id || "",
    taskId: task.taskId || "",
    model: task.model || "Generated Image",
    width: Number(task.width) || 1024,
    height: Number(task.height) || 1024,
    prompt: task.displayPrompt || task.prompt || "",
    promptCn: task.promptCn || "",
    promptEn: task.promptEn || "",
    promptStructure: task.promptStructure || "",
    reusePlan: task.reusePlan || null,
    assetLineage: task.assetLineage || null,
    generationContext: task.generationContext || null,
    mode: normalizeGalleryMode(task.mode),
    source: normalizeGallerySource(task.source || task.generationSource, task.mode),
    url: "",
    isGenerating: true,
    progress: Number(task.progress) || 0,
    progressTarget: Number(task.progressTarget) || 0,
    progressTargetAt: performance.now(),
    hasRealProgress: Boolean(task.hasRealProgress),
    progressLabel: "恢复生成任务"
  };
}

function ensurePendingGenerationPlaceholders(tasks) {
  let changed = false;
  const existingIds = new Set(galleryItems.map((item) => item.generationId).filter(Boolean));
  const placeholders = [];
  tasks.forEach((task) => {
    if (existingIds.has(task.generationId)) return;
    placeholders.push(pendingTaskToGeneratingItem(task));
    existingIds.add(task.generationId);
  });
  if (placeholders.length) {
    galleryItems = [...placeholders, ...galleryItems];
    galleryPage = 1;
    changed = true;
  }
  if (changed) renderGallery();
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
    pendingTaskId: "",
    taskId: "",
    progress: 100,
    progressTarget: 100,
    hasRealProgress: true,
    isGenerating: false
  };
  galleryPage = 1;
  renderGallery();
  saveWorkspaceState();
  return true;
}

async function runRealGeneration(payload, placeholders) {
  const batchGenerationIds = new Set(placeholders.map((item) => item.generationId).filter(Boolean));
  try {
    setStatus("正在调用生图 API，请稍等。");

    const items = [];

    for (let index = 0; index < placeholders.length; index += 1) {
      setStatus(`正在生成 ${index + 1}/${placeholders.length}。`);
      updateGeneratingItemProgress(placeholders[index], null, `正在生成 ${index + 1}/${placeholders.length}`);
      const [item] = await callImageGenerationApi({
        ...payload,
        count: 1,
        onReferencesPrepared: async (directIds) => {
          payload.assetLineage = await generationLineageFromRequest(payload, directIds);
          payload.generationContext = generationContextWithLineage(payload.generationContext, payload.assetLineage);
          placeholders[index].assetLineage = payload.assetLineage;
          placeholders[index].generationContext = payload.generationContext;
        },
        onProgress: (progress, label) => updateGeneratingItemProgress(
          placeholders[index],
          progress,
          generationTaskLabel(placeholders[index], label)
        ),
        onTaskSubmitted: (task) => {
          const pendingId = upsertPendingGenerationTask({
            ...task,
            generationId: placeholders[index].generationId,
            index: placeholders[index].index,
            model: payload.model,
            width: payload.width,
            height: payload.height,
            prompt: payload.prompt,
            displayPrompt: payload.displayPrompt,
            promptCn: payload.promptCn,
            promptEn: payload.promptEn,
            promptStructure: payload.promptStructure,
            reusePlan: payload.reusePlan || null,
            assetLineage: payload.assetLineage || null,
            generationContext: payload.generationContext || null,
            mode: payload.mode,
            source: payload.source,
            count: 1
          });
          placeholders[index].pendingTaskId = pendingId;
          placeholders[index].taskId = task.taskId || "";
          updateGeneratingItemProgress(
            placeholders[index],
            null,
            generationTaskLabel(placeholders[index], "任务已提交，正在生成")
          );
        }
      });
      if (item) {
        updateGeneratingItemProgress(placeholders[index], null, "正在载入图片");
        item.index = placeholders[index].index;
        item.reusePlan = payload.reusePlan || placeholders[index].reusePlan || null;
        item.assetLineage = payload.assetLineage || placeholders[index].assetLineage || null;
        item.generationContext = payload.generationContext || placeholders[index].generationContext || null;
        const savedItem = await persistGalleryItemImage(item);
        removePendingGenerationTask({ id: placeholders[index].pendingTaskId, generationId: placeholders[index].generationId });
        items.push(savedItem);
        if (!replaceGeneratingItem(placeholders[index], savedItem)) {
          galleryItems = [{ ...savedItem, isGenerating: false }, ...galleryItems.filter((entry) => entry.generationId !== placeholders[index].generationId)];
          galleryPage = 1;
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
    if (isPendingGenerationTaskError(error)) {
      const pendingGenerationIds = new Set(loadPendingGenerationTasks().map((task) => task.generationId));
      let keptPending = false;
      galleryItems = galleryItems.filter((item) => {
        if (!item.isGenerating || !batchGenerationIds.has(item.generationId)) return true;
        const shouldKeep = pendingGenerationIds.has(item.generationId);
        if (shouldKeep) {
          keptPending = true;
          updateGeneratingItemProgress(item, null, "任务仍在处理中");
        }
        return shouldKeep;
      });
      if (keptPending) {
        renderGallery();
        saveWorkspaceState();
        schedulePendingGenerationResume();
        setStatus(error.message || "生成任务仍在处理中，插件会继续查询结果。");
        return;
      }
    }
    galleryItems = galleryItems.filter((item) => (
      !item.isGenerating || !batchGenerationIds.has(item.generationId)
    ));
    renderGallery();
    saveWorkspaceState();
    setStatus(friendlyApiErrorMessage(error.message || "生图 API 调用失败。", payload.model || "生图 API"));
  }
}

async function resolvePendingGenerationTask(task) {
  const placeholder = galleryItems.find((item) => item.generationId === task.generationId)
    || pendingTaskToGeneratingItem(task);
  const config = currentApiConfigFromForm();
  const imageConfig = config.image || {};
  const baseUrl = task.baseUrl || imageConfig.baseUrl || defaultBaseUrl(task.provider || imageConfig.provider);
  const apiKey = task.apiKey || imageConfig.apiKey;
  if (!baseUrl || !apiKey) {
    setStatus("有未完成的生成任务，但缺少提交任务时的生图 API 配置。保存对应 API 后会继续查询。");
    return;
  }

  try {
    updateGeneratingItemProgress(placeholder, null, "正在恢复任务");
    const urls = task.provider === "grsai"
      ? await pollGrsaiTask({
        baseUrl, apiKey, taskId: task.taskId, count: task.count || 1,
        onProgress: (progress, label) => updateGeneratingItemProgress(
          placeholder, progress, generationTaskLabel(placeholder, label)
        )
      })
      : task.provider === "apimart"
      ? await pollApimartTask({
        baseUrl,
        apiKey,
        taskId: task.taskId,
        count: task.count || 1,
        onProgress: (progress, label) => updateGeneratingItemProgress(
          placeholder,
          progress,
          generationTaskLabel(placeholder, label)
        )
      })
      : await pollRunningHubTask({
        baseUrl,
        apiKey,
        apiMode: task.apiMode || imageConfig.runninghubMode,
        taskId: task.taskId,
        count: task.count || 1,
        onProgress: (progress, label) => updateGeneratingItemProgress(
          placeholder,
          progress,
          generationTaskLabel(placeholder, label)
        )
      });
    const [url] = urls;
    if (!url) throw new Error("任务完成后没有返回图片 URL。");

    updateGeneratingItemProgress(placeholder, null, "正在载入图片");
    const savedItem = await persistGalleryItemImage({
      index: task.index || placeholder.index,
      model: task.model || placeholder.model,
      width: task.width || placeholder.width,
      height: task.height || placeholder.height,
      prompt: task.displayPrompt || task.prompt || placeholder.prompt,
      promptCn: task.promptCn || placeholder.promptCn,
      promptEn: task.promptEn || placeholder.promptEn,
      promptStructure: task.promptStructure || placeholder.promptStructure,
      reusePlan: task.reusePlan || placeholder.reusePlan || null,
      assetLineage: task.assetLineage || placeholder.assetLineage || null,
      generationContext: task.generationContext || placeholder.generationContext || null,
      mode: normalizeGalleryMode(task.mode),
      source: normalizeGallerySource(task.source || placeholder.source, task.mode || placeholder.mode),
      url
    });
    removePendingGenerationTask({ id: task.id, generationId: task.generationId });
    if (!replaceGeneratingItem(placeholder, savedItem)) {
      galleryItems = [{ ...savedItem, isGenerating: false }, ...galleryItems.filter((item) => item.generationId !== task.generationId)];
      galleryPage = 1;
      renderGallery();
      saveWorkspaceState();
    }
    setStatus("已恢复完成的生成任务，结果已加入已生成图库。");
  } catch (error) {
    const message = error.message || "任务恢复失败。";
    if (isPendingGenerationTaskError(error)) {
      updateGeneratingItemProgress(placeholder, null, "任务仍在处理中");
      schedulePendingGenerationResume();
      setStatus("任务仍在处理中，已保留任务并会继续查询。");
      return;
    }
    removePendingGenerationTask({ id: task.id, generationId: task.generationId });
    galleryItems = galleryItems.filter((item) => item.generationId !== task.generationId);
    renderGallery();
    saveWorkspaceState();
    setStatus(friendlyApiErrorMessage(message, task.model || "生图 API"));
  }
}

async function consumeCompletedGenerationResults() {
  const result = await chromeStorageLocalGet(COMPLETED_GENERATION_RESULTS_KEY);
  const records = Array.isArray(result?.[COMPLETED_GENERATION_RESULTS_KEY])
    ? result[COMPLETED_GENERATION_RESULTS_KEY]
    : [];
  if (!records.length) return;

  const remaining = [];
  let importedCount = 0;
  let failedCount = 0;

  for (const record of records) {
    const task = record?.task || record;
    if (!task?.taskId && !task?.generationId) continue;

    if (record.status === "failed") {
      failedCount += 1;
      removePendingGenerationTask({ id: task.id, generationId: task.generationId });
      galleryItems = galleryItems.filter((item) => item.generationId !== task.generationId);
      setStatus(`后台生成任务失败：${record.error || "远程 API 返回失败状态"}。`);
      continue;
    }

    const localRecords = Array.isArray(record.items) ? record.items.filter((item) => item?.localStoreId) : [];
    const urls = Array.isArray(record.urls) ? record.urls.filter(Boolean) : [];

    try {
      for (let itemIndex = 0; itemIndex < localRecords.length; itemIndex += 1) {
        const storedRecord = localRecords[itemIndex];
        const savedItem = galleryItemFromRecord(storedRecord, galleryItems.length);
        const alreadyImported = galleryItems.some((item) => (
          !item.isGenerating && (item.galleryId === savedItem.galleryId || item.localStoreId === savedItem.localStoreId)
        ));
        if (alreadyImported) continue;

        const placeholder = itemIndex === 0
          ? (galleryItems.find((item) => item.generationId === task.generationId) || pendingTaskToGeneratingItem(task))
          : null;
        if (placeholder && replaceGeneratingItem(placeholder, savedItem)) {
          importedCount += 1;
        } else {
          galleryItems = [{ ...savedItem, isGenerating: false }, ...galleryItems.filter((item) => item.generationId !== task.generationId)];
          galleryPage = 1;
          renderGallery();
          saveWorkspaceState();
          importedCount += 1;
        }
      }

      for (let urlIndex = 0; urlIndex < urls.length; urlIndex += 1) {
        const url = urls[urlIndex];
        const alreadyImported = galleryItems.some((item) => (
          !item.isGenerating
          && (item.originalUrl === url || item.url === url)
        ));
        if (alreadyImported) continue;

        const placeholder = urlIndex === 0
          ? (galleryItems.find((item) => item.generationId === task.generationId) || pendingTaskToGeneratingItem(task))
          : null;
        const savedItem = await persistGalleryItemImage({
          index: urlIndex === 0 ? (task.index || placeholder?.index || `#${galleryItems.length + 1}`) : `#${galleryItems.length + 1}`,
          model: task.model || placeholder?.model || "Generated Image",
          width: task.width || placeholder?.width || 1024,
          height: task.height || placeholder?.height || 1024,
          prompt: task.displayPrompt || task.prompt || placeholder?.prompt || "",
          promptCn: task.promptCn || placeholder?.promptCn || "",
          promptEn: task.promptEn || placeholder?.promptEn || "",
          promptStructure: task.promptStructure || placeholder?.promptStructure || "",
          reusePlan: task.reusePlan || placeholder?.reusePlan || null,
          assetLineage: task.assetLineage || placeholder?.assetLineage || null,
          generationContext: task.generationContext || placeholder?.generationContext || null,
          mode: normalizeGalleryMode(task.mode),
          source: normalizeGallerySource(task.source || placeholder?.source, task.mode || placeholder?.mode),
          url
        });
        if (placeholder && replaceGeneratingItem(placeholder, savedItem)) {
          importedCount += 1;
        } else {
          galleryItems = [{ ...savedItem, isGenerating: false }, ...galleryItems.filter((item) => item.generationId !== task.generationId)];
          galleryPage = 1;
          renderGallery();
          saveWorkspaceState();
          importedCount += 1;
        }
      }
      removePendingGenerationTask({ id: task.id, generationId: task.generationId });
    } catch {
      remaining.push({ ...record, items: localRecords });
    }
  }

  if (remaining.length) {
    await chromeStorageLocalSet({ [COMPLETED_GENERATION_RESULTS_KEY]: remaining });
  } else {
    await chromeStorageLocalRemove(COMPLETED_GENERATION_RESULTS_KEY);
  }

  if (importedCount || failedCount) {
    renderGallery();
    saveWorkspaceState();
  }
  if (importedCount) {
    setStatus(`已导入 ${importedCount} 张后台完成的生成图片。`);
  }
}

let isResumingPendingGenerationTasks = false;
function resumePendingGenerationTasks() {
  if (isResumingPendingGenerationTasks) return;
  const tasks = loadPendingGenerationTasks();
  if (!tasks.length) return;
  isResumingPendingGenerationTasks = true;
  ensurePendingGenerationPlaceholders(tasks);
  setStatus(`发现 ${tasks.length} 个未完成生成任务，正在恢复查询。`);
  Promise.allSettled(tasks.map((task) => resolvePendingGenerationTask(task)))
    .finally(() => {
      isResumingPendingGenerationTasks = false;
    });
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
  const count = Math.max(1, Math.min(8, Number(nodes.countInput.value) || 1));
  const width = Number(nodes.widthInput.value) || 1024;
  const height = Number(nodes.heightInput.value) || 1024;
  const sourcePrompt = bundle.english || bundle.chinese || displayPrompt;
  const prompt = promptWithSizePriority(sourcePrompt, width, height);
  const model = nodes.modelSelect.options[nodes.modelSelect.selectedIndex].text;
  const effectiveGenerationMode = promptMethod === "reuse" && imageItems.length > 0
    ? "image"
    : generationMode === "image" && imageItems.length > 0
      ? "image"
      : "text";
  const generationSource = promptMethod === "reuse" ? "reuse" : effectiveGenerationMode;
  const reusePlan = generationSource === "reuse" ? bundle.reusePlan : null;
  const assetLineage = reusePlan ? reusePlanApi().lineageSnapshot(reusePlan) : null;
  const referenceItems = imageItems.map((item) => ({ ...item }));
  const selectedReferenceIds = [...selectedImageIds];
  const generationContext = captureGenerationContext({
    mode: generationSource, prompt: displayPrompt || sourcePrompt, model,
    width, height, count, referenceItems, selectedReferenceIds, reusePlan
  });
  if (generationMode === "image" && effectiveGenerationMode === "text") {
    setGenerationMode("text", { silent: true });
  }

  if (!isVisualReusePromptCurrent()) {
    setStatus("当前复用方案不属于这组参考图或参数，请先点击“查看方案”。");
    setVisualReusePanelOpen(true);
    return;
  }

  if (!displayPrompt && !prompt) {
    setStatus("请先填写提示词，或点击反推提示词。");
    nodes.promptInput.focus();
    return;
  }

  const placeholders = createGeneratingItems({
    count,
    model,
    width,
    height,
    prompt: displayPrompt || sourcePrompt,
    promptCn: bundle.chinese,
    promptEn: bundle.english,
    promptStructure: bundle.structure,
    reusePlan,
    assetLineage,
    generationContext,
    mode: effectiveGenerationMode,
    source: generationSource
  });
  galleryItems = [...placeholders, ...galleryItems];
  galleryPage = 1;
  renderGallery();
  saveWorkspaceState();

  if (shouldUseRealImageApi()) {
    runRealGeneration({
      prompt,
      displayPrompt: displayPrompt || prompt,
      promptCn: bundle.chinese,
      promptEn: bundle.english,
      promptStructure: bundle.structure,
      reusePlan,
      assetLineage,
      generationContext,
      referenceItems,
      selectedReferenceIds,
      useImageReferences: effectiveGenerationMode === "image",
      count,
      width,
      height,
      model,
      mode: effectiveGenerationMode,
      source: generationSource
    }, placeholders);
    return;
  }

  let progress = 0;
  const generationTimer = window.setInterval(() => {
    progress = Math.min(100, progress + 8 + Math.round(Math.random() * 11));
    setStatus(progress >= 100 ? "正在收尾。" : `模拟生成中 ${progress}%。`);
    placeholders.forEach((placeholder) => {
      updateGeneratingItemProgress(placeholder, Math.min(99, progress), progress >= 100 ? "正在收尾" : "模拟生成中");
    });

    if (progress >= 100) {
      window.clearInterval(generationTimer);
      generationTimers.delete(generationTimer);
      placeholders.forEach((placeholder, index) => {
        replaceGeneratingItem(placeholder, {
          index: placeholder.index,
          model,
          width,
          height,
          prompt,
          promptCn: bundle.chinese,
          promptEn: bundle.english,
          promptStructure: bundle.structure,
          reusePlan,
          assetLineage,
          generationContext,
          mode: effectiveGenerationMode,
          source: generationSource,
          url: ""
        });
      });
      setStatus("模拟生成完成。配置真实 API 后会显示生成图片。");
    }
  }, 180);
  generationTimers.add(generationTimer);

  if (apiConfig?.image?.apiKey) {
    setStatus(`正在用 ${apiConfig.image.providerLabel} 生图 API 配置模拟提交任务；接入网络请求后会调用真实生图 API。`);
  } else {
    setStatus("正在模拟生成进度。保存生图 API 配置后，可把这里接到真实任务状态。");
  }
}

function createCustomProviderId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `provider-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeCustomApiProvider(value) {
  const provider = value && typeof value === "object" ? value : {};
  const kind = provider.kind === "image" ? "image" : "prompt";
  return {
    id: String(provider.id || createCustomProviderId()),
    kind,
    name: String(provider.name || "").trim().slice(0, 40),
    baseUrl: String(provider.baseUrl || "").trim(),
    apiKey: String(provider.apiKey || "").trim(),
    model: String(provider.model || "").trim(),
    protocol: "openai-compatible",
    createdAt: provider.createdAt || new Date().toISOString(),
    updatedAt: provider.updatedAt || new Date().toISOString()
  };
}

function customProviderOptionValue(providerId) {
  return `${CUSTOM_PROVIDER_OPTION_PREFIX}${providerId}`;
}

function customProviderModelValue(providerId) {
  return `${CUSTOM_PROVIDER_MODEL_PREFIX}${providerId}`;
}

function customProviderIdFromValue(value, prefix) {
  const text = String(value || "");
  return text.startsWith(prefix) ? text.slice(prefix.length) : "";
}

function customProviderById(providerId) {
  return customApiProviders.find((provider) => provider.id === providerId) || null;
}

function customProviderFromSelectValue(value) {
  return customProviderById(customProviderIdFromValue(value, CUSTOM_PROVIDER_OPTION_PREFIX));
}

function customProviderFromModelValue(value) {
  return customProviderById(customProviderIdFromValue(value, CUSTOM_PROVIDER_MODEL_PREFIX));
}

function customProviderForKind(providerId, kind) {
  const provider = customProviderById(providerId);
  return provider?.kind === kind ? provider : null;
}

function saveCustomApiProviders() {
  localStorage.setItem(CUSTOM_API_PROVIDERS_STORAGE_KEY, JSON.stringify(customApiProviders));
  chromeStorageLocalSet({ [CUSTOM_API_PROVIDERS_STORAGE_KEY]: customApiProviders });
}

function loadCustomApiProviders() {
  try {
    const stored = JSON.parse(localStorage.getItem(CUSTOM_API_PROVIDERS_STORAGE_KEY) || "[]");
    customApiProviders = Array.isArray(stored)
      ? stored.map(normalizeCustomApiProvider).filter((provider) => provider.name && provider.baseUrl && provider.model)
      : [];
  } catch {
    customApiProviders = [];
    localStorage.removeItem(CUSTOM_API_PROVIDERS_STORAGE_KEY);
  }
  renderCustomProviderOptions();
  renderCustomProviderList();
}

function removeCustomProviderOptions(select) {
  if (!select) return;
  [...select.querySelectorAll("option[data-custom-provider-id]")].forEach((option) => option.remove());
}

function renderCustomProviderOptions() {
  const promptValue = nodes.promptApiProvider?.value || "";
  const imageValue = nodes.imageApiProvider?.value || "";
  const promptModelValue = nodes.promptModelSelect?.value || "";
  const imageModelValue = nodes.apiImageModelSelect?.value || "";
  const modelValue = nodes.modelSelect?.value || "";
  removeCustomProviderOptions(nodes.promptApiProvider);
  removeCustomProviderOptions(nodes.imageApiProvider);
  removeCustomProviderOptions(nodes.promptModelSelect);
  removeCustomProviderOptions(nodes.apiImageModelSelect);
  removeCustomProviderOptions(nodes.modelSelect);

  customApiProviders.forEach((provider) => {
    const option = document.createElement("option");
    option.value = customProviderOptionValue(provider.id);
    option.textContent = `${provider.name}（自定义）`;
    option.dataset.customProviderId = provider.id;
    const target = provider.kind === "image" ? nodes.imageApiProvider : nodes.promptApiProvider;
    target?.append(option);

    const apiModelOption = document.createElement("option");
    apiModelOption.value = customProviderModelValue(provider.id);
    apiModelOption.textContent = `${provider.name} · ${provider.model}`;
    apiModelOption.dataset.customProviderId = provider.id;
    if (provider.kind === "image") {
      nodes.apiImageModelSelect?.append(apiModelOption);
    } else {
      nodes.promptModelSelect?.append(apiModelOption);
    }

    if (provider.kind === "image" && nodes.modelSelect) {
      const modelOption = document.createElement("option");
      modelOption.value = customProviderModelValue(provider.id);
      modelOption.textContent = `${provider.name} · ${provider.model}`;
      modelOption.dataset.customProviderId = provider.id;
      nodes.modelSelect.append(modelOption);
    }
  });

  if ([...nodes.promptApiProvider.options].some((option) => option.value === promptValue)) {
    nodes.promptApiProvider.value = promptValue;
  }
  if ([...nodes.imageApiProvider.options].some((option) => option.value === imageValue)) {
    nodes.imageApiProvider.value = imageValue;
  }
  if ([...nodes.promptModelSelect.options].some((option) => option.value === promptModelValue)) {
    nodes.promptModelSelect.value = promptModelValue;
  }
  if ([...nodes.apiImageModelSelect.options].some((option) => option.value === imageModelValue)) {
    nodes.apiImageModelSelect.value = imageModelValue;
  }
  if ([...nodes.modelSelect.options].some((option) => option.value === modelValue)) {
    nodes.modelSelect.value = modelValue;
  }
  updateCustomProviderManagedUi();
  updateApiHeroSummary();
  renderModelMenu();
}

function maskedCustomProviderKey(value) {
  const key = String(value || "");
  if (!key) return "无 Key";
  if (key.length <= 8) return "Key 已保存";
  return `${key.slice(0, 3)}•••${key.slice(-3)}`;
}

function providerActionIcon(iconName) {
  const pathSets = {
    apply: ["M20 6 9 17l-5-5"],
    edit: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"],
    delete: ["M3 6h18", "M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2", "M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"]
  };
  const paths = pathSets[iconName] || [];
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.8");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  paths.forEach((pathData) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    svg.append(path);
  });
  return svg;
}

function providerActionButton(label, action, provider, iconName) {
  const button = document.createElement("button");
  button.type = "button";
  button.append(providerActionIcon(iconName), document.createTextNode(label));
  button.addEventListener("click", () => action(provider));
  return button;
}

function renderCustomProviderList() {
  if (!nodes.customProviderList || !nodes.customProviderEmpty) return;
  nodes.customProviderList.innerHTML = "";
  nodes.customProviderEmpty.hidden = customApiProviders.length > 0;

  customApiProviders.forEach((provider) => {
    const card = document.createElement("article");
    card.className = "custom-provider-card";
    const copy = document.createElement("div");
    copy.className = "custom-provider-card-copy";
    const badge = document.createElement("span");
    badge.className = "custom-provider-kind";
    badge.textContent = provider.kind === "image" ? "生图" : "反推提示词";
    const name = document.createElement("strong");
    name.textContent = provider.name;
    const meta = document.createElement("div");
    meta.className = "custom-provider-card-meta";
    meta.textContent = `${provider.model} · ${provider.baseUrl} · ${maskedCustomProviderKey(provider.apiKey)}`;
    copy.append(badge, name, meta);

    const actions = document.createElement("div");
    actions.className = "custom-provider-card-actions";
    actions.append(
      providerActionButton("应用", applyCustomApiProvider, provider, "apply"),
      providerActionButton("编辑", openCustomProviderForm, provider, "edit")
    );
    const removeButton = providerActionButton("删除", deleteCustomApiProvider, provider, "delete");
    removeButton.classList.add("is-danger");
    actions.append(removeButton);
    card.append(copy, actions);
    nodes.customProviderList.append(card);
  });
}

function resetCustomProviderFormStatus(message = "", state = "") {
  if (!nodes.customProviderFormStatus) return;
  nodes.customProviderFormStatus.textContent = message;
  nodes.customProviderFormStatus.dataset.state = state;
}

function openCustomProviderForm(provider = null) {
  if (!nodes.customProviderForm) return;
  const value = provider || {};
  nodes.customProviderId.value = value.id || "";
  nodes.customProviderKind.value = value.kind === "image" ? "image" : "prompt";
  nodes.customProviderName.value = value.name || "";
  nodes.customProviderBaseUrl.value = value.baseUrl || "";
  nodes.customProviderApiKey.value = value.apiKey || "";
  nodes.customProviderModel.value = value.model || "";
  nodes.customProviderFormTitle.textContent = provider ? "编辑服务商" : "添加服务商";
  nodes.customProviderForm.hidden = false;
  resetCustomProviderFormStatus();
  nodes.customProviderName.focus();
}

function closeCustomProviderForm() {
  if (!nodes.customProviderForm) return;
  nodes.customProviderForm.hidden = true;
  nodes.customProviderForm.reset();
  nodes.customProviderId.value = "";
  resetCustomProviderFormStatus();
}

function validCustomProviderBaseUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function applyCustomApiProvider(provider) {
  if (!provider) return;
  renderCustomProviderOptions();
  if (provider.kind === "prompt") {
    nodes.promptApiProvider.value = customProviderOptionValue(provider.id);
    nodes.promptApiBaseUrl.value = provider.baseUrl;
    nodes.promptApiKey.value = provider.apiKey;
    nodes.promptModelSelect.value = customProviderModelValue(provider.id);
    nodes.promptCustomModelName.value = provider.model;
    syncDeepSeekPromptUi();
    syncPromptCustomModelField();
  } else {
    nodes.imageApiProvider.value = customProviderOptionValue(provider.id);
    nodes.imageApiBaseUrl.value = provider.baseUrl;
    nodes.imageApiKey.value = provider.apiKey;
    nodes.apiImageModelSelect.value = customProviderModelValue(provider.id);
    nodes.customModelName.value = provider.model;
    nodes.modelSelect.value = customProviderModelValue(provider.id);
    syncCustomModelField();
    syncRunningHubApiModeField();
    syncModelPicker();
  }
  updateCustomProviderManagedUi();
  updateApiHeroSummary();
  markApiConfigDirty();
  saveWorkspaceState();
  setStatus(`已应用自定义服务商“${provider.name}”，保存 API 配置后即可持续使用。`);
}

function deleteCustomApiProvider(provider) {
  if (!provider || !window.confirm(`确定删除自定义服务商“${provider.name}”吗？`)) return;
  const promptSelected = nodes.promptApiProvider.value === customProviderOptionValue(provider.id);
  const imageSelected = nodes.imageApiProvider.value === customProviderOptionValue(provider.id);
  const modelSelected = nodes.modelSelect.value === customProviderModelValue(provider.id);
  customApiProviders = customApiProviders.filter((item) => item.id !== provider.id);
  saveCustomApiProviders();
  renderCustomProviderOptions();
  renderCustomProviderList();
  if (promptSelected) {
    nodes.promptApiProvider.value = "openai";
    nodes.promptApiBaseUrl.value = defaultBaseUrl("openai");
    nodes.promptApiKey.value = "";
    nodes.promptModelSelect.value = "gpt-4.1-mini";
    syncDeepSeekPromptUi({ fromModel: true });
    syncPromptCustomModelField();
  }
  if (imageSelected) {
    nodes.imageApiProvider.value = "runninghub";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("runninghub");
    nodes.imageApiKey.value = "";
    nodes.apiImageModelSelect.value = RUNNINGHUB_G2_MODEL;
    nodes.runningHubApiMode.value = RUNNINGHUB_API_MODE_CONSUMER;
    syncRunningHubApiModeField();
  }
  if (modelSelected) {
    nodes.modelSelect.value = RUNNINGHUB_G2_MODEL;
    syncModelPicker();
  }
  updateCustomProviderManagedUi();
  updateApiHeroSummary();
  markApiConfigDirty();
  setStatus(`已删除自定义服务商“${provider.name}”。`);
}

function saveCustomProviderFromForm(event) {
  event.preventDefault();
  const existingId = nodes.customProviderId.value.trim();
  const existing = customProviderById(existingId);
  const provider = normalizeCustomApiProvider({
    ...existing,
    id: existingId || createCustomProviderId(),
    kind: nodes.customProviderKind.value,
    name: nodes.customProviderName.value,
    baseUrl: nodes.customProviderBaseUrl.value,
    apiKey: nodes.customProviderApiKey.value,
    model: nodes.customProviderModel.value,
    updatedAt: new Date().toISOString()
  });

  if (!provider.name) {
    resetCustomProviderFormStatus("请填写服务商名称。", "error");
    return;
  }
  if (!validCustomProviderBaseUrl(provider.baseUrl)) {
    resetCustomProviderFormStatus("Base URL 必须是有效的 http 或 https 地址。", "error");
    return;
  }
  if (!provider.apiKey) {
    resetCustomProviderFormStatus("请填写 API Key。", "error");
    return;
  }
  if (!provider.model) {
    resetCustomProviderFormStatus("请填写真实模型名。", "error");
    return;
  }
  const duplicate = customApiProviders.find((item) => (
    item.id !== provider.id
    && item.kind === provider.kind
    && item.name.toLocaleLowerCase() === provider.name.toLocaleLowerCase()
  ));
  if (duplicate) {
    resetCustomProviderFormStatus("同一用途下已有同名服务商，请修改名称。", "error");
    return;
  }

  const existingIndex = customApiProviders.findIndex((item) => item.id === provider.id);
  if (existingIndex >= 0) {
    customApiProviders.splice(existingIndex, 1, provider);
  } else {
    customApiProviders.push(provider);
  }
  saveCustomApiProviders();
  renderCustomProviderOptions();
  renderCustomProviderList();
  applyCustomApiProvider(provider);
  closeCustomProviderForm();
}

function currentApiConfigFromForm() {
  const promptCustomProvider = customProviderFromSelectValue(nodes.promptApiProvider.value);
  const imageCustomProvider = customProviderFromSelectValue(nodes.imageApiProvider.value);
  const promptProvider = promptCustomProvider ? "custom" : (nodes.promptApiProvider.value || "openai");
  const imageProvider = imageCustomProvider ? "custom" : (nodes.imageApiProvider.value || "openai");
  const promptLanguageModel = nodes.promptLanguageModelSelect?.value === "custom"
    ? nodes.promptLanguageModelName?.value.trim()
    : nodes.promptLanguageModelSelect?.value;
  const promptModel = promptCustomProvider
    ? promptCustomProvider.model
    : nodes.promptModelSelect.value === "custom"
      ? nodes.promptCustomModelName?.value.trim()
      : nodes.promptModelSelect.value;
  const imageModel = imageCustomProvider
    ? imageCustomProvider.model
    : nodes.apiImageModelSelect.value === "custom"
      ? nodes.customModelName.value.trim()
      : nodes.apiImageModelSelect.value;
  return {
    prompt: {
      provider: promptProvider,
      providerId: promptCustomProvider?.id || "",
      providerLabel: promptCustomProvider?.name || selectedOptionText(nodes.promptApiProvider, "OpenAI"),
      baseUrl: nodes.promptApiBaseUrl.value.trim(),
      apiKey: nodes.promptApiKey.value.trim(),
      model: promptProvider === "deepseek" ? deepSeekModelFromMode(nodes.deepSeekThinkingMode?.value) : promptModel,
      customModelName: nodes.promptCustomModelName?.value.trim() || "",
      languageModel: promptProvider === "volcengine"
        ? (promptLanguageModel || "glm-5.2")
        : "",
      deepSeekThinkingMode: normalizeDeepSeekThinkingMode(nodes.deepSeekThinkingMode?.value),
      deepSeekThinking: promptProvider === "deepseek" && deepSeekThinkingEnabled(nodes.deepSeekThinkingMode?.value)
    },
    image: {
      provider: imageProvider,
      providerId: imageCustomProvider?.id || "",
      providerLabel: imageCustomProvider?.name || selectedOptionText(nodes.imageApiProvider, "OpenAI"),
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
        model: config.promptModel || "gpt-4.1-mini",
        customModelName: config.promptCustomModelName || "",
        languageModel: config.promptLanguageModel || "",
        deepSeekThinkingMode: config.deepSeekThinkingMode || "flash-off",
        deepSeekThinking: Boolean(config.deepSeekThinking)
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
  const savedPromptCustomProvider = customProviderForKind(config.prompt?.providerId, "prompt");
  const rawPromptProvider = savedPromptCustomProvider
    ? customProviderOptionValue(savedPromptCustomProvider.id)
    : (config.prompt?.provider || "openai");
  const promptProvider = setSelectValue(nodes.promptApiProvider, rawPromptProvider, "openai");
  nodes.promptApiBaseUrl.value = promptProvider === rawPromptProvider
    ? (config.prompt?.baseUrl || defaultBaseUrl(promptProvider))
    : defaultBaseUrl(promptProvider);
  nodes.promptApiKey.value = config.prompt?.apiKey || "";
  const savedPromptModel = config.prompt?.model || "gpt-4.1-mini";
  const hasSavedPromptModel = [...nodes.promptModelSelect.options].some((option) => option.value === savedPromptModel);
  nodes.promptModelSelect.value = savedPromptCustomProvider
    ? customProviderModelValue(savedPromptCustomProvider.id)
    : (hasSavedPromptModel ? savedPromptModel : "custom");
  if (nodes.promptCustomModelName) {
    nodes.promptCustomModelName.value = savedPromptCustomProvider?.model
      || config.prompt?.customModelName
      || (hasSavedPromptModel ? "" : savedPromptModel);
  }
  const savedLanguageModel = config.prompt?.languageModel || "glm-5.2";
  const hasSavedLanguageModel = [...(nodes.promptLanguageModelSelect?.options || [])]
    .some((option) => option.value === savedLanguageModel);
  if (nodes.promptLanguageModelSelect) {
    nodes.promptLanguageModelSelect.value = hasSavedLanguageModel ? savedLanguageModel : "custom";
  }
  if (nodes.promptLanguageModelName) {
    nodes.promptLanguageModelName.value = hasSavedLanguageModel ? "" : savedLanguageModel;
  }
  if (nodes.deepSeekThinkingMode) {
    nodes.deepSeekThinkingMode.value = normalizeDeepSeekThinkingMode(
      config.prompt?.deepSeekThinkingMode
      || deepSeekModeFromModel(config.prompt?.model, Boolean(config.prompt?.deepSeekThinking))
    );
  }
  const savedImageCustomProvider = customProviderForKind(config.image?.providerId, "image");
  const rawImageProvider = savedImageCustomProvider
    ? customProviderOptionValue(savedImageCustomProvider.id)
    : (config.image?.provider || "openai");
  const imageProvider = setSelectValue(nodes.imageApiProvider, rawImageProvider, "openai");
  nodes.imageApiBaseUrl.value = imageProvider === rawImageProvider
    ? (config.image?.baseUrl || defaultBaseUrl(imageProvider))
    : defaultBaseUrl(imageProvider);
  nodes.imageApiKey.value = config.image?.apiKey || "";
  if (nodes.runningHubApiMode) {
    nodes.runningHubApiMode.value = normalizeRunningHubApiMode(config.image?.runninghubMode);
  }
  const savedImageModel = config.image?.model || "gpt-image-1";
  nodes.apiImageModelSelect.value = savedImageCustomProvider
    ? customProviderModelValue(savedImageCustomProvider.id)
    : [...nodes.apiImageModelSelect.options].some((option) => option.value === savedImageModel)
      ? savedImageModel
      : "custom";
  syncRunningHubModeForModel(savedImageModel);
  syncGrsaiModelOptions();
  nodes.customModelName.value = savedImageCustomProvider?.model || config.image?.customModelName || "";
  if (nodes.eagleApiMode) nodes.eagleApiMode.value = config.eagle.mode;
  if (nodes.eagleApiBaseUrl) nodes.eagleApiBaseUrl.value = config.eagle.baseUrl;
  if (nodes.eagleApiToken) nodes.eagleApiToken.value = config.eagle.token;
  nodes.modelSelect.value = config.image?.model && [...nodes.modelSelect.options].some((option) => option.value === config.image.model)
    ? config.image.model
    : nodes.modelSelect.value;
  if (savedImageCustomProvider
    && [...nodes.modelSelect.options].some((option) => option.value === customProviderModelValue(savedImageCustomProvider.id))) {
    nodes.modelSelect.value = customProviderModelValue(savedImageCustomProvider.id);
  }
  const runningHubMeta = imageProvider === "runninghub"
    ? ` · ${runningHubApiModeLabel(nodes.runningHubApiMode?.value)}`
    : "";
  nodes.apiMeta.textContent = `反推:${config.prompt?.providerLabel || "未配置"} · 生图:${config.image?.providerLabel || "未配置"}${runningHubMeta}`;
  syncDeepSeekPromptUi({ fromModel: true });
  syncPromptCustomModelField();
  syncCustomModelField();
  updateCustomProviderManagedUi();
  updateApiHeroSummary();
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
    syncDeepSeekPromptUi();
    updateCustomProviderManagedUi();
    updateApiHeroSummary();
    showApiSaveFeedback("首次使用，请填写后保存", "idle");
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    applyApiConfig(parsed);
    mirrorApiConfigToExtensionStorage(parsed);
    showApiSaveFeedback("已加载上次保存的配置", "saved");
  } catch {
    localStorage.removeItem(API_STORAGE_KEY);
    showApiSaveFeedback("配置读取失败，请重新保存", "idle");
  }
}

function showApiSaveFeedback(text, state = "saved") {
  if (!nodes.apiSaveFeedback || !nodes.apiSaveFeedbackText) return;
  nodes.apiSaveFeedbackText.textContent = text;
  nodes.apiSaveFeedback.dataset.state = state;
}

function markApiConfigDirty() {
  updateCustomProviderManagedUi();
  updateApiHeroSummary();
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
  mirrorApiConfigToExtensionStorage(config);
  const runningHubMeta = config.image.provider === "runninghub"
    ? ` · ${runningHubApiModeLabel(config.image.runninghubMode)}`
    : "";
  nodes.apiMeta.textContent = `已保存 · 反推:${config.prompt.providerLabel} · 生图:${config.image.providerLabel}${runningHubMeta}`;
  updateCustomProviderManagedUi();
  updateApiHeroSummary();
  showApiSaveFeedback("已保存，刷新后仍会保留", "saved");
  nodes.saveApiBtn.classList.add("is-saved");
  nodes.saveApiBtn.textContent = "已保存";
  window.clearTimeout(saveApiConfig.resetTimer);
  saveApiConfig.resetTimer = window.setTimeout(() => {
    nodes.saveApiBtn.classList.remove("is-saved");
    nodes.saveApiBtn.textContent = "保存配置";
  }, 1500);
  setStatus("两组 API 配置已保存：反推提示词和生图会分别使用自己的服务配置。");
  resumePendingGenerationTasks();
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
    await setImagesFromFiles(files, { kind: "local-file" });
    return;
  }

  const urls = uniqueValues([
    ...extractImageUrlsFromHtml(event.dataTransfer.getData("text/html")),
    ...normalizeDroppedUrls(event.dataTransfer.getData("text/uri-list")),
    ...normalizeDroppedUrls(event.dataTransfer.getData("text/plain"))
  ]);

  if (urls.length) {
    await addImagesFromUrls(urls, "网页拖入图片", { kind: "page-drag" });
    return;
  }

  setStatus("没有识别到图片，请拖入图片本身或图片地址。");
});

window.addEventListener("paste", async (event) => {
  const file = [...(event.clipboardData.files || [])].find((item) => item.type.startsWith("image/"));
  if (file) {
    await setImageFromFile(file, { kind: "clipboard-file" });
    return;
  }

  const pastedUrls = uniqueValues([
    ...extractImageUrlsFromHtml(event.clipboardData.getData("text/html")),
    ...normalizeDroppedUrls(event.clipboardData.getData("text/plain"))
  ]);
  if (pastedUrls.length) {
    await addImagesFromUrls(pastedUrls, "粘贴的图片", { kind: "clipboard-url" });
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
      structure: extractPromptStructureText(text),
      roleCheck: "",
      selfCheck: "",
      visualReuseFingerprint: promptMethod === "reuse" ? visualReuseReferenceFingerprint() : ""
    };
  }
  syncPromptCharCount();
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
  node.addEventListener("input", () => {
    nodes.sizeMode.value = "custom";
    activeResolution = "custom";
    syncSizePicker();
  });
  node.addEventListener("change", syncSizePicker);
});
[
  nodes.widthInput,
  nodes.heightInput,
  nodes.sizeMode
].forEach((node) => {
  node?.addEventListener("change", syncReusePlanForCanvasChange);
});
nodes.apiToggleBtn.addEventListener("click", () => {
  setApiView(nodes.apiPanel.hidden);
});
nodes.apiTabButtons.forEach((button) => {
  button.addEventListener("click", () => setApiTab(button.dataset.apiTab));
});
document.querySelectorAll("[data-api-goto]").forEach((button) => {
  button.addEventListener("click", () => setApiTab(button.dataset.apiGoto));
});
nodes.promptApiProvider.addEventListener("change", () => {
  const customProvider = customProviderFromSelectValue(nodes.promptApiProvider.value);
  if (customProvider) {
    applyCustomApiProvider(customProvider);
    return;
  }
  nodes.promptApiBaseUrl.value = defaultBaseUrl(nodes.promptApiProvider.value);
  if (nodes.promptApiProvider.value === "grsai") {
    nodes.promptModelSelect.value = "gemini-3.1-pro";
  }
  if (nodes.promptApiProvider.value === "gemini") {
    nodes.promptModelSelect.value = "gemini-2.5-flash";
  }
  if (nodes.promptApiProvider.value === "volcengine") {
    nodes.promptModelSelect.value = "doubao-seed-2-0-lite-260215";
    if (nodes.promptLanguageModelSelect && !nodes.promptLanguageModelSelect.value) {
      nodes.promptLanguageModelSelect.value = "glm-5.2";
    }
  }
  if (nodes.promptApiProvider.value === "aliyun") {
    nodes.promptModelSelect.value = "qwen-vl-plus";
  }
  if (nodes.promptApiProvider.value === "deepseek") {
    nodes.deepSeekThinkingMode.value = "flash-off";
    nodes.promptModelSelect.value = deepSeekModelFromMode(nodes.deepSeekThinkingMode.value);
  }
  syncDeepSeekPromptUi();
  syncPromptCustomModelField();
  updateCustomProviderManagedUi();
  updateApiHeroSummary();
  markApiConfigDirty();
});
nodes.imageApiProvider.addEventListener("change", () => {
  const customProvider = customProviderFromSelectValue(nodes.imageApiProvider.value);
  if (customProvider) {
    applyCustomApiProvider(customProvider);
    return;
  }
  nodes.imageApiBaseUrl.value = defaultBaseUrl(nodes.imageApiProvider.value);
  if (nodes.imageApiProvider.value === "grsai") {
    nodes.apiImageModelSelect.value = "gpt-image-2";
    nodes.modelSelect.value = "gpt-image-2";
    syncModelPicker();
    syncCustomModelField();
  }
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
    syncRunningHubModeForModel(RUNNINGHUB_G2_MODEL);
    syncModelPicker();
  }
  syncRunningHubApiModeField();
  syncGrsaiModelOptions();
  updateCustomProviderManagedUi();
  updateApiHeroSummary();
  markApiConfigDirty();
});
nodes.apiImageModelSelect.addEventListener("change", () => {
  const customProvider = customProviderFromModelValue(nodes.apiImageModelSelect.value);
  if (customProvider) {
    applyCustomApiProvider(customProvider);
    return;
  }
  syncCustomModelField();
  if ([...nodes.modelSelect.options].some((option) => option.value === nodes.apiImageModelSelect.value)) {
    nodes.modelSelect.value = nodes.apiImageModelSelect.value;
    syncModelPicker();
  }
  if (nodes.apiImageModelSelect.value.startsWith("doubao-seedream-")) {
    nodes.imageApiProvider.value = "jimeng";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("jimeng");
  }
  if (nodes.apiImageModelSelect.value === "gpt-image-2.5") {
    nodes.imageApiProvider.value = "grsai";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("grsai");
  } else if (nodes.apiImageModelSelect.value === "gpt-image-2" && nodes.imageApiProvider.value !== "grsai") {
    nodes.imageApiProvider.value = "apimart";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("apimart");
  }
  if (isRunningHubG2Model(nodes.apiImageModelSelect.value)) {
    nodes.imageApiProvider.value = "runninghub";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("runninghub");
    syncRunningHubModeForModel(nodes.apiImageModelSelect.value);
  }
  syncRunningHubApiModeField();
  syncGrsaiModelOptions();
  updateCustomProviderManagedUi();
  updateApiHeroSummary();
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
  const customProvider = customProviderFromModelValue(nodes.modelSelect.value);
  if (customProvider) {
    applyCustomApiProvider(customProvider);
    return;
  }
  syncModelPicker();
  if ([...nodes.apiImageModelSelect.options].some((option) => option.value === nodes.modelSelect.value)) {
    nodes.apiImageModelSelect.value = nodes.modelSelect.value;
  }
  if (nodes.modelSelect.value.startsWith("doubao-seedream-")) {
    nodes.imageApiProvider.value = "jimeng";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("jimeng");
  }
  if (nodes.modelSelect.value === "gpt-image-2.5") {
    nodes.imageApiProvider.value = "grsai";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("grsai");
  } else if (nodes.modelSelect.value === "gpt-image-2" && nodes.imageApiProvider.value !== "grsai") {
    nodes.imageApiProvider.value = "apimart";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("apimart");
  }
  if (isRunningHubG2Model(nodes.modelSelect.value)) {
    nodes.imageApiProvider.value = "runninghub";
    nodes.imageApiBaseUrl.value = defaultBaseUrl("runninghub");
    syncRunningHubModeForModel(nodes.modelSelect.value);
  }
  syncRunningHubApiModeField();
  syncGrsaiModelOptions();
  saveWorkspaceState();
});
nodes.promptModelSelect?.addEventListener("change", () => {
  const customProvider = customProviderFromModelValue(nodes.promptModelSelect.value);
  if (customProvider) {
    applyCustomApiProvider(customProvider);
    return;
  }
  if (nodes.promptModelSelect.value === "gemini-3.1-pro") {
    nodes.promptApiProvider.value = "grsai";
    nodes.promptApiBaseUrl.value = defaultBaseUrl("grsai");
    syncDeepSeekPromptUi({ fromModel: true });
  } else if (nodes.promptModelSelect.value === "qwen-vl-plus") {
    nodes.promptApiProvider.value = "aliyun";
    nodes.promptApiBaseUrl.value = defaultBaseUrl("aliyun");
    syncDeepSeekPromptUi({ fromModel: true });
  } else if (nodes.promptModelSelect.value === "doubao-seed-2-0-lite-260215") {
    nodes.promptApiProvider.value = "volcengine";
    nodes.promptApiBaseUrl.value = defaultBaseUrl("volcengine");
    syncDeepSeekPromptUi({ fromModel: true });
  } else if (nodes.promptModelSelect.value.startsWith("deepseek-v4-")) {
    nodes.promptApiProvider.value = "deepseek";
    nodes.promptApiBaseUrl.value = defaultBaseUrl("deepseek");
    syncDeepSeekPromptUi({ fromModel: true });
  } else {
    syncDeepSeekPromptUi({ fromModel: true });
  }
  syncPromptCustomModelField();
  markApiConfigDirty();
});
nodes.promptLanguageModelSelect?.addEventListener("change", () => {
  syncPromptCustomModelField();
  markApiConfigDirty();
});
nodes.deepSeekThinkingMode?.addEventListener("change", () => {
  syncDeepSeekPromptUi();
  markApiConfigDirty();
});
nodes.runningHubApiMode?.addEventListener("change", () => {
  syncRunningHubModelForApiMode();
  syncRunningHubApiModeField();
  updateApiHeroSummary();
  saveWorkspaceState();
});
nodes.addCustomProviderBtn?.addEventListener("click", () => openCustomProviderForm());
nodes.cancelCustomProviderBtn?.addEventListener("click", closeCustomProviderForm);
nodes.customProviderForm?.addEventListener("submit", saveCustomProviderFromForm);
[
  nodes.promptApiBaseUrl,
  nodes.promptApiKey,
  nodes.promptModelSelect,
  nodes.promptCustomModelName,
  nodes.promptLanguageModelSelect,
  nodes.promptLanguageModelName,
  nodes.deepSeekThinkingMode,
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
  if (!event.target.closest?.(".visual-reuse-role-editor")) {
    closeVisualReuseRoleEditors();
  }
});
nodes.saveApiBtn.addEventListener("click", saveApiConfig);
nodes.mascotBtn?.addEventListener("click", playMascot);
nodes.pinWindowBtn?.addEventListener("click", openPinnedWindow);
nodes.textToImageModeBtn?.addEventListener("click", () => setGenerationMode("text"));
nodes.imageToImageModeBtn?.addEventListener("click", () => setGenerationMode("image"));
nodes.reversePromptBtn?.addEventListener("click", reversePrompt);
nodes.reverseDetailToggle?.addEventListener("change", () => {
  reversePromptDetailed = Boolean(nodes.reverseDetailToggle.checked);
  if (!reversePromptDetailed && promptMethod !== "reuse") {
    promptMeta = {
      ...promptMeta,
      english: "",
      structure: ""
    };
  }
  saveWorkspaceState();
  setStatus(reversePromptDetailed
    ? "已开启详细反推：会同步保留中文、英文和提示词结构。"
    : "已关闭详细反推：后续只保留中文提示词。");
});
nodes.visualReuseBtn?.addEventListener("click", () => {
  setPromptMethod("reuse");
  setVisualReusePanelOpen(true);
  resetPromptViewportToTop();
});
nodes.visualReusePlanBtn?.addEventListener("click", generateVisualReusePrompt);
[
  nodes.visualReuseAssetType,
  nodes.visualReuseStrength,
  nodes.visualReuseStyle,
  nodes.visualReuseTextMode,
  nodes.visualReuseTextContent,
  nodes.visualReuseTextSubtitle,
  nodes.visualReuseNotes
].forEach((node) => {
  if (!node) return;
  const handleVisualReuseOptionChange = () => {
    syncVisualReuseTextStrategyUi();
    if (node === nodes.visualReuseNotes) renderImageStack();
    clearGeneratedPromptForReferenceChange("视觉复用参数已变化，请重新查看方案。");
    saveWorkspaceState();
  };
  node.addEventListener("input", handleVisualReuseOptionChange);
  node.addEventListener("change", handleVisualReuseOptionChange);
});
nodes.clearPromptBtn?.addEventListener("click", clearPrompt);
nodes.statusActionBtn?.addEventListener("click", clearGalleryFromStatusAction);
nodes.galleryRecoverBtn?.addEventListener("click", recoverGalleryFromStorage);
nodes.resetAllBtn?.addEventListener("click", resetAll);
nodes.generateBtn.addEventListener("click", () => {
  if (promptMethod === "reuse") {
    generateNewVisualFromReusePlan();
    return;
  }
  generate();
});
nodes.galleryPrevBtn?.addEventListener("click", () => {
  galleryPage = Math.max(1, galleryPage - 1);
  renderGallery();
});
nodes.galleryNextBtn?.addEventListener("click", () => {
  galleryPage += 1;
  renderGallery();
});
if (nodes.galleryGrid) {
  let galleryResizeFrame = 0;
  const syncGalleryPageSizeForViewport = () => {
    if (galleryResizeFrame) return;
    galleryResizeFrame = window.requestAnimationFrame(() => {
      galleryResizeFrame = 0;
      const nextPageSize = galleryPageSizeForWidth(nodes.galleryGrid.clientWidth || window.innerWidth || 0);
      if (nextPageSize === galleryPageSize) return;
      galleryPageSize = nextPageSize;
      renderGallery();
    });
  };
  window.addEventListener("resize", syncGalleryPageSizeForViewport, { passive: true });
  syncGalleryPageSizeForViewport();
}
function setLocalContinueMenuOpen(open) {
  const menu = document.querySelector("#lightboxContinueMenu");
  const button = document.querySelector("#lightboxContinueBtn");
  if (!menu || !button) return;
  menu.hidden = !open;
  button.setAttribute("aria-expanded", open ? "true" : "false");
}
nodes.lightboxClose.addEventListener("click", closeLightbox);
document.querySelector("#lightboxContinueBtn")?.addEventListener("click", () => {
  setLocalContinueMenuOpen(document.querySelector("#lightboxContinueMenu").hidden);
});
document.querySelectorAll("[data-local-continue]").forEach((button) => {
  button.addEventListener("click", () => requestLocalContinuation(button.dataset.localContinue));
});
document.addEventListener("click", (event) => {
  if (!event.target.closest?.(".lightbox-continue")) setLocalContinueMenuOpen(false);
});
nodes.lightboxSourceBack?.addEventListener("click", closeSourcePreview);
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
    if (nodes.appShell?.classList.contains("is-api-view")) {
      setApiView(false);
    }
  }
  if (event.key === "Escape" && !nodes.lightbox.hidden) {
    closeLightbox();
    return;
  }
  if (event.key === "Escape" && activePageLightboxTabId) {
    await closePageLightbox();
  }
});
window.chrome?.storage?.onChanged?.addListener((changes, areaName) => {
  if (areaName === "local" && changes[PENDING_CONTEXT_IMAGE_KEY]?.newValue) {
    consumePendingContextImage();
  }
  if (areaName === "local" && changes[PENDING_CONTINUE_CREATION_KEY]?.newValue) {
    consumePendingContinuation();
  }
  if (areaName === "local" && changes[COMPLETED_GENERATION_RESULTS_KEY]?.newValue) {
    consumeCompletedGenerationResults();
  }
});

setApiTab("prompt");
loadCustomApiProviders();
renderModelMenu();
renderSizeMenu();
setupOptionalLocalIntegrations();
syncSizeInputs(1024, 1024);
syncCustomModelField();
loadApiConfig();
loadWorkspaceState();
syncImageUploadLimitUi();
consumePendingContextImage();
restoreGalleryItemsFromIndexedDb()
  .then(consumeCompletedGenerationResults)
  .then(consumePendingContinuation)
  .then(() => {
    const restoredPendingTasks = loadPendingGenerationTasks();
    if (restoredPendingTasks.length) {
      mirrorPendingGenerationTasksToExtensionStorage(restoredPendingTasks);
    }
    return resumePendingGenerationTasks();
  });
renderModelMenu();
syncPromptCharCount();
