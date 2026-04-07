"use client";

import { Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";

// Images locales dans public/images/blog/
const articles = [
  {
    date: "Février 2026",
    title: "La 4L est trouvée !",
    excerpt:
      "Après des semaines de recherche, nous avons enfin trouvé notre compagnon de route : une magnifique 4L GTL de 1985.",
    image: "/images/blog/acquisition2.jpeg",
    tag: "Acquisition",
  },
  {
    date: "Mars 2026",
    title: "Début de la préparation mécanique",
    excerpt:
      "Premier tour du moteur réalisé ! Recherche de problèmes de démarrage à chaud, réparation des problèmes électriques...",
    image: "/images/blog/mecanique2.jpeg",
    tag: "Mécanique",
  } /*,
  {
    date: "15 Octobre 2024",
    title: "Nos premiers partenaires",
    excerpt:
      "Une grande nouvelle : nous sommes fiers d'annoncer nos premiers soutiens officiels ! Merci pour votre confiance.",
    image: "/images/blog/partenaires.jpg",
    tag: "Partenariat",
  },
  {
    date: "Février 2025",
    title: "Cap sur le départ !",
    excerpt:
      "Plus que quelques semaines avant le grand départ. Les derniers préparatifs battent leur plein.",
    image: "/images/blog/depart.jpg",
    tag: "Aventure",
  },*/
];

const tagColors: Record<string, string> = {
  Acquisition: "bg-green-100 text-green-700",
  Mécanique: "bg-blue-100 text-blue-700",
  Partenariat: "bg-purple-100 text-purple-700",
  Aventure: "bg-sand-light text-earth-dark",
};

export default function Actualites() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Journal de Bord</h2>
          <p className="section-subtitle mx-auto">
            Suivez les étapes de notre aventure, de la préparation jusqu&apos;au désert.
            Chaque moment compte dans cette belle histoire.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="card group overflow-hidden p-0 hover:shadow-lg"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      tagColors[article.tag] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {article.tag}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-earth-brown">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-earth-dark mb-3 group-hover:text-earth-rose transition-colors">
                  {article.title}
                </h3>

                <p className="text-earth-brown mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

              
              </div>
            </article>
          ))}
        </div>

        {/* Timeline Preview */}
        <div className="mt-16 text-center">
          <p className="text-earth-brown mb-2">Prochaine étape</p>
          <p className="font-display text-3xl text-earth-dark">
            Départ du 4L Trophy — Février 2027
          </p>
        </div>
      </div>
    </section>
  );
}
