// Run with an isolated Edge/Chrome profile and the unpacked AssetFlow extension.
import assert from "node:assert/strict";

const base = process.env.ASSETFLOW_CDP_URL || "http://127.0.0.1:9232";
const targets = await (await fetch(base + "/json")).json();
const worker = targets.find((target) =>
  target.type === "service_worker" && target.url.endsWith("/background.js"));
const extensionId = process.env.ASSETFLOW_EXTENSION_ID || (worker && new URL(worker.url).host);
if (!extensionId) throw new Error("AssetFlow extension worker not found");

async function openPanel() {
  const target = await (await fetch(base + "/json/new?"
    + encodeURIComponent(`chrome-extension://${extensionId}/popup.html?standalone=1`), {
    method: "PUT"
  })).json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  let sequence = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const response = JSON.parse(event.data);
    if (!response.id || !pending.has(response.id)) return;
    pending.get(response.id)(response);
    pending.delete(response.id);
  });
  const evaluate = async (code) => {
    const id = ++sequence;
    const response = await new Promise((resolve) => {
      pending.set(id, resolve);
      socket.send(JSON.stringify({
        id, method: "Runtime.evaluate",
        params: { expression: `(async()=>{${code}})()`, returnByValue: true, awaitPromise: true }
      }));
    });
    if (response.result?.exceptionDetails) {
      throw new Error(response.result.exceptionDetails.exception?.description
        || response.result.exceptionDetails.text);
    }
    return response.result?.result?.value;
  };
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return {
    evaluate,
    close: async () => {
      socket.close();
      await fetch(base + "/json/close/" + target.id);
    }
  };
}

const generationId = "persistence-smoke-" + Date.now();
const fixture = "assets/recipes/sources/product-source.webp";
let panel = await openPanel();
const uploaded = await panel.evaluate(`
  setGenerationMode("image");
  const blob = await (await fetch(chrome.runtime.getURL(${JSON.stringify(fixture)}))).blob();
  await setImagesFromFiles([new File([blob], "product-source.webp", { type: "image/webp" })]);
  const state = JSON.parse(localStorage.getItem(APP_STATE_KEY));
  return { mode: generationMode, images: imageItems.length,
    stableId: state.images?.[0]?.localStoreId || "", storedSrc: state.images?.[0]?.src || "" };
`);
assert.equal(uploaded.mode, "image");
assert.equal(uploaded.images, 1);
assert.ok(uploaded.stableId.startsWith("workspace-"));
assert.equal(uploaded.storedSrc, "");
await panel.close();
panel = await openPanel();
const uploadedReopen = await panel.evaluate(`
  return { mode: generationMode, images: imageItems.length,
    stableId: imageItems[0]?.localStoreId || "" };
`);
assert.equal(uploadedReopen.mode, "image");
assert.equal(uploadedReopen.images, 1);
assert.equal(uploadedReopen.stableId, uploaded.stableId);

