-- Reprise du contenu qui était en dur dans les composants (état du 2026-07-26).
--
-- Les `image_url` pointent sur `/images/...` : ces fichiers sont versionnés dans
-- `public/` et embarqués dans l'image Docker. Les images ajoutées depuis l'admin
-- seront, elles, des URLs absolues vers le bucket `l4-media`. Les deux formes
-- cohabitent (cf. `remotePatterns` dans next.config.mjs).
--
-- Idempotent : ne réinsère rien si la table contient déjà quelque chose.

-- ── Journal de bord ───────────────────────────────────────────────────
insert into l4_posts (title, date_label, published_on, excerpt, image_url, tag)
select * from (values
  ('La 4L est trouvée !', 'Février 2026', date '2026-02-01',
   'Après des semaines de recherche, nous avons enfin trouvé notre compagnon de route : une magnifique 4L GTL de 1985.',
   '/images/blog/acquisition2.jpeg', 'Acquisition'),
  ('Début de la préparation mécanique', 'Mars 2026', date '2026-03-01',
   'Premier tour du moteur réalisé ! Recherche de problèmes de démarrage à chaud, réparation des problèmes électriques...',
   '/images/blog/mecanique2.jpeg', 'Mécanique')
) as v(title, date_label, published_on, excerpt, image_url, tag)
where not exists (select 1 from l4_posts);

-- ── Partenaires ───────────────────────────────────────────────────────
insert into l4_partners (name, logo_url, url, sort_order)
select * from (values
  ('Nantiat', '/images/partenaires/nantiat.jpeg',
   'https://www.instagram.com/uexpressnantiat?igsh=c3hhaTc4dDN1eGM2', 1),
  ('Laserdistri service 2', '/images/partenaires/laserdistri_service.jpeg',
   'https://www.instagram.com/laserdistri.service?igsh=a21yYno1MDRndHdl', 2),
  ('Eco Vidange', '/images/partenaires/eco_vidange.jpeg',
   'https://ecovidange-nouvelle-aquitaine-87.fr/', 3)
) as v(name, logo_url, url, sort_order)
where not exists (select 1 from l4_partners);

-- ── Budget ────────────────────────────────────────────────────────────
insert into l4_budget_items (label, amount, description, icon, sort_order)
select * from (values
  ('Inscription au rallye', 3540, 'Frais d''inscription officielle au 4L Trophy', 'Award', 1),
  ('Achat de la 4L', 6000, 'Acquisition du véhicule', 'Car', 2),
  ('Préparation mécanique', 1000, 'Révision complète et modifications', 'FileCheck', 3),
  ('Carburant', 1000, 'Essence pour 6000 km', 'Fuel', 4),
  ('Équipement', 700, 'Matériel de camping, navigation, sécurité', 'Tent', 5)
) as v(label, amount, description, icon, sort_order)
where not exists (select 1 from l4_budget_items);

-- ── Équipage ──────────────────────────────────────────────────────────
insert into l4_crew (name, role, bio, image_url, sort_order)
select * from (values
  ('Théo', 'Pilote',
   'Passionné de voiture, de voyage et de sport, le 4L Trophy va me permettre de réunir ces 3 passions et de découvrir l''humanitaire.',
   '/images/team/theo2.png', 1),
  ('Léa', 'Co-pilote & Navigation',
   'Passionnée de voyage et rêvant de réaliser une action humanitaire, c''est le moment pour apporter mon aide.',
   '/images/team/Lea.JPG', 2)
) as v(name, role, bio, image_url, sort_order)
where not exists (select 1 from l4_crew);

-- ── Étapes de préparation ─────────────────────────────────────────────
insert into l4_prep_steps (title, description, status, icon, sort_order)
select * from (values
  ('Acquisition', 'Trouver notre 4L, vérifier son état général et réaliser l''achat.', 'done', 'Car', 1),
  ('Homologation', 'Préparation aux contrôles techniques et mise aux normes rallye.', 'done', 'CheckCircle2', 2),
  ('Mécanique', 'Révision complète : moteur, freins, suspension, transmission, électriques, etc.', 'in-progress', 'Wrench', 3),
  ('Équipement', 'Installation du matériel de sécurité, navigation et camping.', 'pending', 'Clock', 4)
) as v(title, description, status, icon, sort_order)
where not exists (select 1 from l4_prep_steps);

-- ── Réglages ──────────────────────────────────────────────────────────
insert into l4_settings (key, value) values
  ('budget_collected', '3000'),
  ('helloasso_url', 'https://www.helloasso.com/associations/raid-dingues-en-4l/formulaires/2'),
  ('posts_next_step', 'Départ du 4L Trophy — Février 2027'),
  ('prep_progress', '60'),
  ('prep_car_image', '/images/car/4l-main.png'),
  ('prep_car_caption', 'Renault 4L - 1985'),
  ('prep_car_title', 'Notre Monture'),
  ('prep_car_text', 'Monique est une Renault 4 GTL de 1985, moteur Billancourt de 845 cm³. Elle a parcouru 150 000 km dont un 4L Trophy en 2025, elle est également la première 4L Trophy à avoir été exposée au Mondial de l''auto.

Nous la préparons avec amour : révision complète de la mécanique, protection du dessous de caisse... Elle sera prête à affronter le désert !')
on conflict (key) do nothing;
