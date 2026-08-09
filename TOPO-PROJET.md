# TOPO — chevalier-conciergerie.com (site vitrine) — 8 août 2026

> Document d'onboarding rédigé pour Paul. Tout ce qui suit provient d'un fichier lu ou
> d'une commande exécutée dans `C:\Users\victo\Downloads\Site web` le 8 août 2026, ou
> d'une vérification sur le site en production le même jour. Ce qui n'a pas pu être
> établi depuis le code est marqué `⚠️ à vérifier avec Victor`.

---

## Avertissement de périmètre — à lire avant tout le reste

Le questionnaire d'origine porte sur un **outil de conciergerie** (PMS, WhatsApp, agent
LLM, multi-tenant, dashboard admin). **Ce dépôt n'est pas cet outil.** C'est le **site
vitrine** de Chevalier Conciergerie : une SPA React statique, sans backend, sans base de
données, sans LLM et sans authentification.

Les questions 1 à 7 du questionnaire trouvent donc ici des réponses très courtes, et
c'est la réalité du code, pas une lacune du rapport. Le produit visé par ces questions
est un **second projet, `chevalier-pms`**, situé hors de ce dépôt (chemin indiqué par
Victor : `Documents\SAS\SAAS\chevalier-pms`). Il n'a pas été audité ici.
**⚠️ à vérifier avec Victor :** est-ce bien `chevalier-pms` que Paul reprend, ou ce site
vitrine, ou les deux ?

**Aucun secret n'a été trouvé et aucun ne figure dans ce rapport.** Le projet ne
consomme aucune variable d'environnement (vérifié : `grep -rn "import.meta.env\|process.env" src scripts index.html` → 0 résultat) et aucun `.env` n'a jamais été commité
(vérifié : `git log --all --diff-filter=A -- '*.env*'` → vide). Ce fichier peut être
transmis tel quel.

---

## 0. Résumé exécutif

**Ce que c'est.** Le site vitrine de Chevalier Conciergerie (conciergerie Airbnb et
sous-location à Avignon, Villeneuve-lès-Avignon, Les Angles). Un site de génération de
prospects : présenter les deux offres, faire venir des propriétaires, les faire
contacter Victor.

**La stack en une phrase.** Vite 5 + React 18 + TypeScript + Tailwind + shadcn/ui,
100 % statique, pré-rendu maison au build par `scripts/prerender.mjs`, déployé sur
Vercel depuis la branche `main`.

**Où en est le projet.** Le site est en ligne, complet et à jour. 440 commits depuis
janvier 2025 (démarré sur un template Lovable). Une grosse passe SEO/GEO + refonte
design a été menée le 8 août 2026 et est déployée.

**Les 3 chantiers en cours**
1. Retrait du moteur de réservation Beds24 : les **routes** ont été supprimées le 8 août
   (`src/App.tsx:46-51`), mais **le code et les liens sont restés** — c'est le problème
   n°1 ci-dessous.
2. Recomposition des sections intérieures (Sous-location, Contact, Partenaires, À propos)
   selon les règles de design établies avec Victor.
3. Une routine de publication automatique du Journal, qui rédige mais ne peut pas
   pousser (jeton GitHub en lecture seule). Voir `REPRISE.md`.

**Les 3 points de vigilance majeurs**

1. **🔴 Liens morts sur 100 % des pages.** Le pied de page
   (`src/components/Footer.tsx:10-11`) pointe vers `/reservation` et `/logements`, deux
   routes supprimées. Le widget de recherche de la page d'accueil
   (`src/components/BookingQuickSearch.tsx:21`) redirige lui aussi vers `/reservation`.
   Ces URLs répondent **HTTP 200** puis affichent « 404 — Oops! Page not found », en
   anglais. Vérifié en production.
2. **🔴 9 URLs fantômes dans le sitemap.** `scripts/seo-routes.mjs:144-164` génère une
   entrée `/proprietes/<slug>` par logement de `src/data/properties.ts`, mais aucune
   route `/proprietes/:slug` n'existe dans `src/App.tsx`. 9 des 26 URLs du sitemap
   soumis à Google sont donc des soft-404. Vérifié :
   `curl https://chevalier-conciergerie.com/proprietes/epi` → HTTP 200, titre correct,
   page « 404 » affichée.
3. **🟠 Les prospects du formulaire de contact peuvent être perdus.**
   `src/components/ContactForm.tsx:62` ne fait qu'ouvrir un lien `mailto:`. Pas de
   backend, pas de service d'envoi, pas de CRM. Si le visiteur n'a pas de client mail
   configuré — cas courant sur mobile et en webmail — le message n'arrive nulle part et
   personne ne le sait.

**Aucune action de sécurité urgente.** Pas de secret exposé, pas de `.env` commité.

---

## 1. Le produit

Un site vitrine de 15 pages, en français, mono-client (Chevalier Conciergerie
uniquement). Ce que le code montre :

