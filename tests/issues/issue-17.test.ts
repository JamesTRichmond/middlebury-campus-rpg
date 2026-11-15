import { it, expect } from "vitest";
import { saveNote } from "../../src/game/lessons";
import { readJourney, startArrival, writeJourney, SAVE_KEY } from "../../src/game/arrival";
import { loadContent } from "../../src/content/load";

it("a class note survives leaving and reloading", () => {
  const content = loadContent();
  const data = new Map<string, string>();
  const storage = { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => { data.set(k, v); } };
  const noted = saveNote({ ...startArrival("Home", content), placeId: "seminar-room", abilities: ["notebook"] }, "Locate the claim", "sample-seminar-questions");
  const left = { ...noted, placeId: "arrival-green" };
  expect(left.notes[0].text).toBe("Locate the claim");
  expect(writeJourney(storage, left, content)).toBe(true);
  expect(readJourney(storage, content).save?.notes).toEqual(left.notes);
  expect(SAVE_KEY).toBe("midd-campus-rpg.save.v1");
});
