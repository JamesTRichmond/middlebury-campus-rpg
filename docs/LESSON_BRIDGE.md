# Lesson bridge

The classroom and the virtual lesson are the same data. The teacher in the game does not improvise a parallel lecture. If the player is in a class, every line the teacher speaks, and every answer to a question, comes from the lesson object `LessonSource` returned for that class.

Bundled lessons are the first virtual lessons. A later live adapter, only after `gates/live-lms.approved`, must map into this same shape. It still may not invent instructor speech. Notes and questions store the lesson id so a new version of the lesson can be compared with what the player already wrote.

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
