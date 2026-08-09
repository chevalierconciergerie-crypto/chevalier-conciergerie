# Audit SEO / GEO — chevalier-conciergerie.com — 8 août 2026

Toutes les mesures de ce document ont été prises **sur le site en production** le 8 août
2026, pas en local. Ce que je n'ai pas pu vérifier est signalé comme tel.

---

## ✅ Mise à jour du 8 août 2026, 19 h 50 — corrections déployées

Les actions 1 à 4, 6, 7 et 9 à 11 du plan sont **faites et vérifiées en production**.
Les constats ci-dessous décrivent donc l'état d'AVANT ; les mesures d'après sont ici.

| Mesure | Avant | Après |
|---|---|---|
| Mots lisibles sans JavaScript — `/conciergerie` | 20 | **462** |
| — `/sous-location` | 21 | **408** |
| — `/conciergerie-avignon` | 20 | **345** |
| — les 2 autres pages locales | 20 | **332** et **357** |
| — `/a-propos` | ~20 | **344** |
| — `/` | 21 | **153** |
| URLs dans le sitemap | 26, dont 9 mortes | **16, toutes valides** |
| `/reservation`, `/logements`, `/proprietes/*` | HTTP **200** + page 404 | HTTP **404** |
| Liens morts dans le pied de page | 2, sur toutes les pages | **0** |
| Schémas sur les pages de service | `LocalBusiness` seul | **+ `Service`, `FAQPage`, `BreadcrumbList`** |
| H1 de `/` | « VOTRE CONCIERGERIE » | « VOTRE CONCIERGERIE **À AVIGNON** » |
| H1 de `/conciergerie` | « …appartements intra-muros. » | « …appartements **à Avignon**, intra-muros. » |
| H1 de `/sous-location` | « Un Loyer Garanti » | « Un Loyer Garanti **à Avignon** » |
| Vidéo du hero sur mobile | 1 849 Ko téléchargés | **0** (poster seul) |