**Deux offres commerciales**
- **Conciergerie** (`src/pages/Conciergerie.tsx`) : gestion complète d'une location
  saisonnière — annonces, accueil voyageurs, ménage, maintenance.
- **Sous-location** (`src/pages/SousLocation.tsx`) : Chevalier loue le bien et verse un
  loyer garanti au propriétaire. Page d'estimation dédiée
  (`src/pages/EstimationSousLocation.tsx`, 518 lignes — la plus grosse page du site).

**Trois pages locales SEO** — Avignon, Villeneuve-lès-Avignon, Les Angles. Elles
partagent un composant générique `src/pages/LocalSeoPage.tsx` (283 lignes) alimenté par
trois fichiers de données (`ConciergerieAvignon.tsx`, `ConciergerieVilleneuve.tsx`,
`ConciergerieLesAngles.tsx`).

**Un Journal** (`src/pages/Journal.tsx`, `JournalArticle.tsx`) : des articles en
Markdown dans `content/journal/`, convertis en HTML au build. 2 articles publiés,
1 438 et 1 222 mots. Une trame éditoriale imposée est documentée dans
`content/journal/_TRAME.md` (H2 formulés en questions, tableau comparatif, section prix,
bloc FAQ obligatoire de 4 questions qui alimente le schéma `FAQPage`).

**Pages annexes** : À propos, Partenaires, Contact, CGV, mentions légales, politique de
confidentialité.

**La vision cible, telle que le code la laisse voir.** Il y a eu une tentative
d'ajouter un **moteur de réservation en direct** (catalogue de logements + iframe
Beds24) pour court-circuiter les commissions Airbnb. Le chantier a été **suspendu** le
8 août 2026 ; le commentaire dans `src/App.tsx:46-51` le dit explicitement :
« Réservation en direct retirée en attendant que le site de réservation soit
opérationnel. Les composants restent dans le dépôt […] il suffira de rétablir ces trois
routes ».

---

## 2. Cartographie des repos

| Dépôt / dossier | Rôle | Remote GitHub | Branche locale | Dernier commit | Propre ? |
|---|---|---|---|---|---|
| `C:\Users\victo\Downloads\Site web` | Site vitrine (ce rapport) | `github.com/chevalierconciergerie-crypto/chevalier-conciergerie` | `work` (courante) | 8 août 2026 — « Corrige REPRISE.md : le blocage Vercel annoncé n'existait pas » | Oui. Seuls `.claude/` et `.tiktok-frames/` sont non trackés (config locale et rushes vidéo — sans intérêt pour Paul) |
| `Documents\SAS\SAAS\chevalier-pms` | Le PMS / l'outil de conciergerie | ⚠️ non audité | — | — | — |

**Un seul dépôt git dans `Downloads`** (vérifié : boucle sur `*/` cherchant `.git`).
Les autres dossiers voisins sont des dossiers de photos et de vidéos, sans lien avec le
code.

### ⚠️ Piège pour Paul : la branche `main` locale est un leurre

```
  feat/cinematic-oryzo   [origin/feat/cinematic-3d-redesign: ahead 8]
  main                   [origin/main: ahead 15, behind 39]
* work                   3444886  ← identique à origin/main
```

La branche **`work` est la branche de travail réelle**, et c'est elle qui est poussée
vers `main` distant. La branche `main` **locale** est abandonnée depuis longtemps :
39 commits de retard et 15 commits d'avance qui n'ont jamais été poussés.
**Ne jamais partir de `main` en local.** Un `git clone` frais est plus sûr : il donne
`origin/main`, qui est bien l'état à jour.

Le workflow de déploiement en vigueur est :

```bash
git push origin work:main
```

`origin/feat/cinematic-3d-redesign` est une refonte 3D abandonnée.
**⚠️ à vérifier avec Victor :** peut-on supprimer cette branche et `main` locale ?

`gh` n'a pas été utilisé (non vérifié comme installé) : la visibilité du dépôt, les
issues et les PR ouvertes n'ont pas pu être consultées. **⚠️ à vérifier avec Victor :**
le dépôt est-il privé ?

---

## 3. Stack technique

**Runtime & build**

| Élément | Valeur | Source |
|---|---|---|
| Bundler | Vite `^5.4.19` | `package.json` |
| Framework | React `^18.3.1` + react-dom | `package.json` |
| Router | react-router-dom `^6.30.1`, `BrowserRouter` | `src/App.tsx:5` |
| Langage | TypeScript `^5.8.3` | `package.json` |
| CSS | Tailwind `^3.4.17` + `@tailwindcss/typography` | `tailwind.config.ts` |
| Composants | shadcn/ui (≈ 45 fichiers dans `src/components/ui/`), Radix UI | `components.json` |
| Animations | framer-motion `^12.39.0` | `package.json` |
| Markdown | marked `^18.0.9` (rendu des articles) | `src/lib/journal.ts` |
| Images (build) | `vite-plugin-image-optimizer` + `sharp ^0.35.3` + `svgo ^4.0.1` | `package.json`, `vite.config.ts` |
| Node en prod | 24.x | tableau de bord Vercel |

