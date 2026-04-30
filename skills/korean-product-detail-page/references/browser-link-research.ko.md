# Chrome DevTools/CDP 우선 링크 리서치 가이드

사용자가 상품 링크, 경쟁사 링크, 레퍼런스 상세페이지, 스마트스토어/자사몰/오픈마켓 URL을 주면 정적 HTML 파싱보다 **가벼운 Chrome DevTools Protocol(CDP) 기반 관찰**을 우선한다. 목적은 사이버 공격이나 대량 스크래핑이 아니라 상세페이지 제작에 필요한 소량 레퍼런스 정보 취득이다.

## 왜 DevTools/CDP-first인가

- 한국형 상세페이지는 긴 이미지, 동적 렌더링, lazy loading, 탭/접힘 영역, 로그인/성인/지역/세션 상태에 따라 보이는 내용이 달라질 수 있다.
- BeautifulSoup/requests류 정적 파싱은 이미지 중심 상세설명, 클라이언트 렌더링, 스크롤 후 로딩, 플랫폼 iframe/에디터 구조를 놓치기 쉽다.
- Playwright 같은 full automation framework는 강력하지만 링크 몇 개를 확인하는 레퍼런스 조사에는 무거울 수 있다.
- Chrome DevTools/CDP는 이미 열린 Chrome/Edge를 관찰하고 DOM, Network, Page, Runtime, Screenshot 같은 필요한 정보만 가볍게 가져오는 데 적합하다.

## 채널 우선순위

| 우선순위 | 채널 | 사용할 때 | 산출 증거 |
|---|---|---|---|
| 1 | 사용자가 보고 있는 Chrome/Edge + DevTools/CDP | 링크 수가 적고 실제 사용자 화면 기준 관찰이 중요한 경우 | 스크린샷, visible text, DOM 요약, 최종 URL, 확인 날짜 |
| 2 | Chrome remote debugging endpoint | `http://localhost:<port>/json/version` 또는 `/json/list`로 탭 target을 확인할 수 있는 경우 | `webSocketDebuggerUrl`, 탭별 URL/title, Page/Runtime/DOM 관찰 |
| 3 | 사용자가 승인한 profile browser의 CDP endpoint | anti-detect/profile browser가 이미 준비되어 있고 CDP/WebSocket endpoint를 제공하는 경우 | 렌더링 화면, section map, 이미지/카피 관찰, blocked state |
| 4 | 새 headed Chrome/Edge 세션 | 공개 페이지이고 사용자 세션이 중요하지 않은 경우 | 렌더링 화면, source URL/date, 주요 텍스트/이미지 구조 |
| 5 | 정적 fetch/BeautifulSoup | 단순 공개 HTML이거나 DevTools/CDP path가 불가능한 경우의 보조 수단 | HTML 텍스트 추출, meta tags, 한계 표시 |
| 6 | 사용자 제공 export | CAPTCHA/paywall/권한 제한/자동화 차단으로 접근 불가 | 스크린샷, PDF, 복사 텍스트, 원본 이미지/문서 |

## 가벼운 CDP 관찰 절차

1. 링크를 Chrome/Edge에서 연다. 가능하면 사용자가 실제로 보는 브라우저/프로필을 사용한다.
2. CDP endpoint가 있으면 `/json/version`에서 브라우저 정보와 `webSocketDebuggerUrl`을 확인하고, `/json/list`에서 대상 탭을 고른다.
3. 필요한 도메인만 사용한다: `Page` for navigation/screenshot, `Runtime` for visible text extraction, `DOM` for 구조 요약, `Network` for final URL/status 정도.
4. 페이지를 한 번 스크롤해 lazy-loaded 이미지/섹션을 노출한다. 대량 순회나 반복 수집은 하지 않는다.
5. 상세페이지 제작에 필요한 관찰만 추출한다: 섹션 순서, 헤드라인, CTA, 이미지 컷 리듬, proof/FAQ/policy 배치, 주장 리스크.
6. 접근이 일반 사용자 화면에서 막히면 더 깊게 우회하지 말고 사용자 제공 export로 전환한다.

## 캡처 체크리스트

각 링크마다 다음을 남긴다:

