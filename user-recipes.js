(function (global) {
  "use strict";
  const library = global.AssetFlowTemplateLibrary || (typeof require === "function" ? require("./template-library.js") : null);
  const CATEGORIES = ["角色 / IP", "商业产品", "人物视觉", "海报 / KV", "品牌视觉", "多图复用", "其他"];
  const ROLES = new Set(["subject", "composition", "layout", "color_material", "style", "decoration"]);
  const DB_NAME = "imageSparkLocalImages", DB_VERSION = 3;
  const missingContext = "该历史资产缺少完整创作上下文，无法保存为可复用方案。";
  const text = (value) => typeof value === "string" ? value.trim() : "";
  const list = (value) => Array.isArray(value) ? value.map(text).filter(Boolean) : [];
  function modeFor(item = {}) {
    const context = item.generationContext;
    return context?.mode || (item.source === "reuse" || item.reusePlan ? "reuse" : item.mode);
  }
  function buildUserVisualRecipe(item, edits = {}, id = "user-recipe-" + global.crypto.randomUUID()) {
    const context = item?.generationContext || {};
    const mode = modeFor(item);
    const plan = context.reusePlan || item?.reusePlan;
    if (item?.isGenerating || !["image", "reuse"].includes(mode)) throw new Error("仅支持已完成的图生图与视觉复用资产。");
    if ((!item.generationContext && !plan) || (mode === "reuse" && !plan)) throw new Error(missingContext);
    const goal = text(mode === "reuse" ? context.visualReuse?.notes || plan.intent?.coreRequirement || plan.coreRequirement : context.prompt || item.prompt);
    if (!goal) throw new Error(missingContext);
    const rawReferences = mode === "image" ? [{ role: "subject" }]
      : plan.references?.length ? plan.references : item.assetLineage?.sourceAssets || [];
    if (!rawReferences.length || rawReferences.length > 4) throw new Error(missingContext);
    const references = rawReferences.map((entry, index) => {
      const roles = [...new Set(list(entry.roles || entry.visualReuseRoles || [entry.role]))];
      if (!roles.length || roles.some((role) => !ROLES.has(role))) throw new Error(missingContext);
      return { slot: index + 1, role: roles[0], roles, required: true };
    });
    const preserve = list(plan?.preserve || plan?.analysis?.inheritedTraits);
    const change = list(plan?.change || plan?.analysis?.changedTraits);
    const options = context.options || {};
    const width = Number(options.width || plan?.canvas?.width || item.width) || 1024;
    const height = Number(options.height || plan?.canvas?.height || item.height) || 1024;
    const output = text(plan?.output || plan?.analysis?.imageType || plan?.intent?.assetTypeLabel);
    const name = text(item.assetName) || output || goal.replace(/\s+/g, " ").slice(0, 28);
    const now = Date.now();
    // Retain provenance IDs, never input files, source URLs, or image-store dependencies.
    const sourceAssets = (item.assetLineage?.sourceAssets || []).map((asset, index) => ({
      assetId: text(asset.assetId), name: text(asset.name), order: asset.order || index + 1,
      roles: list(asset.roles), participation: text(asset.participation)
    }));
    const lineage = {
      relationshipType: text(item.assetLineage?.relationshipType) || (mode === "reuse" ? "visual-reuse" : "image-to-image"),
      sourceAssetIds: list(item.assetLineage?.sourceAssetIds),
      directReferenceIds: list(item.assetLineage?.directReferenceIds),
      analysisReferenceIds: list(item.assetLineage?.analysisReferenceIds), sourceAssets,
      derivedAssetId: text(item.assetLineage?.derivedAssetId), parentPlanId: text(item.assetLineage?.parentPlanId)
    };
    const textStrategy = plan?.textStrategy ? {
      mode: text(plan.textStrategy.mode), content: text(plan.textStrategy.content),
      layout: text(plan.textStrategy.layout), rationale: text(plan.textStrategy.rationale)
    } : null;
    const savedPlan = plan ? {
      schema: plan.schema, schemaVersion: plan.schemaVersion, id: plan.id, status: plan.status,
      intent: { ...plan.intent }, canvas: { ...plan.canvas }, textStrategy,
      references: references.map((entry) => ({ ...entry })),
      analysis: { ...plan.analysis }, analysisEn: { ...plan.analysisEn },
      preserve, change, lineage
    } : null;
    const reuse = context.visualReuse || {};
    const recipe = {
      id, type: "visual_recipe", sourceType: "user", status: "personal", mode: "reuse",
      name: name.slice(0, 70) + " 方案", summary: "", category: references.length > 1 ? "多图复用" : "其他", tags: [],
      references, preserve, change, goalTemplate: goal, output: output || goal.slice(0, 80),
      textStrategy, createdAt: now, updatedAt: now, previewStoreId: "recipe-preview-" + id,
      originGenerationId: text(item.generationId), originGalleryId: text(item.galleryId || item.id),
      assetLineage: lineage,
      generationContext: {
        mode, prompt: text(context.prompt || item.prompt) || goal, model: text(context.model || item.model),
        modelValue: text(context.modelValue),
        options: { width, height, sizeMode: text(options.sizeMode || plan?.canvas?.sizeMode) || "custom",
          resolution: text(options.resolution || plan?.canvas?.resolution) || "custom",
          ratio: text(options.ratio || plan?.canvas?.ratioLabel) || width + ":" + height, count: 1 },
        visualReuse: { assetType: text(reuse.assetType || plan?.intent?.assetType) || "auto",
          strength: text(reuse.strength || plan?.intent?.reuseMode) || "balanced_reuse",
          style: text(reuse.style || plan?.intent?.style) || "original",
          textMode: text(reuse.textMode || textStrategy?.mode) || "auto",
          textContent: text(reuse.textContent || textStrategy?.content), textSubtitle: text(reuse.textSubtitle), notes: goal },
        references, reusePlan: savedPlan
      },
      userEditable: { name: true, summary: true, category: true, tags: true, goalTemplate: true, preserve: true, change: true }
    };
    return applyEdits(recipe, edits);
  }
  function applyEdits(recipe, edits) {
    const next = { ...recipe };
    for (const key of ["name", "summary", "category", "goalTemplate"]) {
      if (Object.hasOwn(edits, key)) next[key] = text(edits[key]);
    }
    for (const key of ["tags", "preserve", "change"]) {
      if (Object.hasOwn(edits, key)) next[key] = [...new Set(list(edits[key]))];
    }
    next.updatedAt = Math.max(Date.now(), recipe.createdAt);
    return next;
  }
  function availability(item) {
    const visible = !item?.isGenerating && ["image", "reuse"].includes(modeFor(item));
    if (!visible) return { visible: false, enabled: false, reason: "" };
    try { buildUserVisualRecipe(item); return { visible: true, enabled: true, reason: "" }; }
    catch (error) { return { visible: true, enabled: false, reason: error.message }; }
  }
  function openDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("images")) db.createObjectStore("images", { keyPath: "id" });
        if (!db.objectStoreNames.contains("gallery")) db.createObjectStore("gallery", { keyPath: "id" }).createIndex("createdAt", "createdAt");
        if (!db.objectStoreNames.contains("recipes")) db.createObjectStore("recipes", { keyPath: "id" });
      };
      request.onsuccess = () => { request.result.onversionchange = () => request.result.close(); resolve(request.result); };
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error("请关闭旧版 AssetFlow 面板后重试。"));
    });
  }
  async function read(storeName, id) {
    const db = await openDb();
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readonly");
        const req = id === undefined ? tx.objectStore(storeName).getAll() : tx.objectStore(storeName).get(id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    } finally { db.close(); }
  }
  function storageError(error) {
    return error?.name === "QuotaExceededError" || /quota|空间不足/i.test(error?.message || "")
      ? new Error("方案保存失败：浏览器本地存储空间不足。") : error;
  }
  async function transaction(callback) {
    const db = await openDb();
    try {
      await new Promise((resolve, reject) => {
        const tx = db.transaction(["recipes", "images"], "readwrite");
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error || new Error("方案写入失败。"));
        tx.onabort = () => reject(tx.error || new Error("方案写入已取消。"));
        try { callback(tx.objectStore("recipes"), tx.objectStore("images"), tx); }
        catch (error) { tx.abort(); reject(error); }
      });
    } catch (error) { throw storageError(error); }
    finally { db.close(); }
  }
  async function previewBlob(item) {
    const stored = item.localStoreId ? await read("images", item.localStoreId) : null;
    let blob = stored?.blob;
    if (!blob) {
      const response = await fetch(item.url || item.originalUrl);
      if (!response.ok) throw new Error("当前图片读取失败，请重试。");
      blob = await response.blob();
    }
    const bitmap = await createImageBitmap(blob);
    try {
      const scale = Math.min(1, 1024 / Math.max(bitmap.width, bitmap.height));
      const width = Math.max(1, Math.round(bitmap.width * scale)), height = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = new OffscreenCanvas(width, height);
      canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);
      return await canvas.convertToBlob({ type: "image/webp", quality: 0.85 });
    } finally { bitmap.close(); }
  }
  async function saveUserRecipe(recipe, item) {
    recipe = library.validateRecipes([recipe])[0];
    if (recipe.sourceType !== "user") throw new Error("内置方案不可修改。");
    try {
      const blob = await previewBlob(item);
      await transaction((recipes, images) => {
        images.add({ id: recipe.previewStoreId, blob, mimeType: blob.type, createdAt: Date.now(), meta: { recipeAsset: true, recipeId: recipe.id } });
        recipes.add(recipe);
      });
      notifyChanged();
      return recipe;
    } catch (error) { throw storageError(error); }
  }
  const getUserRecipe = (id) => read("recipes", id);
  async function listUserRecipes() {
    return library.validateRecipes(await read("recipes")).sort((a, b) => b.updatedAt - a.updatedAt);
  }
  async function updateUserRecipe(id, edits) {
    let next, validationError;
    await transaction((recipes) => {
      const request = recipes.get(id);
      request.onsuccess = () => {
        try {
          if (request.result?.sourceType !== "user") throw new Error("该个人方案已不存在。");
          next = library.validateRecipes([applyEdits(request.result, edits)])[0];
          recipes.put(next);
        } catch (error) { validationError = error; request.transaction.abort(); }
      };
    }).catch((error) => { throw validationError || error; });
    notifyChanged();
    return next;
  }
  async function deleteUserRecipe(id) {
    await transaction((recipes, images) => {
      const request = recipes.get(id);
      request.onsuccess = () => {
        const recipe = request.result;
        if (!recipe || recipe.sourceType !== "user") return;
        recipes.delete(id);
        images.delete(recipe.previewStoreId);
      };
    });
    notifyChanged();
  }
  function notifyChanged() {
    if (global.chrome?.storage?.local) chrome.storage.local.set({ assetflowUserRecipesChangedAt: Date.now() }).catch(() => {});
    global.dispatchEvent?.(new Event("assetflow-recipes-changed"));
  }
  const api = { CATEGORIES, DB_NAME, DB_VERSION, missingContext, buildUserVisualRecipe, availability,
    applyEdits, saveUserRecipe, getUserRecipe, listUserRecipes, updateUserRecipe, deleteUserRecipe,
    getPreview: (id) => read("images", id), getGalleryItem: (id) => read("gallery", id) };
  global.AssetFlowUserRecipes = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
