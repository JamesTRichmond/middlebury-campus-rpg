import { existsSync, readdirSync, readFileSync } from "node:fs";
import { it, expect } from "vitest";

it("saves a pasted report under feedback/inbox with the dated name", () => {
  expect(readFileSync("LOOP.md", "utf8")).toContain("feedback/inbox/YYYY-MM-DD-<demo>-<version>.md");
  expect(readFileSync("GOAL.md", "utf8")).toContain("save it under `feedback/inbox/`");
  expect(existsSync("feedback/inbox")).toBe(true);
  const saved = readdirSync("feedback/inbox").filter((name) => name.endsWith(".md") && name !== "README.md");
  expect(saved.some((name) => /^\d{4}-\d{2}-\d{2}-.+-.+\.md$/.test(name))).toBe(true);
});
