"use client";

import { Wrench, Car, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";

const preparationSteps = [
  {
    icon: Car,
    title: "Acquisition",
    description: "Trouver notre 4L, vérifier son état général et réaliser l'achat.",
    status: "done",
  },
    {
    icon: CheckCircle2,
    title: "Homologation",
    description: "Préparation aux contrôles techniques et mise aux normes rallye.",
    status: "done",
  },
  {
    icon: Wrench,
    title: "Mécanique",
    description: "Révision complète : moteur, freins, suspension, transmission, électriques, etc.",
    status: "in-progress",
  },
  {
    icon: Clock,
    title: "Équipement",
    description: "Installation du matériel de sécurité, navigation et camping.",
    status: "pending",
  },
];

const statusConfig = {
  done: { label: "Terminé", class: "bg-green-100 text-green-700" },
  "in-progress": { label: "En cours", class: "bg-sand-light text-earth-dark" },
  pending: { label: "À venir", class: "bg-gray-100 text-gray-500" },
};

export default function Preparation() {
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
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image
                src="/images/car/4l-main.png"
                alt="Notre 4L en préparation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-dark/80 to-transparent p-6 z-10">
                <span className="font-display text-2xl text-cream">
                  Renault 4L - 1985
                </span>
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-2xl text-earth-dark mb-4">
                Notre Monture
              </h3>
              <p className="text-earth-brown leading-relaxed mb-4">
               Monique est une Renault 4 GTL de 1985, moteur Billancourt de 845 cm³. 
                Elle a parcouru 150 000 km dont un 4L Trophy en 2025, elle est également la première 4L Trophy à avoir été exposée au Mondial de l'auto.
              </p>
              <p className="text-earth-brown leading-relaxed">
                Nous la préparons avec amour : révision complète de la mécanique, 
                 protection du dessous de caisse... 
                Elle sera prête à affronter le désert !
              </p>
            </div>
          </div>

          {/* Preparation Steps */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-earth-dark mb-6">
              Étapes de préparation
            </h3>
            
            {preparationSteps.map((step, index) => (
              <div
                key={step.title}
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
                  <step.icon className={`w-6 h-6 ${
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
                      statusConfig[step.status as keyof typeof statusConfig].class
                    }`}>
                      {statusConfig[step.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                  <p className="text-earth-brown text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Progress Bar */}
            <div className="mt-8 p-6 bg-white rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-earth-dark">
                  Progression globale
                </span>
                <span className="text-sm font-semibold text-earth-dark">60%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sand-warm to-earth-rose rounded-full transition-all duration-500"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
