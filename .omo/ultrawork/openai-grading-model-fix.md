# Ultrawork Notepad: OPENAI_GRADING_MODEL quoting fix

Tier: LIGHT - narrow env/config normalization issue; no new module/layer or external integration change expected.

Skills used:
- ultrawork: user invoked ulw; using evidence-driven RED/GREEN workflow.
- omo:start-work/ulw-loop previous session: paused; current request is a local override focused on env model validation.

Acceptance criteria:
1. RED: reproduce or identify a value of OPENAI_GRADING_MODEL that includes literal quotes and fails known-model validation.
2. GREEN: normalize/fix the setting so gpt-5.5 is accepted without embedded quotes.
3. Real surface: run the relevant command/check that emitted the error or closest faithful validator and capture output.

## Findings
- RED captured: OPENAI_GRADING_MODEL with literal wrapping quotes was not accepted by the known-model set.
- Fix: scripts/validate-skills.sh now strips repeated matching wrapping quotes from OPENAI_GRADING_MODEL before invoking external skills-ref validation.
- GREEN captured: with OPENAI_GRADING_MODEL='""gpt-5.5""', fake uvx received OPENAI_GRADING_MODEL=gpt-5.5 and wrapper exited 0.
- Smoke: bash -n scripts/validate-skills.sh passed; node skills/validate-skills.mjs --json passed.

Evidence:
- .omo/evidence/openai-grading-model-fix/red-quoted-env.out
- .omo/evidence/openai-grading-model-fix/green-validate-skills-wrapper.out
- .omo/evidence/openai-grading-model-fix/green-fake-uvx-env.out
- .omo/evidence/openai-grading-model-fix/skills-validator-smoke.json

Cleanup receipt: fake uvx temp directory removed after wrapper QA; no server, tmux, browser, or staged/committed files created.
