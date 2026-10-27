# Pending Figma verification

- Item: M0-figma-file
- State: human-gate
- Operator reports an earlier Figma failure and missing commit 563faa5. That commit is not available in this checkout; its exact files and error cannot be verified.
- Recreated at the operator's explicit request to persist the stop state before retry.
- PR #1 is merged on remote main at 0521bba. Its existing file URL is historical integration evidence, not a newly invented URL.
- Resume only after connected Figma authentication and file verification succeed. Do not start M1 while this gate remains pending.
