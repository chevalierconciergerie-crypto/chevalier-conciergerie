import { Link } from "react-router-dom";
import { Helmet } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chronologie from "@/components/accueil/Chronologie";
import { Revele, TitreAnime } from "@/components/accueil/Primitives";
import { Faq } from "@/components/accueil/Services";
import { faqFranchise } from "@/data/faq";
import { INCLUS, LIEN_APPEL, PROFILS } from "@/data/franchise";

/*
  /franchise — la page de recrutement du réseau.

  Écrite dans le registre de l'accueil (classes chv-, Federo et Outfit). Aucun
  chiffre publié : droit d'entrée, redevance et durée du contrat se détaillent
  à l'appel.

  Deuxième passe, après retour de Victor : le grand titre dit « Devenir
  franchisé » et non plus « Ouvrez votre conciergerie » ; les trois grilles de
  cartes identiques sont remplacées par des formes distinctes — une liste
  numérotée à filets, trois colonnes de texte, une chronologie verticale — pour
  sortir de l'empilement de blocs interchangeables.
*/
const Franchise = () => {
  return (
    <>
      <Helmet>
        <title>Devenir franchisé | Ouvrir sa conciergerie | Chevalier Conciergerie</title>
        <meta
          name="description"
          content="Devenez franchisé Chevalier Conciergerie : marque et territoire réservé, plus de 40 h de formation, logiciel PMS et CRM compris, site web et référencement, kit marketing, accompagnement continu. Du premier appel à l'ouverture."
        />
        <meta
          name="keywords"
          content="devenir franchisé conciergerie, franchise conciergerie, ouvrir une conciergerie, réseau conciergerie Airbnb, franchise gestion locative, monter sa conciergerie"
        />
        <meta property="og:title" content="Devenir franchisé Chevalier Conciergerie" />
        <meta
          property="og:description"
          content="La marque, un territoire réservé, plus de 40 h de formation, le logiciel, le site et le kit marketing. Réservez un appel."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <link rel="canonical" href="https://chevalier-conciergerie.com/franchise" />
      </Helmet>

      <Header />

      <main className="chv chv-franchise">
        {/* Ouverture */}
        <section className="chv-section" aria-label="Devenir franchisé">
          <TitreAnime lignes={["Devenir", "franchisé."]} />

          <Revele className="chv-entree">
            <span className="chv-badge">Le réseau Chevalier</span>
            <h1 className="chv-sous-titre">
              Vous connaissez votre ville.
              <br />
              <em>Nous connaissons le métier.</em>
            </h1>
            <p className="chv-paragraphe" style={{ maxWidth: 640 }}>
              Monter une conciergerie seul, c'est deux ans à apprendre par l'erreur : les propriétaires qu'on ne trouve
              pas, les prix qu'on fixe au hasard, les ménages qui s'enchaînent mal, le logiciel qu'on n'a pas. Nous avons
              fait ces deux ans. Le réseau existe pour que vous ne les refassiez pas.
            </p>
            <p className="chv-paragraphe" style={{ maxWidth: 640, marginTop: 16 }}>
              Chevalier Conciergerie gère des logements à Avignon, Villeneuve-lès-Avignon et Les Angles, avec une note
              de 5,0 sur 5 sur Google. Ce n'est pas une méthode écrite pour être vendue : c'est celle que nous utilisons
              tous les jours, transmise telle quelle.
            </p>
          </Revele>
        </section>

        {/* Ce qui est compris — liste numérotée à filets */}
        <section className="chv-section" aria-label="Ce qui est compris dans le réseau">
          <Revele className="chv-entete-section">
            <span className="chv-badge">Ce qui est compris</span>
            <h2 className="chv-sous-titre">
              Tout ce qu'il faut
              <br />
              <em>pour ouvrir, et pour tenir.</em>
            </h2>
          </Revele>

          <ol className="chv-liste">
            {INCLUS.map((item, i) => (
              <Revele as="li" key={item.nom} delai={i * 70} className="chv-liste__item">
                <span className="chv-liste__numero">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.nom}</h3>
                <p>{item.texte}</p>
              </Revele>
            ))}
          </ol>
        </section>

        {/* À qui ça s'adresse — trois colonnes de texte */}
        <section className="chv-section" aria-label="À qui s'adresse la franchise">
          <Revele className="chv-entete-section">
            <span className="chv-badge">À qui ça s'adresse</span>
            <h2 className="chv-sous-titre">
              Trois façons d'arriver,
              <br />
              <em>un seul métier à la sortie.</em>
            </h2>
          </Revele>

          <div className="chv-profils">
            {PROFILS.map((profil, i) => (
              <Revele key={profil.nom} delai={i * 110} className="chv-profil">
                <h3>{profil.nom}</h3>
                <p>{profil.texte}</p>
              </Revele>
            ))}
          </div>

          <Revele className="chv-entete-section" delai={140} style={{ marginTop: "min(5vw, 44px)" }}>
            <p className="chv-paragraphe" style={{ maxWidth: 560, marginInline: "auto" }}>
              Ce qui compte n'est pas le diplôme ni l'apport : c'est d'habiter la ville que vous voulez couvrir, et de
              décrocher quand un voyageur appelle à vingt-trois heures.
            </p>
          </Revele>
        </section>

        {/* Le parcours, du premier appel à l'ouverture */}
        <section className="chv-section" aria-label="Le parcours, du premier appel à l'ouverture">
          <Revele className="chv-entete-section">
            <span className="chv-badge">Le parcours</span>
            <h2 className="chv-sous-titre">
              Du premier appel
              <br />
              <em>à votre première remise de clés.</em>
            </h2>
          </Revele>

          <Chronologie />

          <Revele className="chv-entete-section" delai={160} style={{ marginTop: "min(7vw, 64px)" }}>
            <Link className="chv-pastille" to={LIEN_APPEL}>
              Réserver un appel
            </Link>
          </Revele>
        </section>

        <section className="chv-section" aria-label="Questions fréquentes sur la franchise">
          <Faq questions={faqFranchise} />

          <Revele className="chv-entete-section" delai={120} style={{ marginTop: "min(6vw, 56px)" }}>
            <p className="chv-paragraphe" style={{ maxWidth: 520, marginInline: "auto", marginBottom: 24 }}>
              Le reste — le droit d'entrée, la redevance, le contrat — se dit de vive voix, une fois que nous savons de
              quelle ville vous parlez.
            </p>
            <Link className="chv-pastille" to={LIEN_APPEL}>
              Réserver un appel
            </Link>
          </Revele>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Franchise;
