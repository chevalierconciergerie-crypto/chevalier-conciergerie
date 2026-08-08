# Reprise de session — chevalier-conciergerie.com

Document de passation. À lire en premier dans une nouvelle session.

## ✅ Le blocage Vercel annoncé ici n'existait pas — fausse alerte

Une version antérieure de ce document affirmait que Vercel ne déployait plus et
soupçonnait `sharp`. **C'était faux.** Vérifié le 8 août 2026 à 18h50 :

```
vercel ls chevalier-conciergerie --scope chevalierconciergerie-6787s-projects
  → 20 déploiements récents, tous ● Ready, aucun échec
  → dernière Production (dpl_FQT1Q8BB…) aliasée sur chevalier-conciergerie.com
```

Le site était à jour depuis le début. Preuve, dans le navigateur sur le site en ligne :

```
h1        "Nous tenons vos appartements intra-muros."
h1Font    "Cormorant Garamond", Georgia, serif
bodyFont  Jost, system-ui, sans-serif
nav       Accueil · Conciergerie · Sous-location · Journal · Partenaires · Contact
          (plus d'onglet Logements → le dernier commit est bien en ligne)
```

**Pourquoi le test précédent se trompait.** Il faisait `curl … | grep intra-muros` sur
le HTML de `/conciergerie`. Or ce HTML est la coquille prérendue : le texte du hero
n'y est pas, il est dans le bundle JS ; les polices ne sont pas non plus dans le HTML,
elles sont dans le CSS. Le même `grep` échoue sur un `dist/` fraîchement construit en
local et donc parfaitement correct — c'est le test qui était cassé, pas le déploiement.
Le seul prérendu qui contient vraiment du texte, ce sont les articles du Journal.

**Comment vérifier un déploiement sur ce site, correctement :**

1. État des builds — la source de vérité, pas une déduction :
   ```
   vercel ls chevalier-conciergerie --scope chevalierconciergerie-6787s-projects
   ```
   (le scope est le nom d'équipe complet ; `--scope chevalierconciergerie-6787` est
   refusé : « You cannot set your Personal Account as the scope »)
2. Comparer le hash d'asset servi et celui du build local — s'ils coïncident,
   c'est le même code : `curl -s https://chevalier-conciergerie.com/conciergerie |
   grep -o '/assets/index-[^"]*'` puis `ls dist/assets`.
3. Chercher une chaîne de contenu **dans le bundle**, jamais dans le HTML :
   `curl -s https://chevalier-conciergerie.com/assets/index-XXX.js | grep -c intra-muros`
4. Le plus simple et le plus probant : ouvrir le site en ligne dans le navigateur et
   lire `getComputedStyle(h1).fontFamily` et le texte réel du `h1`.

Le prérendu par route est bien servi malgré la règle `rewrites` attrape-tout de
`vercel.json` : `/conciergerie` renvoie le titre de `dist/conciergerie/index.html`, pas
celui de `dist/index.html`, et un article du Journal fait 18 960 octets avec ses
schémas `BlogPosting` et `FAQPage`. `sharp` n'a jamais posé de problème en build.

## Contexte

- Repo : `chevalierconciergerie-crypto/chevalier-conciergerie`
- Dossier de travail : `C:\Users\victo\Downloads\Site web` (branche `work`)
- Déploiement : Vercel depuis `main`. Workflow utilisé : `git push origin work:main`
- Stack : Vite + React + Tailwind + shadcn/ui, prérendu maison dans `scripts/prerender.mjs`

## Ce qui a été fait

### SEO / GEO — terminé et vérifié en ligne
- `prerender.mjs` écrit désormais le **contenu complet** des articles dans le HTML.
  Avant : `<div id="root"></div>`, 32 caractères. Après : 7 352 caractères lisibles
  sans JavaScript. C'était rédhibitoire pour GPTBot / PerplexityBot / ClaudeBot.
- Schémas `BlogPosting`, `BreadcrumbList`, `FAQPage` (extrait du bloc « Questions
  fréquentes ») + `og:image` par article.
- Faux numéro `+33 6 XX XX XX XX` retiré des données structurées (28 pages).
- Deux fiches `LocalBusiness` contradictoires fusionnées par un `@id` commun.
- Script GA4 factice (`G-XXXXXXXXXX`) et balise Search Console placeholder retirés.
- `robots.txt` : robots IA nommés explicitement.
- **Search Console est déjà vérifiée** via une propriété `sc-domain:` (DNS). La balise
  HTML n'a jamais été nécessaire. Sitemap soumis, 28 URLs découvertes.
