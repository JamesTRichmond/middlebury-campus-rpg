# Figma

Figma is the primary tool for this project. The connected Figma integration is already authorized. Design there first. Code follows the frames.

This is an unofficial portfolio prototype for a full-stack developer interview at Middlebury College. Figma is a major tool on that developer team. The file should be something you can open in an interview: a design system, clickable flows, and a build that matches. It is not a college product. Do not put the college's logos, crests, or athletic marks in the file. Do not put real people's photos in it.

## One file

Create one file named `Middlebury Campus RPG (unofficial)`. Record the URL the integration returns. Never invent a URL. If the integration is not signed in or the call fails, write `gates/PENDING-figma.md`, set `stop: human-gate`, and stop. Do not design the screen only in code and backfill Figma later. Do not buy a plan or switch accounts.

| | |
| --- | --- |
| File URL | https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS |
| Cover | page `0:1`, board `3:510` |
| Foundations | page `2:2`, board `3:517` |
| Components | page `2:3`; Letter `3:50`, Dialogue `3:35`, Portrait `3:25` |
| Flows | page `2:4`; 43 rendered layouts and mode/state specimens |
| Handoff | page `2:5`, board `3:528` |

## Pages

1. **Cover.** Unofficial portfolio prototype. The arrival story in one board. Links to each demo prototype. No "please hire me" slide.
2. **Foundations.** Integer pixel grid. Type. Color. Modes for default, high contrast, larger UI, and the colorblind palettes. Wheelchair is a sprite and a path, not a footnote.
3. **Components.** Letter, dialogue box, portrait frame, name and pronoun fields, map HUD, buttons, doodad, notebook, lesson panel. A control used twice becomes a component.
4. **Flows.** One section per demo, prototyped: `D1-letter-train` through `D8-snow`.
5. **Handoff.** What the build implemented, and any named difference from the frame.

Keep the cozy 16-bit to 64-bit look. Figma is not permission to restyle this as a generic web app.

What the frames must contain — grid, palette, components, per-demo layouts, and accessibility modes — is the **Figma design** section of [GOAL.md](../GOAL.md). Empty pages do not satisfy it.

## When a cycle changes what the player sees

1. Update the component or frame, including the accessibility mode that the story touches.
2. Link the prototype from the demo row in [DEMOS.md](DEMOS.md).
3. Implement that frame. Content ids in the handoff note match `content/` (`place` id, `lesson` id).
4. In the cycle report, paste the frame URL the tool returned and write what you checked. "No frame change" is allowed only when the player cannot see a difference.

A player-facing item is not done without that. A logic-only fix can say "no frame change."

## M0 acceptance — cycle 0006

M0 is complete. Earlier incomplete/pending statements in cycle reports are historical. The human gate is resolved; the operator subsequently cleared the M1 hold for cycle 0007.

The recorded URL remains the original integration result, unchanged:

```json
{"file_key":"RgmU4XGp5hEYxNTBlvXlOS","file_url":"https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS","message":"File \"Middlebury Campus RPG (unofficial)\" created successfully."}
```

Cover has a supported cross-page internal node hyperlink, not a NAVIGATE action or a constructed URL. Exact readback:

```json
{"coverLink":{"type":"NODE","value":"3:86"}}
```

Follow the Cover link to Letter, then use Present / Flow 1. The existing five-edge chain was preserved and read back:

| Source frame | Control | Destination frame |
| --- | --- | --- |
| Letter `3:86` | `I3:87;3:57` | Origin `11:1029` |
| Origin `11:1029` | `I11:1030;3:57` | Train `8:614` |
| Train `8:614` | `8:628` | Platform `8:630` |
| Platform `8:630` | `8:674` | Character `8:368` |
| Character `8:368` | `I8:369;6:184` | Letter `3:86` |

All 43 Flows frames were rendered and visually reviewed. Final tool readback reports `frameBoundsIssues: []`, `autoLayoutOverlapIssues: []`, and `imageFilledNodes: 0`. The source audit reports seven 480×270 maps, `pixelIssues: []`, and sixteen 32×32 standing/wheelchair facing/motion variants.

