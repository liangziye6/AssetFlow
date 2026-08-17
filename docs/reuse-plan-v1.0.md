# AssetFlow ReusePlan v1.0

`ReusePlan` 是视觉复用流程的中间数据层。视觉模型只负责分析参考图，`reuse-plan.js` 再把分析结果编译为生图提示词，避免把“看图分析”和“提示词写作”耦合在一次不可复核的输出里。

## 流程

1. 用户添加 1-4 张参考图并确认角色。
2. 插件在查看方案前重新读取每张图的 `naturalWidth` / `naturalHeight`。
3. 插件根据核心需求、角色、强度、文字策略和目标画布建立 draft。
4. 视觉 API 返回结构化分析 JSON，不直接返回最终生图提示词。
5. 编译器把 ready plan 生成中文 12 项执行提示词，并保留 Role Check、Self Check 和资产来源关系。
6. 生成任务、后台恢复记录和图库条目携带 `reusePlan` 与 `assetLineage`。

## 核心结构

```json
{
  "schema": "lyz.assetflow.reuse-plan",
  "schemaVersion": "1.0",
  "id": "reuse-plan-...",
  "status": "draft | ready",
  "inputFingerprint": "reuse-...",
  "intent": {
    "coreRequirement": "",
    "assetType": "poster",
    "reuseMode": "precise_inherit",
    "style": "original",
    "generationMode": "image"
  },
  "references": [
    {
      "assetId": "image-...",
      "order": 1,
      "source": {
        "kind": "local-file | web-url | page-drag | context-menu | clipboard-file | clipboard-url | legacy",
        "uri": "",
        "pageUrl": "",
        "mimeType": "",
        "byteSize": 0
      },
      "dimensions": {
        "width": 2048,
        "height": 2048,
        "verified": true,
        "verifiedAt": "ISO-8601"
      },
      "roles": ["subject", "style"],
      "strength": "high | medium | low",
      "locked": true,
      "relationships": [
        {
          "type": "contributes",
          "dimension": "subject",
          "target": "derived-visual"
        }
      ]
    }
  ],
  "canvas": {
    "width": 1080,
    "height": 1440,
    "sizeMode": "custom",
    "resolution": "auto | 1k | 2k | 4k | custom",
    "ratioLabel": "3:4 / 2k"
  },
  "textStrategy": {
    "mode": "auto | with-text | reserve | none",
    "content": "",
    "layout": "",
    "rationale": ""
  },
  "analysis": {},
  "analysisEn": {},
  "lineage": {
    "relationshipType": "visual-reuse",
    "sourceAssetIds": [],
    "derivedAssetId": "",
    "parentPlanId": ""
  },
  "validation": {
    "dimensionsVerified": true,
    "issues": []
  },
  "compiler": {
    "version": "1.0",
    "lastCompiledAt": ""
  }
}
```

## 兼容规则

- 旧工作区没有 `reusePlan` 时仍按原有提示词、图库和任务字段恢复。
- 旧的 `visualReuseRole` 会归一化到 `visualReuseRoles`。
- 旧文字策略会映射到 `auto`、`with-text`、`reserve` 或 `none`。
- 旧异步任务数组仍可迁移到分任务存储；新任务额外携带 `reusePlan` 与 `assetLineage`。
- 图库 IndexedDB 不升级 store 结构，新增字段直接写入现有对象记录。
