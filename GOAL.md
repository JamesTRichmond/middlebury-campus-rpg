# Goal

You are the continuous builder of an unofficial Middlebury College life RPG in `JamesTRichmond/middlebury-campus-rpg`. The player's character is themselves. College life is the game: arrive, live there, learn the campus and the town, and go to class as that character.

This is a portfolio piece for a full-stack developer interview at Middlebury College. Figma is a major tool on that developer team, and the connected Figma integration is already authorized. Figma is the primary tool. Use it whenever a player can see a change, and prefer it for every visual decision. Frames, components, prototypes, and accessibility modes live there. The code implements those frames. Do not invent a file URL, do not buy a plan, do not switch accounts, and do not design a screen only in code.

The game is not a college product. Do not imply endorsement. [docs/FIGMA.md](docs/FIGMA.md) is the file setup. This file is the only goal. [LOOP.md](LOOP.md) is how you pursue it without stopping between cycles. [AGENTS.md](AGENTS.md) is the boundary. If a chat instruction and this file disagree, this file wins until the operator edits it. `Middlebury-Campus-RPG-GOAL.md` and `prompts/PASTE-GOAL.md` are pointers. Do not treat them as a second goal.

You are not finished when one feature works. You are finished only when [LOOP.md](LOOP.md) hits a stop condition.

## Product

A cozy, unofficial orientation RPG in the spirit of Stardew Valley and Harvest Moon. You arrive by train, make a character who can be you, and walk a pixel-art Middlebury. Do not copy those games' assets, farming loops, or characters.

A new student can:

1. Open the game on an acceptance letter, set where they are traveling from, and ride a train into Vermont.
2. Step onto the Middlebury platform and meet a greeter. Tell them what to call you. Build a character with inclusive appearance options and accessibility options that apply from then on, including a wheelchair.
3. Walk, escorted, from the station through Triangle Park to campus and into their dorm. The map and the people on it are 16-bit to 64-bit pixel art. Talking opens a more detailed portrait.
4. Unpack a bag and put a few doodads in the room.
5. Get the orientation notice, go downstairs, and visit the dining hall, the library, and the other central campus places.
6. Go to class as that character. The instructor delivers the lesson from `LessonSource`, the same lesson as the virtual lesson for that class, not a different speech. The player takes notes, asks questions, and hears only answers that belong to that lesson. Notes are still there after they leave.
7. Unlock the town through Triangle Park: movie theater, restaurants, and other sourced or clearly sample spots.
8. Unlock farther places, including a trip to the Middlebury Snow Bowl with an optional minigame, and toggle the map across seasons.
9. Leave and come back to the same character, room, notes, lesson progress, and unlocks.

The first-session script is [docs/EXPERIENCE.md](docs/EXPERIENCE.md).

Tone: welcoming, specific, and unhurried. Not a parody and not a combat game. Missing a task keeps it open.

## Figma

Use the connected Figma integration. Do not ask first. Do not invent a file URL. Do not buy a plan or switch accounts.

Use Figma whenever possible, and always when the player can see the change:

- A new screen, a changed layout, a new component, a new state, a new accessibility mode, a new season look, a new portrait, or a new sprite is a Figma change first.
- A control used twice becomes a component.
- Accessibility modes are Figma modes of the same components, not a second design.
- A logic-only fix with no visible difference may say "no frame change." Anything else updates the frame in the same cycle, records the URL the tool returned, and makes the build match.
- If the integration fails, write `gates/PENDING-figma.md`, set `stop: human-gate`, and stop. Do not design the screen only in code and backfill Figma later.

One file: `Middlebury Campus RPG (unofficial)`. Pages: Cover, Foundations, Components, Flows, Handoff. Details are in [docs/FIGMA.md](docs/FIGMA.md). Keep the cozy 16-bit to 64-bit look. Figma is not permission to restyle this as a generic web app. No college logos, crests, athletic marks, or real people's photos in the file.

The first backlog item is `M0-figma-file`. Do not start the letter until that file exists.

## Figma design

The file is not done when the pages exist. This section is what those frames have to show. [docs/FIGMA.md](docs/FIGMA.md) is how the file is organized. If a layout here and a frame disagree, change the frame.

### Grid

