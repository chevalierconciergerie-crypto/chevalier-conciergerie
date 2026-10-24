/*
  Les conversations de l'assistant, pour Victor : GET /api/questions?cle=<ASSISTANT_CLE>.
  ASSISTANT_CLE est un mot de passe choisi par Victor dans les réglages Vercel.
*/
import { list } from "@vercel/blob";

const esc = (t) => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async function handler(req, res) {
  const cle = process.env.ASSISTANT_CLE;
  if (!cle || req.query.cle !== cle) return res.status(401).send("Accès refusé.");
  const { blobs } = await list({ prefix: "conversations/", limit: 1000 });
  const recents = blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)).slice(0, 200);
  const conversations = await Promise.all(recents.map((b) => fetch(b.url).then((r) => r.json()).catch(() => null)));
  const lignes = conversations.filter(Boolean).map((c) => {
    const date = new Date(c.maj).toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
    const echanges = c.messages
      .map((m) => `<p class="${m.role}"><strong>${m.role === "user" ? "Voyageur" : "Assistant"} :</strong> ${esc(m.content).replace(/\n/g, "<br>")}</p>`)
      .join("");
    return `<article><h2>${esc(date)} · <small>${esc(c.page)}</small></h2>${echanges}</article>`;
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  res.status(200).send(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Questions des voyageurs</title>
<style>body{font-family:system-ui,sans-serif;max-width:760px;margin:0 auto;padding:24px 16px;background:#f8f0e8;color:#0a0a0a}h1{font-size:24px}article{background:#fff;border-radius:10px;padding:16px;margin:0 0 14px;box-shadow:0 6px 20px -14px rgba(0,0,0,.4)}h2{font-size:14px;margin:0 0 8px}small{color:#777;font-weight:400}p{margin:6px 0;line-height:1.5;font-size:15px}p.user{color:#96523c}</style></head>
<body><h1>Questions des voyageurs (${lignes.length})</h1>${lignes.join("") || "<p>Aucune conversation pour l'instant.</p>"}</body></html>`);
}
