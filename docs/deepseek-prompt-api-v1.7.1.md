# DeepSeek Prompt API v1.7.1

## Scope

This update adds DeepSeek as a text prompt enhancement provider.

DeepSeek uses an OpenAI-compatible chat completions interface, so the existing text prompt pipeline can be reused with provider-specific payload fields.

DeepSeek V4 models do not accept the plugin's multimodal `image_url` message payload. Reverse prompt and visual reuse image analysis are therefore blocked before request submission; users should switch to Aliyun Bailian `qwen-vl-plus`, Gemini, or an OpenAI-compatible vision model for image understanding.

## Base URL

Default Base URL:

```text
https://api.deepseek.com
```

## UI Options

The API settings panel exposes four DeepSeek modes:

- DeepSeek-V4-Flash · 非思考
- DeepSeek-V4-Flash · 思考
- DeepSeek-V4-Pro · 非思考
- DeepSeek-V4-Pro · 思考

The mode select is intentionally a single field so users do not need to coordinate a model dropdown and a separate thinking toggle.

## Payload Mapping

Non-thinking mode:

```json
{
  "model": "deepseek-v4-flash",
  "thinking": { "type": "disabled" }
}
```

Thinking mode:

```json
{
  "model": "deepseek-v4-pro",
  "thinking": { "type": "enabled" },
  "reasoning_effort": "high"
}
```

The same payload helper is used by text-only prompt enhancement requests. Image analysis requests are intentionally not sent to DeepSeek.