**Scripts npm** (`package.json:6-12`)

| Script | Ce qu'il fait |
|---|---|
| `dev` | Serveur Vite, port 8080 (`.claude/launch.json`) |
| `build` | `vite build && node scripts/prerender.mjs` — **le pré-rendu fait partie du build**, ne jamais lancer `vite build` seul |
| `build:dev` | Idem en mode development |
| `lint` | ESLint 9 (flat config, `eslint.config.js`) |
| `preview` | Prévisualisation du `dist/` |

**TypeScript : non strict.** `tsconfig.json` désactive explicitement
`strictNullChecks`, `noImplicitAny`, `noUnusedLocals` et `noUnusedParameters`. C'est
l'héritage du template Lovable. Passer en strict est faisable mais générera du bruit.

**Gestionnaire de paquets : ambigu — à trancher.** Trois lockfiles coexistent à la
racine : `bun.lock`, `bun.lockb` **et** `package-lock.json`. Seul `package-lock.json`
fait foi, parce que `vercel.json` force `"installCommand": "npm install"`. Les deux
fichiers Bun sont des reliques du template et devraient être supprimés — ils vont
induire Paul en erreur.

**Pas de monorepo, pas de workspaces.** Un seul `package.json`.

---

## 4. Architecture

**Il n'y a pas de serveur.** Pas d'API, pas de route serveur, pas de webhook, pas de
cron, pas de worker. Le site est un paquet de fichiers statiques servi par le CDN
Vercel. Tout ce qui ressemble à du « backend » est en réalité soit un lien sortant
(`mailto:`, `tel:`, `wa.me`), soit une iframe tierce.

### Flux principal — le parcours d'un prospect

```
Visiteur Google / IA
      │
      ▼
CDN Vercel ──► dist/<route>/index.html      (HTML pré-rendu au build :
      │                                      <title>, description, canonical,
      │                                      Open Graph, JSON-LD)
      ▼
React monte et remplace #root              (SPA, react-router-dom)
      │
      ▼
Le prospect veut prendre contact
      ├─► Formulaire /contact ──► window.location = mailto:contact@…   ⚠️ pas de backend
      ├─► Bouton téléphone ─────► tel:+33783198341
      ├─► Bouton WhatsApp ──────► https://wa.me/33783198341
      └─► Formulaire /estimation-sous-location ──► ⚠️ à vérifier (même mécanique mailto ?)
```

### Flux du build — le point le plus important à comprendre

```
npm run build
   │
   ├─ vite build ─────────────► dist/index.html  (une SEULE coquille SPA)
   │                            dist/assets/*    (JS 589 Ko, CSS 108 Ko, images, mp4)
   │
   └─ node scripts/prerender.mjs
          │
          ├─ lit scripts/seo-routes.mjs ──► 13 routes fixes
          │                             └─► + 9 routes /proprietes/<slug>
          │                                 générées depuis src/data/properties.ts
          │                                 ⚠️ ces 9 routes n'existent pas dans App.tsx
          │
          ├─ lit scripts/journal.mjs ────► content/journal/*.md → 1 page liste + 2 articles
          │
          └─ pour chaque route, écrit :
                 dist/<route>/index.html   ─┐ les deux formes, pour ne pas dépendre de
                 dist/<route>.html         ─┘ l'ordre de résolution de Vercel
                 + dist/sitemap.xml         (regénéré depuis la même liste)
```

Le point clé, expliqué en tête de `scripts/prerender.mjs:1-13` : sans ce script, toutes
les URLs servaient le même `<title>`, la même description et un `canonical` pointant
vers l'accueil — Google y voyait autant de copies de la page d'accueil.

Second point clé (`scripts/prerender.mjs:97-106`) : pour les articles du Journal, le
script injecte le **contenu HTML complet** dans `<div id="root">`. React l'écrase au
montage, mais les robots qui n'exécutent pas de JavaScript — GPTBot, PerplexityBot,
ClaudeBot — le lisent. C'est ce qui rend les articles citables par les moteurs IA.
**Les pages de service, elles, ne reçoivent pas de `bodyHtml`** : elles ne servent
qu'une coquille aux robots sans JS. Voir la section GEO plus bas.

### Routes (`src/App.tsx:36-58`)

