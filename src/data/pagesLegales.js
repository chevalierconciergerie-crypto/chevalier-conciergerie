/*
  Contenu des pages légales : mentions légales, conditions générales (location des
  logements et prestations aux propriétaires), politique de confidentialité.

  Une seule source, en JavaScript simple, pour deux lecteurs : les pages React
  (src/pages/MentionsLegales.tsx, CGV.tsx, PolitiqueConfidentialite.tsx) et le
  prérendu (scripts/seo-routes.mjs, via `htmlLegal`), qui sert ce même texte aux
  robots. Modifier un texte ici le change partout.

  Rédaction d'octobre 2026, à faire relire par un juriste. Points encore ouverts
  avec Victor : raison sociale (le registre Sirene indique CHEVALIER CONCIERGERIE),
  capital social, médiateur de la consommation (MEDIATEUR, vide tant qu'il n'y a
  pas d'adhésion).
*/

export const SOCIETE = {
  raisonSociale: "CHEVALIER LOCABUSINESS",
  nomCommercial: "Chevalier Conciergerie",
  forme: "SAS",
  siren: "995 268 802",
  siret: "995 268 802 00015",
  tva: "FR45995268802",
  rcs: "Nîmes",
  ape: "6820A",
  adresse: "5 Lotissement Les Cades, 30400 Villeneuve-lès-Avignon, France",
  telephone: "+33 7 83 19 83 41",
  courriel: "contact@chevalier-conciergerie.com",
  directeur: "Victor Chevalier, président",
};

/** Médiateur de la consommation : { nom, site, adresse } une fois l'adhésion faite. */
export const MEDIATEUR = null;

const S = SOCIETE;

export const MENTIONS_LEGALES = {
  titre: "Mentions légales",
  maj: "octobre 2026",
  sections: [
    {
      titre: "Éditeur du site",
      blocs: [
        {
          dl: [
            ["Raison sociale", S.raisonSociale],
            ["Nom commercial", S.nomCommercial],
            ["Forme", `${S.forme} (société par actions simplifiée)`],
            ["SIREN", S.siren],
            ["SIRET", S.siret],
            ["RCS", S.rcs],
            ["TVA intracommunautaire", S.tva],
            ["Code APE", `${S.ape} (location de logements)`],
            ["Siège social", S.adresse],
            ["Téléphone", S.telephone],
            ["Courriel", S.courriel],
            ["Directeur de la publication", S.directeur],
          ],
        },
      ],
    },
    {
      titre: "Hébergement",
      blocs: [{ dl: [["Hébergeur", "Vercel Inc."], ["Adresse", "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis"], ["Site", "vercel.com"]] }],
    },
    {
      titre: "Activité",
      blocs: [
        {
          p: `${S.nomCommercial} propose aux propriétaires un service de conciergerie et de gestion de locations saisonnières, ainsi que la sous-location de meublés de tourisme. Les logements présentés dans la rubrique « Nos logements » sont loués par leurs propriétaires ; ${S.nomCommercial} en assure la gestion pour leur compte.`,
        },
      ],
    },
    {
      titre: "Propriété intellectuelle",
      blocs: [
        {
          p: "Les textes, photos, logos et éléments graphiques de ce site sont protégés par le droit d'auteur. Toute reproduction, totale ou partielle, sans autorisation écrite préalable est interdite.",
        },
      ],
    },
    {
      titre: "Responsabilité",
      blocs: [
        {
          p: `Les informations publiées sur ce site sont vérifiées et mises à jour régulièrement ; elles peuvent toutefois comporter des inexactitudes. ${S.raisonSociale} ne saurait être tenue responsable des dommages résultant de l'accès au site ou de son utilisation.`,
        },
      ],
    },
    {
      titre: "Données personnelles et cookies",
      blocs: [{ p: "Le traitement des données personnelles et l'usage des cookies sont décrits dans la politique de confidentialité." }, { lien: ["/politique-confidentialite", "Politique de confidentialité"] }],
    },
  ],
};

