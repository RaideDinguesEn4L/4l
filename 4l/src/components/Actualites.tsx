"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import { TAG_COLORS, type Post } from "@/lib/content-types";

type Props = {
  posts: Post[];
  nextStep: string;
};

export default function Actualites({ posts, nextStep }: Props) {
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
          {posts.map((post) => (
            <article
              key={post.id}
              className="card group overflow-hidden p-0 hover:shadow-lg"
            >
              {/* Image */}
              {post.image_url && (
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      TAG_COLORS[post.tag] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-earth-brown">
                    <Calendar className="w-4 h-4" />
                    {post.date_label}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-earth-dark mb-3 group-hover:text-earth-rose transition-colors">
                  {post.title}
                </h3>

                <p className="text-earth-brown mb-4 whitespace-pre-line">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Timeline Preview */}
        {nextStep && (
          <div className="mt-16 text-center">
            <p className="text-earth-brown mb-2">Prochaine étape</p>
            <p className="font-display text-3xl text-earth-dark">{nextStep}</p>
          </div>
        )}
      </div>
    </section>
  );
}
