import { describe, expect, it } from "vitest";
import { loadContent } from "../src/content/load";
import { checkContent } from "../src/content/check";
import { arrive, feedbackPath, originSchema, PREVIOUS_SAVE_KEY, readJourney, rideCaption, SAVE_KEY, startArrival, writeJourney, type StorageLike } from "../src/game/arrival";

const content = loadContent();
function memoryStorage() {
  const data = new Map<string, string>();
  return { data, getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); } };
}

describe("D1 arrival", () => {
  it("starts the new save at the actual station with the chosen origin and arrives there", () => {
    const save = startArrival("  Your home region  ", content);
    expect(save.placeId).toBe("middlebury-station");
    expect(save.origin).toBe("Your home region");
    expect(save.arrival.stage).toBe("train");
    expect(arrive(save, content).arrival.stage).toBe("platform");
    expect(arrive(save, content).placeId).toBe("middlebury-station");
    expect(save.unlockedPlaces).not.toContain("downtown");
  });

  it("uses the origin only for the ride caption, not quests, unlocks, abilities or destination", () => {
    const a = startArrival("Home A", content), b = startArrival("Home B", content);
    expect({ ...a, origin: "" }).toEqual({ ...b, origin: "" });
    expect(rideCaption(a, content)).toContain("Home A");
    expect(rideCaption(b, content)).toContain("Home B");
    expect(originSchema.safeParse("   ").success).toBe(false);
    expect(originSchema.safeParse("x".repeat(81)).success).toBe(false);
  });

  it("round-trips arrival and preserves character/access settings, notes and other state", () => {
    const storage = memoryStorage();
    const before = { ...startArrival("Home", content), character: { name: "Me", access: { captions: true } }, notes: [{ id: "note-1", text: "Keep this note" }], quests: { welcome: { stepIndex: 0, done: false } }, doodads: [{ id: "book", slot: "desk" }], futureField: { keep: true } };
    expect(writeJourney(storage, before, content)).toBe(true);
    const after = arrive(before, content);
    expect(writeJourney(storage, after, content)).toBe(true);
    expect(readJourney(storage, content).save).toEqual(after);
    expect(JSON.parse(storage.getItem(PREVIOUS_SAVE_KEY)!)).toEqual(before);
  });

  it.each(["{broken", JSON.stringify({ version: 2 }), JSON.stringify({ ...startArrival("Home", content), placeId: "missing-place" })])("rejects an invalid/unsupported save without applying or overwriting it: %s", (raw) => {
    const storage = memoryStorage();
    storage.data.set(SAVE_KEY, raw);
    const result = readJourney(storage, content);
    expect(result.save).toBeNull();
    expect(result.readOnly).toBe(true);
    expect(result.warning).toBe(content.arrival.loadWarning);
    expect(writeJourney(storage, startArrival("New trip", content), content)).toBe(false);
    expect(storage.getItem(SAVE_KEY)).toBe(raw);
  });

  it("keeps the previous good save when persistence fails and permits an in-memory trip", () => {
    const storage = memoryStorage();
    const good = startArrival("Home", content);
    writeJourney(storage, good, content);
    const blocked: StorageLike = { getItem: storage.getItem, setItem: () => { throw new Error("quota"); } };
    expect(writeJourney(blocked, arrive(good, content), content)).toBe(false);
    expect(readJourney(storage, content).save).toEqual(good);
    expect(readJourney(null, content).warning).toBe(content.arrival.saveWarning);
  });

  it("fails content validation if arrival destination or greeter is removed", () => {
    const broken = structuredClone(content);
    broken.places = broken.places.filter((place) => place.id !== content.arrival.placeId);
    broken.npcs = broken.npcs.filter((npc) => npc.id !== content.arrival.greeterNpcId);
    expect(checkContent(broken, "/missing-gates")).toContain("arrival destination is missing");
    expect(() => startArrival("Home", broken)).toThrow("Arrival destination is missing");
  });

  it("binds the existing feedback form to the demo and exact build version", () => {
    const url = new URL(feedbackPath("a1b2c3"), "https://example.invalid/");
    expect(url.pathname).toBe("/feedback/index.html");
    expect(url.searchParams.get("demo")).toBe("D1-letter-train");
    expect(url.searchParams.get("version")).toBe("a1b2c3");
  });
});
