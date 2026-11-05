# Middlebury Campus RPG

<!-- portfolio summary -->
> **Portfolio summary.** A cozy, unofficial orientation RPG: arrive by train, build a character (including a wheelchair route), walk a pixel-art campus, and attend a class whose teacher can only say what's in the lesson data. All eight demo stages (D1–D8) are playable locally.
>
> **Stack:** TypeScript · React 19 · Vite · Zod-validated content graph · Vitest · Playwright · Figma-first design (every player-visible screen is a Figma frame before it's code)
>
> **Notable engineering:** places, exits, NPCs and quests are JSON validated by schema and graph checks (`npm run validate`); a versioned `localStorage` save that never drops notes on load; every stated campus fact carries a status, a source URL and an as-of date; accessibility modes (high contrast, larger UI, colorblind palettes, captions) are part of the design system, not an afterthought; built by an agent loop with gated cycles, 26 gated cycles so far and a meta cycle every fifth.
>
> **Try it:** `npm ci && npm run validate && npm run preview`. Unofficial; not affiliated with Middlebury College.

Unofficial orientation RPG for new students at Middlebury College. This repository is the working environment for a coding agent. It is **not** affiliated with, endorsed by, or speaking for Middlebury College. Do not use college logos or depict real people.

D1 is a local playable arrival: unofficial letter, home place, train window, and Middlebury platform. M0 is complete; the active cycle and next item are in STATUS.md. Figma is the primary design tool. The only goal is [GOAL.md](GOAL.md). [Middlebury-Campus-RPG-GOAL.md](Middlebury-Campus-RPG-GOAL.md) and [prompts/PASTE-GOAL.md](prompts/PASTE-GOAL.md) are pointers, not a second goal.

## Loop, short version

1. Take the first `ready` backlog item whose blockers are done.
2. Implement only that.
3. Run its gate, including `npm run validate`.
4. Write `cycles/NNNN-*.md`, update `STATUS.md`, commit.
5. Every fifth product cycle, run a meta cycle that tightens tests and fixes repeated failures without adding scope. Pasted playtest feedback jumps ahead of new features.
6. After each of M1–M8, the Figma prototype and a playable demo already match, the demo links the feedback form, and then the next cycle starts. Stop only for a human gate, three gate failures, an operator hold, or an empty backlog.

Human gates (do not create these yourself): `gates/real-people.approved`, `gates/likeness.approved`, `gates/live-lms.approved`.

## Playtest form

The feedback deck is already built. From the repo:

```sh
npm run feedback
```

Then open the local page it prints. A demo should link it with `?demo=D6-class&version=<git-sha>` so the report names the build. Submitting copies Markdown you can paste back to the agent. The same browser keeps earlier answers and the report shows what changed.

## Commands

Node `>=20.19` (or a current LTS release).

```sh
npm ci
npm run validate
```

`npm run validate` runs content/arrival tests, TypeScript checks, and the production build. To play that build:

```sh
npm run preview
```

Open the local URL printed by Vite (port 4173). A new browser opens the letter; a returning browser resumes its saved train/platform. Platform Continue opens the existing feedback form with `demo=D1-letter-train` and the exact Git SHA compiled into that build. No account or remote service is used. The font and original Figma geometry are bundled locally.

```sh
npm run test:browser
```

This checks the production build on desktop and phone using Playwright. It uses `/usr/bin/chromium` when present; otherwise install Playwright Chromium with `npx playwright install chromium`. The separate `npm run feedback` command still serves the original form alone; run it separately from the game preview because both use port 4173.

## Codex Cloud

Paste these into the environment's setup fields before publishing:

- Install script: [scripts/codex-install.sh](scripts/codex-install.sh)
- Start skill: [.codex/start-skill.md](.codex/start-skill.md)

The game is a static browser build, with local Vite preview for testing. There is no backend or published public URL.

## Map

| File | Why it exists |
| --- | --- |
| [GOAL.md](GOAL.md) | The only goal. Product, Figma design, and phase plan |
| [docs/FIGMA.md](docs/FIGMA.md) | Figma file setup. Design there before code |
| [LOOP.md](LOOP.md) | Continuous work, meta improvement, stop rules |
| [AGENTS.md](AGENTS.md) | Boundaries |
| [BACKLOG.md](BACKLOG.md) | The queue. Order beats any issue list |
| [STATUS.md](STATUS.md) | Lock, stop flag, current item |
| [DECISIONS.md](DECISIONS.md) | Stack and product choices already made |
| [content/](content/) | Places, archetypes, quests, sample lesson |
| [docs/CONTENT_POLICY.md](docs/CONTENT_POLICY.md) | What the game is allowed to claim |
