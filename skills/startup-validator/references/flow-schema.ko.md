# Startup Validator Flow Schema (Korean)

> `.hypercore/startup-validator/[topic-slug]/flow.json`의 JSON schema입니다.

## Required schema

```json
{
  "id": "sv-{topic-slug}-{YYYYMMDD-HHmmss}",
  "skill": "startup-validator",
  "status": "in_progress | completed",
  "created_at": "ISO8601",
  "updated_at": "ISO8601",
  "topic": "topic-slug",
  "request": {
    "idea": "startup idea description",
    "context": "additional context if any",
    "desired_decision": "go | validate | narrow | pivot | stop | unknown"
  },
  "current_phase": "frame | score | pmf | verdict",
  "phases": {
    "frame": { "status": "pending | in_progress | completed", "output_file": "thesis.md" },
    "score": { "status": "pending | in_progress | completed", "output_file": "thiel-scores.md" },
    "pmf": { "status": "pending | in_progress | completed", "output_file": "pmf-forces.md" },
    "verdict": {
      "status": "pending | in_progress | completed",
      "output_file": "verdict.md",
      "raw_score": null,
      "confidence_adjusted_verdict": null
    }
  }
}
```

## Optional evidence and validation fields

```json
{
  "evidence_summary": {
    "highest_level": "E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7",
    "dominant_level": "E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7",
    "confidence": "very_low | low | medium | high"
  },
  "validation": {
    "raw_score": null,
    "confidence_adjusted_verdict": "Go | Validate First | Narrow | Pivot | Stop | pending",
    "next_sprint_defined": false,
    "kill_criteria_defined": false,
    "ai_not_counted_as_customer_evidence": true,
    "pmf_claim_checked": false
  }
}
```

## Phase outputs

| Phase | File | Content |
|---|---|---|
| `frame` | `thesis.md` | One-line thesis, ICP/persona, current alternative, hypotheses, evidence inventory |
| `score` | `thiel-scores.md` | 7 questions: score, evidence level, confidence, rationale, what changes score |
| `pmf` | `pmf-forces.md` | JTBD forces, VPC fit, PMF stage, customer-pull signals, segment caveats |
| `verdict` | `verdict.md` | Raw score, confidence-adjusted verdict, weaknesses, 7-day sprint, kill criteria |

## Example: initial state

```json
{
  "id": "sv-b2b-purchasing-automation-20260430-100000",
  "skill": "startup-validator",
  "status": "in_progress",
  "created_at": "2026-04-30T10:00:00Z",
  "updated_at": "2026-04-30T10:00:00Z",
  "topic": "b2b-purchasing-automation",
  "request": {
    "idea": "B2B purchasing automation for mid-market finance teams",
    "context": "early concept, no paid pilot yet",
    "desired_decision": "validate"
  },
  "current_phase": "frame",
  "evidence_summary": {
    "highest_level": "E1",
    "dominant_level": "E0",
    "confidence": "very_low"
  },
  "phases": {
    "frame": { "status": "in_progress", "output_file": "thesis.md" },
    "score": { "status": "pending", "output_file": "thiel-scores.md" },
    "pmf": { "status": "pending", "output_file": "pmf-forces.md" },
    "verdict": {
      "status": "pending",
      "output_file": "verdict.md",
      "raw_score": null,
      "confidence_adjusted_verdict": null
    }
  },
  "validation": {
    "raw_score": null,
    "confidence_adjusted_verdict": "pending",
    "next_sprint_defined": false,
    "kill_criteria_defined": false,
    "ai_not_counted_as_customer_evidence": true,
    "pmf_claim_checked": false
  }
}
```
