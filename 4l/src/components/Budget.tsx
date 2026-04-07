"use client";

import { Car, FileCheck, Fuel, Package, Award, Tent, Heart, MessageCircle } from "lucide-react";

// URL HelloAsso - À PERSONNALISER
const HELLO_ASSO_URL = "https://www.helloasso.com/associations/votre-cagnotte";

const budgetItems = [
  {
    icon: Award,
    label: "Inscription au rallye",
    amount: 3540,
    description: "Frais d'inscription officielle au 4L Trophy",
  },
  {
    icon: Car,
    label: "Achat de la 4L",
    amount: 6000,
    description: "Acquisition du véhicule",
  },
  {
    icon: FileCheck,
    label: "Préparation mécanique",
    amount: 1000,
    description: "Révision complète et modifications",
  },
  {
    icon: Fuel,
    label: "Carburant",
    amount: 1000,
    description: "Essence pour 6000 km",
  },
  {
    icon: Tent,
    label: "Équipement",
    amount: 700,
    description: "Matériel de camping, navigation, sécurité",
  }
];

const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
const collectedAmount = 3000; // À modifier selon l'avancement

export default function Budget() {
  const progressPercentage = Math.round((collectedAmount / totalBudget) * 100);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Budget & Objectif</h2>
          <p className="section-subtitle mx-auto">
            Un projet d&apos;envergure qui nécessite un budget conséquent. 
            Voici comment vos contributions nous aident à réaliser ce rêve.
          </p>
        </div>

        {/* Progress Section */}
        <div className="card mb-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="font-display text-5xl md:text-6xl text-earth-dark">
                {collectedAmount.toLocaleString()}€
              </span>
              <span className="text-earth-brown text-xl">
                / {totalBudget.toLocaleString()}€
              </span>
            </div>
            
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-sand-warm via-earth-rose to-earth-taupe rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            <p className="text-earth-brown">
              <span className="font-semibold text-earth-dark">{progressPercentage}%</span> de notre objectif atteint
            </p>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div>
          <h3 className="font-display text-2xl text-earth-dark text-center mb-8">
            Répartition du budget
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetItems.map((item) => (
              <div key={item.label} className="card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sand-light rounded-xl">
                    <item.icon className="w-6 h-6 text-earth-dark" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-earth-dark">
                        {item.label}
                      </h4>
                      <span className="font-display text-xl text-earth-rose">
                        {item.amount}€
                      </span>
                    </div>
                    <p className="text-sm text-earth-brown">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <a 
            href={HELLO_ASSO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Faire un don
          </a>
          <a 
            href="#contact" 
            className="btn-secondary inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Devenir partenaire
          </a>
        </div>
      </div>
    </section>
  );
}
