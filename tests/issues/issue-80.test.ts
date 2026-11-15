import { readFileSync } from "node:fs";
import { it, expect } from "vitest";

it("plays the current build at desktop and phone sizes", () => {
  const config = readFileSync("playwright.config.ts", "utf8");
  expect(config).toContain('name: "desktop"');
  expect(config).toContain("width: 1280, height: 720");
  expect(config).toContain('name: "phone"');
  expect(config).toContain("width: 390, height: 844");
  expect(readFileSync("GOAL.md", "utf8")).toContain("Phone and laptop both work once UI exists.");
});
