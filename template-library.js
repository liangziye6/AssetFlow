(function (global) {
  "use strict";

  const TYPES = Object.freeze({ prompt_recipe: "Prompt玩法", visual_recipe: "视觉方案" });
  const STATUSES = new Set(["candidate", "testing", "verified", "published", "deprecated"]);
  const PUBLIC_STATUSES = new Set(["verified", "published"]);
  const ROLES = new Set(["subject", "composition", "layout", "color_material", "style", "decoration"]);
  const DEFAULTS = Object.freeze({
    ratio: "3:4", title: "主标题", subject: "核心主体", scene: "目标场景",
    style: "清晰的商业视觉", product: "无品牌饮品", color: "钴蓝色",
    feature: "核心卖点", accessory: "标志性配件", clothing: "符合设定的服装",
    era: "1980", location: "目标地点", landmark: "代表性地标",
    items: "服装与配件", interest: "人物兴趣", focus: "眼睛", light: "侧逆光"
  });
  const scriptUrl = typeof document !== "undefined" ? document.currentScript?.src : "";
  let cachedRequest = null;

  function normalizeRecipe(item) {
    if (!item || typeof item !== "object") return item;
    if (STATUSES.has(item.status)) return item;
    // v1.9.15 data remains loadable, but unreviewed placeholder art is never public.
    return {
      ...item,
      legacy: true,
      summary: item.summary || item.description || "",
      status: "candidate",
      modes: item.modes || (item.mode === "text" ? ["text"] : []),
      variables: item.variables || [...String(item.prompt || item.promptTemplate || "").matchAll(/\{([a-z_]+)\}/g)].map((match) => match[1]),
      references: item.references || (item.rolePreset || []).map((entry) => ({ ...entry, required: true })),
      preserve: item.preserve || item.strategy?.keep || [],
      change: item.change || item.strategy?.change || [],
      goalTemplate: item.goalTemplate || item.promptTemplate || "",
      thumbnail: "", preview: ""
    };
  }
  function localImage(path) {
    return /^assets\/recipes\/(?:thumbnails|previews)\/[a-z0-9-]+\.webp$/.test(path || "");
  }
  function validateRecipes(input) {
    if (!Array.isArray(input) || input.length > 40) throw new Error("方案库数据格式或数量不正确。");
    const ids = new Set();
    return input.map((raw) => {
      const item = normalizeRecipe(raw);
      if (!item || !/^[a-z0-9-]+$/.test(item.id) || ids.has(item.id)) throw new Error("方案 ID 无效或重复。");
      ids.add(item.id);
      if (!TYPES[item.type] || !STATUSES.has(item.status) || !String(item.name || "").trim()
        || !String(item.category || "").trim() || !String(item.summary || "").trim()
        || !Array.isArray(item.tags) || !item.tags.length
        || (!item.legacy && (!item.source || !String(item.source.author || "").trim()
          || !String(item.source.checkedAt || "").trim()
          || (item.source.platform === "internal"
            ? !String(item.source.notes || "").trim()
            : !/^https:\/\//.test(item.source.url || ""))))) {
        throw new Error("方案缺少必要字段：" + item.id);
      }
      if (item.type === "prompt_recipe") {
        if (!Array.isArray(item.modes) || !item.modes.length || !item.modes.every((mode) => ["text", "image"].includes(mode))
          || !String(item.prompt || "").trim() || !Array.isArray(item.variables) || !item.variables.length
          || !item.variables.every((key) => /^[a-z_]+$/.test(key) && item.prompt.includes("{" + key + "}"))) {
          throw new Error("Prompt玩法内容无效：" + item.id);
        }
      } else if (item.mode !== "reuse" || !String(item.goalTemplate || "").trim()
        || !Array.isArray(item.references) || !item.references.length
        || !item.references.some((entry) => entry.required)
        || !item.references.every((entry) => Number.isInteger(entry.slot) && entry.slot >= 1
          && entry.slot <= 4 && ROLES.has(entry.role) && typeof entry.required === "boolean")
        || !Array.isArray(item.preserve) || !item.preserve.length
        || !Array.isArray(item.change) || !item.change.length || !String(item.output || item.goal || "").trim()) {
        throw new Error("视觉方案内容无效：" + item.id);
      }
      if (PUBLIC_STATUSES.has(item.status)
        && (!localImage(item.thumbnail) || !localImage(item.preview)
          || !item.validation?.previewOriginal || !item.validation?.testedAt || !item.validation?.result)) {
        throw new Error("正式方案缺少原创图片或生成验证：" + item.id);
      }
      return item;
    });
  }
  async function load() {
    if (!cachedRequest) {
      const files = ["recipes/prompt-recipes.json", "recipes/visual-recipes.json"];
      cachedRequest = Promise.all(files.map(async (file) => {
        const response = await fetch(new URL(file, scriptUrl || global.location.href));
        if (!response.ok) throw new Error("方案文件加载失败（HTTP " + response.status + "）。");
        return response.json();
      })).then((groups) => validateRecipes(groups.flat())).catch((error) => {
        cachedRequest = null;
        throw error;
      });
    }
    return cachedRequest;
  }
  function filter(items, options = {}) {
    const type = TYPES[options.type] ? options.type : "prompt_recipe";
    const category = String(options.category || "");
    const tag = String(options.tag || "");
    const query = String(options.query || "").trim().toLocaleLowerCase();
    return (Array.isArray(items) ? items : []).filter((item) => {
      if (item.type !== type || (!options.includeCandidates && !PUBLIC_STATUSES.has(item.status))
        || (options.includeCandidates && item.status === "deprecated")
        || (category && item.category !== category)
        || (tag && !(item.tags || []).includes(tag))) return false;
      if (!query) return true;
      return [item.name, item.summary, item.description, item.category, item.goal, item.output,
        ...(item.tags || [])].join(" ").toLocaleLowerCase().includes(query);
    });
  }
  function categories(items, type, options = {}) {
    return [...new Set(filter(items, { type, ...options }).map((item) => item.category))];
  }
  function tags(items, type, options = {}) {
    return [...new Set(filter(items, { type, ...options }).flatMap((item) => item.tags || []))];
  }
  function resolveText(recipe, values = {}) {
    const source = recipe?.type === "visual_recipe"
      ? recipe.goalTemplate || recipe.promptTemplate : recipe?.prompt;
    return String(source || "").replace(/\{([a-z_]+)\}/g, (match, key) =>
      String(values[key] || "").trim() || DEFAULTS[key] || match);
  }
  function referencesFor(recipe) {
    return Array.isArray(recipe?.references) ? recipe.references : recipe?.rolePreset || [];
  }
  function presetForExistingImages(recipe, count) {
    return referencesFor(recipe).filter((entry) => entry.slot <= count)
      .map((entry) => ({ slot: entry.slot, roles: [entry.role] }));
  }
  function requiredImageCount(recipe) {
    return Math.max(0, ...referencesFor(recipe)
      .filter((entry) => entry.required !== false).map((entry) => entry.slot));
  }
  const api = { TYPES, STATUSES, PUBLIC_STATUSES, load, filter, categories, tags,
    resolveText, presetForExistingImages, requiredImageCount, validateRecipes };
  global.AssetFlowTemplateLibrary = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
