(function initAssetFlowReusePlan(globalScope) {
  "use strict";

  const SCHEMA = "lyz.assetflow.reuse-plan";
  const SCHEMA_VERSION = "1.0";
  const COMPILER_VERSION = "1.0";
  const MAX_REFERENCES = 4;
  const MIN_CANVAS_EDGE = 128;
  const MAX_CANVAS_EDGE = 4096;

  const ROLE_LABELS = {
    subject: "主体",
    composition: "构图",
    layout: "排版",
    typography: "字体",
    style: "风格",
    color_material: "色彩质感",
    decoration: "装饰",
    auxiliary: "辅助",
    auto: "自动分析"
  };

  const ASSET_TYPE_LABELS = {
    auto: "自动判断的视觉资产",
    xiaohongshu: "小红书封面",
    ecommerce: "电商主图",
    "brand-kv": "品牌 KV",
    poster: "商业海报",
    advertising: "广告视觉",
    ip: "IP 延展视觉",
    ui: "UI 界面",
    video: "视频首帧",
    "event-kv": "活动主视觉",
    product: "产品宣传图",
    social: "社媒视觉"
  };

  const STYLE_LABELS = {
    original: "保持参考图的风格方向",
    auto: "根据参考图自动判断风格",
    premium: "更高级",
    commercial: "更商业化",
    fashion: "更时尚",
    tech: "更科技感",
    young: "更年轻化",
    stable: "更稳重",
    impact: "更有视觉冲击",
    cinematic: "更电影感",
    light: "更轻量",
    real: "更真实",
    artistic: "更艺术化",
    minimal: "更极简",
    luxury: "更奢华",
    future: "更未来感"
  };

  const REUSE_MODE_LABELS = {
    precise_inherit: "精准继承",
    balanced_reuse: "平衡复用",
    creative_rewrite: "创意改写"
  };

  function cleanString(value, fallback = "") {
    const text = String(value ?? "").replace(/\s+/g, " ").trim();
    return text || fallback;
  }

  function cleanMultiline(value, fallback = "") {
    const text = String(value ?? "")
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    return text || fallback;
  }

  function cleanList(value) {
    const values = Array.isArray(value)
      ? value
      : cleanString(value)
        ? String(value).split(/[；;\n]+/)
        : [];
    return [...new Set(values.map((item) => cleanString(item)).filter(Boolean))];
  }

  function numberInRange(value, minimum, maximum, fallback = 0) {
    const number = Math.round(Number(value));
    return Number.isFinite(number) && number >= minimum && number <= maximum
      ? number
      : fallback;
  }

  function safeSourceUri(value) {
    const uri = cleanString(value);
    return /^(data|blob):/i.test(uri) ? "" : uri;
  }

  function normalizeTextMode(value) {
    const raw = cleanString(value, "auto");
    if (["with-text", "enhance-title", "generate-title-style", "replace-copy"].includes(raw)) {
      return "with-text";
    }
    if (["reserve", "weaken", "typography-only", "title-position"].includes(raw)) {
      return "reserve";
    }
    if (raw === "none" || raw === "keep-original") return raw;
    return "auto";
  }

  function stableStringify(value) {
    if (Array.isArray(value)) {
      return `[${value.map(stableStringify).join(",")}]`;
    }
    if (value && typeof value === "object") {
      return `{${Object.keys(value).sort().map((key) => (
        `${JSON.stringify(key)}:${stableStringify(value[key])}`
      )).join(",")}}`;
    }
    return JSON.stringify(value);
  }

  function shortHash(value) {
    const source = stableStringify(value);
    let hash = 2166136261;
    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function makeId(prefix = "reuse-plan") {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function normalizeRoles(value, index = 0) {
    const fallbackRoles = [
      ["subject"],
      ["auto"],
      ["auto"],
      ["auto"]
    ];
    const roles = (Array.isArray(value) ? value : [value])
      .map((role) => cleanString(role))
      .filter((role) => ROLE_LABELS[role]);
    return [...new Set(roles)].slice(0, 2).length
      ? [...new Set(roles)].slice(0, 2)
      : fallbackRoles[Math.min(Math.max(index, 0), fallbackRoles.length - 1)];
  }

  function normalizeReference(reference = {}, index = 0) {
    const source = reference.assetSource || reference.source || {};
    const width = numberInRange(
      reference.actualWidth || reference.width || reference.dimensions?.width,
      1,
      100000
    );
    const height = numberInRange(
      reference.actualHeight || reference.height || reference.dimensions?.height,
      1,
      100000
    );
    const assetId = cleanString(reference.assetId || reference.id, `asset-${index + 1}`);
    const roles = normalizeRoles(reference.roles || reference.visualReuseRoles || reference.visualReuseRole, index);
    const sourceKind = cleanString(source.kind || source.type, "legacy");
    const sourceUri = safeSourceUri(source.uri || source.url || reference.originalUrl || reference.src);
    const pageUrl = safeSourceUri(source.pageUrl || reference.pageUrl);

    return {
      assetId,
      order: index + 1,
      name: cleanString(reference.name, `参考图 ${index + 1}`),
      source: {
        kind: sourceKind,
        uri: sourceUri,
        pageUrl,
        mimeType: cleanString(source.mimeType || reference.mimeType),
        byteSize: Math.max(0, Number(source.byteSize) || 0),
        lastModified: Math.max(0, Number(source.lastModified) || 0)
      },
      dimensions: {
        width,
        height,
        verified: Boolean(reference.dimensionsVerified || reference.dimensionVerified || (width && height)),
        verifiedAt: cleanString(reference.dimensionsVerifiedAt || reference.dimensionVerifiedAt)
      },
      roles,
      roleLabels: roles.map((role) => ROLE_LABELS[role]),
      roleSource: reference.rolesManual || reference.visualReuseRolesManual ? "manual" : reference.rolesNaturalLanguage ? "requirement" : "fallback",
      strength: ["high", "medium", "low"].includes(reference.strength || reference.visualReuseWeight)
        ? (reference.strength || reference.visualReuseWeight)
        : (reference.rolesManual || reference.visualReuseRolesManual ? "high" : "medium"),
      locked: reference.locked !== false && reference.visualReuseLocked !== false,
      relationships: roles.map((role) => ({
        type: "contributes",
        dimension: role,
        target: "derived-visual"
      }))
    };
  }

  function createDraft(input = {}) {
    const references = (Array.isArray(input.references) ? input.references : [])
      .slice(0, MAX_REFERENCES)
      .map(normalizeReference);
    const canvas = {
      width: numberInRange(input.canvas?.width || input.width, MIN_CANVAS_EDGE, MAX_CANVAS_EDGE, 1024),
      height: numberInRange(input.canvas?.height || input.height, MIN_CANVAS_EDGE, MAX_CANVAS_EDGE, 1024),
      sizeMode: cleanString(input.canvas?.sizeMode || input.sizeMode, "custom"),
      resolution: cleanString(
        input.canvas?.resolution
          || input.resolution
          || (["2k", "4k"].includes(input.canvas?.sizeMode || input.sizeMode)
            ? (input.canvas?.sizeMode || input.sizeMode)
            : (input.canvas?.sizeMode || input.sizeMode) === "auto"
              ? "auto"
              : "1k")
      ),
      ratioLabel: cleanString(input.canvas?.ratioLabel || input.ratioLabel)
    };
    const intent = {
      coreRequirement: cleanMultiline(input.intent?.coreRequirement || input.coreRequirement),
      assetType: cleanString(input.intent?.assetType || input.assetType, "auto"),
      assetTypeLabel: cleanString(
        input.intent?.assetTypeLabel,
        ASSET_TYPE_LABELS[input.intent?.assetType || input.assetType] || ASSET_TYPE_LABELS.auto
      ),
      reuseMode: cleanString(input.intent?.reuseMode || input.reuseMode, "precise_inherit"),
      reuseModeLabel: cleanString(
        input.intent?.reuseModeLabel,
        REUSE_MODE_LABELS[input.intent?.reuseMode || input.reuseMode] || REUSE_MODE_LABELS.precise_inherit
      ),
      style: cleanString(input.intent?.style || input.style, "original"),
      styleLabel: cleanString(
        input.intent?.styleLabel,
        STYLE_LABELS[input.intent?.style || input.style] || STYLE_LABELS.original
      ),
      generationMode: cleanString(input.intent?.generationMode || input.generationMode, "text")
    };
    const textStrategy = {
      mode: normalizeTextMode(input.textStrategy?.mode || input.textMode),
      content: cleanMultiline(input.textStrategy?.content || input.textContent),
      layout: cleanString(input.textStrategy?.layout),
      rationale: cleanString(input.textStrategy?.rationale)
    };
    const id = cleanString(input.id, makeId());
    const fingerprintSource = { intent, references, canvas, textStrategy };
    const inputFingerprint = `reuse-${shortHash(fingerprintSource)}`;

    return {
      schema: SCHEMA,
      schemaVersion: SCHEMA_VERSION,
      id,
      status: "draft",
      createdAt: cleanString(input.createdAt, new Date().toISOString()),
      updatedAt: new Date().toISOString(),
      inputFingerprint,
      intent,
      references,
      canvas,
      textStrategy,
      analysis: {
        summary: "",
        imageType: "",
        subject: "",
        action: "",
        scene: "",
        composition: "",
        layout: "",
        colorLighting: "",
        materialTexture: "",
        style: "",
        decoration: "",
        inheritedTraits: [],
        changedTraits: [],
        negativeConstraints: []
      },
      analysisEn: {},
      referenceInsights: [],
      roleCheck: [],
      selfCheck: [],
      lineage: {
        relationshipType: "visual-reuse",
        sourceAssetIds: references.map((reference) => reference.assetId),
        derivedAssetId: "",
        parentPlanId: cleanString(input.parentPlanId)
      },
      validation: {
        dimensionsVerified: references.length > 0 && references.every((reference) => reference.dimensions.verified),
        issues: []
      },
      compiler: {
        version: COMPILER_VERSION,
        lastCompiledAt: ""
      }
    };
  }

  function normalizeAnalysis(value = {}) {
    return {
      summary: cleanMultiline(value.summary),
      imageType: cleanMultiline(value.imageType || value.image_type),
      subject: cleanMultiline(value.subject),
      action: cleanMultiline(value.action || value.pose || value.poseAndAction),
      scene: cleanMultiline(value.scene),
      composition: cleanMultiline(value.composition),
      layout: cleanMultiline(value.layout || value.layoutAndText),
      colorLighting: cleanMultiline(value.colorLighting || value.color_and_lighting),
      materialTexture: cleanMultiline(value.materialTexture || value.material_and_texture),
      style: cleanMultiline(value.style),
      decoration: cleanMultiline(value.decoration),
      inheritedTraits: cleanList(value.inheritedTraits || value.inherited_traits),
      changedTraits: cleanList(value.changedTraits || value.changed_traits),
      negativeConstraints: cleanList(value.negativeConstraints || value.negative_constraints)
    };
  }

  function extractJsonObject(raw) {
    const source = String(raw || "")
      .replace(/^\s*```(?:json)?\s*/i, "")
      .replace(/\s*```\s*$/i, "")
      .trim();
    const start = source.indexOf("{");
    const end = source.lastIndexOf("}");
    if (start < 0 || end <= start) return null;
    try {
      return JSON.parse(source.slice(start, end + 1));
    } catch {
      return null;
    }
  }

  function applyAnalysisResponse(draft, rawResponse) {
    const base = normalizePlan(draft);
    const parsed = extractJsonObject(rawResponse);
    const payload = parsed?.reusePlan || parsed || {};
    const analysis = normalizeAnalysis(payload.analysis || payload);
    const unstructured = !parsed;
    if (unstructured) {
      analysis.summary = cleanMultiline(rawResponse).slice(0, 1600);
    }

    const textStrategyPayload = payload.textStrategy || {};
    const next = {
      ...base,
      status: "ready",
      updatedAt: new Date().toISOString(),
      analysis,
      analysisEn: normalizeAnalysis(payload.analysisEn || payload.english || {}),
      referenceInsights: (Array.isArray(payload.referenceInsights) ? payload.referenceInsights : [])
        .slice(0, MAX_REFERENCES)
        .map((insight, index) => ({
          assetId: cleanString(insight.assetId, base.references[index]?.assetId || ""),
          observations: cleanList(insight.observations || insight.traits),
          boundaries: cleanList(insight.boundaries || insight.constraints)
        })),
      textStrategy: {
        ...base.textStrategy,
        mode: normalizeTextMode(textStrategyPayload.mode || base.textStrategy.mode),
        content: cleanMultiline(textStrategyPayload.content || base.textStrategy.content),
        layout: cleanMultiline(textStrategyPayload.layout || base.textStrategy.layout),
        rationale: cleanMultiline(textStrategyPayload.rationale || base.textStrategy.rationale)
      },
      roleCheck: cleanList(payload.roleCheck),
      selfCheck: cleanList(payload.selfCheck)
    };

    const validation = validate(next);
    if (unstructured) {
      validation.issues.push({
        code: "ANALYSIS_RESPONSE_UNSTRUCTURED",
        severity: "warning",
        message: "分析 API 未返回标准 JSON，已保留原始分析作为兼容方案。"
      });
    }
    next.validation = validation;
    return next;
  }

  function normalizePlan(value = {}) {
    if (value.schema === SCHEMA && value.schemaVersion === SCHEMA_VERSION) {
      const draft = createDraft({
        ...value,
        id: value.id,
        createdAt: value.createdAt,
        references: value.references,
        canvas: value.canvas,
        intent: value.intent,
        textStrategy: value.textStrategy,
        parentPlanId: value.lineage?.parentPlanId
      });
      return {
        ...draft,
        ...value,
        intent: { ...draft.intent, ...(value.intent || {}) },
        references: draft.references,
        canvas: { ...draft.canvas, ...(value.canvas || {}) },
        textStrategy: { ...draft.textStrategy, ...(value.textStrategy || {}) },
        analysis: normalizeAnalysis(value.analysis),
        analysisEn: normalizeAnalysis(value.analysisEn),
        lineage: { ...draft.lineage, ...(value.lineage || {}) },
        validation: {
          dimensionsVerified: Boolean(value.validation?.dimensionsVerified),
          issues: Array.isArray(value.validation?.issues) ? value.validation.issues : []
        },
        compiler: { ...draft.compiler, ...(value.compiler || {}) }
      };
    }

    return createDraft(value);
  }

  function validate(planInput) {
    const plan = planInput?.schema === SCHEMA ? planInput : normalizePlan(planInput);
    const issues = [];
    if (!plan.references.length) {
      issues.push({ code: "REFERENCES_REQUIRED", severity: "error", message: "至少需要 1 张参考图。" });
    }
    if (!cleanMultiline(plan.intent.coreRequirement)) {
      issues.push({ code: "CORE_REQUIREMENT_REQUIRED", severity: "error", message: "请填写核心需求。" });
    }
    if (!numberInRange(plan.canvas.width, MIN_CANVAS_EDGE, MAX_CANVAS_EDGE)) {
      issues.push({ code: "CANVAS_WIDTH_INVALID", severity: "error", message: `目标宽度需在 ${MIN_CANVAS_EDGE}-${MAX_CANVAS_EDGE} 之间。` });
    }
    if (!numberInRange(plan.canvas.height, MIN_CANVAS_EDGE, MAX_CANVAS_EDGE)) {
      issues.push({ code: "CANVAS_HEIGHT_INVALID", severity: "error", message: `目标高度需在 ${MIN_CANVAS_EDGE}-${MAX_CANVAS_EDGE} 之间。` });
    }
    plan.references.forEach((reference, index) => {
      if (!reference.dimensions.width || !reference.dimensions.height || !reference.dimensions.verified) {
        issues.push({
          code: "REFERENCE_DIMENSIONS_UNVERIFIED",
          severity: "error",
          message: `参考图 ${index + 1} 的真实尺寸尚未校验。`
        });
      }
    });
    if (plan.textStrategy.mode === "with-text" && !cleanMultiline(plan.textStrategy.content)) {
      issues.push({
        code: "VISIBLE_TEXT_EMPTY",
        severity: "warning",
        message: "已选择直接生成文字，但未填写具体文案。"
      });
    }
    const hasSubjectOwner = plan.references.some((reference) => reference.roles.includes("subject"));
    if (!hasSubjectOwner && plan.references.length) {
      issues.push({
        code: "SUBJECT_OWNER_INFERRED",
        severity: "warning",
        message: "没有显式主体参考，将按参考图顺序推断主体归属。"
      });
    }
    return {
      dimensionsVerified: plan.references.length > 0
        && plan.references.every((reference) => reference.dimensions.verified),
      issues
    };
  }

  function buildAnalysisInstruction(planInput) {
    const plan = normalizePlan(planInput);
    const compactPlan = {
      id: plan.id,
      intent: plan.intent,
      canvas: plan.canvas,
      textStrategy: plan.textStrategy,
      references: plan.references.map((reference) => ({
        assetId: reference.assetId,
        order: reference.order,
        name: reference.name,
        dimensions: reference.dimensions,
        roles: reference.roles,
        roleSource: reference.roleSource,
        strength: reference.strength,
        locked: reference.locked,
        relationships: reference.relationships
      }))
    };

    return [
      "You are the visual analysis stage of AssetFlow.",
      "Analyze the supplied reference images into structured reusable visual facts.",
      "Do not write a generation prompt. Prompt compilation happens in a separate deterministic stage.",
      "Respect role ownership: an image may contribute only the dimensions named in its roles.",
      "A non-subject reference must not introduce its visible main object as the final subject.",
      "Locked roles and the user's core requirement have priority. Decoration must remain secondary.",
      "The selected canvas size is authoritative and overrides reference aspect ratios.",
      "",
      "ReusePlan draft:",
      JSON.stringify(compactPlan, null, 2),
      "",
      "Return one valid JSON object only, without markdown fences, using this shape:",
      JSON.stringify({
        analysis: {
          summary: "Chinese summary of the reuse direction",
          imageType: "Chinese visual asset type",
          subject: "Chinese subject description",
          action: "Chinese pose or action",
          scene: "Chinese scene description",
          composition: "Chinese composition description",
          layout: "Chinese layout and text-zone description",
          colorLighting: "Chinese color and lighting description",
          materialTexture: "Chinese material and texture description",
          style: "Chinese style description",
          decoration: "Chinese secondary decoration description",
          inheritedTraits: ["Chinese trait"],
          changedTraits: ["Chinese change"],
          negativeConstraints: ["Chinese constraint"]
        },
        analysisEn: {
          imageType: "English image type",
          subject: "English subject",
          action: "English pose and action",
          scene: "English scene",
          composition: "English composition",
          layout: "English layout and text",
          colorLighting: "English color and lighting",
          materialTexture: "English material and texture",
          style: "English style",
          decoration: "English decoration",
          inheritedTraits: ["English trait"],
          changedTraits: ["English change"],
          negativeConstraints: ["English constraint"]
        },
        referenceInsights: [
          {
            assetId: "asset id copied from the draft",
            observations: ["traits allowed by this reference roles"],
            boundaries: ["traits this reference must not contribute"]
          }
        ],
        textStrategy: {
          mode: plan.textStrategy.mode,
          content: plan.textStrategy.content,
          layout: "Chinese text layout decision",
          rationale: "Chinese reason for this text decision"
        },
        roleCheck: ["Chinese ownership check for each reference"],
        selfCheck: ["Chinese validation statement"]
      }, null, 2)
    ].join("\n");
  }

  function joinText(parts, fallback = "") {
    return parts.map((part) => cleanMultiline(part)).filter(Boolean).join("；") || fallback;
  }

  function textInstruction(plan, language = "zh") {
    const mode = normalizeTextMode(plan.textStrategy.mode);
    const content = cleanMultiline(plan.textStrategy.content);
    const layout = cleanMultiline(plan.textStrategy.layout || plan.analysis.layout);
    if (language === "en") {
      if (mode === "none") return "No visible text, letters, numbers, logo, or watermark.";
      if (mode === "keep-original") return joinText(["Keep the original reference text unchanged where it appears", layout]);
      if (mode === "reserve") return joinText(["Reserve a clean text area without generating readable copy", layout]);
      if (mode === "with-text") return joinText([
        content ? `Generate the exact visible copy: ${content}` : "Generate concise visible title copy",
        layout
      ]);
      return joinText(["Use text only when required by the asset type", content, layout]);
    }
    if (mode === "none") return "不生成可见文字、字母、数字、Logo 或水印。";
    if (mode === "keep-original") return joinText(["保留参考图中已有文字，不改写原文", layout]);
    if (mode === "reserve") return joinText(["只预留清晰文字区域，不直接生成可读文案", layout]);
    if (mode === "with-text") return joinText([
      content ? `直接生成指定文案“${content}”` : "生成简洁可见标题文案",
      layout
    ]);
    return joinText(["根据资产用途决定是否需要文字", content, layout]);
  }

  function referenceInheritanceSummary(plan, language = "zh") {
    if (language === "en") {
      return plan.references.map((reference) => (
        `Reference ${reference.order} contributes ${reference.roles.join(" + ")} at ${reference.strength} strength`
      )).join("; ");
    }
    return plan.references.map((reference) => (
      `参考图 ${reference.order} 以${reference.roleLabels.join("＋")}角色按${reference.strength === "high" ? "高" : reference.strength === "low" ? "低" : "中"}强度贡献`
    )).join("；");
  }

  function compile(planInput) {
    const plan = normalizePlan(planInput);
    const validation = validate(plan);
    const errors = validation.issues.filter((issue) => issue.severity === "error");
    if (errors.length) {
      const error = new Error(errors.map((issue) => issue.message).join(" "));
      error.code = "REUSE_PLAN_INVALID";
      error.issues = validation.issues;
      throw error;
    }

    const analysis = plan.analysis;
    const analysisEn = plan.analysisEn;
    const inherited = joinText([
      referenceInheritanceSummary(plan),
      ...analysis.inheritedTraits
    ], "按已分配角色继承参考图视觉特征。");
    const changes = joinText([
      plan.intent.coreRequirement,
      plan.intent.style === "original" ? "" : plan.intent.styleLabel,
      ...analysis.changedTraits
    ], "围绕核心需求完成必要变化。");
    const avoid = joinText([
      ...analysis.negativeConstraints,
      "避免机械拼图、一比一复制、错误主体归属、原图 Logo、商标、水印和无关文字"
    ]);
    const chineseSections = [
      ["画面类型", analysis.imageType || plan.intent.assetTypeLabel],
      ["主体", analysis.subject || plan.intent.coreRequirement],
      ["动作姿态", analysis.action || "动作与视角服务于核心需求，保持自然、清晰、可执行"],
      ["构图", joinText([analysis.composition, `目标画布 ${plan.canvas.width} × ${plan.canvas.height}`])],
      ["排版文字", textInstruction(plan, "zh")],
      ["色彩光照", analysis.colorLighting || "根据已分配的色彩与风格参考保持一致的色彩比例和光照逻辑"],
      ["材质质感", analysis.materialTexture || "保留参考角色允许贡献的材质、纹理与商业质感"],
      ["风格", joinText([analysis.style, plan.intent.styleLabel])],
      ["装饰", analysis.decoration || "装饰保持辅助，不抢主体与信息层级"],
      ["继承要求", inherited],
      ["变化要求", changes],
      ["避免", avoid]
    ];

    const englishHasContent = Object.values(analysisEn).some((value) => (
      Array.isArray(value) ? value.length : Boolean(cleanString(value))
    ));
    const englishSections = englishHasContent ? [
      ["Image Type", analysisEn.imageType || plan.intent.assetTypeLabel],
      ["Subject", analysisEn.subject || plan.intent.coreRequirement],
      ["Pose and Action", analysisEn.action || "Keep the pose, camera relationship, and action natural and generation-ready."],
      ["Composition", joinText([analysisEn.composition, `Authoritative canvas ${plan.canvas.width} × ${plan.canvas.height}`])],
      ["Layout and Text", textInstruction(plan, "en")],
      ["Color and Lighting", analysisEn.colorLighting],
      ["Material and Texture", analysisEn.materialTexture],
      ["Style", analysisEn.style],
      ["Decoration", analysisEn.decoration || "Keep decoration secondary to the subject and information hierarchy."],
      ["Inheritance Requirements", joinText([referenceInheritanceSummary(plan, "en"), ...analysisEn.inheritedTraits])],
      ["Change Requirements", joinText([...analysisEn.changedTraits, plan.intent.coreRequirement])],
      ["Avoid", joinText([...analysisEn.negativeConstraints, "mechanical collage, one-to-one copying, wrong subject ownership, logos, trademarks, watermarks, and unrelated text"])]
    ] : [];

    const roleCheck = plan.roleCheck.length
      ? plan.roleCheck
      : plan.references.map((reference) => (
        `参考图 ${reference.order}：${reference.roleLabels.join("＋")}；来源 ${reference.source.kind}；真实尺寸 ${reference.dimensions.width} × ${reference.dimensions.height}。`
      ));
    const selfCheck = plan.selfCheck.length
      ? plan.selfCheck
      : [
        "角色归属、锁定状态与复用强度已纳入方案。",
        "目标尺寸已通过真实尺寸校验并拥有最高优先级。",
        "装饰保持辅助，文字策略按当前条件执行。"
      ];
    const structure = [
      `ReusePlan：${plan.id} · ${plan.schemaVersion}`,
      `核心需求：${plan.intent.coreRequirement}`,
      `目标画布：${plan.canvas.width} × ${plan.canvas.height}`,
      `资产来源关系：${plan.references.map((reference) => `${reference.assetId} -> ${reference.roleLabels.join("＋")}`).join("；")}`,
      "",
      "Role Check:",
      ...roleCheck.map((item) => `- ${item}`),
      "",
      "Self Check:",
      ...selfCheck.map((item) => `- ${item}`)
    ].join("\n");

    plan.compiler = {
      version: COMPILER_VERSION,
      lastCompiledAt: new Date().toISOString()
    };
    plan.validation = validation;
    return {
      plan,
      chinese: chineseSections.map(([label, value]) => `${label}：\n${cleanMultiline(value, "按方案执行")}`).join("\n\n"),
      english: englishSections.map(([label, value]) => `${label}:\n${cleanMultiline(value, "Follow the approved reuse plan.")}`).join("\n\n"),
      structure,
      roleCheck: roleCheck.join("\n"),
      selfCheck: selfCheck.join("\n")
    };
  }

  function lineageSnapshot(planInput) {
    const plan = normalizePlan(planInput);
    return {
      relationshipType: plan.lineage.relationshipType,
      planId: plan.id,
      planVersion: plan.schemaVersion,
      sourceAssetIds: [...plan.lineage.sourceAssetIds],
      sourceAssets: plan.references.map((reference) => ({
        assetId: reference.assetId,
        name: reference.name,
        source: { ...reference.source },
        dimensions: { ...reference.dimensions },
        roles: [...reference.roles],
        strength: reference.strength,
        locked: reference.locked
      }))
    };
  }

  const api = {
    SCHEMA,
    SCHEMA_VERSION,
    COMPILER_VERSION,
    ROLE_LABELS,
    ASSET_TYPE_LABELS,
    STYLE_LABELS,
    REUSE_MODE_LABELS,
    normalizeTextMode,
    createDraft,
    normalizePlan,
    validate,
    buildAnalysisInstruction,
    applyAnalysisResponse,
    compile,
    lineageSnapshot
  };

  globalScope.AssetFlowReusePlan = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
