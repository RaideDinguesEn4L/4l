import type { SiteContent, Settings } from "./content-types";

/**
 * Contenu de repli, servi si Supabase est injoignable.
 *
 * C'est le contenu d'origine du site (celui qui était en dur dans les
 * composants, repris tel quel dans `supabase/seed_initial_content.sql`). Un site
 * vitrine dont la base tombe doit rester présentable, pas afficher des sections
 * vides : la page est générée statiquement au build, une panne au mauvais moment
 * figerait sinon des blancs pour toute la durée du cache.
 *
 * Ces valeurs ne sont PAS la source de vérité — l'admin ne les modifie pas.
 */

export const DEFAULT_SETTINGS: Settings = {
  budget_collected: "3000",
  helloasso_url:
    "https://www.helloasso.com/associations/raid-dingues-en-4l/formulaires/2",
  posts_next_step: "Départ du 4L Trophy — Février 2027",
  prep_progress: "60",
  prep_car_image: "/images/car/4l-main.png",
  prep_car_caption: "Renault 4L - 1985",
  prep_car_title: "Notre Monture",
  prep_car_text:
    "Monique est une Renault 4 GTL de 1985, moteur Billancourt de 845 cm³. Elle a parcouru 150 000 km dont un 4L Trophy en 2025, elle est également la première 4L Trophy à avoir été exposée au Mondial de l'auto.\n\nNous la préparons avec amour : révision complète de la mécanique, protection du dessous de caisse... Elle sera prête à affronter le désert !",
};

export const DEFAULT_CONTENT: SiteContent = {
  posts: [
    {
      id: "default-post-1",
      title: "La 4L est trouvée !",
      date_label: "Février 2026",
      published_on: "2026-02-01",
      excerpt:
        "Après des semaines de recherche, nous avons enfin trouvé notre compagnon de route : une magnifique 4L GTL de 1985.",
      image_url: "/images/blog/acquisition2.jpeg",
      tag: "Acquisition",
      published: true,
    },
    {
      id: "default-post-2",
      title: "Début de la préparation mécanique",
      date_label: "Mars 2026",
      published_on: "2026-03-01",
      excerpt:
        "Premier tour du moteur réalisé ! Recherche de problèmes de démarrage à chaud, réparation des problèmes électriques...",
      image_url: "/images/blog/mecanique2.jpeg",
      tag: "Mécanique",
      published: true,
    },
  ],
  partners: [
    {
      id: "default-partner-1",
      name: "Nantiat",
      logo_url: "/images/partenaires/nantiat.jpeg",
      url: "https://www.instagram.com/uexpressnantiat?igsh=c3hhaTc4dDN1eGM2",
      sort_order: 1,
    },
    {
      id: "default-partner-2",
      name: "Laserdistri service 2",
      logo_url: "/images/partenaires/laserdistri_service.jpeg",
      url: "https://www.instagram.com/laserdistri.service?igsh=a21yYno1MDRndHdl",
      sort_order: 2,
    },
    {
      id: "default-partner-3",
      name: "Eco Vidange",
      logo_url: "/images/partenaires/eco_vidange.jpeg",
      url: "https://ecovidange-nouvelle-aquitaine-87.fr/",
      sort_order: 3,
    },
  ],
  budgetItems: [
    {
      id: "default-budget-1",
      label: "Inscription au rallye",
      amount: 3540,
      description: "Frais d'inscription officielle au 4L Trophy",
      icon: "Award",
      sort_order: 1,
    },
    {
      id: "default-budget-2",
      label: "Achat de la 4L",
      amount: 6000,
      description: "Acquisition du véhicule",
      icon: "Car",
      sort_order: 2,
    },
    {
      id: "default-budget-3",
      label: "Préparation mécanique",
      amount: 1000,
      description: "Révision complète et modifications",
      icon: "FileCheck",
      sort_order: 3,
    },
    {
      id: "default-budget-4",
      label: "Carburant",
      amount: 1000,
      description: "Essence pour 6000 km",
      icon: "Fuel",
      sort_order: 4,
    },
    {
      id: "default-budget-5",
      label: "Équipement",
      amount: 700,
      description: "Matériel de camping, navigation, sécurité",
      icon: "Tent",
      sort_order: 5,
    },
  ],
  crew: [
    {
      id: "default-crew-1",
      name: "Théo",
      role: "Pilote",
      bio: "Passionné de voiture, de voyage et de sport, le 4L Trophy va me permettre de réunir ces 3 passions et de découvrir l'humanitaire.",
      image_url: "/images/team/theo2.png",
      sort_order: 1,
    },
    {
      id: "default-crew-2",
      name: "Léa",
      role: "Co-pilote & Navigation",
      bio: "Passionnée de voyage et rêvant de réaliser une action humanitaire, c'est le moment pour apporter mon aide.",
      image_url: "/images/team/Lea.JPG",
      sort_order: 2,
    },
  ],
  prepSteps: [
    {
      id: "default-prep-1",
      title: "Acquisition",
      description:
        "Trouver notre 4L, vérifier son état général et réaliser l'achat.",
      status: "done",
      icon: "Car",
      sort_order: 1,
    },
    {
      id: "default-prep-2",
      title: "Homologation",
      description:
        "Préparation aux contrôles techniques et mise aux normes rallye.",
      status: "done",
      icon: "CheckCircle2",
      sort_order: 2,
    },
    {
      id: "default-prep-3",
      title: "Mécanique",
      description:
        "Révision complète : moteur, freins, suspension, transmission, électriques, etc.",
      status: "in-progress",
      icon: "Wrench",
      sort_order: 3,
    },
    {
      id: "default-prep-4",
      title: "Équipement",
      description:
        "Installation du matériel de sécurité, navigation et camping.",
      status: "pending",
      icon: "Clock",
      sort_order: 4,
    },
  ],
  settings: DEFAULT_SETTINGS,
};
