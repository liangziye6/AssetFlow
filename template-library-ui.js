(function () {
  "use strict";
  const library = window.AssetFlowTemplateLibrary;
  const drawer = document.querySelector("#templateDrawer");
  const scrim = document.querySelector("#templateScrim");
  const list = document.querySelector("#templateList");
  const quick = document.querySelector("#templateQuickList");
  const search = document.querySelector("#templateSearch");
  const preview = document.querySelector("#templatePreview");
  const confirmBox = document.querySelector("#templateConfirm");
  const confirmTitle = document.querySelector("#templateConfirmTitle");
  const confirmText = document.querySelector("#templateConfirmText");
  const confirmActions = document.querySelector("#templateConfirmActions");
  const modeLabel = document.querySelector("#templateModeLabel");
  const categoryButtons = [...document.querySelectorAll("[data-template-category]")];
  const categoryKey = "assetflowTemplateCategoryV1";
  const preferred = {
    text: ["commercial-person", "product-kv", "xhs-cover"],
    image: ["keep-subject-scene", "ecommerce-main", "glass-material"],
    reuse: ["reuse-three-poster", "reuse-two", "reuse-product-three"]
  };
  let items = [];
  let category = library.CATEGORIES[localStorage.getItem(categoryKey)] ? localStorage.getItem(categoryKey) : "scene";
  let lastFocus = null;
  let pending = null;
  let selectedId = "";
  const feedback = document.createElement("p");
  feedback.className = "template-feedback";
  feedback.setAttribute("role", "status");
  modeLabel.after(feedback);

  function mode() {
    return promptMethod === "reuse" ? "reuse" : generationMode;
  }
  function input() {
    return mode() === "reuse" ? nodes.visualReuseNotes : nodes.promptInput;
  }
  function variables() {
    const width = Number(nodes.widthInput?.value) || 1024;
    const height = Number(nodes.heightInput?.value) || 1024;
    const ratioText = nodes.sizePickerText?.textContent || "";
    const ratio = ratioText.match(/\d+\s*:\s*\d+/)?.[0].replace(/\s/g, "") || (width === height ? "1:1" : width + "×" + height);
    const style = nodes.visualReuseStyle?.value !== "auto" ? nodes.visualReuseStyle?.selectedOptions?.[0]?.textContent : "";
    return {
      ratio,
      title: nodes.visualReuseTextContent?.value.trim() || "主标题",
      subject: "核心主体",
      scene: "目标场景",
      style: style || "清晰的商业视觉"
    };
  }
  function textFor(item) {
    return library.resolveText(item, variables());
  }
  function notice(text) {
    feedback.textContent = text;
    setStatus(text);
    clearTimeout(notice.timer);
    notice.timer = setTimeout(() => { feedback.textContent = ""; }, 3000);
  }
  function makeButton(label, className, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", (event) => { event.stopPropagation(); action(); });
    return button;
  }
  function imageFor(item) {
    const img = document.createElement("img");
    img.src = item.thumbnail;
    img.alt = item.name + "视觉方向";
    img.loading = "lazy";
    img.decoding = "async";
    return img;
  }
  function renderQuick() {
    quick.replaceChildren();
    const current = mode();
    for (const id of preferred[current]) {
      const item = items.find((entry) => entry.id === id);
      if (item) quick.append(makeButton(item.name, "template-quick-chip", () => requestUse(item)));
    }
    document.querySelector("#templateQuick").hidden = !quick.childElementCount;
  }
  function renderList() {
    categoryButtons.forEach((button) => button.setAttribute("aria-pressed", button.dataset.templateCategory === category ? "true" : "false"));
    modeLabel.textContent = "当前模式：" + library.MODES[mode()] + (search.value.trim() ? " · 搜索全部分类" : "");
    list.replaceChildren();
    const results = library.filter(items, {
      mode: mode(), category: search.value.trim() ? "" : category, query: search.value
    });
    if (!results.length) {
      const empty = document.createElement("p");
      empty.className = "template-empty";
      empty.textContent = "没有找到相关模板，试试其他分类或关键词。";
      list.append(empty);
      return;
    }
    for (const item of results) {
      const card = document.createElement("article");
      card.className = "template-card";
      card.tabIndex = 0;
      card.setAttribute("aria-label", "预览模板：" + item.name);
      card.addEventListener("click", () => showPreview(item));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); showPreview(item); }
      });
      const thumb = imageFor(item);
      const body = document.createElement("div");
      body.className = "template-card-body";
      const name = document.createElement("h3");
      name.textContent = item.name;
      const meta = document.createElement("small");
      meta.textContent = library.MODES[item.mode] + " · " + library.CATEGORIES[item.category];
      const summary = document.createElement("p");
      summary.textContent = item.summary;
      const actions = document.createElement("div");
      actions.className = "template-card-actions";
      actions.append(makeButton("使用模板", "template-use-btn", () => requestUse(item)),
        makeButton("复制", "template-copy-btn", () => copy(item)));
      body.append(name, meta, summary, actions);
      card.append(thumb, body);
      list.append(card);
    }
  }
  function showPreview(item) {
    selectedId = item.id;
    preview.replaceChildren();
    const head = document.createElement("div");
    head.className = "template-preview-head";
    head.append(makeButton("返回模板", "template-back-btn", () => { preview.hidden = true; selectedId = ""; }),
      makeButton("×", "template-close-btn", () => { preview.hidden = true; selectedId = ""; }));
    const img = imageFor(item);
    img.loading = "eager";
    const name = document.createElement("h3");
    name.textContent = item.name;
    const meta = document.createElement("small");
    meta.textContent = library.MODES[item.mode] + " · " + library.CATEGORIES[item.category];
    const summary = document.createElement("p");
    summary.textContent = item.summary;
    const label = document.createElement("strong");
    label.textContent = "模板内容";
    const content = document.createElement("pre");
    content.textContent = textFor(item);
    preview.append(head, img, name, meta, summary, label, content);
    if (item.rolePreset?.length) {
      const roles = document.createElement("p");
      roles.textContent = "角色预设：" + item.rolePreset.map((entry) => "图" + entry.slot + " → " + entry.roles.map((role) => visualReuseRoleMeta(role).label).join("、")).join("；");
      preview.append(roles);
    }
    const strategy = document.createElement("p");
    strategy.textContent = "文字策略：" + ({ reserve: "后期添加", "post-edit": "后期添加", "with-text": "生成指定文字", none: "不需要文字" }[item.textStrategy] || "按当前设置");
    const actions = document.createElement("div");
    actions.className = "template-card-actions";
    actions.append(makeButton("使用模板", "template-use-btn", () => requestUse(item)),
      makeButton("复制", "template-copy-btn", () => copy(item)));
    preview.append(strategy, actions);
    preview.hidden = false;
    preview.scrollIntoView({ block: "nearest" });
  }
  function closeConfirm() {
    pending = null;
    confirmBox.hidden = true;
    confirmActions.replaceChildren();
  }
  function ask(title, text, actions) {
    if (drawer.hidden) open();
    confirmTitle.textContent = title;
    confirmText.textContent = text;
    confirmActions.replaceChildren();
    for (const [label, action, primary] of actions) {
      confirmActions.append(makeButton(label, primary ? "template-use-btn" : "template-copy-btn", action));
    }
    confirmBox.hidden = false;
    confirmActions.querySelector("button")?.focus();
  }
  function requestUse(item) {
    pending = { item, roleChoice: "none" };
    const presets = library.presetForExistingImages(item, imageItems.length);
    if (mode() === "reuse" && presets.some((entry) => imageItems[entry.slot - 1]?.visualReuseRolesManual)) {
      ask("当前参考图已有角色设置", "使用模板角色会调整对应参考图的手动角色。请选择如何继续。", [
        ["使用模板角色", () => { pending.roleChoice = "apply"; askInputChoice(); }, true],
        ["仅填入需求", () => { pending.roleChoice = "none"; askInputChoice(); }, false],
        ["取消", closeConfirm, false]
      ]);
      return;
    }
    pending.roleChoice = mode() === "reuse" && presets.length ? "apply" : "none";
    askInputChoice();
  }
  function askInputChoice() {
    if (!pending) return;
    if (!input()?.value.trim()) { apply("replace"); return; }
    ask("当前已有内容", "请选择如何把模板提示词加入当前输入。", [
      ["替换当前内容", () => apply("replace"), true],
      ["追加到当前内容", () => apply("append"), false],
      ["取消", closeConfirm, false]
    ]);
  }
  function apply(how) {
    if (!pending) return;
    const { item, roleChoice } = pending;
    const target = input();
    const nextText = textFor(item);
    const oldText = target.value.trim();
    const value = how === "append" && oldText ? oldText + "\n\n" + nextText : nextText;
    if (mode() === "reuse" && roleChoice === "apply") {
      for (const preset of library.presetForExistingImages(item, imageItems.length)) {
        const image = imageItems[preset.slot - 1];
        if (!image) continue;
        image.visualReuseRoles = normalizeVisualReuseRoles(preset.roles);
        image.visualReuseRole = "";
        image.visualReuseRolesManual = image.visualReuseRoles.length > 0;
        image.visualReuseConflictAcknowledged = "";
      }
      renderImageStack();
      clearGeneratedPromptForReferenceChange("模板角色已应用，请重新查看方案。");
    }
    target.value = value;
    target.dispatchEvent(new Event("input", { bubbles: true }));
    saveWorkspaceState();
    closeConfirm();
    close();
    target.focus();
    notice("已填入模板，可继续修改后生成。");
  }
  async function copy(item) {
    const value = textFor(item);
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const temp = document.createElement("textarea");
      temp.value = value;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.append(temp);
      temp.select();
      const copied = document.execCommand("copy");
      temp.remove();
      if (!copied) { notice("复制失败，请检查剪贴板权限。"); return; }
    }
    notice("已复制模板提示词");
  }
  function open() {
    if (!library) { setStatus("模板库模块未加载。"); return; }
    lastFocus = document.activeElement;
    drawer.hidden = false;
    scrim.hidden = false;
    renderList();
    search.focus();
    library.load().then((data) => {
      items = data;
      renderList();
      renderQuick();
      if (selectedId) {
        const current = items.find((item) => item.id === selectedId);
        if (current) showPreview(current);
      }
    }).catch((error) => {
      list.textContent = error.message || "模板库加载失败。";
    });
  }
  function close() {
    closeConfirm();
    preview.hidden = true;
    selectedId = "";
    drawer.hidden = true;
    scrim.hidden = true;
    lastFocus?.focus?.();
  }
  function onModeChange() {
    document.querySelector("#templateInputTitle").textContent = mode() === "image" ? "编辑需求" : "提示词";
    renderQuick();
    if (!drawer.hidden) {
      preview.hidden = true;
      selectedId = "";
      renderList();
    }
  }
  document.querySelectorAll("[data-open-template]").forEach((button) => button.addEventListener("click", open));
  document.querySelector("#templateCloseBtn").addEventListener("click", close);
  scrim.addEventListener("click", close);
  search.addEventListener("input", renderList);
  categoryButtons.forEach((button) => button.addEventListener("click", () => {
    category = button.dataset.templateCategory;
    localStorage.setItem(categoryKey, category);
    renderList();
  }));
  drawer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); if (!confirmBox.hidden) closeConfirm(); else if (!preview.hidden) preview.hidden = true; else close(); }
    if (event.key === "Tab" && !confirmBox.hidden) {
      const buttons = [...confirmActions.querySelectorAll("button")];
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.AssetFlowTemplateUI = { onModeChange, open, close };
  onModeChange();
  library.load().then((data) => { items = data; renderQuick(); }).catch(() => {
    document.querySelector("#templateQuick").hidden = true;
  });
})();
