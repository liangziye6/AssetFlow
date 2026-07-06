# Aliyun Bailian Qwen-VL Prompt API v1.7.2

## Scope

This update adds Aliyun Bailian as a reverse-prompt / visual-reuse API provider.

The provider is intended for image understanding. It uses the DashScope OpenAI-compatible endpoint and the `qwen-vl-plus` model.

## Base URL

Default Base URL:

```text
https://dashscope.aliyuncs.com/compatible-mode/v1
```

The plugin appends:

```text
/chat/completions
```

## UI Mapping

- Provider: `阿里云百炼`
- Model: `qwen-vl-plus`

Selecting the provider switches the visual model to `qwen-vl-plus`.
Selecting `qwen-vl-plus` switches the provider back to Aliyun Bailian and restores the default Base URL.

## Payload Shape

The plugin reuses the existing OpenAI-compatible multimodal message shape:

```json
{
  "model": "qwen-vl-plus",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "Reverse-prompt instruction..." },
        { "type": "image_url", "image_url": { "url": "data:image/png;base64,..." } }
      ]
    }
  ],
  "max_tokens": 520
}
```

## DeepSeek Guard

DeepSeek V4 models are text-only in this plugin flow. Reverse prompt and visual reuse now block DeepSeek before sending image payloads, so users do not see the provider-side `unknown variant image_url` error.
