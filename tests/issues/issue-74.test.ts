import { readFileSync } from "node:fs";
import { it, expect } from "vitest";

it("letter, creator, and lesson panel keep a keyboard focus target", () => {
  const arrival = readFileSync("src/ui/Arrival.tsx", "utf8");
  expect(arrival).toContain("tabIndex={-1}");
  expect(arrival).toContain("heading.current?.focus()");
  expect(arrival).toContain("input.current?.focus()");
  expect(readFileSync("src/ui/CharacterBuilder.tsx", "utf8")).toContain("tabIndex={-1}");
  expect(readFileSync("src/ui/Classroom.tsx", "utf8")).toContain("heading.current?.focus()");
  for (const css of ["src/ui/arrival.css", "src/ui/character.css", "src/ui/classroom.css"]) {
    expect(readFileSync(css, "utf8")).toContain(":focus-visible");
  }
});
