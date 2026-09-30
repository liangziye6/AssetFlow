# AssetFlow v1.9.17 本地开发与验收报告

日期：2026-09-30
执行依据：LYZ-AssetFlow-v1.9.17-保存为方案与个人视觉资产库开发方案-V1.md
结果：本地实现、检查、浏览器 smoke 和打包完成。GitHub-facing README 与 PR 状态由本次上传任务同步；本报告记录本地验收。

## 数据层

- IndexedDB：`imageSparkLocalImages`，版本 **2 → 3**。
- 新增 `recipes` store；`images`、`gallery` 保留。升级测试验证旧图片、旧 Gallery 和 API 配置仍存在。
- 沿用 `visual_recipe`：内置方案 normalize 为 `sourceType=builtin`，个人方案为 `sourceType=user/status=personal`；不通过 ID 前缀判断来源。
- ID 使用 `crypto.randomUUID()`。存储封装为 `saveUserRecipe/getUserRecipe/listUserRecipes/updateUserRecipe/deleteUserRecipe`。
- `generationContext` 保存原模式、Prompt、模型和选项、reference schema、文字策略和结构化 ReusePlan。记录 originGenerationId、originGalleryId 和去除图片链接/存储依赖后的 lineage。
- 原参考图只保留角色结构及来源身份信息，不复制原参考图 Blob，不保存 sourceImages、原参考图 URL 或其 previewStoreId 依赖。
- Preview 使用本次生成结果创建独立 WebP，最大长边 1024 px，quality 0.85；ID 为 `recipe-preview-{recipeId}`，metadata 包含 `recipeAsset/recipeId`。
- Recipe 与 Preview 在跨 `recipes/images` 的同一 IndexedDB 事务中提交，比两阶段写入再清理更直接；任一写入失败则整体回滚。删除也通过同一事务处理。
- 验证：1/2/3 图转换与角色顺序、空描述/标签、超过 40 个个人方案、UUID、非法 schema、内置审核状态隔离及受限编辑字段均通过。

## Viewer

| 项目 | 结果 |
| --- | --- |
| 图生图 → 保存为方案 | 插件内 Viewer 实际保存通过 |
| 视觉复用 → 保存为方案 | 网页 Viewer 实际保存通过 |
| 文生图 | 隐藏保存入口 |
| 历史资产缺失完整上下文 | 禁用入口并显示原因，不构造伪造方案 |
| 同一生成结果保存多个方案 | 通过；每个方案都有独立 Preview |
| 保存默认值 | 优先 assetName，再用结构化输出类型或需求短摘要，不调用 AI |
| 保存表单 | 名称必填；描述、固定分类、0–5 个短标签；参考结构、保持/变化自动展示 |
| 成功反馈 | “已保存到「我的方案」”，保持 Viewer 打开 |
| 表单异常 | 超过 5 个标签拒绝；存储失败保留表单并显示错误 |

两种 Viewer 共用 `recipe-editor.js`；网页 Viewer 通过扩展后台读取真实 Gallery 记录，未从展示 DOM 反解析生成方法。

弹窗沿用 AssetFlow API 配置页的暗紫面板、黑色输入框和圆角暗色按钮。按钮按下、加载、成功、失败的状态反馈参考 LYZ Context System `motion-system` 的交互语义，并适配实际保存结果；未复制演示页运行时。

## 灵感库

- 保留 Prompt玩法 / 视觉方案两个顶层 Tab。
- 视觉方案提供全部 / 内置方案 / 我的方案筛选。
- builtin + user 合并后统一 normalize 与验证。
- 个人方案沿用原卡片、详情与 requestUse 入口；卡片和详情只显示“我的方案”身份。
- 搜索覆盖名称、描述、分类及标签；参与原有 category + tags 相似玩法。
- 重命名、编辑和删除通过 UI smoke。编辑支持 name、summary、category、tags、goalTemplate、preserve、change；不提供参考数量/角色编辑。
- 删除需要确认，同时删除该方案和其 Preview；内置卡片及详情不显示管理菜单。
- 472 px 与 1331 px 检查无页面横向溢出；保存弹窗、卡片和三图参考结构截图已人工视觉检查。

## 持久化与隔离

| 验收 | 结果 |
| --- | --- |
| 关闭并重新打开面板文档 | 通过 |
| 原生 chrome.sidePanel.open/close，连续两次重开 | 通过；产生不同面板 target，每次恢复 2 个保留方案及 Preview |
| 完整退出并重新打开同一 Edge Profile | 通过；方案 ID 集合和所有 Preview Blob 一致 |
| 删除原 Gallery 后个人方案及 Preview 可用 | 通过 |
| 删除个人方案后原 Gallery 保留 | 通过；被删方案及独立 Preview 均不存在 |
| Preview 写入时模拟 QuotaExceededError | 通过；无 metadata / Preview 残留 |
| Recipe metadata 写入时模拟 QuotaExceededError | 通过；Preview 回滚，无半成品 |

测试使用专用无界面 Edge Profile。Edge 的开发者模式必须开启，才能在浏览器重启后继续使用未打包扩展；首次重启的 ERR_BLOCKED_BY_CLIENT 由测试 Profile 未开启开发者模式引起，启用后再次完整重开通过。

## 使用方案

