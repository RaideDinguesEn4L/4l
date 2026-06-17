"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Calendar, Heart, Compass } from "lucide-react";
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

  // Parallaxe : l'image de fond défile plus lentement que le contenu
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (parallaxRef.current && window.scrollY < window.innerHeight) {
          parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image avec parallaxe */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110 will-change-transform">
        <Image
          src={HERO_IMAGE}
          alt="Désert au coucher du soleil"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Warm Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth-dark/30 via-earth-dark/40 to-earth-dark/70 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          className="hero-enter font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream mb-6 tracking-wide"
          style={{ animationDelay: "0.1s" }}
        >
          Une 4L, un défi,
          <br />
          <span className="text-sand-light">une aventure solidaire</span>
        </h1>

        <p
          className="hero-enter text-cream/90 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 font-light leading-relaxed"
          style={{ animationDelay: "0.35s" }}
        >
          2 pilotes, une Renault 4L mythique, 6000 km de route et de pistes
          à travers l&apos;Europe et le désert marocain pour une cause qui nous
          dépasse.
        </p>

        {/* Countdown Timer */}
        <div className="hero-enter mb-10" style={{ animationDelay: "0.6s" }}>
          <div className="inline-flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-sand-light" />
            <span className="text-cream/70 text-xs uppercase tracking-[0.2em] font-medium">
              Départ dans
            </span>
          </div>

          <div className="flex justify-center gap-2 md:gap-3">
            {[
              { value: String(timeLeft.days), label: "Jours" },
              { value: String(timeLeft.hours).padStart(2, "0"), label: "Heures" },
              { value: String(timeLeft.minutes).padStart(2, "0"), label: "Minutes" },
              { value: String(timeLeft.seconds).padStart(2, "0"), label: "Secondes" },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-white/10 backdrop-blur-md rounded-xl p-3 min-w-[64px] md:min-w-[76px] border border-sand-light/25 shadow-lg"
              >
                <div className="font-display text-2xl md:text-4xl text-cream leading-none">
                  {unit.value}
                </div>
                <div className="text-cream/60 text-[10px] uppercase tracking-wider mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div
          className="hero-enter flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animationDelay: "0.85s" }}
        >
          <a
            href={HELLO_ASSO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cream text-earth-dark rounded-full font-medium hover:bg-sand-light transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Heart className="w-4 h-4" />
            Nous soutenir
          </a>
          <a
            href="#projet"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-cream/70 text-cream rounded-full font-medium hover:bg-cream hover:text-earth-dark transition-all duration-300"
          >
            <Compass className="w-4 h-4" />
            Découvrir l&apos;aventure
          </a>
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
