# Goal

Build an unofficial, playable RPG that orients a new student to Middlebury College, and design it in Figma first. The player's character is themselves. The feel is a cozy life game: a train into town, a pixel-art map, portraits when people talk, and a dorm you can fuss over.

This project is a portfolio piece for a full-stack developer interview at Middlebury College. Figma is a major tool on that developer team, and it is already connected. Figma is the primary tool. Frames, components, prototypes, and accessibility modes live there. The code implements those frames. Using that connected integration is authorized. Do not invent a file URL, do not buy a plan, and do not design a screen only in code.

The game is not a college product. Do not imply endorsement. [docs/FIGMA.md](docs/FIGMA.md) is the file setup.

This file is the goal. [LOOP.md](LOOP.md) is how you pursue it without stopping between cycles. [AGENTS.md](AGENTS.md) is the boundary. If a chat instruction and this file disagree, this file wins until the operator edits it.

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

Each demo is a real layout, not a labeled empty frame.

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

## Read every session, in order

1. [AGENTS.md](AGENTS.md)
2. This file
3. [LOOP.md](LOOP.md)
4. [STATUS.md](STATUS.md)
5. [BACKLOG.md](BACKLOG.md)
6. [DECISIONS.md](DECISIONS.md)
7. The newest file in [cycles/](cycles/)
8. The doc linked by the backlog item you are about to touch. For the opening, [docs/EXPERIENCE.md](docs/EXPERIENCE.md). For a demo or playtest, [docs/DEMOS.md](docs/DEMOS.md) and [skills/skillgame-feedback/SKILL.md](skills/skillgame-feedback/SKILL.md). For anything the player sees, [docs/FIGMA.md](docs/FIGMA.md).
9. Unprocessed files in [feedback/inbox/](feedback/inbox/), if any.

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

## Improvement obligation

Keep going. One backlog item, then the next, in the same session, until a stop condition in LOOP.md.

Every meta cycle, and every cycle that ingests playtest feedback, fix the process and the drift, not the fantasy:

- Read the pasted feedback and any earlier submission included in it. File regressions and "got worse" items at the head of the backlog. File "got better" only as a one-line note in the cycle report.
- A bug class that appeared twice gets a regression test.
- A demo that drifted from its Figma frame, from EXPERIENCE.md, or from the lesson (the teacher said something the virtual lesson does not say) is repaired before any new place is added.
- If a cycle was too big to review, split the next items until each is one behavior.
- Do not rebuild the feedback form from scratch. Extend it under the skill rules.

Do not expand into a new campus, a second school, multiplayer, or combat during a meta cycle. Do not add a farming economy to chase the cozy reference.

## What you are improving toward

College life at Middlebury, as an RPG: arrive, live in the dorm, learn the campus and the town, and go to class as yourself. The class is not a cutscene that approximates school. It is the virtual lesson, delivered by the teacher, with notes and questions. The interview artifact is the Figma file plus a build that matches it. Demos are how players check that this stayed true from one version to the next.
