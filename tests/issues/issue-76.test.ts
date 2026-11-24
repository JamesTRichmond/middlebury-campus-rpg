import { readFileSync } from "node:fs";
import { it, expect } from "vitest";

it("pairs color with a word, symbol, or name", () => {
  const snow = readFileSync("src/ui/SnowBowl.tsx", "utf8");
  expect(snow).toContain("Choose star ★");
  expect(snow).toContain("Choose circle ○");
  expect(snow).toContain("Skip minigame");
  const season = readFileSync("src/ui/SeasonControl.tsx", "utf8");
  expect(season).toContain('aria-label="Season"');
  expect(season).toContain("{s}");
  expect(readFileSync("src/ui/CharacterPreview.tsx", "utf8")).toContain("aria-label={`Portrait: ${label}`}");
  expect(readFileSync("GOAL.md", "utf8")).toContain("Color is never the only cue.");
});
