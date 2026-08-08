/**
 * Passe de redimensionnement des visuels.
 *
 * Mesuré dans le navigateur : plusieurs images étaient servies jusqu'à 19 fois plus
 * grandes que leur taille d'affichage. vite-plugin-image-optimizer agit sur la qualité,
 * pas sur les dimensions — il ne pouvait donc rien y faire.
 *
 * Deux traitements :
 *   1. Cibles précises, calées sur le double de la taille d'affichage observée.
 *   2. Passe générale : tout le reste est plafonné à MAX_WIDTH.
 *
 * Les originaux sont dans git ; ce script écrase les fichiers sur place.
 *
 *   node scripts/resize-assets.mjs
 */
import sharp from "sharp";
import { statSync, renameSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = path.join(root, "src", "assets");

/** Aucun visuel du site n'est affiché au-delà de ~700px de large, même en pleine largeur. */
const MAX_WIDTH = 1400;

/** [fichier, largeur cible] — calé sur 2× la taille d'affichage mesurée. */
const EXACT = {
  "victor-chevalier.jpg": 1104,
  "logo-booking.png": 160,
  "logo-airbnb.png": 160,
  "logo-abritel.png": 160,
  "logo-cc-transparent.png": 512,
  "bien-immobilier-1.jpg": 640,
  "bien-immobilier-2.jpg": 640,
};

const ko = (n) => Math.round(n / 1024);
let before = 0;
let after = 0;
let touched = 0;

for (const file of readdirSync(ASSETS)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;

  const p = path.join(ASSETS, file);
  const sizeBefore = statSync(p).size;
  before += sizeBefore;

  const meta = await sharp(p).metadata();
  const target = EXACT[file] ?? MAX_WIDTH;

  if (meta.width <= target) {
    after += sizeBefore;
    continue;
  }

  const png = path.extname(p).toLowerCase() === ".png";
  const buf = await sharp(p)
    .resize({ width: target, withoutEnlargement: true })
    [png ? "png" : "jpeg"](png ? { compressionLevel: 9, palette: true } : { quality: 82, mozjpeg: true })
    .toBuffer();

  // sharp garde le fichier source ouvert : écrire dessus directement échoue sous
  // Windows. On passe par un fichier temporaire, puis on remplace.
  const tmp = p + ".tmp";
  await sharp(buf).toFile(tmp);
  renameSync(tmp, p);

  const sizeAfter = statSync(p).size;
  after += sizeAfter;
  touched++;
  console.log(
    `  ${file.padEnd(34)} ${String(meta.width).padStart(4)}px → ${String(target).padStart(4)}px   ` +
      `${String(ko(sizeBefore)).padStart(5)} ko → ${String(ko(sizeAfter)).padStart(4)} ko`,
  );
}

console.log(
  `\n${touched} images redimensionnées — total ${ko(before)} ko → ${ko(after)} ko ` +
    `(−${Math.round((1 - after / before) * 100)} %)`,
);
