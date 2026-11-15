import { it, expect } from "vitest";
import { loadContent } from "../../src/content/load";
import { readJourney, SAVE_KEY, startArrival, writeJourney } from "../../src/game/arrival";

it("does not apply or overwrite an invalid save", () => {
  const content = loadContent();
  const raw = "{broken";
  const data = new Map<string, string>([[SAVE_KEY, raw]]);
  const storage = { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); } };
  const result = readJourney(storage, content);
  expect(result.save).toBeNull();
  expect(result.readOnly).toBe(true);
  expect(result.warning).toBe(content.arrival.loadWarning);
  expect(writeJourney(storage, startArrival("New trip", content), content)).toBe(false);
  expect(data.get(SAVE_KEY)).toBe(raw);
});