Restent bloquées sur une décision ou un compte tiers : **l'action 5** (activer GA4 — il
faut l'ID `G-…`) et **l'action 8** (brancher le formulaire sur un service d'envoi).

### Deuxième passe — le contenu (actions 12, 14, 15 partielles, 17)

Le contenu ajouté ne vient pas d'un rédacteur : il vient de la **délibération du conseil
municipal d'Avignon du 22 février 2025** et des informations publiées par la ville. Des
faits locaux vérifiables, exactement ce que la règle de design impose à la place des
adjectifs — et ce qu'un moteur de réponse cite.

| Page | Mots lisibles sans JS | Schéma |
|---|---|---|
| `/conciergerie` | 462 → **612** | FAQPage passé de 7 à **9 questions** |
| `/conciergerie-avignon` | 345 → **458** | Service + BreadcrumbList |
| Article « Déclarer sa location saisonnière » | 1 438 → **1 864** | FAQPage à 5 questions |

**Une erreur factuelle corrigée.** L'article annonçait « 120 nuitées » pour une résidence
principale. C'est faux à Avignon depuis le 1er janvier 2026 : la ville a abaissé le
plafond à **90 jours par année civile**. Un propriétaire qui suivait cet article avait un
mois de location de trop.

**Ce qui a été ajouté**, depuis la source officielle : l'autorisation temporaire de
changement d'usage, applicable à tout le territoire communal et aux personnes physiques
comme morales, sauf résidence principale ; la plateforme `changementdusage.fr/avignon` ;
le reversement de la taxe de séjour avant le 15 janvier ; et les chiffres que la ville
publie pour motiver le dispositif — près de 4 300 logements en location saisonnière en
2023, dont 2 400 en intra-muros, soit un doublement en huit ans.

Aucun concurrent local ne documente ce cadre. C'est le seul angle où l'ancienneté de
domaine ne protège pas Hostnfly ou Welkeys.

**Les adjectifs non prouvés sont partis** — « 5 étoiles », « d'exception », « premium »,
« haut de gamme » — des meta descriptions, du pied de page et d'une réponse de FAQ. Ce
sont les textes que Google affiche dans ses résultats : ils décrivent maintenant ce que
le service fait.

**Un défaut trouvé en vérifiant, et corrigé.** Les 9 questions s'affichaient bien, mais
Radix retirait du DOM le contenu des panneaux fermés : le schéma `FAQPage` déclarait donc
à Google 9 réponses absentes de la page rendue. C'est une infraction à ses consignes sur
les données structurées, qui expose au retrait des résultats enrichis. Le contenu reste
désormais monté en permanence, replié à zéro pixel — comportement visuel identique.

### Troisième passe — `/sous-location`, un nouvel article, l'accueil (actions 13, 16, 17)

| Page | Mots lisibles sans JS |
|---|---|
| `/sous-location` | 407 → **661** — FAQ passée de 4 à **8 questions** |
| `/` (accueil) | 153 → **343** |
| **Nouvel article** « Conciergerie ou sous-location à Avignon » | **1 918** |

Le nouvel article suit `content/journal/_TRAME.md` : tableau comparatif après l'intro,
8 sections H2, FAQ de 4 questions, 16 liens internes. Sa section prix ne se dérobe pas —
elle s'appuie sur l'exemple déjà publié sur `/conciergerie` (990 € bruts, 673 € nets,
soit environ 17 % de commission dans ce cas) plutôt que sur une fourchette inventée.
C'est la décision que le prospect prend réellement, et peu de concurrents proposent les
deux formules — donc peu écrivent dessus.

**Action 16 débloquée.** La page d'accueil affiche déjà **six avis Google nommés**
(5,0 sur 12 avis). Trois d'entre eux sont désormais dans le contenu lisible sans
JavaScript, avec le nom de leur auteur.

**En revanche, aucun schéma `AggregateRating` ni `Review` n'a été ajouté, et c'est
volontaire.** Google considère comme auto-promotionnels les avis qu'une entreprise
publie sur son propre site à son propre sujet : ils ne donnent pas droit aux résultats
enrichis, et les baliser quand même expose à une action manuelle. Le texte des avis
reste dans le HTML, où les moteurs de réponse peuvent le lire et le citer — c'est le
gain réel, sans le risque. Pour obtenir des étoiles dans Google, le chemin est la fiche
Google Business Profile (action 18), pas le balisage du site.

### État final du site

| Page | Avant | Après |
|---|---|---|
| `/conciergerie` | 20 mots | **612** |
| `/sous-location` | 21 | **661** |
| `/conciergerie-avignon` | 20 | **458** |
| `/conciergerie-les-angles` | 20 | **357** |
| `/a-propos` | ~20 | **344** |
| `/` | 21 | **343** |
| `/conciergerie-villeneuve-les-avignon` | 20 | **332** |
| `/contact` | 19 | **99** |
| Articles du Journal | 2 | **3**, dont deux réécrits ou créés |
| Sitemap | 26 URLs dont 9 mortes | **17, toutes valides** |

Restent : l'action 5 (ID GA4), l'action 8 (service d'envoi pour le formulaire),
l'action 14 pour Villeneuve et Les Angles — leur cadre réglementaire est gardois et
demande une vérification propre, je ne l'ai pas transposé depuis Avignon — et les
actions 18 à 20, hors code.

Deux points relevés pendant les corrections, qui demandent ton arbitrage :

1. **Une contradiction sur le nombre de biens gérés.** `/conciergerie` annonce « neuf
   appartements » ; les trois pages locales annoncent « 15+ », « 8+ » et « 5+ », soit
   28 et plus. L'un des deux chiffres est faux, et une incohérence de ce genre coûte cher
   en crédibilité — y compris auprès des moteurs de réponse, qui recoupent. Je n'ai pas
   tranché : dis-moi lequel est le bon. En attendant, ces compteurs ne sont **pas** repris
   dans le contenu servi aux robots.
2. **Une incohérence d'adresse (NAP).** Le pied de page affiche « Avignon, 84000 France »
   alors que la fiche `LocalBusiness` déclare « 5 Lotissement Les Cades, 30400
   Villeneuve-lès-Avignon ». Pour le référencement local, l'adresse doit être identique
   partout — site, fiche Google, annuaires.

---

## Verdict en dix lignes

La base technique est **bonne, et meilleure que celle de la plupart des concurrents** :
pré-rendu par route, sitemap généré automatiquement, `LocalBusiness` sur toutes les
pages, TTFB de 33 ms, robots IA explicitement autorisés. Ce travail est fait et il est
solide.

Ce qui bloque la page 1 n'est pas technique, c'est **du contenu et de la cohérence** :

1. **Les pages commerciales sont vides pour les moteurs IA** — 20 mots lisibles sans
   JavaScript, contre 1 170 pour un article du Journal.
2. **Les pages font 3 à 5 fois moins de contenu que les concurrents** qui occupent la
   page 1 aujourd'hui — 391 mots contre 2 200.
3. **Les H1 des deux pages les plus stratégiques ne contiennent pas le mot-clé.**
4. **9 URLs sur 26 du sitemap mènent à une page 404** servie en HTTP 200.

Les points 1, 3 et 4 se corrigent en une journée. Le point 2 est un travail de fond de
quelques semaines — et c'est lui qui décide réellement de la page 1.

---

## 1. Ce qui est déjà bon — à ne pas casser

| Élément | État | Vérification |
|---|---|---|
| Pré-rendu par route | ✅ | `/conciergerie` sert bien son propre `<title>`, distinct de celui de l'accueil |
| `<title>` et meta description uniques par page | ✅ | 26 routes déclarées dans `scripts/seo-routes.mjs` |
| `canonical` correct par page | ✅ | `scripts/prerender.mjs:44-47` |
| `sitemap.xml` | ✅ | Généré depuis la même liste que les pages — il ne peut pas diverger |
| `robots.txt` | ✅ | 20 robots nommés explicitement, dont GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot, Applebot |
| Schéma `LocalBusiness` | ✅ | Sur toutes les pages, avec un `@id` unique qui évite le doublon d'établissement |
| Schémas `BlogPosting` + `BreadcrumbList` + `FAQPage` | ✅ | Sur les articles du Journal |
| Open Graph / Twitter Card par route | ✅ | Avec un visuel propre à chaque article |
| HTTPS + HSTS | ✅ | `Strict-Transport-Security: max-age=63072000` |
| Un seul `<h1>` par page | ✅ | Vérifié sur l'accueil, `/conciergerie`, `/conciergerie-avignon` |
| Attributs `alt` sur les images | ✅ | 14 images sur l'accueil, 0 sans `alt` |
| TTFB | ✅ | 33 ms (CDN Vercel) |

C'est un socle propre. La plupart des sites de conciergerie n'en ont pas autant.

---

## 2. Le problème n°1 — les moteurs IA ne voient rien (GEO)

C'est le constat le plus important de cet audit.

GPTBot, PerplexityBot et ClaudeBot **n'exécutent pas de JavaScript**. Ils lisent le HTML
tel qu'il sort du serveur. Voici ce qu'ils reçoivent réellement, mesuré page par page :

| Page | Mots lisibles sans JavaScript |
|---|---|
| `/` (accueil) | **21** |
| `/conciergerie` | **20** |
| `/conciergerie-avignon` | **20** |
| `/sous-location` | **21** |
| `/contact` | **19** |
| `/journal` | 128 |
| `/journal/calculer-rentabilite-reelle-location-courte-duree` | **1 170** ✅ |

Autrement dit : `robots.txt` invite poliment tous les moteurs de réponse, et **ils
trouvent une maison vide** sur chaque page commerciale. Seul le Journal est citable.

**Pourquoi.** `scripts/prerender.mjs:101-106` n'injecte du contenu dans `<div id="root">`
que si la route déclare un champ `bodyHtml`. Or seules les routes du Journal en
déclarent un (`prerender.mjs:183` et `:266`). Les 13 routes fixes de
`scripts/seo-routes.mjs` n'ont **que** des métadonnées — titre, description, canonical,
Open Graph — et aucun corps de page.

**Nuance honnête :** Googlebot, lui, exécute le JavaScript. Le référencement Google
classique n'est donc pas condamné par ce point. Mais le rendu est différé et
budgété — c'est un handicap, pas une catastrophe. Pour ChatGPT, Perplexity et Claude en
revanche, c'est éliminatoire : ces pages ne peuvent littéralement pas être citées.

**Le correctif.** Donner un `bodyHtml` aux routes commerciales, exactement comme pour les
articles. La mécanique existe déjà et fonctionne — il s'agit de l'étendre, pas de
l'inventer. Une demi-journée de travail pour les 4 pages qui comptent
(`/`, `/conciergerie`, `/sous-location`, `/conciergerie-avignon`).

**Détail mineur au passage :** `/llms.txt` n'existe pas — la requête tombe dans le
rewrite et renvoie la coquille HTML. Ce fichier est ignoré par Google et son utilité
reste débattue ; à traiter en dernier, si jamais.

---

## 3. Le problème n°2 — trois à cinq fois moins de contenu que la page 1

J'ai mesuré le site, puis deux concurrents qui occupent aujourd'hui les résultats sur
« conciergerie Airbnb Avignon ».

> **Ce tableau a été traité.** La colonne « avant » est conservée pour mémoire ; la
> colonne « aujourd'hui » est l'état vérifié en production le 8 août 2026 à 20 h 30.

| | `/conciergerie` **avant** | `/conciergerie` **aujourd'hui** | conciergerie-avignon.com | **croceo.fr** |
|---|---|---|---|---|
| Mots visibles | 391 | **1 369** | ~1 100 | ~2 200 |
| H1 contient le mot-clé | ❌ | ✅ « …appartements **à Avignon**, intra-muros » | ✅ | ✅ |
| Nombre de H2 | 4 | **6** | 4 | 8 |
| Bloc FAQ | ✅ non balisé | ✅ **9 questions, balisées `FAQPage`** | ✅ 4 questions | ✅ |
| Tarif affiché | ❌ | ✅ « **environ 17 % du brut** », sur un cas chiffré | ❌ | ✅ « à partir de 20 % TTC » |
| Avis clients nommés | ❌ | ✅ **6 avis Google nommés** | ❌ | ✅ 6 avis datés |
| Chiffres locaux vérifiables | partiel | ✅ **délibération du 22/02/2025, 4 300 logements, 90 jours** | ❌ | ✅ prix/nuit, Festival |

Sur les mots visibles, `/conciergerie` est passé **devant les deux concurrents mesurés**.
Le seul écart restant est la date des avis : les nôtres sont nommés mais non datés, parce
que la page ne les affiche pas — c'est une donnée à récupérer sur la fiche Google.

Google ne compte pas les mots, mais il mesure si une page **couvre le sujet**. À 400
mots, `/conciergerie` répond à une fraction des questions qu'un propriétaire se pose.
Croceo, à 2 200 mots avec tarifs, FAQ et avis datés, y répond presque toutes — et c'est
pour ça qu'il est devant.

**Le point de tension avec le design.** Victor rejette à juste titre le remplissage
générique et les adjectifs de luxe non prouvés. Ce n'est pas contradictoire avec ce qui
précède : ce qui manque n'est pas du volume, ce sont **des faits**. Un tarif réel. Le
détail de ce qui est inclus. Un cas chiffré. Le nombre de logements gérés. Le délai
d'intervention. Ces éléments allongent la page *et* respectent la règle « des faits
locaux vérifiables plutôt que des adjectifs ».

---

## 3 bis. Ce que révèle « Conciergerie du Palais », bien classée avec 3 avis

Analysé le 8 août 2026 à la demande de Victor. Le site est
`conciergerie-dupalais-avignon.fr`. Voici ce qu'il contient, mesuré :

| | Conciergerie du Palais | Chevalier `/conciergerie` |
|---|---|---|
| Pages dans le sitemap | **1** | 17 pour le site |
| Mots visibles | 560 | 1 369 |
| Balises `<h1>` | **0** | 1 |
| Balises `<h2>` | **0** | 6 |
| Données structurées | **aucune** | LocalBusiness, Service, FAQPage, BreadcrumbList |
| `robots.txt` | **absent** (404) | 20 robots nommés |
| `<title>` | « Conciergerie à Avignon » | « Conciergerie Airbnb Avignon \| … » |

**Ce site n'est pas mieux construit. Il est plus concentré.** Une page, un titre qui
reprend mot pour mot la requête, un nom de domaine qui la contient aussi. Tout le poids
du site pousse une seule requête.

Deux conclusions, dont une qui corrige ce que j'écrivais plus haut :

1. **La profondeur de contenu n'est pas le facteur limitant sur cette requête.** Le
   comparatif de la section 3 opposait le site à croceo.fr (2 200 mots) : c'était vrai
   mais incomplet. Un site de 560 mots sans titre ni schéma se classe aussi. Ce qui les
   sépare du reste, c'est le **référencement local** — fiche d'établissement, adresse,
   catégorie, proximité — et l'exactitude des signaux de correspondance. Cela renforce
   l'action 18, qui reste la plus rentable du document.
2. **La dispersion coûte.** Là où ce concurrent aligne tout sur une requête, le site
   avait deux pages indexées sous un `<title>` strictement identique (voir ci-dessous) :
   Google partageait les signaux entre elles.

## 3 ter. Un titre en double — corrigé, et empêché à l'avenir

`/conciergerie` et `/conciergerie-avignon` servaient exactement le même titre :
« Conciergerie Airbnb Avignon | Gestion Location Saisonnière | Chevalier ».

**C'est une régression que j'ai introduite.** En faisant lire le titre des pages locales
directement dans les fichiers `src/pages/Conciergerie*.tsx` — pour éviter qu'ils
divergent — j'ai remplacé le titre distinct qui existait dans `seo-routes.mjs`
(« Conciergerie Avignon Intra-Muros | Gestion Airbnb Locale ») par le `metaTitle` du
composant, identique à celui de `/conciergerie`.

Corrigé : `/conciergerie-avignon` vise désormais l'ancrage local — « Conciergerie Avignon
intra-muros | Quartiers et règles 2026 » — pendant que `/conciergerie` garde le service.

**Le build échoue maintenant sur tout titre dupliqué**, en nommant les deux pages
concernées. Vérifié en injectant volontairement un doublon : l'erreur se déclenche.

## 4. Le problème n°3 — les H1 ne portent pas les mots-clés

| Page | H1 en production | Problème |
|---|---|---|
| `/` | « VOTRE CONCIERGERIE » | Ni ville, ni service. Le H1 le plus important du site ne cible rien |
| `/conciergerie` | « Nous tenons vos appartements intra-muros. » | Belle phrase, aucun mot-clé. Ni « conciergerie », ni « Airbnb », ni « Avignon » |
| `/conciergerie-avignon` | « Conciergerie Airbnb à Avignon » | ✅ correct |
| `/sous-location` | ⚠️ non relevé individuellement | à vérifier |

Le H1 reste un des signaux les plus lisibles pour Google. Ces deux-là sont l'unique
occasion de dire au moteur de quoi parle la page, et ils la laissent passer.

**Ce n'est pas un appel à écrire « Conciergerie Airbnb Avignon pas cher ».** Une phrase
peut être belle *et* contenir le mot. Par exemple, en gardant la voix actuelle :

> « Nous tenons vos appartements **à Avignon**, intra-muros. »

Le mot-clé est là, la phrase n'a rien perdu.

---

## 5. Le problème n°4 — 9 URLs sur 26 mènent à une page 404

Le sitemap soumis à Google contient 9 URLs `/proprietes/<slug>` — une par logement de
`src/data/properties.ts`. **Aucune route `/proprietes/:slug` n'existe** dans
`src/App.tsx`. Vérifié en production :

```
curl https://chevalier-conciergerie.com/proprietes/epi
  → HTTP 200
  → <title>L'Epi – Climatisé – Wifi – 10 min centre-ville | Chevalier Conciergerie…</title>
  → contenu affiché : « 404 — Oops! Page not found »
```

Même chose pour `/reservation` et `/logements`, tous deux **liés depuis le pied de page,
donc depuis chaque page du site** (`src/components/Footer.tsx:10-11`), et pour le widget
de recherche de l'accueil (`src/components/BookingQuickSearch.tsx:21`).

Trois conséquences, dans l'ordre de gravité :

1. **Soft-404.** Répondre HTTP 200 sur une page d'erreur est explicitement pénalisé :
   Google considère le site comme peu fiable et réduit son budget de crawl.
2. **35 % du sitemap est faux.** C'est un signal de qualité désastreux sur un site qui
   n'a que 26 URLs.
3. **La page d'erreur est en anglais** — « Oops! Page not found » — sur un site
   entièrement francophone.

Correctif : supprimer l'appel à `readProperties()` dans `scripts/seo-routes.mjs:166`,
retirer les deux liens du `Footer`, retirer `BookingQuickSearch` de `Hero.tsx` et
`Index.tsx`, et traduire `NotFound.tsx`. **Une heure de travail.**

---

## 6. Performance

| Mesure | Valeur | Verdict |
|---|---|---|
| TTFB | 33 ms | Excellent |
| HTML transféré | ≈ 2,3 Ko | Excellent |
| CSS transféré | 18 Ko | Bon |
| JS transféré | 180 Ko (589 Ko brut) | Acceptable, améliorable |
| **Vidéo du hero** | **1 849 Ko** | **Problème** |
| Requêtes sur l'accueil | 6 | Excellent |

La vidéo `hero-video-luxury.mp4` pèse **1,85 Mo et se charge sur mobile comme sur
desktop** : `src/components/Hero.tsx:31-42` n'applique aucune condition de taille
d'écran. Le `preload="metadata"` ne protège pas, parce que `autoPlay` force le
téléchargement.

Google indexe en mobile-first. Sur une 4G moyenne, 1,85 Mo représente plusieurs secondes
avant que le contenu principal s'affiche — c'est le premier facteur de dégradation du
LCP, et le LCP est un critère de classement.

Deux options, par ordre de préférence :
1. Ne monter la vidéo qu'au-dessus de 768 px et garder le poster sur mobile (le hook
   `src/hooks/use-mobile.tsx` existe déjà).
2. Réencoder en WebM/AV1 et viser 400 Ko.

Le bundle JS est monolithique : aucun `React.lazy`, aucun découpage dans
`vite.config.ts`. Un visiteur qui arrive sur les mentions légales télécharge le site
entier. C'est le second levier, moins urgent.

---

## 7. Mesure

> **✅ Traité le 8 août 2026.** `@vercel/analytics` et `@vercel/speed-insights` sont
> installés et actifs — inclus dans l'offre Vercel Pro. Vérifié en production : les deux
> scripts se chargent et la balise de page vue (`insights/view`) part bien.
>
> Analytics donne les pages vues, les sources de trafic et les taux de clic.
> SpeedInsights remonte les **Core Web Vitals mesurés sur de vrais visiteurs** — le LCP
> que Google utilise réellement pour classer, pas une simulation. Aucun cookie n'est
> posé : rien à ajouter au bandeau de consentement.
>
> Les données apparaissent dans l'onglet Analytics du tableau de bord Vercel, avec
> quelques heures de décalage le temps que du trafic s'accumule.
>
> Google Analytics reste utile en complément (parcours, conversions, croisement avec la
> Search Console) et demande toujours l'identifiant `G-…`.

Le constat d'origine, pour mémoire : Google Analytics est **désactivé** (bloc commenté
dans `index.html`). Le site ne mesurait **aucune visite, aucune source de trafic, aucune
conversion**.