| Route | Page | Pré-rendue | Dans le sitemap |
|---|---|---|---|
| `/` | `Index.tsx` | ✅ | ✅ |
| `/conciergerie` | `Conciergerie.tsx` | ✅ | ✅ |
| `/sous-location` | `SousLocation.tsx` | ✅ | ✅ |
| `/estimation-sous-location` | `EstimationSousLocation.tsx` | ✅ | ✅ |
| `/contact` | `Contact.tsx` | ✅ | ✅ |
| `/conciergerie-avignon` | `ConciergerieAvignon.tsx` | ✅ | ✅ |
| `/conciergerie-villeneuve-les-avignon` | `ConciergerieVilleneuve.tsx` | ✅ | ✅ |
| `/conciergerie-les-angles` | `ConciergerieLesAngles.tsx` | ✅ | ✅ |
| `/partenaires` | `Partenaires.tsx` | ✅ | ✅ |
| `/a-propos` | `APropos.tsx` | ✅ | ✅ |
| `/cgv` | `CGV.tsx` | ✅ | ✅ |
| `/mentions-legales` | `MentionsLegales.tsx` | ✅ | ✅ |
| `/politique-confidentialite` | `PolitiqueConfidentialite.tsx` | ✅ | ✅ |
| `/journal` | `Journal.tsx` | ✅ | ✅ |
| `/journal/:slug` | `JournalArticle.tsx` | ✅ (2 articles) | ✅ |
| `*` | `NotFound.tsx` | — | — |
| **`/proprietes/:slug`** | **aucune** | **✅ (9 pages)** | **✅ (9 URLs)** | ← incohérence

### Structure de `src/`

| Dossier | Rôle |
|---|---|
| `src/pages/` | 20 fichiers, un par écran. 5 ne sont plus routés (voir §7) |
| `src/components/` | 19 composants métier (Header, Footer, Hero, ContactForm…) |
| `src/components/ui/` | ≈ 45 primitives shadcn/ui. Générées, non modifiées, largement inutilisées |
| `src/data/properties.ts` | **La seule « base de données » du site** : 9 logements en dur (197 lignes) |
| `src/lib/seo.tsx` | Implémentation maison de `Helmet` / `HelmetProvider` |
| `src/lib/journal.ts` | Chargement et rendu des articles Markdown côté client |
| `src/hooks/` | `use-mobile`, `use-toast`, `useScrollAnimation` |
| `src/assets/` | ≈ 60 images + 3 vidéos, importées par Vite (hashées au build) |
| `scripts/` | Les 5 scripts Node du build (voir ci-dessous) |
| `content/journal/` | Les articles en Markdown + la trame éditoriale |

### Les scripts (`scripts/`)

| Fichier | Rôle | Lancé par |
|---|---|---|
| `prerender.mjs` (310 l.) | Pré-rendu + sitemap. Le cœur du SEO | `npm run build` |
| `seo-routes.mjs` (167 l.) | Déclaration des routes, titres, descriptions, priorités | importé par `prerender.mjs` |
| `journal.mjs` | Lecture des `.md`, front-matter, temps de lecture | importé par `prerender.mjs` |
| `journal-images.mjs` | Génération des visuels d'articles | manuel ⚠️ à vérifier |
| `resize-assets.mjs` | Recalibrage des images sur 2× leur taille d'affichage | manuel ⚠️ à vérifier |

---

## 5. Base de données

**Il n'y en a pas.** Aucun Supabase, aucun Postgres, aucun SQLite, aucun Firebase.
Vérifié par recherche de tous les SDK et chaînes correspondants dans `src/` et
`package.json` : zéro résultat pour `supabase`, `prisma`, `pg`, `firebase`.

Les seules données du site sont **statiques et versionnées** :

| « Table » | Fichier | Contenu |
|---|---|---|
| Logements | `src/data/properties.ts` | 9 entrées. Champs notables : `slug`, `name`, `shortDescription`, `beds24PropId` (identifiants Beds24 : 322449, 322462, 322497, 322500, 322531, 330521, 326306, 328000, 328217) |
| Articles | `content/journal/*.md` | 2 articles + `_TRAME.md` |
| Routes SEO | `scripts/seo-routes.mjs` | 13 routes fixes avec leurs métadonnées |

**Pas de migrations, pas de multi-tenant, pas de RLS, pas d'authentification.** Le site
est intégralement public. Il n'y a aucun compte utilisateur ni aucune session.

**Attention si Paul touche au PMS :** la mémoire de projet de Victor signale que dans
`chevalier-pms`, **la base de données locale est la base de production Supabase**.
Ça ne concerne pas ce dépôt-ci, mais c'est bon à savoir avant de lancer quoi que ce soit
dans l'autre.

---

## 6. Intégrations externes

### Beds24 — moteur de réservation — ❌ débranché, code resté

