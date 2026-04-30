#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import zlib from 'node:zlib';

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function printUsage() {
  console.error(`Usage:
  node skills/logo-maker/scripts/archive-logo-assets.mjs \\
    --topic "descriptive logo topic" \\
    --prompt path/to/reviewed-logo-brief.json \\
    --logos path/to/logo1.png path/to/logo2.png

Options:
  --topic <text>       Required. Creates .hypercore/logo-maker/<topic-slug>/
  --prompt <path>      Required. Reviewed JSON logo brief to write as prompt.json.
  --logos <paths...>   Required unless --latest is used. Final transparent PNG logo files.
  --latest <n>         Alternative to --logos: copy newest n PNG files from --from-dir.
  --from-dir <path>    Directory used with --latest. Default: ~/.codex/generated-images
  --repo-root <path>   Repository root. Default: current working directory.
  --no-preview         Do not write preview.html.
  --open-preview       Open preview.html in a fresh Google Chrome window after writing it.
  --template <path>    Preview HTML template. Default: skills/logo-maker/assets/logo-preview-template.html
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
    .slice(0, 80) || 'logo-maker';
}

function parseArgs(argv) {
  const opts = {
    logos: [],
    fromDir: '~/.codex/generated-images',
    repoRoot: process.cwd(),
    preview: true,
    openPreview: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--topic') opts.topic = argv[++i];
    else if (arg === '--prompt') opts.prompt = argv[++i];
    else if (arg === '--latest') opts.latest = Number.parseInt(argv[++i], 10);
    else if (arg === '--from-dir') opts.fromDir = argv[++i];
    else if (arg === '--repo-root') opts.repoRoot = argv[++i];
    else if (arg === '--no-preview') opts.preview = false;
    else if (arg === '--preview') opts.preview = true;
    else if (arg === '--open-preview') opts.openPreview = true;
    else if (arg === '--template') opts.template = argv[++i];
    else if (arg === '--logos') {
      while (argv[i + 1] && !argv[i + 1].startsWith('--')) opts.logos.push(argv[++i]);
    } else {
      opts.logos.push(arg);
    }
  }

  return opts;
}

function assertFile(filePath, label) {
  const stat = fs.statSync(filePath, { throwIfNoEntry: false });
  if (!stat?.isFile()) throw new Error(`${label} is not a file: ${filePath}`);
}

function newestPngs(fromDir, count) {
  const entries = fs.readdirSync(fromDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(fromDir, entry.name))
    .filter((filePath) => path.extname(filePath).toLowerCase() === '.png')
    .map((filePath) => ({ filePath, mtimeMs: fs.statSync(filePath).mtimeMs }))
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
    .slice(0, count)
    .sort((a, b) => a.mtimeMs - b.mtimeMs)
    .map((entry) => entry.filePath);

  if (entries.length !== count) {
    throw new Error(`Expected ${count} PNG logos in ${fromDir}, found ${entries.length}. Pass explicit --logos paths if needed.`);
  }

  return entries;
}

function readPrompt(promptPath) {
  const raw = fs.readFileSync(promptPath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Logo brief must be valid JSON before archiving: ${promptPath}\n${error.message}`);
  }
}

function readPngTransparency(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 33 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error(`Logo must be a PNG file: ${filePath}`);
  }

  let offset = 8;
  let width = null;
  let height = null;
  let bitDepth = null;
  let colorType = null;
  let hasTrns = false;
  const idatChunks = [];

  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    if (dataEnd + 4 > buffer.length) throw new Error(`Invalid PNG chunk length in ${filePath}`);

    if (type === 'IHDR') {
      width = buffer.readUInt32BE(dataStart);
      height = buffer.readUInt32BE(dataStart + 4);
      bitDepth = buffer.readUInt8(dataStart + 8);
      colorType = buffer.readUInt8(dataStart + 9);
    } else if (type === 'tRNS') {
      hasTrns = true;
    } else if (type === 'IDAT') {
      idatChunks.push(buffer.subarray(dataStart, dataEnd));
    } else if (type === 'IEND') {
      break;
    }

    offset = dataEnd + 4;
  }

  const hasAlphaSupport = colorType === 4 || colorType === 6 || hasTrns;
  if (!hasAlphaSupport) {
    throw new Error(`Logo PNG lacks alpha/transparency metadata: ${filePath}. Export a transparent-background PNG before archiving.`);
  }

  const hasTransparentPixels = hasActualTransparency({
    filePath,
    width,
    height,
    bitDepth,
    colorType,
    hasTrns,
    idatChunks,
  });
  if (!hasTransparentPixels) {
    throw new Error(`Logo PNG has alpha support but no transparent pixels: ${filePath}. Remove the filled background and export an actual transparent-background PNG.`);
  }

  return {
    width,
    height,
    bit_depth: bitDepth,
    color_type: colorType,
    has_trns_chunk: hasTrns,
    has_transparent_pixels: true,
    transparent_png_verified: true,
  };
}

