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
      wheelRearRef.current?.setAttribute("transform", `rotate(${appliedDeg} 67 108)`);
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
              <circle className="car-dust car-dust-1" cx="38" cy="115" r="7" fill="#D8B08C" />
              <circle className="car-dust car-dust-2" cx="31" cy="105" r="5" fill="#ECC9A1" />
              <circle className="car-dust car-dust-3" cx="43" cy="122" r="5" fill="#CDA382" />
            </g>

            {/* Ombre portée */}
            <ellipse cx="105" cy="126" rx="63" ry="7" fill="#4F3E35" opacity="0.15" />

            {/* Corps du véhicule — comprimé verticalement (hauteur réduite, roues inchangées) */}
            <g transform="matrix(1 0 0 0.8 0 22)">
            {/* Galerie de toit + chargement — avancée, bord avant aligné au toit */}
            <rect x="59" y="37" width="62" height="4" rx="2" fill="#4F3E35" />
            <rect x="65" y="41" width="3" height="6" fill="#4F3E35" />
            <rect x="90" y="41" width="3" height="6" fill="#4F3E35" />
            <rect x="115" y="41" width="3" height="6" fill="#4F3E35" />
            {/* Jerrican */}
            <rect x="62" y="24" width="12" height="13" rx="1.5" fill="#F2871F" />
            <rect x="65" y="21" width="5" height="4" rx="1" fill="#F2871F" />
            {/* Sac / paquetage */}
            <rect x="77" y="27" width="18" height="10" rx="5" fill="#B49480" />
            {/* Roue de secours */}
            <circle cx="108" cy="30" r="9" fill="#2E2A28" />
            <circle cx="108" cy="30" r="4" fill="#E8E0D4" />

            {/* Carrosserie — silhouette 4L vue de profil (bleu marine) */}
            <path
              d="M43 110 L46 69 L54 56 Q54 50 59 48 L121 47 Q126 47 128 51 L134 69 L162 74 Q167 75 168 81 L168 104 Q168 110 162 110 L160 110 A16 16 0 0 0 128 110 L83 110 A16 16 0 0 0 51 110 L43 110 Z"
              fill="#1E2F52"
            />
            {/* Bas de caisse plus sombre */}
            <path d="M43 110 L43 101 L167 101 L168 104 Q168 110 162 110 L160 110 A16 16 0 0 0 128 110 L83 110 A16 16 0 0 0 51 110 L43 110 Z" fill="#152138" />

            {/* Vitre arrière — coin haut-arrière arrondi, arête arrière en diagonale vers le bas */}
            <path d="M72 54 L61 54 Q57 54 56 59 L51 68 L72 68 Z" fill="#34425C" />
            {/* Vitre avant médiane */}
            <path d="M76 52 L95 52 L95 68 L76 68 Z" fill="#34425C" />
            {/* Vitre avant 1 — collée à l'avant, bas avant incurvé pour épouser la porte */}
            <path d="M98 52 L119 52 L122 65 Q120 68 114 68 L98 68 Z" fill="#34425C" />

            {/* Liseré orange — bande haute */}
            <rect x="46" y="76" width="110" height="4" fill="#F2871F" />
            {/* Liseré bas — c'est le bas de caisse entre les deux roues (orange sur la photo) */}
            <rect x="83" y="101" width="45" height="5" fill="#F2871F" />

            {/* Lignes de portières */}
            <line x1="74" y1="76" x2="74" y2="105" stroke="#2E2A28" strokeWidth="1.5" opacity="0.25" />
            <line x1="97" y1="76" x2="97" y2="105" stroke="#2E2A28" strokeWidth="1.5" opacity="0.25" />

            {/* Plaque numéro de course — centrée entre les deux liserés */}
            <rect x="101" y="82" width="18" height="10" rx="2" fill="#F7F1EA" />
            <text
              x="110"
              y="90"
              textAnchor="middle"
              fontSize="9"
              fontWeight="bold"
              fill="#2E2A28"
              fontFamily="sans-serif"
            >
              235
            </text>

            {/* Phare avant + clignotant */}
            <circle cx="158" cy="81" r="4.5" fill="#FFE8A3" stroke="#4F3E35" strokeWidth="1" />
            <rect x="161" y="86" width="5" height="3.5" rx="1" fill="#E8923A" />
            {/* Feu arrière */}
            <rect x="45" y="78" width="4" height="7" rx="1" fill="#C0392B" />

            {/* Pare-chocs */}
            <rect x="156" y="103" width="14" height="5" rx="2.5" fill="#9DA3A8" />
            <rect x="42" y="103" width="11" height="5" rx="2.5" fill="#9DA3A8" />
            </g>

            {/* Roue arrière */}
            <g>
              <circle cx="67" cy="108" r="16" fill="#2E2A28" />
              <g ref={wheelRearRef}>
                <circle cx="67" cy="108" r="8.5" fill="#E8E0D4" />
                <line x1="67" y1="100.5" x2="67" y2="115.5" stroke="#2E2A28" strokeWidth="2" />
                <line x1="59.5" y1="108" x2="74.5" y2="108" stroke="#2E2A28" strokeWidth="2" />
              </g>
              <circle cx="67" cy="108" r="2.5" fill="#2E2A28" />
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

            {/* Ailes / élargisseurs d'arches de roue (noir mat, façon 4L Trophy) */}
            <path d="M86 108 A19 19 0 0 0 48 108" fill="none" stroke="#211D1B" strokeWidth="5" strokeLinecap="round" />
            <path d="M163 108 A19 19 0 0 0 125 108" fill="none" stroke="#211D1B" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
