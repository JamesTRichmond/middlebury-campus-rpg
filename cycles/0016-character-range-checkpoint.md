# Cycle 0016 — R3-D2-character-range checkpoint

- Date: 2026-10-29
- Agent: codex-root
- Item: R3-D2-character-range — blocked, incomplete
- Stop: blocked (LOOP.md three-failure rule); M3 remains held

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
