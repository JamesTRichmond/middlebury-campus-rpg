import { existsSync } from "node:fs";
import { join } from "node:path";
import { it, expect } from "vitest";
import { checkContent } from "../../src/content/check";
import { gateAllows } from "../../src/content/gates";
import { loadContent, repoRoot } from "../../src/content/load";

it("does not allow a sourced person until the operator writes the gate", () => {
  const root = repoRoot();
  expect(existsSync(join(root, "gates", "real-people.approved"))).toBe(false);
  expect(gateAllows(root, "real-people.approved")).toBe(false);
  const content = loadContent();
  expect(content.npcs.every((npc) => npc.kind === "archetype")).toBe(true);
  const broken = structuredClone(content);
  broken.npcs[0]!.kind = "sourced-person";
  broken.npcs[0]!.sourceUrl = "https://example.invalid/person";
  expect(checkContent(broken, root).some((error) => error.includes("real-people.approved"))).toBe(true);
});
