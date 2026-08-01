/**
 * Coordonnées Supabase, communes au rendu serveur et au client d'admin.
 *
 * `NEXT_PUBLIC_*` : la clé anon est publique par conception — la lecture est
 * ouverte (RLS `select using (true)`) et l'écriture est refusée par Postgres à
 * tout email absent de `l4_admins`.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Faux tant que le `.env.local` n'est pas rempli : le site sert alors ses valeurs de repli. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const MEDIA_BUCKET = "l4-media";
