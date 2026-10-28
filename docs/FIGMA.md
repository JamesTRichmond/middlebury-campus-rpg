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
