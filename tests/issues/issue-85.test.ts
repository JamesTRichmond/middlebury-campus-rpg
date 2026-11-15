import { it, expect } from "vitest";
import { startArrival, type Save } from "../../src/game/arrival";
import { offeredInterestQuests } from "../../src/game/campus";
import { defaultCharacter } from "../../src/game/character";
import { loadContent } from "../../src/content/load";

it("offers no interest quest until the player selects that interest", () => {
  const content = loadContent();
  const quest = content.quests.find((item) => item.id === "orientation")!;
  const save: Save = {
    ...startArrival("Home", content),
    placeId: "activities-fair",
    quests: { orientation: { stepIndex: quest.steps.length, done: true } },
    character: { ...defaultCharacter, name: "Ari", interests: [] },
  };
  expect(offeredInterestQuests(save, content)).toEqual([]);
  const selected: Save = { ...save, character: { ...defaultCharacter, name: "Ari", interests: ["Languages"] } };
  expect(offeredInterestQuests(selected, content).map((item) => item.id)).toEqual(["town-errand"]);
});