C'est bloquant pour la suite : sans mesure, il sera impossible de savoir si l'une des
actions ci-dessous a fonctionné. À activer avant tout le reste — Victor doit créer une
propriété sur analytics.google.com et fournir l'ID `G-…`.

S'ajoute un trou dans l'entonnoir : le formulaire de contact
(`src/components/ContactForm.tsx:62`) n'ouvre qu'un `mailto:`. Sur mobile et en webmail,
un prospect peut être perdu **sans que personne le sache**. Amener du trafic sur une page
dont le formulaire fuit reviendrait à remplir un seau percé.

---

## 8. Ce que je ne peux pas savoir depuis ici

Sois méfiant envers tout audit qui prétendrait le contraire.

- **Les positions réelles sur Google.** Aucun outil ici ne donne le classement français
  géolocalisé. Seule la Search Console le dit — elle est déjà vérifiée par DNS.
- **Le nombre de pages réellement indexées.** L'opérateur `site:` n'est pas honoré par
  l'outil de recherche dont je dispose.
- **Les volumes de recherche** sur « conciergerie Avignon » et ses variantes.
- **Les backlinks** pointant vers le domaine.
- **L'état de la fiche Google Business Profile** — revendiquée ? complète ? combien
  d'avis ?

**Un signal tout de même.** Dans les résultats de recherche, le site apparaît encore avec
son ancien titre — « Chevalier Conciergerie | Gestion Locative de Luxe à Avignon » — et
une description mentionnant « gestion 5 étoiles ». Ce sont les valeurs de l'ancien
`index.html`, pas celles servies aujourd'hui. **L'index n'a donc pas encore intégré le
travail du 8 août.** Il faut laisser passer un cycle de crawl — quelques jours à quelques
semaines — avant de juger quoi que ce soit. Demander une réindexation dans la Search
Console accélère les choses.