const initial = await panel.evaluate(`
  const url = chrome.runtime.getURL(${JSON.stringify(fixture)});
  const generationId = ${JSON.stringify(generationId)};
  const sourceBlob = await (await fetch(url)).blob();
  const sourceId = "smoke-source-" + generationId;
  await withLocalImageStore("readwrite", (store) => store.put({
    id: sourceId, blob: sourceBlob, thumbnailBlob: null,
    mimeType: sourceBlob.type, thumbnailMimeType: "", createdAt: Date.now()
  }));
  const result = {
    generationId, resultIndex: 0, url, originalUrl: url,
    index: "#1", model: "GPT Image 2.5", width: 1024, height: 1024,
    prompt: "smoke image prompt", promptCn: "smoke image prompt",
    mode: "image", source: "image",
    assetLineage: { sourceAssets: [{
      assetId: sourceId, name: "source", roles: [], participation: "direct",
      previewStoreId: sourceId, source: { kind: "local-file" }
    }] },
    generationContext: {
      mode: "image", prompt: "smoke image prompt", model: "GPT Image 2.5",
      modelValue: nodes.modelSelect.value,
      options: { sizeMode: "1-1", width: 1024, height: 1024, count: 1 },
      sourceImages: [{ assetId: sourceId, previewStoreId: sourceId, roles: [] }]
    }
  };
  const first = await persistGalleryItemImage({ ...result });
  upsertGalleryResult(null, first);
  const second = await persistGalleryItemImage({ ...result });
  upsertGalleryResult(null, second);
  await restoreContinuation(first, "image");
  const state = JSON.parse(localStorage.getItem(APP_STATE_KEY));
  const dbItems = await withLocalGalleryStore("readonly", (store) => requestToPromise(store.getAll()));
  return { gallery: galleryItems.filter((item) => !item.isGenerating).length,
    db: dbItems.length, mode: generationMode, imageCount: imageItems.length,
    storeId: state.images[0]?.localStoreId || "",
    storedSrc: state.images[0]?.src || "", prompt: nodes.promptInput.value,
    width: nodes.widthInput.value, height: nodes.heightInput.value };
`);
assert.equal(initial.gallery, 1);
assert.equal(initial.db, 1);
assert.equal(initial.mode, "image");
assert.equal(initial.imageCount, 1);
assert.ok(initial.storeId.startsWith("workspace-"));
assert.equal(initial.storedSrc, "");
await panel.close();

const snapshots = [];
for (let reopen = 0; reopen < 2; reopen += 1) {
  panel = await openPanel();
  const snapshot = await panel.evaluate(`
    const dbItems = await withLocalGalleryStore("readonly", (store) => requestToPromise(store.getAll()));
    return { mode: generationMode, images: imageItems.length,
      selected: selectedImageIds.size, active: activeImageId,
      prompt: nodes.promptInput.value, model: nodes.modelSelect.value,
      width: nodes.widthInput.value, height: nodes.heightInput.value,
      gallery: galleryItems.filter((item) => !item.isGenerating).length,
      db: dbItems.length, source: galleryItems[0]?.assetLineage?.sourceAssets?.[0]?.participation };
  `);
  assert.equal(snapshot.mode, "image");
  assert.equal(snapshot.images, 1);
  assert.equal(snapshot.selected, 1);
  assert.ok(snapshot.active);
  assert.equal(snapshot.prompt, "smoke image prompt");
  assert.equal(snapshot.width, "1024");
  assert.equal(snapshot.height, "1024");
  assert.equal(snapshot.gallery, 1);
  assert.equal(snapshot.db, 1);
  assert.equal(snapshot.source, "direct");
  snapshots.push(snapshot);
  await panel.close();
}
panel = await openPanel();
const legacy = await panel.evaluate(`
  const blob = await (await fetch(chrome.runtime.getURL(${JSON.stringify(fixture)}))).blob();
  const url = "https://example.invalid/legacy-same-result.png";
  const now = Date.now();
  for (let index = 0; index < 2; index += 1) {
    const imageId = "legacy-image-" + ${JSON.stringify(generationId)} + "-" + index;
    const galleryId = "legacy-gallery-" + ${JSON.stringify(generationId)} + "-" + index;
    await withLocalImageStore("readwrite", (store) => store.put({
      id: imageId, blob, thumbnailBlob: null, mimeType: blob.type,
      thumbnailMimeType: "", createdAt: now + index
    }));
    await withLocalGalleryStore("readwrite", (store) => store.put({
      id: galleryId, galleryId, localStoreId: imageId,
      originalUrl: url, url: "", prompt: "legacy prompt", createdAt: now + index * 1000
    }));
  }
  const deduped = await loadGalleryRecordsFromIndexedDb();
  const db = await withLocalGalleryStore("readonly", (store) => requestToPromise(store.getAll()));
  return { visible: deduped.length, persisted: db.length,
    legacyCount: db.filter((item) => item.originalUrl === url).length };
`);
assert.equal(legacy.visible, 2);
assert.equal(legacy.persisted, 2);
assert.equal(legacy.legacyCount, 1);
await panel.close();
console.log(JSON.stringify({ uploaded, uploadedReopen, initial, reopens: snapshots, legacy }, null, 2));
