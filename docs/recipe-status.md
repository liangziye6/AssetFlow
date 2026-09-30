# AssetFlow Recipe 当前状态

> 唯一当前状态源。历史 batch / validation 文档仅保留当时测试快照，不代表最新发布状态。

更新时间：2026-09-30

当前本地开发版本：v1.9.17

## v1.9.17 个人视觉资产库

已完成保存为方案、我的方案筛选与管理、独立预览图、重新上传参考图并复用方案，以及 IndexedDB v3 增量升级。个人方案为 personal 状态，数量随当前浏览器 Profile 变化，不计入官方 verified 数量。

静态检查、真实扩展浏览器交互、原生 Side Panel 关闭重开、测试 Profile 完整重启、存储失败回滚与删除隔离均已通过。复用生成链路采用 Provider 边界 mock，本轮未调用真实 Provider。已生成 v1.9.17 本地安装包；远端发布留待后续流程。详见 [实现与验收报告](user-recipes-v1.9.17.md)。

## 当前数量

| 类型 | 总数 | verified | testing | candidate |
| --- | ---: | ---: | ---: | ---: |
| Prompt Recipe | 13 | 12 | 0 | 1 |
| Visual Recipe | 10 | 7 | 0 | 3 |

正式库共 19 项：12 个 Prompt玩法 + 7 个视觉方案。

## Prompt Recipe

已达到本阶段目标，v1.9.16 停止继续扩量。

唯一 candidate：

- `two-image-fusion` — 双图融合动态场景。当前 Prompt玩法交互不适合表达双参考图角色分工，暂不为了数量发布；后续可评估转为 Visual Recipe。

## Visual Recipe

当前 verified：

- `character-consistency` — 角色一致性延展
- `product-commercial-kv` — 产品商业 KV
- `poster-layout-reuse` — 海报版式复用
- `product-scene-relocation` — 产品场景迁移
- `style-composition-transfer` — 风格与构图双迁移
- `commercial-person-scene` — 人物商业换景
- `one-image-multi-assets` — 一图多资产

当前 candidate：

- `multi-reference-fusion` — 多参考视觉融合
- `ip-series-extension` — IP 系列延展
- `brand-series-consistency` — 品牌系列统一

这 3 项留到后续版本继续开发；v1.9.16 不再为了达到“8 个”而新增未完成案例。

## 真实 Provider 验证

已完成真实 Grsai Provider 端到端验证，覆盖：

- 1 图视觉复用
- 2 图视觉复用
- 3 图视觉复用
- Grsai Chat API → ReusePlan
- Prompt Compiler
- Grsai GPT Image 2.5 生图
- assetLineage direct 来源
- 网页 Viewer
- 参考图预览
- 继续创作 / 恢复创作链
- Side Panel 异步任务恢复

本轮真实用例均为 direct 输入；`analysis-only` 分支尚未做真实专项验收，不阻塞 v1.9.16 收口。

## v1.9.16 P0 修复

2026-09-28 已修复并验证：

1. 图生图继续创作后关闭 / 重开 Side Panel 导致图片引用丢失、模式退回文生图。
2. 异步任务恢复时同一生成结果可能重复写入图库。

当前实现使用稳定 IndexedDB 图片引用与 generationId/resultIndex 结果 ID，并有 `tools/local-image-persistence-smoke.mjs` 覆盖连续两次 Side Panel reopen 与图库幂等。

## 当前验证状态

本地已报告通过：

- `npm run check`
- `git diff --check`
- `npm run package`
- ZIP CRC
- 独立浏览器扩展 smoke
- 真实 Provider E2E

GitHub CI 由 `.github/workflows/ci.yml` 自动执行现有 check/package，作为 PR 收口验证。

## 非阻塞边界

- analysis-only 来源尚未做真实 Provider 专项 E2E。
- 下载和 Eagle 入口已回归检查；外部操作不作为当前自动化测试的一部分。
- 3 个 Visual candidate 与 1 个 Prompt candidate 留给后续版本。
