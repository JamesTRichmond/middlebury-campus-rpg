# Goal

Build an unofficial, playable RPG that orients a new student to Middlebury College. The player's character is themselves. The feel is a cozy life game: a train into town, a pixel-art map, portraits when people talk, and a dorm you can fuss over.

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
6. Unlock the town through Triangle Park: movie theater, restaurants, and other sourced or clearly sample spots.
7. Unlock farther places, including a trip to the Middlebury Snow Bowl with an optional minigame, and toggle the map across seasons.
8. Take notes and, in a sample class, ask questions the instructor answers from that lesson.
9. Leave and come back to the same character, room, notes, and unlocks.

The first-session script is [docs/EXPERIENCE.md](docs/EXPERIENCE.md).

Tone: welcoming, specific, and unhurried. Not a parody and not a combat game. Missing a task keeps it open.

## Out of scope until a human gate

- Official affiliation, college logos, or scraped photography.
- A named real person's likeness, headshot, or dialogue, including the college president. The greeter is an archetype until `gates/likeness.approved` says otherwise.
- PantherNet, Canvas, SSO, or any live virtual-learning connection. Lessons stay behind `LessonSource` until `gates/live-lms.approved` exists.
- Accounts, a backend database, or storing anyone's real student record.

## What "good" means

- The first ten minutes feel like arriving: letter, train, name, walk, dorm.
- A wheelchair path exists for that same arrival.
- A stranger can finish campus orientation and then find town and the Snow Bowl on the map.
- The season toggle changes the map without changing quest state.
- Removing a shipped feature fails a test.
- Facts stated as true are `verified`, with a source URL and `asOf`. The Triangle Park "campus boundary" line is labeled as the game's framing.
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
8. The doc linked by the backlog item you are about to touch. For anything about the opening, that doc is [docs/EXPERIENCE.md](docs/EXPERIENCE.md).

Then execute the loop. Do not ask whether to continue.

## Plan the loop is driving

Work in this order. Details and gates live in [BACKLOG.md](BACKLOG.md). Do not reorder except to put a player-facing bug ahead of new scope.

| Phase | Outcome |
| --- | --- |
| 0 | Environment, schemas, seed content. Landed. Style brief landed as D009–D016. |
| 1 | Acceptance letter, home place, train ride into the station. |
| 2 | Character creator on the platform: name, pronouns, inclusive appearance, accessibility. |
| 3 | Pixel-map escort: station, Triangle Park, campus, dorm. |
| 4 | Unpack and dorm doodads, then the orientation notice. |
| 5 | Campus objectives: dining, library, central places. Portrait dialogue. |
| 6 | Notebook, abilities, sample seminar. |
| 7 | Town opens at Triangle Park. Theater and restaurants as sample or sourced places. |
| 8 | Season toggle, Snow Bowl trip, one optional minigame. |
| 9 | Verified-fact pass. Human gate for real likenesses and live lessons. |
| Meta | Every fifth done product cycle. See LOOP.md. |

Phase 9 never ends the loop by itself. After it, file the next concrete improvement from play, or stop on `backlog-empty`.

## Improvement obligation

Every meta cycle, read the last five cycle reports and fix the process, not the fantasy:

- A bug class that appeared twice gets a regression test and a backlog item at the head.
- A gate that was skipped gets added to the item template.
- Content that drifted from [docs/CONTENT_POLICY.md](docs/CONTENT_POLICY.md) is repaired before any new place is added.
- If a cycle was too big to review, split the next items until each is one behavior.

Do not expand into a new campus, a second school, multiplayer, or combat during a meta cycle. Do not add a farming economy to chase the cozy reference.
