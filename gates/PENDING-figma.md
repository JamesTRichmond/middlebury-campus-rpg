# Figma request-size failure

- Date: 2026-10-28
- Item: R3-D2-character-range
- Cycle: 0014
- Stop: human-gate
- Existing file: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS

Authentication is restored: a read-only Components inspection succeeded and returned `"rangeNodes":[]`. The first write was rejected by connector schema validation before execution:

```text
Parameters failed connector schema validation: code [maxLength]: String longer than maxLength 50000
error_code: INVALID_ARGUMENT
reason: INVALID_PARAMETERS
```

Cause: the assistant submitted the generated script with every expanded portrait study embedded, exceeding the request limit. This is an assistant request-sizing error, not an authentication or file-access problem. No new nodes were created.

The project requires stopping on any failed Figma call. On operator resume, preserve the existing file and drafts. Generate compact scripts or split independent groups into bounded requests, assert each code string is under 50000 characters before calling, and save every returned node ID. Inspect for partial/later work before creating anything. Review frames before application code. Do not start M3.
