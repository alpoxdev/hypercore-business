# Framework Reference

> Operational reference for applying Musk-style first-principles frameworks without role-play or hero worship.

## 1. First-principles base

Use this split before proposing solutions:

- `A` — hard constraints: physics, math, law, hard technical limits, hard dependencies, non-negotiable safety constraints
- `B` — conventions: defaults, habits, copied competitor behavior, inherited process, “this is how the industry works”
- `C` — unknowns: claims that could be verified with data, prototypes, user tests, expert calls, or current research

Treat `A` as the design boundary, delete or challenge `B`, and convert `C` into evidence questions or experiments.

## 2. Socratic premise attack

Apply these to the most important assumptions:

- What exactly does this claim mean?
- What are we assuming without proof?
- What evidence would prove or falsify it?
- Who owns this requirement? Can we ask that person why it exists?
- What changes if this assumption is false?
- Why did we accept this as normal?
- Is this a law, a contract, a user need, or just a habit?

## 3. The Algorithm

Use this order. Do not reverse it.

1. **Question requirements** — make the requirement less wrong; attach a responsible person or source.
2. **Delete** — remove the part, step, feature, policy, or dependency if it is not truly necessary.
3. **Simplify or optimize** — improve only what survived deletion.
4. **Accelerate** — increase cycle time only after the direction and process are right.
5. **Automate** — automate last; never automate waste.

Gate: if the preferred option starts with acceleration or automation, send it back to deletion and simplification first.

## 4. Magic-wand number

Define the theoretical best state before negotiating with current constraints.

Examples of magic-wand targets:

- zero marginal cost
- one-click onboarding
- instant delivery
- raw-material floor cost
- no handoff between teams
- no waiting time
- no duplicated data entry

Use the gap between today and the magic-wand state as the redesign space.

## 5. Idiot index

Use when cost, complexity, or operations look inflated.

```text
idiot index = finished cost / fundamental input cost
```

The denominator may be raw materials, compute, labor minutes, attention, energy, distribution cost, or another irreducible input. A high ratio does not prove stupidity; it identifies where design, process, coordination, risk, or market structure may be adding waste.

## 6. Limits test

Push the problem to extremes to reveal hidden structure:

- What if volume grows 10x or 100x?
- What if price must fall 90%?
- What if cycle time must drop from weeks to hours?
- What if marginal cost must approach zero?
- What if one person had to run the whole system?
- What if the system had to work with no meetings, no handoffs, or no manual QA?

Use the result to expose bottlenecks and false requirements.

## 7. Dimension shift

Try reframing the design space:

- 2D -> 3D: add layers, parallel channels, or new surfaces
- sequential -> parallel: split work so independent parts happen at once
- ownership -> utilization: monetize idle capacity or shared use
- product -> production system: redesign how the product is made, sold, supported, or learned from
- component -> system: remove interfaces instead of optimizing them
- service -> self-serve loop: turn repeated human work into user-operable workflows

## 8. Bottleneck attack

Find the one constraint that caps the whole system.

Ask:

- What single queue, part, decision, supplier, team, or belief limits throughput?
- If everything else improved but this stayed fixed, would the outcome change?
- What metric proves this is the bottleneck?
- Can we delete, bypass, parallelize, or own the bottleneck?

## 9. Reality feedback

End with contact with reality:

- prototype instead of debate
- source-of-truth metric instead of opinion
- direct user/customer/operator feedback instead of secondhand summaries
- 24-hour experiment when possible
- explicit kill criteria when the idea is wrong

The goal is not to be right; the goal is to become less wrong quickly and safely.

## 10. Rebuild sequence

1. Restate the real decision.
2. List assumptions and classify them as A/B/C.
3. Delete or challenge B conventions.
4. Convert C unknowns into evidence questions or experiments.
5. Apply Algorithm, magic-wand, idiot-index, limits, dimension-shift, and bottleneck operators.
6. Produce 3-5 options, including at least one non-obvious option.
7. Choose the path that maximizes impact, feasibility, and learning speed under the A constraints.
8. Stress-test with inversion and pre-mortem.
