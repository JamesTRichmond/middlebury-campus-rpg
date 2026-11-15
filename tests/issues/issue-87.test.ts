import { readFileSync } from "node:fs";
import { it, expect } from "vitest";
import { checkContent } from "../../src/content/check";
import { loadContent, repoRoot } from "../../src/content/load";

it("fails when a shipped ability is removed", () => {
  expect(readFileSync("GOAL.md", "utf8")).toContain("Removing a shipped feature fails a test.");
  const broken = structuredClone(loadContent());
  broken.abilities = broken.abilities.filter((ability) => ability.id !== "campus-sense");
  expect(checkContent(broken, repoRoot()).some((error) => error.includes("campus-sense"))).toBe(true);
});