| | |
|---|---|
| **Rôle** | Iframe du moteur de réservation en direct, pour réserver sans passer par Airbnb |
| **Auth** | Aucune côté site. URL publique avec `ownerid=158258` |
| **Fichiers** | `src/pages/Reservation.tsx:14` (URL de l'iframe), `src/data/properties.ts:40` (champ `beds24PropId`), `src/components/BookingQuickSearch.tsx`, `src/components/PropertyListings.tsx:158` |
| **Statut réel** | **Débranché.** La route `/reservation` a été retirée de `src/App.tsx` le 8 août 2026. Le composant existe toujours et n'est plus atteignable. Mais `Footer.tsx:10` et `BookingQuickSearch.tsx:21` continuent d'y envoyer les visiteurs |
| **À faire** | Victor a demandé le retrait complet de Beds24. Voir `REPRISE.md` §4 |

Le site mentionne un **paiement par carte via Stripe** (`src/pages/Reservation.tsx:33`
et `:85`), mais c'est Beds24 qui l'opère dans son iframe. **Aucun SDK Stripe n'est
installé dans ce projet** — vérifié dans `package.json`.

### Formulaire de contact — 🚧 `mailto:` uniquement

| | |
|---|---|
| **Rôle** | Capter les prospects propriétaires |
| **Fichier** | `src/components/ContactForm.tsx` (228 lignes) |
| **Mécanique** | Validation côté client, puis `window.location.href = "mailto:contact@chevalier-conciergerie.com?subject=…&body=…"` (`ligne 62`) |
| **Statut réel** | **Fragile.** Aucun backend, aucun service d'envoi (pas de Formspree, EmailJS, Resend, Web3Forms — tous vérifiés absents). Si le visiteur n'a pas de client mail configuré, le prospect est perdu **sans trace**. Aucune conversion n'est mesurable |
| **RGPD** | Une case de consentement est présente et obligatoire (`ligne 191-208`) — correct |

L'adresse `contact@chevalier-conciergerie.com` est hébergée chez Hostinger, le domaine
chez IONOS (information issue de la mémoire de projet de Victor, non vérifiable depuis
le code).

### Google Maps — ✅ branché (mais mal réglé)

Iframe d'intégration dans `src/components/ContactMap.tsx`. Elle est centrée sur
**Avignon en général**, pas sur l'établissement. Pas de clé API (l'embed public n'en
demande pas). Aucun signal local n'en découle.

### WhatsApp — ✅ branché

Lien `https://wa.me/33783198341` dans `src/components/Booking.tsx:79`. Simple lien
sortant, aucune API.

### Google Analytics 4 — 💤 désactivé volontairement

Le bloc `gtag` est **commenté** dans `index.html:94-108`. Le commentaire explique
pourquoi : le script chargeait l'ID d'exemple `G-XXXXXXXXXX`, ce qui produisait une
requête externe bloquante à chaque visite et zéro donnée. **Le site ne mesure donc
strictement rien aujourd'hui.**

### Google Search Console — ✅ vérifié, par DNS

La balise HTML de vérification est également commentée (`index.html:12-17`). D'après
`REPRISE.md`, la propriété est vérifiée via `sc-domain:` (enregistrement DNS), ce qui
rend la balise inutile. Sitemap soumis, 28 URLs découvertes.
**⚠️ à vérifier avec Victor :** confirmer l'accès Search Console et le partager à Paul.

### `mapbox-gl` — ❌ dépendance morte

`mapbox-gl ^3.17.0` est déclaré dans `package.json` mais **importé nulle part**
(vérifié : `grep -rn "mapbox" src` → 0). Vite ne l'embarque donc pas dans le bundle —
c'est un coût d'installation et une fausse piste, pas un poids en production. Même
constat pour `zod` et `date-fns`.

### Ce qui n'existe pas

Aucun PMS branché, aucun channel manager, aucune messagerie voyageur, **aucun LLM**,
aucun webhook entrant, aucune serrure connectée, aucun upsell, aucun paiement opéré par
le site. Le seul fournisseur qui touche à la donnée métier est Beds24, et il est
débranché.

---

## 7. État des fonctionnalités

| Fonctionnalité | Statut | Détail | Fichiers clés |
|---|---|---|---|
| Site vitrine 15 pages | ✅ | En ligne, à jour, vérifié le 8 août en production | `src/App.tsx`, `src/pages/` |
| Pré-rendu SEO par route | ✅ | 26 pages + sitemap générés au build. Vérifié : `/conciergerie` sert bien son propre `<title>` | `scripts/prerender.mjs` |
| Journal (blog) | ✅ | Markdown → HTML au build, contenu complet dans le HTML pour les robots IA | `scripts/journal.mjs`, `content/journal/` |
| Données structurées | 🚧 | `LocalBusiness` sur toutes les pages ✅. `BlogPosting` + `BreadcrumbList` + `FAQPage` sur les articles ✅. **Rien sur les pages de service** — ni `Service`, ni `FAQPage`, ni `BreadcrumbList` | `index.html:40-82`, `scripts/prerender.mjs:206-252` |
| 3 pages locales (Avignon / Villeneuve / Les Angles) | ✅ | Composant générique piloté par données | `src/pages/LocalSeoPage.tsx` |
| Formulaire de contact | 🚧 | Ouvre un `mailto:`. Pas de backend, prospects potentiellement perdus, zéro traçabilité | `src/components/ContactForm.tsx:62` |
| Formulaire d'estimation sous-location | 🚧 | 518 lignes. ⚠️ à vérifier : même mécanique `mailto:` ? | `src/pages/EstimationSousLocation.tsx` |
| Réservation en direct (Beds24) | ❌ | Routes retirées de `App.tsx` le 8 août. Le code reste, inatteignable | `src/pages/Reservation.tsx`, `Logements.tsx`, `PropertyDetail.tsx` |
| Catalogue de logements | ❌ | Idem. `PropertyListings.tsx` n'est plus importé par personne | `src/components/PropertyListings.tsx`, `PropertyShowcase.tsx` |
| Pages `/proprietes/<slug>` | ❌ | 9 pages pré-rendues + 9 URLs dans le sitemap, **aucune route correspondante**. Soft-404 | `scripts/seo-routes.mjs:144-164` |
| Liens du pied de page vers `/reservation` et `/logements` | ❌ | Présents sur **toutes** les pages du site. Mènent au 404 | `src/components/Footer.tsx:10-11` |
| Widget de recherche de la page d'accueil | ❌ | Visible en production, redirige vers `/reservation` (mort) | `src/components/BookingQuickSearch.tsx:21` |
| Google Analytics | 💤 | Code commenté, en attente d'un vrai ID `G-…` | `index.html:94-108` |
| Optimisation des images au build | ✅ | `sharp` installé le 8 août ; l'optimisation échouait silencieusement avant | `vite.config.ts` |

