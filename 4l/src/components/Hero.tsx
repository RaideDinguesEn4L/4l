"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Calendar, Heart } from "lucide-react";
import Image from "next/image";

const HERO_IMAGE = "/images/hero/desert.jpg";

// Date cible du départ
const TARGET_DATE = new Date("2027-02-17T08:00:00");

// URL HelloAsso - À PERSONNALISER
const HELLO_ASSO_URL = "https://www.helloasso.com/associations/raid-dingues-en-4l/formulaires/2";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={HERO_IMAGE}
        alt="Désert au coucher du soleil"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={90}
      />

      {/* Warm Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth-dark/30 via-earth-dark/40 to-earth-dark/70 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream mb-6 tracking-wide">
          Une 4L, un défi,
          <br />
          <span className="text-sand-light">une aventure solidaire</span>
        </h1>

        <p className="text-cream/90 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 font-light leading-relaxed">
          2 pilotes, une Renault 4L mythique, 6000 km de route et de pistes
          à travers l&apos;Europe et le désert marocain pour une cause qui nous
          dépasse.
        </p>

        {/* Countdown Timer */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <Calendar className="w-3.5 h-3.5 text-sand-light" />
            <span className="text-cream/70 text-[11px] uppercase tracking-wider font-medium">
              Départ dans
            </span>
          </div>
          
          <div className="flex justify-center gap-2">
            {/* Jours */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[50px] border border-sand-light/20">
              <div className="font-display text-xl md:text-2xl text-cream leading-none">
                {timeLeft.days}
              </div>
              <div className="text-cream/60 text-[9px] uppercase tracking-wide mt-0.5">
                Jours
              </div>
            </div>

            {/* Heures */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[50px] border border-sand-light/20">
              <div className="font-display text-xl md:text-2xl text-cream leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-cream/60 text-[9px] uppercase tracking-wide mt-0.5">
                Heures
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[50px] border border-sand-light/20">
              <div className="font-display text-xl md:text-2xl text-cream leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-cream/60 text-[9px] uppercase tracking-wide mt-0.5">
                Minutes
              </div>
            </div>

            {/* Secondes */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[50px] border border-sand-light/20">
              <div className="font-display text-xl md:text-2xl text-cream leading-none">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-cream/60 text-[9px] uppercase tracking-wide mt-0.5">
                Secondes
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#projet" className="text-cream/70 hover:text-cream transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
}
