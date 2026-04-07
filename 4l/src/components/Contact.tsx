"use client";

import { useState } from "react";
import { Send, Instagram, Facebook, Linkedin, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";

// ⚠️ IMPORTANT : Remplacez cette URL par votre URL de webhook n8n
// Format : https://votre-instance-n8n.com/webhook/contact-4l-trophy
// Ou en local : http://localhost:5678/webhook/contact-4l-trophy
const N8N_WEBHOOK_URL = "https://n8n.tomrambeau.fr/webhook/contact-4l-trophy";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // n8n peut retourner différents formats selon la config
      let data;
      try {
        data = await response.json();
      } catch {
        // Si pas de JSON, considérer comme succès si status OK
        data = { success: response.ok };
      }

      if (response.ok || data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Votre message a été envoyé avec succès ! Nous vous répondrons très vite.',
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Masquer le message après 5 secondes
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Une erreur est survenue lors de l\'envoi.',
        });
      }
    } catch (error) {
      console.error('Erreur webhook:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Impossible de contacter le serveur. Veuillez réessayer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding bg-earth-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-cream">Contactez-nous</h2>
          <p className="section-subtitle mx-auto text-cream/70">
            Une question ? Envie de nous soutenir ? De devenir partenaire ?
            Nous serions ravis d&apos;échanger avec vous.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="glass-card bg-cream">
            <h3 className="font-display text-2xl text-earth-dark mb-6">
              Envoyez-nous un message
            </h3>

            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <p>{submitStatus.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-earth-dark mb-2"
                  >
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-sand-warm rounded-xl focus:ring-2 focus:ring-earth-rose focus:border-transparent outline-none transition-all"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-earth-dark mb-2"
                  >
                    Votre email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-sand-warm rounded-xl focus:ring-2 focus:ring-earth-rose focus:border-transparent outline-none transition-all"
                    placeholder="jean@exemple.fr"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-earth-dark mb-2"
                >
                  Sujet
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-sand-warm rounded-xl focus:ring-2 focus:ring-earth-rose focus:border-transparent outline-none transition-all"
                >
                  <option value="">Choisir un sujet</option>
                  <option value="partenariat">Devenir partenaire</option>
                  <option value="don">Faire un don</option>
                  <option value="presse">Presse / Médias</option>
                  <option value="question">Question générale</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-earth-dark mb-2"
                >
                  Votre message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-sand-warm rounded-xl focus:ring-2 focus:ring-earth-rose focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Écrivez votre message ici..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    Envoyer le message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-cream mb-6">
                Restons connectés
              </h3>
              <p className="text-cream/70 mb-8 leading-relaxed">
                Suivez notre aventure au quotidien sur les réseaux sociaux. 
                Nous partageons les coulisses de la préparation, les moments 
                forts et toute l&apos;actualité de notre projet.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/raid_dingues_en4l/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-cream/10 hover:bg-cream/20 rounded-2xl transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-cream group-hover:scale-110 transition-transform" />
                </a>
                {/* <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-cream/10 hover:bg-cream/20 rounded-2xl transition-colors group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 text-cream group-hover:scale-110 transition-transform" />
                </a>
                  */}
               
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-cream/80">
                <Mail className="w-5 h-5 mt-1 text-sand-light" />
                <div>
                  <p className="font-medium text-cream">Email</p>
                  <a
                    href="mailto:raid.dingues.en4l@gmail.com"
                    className="hover:text-sand-light transition-colors"
                  >
                    raid.dingues.en4l@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 text-cream/80">
                <MapPin className="w-5 h-5 mt-1 text-sand-light" />
                <div>
                  <p className="font-medium text-cream">Localisation</p>
                  <p>Limoges, France</p>
                </div>
              </div>
            </div>

            {/* Call to Action Card */}
            {/* <div className="p-8 bg-gradient-to-br from-sand-warm/20 to-earth-rose/20 rounded-3xl border border-cream/10">
              <h4 className="font-display text-2xl text-cream mb-3">
                Vous êtes une entreprise ?
              </h4>
              <p className="text-cream/70 mb-6">
                Téléchargez notre dossier de partenariat complet avec toutes 
                les informations sur les contreparties et la visibilité offerte.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-earth-dark rounded-full font-medium hover:bg-sand-light transition-colors"
              >
                Télécharger le dossier
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
