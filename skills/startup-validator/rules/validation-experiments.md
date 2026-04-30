# Validation Experiment Rules

> The next action should reduce the largest uncertainty as cheaply as possible.

## Experiment ladder

Choose the lowest-cost experiment that can test the riskiest assumption.

| Level | Experiment | Tests |
|---|---|---|
| X1 | problem interviews | whether the problem is real and urgent |
| X2 | concierge/manual MVP | whether the workflow creates value before automation |
| X3 | smoke test / landing page | whether a specific ICP responds to a promise and CTA |
| X4 | qualified waitlist or booked calls | whether intent survives qualification |
| X5 | data commitment or integration access | whether customers will invest setup effort |
| X6 | LOI, pre-order, deposit, paid pilot | whether buyer commitment exists |
| X7 | retention / referral / PMF survey | whether active users show pull |

## Smoke test design

A valid smoke test has:

- one ICP or buyer segment
- one concrete pain or job
- one promise
- one CTA that represents real intent
- qualification questions
- source/channel tracking
- ethical disclosure when the product is not fully available
- a decision threshold before launch

Weak smoke tests measure curiosity. Strong smoke tests measure qualified intent.

## Concierge/manual MVP

Use when value can be delivered manually before software exists.

Include:

- customer success condition
- manual service steps
- delivery time and cost
- what must be learned before automation
- willingness-to-pay or repeat-use signal
- stop condition if manual delivery reveals poor demand or impossible unit economics

## B2B commitment tests

Strong B2B tests include:

- paid pilot with success criteria
- design partner agreement with timeline and data access
- LOI tied to conditions, budget owner, and decision date
- security/procurement discovery when relevant
- workflow shadowing with real artifacts

Do not overvalue a non-binding LOI without buyer identity, timeline, and conversion condition.

## PMF survey readiness

Use Sean Ellis / Superhuman-style survey only when:

- users are active enough to miss the product
- the sample is qualified and segmentable
- the product delivers the core value at least once
- retention or repeat behavior can be observed

The survey should not replace retention, payment, referral, or usage evidence.

## Kill criteria

Every sprint must include kill or pivot criteria, such as:

- fewer than N qualified customers report repeated urgent pain
- no buyer commitment after targeted outreach
- waitlist converts but qualification shows wrong ICP
- paid pilot interest disappears when price or timeline is concrete
- retention or repeat use fails after the core value event
- customer acquisition cost is structurally higher than monetization potential

## 7-day validation sprint

End `verdict.md` with:

```text
Sprint goal: [uncertainty to reduce]
Target segment: [ICP/persona]
Experiment: [method]
Success metric: [specific threshold]
Kill signal: [specific threshold]
What we will do next if it passes: [...]
What we will do next if it fails: [...]
```
