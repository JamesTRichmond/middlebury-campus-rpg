# Cycle 0024 — M8-seasons-snowbowl

- Date: 2026-10-29
- Agent: codex-root
- Item: M8-seasons-snowbowl, done
- Stop: operator-hold; M9 not started

Read requested project documents and cycle 0023. Inspected existing seasonal and Snow Bowl starters through session f36da9d3-f899-4f39-af22-c58293ac253b. Existing file retained: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS.

Before code: created shared selector 114:2017 with existing palette; retained four existing seasonal map modes and read their map/ground colors. Trip frames 115:5896 / 115:5941, visit 115:5986 / 115:6031, three optional result states 116:6052 / 116:6097 / 116:6142. Each creation receipt saved before subsequent calls. Added selector to existing escort/campus/town and seasonal previews. Prototype explicitly enters the trip from town, then arrives, with cancel/return paths and success/missed/skipped/retry links; exact M8-prototype.json. Seasonal preview frames use absolute positions; final inspection caught selector outside visible bounds, repaired by placing it at 16,8 and moving existing scene down 72px. Final winter screenshot inspected; map geometry unchanged. No Figma failure.

Implemented four-season presentation via one saved seasonView and original seasonal colors; no quest/place/character/notes/progress resets. Explicit Snow Bowl trip becomes available after completed orientation and visiting downtown, including old visited-town saves. It is not a map tile beside the dorm; existing downtown→snow-bowl graph edge is checked by the trip function. Departure remains downtown until Arrive; Cancel and Return restore town without resetting other state. Existing Snow Bowl content fact/source/asOf is displayed unchanged; this was not a new factual verification or trail-count claim.

Optional sample Trail card match: match star, miss with circle, or skip; each records only an outcome and permits retry/return. No task is blocked, expired or advanced by game failure/skip. Result persists after reload. Original saved character remains visible in trip scene. No M9, live LMS or added account.

Observed final verification: npm run validate passed 43 tests, TypeScript and production build (85 modules). npm run test:browser passed all 30 desktop/phone checks in 33.1 seconds. New unit checks compare every field except seasonView for all four seasons, enforce trip lock before town and reject departure from dorm, and verify all three outcomes preserve open quests, notes, doodads, lessons and unlocks with reload/return. Browser checks verify distinct seasonal scene pixels plus exact save preservation, absence of a walkable Snow Bowl portal, explicit departure/arrival, every game outcome, reload, D8/version feedback and return with an open quest still open. Existing D1–D7 regressions pass. git diff --check passed.

Visual comparison: inspected phone Figma visit and final winter seasonal-map render; compared desktop/phone runtime Snow Bowl captures. Same original hill geometry and colors; native select/buttons, saved wheelchair appearance, sourced metadata and document scrolling differ from compact specimen. Optional controls may require scrolling; no locked return path. Handoff result {"createdNodeIds":["118:2","118:3"],"handoff":"118:2"}; exact M8-handoff.json. Screenshot evidence docs/figma/M8-comparison/.

Local demo: npm ci && npm run validate && npm run preview; finish orientation, visit town, Take a trip to the Snow Bowl → Arrive. Give D8 feedback binds existing form demo=D8-snow and built SHA. Prototype linked from D8 row in DEMOS.md. No public URL/deployment invented. lastMetaCycle stays 22, productCyclesSinceMeta 2. Stop: operator-hold; M9 untouched.
