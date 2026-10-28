import { z } from "zod";
import type { GameContent } from "../content/schema";

export const SAVE_KEY = "midd-campus-rpg.save.v1";
export const PREVIOUS_SAVE_KEY = `${SAVE_KEY}.previous`;
export const DEMO_ID = "D1-letter-train";
export const originSchema = z.string().trim().min(1).max(80);

export const saveSchema = z.object({
  version: z.literal(1),
  origin: originSchema,
  placeId: z.string().min(1),
  arrival: z.object({ stage: z.enum(["train", "platform"]), beat: z.number().int().min(0).max(2).default(0) }).passthrough(),
  character: z.object({}).passthrough().nullable(),
  notes: z.array(z.object({ id: z.string(), text: z.string(), placeId: z.string().optional(), lessonId: z.string().optional() }).passthrough()),
  quests: z.record(z.object({ stepIndex: z.number().int().nonnegative(), done: z.boolean() }).passthrough()),
  abilities: z.array(z.string()),
  unlockedPlaces: z.array(z.string()),
  doodads: z.array(z.object({ id: z.string(), slot: z.string() }).passthrough()),
  seasonView: z.enum(["spring", "summer", "fall", "winter"]),
}).passthrough();

export type Save = z.infer<typeof saveSchema>;
export type StorageLike = Pick<Storage, "getItem" | "setItem">;

function parseSave(value: unknown, content: GameContent): Save {
  const save = saveSchema.parse(value);
  if (!content.places.some((place) => place.id === save.placeId)) throw new Error("Saved place is missing.");
  return save;
}

export function startArrival(origin: string, content: GameContent): Save {
  const destination = content.places.find((place) => place.id === content.arrival.placeId);
  if (!destination) throw new Error("Arrival destination is missing.");
  return parseSave({
    version: 1, origin: originSchema.parse(origin), placeId: destination.id,
    arrival: { stage: "train" }, character: null, notes: [], quests: {}, doodads: [],
    abilities: content.abilities.filter((ability) => ability.startsUnlocked).map((ability) => ability.id),
    unlockedPlaces: content.places.filter((place) => place.unlockedByDefault).map((place) => place.id),
    seasonView: "fall",
  }, content);
}

export function arrive(save: Save, content: GameContent): Save {
  return parseSave({ ...save, placeId: content.arrival.placeId, arrival: { ...save.arrival, stage: "platform" } }, content);
}

export function rideCaption(save: Save, content: GameContent): string {
  return content.arrival.trainCaption.replace("{origin}", () => save.origin);
}

export function readJourney(storage: StorageLike | null, content: GameContent): { save: Save | null; readOnly: boolean; warning?: string } {
  if (!storage) return { save: null, readOnly: true, warning: content.arrival.saveWarning };
  let raw: string | null;
  try { raw = storage.getItem(SAVE_KEY); }
  catch { return { save: null, readOnly: true, warning: content.arrival.saveWarning }; }
  if (raw === null) return { save: null, readOnly: false };
  try { return { save: parseSave(JSON.parse(raw), content), readOnly: false }; }
  catch { return { save: null, readOnly: true, warning: content.arrival.loadWarning }; }
}

export function writeJourney(storage: StorageLike | null, save: Save, content: GameContent): boolean {
  const checked = parseSave(save, content);
  if (!storage) return false;
  try {
    const previous = storage.getItem(SAVE_KEY);
    // Preserve unknown/corrupt/future saves rather than overwriting them with a new trip.
    if (previous !== null) {
      parseSave(JSON.parse(previous), content);
      storage.setItem(PREVIOUS_SAVE_KEY, previous);
    }
    storage.setItem(SAVE_KEY, JSON.stringify(checked));
    return true;
  } catch { return false; }
}

export function feedbackPath(version: string): string {
  return `feedback/index.html?${new URLSearchParams({ demo: DEMO_ID, version })}`;
}

export function advanceRide(save: Save, content: GameContent): Save {
  if (save.arrival.stage !== "train") return save;
  return save.arrival.beat === 2 ? arrive(save, content) : parseSave({ ...save, arrival: { ...save.arrival, beat: save.arrival.beat + 1 } }, content);
}
export function replayArrival(save: Save, origin: string, content: GameContent): Save {
  return parseSave({ ...save, origin: originSchema.parse(origin), arrival: { ...save.arrival, stage: "train", beat: 0 } }, content);
}
