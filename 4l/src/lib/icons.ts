import {
  Award,
  Car,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Fuel,
  Hammer,
  Heart,
  Map,
  Package,
  Shield,
  Sparkles,
  Tent,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Icônes autorisées pour les postes de budget et les étapes de préparation.
 *
 * La base ne stocke qu'un nom : cette liste blanche évite d'importer tout
 * lucide-react dans le bundle (et de faire planter le rendu sur un nom bidon).
 * Ajouter une icône ici la rend aussitôt disponible dans les menus de l'admin.
 */
export const ICONS: Record<string, LucideIcon> = {
  Award,
  Car,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Fuel,
  Hammer,
  Heart,
  Map,
  Package,
  Shield,
  Sparkles,
  Tent,
  Wrench,
};

export const ICON_NAMES = Object.keys(ICONS);

export function iconFor(name: string): LucideIcon {
  return ICONS[name] ?? Package;
}