---

## 9. Le levier le plus sous-estimé : Google Business Profile

Sur une requête locale comme « conciergerie Avignon », Google affiche d'abord un **bloc
de trois établissements sur une carte**, avant les résultats classiques. Ce bloc capte
la majorité des clics.

**On n'y entre pas par le site.** On y entre par la fiche d'établissement : catégorie
principale exacte, zone de service, photos, horaires, et surtout **le nombre et la
fraîcheur des avis**.

Le site déclare bien une fiche (`index.html:79`), mais je note une incohérence à
vérifier : le schéma `LocalBusiness` donne les coordonnées `43.9657, 4.7956`
(Villeneuve-lès-Avignon) tandis que le lien Google Maps du même fichier pointe sur
`43.8680, 4.8328` — environ 11 km plus loin. Ces deux valeurs devraient coïncider.

Pour une entreprise créée le 17 décembre 2025, **c'est probablement le chantier au
meilleur rapport effort/résultat de toute cette liste** — et il ne demande pas une ligne
de code.

---

## 10. Plan d'action, par ordre de rentabilité

### Semaine 1 — réparer (≈ 1 journée de code)

| # | Action | Fichiers | État |
|---|---|---|---|
| 1 | Retirer les 9 routes `/proprietes` du sitemap | `scripts/seo-routes.mjs` | ✅ fait |
| 2 | Retirer les liens `/reservation` et `/logements` du pied de page | `src/components/Footer.tsx` | ✅ fait |
| 3 | Retirer le widget de recherche de l'accueil | `Hero.tsx`, `Index.tsx` | ✅ fait |
| 4 | Traduire et soigner la page 404 | `src/pages/NotFound.tsx` | ✅ fait — et le serveur renvoie désormais un vrai HTTP 404 (`vercel.json` + `prerender.mjs`) |
| 5 | Activer GA4 avec le vrai ID | `index.html:94-108` | ⏳ **bloqué** — il me faut l'ID `G-…` |
| 6 | Mettre le mot-clé dans les H1 | `Hero.tsx`, `Conciergerie.tsx`, `SousLocation.tsx` | ✅ fait, sur les trois pages |
| 7 | Conditionner la vidéo du hero au desktop | `Hero.tsx` | ✅ fait |
| 8 | Brancher le formulaire sur un vrai service d'envoi | `ContactForm.tsx:62` | ⏳ **bloqué** — décision à prendre |

