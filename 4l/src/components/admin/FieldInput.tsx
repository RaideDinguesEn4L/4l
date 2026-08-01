"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase-browser";
import { MEDIA_BUCKET } from "@/lib/supabase-config";
import { STATUS_LABELS, type Field } from "@/lib/admin-schema";

const inputClass =
  "w-full rounded-xl border border-earth-taupe/30 bg-white px-4 py-2.5 text-earth-dark placeholder:text-earth-taupe/60 focus:border-earth-rose focus:outline-none focus:ring-2 focus:ring-earth-rose/20";

/** Nom de fichier sans accents ni espaces : le chemin finit dans une URL publique. */
function storageKey(folder: string, filename: string) {
  const clean = filename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.]+/g, "-")
    .toLowerCase();
  return `${folder}/${Date.now()}-${clean}`;
}

function ImageInput({
  value,
  folder,
  onChange,
}: {
  value: string;
  folder: string;
  onChange: (value: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    const path = storageKey(folder, file.name);
    const { error: uploadError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(path, file, { cacheControl: "31536000", upsert: false });

    if (uploadError) {
      setError(uploadError.message);
    } else {
      const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
    }
    setBusy(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-earth-taupe/30 bg-cream">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- aperçu d'admin, dimensions inconnues
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-earth-taupe">
              <ImagePlus className="h-6 w-6" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-earth-dark px-4 py-2 text-sm font-medium text-cream transition hover:bg-earth-brown disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="h-4 w-4" />
              )}
              {value ? "Remplacer" : "Choisir une image"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-2 rounded-full border border-earth-taupe/40 px-4 py-2 text-sm text-earth-brown transition hover:bg-cream"
              >
                <Trash2 className="h-4 w-4" />
                Retirer
              </button>
            )}
          </div>

          {/* Le champ reste éditable : certaines images historiques sont des
              chemins `/images/...` livrés avec le site, pas des envois. */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/… ou https://…"
            className={`${inputClass} text-xs`}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">Envoi impossible : {error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export default function FieldInput({
  field,
  value,
  folder,
  onChange,
}: {
  field: Field;
  value: unknown;
  folder: string;
  onChange: (value: unknown) => void;
}) {
  const text = value == null ? "" : String(value);

  const control = (() => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            value={text}
            rows={4}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClass} resize-y`}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={text}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
            className={inputClass}
          />
        );

      case "boolean":
        return (
          <label className="inline-flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              className="h-5 w-5 rounded border-earth-taupe/40 text-earth-rose focus:ring-earth-rose/30"
            />
            <span className="text-earth-brown">{field.label}</span>
          </label>
        );

      case "select":
        return (
          <select
            value={text}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          >
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {STATUS_LABELS[option] ?? option}
              </option>
            ))}
          </select>
        );

      case "image":
        return <ImageInput value={text} folder={folder} onChange={onChange} />;

      case "date":
        return (
          <input
            type="date"
            value={text.slice(0, 10)}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        );

      default:
        return (
          <input
            type={field.type === "url" ? "url" : "text"}
            value={text}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        );
    }
  })();

  return (
    <div className="space-y-1.5">
      {/* La case à cocher porte déjà son libellé. */}
      {field.type !== "boolean" && (
        <label className="block text-sm font-medium text-earth-dark">
          {field.label}
          {field.required && <span className="text-earth-rose"> *</span>}
        </label>
      )}
      {control}
      {field.hint && <p className="text-xs text-earth-taupe">{field.hint}</p>}
    </div>
  );
}
