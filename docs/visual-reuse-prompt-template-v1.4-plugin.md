# 一图多用视觉资产提示词模板｜v1.4 插件执行版

> 基于 `v1.3 最终完整版` 精简而来。  
> v1.3 适合完整对话和长流程分析；v1.4 插件版适合 Chrome 插件内低 token、稳定、多图输入的视觉复用生成。

---

## 1. 版本定位

本模板用于插件的「视觉复用」功能：

- 用户上传或右键添加 1-4 张参考图。
- 插件先按图片顺序分配分析角色，也允许用户在缩略图上手动修改每张图的参考类型。
- AI 提取可复用视觉 DNA，而不是直接拼图或仿图。
- 最终只输出可用于生图的提示词、英文版提示词、提示词结构。

插件首页默认展示中文提示词；全览视图展示中文、英文、提示词结构。

---

## 2. 与 v1.3 的区别

| 项目 | v1.3 完整版 | v1.4 插件版 |
| --- | --- | --- |
| 输入方式 | 主要围绕单张参考图 | 支持 1-4 张参考图 |
| 执行方式 | 长流程分析、变量卡、按需展开 | 精简角色分工 + 固定输出 |
| Token 使用 | 适合完整对话 | 适合插件频繁调用 |
| 输出重点 | 分析、变量、模型建议、最佳提示词 | 中文提示词、英文提示词、提示词结构 |
| 交互方式 | 可追问用户变量 | 以当前选择项和补充要求为主 |

---

## 3. 多图角色分工

插件最多取前 4 张参考图。默认按顺序分配角色；如果用户在缩略图上手动选择参考类型，则以用户选择为准：

| 图片 | 分析角色 | 提取重点 |
| --- | --- | --- |
| 图 1 | 主参考图 | 主体类型、核心卖点、画面情绪、必须保留的识别特征 |
| 图 2 | 风格参考图 | 色彩、材质、光影、商业质感、设计成熟度 |
| 图 3 | 构图参考图 | 镜头、视角、主体位置、留白、文字区、版式骨架 |
| 图 4 | 色彩/质感参考图 | 色彩比例、纹理、氛围、装饰语言、细节密度 |
| 第 5 张及以后 | 暂不进入插件默认分析 | 可作为未来增强功能 |

如果只有 1 张图，则该图同时承担「主参考 + 风格 + 构图」的基础分析。

---

## 4. 复用强度

| 强度 | 执行规则 |
| --- | --- |
| 轻度复用 | 只借用情绪、色彩倾向、构图大方向，主体和细节必须明显变化。 |
| 中度复用 | 保留主要视觉 DNA，包括气质、配色、构图逻辑和商业表达方式，但主体和局部细节需要重写。 |
| 高度复用 | 强继承视觉系统，但不能一比一复制身份、版式、文字、商标化元素或完整构图。 |
| 系统化复用 | 提炼为可反复生成的视觉模板体系，包括主体逻辑、场景逻辑、版式、配色、光影、文字区和变化规则。 |

---

## 5. 插件输入项

插件传给 AI 的上下文应包含：

- 参考图角色说明
- 使用目标
- 复用强度
- 风格方向
- 文字处理方式
- 目标比例或尺寸
- 生图模式：文生图 / 图生图
- 用户补充要求

这些信息足够完成视觉复用，不需要每次携带 v1.3 的完整模板全文。

---

## 6. 插件执行提示词

下面是插件内建议使用的精简执行模板。

```text
You are a senior visual designer and AI image prompt engineer.
Task: create a visual reuse generation prompt from one or more reference images.

Important:
- Do not blend images mechanically.
- Assign each image a role.
- Extract reusable design DNA.
- Write a fresh generation prompt, not a one-to-one copy.
- The homepage should use the Chinese prompt.
- The overview view can show Chinese, English, and structure.

Reference roles:
{{REFERENCE_ROLE_LIST}}

User options:
Asset goal: {{ASSET_GOAL}}
Reuse strength: {{REUSE_STRENGTH}}
Style direction: {{STYLE_DIRECTION}}
Text treatment: {{TEXT_TREATMENT}}
Target ratio or size: {{TARGET_SIZE}}
Generation mode: {{GENERATION_MODE}}
Extra notes: {{USER_NOTES}}

Reuse rule:
{{REUSE_RULE}}

Analysis priorities:
1. Identify subject, scene, product/IP role, and core visual selling point.
2. Extract visual DNA: composition, camera angle, color ratio, lighting, materials, texture, typography/text-zone logic, and mood.
3. Decide what must be inherited, what must change, and what must be avoided.
4. Write a generation-ready prompt that is specific, structured, and not a one-to-one copy.

Return exactly these sections. Keep the section labels in English, but write Chinese content under Chinese Prompt and Prompt Structure:

Chinese Prompt:
[A polished Chinese image generation prompt, directly usable.]

English Prompt:
[A polished English version of the same prompt.]

Prompt Structure:
Subject: ...
Scene: ...
Style: ...
Composition: ...
Color and Lighting: ...
Text: ...
Inherit: ...
Change: ...
Negative Constraints: ...

Do not include markdown fences. Do not mention that you are an AI.
```

---

## 7. 输出格式

AI 必须输出三块：

```text
Chinese Prompt:
……

English Prompt:
……

Prompt Structure:
Subject: ……
Scene: ……
Style: ……
Composition: ……
Color and Lighting: ……
Text: ……
Inherit: ……
Change: ……
Negative Constraints: ……
```

插件处理方式：

- `Chinese Prompt` 写入首页提示词文本框。
- `English Prompt` 写入全览视图英文模块。
- `Prompt Structure` 写入全览视图结构模块。

---

## 8. 省 Token 策略

为了让插件响应更快、更便宜：

- 不把 v1.3 完整模板全文塞进每次请求。
- 只传当前图片角色、用户选择项、复用强度规则、固定输出格式。
- 不默认追问用户，只使用界面已有选项和补充要求。
- 不在视觉复用阶段直接生成图片，只生成更清晰的提示词。
- 多图时只取前 4 张作为有效参考。

---

## 9. 质量判断标准

一次视觉复用结果算成功，需要满足：

- 不是简单描述原图，而是能生成新的视觉方案。
- 明确继承了色彩、氛围、版式或商业表达。
- 主体、场景、构图细节有变化，不像照抄。
- 中文提示词可以直接用于生图。
- 结构模块能看出主体、风格、构图、色彩、继承和变化关系。

---

## 10. 后续可扩展方向

后续如果要增强，可以加入：

- 用户手动给每张图指定角色。
- 保存每张图的视觉 DNA 分析缓存。
- 对话式追问 1-2 个关键变量。
- 针对小红书、电商、品牌 KV、UI、视频首帧拆分不同轻量模板。
- 将视觉复用结果保存为可复用模板卡。
