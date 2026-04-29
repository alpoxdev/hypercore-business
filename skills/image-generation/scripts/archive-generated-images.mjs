#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function printUsage() {
  console.error(`Usage:
  node skills/image-generation/scripts/archive-generated-images.mjs \\
    --topic "descriptive topic" \\
    --prompt path/to/reviewed-prompt.json \\
    --images ~/.codex/generated-images/file1.png ~/.codex/generated-images/file2.png

Options:
  --topic <text>       Required. Creates .hypercore/image-generation/<topic-slug>/
  --prompt <path>      Required. Reviewed JSON prompt to write as prompt.json.
  --images <paths...>  Generated image files to archive as image1.png, image2.png...
  --latest <n>         Alternative to --images: copy newest n image files from --from-dir.
  --from-dir <path>    Directory used with --latest. Default: ~/.codex/generated-images
  --repo-root <path>   Repository root. Default: current working directory.
`);
}

function expandHome(input) {
  if (!input) return input;
  if (input === '~') return os.homedir();
  if (input.startsWith('~/')) return path.join(os.homedir(), input.slice(2));
  return input;
}

function slugify(input) {
  return String(input)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'image-generation';
}

function parseArgs(argv) {
  const opts = {
    images: [],
    fromDir: '~/.codex/generated-images',
    repoRoot: process.cwd(),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--topic') opts.topic = argv[++i];
    else if (arg === '--prompt') opts.prompt = argv[++i];
    else if (arg === '--latest') opts.latest = Number.parseInt(argv[++i], 10);
    else if (arg === '--from-dir') opts.fromDir = argv[++i];
    else if (arg === '--repo-root') opts.repoRoot = argv[++i];
    else if (arg === '--images') {
      while (argv[i + 1] && !argv[i + 1].startsWith('--')) opts.images.push(argv[++i]);
    } else {
      opts.images.push(arg);
    }
  }

  return opts;
}

function assertFile(filePath, label) {
  const stat = fs.statSync(filePath, { throwIfNoEntry: false });
  if (!stat?.isFile()) throw new Error(`${label} is not a file: ${filePath}`);
}

function newestImages(fromDir, count) {
  const entries = fs.readdirSync(fromDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(fromDir, entry.name))
    .filter((filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()))
    .map((filePath) => ({ filePath, mtimeMs: fs.statSync(filePath).mtimeMs }))
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
    .slice(0, count)
    .sort((a, b) => a.mtimeMs - b.mtimeMs)
    .map((entry) => entry.filePath);

  if (entries.length !== count) {
    throw new Error(`Expected ${count} images in ${fromDir}, found ${entries.length}. Pass explicit --images paths if needed.`);
  }

  return entries;
}

function readPrompt(promptPath) {
  const raw = fs.readFileSync(promptPath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Prompt must be valid JSON before archiving: ${promptPath}\n${error.message}`);
  }
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.topic || !opts.prompt || (!opts.images.length && !opts.latest)) {
    printUsage();
    process.exitCode = 2;
    return;
  }

  const repoRoot = path.resolve(expandHome(opts.repoRoot));
  const fromDir = path.resolve(expandHome(opts.fromDir));
  const promptPath = path.resolve(expandHome(opts.prompt));
  const topicSlug = slugify(opts.topic);
  const destDir = path.join(repoRoot, '.hypercore', 'image-generation', topicSlug);
  const imageSources = opts.images.length
    ? opts.images.map((filePath) => path.resolve(expandHome(filePath)))
    : newestImages(fromDir, opts.latest);

  assertFile(promptPath, 'Prompt');
  imageSources.forEach((filePath, index) => assertFile(filePath, `Image ${index + 1}`));
  fs.mkdirSync(destDir, { recursive: true });

  const savedImages = imageSources.map((sourcePath, index) => {
    const sourceExt = path.extname(sourcePath).toLowerCase();
    const ext = IMAGE_EXTENSIONS.has(sourceExt) ? sourceExt : '.png';
    const destPath = path.join(destDir, `image${index + 1}${ext}`);
    fs.copyFileSync(sourcePath, destPath);
    return {
      index: index + 1,
      source_path: sourcePath,
      saved_path: path.relative(repoRoot, destPath),
    };
  });

  const prompt = readPrompt(promptPath);
  prompt.artifact_archive = {
    topic: opts.topic,
    topic_slug: topicSlug,
    prompt_path: path.relative(repoRoot, path.join(destDir, 'prompt.json')),
    image_paths: savedImages.map((image) => image.saved_path),
    source_generated_images_dir: fromDir,
    source_image_paths: savedImages.map((image) => image.source_path),
    archived_at: new Date().toISOString(),
  };

  fs.writeFileSync(path.join(destDir, 'prompt.json'), `${JSON.stringify(prompt, null, 2)}\n`);

  console.log(JSON.stringify({
    topic_slug: topicSlug,
    output_dir: path.relative(repoRoot, destDir),
    prompt_path: path.relative(repoRoot, path.join(destDir, 'prompt.json')),
    image_paths: savedImages.map((image) => image.saved_path),
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
