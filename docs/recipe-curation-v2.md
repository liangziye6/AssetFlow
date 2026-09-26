# 灵感库 V2 内容维护与验收

## 当前状态（2026-09-26）

- Prompt 玩法候选 12 个，视觉方案候选 10 个。旧版纯风格占位条目已从当前数据集移除。
- 正式展示 7 个：Prompt 玩法 `product-ad`、`character-sheet`、`landmark-miniature-card`、`map-pop-up-world`、`cinema-closeup`；视觉方案 `character-consistency`、`product-commercial-kv`。
- 其余 15 个中，`era-film-portrait` 为 `testing`（已生成年代质感预览，但人物身份保持尚未验证），14 个保持 `candidate`。这些条目可在抽屉内单独浏览，不能复制或应用，且不显示旧占位图。
- 正式卡片的缩略图统一为 360×270 WebP，详情预览统一为 768×1024 WebP。图片由 Codex image_gen 生成，保存在 `assets/recipes/`。未使用外部案例原图或热链。
- 本轮真实生成验证使用 Codex image_gen；没有使用 AssetFlow 内配置的第三方 Provider 做端到端生成，跨 Provider 效果仍需后续复验。视觉方案 `character-consistency` 使用角色设定图作主体参考生成换景画面；`product-commercial-kv` 使用自生成产品原图作主体参考生成商业 KV。人工检查主体关键特征保持。可选的第二、第三参考图尚未逐一做生成测试。

## 来源与版权边界

以下项目仅用于发现视觉机制、工作流和验证社区存在相似需求；库内 Prompt / Recipe 均重新编写，预览自行生成。来源记录在每条 JSON 的 `source` 字段，包含平台、URL、作者、核对日期；有可靠浏览数据时才填写 `views`。`map-pop-up-world` 来自 AssetFlow 内部旅行微缩叙事需求，`source.platform=internal` 且记录需求说明，不伪造外部案例链接。不得复制原图、原 Prompt 或将第三方素材打包。

- [X 案例索引](https://github.com/opensource-works/awesome-gpt-image-prompts)：角色四视图、年代肖像等玩法线索，需沿链接检查具体原帖。
- [广告视觉工作流](https://github.com/kwistzzqq-byte/image2-ads-studio)：产品广告和系列资产结构线索。
- [角色设定工作流](https://github.com/gpt-img-2/gpt-image-2-character-sheet)：角色一致性与多视图线索。
- [产品摄影 Prompt 案例](https://github.com/JeremyGDM/awesome-ai-product-photography-prompts)：产品场景化线索。
- [ComfyUI 工作流索引](https://github.com/Apatero-Org/ComfyUI-AWESOME-Workflows)：多参考、风格迁移、局部编辑工作流线索。

研究链接不授予复制其图片或 Prompt 的许可。正式发布前仍应复核具体案例来源、作者说明和 License。

## 入库流程

1. 记录真实案例或生产需求及来源元数据，排除重复玩法。
2. Prompt 玩法按传播 20、设计 25、变量化 25、可理解 15、跨模型 15 评分；视觉方案按可重复性 35、设计 30、角色清晰 20、案例验证 15 评分。
3. 独立重写 Prompt / Recipe，明确变量；视觉方案必须写清参考图角色、保持、改变、目标输出。
4. 使用重写后的内容生成专属预览，人工检查输出是否确实体现机制；保存本地 WebP。
5. 记录生成器、日期和验收结果。正式入库需有来源或真实需求、原创图、至少一次生成结果、可理解用途和跨主体复用性。
6. 状态从 `candidate` → `testing` → `verified` → `published`；失效后标记 `deprecated`。正式库默认仅显示 `verified` / `published`。

旧版 JSON 会规范化为候选。旧抽象缩略图已从项目和安装包移除，不会成为正式预览。视觉方案仍通过既有参考图角色与核心需求入口进入 ReusePlan；不修改 ReusePlan、Provider、assetLineage 或 Viewer。
