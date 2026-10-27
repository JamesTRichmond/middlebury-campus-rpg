import { z } from "zod";

export const factStatusSchema = z.enum(["verified", "seed", "placeholder"]);

export const factSchema = z
  .object({
    text: z.string().min(1),
    status: factStatusSchema,
    sourceUrl: z.string().url().optional(),
    asOf: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
  })
  .superRefine((fact, ctx) => {
    if (fact.status === "verified" && (!fact.sourceUrl || !fact.asOf)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "verified facts require sourceUrl and asOf",
      });
    }
  });

export const placeSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  region: z.enum(["campus", "town", "outdoors"]),
  unlockedByDefault: z.boolean(),
  summary: z.string().min(1),
  summaryStatus: factStatusSchema,
  facts: z.array(factSchema),
  exits: z.array(z.string()),
  npcIds: z.array(z.string()),
});

export const lineSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  topic: z.string().min(1),
  text: z.string().min(1),
  requiresFlag: z.enum(["firstGen", "international"]).optional(),
  requiresStartTerm: z.enum(["fall", "feb"]).optional(),
  requiresAbility: z.string().optional(),
});

export const npcSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    displayName: z.string().min(1),
    role: z.string().min(1),
    kind: z.enum(["archetype", "sourced-person"]),
    placeId: z.string(),
    sourceUrl: z.string().url().optional(),
    knowsAbout: z.array(z.string()),
    lines: z.array(lineSchema).min(1),
  })
  .superRefine((npc, ctx) => {
    if (npc.kind === "sourced-person" && !npc.sourceUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "sourced-person requires sourceUrl",
      });
    }
  });

export const conditionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("enter-place"),
    placeId: z.string(),
  }),
  z.object({
    type: z.literal("talk-npc"),
    npcId: z.string(),
    lineId: z.string().optional(),
  }),
  z.object({ type: z.literal("add-note") }),
  z.object({
    type: z.literal("finish-lesson"),
    lessonId: z.string(),
  }),
  z.object({
    type: z.literal("ask-question"),
    lessonId: z.string(),
  }),
]);

export const questSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  kind: z.enum(["main", "side"]),
  summary: z.string().min(1),
  requiresInterest: z
    .enum(["outdoors", "arts", "languages", "athletics", "science"])
    .optional(),
  steps: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/),
        text: z.string().min(1),
        on: conditionSchema,
      }),
    )
    .min(1),
  rewards: z.object({
    abilities: z.array(z.string()),
    places: z.array(z.string()),
  }),
});

export const abilitySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  startsUnlocked: z.boolean(),
});

export const lessonStatusSchema = z.enum(["placeholder", "sourced", "official"]);

export const lessonSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  courseLabel: z.string().min(1),
  status: lessonStatusSchema,
  instructorNpcId: z.string(),
  placeId: z.string(),
  blocks: z
    .array(
      z.object({
        id: z.string(),
        kind: z.enum(["explain", "prompt"]),
        text: z.string().min(1),
      }),
    )
    .min(1),
  prompts: z
    .array(
      z.object({
        id: z.string(),
        question: z.string().min(1),
        instructorResponse: z.string().min(1),
      }),
    )
    .min(1),
});

export const calendarNoteSchema = factSchema.and(
  z.object({ id: z.string().regex(/^[a-z0-9-]+$/) }),
);

export const contentSchema = z.object({
  places: z.array(placeSchema).min(1),
  npcs: z.array(npcSchema).min(1),
  quests: z.array(questSchema).min(1),
  abilities: z.array(abilitySchema).min(1),
  lessons: z.array(lessonSchema).min(1),
  calendar: z.array(calendarNoteSchema),
});

export type GameContent = z.infer<typeof contentSchema>;
export type Place = z.infer<typeof placeSchema>;
export type Npc = z.infer<typeof npcSchema>;
export type Quest = z.infer<typeof questSchema>;
