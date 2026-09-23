(function (global) {
  "use strict";

  const MODES = Object.freeze({ text: "文生图", image: "图生图", reuse: "视觉复用", universal: "通用" });
  const CATEGORIES = Object.freeze({ scene: "场景", play: "玩法", structure: "结构" });
  const VARIABLES = new Set(["ratio", "title", "subject", "scene", "style"]);
  const scriptUrl = typeof document !== "undefined" ? document.currentScript?.src : "";
  let cachedRequest = null;

  function validateTemplates(items) {
    if (!Array.isArray(items)) throw new Error("模板文件格式错误。");
    const ids = new Set();
    return items.map((item) => {
      if (!item || !/^[a-z0-9-]+$/.test(item.id) || ids.has(item.id)) {
        throw new Error("模板 ID 无效或重复。");
      }
      ids.add(item.id);
      if (!MODES[item.mode] || !CATEGORIES[item.category] || !String(item.promptTemplate || "").trim()) {
        throw new Error("模板内容缺少必要字段：" + item.id);
      }
      if (!/^templates\/thumbnails\/[a-z0-9-]+\.(?:webp|svg)$/.test(item.thumbnail || "")) {
        throw new Error("模板缩略图路径无效：" + item.id);
      }
      return item;
    });
  }

  async function load() {
    if (!cachedRequest) {
      const url = new URL("templates/templates.json", scriptUrl || global.location.href);
      cachedRequest = fetch(url).then((response) => {
        if (!response.ok) throw new Error("模板文件加载失败（HTTP " + response.status + "）。");
        return response.json();
      }).then(validateTemplates).catch((error) => {
        cachedRequest = null;
        throw error;
      });
    }
    return cachedRequest;
  }

  function filter(items, options = {}) {
    const mode = MODES[options.mode] ? options.mode : "text";
    const category = CATEGORIES[options.category] ? options.category : "";
    const query = String(options.query || "").trim().toLocaleLowerCase();
    return (Array.isArray(items) ? items : []).filter((item) => {
      if (item.mode !== mode && item.mode !== "universal") return false;
      if (category && item.category !== category) return false;
      if (!query) return true;
      const haystack = [item.name, item.summary, CATEGORIES[item.category], item.subCategory,
        ...(Array.isArray(item.tags) ? item.tags : [])].join(" ").toLocaleLowerCase();
      return haystack.includes(query);
    }).sort((a, b) => Number(b.mode === mode) - Number(a.mode === mode));
  }

  function resolveText(template, values = {}) {
    return String(template?.promptTemplate || "").replace(/\{([a-z]+)\}/g, (match, key) => {
      if (!VARIABLES.has(key)) return match;
      const value = String(values[key] || "").trim();
      return value || { ratio: "3:4", title: "主标题", subject: "核心主体", scene: "目标场景", style: "清晰的商业视觉" }[key];
    });
  }

  function presetForExistingImages(template, count) {
    return (Array.isArray(template?.rolePreset) ? template.rolePreset : [])
      .filter((entry) => Number.isInteger(entry.slot) && entry.slot >= 1 && entry.slot <= count)
      .map((entry) => ({ slot: entry.slot, roles: Array.isArray(entry.roles) ? entry.roles.slice(0, 2) : [] }));
  }

  const api = { MODES, CATEGORIES, load, filter, resolveText, presetForExistingImages, validateTemplates };
  global.AssetFlowTemplateLibrary = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
