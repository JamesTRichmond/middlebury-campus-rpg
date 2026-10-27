# Goal

Build an unofficial, playable RPG that orients a new student to Middlebury College: the campus, the people who work there, the surrounding town, and the feeling of going to class. The player's character is themselves. College life is the game.

This file is the goal. [LOOP.md](LOOP.md) is how you pursue it without stopping between cycles. [AGENTS.md](AGENTS.md) is the boundary. If a chat instruction and this file disagree, this file wins until the operator edits it.

You are not finished when one feature works. You are finished only when [LOOP.md](LOOP.md) hits a stop condition.

## Product

A new student can:

1. Create a character of themselves (name, pronouns, fall or Feb start, interests, and optional first-gen or international orientation paths they choose). No account. No college login.
2. Move through campus as a graph of real places, talk to staff and faculty, and learn campus facts that are sourced or clearly marked as sample.
3. Complete an orientation task arc.
4. Unlock abilities and tools that change what the character can do (notebook, better questions, map sense, meal-plan sense, town access, trail access).
5. Take sidequests tied to interests and activities.
6. Unlock new areas: downtown Middlebury, outdoors, and activity sites, only after the fiction earns them.
7. Enter their classroom. The instructor delivers the lesson attached to that class. The player takes notes and asks questions. Answers come from that lesson, not from invented faculty biography.
8. Leave and return to the same character, notes, quests, and unlocks.

Tone: welcoming, specific, and useful. Not a parody of the college and not a combat game. Knowledge, confidence, and campus literacy are the progression. Missing a task keeps it open. Nothing expels the player.

## Out of scope until a human gate

- Official affiliation, college logos, or scraped photography of people.
- A named real professor, staff member, or student, including invented quotations.
- PantherNet, Canvas, SSO, or any live virtual-learning connection. The lesson bridge stays behind `LessonSource` and bundled sample lessons until `gates/live-lms.approved` exists.
- Accounts, a backend database, or storing anyone's real student record.
- A free-roam tile engine. v1 is a location graph. See [DECISIONS.md](DECISIONS.md).

## What "good" means

- A stranger who has never been to Middlebury can finish the orientation arc and say where to eat, where first-years live, who to ask for help, and how a seminar room works.
- Removing a shipped feature fails a test.
- Every campus fact shown as true has `status: "verified"`, a source URL, and an `asOf` date. Seed and placeholder copy is labeled in the UI.
- The arrival arc is completable in a headless simulation, not only by clicking.
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
8. The doc linked by the backlog item you are about to touch

Then execute the loop. Do not ask whether to continue.

## Plan the loop is driving

Work in this order. Details and gates live in [BACKLOG.md](BACKLOG.md). Do not reorder except to put a player-facing bug ahead of new scope.

| Phase | Outcome |
| --- | --- |
| 0 | This environment: schemas, seed content, integrity tests. Already landed. |
| 1 | Playable shell: title, new game, save, location screen, movement along exits. |
| 2 | Character creator written into the save. |
| 3 | Dialogue with archetypes and a quest log. Orientation arc completable. |
| 4 | Notebook tool and notes that persist. |
| 5 | Abilities and tools that gate actions. |
| 6 | Sample classroom: lesson panel, notes, questions answered from the lesson. |
| 7 | Sidequests from interests. Activities fair. |
| 8 | Town and outdoors unlocks, still placeholder until sourced. |
| 9 | Content pass: replace seed copy only with verified facts. Human gate for real people and live lessons. |
| Meta | Every fifth done product cycle. See LOOP.md. |

Phase 9 never ends the loop by itself. After it, file the next concrete improvement from play, or stop on `backlog-empty`.

## Improvement obligation

Every meta cycle, read the last five cycle reports and fix the process, not the fantasy:

- A bug class that appeared twice gets a regression test and a backlog item at the head.
- A gate that was skipped gets added to the item template.
- Content that drifted from [docs/CONTENT_POLICY.md](docs/CONTENT_POLICY.md) is repaired before any new place is added.
- If a cycle was too big to review, split the next items until each is one behavior.

Do not expand into a new campus, a second school, multiplayer, or combat during a meta cycle.
