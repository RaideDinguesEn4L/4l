"use client";

import Image from "next/image";
import type { CrewMember } from "@/lib/content-types";

type Props = {
  members: CrewMember[];
};

export default function Equipage({ members }: Props) {
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
          {members.map((member, index) => (
            <div
              key={member.id}
              className="group relative bg-cream rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative bg-sand-light">
                {member.image_url && (
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="inline-block px-4 py-1 bg-sand-light text-earth-dark text-sm font-medium rounded-full mb-3">
                  {member.role}
                </span>
                <h3 className="font-display text-3xl text-earth-dark mb-3">
                  {member.name}
                </h3>
                <p className="text-earth-brown leading-relaxed whitespace-pre-line">
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
