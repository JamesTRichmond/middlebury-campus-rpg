import { z } from 'zod';
import raw from '../../content/character-range.json';

// These stable keys define the saved contract. Named choices/defaults live in content.
const rangeKeys = ['buildKind','surfaceColor','furLength','guardHairStiffness','undercoatDensity','crimp','pattern1','pattern2','pattern3','pattern4','pattern5','wetness','muzzleProportion','follicleProminence','whiskerLength','coreTranslucency','chitinIridescence','floraGrowth','hypermobilityPose','fatDistribution','muscleDistribution','vascularity','sclera','iris','limbalRing','eyeShine','pupilRange','thirdEyelid','dyeGrowth','colorFade','cowlick','toothMarks','tongueShape','wardrobePreset','baseLayer','outerwear','accessory','fabricWeight','weathering','prostheticStyle','exposedTech','graftBlend','voiceLabel','chest','walkRig','stimmingIdle','gazeComfort','posture','frameColor','spokeMarks','stepTrail','vocalFilter'] as const;
export type RangeKey = typeof rangeKeys[number];
const controlSchema = z.object({
  key: z.enum(rangeKeys),
  label: z.string().min(1),
  group: z.enum(['Biological', 'Face', 'Wardrobe', 'Prosthetics', 'Access and behavior', 'Footprint']),
  options: z.array(z.string().min(1)).nonempty(),
  default: z.string().min(1),
  description: z.string().min(1),
}).strict().superRefine((control, ctx) => {
  if (!control.options.includes(control.default)) ctx.addIssue({code:'custom', message:'Default must be a named option'});
  if (new Set(control.options).size !== control.options.length) ctx.addIssue({code:'custom', message:'Duplicate named option'});
});
const descriptor = z.object({
  id: z.literal('character-range'),
  controls: z.array(controlSchema),
}).strict().superRefine((value, ctx) => {
  const keys = new Set(value.controls.map(control => control.key));
  if (keys.size !== value.controls.length || rangeKeys.some(key => !keys.has(key))) {
    ctx.addIssue({code:'custom', message:'Every saved range key must have exactly one control'});
  }
}).parse(raw);
export const rangeControls = descriptor.controls;
export const defaultRange = Object.fromEntries(rangeControls.map(control => [control.key, control.default])) as Record<RangeKey, string>;
const shape = Object.fromEntries(rangeControls.map(control => [
  control.key, z.enum(control.options).default(control.default),
])) as Record<RangeKey, z.ZodDefault<z.ZodEnum<[string, ...string[]]>>>;
// Only five named pattern slots are accepted. Unknown keys and choices reject the save.
export const characterRangeSchema = z.object(shape).strict();
export type CharacterRange = z.infer<typeof characterRangeSchema>;
