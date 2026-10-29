# Cycle 0018 — M3-escort

- Date: 2026-10-29
- Agent: codex-root
- Item: M3-escort, done
- Stop: operator-hold (M4 explicitly excluded)

Resumed 5d0a63c. Read project instructions and inspected the connected file before writing. Retained walking 87:4031 / 87:4130, wheelchair 87:4229 / 87:4335, dialogue 87:4441 / 87:4624, route 88:4585 and endpoint 89:4655. Recovered existing high contrast 92:4723, colorblind 92:4824 and larger UI 92:4925; no recreation. Receipts now committed. Ignored missing node 90:5044.

Created missing cardinal study 93:4921. Initial study used stale guessed component IDs and had six entries; corrected by resolving the actual named components from Components, yielding eight. Both receipts preserved. No tool failure in this resumed session. Larger UI readback is included in M3-facing.json. Moved pending gate to resolved only after missing study and receipts existed. Original file remains https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS.

Implemented the design in the browser: existing layered character sprite, integer movement with keyboard and touch direction buttons, collision including a stone to navigate around, horizontal following camera, greeter following movement history, separate portrait dialogue overlay that pauses travel, named control access, saved progress. Foot and wheelchair use the same level route. Locations follow content graph exits: station → Triangle Park → Arrival Green → residence quad → hall → room. Sample framing labels remain explicit. Welcome completes at the room; unrelated notes/unlocks remain intact and town stays locked. D3 ends before unpacking.

Runtime layout compared with saved map/endpoint design: original paper, path and buildings/fountain geometry; 480×270 logical desktop at 2×, 320×270 phone crop at 1×. Native controls, dynamic camera and saved character differ from still/jump prototype specimens. Decorative trees are omitted. Facing keeps the character range drawing with west mirror, north rear face and ground direction cue. These differences are recorded on Handoff 94:2, exact result `{"createdNodeIds":["94:2","94:3"],"handoff":"94:2"}`. No 3D engine or external assets.

Observed gates: npm run validate passed 29 tests, TypeScript and production build. npm run test:browser passed 18 desktop/phone checks. New headless checks complete welcome on foot and wheelchair, validate collision and round-trip saves. New browser checks play letter, train, character, escort, dialogue, stone detour, dorm completion, feedback URL and reload for both mobility choices on both viewports. Inspected desktop wheelchair and phone walking endpoint screenshots; no horizontal overflow. Final gates rerun after adding facing rendering and graph-route validation.

Playable locally: npm ci && npm run validate && npm run preview from repository. D2 Save → Walk with the greeter. Give D3 feedback binds demo=D3-escort and build SHA. No public deployment. Prototype linked from D3 row in DEMOS.md. M4 not started.
