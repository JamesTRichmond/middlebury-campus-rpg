import { readFileSync } from "node:fs";
import { it, expect } from "vitest";

it("schedules the next meta after two more product cycles", () => {
  expect(readFileSync("LOOP.md", "utf8")).toContain("If this success makes five product cycles since the last meta cycle, the next cycle is a meta cycle");
  const status = readFileSync("STATUS.md", "utf8");
  const since = Number(status.match(/productCyclesSinceMeta:\s*(\d+)/)![1]);
  const last = Number(status.match(/lastMetaCycle:\s*(\d+)/)![1]);
  expect(last).toBe(22);
  expect(since).toBe(3);
  expect(5 - since).toBe(2);
});
