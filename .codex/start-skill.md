# Middlebury Campus RPG development environment

Use the existing checkout at `/workspace/middlebury-campus-rpg`. This is an unofficial portfolio prototype, not a Middlebury College product.

## Ready check

The arrival game is a static Vite browser build. Use local preview when testing; do not invent a public URL or deploy.

1. `cd /workspace/middlebury-campus-rpg`
2. Confirm Node is 20.19 or newer.
3. If `node_modules` is missing, run `npm ci`.
4. Run `npm run validate`. It must exit 0. Do not start the backlog if it fails.
5. After validation, `npm run preview` serves the local game and `/feedback/index.html` on port 4173. `npm run feedback` separately serves only the original form.

## Then begin

Read, in order: `AGENTS.md`, `GOAL.md`, `LOOP.md`, `STATUS.md`, `BACKLOG.md`, `DECISIONS.md`, `docs/FIGMA.md`, `docs/EXPERIENCE.md`, `docs/DEMOS.md`, `docs/LESSON_BRIDGE.md`, `skills/skillgame-feedback/SKILL.md`, the newest file in `cycles/`, and anything in `feedback/inbox/`.

Then execute `LOOP.md` until a stop condition. One backlog item per cycle. Do not ask whether to continue.

Read STATUS.md for the next item. M0 has created and accepted the Figma file; reuse its recorded URL. If Figma is not available, write `gates/PENDING-figma.md`, set `stop: human-gate`, and stop. Do not invent a Figma URL and do not start `M1-letter-train` instead.
