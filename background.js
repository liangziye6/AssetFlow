const panelPath = "popup.html?standalone=1";
const addImageMenuId = "lyz-add-image-to-prompt";
const pendingContextImageKey = "imageSparkPendingContextImage";
const apiStorageKey = "imageSparkApiConfig";
const pendingGenerationTasksKey = "imageSparkPendingGenerationTasks";
const completedGenerationResultsKey = "imageSparkCompletedGenerationResults";
const pendingGenerationAlarmName = "imageSparkPollPendingGeneration";
const localImageDbName = "imageSparkLocalImages";
const localImageDbVersion = 2;
const localImageStore = "images";
const runningHubApiModeEnterprise = "enterprise";
const runningHubApiPaths = {
  appOutputs: "/task/openapi/outputs",
  standardQuery: "/openapi/v2/query"
};

function setupContextMenus() {
  if (!chrome.contextMenus?.create) return;

  chrome.contextMenus.removeAll(() => {
    if (chrome.runtime.lastError) return;
    chrome.contextMenus.create({
      id: addImageMenuId,
      title: "\u6dfb\u52a0\u5230 LYZ \u53cd\u63a8\u5de5\u5177",
      contexts: ["all"]
    }, () => {
      // Chrome can re-run the service worker while the previous menu still exists.
      void chrome.runtime.lastError;
    });
  });
}

function sendTabMessage(tabId, message) {
  return new Promise((resolve) => {
    if (!tabId) {
      resolve(null);
      return;
    }
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        resolve(null);
        return;
      }
      resolve(response || null);
    });
  });
}

function injectContentScript(tabId) {
  return new Promise((resolve) => {
    if (!chrome.scripting?.executeScript || !tabId) {
      resolve(false);
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    }, () => resolve(!chrome.runtime.lastError));
  });
}

async function contextImageFromPage(info, tab) {
  if (info.srcUrl) {
    return {
      src: info.srcUrl,
      name: "\u7f51\u9875\u53f3\u952e\u56fe\u7247",
      pageUrl: info.pageUrl || tab?.url || "",
      createdAt: Date.now()
    };
  }

  let response = await sendTabMessage(tab?.id, { type: "IMAGE_SPARK_GET_CONTEXT_IMAGE" });
  if (!response?.item?.src && await injectContentScript(tab?.id)) {
    response = await sendTabMessage(tab?.id, { type: "IMAGE_SPARK_GET_CONTEXT_IMAGE" });
  }

  if (!response?.item?.src) return null;
  return {
    ...response.item,
    name: response.item.name || "\u7f51\u9875\u53f3\u952e\u56fe\u7247",
    pageUrl: info.pageUrl || tab?.url || response.item.pageUrl || "",
    createdAt: Date.now()
  };
}

function deliverContextImageToOpenPanel(payload) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({
      type: "IMAGE_SPARK_ADD_CONTEXT_IMAGE",
      payload
    }, (response) => {
      if (chrome.runtime.lastError) {
        resolve(false);
        return;
      }
      resolve(Boolean(response?.ok));
    });
  });
}

function setPendingContextImage(payload) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [pendingContextImageKey]: payload }, () => {
      resolve(!chrome.runtime.lastError);
    });
  });
}

async function enablePanel(tabId) {
  if (!chrome.sidePanel?.setOptions) return false;

  await chrome.sidePanel.setOptions({
    ...(tabId ? { tabId } : {}),
    path: panelPath,
    enabled: true
  });
  return true;
}

async function openSidePanel(tab) {
  if (!chrome.sidePanel?.open) return false;

  await enablePanel(tab?.id);
  const windowId = tab?.windowId || (await chrome.windows.getLastFocused({ windowTypes: ["normal"] }))?.id;
  if (!windowId) return false;

  await chrome.sidePanel.open({ windowId });
  return true;
}

