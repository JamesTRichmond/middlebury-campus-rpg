import { it, expect } from "vitest";
import { loadContent } from "../../src/content/load";

it("the letter is unofficial and the greeter is an archetype", () => {
  const content = loadContent();
  expect(content.arrival.unofficialLabel).toMatch(/UNOFFICIAL/);
  const greeter = content.npcs.find((n) => n.id === content.arrival.greeterNpcId)!;
  expect(greeter.kind).toBe("archetype");
  expect(greeter.displayName.toLowerCase()).not.toMatch(/president|baucom/);
  expect(content.npcs.every((n) => n.kind === "archetype")).toBe(true);
});
