import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { checkContent } from "../src/content/check";
import { loadContent } from "../src/content/load";
import { contentSchema, type GameContent } from "../src/content/schema";

describe("seed content", () => {
  const content = loadContent();

  it("loads a connected campus with the orientation arc", () => {
    expect(content.places.length).toBeGreaterThan(8);
    const main = content.quests.find((quest) => quest.id === "orientation");
    expect(main?.kind).toBe("main");
    expect(main?.rewards.abilities).toEqual(["notebook", "meal-plan", "ask-a-question"]);
  });

  it("keeps town and the mountain locked until play opens them", () => {
    const locked = content.places.filter((place) => !place.unlockedByDefault).map((place) => place.id);
    expect(locked.sort()).toEqual(["downtown", "movie-theater", "outdoors", "sample-restaurants", "snow-bowl"]);
  });

  it("starts the fiction at the station and can walk to the dorm", () => {
    const ids = content.places.map((place) => place.id);
    for (const id of ["middlebury-station", "triangle-park", "dorm-room", "snow-bowl"]) {
      expect(ids).toContain(id);
    }
    const welcome = content.quests.find((quest) => quest.id === "welcome");
    expect(welcome?.steps.map((step) => step.id)).toEqual([
      "introduce",
      "through-the-park",
      "your-room",
    ]);
  });

  it("has no sourced people and no official lessons while gates are absent", () => {
    expect(content.npcs.every((npc) => npc.kind === "archetype")).toBe(true);
    expect(content.lessons.every((lesson) => lesson.status === "placeholder")).toBe(true);
  });

  it("rejects a verified fact with no source", () => {
    const broken = structuredClone(content) as GameContent;
    broken.places[0]!.facts.push({ text: "Invented.", status: "verified" });
    const parsed = contentSchema.safeParse(broken);
    expect(parsed.success).toBe(false);
  });

  it("rejects a named person and an official lesson without approval files", () => {
    const root = mkdtempSync(join(tmpdir(), "midd-gates-"));
    mkdirSync(join(root, "gates"));
    const broken = structuredClone(content) as GameContent;
    broken.npcs[0]!.kind = "sourced-person";
    broken.npcs[0]!.sourceUrl = "https://example.edu/person";
    broken.lessons[0]!.status = "official";
    const errors = checkContent(broken, root);
    expect(errors.some((error) => error.includes("real-people"))).toBe(true);
    expect(errors.some((error) => error.includes("live-lms"))).toBe(true);
  });

  it("allows a sourced person only when the gate file names an approver", () => {
    const root = mkdtempSync(join(tmpdir(), "midd-gates-ok-"));
    mkdirSync(join(root, "gates"));
    writeFileSync(join(root, "gates", "real-people.approved"), "approved-by: operator\nscope: one public bio\n");
    const broken = structuredClone(content) as GameContent;
    broken.npcs[0]!.kind = "sourced-person";
    broken.npcs[0]!.sourceUrl = "https://example.edu/person";
    const errors = checkContent(broken, root);
    expect(errors.some((error) => error.includes("real-people"))).toBe(false);
  });
});
