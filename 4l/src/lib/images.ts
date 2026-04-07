/**
 * Configuration centralisée des chemins d'images
 * Facilite la modification et la maintenance des chemins
 */

export const IMAGES = {
  // Hero Section
  hero: {
    main: "/images/hero/desert-hero.jpg",
  },

  // Team Members
  team: {
    thomas: "/images/team/thomas.jpg",
    marie: "/images/team/marie.jpg",
  },

  // Car & Preparation
  car: {
    main: "/images/car/4l-main.jpg",
    desertBackground: "/images/car/desert-background.jpg",
  },

  // Blog Articles
  blog: {
    acquisition: "/images/blog/acquisition.jpg",
    mecanique: "/images/blog/mecanique.jpg",
    partenaires: "/images/blog/partenaires.jpg",
    depart: "/images/blog/depart.jpg",
  },
} as const;

// Alternative : chemins avec descriptions pour documentation
export const IMAGE_SPECS = {
  "desert-hero.jpg": {
    path: IMAGES.hero.main,
    dimensions: "1920x1080px",
    description: "Paysage désertique au coucher du soleil",
    location: "public/images/hero/",
  },
  "thomas.jpg": {
    path: IMAGES.team.thomas,
    dimensions: "400x400px",
    description: "Photo de Thomas (pilote)",
    location: "public/images/team/",
  },
  "marie.jpg": {
    path: IMAGES.team.marie,
    dimensions: "400x400px",
    description: "Photo de Marie (co-pilote)",
    location: "public/images/team/",
  },
  "4l-main.jpg": {
    path: IMAGES.car.main,
    dimensions: "800x600px",
    description: "Photo principale de la 4L",
    location: "public/images/car/",
  },
  "desert-background.jpg": {
    path: IMAGES.car.desertBackground,
    dimensions: "1920x1080px",
    description: "Fond désertique pour section Trophy",
    location: "public/images/car/",
  },
  "acquisition.jpg": {
    path: IMAGES.blog.acquisition,
    dimensions: "600x400px",
    description: "Article: La 4L est trouvée",
    location: "public/images/blog/",
  },
  "mecanique.jpg": {
    path: IMAGES.blog.mecanique,
    dimensions: "600x400px",
    description: "Article: Préparation mécanique",
    location: "public/images/blog/",
  },
  "partenaires.jpg": {
    path: IMAGES.blog.partenaires,
    dimensions: "600x400px",
    description: "Article: Premiers partenaires",
    location: "public/images/blog/",
  },
  "depart.jpg": {
    path: IMAGES.blog.depart,
    dimensions: "600x400px",
    description: "Article: Cap sur le départ",
    location: "public/images/blog/",
  },
};

export default IMAGES;
