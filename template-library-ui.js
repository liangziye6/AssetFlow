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
  const categories = document.querySelector("#templateCategories");
  const typeButtons = [...document.querySelectorAll("[data-template-type]")];
  const typeKey = "assetflowRecipeTypeV1";
  const preferred = {
    text: ["commercial-person", "glass-material", "double-exposure"],
    image: ["glass-material", "forced-perspective", "collage-magazine"],
    reuse: ["commercial-person-plan", "reuse-two-plan", "reuse-three-poster-plan"]
  };
  let items = [];
  let type = library.TYPES[localStorage.getItem(typeKey)] ? localStorage.getItem(typeKey) : "prompt_recipe";
  let category = "";
  let lastFocus = null;
  let pending = null;
  let selectedId = "";
  const feedback = document.createElement("p");
  feedback.className = "template-feedback";
  feedback.setAttribute("role", "status");
  modeLabel.after(feedback);

  const mode = () => promptMethod === "reuse" ? "reuse" : generationMode;
  function variables() {
    const width = Number(nodes.widthInput?.value) || 1024;
    const height = Number(nodes.heightInput?.value) || 1024;
    const ratioText = nodes.sizePickerText?.textContent || "";
    return {
      ratio: ratioText.match(/\d+\s*:\s*\d+/)?.[0].replace(/\s/g, "") || (width === height ? "1:1" : width + "×" + height),
      title: nodes.visualReuseTextContent?.value.trim() || "主标题",
      subject: "核心主体",
      scene: "目标场景",
      style: nodes.visualReuseStyle?.value !== "auto"
        ? nodes.visualReuseStyle?.selectedOptions?.[0]?.textContent || "清晰的商业视觉" : "清晰的商业视觉"
    };
  }
  const textFor = (item) => library.resolveText(item, variables());
  function notice(message) {
    feedback.textContent = message;
    setStatus(message);
    clearTimeout(notice.timer);
    notice.timer = setTimeout(() => { feedback.textContent = ""; }, 3500);
  }
  function button(label, className, action) {
    const node = document.createElement("button");
    node.type = "button";
    node.className = className;
    node.textContent = label;
    node.addEventListener("click", (event) => { event.stopPropagation(); action(); });
    return node;
  }
  function imageFor(item) {
    const img = document.createElement("img");
    img.src = item.thumbnail;
    img.alt = item.name + "预览";
    img.loading = "lazy";
    return img;
  }
  function roleSummary(item) {
    return (item.rolePreset || []).map((entry) =>
      "图" + entry.slot + " → " + visualReuseRoleMeta(entry.role).label).join(" · ");
  }
  function actionsFor(item) {
    const actions = document.createElement("div");
    actions.className = "template-card-actions";
    if (item.type === "prompt_recipe") {
      actions.append(button("复制 Prompt", "template-copy-btn", () => copy(item)),
        button("应用到输入框", "template-use-btn", () => requestUse(item)));
    } else {
      actions.append(button("使用方案", "template-use-btn", () => requestUse(item)));
    }
    return actions;
  }
  function renderQuick() {
    quick.replaceChildren();
    const current = mode();
    for (const id of preferred[current] || preferred.text) {
      const item = items.find((entry) => entry.id === id
        && entry.type === (current === "reuse" ? "visual_recipe" : "prompt_recipe"));
      if (item) quick.append(button(item.name, "template-quick-chip", () => requestUse(item)));
    }
    document.querySelector("#templateQuick").hidden = !quick.childElementCount;
  }
  function renderCategories() {
    categories.replaceChildren();
    const options = ["", ...library.categories(items, type)];
    if (category && !options.includes(category)) category = "";
    for (const value of options) {
      const choice = button(value || "全部", "", () => { category = value; renderList(); });
      choice.setAttribute("aria-pressed", value === category ? "true" : "false");
      categories.append(choice);
    }
  }
  function renderList() {
    typeButtons.forEach((node) =>
      node.setAttribute("aria-pressed", node.dataset.templateType === type ? "true" : "false"));
    renderCategories();
    modeLabel.textContent = type === "prompt_recipe"
      ? "灵感玩法 · 复制 Prompt 或应用到当前输入框"
      : "视觉方案 · 设定参考图角色后进入现有视觉复用流程";
    list.replaceChildren();
    const results = library.filter(items, { type, category, query: search.value });
    if (!results.length) {
      const empty = document.createElement("p");
      empty.className = "template-empty";
      empty.textContent = items.length ? "没有找到相关方案，试试其他分类或关键词。" : "正在加载方案…";
      list.append(empty);
      return;
    }
    for (const item of results) {
      const card = document.createElement("article");
      card.className = "template-card";
      card.tabIndex = 0;
      card.setAttribute("aria-label", "预览方案：" + item.name);
      card.addEventListener("click", () => showPreview(item));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); showPreview(item); }
      });
      const body = document.createElement("div");
      body.className = "template-card-body";
      const name = document.createElement("h3");
      name.textContent = item.name;
      const meta = document.createElement("small");
      meta.textContent = item.category;
      const summary = document.createElement("p");
      summary.textContent = item.description;
      body.append(name, meta, summary);
      if (item.type === "visual_recipe") {
        const roles = document.createElement("small");
        roles.className = "template-card-role";
        roles.textContent = roleSummary(item);
        body.append(roles);
      }
      body.append(actionsFor(item));
      card.append(imageFor(item), body);
      list.append(card);
    }
  }
  function showPreview(item) {
    selectedId = item.id;
    preview.replaceChildren();
    const head = document.createElement("div");
    head.className = "template-preview-head";
    head.append(button("返回列表", "template-back-btn", () => { preview.hidden = true; selectedId = ""; }),
      button("×", "template-close-btn", () => { preview.hidden = true; selectedId = ""; }));
    const name = document.createElement("h3");
    name.textContent = item.name;
    const meta = document.createElement("small");
    meta.textContent = library.TYPES[item.type] + " · " + item.category;
    const summary = document.createElement("p");
    summary.textContent = item.description;
    preview.append(head, imageFor(item), name, meta, summary);
    if (item.type === "visual_recipe") {
      const goal = document.createElement("p");
      goal.textContent = "目标：" + item.goal;
      preview.append(goal);
      const roles = document.createElement("p");
      roles.textContent = "参考图角色：" + roleSummary(item);
      const strategy = document.createElement("p");
      strategy.className = "template-card-strategy";
      strategy.textContent = "保持：" + item.strategy.keep.join("、") + " · 改变：" + item.strategy.change.join("、");
      preview.append(roles, strategy);
    }
    const label = document.createElement("strong");
    label.textContent = item.type === "visual_recipe" ? "核心需求示例" : "Prompt";
    const content = document.createElement("pre");
    content.textContent = textFor(item);
    preview.append(label, content, actionsFor(item));
    preview.hidden = false;
    preview.scrollIntoView({ block: "nearest" });
  }
  function closeConfirm() {
    pending = null;
    confirmBox.hidden = true;
    confirmActions.replaceChildren();
  }
  function ask(title, message, choices) {
    if (drawer.hidden) open();
    confirmTitle.textContent = title;
    confirmText.textContent = message;
    confirmActions.replaceChildren();
    for (const [label, action, primary] of choices) {
      confirmActions.append(button(label, primary ? "template-use-btn" : "template-copy-btn", action));
    }
    confirmBox.hidden = false;
    confirmActions.querySelector("button")?.focus();
  }
  function existingText(item) {
    if (item.type === "prompt_recipe") return nodes.promptInput.value.trim();
    const notes = nodes.visualReuseNotes.value.trim();
    const prompt = nodes.promptInput.value.trim();
    if (promptMethod !== "reuse" && notes && prompt) return prompt + "\n\n" + notes;
    return notes || prompt;
  }
  function requestUse(item) {
    pending = { item, roleChoice: "none", existing: existingText(item) };
    if (item.type === "visual_recipe" && imageItems.length) {
      const presets = library.presetForExistingImages(item, imageItems.length);
      if (presets.length) {
        const relationships = presets.map((entry) =>
          "图" + entry.slot + " → " + visualReuseRoleMeta(entry.roles[0]).label).join("；");
        ask("检测到已有参考图", "是否应用方案角色？" + relationships, [
          ["应用角色", () => { pending.roleChoice = "apply"; askInputChoice(); }, true],
          ["仅填需求", () => { pending.roleChoice = "none"; askInputChoice(); }, false],
          ["取消", closeConfirm, false]
        ]);
        return;
      }
    }
    askInputChoice();
  }
  function askInputChoice() {
    if (!pending) return;
    if (!pending.existing) { apply("replace"); return; }
    ask("当前已有内容", "请选择如何把方案内容加入当前输入。", [
      ["替换当前内容", () => apply("replace"), true],
      ["追加模板内容", () => apply("append"), false],
      ["取消", closeConfirm, false]
    ]);
  }
  function apply(how) {
    if (!pending) return;
    const { item, roleChoice, existing } = pending;
    const nextText = textFor(item);
    const value = how === "append" && existing ? existing + "\n\n" + nextText : nextText;
    if (item.type === "visual_recipe") {
      setPromptMethod("reuse");
      setVisualReusePanelOpen(true);
      if (roleChoice === "apply") {
        for (const preset of library.presetForExistingImages(item, imageItems.length)) {
          const image = imageItems[preset.slot - 1];
          if (!image) continue;
          image.visualReuseRoles = normalizeVisualReuseRoles(preset.roles);
          image.visualReuseRole = "";
          image.visualReuseRolesManual = image.visualReuseRoles.length > 0;
          image.visualReuseConflictAcknowledged = "";
        }
        renderImageStack();
      }
      nodes.visualReuseNotes.value = value;
      nodes.visualReuseNotes.dispatchEvent(new Event("input", { bubbles: true }));
      saveWorkspaceState();
      closeConfirm();
      close();
      nodes.visualReuseNotes.focus();
      const missing = Math.max(0, library.requiredImageCount(item) - imageItems.length);
      notice(missing
        ? "已填入方案，请补充 " + missing + " 张参考图，再点击“查看方案”。"
        : "已填入方案与角色。确认后点击“查看方案”建立 ReusePlan。");
    } else {
      if (promptMethod === "reuse") setGenerationMode("text", { silent: true });
      nodes.promptInput.value = value;
      nodes.promptInput.dispatchEvent(new Event("input", { bubbles: true }));
      saveWorkspaceState();
      closeConfirm();
      close();
      nodes.promptInput.focus();
      notice("已应用灵感玩法，可编辑后按当前模式生成。");
    }
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
    notice("已复制 Prompt");
  }
  function open() {
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
    }).catch((error) => { list.textContent = error.message || "灵感库加载失败。"; });
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
  document.querySelectorAll("[data-open-template]").forEach((node) => node.addEventListener("click", open));
  document.querySelector("#templateCloseBtn").addEventListener("click", close);
  scrim.addEventListener("click", close);
  search.addEventListener("input", renderList);
  typeButtons.forEach((node) => node.addEventListener("click", () => {
    type = node.dataset.templateType;
    category = "";
    selectedId = "";
    preview.hidden = true;
    localStorage.setItem(typeKey, type);
    renderList();
  }));
  drawer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      if (!confirmBox.hidden) closeConfirm();
      else if (!preview.hidden) preview.hidden = true;
      else close();
    }
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
