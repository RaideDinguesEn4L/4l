"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase-browser";
import { SETTING_FIELDS } from "@/lib/admin-schema";
import { DEFAULT_SETTINGS } from "@/lib/content-defaults";
import FieldInput from "./FieldInput";

/**
 * Les valeurs uniques du site (compteurs, textes de la section « La 4L »).
 *
 * Un seul bouton « Enregistrer » pour tout l'écran : ce sont huit champs
 * indépendants qu'on relit d'un coup d'œil, pas des fiches à ouvrir une à une.
 */
export default function SettingsEditor({ onSaved }: { onSaved: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from("l4_settings")
      .select("key,value");

    if (err) {
      setError(err.message);
    } else {
      setError(null);
      // Une clé jamais enregistrée doit s'afficher avec sa valeur d'origine,
      // sinon on croit le champ vide et on l'écrase par du vide.
      const next: Record<string, string> = { ...DEFAULT_SETTINGS };
      for (const row of data ?? []) next[row.key] = row.value ?? "";
      setValues(next);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    setSaving(true);
    setError(null);

    const rows = SETTING_FIELDS.map((field) => ({
      key: field.name,
      value: String(values[field.name] ?? ""),
      updated_at: new Date().toISOString(),
    }));

    const { error: err } = await supabase.from("l4_settings").upsert(rows, {
      onConflict: "key",
    });
    setSaving(false);

    if (err) {
      setError(err.message);
      return;
    }
    setSavedAt(Date.now());
    onSaved();
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-3xl text-earth-dark">Réglages</h2>
        <p className="mt-1 text-sm text-earth-brown">
          Les chiffres et les textes qui n&apos;apparaissent qu&apos;une fois sur le site.
        </p>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {loading ? (
        <div className="flex items-center gap-2 py-8 text-earth-brown">
          <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
        </div>
      ) : (
        <div className="space-y-5 rounded-2xl border border-earth-taupe/25 bg-white p-5">
          {SETTING_FIELDS.map((field) => (
            <FieldInput
              key={field.name}
              field={field}
              value={values[field.name] ?? ""}
              folder="settings"
              onChange={(value) =>
                setValues((current) => ({
                  ...current,
                  [field.name]: value == null ? "" : String(value),
                }))
              }
            />
          ))}

          <div className="flex items-center gap-4 pt-1">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-earth-rose px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Enregistrer
            </button>
            {savedAt && !saving && (
              <span className="text-sm text-earth-brown">Réglages enregistrés.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
