-- Raid Dingues en 4L — contenu éditable du site vitrine.
--
-- Tout ce que l'équipage met à jour au fil du projet (journal de bord,
-- partenaires, budget, équipage, préparation) vit ici plutôt qu'en dur dans les
-- composants. Le site reste lisible par tout le monde : lecture PUBLIQUE (rôle
-- anon), écriture réservée aux emails listés dans `l4_admins`.
--
-- Idempotent (IF NOT EXISTS / drop policy if exists) : rejouable sans risque.

-- ── Journal de bord (les « publications ») ────────────────────────────
create table if not exists l4_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  -- Texte libre (« Février 2026 ») et non une date : l'équipage publie souvent
  -- au mois, et `published_on` sert uniquement à trier.
  date_label text not null default '',
  published_on date not null default current_date,
  excerpt text not null default '',
  image_url text,
  tag text not null default 'Aventure',
  published boolean not null default true,
  deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Partenaires ───────────────────────────────────────────────────────
create table if not exists l4_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  url text,
  sort_order int not null default 0,
  deleted boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Postes de budget ──────────────────────────────────────────────────
create table if not exists l4_budget_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  amount int not null default 0,       -- euros, entiers
  description text not null default '',
  icon text not null default 'Package', -- nom lucide, restreint côté code
  sort_order int not null default 0,
  deleted boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Équipage ──────────────────────────────────────────────────────────
create table if not exists l4_crew (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  bio text not null default '',
  image_url text,
  sort_order int not null default 0,
  deleted boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Étapes de préparation ─────────────────────────────────────────────
create table if not exists l4_prep_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  status text not null default 'pending' check (status in ('done', 'in-progress', 'pending')),
  icon text not null default 'Wrench',
  sort_order int not null default 0,
  deleted boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Réglages ponctuels (compteurs, textes uniques) ────────────────────
-- Une table clé/valeur plutôt qu'une table par chiffre : ces valeurs n'ont ni
-- relation ni historique, et l'écran d'admin les affiche toutes ensemble.
create table if not exists l4_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- ── Admins ────────────────────────────────────────────────────────────
create table if not exists l4_admins (
  email text primary key,
  label text,
  created_at timestamptz not null default now()
);

-- security definer : la fonction lit l4_admins en contournant sa propre RLS,
-- sinon les policies d'écriture ne pourraient jamais voir la ligne.
create or replace function l4_is_admin() returns boolean
  language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from l4_admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ── RLS : lecture publique, écriture admin ────────────────────────────
alter table l4_posts        enable row level security;
alter table l4_partners     enable row level security;
alter table l4_budget_items enable row level security;
alter table l4_crew         enable row level security;
alter table l4_prep_steps   enable row level security;
alter table l4_settings     enable row level security;
alter table l4_admins       enable row level security;

do $$
declare t text;
begin
  foreach t in array array['l4_posts', 'l4_partners', 'l4_budget_items',
                           'l4_crew', 'l4_prep_steps', 'l4_settings'] loop
    execute format('drop policy if exists %I_read on %I', t, t);
    execute format('create policy %I_read on %I for select using (true)', t, t);

    execute format('drop policy if exists %I_admin_insert on %I', t, t);
    execute format('create policy %I_admin_insert on %I for insert with check (l4_is_admin())', t, t);

    execute format('drop policy if exists %I_admin_update on %I', t, t);
    execute format('create policy %I_admin_update on %I for update using (l4_is_admin()) with check (l4_is_admin())', t, t);
  end loop;
end $$;

-- Un utilisateur connecté peut vérifier s'il est admin (il ne voit que sa ligne).
drop policy if exists l4_admins_self on l4_admins;
create policy l4_admins_self on l4_admins
  for select using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- Pas de DELETE : soft-delete via la colonne `deleted` (l4_settings mis à part,
-- dont les clés sont fixées par le code).
grant usage on schema public to anon, authenticated;
grant select on l4_posts, l4_partners, l4_budget_items, l4_crew, l4_prep_steps, l4_settings
  to anon, authenticated;
grant insert, update on l4_posts, l4_partners, l4_budget_items, l4_crew, l4_prep_steps, l4_settings
  to authenticated;
grant select on l4_admins to authenticated;

-- ── Stockage des images (logos, photos d'articles, portraits) ─────────
insert into storage.buckets (id, name, public)
  values ('l4-media', 'l4-media', true)
  on conflict (id) do update set public = true;

drop policy if exists l4_media_read on storage.objects;
create policy l4_media_read on storage.objects
  for select using (bucket_id = 'l4-media');

drop policy if exists l4_media_admin_insert on storage.objects;
create policy l4_media_admin_insert on storage.objects
  for insert with check (bucket_id = 'l4-media' and l4_is_admin());

drop policy if exists l4_media_admin_update on storage.objects;
create policy l4_media_admin_update on storage.objects
  for update using (bucket_id = 'l4-media' and l4_is_admin());

drop policy if exists l4_media_admin_delete on storage.objects;
create policy l4_media_admin_delete on storage.objects
  for delete using (bucket_id = 'l4-media' and l4_is_admin());
