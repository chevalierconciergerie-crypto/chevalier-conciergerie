/*
  Dictionnaire anglais. La clé est le texte français tel qu'il apparaît dans
  le code : une chaîne absente ressort en français plutôt que de laisser un
  trou dans la page.

  Le nom CHEVALIER CONCIERGERIE ne se traduit pas, ni les noms de lieux, de
  plateformes et de personnes. « Conciergerie » n'a pas d'équivalent exact en
  anglais : on emploie « property management » pour le service et on garde le
  nom de la marque tel quel.

  Traduction en anglais britannique : le public visé est d'abord constitué de
  propriétaires britanniques, néerlandais et belges d'une résidence en Provence.
*/
export const EN: Record<string, string> = {
  /* ---------- Barre du haut, menu, pied de page ---------- */
  "Accueil": "Home",
  "Qui sommes-nous": "About us",
  "Conciergerie": "Property management",
  "Sous-location": "Guaranteed rent",
  "Devenir franchisé": "Become a franchisee",
  "Blog": "Journal",
  "Témoignages": "Reviews",
  "Contact": "Contact",
  "Estimation gratuite": "Free estimate",
  "Estimation": "Estimate",
  "Menu": "Menu",
  "Ouvrir le menu": "Open menu",
  "Fermer le menu": "Close menu",
  "Rubriques": "Sections",
  "Chevalier Conciergerie, accueil": "Chevalier Conciergerie, home",

  "Nos services": "Our services",
  "Nos villes": "Our areas",
  "Informations légales": "Legal",
  "Mentions légales": "Legal notice",
  "Politique de confidentialité": "Privacy policy",
  "Gestion des cookies": "Cookie settings",
  "À propos": "About",
  "Nos partenaires": "Our partners",
  "Tarifs": "Pricing",
  "Journal": "Journal",
  "Conciergerie à Avignon": "Property management in Avignon",
  "Conciergerie et sous-location de meublés de tourisme à Avignon, Villeneuve-lès-Avignon et Les Angles.":
    "Holiday-let property management and guaranteed-rent letting in Avignon, Villeneuve-lès-Avignon and Les Angles.",
  "Tous droits réservés.": "All rights reserved.",

  /* ---------- Bandeau cookies ---------- */
  "Ce site utilise des": "This site uses",
  "cookies": "cookies",
  "REFUSER": "DECLINE",
  "ACCEPTER": "ACCEPT",
  "Refuser": "Decline",
  "Accepter": "Accept",

  /* ---------- Accueil : couverture et fondateur ---------- */
  "Votre conciergerie à Avignon": "Your property manager in Avignon",
  "Le fondateur": "The founder",
  "Aller plus loin": "Going further",
  "Deux formules": "Two arrangements",
  "Ils nous font confiance": "What owners say",
  "En savoir plus": "Find out more",
  "Prendre rendez-vous": "Book a call",
  "Réserver un appel": "Book a call",

  /* ---------- Accueil : les six blocs de l'offre ---------- */
  "Le calendrier": "The calendar",
  "Votre calendrier rempli,": "Your calendar filled,",
  "vos nuits vacantes comblées.": "your empty nights taken.",
  "Notre travail, c'est de combler vos nuits vacantes. Airbnb, Booking et la réservation directe sont synchronisés dans les deux sens dans Chevalier PMS, notre propre logiciel.":
    "Our job is to fill the nights your property would otherwise sit empty. Airbnb, Booking and direct bookings sync both ways inside Chevalier PMS, the software we built ourselves.",
  "Airbnb, Booking et réservation directe synchronisés en temps réel":
    "Airbnb, Booking and direct bookings synced in real time",
  "Les doubles réservations deviennent impossibles": "Double bookings become impossible",
  "Chaque canal travaille à remplir votre planning": "Every channel works to fill your calendar",

  "La réservation directe": "Direct bookings",
  "Votre propre site,": "Your own booking site,",
  "0 % de commission.": "0 % commission.",
  "Chaque logement dispose aussi de son propre site de réservation en direct, sans intermédiaire, synchronisé avec Airbnb et Booking.":
    "Every property also gets its own direct booking site, with no middleman, synced with Airbnb and Booking.",
  "Aucun intermédiaire, aucune commission prélevée": "No middleman, no commission taken",
  "Caution et paiement en ligne sécurisés": "Secure online payment and deposit",
  "Synchronisé avec Airbnb et Booking, zéro double réservation":
    "Synced with Airbnb and Booking, zero double bookings",

  "La tarification": "Pricing strategy",
  "Vos prix ajustés,": "Your rates adjusted,",
  "par de vraies personnes.": "by real people.",
  "Prix, promotions et durées minimales revus chaque semaine":
    "Rates, promotions and minimum stays reviewed every week",
  "Aucun algorithme automatique à la place d'une vraie équipe":
    "No automated algorithm standing in for a real team",

  "Le ménage": "Housekeeping",
  "Le ménage géré,": "Housekeeping handled,",
  "sans que vous y pensiez.": "without you thinking about it.",
  "Chaque réservation déclenche son ménage, sa blanchisserie et le réassort des consommables : l'équipe est prévenue sur WhatsApp au bon moment.":
    "Every booking triggers its own clean, laundry and restocking: the team is notified on WhatsApp at the right moment.",
  "Ménage, blanchisserie et consommables à chaque réservation":
    "Cleaning, laundry and supplies with every booking",
  "L'équipe prévenue sur WhatsApp au bon moment": "The team notified on WhatsApp at the right moment",
  "Une vidéo prise à chaque passage, pour un suivi optimal":
    "A video filmed at every visit, so nothing goes unchecked",

  "Les voyageurs": "Guests",
  "Vos voyageurs,": "Your guests,",
  "jour et nuit.": "day and night.",
  "121 conversations suivies dans une seule boîte, Airbnb, Booking et WhatsApp réunis — une réponse à toute heure.":
    "121 conversations in a single inbox — Airbnb, Booking and WhatsApp together, answered at any hour.",
  "121 conversations suivies dans une seule boîte": "121 conversations in a single inbox",
  "Airbnb, Booking et WhatsApp réunis": "Airbnb, Booking and WhatsApp in one place",
  "Réponse aux voyageurs 7 jours sur 7, 24 heures sur 24": "Guests answered 24 hours a day, 7 days a week",

  "Le tableau de bord": "The owner dashboard",
  "Vos revenus,": "Your income,",
  "chaque mois, en clair.": "every month, in plain sight.",
  "Chaque propriétaire reçoit un rapport mensuel détaillé de son logement, et garde un accès direct à Chevalier PMS pour tout suivre lui-même, à tout moment.":
    "Every owner receives a detailed monthly report on their property, and keeps direct access to Chevalier PMS to follow everything themselves, whenever they want.",
  "Rapport mensuel détaillé, logement par logement": "Detailed monthly report, property by property",
  "Canaux, occupation et chiffre d'affaires au même endroit":
    "Channels, occupancy and revenue in one place",
  "Accès direct à Chevalier PMS, à tout moment": "Direct access to Chevalier PMS, at any time",

  /* ---------- Accueil : les démonstrations animées ---------- */
  "Septembre": "September",
  "nuits réservées": "nights booked",
  "Direct": "Direct",
  "Trois canaux, un seul calendrier — aucune double réservation possible.":
    "Three channels, one calendar — a double booking simply cannot happen.",

  "Exemple": "Example",
  "Via la plateforme": "Through the platform",
  "En direct, sur votre site": "Direct, on your own site",
  "620 € encaissés — 93 € de commission": "€620 taken — €93 commission",
  "620 € encaissés — aucune commission": "€620 taken — no commission",
  "93 € de plus sur ce seul séjour, paiement et caution sécurisés.":
    "€93 more on this one stay, with payment and deposit secured.",

  "Semaine du 6 juillet": "Week of 6 July",
  "Festival d'Avignon": "Avignon Festival",
  "Révisé chaque semaine par une équipe, durée minimale portée à 3 nuits.":
    "Reviewed every week by a team, minimum stay raised to 3 nights.",

  "Ménage terminé": "Clean completed",
  "Vidéo du passage": "Video of the visit",
  "Tout est en ordre. Linge changé, consommables réassortis, rien à signaler sur le logement.":
    "All in order. Linen changed, supplies restocked, nothing to report on the property.",
  "Déposé dans Chevalier PMS — le propriétaire peut le consulter quand il veut.":
    "Filed in Chevalier PMS — the owner can look at it whenever they like.",

  "Rapport d'août": "August report",
  "Chiffre d'affaires": "Revenue",
  "Taux d'occupation": "Occupancy rate",
  "Envoyé chaque mois, et consultable à tout moment dans Chevalier PMS.":
    "Sent every month, and available at any time in Chevalier PMS.",

  /* ---------- Accueil : sous-location ---------- */
  "Notre service": "The service",
  "de sous-location": "with guaranteed rent",
  "L'autre formule": "The other arrangement",
  "Vous ne gérez plus rien,": "You manage nothing,",
  "vous encaissez un loyer fixe.": "you collect a fixed rent.",
  "Nous devenons votre locataire principal : nous louons votre bien à l'année pour y accueillir des voyageurs de passage. Vous touchez votre loyer, nous gérons l'exploitation et portons le risque.":
    "We become your head tenant: we rent your property year-round and host short-stay guests in it. You receive your rent, we run the operation and carry the risk.",
  "Loyer garanti": "Guaranteed rent",
  "Un revenu fixe chaque mois, versé dès le premier jour du contrat, quelle que soit l'occupation.":
    "A fixed income every month, paid from the first day of the contract, whatever the occupancy.",
  "Zéro risque": "Zero risk",
  "Nous assumons les risques locatifs : impayés, vacance, dégradations.":
    "We carry the letting risks: unpaid rent, empty periods, damage.",
  "Zéro gestion": "Zero admin",
  "Ménage, maintenance, accueil des voyageurs : tout est pris en charge, de A à Z.":
    "Cleaning, maintenance, welcoming guests: all of it handled, start to finish.",
  "Valorisation": "Upkeep",
  "Votre bien est entretenu aux standards hôteliers, ce qui préserve sa valeur.":
    "Your property is kept to hotel standards, which protects its value.",

  "Nous évaluons votre bien et vous proposons un loyer garanti mensuel.":
    "We assess your property and offer you a guaranteed monthly rent.",
  "Signature du bail": "Signing the lease",
  "Un contrat de sous-location professionnel, conforme à la législation.":
    "A professional sub-letting contract, fully compliant with French law.",
  "Mise en location": "Going live",
  "Nous préparons et photographions le logement, puis créons les annonces.":
    "We prepare and photograph the property, then create the listings.",
  "Revenus garantis": "Guaranteed income",
  "Votre loyer vous est versé chaque mois par virement, sans exception.":
    "Your rent is transferred to you every month, without exception.",

  /* ---------- FAQ ---------- */
  "Les questions": "The questions",
  "qu'on nous pose.": "we get asked.",

  /* ---------- Franchise ---------- */
  "Devenir": "Become a",
  "franchisé.": "franchisee.",
  "Le réseau Chevalier": "The Chevalier network",
  "Le réseau": "The network",
  "Vous connaissez votre ville.": "You know your town.",
  "Nous connaissons le métier.": "We know the trade.",
  "Ce qui est compris": "What's included",
  "Tout ce qu'il faut": "Everything you need",
  "pour ouvrir, et pour tenir.": "to open, and to keep going.",
  "À qui ça s'adresse": "Who it's for",
  "Trois façons d'arriver,": "Three ways in,",
  "un seul métier à la sortie.": "one trade at the end.",
  "Le parcours": "The path",
  "Du premier appel": "From the first call",
  "à votre première remise de clés.": "to your first set of keys handed over.",

  /* ---------- Couverture, fondateur, blog, avis, contact ---------- */
  "à": "in",
  "Vue au drone du Pont d'Avignon et du Palais des Papes":
    "Drone view of the Pont d'Avignon and the Palais des Papes",
  "Descendre vers la présentation": "Scroll down to the introduction",
  "fondateur de Chevalier Conciergerie": "founder of Chevalier Conciergerie",
  "Ils nous ont": "They trusted us",
  "confié leur bien": "with their property",
  "Publié sur Google": "Posted on Google",
  "étoiles sur 5": "stars out of 5",
  "Parlons de": "Let's talk about",
  "votre logement": "your property",
  "Téléphone": "Phone",
  "Courriel": "Email",
  "Cookies": "Cookies",
  "Estimation gratuite et sans engagement : nous évaluons votre bien et vous disons ce qu'il peut rapporter, en conciergerie comme en sous-location.":
    "A free, no-obligation estimate: we assess your property and tell you what it can earn, under management or on a guaranteed rent.",
  "Tous droits réservés — Taxe de séjour collectée pour le compte de la collectivité et reversée intégralement.":
    "All rights reserved — Tourist tax collected on behalf of the local authority and passed on in full.",

  /* ---------- Conciergerie : mise en ligne ---------- */
  "de conciergerie": "we provide",
  "La mise en ligne": "Going live",
  "Votre annonce créée,": "Your listing written,",
  "publiée partout.": "published everywhere.",
  "Tout commence par l'annonce : rédaction, mise en valeur du logement, réglage des règles de séjour et des tarifs, puis mise en ligne simultanée sur les plateformes.":
    "It all starts with the listing: the copy, showing the property at its best, setting the house rules and the rates, then publishing on every platform at once.",
  "Diffusé et synchronisé sur": "Published and synced on",

  /* ---------- Démonstrations ---------- */
  "Le Central · 4 nuits": "Le Central · 4 nights",
  "L'Intramuros · jeudi 11 h 30": "L'Intramuros · Thursday 11.30",

  /* ---------- Franchise, textes longs ---------- */
  "Monter une conciergerie seul, c'est deux ans à apprendre par l'erreur : les propriétaires qu'on ne trouve pas, les prix qu'on fixe au hasard, les ménages qui s'enchaînent mal, le logiciel qu'on n'a pas. Nous avons fait ces deux ans. Le réseau existe pour que vous ne les refassiez pas.":
    "Setting up a property management business on your own means two years of learning the hard way: the owners you never find, the rates you set by guesswork, the cleans that fall out of sequence, the software you don't have. We have done those two years. The network exists so that you don't have to do them again.",
  "Chevalier Conciergerie gère des logements à Avignon, Villeneuve-lès-Avignon et Les Angles, avec une note de 5,0 sur 5 sur Google. Ce n'est pas une méthode écrite pour être vendue : c'est celle que nous utilisons tous les jours, transmise telle quelle.":
    "Chevalier Conciergerie manages properties in Avignon, Villeneuve-lès-Avignon and Les Angles, rated 5.0 out of 5 on Google. This is not a method written to be sold: it is the one we use every day, handed over exactly as it is.",
  "Ce qui compte n'est pas le diplôme ni l'apport : c'est d'habiter la ville que vous voulez couvrir, et de décrocher quand un voyageur appelle à vingt-trois heures.":
    "What matters is not your qualifications or your capital: it is living in the town you want to cover, and picking up the phone when a guest calls at eleven at night.",
  "Le reste — le droit d'entrée, la redevance, le contrat — se dit de vive voix, une fois que nous savons de quelle ville vous parlez.":
    "The rest — the entry fee, the royalty, the contract — is discussed in person, once we know which town you are talking about.",

  /* ---------- FAQ conciergerie ---------- */
  "Quelle est votre commission ?": "What is your commission?",
  "La taxe de séjour est-elle comprise dans vos honoraires ?": "Is the tourist tax included in your fee?",
  "Non. La taxe de séjour est collectée auprès des voyageurs pour le compte de la collectivité et reversée intégralement : elle n'est ni un revenu pour vous, ni une charge. Elle n'entre donc pas dans l'assiette de notre commission.":
    "No. The tourist tax is collected from guests on behalf of the local authority and passed on in full: it is neither income nor a cost to you. It therefore sits outside the base on which our commission is calculated.",
  "Que comprend exactement la prestation de conciergerie ?": "What exactly does the management service cover?",
  "Dans quelles zones intervenez-vous ?": "Which areas do you cover?",
  "Comment et quand suis-je payé ?": "How and when do I get paid?",
  "Dois-je m'engager sur une longue durée ?": "Am I tied in for a long period?",
  "Faut-il une autorisation pour louer en courte durée à Avignon ?":
    "Do I need authorisation to let short-term in Avignon?",
  "Combien de jours puis-je louer ma résidence principale à Avignon ?":
    "How many days can I let my main home in Avignon?",
  "Villeneuve-lès-Avignon et Les Angles suivent-elles les mêmes règles ?":
    "Do Villeneuve-lès-Avignon and Les Angles follow the same rules?",

  /* ---------- FAQ sous-location ---------- */
  "Quel est le concept ?": "How does it work?",
  "Est-ce autorisé ?": "Is it legal?",
  "Qui assure la gestion ?": "Who handles the day-to-day?",
  "Le logement doit-il être meublé ?": "Does the property have to be furnished?",
  "Qui s'occupe des démarches obligatoires à Avignon ?": "Who handles the mandatory paperwork in Avignon?",
  "Le plafond de 90 jours par an s'applique-t-il à mon bien ?": "Does the 90-day annual cap apply to my property?",
  "Puis-je confier un bien dont je suis moi-même locataire ?": "Can I hand over a property I rent myself?",
  "Conciergerie ou sous-location : laquelle choisir ?": "Management or guaranteed rent: which should I choose?",

  /* ---------- FAQ franchise ---------- */
  "Faut-il de l'expérience en conciergerie ?": "Do I need experience in property management?",
  "Combien coûte l'entrée dans le réseau ?": "What does joining the network cost?",
  "Comment est définie ma zone ?": "How is my territory defined?",
  "Combien de temps avant mon premier mandat ?": "How long before my first property?",
  "Peut-on démarrer en gardant son emploi ?": "Can I start while keeping my job?",
  "Le logiciel est-il vraiment compris ?": "Is the software really included?",
  "Quel statut juridique faut-il créer ?": "What legal structure do I need to set up?",
  "Qui recrute et paie l'équipe de ménage ?": "Who recruits and pays the cleaning team?",
  "Que se passe-t-il si je veux arrêter ?": "What happens if I want to stop?",
  "Combien de franchisés comptez-vous ouvrir ?": "How many franchisees do you plan to take on?",
  "Pourquoi ouvrir un réseau plutôt que de grandir seul ?": "Why open a network rather than grow on your own?",

  /* ---------- Franchise : ce qui est compris ---------- */
  "La marque et le territoire": "The brand and the territory",
  "Plus de quarante heures de formation": "More than forty hours of training",
  "Le logiciel, pas une licence": "The software, not a licence",
  "Votre site et votre référencement": "Your website and your search ranking",
  "Le kit marketing complet": "The full marketing kit",
  "Un accompagnement qui ne s'arrête pas": "Support that does not stop",

  /* ---------- Franchise : profils ---------- */
  "Vous partez de zéro": "You are starting from nothing",
  "Vous gérez déjà quelques biens": "You already manage a few properties",
  "Vous êtes déjà dans l'immobilier": "You are already in property",

  /* ---------- Franchise : le parcours ---------- */
  "Le premier appel": "The first call",
  "45 minutes": "45 minutes",
  "Le dossier complet": "The full pack",
  "Sous 48 heures": "Within 48 hours",
  "Vingt jours pour réfléchir": "Twenty days to think it over",
  "20 jours minimum": "20 days minimum",
  "La signature": "Signing",
  "Une demi-journée": "Half a day",
  "La formation": "The training",
  "Plus de 40 heures": "More than 40 hours",
  "L'ouverture": "Opening",
  "Et après": "And beyond",

  /* ---------- Réponses longues : conciergerie ---------- */
  "25 % HT, prélevés uniquement sur ce que vous touchez vraiment. Les commissions des plateformes, le ménage et la taxe de séjour sont déduits d'abord : notre commission ne s'applique qu'au net qui reste, jamais au chiffre d'affaires brut. Le ménage est payé par le voyageur, pas par vous. Aucun frais caché.":
    "25 % excluding VAT, taken only on what actually reaches you. Platform commissions, cleaning and tourist tax are deducted first: our fee applies only to the net that remains, never to gross revenue. Cleaning is paid by the guest, not by you. No hidden charges.",
  "Création et optimisation de vos annonces, gestion des réservations et des voyageurs, accueil, ménage professionnel, linge hôtelier, réassort des consommables, maintenance courante et suivi des encaissements. Vous recevez un rapport mensuel et gardez un accès direct à notre logiciel.":
    "Writing and optimising your listings, handling bookings and guests, welcoming them, professional cleaning, hotel linen, restocking supplies, routine maintenance and tracking payments. You receive a monthly report and keep direct access to our software.",
  "Principalement à Avignon, Villeneuve-lès-Avignon, Les Angles et leurs environs immédiats. Contactez-nous pour vérifier que votre bien entre dans notre zone.":
    "Mainly Avignon, Villeneuve-lès-Avignon, Les Angles and their immediate surroundings. Get in touch and we will confirm whether your property falls within our area.",
  "Vous recevez vos revenus selon la périodicité convenue dans le mandat, accompagnés d'un reporting clair détaillant les réservations, les montants encaissés et les frais.":
    "You receive your income on the schedule set out in the mandate, together with a clear report detailing the bookings, the amounts collected and the costs.",
  "Le mandat précise la durée et les conditions de résiliation, avec un préavis raisonnable. Les réservations déjà confirmées au moment de la résiliation sont honorées.":
    "The mandate sets out its term and how to end it, with reasonable notice. Bookings already confirmed at the point of termination are honoured.",
  "Depuis le 1er janvier 2026, tout meublé de tourisme à Avignon doit être déclaré et enregistré, sans exception. S'y ajoute une autorisation temporaire de changement d'usage lorsque le logement n'est pas la résidence principale du loueur. Nous nous chargeons de ces démarches pour les biens que nous gérons.":
    "Since 1 January 2026, every holiday let in Avignon must be declared and registered, without exception. A temporary change-of-use authorisation is also required where the property is not the letter's main home. We handle this paperwork for the properties we manage.",
  "90 jours par année civile, et non 120. Avignon a abaissé le plafond national par délibération du 22 février 2025, une faculté que la loi ouvre aux communes en zone tendue. Au-delà, la location n'est plus considérée comme celle d'une résidence principale.":
    "90 days per calendar year, not 120. Avignon lowered the national cap by a council decision of 22 February 2025, an option the law gives to municipalities in high-demand areas. Beyond that, the letting is no longer treated as that of a main home.",
  "Non. Le régime d'enregistrement et de changement d'usage décrit ici est propre à la commune d'Avignon. Villeneuve-lès-Avignon et Les Angles appliquent leurs propres règles, que nous vérifions bien pour chaque bien avant la mise en ligne.":
    "No. The registration and change-of-use regime described here is specific to Avignon. Villeneuve-lès-Avignon and Les Angles apply their own rules, which we check for each property before it goes live.",

  /* ---------- Réponses longues : sous-location ---------- */
  "Nous devenons votre locataire principal. On loue votre bien à l'année pour y accueillir des voyageurs de passage. Vous touchez vos loyers, nous gérons tout.":
    "We become your head tenant. We rent your property year-round and host short-stay guests in it. You collect your rent, we handle everything else.",
  "Oui. La pratique est totalement légale. Elle est encadrée par un contrat spécifique qui nous autorise à sous-louer votre logement en courte durée.":
    "Yes. The arrangement is entirely legal. It is governed by a specific contract authorising us to sub-let your property on a short-term basis.",
  "Nous gérons tout de A à Z. Ménage professionnel, maintenance et accueil des occupants. Vous n'avez plus aucune contrainte opérationnelle.":
    "We handle it from start to finish. Professional cleaning, maintenance and welcoming guests. Nothing operational is left on your plate.",
  "Pas forcément. On peut récupérer votre bien vide et l'équiper de A à Z. Le but est d'offrir un logement clé en main, équipé et entretenu.":
    "Not necessarily. We can take the property empty and furnish it completely. The aim is a turnkey home, equipped and maintained.",
  "Nous. Depuis le 1er janvier 2026, tout meublé de tourisme à Avignon doit être déclaré et enregistré, et une autorisation temporaire de changement d'usage est requise pour un logement qui n'est pas une résidence principale. En sous-location, c'est nous qui exploitons : nous portons ces démarches et le respect des règles de la commune.":
    "We do. Since 1 January 2026, every holiday let in Avignon must be declared and registered, and a temporary change-of-use authorisation is required for a property that is not a main home. Under a guaranteed-rent arrangement we are the operator: we carry this paperwork and compliance with the council's rules.",
  "Non. Ce plafond, abaissé de 120 à 90 jours par Avignon en février 2025, ne concerne que la résidence principale de celui qui loue. Un bien confié en sous-location n'est pas votre résidence principale : il n'est pas soumis à ce plafond, mais à l'autorisation de changement d'usage.":
    "No. That cap, lowered from 120 to 90 days by Avignon in February 2025, applies only to the letter's own main home. A property placed under a guaranteed-rent arrangement is not your main home: it is not subject to the cap, but to the change-of-use authorisation.",
  "Uniquement avec l'accord écrit de votre propriétaire. Sous-louer sans cet accord expose à la résiliation de votre bail. Si vous êtes dans ce cas, dites-le-nous d'emblée : nous vérifions ce que votre contrat autorise avant d'aller plus loin.":
    "Only with your landlord's written consent. Sub-letting without it puts your own lease at risk. If that is your situation, tell us from the outset: we will check what your contract allows before going any further.",
  "La conciergerie vous laisse propriétaire exploitant : vos revenus varient avec l'occupation et vous nous versez une commission. La sous-location vous verse un loyer fixe quelle que soit l'occupation, et nous portons le risque. La première rapporte davantage sur une bonne saison, la seconde ne dépend pas de la saison. Nous détaillons la comparaison chiffrée dans notre article sur le choix entre les deux formules.":
    "Under management you remain the operator: your income moves with occupancy and you pay us a commission. Under guaranteed rent you receive a fixed rent whatever the occupancy, and we carry the risk. The first earns more in a good season, the second does not depend on the season at all. Our article on choosing between the two sets out the figures side by side.",

  /* ---------- Réponses longues : franchise ---------- */
  "Non. La formation part du début : trouver ses premiers propriétaires, fixer ses prix, monter son équipe de ménage, tenir la relation voyageur, suivre sa comptabilité. Ce qui compte n'est pas le diplôme, c'est d'être présent sur sa ville et de répondre quand on vous appelle.":
    "No. The training starts at the beginning: finding your first owners, setting your rates, building your cleaning team, handling guests, keeping your books. What matters is not a qualification, it is being present in your town and answering when someone calls.",
  "Le droit d'entrée et la redevance sont détaillés lors du premier appel, avec le contrat et le modèle économique complet. Nous préférons en parler une fois que votre ville et votre situation sont sur la table, parce que ce qui compte est ce que ça rapporte chez vous, pas le montant seul.":
    "The entry fee and the royalty are set out on the first call, along with the contract and the full economics. We prefer to discuss them once your town and your situation are on the table, because what matters is what it earns where you are, not the figure on its own.",
  "Votre territoire vous est réservé : aucun autre membre du réseau ne peut s'y implanter. Le découpage tient compte de la taille de la ville et du nombre de logements saisonniers qu'elle compte, pour qu'une zone reste exploitable par une seule personne.":
    "Your territory is yours alone: no other member of the network may set up there. The boundaries take account of the size of the town and how many holiday lets it has, so that one area remains workable by one person.",
  "La formation se suit à votre rythme, la plupart la bouclent en trois à quatre semaines. La prospection commence pendant, pas après : l'objectif est d'avoir signé votre premier propriétaire avant la fin du parcours.":
    "You take the training at your own pace; most finish in three to four weeks. Prospecting starts during it, not after: the aim is to have signed your first owner before you reach the end.",
  "Les premiers mois, oui, beaucoup le font. La conciergerie demande de la disponibilité aux entrées et aux sorties, mais le reste se pilote depuis un téléphone. Le passage à temps plein vient en général avec le cinquième ou le sixième mandat.":
    "In the early months, yes, plenty do. The work demands availability at check-in and check-out, but the rest runs from a phone. Going full time usually comes with the fifth or sixth property.",
  "Oui, l'accès à Chevalier PMS est inclus pendant toute la durée du contrat, sans abonnement séparé. C'est le logiciel que nous utilisons nous-mêmes tous les jours : calendrier multicanal, suivi des ménages, messagerie voyageurs, CRM propriétaires.":
    "Yes, access to Chevalier PMS is included for the whole term of the contract, with no separate subscription. It is the software we use ourselves every day: multi-channel calendar, cleaning tracker, guest inbox, owner CRM.",
  "Une société ou une entreprise individuelle à votre nom : vous restez chef d'entreprise, la franchise n'est pas un contrat de travail. Nous vous indiquons le montage qui convient à votre situation lors du dossier, mais le choix et sa validation par votre comptable vous appartiennent.":
    "A company or a sole trader business in your own name: you remain your own boss, a franchise is not an employment contract. We point you to the structure that suits your situation when we send the pack, but the choice, and its approval by your accountant, are yours.",
  "Vous. La formation couvre exactement ça : où trouver des prestataires fiables dans votre ville, comment les rémunérer, comment contrôler la qualité sans repasser derrière eux. Le ménage est refacturé au voyageur, donc il ne pèse pas sur votre trésorerie.":
    "You do. The training covers precisely that: where to find reliable people in your town, how to pay them, how to check the quality without redoing the work yourself. Cleaning is billed to the guest, so it does not weigh on your cash flow.",
  "Le contrat prévoit ses conditions de sortie, et elles sont dans le dossier que vous recevez avant toute signature, pas découvertes en cours de route. Vous conservez votre société et vos relations commerciales ; ce que vous rendez, c'est l'usage de la marque, du logiciel et du territoire.":
    "The contract sets out how it ends, and those terms are in the pack you receive before any signature, not discovered along the way. You keep your company and your business relationships; what you hand back is the use of the brand, the software and the territory.",
  "Peu, et lentement. Un réseau qui recrute vite recrute mal, et chaque franchisé mal accompagné abîme le nom de tous les autres. Les premiers entrants bénéficient de conditions que nous ne reconduirons pas, précisément parce qu'ils prennent le risque d'arriver les premiers.":
    "Few, and slowly. A network that recruits fast recruits badly, and every poorly supported franchisee damages the name for everyone else. Early entrants get terms we will not repeat, precisely because they take the risk of arriving first.",
  "Parce que la conciergerie est un métier de présence. On ne gère pas Bordeaux depuis Avignon : il faut quelqu'un qui connaisse la ville, qui puisse être sur place en vingt minutes et que les propriétaires croisent au marché. Une agence à distance ne tient pas cette promesse, un franchisé local si.":
    "Because this trade is about being there. You cannot run Bordeaux from Avignon: it takes someone who knows the town, who can be on site in twenty minutes, and whom owners bump into at the market. A remote agency cannot keep that promise; a local franchisee can.",

  /* ---------- Franchise : ce qui est compris, textes ---------- */
  "Le nom Chevalier Conciergerie sur votre ville, et personne d'autre du réseau dessus. Le découpage tient compte de la taille de la commune et du nombre de meublés qu'elle compte, pour qu'une zone reste exploitable par une seule personne.":
    "The Chevalier Conciergerie name in your town, and no one else from the network on it. The boundaries take account of the size of the municipality and how many holiday lets it has, so that one area remains workable by one person.",
  "Du premier propriétaire signé au dixième : prospection, tarification, montage de l'équipe de ménage, relation voyageur, comptabilité, réglementation locale. Rien n'est laissé à votre interprétation.":
    "From your first signed owner to your tenth: prospecting, pricing, building the cleaning team, handling guests, bookkeeping, local regulations. Nothing is left to your own interpretation.",
  "Chevalier PMS, celui que nous utilisons chaque jour sur nos propres logements : calendrier multicanal, suivi des ménages, messagerie voyageurs, CRM propriétaires. Compris pendant toute la durée du contrat, sans abonnement séparé.":
    "Chevalier PMS, the one we use every day on our own properties: multi-channel calendar, cleaning tracker, guest inbox, owner CRM. Included for the whole term of the contract, with no separate subscription.",
  "Un site bâti sur le nôtre, à votre ville, avec la stratégie de référencement qui va avec. L'objectif est simple : qu'un propriétaire de votre commune vous trouve sur Google sans jamais avoir entendu parler de vous.":
    "A website built on ours, for your town, with the search strategy that goes with it. The aim is simple: that an owner in your municipality finds you on Google without ever having heard of you.",
  "Logo, cartes de visite, flyers, modèles de publications, charte de marque. De quoi être crédible au premier rendez-vous, pas au dixième.":
    "Logo, business cards, flyers, post templates, brand guidelines. Enough to be credible at the first meeting, not the tenth.",
  "Des points réguliers, un accès direct quand ça coince, et un séminaire annuel de trois jours où tout le réseau se retrouve pour confronter ce qui marche et ce qui ne marche pas.":
    "Regular check-ins, direct access when you are stuck, and a three-day annual gathering where the whole network compares what works and what does not.",

  /* ---------- Franchise : profils, textes ---------- */
  "Aucune expérience de la location courte durée. La formation commence au commencement, et la prospection démarre pendant le parcours, pas après.":
    "No experience of short-term letting. The training starts at the very beginning, and prospecting starts during the course, not after it.",
  "Seul, avec un tableur et beaucoup de bonne volonté. Ce que vous venez chercher, c'est la méthode, l'outil, et un nom qui rassure les propriétaires en face de vous.":
    "On your own, with a spreadsheet and a lot of goodwill. What you are after is the method, the tool, and a name that reassures the owner sitting opposite you.",
  "Agent, investisseur, gestionnaire. La conciergerie prolonge ce que vous faites déjà et se nourrit du réseau que vous avez mis des années à construire.":
    "Agent, investor, manager. This work extends what you already do and feeds on the network you spent years building.",

  /* ---------- Franchise : le parcours, textes ---------- */
  "Votre ville, votre situation, ce que vous voulez en faire. Nous regardons ensemble si le territoire est libre et s'il a de quoi faire vivre une conciergerie. Sans engagement et sans discours de vente.":
    "Your town, your situation, what you want to make of it. Together we look at whether the territory is free and whether it can sustain a business. No commitment and no sales pitch.",
  "Le modèle économique, le contrat, le droit d'entrée, la redevance, le détail de ce qui est compris. Tout est transmis en entier, y compris ce qui n'est pas confortable à lire.":
    "The economics, the contract, the entry fee, the royalty, the detail of what is included. All of it sent in full, including the parts that are uncomfortable to read.",
  "La loi Doubin impose de vous remettre le document d'information précontractuelle au moins vingt jours avant toute signature et tout versement. Nous ne raccourcissons pas ce délai, et nous répondons à vos questions pendant.":
    "French franchise law requires us to give you the pre-contract disclosure document at least twenty days before any signature or any payment. We do not shorten that period, and we answer your questions during it.",
  "Le contrat de franchise, le territoire acté sur la carte, vos accès au logiciel ouverts et votre site mis en chantier le jour même.":
    "The franchise agreement, your territory marked on the map, your software access opened and work on your website started the same day.",
  "À votre rythme, la plupart la bouclent en trois à quatre semaines. La prospection commence pendant, pas après : l'objectif est d'avoir signé votre premier propriétaire avant la fin du parcours.":
    "At your own pace; most finish in three to four weeks. Prospecting starts during it, not after: the aim is to have signed your first owner before you reach the end.",
  "Votre site en ligne, vos outils en main, vos premiers mandats signés. Les points réguliers commencent, et vous retrouvez le réseau au séminaire annuel. Nous restons à côté, pas derrière.":
    "Your website live, your tools in hand, your first properties signed. The regular check-ins begin, and you meet the network at the annual gathering. We stay alongside you, not behind you.",

  /* ---------- Fondateur, presse, tarification ---------- */
  "À seulement 20 ans, Victor Chevalier fait partie de cette nouvelle génération d'entrepreneurs qui osent concrétiser leurs ambitions. Originaire d'Avignon, il a fondé Chevalier Conciergerie, dans laquelle il propose ses services de conciergerie et de sous-location.":
    "At just 20, Victor Chevalier belongs to a new generation of entrepreneurs who dare to act on their ambitions. Born in Avignon, he founded Chevalier Conciergerie, through which he offers property management and guaranteed-rent letting.",
  "« Mon premier investissement immobilier à 19 ans a été le déclic. En explorant le marché avignonnais, j'ai rapidement compris le potentiel extraordinaire de la location courte durée dans notre belle région »":
    "“My first property investment at 19 was the spark. Exploring the Avignon market, I quickly saw the extraordinary potential of short-term letting in this beautiful part of France.”",
  "Nous sommes partenaires de J'Affiche Complet, agence de revenue management. Pas d'algorithme qui grignote deux euros par-ci par-là chaque jour sans effet réel : une vraie équipe humaine s'en occupe.":
    "We work with J'Affiche Complet, a revenue management agency. No algorithm nibbling two euros here and there every day to no real effect: a team of people handles it.",
  "Partenariat avec J'Affiche Complet, agence de revenue management": "Partnership with J'Affiche Complet, a revenue management agency",

  /* ---------- Textes alternatifs des images ---------- */
  "Calendrier Chevalier PMS : réservations Airbnb et Booking synchronisées":
    "Chevalier PMS calendar: Airbnb and Booking reservations in sync",
  "Site de réservation en direct Chevalier PMS": "Chevalier PMS direct booking site",
  "Tarification dynamique par canal dans Chevalier PMS": "Channel-by-channel dynamic pricing in Chevalier PMS",
  "Suivi des ménages dans Chevalier PMS": "Cleaning tracker in Chevalier PMS",
  "Messagerie voyageurs dans Chevalier PMS — 121 conversations": "Guest inbox in Chevalier PMS — 121 conversations",
  "Rapport mensuel propriétaire dans Chevalier PMS : canaux, occupation, chiffre d'affaires":
    "Monthly owner report in Chevalier PMS: channels, occupancy, revenue",

  /* ---------- Avis Google ----------
     Les noms des personnes ne se traduisent pas. Les textes sont traduits
     fidèlement : ce sont de vrais avis, publiés sur Google en français. */
  "J'ai fait appel à Chevalier Conciergerie pour mon appartement et je suis absolument ravi de la manière dont j'ai été accompagné par Victor. Il est très professionnel, réactif et de très bon conseil. Je recommande vivement.":
    "I turned to Chevalier Conciergerie for my flat and I am absolutely delighted with the way Victor looked after me. He is very professional, quick to respond and gives excellent advice. I recommend him without hesitation.",
  "Je confie mon appartement en centre-ville d'Avignon à CHEVALIER Conciergerie depuis plusieurs mois et je ne regrette pas. Communication fluide, logement toujours impeccable et revenus en hausse. Je recommande.":
    "I have entrusted my flat in central Avignon to CHEVALIER Conciergerie for several months and I have no regrets. Communication is smooth, the property is always spotless and my income has gone up. Recommended.",
  "Très satisfait de Chevalier Conciergerie ! Équipe professionnelle, réactive et à l'écoute. Service de qualité et communication au top. Je recommande sans hésiter.":
    "Very happy with Chevalier Conciergerie! A professional team, quick to respond and genuinely attentive. Quality service and excellent communication. I recommend them without hesitation.",
  "Excellente conciergerie, très professionnelle et à l'écoute des clients. Je recommande vivement pour tout projet de location courte durée.":
    "An excellent property manager, highly professional and attentive to clients. I recommend them warmly for any short-term letting project.",
  "Très satisfait de mon expérience avec Victor sur Avignon. Professionnalisme, réactivité et conseils au top du début à la fin.":
    "Very happy with my experience with Victor in Avignon. Professional, responsive and excellent advice from start to finish.",
  "Excellente conciergerie sur Avignon, je recommande CHEVALIER Conciergerie.":
    "An excellent property manager in Avignon; I recommend CHEVALIER Conciergerie.",
};
