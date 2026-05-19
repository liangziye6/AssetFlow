# Image Prompt Builder

一个 Chrome / Edge 扩展原型，用来把网页图片或本地图片拖入右侧 Side Panel，反推提示词，设置生图模型、尺寸、数量，并通过 API 生成图片。

## 功能

- 点击扩展图标后优先打开浏览器右侧 Side Panel，适合从网页拖图片进去。
- Side Panel 会根据浏览器侧栏宽度自适应布局：宽屏双栏，窄屏单列。
- 支持拖入网页图片、拖入本地图片、粘贴图片地址、点击上传。
- 自动读取原图尺寸，也可以选择常用尺寸或自定义宽高。
- 支持反推提示词、中英转译、清空提示词。
- 支持反推提示词 API 和生图 API 分开配置。
- 已支持 Google Gemini 作为反推提示词 API。
- 已支持即梦 Doubao-Seedream-4.0 / 4.5 生图配置。
- RunningHub 生图支持消费级会员 AI 应用接口和企业级共享 Standard-API 两种模式。
- 已生成图库会保存在本地，下次打开继续显示。

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

- `dist/image-prompt-builder`：用于“加载已解压的扩展”的目录。
- `dist/image-prompt-builder.zip`：用于归档或后续发布的压缩包。

给新电脑或其他用户安装时，推荐直接发送 `dist/image-prompt-builder.zip`。对方解压后在扩展管理页选择解压出来的完整文件夹；不要只复制 `popup.html`、`popup.js`、`popup.css` 等单个文件，否则 `assets/` 里的图标、logo 和动画会丢失。

浏览器出于安全限制，不能被网页静默安装扩展。加载本地插件时仍需要手动打开扩展管理页，开启开发者模式，然后选择 `dist/image-prompt-builder`。

## 安装为浏览器插件

1. 打开 Chrome 或 Edge。
2. 进入扩展管理页：
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. 打开“开发者模式”。
4. 点击“加载已解压的扩展”。
5. 选择 `dist/image-prompt-builder`，或直接选择项目根目录。

## API 提示

直接用 `file://` 或本地网页预览时，部分远程 API 可能会被浏览器跨域策略拦截。加载成 Chrome / Edge 扩展后，`manifest.json` 里的 `host_permissions` 会让 API 请求更稳定。

Gemini 反推提示词默认配置：

- Base URL: `https://generativelanguage.googleapis.com/v1beta`
- 默认模型: `gemini-2.5-flash`
- 调用路径: `/models/{model}:generateContent`
- 鉴权方式: `x-goog-api-key`

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

`/openapi/v2/rhart-image-g-2/...` 属于 RunningHub Standard-API；如果 API Key 不是企业共享 Key，服务端会返回访问拒绝。消费级会员 Key 请使用“消费级会员（AI应用）”模式。
