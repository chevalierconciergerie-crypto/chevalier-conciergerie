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
  "Notre service": "Our service",
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

  "Estimation gratuite": "Free estimate",
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
};
