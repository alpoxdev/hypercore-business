#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, normalize, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skillsRoot = join(repoRoot, 'skills');
const evidenceRoot = join(repoRoot, '.omo', 'evidence', 'skills-instructions-refactor');

const canonicalTags = [
  'output_language',
  'purpose',
  'routing_rule',
  'instruction_contract',
  'trigger_examples',
  'support_file_read_order',
  'workflow',
  'validation',
];

const scriptCommands = [
  'node --check skills/validate-skills.mjs',
  'node --check skills/image-maker/scripts/archive-generated-images.mjs',
  'node --check skills/logo-maker/scripts/archive-logo-assets.mjs',
  'node --check skills/logo-maker/scripts/render-simple-logo-rgba.mjs',
  'node --check skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs',
  'node skills/product-detail-maker/scripts/validate-product-detail-maker-skill.mjs',
];

const adversarialClasses = {
  generatedAt: new Date().toISOString(),
  classes: [
    {
      id: 'prompt-injection-source-boundary',
      status: 'covered',
      reason: 'Validator treats SKILL.md and support markdown as untrusted local data and only checks structure, paths, and pairs.',
    },
    {
      id: 'dirty-worktree-scope',
      status: 'covered',
      reason: 'Validator writes only scoped evidence files and does not modify skill markdown or scripts.',
    },
    {
      id: 'misleading-success-output',
      status: 'covered',
      reason: 'Validation failures set success=false, write validation-red.json, and exit nonzero.',
    },
    {
      id: 'malformed-input',
      status: 'covered',
      reason: 'Unsupported CLI arguments print usage and exit nonzero without writing a false green result.',
    },
    {
      id: 'stale-state',
      status: 'covered',
      reason: 'Each run rewrites validation and adversarial evidence with a fresh generatedAt timestamp.',
    },
    {
      id: 'network-production',
      status: 'not_applicable',
      reason: 'The validator performs only local filesystem reads and scoped evidence writes.',
    },
    {
      id: 'browser-gui',
      status: 'not_applicable',
      reason: 'The validator has no browser, Figma, Chrome, or GUI surface.',
    },
    {
      id: 'long-running-process',
      status: 'not_applicable',
      reason: 'The validator is a finite Node CLI and starts no server, tmux session, watcher, or browser.',
    },
    {
      id: 'cancel-resume',
      status: 'not_applicable',
      reason: 'The validator is stateless per invocation except for overwritten evidence JSON.',
    },
    {
      id: 'flaky-tests',
      status: 'not_applicable',
      reason: 'Checks are deterministic local file inspections with no timing, network, or random inputs.',
    },
  ],
};

function usage() {
  return 'Usage: node skills/validate-skills.mjs [--json]';
}

function toRepoPath(path) {
  return relative(repoRoot, path).split(sep).join('/');
}

function readText(path) {
  return readFileSync(path, 'utf8');
}

function listFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFiles(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function listCanonicalSkillFiles() {
  return readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(skillsRoot, entry.name, 'SKILL.md'))
    .filter((file) => existsSync(file))
    .sort();
}

function stripCodeFences(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, '');
}

function isExternalLink(target) {
  return /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(target)
    || /^[a-z][a-z0-9+.-]*:/i.test(target)
    || target.startsWith('#')
    || target.startsWith('mailto:');
}

function cleanLocalLink(target) {
  const trimmed = target.trim();
  if (!trimmed || isExternalLink(trimmed)) return null;
  const withoutFragment = trimmed.split('#')[0].split('?')[0];
  if (!withoutFragment || isExternalLink(withoutFragment)) return null;
  return withoutFragment;
}

function extractSupportRefs(file, content) {
  const refs = [];
  const withoutCode = stripCodeFences(content);
  const annotationRegex = /(^|\n)\s*@([^\s)]+)/g;
  for (const match of withoutCode.matchAll(annotationRegex)) {
    const target = cleanLocalLink(match[2]);
    if (target) refs.push({ kind: 'annotation', target });
  }

  const markdownLinkRegex = /!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  for (const match of withoutCode.matchAll(markdownLinkRegex)) {
    const target = cleanLocalLink(match[1]);
    if (target) refs.push({ kind: 'markdown-link', target });
  }

  return refs.map((ref) => {
    const absolute = normalize(resolve(dirname(file), ref.target));
    return {
      ...ref,
      file: toRepoPath(file),
      resolved: toRepoPath(absolute),
      exists: absolute.startsWith(skillsRoot + sep) && existsSync(absolute),
    };
  });
}

function expectedKoPath(markdownFile) {
  if (markdownFile.endsWith('/SKILL.md')) {
    return markdownFile.replace(/SKILL\.md$/, 'SKILL.ko.md');
  }
  return markdownFile.replace(/\.md$/, '.ko.md');
}

function expectedEnglishPath(markdownFile) {
  if (markdownFile.endsWith('/SKILL.ko.md')) {
    return markdownFile.replace(/SKILL\.ko\.md$/, 'SKILL.md');
  }
  return markdownFile.replace(/\.ko\.md$/, '.md');
}

