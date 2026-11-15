import { existsSync, readFileSync } from "node:fs";
import { it, expect } from "vitest";
import { DEMO_ID, feedbackPath } from "../../src/game/arrival";

it("documents D1-D8 as one local game and a form the operator pastes back", () => {
  const guide = readFileSync("docs/PLAYTEST.md", "utf8");
  for (const id of ["D1-letter-train", "D2-character", "D3-escort", "D4-dorm", "D5-campus", "D6-class", "D7-town", "D8-snow"]) {
    expect(guide).toContain(id);
    expect(guide).toContain(`feedback/index.html?demo=${id}`);
  }
  expect(guide).toMatch(/fresh browser profile/i);
  expect(guide).toContain("Confirm & Submit");
  expect(guide).toMatch(/paste it back/i);
  expect(guide).toMatch(/no public deployment URL/i);
  expect(DEMO_ID).toBe("D1-letter-train");
  expect(feedbackPath("abc")).toBe("feedback/index.html?demo=D1-letter-train&version=abc");
  expect(existsSync("feedback/index.html")).toBe(true);
});
