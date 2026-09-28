# AssetFlow v1.9.16 本地案例与扩展验证记录（2026-09-27）

本轮只修改本地案例、试用调用链、校验脚本和原创测试素材；未进行 GitHub CI、PR、分支或 README 工作。测试使用独立的 Edge 扩展配置，加载 `dist/assetflow`，并通过 CDP 驱动真实扩展页面。测试配置没有反推或生图 API 密钥。

1. **起始案例数**：Prompt 正式 11、候选 2；Visual 正式 4、测试中 1、候选 5。
2. **当前案例数**：Prompt 正式 12、候选 1；Visual 正式 4、测试中 3、候选 3。正式库共 16 项。
3. **Prompt 新正式案例**：`character-film-bible`。与已有四视图的正/侧/背展示区分，采用电影角色全身、表情、道具和环境分区。
4. **Prompt 两轮证据**：原创预览为城市科幻女主、玉质道具与车站；变量复测改为成年沙漠探险者、黄铜星盘与天文台。均保存在 `assets/recipes/`，记录了全部变量和验证结论。
5. **Prompt 未升级项**：`two-image-fusion` 仍为候选；当前文生图/图生图模式不足以直接表达双参考图角色关系，未为了凑数量发布。
6. **Visual 正式案例**：仍为 4。缺少真实服务商生成与回流证据，本轮没有提升 Visual 的 verified 数量。
7. **Visual 新测试案例**：`commercial-person-scene` 与 `one-image-multi-assets` 从候选转为 testing；`style-composition-transfer` 保持 testing。
8. **Visual 剩余候选**：`multi-reference-fusion`、`ip-series-extension`、`brand-series-consistency`。多参考融合与风格/构图双迁移的边界仍需区分，未重复上架。
9. **三参考风格/构图案例**：主体、构图、风格三图都改为必需。Edge 中从案例研究点击“测试使用方案”，经真实文件输入上传三图，角色依次为 `subject/composition/style`。
10. **三参考商业人物案例**：原创成年人物、城市广场、橙蓝光色三张输入；两轮生成层输出为行走和侧身姿态。Edge 上传后角色依次为 `subject/composition/color_material`，三张均为必需。
11. **单参考多资产案例**：同一原创蓝色水瓶派生竖版预览与横版 KV 变量图。Edge 上传后角色为 `subject`，保持瓶身比例、蓝色与银盖。
12. **双参考回归**：既有 `product-scene-relocation` 在 Edge 中经方案应用、文件输入上传两图后，角色为 `subject/composition`。
13. **Prompt 扩展交互**：在 Edge 中验证 12 项显示、名称搜索、详情图片加载、返回列表、应用到输入框及复制 Prompt；全部通过。
14. **ReusePlan 断点**：四个 Visual 用例点击“查看方案”时均提示“请先保存反推提示词 API 设置。”；草案未得到服务商分析响应，因此未形成最终 ReusePlan。
15. **真实生成与回流**：本配置没有反推和生图密钥，未执行供应商真实生成；Viewer 大图/来源直接与分析图、创作链恢复、Eagle、下载、图库、异步恢复等端到端路径均**未验证**。生成层 image_gen 证据不能替代这些验收。
16. **静态与扩展测试**：`npm.cmd run check` 通过；`git diff --check` 通过；真实 Edge 扩展单/双/三图角色与无 API 错误路径通过。可复测脚本：`tools/local-prompt-smoke.mjs` 和 `tools/local-recipe-smoke.mjs`，要求独立浏览器配置并加载当前解压版。
17. **本地交付与目标状态**：`npm.cmd run package` 成功；`dist/assetflow-v1.9.16.zip` 共 107 项，ZIP CRC 检查通过并包含新增案例素材。Prompt 12–15 的目标已达到；Visual ≥8 正式案例与全部真实生成回归未达到，待服务商配置后继续验证。临时浏览器配置和探针脚本已清理。

测试边界：Edge 自动化使用浏览器真实扩展页面与真实文件输入事件；没有进行人工目视点击、真实外部服务调用或跨用户安装环境验证。保留 `testing` 标记以避免误导用户。
