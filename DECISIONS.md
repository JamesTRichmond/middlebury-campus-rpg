# Decisions

Accepted at bootstrap by the operator request that created this repo (2026-10-27). Supersede by adding a new decision. Do not rewrite history.

## D001 — Web TypeScript app, no accounts

v1 is a Vite + React + TypeScript client. Persistence is versioned `localStorage`. No login, no database, no student-data server. Node `>=20`. Package manager is npm. Commit the lockfile when dependencies change.

## D002 — Location data before a second hard-coded map

Superseded in part by D009. The campus is still places and exits in `content/places.json`. Do not keep a second list of doors in the UI. The rejected part is the old plan to ship exit-buttons as the final way you travel. That is no longer the player-facing game.

## D009 — Cozy pixel overworld

Accepted 2026-10-27 from the operator's style brief. The player-facing world is a top-down pixel map in a 16-bit to 64-bit cozy range, in the spirit of Stardew Valley and Harvest Moon, not a clone of either. Map sprites stay small. Dialogue opens a portrait that is more detailed than the sprite. Seasons are a toggle on the same tiles. Scene order is [docs/EXPERIENCE.md](docs/EXPERIENCE.md).

## D010 — Opening is the letter, the train, then third person

First boot: acceptance letter (marked unofficial), the player sets where they are traveling from, a short first-person or window-view train ride into Vermont, arrival at Middlebury station, then third-person control. The greeter's "what should I call you?" opens character creation. Do not start the player on a menu of campus exits.

## D011 — Accessibility is part of the character

Chosen on the platform and applied immediately, and editable later: mobility including a wheelchair that changes sprite and pathing, captions for everyone, visual sound cues, colorblind palettes, high contrast, larger UI, and screen-reader names on controls. The escorted walk to the dorm is completable with the wheelchair option. These are player settings, not a diagnosis.

## D012 — Inclusive character art

The builder offers a wide range of skin tones, hair including textured and protective styles, facial hair, and cultural or religious head coverings. No default body is treated as neutral by omission.

## D013 — Likeness gate

Staff and students can eventually have either an approved real headshot or an original portrait drawn as that person. Until `gates/likeness.approved` names them, NPCs stay original archetypes. Do not depict President Ian Baucom, or any other real official, and do not scrape directory photos. The station greeter is the slot the operator may later point at a recognizable college figure.

## D014 — Triangle Park is the town door in fiction

After campus objectives, town places open from Triangle Park. Sourced geography: Triangle Park is the plaza by the downtown rail tunnel, and the station is about a mile from campus. The "campus boundary" reading is the game's framing, not a verified official line. Say so in the UI if you mention it.

## D015 — Snow Bowl is a trip and a minigame

Middlebury Snow Bowl unlocks after town, as a peripheral trip, not a tile next to the dorm. The visit can contain one optional cozy minigame. Failing it does not close the story. Confirm current trail counts before stating them; the walking-history page is not a live conditions report.

## D016 — Dorm is yours before orientation starts

After the escort, the player unpacks a few brought items and places doodads. Then a notice sends them downstairs to start the campus objectives. Cosmetics save with the character.


## D017 — Demos and the skillgame feedback form

Accepted 2026-10-27. Each phase from letter through Snow Bowl ships a playable demo and links [feedback/index.html](feedback/index.html) with `demo` and `version`. The form is the playtest instrument: one question per card, localStorage, clipboard Markdown, and earlier submissions from that browser included so drift is visible. Agents keep building after a demo. Pasted feedback outranks new features. Do not swap in another survey. Changes to the form follow [skills/skillgame-feedback/SKILL.md](skills/skillgame-feedback/SKILL.md).

## D018 — Figma is the primary tool

Accepted 2026-10-27. This repo is an unofficial portfolio piece for a full-stack interview at Middlebury College, where Figma is a major tool on the developer team. The connected Figma integration is the design source. Player-visible work is framed there before it is called done. Code implements the frames. Pixel art stays pixel art. The file URL must come from the integration. Setup is [docs/FIGMA.md](docs/FIGMA.md). This does not make the game a college product.

## D003 — Content is the source of truth

Places, NPCs, quests, abilities, and lessons are JSON validated by Zod in `src/content/`. The UI reads the loader. A fact or exit that exists only in a component is a bug.

## D004 — Archetypes until a people gate

No `sourced-person` NPC unless `gates/real-people.approved` contains an `approved-by:` line. The seed cast is roles, not Middlebury employees' likenesses.

## D005 — LessonSource seam

Classroom UI depends on a `LessonSource` that returns a lesson by id. v1 implements a bundle reader over `content/lessons.json`. Network, iframe, and LMS adapters are not allowed until `gates/live-lms.approved` exists. Sample lessons stay labeled sample.

## D006 — Original art, no college marks

No official logos, no downloaded crest, no photo cutouts of campus people. Map sprites and portraits follow D009. CSS and SVG remain fine for UI chrome.

## D007 — Fail-closed loop

Work proceeds by LOOP.md. Gates must pass. Human gates stop the loop. Meta cycles every five product cycles improve the process without adding scope.

## D008 — Dates rot

Real calendar dates (move-in day, orientation span) live in `content/calendar.json` with `asOf`. Gameplay time is abstract orientation days, not that calendar. Do not bake a semester date into dialogue.

## D019 — Architecture and craft, without a second discovery

Accepted 2026-10-27 from the operator request to fold in the architecture studio and the RPG master directive. Only the non-conflicting parts apply, and they live in [GOAL.md](GOAL.md) under "Architecture and craft." Accepted product decisions stay in this file. Do not run a two-round discovery, do not add combat or an economy, and do not hold the loop for a commercial ship plan. A boundary change is a new decision, not a new questionnaire.

## D020 — One goal file

Accepted 2026-10-27. [GOAL.md](GOAL.md) is the only goal. `Middlebury-Campus-RPG-GOAL.md` and `prompts/PASTE-GOAL.md` are pointers. Do not keep a second goal text. Figma stays the primary tool: use it whenever a player can see a change, and prefer it for every visual decision. A player-visible change without a frame is not done. If the Figma integration fails, stop on `gates/PENDING-figma.md` and `stop: human-gate`.
