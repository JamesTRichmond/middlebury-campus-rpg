# Cycle 0011 — R2-D2-preview

Date: 2026-10-28. Result: done. Source build: 28aa39ff5fe2a8a0abccd03d0ff6219dfb1e9f06. Stop: operator-hold; M3 explicitly forbidden.

## Player report and repair

The operator reported that D2 on 9264cd7 displayed numbered skin choices without examples and no discoverable picture; making yourself should be visual. Saved the report under feedback/inbox/2026-10-28-D2-character-9264cd7.md and put the repair first. No previous report or positive change was supplied.

The same character now appears prominently before the controls, remains visible as controls scroll, and stays visible on completion. Skin uses eight named, colored swatches with a selected check. Figure source is an original 64×80 layered pixel drawing, displayed at 3× desktop and 2× phone. Body, ten hairstyles including coils/braids/locs, hair colors, facial hair, distinct head coverings, foot/wheelchair/another-aid view, clothes, clothes colors, trousers/skirt, glasses, scarf and bag all update that figure. No nonvisual cosmetics or perfume options were added. Name, pronouns, access, mobility and uninferred opt-ins remain.

## Frame before code

Used the connected integration in the existing file https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. Read the former creator, then drew four figure examples, 46 choice specimens and two preview-first layouts before application implementation. Created frame IDs 57:3098 / 57:3213 and figure review 56:429. Figma geometry became dynamic SVG rectangles; no screenshot is an app asset. Reused existing palette, skin variables and Atkinson font. Improved eye contrast on deep tones in Figma before applying the same change to the renderer.

Exact wiring receipt: {"mutatedNodeIds":["51:3340","53:3267","53:3275"],"desktop":"57:3098","phone":"57:3213","saveDestinations":["53:3263","53:3271"],"contentId":"character-creator"}. Handoff receipt: {"createdNodeIds":["61:2"],"contentId":"character-creator","frames":["57:3098","57:3213"],"publicUrl":null}. Full original creation receipts are in docs/figma/D2-preview-repair.json.

Viewed desktop/phone Figma layouts and figure review, then local initial/scrolled phone and desktop screenshots. Native form chrome and expanded optional rows differ from compact design specimens; the prototype sample uses different selected hair/skin. These differences are recorded on Handoff. No invented file/prototype/public URL.

## Observed verification

npm run validate exited 0: 24 tests, TypeScript and production build passed. npm run test:browser exited 0: 12 desktop/phone Chromium checks passed. git diff --check passed.

New browser regression compares cropped rendered figure PNGs for every named visual option, checks skin swatches and selected state, verifies initial visibility and visibility after scrolling to Bag, and compares the same figure after save/reload. The test normalizes scroll position for pixel comparisons; integer line heights avoid fractional placement. A Node JSON import-attribute issue and a test-edit syntax error were repaired. An intermediate strict PNG reload comparison at different scroll positions exposed raster-position differences; comparisons now use the same position and sticky visibility has its own independent assertion. No assertion was removed or loosened.

Legacy version-1 characters lacking wardrobe fields retain old skin/hair/name/mobility/access and get default clothing. A new round-trip test preserves clothes, accessories, notes and saved state. Existing arrival, invalid-save, blocked-storage, optional-choice and access tests stay passing. No new positive player acceptance is claimed.

## Handoff

Local, from repository folder: npm ci && npm run validate && npm run preview. Platform → Create your character. Completion Give feedback binds D2-character and the actual built SHA. Tested source is 28aa39ff5fe2a8a0abccd03d0ff6219dfb1e9f06; later completion metadata does not change the app. Updated DEMOS, FIGMA, BACKLOG and STATUS. Five product cycles since meta triggers cycles/meta-0011.md, which records process fixes only. M3 remains unstarted.
