"use client";

import { useEffect, useRef, useState } from "react";

type RouteGeometry = {
  d: string;
  width: number;
  height: number;
  markers: { x: number; y: number }[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  mainTop: number;
};

// Fraction de la hauteur du viewport où la voiture s'accroche pendant le scroll
const ANCHOR = 0.45;
// Facteur de lissage du suivi (plus petit = plus de traîne)
const LERP = 0.15;

export default function RoadTrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const traveledRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const [geometry, setGeometry] = useState<RouteGeometry | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Construit le tracé en serpentin à partir des sections .scroll-reveal
  useEffect(() => {
    const main = containerRef.current?.parentElement;
    if (!main) return;

    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const buildRoute = () => {
      const sections = Array.from(main.querySelectorAll<HTMLElement>(".scroll-reveal"));
      if (sections.length === 0) return;

      const width = main.clientWidth;
      const height = main.offsetHeight;
      const mainTop = main.getBoundingClientRect().top + window.scrollY;
      const margin = Math.max(56, width * 0.06);

      const markers = sections.map((el, i) => ({
        x: i % 2 === 0 ? width - margin : margin,
        y: el.offsetTop + 140,
      }));
      const start = { x: width / 2, y: Math.max(markers[0].y - 240, 60) };
      const end = { x: width / 2, y: height - 90 };
      const points = [start, ...markers, end];

      // Courbes en S : la route quitte et rejoint chaque étape à la verticale
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const my = (p0.y + p1.y) / 2;
        d += ` C ${p0.x} ${my}, ${p1.x} ${my}, ${p1.x} ${p1.y}`;
      }

      setGeometry({ d, width, height, markers, start, end, mainTop });
    };

    buildRoute();
    const observer = new ResizeObserver(buildRoute);
    observer.observe(main);
    return () => observer.disconnect();
  }, []);

  // Anime la voiture le long du tracé en fonction du scroll
  useEffect(() => {
    const route = routeRef.current;
    const traveled = traveledRef.current;
    const car = carRef.current;
    if (!geometry || !route || !traveled || !car) return;

    const total = route.getTotalLength();
    const { start, end, mainTop } = geometry;
    let currentY = start.y;
    let targetY = start.y;
    let rafId = 0;

    // Le tracé serpente : sa longueur n'est pas proportionnelle à la descente.
    // On échantillonne y(longueur) — monotone par construction — pour pouvoir
    // accrocher la voiture à une hauteur du viewport, pas à une fraction de longueur.
    const SAMPLES = Math.max(200, Math.floor(total / 24));
    const ys = new Float32Array(SAMPLES + 1);
    for (let i = 0; i <= SAMPLES; i++) {
      ys[i] = route.getPointAtLength((i / SAMPLES) * total).y;
    }
    const lenForY = (y: number) => {
      let lo = 0;
      let hi = SAMPLES;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (ys[mid] < y) lo = mid + 1;
        else hi = mid;
      }
      if (lo === 0) return 0;
      const y0 = ys[lo - 1];
      const y1 = ys[lo];
      const t = y1 === y0 ? 0 : (y - y0) / (y1 - y0);
      return ((lo - 1 + t) / SAMPLES) * total;
    };

    const place = (len: number) => {
      const l2 = Math.min(len + 2, total);
      const l1 = Math.max(l2 - 2, 0);
      const p = route.getPointAtLength(len);
      const a = route.getPointAtLength(l1);
      const b = route.getPointAtLength(l2);
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      car.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);
      traveled.setAttribute("stroke-dasharray", `${len} ${total - len}`);
    };

    const computeTarget = () => {
      const anchor = window.scrollY + window.innerHeight * ANCHOR - mainTop;
      targetY = Math.min(Math.max(anchor, start.y), end.y);
    };

    const tick = () => {
      currentY += (targetY - currentY) * LERP;
      if (Math.abs(targetY - currentY) < 0.5) {
        currentY = targetY;
        place(lenForY(currentY));
        rafId = 0;
        return;
      }
      place(lenForY(currentY));
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      computeTarget();
      // Animations réduites : la voiture suit le scroll sans inertie
      if (reducedMotion) {
        currentY = targetY;
        place(lenForY(currentY));
        return;
      }
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    computeTarget();
    currentY = targetY;
    place(lenForY(currentY));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [geometry, reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-30 hidden overflow-hidden pointer-events-none lg:block"
    >
      {geometry && (
        <svg
          width={geometry.width}
          height={geometry.height}
          className="absolute left-0 top-0"
        >
          {/* Route en pointillés */}
          <path
            ref={routeRef}
            d={geometry.d}
            fill="none"
            stroke="#B49480"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="1 14"
            opacity={0.5}
          />
          {/* Portion déjà parcourue */}
          <path
            ref={traveledRef}
            d={geometry.d}
            fill="none"
            stroke="#4F3E35"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={`0 ${geometry.height * 4}`}
            opacity={0.45}
          />
          {/* Étapes */}
          {geometry.markers.map((m, i) => (
            <circle
              key={i}
              cx={m.x}
              cy={m.y}
              r={6}
              fill="#F7F1EA"
              stroke="#B49480"
              strokeWidth={2.5}
              opacity={0.9}
            />
          ))}
          {/* Arrivée : drapeau à damier */}
          <g transform={`translate(${geometry.end.x} ${geometry.end.y})`} opacity={0.85}>
            <circle cx={0} cy={0} r={5} fill="#F7F1EA" stroke="#4F3E35" strokeWidth={2} />
            <line x1={0} y1={-5} x2={0} y2={-30} stroke="#4F3E35" strokeWidth={2} />
            <rect x={0} y={-30} width={20} height={13} fill="#F7F1EA" stroke="#4F3E35" strokeWidth={1.5} />
            <rect x={0} y={-30} width={6.5} height={6.5} fill="#4F3E35" />
            <rect x={13} y={-30} width={6.5} height={6.5} fill="#4F3E35" />
            <rect x={6.5} y={-23.5} width={6.5} height={6.5} fill="#4F3E35" />
            <text
              x={28}
              y={-19}
              fontFamily="var(--font-bebas)"
              fontSize={20}
              letterSpacing={2}
              fill="#4F3E35"
              opacity={0.7}
            >
              MAROC
            </text>
          </g>
          {/* La 4L (vue de dessus, pointe vers +x).
              En reduced motion elle suit le scroll sans inertie. */}
          <g
            ref={carRef}
            transform={`translate(${geometry.start.x} ${geometry.start.y}) rotate(90)`}
            style={{ filter: "drop-shadow(0 2px 4px rgba(79, 62, 53, 0.5))" }}
          >
              <rect x={-20} y={-17} width={11} height={6} rx={2} fill="#2B221D" />
              <rect x={-20} y={11} width={11} height={6} rx={2} fill="#2B221D" />
              <rect x={10} y={-17} width={11} height={6} rx={2} fill="#2B221D" />
              <rect x={10} y={11} width={11} height={6} rx={2} fill="#2B221D" />
              <rect x={-27} y={-13} width={54} height={26} rx={7} fill="#F7F1EA" stroke="#4F3E35" strokeWidth={2.5} />
              <rect x={10} y={-10} width={6} height={20} rx={2} fill="#4F3E35" opacity={0.75} />
              <rect x={-23} y={-9} width={5} height={18} rx={2} fill="#4F3E35" opacity={0.55} />
              <rect x={-16} y={-9} width={24} height={18} rx={3} fill="#D8B08C" stroke="#4F3E35" strokeWidth={1.5} />
              <line x1={-10} y1={-9} x2={-10} y2={9} stroke="#4F3E35" strokeWidth={1.5} opacity={0.5} />
              <line x1={-2} y1={-9} x2={-2} y2={9} stroke="#4F3E35" strokeWidth={1.5} opacity={0.5} />
              <circle cx={26} cy={-8} r={2.5} fill="#D8B08C" stroke="#4F3E35" strokeWidth={1} />
              <circle cx={26} cy={8} r={2.5} fill="#D8B08C" stroke="#4F3E35" strokeWidth={1} />
          </g>
        </svg>
      )}
    </div>
  );
}
