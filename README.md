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
- 已生成图库会保存在本地，下次打开继续显示。

## 本地预览

```bash
npm run preview
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

脚本会生成：

- `dist/image-prompt-builder`：用于“加载已解压的扩展”的目录。
- `dist/image-prompt-builder.zip`：用于归档或后续发布的压缩包。

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
