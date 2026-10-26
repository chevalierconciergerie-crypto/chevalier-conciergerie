# File d'attente des comparatifs concurrents

Fichier de travail de la routine de publication (ignoré par le chargeur d'articles,
car il commence par `_`). Une ligne par conciergerie active sur Avignon,
Villeneuve-lès-Avignon et Les Angles, dans l'ordre de leur apparition dans les
résultats de recherche. Format : `- [ ] Nom | site | zone | position constatée | date`.

Recherches du 2026-10-23 : « conciergerie airbnb avignon », « conciergerie avignon
gestion location courte durée », « conciergerie villeneuve-lès-avignon »,
« conciergerie les angles gard airbnb », « sous-location airbnb avignon loyer garanti ».
Aucune conciergerie établie aux Angles n'est ressortie.

- [ ] Les Meilleurs Concierges (The Best Concierges) | site officiel non trouvé | Avignon, Villeneuve-lès-Avignon, Les Angles (fiche Avignon Tourisme, citée par la recherche ; page en 404 le 2026-10-23) | « conciergerie airbnb avignon » : 1er résultat (page agrégateur airbtics.com) | 2026-10-23 — **reporté** : sans site officiel ni fiche consultable, le comparatif ne peut pas être sourcé. À reprendre si Victor retrouve le site ou la fiche Google.
- [x] Welkeys | welkeys.com | Avignon (réseau national) | « conciergerie airbnb avignon » : 3e et 4e résultats (welkeys.com/blog/conciergerie-airbnb-avignon) | 2026-10-23 — publié le 2026-10-23 : /blog/welkeys-avis-tarifs-avignon
- [ ] Leduc Conciergerie | site non trouvé (fiche avignon-tourisme.com/en/offres/leduc-conciergerie-avignon-en-6259795/) | Avignon | « conciergerie airbnb avignon » : 8e résultat | 2026-10-23 — **reporté le 2026-10-26** : seule source publique, la fiche de l'office de tourisme (mise à jour le 06/08/2026) et un compte Instagram ; ni site, ni tarifs, ni zone, ni société identifiée. Comparatif impossible à sourcer.
- [x] Keysmanager (fiche « Conciergerie Airbnb », Frédéric Palermini) | conciergerie-avignon.com | Avignon | « conciergerie airbnb avignon » : 7e résultat (fiche avignon-tourisme.com/en/offres/conciergerie-airbnb-avignon-en-5600404) | 2026-10-23 — la fiche renvoie vers conciergerie-avignon.com et les comptes keysmanagerfr : même entreprise que la ligne Keysmanager. Publié le 2026-10-26 : /blog/keysmanager-avis-tarifs-avignon
- [ ] La Fine Equipe Conciergerie | site à identifier | Avignon | citée dans les résultats « conciergerie airbnb avignon » | 2026-10-23
- [ ] Conciergerie Clef en Main | site à identifier (citée par toploc.com) | Avignon | « conciergerie avignon gestion location courte durée » : classement toploc, 2e résultat | 2026-10-23 — **à exclure** : société CONCIERGERIE CLEF EN MAIN (SIREN 889 123 287) fermée le 2024-06-24 d'après recherche-entreprises.api.gouv.fr (consulté le 2026-10-26).
- [ ] La Conciergerie Avignon (Rochefort-du-Gard) | fiche tourismegard.com/fr/fiche/commerce-et-service/la-conciergerie-avignon-rochefort-du-gard_TFO6512900/ | Grand Avignon | « conciergerie avignon gestion location courte durée » : 5e et 6e résultats ; « conciergerie villeneuve-lès-avignon » | 2026-10-23
- [ ] Hostnfly | hostnfly.com | réseau national, offre locale à vérifier | non relevée dans ces recherches, citée dans src/pages/LocalSeoPage.tsx | 2026-10-23

---

## Sources par concurrent

### Welkeys (consultées le 2026-10-23)

