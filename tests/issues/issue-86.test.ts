import { readFileSync } from "node:fs";
import { it, expect } from "vitest";
import { rideCaption, startArrival } from "../../src/game/arrival";
import { loadContent } from "../../src/content/load";

it("uses origin only in the ride caption and the unpack line", () => {
  const content = loadContent();
  const oslo = startArrival("Oslo", content);
  const home = startArrival("Home", content);
  expect({ ...oslo, origin: "" }).toEqual({ ...home, origin: "" });
  expect(rideCaption(oslo, content)).toContain("Oslo");
  expect(rideCaption(home, content)).not.toContain("Oslo");
  expect(readFileSync("content/dorm.json", "utf8")).toContain("{origin}");
  expect(readFileSync("src/ui/Dorm.tsx", "utf8")).toContain("copy.origin.replace('{origin}',()=>save.origin)");
});
