"use client";

import { Heart, Sparkles, MessageCircle } from "lucide-react";

// Logos des partenaires - À remplacer par les vrais logos
const partners = [
  { name: "Nantiat", logo: "/images/partenaires/nantiat.jpeg", url: "https://www.instagram.com/uexpressnantiat?igsh=c3hhaTc4dDN1eGM2" },
  { name: "Laserdistri service 2", logo: "/images/partenaires/laserdistri_service.jpeg", url: "https://www.instagram.com/laserdistri.service?igsh=a21yYno1MDRndHdl" },
  { name: "Eco Vidange", logo: "/images/partenaires/eco_vidange.jpeg", url: "https://ecovidange-nouvelle-aquitaine-87.fr/" },
];

// URL de votre cagnotte HelloAsso - À PERSONNALISER
const HELLO_ASSO_URL = "https://www.helloasso.com/associations/raid-dingues-en-4l/formulaires/2";

export default function Partenaires() {
  return (
    <section id="partenaires" className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Nos Partenaires</h2>
          <p className="section-subtitle mx-auto">
            Merci à ceux qui croient en notre projet et nous accompagnent dans cette aventure.
            Rejoignez-les et faites partie de l&apos;équipe !
          </p>
        </div>

        {/* Current Partners Logos */}
        <div className="mb-20">
          <h3 className="font-display text-2xl text-earth-dark text-center mb-8">
            Ils nous font confiance
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl shadow-sm flex items-center justify-center p-6 hover:shadow-md transition-shadow cursor-pointer"
                title={`Visiter le site de ${partner.name}`}
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-earth-taupe text-center text-sm">
                    Votre logo ici
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Soutenir le projet - 2 options */}
        <div>
          <h3 className="font-display text-2xl text-earth-dark text-center mb-8">
            Soutenir notre projet
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Devenir Partenaire */}
            <div className="card bg-earth-dark text-cream relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sand-warm/10 rounded-bl-[100px]" />
              
              <div className="relative z-10 flex flex-col flex-1">
                <div className="w-12 h-12 bg-sand-warm rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-earth-dark" />
                </div>
                
                <h4 className="font-display text-3xl text-cream mb-4">
                  Partenariat sur-mesure
                </h4>
                
                <p className="text-cream/80 mb-6 leading-relaxed">
                  Chaque entreprise est unique, et notre partenariat le sera aussi. 
                  Nous créons une offre personnalisée adaptée à vos besoins et votre budget.
                </p>
                
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-cream/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-light mt-2 flex-shrink-0" />
                    Visibilité logo sur la 4L et nos supports
                  </li>
                  <li className="flex items-start gap-3 text-cream/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-light mt-2 flex-shrink-0" />
                    Communication sur nos réseaux sociaux
                  </li>
                  <li className="flex items-start gap-3 text-cream/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-light mt-2 flex-shrink-0" />
                    Contreparties adaptées à votre engagement
                  </li>
                  <li className="flex items-start gap-3 text-cream/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-light mt-2 flex-shrink-0" />
                    Dossier de partenariat détaillé sur demande
                  </li>
                </ul>
                
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center gap-2 bg-cream text-earth-dark px-6 py-3 rounded-full font-medium hover:bg-sand-light transition-all duration-300 mt-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  Discutons ensemble
                </a>
              </div>
            </div>

            {/* Faire un don */}
            <div className="card bg-gradient-to-br from-sand-warm to-earth-rose text-white relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px]" />
              
              <div className="relative z-10 flex flex-col flex-1">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="font-display text-3xl text-white mb-4">
                  Faire un don
                </h4>
                
                <p className="text-white/90 mb-6 leading-relaxed">
                  Vous êtes un particulier et souhaitez nous soutenir ? 
                  Chaque contribution compte et nous aide à concrétiser ce projet solidaire.
                </p>
                
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    Don rapide et sécurisé via HelloAsso
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    Montant libre selon vos moyens
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    Reçu fiscal pour les dons éligibles
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    Votre nom sur notre page de remerciements
                  </li>
                </ul>
                
                <a
                  href={HELLO_ASSO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white text-earth-dark px-6 py-3 rounded-full font-medium hover:bg-cream transition-all duration-300 shadow-lg hover:shadow-xl mt-auto"
                >
                  <Heart className="w-4 h-4" />
                  Faire un don
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
