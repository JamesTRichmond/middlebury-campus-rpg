# Middlebury Campus RPG

Unofficial orientation RPG for new students at Middlebury College. This repository is the working environment for a coding agent. It is **not** affiliated with, endorsed by, or speaking for Middlebury College. Do not use college logos or depict real people.

The playable game is not built yet. Cycle 0 is the goal, the continuous loop, and content gates. The next agent starts at backlog item `M1-shell`.

## Paste this as the agent goal

```text
Build the unofficial Middlebury College orientation RPG described in GOAL.md of JamesTRichmond/middlebury-campus-rpg.

Every session, read AGENTS.md, GOAL.md, LOOP.md, STATUS.md, BACKLOG.md, DECISIONS.md, and the newest file in cycles/. Then execute LOOP.md until a stop condition. Do not ask whether to continue between cycles. One backlog item per cycle. Fail closed: gates must actually pass, campus facts you state as true need a source, and you may not invent real faculty, staff, or students.

The player creates a character of themselves, learns the campus by talking and traveling a place graph, finishes an orientation arc, unlocks abilities and tools, takes sidequests, opens the town and outdoors, and attends a sample class where they take notes and ask questions answered from that lesson.

Start by running npm run validate and recording the real result. If it passes, begin M1-shell.
```

If that prompt and `GOAL.md` ever disagree, `GOAL.md` wins until the operator edits it.

## Loop, short version

1. Take the first `ready` backlog item whose blockers are done.
2. Implement only that.
3. Run its gate, including `npm run validate`.
4. Write `cycles/NNNN-*.md`, update `STATUS.md`, commit.
5. Every fifth product cycle, run a meta cycle that tightens tests and fixes repeated failures without adding scope.
6. Start the next cycle. Stop only for a human gate, three gate failures, an operator hold, or an empty backlog.

Human gates (do not create these yourself): `gates/real-people.approved`, `gates/live-lms.approved`.

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
