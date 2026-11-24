import { readFileSync } from "node:fs";
import { it, expect } from "vitest";
import { loadContent } from "../../src/content/load";

it("does not add farming, combat, a second school, or multiplayer", () => {
  const goal = readFileSync("GOAL.md", "utf8");
  expect(goal).toContain("Do not copy those games' assets, farming loops, or characters.");
  expect(goal).toContain("Not a parody and not a combat game.");
  expect(goal).toContain("Do not expand into a new campus, a second school, multiplayer, or combat");
  expect(goal).toContain("Do not add a farming economy");
  const ids = loadContent().places.map((place) => place.id).join(" ");
  expect(ids).not.toMatch(/farm|combat|multiplayer|second-school|second-campus/);
});
