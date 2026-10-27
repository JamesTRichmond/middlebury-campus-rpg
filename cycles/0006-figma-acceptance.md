# Cycle 0006 — M0-figma-file acceptance

- Date: 2026-10-27
- Agent: codex-root
- Item: M0-figma-file
- Result: done; human gate resolved
- Stop: operator-hold (explicit instruction not to start M1)

## Change

The existing Figma file now has a supported Cover link to the arrival prototype, the original five-edge internal loop, populated required layouts, shared component states, original pixel maps and portraits, accessibility/seasonal modes, and standing/wheelchair variants. No M1 code, playable demo, or new URL was created.

## Observed tool results

Cover inspection found no partial button. Instead of retrying a cross-page NAVIGATE action, changed Cover text `3:515` to an internal node hyperlink. Exact readback: `{"coverLink":{"type":"NODE","value":"3:86"}}`. The recorded file remains https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS, exactly as returned by the original creation tool.

Readback preserved Letter `3:86` → Origin `11:1029` → Train `8:614` → Platform `8:630` → Character `8:368` → Letter `3:86`, with the same five control node IDs. Mobility preview has reciprocal ON_CLICK/CHANGE_TO edges between `6:142` and `17:182`. Skip, finished, and missed minigame outcomes each return to Snow Bowl `8:878`.

Final structural receipts: `frameBoundsIssues: []`, `autoLayoutOverlapIssues: []`, `imageFilledNodes: 0`, seven source maps at 480×270 with `pixelIssues: []`, sixteen source sprites at 32×32. The final preview bounds delta records both preview variants at 480×153. Contrast calculation minimums are 11.60:1 ink on paper and 6.43:1 paper on pine.

## Visual acceptance

Rendered and inspected all 43 Flows frames, the Cover, Foundations, Handoff, control-state review, sprite-state review, and preview variant set. Repaired creator/phone nested reflow, desktop larger-letter bounds, Cover text overlap, missing controls, generic scene reuse, portrait detail, sample dialogue/captions, and unsafe town label placement. Latest relevant screenshots passed. Frames remain semantic editable text/components/vectors, not screenshots used as UI.

The checklist and every reviewed node ID are in docs/figma/M0-acceptance.json; docs/FIGMA.md maps the GOAL requirements to current evidence. The human gate is archived at gates/resolved/figma-cycle-0006.md. No *.approved file was created. The operator's explicit retry authorization and observed acceptance resolve the old gate.

## Gate

Observed `npm run validate`: exited 0, 12 tests passed, TypeScript clean before updating completion metadata. Final documentation/gate-tree run also exited 0: 12 tests passed, TypeScript clean. git diff --check passed. Artifact evidence assertions passed: all Flows IDs in the render manifest, Cover target, five destination edges, frame/overlap/pixel checks, and text contrast thresholds.

## Practical limits and follow-ups

Prototype navigation was verified by exact tool readback and rendered screenshots, not a browser click-through. Native text entry, player saves, movement and game logic are not implemented by this design-only cycle. Every such build difference is named on Handoff. The bundled lesson remains sample; later phase demos are not claimed shipped.

M0 is done. Product-cycle count increments to one; failed retries were not counted as product cycles. M1 is next but remains unstarted on the operator's explicit hold.
