# Experience

Operator brief, 2026-10-27. This is the intended first session. [DECISIONS.md](../DECISIONS.md) D009–D016 accept it. Do not clone Stardew Valley's farming, copyrighted characters, or UI. Take the feel: cozy pace, small stakes, seasons, a portrait when someone talks.

## What you see first

1. **Acceptance letter.** The game opens on a letter that says you got into Middlebury. It is a story prop, not a real admissions decision, and it must say the game is unofficial.
2. **Where you are coming from.** The player sets a home place (city or region). That choice only changes the train ride's scenery captions. It is not a guess about their real life.
3. **The train.** A short ride into Vermont, referential to cozy-game arrivals. First person, or a view out the window. Not the normal walk control. It ends at Middlebury station.
4. **The platform.** You step off. A greeter is waiting. Control becomes third person here and stays there.

## The greeter and the character

The greeter is a welcome figure, not a named real person. The operator's example was "maybe the president, or someone that recognizable." The role can later wear an approved portrait of a real officer. Until `gates/likeness.approved` lists that person, use original art and do not write dialogue as if it were Ian Baucom or any other real official. No invented quotations.

The greeter asks what to call you. That question opens character creation:

- Name
- Pronouns, free text, with suggestions
- Body and presentation, including a wide range of skin tones, hair (including textured and protective styles), facial hair, and cultural or religious head coverings
- Mobility: on foot, wheelchair, or another aid the player chooses. The wheelchair is a real sprite and a real pathing rule, not a sticker. The escort to the dorm must be completable in a wheelchair. The real Amtrak stop is an accessible platform; do not invent stairs as the only way off it.

Accessibility is chosen here and applies from this moment on. It can be changed later in settings.

- Captions on for everyone
- Hearing: visual cues for sounds, nothing required to be heard
- Vision: colorblind palettes (protanopia, deuteranopia, tritanopia), high contrast, larger UI, and names on controls so a screen reader can reach them
- These are display options the player sets. The game does not diagnose anyone.

## Walk to the dorm

The greeter escorts you. This is the first real walk on the pixel map.

- Leave **Middlebury station** (Amtrak MBY, 30 Middle Seymour Street).
- Come through town to **Triangle Park**.
- Cross onto campus.
- Arrive at the dorm.

Triangle Park is a real plaza by the rail tunnel near St. Stephen's, with a fountain and a stone-edged lawn. The operator wants it to play as the door between town and campus. That door is a story threshold. Do not caption it as an official campus boundary unless a source says so. Label the story use as the game's framing.

The station is about a mile from campus, a walk on the order of twenty minutes. The escort may shorten that for pacing. Do not claim the walk is one block.

## The dorm

- Unpack the bag. A few items came from the place you set at the start.
- Place a handful of doodads in the room. Cosmetic. Saved.
- Then a small notice: orientation is starting, meet downstairs.

## Orientation, then the town, then farther out

Downstairs, someone walks you through the central campus: dining hall, library, and the other hubs already in `content/places.json`. Objectives can stack as you go. Nothing expires.

When the campus objectives are done, the map opens back through Triangle Park into town: the movie theater and restaurants as places you can enter. Do not invent business names. Use placeholders until a sourced pass.

After town is open, the map can grow to **Middlebury Snow Bowl** and other edges. The Snow Bowl is a college ski area east on Route 125, beyond Bread Loaf, not a neighbor of the dorm. Getting there is a trip, then a small optional minigame. Missing it does not block the story.

## Art on the map vs in the dialogue box

- Overworld and the characters walking on it: pixel art in a cozy 16-bit to 64-bit range. Readable at a glance. Seasonal color, not realism.
- Talking to someone opens a dialogue box with a portrait more detailed than the map sprite.
- Portraits of staff and students are original illustrations by default.
- A real headshot, or an illustration that is meant to be a specific living person, waits on `gates/likeness.approved` for that person. Do not scrape a college directory photo and do not trace one.

## Seasons

The player can toggle a season overlay on the same map: spring, summer, fall, winter. Winter is the natural face of the Snow Bowl. The toggle is a view, not a survival clock.

## What this is not

- Not a farm, not stamina, not a copy of a commercial cozy game's systems.
- Not combat.
- Not an official tour, and not a claim that the president meets every student at the platform.
