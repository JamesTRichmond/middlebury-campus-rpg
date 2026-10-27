#!/usr/bin/env bash
set -euo pipefail

# Codex Cloud checks this repo out under /workspace/<repo-name>.
ROOT="/workspace/middlebury-campus-rpg"
if [[ ! -f "$ROOT/package.json" ]]; then
  ROOT="$(pwd)"
fi
cd "$ROOT"

node -e 'const major = Number(process.versions.node.split(".")[0]); if (major < 20) { console.error("Need Node >= 20, got " + process.versions.node); process.exit(1); }'

npm ci
npm run validate
echo "middlebury-campus-rpg install complete. validate passed."
