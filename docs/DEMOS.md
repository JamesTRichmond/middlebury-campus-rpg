# Demos

A demo is a build someone can play, plus the feedback form bound to that build. Shipping the demo does not pause the loop. Pasted feedback jumps the queue. See LOOP.md.

Open the form from a demo like this:

`feedback/index.html?demo=D1-letter-train&version=<git-sha>`

Local form only, before the game exists:

```sh
npm run feedback
```

That serves this folder. The page remembers this browser's earlier answers and, on submit, copies a Markdown report that includes them.

| Demo | After | Player should be able to |
| --- | --- | --- |
| `D1-letter-train` | M1 | Read the unofficial letter, set a home place, ride the train into the station |
| `D2-character` | M2 | Name themselves, set pronouns and appearance, turn on wheelchair and other access options |
| `D3-escort` | M3 | Walk from the station through Triangle Park to the dorm, including with a wheelchair |
| `D4-dorm` | M4 | Unpack and place doodads, then see the orientation notice |
| `D5-campus` | M5 | Visit dining and the library with portrait dialogue |
| `D6-class` | M6 | Attend class as their character; the teacher delivers the virtual lesson; take notes; ask a question answered only from that lesson |
| `D7-town` | M7 | Cross Triangle Park into town after campus objectives |
| `D8-snow` | M8 | Toggle seasons and take the optional Snow Bowl trip |

## Recorded builds

None yet. The first agent to finish M1 writes the open path here. Do not invent one.

| Demo | Version | How to play | Date |
| --- | --- | --- | --- |
| — | — | — | — |
