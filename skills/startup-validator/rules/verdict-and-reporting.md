# Verdict and Reporting Rules

## Verdict format

Use this shape in `verdict.md`:

```text
Verdict: Go | Validate First | Narrow | Pivot | Stop
Raw score: X/100
Evidence confidence: very_low | low | medium | high
Highest evidence level: E0-E7
Dominant evidence level: E0-E7
Riskiest assumption: ...
Next 7-day validation sprint: ...
Kill signal: ...
What would change my mind: ...
```

## Verdict meanings

| Verdict | Meaning | Allowed evidence state |
|---|---|---|
| Go | move forward with focused execution | strong behavior/commitment evidence and no unresolved fatal risk |
| Validate First | do not build big yet; run next sprint | attractive idea but evidence is insufficient |
| Narrow | focus segment, wedge, or use case | broad idea with weak target clarity |
| Pivot | change customer, problem, channel, or business model | evidence contradicts current thesis |
| Stop | stop this direction | critical assumption failed or risk is structurally unacceptable |

## Confidence-adjusted reporting

- A high raw score with low confidence should read as “promising but unproven.”
- A low raw score with high confidence should read as “strong evidence to stop or pivot.”
- Do not hide uncertainty behind decimal precision.
- Explain which single piece of evidence would most change the verdict.

## File-specific report cues

### `thesis.md`

Lead with:

- one-line thesis
- customer/ICP/persona
- current alternative
- why now
- riskiest assumptions
- evidence inventory

### `thiel-scores.md`

For each question include:

- score
- evidence level
- confidence
- rationale
- score-up evidence
- score-down evidence

### `pmf-forces.md`

Include:

- JTBD story
- Push/Pull/Habit/Anxiety
- jobs/pains/gains fit
- PMF stage
- active user / retention / survey readiness caveat
- segment-specific notes for B2B, consumer, marketplace, or regulated ideas

### `verdict.md`

Include:

- verdict block
- critical weaknesses by severity
- next 7-day validation sprint
- 30-day and 90-day roadmap only after the sprint
- kill criteria
- what would change the recommendation

## Tone

- Be founder-friendly but unsentimental.
- Avoid cheerleading.
- Use precise uncertainty language.
- Prefer “what must be true” and “what to test next” over generic advice.
- If evidence is weak, say so plainly.
