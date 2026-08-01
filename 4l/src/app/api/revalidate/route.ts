import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "@/lib/supabase-config";

/**
 * Purge le cache de la page d'accueil après une modification dans l'admin.
 *
 * Sans ça il faudrait attendre l'expiration du cache (`revalidate`) pour voir
 * son changement — déroutant quand on vient de cliquer sur « Enregistrer ».
 *
 * Autorisation : on rejoue le jeton de l'appelant sur `l4_admins`. La RLS ne
 * renvoie une ligne qu'aux admins, donc une réponse vide vaut refus. Pas de
 * secret supplémentaire à gérer, et la règle reste au même endroit que le reste.
 */
export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: "supabase-not-configured" }, { status: 503 });
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer /i, "");
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/l4_admins?select=email`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const rows = res.ok ? await res.json() : [];
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "auth-check-failed" }, { status: 502 });
  }

  revalidatePath("/");
  return NextResponse.json({ revalidated: true });
}