function paethPredictor(left, up, upLeft) {
  const p = left + up - upLeft;
  const pa = Math.abs(p - left);
  const pb = Math.abs(p - up);
  const pc = Math.abs(p - upLeft);
  if (pa <= pb && pa <= pc) return left;
  if (pb <= pc) return up;
  return upLeft;
}

function bytesPerPixel(colorType) {
  if (colorType === 6) return 4;
  if (colorType === 4) return 2;
  if (colorType === 3) return 1;
  return null;
}

function unfilterScanlines({ inflated, width, height, colorType }) {
  const bpp = bytesPerPixel(colorType);
  if (!bpp) return null;
  const stride = width * bpp;
  const rows = [];
  let offset = 0;
  let previous = Buffer.alloc(stride);

  for (let y = 0; y < height; y += 1) {
    const filter = inflated.readUInt8(offset);
    offset += 1;
    const raw = inflated.subarray(offset, offset + stride);
    offset += stride;
    if (raw.length !== stride) throw new Error('Unexpected PNG scanline length while checking transparency.');

    const row = Buffer.alloc(stride);
    for (let x = 0; x < stride; x += 1) {
      const left = x >= bpp ? row[x - bpp] : 0;
      const up = previous[x] ?? 0;
      const upLeft = x >= bpp ? previous[x - bpp] : 0;
      let value;
      if (filter === 0) value = raw[x];
      else if (filter === 1) value = raw[x] + left;
      else if (filter === 2) value = raw[x] + up;
      else if (filter === 3) value = raw[x] + Math.floor((left + up) / 2);
      else if (filter === 4) value = raw[x] + paethPredictor(left, up, upLeft);
      else throw new Error(`Unsupported PNG filter type ${filter} while checking transparency.`);
      row[x] = value & 0xff;
    }
    rows.push(row);
    previous = row;
  }

  return rows;
}

function hasActualTransparency({ filePath, width, height, bitDepth, colorType, hasTrns, idatChunks }) {
  if (hasTrns) return true;
  if (!(colorType === 4 || colorType === 6)) return false;
  if (bitDepth !== 8) {
    throw new Error(`Logo PNG transparency check supports 8-bit alpha PNGs; re-export ${filePath} as 8-bit transparent PNG.`);
  }

  const inflated = zlib.inflateSync(Buffer.concat(idatChunks));
  const rows = unfilterScanlines({ inflated, width, height, colorType });
  const bpp = bytesPerPixel(colorType);
  const alphaOffset = colorType === 6 ? 3 : 1;

  return rows.some((row) => {
    for (let x = alphaOffset; x < row.length; x += bpp) {
      if (row[x] < 255) return true;
    }
    return false;
  });
}

function htmlEscape(input) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function safeJsonForHtml(data) {
  return JSON.stringify(data, null, 2)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}

function defaultTemplatePath(repoRoot) {
  return path.join(repoRoot, 'skills', 'logo-maker', 'assets', 'logo-preview-template.html');
}

function createPreviewHtml({ repoRoot, destDir, topic, topicSlug, prompt, savedLogos, templatePath }) {
  const resolvedTemplatePath = path.resolve(expandHome(templatePath || defaultTemplatePath(repoRoot)));
  const template = fs.readFileSync(resolvedTemplatePath, 'utf8');
  const previewPath = path.join(destDir, 'preview.html');
  const promptPath = path.join(destDir, 'prompt.json');
  const previewData = {
    topic,
    topic_slug: topicSlug,
    generated_at: new Date().toISOString(),
    prompt_path: path.relative(destDir, promptPath),
    prompt,
    logos: savedLogos.map((logo) => {
      const absolutePath = path.join(repoRoot, logo.saved_path);
      return {
        index: logo.index,
        file_name: path.basename(logo.saved_path),
        relative_path: path.relative(destDir, absolutePath),
        project_path: logo.saved_path,
        source_path: logo.source_path,
        png: logo.png,
      };
    }),
  };

  const html = template
    .replaceAll('__PAGE_TITLE__', htmlEscape(`Logo preview · ${topic}`))
    .replaceAll('__PREVIEW_DATA_JSON__', safeJsonForHtml(previewData));

  fs.writeFileSync(previewPath, html);
  return previewPath;
}

