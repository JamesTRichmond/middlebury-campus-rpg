# Status

Keep this file under 120 lines. Cycle narrative goes in `cycles/`.

```yaml
cycle: 5
lastMetaCycle: 0
productCyclesSinceMeta: 0
lock: "codex-root"
stop: human-gate
current: M0-figma-file
next: M0-figma-file
lastGate: "npm run validate passed: 12 tests, tsc clean. Figma internal chain readback passed; Cover cross-page NAVIGATE failed (INVALID_ARGUMENT). human-gate."
```

## Index

| Cycle | Item | Result |
| --- | --- | --- |
| 0000 | bootstrap | Environment landed. No player-facing game yet. |
| — | operator style brief | D009–D016. That brief named M1-letter-train. D018 superseded the next item: it is M0-figma-file. |
| — | playtest goal | D017. Feedback form is in feedback/. Demos D1–D8. Class must match the virtual lesson. |
| — | Figma first | D018. Next item is M0-figma-file. Do not invent a Figma URL. |
| — | one goal | D020. GOAL.md is the only goal. The named paste files are pointers. Figma remains primary. |

## Notes

- Integrator: first agent to start a session sets `lock` to its name.
- Do not list future ideas here. File them only through the loop's rules.
- Newest cycle note is `cycles/0002-one-goal.md`. Older notes that name `M1-shell` or `M1-letter-train` as next are historical.

## M0 review

- Figma: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS
- Branch: cycle/0003-figma-file. Assigned host branch requires PR; M0 stays doing until merge. M1 has not started.

## Gate reconciliation

Operator requested reconstruction of unavailable commit 563faa5. See gates/PENDING-figma.md and cycles/0004-figma-reconciliation.md. M0 remains doing; M1 has not started.

- Cycle 0004: authentication/open succeeded; prototype wiring failed. Pending gate remains. Design acceptance incomplete.

- Cycle 0005: internal chain repaired; Cover cross-page NAVIGATE rejected. Full visual acceptance incomplete. stop remains human-gate. See cycles/0005-figma-wiring-retry.md.
