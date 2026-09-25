import { useT } from "@/i18n/langue";
import { CITATION_FONDATEUR, TEXTE_TV_SUD, RESEAUX } from "@/data/accueil";
import { Etiquette, MotifEventail, Revele, TitreAnime } from "./Primitives";

/* Le nom du compte, écrit sous le logo : on sait où on va avant de cliquer. */
const COMPTES: Record<string, string> = {
  Instagram: "@chevalier_conciergerie",
  LinkedIn: "Victor Chevalier",
  Facebook: "Chevalier Conciergerie",
};

/** Qui sommes-nous : Victor, en grand — c'est le fondateur, il doit être vu. */
const Fondateur = () => {
  const t = useT();
  return (
  <section id="qui-sommes-nous" className="chv-section" aria-labelledby="chv-titre-fondateur">
    <div className="chv-entete-section">
      <Etiquette>Qui sommes-nous</Etiquette>
      <div id="chv-titre-fondateur">
        <TitreAnime lignes={["Le fondateur"]} />
      </div>
    </div>

    <MotifEventail className="chv-fondateur__motif" couleur="rgba(150,82,60,0.22)" />

    <Revele as="p" className="chv-fondateur__texte">
      {t(TEXTE_TV_SUD)}
    </Revele>

    <div className="chv-fondateur__rangee">
      <Revele>
        <p className="chv-fondateur__citation">{t(CITATION_FONDATEUR)}</p>
        <p className="chv-fondateur__auteur">
          Victor Chevalier
          <br />
          <span>{t("fondateur de Chevalier Conciergerie")}</span>
        </p>
      </Revele>
      <Revele effet="volume" delai={120}>
        <figure className="chv-fondateur__portrait">
          <img src="/accueil/victor-portrait.webp" alt="Victor Chevalier" width={739} height={520} loading="lazy" />
        </figure>
      </Revele>
    </div>

    {/*
      Les réseaux, au niveau de « Qui sommes-nous » : c'est là qu'on cherche à
      savoir qui est derrière. Pas d'encadré — le logo et le nom du compte
      dessous, rien d'autre. Ils ont quitté la barre du haut, où leurs trois
      pastilles de couleur tiraient l'oeil plus que la navigation.
    */}
    <Revele className="chv-suivre" delai={200}>
      <ul className="chv-suivre__liste">
        {RESEAUX.map((r) => (
          <li key={r.nom}>
            <a href={r.lien} target="_blank" rel="noopener noreferrer">
              <img src={r.logo} alt="" width={34} height={34} loading="lazy" />
              <span>{COMPTES[r.nom] ?? r.nom}</span>
            </a>
          </li>
        ))}
      </ul>
    </Revele>
  </section>
  );
};

export default Fondateur;
