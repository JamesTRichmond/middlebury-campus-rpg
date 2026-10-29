# Figma gate — M3 escort

- Date: 2026-10-29
- Item: M3-escort
- Cycle: 0017
- Stop: human-gate
- File: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS
- Session: 1fe85448-172e-4c6e-a39d-5caced638a1f

Successful M3 walking, wheelchair, dialogue, route and endpoint design receipts are saved under docs/figma/M3-*.json. The subsequent facing/accessibility batch failed:

```text
Error: in get_name: The node with id "90:5044" does not exist
    at get (<input>:55:11)
    at <anonymous> (PLUGIN_1_SOURCE:1:1613)
```

This was an execution/node-reference failure, not a reported authentication failure. Partial changes from that failed call are unknown; no success receipt was returned. The batch attempted three accessibility clones followed by eight cardinal facing specimens. Do not retry or recreate blindly. After operator clearance, inspect the file and any partial nodes before resuming. Exact failure: docs/figma/M3-facing-mode-failure.json. No M3 application code was written. Preserve existing character art and all successful frames. Do not start M4.
