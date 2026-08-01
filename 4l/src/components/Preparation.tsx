"use client";

import Image from "next/image";
import { iconFor } from "@/lib/icons";
import { PREP_STATUS, type PrepStep, type Settings } from "@/lib/content-types";

type Props = {
  steps: PrepStep[];
  settings: Settings;
};

export default function Preparation({ steps, settings }: Props) {
  const progress = Number(settings.prep_progress) || 0;
  return (
    <section id="preparation" className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">La 4L & La Préparation</h2>
          <p className="section-subtitle mx-auto">
            Notre fidèle "Monique" à 4 roues. Une Renault 4L que nous préparons 
            avec soin pour affronter les 6000 km qui nous attendent.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Car Image & Description */}
          <div className="space-y-8">
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] bg-sand-light">
              {settings.prep_car_image && (
                <Image
                  src={settings.prep_car_image}
                  alt="Notre 4L en préparation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-dark/80 to-transparent p-6 z-10">
                <span className="font-display text-2xl text-cream">
                  {settings.prep_car_caption}
                </span>
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-2xl text-earth-dark mb-4">
                {settings.prep_car_title}
              </h3>
              {/* Un paragraphe par ligne vide dans le texte saisi. */}
              {settings.prep_car_text
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-earth-brown leading-relaxed mb-4 last:mb-0 whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          {/* Preparation Steps */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-earth-dark mb-6">
              Étapes de préparation
            </h3>
            
            {steps.map((step) => {
              const Icon = iconFor(step.icon);
              return (
              <div
                key={step.id}
                className={`card flex items-start gap-5 transition-all duration-300 ${
                  step.status === "in-progress" ? "ring-2 ring-sand-warm" : ""
                }`}
              >
                <div className={`p-3 rounded-2xl ${
                  step.status === "done"
                    ? "bg-green-100"
                    : step.status === "in-progress"
                    ? "bg-sand-light"
                    : "bg-gray-100"
                }`}>
                  <Icon className={`w-6 h-6 ${
                    step.status === "done"
                      ? "text-green-600"
                      : step.status === "in-progress"
                      ? "text-earth-dark"
                      : "text-gray-400"
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display text-xl text-earth-dark">
                      {step.title}
                    </h4>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      PREP_STATUS[step.status].class
                    }`}>
                      {PREP_STATUS[step.status].label}
                    </span>
                  </div>
                  <p className="text-earth-brown text-sm whitespace-pre-line">
                    {step.description}
                  </p>
                </div>
              </div>
              );
            })}

            {/* Progress Bar */}
            <div className="mt-8 p-6 bg-white rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-earth-dark">
                  Progression globale
                </span>
                <span className="text-sm font-semibold text-earth-dark">{progress}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sand-warm to-earth-rose rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
