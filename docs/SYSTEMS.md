# Systems

## Player

One local character. Fields are set in M2 and stored on the save. Interests are ids:

`outdoors`, `arts`, `languages`, `athletics`, `science`.

## Time

Abstract beats: arrival, orientation days, first class. Do not simulate a clock that expires real orientation week.

## Places

A place has exits (other place ids), NPCs, and facts. `unlockedByDefault: false` stays locked until a quest reward or ability lists that place id. The player can see a locked exit.

## Talk

At a place, the player talks to NPCs whose `placeId` matches. A line may require a flag (`requiresFlag`) or an ability (`requiresAbility`). If the requirement fails, the line is hidden, not teased with personal data.

## Quests

Steps complete when their `on` condition happens:

- `enter-place`
- `talk-npc`
- `add-note`
- `finish-lesson`
- `ask-question`

Rewards grant an ability id or unlock a place id. Reward ids must exist.

## Abilities

| id | Action it unlocks |
| --- | --- |
| `campus-sense` | See exits. Granted at start. |
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
};
```

Migrations must keep notes and quest progress. Tests cover each version bump.

## UI, once M1 exists

Mobile and desktop. Large exit and talk controls. Fact chips show status. No combat HUD. No official branding.
