# 4L Trophy - Site Vitrine

Site vitrine moderne et élégant pour un équipage participant au 4L Trophy.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## ⚡ Mise en place rapide des images

**📸 9 images à ajouter pour rendre le site opérationnel :**

Consultez **[QUICK_START_IMAGES.md](QUICK_START_IMAGES.md)** pour le guide complet.

Résumé :
1. Placez vos images dans `public/images/` (voir structure ci-dessous)
2. Respectez les noms et dimensions indiqués
3. Redémarrez le serveur : `npm run dev`

✅ Documentation : 
- **Guide rapide** : `QUICK_START_IMAGES.md`
- **Migration détaillée** : `MIGRATION_IMAGES.md`
- **Guide images** : `public/images/README.md`

## 🎨 Personnalisation

### Images
Toutes les images sont maintenant locales. Placez vos images dans :
```
public/images/
├── hero/desert-hero.jpg          (1920x1080px)
├── team/thomas.jpg & marie.jpg   (400x400px)
├── car/4l-main.jpg & desert-background.jpg
└── blog/*.jpg                    (600x400px)
```

Consultez `public/images/README.md` pour les détails complets.

### Équipage
Personnalisez les membres de l'équipe dans :
```
src/components/Equipage.tsx
```

### Partenaires
Ajoutez vos logos de partenaires dans :
```
src/components/Partenaires.tsx
```

### Budget
Mettez à jour les montants et la progression dans :
```
src/components/Budget.tsx
```

### Actualités
Ajoutez vos articles dans :
```
src/components/Actualites.tsx
```

### Contact
Modifiez l'email et les liens réseaux sociaux dans :
```
src/components/Contact.tsx
src/components/Footer.tsx
```

## 🎨 Palette de couleurs

| Nom | Code | Usage |
|-----|------|-------|
| Sable clair | `#ECC9A1` | Accents, badges |
| Sable chaud | `#D8B08C` | Boutons secondaires |
| Terre rosée | `#CDA382` | Dégradés |
| Taupe désert | `#B49480` | Bordures |
| Brun doux | `#887974` | Textes secondaires |
| Brun foncé | `#4F3E35` | Titres, boutons |
| Crème | `#F7F1EA` | Fond principal |

## 📁 Structure du projet

```
src/
├── app/
│   ├── globals.css      # Styles globaux & Tailwind
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page d'accueil
└── components/
    ├── Header.tsx       # Navigation
    ├── Hero.tsx         # Section hero
    ├── Projet.tsx       # Présentation du projet
    ├── Equipage.tsx     # Membres de l'équipe
    ├── Trophy.tsx       # Le 4L Trophy
    ├── Preparation.tsx  # Préparation de la 4L
    ├── Soutenir.tsx     # Pourquoi nous soutenir
    ├── Partenaires.tsx  # Partenaires et offres
    ├── Budget.tsx       # Budget et objectif
    ├── Actualites.tsx   # Journal de bord
    ├── Contact.tsx      # Formulaire de contact
    ├── Footer.tsx       # Pied de page
    └── index.ts         # Exports
```

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Lucide React** - Icônes

## 📱 Responsive

Le site est entièrement responsive :
- Mobile (< 640px)
- Tablette (640px - 1024px)
- Desktop (> 1024px)

## 🚀 Déploiement

```bash
# Build de production
npm run build

# Démarrer en production
npm start
```

Compatible avec Vercel, Netlify, et tout hébergeur supportant Next.js.

---

Fait avec ❤️ pour le 4L Trophy
