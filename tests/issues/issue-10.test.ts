import { existsSync } from "node:fs";
import { join } from "node:path";
import { it, expect } from "vitest";
import { checkContent } from "../../src/content/check";
import { gateAllows } from "../../src/content/gates";
import { loadContent, repoRoot } from "../../src/content/load";
import { BundleLessonSource, lessonSource } from "../../src/game/lessons";

it("does not allow an official lesson until the operator writes the gate", () => {
  const root = repoRoot();
  expect(existsSync(join(root, "gates", "live-lms.approved"))).toBe(false);
  expect(gateAllows(root, "live-lms.approved")).toBe(false);
  expect(lessonSource).toBeInstanceOf(BundleLessonSource);
  const broken = structuredClone(loadContent());
  broken.lessons[0]!.status = "official";
  expect(checkContent(broken, root).some((error) => error.includes("live-lms.approved"))).toBe(true);
});
