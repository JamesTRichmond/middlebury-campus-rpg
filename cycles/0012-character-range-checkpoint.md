# Cycle 0012 — R3-D2-character-range checkpoint

- Date: 2026-10-28
- Agent: codex-root
- Item: R3-D2-character-range (incomplete)
- Stop after this cycle: operator-hold, requested because usage was almost exhausted

## Change

Synced remote main to GOAL edit a2855d5 and read the Character range requirements. Inspected the existing connected Figma file and its D2 design context. Prepared original local design drafts for a separate detailed portrait, map-size marks and 52 named controls. The operator requested a safe stop **before the first Figma mutation and before product edits**. No new Character range feature is shipped or accepted. M3 was not started.

## Files

Draft sources and resume instructions are in `docs/figma/drafts/0012/`. STATUS and BACKLOG retain the incomplete R3 item and explicit hold. No src/ or content/ edits.

## Figma evidence

Existing recorded file only: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS

Session creation returned:

```json
{"sessionId":"3eb7748b-2965-4160-b30d-99bbb92753cc"}
```

Successful inspection returned these selected exact fields:

```json
{"fileKey":"RgmU4XGp5hEYxNTBlvXlOS","frames":[{"id":"57:3098","name":"D2 repair / Live wardrobe / 1280","width":1280,"height":720,"children":[{"id":"57:3099","name":"Frame","type":"FRAME"}]},{"id":"57:3213","name":"D2 repair / Live wardrobe / 390","width":390,"height":720,"children":[{"id":"57:3214","name":"Frame","type":"FRAME"}]}]}
```

Existing tokens and components were inspected. `get_design_context` for 57:3098 returned native rectangle/code context and a screenshot, visually inspected. No Figma tool failed; no PENDING-figma gate was opened. No new frame URL or prototype URL was invented.

## Gate

Observed: `npm run validate` passed on the unchanged application source: 24 tests, TypeScript, Vite production build. Re-run before checkpoint commit also passed. This validates the existing D2 build, not the unimplemented range controls.

Observed: design-only generator checked integer portrait bounds for 166 named option cases. Reported by delegated sprite review: 252 bounds cases on 64×80. These are draft geometry checks, not visual acceptance. No browser playtest of new Character range exists because it is not implemented.

## Remaining work

Follow `docs/figma/drafts/0012/README.md`: draw and review components/frames in the existing Figma file, then implement and test all range controls, separate creator/dialogue portrait, readable map sprite marks, backward-compatible saves and immediate access settings. Keep M3 held. Cycle is incomplete and does not increment the completed-product count.

Stop: operator-hold