const mediation = () =>
  MEDIATEUR
    ? `Si la réclamation n'aboutit pas, le Client peut recourir gratuitement au médiateur de la consommation dont relève ${S.nomCommercial} : ${MEDIATEUR.nom}, ${MEDIATEUR.adresse} (${MEDIATEUR.site}).`
    : "Si la réclamation n'aboutit pas, le Client peut recourir gratuitement à un médiateur de la consommation, conformément aux articles L611-1 et suivants du Code de la consommation.";

export const CONDITIONS = {
  titre: "Conditions générales",
  intro:
    "Ces conditions s'appliquent aux réservations de nos logements par les voyageurs (partie 1) et aux prestations de conciergerie et de sous-location proposées aux propriétaires (partie 2).",
  maj: "octobre 2026",
  parties: [
    {
      id: "location",
      titre: "1. Conditions de location des logements",
      sections: [
        {
          titre: "Article 1 — Objet et parties",
          blocs: [
            {
              p: `Les présentes conditions régissent la location saisonnière, réservée directement sur le site chevalier-conciergerie.com ou auprès de ${S.nomCommercial}, des logements présentés sur le site. Chaque logement est loué en meublé de tourisme par son propriétaire (le « Loueur »). ${S.raisonSociale} (« ${S.nomCommercial} ») gère la location au nom et pour le compte du Loueur : réservations, accueil et suivi du séjour. Le voyageur qui réserve (le « Client ») agit pour lui-même et pour les personnes qui l'accompagnent.`,
            },
          ],
        },
        {
          titre: "Article 2 — Réservation",
          blocs: [
            {
              p: "La réservation est ferme à réception de la confirmation écrite (courriel ou message) adressée au Client une fois le paiement effectué. La location est conclue pour les dates indiquées dans la confirmation et ne peut être prolongée sans accord préalable. Le Client doit être majeur.",
            },
          ],
        },
        {
          titre: "Article 3 — Prix et taxe de séjour",
          blocs: [
            {
              p: "Le prix est indiqué en euros pour les dates et le nombre de voyageurs choisis. Il comprend la location, les charges (eau, électricité, chauffage, climatisation, wifi), le linge de maison et le ménage de fin de séjour. La taxe de séjour, due par chaque voyageur majeur selon le tarif fixé par la collectivité, s'y ajoute ; elle est collectée puis reversée intégralement à la collectivité.",
            },
          ],
        },
        {
          titre: "Article 4 — Paiement",
          blocs: [{ p: "Le paiement s'effectue en ligne, par un prestataire de paiement sécurisé, selon l'échéancier indiqué lors de la réservation." }],
        },
        {
          titre: "Article 5 — Dépôt de garantie",
          blocs: [
            {
              p: "Un dépôt de garantie peut être demandé avant l'arrivée, par empreinte bancaire ou paiement en ligne ; son montant est indiqué lors de la réservation. Les instructions d'arrivée sont transmises une fois le dépôt constitué. Il est restitué au plus tard un mois après le départ, déduction faite, sur justificatifs, des sommes dues au titre de dégradations, de pertes ou d'un nettoyage exceptionnel.",
            },
          ],
        },
        {
          titre: "Article 6 — Annulation par le Client",
          blocs: [
            { p: "Toute annulation doit être notifiée par écrit (courriel ou message). Les délais s'apprécient à la date de réception de la demande, à l'heure locale du logement. Les conditions d'annulation de chaque logement figurent sur sa fiche et dans la confirmation de réservation ; sauf mention contraire, ce sont les suivantes :" },
            {
              liste: [
                "Annulation au moins 5 jours avant la date d'arrivée, avant 17:00 : remboursement intégral.",
                "Annulation moins de 5 jours avant l'arrivée, et au plus tard à 17:00 le jour de l'arrivée : remboursement de 50 % du prix de chaque nuit, à l'exception de la première nuit, qui n'est pas remboursée. Les frais de ménage sont remboursés.",
                "Arrivée non effectuée sans annulation, ou départ anticipé : aucun remboursement.",
              ],
            },
          ],
        },
        {
          titre: "Article 7 — Absence de droit de rétractation",
          blocs: [
            {
              p: "Conformément à l'article L221-28, 12° du Code de la consommation, le droit de rétractation ne s'applique pas aux prestations d'hébergement fournies à une date déterminée. Seules les conditions d'annulation de l'article 6 s'appliquent.",
            },
          ],
        },
        {
          titre: "Article 8 — Annulation par le Loueur",
          blocs: [
            {
              p: "Si la réservation doit être annulée par le Loueur ou son mandataire (sinistre, logement devenu indisponible, force majeure), le Client est remboursé de l'intégralité des sommes versées. Un logement équivalent peut lui être proposé, qu'il reste libre de refuser.",
            },
          ],
        },
        {
          titre: "Article 9 — Séjour et règlement intérieur",
          blocs: [
            {
              p: "Les horaires d'arrivée et de départ, la capacité maximale et le règlement intérieur de chaque logement figurent sur sa fiche et dans la confirmation de réservation. Le logement ne peut accueillir plus de personnes que sa capacité. Le Client en fait un usage paisible, respecte le voisinage et le règlement de l'immeuble. Une fête, un dépassement du nombre de voyageurs ou des nuisances répétées peuvent entraîner la fin du séjour, sans remboursement.",
            },
          ],
        },
        {
          titre: "Article 10 — État des lieux et dommages",
          blocs: [
            {
              p: "Le logement est remis propre et en bon état. Toute anomalie constatée à l'arrivée doit être signalée dans les 24 heures. Les dégradations, pertes ou nettoyages anormaux constatés après le départ sont à la charge du Client et peuvent être retenus sur le dépôt de garantie, sur justificatifs.",
            },
          ],
        },
        {
          titre: "Article 11 — Responsabilité et assurance",
          blocs: [
            {
              p: "Le Client répond des dommages causés pendant le séjour par lui-même et par les personnes qui l'accompagnent ; il lui est recommandé de vérifier que son assurance couvre la responsabilité civile en villégiature. Le Loueur et son mandataire ne répondent pas des vols d'effets personnels dans le logement, ni des interruptions de service (eau, électricité, internet) indépendantes de leur volonté.",
            },
          ],
        },
        {
          titre: "Article 12 — Réclamations et médiation",
          blocs: [{ p: `Toute réclamation est à adresser par écrit à ${S.courriel}. ${mediation()}` }],
        },
        {
          titre: "Article 13 — Droit applicable",
          blocs: [
            {
              p: "Les présentes conditions sont soumises au droit français. À défaut d'accord amiable, le litige est porté devant la juridiction compétente ; le Client consommateur peut saisir, à son choix, celle du lieu où il demeurait lors de la conclusion du contrat ou de la survenance du fait dommageable.",
            },
          ],
        },
      ],
    },
    {
      id: "proprietaires",
      titre: "2. Prestations aux propriétaires",
      sections: [
        {
          titre: "Article 1 — Objet",
          blocs: [
            {
              p: `Ces conditions régissent les relations entre ${S.raisonSociale} (le « Prestataire ») et tout propriétaire (le « Client ») qui souscrit à ses services de conciergerie, de gestion locative ou de sous-location. Toute commande implique leur acceptation.`,
            },
          ],
        },
        {
          titre: "Article 2 — Services proposés",
          blocs: [
            {
              p: "Le Prestataire propose deux offres : (1) la conciergerie et la gestion locative courte durée (création et suivi des annonces, gestion des réservations, accueil des voyageurs, ménage, linge et maintenance courante) ; (2) la sous-location avec loyer garanti, par laquelle le Prestataire prend le bien à bail puis l'exploite. Le détail des prestations est fixé par le contrat ou le mandat signé entre les parties.",
            },
          ],
        },
        {
          titre: "Article 3 — Tarifs et honoraires",
          blocs: [
            {
              p: "Les honoraires sont exprimés en pourcentage des revenus locatifs ou sous forme de forfait, selon l'offre choisie. La taxe de séjour, collectée auprès des voyageurs pour le compte de la collectivité, ne constitue pas un revenu du Prestataire et lui est reversée intégralement. Les tarifs applicables sont ceux en vigueur à la signature du contrat ; toute prestation supplémentaire fait l'objet d'un devis préalable.",
            },
          ],
        },
        {
          titre: "Article 4 — Obligations du Prestataire",
          blocs: [
            {
              p: "Le Prestataire exécute les prestations avec diligence, dans le respect de la réglementation applicable à la location de courte durée. Il rend compte régulièrement au Client de la gestion de son bien et lui reverse les sommes dues selon la périodicité convenue.",
            },
          ],
        },
        {
          titre: "Article 5 — Obligations du Client",
          blocs: [
            {
              p: "Le Client garantit être propriétaire du bien ou disposer des autorisations nécessaires à sa mise en location (règlement de copropriété, changement d'usage, déclaration et numéro d'enregistrement en mairie le cas échéant). Il fournit un logement décent, assuré et conforme à la réglementation, ainsi que les informations utiles à l'exécution des prestations.",
            },
          ],
        },
        {
          titre: "Article 6 — Durée et résiliation",
          blocs: [
            {
              p: "Le contrat est conclu pour la durée convenue. Sauf disposition contraire, chaque partie peut le résilier en respectant le préavis prévu au contrat, par lettre recommandée avec accusé de réception. Les réservations confirmées à la date de résiliation sont honorées.",
            },
          ],
        },
        {
          titre: "Article 7 — Responsabilité",
          blocs: [
            {
              p: "Le Prestataire est tenu d'une obligation de moyens. Sa responsabilité ne peut être engagée en cas de force majeure, de fait d'un tiers ou de manquement du Client à ses obligations. Le Prestataire dispose des assurances nécessaires à son activité.",
            },
          ],
        },
        {
          titre: "Article 8 — Droit applicable et litiges",
          blocs: [
            {
              p: "Ces conditions sont soumises au droit français. Les parties recherchent une solution amiable avant toute action ; à défaut, le litige est porté devant les tribunaux compétents du ressort du siège social du Prestataire.",
            },
          ],
        },
      ],
    },
  ],
};

