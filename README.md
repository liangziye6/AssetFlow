<p align="center">
  <strong>简体中文</strong> · <a href="./README_EN.md">English</a>
</p>

<p align="center">
  <img src="assets/readme-cover.svg" alt="AssetFlow v1.9.19 - 视觉资产复用工作台" width="100%">
</p>

<h1 align="center">AssetFlow</h1>

<p align="center">
  <strong>把参考图、提示词、生成参数和视觉规则整理成可追溯、可复用的视觉资产工作流。</strong>
</p>

<p align="center">Reference · Plan · Create · Save · Reuse</p>

<p align="center">
  <img alt="version" src="https://img.shields.io/badge/version-v1.9.19-6D5DFC">
  <img alt="Chrome" src="https://img.shields.io/badge/Chrome-Side%20Panel-4285F4">
  <img alt="Edge" src="https://img.shields.io/badge/Edge-Compatible-0AA0F6">
  <img alt="data" src="https://img.shields.io/badge/data-local--first-16A34A">
  <img alt="CI" src="https://img.shields.io/badge/CI-passing-16A34A">
</p>

---

## AssetFlow 是什么？

AssetFlow 是一个面向 Chrome / Edge 的 AI 视觉资产复用工作台。

它不只负责“生成一张图”，而是把一次创作过程中真正有价值的内容一起保留下来：

- 参考图及其角色
- 核心需求
- 结构化 ReusePlan
- Prompt 与生成参数
- 模型、尺寸与文字策略
- 生成来源与资产关系
- 成功方案与个人工作流

最终形成：

Reference → Plan → Create → Save → Reuse

适合需要频繁处理海报、商业 KV、电商视觉、角色 / IP 延展、人物换景、产品场景迁移、风格复用和多参考图创作的设计工作流。

---

## 核心功能

| 功能 | 能做什么 |
| --- | --- |
| ✨ 文生图 | 直接输入 Prompt 生成视觉结果 |
| 🖼️ 图生图 | 基于本地图片或网页图片继续创作 |
| 🧩 视觉复用 | 给 1–4 张参考图分配主体 / 构图 / 排版 / 色彩 / 风格 / 装饰等角色，再生成新的统一视觉 |
| ↩️ 反推提示词 | 分析参考图，提取可用于再创作的 Prompt |
| 🧠 ReusePlan | 把“保留什么、改变什么、参考哪张图”整理成结构化方案 |
| 💡 灵感库 | 内置 Prompt玩法与 Visual Recipe，可搜索、筛选和直接应用 |
| 💾 保存为方案 | 把成功的图生图 / 视觉复用结果沉淀成自己的视觉方案 |
| 📁 我的方案 | 搜索、重命名、编辑、删除并再次复用个人方案 |
| 🖼️ 本地图库 | 生成结果持久化到浏览器本地，重新打开 Side Panel 后继续使用 |
| 🔎 Viewer | 在当前网页打开大图 Viewer，查看 Prompt、来源、参考图和生成关系 |
| 🔁 继续创作 | 从 Viewer 一键回到文生图、图生图或完整视觉复用工作流 |
| 🦅 Eagle 收集 | 将生成资产快速收集到 Eagle |
| 🔌 多 Provider | 反推与生图 API 可以分别配置，并支持自定义 OpenAI-compatible 服务 |

---

## 视觉复用怎么工作？

普通图生图通常只有：参考图 + Prompt。

AssetFlow 会把多张参考图拆成不同职责，例如：

- 图1 → 主体与动作
- 图2 → 构图与留白
- 图3 → 风格与材质

再结合一句核心需求，例如“制作一张新的产品科技海报”，建立结构化 ReusePlan。

ReusePlan 会明确：

- 哪些特征要保持
- 哪些内容允许变化
- 哪张图负责哪个视觉维度
- 文字如何处理
- 最终应该生成什么资产

随后再交给 Prompt Compiler 与实际生图 Provider。

这样比简单把多张图一起丢给模型更适合稳定复用视觉规则。

---

## v1.9.17：从生成走向沉淀

v1.9.17 新增完整的个人视觉方案闭环：

生成满意结果 → Viewer → 保存为方案 → 我的方案 → 下次重新上传参考图 → 恢复角色 / 需求 / 参数 → 再次生成

保存方案时会自动保留：

- 参考图角色结构
- 核心需求
- preserve / change
- 文字策略
- Prompt
- 模型
- 比例与尺寸
- ReusePlan
- 独立 Preview

个人方案默认只保存“方法”和“角色结构”，不会永久复制用户原参考图。这样可以减少本地存储占用，也让方案真正成为可替换素材的工作流模板。

---

## v1.9.18–v1.9.19 更新

