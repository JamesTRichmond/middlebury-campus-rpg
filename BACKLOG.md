# Backlog

Order is priority. The first `ready` item whose blockers are `done` is the only legal task. Put player-facing bugs and playtest regressions above the current feature. Do not mass-file GitHub issues from this list; this file is the queue.

The old "exit buttons as the game" plan is withdrawn. D009 replaces it. Scene order: [docs/EXPERIENCE.md](docs/EXPERIENCE.md). Demo ids: [docs/DEMOS.md](docs/DEMOS.md).

Status values: `ready`, `doing`, `done`, `blocked`.

When an item below is marked done, also publish its demo in the same cycle (LOOP.md). Design the screen in Figma first ([docs/FIGMA.md](docs/FIGMA.md)). The class demo is `D6-class`: the teacher delivers the virtual lesson, and notes and questions stay on that lesson.

## M0-figma-file

```yaml
status: ready
blockedBy: []
humanGate: no
owner: ""
```

Create the Figma file with the connected integration. Do this before any game screen.

- File name: `Middlebury Campus RPG (unofficial)`.
- Pages from [docs/FIGMA.md](docs/FIGMA.md): Cover, Foundations, Components, Flows, Handoff.
- Foundations include the pixel grid, type, color, and accessibility modes (default, high contrast, larger UI, colorblind palettes).
- Starter components: letter, dialogue box, portrait frame, button.
- Cover states that the prototype is unofficial and not a college product.
- Write the file URL the integration returns into `docs/FIGMA.md` and STATUS. The cycle report quotes the tool result. No invented URL.
- If the integration fails, `gates/PENDING-figma.md` and `stop: human-gate`. Do not start M1 instead.
- Gate: `npm run validate`, plus the URL present in `docs/FIGMA.md`.

## M1-letter-train

```yaml
status: ready
blockedBy: [M0-figma-file]
humanGate: no
owner: ""
```

The opening, before free walk.

- Title is the acceptance letter. It says the game is unofficial.
- Player sets a home place. Store it on the save. It only affects ride captions.
- A short train sequence ends at `middlebury-station`.
- No campus exit menu. New game does not drop the player on Arrival Green.
- Gate: `npm run validate` plus a test that a new save's place is `middlebury-station` and `origin` is the string they set. The letter and train frames exist in Figma and the build matches them. Browser check of letter then train if a browser exists.

## M2-character

```yaml
status: ready
blockedBy: [M1-letter-train]
humanGate: no
owner: ""
```

On the platform, the greeter asks what to call you. That opens the builder.

- Name, pronouns (free text plus suggestions).
- Appearance: skin tones across the range, hair including textured and protective styles, facial hair, cultural or religious head coverings, body variety.
- Mobility: foot, wheelchair, or another aid. Wheelchair is stored and will change the sprite in M3.
- Accessibility, applied immediately and editable later: captions (default on), visual sound cues, colorblind palettes, high contrast, UI scale, control names a screen reader can use.
- Fall or Feb, interests, and optional first-gen or international flags stay available. Flags are opt-in. Never infer them.
- Gate: `npm run validate` plus a round-trip test of the character, including mobility and a colorblind mode.

## M3-escort

```yaml
status: ready
blockedBy: [M2-character]
humanGate: no
owner: ""
```

First pixel-art walk. Top-down, 16-bit to 64-bit cozy sprites. Not a menu of buttons.

- Render the place graph as a walkable map for the escort: `middlebury-station` → `triangle-park` → campus → `dorm-room`.
- Greeter escorts. Wheelchair completes the same path. No stair-only exit off the platform.
- Collision and a facing sprite. Camera follows.
- Gate: `npm run validate` plus a headless test that the escort quest `welcome` can complete, and a note in the cycle report of how the wheelchair was checked.

## M4-dorm

```yaml
status: ready
blockedBy: [M3-escort]
humanGate: no
owner: ""
```

- Unpack a few items tied to `origin`.
- Place a small set of doodads in `dorm-room`. Positions save.
- When they finish, show the orientation notice pointing downstairs. Do not start the campus tour automatically.
- Gate: `npm run validate` plus a save test that doodads survive reload.

## M5-campus-walk

```yaml
status: ready
blockedBy: [M4-dorm]
humanGate: no
owner: ""
```

- Orientation arc in `content/quests/quests.json`, started by the player after the notice.
- Talk uses a dialogue box and a portrait more detailed than the map sprite. Portraits are original art. No real headshots.
- Steps complete from enter-place and talk-npc, including dining and the library.
- Town stays locked.
- Gate: `npm run validate` plus a simulation that finishes `orientation` without entering `downtown`.

## M6-notebook-class

```yaml
status: ready
blockedBy: [M5-campus-walk]
humanGate: no
owner: ""
```

- Grant `notebook`, `meal-plan`, and `ask-a-question` from the orientation rewards already in the quest JSON.
- Notes survive reload, including from a save that had none.
- Sample seminar via `LessonSource`. No network. The teacher delivers that lesson and no other speech. Responses only from the lesson. Chrome says sample, and that this is the virtual lesson for the class. Demo id `D6-class`.
- Gate: `npm run validate` plus tests for note migration and for a response that is not on the lesson.

## M7-town

```yaml
status: ready
blockedBy: [M6-notebook-class]
humanGate: no
owner: ""
```

- Completing campus objectives unlocks `downtown` and `movie-theater`.
- Triangle Park is the door you use. If you call it the campus boundary, label that as the game's framing.
- Restaurants stay a sample place until sourced. Do not invent names.
- Interest sidequests already in content still work and stay hidden when the interest was not picked.
- Gate: `npm run validate` plus a test that those places are locked on a fresh save and open after orientation, and that an unselected interest offers no quest.

## M8-seasons-snowbowl

```yaml
status: ready
blockedBy: [M7-town]
humanGate: no
owner: ""
```

- Season toggle: spring, summer, fall, winter. Changes presentation only.
- `snow-bowl` unlocks as a trip after town, not as a tile beside the dorm.
- One optional minigame there. Failure does not block quests.
- Gate: `npm run validate` plus a test that the toggle does not mutate quest state, and that the bowl is locked before town is open.

## M9-verify-facts

```yaml
status: ready
blockedBy: [M8-seasons-snowbowl]
humanGate: yes
owner: ""
```

Replace seed copy with verified facts, or delete claims you cannot source.

- Re-fetch public pages. Do not copy from memory.
- Stop when you want a real person's likeness or a live LMS. That is the human gate.
- Gate: `npm run validate`. Tests must still forbid `sourced-person`, official lessons, and unnamed likenesses while the approval files are absent.

## Meta template

Copy when a meta cycle needs an item. Id pattern `meta-NNNN-slug`. Tag `meta`. No new player-facing scope.
