# Decisions

Accepted at bootstrap by the operator request that created this repo (2026-10-27). Supersede by adding a new decision. Do not rewrite history.

## D001 — Web TypeScript app, no accounts

v1 is a Vite + React + TypeScript client. Persistence is versioned `localStorage`. No login, no database, no student-data server. Node `>=20`. Package manager is npm. Commit the lockfile when dependencies change.

## D002 — Location graph before free-roam

The campus is places and exits in `content/places.json`, not a tile engine and not Phaser. A free-roam map is a later decision and only after the orientation arc is fun as a graph. This avoids an art bottleneck and keeps every location testable.

## D003 — Content is the source of truth

Places, NPCs, quests, abilities, and lessons are JSON validated by Zod in `src/content/`. The UI reads the loader. A fact or exit that exists only in a component is a bug.

## D004 — Archetypes until a people gate

No `sourced-person` NPC unless `gates/real-people.approved` contains an `approved-by:` line. The seed cast is roles, not Middlebury employees' likenesses.

## D005 — LessonSource seam

Classroom UI depends on a `LessonSource` that returns a lesson by id. v1 implements a bundle reader over `content/lessons.json`. Network, iframe, and LMS adapters are not allowed until `gates/live-lms.approved` exists. Sample lessons stay labeled sample.

## D006 — Original art, no college marks

CSS and SVG you draw. No official logos, no downloaded crest, no photo cutouts of campus people.

## D007 — Fail-closed loop

Work proceeds by LOOP.md. Gates must pass. Human gates stop the loop. Meta cycles every five product cycles improve the process without adding scope.

## D008 — Dates rot

Real calendar dates (move-in day, orientation span) live in `content/calendar.json` with `asOf`. Gameplay time is abstract orientation days, not that calendar. Do not bake a semester date into dialogue.
