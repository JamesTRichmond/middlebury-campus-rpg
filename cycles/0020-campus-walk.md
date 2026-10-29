# Cycle 0020 — M5-campus-walk

- Date: 2026-10-29
- Agent: codex-root
- Item: M5-campus-walk, done
- Stop: operator-hold (M6 explicitly excluded)

Read project instructions and inspected existing campus starter 8:773 in the connected file. Session 24c43d46-a564-4789-81ea-3c4d14f7728c. Existing file retained: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS.

Before code: created campus walk desktop/phone 99:4982 / 99:5099 and detailed portrait dialogue 99:5216 / 99:5417. Preserved exact receipt M5-frames.json. Prototype start is explicit from completed dorm notice; conversation preview/return edges are recorded in M5-prototype.json. Inspected phone portrait specimen. Following browser comparison, added a full Nearby name hint in Figma then code so cropped portal names remain readable; M5-nearby-hint.json. No Figma failures.

Implementation: player starts after notice, downstairs in your-hall. Arrow/WASD or direction buttons move on the map; approach portals and interact to travel along content graph exits. Only campus neighbors are exposed. NPC conversations require proximity, use bundled first dialogue lines labeled sample, show a separate finer-grid portrait, pause movement and return focus. Existing character sprite is preserved. Visited places/talk events save, including out-of-order visits; no deadlines. Orientation follows existing quest through hall, leader, dining, library and seminar introduction. No virtual lesson, notebook or question panel was added. Town/outdoors stay inaccessible and unlocks unchanged.

Observed gates: npm run validate passed 31 tests, TypeScript and production build (76 modules). npm run test:browser passed all 22 desktop/phone checks in 29.6 seconds on final tree. New headless simulation completes orientation without downtown, rejects downtown travel, preserves notes and round-trips saves. Browser journey starts from finished notice, walks portals on a wheelchair, opens leader/instructor portraits, visits dining/library and seminar, completes, reloads, and checks town remains locked. Existing D1–D4 regressions pass. git diff --check passed.

Visual comparison: inspected desktop/phone completion screenshots against saved campus layout and phone dialogue design. Geometry/palette use original building and path rectangles; native controls, graph-dependent portal labels, scrolling task list, saved player/NPC state and longer bundled conversation differ from static specimen. Full Nearby text compensates for small portal labels/camera crop. No claim of pixel-identical screenshots. Evidence docs/figma/M5-comparison/. Handoff result {"createdNodeIds":["101:5532","101:5533"],"handoff":"101:5532"}; M5-handoff.json records differences/content boundaries.

Local playable path: npm ci && npm run validate && npm run preview from repository; finish dorm, Go downstairs for orientation. D5 row links original Figma file/prototype. Give D5 feedback binds existing form demo=D5-campus and built SHA. No public URL/deployment. No M6. Stop: operator-hold.
