"use client";

import { Instagram, Facebook, Linkedin, Mail, Heart } from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Le Projet", href: "#projet" },
    { label: "L'Équipage", href: "#equipage" },
    { label: "Le 4L Trophy", href: "#trophy" },
    { label: "La 4L", href: "#preparation" },
  ],
  support: [
    { label: "Devenir partenaire", href: "#partenaires" },
    { label: "Faire un don", href: "#contact" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-dark border-t border-earth-brown/20">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="font-display text-3xl text-cream mb-4 block">
              Raid Dingues en 4L
            </a>
            <p className="text-cream/60 mb-6 leading-relaxed">
              Une aventure humaine et solidaire au cœur du désert marocain.
              Suivez notre équipage dans cette incroyable épopée.
            </p>
            
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg text-cream mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg text-cream mb-4">Nous soutenir</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-display text-lg text-cream mb-4">
              Suivez l&apos;aventure
            </h4>
            <p className="text-cream/60 mb-4 text-sm">
              Abonnez-vous à notre compte instagram pour suvire les coulisses de notre aventure.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/raid_dingues_en4l/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-cream/10 hover:bg-cream/20 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-cream" />
              </a>
              {/* <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-cream/10 hover:bg-cream/20 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-cream" />
              </a> */}
             
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cream/40 text-sm">
                2027 Raid Dingues en 4L. Tous droits réservés.
            </p>
            <p className="text-cream/40 text-sm flex items-center gap-1">
              "L'aventure commence là où la route s'arrête"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
