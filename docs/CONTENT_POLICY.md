# Content policy

Middlebury College is a real place. People who work there are real. The game may be specific only where a source supports it.

## Status

| Status | Meaning | Player-facing rule |
| --- | --- | --- |
| `verified` | Public page fetched, URL stored, `asOf` set to the fetch date | May be stated as true as of that date |
| `seed` | Plausible bootstrap copy, not re-checked for this commit | Must show as unconfirmed |
| `placeholder` | Structure only. Names may be generic | Must show as a sample |

A `verified` fact without `sourceUrl` and `asOf` fails `npm test`.

## People and likenesses

- Default NPC `kind` is `archetype`, drawn as an original character.
- Dialogue portraits are more detailed than map sprites. They are still original art.
- A real headshot, or an illustration meant to be a specific living person, needs `gates/likeness.approved` with `approved-by:` and that person's name in the file. Do not scrape a directory photo and do not trace one.
- `sourced-person` still needs `gates/real-people.approved`.
- The station greeter is the slot for a future recognizable college figure. Do not write them as the sitting president, and do not put Ian Baucom's name in content, until that gate exists.
- Player-chosen flags (`firstGen`, `international`, `feb`) select lines written for those paths. They are not detected.
- Accessibility options are settings, not facts about a disability and not content you invent a diagnosis for.

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
