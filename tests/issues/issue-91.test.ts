import { readFileSync } from "node:fs";
import { it, expect } from "vitest";

it("forbids inventing a public URL", () => {
  expect(readFileSync("LOOP.md", "utf8")).toContain("Never invent a public URL.");
  expect(readFileSync("README.md", "utf8")).toContain("No public URL is published yet.");
  expect(readFileSync("docs/PLAYTEST.md", "utf8")).toContain("no public deployment URL");
  expect(readFileSync("docs/DEMOS.md", "utf8")).toContain("No public deployment or URL is claimed.");
});
