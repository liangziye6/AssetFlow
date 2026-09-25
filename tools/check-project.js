"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function checkJavaScriptSyntax(relativePath) {
  new vm.Script(read(relativePath), { filename: relativePath });
}

[
  "background.js",
  "content.js",
  "options.js",
  "package-extension.js",
  "popup.js",
  "preview-server.js",
  "reuse-plan.js",
  "template-library.js",
  "template-library-ui.js",
  "soft-aurora.js"
].forEach(checkJavaScriptSyntax);

const manifest = JSON.parse(read("manifest.json"));
const packageJson = JSON.parse(read("package.json"));
assert.strictEqual(manifest.version, packageJson.version, "manifest 与 package 版本号必须一致");
assert.match(manifest.name, /^AssetFlow\b/, "manifest 产品名必须是 AssetFlow");
assert.strictEqual(packageJson.name, "assetflow", "package 产品名必须是 assetflow");

const popupHtml = read("popup.html");
const popupCss = read("popup.css");
const templateCss = read("template-library.css");
const templateData = JSON.parse(read("templates/templates.json"));
const TemplateLibrary = require(path.join(root, "template-library.js"));
const softAurora = read("soft-aurora.js");
const packageExtension = read("package-extension.js");
const popupJs = read("popup.js");
const backgroundJs = read("background.js");
const previewServer = read("preview-server.js");
assert.match(popupHtml, /soft-aurora\.js[\s\S]*reuse-plan\.js[\s\S]*template-library\.js[\s\S]*popup\.js[\s\S]*template-library-ui\.js/, "模板模块必须按依赖顺序加载");
assert.match(popupHtml, /template-library\.css/, "模板库样式必须加载");
assert.strictEqual(templateData.length, 22, "v1.9.15 首批模板应有 22 个");
assert.deepStrictEqual(templateData.reduce((count, item) => { count[item.category] = (count[item.category] || 0) + 1; return count; }, {}), { scene: 8, play: 8, structure: 6 });
TemplateLibrary.validateTemplates(templateData);
for (const item of templateData) {
  assert.match(item.thumbnail, /\.webp$/, "模板缩略图应优先使用 WebP");
  const image = fs.readFileSync(path.join(root, item.thumbnail));
  assert.strictEqual(image.toString("ascii", 0, 4), "RIFF", "WebP 文件头无效：" + item.id);
  assert.strictEqual(image.toString("ascii", 8, 12), "WEBP", "WebP 格式无效：" + item.id);
}
assert.strictEqual(TemplateLibrary.filter(templateData, { mode: "text", query: "漫画" }).length, 1);
assert.ok(TemplateLibrary.filter(templateData, { mode: "image" }).some((item) => item.id === "keep-subject-scene"));
assert.ok(!TemplateLibrary.filter(templateData, { mode: "text" }).some((item) => item.id === "keep-subject-scene"));
assert.match(TemplateLibrary.resolveText(templateData[0], { ratio: "3:4" }), /3:4/);
assert.strictEqual(TemplateLibrary.presetForExistingImages(templateData.find((item) => item.id === "reuse-three-poster"), 2).length, 2);
assert.match(templateCss, /\.template-drawer/, "模板库抽屉样式必须存在");
assert.match(popupHtml, /soft-aurora\.js[\s\S]*reuse-plan\.js[\s\S]*popup\.js/, "Soft Aurora 与 ReusePlan 必须在 popup.js 之前加载");
assert.match(popupHtml, /reuse-plan\.js[\s\S]*popup\.js/, "ReusePlan 必须在 popup.js 之前加载");
assert.match(popupHtml, /id="heroTitleText"[^>]*hidden>AssetFlow<\/span><img id="heroWordmark"[^>]*src="assets\/logo-wordmark.png"/, "首页必须使用新字标并保留可访问标题");
assert.match(popupHtml, /rel="icon"[^>]*href="assets\/icon-32.png"/, "预览页 favicon 应使用新图标");
assert.match(popupHtml, /id="apiTabs"[\s\S]*data-api-tab="prompt"[\s\S]*data-api-tab="image"[\s\S]*data-api-tab="custom"[\s\S]*data-api-tab="eagle"/, "API 页面必须提供四个独立配置页签");
assert.match(popupHtml, /id="apiPromptSection"[\s\S]*id="apiImageSection"[\s\S]*id="apiCustomSection"[\s\S]*id="apiEagleSection"/, "API 页面必须按源码拆分四个内容面板");
assert.match(popupJs, /function setApiView\(isOpen\)[\s\S]*API 接入[\s\S]*HOME_HERO_TITLE/, "设置开关必须联动切换 Hero 标题并能返回首页");
assert.match(popupJs, /function setApiTab\(tabName\)[\s\S]*apiTabIndicator/, "API 页签与选中指示器必须真实联动");
assert.match(popupCss, /\.app-shell\.is-api-view \.api-panel[\s\S]*background:\s*#16131e/, "API 页面必须使用参考源码的紫黑面板色");
assert.match(popupHtml, /class="secret-toggle"[\s\S]*<svg[\s\S]*<circle cx="12" cy="12" r="3"/, "API Key 显隐按钮必须使用源码眼睛图标");
assert.match(popupHtml, /class="api-managed-hint-icon"[\s\S]*<circle cx="12" cy="12" r="10"/, "自定义服务商提示必须使用源码信息图标");
assert.match(popupHtml, /class="custom-provider-add"[\s\S]*<path d="M12 5v14"/, "添加服务商必须使用源码加号图标");
assert.match(popupJs, /function providerActionIcon\(iconName\)[\s\S]*delete:[\s\S]*M3 6h18/, "服务商操作按钮必须包含源码删除图标");
assert.doesNotMatch(popupHtml, /top-brand-copy/, "左上角品牌文案必须移除");
assert.match(popupHtml, /id="generationModeNav"[\s\S]*id="generationWorkspace"/, "生成模式导航必须独立于工作区");
assert.doesNotMatch(popupHtml, /prompt-mode-tabs/, "生成模式不得继续嵌在提示词模块中");
assert.match(popupHtml, /id="textToImageModeBtn"[\s\S]*<svg[\s\S]*文生图/, "文生图模式必须包含图标");
assert.match(popupHtml, /id="imageToImageModeBtn"[\s\S]*<svg[\s\S]*图生图/, "图生图模式必须包含图标");
assert.match(popupHtml, /id="visualReuseBtn"[\s\S]*<svg[\s\S]*视觉复用/, "视觉复用模式必须包含图标");
assert.match(popupHtml, /class="model-active-dot"/, "模型选择器必须包含选中状态光点");
assert.match(popupHtml, /id="clearPromptBtn"[\s\S]*<svg/, "提示词框必须包含清空图标");
assert.match(popupHtml, /id="copyPromptBtn"[\s\S]*<svg/, "提示词框必须包含复制图标");
assert.match(popupHtml, /id="statusAlert"[\s\S]*id="statusActionBtn"/, "错误提示必须使用结构化卡片");
assert.match(popupHtml, /id="reversePromptBtn"[\s\S]*<svg[\s\S]*反推提示词/, "反推提示词按钮必须使用参考源码的回转图标");
assert.match(popupHtml, /id="visualReusePlanBtn"[^>]*>查看方案</, "必须保留查看方案入口");
assert.match(popupHtml, /id="visualReuseNotes"[^>]*required/, "核心需求必须是必填项");
assert.doesNotMatch(popupCss, /home-bg-(?:portrait|wide)/, "旧背景图片不得继续被 CSS 引用");
assert.doesNotMatch(popupCss, /\.hero::after/, "Hero 不得保留旧的深色遮罩");
assert.match(popupCss, /\.hero h1::before/, "标题光效必须直接锚定到 AssetFlow 标题");
assert.match(popupCss, /\.reference-upload-panel \.visual-reuse-role-editor\s*\{[\s\S]*?display:\s*none[\s\S]*?\.drop-zone\.is-reuse-mode \.visual-reuse-role-editor\s*\{[\s\S]*?display:\s*block/, "参考图角色编辑器必须只在视觉复用模式显示");
assert.match(popupCss, /\.drop-zone:not\(\.is-reuse-mode\) \.image-thumb\s*\{[\s\S]*?aspect-ratio:\s*4\s*\/\s*3[\s\S]*?\.drop-zone:not\(\.is-reuse-mode\) \.reference-card-close\s*\{[\s\S]*?position:\s*relative/, "文生图与图生图参考卡必须使用无标签 4:3 卡片和悬浮删除按钮");
assert.match(popupCss, /\.drop-zone:not\(\.is-reuse-mode\)\.has-image\.is-multi-image \.image-stack\s*\{[\s\S]*?grid-auto-rows:\s*auto/, "无标签四宫格必须按图片比例自适应行高");
assert.match(popupJs, /nodes\.imageName\.textContent\s*=\s*`\$\{imageItems\.length\} 张图片`/, "无标签参考图底栏必须显示图片数量");
assert.match(softAurora, /speed:\s*1\.2/, "Soft Aurora speed 必须使用任务配置");
assert.match(softAurora, /color1:\s*"#9700ff"/, "Soft Aurora color1 必须使用任务配置");
assert.match(softAurora, /color2:\s*"#5200ff"/, "Soft Aurora color2 必须使用任务配置");
assert.match(softAurora, /mouseInfluence:\s*0\.1/, "Soft Aurora 鼠标影响参数必须使用任务配置");
assert.match(softAurora, /bandAnchorSelector:\s*"\.hero h1"/, "Soft Aurora 主光带必须锚定标题");
assert.match(softAurora, /function syncBandPosition\(\)/, "Soft Aurora 必须动态同步主光带位置");
assert.match(packageExtension, /legacyBuildDirs[\s\S]*lyz-assetflow[\s\S]*image-prompt-builder/, "打包必须同步全部旧版加载目录");
assert.match(popupJs, /prompt\.provider === "aliyun"[\s\S]*qwenInlineImageDataUrl/, "千问反推必须先把参考图转换为 Base64");
assert.match(popupJs, /Download multimodal file timed out/, "千问远程图片下载超时必须显示可操作提示");
assert.match(previewServer, /\/__assetflow\/image-proxy/, "本地预览必须提供受限图片读取代理");
assert.match(popupHtml, /runninghub-rhart-image-g-2-official[\s\S]*RunningHub 全能图片G-2 官方稳定版/, "模型列表必须包含 RunningHub 官方稳定版");
assert.match(popupHtml, /option value="official">官方稳定版（Standard-API，quality: low）/, "RunningHub 接口模式必须包含 quality low 的官方稳定版");
assert.match(popupJs, /\/openapi\/v2\/rhart-image-g-2-official\/text-to-image/, "RunningHub 官方稳定版必须配置文生图路径");
assert.match(popupJs, /\/openapi\/v2\/rhart-image-g-2-official\/image-to-image/, "RunningHub 官方稳定版必须配置图生图路径");
assert.match(popupJs, /quality:\s*isOfficial\s*\?\s*"low"\s*:\s*"medium"/, "RunningHub 官方稳定版必须默认使用 quality low");
assert.match(backgroundJs, /runningHubApiModeOfficial[\s\S]*isStandardApi/, "后台任务恢复必须识别 RunningHub 官方稳定版");
assert.match(popupHtml, /id="customProviderForm"[\s\S]*id="customProviderName"[\s\S]*id="customProviderBaseUrl"[\s\S]*id="customProviderModel"/, "必须提供可编辑的自定义 API 服务商表单");
assert.match(popupHtml, /value="gpt-image-1" data-legacy-option="true" hidden[\s\S]*value="gpt-image-2" data-legacy-option="true" hidden/, "无实际默认作用的 GPT Image 选项必须从新选择列表隐藏");
assert.match(popupJs, /\.filter\(\(option\) => !option\.hidden \|\| option\.selected\)/, "快捷模型菜单必须按当前服务商显示模型，同时允许当前选中项继续显示");
assert.match(popupJs, /CUSTOM_API_PROVIDERS_STORAGE_KEY[\s\S]*saveCustomApiProviders[\s\S]*loadCustomApiProviders/, "自定义 API 服务商必须持久化");
assert.match(popupJs, /providerId:\s*promptCustomProvider[\s\S]*providerId:\s*imageCustomProvider/, "自定义服务商必须进入真实 API 配置");
assert.match(popupJs, /customProviderFromModelValue[\s\S]*applyCustomApiProvider/, "自定义生图服务商必须能从模型选择器直接应用");
assert.match(popupJs, /根据上传图片进行分析[\s\S]*提示词需含以下信息[\s\S]*请直接输出最终提示词，不要解释分析过程/, "反推提示词必须使用节省 token 的直接输出模板");
assert.match(popupJs, /你是专业的视觉生成提示词编译器[\s\S]*max_tokens:\s*1200/, "火山引擎二阶段编译必须使用节省模式");
assert.match(popupJs, /function selectResolutionTier\(resolution\)[\s\S]*activeResolution[\s\S]*nodes\.sizeMode\.dispatchEvent[\s\S]*setSizeMenuOpen\(true\)/, "分辨率切换后尺寸菜单必须保持展开");
assert.match(popupJs, /function selectAspectRatio\(mode\)[\s\S]*activeResolution[\s\S]*nodes\.sizeMode\.dispatchEvent[\s\S]*setSizeMenuOpen\(true\)/, "比例切换后尺寸菜单必须保持展开");
assert.doesNotMatch(popupJs, /目标尺寸已变化，请重新查看复用方案/, "尺寸变化不得清空已建立的 ReusePlan");
assert.match(popupJs, /function adaptReusePlanToCurrentCanvas\(planInput\)[\s\S]*compileReusePlanToPrompt/, "尺寸变化必须就地更新并重新编译 ReusePlan");

function pngDimensions(relativePath) {
  const data = fs.readFileSync(path.join(root, relativePath));
  assert.strictEqual(data.toString("ascii", 1, 4), "PNG", `${relativePath} 必须是 PNG`);
  return {
    width: data.readUInt32BE(16),
    height: data.readUInt32BE(20)
  };
}

[
  ["assets/logo.png", 512],
  ["assets/icon-16.png", 16],
  ["assets/icon-32.png", 32],
  ["assets/icon-48.png", 48],
  ["assets/icon-128.png", 128]
].forEach(([relativePath, size]) => {
  assert.deepStrictEqual(
    pngDimensions(relativePath),
    { width: size, height: size },
    `${relativePath} 尺寸必须是 ${size} x ${size}`
  );
});

const ReusePlan = require(path.join(root, "reuse-plan.js"));
const draft = ReusePlan.createDraft({
  coreRequirement: "为新品制作竖版发布海报，保留产品主体与蓝紫光感。",
  assetType: "poster",
  reuseMode: "precise_inherit",
  style: "premium",
  textMode: "with-text",
  textContent: "NEW ERA",
  width: 1080,
  height: 1440,
  references: [
    {
      id: "asset-product",
      name: "产品图.png",
      width: 2048,
      height: 2048,
      dimensionsVerified: true,
      assetSource: { kind: "local-file", mimeType: "image/png" },
      roles: ["subject", "style"],
      rolesManual: true,
      strength: "high",
      locked: true
    },
    {
      id: "asset-color",
      name: "氛围图.jpg",
      width: 1600,
      height: 900,
      dimensionsVerified: true,
      assetSource: { kind: "web-url", uri: "https://example.com/reference.jpg" },
      roles: ["color_material"],
      rolesManual: true,
      strength: "medium",
      locked: true
    }
  ]
});

assert.strictEqual(ReusePlan.validate(draft).issues.filter((issue) => issue.severity === "error").length, 0);
const readyPlan = ReusePlan.applyAnalysisResponse(draft, JSON.stringify({
  analysis: {
    summary: "以产品为唯一主体，继承蓝紫光感与竖版留白。",
    imageType: "竖版新品发布海报",
    subject: "新品产品居中陈列",
    action: "产品保持稳定正视角",
    composition: "竖版中心构图，上方预留标题区域",
    layout: "标题位于上方，主体位于中下区域",
    colorLighting: "蓝紫渐变轮廓光",
    materialTexture: "细腻金属与玻璃质感",
    style: "克制的高级商业视觉",
    decoration: "少量辅助光轨",
    inheritedTraits: ["产品轮廓", "蓝紫光感"],
    changedTraits: ["改为竖版海报"],
    negativeConstraints: ["不引入其他主体"]
  },
  textStrategy: {
    mode: "with-text",
    content: "NEW ERA",
    layout: "标题位于画面上方"
  }
}));
const compiled = ReusePlan.compile(readyPlan);
assert.match(compiled.chinese, /画面类型：/);
assert.match(compiled.chinese, /排版文字：[\s\S]*NEW ERA/);
assert.match(compiled.chinese, /避免：/);
assert.strictEqual(compiled.plan.lineage.sourceAssetIds.length, 2);
assert.strictEqual(ReusePlan.lineageSnapshot(compiled.plan).sourceAssets[1].source.kind, "web-url");

const resizedDraft = ReusePlan.createDraft({
  id: readyPlan.id,
  createdAt: readyPlan.createdAt,
  intent: readyPlan.intent,
  references: readyPlan.references,
  canvas: {
    width: 2880,
    height: 3840,
    sizeMode: "3-4",
    resolution: "4k",
    ratioLabel: "3:4 / 4k"
  },
  textStrategy: readyPlan.textStrategy
});
const resizedPlan = {
  ...resizedDraft,
  status: "ready",
  analysis: readyPlan.analysis,
  analysisEn: readyPlan.analysisEn,
  referenceInsights: readyPlan.referenceInsights,
  roleCheck: readyPlan.roleCheck,
  selfCheck: readyPlan.selfCheck,
  lineage: {
    ...readyPlan.lineage,
    sourceAssetIds: resizedDraft.lineage.sourceAssetIds
  }
};
const resizedCompiled = ReusePlan.compile(resizedPlan);
assert.strictEqual(resizedCompiled.plan.canvas.resolution, "4k");
assert.notStrictEqual(resizedCompiled.plan.inputFingerprint, compiled.plan.inputFingerprint);
assert.match(resizedCompiled.chinese, /目标画布 2880 × 3840/);
assert.match(resizedCompiled.chinese, /新品产品居中陈列/);

assert.match(popupHtml, /visual-reuse-primary-options[\s\S]*value="reserve" selected/, "视觉复用文字策略默认后期添加");
assert.match(popupHtml, /<details class="visual-reuse-advanced">[\s\S]*id="visualReuseAssetType"/, "资产用途必须位于高级设置");
assert.match(popupHtml, /id="visualReuseFullAnalysis"/, "完整方案分析必须可展开");
assert.match(popupHtml, /id="lightboxLineage"[\s\S]*id="lightboxStrip"/, "详情页应先展示来源再展示历史结果");
assert.match(popupJs, /该资产生成于来源追踪功能上线前/, "旧图库不得伪造来源");
assert.match(popupJs, /await onReferencesPrepared\?\.\(images\.map/, "RunningHub 直传来源必须来自实际请求图片");
assert.match(popupJs, /await options\.onReferencesPrepared\?\.\(usedItems\.map/, "APIMart 直传来源必须来自实际请求图片");
assert.match(backgroundJs, /assetLineage:\s*task\.assetLineage/, "异步后台任务必须保留来源关系");
assert.strictEqual(ReusePlan.normalizeTextMode("keep-original"), "keep-original");
const fallbackPlan = ReusePlan.createDraft({
  coreRequirement: "图1人物保持，图2参考标题排版，图3只参考红色线条装饰。",
  width: 1024, height: 1024,
  references: [1, 2, 3].map((number) => ({
    id: `reference-${number}`, width: 512, height: 512, dimensionsVerified: true
  }))
});
assert.deepStrictEqual(fallbackPlan.references.map((reference) => reference.roles.join(",")), ["subject", "auto", "auto"]);

const lineageStart = popupJs.indexOf("async function generationLineageFromRequest(");
const lineageEnd = popupJs.indexOf("async function imageFromIndexedDb(", lineageStart);
assert.ok(lineageStart >= 0 && lineageEnd > lineageStart);
const lineageContext = {
  sourceAssetPreviewStoreId: async (item) => item ? `source-${item.id}` : "",
  safeAssetSourceUrl: (url) => url || "",
  normalizeAssetSource: () => ({ kind: "local-file" })
};
const generationLineageFromRequest = vm.runInNewContext(
  `${popupJs.slice(lineageStart, lineageEnd)}\ngenerationLineageFromRequest`,
  lineageContext
);
async function checkGenerationLineage() {
  const references = ["a", "b", "c"].map((id, index) => ({
    assetId: id, name: `图${index + 1}`, roles: [index ? "layout" : "subject"],
    order: index + 1, source: { kind: "local-file" }
  }));
  const referenceItems = references.map((reference) => ({
    id: reference.assetId, name: reference.name, src: "data:image/png;base64,AA"
  }));
  const payload = { source: "reuse", mode: "image", reusePlan: { references }, referenceItems };
  const single = await generationLineageFromRequest(payload, ["a"]);
  assert.deepStrictEqual(Array.from(single.directReferenceIds), ["a"]);
  assert.deepStrictEqual(Array.from(single.analysisReferenceIds), ["b", "c"]);
  assert.deepStrictEqual(Array.from(single.sourceAssets.map((asset) => asset.participation)), ["direct", "analysis", "analysis"]);
  const multiple = await generationLineageFromRequest(payload, ["a", "b", "c"]);
  assert.strictEqual(multiple.analysisReferenceIds.length, 0);
  assert.strictEqual(multiple.directReferenceIds.length, 3);
  const image = await generationLineageFromRequest({ source: "image", mode: "image", referenceItems }, ["b"]);
  assert.deepStrictEqual(Array.from(image.directReferenceIds), ["b"]);
  const text = await generationLineageFromRequest({ source: "text", mode: "text", referenceItems: [] }, []);
  assert.strictEqual(text.sourceAssets.length, 0);
}

checkGenerationLineage()
  .then(() => console.log(`AssetFlow ${packageJson.version} checks passed.`))
  .catch((error) => { console.error(error); process.exitCode = 1; });
