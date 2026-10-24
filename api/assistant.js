/*
  Assistant de discussion du site (fonction Vercel, POST /api/assistant).

  Répond aux questions des voyageurs à partir de dist/assistant-contexte.txt (fiches
  des logements et conditions de location, construit au build) et enregistre chaque
  conversation dans le stockage Vercel Blob privé « conversations-assistant » (Paris),
  relisibles sur /api/questions ou dans Vercel → Storage → Manage Blobs.

  Variables d'environnement (réglages Vercel) : ANTHROPIC_API_KEY, BLOB_READ_WRITE_TOKEN
  (créé en connectant un stockage Blob au projet). Sans clé, le site affiche un message
  qui renvoie vers le téléphone.
*/
import Anthropic from "@anthropic-ai/sdk";
import { put } from "@vercel/blob";

const CONSIGNES = `Tu es l'assistant de Chevalier Conciergerie, conciergerie de logements de courte durée à Avignon et Villeneuve-lès-Avignon. Tu réponds aux voyageurs sur le site chevalier-conciergerie.com.

Règles :
- Réponds en français (ou dans la langue du voyageur), en deux à quatre phrases, sur un ton courtois et simple, sans formules marketing.
- Appuie-toi uniquement sur les informations ci-dessous (fiches des logements, conditions de location). Si l'information n'y est pas (prix, disponibilités, demande particulière), dis-le et propose de nous écrire sur WhatsApp au +33 6 51 87 37 36 (https://wa.me/33651873736), c'est le moyen le plus rapide, ou à contact@chevalier-conciergerie.com.
- Les prix et les disponibilités se consultent sur la page de réservation de chaque logement : donne son lien « Réserver » quand le voyageur veut réserver ou connaître un tarif.
- Pour comparer ou conseiller un logement, cite son nom et le lien de sa fiche.
- Ne promets rien qui n'est pas écrit (remise, arrivée anticipée gratuite, animaux, etc.). Les arrivées anticipées, départs tardifs et ménages supplémentaires se réservent en option sur la page de réservation.
- N'invente jamais d'adresse exacte : elle est communiquée après la réservation.

INFORMATIONS :
`;

let contexte = null;
const client = new Anthropic();

const nettoyer = (messages) =>
  (Array.isArray(messages) ? messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ erreur: "POST uniquement" });
  const corps = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const messages = nettoyer(corps.messages);
  if (!messages.length || messages[0].role !== "user" || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ erreur: "conversation invalide" });
  }
  const id = /^[a-z0-9-]{8,40}$/.test(corps.conversation || "") ? corps.conversation : crypto.randomUUID();
  const repli = "Je ne peux pas répondre pour le moment. Écrivez-nous sur WhatsApp au 06 51 87 37 36 (https://wa.me/33651873736) ou à contact@chevalier-conciergerie.com : nous vous répondons rapidement.";

  let texte = repli;
  try {
    if (!contexte) {
      const r = await fetch(`https://${req.headers.host}/assistant-contexte.txt`);
      contexte = r.ok ? await r.text() : "";
    }
    // Claude Haiku 5.5 : rapide et très peu coûteux, largement suffisant pour ces questions
    const reponse = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 4000,
      output_config: { effort: "low" },
      // le contexte est identique d'un appel à l'autre : mis en cache
      system: [{ type: "text", text: CONSIGNES + contexte, cache_control: { type: "ephemeral" } }],
      messages,
    });
    if (reponse.stop_reason !== "refusal") {
      const t = reponse.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      if (t) texte = t;
    }
  } catch (erreur) {
    if (erreur instanceof Anthropic.AuthenticationError) console.error("[assistant] clé ANTHROPIC_API_KEY absente ou invalide");
    else if (erreur instanceof Anthropic.RateLimitError) console.error("[assistant] limite de débit atteinte");
    else if (erreur instanceof Anthropic.APIError) console.error(`[assistant] erreur API ${erreur.status} : ${erreur.message}`);
    else console.error("[assistant]", erreur);
  }

  // la conversation est gardée pour que Victor relise les questions des voyageurs
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) {
      await put(
        `conversations/${id}.json`,
        JSON.stringify({ id, page: String(corps.page || "").slice(0, 200), maj: new Date().toISOString(), messages: [...messages, { role: "assistant", content: texte }] }),
        { access: "private", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" },
      );
    }
  } catch (erreur) {
    console.error("[assistant] enregistrement impossible", erreur);
  }

  return res.status(200).json({ texte, conversation: id });
}
