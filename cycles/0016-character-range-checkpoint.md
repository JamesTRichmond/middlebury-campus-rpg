# Cycle 0016 — R3-D2-character-range checkpoint

- Date: 2026-10-29
- Agent: codex-root
- Item: R3-D2-character-range — completed on final comparison resume (earlier checkpoints below are historical)
- Original stop: blocked (LOOP.md three-failure rule), cleared by operator on 2026-10-29. Current stop: operator-hold after R3 completion; M3 remains held

## Figma evidence

Resumed existing work, without restarting or making another file. File: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. Same connected session `3eb7748b-2965-4160-b30d-99bbb92753cc`.

Observed readback:
```json
{"board":{"id":"71:2017","name":"R3 / sprites","type":"FRAME"},"components":[{"id":"71:2020","name":"D2 map sprite / Person","width":64,"height":80},{"id":"71:2056","name":"D2 map sprite / Creature","width":64,"height":80},{"id":"71:2124","name":"D2 map sprite / Construct","width":64,"height":80}]}
```

Retained those sprites and saved their original receipt plus readback. Added three separate 160×180 portraits, then nine control batches of six (final four). Saved every successful receipt before the next call. Creator frames: `74:9838` desktop, `74:9987` phone. Added retained appearance/access fields, modes, and completion portraits. Tool results include `{"frame":"78:3672","mode":"high contrast"}`, `{"frame":"78:3842","mode":"colorblind"}`, and `{"frame":"78:4012","mode":"larger UI"}` (excerpts; full IDs are in receipts).

Prototype readback confirmed five edges: platform → new desktop; desktop/phone save → corresponding completion; completion edit → corresponding creator. See docs/figma/R3-dialogue-wiring.json for exact reactions. Desktop and phone creator screenshots and phone completion were inspected. Fixed nested layout clipping before code. Added relaxed-coat specimen `79:2020` before correcting the same bound in runtime geometry.

No Figma call failed during this resumed cycle. Archived the return-size gate only after existing sprite nodes and their receipt were verified. All exact receipts are under docs/figma/R3-*.json. No invented URL, new file, code-only design, or M3 work.

## Implementation checkpoint

Started native rendering from the same original rectangle geometry: detailed portrait plus native 64×80 map sprite. Added 52 named range controls, six disclosure groups, visible voice/filter labels, immediate preview updates, saved range schema/default migration, and independent optional flags. Existing appearance/access controls remain. New source is not yet accepted or shipped as a playable demo.

## Verification — observed

Three failed verification attempts:

1. `npm run typecheck`: sprite color lookups inferred `string | undefined`. Corrected to validated named-color mapping.
2. `npm run validate`: 25 tests passed, two failed. Relaxed coat extended to y=182; save-migration fixture lacked required note/doodad/quest fields. Corrected design first, then runtime; corrected fixture to the real schema.
3. `npm run validate`: **27 unit tests passed**, including painted-pixel distinctions for every range drawing control in six contexts, native sprite marks, all-option save round trips, migration and corrupt-save preservation. TypeScript then failed at `tests/character-range.test.ts:20`: the context array widens `clothesColor`/`hairColor` literals to `string`, incompatible with the character enums. Production build did not run.

Stopped under LOOP.md, “After three failed attempts on the same item ... stop.” No further product fixes after this stop. The new desktop/phone range browser test is written but **not run**; old browser suite was not rerun. Full visual acceptance, accessibility browser checks and final Figma Handoff comparison remain incomplete. No passed final validate or playable R3 demo is claimed.

## Resume without restarting

After operator clearance, fix the test-context literal typing, run the full validation gate, then desktop/phone browser suite. Inspect actual browser screenshots against the recorded frames; fix discrepancies in Figma first. Verify all retained appearance options on both portrait and sprite, combined choices, keyboard access and sticky previews. Reconcile completion layout details and add final Figma Handoff content IDs (`character-creator`, `character-range`) and differences. Complete D2 version/feedback metadata only after acceptance. Keep all receipt IDs and original file. No M3.

## Operator-authorized typing fix and verification — 2026-10-29

