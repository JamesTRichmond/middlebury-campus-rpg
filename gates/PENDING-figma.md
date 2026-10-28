# Figma authentication required

- Date: 2026-10-28
- Item: R3-D2-character-range
- Cycle: 0013
- Stop: human-gate
- Existing file: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS

The first connected `use_figma` inspection on resume failed before any mutation. Exact response:

```json
{"error":"This app connection requires reauthentication before other actions on this app can succeed.","error_code":"UNAUTHORIZED","error_data":{"detail":"Reauthentication required","action":"TRIGGER_REAUTHENTICATION","reason":"www_authenticate_reauth"}}
```

Reauthenticate the existing Figma connection, then resume R3 from docs/figma/drafts/0012/README.md. Preserve the original file and existing work. No new range frames or application code were created in this retry. Do not start M3. Do not mark visual acceptance complete or create approval files automatically.
