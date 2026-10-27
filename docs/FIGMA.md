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

## M0 integration evidence

Observed 2026-10-27: Primary authentication and file access succeeded. The existing file was reused. The original creation tool returned:

```json
{"file_key":"RgmU4XGp5hEYxNTBlvXlOS","file_url":"https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS","message":"File \"Middlebury Campus RPG (unofficial)\" created successfully."}
```

Flows page `2:4` contains desktop (1280×720) and phone starter letter/dialogue specimens in default, high contrast, larger UI, and colorblind modes. These use the same components. The larger phone letter is 390×1004 after repairing text reflow; it is a scrollable design specimen. Map specimen is 480×270 at integer coordinates. Handoff page `2:5` records content mappings and build differences.

Typography is Atkinson Hyperlegible Mono Regular, verified in the rendered text. Larger UI scales shared instances 1.25×. Original palette variables bind fills and text. The generic colorblind mode replaces pine with blue; individual palettes and wheelchair animation remain later milestone work. No playable D1 demo or train prototype is claimed by M0.

Exact IDs and tool evidence: [M0-state.json](figma/M0-state.json). The PR keeps M0 doing until merge under LOOP's assigned-branch rule.
