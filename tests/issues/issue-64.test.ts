import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { it, expect } from "vitest";
import { defaultCharacter } from "../../src/game/character";
import { rangeControls, defaultRange } from "../../src/game/character-range";
import { CharacterPreview } from "../../src/ui/CharacterPreview";

it("shows each voiceLabel in the preview caption", () => {
  const control = rangeControls.find((c) => c.key === "voiceLabel")!;
  for (const option of control.options) {
    const html = renderToStaticMarkup(createElement(CharacterPreview, {
      value: { ...defaultCharacter, range: { ...defaultRange, voiceLabel: option } },
    }));
    expect(html).toContain("Voice: " + option);
  }
});
