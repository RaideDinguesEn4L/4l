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

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <main>
        <Hero />
        <div className="scroll-reveal">
          <Projet />
        </div>
        <div className="scroll-reveal delay-100">
          <Equipage />
        </div>
        <div className="scroll-reveal">
          <Trophy />
        </div>
        <div className="scroll-reveal delay-100">
          <Preparation />
        </div>
        <div className="scroll-reveal">
          <Soutenir />
        </div>
        <div className="scroll-reveal delay-100">
          <Partenaires />
        </div>
        <div className="scroll-reveal">
          <Budget />
        </div>
        <div className="scroll-reveal delay-100">
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
