# Human gates

An approval is a small text file in this directory. Until the file exists, the related action is forbidden and tests must fail if content tries it anyway.

| File | Allows |
| --- | --- |
| `real-people.approved` | NPCs with `kind: "sourced-person"` |
| `live-lms.approved` | Lessons with `status: "official"` and any network lesson adapter |

Each approval file must contain a line `approved-by:` naming the operator, plus one sentence of scope. Do not create these files yourself. Opening `PENDING-<backlog-id>.md` and setting `stop: human-gate` is how you ask.
