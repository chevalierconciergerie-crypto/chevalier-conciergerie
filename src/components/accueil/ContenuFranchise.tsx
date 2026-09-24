import { Link } from "react-router-dom";
import Chronologie from "./Chronologie";
import { Revele } from "./Primitives";
import { Faq } from "./Services";
import { faqFranchise } from "@/data/faq";
import { INCLUS, LIEN_APPEL, PROFILS } from "@/data/franchise";

/*
  Le contenu franchise, en un seul endroit.

  Il est rendu à l'identique par la section « Devenir franchisé » de l'accueil
  et par la page /franchise : Victor veut que le visiteur voie la même chose
  qu'il arrive par le menu ou par la page. Les deux ne peuvent plus diverger,
  puisqu'il n'y a plus qu'une source.

  Seul le niveau de titre change : sur la page /franchise le sous-titre est le
  h1, sur l'accueil il ne peut pas l'être — l'accueil a déjà le sien.
*/
export default function ContenuFranchise({ commeH1 = false }: { commeH1?: boolean }) {
  const Titre = commeH1 ? "h1" : "h2";

  return (
    <>
      <Revele className="chv-entree">
        <span className="chv-badge">Le réseau Chevalier</span>
        <Titre className="chv-sous-titre">
          Vous connaissez votre ville.
          <br />
          <em>Nous connaissons le métier.</em>
        </Titre>
        <p className="chv-paragraphe" style={{ maxWidth: 640 }}>
          Monter une conciergerie seul, c'est deux ans à apprendre par l'erreur : les propriétaires qu'on ne trouve pas,
          les prix qu'on fixe au hasard, les ménages qui s'enchaînent mal, le logiciel qu'on n'a pas. Nous avons fait ces
          deux ans. Le réseau existe pour que vous ne les refassiez pas.
        </p>
        <p className="chv-paragraphe" style={{ maxWidth: 640, marginTop: 16 }}>
          Chevalier Conciergerie gère des logements à Avignon, Villeneuve-lès-Avignon et Les Angles, avec une note de
          5,0 sur 5 sur Google. Ce n'est pas une méthode écrite pour être vendue : c'est celle que nous utilisons tous
          les jours, transmise telle quelle.
        </p>
      </Revele>

      {/* Ce qui est compris — liste numérotée à filets */}
      <Revele className="chv-entete-section" style={{ marginTop: "min(8vw, 88px)" }}>
        <span className="chv-badge">Ce qui est compris</span>
        <h3 className="chv-sous-titre">
          Tout ce qu'il faut
          <br />
          <em>pour ouvrir, et pour tenir.</em>
        </h3>
      </Revele>

      <ol className="chv-liste">
        {INCLUS.map((item, i) => (
          <Revele as="li" key={item.nom} delai={i * 70} className="chv-liste__item">
            <span className="chv-liste__numero">{String(i + 1).padStart(2, "0")}</span>
            <h4>{item.nom}</h4>
            <p>{item.texte}</p>
          </Revele>
        ))}
      </ol>

      {/* À qui ça s'adresse — trois colonnes de texte */}
      <Revele className="chv-entete-section" style={{ marginTop: "min(8vw, 88px)" }}>
        <span className="chv-badge">À qui ça s'adresse</span>
        <h3 className="chv-sous-titre">
          Trois façons d'arriver,
          <br />
          <em>un seul métier à la sortie.</em>
        </h3>
      </Revele>

      <div className="chv-profils">
        {PROFILS.map((profil, i) => (
          <Revele key={profil.nom} delai={i * 110} className="chv-profil">
            <h4>{profil.nom}</h4>
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

      {/* Le parcours, du premier appel à l'ouverture */}
      <Revele className="chv-entete-section" style={{ marginTop: "min(8vw, 88px)" }}>
        <span className="chv-badge">Le parcours</span>
        <h3 className="chv-sous-titre">
          Du premier appel
          <br />
          <em>à votre première remise de clés.</em>
        </h3>
      </Revele>

      <Chronologie />

      <Revele className="chv-entete-section" delai={160} style={{ marginTop: "min(7vw, 64px)" }}>
        <Link className="chv-pastille" to={LIEN_APPEL}>
          Réserver un appel
        </Link>
      </Revele>

      {/* Les questions */}
      <div style={{ marginTop: "min(8vw, 88px)" }}>
        <Faq questions={faqFranchise} />
      </div>

      <Revele className="chv-entete-section" delai={120} style={{ marginTop: "min(6vw, 56px)" }}>
        <p className="chv-paragraphe" style={{ maxWidth: 520, marginInline: "auto", marginBottom: 24 }}>
          Le reste — le droit d'entrée, la redevance, le contrat — se dit de vive voix, une fois que nous savons de
          quelle ville vous parlez.
        </p>
        <Link className="chv-pastille" to={LIEN_APPEL}>
          Réserver un appel
        </Link>
      </Revele>
    </>
  );
}
