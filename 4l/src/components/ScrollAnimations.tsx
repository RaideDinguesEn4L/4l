"use client";

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    // Fonction de smooth scroll améliorée
    const smoothScrollTo = (targetElement: HTMLElement) => {
      const headerOffset = 80; // Hauteur du header fixe
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Scroll fluide avec comportement natif
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };

    // Gérer tous les clics sur les liens d'ancrage
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Chercher le lien parent si on clique sur un enfant (span, icon, etc.)
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        
        // Vérifier que c'est un lien d'ancrage valide
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          e.stopPropagation();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Scroll fluide vers l'élément
            smoothScrollTo(targetElement);
            
            // Mettre à jour l'URL sans recharger
            if (history.pushState) {
              history.pushState(null, '', href);
            }
          }
        }
      }
    };

    // Scroll reveal observer
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.15,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    // Event listener pour smooth scroll avec capture phase
    document.addEventListener('click', handleAnchorClick, true);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null; // Ce composant ne rend rien
}