| GOAL requirement | Accepted design evidence |
| --- | --- |
| Original palette, type, contrast, grid | Foundations board `3:517`; 17 color variables with recorded mode hex values. Ink/paper minimum 11.60:1; paper/pine minimum 6.43:1. |
| Named components and states | Button and text-field four-state sets; Letter, Dialogue, Notice, Map HUD, Notebook, Lesson panel, Character preview; review board `23:231`. |
| Standing and wheelchair | 16 sprite variants, source 32×32, review `23:270`; preview variants `6:142` and `17:182` with reciprocal CHANGE_TO links. |
| Desktop and phone UI | Shared letter, creator, dialogue, notebook and lesson components; desktop 1280×720, phone 390 px with full-height scrollable specimens where needed. |
| Accessibility and seasons | Same letter/dialogue/map components in default, high contrast, larger UI and colorblind modes. Four seasons use the same map/ground variable. |
| Real layouts | Letter/origin, train/platform, creator, escort and dialogue-open state, dorm/doodad slots/notice, campus/dining/library, class with teacher portrait/lesson/notes/ask fields, sample town, Snow Bowl and optional minigame. |
| Nonblocking outcomes | Skipped, finished and missed minigame states each navigate back to Snow Bowl `8:878`. |
| Handoff | Board `3:528` names content IDs and differences from the build for every scene. |

The exact receipts, IDs, palette values, contrast calculations, and per-render review manifest are [M0-acceptance.json](figma/M0-acceptance.json). Earlier evidence files remain an audit trail; the acceptance file supersedes their outdated dimensions and pending state. The preview sizing delta in the acceptance file supersedes the earlier source-audit height for the two preview variants.

All art consists of original editable Figma nodes, with no photographs or college marks. Maps are sample layouts/game framing. Class teacher text and the shown response are verbatim from `sample-seminar-questions`; campus dialogue uses the sample `orientation-leader / welcome` line. Escort dialogue is explicitly sample design copy.

This section records M0 design acceptance. At that point the origin input was a filled prototype state, and native text entry, persistence and the playable D1 build remained M1 work. Navigation was checked through exact reaction/hyperlink readback. The shipped D1 evidence follows below.

## D1 implementation — cycle 0007

M1 now implements the accepted letter/origin, train and platform geometry, palette and bundled font. Content is `arrival-letter` in `content/arrival.json`, with existing `middlebury-station` / `station-greeter` references.

New frames were drawn before implementation for phone train (`31:2609`), phone platform (`31:2633`), origin error (`31:2709`), rejected save (`31:2720`) and save unavailable (`31:2732`). D1’s platform Continue opens the existing local feedback form; the M0 five-edge design chain and Cover NODE link remain intact. The template origin affects the ride caption only.

Handoff board `32:2` records the shipped scope and differences. Tested source build: `fd13bcf3bd32b0af91f33d8492dfa89f441c1e9a`. `npm run validate` passed with 21 tests, TypeScript and Vite build; 6 production-browser checks passed. Desktop and phone renders were compared with the corresponding Figma screenshots. There were no supplied static image/SVG assets: the native rectangle geometry is translated into local React/CSS primitives. The matching font is bundled with its SIL OFL license.

The prototype is linked from the D1 row in [DEMOS.md](DEMOS.md) using the original recorded file URL, with Cover → arrival link → Present / Flow 1 instructions. No prototype/public URL was constructed. Exact frame/readback evidence is [D1-handoff.json](figma/D1-handoff.json).

The earlier M0-only statement that no game screens exist is historical. D1 is now a playable local build. Later gameplay phases remain pending.

## D1 repair pending — cycle 0008

The playtest on a68e28f blocks new features. Ten repair frames were created in this same file before the interruption, including three ride stages and an explicit demo ending. Their IDs and creation evidence are in [D1-repair-pending.json](figma/D1-repair-pending.json). They must be inspected and visually accepted before implementation. The resumed inspection returned UNAUTHORIZED / reauthentication required. See gates/PENDING-figma.md. Do not duplicate the file or frames. M2 remains on hold.

## D1 repair accepted — cycle 0009

Authentication recovered; all ten existing repair frames were retained and inspected. Fixed text reflow, reviewed desktop/phone layouts, and implemented their original rectangle scenery and shared palette. Cover now targets repaired Letter 38:2698. Exact readback: `{"mutatedNodeIds":["3:515"],"coverLink":{"type":"NODE","value":"38:2698"}}`. Handoff returned `{"createdNodeIds":["47:2"],"contentId":"arrival-letter","publicUrl":null}`.

Train departure, Vermont and approach scenes move in integer steps in the build; pause and reduced motion stop movement. The prototype uses still scenes. The native input is single-line; the prototype-only feedback note is omitted from the actual ending. All copy comes from arrival-letter; station and greeter IDs remain existing content references. No new file or public URL. The prior pending section is historical; gate archived under gates/resolved/figma-cycle-0009.md.

## M2-character — cycle 0010

Existing creator 6:158 expanded before implementing the native form; desktop 8:368 and phone 8:466. Platform open control returned 51:3340; completion frames returned 53:3263 and 53:3271. Content ID character-creator in content/character.json, existing station-greeter and middlebury-station. Local D2 build and feedback path are in DEMOS.md. Native selects/checkboxes differ from the compact Figma field specimens; document-flow scrolling and browser focus chrome are intentional. M3 is held.

