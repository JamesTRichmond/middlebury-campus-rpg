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
| [D3-escort](https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS) | M3 | Walk from the station through Triangle Park to the dorm, including with a wheelchair |
| [D4-dorm](https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS) | M4 | Unpack and place doodads, then see the orientation notice |
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

## D2 live preview repair — cycle 0011

This supersedes the original form-only D2 acceptance above. Tested source `28aa39ff5fe2a8a0abccd03d0ff6219dfb1e9f06`. [Prototype](https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS): platform Create your character → desktop 57:3098; phone 57:3213. Save reaches the existing D2 ending; Edit returns to the repaired builder.

Local, from the repository folder: `npm ci && npm run validate && npm run preview`. Existing platform saves can open the builder directly. The large live figure remains visible while controls scroll. Skin choices are named swatches; hair, coverings, body, wheelchair, clothes and accessories change the same figure. Save/reload retains the image and choices. Feedback: `feedback/index.html?demo=D2-character&version=28aa39ff5fe2a8a0abccd03d0ff6219dfb1e9f06`; fresh builds use their actual SHA. No public deployment is claimed.

### R3 checkpoint, cycle 0016 — not a validated demo

The D2 row links the existing file. Its platform prototype now opens range creator `74:9838`, with phone frame `74:9987` and save/edit return paths. See `figma/R3-dialogue-wiring.json`. Current source is an incomplete implementation checkpoint, not a replacement accepted D2 build: TypeScript and browser acceptance remain outstanding. Do not start M3.

### R3 final comparison accepted — cycle 0016

The earlier incomplete checkpoint entry is historical. Validated build source `f86981922dc279501d3a06f67c26eabd007ed791`: run `npm ci && npm run validate && npm run preview` from the repository and open the printed local URL. Platform → Create your character → Save → Edit / Give feedback / Back to platform. Feedback opens `feedback/index.html?demo=D2-character&version=f86981922dc279501d3a06f67c26eabd007ed791`; fresh builds bind their own checked-out SHA.

D2 prototype uses the original file linked in the demo row: platform → 74:9838 (phone 74:9987) → completion → edit or return. Handoff 84:3 records comparison and intentional native-control differences. 27 tests, TypeScript, production build and 14 browser checks passed. No public deployment. M3 remains held.

## D3 escort — cycle 0018

Local: `npm ci && npm run validate && npm run preview` from the repository. Complete arrival/character, Save, then Walk with the greeter. Use arrow keys/WASD or direction controls; go around the stone. Talk opens portrait dialogue. Dorm arrival ends D3; Give D3 feedback opens `feedback/index.html?demo=D3-escort&version=<built SHA>` automatically. Saves resume the same walk. No public deployment.

Prototype in the recorded file: D2 completion entry 89:4649 / 89:4652 → escort 87:4031 / 87:4130; dialogue previews 87:4441 / 87:4624; endpoint 89:4655. Prototype uses preview jumps; actual build requires walking. Handoff 94:2 records differences. M4 held.

## D4 dorm — cycle 0019 complete

From repository: `npm ci && npm run validate && npm run preview`. Reach dorm via escort → Unpack in your room → Unpack your bag → place Book, Mug, Keepsake → Finish settling in. Notice points downstairs; campus tour does not start. All placements and notice persist on reload. Give D4 feedback opens `feedback/index.html?demo=D4-dorm&version=<built SHA>` automatically. Fresh builds bind their checked-out SHA; no public deployment.

Existing Figma prototype entry 96:4981 → phone unpack 95:4995 → finished notice 95:5026; desktop 95:4981 / 95:5009. The prototype uses a state jump; actual build requires placement. Handoff 97:2 records native-control differences. Room comparison evidence: figma/M4-comparison/. 30 unit tests, TypeScript, production build and 20 browser checks passed. M5 held.