### Semaine 2 — rendre les pages lisibles par les IA (≈ 1 journée)

| # | Action | Où | État |
|---|---|---|---|
| 9 | Ajouter un `bodyHtml` aux routes commerciales | `scripts/seo-routes.mjs` | ✅ fait — 8 pages, pas 4 |
| 10 | Baliser en `FAQPage` la FAQ de `/conciergerie` | `scripts/seo-routes.mjs` | ✅ fait, et aussi sur `/sous-location` |
| 11 | Ajouter `Service` et `BreadcrumbList` aux pages de service | `scripts/seo-routes.mjs` | ✅ fait |

**Note d'implémentation.** Les FAQ et le contenu des trois pages locales ne sont pas
recopiés dans `seo-routes.mjs` : ils sont **lus dans les fichiers source** au moment du
build (`readFaq()`, `readLocalPage()`). Un schéma `FAQPage` qui ne correspond plus à la
page affichée est une infraction aux consignes de Google ; ici la divergence est
impossible, et si le format des pages change, le build échoue avec un message explicite
au lieu de publier un schéma faux.

### Semaines 3 à 8 — le vrai travail : le contenu

| # | Action | Cible | Impact |
|---|---|---|---|
| 12 | Étoffer `/conciergerie` : 391 → 1 200 mots, avec le détail des prestations, un tarif réel et une FAQ de 6 questions | contenu | 🔴 fort |
| 13 | Étoffer `/sous-location` de la même façon | contenu | 🔴 fort |
| 14 | Étoffer les 3 pages locales : 425 → 900 mots, avec des faits propres à chaque commune | `LocalSeoPage.tsx` | 🔴 fort |
| 15 | Afficher un tarif. Croceo affiche « à partir de 20 % TTC ». Ne rien afficher fait perdre les propriétaires qui comparent | contenu | 🟠 moyen |
| 16 | Publier des avis clients datés et nommés, balisés en `Review` | contenu + schéma | 🟠 moyen |
| 17 | Tenir le rythme du Journal : 2 articles → 12, en suivant `content/journal/_TRAME.md` | `content/journal/` | 🔴 fort (durable) |

