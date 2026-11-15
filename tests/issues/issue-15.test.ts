import { it, expect } from "vitest";
import { startArrival } from "../../src/game/arrival";
import { changeSeason, seasons } from "../../src/game/seasons-snow";
import { loadContent } from "../../src/content/load";

it("season changes presentation only", () => {
  const content = loadContent();
  const save = { ...startArrival("Home", content), quests: { orientation: { stepIndex: 1, done: false } }, notes: [{ id: "n", text: "Keep" }] };
  for (const season of seasons) {
    const next = changeSeason(save, season);
    expect(next.seasonView).toBe(season);
    expect(next.placeId).toBe(save.placeId);
    expect(next.quests).toBe(save.quests);
    expect(next.notes).toBe(save.notes);
    expect(next.unlockedPlaces).toEqual(save.unlockedPlaces);
  }
});
