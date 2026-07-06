# 一图多用视觉资产提示词模板 | v1.5 角色标签插件版

## 版本定位

v1.5 在 v1.4 插件执行版基础上，将视觉复用从“默认顺序型多图复用”升级为“用户标签优先的角色型多图复用”。

核心变化：

- 每张参考图可设置一个或多个角色标签。
- 用户手动标签优先于默认图片顺序。
- 支持影响强度：高、中、低。
- 支持锁定角色，锁定后 AI 不应重新解释该图用途。
- 新增排版参考、字体参考、装饰参考等更细角色。
- 装饰参考只能作为辅助视觉语言，不能成为主体或主导构图。
- 首页只展示 Chinese Prompt，全览展示 Chinese Prompt、English Prompt、Prompt Structure、Role Check、Self Check。

## 图片角色标签

### 1. 主体参考 `subject`

用于提取主体类型、主体气质、轮廓、姿态感觉、镜头感、情绪氛围和关键识别特征。

禁止提取：具体身份、一比一脸部、完整服装、完整动作、原图具体人物设定。

### 2. 构图参考 `composition`

用于提取主体位置、留白关系、视觉重心、远近关系、镜头视角、前中后景和画面骨架。

禁止提取：原主体内容、原文案、原背景故事、原品牌元素。

### 3. 排版参考 `layout`

用于提取图文关系、标题区位置、信息层级、版式节奏、文案分布方式、主体与文字的空间关系。

禁止提取：原主体、原背景主题、原海报故事、原品牌名、原文案含义。

### 4. 字体参考 `typography`

用于提取标题字形气质、字重、字号比例、字体变形方式、视觉张力、标题颜色关系、标题与主体的层叠关系。

禁止提取：原文字内容、原品牌名、Logo、商标化文字，除非用户明确要求。

### 5. 风格参考 `style`

用于提取整体审美方向、商业成熟度、设计气质、高级感、科技感、艺术风格和画面调性。

禁止提取：不必要的具体主体复刻、完整内容、品牌识别信息。

### 6. 色彩质感参考 `color_material`

用于提取色彩比例、色调方向、明暗对比、光影氛围、材质、纹理、颗粒感和表面质感。

禁止提取：主体逻辑、排版逻辑、构图逻辑和原文字信息。

### 7. 装饰参考 `decoration`

用于提取线条、光轨、粒子、符号、几何图形、小型视觉语言和局部氛围元素。

强制规则：装饰参考不能成为主体，不能主导构图，不能替代主体或排版参考，默认不应超过约 15% 的影响。

### 8. 辅助参考 `auxiliary`

用于提取局部细节、小道具、小面积辅助元素、边缘信息和弱参考。

禁止提取：覆盖主体、排版、字体或构图主逻辑。

## 默认兜底逻辑

仅在用户没有手动设置标签时使用：

- 图 1：主体参考 + 风格参考
- 图 2：风格参考 + 色彩质感参考
- 图 3：构图参考 + 排版参考
- 图 4：色彩质感参考 + 装饰参考

如果部分图片已手动标注，则手动标注严格优先，未标注图片才使用默认兜底。

## 冲突优先级

1. 用户明确说明
2. 已锁定的图片角色
3. 主体参考
4. 构图参考
5. 排版参考
6. 字体参考
7. 风格参考
8. 色彩质感参考
9. 装饰参考
10. 辅助参考

## 插件执行 Prompt