### En parallèle, sans code

| # | Action | Impact |
|---|---|---|
| 18 | Optimiser la fiche Google Business Profile et lancer une collecte d'avis | 🔴 **le plus fort** |
| 19 | Demander la réindexation des pages dans la Search Console | 🟠 moyen |
| 20 | Obtenir des liens locaux : annuaires d'Avignon, office de tourisme, partenaires (ERA, La Cave) déjà présents sur `/partenaires` | 🟠 moyen, long terme |

---

## 11. Réponse directe : « comment être en page 1 ? »

**Sur « Chevalier Conciergerie » (la marque) :** c'est déjà le cas. Le site ressort en
premier sur son propre nom.

**Sur « conciergerie Avignon » et « conciergerie Airbnb Avignon » :** pas aujourd'hui, et
pas avant plusieurs mois. Les raisons, dans l'ordre :

1. **Le domaine est neuf.** L'entreprise a été créée en décembre 2025. Face à Hostnfly,
   Welkeys ou Croceo — des acteurs nationaux avec des années d'ancienneté et des
   centaines de liens entrants — l'écart d'autorité ne se rattrape pas en semaines.
2. **Le contenu est trois à cinq fois plus mince** que celui des pages qui occupent
   la place.
3. **Le travail SEO du 8 août n'est pas encore indexé** — les résultats affichent encore
   l'ancien titre.

