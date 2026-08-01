"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle } from "lucide-react";
import CountUp from "./CountUp";
import { iconFor } from "@/lib/icons";
import type { BudgetItem } from "@/lib/content-types";

type Props = {
  items: BudgetItem[];
  collectedAmount: number;
  helloAssoUrl: string;
};

export default function Budget({ items, collectedAmount, helloAssoUrl }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // L'objectif est la somme des postes saisis dans l'admin : ajouter une ligne
  // de budget déplace la cible, on ne le saisit pas deux fois.
  const totalBudget = items.reduce((sum, item) => sum + item.amount, 0);
  const progressPercentage =
    totalBudget > 0 ? Math.round((collectedAmount / totalBudget) * 100) : 0;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // La barre se remplit quand elle entre dans le viewport
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
                <CountUp end={collectedAmount} suffix="€" />
              </span>
              <span className="text-earth-brown text-xl" suppressHydrationWarning>
                / {isClient ? totalBudget.toLocaleString("fr-FR") : totalBudget}€
              </span>
            </div>

            <div ref={barRef} className="h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-sand-warm via-earth-rose to-earth-taupe rounded-full transition-all duration-[1500ms] ease-out"
                style={{ width: barVisible ? `${progressPercentage}%` : "0%" }}
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
            {items.map((item) => {
              const Icon = iconFor(item.icon);
              return (
              <div key={item.id} className="card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sand-light rounded-xl">
                    <Icon className="w-6 h-6 text-earth-dark" />
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
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <a
            href={helloAssoUrl}
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
