import { CITATION_FONDATEUR, TEXTE_TV_SUD } from "@/data/accueil";
import { Etiquette, MotifEventail, Revele, TitreAnime } from "./Primitives";

/** Qui sommes-nous : Victor, en grand — c'est le fondateur, il doit être vu. */
const Fondateur = () => (
  <section id="qui-sommes-nous" className="chv-section" aria-labelledby="chv-titre-fondateur">
    <div className="chv-entete-section">
      <Etiquette>Qui sommes-nous</Etiquette>
      <div id="chv-titre-fondateur">
        <TitreAnime lignes={["Le fondateur"]} />
      </div>
    </div>

    <MotifEventail className="chv-fondateur__motif" couleur="rgba(150,82,60,0.22)" />

    <Revele as="p" className="chv-fondateur__texte">
      {TEXTE_TV_SUD}
    </Revele>

    <div className="chv-fondateur__rangee">
      <Revele>
        <p className="chv-fondateur__citation">{CITATION_FONDATEUR}</p>
        <p className="chv-fondateur__auteur">
          Victor Chevalier
          <br />
          <span>fondateur de Chevalier Conciergerie</span>
        </p>
      </Revele>
      <Revele effet="volume" delai={120}>
        <figure className="chv-fondateur__portrait">
          <img src="/accueil/victor-portrait.webp" alt="Victor Chevalier" width={739} height={520} loading="lazy" />
        </figure>
      </Revele>
    </div>
  </section>
);

export default Fondateur;
