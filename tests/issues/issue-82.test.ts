import { it, expect } from "vitest";
import { startArrival, type Save } from "../../src/game/arrival";
import { askLesson, lessonSource, responseBelongs } from "../../src/game/lessons";
import { loadContent } from "../../src/content/load";

it("rejects a question that is not on the lesson", () => {
  const lesson = lessonSource.get("sample-seminar-questions")!;
  expect(responseBelongs(lessonSource, lesson.id, "Unrelated invented speech")).toBe(false);
  const save: Save = { ...startArrival("Home", loadContent()), placeId: "seminar-room", abilities: ["ask-a-question"] };
  expect(() => askLesson(save, lesson.id, "not-on-the-lesson")).toThrow(/not in this lesson/);
});
