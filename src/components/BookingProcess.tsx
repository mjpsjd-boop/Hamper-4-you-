import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Compass, Sliders, ShieldCheck, HelpCircle } from 'lucide-react';
import { BOOKING_STEPS, FAQS, PHONE_NUMBER } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function BookingProcess() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const getStepIcon = (num: string) => {
    switch (num) {
      case '01': return <Compass className="h-5 w-5 text-[#AF9467]" />;
      case '02': return <MessageSquare className="h-5 w-5 text-[#AF9467]" />;
      case '03': return <Sliders className="h-5 w-5 text-[#AF9467]" />;
      case '04': return <ShieldCheck className="h-5 w-5 text-[#AF9467]" />;
      default: return <Compass className="h-5 w-5 text-[#AF9467]" />;
    }
  };

  const handleInstagramChat = () => {
    const text = "Hi HAMPERS_4_YOU! I am checking your 'How It Works' guide and would love to consult with you about a custom gifting order.";
    navigator.clipboard.writeText(text).then(() => {
      alert("Consultation greeting prompt copied to clipboard! Opening Instagram DM window for your live creative session.");
    });
    window.open("https://ig.me/m/hampers_4_you_by_tasdiqa", '_blank');
  };

  return (
    <section id="how-it-works" className="py-24 bg-[#F5EFE4]/30 border-t border-b border-[#EADFC9]/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#AF9467] font-semibold">Bespoke Protocol</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2A26] mt-2 tracking-tight">
            How It Works: Our Booking Process
          </h2>
          <div className="h-1 w-16 bg-[#AF9467]/50 mt-4 rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-[#544F49] font-light leading-relaxed mt-4">
            Since each of our ring platters, hand-written certificates, and luxury hampers represents individual, personalized designs, we don't utilize an impersonal shopping cart. Let's start a real creative partnership.
          </p>
        </div>

        {/* Steps Process Timeline Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20 relative" id="booking-steps-timeline">
          {BOOKING_STEPS.map((step, idx) => {
            return (
              <div 
                key={step.number} 
                className="bg-white border border-[#EADFC9]/40 p-6 rounded shadow-sm text-left relative flex flex-col justify-between group hover:border-[#AF9467]/50 transition-colors duration-300"
                id={`booking-step-card-${step.number}`}
              >
                {/* Horizontal line connector in background for desktop */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-[1px] bg-[#EADFC9] z-0" />
                )}

                <div className="space-y-4">
                  {/* Step Header with floating digits */}
                  <div className="flex justify-between items-center relative z-10">
                    <span className="font-serif text-3xl font-extrabold text-[#FAF8F5] select-none stroke-[#2D2A26] drop-shadow-sm" style={{ WebkitTextStroke: '1px #AF9467' }}>
                      {step.number}
                    </span>
                    <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DECCB2]/40 shrink-0">
                      {getStepIcon(step.number)}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-[#2D2A26] group-hover:text-[#AF9467] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#544F49] font-sans font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="h-0.5 w-8 bg-[#AF9467]/40 mt-4 rounded-full group-hover:w-full transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* Dynamic CTA Plaque */}
        <div className="bg-[#2D2A26] text-white p-8 sm:p-12 rounded shadow-md relative overflow-hidden mb-24 text-center" id="booking-cta-bar">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FFF_2px,transparent_2px)] [background-size:20px_20px]" />
          <div className="max-w-2xl mx-auto space-y-6 flex flex-col items-center">
            <span className="text-[10px] font-sans uppercase tracking-[0.34em] text-[#AF9467] font-semibold">Start Your Project Journey</span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-tight">
              Ready to give a gift that transcends the ordinary?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-sans font-light leading-relaxed">
              We look forward to bringing your exact thematic colors and celebration dreams to life. Touch base with our creative head directly via WhatsApp or Instagram to confirm queue slots.
            </p>
            <button
              onClick={handleInstagramChat}
              id="timeline-consult-button"
              className="px-8 py-3.5 bg-[#AF9467] text-white hover:bg-[#967B51] transition-all text-xs font-sans font-bold tracking-widest uppercase rounded shadow hover:shadow-lg cursor-pointer"
            >
              Start Your Free Consult Session
            </button>
          </div>
        </div>

        {/* FAQs Accordion Layout */}
        <div id="faqs" className="max-w-3xl mx-auto text-left">
          
          {/* FAQ Headers */}
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="p-2.5 rounded-full bg-[#AF9467]/10 text-[#AF9467] shrink-0 mb-2">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2A26]">
              Frequently Consulted Inquiries
            </h3>
            <p className="text-xs font-sans font-light text-[#8C8377] mt-1 uppercase tracking-widest">
              Answers from our creative concierge
            </p>
          </div>

          {/* Accordion list */}
          <div className="space-y-3" id="faqs-accordion-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  id={`faq-item-${index}`}
                  className="bg-white border border-[#EADFC9]/50 rounded overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4.5 sm:p-5 flex justify-between items-center text-left focus:outline-none hover:bg-[#FAF8F5] transition-colors"
                  >
                    <span className="font-serif text-sm sm:text-base font-semibold text-[#2D2A26] pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-[#AF9467] shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#544F49] font-sans font-light leading-relaxed border-t border-[#FAF8F5]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
