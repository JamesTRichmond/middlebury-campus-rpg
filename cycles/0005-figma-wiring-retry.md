# Cycle 0005 — M0-figma-file wiring retry

- Agent: codex-root
- Item: M0-figma-file
- Stop: human-gate

## Observed results

Read the requested project files and pending gate. Connected inspection returned `origins: []`, so no partial origin clone persisted. It returned actual instance names `Button`, explaining the prior failed `State=default` lookup.

The repair created origin frame `11:1029` and read back five ON_CLICK/NAVIGATE edges: letter → origin → train → platform → character → letter. The original file URL was reused without change.

The next call attempted a Cover NAVIGATE reaction to the Flows page. It failed: `for NAVIGATE actions, destinations must be a different top-level frame on the same page`. Debug UUID c52327d6-fe5b-41b4-9904-a8666706dba3; INVALID_ARGUMENT. The operator required stop on another integration failure, so no further Figma reads, writes, or visual checks followed. Partial Cover-button state is unknown.

Quote and full tool results: docs/figma/M0-wiring-retry-evidence.json. No screens were designed only in code. Full acceptance and Cover linking remain incomplete; M0 stays doing. M1 was not started. No stop flag was cleared based solely on the requested phrase “gate cleared.”

## Gate

Observed: npm run validate exited 0 (12 tests passed, TypeScript clean). git diff --check exited 0.
