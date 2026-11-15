import { readFileSync } from "node:fs";
import { it, expect } from "vitest";
import { BundleLessonSource, lessonSource } from "../../src/game/lessons";

it("serves the sample lesson from the bundle with no network", () => {
  expect(lessonSource).toBeInstanceOf(BundleLessonSource);
  const lesson = lessonSource.get("sample-seminar-questions");
  expect(lesson?.status).toBe("placeholder");
  expect(lesson?.blocks.length).toBeGreaterThan(0);
  const source = readFileSync("src/game/lessons.ts", "utf8");
  expect(source).toContain("content/lessons.json");
  expect(source).not.toMatch(/\bfetch\s*\(/);
});
