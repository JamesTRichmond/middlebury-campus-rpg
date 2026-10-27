# Goal

You are the continuous builder of an unofficial Middlebury College life RPG in `JamesTRichmond/middlebury-campus-rpg`. The player's character is themselves. College life is the game: arrive, live there, learn the campus and the town, and go to class as that character.

This is a portfolio piece for a full-stack developer interview at Middlebury College. Figma is a major tool on that developer team, and it is already connected. Figma is the primary tool. Design frames, components, prototypes, and accessibility modes there. Then implement them. The interview artifact is the Figma file plus a build that matches it. The game is not a college product.

This file is the goal to give the agent. In the repo, `GOAL.md` is the copy the agent re-reads. If this file and `GOAL.md` disagree, `GOAL.md` wins until the operator edits it.

## Every session

Read, in order:

1. `AGENTS.md`
2. `GOAL.md`
3. `LOOP.md`
4. `STATUS.md`
5. `BACKLOG.md`
6. `DECISIONS.md`
7. `docs/FIGMA.md`
8. `docs/EXPERIENCE.md`
9. `docs/DEMOS.md`
10. `docs/LESSON_BRIDGE.md`
11. `skills/skillgame-feedback/SKILL.md`
12. The newest file in `cycles/`
13. Anything in `feedback/inbox/`

Then execute `LOOP.md` until a stop condition. Do not ask whether to continue between cycles. One backlog item per cycle. If the operator pastes a playtest report, that report is the next cycle: file regressions before new features, then resume.

## Figma

Use the connected Figma integration. Do not ask first. Do not invent a file URL. Do not buy a plan or switch accounts.

- One file: `Middlebury Campus RPG (unofficial)`.
- Pages: Cover, Foundations, Components, Flows, Handoff. Details are in `docs/FIGMA.md`.
- Foundations: integer pixel grid, type, color, and modes for default, high contrast, larger UI, and colorblind palettes. Wheelchair is a sprite and a path.
- A control used twice becomes a component.
- Flows: one prototype per demo, `D1-letter-train` through `D8-snow`.
- Keep the cozy 16-bit to 64-bit look. Figma is not permission to restyle this as a generic web app.
- No college logos, crests, athletic marks, or real people's photos in the file.

If the player can see a change, update the frame before the item is done, record the URL the tool returned, and make the build match. If the integration fails, write `gates/PENDING-figma.md`, set `stop: human-gate`, and stop. Do not design the screen only in code.

The first backlog item is `M0-figma-file`. Do not start the letter until that file exists.

## Figma design

The file is not done when the pages exist. Draw these layouts. If a frame and this section disagree, change the frame.

### Grid

- Overworld on an integer pixel grid. Logical view 480×270, shown at whole-number scale so pixels stay square.
- Letter, creator, dialogue, notebook, and lesson panel: one desktop frame (1280×720) and one phone frame. Same components.
- Seasons are modes of the same map: fall, winter, spring, summer. Not four unrelated maps.

### Color and type

- Original palette. Not Middlebury's brand book and not another game's UI.
- Record the hex values once on Foundations and use those variables everywhere, including code.
- Warm paper for UI. Map greens, stone, and snow are tile colors. Text meets contrast in default and high contrast.
- One pixel-readable face for the world and dialogue.

### Components and states

- Button: default, hover, focus, disabled
- Text field: empty, filled, focus, error
- Letter: unofficial label, body, origin field, continue
- Dialogue: nameplate, portrait slot, body, choices
- Notice: the orientation line
- Map HUD: place name, season, open-task hint
- Notebook: page, saved lines, close
- Lesson panel: title, teacher text, notes, ask box
- Character preview: standing sprite and wheelchair sprite, same footprint

The portrait is the detailed bust. The map sprite is the small figure. Do not reuse one image for both.

### Frames

1. **Letter.** Unofficial acceptance, origin, continue. Focus order annotated.
2. **Train.** Window or first-person view, caption that the ride ends at Middlebury station, then the platform.
3. **Character.** Name, free-text pronouns, appearance, accessibility, preview that switches to the wheelchair sprite.
4. **Escort map.** Station, Triangle Park, campus, dorm. Player and greeter on the grid. Walking and wheelchair versions. A second state with dialogue open over the map.
5. **Dorm.** Doodad slots and the orientation notice. The notice does not start the tour by itself.
6. **Campus.** Dining and library as places you walk to. Portrait dialogue open.
7. **Class.** The character is in the room. Teacher portrait and lesson text are the virtual lesson, with notes and an ask box. Annotate the lesson id.
8. **Town.** Triangle Park as the door. Theater and food labeled sample.
9. **Seasons and Snow Bowl.** Season control on the same map, the trip, and one minigame. Skipping or failing it is a visible path.

### Accessibility modes

On the letter, the dialogue, and the map, show default, high contrast, larger UI, and a colorblind palette as modes of the same components. Annotate focus order on the letter and the creator. Captions are on by default. The wheelchair sprite has idle and a step, four directions, same cell size as the walking sprite.

### Prototype

Cover links a prototype that plays letter, origin, train, and platform with no dead end. Later demos extend that chain. Handoff names the content id each shipped frame reads, and any difference from the build.

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

Each of those screens is a Figma frame before it is code.

## Facts and people

Facts you state as true need status `verified`, a source URL, and an `asOf` date. Seed and placeholder copy must look unconfirmed. NPCs are archetypes until a likeness or people gate names them. Do not treat "the college uses Figma" as a fact inside the game.

## Work continuously

After each of phases 1–8 (backlog M1 through M8), the same cycle must leave:

- A Figma prototype whose URL came from the integration
- A build a person can play
- A link to `feedback/index.html?demo=<demo id>&version=<git sha>`

Demo ids are in `docs/DEMOS.md`, `D1-letter-train` through `D8-snow`. Record the real open path. Never invent a public URL. Play the new path once, compare it to the frame, and write what you did. Then start the next cycle. Do not wait idle for players.

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

Run `npm run validate`. If it passes, begin `M0-figma-file`. Then `M1-letter-train` and its demo `D1-letter-train`.
