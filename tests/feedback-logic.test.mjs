import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { flatten, sections } from "../feedback/questions.mjs";
import {
  applyQuery,
  drift,
  emptyDraft,
  emptyStore,
  loadStore,
  moveRank,
  seedDraft,
  toggleMulti,
  toMarkdown,
} from "../feedback/logic.mjs";

const flat = flatten(sections);

describe("skillgame feedback", () => {
  it("gives every question a unique id, a prompt, and an explicit multi limit", () => {
    const ids = flat.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const question of flat) {
      expect(question.prompt.length).toBeGreaterThan(10);
      if (question.type === "multi") expect(question.selectMax).toBeGreaterThan(1);
      if (question.type === "rank") expect(question.options.length).toBeGreaterThan(1);
      if (question.type === "matrix") {
        expect(question.rows.length).toBeGreaterThan(1);
        expect(question.columns.length).toBeGreaterThan(1);
      }
    }
  });

  it("stops a multi-select at its limit and can undo", () => {
    const question = flat.find((item) => item.id === "stuck");
    let selected = [];
    for (const option of question.options) {
      selected = toggleMulti(selected, option.id, question.selectMax);
    }
    expect(selected).toHaveLength(question.selectMax);
    const removed = toggleMulti(selected, selected[0], question.selectMax);
    expect(removed).not.toContain(selected[0]);
  });

  it("reorders a rank without dropping items", () => {
    const question = flat.find((item) => item.id === "fix-first");
    const order = question.options.map((option) => option.id);
    const moved = moveRank(order, order[1], -1);
    expect(moved[0]).toBe(order[1]);
    expect(moved).toHaveLength(order.length);
  });

  it("remembers a previous submission inside the markdown", () => {
    const memory = {
      getItem() {
        return null;
      },
      setItem() {},
    };
    expect(loadStore(memory).submissions).toEqual([]);
    expect(loadStore({ getItem: () => "{", setItem() {} }).submissions).toEqual([]);
    const store = emptyStore();
    store.submissions.push({
      at: "2026-10-27T00:00:00.000Z",
      testerId: "t1",
      version: "aaa",
      answers: { demo: "D1-letter-train", compared: "worse", landed: { letter: "broken" } },
      contexts: { blocker: "The train never arrived." },
    });
    const draft = seedDraft(store, "");
    applyQuery(draft, new URLSearchParams("demo=D6-class&version=bbb"), flat);
    draft.answers.compared = "better";
    draft.submittedAt = "2026-10-27T01:00:00.000Z";
    const markdown = toMarkdown({
      flat,
      draft,
      previous: store.submissions[0],
      stored: true,
    });
    expect(markdown).toContain("What changed since the previous submission");
    expect(markdown).toContain("Was:");
    expect(markdown).toContain("Now:");
    expect(markdown).toContain("D6 — Class, virtual lesson, notes, questions");
    expect(markdown).toContain("bbb");
    expect(markdown).toContain("The train never arrived.");
    expect(drift(flat, draft.answers, store.submissions[0].answers).length).toBeGreaterThan(0);
    expect(emptyDraft().answers).toEqual({});
  });

  it("ships the page controls the playtest needs", () => {
    const html = readFileSync(new URL("../feedback/index.html", import.meta.url), "utf8");
    const app = readFileSync(new URL("../feedback/app.mjs", import.meta.url), "utf8");
    const css = readFileSync(new URL("../feedback/form.css", import.meta.url), "utf8");
    expect(html).toContain('lang="en"');
    expect(app).toContain("Add context or write your own answer");
    expect(app).toContain("Confirm & Submit");
    expect(app).toContain("Copy again");
    expect(app).toContain("Download .md");
    expect(app).toContain("← Back to Review / Edit Answers");
    expect(app).toContain("localStorage");
    expect(app).toContain("navigator.clipboard");
    expect(css).toContain("focus-visible");
  });
});
