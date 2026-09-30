(function (global) {
  "use strict";
  if (global.AssetFlowRecipeEditor) return;
  const categories = ["角色 / IP", "商业产品", "人物视觉", "海报 / KV", "品牌视觉", "多图复用", "其他"];
  const labels = { subject: "主体与动作", composition: "构图与留白", layout: "排版与文字", color_material: "色彩与材质", style: "风格与材质", decoration: "装饰元素" };
  function open({ recipe, mode = "save", root = document.body, onSave }) {
    if (root.querySelector(".af-recipe-editor")) return;
    const focus = root.activeElement || document.activeElement;
    const dialog = document.createElement("dialog");
    dialog.className = "af-recipe-editor";
    dialog.setAttribute("aria-labelledby", "af-recipe-title");
    dialog.innerHTML = `<style>
      .af-recipe-editor { --af-surface:#16131e; --af-field:#0b0910; --af-button:#1d1929; --af-text:#f1eef7; --af-muted:#9b96ac; --af-border:#2a2438; --af-accent:#8b5cf6;
        box-sizing:border-box; width:min(560px,calc(100vw - 24px)); max-height:calc(100vh - 32px); margin:auto; padding:24px; border:1px solid var(--af-border); border-radius:22px; background:var(--af-surface); color:var(--af-text); font:14px/1.55 system-ui,sans-serif; box-shadow:0 24px 70px rgba(0,0,0,.34); overflow:auto; color-scheme:dark; }
      .af-recipe-editor::backdrop { background:radial-gradient(circle at 50% 0,rgba(91,33,182,.24),transparent 40%),rgba(6,4,12,.78); backdrop-filter:blur(5px); }
      .af-recipe-editor * { box-sizing:border-box; }
      .af-recipe-editor h2 { margin:0 0 18px; color:var(--af-text); font-size:21px; font-weight:720; }
      .af-recipe-editor label { display:block; margin:14px 0; color:var(--af-muted); font-size:13px; font-weight:600; }
      .af-recipe-editor input,.af-recipe-editor textarea,.af-recipe-editor select { display:block; width:100%; min-height:44px; margin:7px 0 0; padding:10px 14px; border:1px solid var(--af-border); border-radius:10px; background:var(--af-field); color:var(--af-text); font:600 14px/1.5 system-ui,sans-serif; box-shadow:none; }
      .af-recipe-editor input::placeholder,.af-recipe-editor textarea::placeholder { color:#6b6580; opacity:1; }
      .af-recipe-editor select option { background:var(--af-field); }
      .af-recipe-editor textarea { min-height:84px; resize:vertical; font-weight:400; }
      .af-recipe-editor input:focus,.af-recipe-editor textarea:focus,.af-recipe-editor select:focus { border-color:var(--af-accent); outline:none; box-shadow:0 0 0 2px rgba(139,92,246,.2); }
      .af-recipe-editor .af-reference-summary { padding:16px 0 0; border-top:1px solid var(--af-border); margin:20px 0 8px; overflow-wrap:anywhere; }
      .af-recipe-editor .af-reference-summary strong { color:var(--af-text); font-size:14px; }
      .af-recipe-editor .af-reference-summary p { margin:7px 0; color:var(--af-muted); white-space:pre-wrap; }
      .af-recipe-editor .af-editor-actions { display:flex; align-items:center; justify-content:flex-end; flex-wrap:wrap; gap:10px; margin-top:20px; padding-top:16px; border-top:1px solid var(--af-border); }
      .af-recipe-editor button { display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:40px; padding:0 20px; border:1px solid var(--af-border); border-radius:999px; background:var(--af-button); color:var(--af-text); font:600 14px/1 system-ui,sans-serif; text-align:center; vertical-align:middle; cursor:pointer; transition:border-color 150ms ease,background 150ms ease,box-shadow 150ms ease,transform 150ms ease; }
      .af-recipe-editor button[type=submit] { border-color:#3b2d56; }
      .af-recipe-editor button:hover:not(:disabled) { border-color:var(--af-accent); }
      .af-recipe-editor button[type=submit]:hover:not(:disabled) { border-color:rgba(139,92,246,.72); background:linear-gradient(180deg,rgba(139,92,246,.32),rgba(139,92,246,.14)),var(--af-button); color:#fff; box-shadow:0 0 18px rgba(139,92,246,.25),inset 0 1px 0 rgba(255,255,255,.1); }
      .af-recipe-editor button:active:not(:disabled) { border-color:var(--af-accent); background:linear-gradient(180deg,#7047c5,#4b2b88); color:#fff; box-shadow:0 0 18px rgba(139,92,246,.3); transform:translateY(1px) scale(.97); }
      .af-recipe-editor button[type=submit]:active:not(:disabled) { background:linear-gradient(180deg,#7047c5,#4b2b88); box-shadow:0 0 22px rgba(139,92,246,.32); }
      .af-recipe-editor button:focus-visible { outline:2px solid #a78bfa; outline-offset:2px; }
      .af-recipe-editor button.is-saving { border-color:var(--af-accent); background:#39295e; color:#fff; }
      .af-recipe-editor button.is-saving::before { content:""; width:12px; height:12px; border:2px solid rgba(255,255,255,.35); border-top-color:#fff; border-radius:50%; animation:af-recipe-spin .7s linear infinite; }
      .af-recipe-editor button.is-saved { border-color:#4ade80; background:#173026; color:#eaffef; }
      .af-recipe-editor button.is-error { border-color:#c86d81; }
      @keyframes af-recipe-spin { to { transform:rotate(360deg); } }
      .af-recipe-editor button:disabled { opacity:.75; cursor:wait; }
      .af-recipe-editor button.is-saved:disabled { opacity:1; }
      .af-recipe-editor .af-editor-error { color:#ffb3b3; white-space:pre-wrap; }
      .af-recipe-editor [hidden] { display:none !important; }
      @media(max-width:480px) { .af-recipe-editor { padding:18px; } .af-recipe-editor button { min-height:38px; padding-inline:16px; } }
      @media(prefers-reduced-motion:reduce) { .af-recipe-editor button { transition:none; } .af-recipe-editor button.is-saving::before { animation:none; } }
    </style><form>
      <h2 id="af-recipe-title"></h2>
      <label>方案名称<input name="name" maxlength="80" required autocomplete="off"></label>
      <div class="af-editor-optional">
        <label>一句描述<input name="summary" maxlength="240" autocomplete="off"></label>
        <label>分类<select name="category"></select></label>
        <label>标签（0–5 个，用逗号分隔）<input name="tags" autocomplete="off" placeholder="科技，电商，蓝色"></label>
      </div>
      <section class="af-reference-summary" aria-label="参考结构"></section>
      <div class="af-editor-details" hidden>
        <label>核心需求<textarea name="goalTemplate" maxlength="20000" required></textarea></label>
        <label>保持（每行一项）<textarea name="preserve"></textarea></label>
        <label>变化（每行一项）<textarea name="change"></textarea></label>
      </div>
      <p class="af-editor-error" role="alert" hidden></p>
      <div class="af-editor-actions"><button type="button" class="af-editor-cancel">取消</button><button type="submit">保存方案</button></div>
    </form>`;
    const form = dialog.querySelector("form");
    const submitButton = form.querySelector("[type=submit]");
    const title = dialog.querySelector("h2");
    title.textContent = mode === "rename" ? "重命名方案" : mode === "edit" ? "编辑视觉方案" : "保存为视觉方案";
    for (const category of categories) form.elements.category.add(new Option(category, category));
    for (const key of ["name", "summary", "category", "goalTemplate"]) form.elements[key].value = recipe[key] || "";
    form.elements.tags.value = (recipe.tags || []).join("，");
    form.elements.preserve.value = (recipe.preserve || []).join("\n");
    form.elements.change.value = (recipe.change || []).join("\n");
    dialog.querySelector(".af-editor-optional").hidden = mode === "rename";
    dialog.querySelector(".af-editor-details").hidden = mode !== "edit";
    const structure = dialog.querySelector(".af-reference-summary");
    structure.hidden = mode === "rename";
    const heading = document.createElement("strong");
    heading.textContent = "参考结构";
    structure.append(heading);
    for (const reference of recipe.references) {
      const line = document.createElement("p");
      line.textContent = "图" + reference.slot + " · " + (reference.roles || [reference.role]).map((role) => labels[role] || role).join("＋");
      structure.append(line);
    }
    if (mode === "save") {
      for (const [label, values] of [["保持", recipe.preserve], ["变化", recipe.change]]) {
        const line = document.createElement("p");
        line.textContent = label + " · " + (values?.join("、") || "未指定");
        structure.append(line);
      }
    }
    const hint = document.createElement("p");
    hint.textContent = "保存参考角色结构，下次使用时重新上传图片。";
    structure.append(hint);
    let busy = false;
    const close = () => {
      if (busy) return;
      dialog.close(); dialog.remove(); focus?.focus?.();
    };
    dialog.addEventListener("keydown", (event) => event.stopPropagation());
    dialog.addEventListener("cancel", (event) => { event.preventDefault(); close(); });
    dialog.querySelector(".af-editor-cancel").addEventListener("click", close);
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (busy) return;
      const error = dialog.querySelector(".af-editor-error");
      error.hidden = true;
      const edits = { name: form.elements.name.value.trim() };
      if (mode !== "rename") {
        Object.assign(edits, { summary: form.elements.summary.value.trim(), category: form.elements.category.value,
          tags: [...new Set(form.elements.tags.value.split(/[,，\n]/).map((tag) => tag.trim()).filter(Boolean))] });
      }
      if (mode === "edit") {
        edits.goalTemplate = form.elements.goalTemplate.value.trim();
        for (const key of ["preserve", "change"]) edits[key] = form.elements[key].value.split("\n").map((line) => line.trim()).filter(Boolean);
      }
      try {
        if (!edits.name) throw new Error("请填写方案名称。");
        if (edits.tags && (edits.tags.length > 5 || edits.tags.some((tag) => tag.length > 16))) throw new Error("最多添加 5 个标签，每个标签不超过 16 个字符。");
        busy = true;
        form.setAttribute("aria-busy", "true");
        submitButton.classList.remove("is-error");
        for (const button of form.querySelectorAll("button")) button.disabled = true;
        submitButton.textContent = "保存中…";
        submitButton.classList.add("is-saving");
        await onSave(edits);
        form.removeAttribute("aria-busy");
        submitButton.classList.remove("is-saving");
        submitButton.classList.add("is-saved");
        submitButton.textContent = "\u2713 \u5df2\u4fdd\u5b58";
        await new Promise((resolve) => setTimeout(resolve, global.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? 0 : 360));
        busy = false;
        close();
      } catch (failure) {
        busy = false;
        form.removeAttribute("aria-busy");
        submitButton.classList.remove("is-saving", "is-saved");
        submitButton.classList.add("is-error");
        for (const button of form.querySelectorAll("button")) button.disabled = false;
        submitButton.textContent = "保存方案";
        error.textContent = failure?.message || "方案保存失败，请重试。";
        error.hidden = false;
        error.scrollIntoView({ block: "nearest" });
      }
    });
    root.append(dialog);
    dialog.showModal();
    form.elements.name.focus();
    form.elements.name.select();
    return dialog;
  }
  global.AssetFlowRecipeEditor = { open };
})(typeof window !== "undefined" ? window : globalThis);
