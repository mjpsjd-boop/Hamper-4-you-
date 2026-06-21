import React, { useState } from 'react';
import { Instagram, Mail, Phone, MapPin, Send, CheckCircle, Heart, Star } from 'lucide-react';
import { BRAND_NAME, INSTAGRAM_HANDLE, CONTACT_EMAIL, PHONE_NUMBER } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: ""
  });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    // Simulate submission
    setIsSubmitSuccessful(true);
    setFormState({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      message: ""
    });

    setTimeout(() => {
      setIsSubmitSuccessful(false);
    }, 5000);
  };

  const handleInstagramLaunch = () => {
    window.open(`https://instagram.com/${INSTAGRAM_HANDLE.replace('@', '')}`, '_blank');
  };

  return (
    <footer id="contact" className="bg-[#2D2A26] text-[#FAF8F5] pt-20 pb-12 border-t-4 border-[#AF9467] relative overflow-hidden">
      
      {/* Absolute faint background accents */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#AF9467]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Grid Panel: Contact details on the left, Email Contact Form on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#EADFC9]/10">
          
          {/* Left Column (Brand card & Contact Plaque) */}
          <div className="lg:col-span-5 space-y-8 text-left" id="footer-contact-details">
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.3em] text-[#FAF8F5]">
                  HAMPERS<span className="text-[#AF9467]">4</span>YOU
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.34em] text-[#AF9467] font-semibold mt-1">
                  Bespoke Luxury Gifting
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-sans font-light leading-relaxed max-w-sm">
                Each parcel is treated like an haute-couture wedding garment. We customize every envelope seal, ribbon color, and calligraphy lettering to manifest your personal vision list.
              </p>
            </div>

            {/* Social Connection Panel */}
            <div className="space-y-4">
              <h4 className="text-xs font-sans uppercase tracking-widest font-bold text-[#AF9467]">
                Connect With Our Journey
              </h4>
              <button
                onClick={handleInstagramLaunch}
                id="footer-ig-cta"
                className="inline-flex items-center space-x-3 px-4 py-3 bg-white/5 border border-white/10 hover:border-[#AF9467]/50 rounded-sm hover:bg-white/10 transition-all text-xs font-sans text-left text-gray-200"
              >
                <div className="p-2 rounded-full bg-[#AF9467] text-white shrink-0">
                  <Instagram className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#AF9467] font-bold">Follow Us on Instagram</p>
                  <p className="font-sans font-medium">{INSTAGRAM_HANDLE}</p>
                </div>
              </button>
            </div>

            {/* Contact list icons */}
            <div className="space-y-4 text-xs text-gray-300" id="footer-physical-details">
              <div className="flex items-center space-x-3">
                <Instagram className="h-4 w-4 text-[#AF9467] shrink-0" />
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Instagram DM Hub</span>
                  <a href="https://ig.me/m/hampers_4_you_by_tasdiqa" target="_blank" rel="noopener noreferrer" className="hover:text-[#AF9467] transition-colors">@hampers_4_you_by_tasdiqa</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#AF9467] shrink-0" />
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Editorial Queries</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#AF9467] transition-colors">{CONTACT_EMAIL}</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-[#AF9467] shrink-0" />
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Our Creative Studio</span>
                  <span className="font-sans">By Appointment Only, London / Global Delivery</span>
                </div>
              </div>
            </div>

            {/* Slogan details */}
            <div className="flex items-center space-x-2 text-xs font-serif italic text-gray-400">
              <Star className="h-3.5 w-3.5 fill-[#AF9467] text-[#AF9467]" />
              <span>"Handcrafted with Extreme Attention to Detail"</span>
            </div>
          </div>

          {/* Right Column (Consultation Contact form placeholder) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 sm:p-8 rounded" id="footer-form-column">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FAF8F5] mb-2 text-left">
              Send a Design Inquiry Letter
            </h3>
            <p className="text-[11px] font-sans text-gray-400 text-left mb-6 font-light leading-relaxed">
              If you prefer email support, leave your particulars below. Our creative coordinator will review your celebration details and reply within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left" id="footer-contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label id="footer-lbl-name" className="text-[9px] font-sans uppercase tracking-widest text-[#AF9467] block">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Siddiqi"
                    value={formState.name}
                    onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-xs gap-y-1 text-white focus:outline-none focus:border-[#AF9467]"
                  />
                </div>
                <div className="space-y-1">
                  <label id="footer-lbl-email" className="text-[9px] font-sans uppercase tracking-widest text-[#AF9467] block">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="ayesha@gmail.com"
                    value={formState.email}
                    onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#AF9467]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label id="footer-lbl-phone" className="text-[9px] font-sans uppercase tracking-widest text-[#AF9467] block">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 0192"
                    value={formState.phone}
                    onChange={(e) => setFormState(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#AF9467]"
                  />
                </div>
                <div className="space-y-1">
                  <label id="footer-lbl-date" className="text-[9px] font-sans uppercase tracking-widest text-[#AF9467] block">Expected Celebration Ceremony Date</label>
                  <input
                    type="text"
                    placeholder="e.g Nov 2026"
                    value={formState.eventDate}
                    onChange={(e) => setFormState(p => ({ ...p, eventDate: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#AF9467]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label id="footer-lbl-msg" className="text-[9px] font-sans uppercase tracking-widest text-[#AF9467] block">Please tell us about your target theme & ideas</label>
                <textarea
                  rows={3}
                  placeholder="Describe your flower choices, wedding colors, required Nikah vows..."
                  value={formState.message}
                  onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#AF9467] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  id="footer-submit-btn"
                  className="px-6 py-3.5 bg-[#AF9467] hover:bg-[#967B51] text-white text-[10px] font-sans font-bold tracking-widest uppercase transition-colors rounded-sm flex items-center space-x-2"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Design Request</span>
                </button>
              </div>
            </form>

            <AnimatePresence>
              {isSubmitSuccessful && (
                <motion.div
                  id="footer-success-banner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-green-950/40 border border-green-800 text-green-300 text-[11px] rounded text-center font-sans flex items-center justify-center space-x-2 mt-4"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  <span>Your Inquiry Letter has been logged directly inside our creative studio registry! Thank you.</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Bottom copyright and structural credit lines (no larping stats) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-400 font-sans tracking-wide">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. Crafted with uncompromising devotion to excellence. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="flex items-center space-x-1">
              <span>Made with love for celebrations</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            </span>
            <span className="text-[#AF9467] font-semibold">Concierge Service Desk Available</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
