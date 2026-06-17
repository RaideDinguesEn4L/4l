"use client";

import { useEffect, useRef } from "react";

/**
 * Une Renault 4L (façon 4L Trophy : galerie, jerrican, roue de secours)
 * qui roule en bas de l'écran. Sa position horizontale suit la progression
 * du scroll : elle traverse tout l'écran entre le haut et le bas du site,
 * fait demi-tour quand on remonte, ses roues tournent et elle soulève
 * de la poussière proportionnellement à sa vitesse.
 */
export default function ScrollCar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const wheelRearRef = useRef<SVGGElement>(null);
  const wheelFrontRef = useRef<SVGGElement>(null);
  const dustRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Note : on n'applique pas prefers-reduced-motion ici — le mouvement est
    // entièrement piloté par le scroll de l'utilisateur (pas d'animation
    // autonome), et Windows désactive souvent ce réglage par défaut.
    let rafId = 0;
    let x = 12; // position affichée (lissée)
    let lastX = 12;
    let facing = 1; // 1 = vers la droite, -1 = vers la gauche
    let wheelDeg = 0;

    const tick = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

      const carWidth = carRef.current?.offsetWidth ?? 120;
      const track = Math.max(0, window.innerWidth - carWidth - 24);
      const targetX = 12 + progress * track;

      // Lissage : la voiture "rattrape" la position cible
      x += (targetX - x) * 0.07;
      const v = x - lastX; // vitesse en px/frame
      lastX = x;
      const speed = Math.abs(v);

      if (v > 0.2) facing = 1;
      else if (v < -0.2) facing = -1;

      // Rotation des roues proportionnelle à la distance parcourue
      wheelDeg += v * 3.2;

      // Tangage et rebond de la carrosserie selon la vitesse
      const tilt = Math.max(-4, Math.min(4, v * 0.45));
      const bob = Math.sin(performance.now() / 80) * Math.min(speed, 6) * 0.3;

      if (carRef.current) {
        carRef.current.style.transform = `translateX(${x}px)`;
      }
      if (bodyRef.current) {
        bodyRef.current.style.transform = `scaleX(${facing}) rotate(${tilt}deg) translateY(${bob}px)`;
      }
      const appliedDeg = wheelDeg * facing;
      wheelRearRef.current?.setAttribute("transform", `rotate(${appliedDeg} 52 108)`);
      wheelFrontRef.current?.setAttribute("transform", `rotate(${appliedDeg} 144 108)`);
      if (dustRef.current) {
        dustRef.current.style.opacity = String(Math.min(1, speed / 3.5));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none h-20 md:h-24"
      aria-hidden="true"
    >
      {/* La route en pointillés */}
      <div className="absolute bottom-2.5 left-0 right-0 border-t-2 border-dashed border-earth-dark/15" />

      {/* La 4L */}
      <div ref={carRef} className="absolute bottom-1 left-0 will-change-transform">
        <div ref={bodyRef} className="w-24 md:w-32 will-change-transform" style={{ transformOrigin: "50% 80%" }}>
          <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Poussière derrière la voiture */}
            <g ref={dustRef} style={{ opacity: 0 }}>
              <circle className="car-dust car-dust-1" cx="24" cy="115" r="7" fill="#D8B08C" />
              <circle className="car-dust car-dust-2" cx="17" cy="105" r="5" fill="#ECC9A1" />
              <circle className="car-dust car-dust-3" cx="29" cy="122" r="5" fill="#CDA382" />
            </g>

            {/* Ombre portée */}
            <ellipse cx="96" cy="126" rx="72" ry="7" fill="#4F3E35" opacity="0.15" />

            {/* Galerie de toit + chargement — avancée, bord avant aligné au toit */}
            <rect x="59" y="28" width="62" height="4" rx="2" fill="#4F3E35" />
            <rect x="65" y="32" width="3" height="6" fill="#4F3E35" />
            <rect x="90" y="32" width="3" height="6" fill="#4F3E35" />
            <rect x="115" y="32" width="3" height="6" fill="#4F3E35" />
            {/* Jerrican */}
            <rect x="62" y="15" width="12" height="13" rx="1.5" fill="#F2871F" />
            <rect x="65" y="12" width="5" height="4" rx="1" fill="#F2871F" />
            {/* Sac / paquetage */}
            <rect x="77" y="18" width="18" height="10" rx="5" fill="#B49480" />
            {/* Roue de secours */}
            <circle cx="108" cy="21" r="9" fill="#2E2A28" />
            <circle cx="108" cy="21" r="4" fill="#E8E0D4" />

            {/* Carrosserie — silhouette 4L vue de profil (bleu marine) */}
            <path
              d="M22 104 L19 68 L23 47 Q23 40 28 39 L121 38 Q126 38 128 42 L134 60 L162 67 Q167 68 168 75 L168 98 Q168 104 162 104 L160 104 A17 17 0 0 0 128 104 L68 104 A17 17 0 0 0 36 104 L22 104 Z"
              fill="#1E2F52"
            />
            {/* Bas de caisse plus sombre */}
            <path d="M22 104 L20 86 L167 86 L168 98 Q168 104 162 104 L160 104 A17 17 0 0 0 128 104 L68 104 A17 17 0 0 0 36 104 L22 104 Z" fill="#152138" />

            {/* Vitre arrière — plus petite, angle bas arrière incurvé */}
            <path d="M34 45 L58 45 L58 59 L41 59 Q34 59 34 51 Z" fill="#34425C" />
            {/* Vitre avant médiane */}
            <path d="M64 43 L88 43 L88 59 L64 59 Z" fill="#34425C" />
            {/* Vitre avant 1 — collée à l'avant, bas avant incurvé pour épouser la porte */}
            <path d="M92 43 L118 43 L122 56 Q120 59 112 59 L92 59 Z" fill="#34425C" />

            {/* Liseré orange — bande haute */}
            <rect x="20" y="69" width="136" height="4.5" fill="#F2871F" />
            {/* Liseré bas — entre les deux roues */}
            <rect x="68" y="94" width="60" height="4" fill="#F2871F" />

            {/* Lignes de portières */}
            <line x1="61" y1="69" x2="61" y2="97" stroke="#2E2A28" strokeWidth="1.5" opacity="0.25" />
            <line x1="90" y1="69" x2="90" y2="97" stroke="#2E2A28" strokeWidth="1.5" opacity="0.25" />

            {/* Plaque numéro de course — centrée entre les deux liserés */}
            <rect x="105" y="77" width="18" height="13" rx="2" fill="#F7F1EA" />
            <text
              x="114"
              y="87"
              textAnchor="middle"
              fontSize="9"
              fontWeight="bold"
              fill="#2E2A28"
              fontFamily="sans-serif"
            >
              235
            </text>

            {/* Phare avant + clignotant */}
            <circle cx="158" cy="76" r="4.5" fill="#FFE8A3" stroke="#4F3E35" strokeWidth="1" />
            <rect x="161" y="82" width="5" height="3.5" rx="1" fill="#E8923A" />
            {/* Feu arrière */}
            <rect x="18" y="72" width="4" height="8" rx="1" fill="#C0392B" />

            {/* Pare-chocs */}
            <rect x="156" y="92" width="14" height="5" rx="2.5" fill="#9DA3A8" />
            <rect x="15" y="92" width="12" height="5" rx="2.5" fill="#9DA3A8" />

            {/* Roue arrière */}
            <g>
              <circle cx="52" cy="108" r="16" fill="#2E2A28" />
              <g ref={wheelRearRef}>
                <circle cx="52" cy="108" r="8.5" fill="#E8E0D4" />
                <line x1="52" y1="100.5" x2="52" y2="115.5" stroke="#2E2A28" strokeWidth="2" />
                <line x1="44.5" y1="108" x2="59.5" y2="108" stroke="#2E2A28" strokeWidth="2" />
              </g>
              <circle cx="52" cy="108" r="2.5" fill="#2E2A28" />
            </g>

            {/* Roue avant */}
            <g>
              <circle cx="144" cy="108" r="16" fill="#2E2A28" />
              <g ref={wheelFrontRef}>
                <circle cx="144" cy="108" r="8.5" fill="#E8E0D4" />
                <line x1="144" y1="100.5" x2="144" y2="115.5" stroke="#2E2A28" strokeWidth="2" />
                <line x1="136.5" y1="108" x2="151.5" y2="108" stroke="#2E2A28" strokeWidth="2" />
              </g>
              <circle cx="144" cy="108" r="2.5" fill="#2E2A28" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
