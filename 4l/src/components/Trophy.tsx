"use client";

import { MapPin, Calendar, Flag, Award } from "lucide-react";
import Image from "next/image";

const stats = [
  { icon: MapPin, value: "6000+", label: "Kilomètres" },
  { icon: Calendar, value: "10", label: "Jours d'aventure" },
  { icon: Flag, value: "3", label: "Pays traversés" },
  { icon: Award, value: "1200+", label: "Équipages" },
];

export default function Trophy() {
  return (
    <section id="trophy" className="relative section-padding overflow-hidden bg-earth-dark">
      {/* Background Image avec overlay sombre */}
      <Image
        src="/images/car/desert-background.jpg"
        alt="Désert"
        fill
        className="object-cover opacity-20 z-0"
        sizes="100vw"
      />
      
      {/* Gradient overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-earth-dark/70 via-earth-brown/60 to-earth-taupe/70 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-cream drop-shadow-lg">Le 4L Trophy</h2>
          <p className="section-subtitle mx-auto text-cream/95">
            Le plus grand rallye humanitaire d&apos;Europe, 
            une aventure qui change des vies depuis bientôt 30 ans !
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-cream text-lg leading-relaxed">
              Créé en 1997, le <strong className="text-sand-light">4L Trophy </strong> est bien plus 
              qu&apos;un simple rallye. C&apos;est une aventure humaine unique qui réunit chaque 
              année des milliers d&apos; de participants venus de toute l&apos;Europe.
            </p>
            <p className="text-cream text-lg leading-relaxed">
              L&apos;itinéraire traverse la France, l&apos;Espagne et le Maroc jusqu&apos;aux portes 
              du désert. Mais l&apos;essentiel n&apos;est pas d&apos;arriver le premier, c&apos;est 
              d&apos;arriver ensemble, avec un coffre rempli de fournitures pour les enfants.
            </p>
            <p className="text-cream text-lg leading-relaxed">
              Orientation au roadbook et à la boussole, bivouacs sous les étoiles, 
              traversées de dunes... une expérience inoubliable.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-md rounded-3xl text-center p-6 border-2 border-sand-light/30 hover:border-sand-light/50 hover:bg-white/15 transition-all duration-300 shadow-xl"
              >
                <stat.icon className="w-8 h-8 text-sand-light mx-auto mb-4 drop-shadow-md" />
                <div className="font-display text-4xl md:text-5xl text-cream mb-2 drop-shadow-md">
                  {stat.value}
                </div>
                <div className="text-cream text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-center max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-sand-light/20">
          <p className="font-display text-3xl md:text-4xl text-cream mb-4 italic drop-shadow-lg">
            &ldquo;L&apos;aventure commence là où la route s&apos;arrête&rdquo;
          </p>
          <cite className="text-sand-light text-sm font-medium">— Devise du 4L Trophy</cite>
        </blockquote>
      </div>
    </section>
  );
}