- Design the overworld on an integer pixel grid. A logical view of 480×270, shown at whole-number scale so pixels stay square. Do not use a blurry non-integer zoom as the source.
- Design the letter, creator, dialogue, notebook, and lesson panel as UI frames too: one desktop frame (1280×720) and one phone frame. Same components, not a second design.
- Seasons are modes of the same map: fall, winter, spring, summer. Do not draw four unrelated maps.

### Color and type

- The palette is original. It is not Middlebury's brand book and not a copy of another game's UI.
- Record the hex values on the Foundations page once, and use those variables in every frame. Code uses the same values. Do not pick a new accent in a component.
- UI sits on a warm paper field. Map greens, stone, and snow are tile colors. Text on paper and text on the map both meet contrast in the default mode and in high contrast.
- One pixel-readable face for the world and dialogue. Do not set body text in a font so thin it breaks at phone size.

### Components

Draw these as components, with the states named:

| Component | States |
| --- | --- |
| Button | default, hover, focus, disabled |
| Text field | empty, filled, focus, error |
| Letter | unofficial label, body, origin field, continue |
| Dialogue | nameplate, portrait slot, body, choices |
| Notice | the orientation "meet downstairs" line |
| Map HUD | place name, season, open-task hint |
| Notebook | page, saved lines, close |
| Lesson panel | lesson title, teacher text, notes, ask box |
| Character preview | standing sprite and wheelchair sprite, same footprint |

A portrait is a separate component from the map sprite. The portrait is the detailed bust. The sprite is the small figure on the map. Do not reuse one image for both.

### Frames

Each demo is a real layout, not a labeled empty frame. Draw the frame before the matching code.

1. **Letter.** Unofficial acceptance, origin field, continue. Focus order annotated.
2. **Train.** Window or first-person view, a caption that the ride ends at Middlebury station, then the platform.
3. **Character.** Name, pronouns as free text, appearance, accessibility options, and a preview that can switch to the wheelchair sprite.
4. **Escort map.** Station, Triangle Park, campus, dorm. Player and greeter on the grid. Walking and wheelchair versions of the player. Dialogue open over the map in a second state of the same frame.
5. **Dorm.** A few doodad slots and the orientation notice. The notice does not start the tour by itself.
6. **Campus.** Dining and library as places you walk to. Portrait dialogue open.
7. **Class.** The player's character is in the room. The teacher portrait and the lesson text are the virtual lesson, with a notes column and an ask box. Annotate the lesson id the panel reads.
8. **Town.** Triangle Park as the door to town. Theater and food as sample, labeled sample.
9. **Seasons and Snow Bowl.** The season control on the same map, plus the optional trip and one minigame frame. Skipping or failing the minigame is a visible path, not a locked door.

### Accessibility modes

On the letter, the dialogue, and the map, show these as Figma modes of the same components:

- default
- high contrast
- larger UI
- a colorblind palette

Annotate focus order on the letter and the character creator. Captions are a component on the dialogue, on by default. The wheelchair sprite has idle and a step, facing four directions, on the same cell size as the walking sprite.

### Prototype

The Cover page links a prototype that plays letter, origin, train, and platform with no dead end. Later demos add their frames to that chain. The Handoff page names, for each shipped frame, the content id it reads and any difference from the build.

## Opening

Each of these screens is a Figma frame before it is code.

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

## Out of scope until a human gate

- Official affiliation, college logos, or scraped photography.
- A named real person's likeness, headshot, or dialogue, including the college president. The greeter is an archetype until `gates/likeness.approved` says otherwise.
- PantherNet, Canvas, SSO, or any live college login. The lesson connection is in scope now: the teacher speaks the lesson object, and a bundled lesson is the first virtual lesson. A live LMS adapter waits on `gates/live-lms.approved`.
- Accounts, a backend database, or storing anyone's real student record.

## What "good" means

- The first ten minutes feel like arriving: letter, train, name, walk, dorm.
- A wheelchair path exists for that same arrival.
- A stranger can finish campus orientation and then find town and the Snow Bowl on the map.
- The season toggle changes the map without changing quest state.
- Removing a shipped feature fails a test.
- Facts stated as true are `verified`, with a source URL and `asOf`. The Triangle Park "campus boundary" line is labeled as the game's framing.
- The in-game class and the virtual lesson are the same content. A question cannot be answered with text that is not on that lesson.
- Each demo gate in [docs/DEMOS.md](docs/DEMOS.md) has a Figma prototype and a build a person can play. The build opens [feedback/index.html](feedback/index.html) with its demo id and version. A player-visible change with no frame is not done.
- Phone and laptop both work once UI exists.
- Meta cycles make the next cycles faster and stricter. They do not add attractions.

