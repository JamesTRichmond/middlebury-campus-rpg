# Middlebury Campus RPG

Unofficial orientation RPG for new students at Middlebury College. This repository is the working environment for a coding agent. It is **not** affiliated with, endorsed by, or speaking for Middlebury College. Do not use college logos or depict real people.

The playable game is not built yet. The next agent starts at backlog item `M0-figma-file`, then `M1-letter-train`. Figma is the primary design tool. The goal file is [Middlebury-Campus-RPG-GOAL.md](Middlebury-Campus-RPG-GOAL.md). If that file and `GOAL.md` disagree, `GOAL.md` wins until the operator edits it.

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

Node `>=20`.

```sh
npm ci
npm run validate
```

`npm run validate` is `vitest` plus `tsc`. There is no client yet; the green suite means the seed content is internally consistent.

## Map

| File | Why it exists |
| --- | --- |
| [GOAL.md](GOAL.md) | Product goal and phase plan |
| [LOOP.md](LOOP.md) | Continuous work, meta improvement, stop rules |
| [AGENTS.md](AGENTS.md) | Boundaries |
| [BACKLOG.md](BACKLOG.md) | The queue. Order beats any issue list |
| [STATUS.md](STATUS.md) | Lock, stop flag, current item |
| [DECISIONS.md](DECISIONS.md) | Stack and product choices already made |
| [content/](content/) | Places, archetypes, quests, sample lesson |
| [docs/CONTENT_POLICY.md](docs/CONTENT_POLICY.md) | What the game is allowed to claim |
