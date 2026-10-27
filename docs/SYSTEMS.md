# Systems

See [EXPERIENCE.md](EXPERIENCE.md) for the first session. This file is the mechanics.

## Presentation

- Overworld: top-down pixel art, cozy 16-bit to 64-bit. Original tiles and sprites.
- Dialogue: box plus a portrait more detailed than the map sprite.
- Season toggle (`spring` | `summer` | `fall` | `winter`) swaps palette or overlay only. It must not write quest state.
- Minigames are optional scenes. The first is at `snow-bowl`. Failure does not fail a quest.

## Player

One local character.

- `name`, `pronouns`
- `origin` (where the train came from; captions only)
- `startTerm`: `fall` | `feb`
- `interests`: subset of `outdoors`, `arts`, `languages`, `athletics`, `science`
- `firstGen`, `international`: opt-in booleans
- `mobility`: `foot` | `wheelchair` | `aid`
- `access`: captions, visualSound, colorblind mode, highContrast, uiScale, screenReaderLabels

Appearance is a small structured set (skin, hair, covering), not a freeform image upload.

## Time

Abstract beats: letter, train, escort, dorm, orientation, town, periphery. Do not simulate a clock that expires real orientation week. Seasons are a view.

## Places

A place has exits, NPCs, and facts. `unlockedByDefault: false` stays locked until a quest reward lists that place id. Locked exits can be seen. The player walks them on the pixel map; the JSON list is the authority for which doors exist.

Arrival order: `middlebury-station` → `triangle-park` → campus → `dorm-room`. Town places and `snow-bowl` start locked.

## Talk

At a place, the player talks to NPCs whose `placeId` matches. A line may require a flag (`requiresFlag`), a start term, or an ability. If the requirement fails, the line is hidden.

## Quests

`welcome` is the escort. `orientation` is the campus arc after the dorm notice. Steps complete on `enter-place`, `talk-npc`, `add-note`, `finish-lesson`, or `ask-question`.

## Abilities

| id | Action it unlocks |
| --- | --- |
| `campus-sense` | See the ways out of a place. Granted at start. |
| `notebook` | Write and review notes. |
| `meal-plan` | Dining facts and the meal reminder beat. |
| `ask-a-question` | Choose a lesson prompt. |
| `town-key` | Enter `downtown`. |
| `trail-legs` | Enter `outdoors`. |

## Save

```ts
type SaveV1 = {
  version: 1;
  character: Character | null;
  placeId: string;
  notes: { id: string; placeId?: string; lessonId?: string; text: string }[];
  quests: Record<string, { stepIndex: number; done: boolean }>;
  abilities: string[];
  unlockedPlaces: string[];
  doodads: { id: string; slot: string }[];
  seasonView: "spring" | "summer" | "fall" | "winter";
};
```

Migrations must keep notes, quests, doodads, and accessibility settings.

## UI

Mobile and desktop. Captions on. Dialogue, map, notebook, quest log, lesson panel. No combat HUD. No official branding. Wheelchair sprite when that mobility is set.

