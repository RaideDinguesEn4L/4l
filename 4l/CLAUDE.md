# CLAUDE.md — Raid Dingues en 4L

Site vitrine de l'équipage du **4L Trophy 2027** (Théo & Léa). Next.js 16 (App
Router) + Tailwind, servi par le conteneur Docker `4l-site` → `0.0.0.0:8081`,
derrière le Nginx de l'hôte sur **https://raid-dingues-en4l.fr** (et `www.`).

> ⚠️ Le dépôt git a sa racine dans `~/projects/4l/`, mais **le projet est dans
> le sous-dossier `4l/`** (`~/projects/4l/4l/`). Les fichiers de même nom à la
> racine sont des vestiges **vides** (0 octet) — ne pas les éditer, ils ne sont
> pas construits. Toutes les commandes ci-dessous se lancent depuis `~/projects/4l/4l/`.

## Les deux moitiés du site

1. **La page publique (`/`)** — une seule page, sections empilées (Hero, Projet,
   Équipage, Trophy, Préparation, Soutenir, Partenaires, Budget, Journal de
   bord, Contact).
2. **L'admin (`/admin`, connexion Google)** — met à jour ce que l'équipage fait
   évoluer au fil du projet, sans reconstruire l'image Docker.

## Ce qui est éditable, et ce qui ne l'est pas

| Section | Source | Table |
|---|---|---|
| Journal de bord | admin | `l4_posts` |
| Partenaires | admin | `l4_partners` |
| Budget (postes) | admin | `l4_budget_items` |
| Équipage | admin | `l4_crew` |
| Étapes de préparation | admin | `l4_prep_steps` |
| Compteurs & textes uniques | admin | `l4_settings` |
| Hero, Projet, Trophy, Soutenir, Contact, Footer | **en dur** dans les composants | — |

Les sections restées en dur sont des textes de présentation qui ne bougent pas
d'une saison à l'autre : les rendre éditables aurait rempli l'admin d'écrans
qu'on n'ouvre jamais.

### Réglages (`l4_settings`)

Table clé/valeur — ces valeurs n'ont ni relation ni historique, et l'écran
« Réglages » les montre toutes ensemble. Clés : `budget_collected`,
`prep_progress`, `posts_next_step`, `helloasso_url`, `prep_car_image`,
`prep_car_caption`, `prep_car_title`, `prep_car_text`.

- **L'objectif budgétaire ne se saisit pas** : c'est la somme des
  `l4_budget_items`. Ajouter un poste déplace la cible, sans double saisie.
- `helloasso_url` alimente **tous** les boutons « Faire un don » (Header, Hero,
  Partenaires, Budget) — d'où le passage en prop plutôt qu'une constante par
  fichier, qui laissait des boutons pointer sur l'ancienne cagnotte.

## Le contenu arrive par ISR, pas au build

`src/app/page.tsx` est un **composant serveur** qui appelle `getSiteContent()`
(`src/lib/content.ts`) et distribue le résultat en props. Les composants de
section restent `"use client"` (animations, compte à rebours) mais ne
connaissent plus leurs données.

- Lecture via **`fetch` sur l'API REST** de Supabase, pas `supabase-js` :
  `next: { revalidate }` s'y applique directement, donc la page reste
  **statique** et se régénère toute seule. `supabase-js` n'est chargé que dans
  l'admin, qui a besoin de l'auth.
- `export const revalidate = 60` dans `page.tsx` **doit** être un littéral (Next
  le lit sans exécuter le module) : le garder synchronisé avec
  `CONTENT_REVALIDATE_SECONDS`.
- Après un enregistrement, l'admin appelle `POST /api/revalidate` pour purger
  tout de suite le cache — sinon on attend une minute en se demandant si le
  clic a marché. **Autorisation** : la route rejoue le jeton de l'appelant sur
  `l4_admins`, dont la RLS ne renvoie une ligne qu'aux admins. Pas de secret
  supplémentaire à gérer.

> ⚠️ **Contenu de repli** (`src/lib/content-defaults.ts`) : si Supabase est
> injoignable, `getSiteContent()` log et sert le contenu d'origine. La page
> étant générée statiquement, une panne au mauvais moment figerait sinon des
> sections **vides** pour toute la durée du cache. Ce n'est pas la source de
> vérité — l'admin ne le modifie pas. Une liste **volontairement** vidée depuis
> l'admin reste vide : seule une *erreur réseau* déclenche le repli.

