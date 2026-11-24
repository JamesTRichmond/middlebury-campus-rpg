import { readFileSync } from "node:fs";
import { it, expect } from "vitest";

it("files a worse report at the head of the backlog", () => {
  expect(readFileSync("LOOP.md", "utf8")).toContain("File regressions and anything marked worse at the head of the backlog");
  expect(readFileSync("GOAL.md", "utf8")).toContain('File regressions and "got worse" items at the head of the backlog.');
});
