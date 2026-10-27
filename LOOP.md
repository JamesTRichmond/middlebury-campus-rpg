# Loop

Run this until a stop condition. One cycle is one backlog item, one gate, one cycle report, then the next cycle in the same session.

## Session start

1. Confirm you are at the repository root of `JamesTRichmond/middlebury-campus-rpg`.
2. Read the session list in [GOAL.md](GOAL.md).
3. If `STATUS.md` field `stop` is anything other than `none`, obey it. Do not implement.
4. If `lock` is set to a different agent and you were not assigned an item, stop and say who holds the lock. If `lock` is empty, set it to your agent name and continue as integrator.

## One cycle

1. Choose the single highest item in [BACKLOG.md](BACKLOG.md) whose `status` is `ready` and whose `blockedBy` entries are all `done`. Bugs filed above the current feature outrank the feature. Do not skip ahead.
2. Set that item to `doing` and set `STATUS.md` `current` to its id before product edits.
3. Implement only that item. Match [DECISIONS.md](DECISIONS.md). If you must change a decision, add a new decision that supersedes it. Do not silently diverge.
4. Run every command in that item's `gate`. Each must exit 0. A gate you did not run counts as a failure. `npm run validate` is the floor for any code or content change.
5. On failure, fix the cause. Do not weaken the test, delete the assertion, or stub a success. After three failed attempts on the same item, set it to `blocked`, write the error in the cycle report, set `stop: blocked`, and stop.
6. If the item has `humanGate: yes`, do not mark it done. Write `gates/PENDING-<id>.md` describing the decision the operator must make, set `stop: human-gate`, and stop.
7. On success:
   - Set the item to `done` and add the date and the commit subject.
   - Copy [cycles/TEMPLATE.md](cycles/TEMPLATE.md) to `cycles/NNNN-slug.md` using the next number.
   - Update [STATUS.md](STATUS.md): `cycle`, `current` cleared to `none`, `lastGate`, `next`, and one index line. Keep STATUS under 120 lines. Do not paste a diary there.
   - Commit as `cycle NNNN: <item id>`.
8. If this success makes five product cycles since the last meta cycle, the next cycle is a meta cycle (below), not the next feature.
9. Otherwise begin the next cycle now. Do not ask "should I continue?"

## Meta cycle

1. Read the last five `cycles/*.md` reports, excluding older meta reports.
2. Name repeated failures, skipped gates, flaky checks, or content-policy drift.
3. Add at most three `ready` items tagged `meta` that remove that friction. Put player-facing bug fixes first.
4. You may tighten tests. You may not add a place, quest, ability, or screen the player has not already been promised.
5. Write `cycles/meta-NNNN.md`.
6. Set `lastMetaCycle` in STATUS.
7. Continue with the next product item unless a stop condition fired.

## Stop conditions

Stop, and say which one in the last line of your handoff:

| `stop` value | When |
| --- | --- |
| `human-gate` | A required approval file is missing or you opened `gates/PENDING-*.md` |
| `blocked` | The same item failed its gate three times |
| `operator-hold` | The operator said stop, or STATUS was set to this |
| `backlog-empty` | Nothing is `ready` or `doing`. Write what you would do next if scope were extended. Do not invent that scope. |

Empty backlog is success, not a cue to brainstorm a sequel in the same session.

## Parallel agents

- The integrator is the agent named in `lock`. Only the integrator edits `STATUS.md`, backlog order, and `DECISIONS.md`.
- A worker takes one item whose `owner` is their name, on branch `cycle/<id>`, and opens a pull request. They do not merge it.
- Do not push to the default branch if your host assigned a task branch or forbids direct pushes. In that case the cycle ends at the open PR, STATUS stays honest (`doing` until merge), and you may start a non-overlapping `ready` item only if the integrator assigned it.
- Never force-push, amend published commits, or discard another agent's work.

## Handoff shape

When a stop condition hits, report only: current cycle number, item id, gate commands and their real results, commit or PR, and the stop reason. No process essay.
