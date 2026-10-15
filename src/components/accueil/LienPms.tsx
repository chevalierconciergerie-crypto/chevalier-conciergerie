/*
  Fait de « Chevalier PMS » un lien vers le logiciel, dans un texte traduit par t().
  Le texte reste une simple chaîne (FAQPage, i18n) ; le lien n'existe qu'au rendu.
  Lien normal, sans nofollow : c'est l'intérêt du maillage vers chevalier-pms.com.
*/
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const NOM = "Chevalier PMS";
const PRESENTATION = "Chevalier PMS, notre propre logiciel";

/* Dans l'offre conciergerie, la présentation du logiciel renvoie vers l'article qui le détaille. */
export function avecLienArticlePms(texte: string): ReactNode {
  const [avant, apres] = texte.split(PRESENTATION);
  if (apres === undefined) return texte;
  return [
    avant,
    <Link key="pms" to="/blog/logiciel-conciergerie-airbnb">
      {PRESENTATION}
    </Link>,
    apres,
  ];
}

export function avecLienPms(texte: string): ReactNode {
  const morceaux = texte.split(NOM);
  if (morceaux.length === 1) return texte;
  return morceaux.flatMap((morceau, i) =>
    i === 0
      ? [morceau]
      : [
          <a key={i} href="https://chevalier-pms.com">
            {NOM}
          </a>,
          morceau,
        ],
  );
}
