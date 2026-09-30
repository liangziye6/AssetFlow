# 灵感库案例扩展批次 · 2026-09-27

依据：`LYZ-AssetFlow-灵感库案例扩展与上线开发流程-V1.md`。本批沿用现有 `recipes/*.json` 数据结构，从原有候选池选择 3 个 Prompt 玩法与 2 个视觉方案，未创建重复 ID。正式上线 4 项，符合文档每批 2～4 项的限制。

## 本批内容

| 类型 | 案例 | 评分 | 状态 | 实际结果 |
| --- | --- | ---: | --- | --- |
| Prompt | Y2K CCD 直闪旅拍 | 85 | verified | 原创预览；换成首尔/男性/绿雨衣后第二次生成成功，直闪、噪点、倾斜构图明确 |
| Prompt | 穿搭商品标注 Lookbook | 85 | verified | 原创预览；换成海滨/男性/橙色衬衫后第二次生成成功，主图与单品细节一致 |
| Prompt | 手机框中框肖像 | 82 | verified | 原创预览；换成温室/植物学家后第二次生成成功，屏幕内外人物一致 |
| Visual | 产品场景迁移 | 89 | verified | 同一原创钴蓝瓶参考图编辑两轮；产品形状、颜色、瓶盖保持，环境从棚拍变为温泉和厨房 |
| Visual | 海报版式复用 | 86 | testing | 双参考图编辑两轮，主体与版式迁移成功；正式标题文案仍未通过生成验证 |

评分维度按方案：Prompt 为传播、设计价值、变量化、易懂度、跨模型复用；Visual 为重复性、设计价值、角色清晰度、案例验证。评分只负责筛选，不替代图像生成与交互验收。

## 视觉方案定义与验证

| 方案 | 用户目标 | 参考图分工 | 保持 | 改变 |
| --- | --- | --- | --- | --- |
| 产品场景迁移 | 将产品真实置入目标环境 | 图1 主体必需；图2 构图可选 | 产品形状、颜色、可见标识 | 背景、接触阴影、光线 |
| 海报版式复用 | 以指定主体制作原创竖版海报 | 图1 主体必需；图2 版式可选 | 主体身份、信息主次 | 标题、背景、细节 |

两项均以原创参考图完成真实图像编辑，不是纯文本概念图。Chrome 无头预览验证了图片上传、“使用方案”入口、参考图角色应用、需求填入；`ReusePlan.createDraft → validate → compile` 在真实尺寸和对应角色下通过。产品方案的必需主体参考已验收；可选构图参考未单独测试。海报编辑画面留下标题区，但未验证具体标题正确生成，因此保留 testing，不进入正式库。

## 来源与版权边界

Prompt 发现线索来自 [GPT Image 案例汇编](https://github.com/opensource-works/awesome-gpt-image-prompts)，原作者 X 链接保存在 `source.originalUrl`。海报版式方法参考 [Image2 Ads Studio](https://github.com/kwistzzqq-byte/image2-ads-studio)，产品场景迁移方法参考 [产品摄影提示词仓库](https://github.com/JeremyGDM/awesome-ai-product-photography-prompts)。只抽象机制与参考图职责；Prompt 已重写，图像均由本项目原创生成，未复制来源图片、品牌或原文。浏览量无法可靠核实，`views: null`。

## 交付与统计

- 本轮开发：Prompt 3、Visual 2；verified 4、testing 1；新增原创预览 5 张。
- 当前正式库：Prompt 8、Visual 3，共 11 项。第一阶段 12～15 / 8～10 的长期目标尚未达到，应继续分批。
- `assets/recipes/previews/` 和 `thumbnails/`：5 套等比例 WebP。
- `assets/recipes/validation/`：5 张第二次真实生成证据。
- `assets/recipes/sources/`：3 张原创视觉参考素材。
- 静态验证：`npm.cmd run check` 通过，`git diff --check` 通过。
- 467×948 Chrome 无头预览：双列、无横向溢出；搜索、详情返回、案例研究、复制、应用通过；视觉方案上传与角色应用分别验证了 subject/layout 和 subject。
- 安装包：`dist/assetflow-v1.9.16.zip`，包含本轮 Recipe 与图片资源。

## 下一步门槛

海报方案需再验证具体标题在最终画面中的呈现，再考虑 verified。后续批次继续以 5 候选筛选、原创 Preview、第二次生成、UI 回归和不超过 4 项正式上线推进；达到第一阶段目标后停止扩量，观察真实使用。
