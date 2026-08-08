# Trame éditoriale du Journal

Spécification suivie par la routine de publication. Ce fichier commence par `_` :
il est ignoré par le chargeur d'articles et n'est jamais publié.

Structure reprise du blog de Le Chenal de Méry, analysée section par section. Elle
n'est pas décorative : les H2 formulés en questions et le bloc FAQ final sont ce que
les moteurs IA (ChatGPT, Perplexity, Google AI Overviews) extraient et citent le plus
volontiers. On garde le squelette, on change le métier.

---

## Frontmatter obligatoire

```yaml
---
title: "Sujet : bénéfice concret à Avignon"
description: "1 à 2 phrases, 150-160 caractères, avec le mot-clé principal."
date: AAAA-MM-JJ
category: Conciergerie | Sous-location | Rentabilité | Réglementation | Avignon
author: Victor Chevalier
keywords: [mot-clé principal, variante, variante longue traîne]
---
```

Ajouter `draft: true` pour qu'un article ne soit pas publié.

---

## Le squelette, dans l'ordre

### 1. Titre H1 (le `title` du frontmatter)

Format : **`[Sujet] : [bénéfice concret ou précision chiffrée] [+ localisation]`**

Le deux-points est la signature du format. La seconde moitié doit lever une objection
ou donner une précision utile, pas répéter la première.

- ✅ « Conciergerie Airbnb à Avignon : ce que couvre vraiment une commission »
- ❌ « Tout savoir sur la conciergerie » — vague, non localisé, non cité

### 2. Introduction — environ 90 mots

Trois mouvements, sans titre :

1. **L'accroche** : le problème concret du lecteur, formulé en une phrase.
2. **La réponse** : ce dont parle l'article, nommé sans détour.
3. **La promesse de couverture** : ce que l'article va donner (« ce que ça coûte,
   ce que ça change, et pour qui c'est fait »).

### 3. Tableau comparatif — juste après l'intro

3 à 4 colonnes, 3 à 5 lignes. Placé haut, avant le premier H2.

C'est le bloc le plus repris par les moteurs IA : données structurées, comparables,
extractibles telles quelles.

### 4. Les sections H2 — 7 à 8, dans cet ordre

Pas de H3. Le rythme vient des listes à puces, pas de l'imbrication.

| # | Rôle | Formulation type |
|---|---|---|
| 1 | Définition | « Qu'est-ce qu'une [X] ? » |
| 2 | Détail concret, attentes | « Ce que ça couvre exactement » |
| 3 | Positionnement comparatif | « [X] ou [Y] : que choisir ? » |
| 4 | **Prix, sans détour** | « Combien coûte [X] ? » |
| 5 | Options, services en plus | « Ajouter [Y] à votre [X] » |
| 6 | Segmentation du lectorat | « Pour qui est faite [X] ? » |
| 7 | Passage à l'action | « Prendre rendez-vous à Avignon » |
| 8 | Élargissement | « Pour aller plus loin » |

La section 4 n'est jamais esquivée. Transparence chiffrée ou fourchette honnête —
l'évitement se voit et coûte la citation.

### 5. FAQ — « Questions fréquentes »

**4 paires question/réponse.** Question en gras ou en H3, réponse en 2 à 4 phrases.

Bloc obligatoire : il alimente le schéma `FAQPage` généré automatiquement au build,
et c'est la portion la plus fréquemment citée par les assistants IA.

Les questions doivent être écrites comme un client les poserait à voix haute, pas
comme un rédacteur SEO les taperait.

### 6. Clôture

Trois éléments :

1. Un sous-titre mobilisateur et court (leur équivalent : « À vous d'embarquer »)
2. Deux liens : un vers [Nous contacter](/contact), un vers [Retour au Journal](/journal)
3. Une accroche finale d'une ligne, avec un chiffre si possible

---

## Règles transverses

**Longueur** : 1 500 à 1 900 mots. En dessous de 1 200, l'article ne se positionne pas.

**Liens internes** : 8 à 10 dans le corps, en ancres contextuelles. Cibles prioritaires :
`/conciergerie`, `/sous-location`, `/estimation-sous-location`, `/contact`,
`/conciergerie-avignon`, `/conciergerie-villeneuve-les-avignon`, `/conciergerie-les-angles`,
et les autres articles du Journal.

**Ton** : vouvoiement, expert local qui démystifie. Phrases courtes alternées avec du
détail explicatif. Vendeur sans être insistant. Des chiffres précis plutôt que des
adjectifs.

**Interdits** :
- Promettre un rendement ou un taux d'occupation chiffré comme une garantie
- Énoncer une règle fiscale ou d'urbanisme précise sans la présenter comme variable
  et à vérifier en mairie
- Compter la taxe de séjour comme un revenu — c'est un montant collecté puis reversé,
  jamais un produit
- Les emoji en guise d'icônes
- Réécrire un avis client ou une capture de plateforme

**Mention de prudence** : tout article touchant à la fiscalité, à l'urbanisme ou au
rendement se termine par une note en italique rappelant que les règles varient et
évoluent.
