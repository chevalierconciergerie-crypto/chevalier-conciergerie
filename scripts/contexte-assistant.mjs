/*
  Construit dist/assistant-contexte.txt : ce que l'assistant de discussion sait des
  logements et des conditions de location. Lancé après le prérendu (npm run build),
  à partir des mêmes textes que ceux servis aux robots (scripts/seo-routes.mjs).
  La fonction api/assistant.js le lit au premier appel.
*/
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "./seo-routes.mjs";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const texte = (html) =>
  html
    .replace(/<a href="([^"]+)">([^<]*)<\/a>/g, (_, href, t) => `${t} (${href.startsWith("/") ? "https://chevalier-conciergerie.com" + href : href})`)
    .replace(/<li>/g, "\n- ")
    .replace(/<\/(p|h1|h2|h3|ul|dl|nav)>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();

const fr = ROUTES.filter((r) => (r.lang || "fr") === "fr");
const logements = fr.filter((r) => r.path.startsWith("/logements/"));
const cgv = fr.find((r) => r.path === "/cgv");
const morceaux = [
  "# LOGEMENTS",
  ...logements.map((r) => `## Fiche ${r.path} (https://chevalier-conciergerie.com${r.path})\n${texte(r.bodyHtml)}`),
  "# CONDITIONS DE LOCATION",
  texte(cgv.bodyHtml).split("2. Prestations aux propriétaires")[0],
];
writeFileSync(path.join(racine, "dist/assistant-contexte.txt"), morceaux.join("\n\n"));
console.log(`[assistant] contexte : ${logements.length} logements, ${morceaux.join("").length} caractères`);
