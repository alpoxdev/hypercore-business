#!/usr/bin/env bash
set -euo pipefail

if [ ! -d "skills" ]; then
  echo "No skills directory found." >&2
  exit 1
fi

strip_wrapping_quotes() {
  local value="${1:-}"

  while [ "${#value}" -ge 2 ]; do
    case "$value" in
      \"*\")
        value="${value#\"}"
        value="${value%\"}"
        ;;
      \'*\')
        value="${value#\'}"
        value="${value%\'}"
        ;;
      *)
        break
        ;;
    esac
  done

  printf '%s' "$value"
}

if [ "${OPENAI_GRADING_MODEL+x}" = "x" ]; then
  OPENAI_GRADING_MODEL="$(strip_wrapping_quotes "$OPENAI_GRADING_MODEL")"
  export OPENAI_GRADING_MODEL
fi

skill_count=0
while IFS= read -r skill_file; do
  skill_dir="$(dirname "$skill_file")"
  echo "Validating $skill_dir"
  uvx --from 'git+https://github.com/agentskills/agentskills#subdirectory=skills-ref' \
    skills-ref validate "$skill_dir"
  skill_count=$((skill_count + 1))
done < <(find skills -type f \( -name SKILL.md -o -name skill.md \) | sort)

if [ "$skill_count" -eq 0 ]; then
  echo "No skills found under ./skills"
  exit 0
fi

echo "All skills validated."
