"use client";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config";

/**
 * Client Supabase de l'admin (navigateur uniquement).
 *
 * Clé anon : la lecture est publique par conception, l'écriture est refusée
 * côté Postgres à tout email absent de `l4_admins`. La garde d'écran n'est donc
 * qu'un confort d'UI — la vraie barrière est la RLS.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
