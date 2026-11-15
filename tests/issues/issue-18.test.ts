import { it, expect } from "vitest";
import { loadContent } from "../../src/content/load";

it("theater and restaurants stay sample and invent no business name", () => {
  const content = loadContent();
  const theater = content.places.find((p) => p.id === "movie-theater")!;
  const food = content.places.find((p) => p.id === "sample-restaurants")!;
  expect(food.name).toMatch(/sample/i);
  expect(food.summaryStatus).toBe("placeholder");
  expect(food.name).not.toMatch(/restaurant\s+[A-Z][a-z]+/);
  expect(`${theater.name} ${theater.summary}`.toLowerCase()).toMatch(/sample|placeholder/);
  expect(food.facts).toEqual([]);
});
