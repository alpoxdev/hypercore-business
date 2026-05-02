# Transparent PNG Requirements

사용자가 나중에 출력 요구사항을 명시적으로 바꾸지 않는 한, logo-maker의 최종 deliverable은 항상 verified transparent-background PNG다.

## Output contract

- 최종 로고 파일은 `.png` 확장자와 PNG encoding을 사용해야 한다.
- Native Codex transparent generation이 첫 경로다: 실행 경로에서 지원하면 `generation_settings.format`을 `png`, `generation_settings.background`를 `transparent`, `generation_settings.transparent_background`를 `true`로 설정한다. 최종 transparency는 Node scripts로 만드는 것이 아니며, helper scripts는 transparency를 만드는 mechanism이 아니다.
- Model-facing prompt에는 isolated logo mark, transparent background, PNG output, no background fill, no white square, no checkerboard pattern, no chroma-key background, no mockup, no scene을 명시해야 한다.
- RGB PNG, fully opaque RGBA PNG, white/black/colored square, baked-in checkerboard, chroma-key background는 실패한 시도이며 최종 deliverable이 아니다.
- Native 시도가 반복 실패하고 로고가 simple geometric mark로 표현 가능하면 deterministic RGBA fallback renderer를 사용하고 `prompt.json`에 `generation_settings.api_path: "deterministic_rgba_fallback"`을 명시한다.

## Success ladder

1. 검수된 JSON logo brief를 작성한다.
2. Native transparent PNG settings와 강한 anti-background prompt wording으로 생성한다.
3. 반환된 PNG를 `file`과 alpha-pixel check로 검사한다.
4. Alpha가 없거나 fully opaque이면 brief/prompt/settings를 다듬어 재생성한다. Cleanup이나 background-removal postprocessing을 성공으로 보지 않는다.
5. Native가 반복 실패하면 simple geometric mark에 한해 `scripts/render-simple-logo-rgba.mjs`를 사용한다.
6. `scripts/archive-logo-assets.mjs` 또는 동등한 evidence로 archive한다.
7. `preview.html`을 열고 checkerboard, white, black, brand-color surface에서 검사한다.

## Prompt pattern

Structured brief가 검수된 뒤 `generation_prompt`에는 다음과 같은 표현을 사용한다:

```text
Create a clean, centered [mark type] logo for [brand]. Output as a transparent-background PNG logo asset. Isolated mark only. No background fill, no white square, no checkerboard pattern, no chroma-key background, no scene, no mockup, no drop shadow used as a background crutch. Keep edges clean and enough transparent padding for app icon and website header use.
```

## Verification evidence

최종 응답에는 다음 evidence를 기록한다:

- `file logo1.png`에 `RGBA` 또는 alpha-capable PNG mode가 포함된다.
- Alpha-pixel check가 최소 하나의 transparent pixel과 최소 하나의 visible/opaque pixel을 보고한다.
- Archive에 `prompt.json`, `logo1.png`, `preview.html`이 있다.
- Preview를 열었거나 정확한 preview path/open command를 보고한다.

## Common failure modes

- Transparent prompt wording 이후에도 runtime이 RGB PNG를 저장한다.
- Mark 뒤에 white square 또는 colored tile이 포함된다.
- 실제 transparency가 아니라 checkerboard pattern이 이미지에 baked-in된다.
- Cleanup으로 matte halo가 생긴다.
- Fallback renderer를 충실히 표현할 수 없는 complex visual request에 사용한다.