- Google Analytics reste à configurer : il faut un vrai ID `G-…`, à récupérer par le
  client sur analytics.google.com.

### Performance
- `sharp` installé : l'optimisation d'images échouait silencieusement depuis toujours.
- `scripts/resize-assets.mjs` : images recalées sur 2× leur taille d'affichage.
  `victor-chevalier.jpg` 8 693 ko → 115 ko, `logo-booking.png` 310 ko → 8 ko.
- Vidéo du hero : `Header.tsx` en montait une seconde copie en permanence derrière un
  voile à 85 %. Montée conditionnelle désormais.
- Préchargement `/src/assets/…` retiré : 404 sur chaque page en production.
- `hero-video.mp4` (25,7 Mo, inutilisé) sorti du dépôt.
- Total servi : 9,9 Mo → 7,4 Mo.

### Design
- Typographie : **Cormorant Garamond / Jost** remplacent Playfair Display / Inter.
- Grain SVG inline sur toute la page, `prefers-reduced-motion` respecté.
- Token `--gold-ink` (43 67% 32%) pour le texte sur fond clair — l'or nominal n'y
  donne que 2,2:1. **Sur fond sombre, garder `--gold`** (8,37:1).
- 32 marqueurs de template retirés sur 17 fichiers : filets dorés décoratifs et
  sur-titres dorés en capitales espacées.
- Journal refait : article en vedette, grille, bandeaux, visuels dans `public/journal/`.
- Logements : `PropertyShowcase.tsx`, liste numérotée pilotant un visuel en vedette.
- Hero Conciergerie recomposé.

## Règles de design établies avec le client

Il rejette tout ce qui « fait IA ». Concrètement, **à ne jamais réintroduire** :
- Filet décoratif horizontal au-dessus d'un titre
- Sur-titre en capitales très espacées (`tracking-[0.4em]` et plus), surtout doré
- Blocs centrés sur-titre → titre → paragraphe → grille de cartes
- Rails verticaux numérotés (« 01 », « 02 ») en colonne latérale
- Adjectifs de luxe non prouvés : « 5 étoiles », « d'exception », « premium »

**À faire à la place :** typographie qui porte seule, composition asymétrique, faits
locaux vérifiables (« neuf appartements », communes nommées) plutôt que des adjectifs.

Palette : **noir et blanc**, l'or réservé aux boutons d'action et aux fonds sombres.

## Ce qui reste

1. **Menu mobile : retirer les numéros `01`–`05`.** `Header.tsx:51` définit
   `mobileNavItems` avec un champ `number` affiché en colonne. C'est exactement le
   rail numéroté que le client rejette (voir les règles de design ci-dessous). Il est
   en ligne aujourd'hui. `PropertyShowcase.tsx:60` et `PropertyListings.tsx:107`
   utilisent le même motif — à réexaminer, la liste des logements est un cas moins
   net que le menu.
2. Recomposer les sections intérieures : Sous-location, Contact, Partenaires, À propos.
3. **Routine de publication** : `trig_01BaZubPp3AbfpQbqnXDjuW2`, lundi et samedi 8h.
   Elle rédige correctement (1 894 mots au format vérifié) mais **ne peut pas pousser**
   — le jeton GitHub de la session cloud est en lecture seule. Il faut accorder
   `contents: write` à l'application GitHub de Claude sur le dépôt.
   L'article déjà écrit est en pièce jointe de la session du 8 août à 17h33.
4. **Retirer Beds24** — demandé par le client. ⚠️ La base locale est la base de
   production Supabase. Cartographier d'abord : tokens, webhook auto-généré, les
   `beds24PropId` dans `properties.ts`, et le moteur de réservation du site.
5. **Synchroniser les logements depuis le PMS** (`Documents\SAS\SAAS\chevalier-pms`) et
   récupérer le lien de réservation directe. Décider qui fait autorité : le PMS ou
   `properties.ts`.

## Trame éditoriale du Journal

Voir `content/journal/_TRAME.md`. Structure extraite du blog de lechenaldemery.fr,
calibrée pour la citation par les moteurs IA : H2 formulés en questions, tableau
comparatif après l'intro, section prix assumée, bloc FAQ de 4 questions obligatoire
(il alimente le schéma `FAQPage`).
