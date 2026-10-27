# Backlog

Order is priority. The first `ready` item whose blockers are `done` is the only legal task. Put player-facing bugs above the current feature when you discover them. Do not mass-file GitHub issues from this list; this file is the queue.

Status values: `ready`, `doing`, `done`, `blocked`.

## M1-shell

```yaml
status: ready
blockedBy: []
humanGate: no
owner: ""
```

Playable shell with no new content.

- Vite + React app.
- Title screen: New game, Continue (disabled when no save).
- New game writes save v1 with `placeId: arrival-green` and empty notes, quests, abilities.
- Location screen shows the current place name, summary, fact statuses, NPCs present, and exit buttons.
- Choosing an exit moves if that place is unlocked. Locked exits are visible and explain why in one sentence.
- Reload restores the place.
- Headless test: start, move along an unlocked exit, reload equivalent (load/save functions), still there.
- Gate: `npm run validate` plus the new test file. If a browser is available, open the title and move once.

## M2-character

```yaml
status: ready
blockedBy: [M1-shell]
humanGate: no
owner: ""
```

Character creator before the first location.

- Fields: name, pronouns (free text with suggestions), start term `fall` or `feb`, interests (subset of the ids in content), optional flags `firstGen` and `international` defaulting off. The player opts in. Never infer them.
- Flags only select which archetype lines and quests are eligible. They do not change facts.
- Save stores the character. Continue skips the creator.
- Gate: `npm run validate` plus a test that a created character round-trips through the save.

## M3-orientation-arc

```yaml
status: ready
blockedBy: [M2-character]
humanGate: no
owner: ""
```

Dialogue and the main quest.

- Talk to NPCs at the current place. Lines come from `content/npcs.json` only.
- Quest log for `content/quests/quests.json`.
- The orientation quest already rewards `notebook`, `meal-plan`, and `ask-a-question` in data. Grant those when the arc completes. Do not invent extra rewards.
- Steps complete from real actions (enter place, talk to npc), not from a debug button.
- Headless simulation can finish the orientation arc.
- Gate: `npm run validate` plus that simulation test.

## M4-notebook

```yaml
status: ready
blockedBy: [M3-orientation-arc]
humanGate: no
owner: ""
```

Notebook tool.

- Unlock ability `notebook` when the orientation quest completes (the reward is already in the quest JSON). It is not free at start.
- Player can add a note tied to the current place or lesson.
- Notes survive reload and show in a notebook screen.
- Gate: `npm run validate` plus a save test that notes survive migration from a note-less v1 save.

## M5-abilities

```yaml
status: ready
blockedBy: [M4-notebook]
humanGate: no
owner: ""
```

Abilities and tools gate actions.

- Define the action each ability unlocks in code, data-driven from `content/abilities.json`.
- Without the ability, the action is visible and locked.
- `ask-a-question` does nothing useful until M6, but the lock state exists.
- Gate: `npm run validate` plus a test that a locked action stays locked.

## M6-classroom

```yaml
status: ready
blockedBy: [M5-abilities]
humanGate: no
owner: ""
```

Sample seminar.

- `LessonSource` bundle reader. No network.
- At `seminar-room`, start the sample lesson. Show blocks in order.
- Notes from the lesson go to the notebook.
- With `ask-a-question`, the player picks a prompt and sees the instructor response stored on that lesson. No free-form model call.
- Lesson chrome says sample, not an official Middlebury course.
- Gate: `npm run validate` plus a test that a response cannot appear unless it is on the lesson. Do not add an LLM.

## M7-sidequests

```yaml
status: ready
blockedBy: [M6-classroom]
humanGate: no
owner: ""
```

Sidequests and the activities fair.

- Interest flags from the character offer at most the sidequests already in content.
- Completing one unlocks its reward ability or place.
- An activities-fair beat lists activities without claiming a live schedule.
- Gate: `npm run validate` plus a test that an interest the player did not pick does not offer its quest.

## M8-town-outdoors

```yaml
status: ready
blockedBy: [M7-sidequests]
humanGate: no
owner: ""
```

Unlock downtown and outdoors nodes that already exist in content.

- They stay `placeholder` or `seed` in the UI.
- Do not add new real businesses or trail names unless you also add a verified fact. Prefer the existing placeholder nodes.
- Gate: `npm run validate` plus a test that those places are locked on a fresh save and open after the unlocking quest.

## M9-verify-facts

```yaml
status: ready
blockedBy: [M8-town-outdoors]
humanGate: yes
owner: ""
```

Replace seed copy with verified facts, or delete claims you cannot source.

- Every sentence the game states as true is `verified` with URL and `asOf`, or it is visibly a sample.
- Re-fetch public pages. Do not copy from memory.
- Stop when you want a named real person or a live LMS. That is the human gate.
- Gate: `npm run validate`. The content test must still forbid `sourced-person` and `official` lessons while the approval files are absent.

## Meta template

Copy this when a meta cycle needs an item. Id pattern `meta-NNNN-slug`. Tag `meta`. `blockedBy` empty. No player-facing scope.
