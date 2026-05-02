#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const repoRoot = join(root, '..', '..');
const required = [
  'SKILL.md',
  'rules/product-detail-maker-workflow.md',
  'rules/platform-compliance.md',
  'references/research-findings.ko.md',
  'references/section-templates.ko.md',
  'references/image-direction.ko.md',
  'references/image-maker-integration.ko.md',
  'references/browser-link-research.ko.md',
  'references/sangse-style-benchmark.ko.md',
  'references/figma-mcp-output.ko.md',
];

const koRequired = [
  'SKILL.ko.md',
  'rules/product-detail-maker-workflow.ko.md',
  'rules/platform-compliance.ko.md',
  'references/research-findings.ko.md',
  'references/section-templates.ko.md',
  'references/image-direction.ko.md',
  'references/image-maker-integration.ko.md',
  'references/browser-link-research.ko.md',
  'references/sangse-style-benchmark.ko.md',
  'references/figma-mcp-output.ko.md',
];

const optionalImageGenerationReferences = [
  'skills/image-maker/SKILL.md',
  'skills/image-maker/rules/natural-image-workflow.md',
  'skills/image-maker/references/json-prompt-best-practices.md',
  'skills/image-maker/scripts/archive-generated-images.mjs',
];

const failures = [];
for (const file of required) {
  if (!existsSync(join(root, file))) failures.push(`Missing required file: ${file}`);
}
for (const file of koRequired) {
  if (!existsSync(join(root, file))) failures.push(`Missing Korean localized file: ${file}`);
}
const missingOptionalImageGeneration = optionalImageGenerationReferences.filter((file) => !existsSync(join(repoRoot, file)));

const skill = readFileSync(join(root, 'SKILL.md'), 'utf8');
const lineCount = skill.split('\n').length;
if (lineCount > 300) failures.push(`SKILL.md too long: ${lineCount} lines (target <= 300)`);
if (!skill.includes('name: product-detail-maker')) failures.push('SKILL.md frontmatter name must be product-detail-maker');

const markdownFiles = [
  'SKILL.md',
  'rules/product-detail-maker-workflow.md',
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
  'product-detail-maker',
  'SmartStore',
  'image-generation',
  'Korean product information notice',
  'platform-checklist.md',
  'skills/image-maker/SKILL.md',
  'references/image-maker-integration.ko.md',
  'references/browser-link-research.ko.md',
  'references/sangse-style-benchmark.ko.md',
  'references/figma-mcp-output.ko.md',
  'actual raster asset generation or editing',
  'Downloading source product images is reference collection only',
  'AI-looking placeholder',
  'text overlap',
  'image background',
  'raw white-box product cutout',
]) {
  if (!skill.includes(needle)) failures.push(`SKILL.md missing key trigger/contract term: ${needle}`);
}

if (!skill.includes('Final user-facing product-page copy') || !skill.includes('must be in Korean')) {
  failures.push('SKILL.md missing Korean output language contract');
}

const skillKo = readFileSync(join(root, 'SKILL.ko.md'), 'utf8');
if (!skillKo.includes('name: product-detail-maker')) failures.push('SKILL.ko.md frontmatter name must be product-detail-maker');
for (const needle of [
  '한국형 상세페이지',
  '실제 이미지 생성',
  'Figma MCP',
  'figma-frame-spec.json',
  'references/sangse-style-benchmark.ko.md',
  'references/figma-mcp-output.ko.md',
  'skills/image-maker/SKILL.md',
  'rules/product-detail-maker-workflow.ko.md',
  'platform-compliance.ko.md',
  '원본 상품 이미지를 다운로드하는 것은 레퍼런스 수집일 뿐 실제 이미지 생성이 아니다',
  '텍스트 겹침',
  'AI틱한 placeholder',
  '흰 사각형 product cutout',
]) {
  if (!skillKo.includes(needle)) failures.push(`SKILL.ko.md missing key Korean term/reference: ${needle}`);
}