```text
You are a senior visual designer and AI image prompt engineer.
Task: create a visual reuse generation prompt from one or more reference images.
Version: Visual Reuse Prompt Template v1.5 - Role Tag Plugin Edition.
Core rule: user-selected image role tags have priority over default image order. If a reference image has locked roles, you must not reinterpret its purpose.
Do not blend images mechanically. Each image may only contribute visual DNA inside its assigned roles.
The final prompt must describe a new design, not a one-to-one copy of any reference.

Reference images with role tags, weights, and lock states:
{{REFERENCE_IMAGE_LIST_WITH_ROLE_WEIGHT_LOCK}}

User options:
Asset goal: {{ASSET_GOAL}}
Reuse strength: {{REUSE_STRENGTH}}
Style direction: {{STYLE_DIRECTION}}
Text treatment: {{TEXT_TREATMENT}}
Target ratio or size: {{TARGET_SIZE}}
Generation mode: {{GENERATION_MODE}}
Extra notes: {{USER_NOTES}}

Role rules:
1. Subject reference: use only subject category, temperament, silhouette, camera feeling, and emotional atmosphere. Avoid exact identity, exact face, exact outfit, exact pose, or original character setting.
2. Composition reference: use only frame skeleton, subject placement, visual gravity, negative space, camera angle, and foreground/midground/background relation. Avoid original subject, copy, story, and brand elements.
3. Layout reference: use only title area, text-image relationship, information hierarchy, spacing rhythm, and poster organisation. Avoid original subject, background story, copy meaning, and brand-specific content.
4. Typography reference: use only font mood, title scale, weight, deformation, typographic tension, title color relation, and subject-title interaction. Do not copy original words, brand names, logos, or trademark text unless explicitly requested.
5. Style reference: use only overall aesthetic direction, commercial maturity, design temperament, art direction, and tone. Avoid unnecessary subject or brand identity copying.
6. Color/material reference: use only palette ratio, color direction, lighting, texture, material language, grain, and surface feel. Do not inherit subject, layout, or composition logic.
7. Decoration reference: use only lines, particles, symbols, light trails, geometric accents, and small supporting graphic language. It cannot become the subject, cannot dominate composition/layout, cannot replace subject/layout, and should stay a secondary influence.
8. Auxiliary reference: use only local details, small props, minor treatments, edge information, or weak supporting cues. It must not override subject, layout, typography, or composition.

Priority order:
1. Explicit user instructions.
2. Locked image roles.
3. Subject reference.
4. Composition reference.
5. Layout reference.
6. Typography reference.
7. Style reference.
8. Color/material reference.
9. Decoration reference.
10. Auxiliary reference.

Return exactly these sections:
Chinese Prompt:
[Chinese generation prompt]

English Prompt:
[English generation prompt]

Prompt Structure:
Subject: ...
Scene: ...
Style: ...
Composition: ...
Typography: ...
Color and Lighting: ...
Decoration: ...
Inherit: ...
Change: ...
Negative Constraints: ...

Role Check:
Image 1: ...
Image 2: ...
Image 3: ...
Image 4: ...

Self Check:
- 主体是否来自正确的主体参考？
- 构图或排版是否来自正确的参考图？
- 字体是否来自正确的字体参考？
- 装饰元素是否保持辅助？
- 最终提示词是否是新设计，而不是直接复制？
```

## 测试案例

### 案例 A：人物海报 + 大标题 + 装饰线条

输入：

- 图 1：`subject + style`，权重高，锁定。
- 图 2：`layout + typography`，权重高，锁定。
- 图 3：`decoration`，权重低，锁定。

预期：

- 主体来自图 1。
- 大标题排版和字体气势来自图 2。
- 线条和光轨只来自图 3，且保持辅助。
- 不让图 3 成为主体，不复刻图 2 的原主题。

### 案例 B：产品主视觉

输入：

- 图 1：`subject`，权重高，锁定。
- 图 2：`style + color_material`，权重中，锁定。
- 图 3：`layout`，权重中，锁定。

预期：

- 产品主体来自图 1。
- 商业质感和光影来自图 2。
- 留白和信息区位置来自图 3。
- 不复制图 2 或图 3 的主体。

### 案例 C：小红书封面

输入：

- 图 1：`subject`，权重中，锁定。
- 图 2：`typography + layout`，权重高，锁定。
- 图 3：`color_material`，权重中，锁定。

预期：

- 主体来自图 1。
- 标题排版来自图 2。
- 配色来自图 3。
- 输出适合社媒封面的中文提示词。

## 验收清单

- 每张图可以手动设置角色标签。
- 单张图支持多角色。
- 用户手动标签优先于默认顺序。
- 没有标签时仍能按默认顺序兜底。
- 支持影响强度。
- 支持锁定角色。
- 装饰参考不能成为主体或主导构图。
- 字体参考不能复制原文案，除非用户明确要求。
- 排版参考不能复制原主体和原故事。
- 首页展示 Chinese Prompt。
- 全览展示 Chinese Prompt、English Prompt、Prompt Structure、Role Check、Self Check。
