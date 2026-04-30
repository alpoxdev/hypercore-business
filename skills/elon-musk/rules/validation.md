# Validation Rules

Run these checks before declaring an Elon Musk skill run complete.

## Trigger checks

Must trigger for:

- “Use first principles to rethink this pricing/cost/strategy problem.”
- “Think like Elon, but as a framework, and find the non-obvious option.”
- “Our current options feel copied from competitors; deconstruct the assumptions.”

Must not trigger for:

- pure factual summaries with no redesign
- normal code debugging or implementation requests
- startup scoring when the user asks for validation rather than assumption teardown
- open-ended brainstorming with no concrete problem or constraints

## Anatomy checks

- Core `SKILL.md` stays lean and points to direct support files only.
- No reference chain deeper than one level from `SKILL.md`.
- Rules contain workflow details; references contain reusable framework details.
- No provider-sensitive or time-sensitive tool guidance is hardcoded into the core.

## Output checks

The completed folder must contain:

- `flow.json`
- `research.md`
- `assumptions.md`
- `redesign.md`
- `execution.md`

The analysis must include:

- at least one hard constraint (`A`)
- at least one deleted or explicitly defended convention (`B`)
- at least one unknown (`C`) turned into research or experiment
- 3-5 options in `redesign.md`
- at least one weird-but-plausible option
- a visible bottleneck
- a 24-hour reality test or explicit reason no safe test exists

## Algorithm checks

- The recommendation questions requirements before optimizing them.
- A deletion pass happened before simplification.
- Acceleration happens only after deletion and simplification.
- Automation is not recommended unless the process survived the earlier gates.

## Evidence checks

- Current factual claims have source URLs or are marked as assumptions.
- Unsupported current factual claims are rejected or downgraded to explicit unknowns.
- Domain facts are not invented to make an idea look bold.
- Competitor behavior is treated as analogy, not proof.
- Unknowns are not smoothed over.

## Safety checks

Reject or revise the output if it:

- impersonates Elon Musk or claims to know what he would personally say
- relies on hero worship instead of reasoning
- recommends speed/urgency without safety, legal, trust, and quality guardrails
- creates misleading capability claims
- proposes unethical, illegal, privacy-invasive, or unsafe shortcuts
- treats human well-being as expendable operational waste

## Completion checklist

- [ ] Framework-not-persona stance is visible
- [ ] A/B/C matrix is complete
- [ ] At least one convention is deleted or defended
- [ ] The Algorithm order is respected
- [ ] Mars-shot brief exists in `redesign.md`
- [ ] Preferred option has a bottleneck and metric
- [ ] Inversion and pre-mortem are included
- [ ] 24-hour reality test or safe alternative is included
- [ ] `flow.json` status is `completed`
