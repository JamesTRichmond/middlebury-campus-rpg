import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { checkContent } from "./check";
import { contentSchema, type GameContent } from "./schema";

export function repoRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "..", "..");
}

function readJson(root: string, path: string): unknown {
  return JSON.parse(readFileSync(join(root, path), "utf8")) as unknown;
}

export function loadContent(root = repoRoot()): GameContent {
  const parsed = contentSchema.parse({
    arrival: readJson(root, "content/arrival.json"),
    places: readJson(root, "content/places.json"),
    npcs: readJson(root, "content/npcs.json"),
    quests: readJson(root, "content/quests/quests.json"),
    abilities: readJson(root, "content/abilities.json"),
    lessons: readJson(root, "content/lessons.json"),
    calendar: readJson(root, "content/calendar.json"),
  });
  const errors = checkContent(parsed, root);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
  return parsed;
}