**La stratégie réaliste, et elle est bonne :** ne pas attaquer « conciergerie Avignon »
de face. Prendre d'abord ce qui est gagnable.

- **Le bloc local (la carte).** C'est la voie la plus rapide vers la page 1, et elle se
  joue sur la fiche Google Business Profile, pas sur le site. Un concurrent national ne
  peut pas y rivaliser avec une vraie entreprise locale.
- **Les requêtes longues où les gros sites sont absents** : « conciergerie Airbnb
  Villeneuve-lès-Avignon », « conciergerie Les Angles », « déclarer une location
  saisonnière à Avignon », « rentabilité location courte durée Avignon ». Les trois
  pages locales et les deux articles du Journal visent déjà exactement ça — c'est la
  bonne intuition, il faut la tenir dans la durée.
- **Le GEO comme raccourci.** C'est là que le retard d'autorité compte le moins :
  ChatGPT et Perplexity citent la source qui répond le mieux à la question, pas la plus
  ancienne. Le Journal est déjà correctement équipé pour ça. Rendre les pages
  commerciales lisibles sans JavaScript (action n°9) ouvre le même canal au reste du
  site — c'est, à mon avis, la meilleure action de tout ce document au regard de son
  coût.

**Ordre que je recommande :** réparer les 404 → activer la mesure → ouvrir les pages aux
IA → travailler la fiche Google Business Profile → puis, et seulement puis, écrire du
contenu de fond au rythme d'un article par semaine.
