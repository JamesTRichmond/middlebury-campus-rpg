# Demos

A demo is a Figma prototype, a build someone can play, and the feedback form bound to that build. The prototype comes first. Shipping the demo does not pause the loop. Pasted feedback jumps the queue. See LOOP.md and [FIGMA.md](FIGMA.md).

Open the form from a demo like this:

`feedback/index.html?demo=D1-letter-train&version=<git-sha>`

Local form only, before the game exists:

```sh
npm run feedback
```

That serves this folder. The page remembers this browser's earlier answers and, on submit, copies a Markdown report that includes them.

| Demo | After | Player should be able to |
| --- | --- | --- |
| [D1-letter-train](https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS) | M1 | Read the unofficial letter, set a home place, ride the train into the station |
| [D2-character](https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS) | M2 | Name themselves, set pronouns and appearance, turn on wheelchair and other access options |
| `D3-escort` | M3 | Walk from the station through Triangle Park to the dorm, including with a wheelchair |
| `D4-dorm` | M4 | Unpack and place doodads, then see the orientation notice |
| `D5-campus` | M5 | Visit dining and the library with portrait dialogue |
| `D6-class` | M6 | Attend class as their character; the teacher delivers the virtual lesson; take notes; ask a question answered only from that lesson |
| `D7-town` | M7 | Cross Triangle Park into town after campus objectives |
| `D8-snow` | M8 | Toggle seasons and take the optional Snow Bowl trip |

## Recorded builds

D1 is a local static build. Its inspected source version is recorded below; new builds embed the SHA of their checked-out HEAD. No public deployment or URL is claimed. The Figma link is the original tool-returned file URL; use its Cover arrival link and Present / Flow 1.

| Demo | Version | Figma | How to play | Date |
| --- | --- | --- | --- | --- |
| D1-letter-train | `fd13bcf3bd32b0af91f33d8492dfa89f441c1e9a` | [Prototype](https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS) — Cover → arrival → Present / Flow 1 | local: `npm ci && npm run validate && npm run preview`; open the printed URL on port 4173 | 2026-10-27 |

D1 opens the unofficial letter in a fresh browser. Enter a city or region, Continue through the window-view ride, then reach the platform. Continue on the platform opens the existing feedback form with the demo and build version. Reload resumes the saved train/platform; invalid saves remain unchanged. The train is user-paced; no invented route, timing or location lookup is used.

Feedback path for the inspected build:

`feedback/index.html?demo=D1-letter-train&version=fd13bcf3bd32b0af91f33d8492dfa89f441c1e9a`

Desktop 1280×720 and phone 390×844 were played through in Chromium and compared with the Figma screenshots. The native origin input replaces the prototype’s filled sample state. D1 ends at feedback; the M0 prototype still shows the later character design after the platform. See the D1 board on Figma Handoff and [cycle 0007](../cycles/0007-letter-train.md).

## D1 repaired — cycle 0009

Version: `aa56940b0a0bfb9b046c76dd024ea664a46b2780`. Local: from the repository folder run `npm ci && npm run validate && npm run preview`, then open the printed URL. Existing platform saves expose Replay the arrival. Feedback is `feedback/index.html?demo=D1-letter-train&version=aa56940b0a0bfb9b046c76dd024ea664a46b2780`. Fresh builds embed their checked-out SHA.

[Repaired prototype](https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS): Cover → repaired Letter 38:2698 → Present. Three ride stages lead to an explicit D1 ending with replay. The earlier one-caption implementation above is historical. M2 remains on hold.

## D2-character — cycle 0010

Source `2b2ce0a4b3f61626a94eee39c94ae411760d5ca9`. Prototype: recorded Figma file → platform Create your character (51:3340) → 8:368, phone 8:466; save ends at 53:3263 / 53:3271 and Edit returns. Local: from repo run `npm ci && npm run validate && npm run preview`. Play arrival, open builder, save character, Give feedback opens D2 with built SHA. Native controls replace field specimens; preview and access changes apply immediately. M3 remains held.
