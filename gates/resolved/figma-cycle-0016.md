# Figma return-size failure

- Date: 2026-10-28
- Item: R3-D2-character-range
- Cycle: 0015
- Stop: human-gate
- Existing file: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS

Authentication works. Read-only inspection returned `rangeNodes: []`. A compact 41431-character request passed the 50000-character input limit, but its result failed:

```text
Return value exceeds the 48000-byte limit (53420 bytes). Canvas edits from this run were not committed.
```

The assistant still grouped too many components and returned too many node IDs. No new committed frames or application changes. On operator resume, inspect the existing file and split the same preserved design into smaller independent batches (for example three main portrait/sprite components first, then 6–8 control studies per call). Keep both code and returned receipts bounded. Return every created ID; do not silently truncate the receipt. Save each successful receipt before the next call. No M3.

Resolved on operator-authorized resume: first successful frame board 71:2017, components 71:2020, 71:2056, 71:2124. Receipt docs/figma/R3-sprites.json.
