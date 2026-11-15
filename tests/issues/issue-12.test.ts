import { it, expect } from "vitest";
import { advanceRide, arrive, rideCaption, startArrival } from "../../src/game/arrival";
import { beginEscort, moveEscort } from "../../src/game/escort";
import { defaultCharacter, characterSchema } from "../../src/game/character";
import { loadContent } from "../../src/content/load";

it("letter, train, name, and walk reach the dorm", () => {
  const content = loadContent();
  let save = startArrival("Burlington", content);
  expect(save.placeId).toBe("middlebury-station");
  expect(save.arrival.stage).toBe("train");
  expect(rideCaption(save, content)).toContain("Burlington");
  save = advanceRide(save, content);
  save = advanceRide(save, content);
  save = advanceRide(save, content);
  expect(save.arrival.stage).toBe("platform");
  expect(arrive(save, content).placeId).toBe("middlebury-station");
  save = { ...save, character: characterSchema.parse({ ...defaultCharacter, name: "Ari" }) };
  expect(save.character?.name).toBe("Ari");
  save = beginEscort(save, content);
  for (let i = 0; i < 19; i++) save = moveEscort(save, "south", content);
  for (let i = 0; i < 200; i++) save = moveEscort(save, "east", content);
  expect(save.placeId).toBe("dorm-room");
  expect(save.quests.welcome.done).toBe(true);
});
