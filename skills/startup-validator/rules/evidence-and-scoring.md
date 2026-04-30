# Evidence and Scoring Rules

## Evidence discipline

- Separate facts, assumptions, founder claims, AI-generated hypotheses, and customer behavior.
- If the prompt lacks evidence, mark affected scores as provisional and lower confidence.
- Prefer behavior, traction, payment, retention, and qualified commitments over hypothetical enthusiasm.
- Treat market reports and competitor scans as context, not demand proof.
- Treat AI personas, synthetic users, and model-generated market claims as hypothesis inputs only.

## Evidence ladder

| Level | Evidence | Use |
|---|---|---|
| E0 | founder intuition, AI/persona simulation, friends' opinions | hypothesis generation only |
| E1 | desk research, market reports, competitor scans | market context, weak demand signal |
| E2 | Mom-Test-style problem interviews with target customers | problem reality signal |
| E3 | repeated organic problem language, workarounds, forum pain, manual spend | behavior/proxy demand signal |
| E4 | qualified waitlist, booked calls, data sharing, strong outbound replies | intent signal; quality depends on ICP fit |
| E5 | LOI, pre-order, deposit, paid pilot, design partner with success criteria | commitment signal |
| E6 | repeat usage, retention, expansion, referrals, willingness to pay | solution evidence |
| E7 | PMF pull: 40%+ very disappointed among qualified active users, demand exceeds capacity, organic growth | scale/go candidate |

Record both the highest evidence level and the dominant evidence level. One isolated E5 signal should not hide a mostly E1 evidence base.

## Raw score vs confidence

Use two separate outputs:

```text
Raw score: 0-100
Evidence confidence: very_low | low | medium | high
Highest evidence level: E0-E7
Confidence-adjusted verdict: Go | Validate First | Narrow | Pivot | Stop
```

Raw score estimates attractiveness. Confidence estimates whether the evidence is strong enough to trust the score.

## Confidence gates

- If highest evidence is E0-E2, do not issue a high-confidence Go.
- If no real customer behavior or commitment exists, default to `Validate First` even when raw score is high.
- If PMF is claimed without active users, retention, survey, or demand-pressure evidence, downgrade to `pre-PMF`.
- If B2B buyer, user, and budget owner are not separated, cap distribution confidence at low.
- If the idea relies on a marketplace, require a supply/demand sequencing thesis before giving high confidence.
- If regulated or deeptech, require regulatory or technical proof milestones before high-confidence Go.

## Scoring discipline

- Use framework scores as decision aids, not false precision.
- Explain what moved each score up or down.
- Add a “what would change this score” line for each major score.
- Do not average away critical failure modes; a critical distribution or demand failure can dominate the verdict.
- Penalize evidence gaps separately from idea quality.

## False positive penalties

Downgrade confidence when the evidence is mainly:

- compliments: “great idea”
- hypotheticals: “I would use this”
- feature wishlists without pain or behavior
- friends/family feedback
- unqualified waitlists
- vanity clicks with no qualified conversion
- TAM excitement without reachable wedge
- AI persona or synthetic-user responses
- investor interest before customer evidence

## Roadmap discipline

- End with the next cheapest learning step, not generic advice.
- Prefer experiments that test the riskiest assumption first.
- Include success criteria and kill criteria.
- Do not recommend building a full product when a smaller proof can reduce the same uncertainty.

## Anti-patterns

- Do not hardcode obsolete task APIs or model names.
- Do not present a confident grade when the evidence base is thin.
- Do not skip weaknesses just because the idea sounds exciting.
- Do not treat research, TAM, or AI simulation as proof that customers will buy.
- Do not hide a Stop/Pivot recommendation behind polite language.
