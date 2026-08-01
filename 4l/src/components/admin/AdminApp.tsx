"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ExternalLink, Loader2, LogOut, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase-browser";
import { isSupabaseConfigured } from "@/lib/supabase-config";
import { COLLECTIONS } from "@/lib/admin-schema";
import CollectionEditor from "./CollectionEditor";
import SettingsEditor from "./SettingsEditor";

const TABS = [
  ...COLLECTIONS.map((c) => ({ key: c.key, label: c.title })),
  { key: "settings", label: "Réglages" },
];

/**
 * Espace d'administration du site.
 *
 * Tout se passe dans le navigateur, contre Supabase : la page publique reste un
 * rendu statique que rien n'alourdit. L'accès affiché ici n'est qu'un confort —
 * la RLS Postgres refuse toute écriture à un email absent de `l4_admins`, même
 * si quelqu'un contourne cet écran.
 */
export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(TABS[0].key);
  const [publishState, setPublishState] = useState<"idle" | "working" | "done">("idle");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const sync = async (next: Session | null) => {
      setSession(next);
      if (next) {
        // La RLS ne renvoie que la ligne de l'utilisateur : une réponse vide
        // signifie « pas admin », sans avoir à lire toute la liste.
        const { data } = await supabase.from("l4_admins").select("email").limit(1);
        setIsAdmin((data ?? []).length > 0);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => sync(data.session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => sync(next));

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Purge le cache de la page d'accueil après une écriture, pour ne pas attendre
   * l'expiration naturelle (une minute) avant de voir son changement en ligne.
   */
  const publish = useCallback(async () => {
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    if (!token) return;

    setPublishState("working");
    try {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPublishState("done");
      setTimeout(() => setPublishState("idle"), 2500);
    } catch {
      // Sans succès, le site se mettra à jour tout seul au bout d'une minute :
      // inutile d'alarmer, la modification est déjà enregistrée en base.
      setPublishState("idle");
    }
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <Centered>
        <h1 className="font-display text-3xl text-earth-dark">Administration</h1>
        <p className="mt-3 text-earth-brown">
          Supabase n&apos;est pas configuré : renseignez{" "}
          <code className="rounded bg-cream px-1.5 py-0.5 text-sm">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          et{" "}
          <code className="rounded bg-cream px-1.5 py-0.5 text-sm">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          puis reconstruisez le site.
        </p>
      </Centered>
    );
  }

  if (loading) {
    return (
      <Centered>
        <Loader2 className="h-6 w-6 animate-spin text-earth-taupe" />
      </Centered>
    );
  }

  if (!session) {
    return (
      <Centered>
        <h1 className="font-display text-4xl text-earth-dark">Administration</h1>
        <p className="mt-3 text-earth-brown">
          Connectez-vous pour mettre à jour le contenu du site.
        </p>
        <button
          type="button"
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: `${window.location.origin}/admin` },
            })
          }
          className="mt-8 rounded-full bg-earth-dark px-6 py-3 font-medium text-cream transition hover:bg-earth-brown"
        >
          Se connecter avec Google
        </button>
      </Centered>
    );
  }

  if (!isAdmin) {
    return (
      <Centered>
        <h1 className="font-display text-3xl text-earth-dark">Accès refusé</h1>
        <p className="mt-3 max-w-md text-earth-brown">
          Le compte <strong>{session.user.email}</strong> n&apos;est pas autorisé à
          modifier le site.
        </p>
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-earth-taupe/40 px-5 py-2.5 text-earth-brown transition hover:bg-white"
        >
          <LogOut className="h-4 w-4" />
          Changer de compte
        </button>
      </Centered>
    );
  }

  const collection = COLLECTIONS.find((c) => c.key === tab);

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-20 border-b border-earth-taupe/20 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
          <span className="font-display text-2xl text-earth-dark">
            Administration
          </span>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-earth-brown transition hover:text-earth-rose"
          >
            Voir le site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-earth-taupe sm:inline">
              {session.user.email}
            </span>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-1.5 rounded-full border border-earth-taupe/40 px-3 py-1.5 text-sm text-earth-brown transition hover:bg-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Quitter
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-5 pb-3">
          {TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === item.key
                  ? "bg-earth-dark text-cream"
                  : "text-earth-brown hover:bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8">
        {collection ? (
          <CollectionEditor
            key={collection.key}
            collection={collection}
            onSaved={publish}
          />
        ) : (
          <SettingsEditor onSaved={publish} />
        )}

        <p className="mt-10 flex items-center gap-2 text-sm text-earth-taupe">
          {publishState === "working" ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Mise en ligne…
            </>
          ) : publishState === "done" ? (
            <>
              <RefreshCw className="h-3.5 w-3.5" />
              Le site public est à jour.
            </>
          ) : (
            "Les modifications enregistrées apparaissent sur le site dans la minute."
          )}
        </p>
      </main>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      {children}
    </div>
  );
}
