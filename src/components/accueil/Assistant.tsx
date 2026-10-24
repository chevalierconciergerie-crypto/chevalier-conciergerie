import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./chevalier.css";

type Message = { role: "user" | "assistant"; content: string };
const ACCUEIL = "Bonjour ! Une question sur un logement, l'arrivée, l'annulation ou le quartier ? Je vous réponds tout de suite.";
const CLE = "chv-assistant";

/*
  Assistant de discussion, en bas à droite de toutes les pages. Les réponses viennent
  de api/assistant.js (IA, à partir des fiches des logements) ; chaque conversation y
  est enregistrée pour être relue par Victor. La conversation en cours survit à la
  navigation entre pages (sessionStorage), pas à la fermeture de l'onglet.
*/
export default function Assistant() {
  const { pathname } = useLocation();
  const [ouvert, setOuvert] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [saisie, setSaisie] = useState("");
  const [attente, setAttente] = useState(false);
  const conversation = useRef<string | null>(null);
  const fil = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const brut = sessionStorage.getItem(CLE);
      if (brut) {
        const d = JSON.parse(brut);
        setMessages(d.messages || []);
        conversation.current = d.conversation || null;
      }
    } catch {
      /* stockage indisponible : conversation neuve */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(CLE, JSON.stringify({ messages, conversation: conversation.current }));
    } catch {
      /* rien */
    }
    fil.current?.scrollTo({ top: fil.current.scrollHeight });
  }, [messages, ouvert]);

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = saisie.trim();
    if (!question || attente) return;
    const suite: Message[] = [...messages, { role: "user", content: question }];
    setMessages(suite);
    setSaisie("");
    setAttente(true);
    try {
      const r = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: suite, conversation: conversation.current, page: pathname }),
      });
      const d = await r.json();
      conversation.current = d.conversation || conversation.current;
      setMessages([...suite, { role: "assistant", content: d.texte || "Écrivez-nous sur WhatsApp au 06 51 87 37 36 : https://wa.me/33651873736" }]);
    } catch {
      setMessages([...suite, { role: "assistant", content: "La connexion a échoué. Écrivez-nous sur WhatsApp au 06 51 87 37 36 (https://wa.me/33651873736) ou à contact@chevalier-conciergerie.com." }]);
    } finally {
      setAttente(false);
    }
  };

  // liens cliquables dans les réponses
  const rendre = (t: string) =>
    t.split(/(https?:\/\/[^\s)]+)/g).map((m, i) =>
      /^https?:\/\//.test(m) ? (
        <a key={i} href={m} target={m.includes("chevalier-conciergerie.com") ? undefined : "_blank"} rel="noopener">
          {m.includes("/shop/") ? "Réserver ce logement" : m.replace(/^https?:\/\/(www\.)?chevalier-conciergerie\.com/, "") || "Accueil"}
        </a>
      ) : (
        <span key={i}>{m}</span>
      ),
    );

  return (
    <div className="chv-assistant">
      {ouvert && (
        <section className="chv-assistant__panneau" aria-label="Assistant">
          <header>
            <p>
              <strong>Une question ?</strong>
              <span>Assistant IA · réponses automatiques</span>
            </p>
            <button type="button" onClick={() => setOuvert(false)} aria-label="Fermer l'assistant">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </header>
          <div className="chv-assistant__fil" ref={fil} aria-live="polite">
            <p className="chv-assistant__msg chv-assistant__msg--assistant">{ACCUEIL}</p>
            {messages.map((m, i) => (
              <p key={i} className={`chv-assistant__msg chv-assistant__msg--${m.role}`}>
                {m.role === "assistant" ? rendre(m.content) : m.content}
              </p>
            ))}
            {attente && <p className="chv-assistant__msg chv-assistant__msg--assistant chv-assistant__attente">…</p>}
          </div>
          <form onSubmit={envoyer}>
            <input value={saisie} onChange={(e) => setSaisie(e.target.value)} placeholder="Votre question" maxLength={1500} aria-label="Votre question" />
            <button type="submit" disabled={attente || !saisie.trim()}>Envoyer</button>
          </form>
          <p className="chv-assistant__mention">Vos messages sont enregistrés pour que nous puissions vous répondre et améliorer nos réponses. <a href="/politique-confidentialite">Confidentialité</a></p>
        </section>
      )}
      {!ouvert && (
        <button type="button" className="chv-assistant__bouton" onClick={() => setOuvert(true)}>
          Une question ?
        </button>
      )}
    </div>
  );
}
