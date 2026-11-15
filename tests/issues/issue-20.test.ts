import { it, expect } from "vitest";
import { startArrival } from "../../src/game/arrival";
import { startSnowTrip, unlockSnow } from "../../src/game/seasons-snow";
import { loadContent } from "../../src/content/load";

it("Snow Bowl is a trip from town, not a tile beside the dorm", () => {
  const content = loadContent();
  const dorm = content.places.find((p) => p.id === "dorm-room")!;
  expect(dorm.exits).not.toContain("snow-bowl");
  const ready = unlockSnow({
    ...startArrival("Home", content),
    placeId: "dorm-room",
    quests: { orientation: { stepIndex: 6, done: true } },
    unlockedPlaces: ["downtown"],
    campus: { x: 240, y: 192, visited: ["downtown"], talked: [] },
  });
  expect(() => startSnowTrip(ready, content)).toThrow(/Visit town/);
});
