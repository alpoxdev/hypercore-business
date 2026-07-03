# Browser-Link Research Reference Map

English counterpart for `references/browser-link-research.ko.md`. Use this file as a quick operator map, then read the Korean original for the full procedure and seller-facing wording.

## Purpose

When the user provides product, competitor, SmartStore, own-mall, open-market, or reference URLs, prefer a lightweight rendered-page review before static parsing. The goal is small-scale commerce reference research, not scraping, bypassing access controls, or storing session data.

## Channel Order

1. User-visible Chrome or Edge observed through DevTools/CDP.
2. Existing Chrome remote-debugging endpoint discovered through `/json/version` and `/json/list`.
3. User-approved profile browser CDP endpoint when already available.
4. New headed Chrome or Edge session for public pages.
5. Static fetch or parser fallback, clearly labeled as static fallback.
6. User-provided screenshot, PDF, copied text, or export when access is blocked.

## Capture Fields

For each link, record final URL, checked date, access channel, rendered or blocked status, screenshot path if captured, visible copy, section observations, image rhythm, claim risks, and uncertainty.

## Boundaries

Allowed: observe pages the user can access, summarize visible layout/copy/image rhythm, and use references as strategy inputs.

Forbidden: bypass access controls, save cookies/tokens/CDP endpoints/profile IDs, claim blocked content was reviewed, or copy reference page assets/copy into the final design.

## Source Anchors

The Korean original includes links for Chrome DevTools Protocol, CDP domains, AdsPower Local API, GoLogin Cloud Browser, Multilogin Playwright examples, and Playwright `connectOverCDP`.
