# Character range design checkpoint

These are **unaccepted design drafts**, not shipped code or completed Figma frames. The operator requested a safe stop before the first Figma mutation. Existing app source is unchanged. Do not skip Figma or claim these drafts are visually accepted.

Existing file: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS
Session used for successful inspection: `3eb7748b-2965-4160-b30d-99bbb92753cc`.

## Draft files

- `character-range-controls.json`: 52 named controls across six groups, five independent surface-pattern slots. Existing name/pronouns/skin/hair/body/wardrobe/access/opt-ins remain separate.
- `range-portrait-design.js`: original 160×180 detailed bust geometry; separate from map sprite. Physical options draw shapes, voice/filter must be visible caption labels in the eventual UI.
- `range-sprite-design.js`: original 64×80 map-size figure with readable surface, silhouette, fur, wardrobe, aid, pin and trail marks. Extends prior figure geometry; no map gameplay.
- `prepare-range-design.mjs`: constructs examples and control studies, checks portrait bounds, outputs temporary design data.
- `figma-range-components.mjs`: creates a proposed Figma write script from that data. **This script has not been executed in Figma or API-validated.** Review before calling; any Figma error is the project human gate.

To restore the working drafts from the repository root:

```sh
mkdir -p work
cp docs/figma/drafts/0012/*.json docs/figma/drafts/0012/*.js docs/figma/drafts/0012/*.mjs work/
node work/prepare-range-design.mjs
node work/figma-range-components.mjs
```

## Resume

1. Read the repo session documents and latest user instructions. Operator hold remains until resumed.
2. Load the Figma skills. Inspect the existing file and preserve any later additions. Last successful read found components page `2:3`, Flows `2:4`, existing D2 desktop `57:3098`, phone `57:3213`; there are no newly created range nodes from cycle 0012.
3. Review and draw the drafts in Figma. Reuse current tokens and controls. The generated script is only an initial component/atlas proposal; desktop, phone and dialogue layouts, accessible modes, prototype wiring and Handoff are still required.
4. Get design context/screenshots, inspect the artwork, fix clipping/occlusion and confirm each control has a visible effect. Frame before code.
5. Implement additive named values/defaults in the existing character save. Keep prior saves, notes, quests, unlocks and opt-ins. Implement separate portrait and sprite renderers, grouped controls, visible caption labels, and the D2 dialogue portrait. No M3.
6. Test actual rendered pixels for each physical option, all five pattern slots together, migration/round trips, phone/desktop and accessibility. Existing pixel and save checks must remain meaningful.
7. Run validate and browser gates, update cycle/STATUS/DEMOS/FIGMA with observed results, commit and push. No acceptance is claimed by this checkpoint.

## Known review points

- Portrait geometry is a draft: layer order/occlusion still needs visual review, especially hair under coverings, face detail under muzzle layers, clothes and prosthetic joins.
- Frame/spoke controls need a wheelchair context to be visible. Make that relationship clear in the form rather than offering an invisible change.
- Voice, vocal-filter and pronouns are independent visible text labels, never recorded audio or inferred identity.
- Presets are everyday stylizations only; no fetishwear, restraints or club gear.
- `parseSave` currently validates character defaults but returns the raw character. The builder materializes defaults; test legacy load and resave explicitly.

## Cycle 0015 retry evidence

`compact-figma.mjs` replaces expanded geometry with drawing functions and produces a 41431-character request. This fixes the input limit, but **do not submit it as one call**: its 53420-byte ID return exceeded Figma's 48000-byte return limit and the tool reported no canvas commit. Split main specimens and small control-study groups into separate calls, preserving all IDs per bounded receipt. See cycles/0015-character-range-return-limit.md.

## Cycle 0016 continuation

The sprite board was retained and the portrait/control/creator batches now exist in Figma; use `../../R3-*.json` receipts before any further writes. The portrait geometry here includes the visibility corrections and bounded relaxed-coat hem. Application ports are in `src/game/character-portrait.ts` and `character-sprite.ts`. `batch-design.mjs` records the bounded generation approach (six controls per call); its work-directory paths describe the execution workspace. Do not rerun creation batches already receipted. See cycles/0016-character-range-checkpoint.md for the blocked implementation state.
