import type { CSSProperties } from "react";
import { faqConciergerie, faqSousLocation, type QuestionFaq } from "@/data/faq";
import {
  AVANTAGES_SOUS_LOCATION,
  BLOCS_SERVICES,
  ETAPES_SOUS_LOCATION,
  LOGOS_PLATEFORMES,
  type BlocService,
} from "@/data/accueil";
import { Chevron, IconeCoche, Revele, TitreAnime } from "./Primitives";

/*
  La FAQ, dans le registre de chevalier-pms.com : une plage claire, un titre
  à deux tons, une carte blanche arrondie par question. <details>/<summary>
  reste le socle : le navigateur gère l'ouverture, le clavier et la recherche
  dans la page. Balisage FAQPage : il est déjà porté par /conciergerie et
  /sous-location, qui lisent les mêmes questions.
*/
function Faq({ questions }: { questions: QuestionFaq[] }) {
  return (
    <div className="chv-faq">
      <h3>
        Les questions <em>qu'on nous pose.</em>
      </h3>
      {questions.map((item, i) => (
        <Revele as="details" key={item.q} delai={i * 55}>
          <summary>
            <span>{item.q}</span>
            <Chevron couleur="var(--chv-cuivre-fonce)" />
          </summary>
          <p>{item.a}</p>
        </Revele>
      ))}
    </div>
  );
}

function Bloc({ bloc, rang }: { bloc: BlocService; rang: number }) {
  const inverse = rang % 2 === 1;
  return (
    <div className={`chv-bloc ${inverse ? "chv-bloc--inverse" : ""}`}>
      <Revele effet="volume" className="chv-bloc__image">
        {/* La capture présentée de biais, avec un liseré qui capte la lumière ; elle se redresse au survol. */}
        <div className="chv-capture" style={{ "--inclinaison": `${inverse ? -8 : 8}deg` } as CSSProperties}>
          <div className="chv-capture__interieur">
            <img src={bloc.image} alt={bloc.alt} width={bloc.largeur} height={bloc.hauteur} loading="lazy" />
          </div>
        </div>
      </Revele>
      <Revele className="chv-bloc__texte" delai={120}>
        <span className="chv-badge">{bloc.badge}</span>
        <h3 className="chv-sous-titre">
          {bloc.ligne1}
          <br />
          <em>{bloc.accent}</em>
        </h3>
        <p className="chv-paragraphe">{bloc.texte}</p>
        <ul className="chv-puces">
          {bloc.puces.map((puce) => (
            <li key={puce}>
              <IconeCoche />
              <span>{puce}</span>
            </li>
          ))}
        </ul>
      </Revele>
    </div>
  );
}

/*
  Le tarif, posé en typographie comme dans une brochure — pas d'encadré. Le
  fond compte autant que la forme : les 25 % portent sur le net du
  propriétaire, une fois déduits commissions des plateformes, ménage et taxe
  de séjour. C'est la première question que pose un propriétaire.
*/
function Tarif() {
  return (
    <Revele className="chv-tarif">
      <p className="chv-etiquette" style={{ margin: 0 }}>Notre tarif</p>
      <p className="chv-tarif__chiffre">
        25 %<span> HT</span>
      </p>
      <p className="chv-tarif__ttc">soit 30 % TTC</p>
      <p className="chv-tarif__accroche">de commission, prélevée uniquement sur ce que vous touchez vraiment.</p>
      <p className="chv-tarif__explication">
        Les commissions des plateformes, le ménage et la taxe de séjour sont déduits d'abord. Notre commission ne
        s'applique qu'au net qui reste — jamais au chiffre d'affaires brut.
      </p>
      <p className="chv-tarif__menage">Et le ménage, lui, est payé par le voyageur — pas par vous.</p>
    </Revele>
  );
}

export function ServiceConciergerie() {
  return (
    <section id="notre-service" className="chv-section" aria-label="Notre service de conciergerie">
      <TitreAnime lignes={["Notre service", "de conciergerie"]} />

      <Revele className="chv-entree">
        <span className="chv-badge">La mise en ligne</span>
        <h3 className="chv-sous-titre">
          Votre annonce créée,
          <br />
          <em>publiée partout.</em>
        </h3>
        <p className="chv-paragraphe">
          Tout commence par l'annonce : rédaction, mise en valeur du logement, réglage des règles de séjour et des
          tarifs, puis mise en ligne simultanée sur les plateformes.
        </p>
      </Revele>

      <div className="chv-services">
        <Revele className="chv-logos">
          <p>Diffusé et synchronisé sur</p>
          <div className="chv-logos__rangee">
            {LOGOS_PLATEFORMES.map((logo) => (
              <img key={logo.nom} src={logo.fichier} alt={logo.nom} style={{ height: logo.hauteur }} loading="lazy" />
            ))}
          </div>
        </Revele>
        {BLOCS_SERVICES.map((bloc, i) => (
          <Bloc key={bloc.badge} bloc={bloc} rang={i} />
        ))}
      </div>

      <Tarif />
      <Faq questions={faqConciergerie} />
    </section>
  );
}

/* La seconde formule, bâtie sur le contenu réel de la page /sous-location. */
export function ServiceSousLocation() {
  return (
    <section id="sous-location" className="chv-section" aria-label="Notre service de sous-location">
      <TitreAnime lignes={["Notre service", "de sous-location"]} />

      <Revele className="chv-entree">
        <span className="chv-badge">L'autre formule</span>
        <h3 className="chv-sous-titre">
          Vous ne gérez plus rien,
          <br />
          <em>vous encaissez un loyer fixe.</em>
        </h3>
        <p className="chv-paragraphe" style={{ maxWidth: 600 }}>
          Nous devenons votre locataire principal : nous louons votre bien à l'année pour y accueillir des voyageurs de
          passage. Vous touchez votre loyer, nous gérons l'exploitation et portons le risque.
        </p>
      </Revele>

      <div className="chv-avantages">
        {AVANTAGES_SOUS_LOCATION.map((a, i) => (
          <Revele key={a.nom} effet="volume" delai={i * 110} className="chv-avantage">
            <h3>{a.nom}</h3>
            <p>{a.texte}</p>
          </Revele>
        ))}
      </div>

      <div className="chv-etapes">
        {ETAPES_SOUS_LOCATION.map((e, i) => (
          <Revele key={e.numero} delai={i * 90} className="chv-etape">
            <p className="chv-etape__numero">{e.numero}</p>
            <h3>{e.nom}</h3>
            <p>{e.texte}</p>
          </Revele>
        ))}
      </div>

      <Faq questions={faqSousLocation} />
    </section>
  );
}
