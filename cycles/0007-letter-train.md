# Cycle 0007 — M1-letter-train

- Date: 2026-10-27
- Agent: codex-root
- Item: M1-letter-train
- Result: done; D1-letter-train recorded
- Tested build: `fd13bcf3bd32b0af91f33d8492dfa89f441c1e9a`

## Change

Observed: a fresh browser opens the unofficial acceptance letter, accepts the player’s home place, shows a user-paced train window with that origin in the caption, and reaches Middlebury station. The version-1 save restores the train/platform on reload. Platform Continue opens the existing feedback form with D1 and the built Git SHA. No college login, backend, route inference or public deployment was added.

Figma preceded the implementation: read the accepted desktop letter/origin/train/platform and phone letter with high-fidelity design context and screenshots; added phone train/platform and validation/storage-warning states before writing the UI. Reused the original recorded file URL, shared palette and Atkinson Hyperlegible Mono. No screenshot was used as an implementation asset. Native rectangles, typography and integer platform scaling match the frames.

## Files

- content/arrival.json; shared schema/loader and browser bundle: one source for story copy and existing content IDs.
- src/game/arrival.ts: validated origin, version-1 saves, station transition and feedback version path. Preserves notes, character/access data, quests, doodads, season and additional fields; protects invalid saves and keeps a prior valid record.
- src/ui/, src/main.tsx, index.html: semantic React form and the two original Figma scenes, responsive on desktop/phone with keyboard focus and captions.
- Vite/build configuration, bundled font/license, README and startup instructions: local production game plus the existing feedback entry.
- tests/arrival.test.ts and e2e/arrival.spec.ts: arrival/save regression tests and real-browser demo checks.
- feedback/app.mjs: guarded the storage-property access itself; no deck, wording or layout changes.
- docs/DEMOS.md, docs/FIGMA.md and docs/figma/D1-handoff.json: real prototype reference, inspected build version, open path and parity evidence.

## Integration receipt

Figma returned phone train `31:2609`, phone platform `31:2633`, origin error `31:2709`, rejected-save `31:2720`, and save-unavailable `31:2732`. It returned Handoff board `32:2` with `contentId: arrival-letter`, `placeId: middlebury-station`, and `publicUrl: null`. Cover readback remains `{"type":"NODE","value":"3:86"}`. The accepted five-edge chain was read back unchanged.

The final Figma Handoff update returned:

```json
{"createdNodeIds":["35:2"],"mutatedNodeIds":["32:2"],"buildVersion":"fd13bcf3bd32b0af91f33d8492dfa89f441c1e9a","checks":{"tests":21,"browser":6,"typecheck":"passed","productionBuild":"passed"},"publicUrl":null}
```

Recorded file URL, originally returned by the creation integration: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. The D1 prototype row links that actual file and explains Cover → arrival link → Present / Flow 1. No new URL was invented.

## Gate

Observed on source build `fd13bcf3bd32b0af91f33d8492dfa89f441c1e9a`:

- `npm run validate` exited 0: 21 tests passed, TypeScript clean, Vite production build passed.
- `npm run test:browser` exited 0: 6 Chromium checks passed, 3 on desktop and 3 on phone.
- `git diff --check` passed. Bundled font files and the OFL license are present in dist; no temporary Figma asset URLs are runtime dependencies.

The new-save test asserts `placeId === middlebury-station` and the actual origin string. Other tests cover caption-only origin changes, literal replacement characters, round-trip saves, retained notes/state, previous-good-save retention, invalid/unsupported records, unavailable storage and missing content references.

The browser path actually played: fresh letter → empty-submit error/focus → enter “Your home region” → Tab to Continue → Enter → Train → Continue → Platform → reload at Platform → Continue → the existing version-bound feedback form. Repeated on 1280×720 and 390×844. Both platforms also finished with an invalid saved record preserved and with storage-property access blocked. No console/page errors occurred on the ordinary path; integer map scale and absence of horizontal overflow were checked.

Captured and inspected local letter/train/platform screenshots and compared them with Figma. Phone uses the framed 1× scene crop; desktop uses the framed 2× scene. The native input/feedback boundary and wrapping behavior are named on Handoff. The ride waits for Continue rather than forcing a timer.

## Failures found and repaired

A separate browser reproduction found that the existing feedback form crashed before its internal storage try/catch when the localStorage getter itself threw (`feedbackCards: 0`, error “Storage blocked”). Guarded that access and retained the existing unsaved banner; the end-to-end blocked-storage path now reaches a working form. The existing feedback skill was applied; no new question deck was created.

A literal-origin review found that string replacement syntax could interpret `$&` in a home-place string. Changed the template substitution to a callback and added a regression assertion before the final build. Implementation source commits are b83ba40 and fd13bcf. The final completion commit records validation without changing the app source.

## How to play

Local only: `npm ci && npm run validate && npm run preview`, then open the local URL printed on port 4173. Static output: dist/index.html and dist/feedback/index.html. For this inspected build, feedback is `feedback/index.html?demo=D1-letter-train&version=fd13bcf3bd32b0af91f33d8492dfa89f441c1e9a`. A fresh build labels itself with its actual checked-out HEAD, so subsequent reports remain traceable.

## Follow-ups

M2-character is next. Naming/appearance/access selection and walking remain later items; D1 does not pretend they are implemented. Product cycles since meta: 2. No new attractions or unrelated refactors were included.
