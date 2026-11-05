# Middlebury Campus RPG (unofficial)

A cozy, browser-based orientation RPG. You arrive by train, build a character who can be you or a non-human build, and walk a pixel-art Middlebury: dorm, dining hall, library, class, town, and a Snow Bowl trip. Class is a real lesson object, not a cutscene, and the teacher can only answer from that lesson.

**Not affiliated with, endorsed by, or speaking for Middlebury College.** No college logos, no real people, original art only.

## What a player can do

All eight demo scenes (D1–D8) are implemented and covered by tests:

1. Open an unofficial acceptance letter, set a home town, ride the train into Middlebury station.
2. Build a character: name, free-text pronouns, a wide slider set, and accessibility options (wheelchair, captions, high contrast, larger UI, colorblind palettes) that apply from then on.
3. Walk an escorted route from the station through Triangle Park to the dorm, walking or in a wheelchair.
4. Unpack and place doodads, then take the orientation notice downstairs.
5. Visit dining and the library with portrait dialogue.
6. Attend class. Notes persist, and questions are answered only from that lesson's content.
7. Cross into town, where sample places are labeled as sample.
8. Toggle seasons without touching quest state, and take an optional Snow Bowl minigame that never blocks the story.

Leave and come back: character, room, notes, and unlocks live in a versioned `localStorage` save. A save that fails validation is refused instead of dropped.

## Engineering

| Area | Choice |
| --- | --- |
| App | React 19 + TypeScript, Vite 7, static build, no backend or accounts |
| Data | Places, exits, NPCs, quests and lessons are JSON in `content/`, validated with Zod and graph checks |
| Lessons | A `LessonSource` seam. Bundled lessons are labeled samples, and a live LMS adapter waits on a human gate |
| Facts | Every campus fact shown in UI is tagged verified, seed or sample. Verified facts carry a source URL and date |
| Design | Figma first: frames, components and accessibility modes are drawn before code ([design file](https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS)) |
| Tests | Vitest unit and content tests, plus Playwright desktop and phone flows for every demo scene |

The repo was built by an AI coding agent working a fail-closed loop: one backlog item per cycle, a required gate before it lands, a cycle report in `cycles/`, and human approval files in `gates/` for anything touching likeness, live systems or cost. The loop rules are in [GOAL.md](GOAL.md), [LOOP.md](LOOP.md) and [AGENTS.md](AGENTS.md). Accepted choices are in [DECISIONS.md](DECISIONS.md).

## Run it

Node `>=20.19`.

```sh
npm ci
npm run validate   # typecheck, unit tests, production build
npm run preview    # open the printed URL (port 4173)
npm run test:browser  # Playwright, desktop and phone
```

`test:browser` uses `/usr/bin/chromium` when present; otherwise run `npx playwright install chromium` first. A playable walkthrough of all eight scenes is in [docs/PLAYTEST.md](docs/PLAYTEST.md).

## Playtest form

The feedback deck is already built. From the repo:

```sh
npm run feedback
```

Then open the local page it prints. It shares port 4173 with `npm run preview`, so run one at a time. A demo should link it with `?demo=D6-class&version=<git-sha>` so the report names the build. Submitting copies Markdown you can paste back to the agent. The same browser keeps earlier answers and the report shows what changed.

## Agent setup

- Codex Cloud install script: [scripts/codex-install.sh](scripts/codex-install.sh)
- Start skill: [.codex/start-skill.md](.codex/start-skill.md)
- Human gates (never created by an agent): `gates/real-people.approved`, `gates/likeness.approved`, `gates/live-lms.approved`.

The game is a static browser build. No public URL is published yet.

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
