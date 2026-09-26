(function (global) {
  "use strict";

  const TYPES = Object.freeze({
    prompt_recipe: "灵感玩法",
    visual_recipe: "视觉方案"
  });
  const VARIABLES = new Set(["ratio", "title", "subject", "scene", "style"]);
  const ROLES = new Set(["subject", "composition", "layout", "color_material", "style", "decoration"]);
  const scriptUrl = typeof document !== "undefined" ? document.currentScript?.src : "";
  let cachedRequest = null;

  function validateRecipes(items) {
    if (!Array.isArray(items) || items.length > 30) throw new Error("方案库数据格式或数量不正确。");
    const ids = new Set();
    return items.map((item) => {
      if (!item || !/^[a-z0-9-]+$/.test(item.id) || ids.has(item.id)) {
        throw new Error("方案 ID 无效或重复。");
      }
      ids.add(item.id);
      if (!TYPES[item.type] || !String(item.name || "").trim()
        || !String(item.category || "").trim() || !String(item.description || "").trim()
        || !/^templates\/thumbnails\/[a-z0-9-]+\.(?:webp|svg)$/.test(item.thumbnail || "")) {
        throw new Error("方案缺少必要字段：" + item.id);
      }
      if (item.type === "prompt_recipe") {
        if (item.mode !== "text" || !String(item.prompt || "").trim()) {
          throw new Error("灵感玩法内容无效：" + item.id);
        }
      } else {
        if (item.mode !== "reuse" || !String(item.goal || "").trim()
          || !String(item.promptTemplate || "").trim()
          || !Array.isArray(item.rolePreset) || !item.rolePreset.length
          || !item.rolePreset.every((entry) => Number.isInteger(entry.slot) && entry.slot >= 1
            && entry.slot <= 4 && ROLES.has(entry.role))
          || !Array.isArray(item.strategy?.keep) || !Array.isArray(item.strategy?.change)) {
          throw new Error("视觉方案内容无效：" + item.id);
        }
      }
      return item;
    });
  }

  async function load() {
    if (!cachedRequest) {
      const files = ["recipes/prompt-recipes.json", "recipes/visual-recipes.json"];
      cachedRequest = Promise.all(files.map(async (file) => {
        const url = new URL(file, scriptUrl || global.location.href);
        const response = await fetch(url);
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
    const query = String(options.query || "").trim().toLocaleLowerCase();
    return (Array.isArray(items) ? items : []).filter((item) => {
      if (item.type !== type || (category && item.category !== category)) return false;
      if (!query) return true;
      return [item.name, item.description, item.category, item.goal,
        ...(Array.isArray(item.tags) ? item.tags : [])].join(" ").toLocaleLowerCase().includes(query);
    });
  }

  function categories(items, type) {
    return [...new Set(filter(items, { type }).map((item) => item.category))];
  }

  function resolveText(recipe, values = {}) {
    const source = recipe?.type === "visual_recipe" ? recipe.promptTemplate : recipe?.prompt;
    return String(source || "").replace(/\{([a-z]+)\}/g, (match, key) => {
      if (!VARIABLES.has(key)) return match;
      return String(values[key] || "").trim()
        || { ratio: "3:4", title: "主标题", subject: "核心主体",
          scene: "目标场景", style: "清晰的商业视觉" }[key];
    });
  }

  function presetForExistingImages(recipe, count) {
    return (Array.isArray(recipe?.rolePreset) ? recipe.rolePreset : [])
      .filter((entry) => entry.slot <= count)
      .map((entry) => ({ slot: entry.slot, roles: [entry.role] }));
  }

  function requiredImageCount(recipe) {
    return Math.max(0, ...(recipe?.rolePreset || []).map((entry) => entry.slot));
  }

  const api = { TYPES, load, filter, categories, resolveText, presetForExistingImages,
    requiredImageCount, validateRecipes };
  global.AssetFlowTemplateLibrary = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
