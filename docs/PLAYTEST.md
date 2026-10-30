# Current-build playtest

Current product source: `9d3bca9667443481715370ff0795f82b0fa4a66e` (M9 facts pass). Run from the cloned `middlebury-campus-rpg` directory containing `package.json`:

```sh
npm ci && npm run validate && npm run preview
```

Open the local URL printed by preview, at `/`. For the full arrival, use a fresh browser profile; existing profiles resume their save. Play D1–D8 in order in the same profile. These are stages of one game, not separate URLs. Arrow keys/WASD or direction buttons move; Enter / Interact nearby talks or enters a nearby portal. Follow the Nearby hint; scroll for controls on phone.

Each feedback path below is relative to that local URL. `<built SHA>` is filled automatically by the game's feedback link from the checkout used to build; rebuilding a later documentation-only commit uses that commit's SHA. Use the in-game link to preserve the correct version.

| Demo | Path through the current game; feedback control | Form it opens |
| --- | --- | --- |
| D1-letter-train | Unofficial letter → choose where this character travels from → Board the train → three ride stages → platform → **Give feedback**. | `feedback/index.html?demo=D1-letter-train&version=<built SHA>` |
| D2-character | Platform → **Create your character** → name, pronouns, appearance, mobility and access → **Save character** → **Give feedback**. Check the live portrait and wheelchair; reload to check saving. | `feedback/index.html?demo=D2-character&version=<built SHA>` |
| D3-escort | Character completion/platform → **Walk with the greeter** → station → Triangle Park → campus → hall → dorm room → **Give D3 feedback**. Try the same route using a wheelchair; talk to open portrait dialogue. | `feedback/index.html?demo=D3-escort&version=<built SHA>` |
| D4-dorm | Dorm endpoint → **Unpack in your room** → **Unpack your bag** → place Book, Mug and Keepsake in distinct slots → **Finish settling in** → notice → **Give D4 feedback**. Reload to check positions. | `feedback/index.html?demo=D4-dorm&version=<built SHA>` |
| D5-campus | Finished dorm notice → **Go downstairs for orientation** → follow the task list: orientation leader on Arrival Green, hall, Proctor, Davis Library, sample seminar and instructor → **Give D5 feedback**. Open portrait dialogue; check source/date on factual lines. | `feedback/index.html?demo=D5-campus&version=<built SHA>` |
| D6-class | Complete orientation → Sample seminar room → **Attend sample virtual lesson** → read lesson, save a note, ask a listed question → **Give D6 feedback**. Leave/reload and check the note in the notebook. | `feedback/index.html?demo=D6-class&version=<built SHA>` |
| D7-town | Complete orientation → Arrival Green → Triangle Park → Downtown → movie theater and Restaurants · sample → **Give D7 feedback**. Interest offers at Compass Mentor should appear only for selected interests. | `feedback/index.html?demo=D7-town&version=<built SHA>` |
| D8-snow | Visit downtown after orientation → **Take a trip to the Snow Bowl** → **Arrive at the Snow Bowl** → try, miss or skip the optional game → **Give D8 feedback**. Change all four seasons and reload; place/progress should persist. Return to downtown remains available. | `feedback/index.html?demo=D8-snow&version=<built SHA>` |

After each form, Confirm & Submit copies the Markdown report; paste it back to the operator. Copy again and Download .md are also available. Use browser Back to return to the game. Report the demo, version, where you got stuck, and anything that got worse; do not erase the save to bypass a problem.

Design reference: [existing Figma file](https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS). Local build only; no public deployment URL. Historical entries in [DEMOS.md](DEMOS.md) describe earlier builds; the paths above describe the current combined build.
