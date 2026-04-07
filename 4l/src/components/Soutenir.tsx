"use client";

import { Eye, Share2, Heart, Users, Award, Megaphone } from "lucide-react";

const reasons = [
  {
    icon: Eye,
    title: "Visibilité",
    description:
      "Votre logo sur notre 4L, nos réseaux sociaux, notre site web et tous nos supports de communication pendant toute l'aventure.",
  },
  {
    icon: Share2,
    title: "Communication",
    description:
      "Partagez notre aventure avec votre communauté. Photos, vidéos et stories de notre périple à travers le désert.",
  },
  {
    icon: Heart,
    title: "Engagement solidaire",
    description:
      "Associez votre image à une cause humanitaire forte : l'éducation des enfants défavorisés au Maroc.",
  },
  {
    icon: Users,
    title: "Réseau",
    description:
      "Rejoignez une communauté de partenaires engagés aux côtés des 2400 participants du 4L Trophy.",
  },
  {
    icon: Award,
    title: "Valeurs positives",
    description:
      "Aventure, dépassement de soi, solidarité, entraide... Des valeurs importantes pour nous.",
  },
  {
    icon: Megaphone,
    title: "Retombées médiatiques",
    description:
      "Le 4L Trophy bénéficie d'une couverture médiatique importante : TV, presse, réseaux sociaux.",
  },
];

export default function Soutenir() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Pourquoi nous soutenir ?</h2>
          <p className="section-subtitle mx-auto">
            Devenir partenaire de notre équipage, c&apos;est bien plus qu&apos;un simple sponsoring.
            C&apos;est participer à une aventure humaine exceptionnelle.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="card group hover:bg-earth-dark transition-colors duration-500"
            >
              <div className="p-4 bg-sand-light rounded-2xl w-fit mb-6 group-hover:bg-sand-warm transition-colors duration-500">
                <reason.icon className="w-8 h-8 text-earth-dark" />
              </div>
              <h3 className="font-display text-2xl text-earth-dark group-hover:text-cream mb-3 transition-colors duration-500">
                {reason.title}
              </h3>
              <p className="text-earth-brown group-hover:text-cream/80 transition-colors duration-500">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-earth-brown text-lg mb-6">
            Vous souhaitez rejoindre l&apos;aventure à nos côtés ?
          </p>
          <a href="#contact" className="btn-primary">
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
}
