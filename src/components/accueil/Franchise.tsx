import { Link } from "react-router-dom";
import { INCLUS } from "@/data/franchise";
import { Revele, TitreAnime } from "./Primitives";

/*
  Section « Devenir franchisé » de l'accueil : l'aperçu, pas la page entière.
  Elle annonce ce qui est compris dans le réseau et renvoie vers /franchise,
  où le sujet est traité en entier. Aucun chiffre ici non plus.

  Le public de l'accueil reste le propriétaire : cette section vient après les
  deux formules et le blog, une fois la conciergerie démontrée.
*/
export default function Franchise() {
  return (
    <section id="franchise" className="chv-section" aria-label="Devenir franchisé Chevalier Conciergerie">
      <TitreAnime lignes={["Ouvrez votre", "conciergerie."]} />

      <Revele className="chv-entree">
        <span className="chv-badge">Le réseau</span>
        <h3 className="chv-sous-titre">
          Pas de zéro,
          <br />
          <em>avec tout ce qu'il nous a fallu apprendre.</em>
        </h3>
        <p className="chv-paragraphe" style={{ maxWidth: 620 }}>
          Nous ouvrons le réseau Chevalier Conciergerie à ceux qui veulent monter la leur dans leur ville. Vous reprenez
          la marque, la méthode, le logiciel et les outils que nous avons construits en gérant nos propres logements —
          et votre territoire n'est qu'à vous.
        </p>
      </Revele>

      <div className="chv-avantages">
        {INCLUS.map((item, i) => (
          <Revele key={item.nom} effet="volume" delai={i * 90} className="chv-avantage">
            <h3>{item.nom}</h3>
            <p>{item.texte}</p>
          </Revele>
        ))}
      </div>

      <Revele className="chv-entete-section" delai={120} style={{ marginTop: "min(7vw, 64px)" }}>
        <Link className="chv-pastille" to="/franchise">
          Découvrir le réseau
        </Link>
      </Revele>
    </section>
  );
}
