# Cycle 0017 — M3-escort Figma gate

- Date: 2026-10-29
- Agent: codex-root
- Item: M3-escort — blocked, incomplete
- Stop: human-gate

## Work preserved

Read the project instructions and existing escort starter frames. Started only M3 after operator clearance. Existing file: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. Connected session returned `{"sessionId":"1fe85448-172e-4c6e-a39d-5caced638a1f"}`.

Successful design batches, saved before subsequent calls:

- Walking desktop `87:4031`, phone `87:4130`; receipt docs/figma/M3-walk.json.
- Wheelchair desktop `87:4229`, phone `87:4335`; M3-chair.json.
- Dialogue over map desktop `87:4441`, phone `87:4624`; M3-dialogue.json.
- Full native-grid route `88:4585`; M3-route.json. Station, Triangle Park fountain, campus, halls, hall, room follow existing graph exits. Sample map/game threshold copy is explicit. Level path and one stone to navigate around. Existing character instances retained; greeter clothing distinguished in gold.
- D2 completion entry controls `89:4649` / `89:4652`; D3 endpoint specimen `89:4655`; M3-entry-end.json. Prototype-only previews and dialogue controls recorded. D3 ends before unpacking; no M4.

Inspected walking and phone dialogue screenshots. No final design acceptance: facing/accessibility studies and final route/endpoint review remain incomplete. Draft copy, map geometry and successful batch generators are preserved under docs/figma/drafts/0017/. These are design drafts, not runtime content.

## Failure

The next call attempted three accessibility-mode clones of the phone escort frame, followed by eight facing studies using existing walking and wheelchair instances. It failed:

```text
Error: in get_name: The node with id "90:5044" does not exist
    at get (<input>:55:11)
    at <anonymous> (PLUGIN_1_SOURCE:1:1613)
```

Exact tool result: docs/figma/M3-facing-mode-failure.json. Partial canvas changes from this failed call are unknown. It is not a reported authentication failure. No retry after failure: AGENTS.md/GOAL.md/LOOP.md require a human gate after a Figma failure. Wrote gates/PENDING-figma.md and stopped implementation. Do not recreate the successful frames; inspect any partial mode/facing nodes after clearance.

## Verification — observed

On the unchanged application:

- `npm run validate`: passed, 27 tests, TypeScript and production build (66 modules).
- `npm run test:browser`: passed, all 14 desktop/phone tests in 25.9 seconds.
- `git diff --check`: passed.

No M3 application code was written. Collision, following camera, saved escort state, facing in runtime, and headless welcome completion remain unimplemented. Wheelchair was shown in the same Figma path, but no wheelchair escort playthrough occurred. These existing-build passes do not satisfy the M3-specific gate. No D3 playable build or acceptance claimed, no invented URL, no new file, no M4.

## Resume

After operator clearance, inspect failed-batch remnants first. Retain all successful receipts and existing character art. Complete facing/accessibility design, validate map/route/endpoint/prototype, then implement graph-backed movement, collision, camera, dialogue and quest/save progression. Run welcome completion for walking and wheelchair plus production/browser gates. Update Figma Handoff and D3 demo only after acceptance.

Stop: human-gate.