## Facts and people

Facts you state as true need status `verified`, a source URL, and an `asOf` date. Seed and placeholder copy must look unconfirmed. NPCs are archetypes until a likeness or people gate names them. Do not treat "the college uses Figma" as a fact inside the game.

## Architecture and craft

These rules come from the architecture studio and the RPG master directive. Only the parts that fit this game are in force. They do not replace this file, [LOOP.md](LOOP.md), or [DECISIONS.md](DECISIONS.md). If one of those documents is stricter, it wins.

Not in force, because they conflict with this project or do not apply:

- A discovery questionnaire, two answer rounds, or any wait for new product decisions before building. The decisions already in [DECISIONS.md](DECISIONS.md) are accepted. Do not ask the operator to re-pick them.
- A specialist roster, store submission, age ratings, voice-over, or a live-service team.
- Combat, builds, loot, crafting, an economy, farming, or a 3D engine.
- Spending money, new accounts, or shipping this as a Middlebury product.
- Holding a demo for three art passes. Revisit what the player touches every session on meta cycles, and immediately when feedback says it got worse.

### Pillars

A feature serves one of these, or it waits:

1. The first minutes feel like arriving.
2. The player can be themselves, including how they move and how they read the screen.
3. Campus and town are specific and walkable.
4. Class is the virtual lesson, not a speech about class.
5. The game stays cozy, unofficial, and honest about what it knows.

### Claims

Tag a material claim. Do not report done what you did not run.

| Tag | Means |
| --- | --- |
| verified | You checked a source. Content facts use status `verified`, a URL, and `asOf`. |
| observed | You ran it in this checkout: a test, the typecheck, or the play path. |
| reported | A document, a tool, or a person said it. Not the same as observed. |
| accepted | A decision in [DECISIONS.md](DECISIONS.md). |
| proposal | Not accepted. Do not build it on the current item. |
| assumption | Stated, and safe to proceed. Revisit if play contradicts it. |
| unknown | You could not check. Say unknown. |

Seed and placeholder copy stays visibly unconfirmed.

### Who owns state

| State | Authority |
| --- | --- |
| Places, people, quests, lessons | `content/`, checked by the schema |
| What the teacher may say | `LessonSource` for that lesson id only |
| Character, room, notes, unlocks, season | A versioned save in `localStorage` |
| What the screen looks like | The Figma frame, then the build that matches it |
| A real person's likeness | `gates/likeness.approved`, or the person is an archetype |

The browser is the whole runtime. There is no server and no account. A door that exists only in the UI is a bug.

### When it fails

- A missing content id is shown as missing. Do not invent a place or a line.
- A question is not answered with text that is not on that lesson.
- A save that fails validation is not applied. Keep the previous good save. Tell the player the load failed. Do not drop notes silently.
- The season toggle does not change quests, notes, or unlocks.
- Failing or skipping the minigame does not close the story. An open task stays open.
- Offline is normal. A bundled lesson does not need a network.
- If Figma is unreachable, stop on the human gate. Do not draw the screen only in code.

### Craft

- The path has to be understandable before you decorate it. The frame still comes first.
- Movement, dialogue, and the lesson panel are what the player touches constantly. A repeated fault there becomes a regression test, not a new area.
- Keyboard focus never dead-ends on the letter, the creator, or the lesson panel. Captions are on. Color is never the only cue.
- Walking should feel immediate. Do not hitch the walk to load a portrait.
- Generated or imported art records its source and that it is original. No unclear license. No college marks. No secrets in the repo.
- A player-visible promise in this file maps to a content id, a frame, and a test before that demo is called done.

These rules are the architecture. When a cycle changes a boundary, add a decision. Do not open a second architecture document that can disagree with this file.

## Read every session, in order

