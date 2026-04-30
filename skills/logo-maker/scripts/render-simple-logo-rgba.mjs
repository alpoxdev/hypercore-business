#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function usage() {
  console.error(`Usage:
  node skills/logo-maker/scripts/render-simple-logo-rgba.mjs --out path/to/logo.png [--size 1024]

Renders a deterministic clean RGBA transparent PNG fallback mark for logo jobs when native image generation repeatedly returns RGB or filled-background PNGs.`);
}

function parseArgs(argv) {
  const opts = { size: 1024 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out') opts.out = argv[++i];
    else if (arg === '--size') opts.size = Number.parseInt(argv[++i], 10);
  }
  return opts;
}

function crcChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  typeBuffer.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(zlib.crc32(Buffer.concat([typeBuffer, data])) >>> 0, 8 + data.length);
  return out;
}

function writePng(filePath, width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    rgba.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    crcChunk('IHDR', ihdr),
    crcChunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    crcChunk('IEND', Buffer.alloc(0)),
  ]));
}

function drawFallbackLogo(size) {
  const scale = 4;
  const canvasSize = size * scale;
  const pixels = Buffer.alloc(canvasSize * canvasSize * 4);

  const blend = (x, y, [r, g, b, a]) => {
    if (x < 0 || y < 0 || x >= canvasSize || y >= canvasSize) return;
    const i = (y * canvasSize + x) * 4;
    const da = pixels[i + 3];
    const oa = a + Math.round(da * (255 - a) / 255);
    if (oa === 0) return;
    pixels[i] = Math.round((r * a + pixels[i] * da * (255 - a) / 255) / oa);
    pixels[i + 1] = Math.round((g * a + pixels[i + 1] * da * (255 - a) / 255) / oa);
    pixels[i + 2] = Math.round((b * a + pixels[i + 2] * da * (255 - a) / 255) / oa);
    pixels[i + 3] = oa;
  };

  const roundedRect = (x0, y0, x1, y1, radius, color) => {
    x0 = Math.round(x0 * scale); y0 = Math.round(y0 * scale);
    x1 = Math.round(x1 * scale); y1 = Math.round(y1 * scale);
    radius = Math.round(radius * scale);
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const cx = Math.min(Math.max(x, x0 + radius), x1 - radius - 1);
        const cy = Math.min(Math.max(y, y0 + radius), y1 - radius - 1);
        if ((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2) blend(x, y, color);
      }
    }
  };

  const diamond = (cx, cy, radius, color) => {
    cx = Math.round(cx * scale); cy = Math.round(cy * scale); radius = Math.round(radius * scale);
    for (let y = cy - radius; y <= cy + radius; y += 1) {
      const half = radius - Math.abs(y - cy);
      for (let x = cx - half; x <= cx + half; x += 1) blend(x, y, color);
    }
  };

  const u = size / 1024;
  const indigo = [50, 55, 190, 255];
  const blue = [18, 152, 245, 255];
  const amber = [255, 184, 48, 255];

  roundedRect(284 * u, 242 * u, 434 * u, 782 * u, 58 * u, indigo);
  roundedRect(590 * u, 242 * u, 740 * u, 782 * u, 58 * u, indigo);
  roundedRect(382 * u, 447 * u, 642 * u, 577 * u, 44 * u, blue);
  diamond(512 * u, 512 * u, 42 * u, amber);

  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const sums = [0, 0, 0, 0];
      for (let sy = y * scale; sy < (y + 1) * scale; sy += 1) {
        for (let sx = x * scale; sx < (x + 1) * scale; sx += 1) {
          const si = (sy * canvasSize + sx) * 4;
          sums[0] += pixels[si]; sums[1] += pixels[si + 1]; sums[2] += pixels[si + 2]; sums[3] += pixels[si + 3];
        }
      }
      const oi = (y * size + x) * 4;
      out[oi] = Math.round(sums[0] / (scale * scale));
      out[oi + 1] = Math.round(sums[1] / (scale * scale));
      out[oi + 2] = Math.round(sums[2] / (scale * scale));
      out[oi + 3] = Math.round(sums[3] / (scale * scale));
    }
  }
  return out;
}

const opts = parseArgs(process.argv.slice(2));
if (!opts.out || !Number.isInteger(opts.size) || opts.size < 128 || opts.size > 2048) {
  usage();
  process.exit(2);
} else {
  writePng(path.resolve(opts.out), opts.size, opts.size, drawFallbackLogo(opts.size));
  console.log(JSON.stringify({ output: opts.out, size: opts.size, format: 'png', color_type: 'rgba', transparent_background: true }, null, 2));
}
