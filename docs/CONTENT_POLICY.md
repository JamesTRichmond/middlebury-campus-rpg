# Content policy

Middlebury College is a real place. People who work there are real. The game may be specific only where a source supports it.

## Status

| Status | Meaning | Player-facing rule |
| --- | --- | --- |
| `verified` | Public page fetched, URL stored, `asOf` set to the fetch date | May be stated as true as of that date |
| `seed` | Plausible bootstrap copy, not re-checked for this commit | Must show as unconfirmed |
| `placeholder` | Structure only. Names may be generic | Must show as a sample |

A `verified` fact without `sourceUrl` and `asOf` fails `npm test`.

## People

- Default NPC `kind` is `archetype`.
- `sourced-person` fails validation unless `gates/real-people.approved` exists and contains a line `approved-by:`.
- Do not attach a real name, office gossip, appearance, or quotation to an archetype.
- Player-chosen flags (`firstGen`, `international`, `feb`) select lines written for those paths. They are not detected.

## Lessons

- Bundled lessons use `status: "placeholder"`.
- `official` fails validation unless `gates/live-lms.approved` exists and contains `approved-by:`.
- Do not iframe a college site, do not ask for college credentials, and do not send student notes to a model.

## Sources already used at bootstrap

Fetched 2026-10-27. Treat the sentences in `content/` that cite these as the only verified claims. Re-verify before calling them current in a later semester.

- https://www.middlebury.edu/college/admissions/admitted/first-year-life-middlebury
- https://www.middlebury.edu/college/orientation
- https://www.middlebury.edu/college/orientation/faq
- https://www.middlebury.edu/college/student-life

## Calendar

Move-in and orientation dates in `content/calendar.json` are dated notes, not dialogue, and not gameplay timers.

## Trademarks

Do not commit the college's logos or athletic marks. "Middlebury" in prose is how the player understands the setting. The README states the project is unofficial.