- https://www.welkeys.com/conciergerie-airbnb/avignon — « à partir de 20% de commission » ; « Sans engagement » ; « titulaire de la carte G (loi Hoguet) » ; ménage professionnel avant et après le séjour, linge de qualité hôtelière ; seule la ville d'Avignon est nommée ; aucune mention de sous-location.
- https://www.welkeys.com/blog/conciergerie-airbnb-avignon — services (annonce, photos, tarification dynamique, sélection des voyageurs, check-in/check-out, support voyageurs 7j/7, ménage, linge, maintenance, interface propriétaire, city manager sur place) ; plateformes : Airbnb, Booking.com, VRBO, Welkeys, Maeva, PAP Vacances, My Home, Plum Guide ; reversement mensuel des loyers du mois précédent ; « à partir de 20% » ; « Sans engagement ».
- https://www.welkeys.com/aide-proprietaire — « notre commission se situe à partir de 20% des revenus locatifs générés », taux variable selon la typologie, l'accessibilité et la situation du bien ; « Les prestations de ménage et de linge sont à la charge de vos voyageurs » ; frais de dossier mentionnés (shooting photo, création d'annonce, ménage avant la première réservation) sans montant, alors qu'une autre réponse de la même page indique « pas de frais de dossier » → **à faire vérifier** ; assurance tous risques « jusqu'à 1 000 000€ » ; versement mensuel par virement ; durée de contrat et préavis non mentionnés.
- https://www.welkeys.com/ — « Les commissions varient généralement entre 20% et 35% selon les services inclus et le type de bien » ; « +5000 logements gérés » (et « 1 200+ villas et chalets » ailleurs sur la page) ; services additionnels : chef à domicile, activités locales, navette aéroport/gare ; Villeneuve-lès-Avignon et Les Angles non mentionnées ; date de création non indiquée.
- https://www.welkeys.com/mentions-legales — société Concierge Personal SAS, capital 2 884 €, RCS Paris 807 787 312, 82 avenue du Maine, 75014 Paris.
- Fiche Google Business : non consultée (pas d'accès fiable depuis la routine).

### Keysmanager (consultées le 2026-10-26)

- https://conciergerie-avignon.com/conciergerie/ — « Notre tarif conciergerie inclut une commission de 20% HT, hors frais de ménage à la charge des voyageurs » ; « forfait de préparation personnalisé » sans montant ; services : rédaction et « paramétrage multi-plateformes » (plateformes non nommées), photos HD/grand angle/HDR/retouches, étude de marché et ajustement des prix, communication voyageurs, « personnel multilingue », ménage et linge « de qualité hôtelière », équipes « 7j/7 », petites réparations et petite plomberie, recherche de prestataire pour gros travaux ; FAQ voyageurs : produits d'accueil, équipe « disponible 24h/24 et 7j/7 ».
- https://conciergerie-avignon.com/ — tarifs « basés sur la taille et les spécificités de votre propriété ainsi que sur les services que vous choisissez », devis après évaluation initiale ; application mobile propriétaires ; rapports réguliers ; « Estimez vos Revenus Locatifs + Entretien conseil offert » ; seule Avignon est nommée ; durée d'engagement et préavis non mentionnés ; liens « Mentions légales » sans URL (non consultables).
- https://conciergerie-avignon.com/vous-etes-voyageur/ — sous-location professionnelle : « Loyer garanti », « Sans contrainte », « Keysmanager devient votre nouveau locataire », bail « rédigé par un avocat spécialisé », voyageurs professionnels, « prise de caution », inspection en 100 points, ameublement et décoration, Wi-Fi et verrous numériques installés « sans frais pour vous » ; montant du loyer et durée du bail non communiqués.
- https://conciergerie-avignon.com/a-propos/ — Frédéric Palermini, président, « Gestionnaire immobilier depuis 2016 » ; Florian Palermini, directeur général (services généraux) ; nombre de logements non communiqué.
- https://recherche-entreprises.api.gouv.fr/search?q=901842864 — KEYSMANAGER, SIREN 901 842 864, SAS (code 5710), créée le 2021-07-26, siège 396 rue des Cannebières, 84450 Saint-Saturnin-lès-Avignon, active.
- https://avignon-tourisme.com/en/offres/conciergerie-airbnb-avignon-en-5600404 — « Conciergerie Airbnb », 25 rue Louis Pasteur, 84000 Avignon, centre-ville, site www.conciergerie-avignon.com, réseaux keysmanagerfr ; fiche mise à jour le 14/04/2025.
- Fiche Google Business : non consultée.
