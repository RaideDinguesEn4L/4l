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
import { getSiteContent } from "@/lib/content";

// Page statique rafraîchie en arrière-plan : une modification faite dans /admin
// apparaît en ligne au bout d'une minute, sans reconstruire l'image Docker.
// Littéral obligatoire — Next lit cette valeur sans exécuter le module, donc
// pas d'import possible : garder la même que `CONTENT_REVALIDATE_SECONDS`.
export const revalidate = 60;

export default async function Home() {
  const { posts, partners, budgetItems, crew, prepSteps, settings } =
    await getSiteContent();

  return (
    <>
      <ScrollAnimations />
      <ScrollCar />
      <Header helloAssoUrl={settings.helloasso_url} />
      <main>
        <Hero helloAssoUrl={settings.helloasso_url} />
        <div className="scroll-reveal">
          <Projet />
        </div>
        <div className="scroll-reveal-left">
          <Equipage members={crew} />
        </div>
        <div className="scroll-reveal-scale">
          <Trophy />
        </div>
        <div className="scroll-reveal-right">
          <Preparation steps={prepSteps} settings={settings} />
        </div>
        <div className="scroll-reveal">
          <Soutenir />
        </div>
        <div className="scroll-reveal-left">
          <Partenaires
            partners={partners}
            helloAssoUrl={settings.helloasso_url}
          />
        </div>
        <div className="scroll-reveal-scale">
          <Budget
            items={budgetItems}
            collectedAmount={Number(settings.budget_collected) || 0}
            helloAssoUrl={settings.helloasso_url}
          />
        </div>
        <div className="scroll-reveal-right">
          <Actualites posts={posts} nextStep={settings.posts_next_step} />
        </div>
        <div className="scroll-reveal">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
