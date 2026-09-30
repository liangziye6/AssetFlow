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
  const tags = document.querySelector("#templateTags");
  const browse = document.querySelector("#templateBrowse");
  const filterButton = document.querySelector("#templateFilterBtn");
  const researchButton = document.querySelector("#templateResearchBtn");
  const feedback = document.querySelector("#templateFeedback");
  const typeButtons = [...document.querySelectorAll("[data-template-type]")];
  const typeKey = "assetflowRecipeTypeV1";
  const preferred = {
    text: ["product-ad", "character-sheet", "map-pop-up-world"],
    image: ["product-ad", "character-sheet", "cinema-closeup"],
    reuse: ["character-consistency", "product-commercial-kv"]
  };
  let items = [];
  let type = library.TYPES[localStorage.getItem(typeKey)] ? localStorage.getItem(typeKey) : "prompt_recipe";
  let category = "";
  let tag = "";
  let research = false;
  let sourceType = "";
  let refreshSequence = 0;
  const previewUrls = new Map();
  let previewEpoch = 0;
  let lastFocus = null;
  let pending = null;
  let selectedId = "";
  let activeRoleRecipe = null;

  const isUsable = (item) => library.PUBLIC_STATUSES.has(item.status) || item.status === "testing" || (item.sourceType === "user" && item.status === "personal");
  function applyPendingRoles() {
    if (!activeRoleRecipe || promptMethod !== "reuse") return false;
    let changed = false;
    for (const preset of library.presetForExistingImages(activeRoleRecipe, imageItems.length)) {
      const image = imageItems[preset.slot - 1];
      if (!image || image.visualReuseRolesManual) continue;
      image.visualReuseRoles = normalizeVisualReuseRoles(preset.roles);
      image.visualReuseRole = "";
      image.visualReuseRolesManual = image.visualReuseRoles.length > 0;
      image.visualReuseConflictAcknowledged = "";
      changed = true;
    }
    return changed;
  }

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
    feedback.hidden = false;
    setStatus(message);
    clearTimeout(notice.timer);
    notice.timer = setTimeout(() => { feedback.textContent = ""; feedback.hidden = true; }, 3500);
  }
  function button(label, className, action) {
    const node = document.createElement("button");
    node.type = "button";
    node.className = className;
    node.textContent = label;
    node.addEventListener("click", (event) => { event.stopPropagation(); action(); });
    return node;
  }
  function imageFor(item, detail = false) {
    const img = document.createElement("img");
    if (item.sourceType === "user") {
      const epoch = previewEpoch;
      const cached = previewUrls.get(item.previewStoreId);
      if (cached) img.src = cached;
      else AssetFlowUserRecipes.getPreview(item.previewStoreId).then((record) => {
        if (!record?.blob) throw new Error("Preview 缺失");
        if (epoch !== previewEpoch || !img.isConnected) return;
        let url = previewUrls.get(item.previewStoreId);
        if (!url) { url = URL.createObjectURL(record.blob); previewUrls.set(item.previewStoreId, url); }
        img.src = url;
      }).catch(() => { if (img.isConnected) img.dispatchEvent(new Event("error")); });
    } else img.src = detail ? item.preview : item.thumbnail;
    img.alt = item.name + "预览";
    img.loading = "lazy";
    return img;
  }
  function roleSummary(item) {
    return (item.references || item.rolePreset || []).map((entry) =>
      "图" + entry.slot + " → " + (entry.roles || [entry.role]).map((role) => visualReuseRoleMeta(role).label).join("＋") + (entry.required === false ? "（可选）" : "（必需）")).join(" · ");
  }
  function actionsFor(item, detail = false) {
    const actions = document.createElement("div");
    actions.className = "template-card-actions";
    if (item.type === "prompt_recipe") {
      actions.append(button("复制 Prompt", "template-copy-btn", () => copy(item)),
        button(item.status === "testing" ? "测试应用" : detail ? "应用到输入框" : "应用", "template-use-btn", () => requestUse(item)));
    } else {
      actions.append(button(item.status === "testing" ? "测试使用方案" : "使用方案", "template-use-btn", () => requestUse(item)));
    }
    return actions;
  }
  function clearPreviewUrls() {
    previewEpoch += 1;
    for (const url of previewUrls.values()) URL.revokeObjectURL(url);
    previewUrls.clear();
  }
  async function refresh() {
    const sequence = ++refreshSequence;
    const data = await library.load();
    if (sequence !== refreshSequence) return;
    items = data;
    clearPreviewUrls();
    renderList();
    renderQuick();
    if (selectedId) {
      const current = items.find((item) => item.id === selectedId);
      if (current) showPreview(current);
      else returnToList();
    }
  }
  function manageMenu(item) {
    const menu = document.createElement("details");
    menu.className = "template-manage";
    const toggle = document.createElement("summary");
    toggle.textContent = "•••";
    toggle.setAttribute("aria-label", "管理方案：" + item.name);
    const actions = document.createElement("div");
    actions.className = "template-manage-actions";
    for (const [label, action] of [["重命名", () => editUserRecipe(item, "rename")],
      ["编辑", () => editUserRecipe(item, "edit")], ["删除", () => confirmDelete(item)]]) {
      actions.append(button(label, "template-copy-btn", () => { menu.open = false; action(); }));
    }
    menu.addEventListener("click", (event) => event.stopPropagation());
    menu.append(toggle, actions);
    return menu;
  }
  function editUserRecipe(item, mode) {
    if (item.sourceType !== "user") return;
    AssetFlowRecipeEditor.open({ recipe: item, mode, onSave: async (edits) => {
      await AssetFlowUserRecipes.updateUserRecipe(item.id, edits);
      await refresh();
      notice("方案已更新");
    } });
  }
  function confirmDelete(item) {
    if (item.sourceType !== "user") return;
    ask("删除方案", "确认删除“" + item.name + "”？", [
      ["删除方案", async () => {
        const buttons = [...confirmActions.querySelectorAll("button")];
        buttons.forEach((node) => { node.disabled = true; });
        try {
          await AssetFlowUserRecipes.deleteUserRecipe(item.id);
          if (activeRoleRecipe?.id === item.id) activeRoleRecipe = null;
          await refresh();
          closeConfirm();
          notice("方案已删除");
        } catch (error) {
          confirmText.textContent = error.message || "删除失败，请重试。";
          buttons.forEach((node) => { node.disabled = false; });
        }
      }, true], ["取消", closeConfirm, false]
    ]);
  }
  function validateReferences(count) {
    if (!activeRoleRecipe || count >= library.requiredImageCount(activeRoleRecipe)) return true;
    setStatus("该方案需要 " + library.requiredImageCount(activeRoleRecipe) + " 张参考图：" + roleSummary(activeRoleRecipe));
    setVisualReusePanelOpen(true);
    return false;
  }
  function recipeInstruction() {
    if (activeRoleRecipe?.sourceType !== "user") return "";
    return "\n用户保存的方案约束（基于本次新参考图重新分析）：\n" + JSON.stringify({
      preserve: activeRoleRecipe.preserve, change: activeRoleRecipe.change,
      textStrategy: activeRoleRecipe.textStrategy
    });
  }
  function applyRecipeConstraints(plan) {
    if (activeRoleRecipe?.sourceType !== "user") return;
    plan.analysis.inheritedTraits = [...new Set([...plan.analysis.inheritedTraits, ...activeRoleRecipe.preserve])];
    plan.analysis.changedTraits = [...new Set([...plan.analysis.changedTraits, ...activeRoleRecipe.change])];
  }
  function renderQuick() {
    quick.replaceChildren();
    const current = mode();
    for (const id of preferred[current] || preferred.text) {
      const item = items.find((entry) => entry.id === id
        && entry.type === (current === "reuse" ? "visual_recipe" : "prompt_recipe")
        && library.PUBLIC_STATUSES.has(entry.status));
      if (item) quick.append(button(item.name, "template-quick-chip", () => requestUse(item)));
    }
    document.querySelector("#templateQuick").hidden = !quick.childElementCount;
  }
  const variableNames = {
    subject: "主体", ratio: "比例", focus: "焦点", light: "光线",
    scene: "场景", style: "风格", clothing: "服饰", era: "年代",
    location: "地点", landmark: "地标", title: "标题", product: "产品",
    color: "颜色", feature: "卖点", accessory: "配件", items: "物品",
    interest: "兴趣", components: "部件", material: "材质", background: "背景"
  };
  function availableItems() {
    return items.filter((item) => item.type === type
      && (research ? ["candidate", "testing"].includes(item.status)
        : library.PUBLIC_STATUSES.has(item.status) || item.status === "personal")
      && (!sourceType || type !== "visual_recipe" || (item.sourceType || "builtin") === sourceType));
  }
  function returnToList() {
    const previous = [...list.querySelectorAll(".template-card")]
      .find((card) => card.dataset.recipeId === selectedId);
    preview.hidden = true;
    browse.hidden = false;
    selectedId = "";
    if (previous) previous.focus(); else search.focus();
  }
  function renderCategories() {
    categories.replaceChildren();
    const options = ["", ...new Set(availableItems().map((item) => item.category))];
    if (category && !options.includes(category)) category = "";
    for (const value of options) {
      const choice = button(value || "全部", "", () => { category = value; renderList(); });
      choice.setAttribute("aria-pressed", value === category ? "true" : "false");
      categories.append(choice);
    }
  }
  function renderTags() {
    tags.replaceChildren();
    const options = ["", ...new Set(availableItems().flatMap((item) => item.tags || []))];
    if (tag && !options.includes(tag)) tag = "";
    for (const value of options) {
      const choice = button(value || "全部标签", "", () => { tag = value; renderList(); });
      choice.setAttribute("aria-pressed", value === tag ? "true" : "false");
      tags.append(choice);
    }
    filterButton.textContent = tag ? "筛选 · " + tag + " ▾" : "筛选 ▾";
    filterButton.setAttribute("aria-expanded", String(!tags.hidden));
  }
  function cardImage(item) {
    const media = document.createElement("div");
    media.className = "template-card-media";
    if (item.thumbnail || item.previewStoreId) {
      const img = imageFor(item);
      img.addEventListener("error", () => {
        media.textContent = "Preview 生成中";
        media.classList.add("is-missing");
      }, { once: true });
      media.append(img);
    } else {
      media.textContent = "Preview 生成中";
      media.classList.add("is-missing");
    }
    return media;
  }
  function renderList() {
    typeButtons.forEach((node) =>
      node.setAttribute("aria-pressed", node.dataset.templateType === type ? "true" : "false"));
    const sources = document.querySelector("#templateSources");
    sources.hidden = type !== "visual_recipe" || research;
    sources.querySelectorAll("button").forEach((node) => node.setAttribute("aria-pressed", String(node.dataset.recipeSource === sourceType)));
    renderCategories();
    renderTags();
    const active = availableItems();
    const publicCount = items.filter((item) => item.type === type && library.PUBLIC_STATUSES.has(item.status)).length;
    const studyCount = items.filter((item) => item.type === type && ["candidate", "testing"].includes(item.status)).length;
    const personalCount = items.filter((item) => item.type === type && item.sourceType === "user").length;
    modeLabel.textContent = research
      ? studyCount + " 个研究案例 · 测试中与待验证"
      : publicCount + (type === "prompt_recipe" ? " 个玩法" : " 个方案") + " · " + publicCount + " 已验证" + (type === "visual_recipe" ? " · " + personalCount + " 我的方案" : "");
    if (!research && type === "visual_recipe" && sourceType === "user") modeLabel.textContent = personalCount + " 个我的方案";
    researchButton.textContent = research ? "← 返回正式库" : "案例研究 " + studyCount + " →";
    researchButton.setAttribute("aria-label", research ? "返回正式灵感库" : "查看案例研究，共 " + studyCount + " 项");
    list.replaceChildren();
    const query = search.value.trim().toLocaleLowerCase();
    const results = active.filter((item) => (!category || item.category === category)
      && (!tag || (item.tags || []).includes(tag))
      && (!query || [item.name, item.summary, item.description, item.category, item.goal, item.output,
        ...(item.tags || [])].join(" ").toLocaleLowerCase().includes(query)));
    if (!results.length) {
      const empty = document.createElement("p");
      empty.className = "template-empty";
      empty.textContent = !items.length ? "正在加载方案…" : research
        ? "当前筛选下没有研究案例。" : sourceType === "user" ? "还没有匹配的个人方案。可从生成结果 Viewer 保存为方案。" : "当前筛选下没有匹配方案。";
      list.append(empty);
      return;
    }
    const masonry = document.createElement("div");
    masonry.className = "template-masonry" + (results.length <= 2 ? " is-sparse" : "");
    for (const item of results) {
      const card = document.createElement("article");
      card.className = "template-card" + (research ? " is-research" : "");
      card.tabIndex = 0;
      card.dataset.recipeId = item.id;
      card.setAttribute("aria-label", "查看方案：" + item.name);
      card.addEventListener("click", () => showPreview(item));
      card.addEventListener("keydown", (event) => {
        if (event.target === card && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); showPreview(item); }
      });
      const body = document.createElement("div");
      body.className = "template-card-body";
      const name = document.createElement("h3");
      name.textContent = item.name;
      const summary = document.createElement("p");
      summary.textContent = item.summary || item.description;
      const chipRow = document.createElement("div");
      chipRow.className = "template-card-tags";
      for (const value of (item.tags || []).slice(0, 3)) {
        const chip = document.createElement("span");
        chip.textContent = value;
        chipRow.append(chip);
      }
      body.append(name, summary, chipRow);
      if (item.sourceType === "user") {
        const badge = document.createElement("small");
        badge.className = "template-personal-badge";
        badge.textContent = "我的方案";
        body.prepend(badge);
        card.append(manageMenu(item));
      }
      if (research) {
        const state = document.createElement("small");
        state.className = "template-research-state";
        state.textContent = item.status === "testing" ? "测试中 · 可试用" : "候选 · 待验证";
        body.append(state);
        if (isUsable(item)) body.append(actionsFor(item));
      } else body.append(actionsFor(item));
      card.append(cardImage(item), body);
      masonry.append(card);
    }
    list.append(masonry);
  }
  function section(title, className = "") {
    const node = document.createElement("section");
    node.className = "template-detail-section" + (className ? " " + className : "");
    const heading = document.createElement("h4");
    heading.textContent = title;
    node.append(heading);
    return node;
  }
  function addSource(item) {
    if (!item.source) return;
    const block = section("参考来源", "template-detail-source");
    const by = document.createElement(item.source.url ? "a" : "p");
    if (item.source.url) {
      by.href = item.source.url;
      by.target = "_blank";
      by.rel = "noopener noreferrer";
    }
    by.textContent = item.source.author + (item.source.platform && item.source.platform !== "internal"
      ? " · " + item.source.platform.toUpperCase() : "");
    block.append(by);
    if (item.source.notes) {
      const notes = document.createElement("p");
      notes.textContent = item.source.notes;
      block.append(notes);
    }
    if (item.source.author !== "opensource-works" && String(item.source.url || "").includes("opensource-works")) {
      const indexed = document.createElement("p");
      indexed.textContent = "经 opensource-works 索引";
      block.append(indexed);
    }
    const date = document.createElement("p");
    date.textContent = item.source.checkedAt;
    block.append(date);
    preview.append(block);
  }
  function addSimilar(item) {
    const peers = items.filter((candidate) => candidate.id !== item.id && candidate.status !== "deprecated")
      .map((candidate) => ({
        item: candidate,
        score: (candidate.category === item.category ? 3 : 0)
          + (candidate.tags || []).filter((value) => (item.tags || []).includes(value)).length
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score
        || Number(library.PUBLIC_STATUSES.has(b.item.status)) - Number(library.PUBLIC_STATUSES.has(a.item.status)))
      .slice(0, 4);
    if (!peers.length) return;
    const block = section("相似玩法", "template-detail-similar");
    const row = document.createElement("div");
    row.className = "template-similar-list";
    for (const { item: peer } of peers) {
      const isResearch = !library.PUBLIC_STATUSES.has(peer.status) && peer.sourceType !== "user";
      const choice = button((isResearch ? "案例研究 · " : "") + peer.name, "template-similar-card", () => {
        if (peer.type !== type || isResearch !== research) {
          type = peer.type;
          research = isResearch;
          category = "";
          tag = "";
          search.value = "";
          renderList();
        }
        showPreview(peer);
      });
      if (peer.thumbnail || peer.previewStoreId) choice.prepend(imageFor(peer));
      row.append(choice);
    }
    block.append(row);
    preview.append(block);
  }
  function showPreview(item) {
    selectedId = item.id;
    preview.replaceChildren();
    const head = document.createElement("div");
    head.className = "template-preview-head";
    head.append(button("← 返回列表", "template-back-btn", returnToList));
    preview.append(head);
    if (item.sourceType === "user") head.append(manageMenu(item));
    if (item.preview || item.previewStoreId) {
      const img = imageFor(item, true);
      img.className = "template-detail-image";
      img.addEventListener("error", () => {
        img.replaceWith(Object.assign(document.createElement("p"), {
          className: "template-detail-image-missing", textContent: "Preview 暂不可用"
        }));
      }, { once: true });
      preview.append(img);
    } else {
      const missing = document.createElement("p");
      missing.className = "template-detail-image-missing";
      missing.textContent = "Preview 生成中";
      preview.append(missing);
    }
    const intro = document.createElement("div");
    intro.className = "template-detail-intro";
    const name = document.createElement("h3");
    name.textContent = item.name;
    const summary = document.createElement("p");
    summary.textContent = item.summary || item.description;
    const tagLine = document.createElement("p");
    tagLine.className = "template-preview-tags";
    tagLine.textContent = (item.tags || []).join(" · ");
    intro.append(name, summary, tagLine);
    if (item.sourceType === "user") {
      const badge = document.createElement("p");
      badge.className = "template-personal-badge";
      badge.textContent = "我的方案";
      intro.insertBefore(badge, summary);
    }
    preview.append(intro);
    if (item.type === "prompt_recipe") {
      const block = section("Prompt", "template-detail-prompt");
      const content = document.createElement("pre");
      content.textContent = textFor(item);
      block.append(content);
      preview.append(block);
      const vars = section("可替换变量", "template-detail-variables");
      const labels = document.createElement("p");
      labels.textContent = (item.variables || []).map((key) => variableNames[key] || key).join(" · ");
      vars.append(labels);
      preview.append(vars);
    } else {
      const overview = section("方案说明", "template-detail-overview");
      const output = document.createElement("p");
      output.textContent = "目标输出：" + (item.output || item.goal || item.summary);
      overview.append(output);
      preview.append(overview);
      const roles = section("参考结构", "template-detail-roles");
      for (const entry of item.references || item.rolePreset || []) {
        const line = document.createElement("p");
        line.textContent = "图" + entry.slot + " → " + (entry.roles || [entry.role]).map((role) => visualReuseRoleMeta(role).label).join("＋")
          + (entry.required === false ? "（可选）" : "");
        roles.append(line);
      }
      preview.append(roles);
      const strategy = section("复用边界", "template-detail-strategy");
      for (const [label, values] of [["保持", item.preserve || item.strategy?.keep || []],
        ["改变", item.change || item.strategy?.change || []]]) {
        const line = document.createElement("p");
        line.textContent = label + " · " + values.join("、");
        strategy.append(line);
      }
      preview.append(strategy);
      const goal = section("核心需求", "template-detail-goal");
      const goalText = document.createElement("p");
      goalText.textContent = textFor(item);
      goal.append(goalText);
      preview.append(goal);
    }
    if (isUsable(item)) {
      const actions = actionsFor(item, true);
      actions.classList.add("template-detail-actions");
      preview.append(actions);
      if (item.status === "testing") {
        const status = section("验证进度", "template-detail-status");
        const note = document.createElement("p");
        note.textContent = "测试中 · 可试用，尚未通过完整生成验证";
        status.append(note);
        preview.append(status);
      }
    } else {
      const status = section("验证进度", "template-detail-status");
      const note = document.createElement("p");
      note.textContent = item.status === "testing" ? "测试中 · 可试用" : "候选 · 待验证";
      status.append(note);
      if (item.validation?.result) {
        const result = document.createElement("p");
        result.textContent = item.validation.result;
        status.append(result);
      }
      preview.append(status);
    }
    addSource(item);
    addSimilar(item);
    browse.hidden = true;
    preview.hidden = false;
    preview.scrollTop = 0;
    head.querySelector("button")?.focus();
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
    if (!isUsable(item)) return;
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
    let modelWarning = "";
    const nextText = textFor(item);
    const value = how === "append" && existing ? existing + "\n\n" + nextText : nextText;
    if (item.type === "visual_recipe") {
      setPromptMethod("reuse");
      setVisualReusePanelOpen(true);
      activeRoleRecipe = roleChoice === "apply" || !imageItems.length ? item : null;
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
      if (applyPendingRoles()) renderImageStack();
      if (item.sourceType === "user" && activeRoleRecipe) {
        const context = item.generationContext;
        const model = [...nodes.modelSelect.options].find((option) => !option.hidden && !option.disabled
          && (option.value === context.modelValue || option.text === context.model));
        restoreContinuationOptions({ ...context, modelValue: model?.value || "__unavailable__", model: model?.text || "__unavailable__" }, {});
        if (!model) modelWarning = "原模型不可用，已保留当前可选模型。";
        restoreContinuationReuseOptions(context);
      }
      nodes.visualReuseNotes.value = value;
      nodes.visualReuseNotes.dispatchEvent(new Event("input", { bubbles: true }));
      saveWorkspaceState();
      closeConfirm();
      close();
      nodes.visualReuseNotes.focus();
      const missing = Math.max(0, library.requiredImageCount(item) - imageItems.length);
      notice(modelWarning + (missing
        ? "该方案需要 " + library.requiredImageCount(item) + " 张参考图：" + roleSummary(item) + "。请补充 " + missing + " 张后查看方案。"
        : "已填入方案与角色。确认后点击“查看方案”建立 ReusePlan。"));
    } else {
      activeRoleRecipe = null;
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
    if (!isUsable(item)) return;
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
    browse.hidden = !preview.hidden;
    renderList();
    search.focus();
    refresh().catch((error) => { list.textContent = error.message || "灵感库加载失败。"; });
  }
  function close() {
    closeConfirm();
    preview.hidden = true;
    browse.hidden = false;
    selectedId = "";
    clearPreviewUrls();
    drawer.hidden = true;
    scrim.hidden = true;
    lastFocus?.focus?.();
  }
  document.querySelectorAll("[data-recipe-source]").forEach((node) => node.addEventListener("click", () => {
    sourceType = node.dataset.recipeSource;
    category = ""; tag = ""; renderList();
  }));
  window.addEventListener("assetflow-recipes-changed", () => { if (!drawer.hidden) refresh().catch((error) => notice(error.message)); });
  window.chrome?.storage?.onChanged?.addListener((changes, area) => {
    if (area === "local" && changes.assetflowUserRecipesChangedAt && !drawer.hidden) refresh().catch((error) => notice(error.message));
  });
  filterButton.addEventListener("click", () => {
    tags.hidden = !tags.hidden;
    filterButton.setAttribute("aria-expanded", String(!tags.hidden));
  });
  researchButton.addEventListener("click", () => {
    research = !research;
    sourceType = "";
    category = "";
    tag = "";
    tags.hidden = true;
    search.value = "";
    renderList();
    list.scrollTop = 0;
  });
  function onModeChange() {
    if (mode() !== "reuse") activeRoleRecipe = null;
    document.querySelector("#templateInputTitle").textContent = mode() === "image" ? "编辑需求" : "提示词";
    renderQuick();
    if (!drawer.hidden) {
      returnToList();
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
    tag = "";
    returnToList();
    localStorage.setItem(typeKey, type);
    renderList();
  }));
  drawer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      if (!confirmBox.hidden) closeConfirm();
      else if (!preview.hidden) returnToList();
      else close();
    }
    if (event.key === "Tab" && !confirmBox.hidden) {
      const buttons = [...confirmActions.querySelectorAll("button")];
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.AssetFlowTemplateUI = { onModeChange, open, close, refresh, applyPendingRoles, validateReferences, recipeInstruction, applyRecipeConstraints };
  onModeChange();
  library.load().then((data) => { items = data; renderQuick(); }).catch(() => {
    document.querySelector("#templateQuick").hidden = true;
  });
})();
