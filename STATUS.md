# Status

```yaml
cycle: 25
lastMetaCycle: 22
productCyclesSinceMeta: 3
lock: ""
stop: operator-hold
current: none
next: none; M9-only pass complete, await operator
lastGate: "Cycle 0025: TypeScript, 45 tests, production build and all 32 desktop/phone browser checks passed; fresh facts and absent-approval guards verified."
```

## Index

| Cycle | Item | Result |
| --- | --- | --- |
| 0000 | bootstrap | Content/environment foundation. |
| 0001–0002 | operator notes | Historical alignment notes; not product cycles. |
| 0003 | M0-figma-file | Initial file setup, merged in PR #1; incomplete acceptance. |
| 0004 | M0 reconciliation | Gate persisted; internal button lookup failed. |
| 0005 | M0 wiring retry | Internal chain repaired; Cover cross-page NAVIGATE failed. |
| 0006 | M0-figma-file | Accepted. Supported Cover link, layouts and modes checked; human gate resolved. |
| 0025 | M9-verify-facts | Done: fresh public-source audit, unsupported claims deleted, displayed provenance and approval guards; all gates passed. Operator-hold. |
| 0024 | M8-seasons-snowbowl | Done: presentation-only seasons, explicit trip and optional nonblocking game; all gates passed. M9 held. |
| 0023 | M7-town | Done: town through Triangle Park, sample destinations and selected-interest quests; all gates passed. M8 held. |
| meta-0022 | META-0022 | Done: frame alignment and regression guards; all gates passed. Operator-hold. |
| 0021 | M6-notebook-class | Done: offline virtual lesson, lesson-only answers, persistent notebook and migration; all gates passed. Meta next, operator-hold. |
| 0020 | M5-campus-walk | Done: graph walking, portrait dialogue, persistent orientation; all gates passed. M6 held. |
| 0019 | M4-dorm | Done: browser runner fixed, room compared, all 20 browser checks and validation passed; M5 held. |
| 0018 | M3-escort | Done: saved frames retained, accessible escort and dialogue implemented; all gates passed. M4 held. |
| 0017 | M3-escort | Design receipts saved; facing/accessibility call failed. Human gate, no runtime implementation. |
| 0016 | R3-D2-character-range | Done: visual comparison, targeted frame reconciliation, Handoff and all validation passed. M3 held. |
| 0015 | R3-D2-character-range | Compact request passed input limit; oversized return prevented commit. Human gate. |
| 0014 | R3-D2-character-range | Authentication restored; oversized write rejected before execution. Human gate retained. |
| 0013 | R3-D2-character-range | Resume blocked: Figma UNAUTHORIZED; drafts intact, no product edits. |
| 0012 | R3-D2-character-range | Paused at operator request. Design drafts preserved; Figma inspected, no new range frames or product code. |
| 0011 | R2-D2-preview | Repaired: persistent large figure, skin swatches and visible wardrobe; M3 held. Meta review recorded. |
| 0010 | M2-character | Implemented; saved mobility and colorblind round trip; M3 held. |
| 0009 | R1-D1-arrival | Done. Three-stage ride, explicit ending and replay; M2 held. |
| 0008 | R1-D1-arrival | Blocked on Figma authentication. Repair frames created previously; no repair code shipped. |
| 0007 | M1-letter-train | Done. Local D1 arrival + version-bound feedback; tested build fd13bcf. |

## Current handoff

- M9 complete. Four successful public-page fetches; four blocked requests recorded. Kept claims have verified/sourceUrl/asOf; unsupported station, Triangle Park and Snow Bowl route claims deleted. Map copy stays sample. See docs/CONTENT.md and docs/facts/0025-fetch-evidence.json.
- Existing Figma file: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. Updated existing dialogue/trip copy and same-screen source rows. Handoff 125:2; docs/figma/M9-*.json receipts. Original art/layout retained; native control/wrapping differences documented.
- Observed: npm run validate passed TypeScript, 45 tests and production build. npm run test:browser passed all 32 desktop/phone checks. Browser checks include source/date in factual dialogue and place facts; tests forbid sourced people, official lessons and unnamed/unapproved likeness metadata without approval.
- No likeness or live LMS requested, conditional M9 human gate not invoked. No gates approval files created. Sample virtual lesson unchanged. No new feature.
- Local: from repository run npm ci && npm run validate && npm run preview; open printed local URL. Continue existing play path; source links/date appear on escort/campus and Snow Bowl. Existing demo feedback binds checked-out SHA. No public deployment URL.
- Cycle report: cycles/0025-verify-facts.md. Operator-hold at explicit M9-only scope; lastMetaCycle 22, three product cycles since meta.

## D1 build

- Tested build: `aa56940b0a0bfb9b046c76dd024ea664a46b2780`. Repair source commit aa56940; later completion metadata does not change the app.
- Local play: `npm ci && npm run validate && npm run preview`; open the local URL printed on port 4173.
- Built files: `dist/index.html` and `dist/feedback/index.html`.
- Feedback: `feedback/index.html?demo=D1-letter-train&version=aa56940b0a0bfb9b046c76dd024ea664a46b2780` (Give feedback fills this automatically).
- Prototype: recorded Figma file → Cover arrival link → Present / Flow 1. D1 repair handoff `47:2`.
- D1 historical cycle: `cycles/0009-D1-repair.md`.

## D2 Character range build

Validated source: `f86981922dc279501d3a06f67c26eabd007ed791`. From the repository run `npm ci && npm run validate && npm run preview`; open the local URL printed on port 4173. Platform → Create your character → Save → feedback/edit/return. Feedback: `feedback/index.html?demo=D2-character&version=f86981922dc279501d3a06f67c26eabd007ed791`; fresh builds bind their checked-out SHA. Built artifacts: dist/index.html and dist/feedback/index.html. No public deployment URL.

Separate portrait and native-grid map sprite, all 52 range controls, retained appearance/access and uninferred optional flags. Final visual comparison accepts the documented native-control, sticky-scroll, sample-state and prototype differences; see Figma Handoff and docs/FIGMA.md. No new positive operator playtest is claimed.
