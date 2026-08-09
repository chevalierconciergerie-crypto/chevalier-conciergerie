import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
}

// Avis réels récupérés depuis la fiche Google "CHEVALIER CONCIERGERIE" (5,0/5 · 12 avis) le 2026-07-29.
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Clément Pailler",
    rating: 5,
    text: "J'ai fait appel à Chevalier Conciergerie pour mon appartement et je suis absolument ravi de la manière dont j'ai été accompagné par Victor. Je recommande à 100 % !",
  },
  {
    id: 2,
    name: "Baptiste Mailharrancin",
    rating: 5,
    text: "Je confie mon appartement en centre-ville d'Avignon à CHEVALIER Conciergerie depuis plusieurs mois et je ne regrette pas. Communication fluide, réactivité au top et mes voyageurs sont toujours très bien accueillis. Je ne m'occupe plus de rien et mes revenus locatifs ont augmenté.",
  },
  {
    id: 3,
    name: "Sandrine David",
    rating: 5,
    text: "Très satisfait de Chevalier Conciergerie ! Équipe professionnelle, réactive et à l'écoute. Service de qualité et communication au top. Je recommande sans hésiter.",
  },
  {
    id: 4,
    name: "felicien arnoux",
    rating: 5,
    text: "Excellente conciergerie, très professionnelle et à l'écoute des clients. Je recommande vivement pour tout projet de location courte durée sur le secteur Gard et Vaucluse.",
  },
  {
    id: 5,
    name: "Solitchi",
    rating: 5,
    text: "Très satisfait de mon expérience avec Victor sur Avignon. Professionnalisme, réactivité et conseils au top du début à la fin.",
  },
  {
    id: 6,
    name: "Pierrick",
    rating: 5,
    text: "Excellente conciergerie sur Avignon, je recommande CHEVALIER Conciergerie.",
  },
];

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/CHEVALIER+CONCIERGERIE/@43.8680214,4.8327906,17z";

/*
  Lien pour déposer un avis. Il pointe pour l'instant sur la fiche elle-même,
  où le bouton « Rédiger un avis » de Google prend le relais.

  Le lien direct vers le formulaire existe et évite ce détour, mais il contient
  l'identifiant de l'établissement : il se récupère dans le profil Google
  Business (Demander des avis), sous la forme https://g.page/r/…/review. Le
  fabriquer de tête enverrait les clients sur une fiche qui n'est pas la bonne.
*/
const GOOGLE_WRITE_REVIEW_URL = GOOGLE_REVIEWS_URL;

/*
  Logo Google dessiné aux couleurs officielles. Ce sont elles qui font la
  reconnaissance : redessiné en noir et blanc pour « coller à la charte », il
  cesserait d'être une preuve extérieure et redeviendrait une décoration du
  site — c'est-à-dire l'inverse de ce qu'un avis est censé apporter.
*/
const GoogleLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Etoiles = ({ nombre }: { nombre: number }) => (
  <span className="flex gap-0.5" aria-label={`${nombre} étoiles sur 5`}>
    {Array.from({ length: nombre }).map((_, i) => (
      /* Le doré vient de Google, pas de la palette du site : c'est un repère
         universel, le décolorer en noir et blanc le rendrait méconnaissable. */
      <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
    ))}
  </span>
);

/*
  Pastille d'initiale, telle que Google la génère pour un compte sans photo :
  un aplat de couleur tiré de sa palette, l'initiale en blanc au centre.

  Les couleurs sont volontairement hors de la charte noir et blanc du site.
  C'est le même raisonnement que pour le logo et les étoiles : cette pastille
  doit ressembler à ce qu'on voit sur Google, pas au site. Repeinte en noir,
  elle deviendrait un élément de décoration parmi d'autres et perdrait ce
  qu'elle apporte — l'air de venir d'ailleurs.

  La couleur est déduite du nom, donc stable : le même auteur garde la même
  pastille d'une visite à l'autre, comme sur une vraie fiche.
*/
const COULEURS_AVATAR = [
  "#DB4437", "#0F9D58", "#4285F4", "#AB47BC",
  "#00796B", "#C2185B", "#5C6BC0", "#EF6C00",
];

const couleurPour = (nom: string) => {
  let somme = 0;
  for (let i = 0; i < nom.length; i += 1) somme += nom.charCodeAt(i);
  return COULEURS_AVATAR[somme % COULEURS_AVATAR.length];
};

