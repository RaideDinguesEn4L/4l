import "server-only";

import { DEFAULT_CONTENT, DEFAULT_SETTINGS } from "./content-defaults";
import type { SiteContent, Settings } from "./content-types";
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "./supabase-config";

/**
 * Lecture du contenu éditable, côté serveur.
 *
 * On tape l'API REST de Supabase en `fetch` plutôt qu'avec `supabase-js` :
 * `next: { revalidate }` s'y applique directement, donc la page reste
 * statique et se rafraîchit toute seule après une modification dans l'admin.
 * `supabase-js` n'est chargé que dans l'admin, qui a besoin de l'auth.
 */

/**
 * Délai maximal entre une modification dans l'admin et son apparition en ligne.
 * À garder synchronisé avec `export const revalidate` de `src/app/page.tsx`, que
 * Next exige littéral (il le lit sans exécuter le module).
 */
export const CONTENT_REVALIDATE_SECONDS = 60;

async function select<T>(path: string, fallback: T[]): Promise<T[]> {
  if (!isSupabaseConfigured) return fallback;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()) as T[];
  } catch (err) {
    // Jamais de page en erreur pour un site vitrine : on log et on sert le repli.
    console.error(`[content] lecture de ${path} impossible :`, err);
    return fallback;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const [posts, partners, budgetItems, crew, prepSteps, settingRows] =
    await Promise.all([
      select<SiteContent["posts"][number]>(
        "l4_posts?deleted=eq.false&published=eq.true&order=published_on.desc,created_at.desc",
        DEFAULT_CONTENT.posts
      ),
      select<SiteContent["partners"][number]>(
        "l4_partners?deleted=eq.false&order=sort_order.asc",
        DEFAULT_CONTENT.partners
      ),
      select<SiteContent["budgetItems"][number]>(
        "l4_budget_items?deleted=eq.false&order=sort_order.asc",
        DEFAULT_CONTENT.budgetItems
      ),
      select<SiteContent["crew"][number]>(
        "l4_crew?deleted=eq.false&order=sort_order.asc",
        DEFAULT_CONTENT.crew
      ),
      select<SiteContent["prepSteps"][number]>(
        "l4_prep_steps?deleted=eq.false&order=sort_order.asc",
        DEFAULT_CONTENT.prepSteps
      ),
      select<{ key: string; value: string }>("l4_settings?select=key,value", []),
    ]);

  // Une clé jamais renseignée doit garder sa valeur d'origine plutôt que de
  // vider un texte ou de mettre un compteur à zéro.
  const settings: Settings = { ...DEFAULT_SETTINGS };
  for (const row of settingRows) {
    if (row.key in settings && row.value !== "") {
      settings[row.key as keyof Settings] = row.value;
    }
  }

  return { posts, partners, budgetItems, crew, prepSteps, settings };
}
