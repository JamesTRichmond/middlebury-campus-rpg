import type { GameContent } from "./schema";
import { gateAllows } from "./gates";

export function checkContent(content: GameContent, root: string): string[] {
  const errors: string[] = [];
  const placeIds = new Set(content.places.map((place) => place.id));
  const npcIds = new Set(content.npcs.map((npc) => npc.id));
  const abilityIds = new Set(content.abilities.map((ability) => ability.id));
  const lessonIds = new Set(content.lessons.map((lesson) => lesson.id));
  const peopleAllowed = gateAllows(root, "real-people.approved");
  const likenessAllowed = peopleAllowed || gateAllows(root, "likeness.approved");
  const officialLessonsAllowed = gateAllows(root, "live-lms.approved");

  if (!placeIds.has(content.arrival.placeId)) errors.push("arrival destination is missing");
  const greeter = content.npcs.find((npc) => npc.id === content.arrival.greeterNpcId);
  if (!greeter || greeter.placeId !== content.arrival.placeId) {
    errors.push("arrival greeter is missing or stationed elsewhere");
  }

  if (new Set(placeIds).size !== content.places.length) {
    errors.push("duplicate place id");
  }
  if (new Set(npcIds).size !== content.npcs.length) {
    errors.push("duplicate npc id");
  }
  if (new Set(abilityIds).size !== content.abilities.length) {
    errors.push("duplicate ability id");
  }
  if (new Set(lessonIds).size !== content.lessons.length) {
    errors.push("duplicate lesson id");
  }

  const npcsByPlace = new Map<string, string[]>();
  for (const npc of content.npcs) {
    if (!placeIds.has(npc.placeId)) {
      errors.push(`npc ${npc.id} placeId ${npc.placeId} does not exist`);
    }
    const list = npcsByPlace.get(npc.placeId) ?? [];
    list.push(npc.id);
    npcsByPlace.set(npc.placeId, list);
    if (npc.kind === "sourced-person" && !peopleAllowed) {
      errors.push(`npc ${npc.id} is a sourced person without gates/real-people.approved`);
    }
    if (!likenessAllowed) {
      const blob = `${npc.displayName}\n${npc.lines.map((line) => line.text).join("\n")}`.toLowerCase();
      if (blob.includes("baucom") || blob.includes("president of middlebury") || blob.includes("president of the college")) {
        errors.push(`npc ${npc.id} names a real office-holder without gates/likeness.approved`);
      }
    }
    const lineIds = npc.lines.map((line) => line.id);
    if (new Set(lineIds).size !== lineIds.length) {
      errors.push(`npc ${npc.id} has duplicate line ids`);
    }
  }

  for (const place of content.places) {
    for (const exit of place.exits) {
      if (!placeIds.has(exit)) errors.push(`place ${place.id} exits to missing ${exit}`);
      if (exit === place.id) errors.push(`place ${place.id} exits to itself`);
    }
    const expected = [...(npcsByPlace.get(place.id) ?? [])].sort();
    const listed = [...place.npcIds].sort();
    if (expected.join() !== listed.join()) {
      errors.push(
        `place ${place.id} npcIds [${listed.join(", ")}] != npcs stationed there [${expected.join(", ")}]`,
      );
    }
    if (!place.unlockedByDefault) {
      const linked = content.places.some(
        (other) => other.id !== place.id && other.exits.includes(place.id),
      );
      if (!linked) errors.push(`locked place ${place.id} is not an exit from anywhere`);
    }
  }

  for (const quest of content.quests) {
    const stepIds = quest.steps.map((step) => step.id);
    if (new Set(stepIds).size !== stepIds.length) {
      errors.push(`quest ${quest.id} has duplicate step ids`);
    }
    for (const step of quest.steps) {
      if (step.on.type === "enter-place" && !placeIds.has(step.on.placeId)) {
        errors.push(`quest ${quest.id} step ${step.id} enters missing place`);
      }
      if (step.on.type === "talk-npc") {
        const npcId = step.on.npcId;
        const lineId = step.on.lineId;
        const npc = content.npcs.find((item) => item.id === npcId);
        if (!npc) errors.push(`quest ${quest.id} step ${step.id} talks to missing npc`);
        if (npc && lineId && !npc.lines.some((line) => line.id === lineId)) {
          errors.push(`quest ${quest.id} step ${step.id} missing line ${lineId}`);
        }
      }
      if (
        (step.on.type === "finish-lesson" || step.on.type === "ask-question") &&
        !lessonIds.has(step.on.lessonId)
      ) {
        errors.push(`quest ${quest.id} step ${step.id} missing lesson`);
      }
    }
    for (const abilityId of quest.rewards.abilities) {
      if (!abilityIds.has(abilityId)) {
        errors.push(`quest ${quest.id} rewards missing ability ${abilityId}`);
      }
    }
    for (const placeId of quest.rewards.places) {
      const place = content.places.find((item) => item.id === placeId);
      if (!place) errors.push(`quest ${quest.id} unlocks missing place ${placeId}`);
      if (place?.unlockedByDefault) {
        errors.push(`quest ${quest.id} unlocks ${placeId}, which is already open`);
      }
    }
  }

  for (const lesson of content.lessons) {
    if (!placeIds.has(lesson.placeId)) errors.push(`lesson ${lesson.id} missing place`);
    if (!npcIds.has(lesson.instructorNpcId)) errors.push(`lesson ${lesson.id} missing instructor`);
    if (lesson.status === "official" && !officialLessonsAllowed) {
      errors.push(`lesson ${lesson.id} is official without gates/live-lms.approved`);
    }
    if (lesson.status === "placeholder" && /official middlebury course/i.test(lesson.courseLabel)) {
      errors.push(`lesson ${lesson.id} placeholder claims to be an official course`);
    }
  }

  if (!content.abilities.some((ability) => ability.id === "campus-sense" && ability.startsUnlocked)) {
    errors.push("campus-sense must exist and start unlocked");
  }

  return errors;
}
