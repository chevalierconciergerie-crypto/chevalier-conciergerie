# Reprise de session — chevalier-conciergerie.com

Document de passation. À lire en premier dans une nouvelle session.

## ⚠️ Problème bloquant à traiter en priorité

**Le site en ligne ne reflète plus les commits.** Vérifié le 8 août 2026 :

```
git push origin work:main  →  61d0595..656582a  (succès)
curl https://chevalier-conciergerie.com/conciergerie
  → "intra-muros" absent  → ancienne version servie
  → polices encore Playfair/Inter
```

Les commits sont bien sur `main`. Vercel ne déploie pas, ou son build échoue.

**À vérifier dans cet ordre :**
1. Le tableau de bord Vercel : y a-t-il des builds en échec ?
2. `sharp` a été ajouté en devDependency (nécessaire à `vite-plugin-image-optimizer`).
   Il compile des binaires natifs — c'est le suspect le plus probable d'un échec de
   build côté Vercel alors que tout passe en local.
3. Le build local passe : `npm run build` → `[prerender] 27 pages générées`.

Tant que ce point n'est pas réglé, **tout le travail ci-dessous est invisible pour le
client**. C'est la première chose à faire.

## Contexte

- Repo : `chevalierconciergerie-crypto/chevalier-conciergerie`
- Dossier de travail : `C:\Users\victo\Downloads\Site web` (branche `work`)
- Déploiement : Vercel depuis `main`. Workflow utilisé : `git push origin work:main`
- Stack : Vite + React + Tailwind + shadcn/ui, prérendu maison dans `scripts/prerender.mjs`

## Ce qui a été fait

### SEO / GEO — terminé et vérifié en ligne (avant la panne de déploiement)
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

1. **Débloquer Vercel** (voir en haut) — priorité absolue.
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