function validate() {
  const canonicalSkillFiles = listCanonicalSkillFiles();
  const markdownFiles = listFiles(skillsRoot).filter((file) => file.endsWith('.md')).sort();

  const missingTags = [];
  const tagFiles = [];
  for (const file of canonicalSkillFiles) {
    const content = readText(file);
    const fileTags = [];
    for (const tag of canonicalTags) {
      for (const token of [`<${tag}>`, `</${tag}>`]) {
        if (!content.includes(token)) {
          missingTags.push({ file: toRepoPath(file), tag: token });
          fileTags.push({ tag: token, present: false });
        } else {
          fileTags.push({ tag: token, present: true });
        }
      }
    }
    tagFiles.push({ file: toRepoPath(file), tags: fileTags });
  }

  const supportRefs = canonicalSkillFiles.flatMap((file) => extractSupportRefs(file, readText(file)));
  const missingSupport = supportRefs
    .filter((ref) => !ref.exists)
    .map(({ file, kind, target, resolved }) => ({ file, kind, target, resolved }));

  const bilingualErrors = [];
  const bilingualChecked = [];
  for (const file of markdownFiles) {
    if (file.endsWith('.ko.md')) {
      const expected = expectedEnglishPath(file);
      const ok = existsSync(expected);
      bilingualChecked.push({ file: toRepoPath(file), expected: toRepoPath(expected), exists: ok });
      if (!ok) {
        bilingualErrors.push({
          file: toRepoPath(file),
          expected: toRepoPath(expected),
          kind: 'missing-english-counterpart',
        });
      }
    } else {
      const expected = expectedKoPath(file);
      const ok = existsSync(expected);
      bilingualChecked.push({ file: toRepoPath(file), expected: toRepoPath(expected), exists: ok });
      if (!ok) {
        bilingualErrors.push({
          file: toRepoPath(file),
          expected: toRepoPath(expected),
          kind: 'missing-korean-counterpart',
        });
      }
    }
  }

  const lineBudgetFiles = canonicalSkillFiles.flatMap((file) => {
    const ko = file.replace(/SKILL\.md$/, 'SKILL.ko.md');
    return existsSync(ko) ? [file, ko] : [file];
  });
  const lineCounts = lineBudgetFiles.map((file) => {
    const lines = readText(file).split(/\r?\n/).length;
    return {
      file: toRepoPath(file),
      lines,
      limit: 500,
      status: lines > 500 ? 'violation' : 'ok',
    };
  });
  const lineViolations = lineCounts.filter((entry) => entry.status === 'violation');

  const scriptFiles = scriptCommands.map((command) => {
    const script = command.match(/skills\/\S+\.mjs/)?.[0] ?? null;
    return {
      command,
      script,
      exists: script ? existsSync(join(repoRoot, script)) : true,
    };
  });
  const missingScripts = scriptFiles.filter((entry) => !entry.exists);

  const success = missingTags.length === 0
    && missingSupport.length === 0
    && bilingualErrors.length === 0
    && lineViolations.length === 0
    && missingScripts.length === 0;

  return {
    success,
    generatedAt: new Date().toISOString(),
    canonicalContract: {
      tags: canonicalTags,
      files: tagFiles,
      missingTags,
    },
    supportLinks: {
      checked: supportRefs,
      missing: missingSupport,
    },
    bilingualPairs: {
      checked: bilingualChecked,
      errors: bilingualErrors,
    },
    lineBudgets: {
      limit: 500,
      files: lineCounts,
      violations: lineViolations,
    },
    scriptChecks: {
      commands: scriptCommands,
      files: scriptFiles,
      missingScripts,
      note: 'Commands are listed for the integration regression surface; this structural validator does not execute them.',
    },
    adversarialClasses,
    filesChecked: {
      canonicalSkillFiles: canonicalSkillFiles.map(toRepoPath),
      markdownFiles: markdownFiles.map(toRepoPath),
      supportReferenceCount: supportRefs.length,
    },
    cleanup: {
      longRunningProcess: 'none-started',
      tmuxBrowserServer: 'none-started',
      gitCommitOrStage: 'not-performed',
      writeScope: [
        'skills/validate-skills.mjs',
        '.omo/evidence/skills-instructions-refactor/validation-red.json',
        '.omo/evidence/skills-instructions-refactor/validation-green.json',
        '.omo/evidence/skills-instructions-refactor/adversarial-classes.json',
      ],
    },
  };
}

function writeEvidence(result) {
  mkdirSync(evidenceRoot, { recursive: true });
  const validationPath = join(evidenceRoot, result.success ? 'validation-green.json' : 'validation-red.json');
  writeFileSync(validationPath, `${JSON.stringify(result, null, 2)}\n`);
  writeAdversarialEvidence();
}

function writeAdversarialEvidence() {
  mkdirSync(evidenceRoot, { recursive: true });
  writeFileSync(join(evidenceRoot, 'adversarial-classes.json'), `${JSON.stringify(adversarialClasses, null, 2)}\n`);
}

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const unsupported = args.filter((arg) => arg !== '--json' && arg !== '--help' && arg !== '-h');

if (args.includes('--help') || args.includes('-h')) {
  writeAdversarialEvidence();
  console.log(usage());
  process.exit(0);
}

if (unsupported.length) {
  writeAdversarialEvidence();
  console.error(usage());
  console.error(`Unsupported argument: ${unsupported.join(', ')}`);
  process.exit(2);
}

const result = validate();
writeEvidence(result);

if (jsonMode) {
  console.log(JSON.stringify(result, null, 2));
} else if (result.success) {
  console.log('skills validation passed');
} else {
  console.error('skills validation failed');
  console.error(`missing canonical tags: ${result.canonicalContract.missingTags.length}`);
  console.error(`missing support links: ${result.supportLinks.missing.length}`);
  console.error(`bilingual pair errors: ${result.bilingualPairs.errors.length}`);
  console.error(`line budget violations: ${result.lineBudgets.violations.length}`);
  console.error(`missing scripts: ${result.scriptChecks.missingScripts.length}`);
}

process.exit(result.success ? 0 : 1);