### Code mort à supprimer

Composants et pages **importés par personne** (vérifié par recherche des imports) :

```
src/pages/Logements.tsx          src/components/PropertyListings.tsx
src/pages/Reservation.tsx        src/components/PropertyShowcase.tsx   (seul Logements l'importe)
src/pages/PropertyDetail.tsx     src/components/AvignonIllustration.tsx
                                 src/components/ComingSoon.tsx
                                 src/components/HeroImageCarousel.tsx
                                 src/components/NavLink.tsx
                                 src/components/PromoBanner.tsx
                                 src/components/SocialBar.tsx
```

À quoi s'ajoutent ≈ 45 primitives shadcn/ui dans `src/components/ui/` dont la grande
majorité n'est jamais utilisée (sidebar 637 lignes, chart 303 lignes, carousel,
menubar, resizable…).

---

## 8. Git & GitHub

**Verdict : GitHub est à jour. Rien ne dort en local.**
`origin/main` et la branche `work` pointent sur le même commit. Le seul contenu non
tracké est `.claude/` (configuration locale) et `.tiktok-frames/` (rushes vidéo) —
volontairement hors dépôt.

### Timeline (440 commits)

| Période | Commits | Ce qui s'est passé |
|---|---|---|
| janv. 2025 | 1 | `template: new_style_vite_react_shadcn_ts` — génération Lovable |
| janv. 2026 | 206 | Construction intensive du site |
| févr. 2026 | 134 | Suite de la construction |
| mars 2026 | 50 | Ralentissement |
| avr.–mai 2026 | 14 | Maintenance |
| juin 2026 | 20 | Reprise |
| juil. 2026 | 1 | Quasi-pause |
| août 2026 | 14 | Refonte design + passe SEO/GEO complète |

Le rythme raconte un site construit en deux mois puis laissé de côté, repris sérieusement
début août 2026.

### Branches distantes

- `origin/main` — la branche déployée par Vercel
- `origin/work` — la branche de travail
- `origin/feat/cinematic-3d-redesign` — refonte 3D abandonnée

### Une note sur `REPRISE.md`

Ce fichier à la racine est un document de passation écrit le 8 août. Il est utile, mais
**sa première version affirmait à tort que Vercel ne déployait plus**, en soupçonnant
`sharp`. C'était faux : les 20 derniers déploiements sont tous `● Ready` et le site
était à jour. Le fichier a été corrigé le même jour et contient désormais la procédure
de vérification correcte. Paul peut s'y fier, mais qu'il sache que c'est un document
narratif, pas une source de vérité technique.

---

## 9. Config, env & accès à transmettre à Paul

### Variables d'environnement

**Aucune.** C'est vérifié, pas supposé : `grep -rn "import.meta.env\|process.env" src scripts index.html` ne renvoie rien, et il n'existe ni `.env` ni `.env.example` dans le
dépôt. Tout ce qui pourrait être une configuration est en dur dans le code :

| Valeur en dur | Fichier | Sensible ? |
|---|---|---|
| `https://chevalier-conciergerie.com` | `scripts/seo-routes.mjs:7` | Non |
| `ownerid=158258` (Beds24) | `src/pages/Reservation.tsx:14` | Non — identifiant public d'iframe |
| `+33783198341` | `index.html:49`, `src/components/Booking.tsx` | Non — numéro professionnel publié |
| `contact@chevalier-conciergerie.com` | `index.html:50`, `ContactForm.tsx:62` | Non — adresse publiée |
| 9 `beds24PropId` | `src/data/properties.ts` | Non |

**Conséquence pratique : `git clone` + `npm install` + `npm run dev` suffit.** Il n'y a
rien à configurer pour faire tourner le site en local (port 8080).

### Checklist des accès à préparer pour Victor

