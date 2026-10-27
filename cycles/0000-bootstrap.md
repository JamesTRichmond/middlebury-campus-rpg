# Cycle 0000 — bootstrap

- Date: 2026-10-27
- Agent: environment setup (not a product cycle)
- Item: bootstrap
- Stop after this cycle: no

## Change

No player-facing game. The repo is the agent environment: goal, loop, decisions, backlog, content seeds, and a validator that fails closed on invented people, unofficial-as-official lessons, dangling ids, and verified facts with no source.

## Files

- GOAL.md, LOOP.md, AGENTS.md, BACKLOG.md, STATUS.md, DECISIONS.md
- content/*, src/content/*, tests/content.test.ts

## Gate

`npm run validate` was run on this tree before the seed commit: Vitest 6 tests passed and `tsc --noEmit` exited 0. GitHub Actions workflow `.github/workflows/validate.yml` repeats that on push and pull request. The first integrator still re-runs it at session start and treats a failure as a blocker, not as a cue to skip M1.

## Follow-ups

None. Next item is `M1-shell`.
