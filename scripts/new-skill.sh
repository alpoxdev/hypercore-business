#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <skill-name>" >&2
  exit 1
fi

skill_name="$1"

if ! [[ "$skill_name" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "Error: skill-name must match ^[a-z0-9]+(-[a-z0-9]+)*$" >&2
  exit 1
fi

skill_dir="skills/$skill_name"

if [ -e "$skill_dir" ]; then
  echo "Error: $skill_dir already exists" >&2
  exit 1
fi

mkdir -p "$skill_dir/references" "$skill_dir/assets"

cat > "$skill_dir/SKILL.md" <<TEMPLATE
---
name: $skill_name
description: Describe the business, marketing, or design workflow this skill supports and when to use it.
compatibility: All
metadata:
  author: your-name
  version: "0.1.0"
---

# $skill_name

## Available scripts

- \\`scripts/example.sh\\` - Describe what it does.

## Workflow

1. Explain when and how to run each script.
2. Keep commands non-interactive.
3. Return structured output (JSON/CSV/TSV) whenever possible.
TEMPLATE

echo "Created skill at: $skill_dir"
