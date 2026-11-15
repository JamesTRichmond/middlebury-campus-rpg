import { it, expect } from "vitest";
import { askLesson, lessonAnswer, lessonSource, responseBelongs } from "../../src/game/lessons";
import { startArrival } from "../../src/game/arrival";
import { loadContent } from "../../src/content/load";

it("answers only prompts on the sample lesson", () => {
  const lesson = lessonSource.get("sample-seminar-questions")!;
  expect(lesson.status).not.toBe("official");
  for (const prompt of lesson.prompts) expect(lessonAnswer(lessonSource, lesson.id, prompt.id)).toBe(prompt.instructorResponse);
  expect(lessonAnswer(lessonSource, lesson.id, "invented")).toBeUndefined();
  expect(responseBelongs(lessonSource, lesson.id, "Unrelated invented speech")).toBe(false);
  const save = { ...startArrival("Home", loadContent()), placeId: "seminar-room", abilities: ["ask-a-question"] };
  expect(() => askLesson(save, lesson.id, "invented")).toThrow(/not in this lesson/);
});
