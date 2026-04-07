"use client";

import { Heart, Mountain, Users } from "lucide-react";

export default function Projet() {
  return (
    <section id="projet" className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Le Projet</h2>
          <p className="section-subtitle mx-auto">
            Plus qu&apos;une simple course, une aventure humaine portée par des valeurs
            de solidarité, de dépassement de soi et de partage.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-earth-brown text-lg leading-relaxed">
              Le 17 Février 2027, nous prendrons le départ du <strong className="text-earth-dark">4L Trophy</strong>, 
              le plus grand rallye humanitaire d&apos;Europe. Notre objectif : 
              parcourir plus de 6000 km en Renault 4L, traverser la France, l&apos;Espagne, 
              et le Maroc jusqu&apos;au cœur du désert.
            </p>
            <p className="text-earth-brown text-lg leading-relaxed">
              Mais au-delà du défi sportif, cette aventure est avant tout 
              <strong className="text-earth-dark"> solidaire</strong>. Chaque équipage transporte 
              du matériel scolaire, sportif et alimentaire destiné aux enfants des régions 
              les plus reculées du Maroc.
            </p>
            <p className="text-earth-brown text-lg leading-relaxed">
              C'est porté par notre passion de <strong className="text-earth-dark">voyage</strong>, 
              de <strong className="text-earth-dark">rencontre </strong>
              et de <strong className="text-earth-dark">challenge</strong> que nous traverserons ce désert avec vous.
            </p>
          </div>

          {/* Values Cards */}
          <div className="space-y-6">
            <div className="card flex items-start gap-5">
              <div className="p-3 bg-sand-light rounded-2xl">
                <Mountain className="w-7 h-7 text-earth-dark" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-earth-dark mb-2">L&apos;Aventure</h3>
                <p className="text-earth-brown">
                  6000 km de routes et de pistes, du bitume français aux dunes 
                  du Sahara. Un défi mécanique et humain unique.
                </p>
              </div>
            </div>

            <div className="card flex items-start gap-5">
              <div className="p-3 bg-sand-light rounded-2xl">
                <Heart className="w-7 h-7 text-earth-dark" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-earth-dark mb-2">La Solidarité</h3>
                <p className="text-earth-brown">
                  Des fournitures scolaires, du matériel sportif et alimentaire acheminés 
                  aux enfants des villages isolés du Maroc.
                </p>
              </div>
            </div>

            <div className="card flex items-start gap-5">
              <div className="p-3 bg-sand-light rounded-2xl">
                <Users className="w-7 h-7 text-earth-dark" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-earth-dark mb-2">Le Partage</h3>
                <p className="text-earth-brown">
                  Une communauté de 1200 équipages animés par les mêmes valeurs 
                  et la même envie de faire la différence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
