import { it, expect } from "vitest";
import { startArrival } from "../../src/game/arrival";
import { beginEscort, moveEscort } from "../../src/game/escort";
import { defaultCharacter } from "../../src/game/character";
import { loadContent } from "../../src/content/load";

it("a wheelchair completes the same escort to the dorm", () => {
  const content = loadContent();
  let save = beginEscort({ ...startArrival("Home", content), character: { ...defaultCharacter, name: "Ari", mobility: "Wheelchair" } }, content);
  for (let i = 0; i < 19; i++) save = moveEscort(save, "south", content);
  for (let i = 0; i < 200; i++) save = moveEscort(save, "east", content);
  expect(save.character?.mobility).toBe("Wheelchair");
  expect(save.placeId).toBe("dorm-room");
  expect(save.quests.welcome.done).toBe(true);
  expect(save.unlockedPlaces).not.toContain("downtown");
});
