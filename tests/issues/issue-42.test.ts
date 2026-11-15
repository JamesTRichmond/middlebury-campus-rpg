import { it, expect } from "vitest";
import { defaultCharacter } from "../../src/game/character";
import { rangeControls, defaultRange } from "../../src/game/character-range";
import { portraitShapes } from "../../src/game/character-portrait";
import { rangeSpriteShapes } from "../../src/game/character-sprite";
import { creator } from "../../src/game/character";
import type { PixelShape } from "../../src/game/character-art";

function pixels(shapes: PixelShape[], width: number, height: number) {
  const colors: Record<string, string> = { paper: "#f6ebd6", ink: "#302d28", pine: "#305c4d", gold: "#d6a45c", stone: "#a69d90", snow: "#e8f0ec", grass: "#879a6d", ...Object.fromEntries(creator.skinTones.map((t) => ["skin-" + t.id, t.hex])) };
  const raster = Array(width * height).fill(colors.paper);
  for (const s of shapes) {
    for (let y = s.y; y < s.y + s.h; y++) for (let x = s.x; x < s.x + s.w; x++) raster[y * width + x] = colors[s.color];
  }
  return raster.join("");
}

it("changes the portrait when muscleDistribution changes", () => {
  const control = rangeControls.find((c) => c.key === "muscleDistribution")!;
  const images = control.options.map((option) => pixels(portraitShapes({ ...defaultCharacter, ...defaultRange, muscleDistribution: option }), 160, 180));
  expect(new Set(images).size).toBe(control.options.length);
});
