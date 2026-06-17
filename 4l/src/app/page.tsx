import {
  Header,
  Hero,
  Projet,
  Equipage,
  Trophy,
  Preparation,
  Soutenir,
  Partenaires,
  Budget,
  Actualites,
  Contact,
  Footer,
} from "@/components";
import ScrollAnimations from "@/components/ScrollAnimations";
import ScrollCar from "@/components/ScrollCar";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <ScrollCar />
      <Header />
      <main>
        <Hero />
        <div className="scroll-reveal">
          <Projet />
        </div>
        <div className="scroll-reveal-left">
          <Equipage />
        </div>
        <div className="scroll-reveal-scale">
          <Trophy />
        </div>
        <div className="scroll-reveal-right">
          <Preparation />
        </div>
        <div className="scroll-reveal">
          <Soutenir />
        </div>
        <div className="scroll-reveal-left">
          <Partenaires />
        </div>
        <div className="scroll-reveal-scale">
          <Budget />
        </div>
        <div className="scroll-reveal-right">
          <Actualites />
        </div>
        <div className="scroll-reveal">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
