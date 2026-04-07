"use client";

import Image from "next/image";

// Images locales dans public/images/team/
const teamMembers = [
  {
    name: "Théo",
    role: "Pilote",
    bio: "Passionné de voiture, de voyage et de sport, le 4L Trophy va me permettre de réunir ces 3 passions et de découvrir l'humanitaire.",
    image: "/images/team/theo2.png",
  },
  {
    name: "Léa",
    role: "Co-pilote & Navigation",
    bio: "Passionnée de voyage et rêvant de réaliser une action humanitaire, c'est le moment pour apporter mon aide.",
    image: "/images/team/Lea.JPG",
  },
];

export default function Equipage() {
  return (
    <section id="equipage" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">L&apos;Équipage</h2>
          <p className="section-subtitle mx-auto">
            Deux personnalités complémentaires
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group relative bg-cream rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="inline-block px-4 py-1 bg-sand-light text-earth-dark text-sm font-medium rounded-full mb-3">
                  {member.role}
                </span>
                <h3 className="font-display text-3xl text-earth-dark mb-3">
                  {member.name}
                </h3>
                <p className="text-earth-brown leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Decorative Element */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${
                  index === 0 ? "bg-sand-warm" : "bg-earth-rose"
                } opacity-20 rounded-bl-[100px]`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
