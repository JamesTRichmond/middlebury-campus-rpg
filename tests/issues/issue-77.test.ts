import { readFileSync } from "node:fs";
import { it, expect } from "vitest";
import { startArrival } from "../../src/game/arrival";
import { moveCampus, startCampus } from "../../src/game/campus";
import { loadContent } from "../../src/content/load";

it("moves on the map without waiting on a portrait fetch", () => {
  for (const file of ["src/ui/Campus.tsx", "src/ui/Escort.tsx"]) {
    const source = readFileSync(file, "utf8");
    expect(source).not.toMatch(/\bfetch\s*\(/);
    expect(source).not.toMatch(/\bawait\b/);
    expect(source).toContain("portraitShapes");
  }
  const content = loadContent();
  const save = startCampus({ ...startArrival("Home", content), dorm: { unpacked: true, finished: true } }, content);
  const moved = moveCampus(save, "east");
  expect(moved.campus!.x).toBe(save.campus!.x + 8);
  expect(moved.quests).toEqual(save.quests);
});
