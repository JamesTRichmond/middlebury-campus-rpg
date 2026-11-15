import { readFileSync } from "node:fs";
import { it, expect } from "vitest";
import { defaultCharacter } from "../../src/game/character";

it("turns captions on unless the player has switched them off", () => {
  expect(defaultCharacter.captions).toBe(true);
  const arrival = readFileSync("src/ui/Arrival.tsx", "utf8");
  expect(arrival).toContain("root.dataset.captions = String(c.success ? c.data.captions : true)");
  expect(readFileSync("src/ui/CharacterBuilder.tsx", "utf8")).toContain("value.captions&&");
});
