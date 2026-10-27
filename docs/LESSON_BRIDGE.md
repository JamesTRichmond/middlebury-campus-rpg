# Lesson bridge

The classroom and the "virtual lesson" are the same data, read through one interface.

```ts
type LessonBlock = { id: string; kind: "explain" | "prompt"; text: string };

type LessonPrompt = {
  id: string;
  question: string;
  instructorResponse: string;
};

type Lesson = {
  id: string;
  title: string;
  courseLabel: string;
  status: "placeholder" | "sourced" | "official";
  instructorNpcId: string;
  placeId: string;
  blocks: LessonBlock[];
  prompts: LessonPrompt[];
};

interface LessonSource {
  get(id: string): Lesson | undefined;
  forPlace(placeId: string): Lesson[];
}
```

v1: `BundleLessonSource` reads `content/lessons.json`.

Later, only after `gates/live-lms.approved`:

- An adapter may map an operator-supplied lesson export into `Lesson`.
- It still may not invent instructor speech.
- Player questions outside the prompt list wait for a later decision. They are not a silent call to a chatbot.
- Notes stay on the device.

The sample lesson teaches how to ask a seminar question. It is not a Middlebury course.
