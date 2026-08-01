"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase-browser";
import type { Collection } from "@/lib/admin-schema";
import FieldInput from "./FieldInput";

type Row = Record<string, unknown> & { id?: string };

/**
 * Écran générique de liste éditable, piloté par un descripteur de `COLLECTIONS`.
 *
 * Les lignes sont repliées par défaut et on n'en édite qu'une à la fois : sur
 * téléphone (là où l'équipage publiera le plus souvent), cinq formulaires
 * dépliés seraient illisibles.
 */
export default function CollectionEditor({
  collection,
  onSaved,
}: {
  collection: Collection;
  onSaved: () => void;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase.from(collection.table).select("*").eq("deleted", false);
    for (const { column, ascending } of collection.orderBy) {
      query = query.order(column, { ascending });
    }
    const { data, error: err } = await query;

    if (err) setError(err.message);
    else {
      setError(null);
      setRows((data ?? []) as Row[]);
    }
    setLoading(false);
  }, [collection]);

  useEffect(() => {
    setOpenId(null);
    setDraft(null);
    load();
  }, [load]);

  const titleField =
    collection.fields.find((f) => f.isTitle)?.name ?? collection.fields[0].name;

  const startEdit = (row: Row) => {
    setOpenId(String(row.id));
    setDraft({ ...row });
  };

  const startCreate = () => {
    // Une nouvelle ligne se range en fin de liste.
    const nextOrder = collection.sortable
      ? Math.max(0, ...rows.map((r) => Number(r.sort_order) || 0)) + 1
      : 0;
    setOpenId("new");
    setDraft({ ...collection.blank, sort_order: nextOrder });
  };

  const save = async () => {
    if (!draft) return;

    // Contrôle des champs obligatoires ici plutôt qu'en laissant Postgres
    // refuser : un « null value violates not-null constraint » ne dit rien à
    // l'équipage.
    const missing = collection.fields
      .filter((f) => f.required && String(draft[f.name] ?? "").trim() === "")
      .map((f) => f.label);
    if (missing.length > 0) {
      setError(`À remplir avant d'enregistrer : ${missing.join(", ")}.`);
      return;
    }

    setSaving(true);
    setError(null);

    const { id, ...values } = draft;
    for (const field of collection.fields) {
      // Un champ image vidé doit devenir NULL, pas la chaîne vide : le rendu
      // public teste la présence de l'URL pour masquer le bloc.
      if (field.type === "image" && values[field.name] === "") {
        values[field.name] = null;
      }
      // Un champ nombre effacé vaut zéro (la colonne est `not null`).
      if (field.type === "number" && values[field.name] === "") {
        values[field.name] = 0;
      }
    }
    if (!collection.sortable) delete values.sort_order;

    const query = id
      ? supabase.from(collection.table).update(values).eq("id", id)
      : supabase.from(collection.table).insert(values);

    const { error: err } = await query;
    setSaving(false);

    if (err) {
      setError(err.message);
      return;
    }
    setOpenId(null);
    setDraft(null);
    await load();
    onSaved();
  };

  const remove = async (row: Row) => {
    const label = String(row[titleField] ?? "cet élément");
    if (!confirm(`Supprimer « ${label} » ? Il disparaîtra du site.`)) return;

    // Soft-delete : la ligne reste en base, récupérable en SQL si besoin.
    const { error: err } = await supabase
      .from(collection.table)
      .update({ deleted: true })
      .eq("id", row.id);

    if (err) setError(err.message);
    else {
      await load();
      onSaved();
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;

    // On échange les `sort_order` des deux voisins plutôt que de renuméroter
    // toute la liste : deux UPDATE, quel que soit le nombre de lignes.
    const a = rows[index];
    const b = rows[target];
    const orderA = Number(a.sort_order) || 0;
    const orderB = Number(b.sort_order) || 0;

    setRows((current) => {
      const next = [...current];
      next[index] = b;
      next[target] = a;
      return next;
    });

    const results = await Promise.all([
      supabase.from(collection.table).update({ sort_order: orderB }).eq("id", a.id),
      supabase.from(collection.table).update({ sort_order: orderA }).eq("id", b.id),
    ]);
    const failed = results.find((r) => r.error);
    if (failed?.error) setError(failed.error.message);
    await load();
    onSaved();
  };

  const editor = (row: Row | null) => (
    <div className="space-y-5 border-t border-earth-taupe/20 bg-cream/40 p-5">
      {collection.fields.map((field) => (
        <FieldInput
          key={field.name}
          field={field}
          value={draft?.[field.name]}
          folder={collection.key}
          onChange={(value) =>
            setDraft((current) => ({ ...(current ?? {}), [field.name]: value }))
          }
        />
      ))}

      <div className="flex flex-wrap items-center gap-3 pt-1">
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
        <button
          type="button"
          onClick={() => {
            setOpenId(null);
            setDraft(null);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-earth-taupe/40 px-5 py-2.5 text-sm text-earth-brown transition hover:bg-white"
        >
          <X className="h-4 w-4" />
          Annuler
        </button>
        {row?.id && (
          <button
            type="button"
            onClick={() => remove(row)}
            className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-3xl text-earth-dark">{collection.title}</h2>
        <p className="mt-1 text-sm text-earth-brown">{collection.description}</p>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {loading ? (
        <div className="flex items-center gap-2 py-8 text-earth-brown">
          <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((row, index) => (
            <div
              key={String(row.id)}
              className="overflow-hidden rounded-2xl border border-earth-taupe/25 bg-white"
            >
              <div className="flex items-center gap-2 p-4">
                {collection.sortable && (
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label="Monter"
                      className="rounded p-1 text-earth-taupe transition hover:bg-cream hover:text-earth-dark disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === rows.length - 1}
                      aria-label="Descendre"
                      className="rounded p-1 text-earth-taupe transition hover:bg-cream hover:text-earth-dark disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    openId === String(row.id) ? setOpenId(null) : startEdit(row)
                  }
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <span className="flex-1 font-medium text-earth-dark">
                    {String(row[titleField] || "(sans titre)")}
                    {row.published === false && (
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-500">
                        brouillon
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-earth-taupe transition-transform ${
                      openId === String(row.id) ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {openId === String(row.id) && editor(row)}
            </div>
          ))}

          {openId === "new" ? (
            <div className="overflow-hidden rounded-2xl border-2 border-dashed border-earth-rose/40 bg-white">
              <p className="p-4 font-medium text-earth-dark">{collection.addLabel}</p>
              {editor(null)}
            </div>
          ) : (
            <button
              type="button"
              onClick={startCreate}
              className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-earth-taupe/40 px-5 py-3 text-sm font-medium text-earth-brown transition hover:border-earth-rose hover:text-earth-rose"
            >
              <Plus className="h-4 w-4" />
              {collection.addLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