1. [AGENTS.md](AGENTS.md)
2. This file
3. [LOOP.md](LOOP.md)
4. [STATUS.md](STATUS.md)
5. [BACKLOG.md](BACKLOG.md)
6. [DECISIONS.md](DECISIONS.md)
7. [docs/FIGMA.md](docs/FIGMA.md)
8. [docs/EXPERIENCE.md](docs/EXPERIENCE.md)
9. [docs/DEMOS.md](docs/DEMOS.md)
10. [docs/LESSON_BRIDGE.md](docs/LESSON_BRIDGE.md)
11. [skills/skillgame-feedback/SKILL.md](skills/skillgame-feedback/SKILL.md)
12. The newest file in [cycles/](cycles/)
13. Unprocessed files in [feedback/inbox/](feedback/inbox/), if any.

Then execute [LOOP.md](LOOP.md). Do not ask whether to continue. A pasted playtest report becomes the next cycle: file regressions first, then resume the backlog. Do not sit idle waiting for players. Do not skip shipping the demo.

## Plan the loop is driving

Work in this order. Details and gates live in [BACKLOG.md](BACKLOG.md). Do not reorder except to put a player-facing bug ahead of new scope.

| Phase | Outcome |
| --- | --- |
| 0 | Environment, schemas, seed content. Landed. Next is the Figma file, then the letter. |
| 1 | Acceptance letter, home place, train ride into the station. Frames first. |
| 2 | Character creator on the platform: name, pronouns, inclusive appearance, accessibility. |
| 3 | Pixel-map escort: station, Triangle Park, campus, dorm. |
| 4 | Unpack and dorm doodads, then the orientation notice. |
| 5 | Campus objectives: dining, library, central places. Portrait dialogue. |
| 6 | Class: the instructor delivers the virtual lesson. Notes and questions use only that lesson. |
| 7 | Town opens at Triangle Park. Theater and restaurants as sample or sourced places. |
| 8 | Season toggle, Snow Bowl trip, one optional minigame. |
| 9 | Verified-fact pass. Human gate for real likenesses and a live LMS. |
| Demo | After phases 1–8, a Figma prototype, a playable build, and the feedback form bound to that version. See DEMOS.md. |
| Meta | Every fifth done product cycle, and whenever playtest feedback shows drift. See LOOP.md. |

Phase 9 never ends the loop by itself. After it, file the next concrete improvement from play, or stop on `backlog-empty`.

## Work continuously

After each of phases 1–8 (backlog M1 through M8), the same cycle must leave:

- A Figma prototype whose URL came from the integration
- A build a person can play
- A link to `feedback/index.html?demo=<demo id>&version=<git sha>`

Demo ids are in [docs/DEMOS.md](docs/DEMOS.md), `D1-letter-train` through `D8-snow`. Record the real open path. Never invent a public URL. Play the new path once, compare it to the frame, and write what you did. Then start the next cycle. Do not wait idle for players.

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

## Improvement obligation

Keep going. One backlog item, then the next, in the same session, until a stop condition in LOOP.md.

Every meta cycle, and every cycle that ingests playtest feedback, fix the process and the drift, not the fantasy:

- Read the pasted feedback and any earlier submission included in it. File regressions and "got worse" items at the head of the backlog. File "got better" only as a one-line note in the cycle report.
- A bug class that appeared twice gets a regression test.
- A demo that drifted from its Figma frame, from EXPERIENCE.md, or from the lesson (the teacher said something the virtual lesson does not say) is repaired before any new place is added.
- If a cycle was too big to review, split the next items until each is one behavior.
- Do not rebuild the feedback form from scratch. Extend it under the skill rules.

Do not expand into a new campus, a second school, multiplayer, or combat during a meta cycle. Do not add a farming economy to chase the cozy reference.

## Meta and gates

Every fifth product cycle is a meta cycle: tighten tests and fix repeated failures or content drift. Do not add attractions during a meta cycle.

`npm run validate` must pass before a cycle is done. A gate you did not run is a failure. Three failures on the same item and you stop. Human gates stop you. Do not create the approval files yourself.

## What you are improving toward

College life at Middlebury, as an RPG: arrive, live in the dorm, learn the campus and the town, and go to class as yourself. The class is not a cutscene that approximates school. It is the virtual lesson, delivered by the teacher, with notes and questions. The interview artifact is the Figma file plus a build that matches it. Demos are how players check that this stayed true from one version to the next.

## Start

Run `npm run validate`. If it passes, begin `M0-figma-file`. Then `M1-letter-train` and its demo `D1-letter-train`.
