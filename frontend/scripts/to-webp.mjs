/**
 * Converts every JPG/PNG under the given folders to WebP with sharp.
 *
 *   node scripts/to-webp.mjs src/assets/images/leadership
 *
 * Each image is capped at MAX px wide (never enlarged) and written beside
 * the original as <name>.webp. Existing .webp files are left alone unless
 * --force is passed. Originals are kept; delete them once nothing imports them.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX = 1000;
const QUALITY = 80;

const args = process.argv.slice(2);
const force = args.includes("--force");
const dirs = args.filter((a) => !a.startsWith("--"));

if (!dirs.length) {
  console.error("usage: node scripts/to-webp.mjs <folder> [...folders] [--force]");
  process.exit(1);
}

const exists = (p) => stat(p).then(() => true, () => false);

for (const dir of dirs) {
  for (const name of await readdir(dir)) {
    if (!/\.(jpe?g|png)$/i.test(name)) continue;
    const src = path.join(dir, name);
    const out = src.replace(/\.(jpe?g|png)$/i, ".webp");
    if (!force && (await exists(out))) {
      console.log(`skip  ${out} (exists)`);
      continue;
    }
    const before = (await stat(src)).size;
    await sharp(src)
      .rotate() // respect EXIF orientation
      .resize({ width: MAX, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
    const after = (await stat(out)).size;
    console.log(`${src}  ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
  }
}
