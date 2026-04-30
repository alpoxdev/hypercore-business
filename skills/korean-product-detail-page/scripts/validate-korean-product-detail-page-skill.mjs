#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const repoRoot = join(root, '..', '..');
const required = [
  'SKILL.md',
  'rules/korean-product-detail-page-workflow.md',
  'rules/platform-compliance.md',
  'references/research-findings.ko.md',
  'references/section-templates.ko.md',
  'references/image-direction.ko.md',
  'references/image-generation-integration.ko.md',
  'references/browser-link-research.ko.md',
];

const koRequired = [
  'SKILL.ko.md',
  'rules/korean-product-detail-page-workflow.ko.md',
  'rules/platform-compliance.ko.md',
  'references/research-findings.ko.md',
  'references/section-templates.ko.md',
  'references/image-direction.ko.md',
  'references/image-generation-integration.ko.md',
  'references/browser-link-research.ko.md',
];

const imageGenerationRequired = [
  'skills/image-generation/SKILL.md',
  'skills/image-generation/rules/natural-image-workflow.md',
  'skills/image-generation/references/json-prompt-best-practices.md',
  'skills/image-generation/scripts/archive-generated-images.mjs',
];

const failures = [];
for (const file of required) {
  if (!existsSync(join(root, file))) failures.push(`Missing required file: ${file}`);
}
for (const file of koRequired) {
  if (!existsSync(join(root, file))) failures.push(`Missing Korean localized file: ${file}`);
}
for (const file of imageGenerationRequired) {
  if (!existsSync(join(repoRoot, file))) failures.push(`Missing local image-generation reference: ${file}`);
}

const skill = readFileSync(join(root, 'SKILL.md'), 'utf8');
const lineCount = skill.split('\n').length;
if (lineCount > 300) failures.push(`SKILL.md too long: ${lineCount} lines (target <= 300)`);

const markdownFiles = [
  'SKILL.md',
  'rules/korean-product-detail-page-workflow.md',
  'rules/platform-compliance.md',
];
for (const file of markdownFiles) {
  const koFile = file === 'SKILL.md' ? 'SKILL.ko.md' : file.replace(/\.md$/, '.ko.md');
  if (!existsSync(join(root, koFile))) failures.push(`Missing .ko.md counterpart for ${file}: ${koFile}`);
}

for (const file of markdownFiles) {
  const content = readFileSync(join(root, file), 'utf8');
  if (/[가-힣]/.test(content)) failures.push(`Non-.ko.md file contains Hangul; keep English docs English: ${file}`);
}

const positiveExamples = [...skill.matchAll(/^- "(.+)"/gm)].map((m) => m[1]);
if (positiveExamples.length < 5) failures.push(`Expected at least 5 quoted trigger examples, found ${positiveExamples.length}`);

for (const needle of [
  'Korean product detail page',
  'SmartStore',
  'image-generation',
  'Korean product information notice',
  'platform-checklist.md',
  'skills/image-generation/SKILL.md',
  'references/image-generation-integration.ko.md',
  'references/browser-link-research.ko.md',
]) {
  if (!skill.includes(needle)) failures.push(`SKILL.md missing key trigger/contract term: ${needle}`);
}

if (!skill.includes('Final user-facing product-page copy') || !skill.includes('must be in Korean')) {
  failures.push('SKILL.md missing Korean output language contract');
}

const skillKo = readFileSync(join(root, 'SKILL.ko.md'), 'utf8');
for (const needle of ['한국형 상세페이지', '실제 이미지 생성', 'skills/image-generation/SKILL.md', 'rules/korean-product-detail-page-workflow.ko.md', 'platform-compliance.ko.md']) {
  if (!skillKo.includes(needle)) failures.push(`SKILL.ko.md missing key Korean term/reference: ${needle}`);
}

const research = readFileSync(join(root, 'references/research-findings.ko.md'), 'utf8');
const urlCount = (research.match(/https?:\/\//g) || []).length;
if (urlCount < 8) failures.push(`Expected at least 8 source URLs in research findings, found ${urlCount}`);

const workflow = readFileSync(join(root, 'rules/korean-product-detail-page-workflow.md'), 'utf8');
for (const section of ['Research pass', 'Chrome DevTools/CDP-first link research', 'Section map', 'Image/cut planning', 'Output packaging']) {
  if (!workflow.includes(section)) failures.push(`Workflow missing section: ${section}`);
}

const browserLinkResearch = readFileSync(join(root, 'references/browser-link-research.ko.md'), 'utf8');
for (const term of ['DevTools/CDP-first', 'BeautifulSoup', 'CDP', 'webSocketDebuggerUrl', 'static fallback', '소량 레퍼런스 정보 취득', 'https://chromedevtools.github.io/devtools-protocol/']) {
  if (!browserLinkResearch.includes(term)) failures.push(`Browser link research missing: ${term}`);
}

const integration = readFileSync(join(root, 'references/image-generation-integration.ko.md'), 'utf8');
for (const term of ['skills/image-generation/SKILL.md', 'natural-image-workflow.md', 'json-prompt-best-practices.md', 'archive-generated-images.mjs', 'gpt-image-2', '실제 이미지 생성', '아카이브']) {
  if (!integration.includes(term)) failures.push(`Image-generation integration missing: ${term}`);
}
for (const stale of ['image-generation-handoff.ko.md', 'handoff artifact', 'hands off', 'owns final']) {
  if (skill.includes(stale) || integration.includes(stale)) failures.push(`Stale handoff wording remains: ${stale}`);
}

const compliance = readFileSync(join(root, 'rules/platform-compliance.md'), 'utf8');
for (const term of ['SmartStore', 'Cafe24', 'Gmarket', 'Korean product information notice', 'Claim safety']) {
  if (!compliance.includes(term)) failures.push(`Compliance rules missing: ${term}`);
}

if (failures.length) {
  console.error('Validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('korean-product-detail-page skill validation passed');
console.log(`SKILL.md lines: ${lineCount}`);
console.log(`Research URLs: ${urlCount}`);
console.log('Korean .ko.md coverage: passed');
