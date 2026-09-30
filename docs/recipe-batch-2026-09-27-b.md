# 灵感库案例扩展批次 B · 2026-09-27

依据：`LYZ-AssetFlow-灵感库案例扩展与上线开发流程-V1.md`。本批从 5 个不同方向筛选，正式上线 4 项，另 1 项留在案例研究区。此前未完成的海报版式复用在本批补完了标题文字的真实生成验证。

| 类型 | 案例 | 评分 | 状态 | 验证 |
| --- | --- | ---: | --- | --- |
| Prompt | 年代穿越胶片肖像 | 85 | verified | 同一原创约 25 岁成年女性肖像编辑为 1980 年代上海街景和 1990 年代北京室内，面部、长发和痣点可辨 |
| Prompt | 个人徽章收藏套装 | 83 | verified | 天文学家与植物学家两组不同变量均形成 1 主徽章 + 3 小徽章 |
| Prompt | 产品结构拆解图 | 84 | verified | 桌面风扇与便携阅读灯两组概念拆解图有清楚层级；不生成虚构尺寸或性能文字 |
| Visual | 海报版式复用 | 86 | verified | 双参考图编辑，陶艺人物与左右网格保持；两轮英文标题 `CLAY IN MOTION`、`FORM & FIRE` 均准确呈现 |
| Visual | 风格与构图双迁移 | 87 | testing | 三张原创参考图编辑两轮，主体瓶、左侧拱门底座构图和水彩纸张风格分工成立；尚未从插件案例研究区直接应用三图角色 |

产品结构图仅是视觉示意，不代表工程拆装说明；真实产品参数须由用户核实后再添加。海报测试覆盖两组英文短标题，复杂长文案和其他语言仍须在实际导出前校对。

## 来源与资源

年代肖像和徽章的案例线索来自 [GPT Image 案例汇编](https://github.com/opensource-works/awesome-gpt-image-prompts)，原作者链接保存在各自 `source.originalUrl`。产品拆解图的方法线索来自 [GPT Image 电商案例](https://github.com/buluslan/gpt-image2-ecommerce)。三图分工参考 [ComfyUI 参考图概念说明](https://github.com/Comfy-Org/workflow_templates/blob/main/site/knowledge/concepts/ip-adapter.md)。只借鉴机制；文案重新写作，人物、产品、风格参考、预览和第二轮证据均为本项目原创生成。来源浏览量无法可靠核实，记为 `null`。

本批新增或更新 `assets/recipes/previews/`、`thumbnails/`、`sources/`、`validation/` 对应 WebP。风格与构图双迁移的 `subject / composition / style` 三张参考图及结果保留在案例研究区。

## 回归

- `npm.cmd run check`：通过；正式库 11 个 Prompt、4 个 Visual，所有正式项有独立等比例 WebP 与验证字段。
- 467×948 Chrome 本地预览：Prompt 11 卡、Visual 4 卡；无横向溢出；产品结构拆解详情图 768px 可加载，变量中文标签与“应用到输入框”通过。
- 同视口：三张参考图上传成功，预设映射为 `subject / composition / style`；测试中案例只在“案例研究”出现。
- 海报方案：两张参考图上传后“使用方案”成功，图 1/图 2 角色写入 `subject / layout`，需求进入视觉复用输入框，抽屉正常关闭。
- `git diff --check` 与 `npm.cmd run package` 均通过；`dist/assetflow-v1.9.16.zip` CRC 完整，96 个条目，包含本批 JSON 与预览资源。

当前第一阶段目标（12～15 个 Prompt、8～10 个 Visual）尚未达到；按批次门槛继续，不将仅有预览图的案例提前计入正式库。
