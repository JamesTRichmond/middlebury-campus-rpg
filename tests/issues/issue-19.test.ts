import { it, expect } from "vitest";
import { escortCopy } from "../../src/game/escort";

it("Triangle Park is labeled as the game framing, not an official boundary", () => {
  expect(escortCopy.framing).toMatch(/Triangle Park/);
  expect(escortCopy.framing).toMatch(/not an official boundary/);
  expect(escortCopy.lines.join(" ")).toMatch(/story's threshold/);
});
