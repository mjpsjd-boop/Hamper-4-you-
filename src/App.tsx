import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GalleryShowcase from './components/GalleryShowcase';
import AboutFounder from './components/AboutFounder';
import DynamicInstagramFeed from './components/InstagramFeed';
import CustomPlanner from './components/CustomPlanner';
import BookingProcess from './components/BookingProcess';
import Footer from './components/Footer';
import SavedConceptsDrawer from './components/SavedConceptsDrawer';
import ArtisanalAdmin from './components/ArtisanalAdmin';
import BespokeCatalogue from './components/BespokeCatalogue';
import { ArrowUp, Star, Instagram, Sparkles } from 'lucide-react';
import { PHONE_NUMBER, SERVICE_ITEMS, DEFAULT_CATALOGUE_ITEMS, DEFAULT_STORIES } from './data';
import { ServiceItem, CatalogueItem, StoryItem, HeroImageItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

import luxuryHamperImg from './assets/images/luxury_hamper_1782028572273.jpg';
import bespokeRingPlatterImg from './assets/images/bespoke_ring_platter_1782028587949.jpg';
import nikahCertificateImg from './assets/images/nikah_certificate_1782028604455.jpg';

export default function App() {
  const [savedCount, setSavedCount] = useState(0);
  const [activePlannerServiceId, setActivePlannerServiceId] = useState("");
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'blueprint' | 'frontImages' | 'contact' | 'categories' | 'catalogue' | 'stories'>('blueprint');
  const [adminInitialIndex, setAdminInitialIndex] = useState<number>(0);

  const handleOpenAdminWithFocus = (
    tab: 'blueprint' | 'frontImages' | 'contact' | 'categories' | 'catalogue' | 'stories',
    index: number = 0
  ) => {
    setAdminInitialTab(tab);
    setAdminInitialIndex(index);
    setIsAdminOpen(true);
  };

  const [heroImages, setHeroImages] = useState<HeroImageItem[]>(() => {
    const defaultHeroImages: HeroImageItem[] = [
      {
        id: "card1",
        title: "The Gifting Chest",
        image: luxuryHamperImg,
        alt: "Luxury Customized Hamper Chest",
      },
      {
        id: "card2",
        title: "Illuminated Nikah Deed",
        image: nikahCertificateImg,
        alt: "Bespoke Illuminated Nikah Deed",
      },
      {
        id: "card3",
        title: "Traditional Ivory Ring Platter",
        image: bespokeRingPlatterImg,
        alt: "Bespoke Ceremonial Ring Platter",
      },
      {
        id: "card4",
        title: "Authentic Sealing Wax",
        image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600&auto=format&fit=crop",
        alt: "Atelier Sealing Wax and Matrices",
      },
    ];

    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('hampers_hero_images');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          return defaultHeroImages;
        }
      }
    }
    return defaultHeroImages;
  });

  const handleSaveHeroImages = (updated: HeroImageItem[]) => {
    setHeroImages(updated);
    localStorage.setItem('hampers_hero_images', JSON.stringify(updated));
  };

  const handleResetHeroImages = () => {
    const defaultHeroImages: HeroImageItem[] = [
      {
        id: "card1",
        title: "The Gifting Chest",
        image: luxuryHamperImg,
        alt: "Luxury Customized Hamper Chest",
      },
      {
        id: "card2",
        title: "Illuminated Nikah Deed",
        image: nikahCertificateImg,
        alt: "Bespoke Illuminated Nikah Deed",
      },
      {
        id: "card3",
        title: "Traditional Ivory Ring Platter",
        image: bespokeRingPlatterImg,
        alt: "Bespoke Ceremonial Ring Platter",
      },
      {
        id: "card4",
        title: "Authentic Sealing Wax",
        image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600&auto=format&fit=crop",
        alt: "Atelier Sealing Wax and Matrices",
      },
    ];
    setHeroImages(defaultHeroImages);
    localStorage.removeItem('hampers_hero_images');
  };
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('hampers_service_catalog');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          return SERVICE_ITEMS;
        }
      }
    }
    return SERVICE_ITEMS;
  });

  // Save modified specialties catalog data
  const handleSaveServiceItems = (updated: ServiceItem[]) => {
    setServiceItems(updated);
    localStorage.setItem('hampers_service_catalog', JSON.stringify(updated));
  };

  // Restore fallback original specialties catalog data
  const handleResetServiceItems = () => {
    setServiceItems(SERVICE_ITEMS);
    localStorage.removeItem('hampers_service_catalog');
  };

  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('hampers_catalogue_items');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          return DEFAULT_CATALOGUE_ITEMS;
        }
      }
    }
    return DEFAULT_CATALOGUE_ITEMS;
  });

  const handleSaveCatalogueItems = (updated: CatalogueItem[]) => {
    setCatalogueItems(updated);
    localStorage.setItem('hampers_catalogue_items', JSON.stringify(updated));
  };

  const handleResetCatalogueItems = () => {
    setCatalogueItems(DEFAULT_CATALOGUE_ITEMS);
    localStorage.removeItem('hampers_catalogue_items');
  };

  const [stories, setStories] = useState<StoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('hampers_curated_stories');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          return DEFAULT_STORIES;
        }
      }
    }
    return DEFAULT_STORIES;
  });

  const handleSaveStories = (updated: StoryItem[]) => {
    setStories(updated);
    localStorage.setItem('hampers_curated_stories', JSON.stringify(updated));
  };

  const handleResetStories = () => {
    setStories(DEFAULT_STORIES);
    localStorage.removeItem('hampers_curated_stories');
  };

  // Load count of saved concepts on initial render
  useEffect(() => {
    refreshSavedCount();
    
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const refreshSavedCount = () => {
    try {
      const savedRaw = localStorage.getItem('hampers_saved_concepts');
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        setSavedCount(parsed.length);
      } else {
        setSavedCount(0);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleOpenPlannerWithCategory = (serviceId: string) => {
    // Passes category tag down to planning customizer
    setActivePlannerServiceId(serviceId);
    
    // Smooth scroll down to customized element
    const plannerSec = document.getElementById('planner');
    if (plannerSec) {
      plannerSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLaunchDirectConsult = () => {
    const text = "Hi HAMPERS_4_YOU! I am checking your brand portfolio website and would like to start a direct design consultation session on Instagram.";
    navigator.clipboard.writeText(text).then(() => {
      alert("Exquisite greeting prompt copied to clipboard! Opening Instagram Direct Message window for your live creative session.");
    });
    window.open("https://ig.me/m/hampers_4_you_by_tasdiqa", '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative antialiased" id="luxury-app-root">
      
      {/* Scroll-to-Top and Floating Instagram Consultation Node */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40" id="floating-actions-dock">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              id="scroll-top-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="p-3 bg-white/95 backdrop-blur-sm border border-[#EADFC9] shadow-md rounded-full text-[#2D2A26] hover:text-[#AF9467] transition-all hover:shadow cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          id="floating-wa-btn"
          onClick={handleLaunchDirectConsult}
          className="p-4 bg-[#2D2A26] text-white hover:bg-[#AF9467] shadow-xl rounded-full flex items-center justify-center transition-all duration-300 relative group animate-bounce-slow cursor-pointer"
          title="Direct Consultation over Instagram"
        >
          <Instagram className="h-5 w-5" />
          <span className="absolute right-14 bg-white/95 text-[#2D2A26] text-[10px] font-sans font-bold tracking-widest uppercase border border-[#EADFC9] px-3 py-1.5 rounded-sm shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat Creative Head (IG)
          </span>
        </button>
      </div>

      {/* Header Panel */}
      <Header 
        savedConceptsCount={savedCount}
        onOpenPlanner={() => handleOpenPlannerWithCategory("hampers")}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenAdmin={() => handleOpenAdminWithFocus('blueprint', 0)}
      />

      {/* Main Sections Body */}
      <main id="luxury-main-content">
        <Hero 
          onPlanClick={() => handleOpenPlannerWithCategory("hampers")} 
          heroImages={heroImages} 
          onEditHeroCard={(idx) => handleOpenAdminWithFocus('frontImages', idx)}
        />
        
        {/* Dynamic Atelier Visual Catalogue above the premium service gallery */}
        <BespokeCatalogue 
          items={catalogueItems}
          onSelectStyle={(tagName) => {
            const plannerElement = document.getElementById('interactive-custom-planner');
            if (plannerElement) {
              plannerElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onEditCatalogue={(idx) => handleOpenAdminWithFocus('catalogue', idx)}
        />
        
        {/* Gallery specialties list */}
        <GalleryShowcase 
          onPlanSpecific={handleOpenPlannerWithCategory} 
          serviceItems={serviceItems}
          onEditCategory={(idx) => handleOpenAdminWithFocus('categories', idx)}
        />
        
        {/* Story Section */}
        <AboutFounder />

        {/* Dynamic Studio Instagram Feed & Creative Materials Portfolio */}
        <DynamicInstagramFeed 
          stories={stories} 
          onEditStory={(idx) => handleOpenAdminWithFocus('stories', idx)}
        />
        
        {/* Interactive Custom Planner */}
        <CustomPlanner 
          initialServiceId={activePlannerServiceId}
          onConceptsUpdated={(count) => setSavedCount(count)}
          onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        />
        
        {/* Booking Timeline & FAQ Panel */}
        <BookingProcess />
      </main>

      {/* Footer & Contact */}
      <Footer />

      {/* Slide-out Cart/Wishlist Drawer panel */}
      <AnimatePresence>
        {isSavedDrawerOpen && (
          <SavedConceptsDrawer 
            isOpen={isSavedDrawerOpen}
            onClose={() => setIsSavedDrawerOpen(false)}
            onRefresh={refreshSavedCount}
          />
        )}
      </AnimatePresence>

      {/* Artisanal Administration panel */}
      <ArtisanalAdmin 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        serviceItems={serviceItems}
        onSaveItems={handleSaveServiceItems}
        onResetDefaults={handleResetServiceItems}
        catalogueItems={catalogueItems}
        onSaveCatalogueItems={handleSaveCatalogueItems}
        onResetCatalogueItems={handleResetCatalogueItems}
        stories={stories}
        onSaveStories={handleSaveStories}
        onResetStories={handleResetStories}
        heroImages={heroImages}
        onSaveHeroImages={handleSaveHeroImages}
        onResetHeroImages={handleResetHeroImages}
        initialTab={adminInitialTab}
        initialIndex={adminInitialIndex}
      />

    </div>
  );
}