## Auth & droits

Même schéma que Metzemakers : **Google OAuth** via Supabase, liste blanche
d'emails dans `l4_admins`, **RLS Postgres** comme seule vraie barrière.

- L'écran `/admin` qui vérifie `isAdmin` n'est qu'un confort d'UI : Postgres
  refuse toute écriture (tables **et** bucket) à un email absent de `l4_admins`.
- Ajouter quelqu'un :
  `docker exec -i supabase-db psql -U supabase_admin -d postgres -c "insert into l4_admins (email, label) values ('x@gmail.com', 'Prénom');"`
- **Pas de DELETE** : soft-delete par la colonne `deleted`, donc une suppression
  malencontreuse se rattrape en SQL (`update … set deleted = false`).

> ⚠️ L'auth Supabase est **partagée par toutes les apps du serveur**. Les URLs
> `https://raid-dingues-en4l.fr[/**]` et `https://www.raid-dingues-en4l.fr[/**]`
> ont été ajoutées à `ADDITIONAL_REDIRECT_URLS`
> (`~/projects/supabase/supabase-src/docker/.env`) et le conteneur `auth`
> recréé — sans ça la connexion Google **atterrit sur Salle Comble** sans
> erreur. Cf. la section Supabase du `CLAUDE.md` racine.

## Images

Deux origines cohabitent, à dessein :

- **Historiques** : `public/images/…`, chemins relatifs, embarqués dans l'image
  Docker.
- **Déposées depuis l'admin** : bucket Supabase **`l4-media`** (public en
  lecture, écriture admin), URLs absolues. Le hostname est déclaré dans
  `next.config.mjs` (`remotePatterns`) — sans quoi `next/image` refuse de les
  servir.

Le champ URL reste éditable à la main sous le bouton d'envoi, justement pour
pouvoir désigner une image historique.

## L'admin est piloté par un descripteur

Les cinq collections se ressemblent (liste, formulaire, ordre) : plutôt que cinq
écrans copiés-collés, `CollectionEditor` lit `COLLECTIONS`
(`src/lib/admin-schema.ts`). **Ajouter un champ = une ligne dans le descripteur
+ une colonne dans la table**, aucun composant à toucher.

- Les lignes sont repliées et on n'en édite **qu'une à la fois** : l'équipage
  publiera surtout depuis un téléphone, où cinq formulaires dépliés seraient
  illisibles.
- Réordonner **échange les `sort_order` des deux voisins** (2 UPDATE), sans
  renuméroter toute la liste.
- Les icônes (budget, préparation) sont stockées **par nom** et résolues via la
  liste blanche `src/lib/icons.ts` : ça évite d'embarquer tout `lucide-react`
  dans le bundle, et un nom invalide ne casse pas le rendu.

## Développement & déploiement

```bash
cd ~/projects/4l/4l
npm run dev                    # http://localhost:3000
docker compose up -d --build   # reconstruit et redéploie (port 8081)
```

> ⚠️ **Node de l'hôte = v18**, trop ancien pour Next 16 : `next build` échoue en
> local (`Cannot find module '../../server/lib/lru-cache'`). Construire **dans
> Docker** (`node:22-alpine`), ce que fait `docker compose build`.

### Variables d'environnement

`.env.local` (chmod 600, hors git) — `NEXT_PUBLIC_SUPABASE_URL` et
`NEXT_PUBLIC_SUPABASE_ANON_KEY`.

> ⚠️ Les `NEXT_PUBLIC_*` sont **inlinées au build** : les changer impose un
> `--build`, un simple `restart` ne suffit pas. `.env.local` est donc
> volontairement **absent du `.dockerignore`** (même logique que `resto`). Le
> `env_file` du compose les repasse au runtime pour les routes serveur.

> ⚠️ Le `.dockerignore` exclut `node_modules` : sans lui, `COPY . .` écrasait
> l'installation propre de `npm ci` par celle de l'hôte (Node 18).

### Base de données

```bash
cd ~/projects/4l/4l
docker exec -i supabase-db psql -U supabase_admin -d postgres < supabase/migrations/0001_content.sql
docker exec -i supabase-db psql -U supabase_admin -d postgres < supabase/seed_initial_content.sql
```

Les deux sont **idempotents** ; le seed ne réinsère rien si la table contient
déjà des lignes.

_Dernière mise à jour : 2026-07-26._