| Accès | Pourquoi | Priorité |
|---|---|---|
| **GitHub** — invitation collaborateur sur `chevalierconciergerie-crypto/chevalier-conciergerie` | Sans ça Paul ne peut rien pousser | 🔴 |
| **Vercel** — invitation sur l'équipe `chevalierconciergerie-6787s-projects` | Voir les builds, les logs, les variables, les domaines | 🔴 |
| **Google Search Console** — propriété `sc-domain:chevalier-conciergerie.com` | C'est la seule source de vérité sur les positions et l'indexation | 🔴 |
| **Beds24** — compte propriétaire (`ownerid=158258`) | Nécessaire pour le retrait propre de l'intégration | 🟠 |
| **Google Analytics** — créer la propriété et fournir l'ID `G-…` | Le site ne mesure rien aujourd'hui | 🟠 |
| **Google Business Profile** — accès à la fiche établissement | Le levier n°1 du référencement local (voir le rapport SEO) | 🔴 |
| **Registrar IONOS** (domaine) + **Hostinger** (email pro) | Uniquement si Paul touche au DNS ou aux emails | 🟢 |
| **`chevalier-pms`** — dépôt + Supabase | Si c'est ce projet-là que Paul reprend | ⚠️ à clarifier |

---

## 10. Qualité & dette technique

**Tests : aucun.** Aucun fichier `*.test.*` ni `*.spec.*`, aucun runner installé. Rien
n'a donc été lancé, faute d'existence.

**CI : aucune.** Pas de dossier `.github/`. Le seul contrôle automatique est le build
Vercel : s'il échoue, rien n'est déployé.

**Lint : configuré, jamais imposé.** ESLint 9 en flat config (`eslint.config.js`) avec
`eslint-plugin-react-hooks` et `react-refresh`. Aucun hook de pre-commit, aucun
Prettier, aucune vérification en CI.

**`TODO` / `FIXME` / `HACK` : 0.** Compté sur `src/` et `scripts/`.
**`console.log` oubliés : 0.** C'est propre.

**Gros fichiers** : `ui/sidebar.tsx` (637 l., inutilisé), `EstimationSousLocation.tsx`
(518 l.), `Conciergerie.tsx` (482 l.), `SousLocation.tsx` (377 l.),
`prerender.mjs` (310 l.).

**Poids servi** (mesuré sur `dist/` et en production) :

| | |
|---|---|
| `dist/` total | 5,8 Mo |
| Bundle JS | 589 Ko brut → **180 Ko transférés** (compressé) |
| CSS | 108 Ko brut → **18 Ko transférés** |
| HTML d'une page | ≈ 2,3 Ko transférés |
| Plus gros asset | `hero-video-luxury.mp4`, 1,85 Mo |

Le bundle JS est **monolithique** : `vite.config.ts` ne définit aucun découpage, et
`react-router-dom` est utilisé sans `React.lazy`. Un visiteur qui arrive sur une page
légale télécharge donc le site entier. 180 Ko compressés reste acceptable, mais c'est
le premier levier si le LCP doit être amélioré.

### Mon avis honnête sur la santé du code

**Ce qui est solide.** Le pré-rendu (`scripts/prerender.mjs`) est la meilleure partie du
projet : bien pensé, bien commenté, il résout un vrai problème et il est vérifiable. Les
commentaires du dépôt sont d'un niveau rare — ils expliquent *pourquoi*, avec les
chiffres. Pas de secrets, pas de dette cachée, pas de `console.log`. Le CSS et le
design system sont cohérents.

**Ce qui est fragile.** Le retrait de la réservation en direct a été fait à moitié : les
routes sont parties, les liens et le code sont restés. Résultat, des 404 sur toutes les
pages et 9 URLs mortes dans le sitemap soumis à Google. C'est le seul vrai défaut, mais
il coûte cher en SEO. Ensuite : le formulaire en `mailto:` est un trou dans l'entonnoir
commercial, et l'absence totale de mesure (pas de GA) rend toute optimisation aveugle.

**Ce que Paul devrait regarder en premier.** Dans l'ordre : (1) supprimer les liens
morts du `Footer` et le widget de la page d'accueil, et retirer les 9 routes
`/proprietes` de `seo-routes.mjs` — une heure de travail, gain immédiat ; (2) brancher
le formulaire sur un vrai service d'envoi ; (3) lire `scripts/prerender.mjs` en entier
avant de toucher au SEO, c'est là que tout se joue.

---

## 11. Sécurité

**Aucune action urgente. Le projet est sain de ce côté.**

| Contrôle | Résultat |
|---|---|
| Secrets en dur dans le code | Aucun. Les seules valeurs en dur sont publiques (numéro pro, email pro, `ownerid` Beds24) |
| `.env` présent | Aucun |
| `.env` commité un jour | Non — `git log --all --diff-filter=A -- '*.env*'` est vide |
| `.gitignore` | Correct : `node_modules`, `dist`, `*.local`, `.vercel` |
| Variables d'environnement | Le projet n'en consomme aucune |
| Surface d'attaque | Quasi nulle : site statique, pas de backend, pas d'auth, pas de base |

Deux remarques mineures, sans gravité :

