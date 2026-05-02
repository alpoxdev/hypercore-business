# 검증 규칙

Elon Musk skill run을 완료로 선언하기 전에 다음 checks를 실행합니다.

## 트리거 checks

반드시 trigger:

- “Use first principles to rethink this pricing/cost/strategy problem.”
- “Think like Elon, but as a framework, and find the non-obvious option.”
- “Our current options feel copied from competitors; deconstruct the assumptions.”

반드시 trigger하지 않음:

- redesign이 없는 pure factual summaries
- normal code debugging 또는 implementation requests
- 사용자가 assumption teardown이 아니라 validation을 요청한 startup scoring
- concrete problem 또는 constraints가 없는 open-ended brainstorming

## Anatomy checks

- Core `SKILL.md`는 lean하게 유지하고 direct support files만 가리킵니다.
- `SKILL.md`에서 한 단계보다 깊은 reference chain은 없습니다.
- Rules에는 workflow details, references에는 reusable framework details를 둡니다.
- provider-sensitive 또는 time-sensitive tool guidance를 core에 하드코딩하지 않습니다.

## Output checks

완료된 folder에는 다음이 있어야 합니다:

- `flow.json`
- `research.md`
- `assumptions.md`
- `redesign.md`
- `execution.md`

분석에는 다음이 있어야 합니다:

- 최소 하나의 hard constraint (`A`)
- 최소 하나의 deleted 또는 explicitly defended convention (`B`)
- 최소 하나의 unknown (`C`)이 research 또는 experiment로 전환됨
- `redesign.md`의 3-5 options
- 최소 하나의 weird-but-plausible option
- visible bottleneck
- 24-hour reality test 또는 safe test가 불가능한 명시적 사유

## Algorithm checks

- Recommendation은 requirement를 optimize하기 전에 question합니다.
- Simplification 전에 deletion pass가 있었습니다.
- Acceleration은 deletion과 simplification 이후에만 일어납니다.
- Automation은 이전 gates를 통과한 process에만 추천됩니다.

## Evidence checks

- Current factual claims에는 source URL이 있거나 assumption으로 표시됩니다.
- Unsupported current factual claims are rejected or downgraded to explicit unknowns.
- Domain facts are not invented to make an idea look bold.
- Competitor behavior is treated as analogy, not proof.
- Unknowns are not smoothed over.

## Safety checks

다음에 해당하면 output을 reject 또는 revise합니다:

- Elon Musk를 impersonates하거나 그가 개인적으로 말할 것을 안다고 claims하는 경우
- reasoning 대신 hero worship에 의존하는 경우
- safety, legal, trust, quality guardrails 없이 speed/urgency를 추천하는 경우
- misleading capability claims를 만드는 경우
- unethical, illegal, privacy-invasive, unsafe shortcuts를 제안하는 경우
- human well-being을 expendable operational waste로 취급하는 경우

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