function openPreviewInChrome(previewPath) {
  const url = pathToFileURL(previewPath).href;

  if (process.platform === 'darwin') {
    const result = spawnSync('open', ['-na', 'Google Chrome', '--args', '--new-window', url], {
      encoding: 'utf8',
    });
    if (result.status === 0) return { opened: true, command: `open -na "Google Chrome" --args --new-window ${url}` };

    const fallback = spawnSync('open', [url], { encoding: 'utf8' });
    return {
      opened: fallback.status === 0,
      command: `open ${url}`,
      warning: result.stderr || fallback.stderr || 'Failed to open Google Chrome; used system opener fallback.',
    };
  }

  const chromeCommand = process.platform === 'win32' ? 'chrome' : 'google-chrome';
  const result = spawnSync(chromeCommand, ['--new-window', url], {
    encoding: 'utf8',
    detached: true,
    stdio: 'ignore',
  });

  return {
    opened: result.status === 0 || result.error == null,
    command: `${chromeCommand} --new-window ${url}`,
    warning: result.error?.message,
  };
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.topic || !opts.prompt || (!opts.logos.length && !opts.latest)) {
    printUsage();
    process.exitCode = 2;
    return;
  }

  const repoRoot = path.resolve(expandHome(opts.repoRoot));
  const fromDir = path.resolve(expandHome(opts.fromDir));
  const promptPath = path.resolve(expandHome(opts.prompt));
  const topicSlug = slugify(opts.topic);
  const destDir = path.join(repoRoot, '.hypercore', 'logo-maker', topicSlug);
  const logoSources = opts.logos.length
    ? opts.logos.map((filePath) => path.resolve(expandHome(filePath)))
    : newestPngs(fromDir, opts.latest);

  assertFile(promptPath, 'Logo brief');
  logoSources.forEach((filePath, index) => assertFile(filePath, `Logo ${index + 1}`));
  const pngChecks = logoSources.map((filePath) => readPngTransparency(filePath));
  fs.mkdirSync(destDir, { recursive: true });

  const savedLogos = logoSources.map((sourcePath, index) => {
    const destPath = path.join(destDir, `logo${index + 1}.png`);
    fs.copyFileSync(sourcePath, destPath);
    return {
      index: index + 1,
      source_path: sourcePath,
      saved_path: path.relative(repoRoot, destPath),
      png: pngChecks[index],
    };
  });

  const prompt = readPrompt(promptPath);
  prompt.logo_archive = {
    topic: opts.topic,
    topic_slug: topicSlug,
    prompt_path: path.relative(repoRoot, path.join(destDir, 'prompt.json')),
    logo_paths: savedLogos.map((logo) => logo.saved_path),
    source_logo_paths: savedLogos.map((logo) => logo.source_path),
    transparent_png_required: true,
    transparent_png_checks: savedLogos.map((logo) => ({
      path: logo.saved_path,
      ...logo.png,
    })),
    archived_at: new Date().toISOString(),
  };

  let previewPath = null;
  let browserOpen = null;
  if (opts.preview) {
    previewPath = path.join(destDir, 'preview.html');
    prompt.logo_archive.preview_path = path.relative(repoRoot, previewPath);
  }

  fs.writeFileSync(path.join(destDir, 'prompt.json'), `${JSON.stringify(prompt, null, 2)}\n`);

  if (opts.preview) {
    previewPath = createPreviewHtml({
      repoRoot,
      destDir,
      topic: opts.topic,
      topicSlug,
      prompt,
      savedLogos,
      templatePath: opts.template,
    });

    if (opts.openPreview) {
      browserOpen = openPreviewInChrome(previewPath);
    }
  }

  console.log(JSON.stringify({
    topic_slug: topicSlug,
    output_dir: path.relative(repoRoot, destDir),
    prompt_path: path.relative(repoRoot, path.join(destDir, 'prompt.json')),
    logo_paths: savedLogos.map((logo) => logo.saved_path),
    preview_path: previewPath ? path.relative(repoRoot, previewPath) : null,
    transparent_png_checks: savedLogos.map((logo) => ({
      path: logo.saved_path,
      ...logo.png,
    })),
    browser_open: browserOpen,
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
