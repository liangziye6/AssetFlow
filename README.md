<p align="center">
  <img src="assets/logo.png" width="112" alt="AssetFlow Logo">
</p>

<h1 align="center">AssetFlow</h1>

<p align="center">
  面向 Chrome / Edge 的视觉资产复用工作台：Reference · Plan · Create
</p>

<p align="center">
  <strong>当前版本：v1.9.14</strong>
</p>

AssetFlow 可以把网页图片或本地图片整理成带角色、真实尺寸与来源关系的结构化 `ReusePlan`，将视觉分析和提示词编译分离，再通过现有生图 API 生成可追溯的新视觉资产。它同时保留文生图、图生图、反推提示词、异步任务恢复、本地图库与 Eagle 收集能力。

典型流程：添加 1-4 张参考图 → 定义参考角色与核心需求 → 查看结构化复用方案 → 生成新视觉。

## 功能

- 点击扩展图标后优先打开浏览器右侧 Side Panel，适合从网页拖图片进去。
- Side Panel 会根据浏览器侧栏宽度自适应布局：宽屏双栏，窄屏单列。
- 文生图、图生图和视觉复用使用独立的三段式模式导航，并按模式显示对应工作区。
- 支持拖入网页图片、拖入本地图片、粘贴图片地址、点击上传。
- 自动读取原图尺寸；比例与 1K/2K/4K 分辨率可独立组合，也可以自定义宽高。
- 视觉复用主流程支持 1-4 张参考图，参考角色直接显示在图片上，强度与锁定状态放入单张参考图的高级设置。
- 填写一句核心需求后先查看设计决策摘要，再执行“生成新视觉”；完整分析可折叠查看。
- 文字策略默认参考排版并预留文字区，也可生成指定文字、不需要文字或保留原图文字。
- `ReusePlan` 分离视觉分析与提示词编译，记录真实尺寸校验和来源资产关系。
- 使用原生 WebGL 构建 Soft Aurora 动态背景，不依赖背景图片或额外前端框架。
- 页面 Logo 与扩展 16/32/48/128 图标统一使用 AssetFlow 品牌图。
- 错误、进度和成功状态使用结构化提示卡片；存储空间错误可直接进入图库清理操作。
- 支持反推提示词、中英转译、清空提示词。
- 支持反推提示词 API 和生图 API 分开配置。
- 设置页复刻独立 API 工作台：标题区显示当前配置摘要，并以反推、生图、自定义、Eagle 四个页签管理。
- 支持新增、命名、编辑、删除并直接应用自定义 OpenAI-compatible API 服务商。
- 已支持 Google Gemini 和火山引擎方舟作为反推提示词 API。
- 已支持即梦 Doubao-Seedream-4.0 / 4.5 生图配置。
- RunningHub 生图支持消费级会员 AI 应用、企业级共享低价渠道 Standard-API、官方稳定版 Standard-API 三种模式。
- 已生成图库会保存在本地，下次打开继续显示。新生成资产记录实际直传来源与仅用于分析的参考图；详情可预览来源大图，旧图库显示兼容说明。
- APIMart / RunningHub 异步任务会保留任务信息，侧栏重新打开后继续恢复。

## 本地预览

```bash
npm run preview
```

如果当前环境只有 `node`，也可以直接运行：

```bash
node preview-server.js
```

然后打开：

```text
http://127.0.0.1:4173/popup.html
```

## 项目记录

本轮需求、设计取舍、API 规划和后续待办已整理到：

```text
docs/conversation-notes.md
docs/reuse-plan-v1.0.md
```

## 一键打包

```bash
npm run package
```

如果当前环境只有 `node`，也可以直接运行：

```bash
node package-extension.js
```

脚本会生成：

- `dist/assetflow`：用于“加载已解压的扩展”的目录。
- `dist/assetflow-v1.9.14.zip`：用于归档或后续发布的压缩包。
- `dist/lyz-assetflow`：旧版解压安装的兼容目录，打包时会同步为最新版，Chrome 可以继续沿用原路径和扩展 ID。
- `dist/image-prompt-builder`：更早版本的兼容目录，也会同步为最新版。

给新电脑或其他用户安装时，推荐直接发送版本化的 `dist/assetflow-v*.zip`。对方解压后在扩展管理页选择解压出来的完整文件夹；不要只复制 `popup.html`、`soft-aurora.js`、`reuse-plan.js`、`popup.js`、`popup.css` 等单个文件，否则动态背景、结构化方案能力和 `assets/` 资源会丢失。

浏览器出于安全限制，不能被网页静默安装扩展。加载本地插件时仍需要手动打开扩展管理页，开启开发者模式，然后选择 `dist/assetflow`。