const research = readFileSync(join(root, 'references/research-findings.ko.md'), 'utf8');
const urlCount = (research.match(/https?:\/\//g) || []).length;
if (urlCount < 8) failures.push(`Expected at least 8 source URLs in research findings, found ${urlCount}`);

const workflow = readFileSync(join(root, 'rules/product-detail-maker-workflow.md'), 'utf8');
for (const section of ['Research pass', 'Chrome DevTools/CDP-first link research', 'Category playbook', 'Section map', 'Figma layout and Image/cut planning', 'Output packaging']) {
  if (!workflow.includes(section)) failures.push(`Workflow missing section: ${section}`);
}
for (const term of ['asset_status', 'asset-needed', 'text overlap', 'clipped Korean copy', 'downloaded source product images', 'image_asset_analysis', 'raw white product square']) {
  if (!workflow.includes(term)) failures.push(`Workflow missing Figma/image QA regression term: ${term}`);
}

const browserLinkResearch = readFileSync(join(root, 'references/browser-link-research.ko.md'), 'utf8');
for (const term of ['DevTools/CDP-first', 'BeautifulSoup', 'CDP', 'webSocketDebuggerUrl', 'static fallback', '소량 레퍼런스 정보 취득', 'https://chromedevtools.github.io/devtools-protocol/']) {
  if (!browserLinkResearch.includes(term)) failures.push(`Browser link research missing: ${term}`);
}

const integration = readFileSync(join(root, 'references/image-maker-integration.ko.md'), 'utf8');
for (const term of ['skills/image-maker/SKILL.md', 'natural-image-workflow.md', 'json-prompt-best-practices.md', 'archive-generated-images.mjs', 'gpt-image-2', '실제 이미지 생성', '아카이브', '다운로드-only 금지', 'source/reference asset']) {
  if (!integration.includes(term)) failures.push(`Image-generation integration missing: ${term}`);
}
for (const stale of ['name: korean-product-detail-page', 'rules/korean-product-detail-page-workflow', 'validate-korean-product-detail-page-skill.mjs', 'image-generation-handoff.ko.md', 'handoff artifact', 'hands off', 'owns final']) {
  if (skill.includes(stale) || integration.includes(stale)) failures.push(`Stale handoff wording remains: ${stale}`);
}

const sangse = readFileSync(join(root, 'references/sangse-style-benchmark.ko.md'), 'utf8');
for (const term of ['Sang-se', 'Figma', '복제하지 않는다', '카테고리', '블록 라이브러리']) {
  if (!sangse.includes(term)) failures.push(`Sang-se benchmark missing: ${term}`);
}

const figmaMcp = readFileSync(join(root, 'references/figma-mcp-output.ko.md'), 'utf8');
for (const term of ['Figma MCP', 'figma-frame-spec.json', 'HTML', 'editable text layer', 'file key', 'Figma visual QA gate', '텍스트 겹침', 'clipped text', 'asset-needed', '조악한 AI placeholder', 'placement_decision', '흰 사각형 이미지 박스']) {
  if (!figmaMcp.includes(term)) failures.push(`Figma MCP output guide missing: ${term}`);
}

const imageDirection = readFileSync(join(root, 'references/image-direction.ko.md'), 'utf8');
for (const term of ['Downloaded source images are reference/existing assets only', 'AI-looking placeholder silhouettes', 'no text overlap', 'Source image extraction and placement QA', 'background_type', 'placement_decision', 'raw white square']) {
  if (!imageDirection.includes(term)) failures.push(`Image direction missing regression guard: ${term}`);
}

const sectionTemplates = readFileSync(join(root, 'references/section-templates.ko.md'), 'utf8');
for (const term of ['Beauty', 'Food', 'Fashion', 'Electronics', 'Baby', 'Digital', 'category_playbook']) {
  if (!sectionTemplates.includes(term)) failures.push(`Section templates missing category playbook term: ${term}`);
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

console.log('product-detail-maker skill validation passed');
console.log(`SKILL.md lines: ${lineCount}`);
console.log(`Research URLs: ${urlCount}`);
if (missingOptionalImageGeneration.length) {
  console.log(`Optional image-maker local folder not present; integration guide will use available runtime image generation path: ${missingOptionalImageGeneration.length} missing optional files`);
}
console.log('Korean .ko.md coverage: passed');
