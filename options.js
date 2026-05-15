const STORAGE_KEY = "customPlatforms";

const nodes = {
  nameInput: document.querySelector("#nameInput"),
  linkInput: document.querySelector("#linkInput"),
  apiInput: document.querySelector("#apiInput"),
  saveBtn: document.querySelector("#saveBtn"),
  platformList: document.querySelector("#platformList")
};

let customPlatforms = [];

function canUseStorage() {
  return Boolean(globalThis.chrome?.storage?.sync);
}

async function load() {
  if (!canUseStorage()) {
    const raw = localStorage.getItem(STORAGE_KEY);
    customPlatforms = raw ? JSON.parse(raw) : [];
    render();
    return;
  }

  const result = await chrome.storage.sync.get({ [STORAGE_KEY]: [] });
  customPlatforms = result[STORAGE_KEY];
  render();
}

async function saveAll() {
  if (!canUseStorage()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customPlatforms));
    render();
    return;
  }

  await chrome.storage.sync.set({ [STORAGE_KEY]: customPlatforms });
  render();
}

function render() {
  nodes.platformList.innerHTML = "";

  if (!customPlatforms.length) {
    nodes.platformList.textContent = "还没有自定义模板。";
    return;
  }

  customPlatforms.forEach((platform) => {
    const item = document.createElement("article");
    item.className = "platform-item";

    const top = document.createElement("div");
    top.className = "row";

    const title = document.createElement("strong");
    title.textContent = platform.name;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "删除";
    remove.addEventListener("click", async () => {
      customPlatforms = customPlatforms.filter((item) => item.id !== platform.id);
      await saveAll();
    });

    const link = document.createElement("code");
    link.textContent = platform.linkTemplate || "无链接模板";

    const api = document.createElement("code");
    api.textContent = platform.apiTemplate || "无 API 模板";

    top.append(title, remove);
    item.append(top, link, api);
    nodes.platformList.append(item);
  });
}

nodes.saveBtn.addEventListener("click", async () => {
  const name = nodes.nameInput.value.trim();
  const linkTemplate = nodes.linkInput.value.trim();
  const apiTemplate = nodes.apiInput.value.trim();

  if (!name || (!linkTemplate && !apiTemplate)) {
    nodes.nameInput.focus();
    return;
  }

  customPlatforms = [
    ...customPlatforms,
    {
      id: crypto.randomUUID(),
      name,
      linkTemplate,
      apiTemplate
    }
  ];

  nodes.nameInput.value = "";
  nodes.linkInput.value = "";
  nodes.apiInput.value = "";
  await saveAll();
});

load();