如果 Chrome 之前已经从 `dist/lyz-assetflow` 或 `dist/image-prompt-builder` 加载过插件，不要移除后改选新目录；运行一次 `npm run package` 后，直接在扩展管理页点击该插件的“重新加载”即可更新并保留原配置。

## 安装为浏览器插件

1. 打开 Chrome 或 Edge。
2. 进入扩展管理页：
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. 打开“开发者模式”。
4. 点击“加载已解压的扩展”。
5. 选择 `dist/assetflow`，或直接选择项目根目录。

## API 提示

直接用 `file://` 或本地网页预览时，部分远程 API 可能会被浏览器跨域策略拦截。加载成 Chrome / Edge 扩展后，`manifest.json` 里的 `host_permissions` 会让 API 请求更稳定。

“自定义 API 服务商”会按用途保存名称、Base URL、API Key 和真实模型名。反推提示词用途调用 `{Base URL}/chat/completions`，生图用途调用 `{Base URL}/images/generations`；保存后服务商会进入对应下拉列表和模型选择器。旧版的临时 `custom`、`GPT Image`、`GPT Image 2` 配置仍可恢复，但不会继续出现在新建配置的默认选择列表中。

Gemini 反推提示词默认配置：

- Base URL: `https://generativelanguage.googleapis.com/v1beta`
- 默认模型: `gemini-2.5-flash`
- 调用路径: `/models/{model}:generateContent`
- 鉴权方式: `x-goog-api-key`

阿里云百炼千问视觉反推默认配置：

- Base URL: `https://dashscope.aliyuncs.com/compatible-mode/v1`
- 默认模型: `qwen-vl-plus`
- 调用路径: `/chat/completions`
- 鉴权方式: `Authorization: Bearer <DASHSCOPE_API_KEY>`
- 网页参考图会先在 AssetFlow 中转换为 Base64 再提交，避免百炼服务器下载外链图片时出现 `Download multimodal file timed out`。
- 本地预览使用仅监听 `127.0.0.1`、限制图片类型与 7 MB 大小的读取代理；正式扩展则使用 `host_permissions` 直接读取图片。

火山引擎方舟反推提示词默认配置：

- Base URL: `https://ark.cn-beijing.volces.com/api/v3`
- 视觉分析模型: `doubao-seed-2-0-lite-260215`
- 提示词语言模型: `glm-5.2` 或 `deepseek-v4-flash`
- 调用路径: `/chat/completions`
- 鉴权方式: `Authorization: Bearer <ARK_API_KEY>`
- GLM-5.2 与 DeepSeek V4 Flash 都作为语言编译模型使用；插件先用豆包视觉模型分析图片，再把分析结果编译成最终提示词。
- 如果账号使用推理接入点，可在语言模型中选择“自定义方舟接入点”，填写控制台提供的 `ep-...` ID。

RunningHub 生图默认配置：

- Base URL: `https://www.runninghub.cn`
- 默认模型: `RunningHub 全能图片G-2.0 低价渠道版`
- 消费级会员模式：
  - 文生图 AI 应用 ID: `2046794551444119554`
  - 图生图 AI 应用 ID: `2046794946094571522`
  - 提交路径: `/task/openapi/ai-app/run`
  - 图片上传路径: `/task/openapi/upload`
  - 查询路径: `/task/openapi/outputs`
- 企业级共享模式：
  - 文生图路径: `/openapi/v2/rhart-image-g-2/text-to-image`
  - 图生图路径: `/openapi/v2/rhart-image-g-2/image-to-image`
  - 图片上传路径: `/openapi/v2/media/upload/binary`
  - 查询路径: `/openapi/v2/query`
- 官方稳定版模式：
  - 模型选项: `RunningHub 全能图片G-2 官方稳定版`
  - 文生图路径: `/openapi/v2/rhart-image-g-2-official/text-to-image`
  - 图生图路径: `/openapi/v2/rhart-image-g-2-official/image-to-image`
  - 图片上传路径: `/openapi/v2/media/upload/binary`
  - 查询路径: `/openapi/v2/query`
  - 默认提交 `quality: low`，尺寸继续使用界面选择的 `aspectRatio` 与 `resolution`。

`/openapi/v2/rhart-image-g-2/...` 属于 RunningHub Standard-API；如果 API Key 不是企业共享 Key，服务端会返回访问拒绝。消费级会员 Key 请使用“消费级会员（AI应用）”模式。

RunningHub 中国站页面目前提示官方稳定版将主要迁移到全球站。如果 `.cn` 接口停止提供服务，可在生图 API 配置中把 Base URL 改为 `https://www.runninghub.ai`，其余官方稳定版路径保持不变。