## D2 preview repair — cycle 0011

Player feedback rejected the tiny lower-page figure and numeric skin list. The repaired frames are desktop 57:3098 and phone 57:3213, built before application code. Review 56:429 shows four large standing/wheelchair figures. Components also contains 46 named appearance specimens, all original editable rectangles on a 64×80 grid. The same geometry renders dynamically in the build at 3× desktop and 2× phone. Eight original skin variables remain the source of the named swatches. No new file, external art, photographs, college marks or static screenshot assets were used.

Prototype readback returned `{"mutatedNodeIds":["51:3340","53:3267","53:3275"],"desktop":"57:3098","phone":"57:3213","saveDestinations":["53:3263","53:3271"],"contentId":"character-creator"}`. Handoff returned `{"createdNodeIds":["61:2"],"contentId":"character-creator","frames":["57:3098","57:3213"],"publicUrl":null}`. Original URL remains https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. Evidence and full creation receipts: figma/D2-preview-repair.json.

Native inputs/selects and document-flow optional controls differ from compact Figma specimens. The prototype sample is Coils / medium copper; the build shows the selected saved state. The live preview sticks to the left on desktop and above the form on phone, including on completion. Every named visual option changes rendered figure pixels in browser checks. M3 remains held.

## Character range checkpoint — cycle 0012 (incomplete)

GOAL a2855d5 is synced. Connected reads of the existing file and D2 desktop 57:3098 succeeded in session `3eb7748b-2965-4160-b30d-99bbb92753cc`. The operator requested a safe stop before any range frames were created. Unaccepted original portrait/sprite/control drafts are preserved in `docs/figma/drafts/0012/`; see its README and `cycles/0012-character-range-checkpoint.md` to resume. These drafts do not constitute Figma acceptance or shipped code. Existing cycle 0011 frames remain unchanged. M3 is held.

## Character range retry — cycle 0013 (blocked)

The operator resumed the checkpoint. The first connected inspection returned `UNAUTHORIZED`: "This app connection requires reauthentication before other actions on this app can succeed." No Figma mutations or product edits occurred. See gates/PENDING-figma.md and cycles/0013-character-range-auth.md. Preserve the cycle 0012 drafts and original file; reauthenticate before resuming.

## Character range retry — cycle 0014 (blocked)

Authentication is restored; the connected inspection succeeded with `rangeNodes: []`. The first write was rejected before execution because its `code` string exceeded 50000 characters (`INVALID_ARGUMENT`). No frames or product code were added. This was an assistant request-sizing error. See cycle 0014 and gates/PENDING-figma.md; resume with compact or bounded requests after the gate is cleared.

## Character range retry — cycle 0015 (blocked)

Connected inspection succeeded. A compact 41431-character write passed the input limit but returned 53420 bytes, exceeding the 48000-byte result limit. Tool result: "Canvas edits from this run were not committed." No new accepted frames or product code. Resume with smaller component batches; exact evidence is in cycles/0015-character-range-return-limit.md.

## Character range — cycle 0016 checkpoint (implementation incomplete)

Existing file remains https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. Connected readback retained board `71:2017`: Person `71:2020`, Creature `71:2056`, Construct `71:2124`, all 64×80. No sprite recreation. Exact original receipt and readback are committed as `figma/R3-sprites.json` and `figma/R3-sprites-readback.json`.

Separate 160×180 portraits: Person `74:2020`, Creature `74:2102`, Construct `74:2272`. All 52 named control studies were added in nine batches (six each, final four); exact receipts `figma/R3-controls-*.json`. Creator desktop `74:9838`, phone `74:9987`. Shared-variable modes: high contrast `78:3672`, colorblind `78:3842`, larger UI `78:4012`. Retained existing appearance/access fields, optional identity flags, and six range groups. Native selects/checkboxes implement the compact Figma field studies; samples show Coils/medium copper while the build uses saved choices. Portrait, map sprite and optional aid-detail inset are separate visual elements. Voice/filter are caption labels, with no audio. Original art, existing palette variables, no imported third-party art.

Prototype readback: platform `51:3340` → desktop `74:9838`; save `74:9985` → completion `53:3263`; phone save `74:10134` → `53:3271`; edit `53:3267` → desktop; edit `53:3275` → phone. Completion frames now contain separate portrait instances. Full receipt `figma/R3-dialogue-wiring.json`. A relaxed-coat regression specimen `79:2020` keeps its hem inside the portrait; receipt `figma/R3-relaxed-coat.json`.

