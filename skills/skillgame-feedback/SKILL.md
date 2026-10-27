# Skillgame feedback

Use this when turning a topic, a question list, or a playtest into interactive question cards. The Middlebury RPG playtest already exists at [feedback/index.html](../../feedback/index.html). Extend that form. Do not replace it with a third-party survey.

## Pre-flight

Before you build a **new** card deck from new material, reply with a short outline only:

- how many sections and questions
- which items are single, multi (with the max), rank, or matrix
- whether anything will be reworded

Then wait for confirmation. If the host cannot run a web page, say so and offer the existing static form plus `npm run feedback` instead of pretending a native widget exists.

This playtest was confirmed by the operator on 2026-10-27. Do not wait again to keep using it.

## Fidelity

If you were given existing questions, keep their exact wording, options, explanations, numbering, and order. Do not change substance to make them prettier. New questions go at the end of a section or in a new section.

There is no fixed number of choices. Every multi-select states its max in the question data (`selectMax`) and on screen.

Every question has a collapsible field labeled exactly: `Add context or write your own answer`.

## The page

One question per card. Show the current number, the total, the section name, and a progress bar.

- Single: radio buttons
- Multi: checkboxes that refuse more than `selectMax`
- Rank: move up and move down
- Matrix: one radio group per row

Back and Next keep answers. Skip is allowed. Unanswered questions can be listed and opened. The review screen groups by section and each item has Edit. Confirm & Submit does not require every question.

## Memory

Wrap `localStorage` in try/catch. Persist answers, context, step, demo, and version continuously.

On submit, build Markdown that includes this report and the previous submission stored in that browser, plus a "what changed" list. Copy it with `navigator.clipboard.writeText`, then a textarea fallback. The submit screen must show:

1. `Copied to clipboard — paste directly into chat.` when the copy works
2. The report, a `Copy again` button, and a `Download .md` button
3. `← Back to Review / Edit Answers`

Never end on a dead screen.

## After a paste

The agent saves the Markdown in `feedback/inbox/` and treats regressions as the next cycle. See [LOOP.md](../../LOOP.md).
