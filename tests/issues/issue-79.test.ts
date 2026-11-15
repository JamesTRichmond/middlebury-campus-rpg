import { readFileSync } from "node:fs";
import { it, expect } from "vitest";
import { advanceRide, startArrival } from "../../src/game/arrival";
import { loadContent } from "../../src/content/load";

it("plays letter, origin, train, and platform without a dead end", () => {
  expect(readFileSync("GOAL.md", "utf8")).toContain("plays letter, origin, train, and platform with no dead end");
  expect(readFileSync("STATUS.md", "utf8")).toContain("Cover arrival link");
  const content = loadContent();
  let save = startArrival("Home", content);
  expect(save.arrival.stage).toBe("train");
  save = advanceRide(save, content);
  save = advanceRide(save, content);
  save = advanceRide(save, content);
  expect(save.arrival.stage).toBe("platform");
  expect(save.placeId).toBe(content.arrival.placeId);
});
