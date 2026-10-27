# Middlebury Campus RPG development environment

Use the existing checkout at `/workspace/middlebury-campus-rpg`. This is an unofficial portfolio prototype, not a Middlebury College product.

## Ready check

There is no game server yet. Do not start Vite, do not invent a public URL, and do not deploy.

1. `cd /workspace/middlebury-campus-rpg`
2. Confirm Node is 20 or newer.
3. If `node_modules` is missing, run `npm ci`.
4. Run `npm run validate`. It must exit 0. Do not start the backlog if it fails.
5. The playtest form is local only: `npm run feedback` prints `http://127.0.0.1:4173/`.

## Then begin

Read, in order: `AGENTS.md`, `GOAL.md`, `LOOP.md`, `STATUS.md`, `BACKLOG.md`, `DECISIONS.md`, `docs/FIGMA.md`, `docs/EXPERIENCE.md`, `docs/DEMOS.md`, `docs/LESSON_BRIDGE.md`, `skills/skillgame-feedback/SKILL.md`, the newest file in `cycles/`, and anything in `feedback/inbox/`.

Then execute `LOOP.md` until a stop condition. One backlog item per cycle. Do not ask whether to continue.

The next item is `M0-figma-file`. Create the Figma file with the connected integration and record the real URL. If Figma is not available, write `gates/PENDING-figma.md`, set `stop: human-gate`, and stop. Do not invent a Figma URL and do not start `M1-letter-train` instead.