- v1.9.18：图库卡片、网页 Viewer 和插件内 Viewer 支持确认后删除单张图片；本地图片和异步恢复记录同步清理，个人方案独立保留。
- v1.9.19：首次使用时，反推提示词默认 OpenAI GPT-4.1 mini，生图默认 OpenAI GPT Image 2；已保存的配置保持原样。
- 新增智谱 GLM-4.6V 视觉反推，以及阿里云百炼 Qwen-Image 3.0 Pro / 3.0 文生图与图生图。OpenAI 图生图通过 Images Edits API 上传参考图。
- 接口依据：[OpenAI 图像文档](https://developers.openai.com/api/docs/guides/image-generation)、[百炼千问图像文档](https://help.aliyun.com/zh/model-studio/qwen-image-generation-and-editing-api-reference)、[智谱模型概览](https://docs.bigmodel.cn/cn/guide/start/model-overview)。

---

## 灵感库

当前内置案例池：

| 类型 | 总数 | 正式可用 | 案例研究 |
| --- | ---: | ---: | ---: |
| Prompt Recipe | 13 | 12 | 1 |
| Visual Recipe | 10 | 7 | 3 |

正式库目前共 19 项。

Prompt玩法适合直接复制 / 应用 Prompt；视觉方案则包含参考角色、保持项、变化项和目标结构。

个人保存的方案使用 personal 状态，不计入官方 verified 数量。

- [Recipe 当前状态](docs/recipe-status.md)
- [v1.9.17 个人方案实现与验收](docs/user-recipes-v1.9.17.md)

---

## 典型使用流程

### 1. 文生图

文生图 → 输入 Prompt → 选择模型 / 比例 / 尺寸 → 生成 → Viewer

### 2. 单图再创作

图生图 → 上传图片 → 输入需求 → 生成 → Viewer → 图生图编辑

### 3. 多参考视觉复用

上传 1–4 张参考图 → 分配角色 → 输入一句核心需求 → 查看方案 → AI 建立 ReusePlan → Prompt Compiler → 生成 → Viewer 查看来源

### 4. 保存并复用成功工作流

Viewer → 保存为方案 → 我的方案 → 使用方案 → 重新上传参考图 → 自动恢复角色与参数 → 再次生成

---

## 支持的参考角色

| 角色 | 适合参考 |
| --- | --- |
| 主体与动作 | 人物、产品、IP、姿态、主要结构 |
| 构图与留白 | 镜头、位置关系、空间结构、视角 |
| 排版与文字 | 网格、标题区域、信息层级 |
| 色彩与材质 | 主色、光影、材质表现 |
| 风格与材质 | 摄影、插画、3D、艺术语言 |
| 装饰与细节 | 小元素、氛围装饰、局部特征 |

每张参考图可以在高级设置中继续调整强度与锁定状态。

> 角色强度主要用于 ReusePlan / Prompt 编译的语义控制。不同 Provider 对“每张图独立数值权重”的原生支持并不一致，AssetFlow 不会伪造 Provider 不存在的精确权重能力。

---

## 安装

当前版本：v1.9.19

### 从源码加载

1. 克隆或下载本仓库。
2. 在项目目录执行 npm run package。
3. 打开浏览器扩展管理页：
   - Chrome：chrome://extensions
   - Edge：edge://extensions
4. 开启“开发者模式”。
5. 点击“加载已解压的扩展”。
6. 选择 dist/assetflow。

打包脚本同时生成 dist/assetflow-v1.9.19.zip，用于归档或分发。

### 已安装旧版本？

如果之前已经从 dist/lyz-assetflow 或 dist/image-prompt-builder 加载，执行一次 npm run package 后，在扩展管理页直接点击“重新加载”即可，通常不需要删除原扩展。

---

## API 配置

AssetFlow 将“反推 / 分析 API”和“生图 API”分开管理，因此可以自由组合不同供应商。首次使用时两者默认 OpenAI；已保存的配置不会被覆盖。

### 反推与视觉分析

- OpenAI GPT-4.1 mini（默认）
- 智谱 GLM-4.6V
- Grsai Chat API
- Google Gemini
- 阿里云百炼 Qwen-VL
- 火山引擎方舟
- 自定义 OpenAI-compatible Chat API

### 生图

- OpenAI GPT Image 2（默认）
- 阿里云百炼 Qwen-Image 3.0 Pro / 3.0
- Grsai GPT Image
- RunningHub
- APIMart
- 即梦 / Seedream 相关配置
- 自定义 OpenAI-compatible Image API

不同 Provider 的多图能力、分辨率和异步任务方式不同，AssetFlow 会按实际接口能力适配。

<details>
<summary><strong>Grsai 配置示例</strong></summary>

反推：设置 → 反推 → Grsai Chat API。

生图：设置 → 生图 → Grsai GPT Image API。

默认国内节点：https://grsai.dakka.com.cn

也兼容：https://grsaiapi.com

AssetFlow 已对异步提交 / 查询 / Side Panel 重开恢复做处理。

</details>

<details>
<summary><strong>Gemini / Qwen-VL / 方舟</strong></summary>

Google Gemini 默认 Base URL：https://generativelanguage.googleapis.com/v1beta

阿里云百炼 OpenAI-compatible Base URL：https://dashscope.aliyuncs.com/compatible-mode/v1

火山引擎方舟 Base URL：https://ark.cn-beijing.volces.com/api/v3

</details>

<details>
<summary><strong>RunningHub</strong></summary>

支持消费级会员 AI 应用、企业级 Standard-API 和官方稳定版 Standard-API。

AssetFlow 对 RunningHub 的提交、上传、查询和异步任务恢复分别适配。

</details>

---

## 本地数据与隐私

AssetFlow 当前采用 local-first 方式管理工作区和个人资产。

默认保存在当前浏览器 Profile：

- 本地图库
- Workspace 状态
- 个人视觉方案
- 独立 Preview
- API 配置

个人方案使用 IndexedDB 持久化。

### v1.9.17 不提供

- 账号系统
- 云同步
- 在线 Marketplace
- 社区分享
- 自动上传个人方案
- 自动保存原参考图到个人方案

> 当你实际调用第三方 AI Provider 时，对应 Prompt / 图片会根据该 Provider 的接口要求发送给该服务商。具体数据处理方式取决于你选择的 Provider。

---

## Viewer 与生成来源

Viewer 可以查看：

- 大图
- Prompt 摘要 / 完整 Prompt
- 模型与尺寸
- 生成来源
- 参考图
- 参考图角色
- direct / analysis 来源关系
- 已生成图库

并支持：使用此提示词、图生图编辑、恢复视觉复用、保存为方案、删除单张图片、下载和 Eagle 收集。

旧资产如果缺少完整 lineage，不会伪造来源。

---

## 本地图库与异步恢复

生成结果会保存到浏览器本地图库。

对于支持异步任务的 Provider，AssetFlow 会保存任务信息，因此可以实现：提交任务 → 关闭 Side Panel → Provider 后台完成 → 重新打开 → 恢复结果。

v1.9.16 已修复：

- 图生图继续创作后 reopen 丢失参考图
- 同一异步生成结果重复写入图库

当前使用稳定 IndexedDB 图片引用与 generationId / resultIndex 做结果幂等。

---

## Eagle

Viewer 中可以直接使用“收集到 Eagle”。AssetFlow 优先读取本地 IndexedDB 中保存的原图，再交给 Eagle Local API，避免依赖已经过期的 Provider 临时图片 URL。

需要本机已安装并运行 Eagle。

---

## 当前版本验证

v1.9.19 已通过项目检查、打包、隔离浏览器模拟 API 请求验证，以及图库单张删除回归。新增服务商尚未用真实 API Key 调用线上接口。

v1.9.17 已通过：

- npm run check
- git diff --check
- npm run package
- GitHub Actions CI
- 真实扩展浏览器 smoke
- IndexedDB v2 → v3 升级
- Side Panel 连续 reopen
- 测试 Profile 完整重启
- 个人方案保存 / 编辑 / 删除
- Preview 独立持久化
- Gallery / Recipe 删除隔离
- 1 图 / 3 图个人方案复用
- 存储失败事务回滚

v1.9.16 已完成 Grsai Provider 的真实 1 / 2 / 3 图视觉复用 E2E。

v1.9.17 新增的“保存方案 → 再次使用”链路使用已有 Provider 边界进行自动化验证，没有为了重复验证而再次消耗真实生图 API。

- [v1.9.17 验收报告](docs/user-recipes-v1.9.17.md)
- [机器可读验证记录](docs/validation/user-recipes-v1.9.17.json)
- [Recipe 状态](docs/recipe-status.md)

---

## 开发与检查

- 本地预览：npm run preview
- 项目检查：npm run check
- 打包：npm run package

GitHub Actions 会自动执行项目检查、git diff --check 和打包。

---

## 当前边界

当前暂不包含：

- 文生图保存为个人 Prompt Recipe
- 个人方案同步
- 分享链接
- 导入 / 导出
- 收藏 / 最近使用
- Recipe 历史版本
- Marketplace
- analysis-only 真实 Provider 专项 E2E

这些不会影响当前文生图、图生图、视觉复用、Viewer、灵感库和个人视觉方案主流程。

---

<p align="center">
  <strong>AssetFlow v1.9.19</strong><br>
  Reference · Plan · Create · Save · Reuse
</p>