const Initiale = ({ nom }: { nom: string }) => (
  <span
    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-base font-medium text-white"
    style={{ backgroundColor: couleurPour(nom) }}
  >
    {nom.trim().charAt(0).toUpperCase()}
  </span>
);

const SEUIL_REPLI = 150;

const CarteAvis = ({ avis }: { avis: Testimonial }) => {
  const [deplie, setDeplie] = useState(false);
  const longue = avis.text.length > SEUIL_REPLI;

  return (
    <article className="w-[340px] shrink-0 rounded-lg border border-border bg-card p-6">
      <header className="flex items-center gap-3">
        <Initiale nom={avis.name} />
        <div className="min-w-0">
          <p className="truncate font-sans text-[15px] font-semibold text-foreground">
            {avis.name}
          </p>
          <Etoiles nombre={avis.rating} />
        </div>
        <GoogleLogo className="ml-auto h-5 w-5 shrink-0" />
      </header>

      {/*
        Le texte est replié au-delà de 150 caractères et se déplie sur place.
        Les avis longs sont les plus convaincants — ce sont ceux qui racontent —
        mais alignés en entier ils donnent des cartes de hauteurs très
        différentes, et le bloc se met à ressembler à un mur de texte.

        Les guillemets qui encadraient chaque avis sont retirés : sur une fiche
        Google il n'y en a pas, et leur présence signalait une citation mise en
        scène par le site plutôt qu'un avis rapporté tel quel.
      */}
      <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/75">
        {deplie || !longue ? avis.text : `${avis.text.slice(0, SEUIL_REPLI).trimEnd()}…`}
      </p>

      {longue && (
        <button
          type="button"
          onClick={() => setDeplie((v) => !v)}
          className="mt-3 font-sans text-[13px] font-medium text-foreground underline-offset-4 hover:underline"
        >
          {deplie ? "Réduire" : "Lire la suite"}
        </button>
      )}
    </article>
  );
};

const TestimonialsCarousel = () => {
  const [enPause, setEnPause] = useState(false);

  // Piste dupliquée : le défilement infini se fait en translatant de -50 %,
  // ce qui suppose que la seconde moitié reprenne la première à l'identique.
  const piste = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-6">
        {/*
          En-tête repris de la présentation d'une fiche Google : la note en
          gros, les étoiles, le nombre d'avis entre parenthèses. Un visiteur
          l'a déjà vue cent fois — c'est précisément ce qui la rend crédible,
          là où un habillage inventé demande qu'on le croie sur parole.

          Le titre « Ils Nous Font Confiance » a sauté : c'est le site qui se
          félicite lui-même, juste au-dessus d'avis qui, eux, viennent de
          l'extérieur. La note fait le même travail sans se vanter.
        */}
        <div className="mx-auto mb-10 flex max-w-5xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <GoogleLogo className="h-8 w-8" />
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Avis Google
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-serif text-2xl leading-none text-foreground">5,0</span>
                <Etoiles nombre={5} />
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  12 avis
                </a>
              </div>
            </div>
          </div>

          {/*
            Une seule action, et sans pastille de couleur à l'intérieur. Deux
            gélules côte à côte se disputaient l'attention alors qu'une seule
            compte ici, et l'étoile dorée posée dans le bouton noir ramenait le
            clinquant que la palette noir et blanc cherche justement à éviter.

            « Voir les avis » n'a plus besoin d'un bouton : le nombre affiché
            juste au-dessus est lui-même cliquable, comme sur une fiche Google.
          */}
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ressort group relative isolate inline-flex items-center rounded-full bg-[hsl(0_0%_8%)] px-7 py-3.5 font-sans text-sm font-semibold text-white"
          >
            <span aria-hidden className="btn-brille" />
            Laisser un avis
          </a>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setEnPause(true)}
        onMouseLeave={() => setEnPause(false)}
      >
        {/* Les bords s'estompent : sans cela les cartes apparaissent et
            disparaissent net au ras de l'écran, ce qui rend la boucle visible. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary to-transparent md:w-40" />

        <div
          className={cn("flex w-max gap-5 animate-marquee", enPause && "pause-animation")}
        >
          {piste.map((avis, index) => (
            <CarteAvis key={`${avis.id}-${index}`} avis={avis} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
