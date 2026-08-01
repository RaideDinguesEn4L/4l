import { ICON_NAMES } from "./icons";
import { TAG_COLORS } from "./content-types";

/**
 * Description des écrans d'admin.
 *
 * Les cinq collections se ressemblent (une liste de lignes, un formulaire, un
 * ordre d'affichage) : plutôt que cinq écrans copiés-collés, `CollectionEditor`
 * lit ces descripteurs. Ajouter un champ = ajouter une ligne ici, plus une
 * colonne dans la table.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "image"
  | "select"
  | "boolean"
  | "date";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  hint?: string;
  required?: boolean;
  /** Affiché dans la liste repliée, pour reconnaître la ligne. */
  isTitle?: boolean;
};

export type Collection = {
  key: string;
  table: string;
  title: string;
  /** « Ajouter un article » */
  addLabel: string;
  description: string;
  fields: Field[];
  /** Ordre d'affichage dans l'admin (appliqué colonne par colonne). */
  orderBy: { column: string; ascending: boolean }[];
  /** Vrai si l'ordre d'affichage se règle à la main (colonne `sort_order`). */
  sortable: boolean;
  /** Valeurs d'une nouvelle ligne. */
  blank: Record<string, unknown>;
};

export const COLLECTIONS: Collection[] = [
  {
    key: "posts",
    table: "l4_posts",
    title: "Journal de bord",
    addLabel: "Nouvelle publication",
    description:
      "Les articles affichés dans « Journal de Bord ». Les plus récents (par date) apparaissent en premier.",
    orderBy: [
      { column: "published_on", ascending: false },
      { column: "created_at", ascending: false },
    ],
    sortable: false,
    fields: [
      { name: "title", label: "Titre", type: "text", required: true, isTitle: true },
      {
        name: "date_label",
        label: "Date affichée",
        type: "text",
        placeholder: "Février 2026",
        hint: "Texte libre, montré sur la carte.",
        required: true,
      },
      {
        name: "published_on",
        label: "Date de tri",
        type: "date",
        hint: "Ne s'affiche pas : sert uniquement à ordonner les publications.",
        required: true,
      },
      {
        name: "tag",
        label: "Catégorie",
        type: "select",
        options: Object.keys(TAG_COLORS),
      },
      { name: "excerpt", label: "Texte", type: "textarea" },
      { name: "image_url", label: "Image", type: "image" },
      {
        name: "published",
        label: "Visible sur le site",
        type: "boolean",
        hint: "Décoché : l'article reste ici en brouillon.",
      },
    ],
    blank: {
      title: "",
      date_label: "",
      published_on: new Date().toISOString().slice(0, 10),
      excerpt: "",
      image_url: null,
      tag: "Aventure",
      published: true,
    },
  },
  {
    key: "partners",
    table: "l4_partners",
    title: "Partenaires",
    addLabel: "Nouveau partenaire",
    description: "Les logos de la section « Ils nous font confiance ».",
    orderBy: [{ column: "sort_order", ascending: true }],
    sortable: true,
    fields: [
      { name: "name", label: "Nom", type: "text", required: true, isTitle: true },
      { name: "logo_url", label: "Logo", type: "image" },
      {
        name: "url",
        label: "Lien",
        type: "url",
        placeholder: "https://…",
        hint: "Site ou page Instagram du partenaire.",
      },
    ],
    blank: { name: "", logo_url: null, url: "", sort_order: 0 },
  },
  {
    key: "budget",
    table: "l4_budget_items",
    title: "Budget",
    addLabel: "Nouveau poste",
    description:
      "Les postes de dépense. L'objectif affiché est leur somme — il n'est pas à saisir.",
    orderBy: [{ column: "sort_order", ascending: true }],
    sortable: true,
    fields: [
      { name: "label", label: "Poste", type: "text", required: true, isTitle: true },
      { name: "amount", label: "Montant (€)", type: "number", required: true },
      { name: "description", label: "Description", type: "text" },
      { name: "icon", label: "Icône", type: "select", options: ICON_NAMES },
    ],
    blank: {
      label: "",
      amount: 0,
      description: "",
      icon: "Package",
      sort_order: 0,
    },
  },
  {
    key: "crew",
    table: "l4_crew",
    title: "Équipage",
    addLabel: "Nouveau membre",
    description: "Les portraits de la section « L'Équipage ».",
    orderBy: [{ column: "sort_order", ascending: true }],
    sortable: true,
    fields: [
      { name: "name", label: "Prénom", type: "text", required: true, isTitle: true },
      {
        name: "role",
        label: "Rôle",
        type: "text",
        placeholder: "Pilote",
      },
      { name: "bio", label: "Présentation", type: "textarea" },
      { name: "image_url", label: "Photo", type: "image" },
    ],
    blank: { name: "", role: "", bio: "", image_url: null, sort_order: 0 },
  },
  {
    key: "prep",
    table: "l4_prep_steps",
    title: "Préparation",
    addLabel: "Nouvelle étape",
    description: "Les étapes de préparation de la 4L et leur avancement.",
    orderBy: [{ column: "sort_order", ascending: true }],
    sortable: true,
    fields: [
      { name: "title", label: "Étape", type: "text", required: true, isTitle: true },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "status",
        label: "Avancement",
        type: "select",
        options: ["done", "in-progress", "pending"],
      },
      { name: "icon", label: "Icône", type: "select", options: ICON_NAMES },
    ],
    blank: {
      title: "",
      description: "",
      status: "pending",
      icon: "Wrench",
      sort_order: 0,
    },
  },
];

/** Libellés lisibles pour les valeurs de `status` (le `select` est brut sinon). */
export const STATUS_LABELS: Record<string, string> = {
  done: "Terminé",
  "in-progress": "En cours",
  pending: "À venir",
};

/** Champs de `l4_settings`, dans l'ordre d'affichage de l'écran « Réglages ». */
export const SETTING_FIELDS: Field[] = [
  {
    name: "budget_collected",
    label: "Montant collecté (€)",
    type: "number",
    hint: "Le pourcentage et la barre de progression s'en déduisent.",
  },
  {
    name: "prep_progress",
    label: "Progression de la préparation (%)",
    type: "number",
    hint: "Barre « Progression globale » de la section La 4L.",
  },
  {
    name: "posts_next_step",
    label: "Prochaine étape",
    type: "text",
    hint: "Phrase affichée sous le journal de bord.",
  },
  {
    name: "helloasso_url",
    label: "Lien de la cagnotte HelloAsso",
    type: "url",
    hint: "Utilisé par tous les boutons « Faire un don ».",
  },
  { name: "prep_car_image", label: "Photo de la 4L", type: "image" },
  {
    name: "prep_car_caption",
    label: "Légende de la photo",
    type: "text",
    placeholder: "Renault 4L - 1985",
  },
  { name: "prep_car_title", label: "Titre de l'encart", type: "text" },
  {
    name: "prep_car_text",
    label: "Texte de présentation de la 4L",
    type: "textarea",
    hint: "Laissez une ligne vide entre deux paragraphes.",
  },
];
