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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleMenuItemClick = () => {
    // Fermer le menu immédiatement
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-4"
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

          {/* Mobile Menu Button - Always visible on solid background */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-all duration-300 relative z-50 bg-white text-earth-dark shadow-md hover:bg-sand-light border border-sand-warm/30"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu - Full Screen */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className={`flex items-center justify-between px-6 transition-all duration-500 ${
          isScrolled ? "py-4" : "py-6"
        }`}>
          <span className="font-display text-xl text-earth-dark">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-earth-dark hover:bg-sand-light/50 rounded-lg transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col px-6 py-4 gap-2 overflow-y-auto max-h-[calc(100vh-120px)]">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="text-earth-dark text-lg font-medium py-4 px-4 rounded-xl hover:bg-sand-light/50 transition-all duration-200 border-b border-sand-light/30 last:border-0 active:scale-95 text-left w-full"
              style={{
                animation: isMobileMenuOpen 
                  ? `slideInRight 0.3s ease-out ${index * 0.05}s both` 
                  : "none"
              }}
            >
              {item.label}
            </button>
          ))}
          
          {/* CTA Button */}
          <a
            href={HELLO_ASSO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary mt-6 text-center inline-flex items-center justify-center gap-2 py-4 active:scale-95"
            style={{
              animation: isMobileMenuOpen 
                ? `slideInRight 0.3s ease-out ${navItems.length * 0.05}s both` 
                : "none"
            }}
          >
            <Heart className="w-5 h-5" />
            Faire un don
          </a>
        </nav>
      </div>
    </header>
  );
}