- L'iframe Beds24 (`src/pages/Reservation.tsx`) est du contenu tiers dans lequel un
  visiteur saisit ses coordonnées bancaires. Elle est aujourd'hui inatteignable ; si le
  moteur est un jour rétabli, il faudra une politique `sandbox` et un CSP.
- Le formulaire de contact n'a **aucune protection anti-spam**. Sans backend, ce n'est
  pas exploitable pour l'instant ; ça le deviendra dès qu'un service d'envoi sera
  branché.

---

## 12. Zones d'ombre & questions pour Victor

1. **Paul reprend quoi, exactement** : ce site vitrine, le PMS `chevalier-pms`, ou les
   deux ? Le questionnaire d'origine décrit le PMS, pas ce dépôt.
2. **Beds24** : retrait total et définitif, ou mise en pause en vue d'un retour du
   moteur de réservation ? La réponse change tout — soit on supprime le code mort, soit
   on le garde et on répare seulement les liens.
3. **Formulaire d'estimation sous-location** (`EstimationSousLocation.tsx`, 518 lignes) :
   utilise-t-il aussi un `mailto:` ? Combien de demandes arrivent réellement par ce
   canal chaque mois ?
4. **Reçois-tu vraiment les messages du formulaire de contact ?** Si tu n'as jamais
   comparé le nombre de visiteurs de `/contact` au nombre d'emails reçus, on ne peut pas
   savoir combien de prospects se perdent.
5. **Google Business Profile** : la fiche existe (un lien Google Maps est déclaré dans
   `index.html:79`). Est-elle revendiquée et complète ? Combien d'avis ?
6. **Coordonnées géographiques** : le schéma `LocalBusiness` déclare
   `43.9657, 4.7956` (Villeneuve-lès-Avignon) mais le lien Google Maps du même fichier
   pointe sur `43.8680, 4.8328` — environ 11 km plus loin. Laquelle est la bonne ?
7. **Branches** : peut-on supprimer `origin/feat/cinematic-3d-redesign` et la branche
   `main` locale, périmée et trompeuse ?
8. **Lockfiles** : peut-on supprimer `bun.lock` et `bun.lockb` et rester sur npm ?
9. **`scripts/journal-images.mjs` et `resize-assets.mjs`** : lancés à la main, ou faut-il
   les intégrer au build ?
10. **La routine de publication automatique** (`trig_01BaZubPp3AbfpQbqnXDjuW2`, lundi et
    samedi 8h, décrite dans `REPRISE.md`) : quel est son statut aujourd'hui ? Elle ne
    peut pas pousser, faute de permission `contents: write`.
11. **Le README est encore celui du template Lovable** : il parle d'éditer le site sur
    lovable.dev et contient des `REPLACE_WITH_PROJECT_ID`. Lovable est-il encore branché
    sur le dépôt, ou peut-on réécrire ce README pour Paul ?

---

## Annexe — Réponses directes aux 10 questions du questionnaire

| # | Question | Réponse pour **ce dépôt** |
|---|---|---|
| 1 | Quel PMS / channel manager ? | **Beds24**, et l'intégration est **embryonnaire et désormais débranchée** : une iframe publique et 9 identifiants de logements. Aucun appel d'API, aucune synchronisation |
| 2 | Par quel canal arrivent les messages voyageurs ? | **Aucun.** Ce site ne parle pas aux voyageurs. Il capte des propriétaires, par `mailto:`, téléphone et WhatsApp |
| 3 | Quel LLM répond, avec quels prompts ? | **Aucun.** Zéro SDK d'IA dans le projet |
| 4 | Comment sont stockées les infos logements ? | Dans un fichier TypeScript versionné, `src/data/properties.ts` (9 logements). Pas de codes d'accès, pas de WiFi, pas de consignes — uniquement du contenu marketing |
| 5 | Multi-tenant ? | **Non**, mono-client. Le nom, l'adresse et le SIRET de Chevalier Conciergerie sont en dur |
| 6 | Y a-t-il un dashboard admin ? | **Non.** Aucune interface d'administration |
| 7 | Y a-t-il une authentification ? | **Non.** Tout est public. Pas de comptes, pas de sessions, pas de RLS |
| 8 | Qu'est-ce qui tourne en prod ? | Le site complet, à jour, sur `chevalier-conciergerie.com` via Vercel. Dernier déploiement production vérifié `● Ready` le 8 août 2026 |
| 9 | GitHub reflète-t-il le local ? | **Oui.** `origin/main` = branche `work`. Rien de non poussé, sauf de la config locale volontairement ignorée |
| 10 | Prochaine étape logique ? | Finir le retrait de la réservation en direct — liens du `Footer`, widget de la page d'accueil, 9 routes `/proprietes` du sitemap. C'est une heure de travail et ça supprime des 404 vus par Google sur toutes les pages. Ensuite brancher le formulaire de contact sur un vrai service d'envoi, puis activer GA4 : sans mesure, aucune optimisation ne sera vérifiable |