| 内容 | 结果 |
| --- | --- |
| 1 图 | subject 恢复，图生图 Prompt 成为核心需求，建立 ready ReusePlan |
| 3 图 | subject → composition → style 顺序恢复 |
| 核心需求 | 编辑后的 goalTemplate 正确回填 |
| 保持 / 变化 | 进入现有分析指令并进入 ReusePlan / Prompt Compiler |
| 文字策略 | with-text 与原标题恢复 |
| 模型 | 可用原模型恢复；原模型不存在时保留当前可选模型并提示 |
| 尺寸 | width=768、height=1024、sizeMode、resolution 恢复 |
| 缺少参考图 | 需要 3 图但只有 1 图时阻止分析调用，并提示完整角色结构 |
| 已有参考图冲突 | 应用角色 / 仅填需求 / 取消沿用；取消不改变现有角色 |
| 生成入口 | 个人方案进入原 generateNewVisualFromReusePlan → generate → runRealGeneration；没有第二套 Provider 实现 |

本轮分析与生成调用在现有接口边界使用测试桩，验证结构、参数、编译和入口衔接；**未重新调用真实 Provider 或声明新的生成质量验证**，符合方案第 56 节。本轮不新增官方 verified 内容。

## 检查与交付

- `npm run check`：通过，包括新增个人方案 schema/conversion 检查。
- `git diff --check`：通过；原有 Markdown 两空格换行按原仓库约定保留。
- `npm run package`：通过。
- 交付包：`dist/assetflow-v1.9.17.zip`。
- 解压安装目录：`dist/assetflow`。
- 兼容目录：`dist/lyz-assetflow`、`dist/image-prompt-builder`，打包同步。
- 未新增第三方依赖；`dist/` 不纳入 Git 源码提交。

### 可复现测试

自动检查：`tools/check-user-recipes.js`，由 `tools/check-project.js` 调用。
浏览器 smoke：`tools/local-user-recipe-smoke.mjs`。

在新建且开启开发者模式的 Edge/Chrome 测试 Profile 加载本仓库未打包扩展，并启用 CDP：

```bat
set ASSETFLOW_CDP_URL=http://127.0.0.1:9238
set ASSETFLOW_EXTENSION_ID=<测试扩展 ID>
set ASSETFLOW_SMOKE_OUTPUT=.codex-inspect/user-recipes-final
node tools/local-user-recipe-smoke.mjs
node tools/local-user-recipe-smoke.mjs --native-panel-reopen
```

完整关闭测试浏览器并用同一 Profile 重开后：

```bat
node tools/local-user-recipe-smoke.mjs --verify-reopen
```

主 smoke 要求没有已有个人方案的隔离 Profile；reopen 子命令读取此前生成的 result.json。不要对日常使用 Profile 运行主 smoke。

结构化结果：`docs/validation/user-recipes-v1.9.17.json`。
本地截图：`.codex-inspect/user-recipes-final/` 中的 save-one.png、save-three-viewer.png、my-recipes-472.png、my-recipes-1331.png、native-side-panel-472.png。

## 实际修改文件

| 文件 | 作用 |
| --- | --- |
| user-recipes.js（新增） | 结构化转换器、独立 Preview、IndexedDB CRUD 与事务 |
| recipe-editor.js（新增） | 两种 Viewer 及管理操作共享保存/编辑表单 |
| template-library.js | sourceType/personal、用户 schema、数据源合并、搜索与角色恢复 |
| template-library-ui.js | 来源筛选、Preview 读取、详情、管理、既有复用入口接入 |
| template-library.css | 来源筛选、个人标识和管理菜单样式 |
| popup.js | 数据库升级、插件内 Viewer 保存、缺图保护、约束接入和网页 Viewer 载荷 |
| popup.html | 保存按钮、来源筛选、脚本加载 |
| content.js | 网页 Viewer 保存入口与后台消息调用 |
| background.js | 数据库升级、网页 Viewer 可信 Gallery 读取/保存 |
| manifest.json / package.json | 1.9.17 版本及共享表单脚本声明 |
| package-extension.js | 将新增运行时模块纳入安装包 |
| tools/check-project.js | 接入新增语法及功能检查 |
| tools/check-user-recipes.js（新增） | schema 与转换回归 |
| tools/local-user-recipe-smoke.mjs（新增） | 浏览器端到端及持久化验收 |
| docs/recipe-status.md | 当前本地版本与验证状态同步 |
| docs/user-recipes-v1.9.17.md（本文件） | 实施、验收、边界及接手说明 |
| docs/validation/user-recipes-v1.9.17.json（新增） | 最终浏览器验收机器可读记录 |

## 真实边界

- v1.9.17 不保存原参考图，下次复用需重新上传。
- 用户方案是 personal，不代表官方 verified/published。
- 文生图个人 Prompt玩法、同步、分享、导入导出、最近使用、收藏及版本历史不在本次范围。
- 自动化验证使用 Edge 的真实扩展、IndexedDB、网页 Viewer 与原生 Side Panel API，浏览器运行于 headless 模式；不代表完成手工安装到用户日常浏览器 Profile 的验证。
- GitHub 代码与 README 版本收口见 [PR #1](https://github.com/liangziye6/LYZ-Image-to-Prompt-for-Chrome/pull/1)；CI 状态以该 PR 为准，本地验收以本报告和 recipe-status.md 为准。