- `source_url`: 최종 URL과 리다이렉트가 있으면 관찰한 도착 URL
- `checked_at`: YYYY-MM-DD 형식 확인 날짜
- `access_channel`: user chrome cdp, remote debugging cdp, profile browser cdp, headed chrome, static fallback, user export 중 하나
- `status`: rendered, partial, login_required, blocked, unavailable 중 하나
- `screenshot_path`: 캡처한 경우 경로
- `visible_copy`: 보이는 헤드라인, 핵심 문구, CTA, 가격/혜택 표현
- `section_observations`: hero, benefit, proof, usage, detail/spec, FAQ/policy 순서와 누락
- `image_observations`: 긴 이미지 여부, 모바일 가독성, 컷 분할, 모델/제품/텍스트 비중
- `claim_risks`: 인증, 리뷰, 임상/효능, 원산지, 수상 등 판매자 증빙이 필요한 주장
- `uncertainty`: 로그인/지역/품절/옵션/스크롤 누락 등 해석 한계

## profile browser / anti-detect browser 메모

- 사용자가 이미 쓰는 profile browser가 있으면 해당 브라우저가 제공하는 CDP/WebSocket endpoint 또는 local API를 사용자가 승인한 범위에서만 쓴다.
- 이 스킬은 공급자 SDK를 강제하지 않는다. 목표는 “렌더링된 링크를 몇 개 확인하고 상세페이지 전략에 반영”하는 것이다.
- AdsPower, GoLogin, Multilogin류 도구는 보통 profile 실행 후 CDP/WebSocket 연결 정보를 제공한다. 실제 명령은 공급자 문서와 사용자 환경에 맞춰 확인한다.
- Playwright는 여기서 기본 경로가 아니다. 꼭 필요할 때 CDP endpoint에 붙는 선택적 adapter로만 취급한다.

## 허용/금지 경계

허용:

- 사용자가 소유하거나 볼 권한이 있는 브라우저 세션으로 레퍼런스를 확인한다.
- 공개 페이지의 레이아웃, 카피, 이미지 흐름, 가격/혜택 표시, FAQ/정책 구조를 관찰한다.
- 사용자가 수동으로 로그인/2FA/CAPTCHA를 통과한 뒤 보이는 화면을 캡처하거나 요약한다.

금지:

- 접근권한이 없는 자료를 보기 위한 우회 자동화로 확대하지 않는다.
- 쿠키, 토큰, 세션 파일, CDP endpoint, profile ID를 산출물이나 git에 저장하지 않는다.
- 접근이 막힌 자료를 본 것처럼 단정하지 않는다.
- 레퍼런스 페이지의 이미지/카피를 그대로 복제하지 않는다. 구조와 전략만 참고하고 최종 산출물은 새로 만든다.

## 폴백 순서

1. 사용자가 보는 Chrome/Edge 탭을 CDP/DevTools로 관찰한다.
2. 기존 remote debugging endpoint나 profile browser CDP endpoint에 연결한다.
3. 새 headed Chrome/Edge로 열어 스크롤과 스크린샷을 확보한다.
4. 공개 HTML을 정적으로 파싱하되 “static fallback”이라고 표시한다.
5. 그래도 막히면 사용자에게 스크린샷, PDF export, 복사 텍스트, 제품 이미지, 판매자 자료를 요청한다.

## 근거 링크

- Chrome DevTools Protocol: Chromium/Chrome/Blink 브라우저를 instrument/inspect/debug/profile할 수 있고, remote debugging port 사용 시 `/json/version`에서 `webSocketDebuggerUrl`을 확인할 수 있다. Source: https://chromedevtools.github.io/devtools-protocol/
- Chrome DevTools Protocol Domains: Page, Runtime, DOM, Network, Storage 등 필요한 도메인 단위로 가볍게 관찰할 수 있다. Source: https://chromedevtools.github.io/devtools-protocol/tot/
- AdsPower Local API: browser open/close/status, profile, proxy, fingerprint 설정 카테고리를 제공한다. Source: https://localapi-doc-en.adspower.com/
- GoLogin Cloud Browser: Puppeteer/Playwright에서 connection URL로 cloud browser session을 제어하고 profile/proxy/fingerprint는 별도 API로 관리한다. Source: https://gologin.com/docs/api-reference/cloud-browser/getting-started
- Multilogin Playwright example: profile을 실행한 뒤 local port로 CDP 연결하는 예시를 제공한다. Source: https://multilogin.com/help/en_US/playwright-automation-example
- Playwright BrowserType: `connectOverCDP`는 CDP로 기존 Chromium 브라우저에 attach할 수 있다. 이 스킬에서는 기본 경로가 아니라 선택적 adapter 근거로만 사용한다. Source: https://playwright.dev/docs/api/class-browsertype
