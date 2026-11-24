import { existsSync, readdirSync, readFileSync } from "node:fs";
import { it, expect } from "vitest";

it("records handoff differences instead of claiming a pixel-identical build", () => {
  const figma = readFileSync("docs/FIGMA.md", "utf8");
  expect(figma).toMatch(/Handoff/);
  expect(figma).toMatch(/difference/i);
  const receipts = readdirSync("docs/figma").filter((name) => /handoff/i.test(name) && name.endsWith(".json"));
  expect(receipts.length).toBeGreaterThan(0);
  expect(existsSync("docs/figma/R3-handoff.json")).toBe(true);
});
