# Content

JSON the game will read. Do not add a second copy of these facts in React components.

| File | Contents |
| --- | --- |
| `places.json` | Location graph |
| `npcs.json` | Archetypes only, until the people gate |
| `quests/quests.json` | Main orientation arc and two interest sidequests |
| `abilities.json` | Actions progression can unlock |
| `lessons.json` | Sample seminar |
| `calendar.json` | Dated public notes. Not dialogue and not a clock |

`npm test` loads this folder through `src/content/load.ts` and fails on dangling ids, unsourced "verified" facts, real people, and official lessons.