Resumed from `1e67b2d` after the operator cleared the three-failure stop. Scope was explicitly limited to the TypeScript failure at tests/character-range.test.ts:20, validation, documentation and push. Added `as const` to the context array so its named choices retain literal types. No assertions, runtime code, Figma frames, receipts or URLs changed. No frame change.

Observed on the final code tree:

- `npm run validate`: exit 0; 27 unit tests passed, TypeScript passed, Vite production build passed (66 modules). Both game and feedback artifacts were produced.
- `npm run test:browser`: exit 0; all 14 tests passed in 26.1 seconds across desktop and phone against the production preview. This includes all range portrait choices and labels, existing sprite/wardrobe choices, mobility and colorblind persistence, high contrast/larger UI, save/reload, uninferred optional flags, and D1 arrival/storage/feedback regressions.
- `git diff --check`: passed.

The test-only fix does not change the production behavior from checkpoint `1e67b2d`; the built feedback version uses that checked-out source SHA. Local play remains `npm run preview` from the repository after validation.

The previous failing verification record above is historical. The TypeScript and browser blockers are now cleared. R3 remains open for the final visual comparison and Figma Handoff work recorded above; those were outside this explicitly limited request. No new design acceptance is claimed. Stop: operator-hold at the end of the requested scope. Do not start M3.

## Final comparison and Handoff — 2026-10-29

Operator cleared the hold and authorized comparison, targeted frame reconciliation, Handoff, verification and push from `f869819`. No runtime code or typing fix was changed. No design restart, new file or invented URL.

Observed: opened the production build on desktop 1280×720 and phone 390×844; played letter → train stages → platform → builder, selected Rowan / Coils / medium copper, saved, and inspected completion and feedback links. Compared creator and completion screenshots with existing Figma frames. Evidence images and measured preview bounds are in docs/figma/R3-comparison/. The initial screenshots use the same runtime built at 1e67b2d; final validation rebuilt at f869819 (feedback version changes only).

Matches: original portrait and sprite rectangle geometry, palette, logical 160×180 portrait and 64×80 sprite, desktop 2×/phone 1× portrait scaling, native-size sprite, swatches, names, range options, access, saved choices and explicit D2 ending. No horizontal overflow in either comparison viewport.

Observed disagreements corrected in the existing frames only: centered live previews; separate 44px name/pronoun input specimens; completion portrait plus map sprite; desktop columns/phone stack; actual Edit, Give feedback and Back to platform controls. Retained all original component and frame IDs and mode bindings. Platform returns now target the existing desktop/phone platform frames. Exact readback preserved all five original platform/save/edit edges. Receipts: R3-comparison-creator.json, R3-comparison-completion.json, R3-comparison-wiring.json.

Documented differences: native controls are taller than compact Figma option-list studies; browser focus/validation chrome, document scrolling/sticky preview, saved name/state, selected-swatch check/name, phone divider and small font/wrapping/gap differences. Phone build uses 844px viewport versus scrollable 720px frame. Build larger mode enlarges form controls but retains compact preview captions; Figma larger-mode specimens use 24px text. Build exposes three named colorblind palettes against the common design mode. Feedback is functional and version-bound in the local build; Figma shows its control without an invented external destination. This is not a pixel-identical screenshot claim.

Handoff tool result (exact excerpt):
```json
{"createdNodeIds":["84:3"],"mutatedNodeIds":["84:2"],"handoff":"84:3","note":"84:2"}
```

Handoff board 84:3 / note 84:2 records the comparison, differences, content IDs character-creator / character-range / station-greeter / middlebury-station, local play instructions, prototype paths and verification. Exact text/receipt: docs/figma/R3-handoff.json and R3-handoff-board.json. Final Handoff screenshot checked for readability; completion/creator screenshots checked after reconciliation.

Final observed gates: `npm run validate` exit 0 (27 tests, TypeScript, production build); `npm run test:browser` exit 0 (14 desktop/phone checks, 26.2 seconds). No failing Figma calls. R3 is complete with the documented native-control/prototype differences. Local build source: f86981922dc279501d3a06f67c26eabd007ed791. Feedback uses demo=D2-character and that built SHA. No public deployment.

Stop: operator-hold — the operator explicitly prohibited starting M3.
