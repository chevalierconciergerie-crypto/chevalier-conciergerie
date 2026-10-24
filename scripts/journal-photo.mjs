/**
 * Pose la photo de couverture d'un article du Blog, prise sur Unsplash.
 *
 * Chaque article a sa propre photo, jamais réutilisée. Le registre
 * content/journal/_IMAGES.md garde la source de chacune ; comme tout fichier en « _ »,
 * il est ignoré par le chargeur d'articles et n'est jamais publié.
 *
 * Deux tailles, recadrées sur la partie la plus nette de la photo :
 *   public/journal/<slug>.jpg        1200×750 — bandeau de l'article et og:image
 *   public/journal/<slug>-card.jpg    800×500 — vignette de la liste
 *
 *   node scripts/journal-photo.mjs <url-image> <slug> <url-page-unsplash> [photographe]
 *
 * <url-image> : https://images.unsplash.com/photo-… (photos gratuites uniquement : les
 * photos Unsplash+ de plus.unsplash.com sont payantes et refusées).
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "public", "journal");
const REGISTRE = path.join(root, "content", "journal", "_IMAGES.md");

const ENTETE = `# Photos du Blog

Une photo par article, jamais deux fois la même. Registre tenu par
\`scripts/journal-photo.mjs\` : ce fichier commence par \`_\`, il n'est jamais publié.

Photos Unsplash sous licence Unsplash (usage commercial libre, mention non obligatoire).
Format : \`- slug | photo | page Unsplash | photographe | date\`

`;

const [urlImage, slug, page, photographe = "non communiqué"] = process.argv.slice(2);

function stop(message) {
  console.error(`journal-photo : ${message}`);
  process.exit(1);
}

if (!urlImage || !slug || !page) {
  stop("usage : node scripts/journal-photo.mjs <url-image> <slug> <url-page-unsplash> [photographe]");
}
const url = new URL(urlImage);
if (url.hostname !== "images.unsplash.com") {
  stop(`${url.hostname} refusé : seules les photos gratuites de images.unsplash.com sont acceptées.`);
}
if (!/^[a-z0-9-]+$/.test(slug)) stop(`slug « ${slug} » invalide (minuscules, chiffres et tirets).`);

const photo = url.pathname.replace(/^\//, ""); // photo-1786394610425-d70323ff196f
const registre = existsSync(REGISTRE) ? readFileSync(REGISTRE, "utf8") : ENTETE;
const lignes = registre.split("\n");
const doublon = lignes.find((l) => l.startsWith("- ") && l.includes(photo) && !l.startsWith(`- ${slug} |`));
if (doublon) stop(`photo déjà utilisée : ${doublon}`);

url.search = "";
url.searchParams.set("w", "2400");
url.searchParams.set("q", "85");
url.searchParams.set("fm", "jpg");
const reponse = await fetch(url);
if (!reponse.ok) stop(`téléchargement refusé (${reponse.status}) : ${url}`);
const source = Buffer.from(await reponse.arrayBuffer());

const { width = 0, height = 0 } = await sharp(source).metadata();
if (width < 1600) stop(`photo trop petite (${width} px de large, 1600 minimum).`);
if (width <= height) stop(`photo en portrait (${width}×${height}) : il faut une photo en paysage.`);

mkdirSync(OUT, { recursive: true });
const ko = (n) => Math.round(n / 1024);
for (const [suffix, w, h] of [["", 1200, 750], ["-card", 800, 500]]) {
  const to = path.join(OUT, `${slug}${suffix}.jpg`);
  await sharp(source)
    .resize({ width: w, height: h, fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(to);
  console.log(`  ${path.relative(root, to).padEnd(60)} ${w}×${h}  ${ko(statSync(to).size)} ko`);
}

const date = new Date().toISOString().slice(0, 10);
const ligne = `- ${slug} | ${photo} | ${page} | ${photographe} | ${date}`;
const autres = lignes.filter((l) => !l.startsWith(`- ${slug} |`));
while (autres.length && autres.at(-1) === "") autres.pop();
writeFileSync(REGISTRE, `${autres.join("\n")}\n${ligne}\n`);
console.log(`\nimage: /journal/${slug}.jpg  (registre : content/journal/_IMAGES.md)`);