export const CONFIDENTIALITE = {
  titre: "Politique de confidentialité",
  intro:
    "Cette page explique quelles données personnelles nous traitons, pourquoi, combien de temps nous les gardons et comment exercer vos droits, conformément au Règlement général sur la protection des données (RGPD).",
  maj: "octobre 2026",
  sections: [
    {
      titre: "Responsable du traitement",
      blocs: [{ dl: [["Société", `${S.raisonSociale} (${S.nomCommercial}), ${S.forme}`], ["Siège", S.adresse], ["Contact", `${S.courriel} · ${S.telephone}`]] }],
    },
    {
      titre: "Données traitées",
      blocs: [
        {
          liste: [
            "Voyageurs qui réservent : nom, prénom, coordonnées, dates de séjour, nombre de voyageurs, échanges avec nous. Les données de carte bancaire sont traitées par le prestataire de paiement ; nous ne les conservons pas.",
            "Voyageurs de nationalité étrangère : fiche individuelle de police, exigée par l'article R814-1 du Code de l'entrée et du séjour des étrangers.",
            "Propriétaires et prospects : nom, prénom, coordonnées, informations sur le bien, messages envoyés.",
            "Visiteurs du site : données de mesure d'audience (pages vues, type d'appareil), uniquement si vous l'acceptez.",
          ],
        },
      ],
    },
    {
      titre: "Finalités et bases légales",
      blocs: [
        {
          liste: [
            "Gestion des réservations, du séjour et du dépôt de garantie : exécution du contrat.",
            "Réponse aux demandes de contact et de devis : mesures précontractuelles.",
            "Gestion de la relation avec les propriétaires : exécution du contrat.",
            "Comptabilité, taxe de séjour et fiches de police : obligations légales.",
            "Mesure d'audience du site : votre consentement.",
          ],
        },
      ],
    },
    {
      titre: "Destinataires",
      blocs: [
        {
          p: "Vos données sont destinées à nos équipes et, pour une réservation, au propriétaire du logement réservé. Elles sont aussi traitées par nos prestataires techniques, dans la limite de leur mission : hébergement du site (Vercel Inc.), logiciel de gestion des réservations, prestataire de paiement, mesure d'audience (Google Ireland Limited). Nous ne vendons aucune donnée.",
        },
      ],
    },
    {
      titre: "Transferts hors de l'Union européenne",
      blocs: [
        {
          p: "Certains prestataires (hébergement du site, mesure d'audience) peuvent traiter des données aux États-Unis. Ces transferts sont encadrés par le cadre de protection des données UE–États-Unis ou par les clauses contractuelles types de la Commission européenne.",
        },
      ],
    },
    {
      titre: "Durées de conservation",
      blocs: [
        {
          liste: [
            "Réservations et échanges avec les voyageurs : 5 ans après le séjour.",
            "Fiches de police : 6 mois.",
            "Pièces comptables et factures : 10 ans.",
            "Prospects : 3 ans après le dernier contact.",
            "Cookies de mesure d'audience : 13 mois au plus.",
          ],
        },
      ],
    },
    {
      titre: "Vos droits",
      blocs: [
        {
          p: `Vous pouvez accéder à vos données, les faire rectifier ou effacer, en limiter le traitement, vous y opposer ou en demander la portabilité, en écrivant à ${S.courriel}. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (cnil.fr).`,
        },
      ],
    },
    {
      titre: "Cookies",
      blocs: [
        {
          liste: [
            "Votre choix sur les cookies est enregistré dans votre navigateur.",
            "Google Analytics 4 (mesure d'audience) n'est chargé qu'après votre accord, donné avec le bouton « Accepter ». Refuser ou fermer le bandeau ne dépose aucun cookie de mesure.",
            "La mesure de fréquentation et de performance de Vercel ne dépose pas de cookie.",
          ],
        },
        { p: "Vous pouvez changer d'avis à tout moment avec le lien « Gestion des cookies » en bas de chaque page." },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ prérendu */

const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const blocsHtml = (blocs) =>
  blocs
    .map((b) => {
      if (b.p) return `<p>${esc(b.p)}</p>`;
      if (b.liste) return `<ul>${b.liste.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`;
      if (b.dl) return `<dl>${b.dl.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>`;
      if (b.lien) return `<p><a href="${b.lien[0]}">${esc(b.lien[1])}</a></p>`;
      return "";
    })
    .join("\n");

const sectionsHtml = (sections, niveau = 2) =>
  sections.map((s) => `<h${niveau}>${esc(s.titre)}</h${niveau}>\n${blocsHtml(s.blocs)}`).join("\n");

/** Le corps HTML d'une page légale, pour les robots qui n'exécutent pas le JavaScript. */
export function htmlLegal(page, chemin) {
  const corps = page.parties
    ? page.parties.map((p) => `<h2 id="${p.id}">${esc(p.titre)}</h2>\n${sectionsHtml(p.sections, 3)}`).join("\n")
    : sectionsHtml(page.sections);
  return `<main>
      <nav><a href="/">Accueil</a> › ${esc(page.titre)}</nav>
      <h1>${esc(page.titre)}</h1>
      ${page.intro ? `<p>${esc(page.intro)}</p>` : ""}
      ${corps}
      <p>Dernière mise à jour : ${esc(page.maj)}.</p>
    </main>`;
}
