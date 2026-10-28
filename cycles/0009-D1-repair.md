# Cycle 0009 — R1-D1-arrival

Date: 2026-10-27 (America/New_York). Result: done. Stop: operator-hold (explicit instruction not to start M2).

The D1 playtest on a68e28f is the source: feedback/inbox/2026-10-27-D1-letter-train-a68e28f.md. Repair implements an unofficial acceptance, an explicitly chosen character origin with no location inference, three distinct animated train scenes into Vermont, and a platform ending that names the greeter as the next demo. Give feedback is explicit; Replay preserves saved state. No character builder.

Observed connected Figma inspection returned all ten existing frames (38:2698, 38:2713, 38:2744, 38:2797, 38:2846, 38:2933, 38:2945, 38:2976, 38:3029, 38:3078). Kept them. Fixed clipped text and reviewed all ten screenshots before implementation; rechecked the phone letter after its helper fix. File remains https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. Cover readback: {"type":"NODE","value":"38:2698"}. Handoff receipt: {"createdNodeIds":["47:2"],"contentId":"arrival-letter","publicUrl":null}.

Source commit: aa56940b0a0bfb9b046c76dd024ea664a46b2780. Geometry comes from high-fidelity Figma context, rendered as original rectangles, not screenshots. Phone clips scenery at native scale. Motion scrolls in integer steps with pause and reduced-motion behavior. Caption stages are user-paced; no forced wait. Old saves default missing beat to departure; replay preserves notes and other save fields. Invalid saves remain protected.

Observed npm run validate passed: 21 tests, TypeScript and production build. npm run test:browser passed: 8 desktop/phone checks. Played keyboard letter → origin → departure → Vermont → approach → platform → feedback. Also tested mid-ride reload, replay with retained notes, legacy saves, rejected saves, blocked storage and reduced motion. Compared local letter/train/platform screenshots with Figma. Prototype-only feedback annotation is intentionally absent from the build; native input remains single-line.

Process correction: previous tests accepted the two-click journey. Browser regressions now assert every scenery stage and the explicit ending. No new attractions. No new positive playtest result is claimed; operator can review the repaired demo.

Local play: from repository folder, npm ci && npm run validate && npm run preview. Platform Give feedback binds D1-letter-train to the built SHA. New builds use their checked-out SHA. M2 remains on hold.
