import { it, expect } from "vitest";
import { startArrival, type Save } from "../../src/game/arrival";
import { loadContent } from "../../src/content/load";
import { arriveSnow, playSnow, returnFromSnow, startSnowTrip, unlockSnow } from "../../src/game/seasons-snow";

it("lets a missed or skipped minigame return without closing the story", () => {
  const content = loadContent();
  const quest = content.quests.find((item) => item.id === "orientation")!;
  const save: Save = unlockSnow({
    ...startArrival("Home", content),
    placeId: "downtown",
    campus: { x: 240, y: 192, visited: ["downtown"], talked: [] },
    quests: { orientation: { stepIndex: quest.steps.length, done: true }, open: { stepIndex: 0, done: false } },
    abilities: quest.rewards.abilities,
    unlockedPlaces: quest.rewards.places,
  });
  for (const choice of ["circle", "skip"] as const) {
    const result = playSnow(arriveSnow(startSnowTrip(save, content)), choice);
    expect(result.snowBowl?.result).toBe(choice === "circle" ? "missed" : "skipped");
    expect(result.quests).toEqual(save.quests);
    expect(returnFromSnow(result).placeId).toBe("downtown");
    expect(returnFromSnow(result).quests.open.done).toBe(false);
  }
});
