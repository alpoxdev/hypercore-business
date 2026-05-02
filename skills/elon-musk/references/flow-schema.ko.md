# Elon Musk (First Principles) Flow Schema

> `.hypercore/elon-musk/[topic-slug]/flow.json`의 JSON schema입니다.

## Required schema

```json
{
  "id": "fp-{topic-slug}-{YYYYMMDD-HHmmss}",
  "skill": "elon-musk",
  "status": "in_progress | completed",
  "created_at": "ISO8601",
  "updated_at": "ISO8601",
  "topic": "topic-slug",
  "request": {
    "problem": "problem description",
    "desired_outcome": "what success looks like"
  },
  "current_phase": "research | deconstruct | redesign | execute",
  "phases": {
    "research": {
      "status": "pending | in_progress | completed",
      "output_file": "research.md"
    },
    "deconstruct": {
      "status": "pending | in_progress | completed",
      "output_file": "assumptions.md",
      "assumptions_count": { "A": 0, "B": 0, "C": 0 }
    },
    "redesign": {
      "status": "pending | in_progress | completed",
      "output_file": "redesign.md",
      "alternatives_count": 0,
      "non_obvious_option_count": 0
    },
    "execute": {
      "status": "pending | in_progress | completed",
      "output_file": "execution.md"
    }
  }
}
```

## Optional fields

이 필드는 older runs를 깨지 않고 추가할 수 있습니다.

```json
{
  "brief_style": "mars-shot",
  "breakthrough_operators": ["algorithm", "limits", "idiot-index"],
  "validation": {
    "persona_safe": true,
    "evidence_checked": true,
    "algorithm_order_checked": true,
    "has_24h_test": true,
    "safety_guardrails_checked": true
  }
}
```

## Phase outputs

| Phase | File | Content |
|---|---|---|
| `research` | `research.md` | Problem restatement, convention map, current facts, source ledger, innovation cases |
| `deconstruct` | `assumptions.md` | A/B/C matrix, Socratic premise attack, deleted/defended conventions, unknowns converted to tests |
| `redesign` | `redesign.md` | Mars-shot brief, magic-wand target, 3-5 alternatives, scoring, recommendation |
| `execute` | `execution.md` | Algorithm gate, bottleneck, inversion, pre-mortem, 24-hour reality test, guardrails |

## Example: initial state

```json
{
  "id": "fp-saas-infra-cost-20260430-100000",
  "skill": "elon-musk",
  "status": "in_progress",
  "created_at": "2026-04-30T10:00:00Z",
  "updated_at": "2026-04-30T10:00:00Z",
  "topic": "saas-infra-cost",
  "request": {
    "problem": "SaaS infrastructure cost is 40% of revenue",
    "desired_outcome": "reduce cost ratio below 15% without degrading reliability"
  },
  "current_phase": "research",
  "brief_style": "mars-shot",
  "breakthrough_operators": [],
  "phases": {
    "research": { "status": "in_progress", "output_file": "research.md" },
    "deconstruct": {
      "status": "pending",
      "output_file": "assumptions.md",
      "assumptions_count": { "A": 0, "B": 0, "C": 0 }
    },
    "redesign": {
      "status": "pending",
      "output_file": "redesign.md",
      "alternatives_count": 0,
      "non_obvious_option_count": 0
    },
    "execute": { "status": "pending", "output_file": "execution.md" }
  },
  "validation": {
    "persona_safe": false,
    "evidence_checked": false,
    "algorithm_order_checked": false,
    "has_24h_test": false,
    "safety_guardrails_checked": false
  }
}
```
