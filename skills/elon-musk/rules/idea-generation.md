# Breakthrough Idea Generation Rules

> Generate non-obvious options by changing constraints, not by decorating conventional answers.

## Premise attack loop

Before generating options:

1. Write the default industry answer in one sentence.
2. Name the copied assumptions that make that answer feel inevitable.
3. Mark each assumption as `A` hard constraint, `B` convention, or `C` unknown.
4. Delete or invert at least one `B` convention.
5. Convert at least one `C` unknown into a testable question.

## Operator stack

Apply at least three of these operators for complex problems and at least one for simple problems.

| Operator | Prompt | Output |
|---|---|---|
| Algorithm gate | What requirement can be questioned, deleted, simplified, accelerated, then automated? | Waste removed before optimization |
| Magic-wand target | If the perfect state existed, what would be instant, free, invisible, or effortless? | North-star gap |
| Idiot index | Which cost is far above its fundamental input cost? | Waste/cost attack surface |
| Limits ladder | What breaks at 10x, 100x, 1%, or zero marginal cost? | Hidden bottlenecks |
| Dimension shift | Can the problem move from 2D to 3D, sequential to parallel, product to system? | New design space |
| Reuse loop | What expensive asset is idle, single-use, duplicated, or thrown away? | Utilization/reuse option |
| Bottleneck attack | Which one constraint caps the entire system? | Highest-leverage intervention |
| Reality feedback | What prototype or direct metric proves this fast? | Learning loop |

## Deletion rampage

For each candidate option, ask:

- What part, process, step, feature, policy, approval, handoff, or dependency can disappear?
- If deletion is scary, what exact failure are we afraid of?
- Can that failure be tested cheaply?
- If nothing would need to be added back, were we too conservative?

## Weird-but-plausible option rule

The option portfolio must include at least one option that feels strange at first but is defensible from fundamentals.

A weird option is acceptable only if:

- it respects hard constraints and safety boundaries
- it names which convention it deletes
- it has a plausible mechanism, not just a slogan
- it can be tested with a small prototype, calculation, customer conversation, or operational experiment

## Option scoring

Score each option from 1-5:

| Score | Meaning |
|---|---|
| Impact | Size of upside if true |
| Feasibility | Can be attempted with available resources |
| Learning speed | How quickly reality can prove or disprove it |
| Constraint fit | Respects hard constraints and guardrails |
| Non-obviousness | Breaks a convention without becoming fantasy |

Prefer the option with the best mix of impact, constraint fit, and learning speed; do not pick the weirdest option just because it is weird.

## Output cues

In `redesign.md`, include:

- default answer being rejected or revised
- breakthrough operators used
- 3-5 option cards
- one weird-but-plausible option
- scoring table
- recommendation with the single bottleneck it attacks
