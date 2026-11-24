import { it, expect } from "vitest";
import { startArrival } from "../../src/game/arrival";
import { campusProgress, enterCampus } from "../../src/game/campus";
import { arriveSnow, playSnow, returnFromSnow, startSnowTrip } from "../../src/game/seasons-snow";
import { defaultCharacter } from "../../src/game/character";
import { loadContent } from "../../src/content/load";

it("finished orientation opens town through the park and the Snow Bowl trip", () => {
  const content = loadContent();
  const quest = content.quests.find((q) => q.id === "orientation")!;
  let save = campusProgress({
    ...startArrival("Home", content),
    placeId: "arrival-green",
    character: { ...defaultCharacter, name: "Ari" },
    campus: { x: 240, y: 192, visited: [], talked: [] },
    quests: { orientation: { stepIndex: quest.steps.length, done: true } },
  }, content);
  expect(save.unlockedPlaces).toEqual(expect.arrayContaining(["downtown", "movie-theater"]));
  save = enterCampus(enterCampus(save, "triangle-park", content), "downtown", content);
  expect(save.placeId).toBe("downtown");
  const before = save.quests;
  save = playSnow(arriveSnow(startSnowTrip(save, content)), "skip");
  expect(save.placeId).toBe("snow-bowl");
  expect(save.quests).toEqual(before);
  expect(returnFromSnow(save).placeId).toBe("downtown");
});
