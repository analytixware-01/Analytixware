// Compress images and videos in public/img in place.
// Usage: npm run optimize:media
// Safe to re-run: a file is only replaced when the result is smaller.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const run = promisify(execFile);
sharp.cache(false);
const IMG_DIR = path.resolve('public/img');
const MAX_WIDTH = 1920;
// Images shown small on the page don't need full resolution.
const WIDTH_OVERRIDES = {
  'logo-no-background.png': 480, // shown at most ~170px wide; 480 keeps it sharp on retina
  'icon.jpg': 256,
};

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
let before = 0;
let after = 0;

async function replaceIfSmaller(file, buf) {
  const old = (await fs.stat(file)).size;
  before += old;
  if (buf.length < old) {
    await fs.writeFile(file, buf);
    after += buf.length;
    console.log(`${path.basename(file).padEnd(40)} ${kb(old).padStart(9)} -> ${kb(buf.length)}`);
  } else {
    after += old;
  }
}

async function optimizeImage(file) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file);
  const maxW = WIDTH_OVERRIDES[name] ?? MAX_WIDTH;
  // Read into memory first so the file isn't locked when we overwrite it (Windows/OneDrive).
  let img = sharp(await fs.readFile(file), { animated: false }).rotate().resize({ width: maxW, withoutEnlargement: true });

  if (ext === '.jpg' || ext === '.jpeg') img = img.jpeg({ quality: 78, mozjpeg: true, progressive: true });
  else if (ext === '.png') img = img.png({ palette: true, quality: 85, effort: 10, compressionLevel: 9 });
  else if (ext === '.webp') img = img.webp({ quality: 78, effort: 6 });
  else return;

  await replaceIfSmaller(file, await img.toBuffer());
}

async function optimizeVideo(file) {
  const tmp = file.replace(/\.mp4$/i, '.tmp.mp4');
  await run(ffmpegPath, [
    '-y', '-i', file,
    '-vf', "scale='min(1280,iw)':-2",
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '28',
    '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart',
    tmp,
  ], { maxBuffer: 1 << 26 });
  await replaceIfSmaller(file, await fs.readFile(tmp));
  await fs.rm(tmp);
}

for (const entry of await fs.readdir(IMG_DIR)) {
  const file = path.join(IMG_DIR, entry);
  if (/\.mp4$/i.test(entry)) await optimizeVideo(file);
  else await optimizeImage(file);
}

console.log(`\nTotal: ${kb(before)} -> ${kb(after)}`);
