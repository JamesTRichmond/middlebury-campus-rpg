import { existsSync } from "node:fs";
import { join } from "node:path";
import { it, expect } from "vitest";
import { checkContent } from "../../src/content/check";
import { gateAllows } from "../../src/content/gates";
import { loadContent, repoRoot } from "../../src/content/load";

it("does not allow a named likeness until the operator writes the gate", () => {
  const root = repoRoot();
  expect(existsSync(join(root, "gates", "likeness.approved"))).toBe(false);
  expect(gateAllows(root, "likeness.approved")).toBe(false);
  const broken = structuredClone(loadContent());
  broken.npcs[0]!.likeness = { personName: "Unapproved Example" };
  expect(checkContent(broken, root).some((error) => error.includes("likeness.approved"))).toBe(true);
});
