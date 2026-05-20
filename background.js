const panelPath = "popup.html?standalone=1";
const addImageMenuId = "lyz-add-image-to-prompt";
const pendingContextImageKey = "imageSparkPendingContextImage";

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

chrome.runtime.onInstalled.addListener(() => {
  enablePanel();
  chrome.sidePanel?.setPanelBehavior?.({ openPanelOnActionClick: true });
  setupContextMenus();
});

chrome.runtime.onStartup?.addListener(setupContextMenus);
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
