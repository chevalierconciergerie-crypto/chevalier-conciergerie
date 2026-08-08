/**
 * Prépare les visuels du Journal.
 *
 * Les articles vivent en Markdown : ils ne peuvent pas utiliser les imports Vite de
 * src/assets. On copie donc les visuels retenus dans public/journal/, servis par une
 * URL stable — utilisable à la fois par le composant React, le HTML prérendu et la
 * balise og:image.
 *
 * Deux tailles par visuel :
 *   <slug>.jpg        1200px — bandeau de l'article
 *   <slug>-card.jpg    800px — vignette de la liste
 *
 *   node scripts/journal-images.mjs
 */
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "src", "assets");
const OUT = path.join(root, "public", "journal");

/** [source, nom de sortie] — choisis pour coller au sujet de chaque article. */
const IMAGES = [
  ["place-horloge.jpg", "declarer-location-saisonniere-avignon"],
  ["hero-interior.jpg", "calculer-rentabilite-reelle-location-courte-duree"],
  ["palais-papes-panorama.jpg", "journal-defaut"],
];

mkdirSync(OUT, { recursive: true });
const ko = (n) => Math.round(n / 1024);

for (const [src, slug] of IMAGES) {
  const from = path.join(SRC, src);

  for (const [suffix, width] of [["", 1200], ["-card", 800]]) {
    const to = path.join(OUT, `${slug}${suffix}.jpg`);
    await sharp(from)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(to);
    console.log(`  ${path.basename(to).padEnd(52)} ${String(width).padStart(4)}px  ${ko(statSync(to).size)} ko`);
  }
}

console.log(`\n${IMAGES.length * 2} visuels générés dans public/journal/`);
