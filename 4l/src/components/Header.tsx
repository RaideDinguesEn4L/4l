"use client";

import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";

// URL HelloAsso - À PERSONNALISER
const HELLO_ASSO_URL = "https://www.helloasso.com/associations/raid-dingues-en-4l/formulaires/2";

const navItems = [
  { label: "Le Projet", href: "#projet" },
  { label: "L'Équipage", href: "#equipage" },
  { label: "Le 4L Trophy", href: "#trophy" },
  { label: "La 4L", href: "#preparation" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className={`font-display text-2xl md:text-3xl transition-colors duration-300 ${
              isScrolled ? "text-earth-dark" : "text-cream"
            }`}
          >
            raid dingues en 4l
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                  isScrolled ? "text-earth-dark" : "text-cream"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={HELLO_ASSO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-4 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 inline-flex items-center gap-2 ${
                isScrolled
                  ? "bg-earth-dark text-cream hover:bg-earth-brown"
                  : "bg-cream text-earth-dark hover:bg-sand-light"
              }`}
            >
              <Heart className="w-4 h-4" />
              Faire un don
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? "text-earth-dark" : "text-cream"
            }`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-8 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-earth-dark text-lg font-medium py-2 border-b border-sand-light/50"
              >
                {item.label}
              </a>
            ))}
            <a
              href={HELLO_ASSO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary mt-4 text-center inline-flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Faire un don
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
