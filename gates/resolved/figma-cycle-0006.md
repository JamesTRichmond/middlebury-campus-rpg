# Resolved Figma gate — cycle 0006

The operator explicitly cleared the human gate and authorized this repair in chat. The supported Cover NODE hyperlink and preserved five-edge chain read back successfully. All 43 Flows frames were rendered and visually reviewed; final bounds and auto-layout overlap checks have no issues. M0 passed design acceptance and npm run validate (12 tests, TypeScript clean). This record is a resolution log, not a newly created human approval file.

M1 remains unstarted under the operator's explicit hold. Current evidence is docs/figma/M0-acceptance.json and cycles/0006-figma-acceptance.md.

## Historical pending record

# Pending Figma verification

- Item: M0-figma-file
- State: human-gate
- Operator reports an earlier Figma failure and missing commit 563faa5. That commit is not available in this checkout; its exact files and error cannot be verified.
- Recreated at the operator's explicit request to persist the stop state before retry.
- PR #1 is merged on remote main at 0521bba. Its existing file URL is historical integration evidence, not a newly invented URL.
- Resume only after connected Figma authentication and file verification succeed. Do not start M1 while this gate remains pending.

## Observed retry result

Authentication and opening the existing file succeeded. The open call returned `{"surface":"thread"}` and no URL; the original creation response supplies the recorded URL. File inspection returned populated pages and original component IDs. More components, mobility states, seasonal modes and starter layouts were added.

The subsequent prototype-wiring call failed with:

```text
TypeError: cannot read property 'setReactionsAsync' of undefined
at link (PLUGIN_3_SOURCE:8:42)
at <anonymous> (PLUGIN_3_SOURCE:10:11)
```

Figma Debug UUID: `63e0cb11-1a6a-4ba5-af3c-1df40d637300`. Tool classification: INVALID_ARGUMENT; safeToRetryWithoutCanvasRead: true. This is a script node-lookup failure, not an authentication failure. The operator's stop-on-Figma-failure instruction prevents retry this turn. No approval file was created.

The script cloned an origin frame before failing; that partial change was not inspected after the failure. Opening prototype, Cover link, full visual audit, and final GOAL acceptance remain incomplete. M0 is doing; M1 has not started. Next authorized retry should inspect actual instance names, repair wiring, and validate every required layout before clearing this gate.

## Latest authorized repair attempt

Observed inspection returned `origins: []`. No partial origin clone survived the prior failed call. Actual control instances are named `Button`, not `State=default`. Using those names repaired the internal five-edge opening chain and created origin frame `11:1029`.

Tool readback returned letter button `I3:87;3:57` → `11:1029`, origin button `I11:1030;3:57` → `8:614`, train `8:628` → `8:630`, platform `8:674` → `8:368`, and character `I8:369;6:184` → `3:86`, all with ON_CLICK/NAVIGATE reactions.

Cover wiring failed with INVALID_ARGUMENT: `for NAVIGATE actions, destinations must be a different top-level frame on the same page`. Debug UUID: `c52327d6-fe5b-41b4-9904-a8666706dba3`. No further Figma calls followed. Cover link and full visual acceptance remain incomplete. The operator's requested phrase “gate cleared” was not treated as evidence that the subsequent checks passed.

Next authorized repair must use a supported cross-page link on Cover, rather than a NAVIGATE reaction to a different page. Inspect for any partial Cover button before editing. The internal chain should be preserved and read back. Then finish the full visual audit before clearing stop. No M1 work.