Desktop/phone creator and phone completion screenshots were inspected in Figma. No full interactive browser acceptance is claimed. Runtime wiring is started, but `npm run validate` fails TypeScript in the new test; see cycle 0016. The Figma Handoff page still needs the final build comparison before R3 is marked done. Older checkpoint/gate sections above are historical.

## R3 final comparison — cycle 0016 complete

The prior checkpoint sections are historical. Resumed from f869819 without runtime changes. Compared desktop/phone creator and completion against existing frames; retained artwork and component IDs. Reconciled centered preview, separate text inputs, completion's two drawings and all exit controls only where the build disagreed. Five existing prototype edges remain intact; new Back to platform controls return to 38:2846 / 38:3078.

Handoff board `84:3`, text `84:2`, records what matches and differs. Full returned text is [R3-handoff.json](figma/R3-handoff.json); board receipt [R3-handoff-board.json](figma/R3-handoff-board.json). Screenshot evidence: figma/R3-comparison/. Native field heights/focus chrome, sticky document scrolling, saved state, selected swatch cues, compact preview captions, mode specimens and local-only feedback behavior are explicitly documented differences, not a pixel-identical claim. No new URL.

Final observed validation: 27 unit tests, TypeScript, production build and all 14 desktop/phone browser checks passed. D2 source f86981922dc279501d3a06f67c26eabd007ed791; local play and version-bound feedback in DEMOS.md. R3 complete; M3 held.

## M3 escort — cycle 0017 design checkpoint, incomplete

New session `1fe85448-172e-4c6e-a39d-5caced638a1f` in the existing file. Read starter escort 8:676 and its dialogue state, then drew walking desktop/phone 87:4031 / 87:4130, wheelchair 87:4229 / 87:4335, and portrait dialogue 87:4441 / 87:4624. Reused existing character components. Native full-route overview 88:4585 follows existing content graph locations, with a level path, stone collision specimen and Triangle Park fountain. Endpoint specimen 89:4655 explicitly ends D3 before unpacking; D2 entry controls 89:4649 / 89:4652 point to escort frames. Full successful IDs: M3-walk.json, M3-chair.json, M3-dialogue.json, M3-route.json, M3-entry-end.json.

The next facing/accessibility batch failed: `Error: in get_name: The node with id "90:5044" does not exist`. Its partial canvas state is unknown. No retry, runtime code, new file or invented URL. Read gates/PENDING-figma.md and cycle 0017 before resuming. These designs are not a shipped or accepted D3 demo. M4 remains untouched.

## M3 implemented — cycle 0018

Retained all saved frames. Recovered high contrast 92:4723, colorblind 92:4824 and larger UI 92:4925; exact original receipts/readback saved. Added missing cardinal facing study 93:4921; eight resolved existing directional components. Original failed node ignored. Gate resolved only after receipts were saved. Handoff 94:2 (receipt M3-handoff.json) records dynamic camera, saved character, native controls and simplified decorative scenery differences. Character range sprite remains the runtime art; facing mirrors west and hides facial features north, with a direction cue. 29 tests, TypeScript, production build and 18 browser checks passed. D3 local instructions in DEMOS.md. No new file or invented URL; M4 held.

## M4 dorm — cycle 0019 checkpoint (incomplete)

Session 7127f940-07d6-45e1-b049-875c7eefcc69 inspected starter dorm 8:721 before changes. New unpack desktop/phone 95:4981 / 95:4995 and finished-notice 95:5009 / 95:5026 precede code; exact IDs M4-frames.json. Room uses original 320×180 geometry, 2× desktop and 1× phone, with bed, desk and three slots. Generic book/mug/keepsake are belongings brought from selected origin, with no inferred geography/culture. Prototype entry 96:4981 links D3 endpoint to phone unpack; unpack state links to notice specimen. Actual build requires all three placements before finishing. M4-prototype.json records wiring.

Handoff 97:2 records native selects, item initials and scrolling differences; M4-handoff.json. Figma notice screenshot reviewed. Application tests/build pass; browser suite is blocked before execution by a Node JSON import-attribute issue. No final visual comparison or D4 acceptance claimed. Preserve frames on resume; M5 held.

## M4 comparison complete — cycle 0019 resume

Read-only comparison of saved desktop/phone notice frames 95:5009 / 95:5026 against production browser screenshots. Room geometry, palette and slot positions match. Native selects remain visible after finishing; notice is farther down the scrolling document. Item initials, substituted origin and native heading/button typography differ from compact specimens. No frames changed. Screenshots: figma/M4-comparison/. Runner JSON-import fix passed 30 tests, TypeScript, production build and 20 browser checks. M4 complete; prior blocked checkpoint is historical. M5 held.
