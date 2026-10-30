# Status

```yaml
cycle: 26
lastMetaCycle: 22
productCyclesSinceMeta: 3
lock: ""
stop: operator-hold
current: playtest
next: await playtest feedback; no feature authorized
lastGate: "Cycle 0026: npm run validate passed TypeScript, 45 tests and production build; documentation-only playtest handoff. Browser checks last passed in cycle 0025."
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
| 0026 | playtest | D1–D8 current-build guide ready; validate passed. Await player feedback on operator-hold. |
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

- Current: playtest. [D1–D8 guide](docs/PLAYTEST.md) lists the local command, navigation to each demo and its feedback form. docs/DEMOS.md links this current guide above historical build records.
- Validated product source: 9d3bca9667443481715370ff0795f82b0fa4a66e. From the cloned repository containing package.json: `npm ci && npm run validate && npm run preview`; open the printed local URL. Fresh browser profile starts the letter; existing saves resume. Demos are stages of one game, not separate routes.
- Each in-game feedback link supplies its D1–D8 demo id and built SHA. Confirm & Submit copies the Markdown report; paste it back. New builds bind the checked-out commit, including later documentation commits.
- Observed this cycle: npm run validate exit 0, TypeScript, 45 tests, production build. No new browser playthrough or operator feedback claimed; cycle 0025's 32 desktop/phone checks remain the latest browser results.
- Documentation only: no frame change, feature, content, place, quest, screen, feedback-form, likeness or LMS changes. Existing Figma file retained: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. No new URL or public deployment.
- Cycle: cycles/0026-playtest.md. Operator-hold with current left at playtest as requested. lastMetaCycle remains 22 and productCyclesSinceMeta remains 3; this is not a product cycle.

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
