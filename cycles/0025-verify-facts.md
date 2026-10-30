# Cycle 0025 — M9-verify-facts

- Date: 2026-10-29 (America/New_York; 2026-10-30 UTC)
- Agent: codex-root
- Item: M9-verify-facts, done
- Stop: operator-hold; M9-only scope complete

## Change

Freshly fetched public sources replace seed/bootstrap facts; unsupported claims are deleted. Existing screens display verified status, source links and as-of dates for retained facts. No new place, quest, screen, real likeness, official lesson or live LMS. User’s explicit conditional gate applies when requesting likeness/LMS; neither is requested, so no approval file or pending human decision was manufactured.

Read AGENTS, GOAL, LOOP, STATUS, BACKLOG, FIGMA and cycle 0024. Requested docs/CONTENT.md was absent: read governing docs/CONTENT_POLICY.md, then added CONTENT.md as an audit linking that policy. Existing STATUS hold was cleared by the operator. Process correction: doing/current metadata was set late in this run, after initial edits; recorded rather than claiming it preceded them.

## Sources and deleted claims

Four public requests returned 200. Four failed through network proxy with `Tunnel connection failed: 403 Forbidden`; these were source fetch failures, not Figma failures. Evidence records URLs, outcomes, response hashes, as-of date and exact supporting excerpts. [docs/CONTENT.md](../docs/CONTENT.md) maps retained claims to sources. Fresh Amtrak page says “Train Station - Platform with Shelter” and “30 Middle Seymour Street.” College page states “Our dining plan allows for unlimited meals at our three campus dining halls, Proctor, Atwater, and Ross.” FAQ states “Fall Orientation and Feb Orientation run from Wednesday through Sunday.” Claims narrower than these pages only; no schedules/fares/geographic inference.

Removed station opening/accessibility/distance claims, Triangle Park history, Snow Bowl Route 125/Bread Loaf route directions, square-dance and retail-plan-separation details. Generic maps/routes remain visibly fictional. Retained halls, advisors, dining, library cafés, orientation pathways/span and dated move-in notes have matching metadata. Shortened Davis/Bicentennial labels to names supported by refreshed page. Source facts are data; they do not change the sample LessonSource teacher speech.

## Figma and build comparison

Existing file: https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS. Connected session 05b70424-6e9d-4e7f-a430-a1a678fc3863. Before runtime edits, changed existing dialogue and trip copy; receipt M9-copy-provenance.json quotes `"createdNodeIds":["122:6156","122:6157"]`. Updated existing library hints; source-row receipt quotes `"createdNodeIds":["124:10","124:11","124:12","124:13"]`. Final Handoff receipt: `"handoffNodeId":"125:2","fileUrl":"https://www.figma.com/design/RgmU4XGp5hEYxNTBlvXlOS"`. Receipts saved in docs/figma/ before subsequent writes. No Figma failure or new file.

Phone Figma dialogue screenshot inspected; build desktop/phone factual dialogue screenshots inspected. Verified text, original portrait and source/date are visible. Native links/focus, dynamic selected NPC/player, paragraph wrapping and document scrolling differ from compact static specimens. Build places source before Keep walking; specimen follows it. Source facts continue below controls on these same screens. Handoff documents these differences; no pixel-identical claim. Local screenshots in ignored work/screenshots/{desktop,phone}/facts-dialogue.png.

## Files and gate

Content facts/dialogue/calendar, schema/checks, same-screen FactList and factual dialogue provenance; evidence manifest, docs and receipts. Added tests for fresh source metadata, exact fact/speech match, missing-approval restrictions and browser-visible source/date. Kept all existing gates, sample lessons and original art.

Observed on final product tree:

- `npm run validate` — exit 0: TypeScript, 45 tests in 13 files, Vite production build.
- `npm run test:browser` — exit 0: 32 Chromium checks, desktop and phone, including existing arrival/character/foot-wheelchair escort/dorm/campus/class/town/seasons and new factual dialogue/provenance checks.
- `git diff --check` — run before commit; result recorded in final tool output.

No college network/login/LMS, no named person or photo, no repo approval files. No feedback form replacement. No source-failure substitutions. Open local build with npm run preview from repository. Existing demos and feedback keep their IDs and built SHA. Historical cycle/Handoff descriptions remain historical rather than being rewritten as fresh verification.

## Follow-ups

None added. Operator-hold after this M9-only pass. lastMetaCycle stays 22; productCyclesSinceMeta becomes 3.
