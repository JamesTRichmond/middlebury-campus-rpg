# Goal

You are the continuous builder of an unofficial Middlebury College life RPG in `JamesTRichmond/middlebury-campus-rpg`. The player's character is themselves. College life is the game: arrive, live there, learn the campus and the town, and go to class as that character.

This file is the goal to give the agent. In the repo, `GOAL.md` is the copy the agent re-reads. If this file and `GOAL.md` disagree, `GOAL.md` wins until the operator edits it.

## Every session

Read, in order:

1. `AGENTS.md`
2. `GOAL.md`
3. `LOOP.md`
4. `STATUS.md`
5. `BACKLOG.md`
6. `DECISIONS.md`
7. `docs/EXPERIENCE.md`
8. `docs/DEMOS.md`
9. `docs/LESSON_BRIDGE.md`
10. `skills/skillgame-feedback/SKILL.md`
11. The newest file in `cycles/`
12. Anything in `feedback/inbox/`

Then execute `LOOP.md` until a stop condition. Do not ask whether to continue between cycles. One backlog item per cycle. If the operator pastes a playtest report, that report is the next cycle: file regressions before new features, then resume.

## Feel

Cozy pixel art in a 16-bit to 64-bit range, in the spirit of Stardew Valley and Harvest Moon, not a copy of either. Map sprites stay small. Dialogue opens a more detailed portrait. Seasons are a toggle on the same map.

Do not add:

- Combat
- A farming economy
- College logos
- Scraped photos

## Opening

1. An acceptance letter that is clearly unofficial. The player sets where they are traveling from. That choice only changes the trip.
2. A short train ride into Vermont, first person or a window view, ending at Middlebury station (Amtrak MBY, 30 Middle Seymour Street).
3. A greeter on the platform asks what to call you. This is not the real president and not a named college officer unless `gates/likeness.approved` says so. Control becomes third person.
4. Character creation: name, pronouns as free text, a wide range of skin tones, hair including textured and protective styles, facial hair, cultural or religious head coverings, and body variety. Accessibility applies from this moment and can be changed later: wheelchair as a real sprite and a real path, captions, visual sound cues, colorblind palettes, high contrast, larger UI, screen-reader names. The escorted walk must be completable in a wheelchair. Do not diagnose anyone.
5. The greeter walks you through town, across Triangle Park, onto campus, and to your dorm. Triangle Park is a real downtown plaza by the rail tunnel. Using it as the campus door is the game's framing, not an official boundary. The station is about a mile from campus. Do not claim otherwise.
6. Unpack a few brought items and place doodads. Then an orientation notice sends you downstairs.
7. Campus objectives: dining, library, and the other central places already in `content/`. Portrait dialogue. Tasks do not expire.
8. Class: you enter the classroom as your character. The teacher delivers the virtual lesson for that class — the same lesson object from `LessonSource`, not a different speech. You take notes and ask questions. Answers come only from that lesson. Notes persist after you leave. A bundled sample is the first virtual lesson and must be labeled sample. A live LMS or college login waits on `gates/live-lms.approved`.
9. After campus objectives, Triangle Park opens the town: movie theater and restaurants as sample places until sourced. Do not invent business names.
10. Later, a season toggle and a trip to the Middlebury Snow Bowl (east on Route 125, not next to the dorm) with one optional minigame. Failure does not block the story.

## Facts and people

Facts you state as true need status `verified`, a source URL, and an `asOf` date. Seed and placeholder copy must look unconfirmed. NPCs are archetypes until a likeness or people gate names them.

## Work continuously

After each of phases 1–8 (backlog M1 through M8), the same cycle must leave a build a person can play and point it at:

`feedback/index.html?demo=<demo id>&version=<git sha>`

Demo ids are in `docs/DEMOS.md`, `D1-letter-train` through `D8-snow`. Record the real open path. Never invent a public URL. Play the new path once and write what you did. Then start the next cycle. Do not wait idle for players.

## Playtest form

The playtest form is already built. Use it. Do not replace it.

- One question per card
- Radios, limited checkboxes, move-up/down ranking, and a matrix
- Back, Next, Skip, unanswered jump, and a review screen
- Every question has "Add context or write your own answer"
- `localStorage` in try/catch
- On Confirm & Submit, copy Markdown that includes this report and any earlier submission from that browser, plus what changed
- Then offer Copy again, Download .md, and Back to Review

When a report is pasted, save it under `feedback/inbox/` and treat "worse" or "the class does not match the lesson" as a blocker ahead of new scope.

## Meta and gates

Every fifth product cycle is a meta cycle: tighten tests and fix repeated failures or content drift. Do not add attractions during a meta cycle.

`npm run validate` must pass before a cycle is done. A gate you did not run is a failure. Three failures on the same item and you stop. Human gates stop you. Do not create the approval files yourself.

## Start

Run `npm run validate`. If it passes, begin `M1-letter-train` and its demo `D1-letter-train`.
