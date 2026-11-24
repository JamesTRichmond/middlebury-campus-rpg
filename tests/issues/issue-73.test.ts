import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { it, expect } from "vitest";
import { defaultCharacter } from "../../src/game/character";
import { rangeControls, defaultRange } from "../../src/game/character-range";
import { CharacterPreview } from "../../src/ui/CharacterPreview";

it("shows each vocalFilter in the preview caption", () => {
  const control = rangeControls.find((c) => c.key === "vocalFilter")!;
  for (const option of control.options) {
    const html = renderToStaticMarkup(createElement(CharacterPreview, {
      value: { ...defaultCharacter, range: { ...defaultRange, vocalFilter: option } },
    }));
    expect(html).toContain("Filter: " + option);
  }
});
