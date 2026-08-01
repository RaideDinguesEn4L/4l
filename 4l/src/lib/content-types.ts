/**
 * Formes du contenu éditable, partagées par les composants publics et l'admin.
 *
 * Les noms de champs collent aux colonnes Postgres (snake_case) : le contenu
 * fait un aller-retour vers Supabase sans couche de mapping.
 */

export type Post = {
  id: string;
  title: string;
  date_label: string;
  published_on: string;
  excerpt: string;
  image_url: string | null;
  tag: string;
  published: boolean;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  url: string | null;
  sort_order: number;
};

export type BudgetItem = {
  id: string;
  label: string;
  amount: number;
  description: string;
  icon: string;
  sort_order: number;
};

export type CrewMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string | null;
  sort_order: number;
};

export type PrepStatus = "done" | "in-progress" | "pending";

export type PrepStep = {
  id: string;
  title: string;
  description: string;
  status: PrepStatus;
  icon: string;
  sort_order: number;
};

/** Clés de `l4_settings`. Toute clé absente retombe sur `DEFAULT_SETTINGS`. */
export type Settings = {
  budget_collected: string;
  helloasso_url: string;
  posts_next_step: string;
  prep_progress: string;
  prep_car_image: string;
  prep_car_caption: string;
  prep_car_title: string;
  prep_car_text: string;
};

export type SiteContent = {
  posts: Post[];
  partners: Partner[];
  budgetItems: BudgetItem[];
  crew: CrewMember[];
  prepSteps: PrepStep[];
  settings: Settings;
};

/** Couleur de pastille par tag d'article. Un tag inconnu tombe sur le gris. */
export const TAG_COLORS: Record<string, string> = {
  Acquisition: "bg-green-100 text-green-700",
  Mécanique: "bg-blue-100 text-blue-700",
  Partenariat: "bg-purple-100 text-purple-700",
  Aventure: "bg-sand-light text-earth-dark",
  Solidarité: "bg-rose-100 text-rose-700",
};

export const PREP_STATUS = {
  done: { label: "Terminé", class: "bg-green-100 text-green-700" },
  "in-progress": { label: "En cours", class: "bg-sand-light text-earth-dark" },
  pending: { label: "À venir", class: "bg-gray-100 text-gray-500" },
} as const;