function openFallbackWindow() {
  chrome.windows.getLastFocused({ windowTypes: ["normal"] }, (currentWindow) => {
    const width = 720;
    const height = Math.max(720, Math.min(920, (currentWindow?.height || 920) - 80));
    const left = Math.max(0, (currentWindow?.left || 0) + (currentWindow?.width || 1280) - width - 24);
    const top = Math.max(0, (currentWindow?.top || 0) + 72);

    chrome.windows.create({
      url: chrome.runtime.getURL(panelPath),
      type: "popup",
      width,
      height,
      left,
      top,
      focused: true
    });
  });
}

function eagleEndpoint(baseUrl) {
  const raw = String(baseUrl || "http://localhost:41595").trim();
  const base = new URL(raw);
  const url = new URL("/api/item/addFromURL", base.origin);
  base.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  return url;
}

async function collectToEagleApi({ item, eagle }) {
  if (!item?.url) {
    return { ok: false, error: "NO_IMAGE" };
  }

  const endpoint = eagleEndpoint(eagle?.baseUrl);
  if (eagle?.token) {
    endpoint.searchParams.set("token", eagle.token);
  }
  const response = await fetch(endpoint.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: item.url,
      name: `${item.model || "Image Spark"}-${item.index || "image"}`,
      annotation: item.prompt || "",
      website: item.website || ""
    })
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.status === "error") {
    return {
      ok: false,
      error: data?.message || `HTTP ${response.status}`,
      data
    };
  }

  return { ok: true, data };
}

function storageGet(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(chrome.runtime.lastError ? {} : (result || {}));
    });
  });
}

function storageSet(items) {
  return new Promise((resolve) => {
    chrome.storage.local.set(items, () => resolve(!chrome.runtime.lastError));
  });
}

function storageRemove(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.remove(keys, () => resolve(!chrome.runtime.lastError));
  });
}

function openLocalImageDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(localImageDbName, localImageDbVersion);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(localImageStore)) {
        db.createObjectStore(localImageStore, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("gallery")) {
        const galleryStore = db.createObjectStore("gallery", { keyPath: "id" });
        galleryStore.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getLocalImageRecord(id) {
  if (!id) return null;
  const db = await openLocalImageDb();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(localImageStore, "readonly");
      const request = transaction.objectStore(localImageStore).get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
      transaction.onerror = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
}

function bytesToBase64(bytes) {
  const chunkSize = 0x8000;
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

async function blobToDataUrl(blob, fallbackMimeType = "image/png") {
  if (!blob) return "";
  const buffer = await blob.arrayBuffer();
  const mimeType = blob.type || fallbackMimeType;
  return `data:${mimeType};base64,${bytesToBase64(new Uint8Array(buffer))}`;
}

async function localImageDataUrl({ id, variant }) {
  const record = await getLocalImageRecord(id);
  if (!record?.blob) return "";
  const useThumbnail = variant === "thumbnail" && record.thumbnailBlob;
  const blob = useThumbnail ? record.thumbnailBlob : record.blob;
  const mimeType = useThumbnail
    ? (record.thumbnailMimeType || record.thumbnailBlob?.type || record.mimeType)
    : (record.mimeType || record.blob?.type);
  return blobToDataUrl(blob, mimeType || "image/png");
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

function normalizedApiCode(code) {
  return String(code ?? "").trim();
}

function isSuccessfulApiCode(code) {
  if (code === undefined || code === null || code === "") return true;
  return ["0", "200", "success", "ok"].includes(String(code).trim().toLowerCase());
}

function isRunningHubPendingCode(code) {
  return normalizedApiCode(code) === "804";
}

async function fetchJson(url, options, requestOptions = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(data?.error?.message || data?.errorMessage || data?.message || `HTTP ${response.status}`);
  }

  const allowedCodes = new Set((requestOptions.allowCodes || []).map(normalizedApiCode));
  const code = normalizedApiCode(data?.code);
  if (!isSuccessfulApiCode(data?.code) && !allowedCodes.has(code)) {
    throw new Error(data?.error?.message || data?.errorMessage || data?.message || `API code ${data.code}`);
  }

  return data;
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
  walk(data);
  return [...new Set(candidates)];
}

function extractApimartTaskImages(data) {
  const images = data?.data?.result?.images || data?.result?.images || [];
  const urls = images.flatMap((image) => Array.isArray(image?.url) ? image.url : [image?.url]).filter(Boolean);
  return urls.length ? urls : extractGeneratedImages(data);
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

function normalizeRunningHubApiMode(value) {
  return value === runningHubApiModeEnterprise ? runningHubApiModeEnterprise : "consumer";
}

async function queryApimartPendingTask({ task, apiKey, baseUrl }) {
  const data = await fetchJson(baseUrlWithPath(baseUrl, `/tasks/${task.taskId}`), {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });
  const status = extractTaskStatus(data, "processing");
  if (isFailedTaskStatus(status)) {
    return { status: "failed", error: extractTaskErrorMessage(data, "APIMart 任务生成失败。") };
  }
  if (isCancelledTaskStatus(status)) {
    return { status: "failed", error: "APIMart 任务已取消。" };
  }
  if (isCompletedTaskStatus(status)) {
    const urls = extractApimartTaskImages(data);
    return urls.length
      ? { status: "completed", urls: urls.slice(0, task.count || 1) }
      : { status: "failed", error: "APIMart 任务已完成，但没有返回图片 URL。" };
  }
  return { status: "pending" };
}

async function queryRunningHubPendingTask({ task, apiKey, baseUrl, apiMode }) {
  const normalizedMode = normalizeRunningHubApiMode(apiMode);
  const data = await fetchJson(baseUrlWithPath(baseUrl, normalizedMode === runningHubApiModeEnterprise
    ? runningHubApiPaths.standardQuery
    : runningHubApiPaths.appOutputs), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(normalizedMode === runningHubApiModeEnterprise
      ? { taskId: task.taskId }
      : { apiKey, taskId: task.taskId })
  }, { allowCodes: ["804"] });

  if (isRunningHubPendingCode(data?.code)) {
    return { status: "pending" };
  }

  const status = extractTaskStatus(data, "RUNNING");
  if (isFailedTaskStatus(status)) {
    return { status: "failed", error: extractTaskErrorMessage(data, "RunningHub 任务生成失败。") };
  }
  if (isCancelledTaskStatus(status)) {
    return { status: "failed", error: "RunningHub 任务已取消。" };
  }

  const urls = extractRunningHubImages(data);
  if (urls.length) {
    return { status: "completed", urls: urls.slice(0, task.count || 1) };
  }
  if (isCompletedTaskStatus(status)) {
    return { status: "failed", error: "RunningHub 任务已完成，但没有返回图片 URL。" };
  }
  return { status: "pending" };
}

function schedulePendingGenerationAlarm(hasPending = true) {
  if (!chrome.alarms?.create) return;
  if (!hasPending) {
    chrome.alarms.clear?.(pendingGenerationAlarmName);
    return;
  }
  chrome.alarms.create(pendingGenerationAlarmName, {
    delayInMinutes: 1,
    periodInMinutes: 1
  });
}

let isPollingPendingGeneration = false;
async function pollPendingGenerationTasks() {
  if (isPollingPendingGeneration) return;
  isPollingPendingGeneration = true;
  try {
    const stored = await storageGet([pendingGenerationTasksKey, apiStorageKey, completedGenerationResultsKey]);
    const tasks = Array.isArray(stored[pendingGenerationTasksKey]) ? stored[pendingGenerationTasksKey] : [];
    const apiConfig = stored[apiStorageKey] || {};
    const completedRecords = Array.isArray(stored[completedGenerationResultsKey]) ? stored[completedGenerationResultsKey] : [];
    if (!tasks.length) {
      schedulePendingGenerationAlarm(false);
      return;
    }

    const imageConfig = apiConfig.image || {};
    const remaining = [];
    const completed = [...completedRecords];

    for (const task of tasks) {
      if (!task?.provider || !task?.taskId || !task?.generationId) continue;
      if (task.provider && imageConfig.provider && task.provider !== imageConfig.provider) {
        remaining.push(task);
        continue;
      }
      const apiKey = imageConfig.apiKey;
      const baseUrl = task.baseUrl || imageConfig.baseUrl;
      if (!apiKey || !baseUrl) {
        remaining.push(task);
        continue;
      }

      try {
        const result = task.provider === "apimart"
          ? await queryApimartPendingTask({ task, apiKey, baseUrl })
          : await queryRunningHubPendingTask({
            task,
            apiKey,
            baseUrl,
            apiMode: task.apiMode || imageConfig.runninghubMode
          });
        if (result.status === "completed") {
          completed.push({
            id: task.id || `${task.provider}-${task.taskId}-${task.generationId}`,
            status: "completed",
            task,
            urls: result.urls,
            completedAt: Date.now()
          });
        } else if (result.status === "failed") {
          completed.push({
            id: task.id || `${task.provider}-${task.taskId}-${task.generationId}`,
            status: "failed",
            task,
            error: result.error,
            completedAt: Date.now()
          });
        } else {
          remaining.push(task);
        }
      } catch {
        remaining.push(task);
      }
    }

    if (remaining.length) {
      await storageSet({ [pendingGenerationTasksKey]: remaining });
    } else {
      await storageRemove(pendingGenerationTasksKey);
    }
    if (completed.length) {
      await storageSet({ [completedGenerationResultsKey]: completed.slice(-48) });
    }
    schedulePendingGenerationAlarm(Boolean(remaining.length));
  } finally {
    isPollingPendingGeneration = false;
  }
}

chrome.runtime.onInstalled.addListener(() => {
  enablePanel();
  chrome.sidePanel?.setPanelBehavior?.({ openPanelOnActionClick: true });
  setupContextMenus();
  pollPendingGenerationTasks();
});

chrome.runtime.onStartup?.addListener(() => {
  setupContextMenus();
  pollPendingGenerationTasks();
});
setupContextMenus();

chrome.action.onClicked.addListener((tab) => {
  openSidePanel(tab).catch(openFallbackWindow);
});

chrome.contextMenus?.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== addImageMenuId) return;

  const openPanelPromise = openSidePanel(tab).catch(() => false);

  (async () => {
    const pendingImage = await contextImageFromPage(info, tab);
    if (!pendingImage?.src) {
      await openPanelPromise;
      return;
    }

    await setPendingContextImage(pendingImage);
    if (await deliverContextImageToOpenPanel(pendingImage)) return;
    await openPanelPromise;
  })();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "IMAGE_SPARK_COLLECT_EAGLE") {
    collectToEagleApi(message.payload || {})
      .then(sendResponse)
      .catch((error) => sendResponse({ ok: false, error: error?.message || "EAGLE_API_FAILED" }));
    return true;
  }

  if (message?.type === "IMAGE_SPARK_GET_LOCAL_IMAGE") {
    localImageDataUrl(message.payload || {})
      .then((dataUrl) => sendResponse({ ok: Boolean(dataUrl), dataUrl }))
      .catch((error) => sendResponse({ ok: false, error: error?.message || "LOCAL_IMAGE_FAILED" }));
    return true;
  }

  if (message?.type === "IMAGE_SPARK_PENDING_TASKS_UPDATED") {
    pollPendingGenerationTasks()
      .then(() => sendResponse({ ok: true }))
      .catch((error) => sendResponse({ ok: false, error: error?.message || "POLL_FAILED" }));
    return true;
  }

  if (message?.type !== "OPEN_SIDE_PANEL") return false;

  openSidePanel(sender.tab)
    .then((ok) => {
      if (!ok) {
        openFallbackWindow();
      }
      sendResponse({ ok: true, mode: ok ? "sidePanel" : "window" });
    })
    .catch(() => {
      openFallbackWindow();
      sendResponse({ ok: true, mode: "window" });
    });
  return true;
});

chrome.alarms?.onAlarm?.addListener((alarm) => {
  if (alarm?.name === pendingGenerationAlarmName) {
    pollPendingGenerationTasks();
  }
});

chrome.storage?.onChanged?.addListener((changes, areaName) => {
  if (areaName !== "local") return;
  if (changes[pendingGenerationTasksKey]?.newValue) {
    schedulePendingGenerationAlarm(true);
  }
});
