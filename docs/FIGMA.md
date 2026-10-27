# Figma

Figma is the primary tool for this project. The connected Figma integration is already authorized. Design there first. Code follows the frames.

This is an unofficial portfolio prototype for a full-stack developer interview at Middlebury College. Figma is a major tool on that developer team. The file should be something you can open in an interview: a design system, clickable flows, and a build that matches. It is not a college product. Do not put the college's logos, crests, or athletic marks in the file. Do not put real people's photos in it.

## One file

Create one file named `Middlebury Campus RPG (unofficial)`. Record the URL the integration returns. Never invent a URL. If the integration is not signed in or the call fails, write `gates/PENDING-figma.md`, set `stop: human-gate`, and stop. Do not design the screen only in code and backfill Figma later. Do not buy a plan or switch accounts.

| | |
| --- | --- |
| File URL | not created yet |
| Cover | |
| Foundations | |
| Components | |

## Pages

1. **Cover.** Unofficial portfolio prototype. The arrival story in one board. Links to each demo prototype. No "please hire me" slide.
2. **Foundations.** Integer pixel grid. Type. Color. Modes for default, high contrast, larger UI, and the colorblind palettes. Wheelchair is a sprite and a path, not a footnote.
3. **Components.** Letter, dialogue box, portrait frame, name and pronoun fields, map HUD, buttons, doodad, notebook, lesson panel. A control used twice becomes a component.
4. **Flows.** One section per demo, prototyped: `D1-letter-train` through `D8-snow`.
5. **Handoff.** What the build implemented, and any named difference from the frame.

Keep the cozy 16-bit to 64-bit look. Figma is not permission to restyle this as a generic web app.

## When a cycle changes what the player sees

1. Update the component or frame, including the accessibility mode that the story touches.
2. Link the prototype from the demo row in [DEMOS.md](DEMOS.md).
3. Implement that frame. Content ids in the handoff note match `content/` (`place` id, `lesson` id).
4. In the cycle report, paste the frame URL the tool returned and write what you checked. "No frame change" is allowed only when the player cannot see a difference.

A player-facing item is not done without that. A logic-only fix can say "no frame change."
