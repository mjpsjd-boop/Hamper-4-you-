import React, { useState, useEffect } from 'react';
import { X, Save, RefreshCw, Check, Image as ImageIcon, Settings, Phone, Mail, Lock, LogOut, BookOpen, AlertCircle, Plus, Trash2, Heart, Edit3, HelpCircle } from 'lucide-react';
import { ServiceItem, CatalogueItem, StoryItem, HeroImageItem } from '../types';
import { motion } from 'motion/react';

interface ArtisanalAdminProps {
  isOpen: boolean;
  onClose: () => void;
  serviceItems: ServiceItem[];
  onSaveItems: (updatedItems: ServiceItem[]) => void;
  onResetDefaults: () => void;
  catalogueItems?: CatalogueItem[];
  onSaveCatalogueItems?: (updatedCats: CatalogueItem[]) => void;
  onResetCatalogueItems?: () => void;
  stories?: StoryItem[];
  onSaveStories?: (updatedStories: StoryItem[]) => void;
  onResetStories?: () => void;
  heroImages?: HeroImageItem[];
  onSaveHeroImages?: (updated: HeroImageItem[]) => void;
  onResetHeroImages?: () => void;
  initialTab?: 'blueprint' | 'frontImages' | 'contact' | 'categories' | 'catalogue' | 'stories';
  initialIndex?: number;
}

const GALLERY_PRESETS = [
  { url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop", name: "Premium Gift Chest" },
  { url: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop", name: "Traditional Hand-tied Ribbons" },
  { url: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600&auto=format&fit=crop", name: "Bronze Monogrammed Wax Stamp" },
  { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop", name: "Artisanal Wooden Cabinets" },
  { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop", name: "Exquisite Rings Ceremony Platter" },
  { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop", name: "Romantic Sage Floral Backdrop" },
  { url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop", name: "Muted Champagne Wedding Theme" },
  { url: "https://images.unsplash.com/photo-1507504038482-7621c518d50d?q=80&w=600&auto=format&fit=crop", name: "Illuminated Pen Script Sheets" },
  { url: "https://images.unsplash.com/photo-1534126511673-b68991578f6a?q=80&w=600&auto=format&fit=crop", name: "Luxury Delicate Chocolates" },
  { url: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=600&auto=format&fit=crop", name: "Classic Gold Floral Envelopes" },
  { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop", name: "Premium Organza & Gift Wraps" },
  { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop", name: "Aesthetic Calligraphy Inkwell" }
];

function AtelierImagePicker({ currentValue, onImageSelected, label }: { currentValue: string; onImageSelected: (val: string) => void; label: string }) {
  const [pickerTab, setPickerTab] = useState<'upload' | 'gallery' | 'url'>('gallery');
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageSelected(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageSelected(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2 border border-gray-100 rounded-sm p-3 bg-gray-50/50 text-left">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <span className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">
          {label}
        </span>
        <div className="flex space-x-1">
          {[
            { id: 'gallery', label: 'Presets Gallery' },
            { id: 'upload', label: 'Upload File' },
            { id: 'url', label: 'Pasted URL' }
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setPickerTab(t.id as any)}
              className={`px-2 py-0.5 text-[8px] tracking-widest uppercase font-bold rounded ${
                pickerTab === t.id ? 'bg-[#AF9467] text-white' : 'bg-white text-gray-400 border border-gray-200 hover:text-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        {pickerTab === 'gallery' && (
          <div className="grid grid-cols-4 gap-1.5 max-h-[140px] overflow-y-auto p-1 bg-white rounded border border-gray-100">
            {GALLERY_PRESETS.map((p, i) => {
              const isSelected = currentValue === p.url;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onImageSelected(p.url)}
                  title={p.name}
                  className={`relative aspect-square overflow-hidden rounded-sm border transition-all ${
                    isSelected ? 'ring-2 ring-[#AF9467] border-transparent scale-95' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/40 text-[7px] text-white py-0.5 truncate text-center font-sans">
                    {p.name}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {pickerTab === 'upload' && (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`cursor-pointer border-2 border-dashed rounded relative p-4 text-center transition-colors ${
              dragActive ? 'border-[#AF9467] bg-[#AF9467]/5' : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-1">
              <ImageIcon className="h-5 w-5 text-gray-400" />
              <span className="text-[10px] text-gray-500 font-sans">
                Drag photo here or <span className="text-[#AF9467] font-semibold">click to browse</span>
              </span>
              <span className="text-[8px] text-gray-400 font-sans uppercase tracking-[0.1em]">
                Saves directly to your web space
              </span>
            </div>
          </div>
        )}

        {pickerTab === 'url' && (
          <input
            type="text"
            value={currentValue || ''}
            onChange={(e) => onImageSelected(e.target.value)}
            className="w-full text-xs font-mono px-3 py-2 bg-white border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
            placeholder="Pasted custom photo URL (e.g., https://...)"
          />
        )}
      </div>

      {currentValue && (
        <div className="flex items-center space-x-2 pt-1 border-t border-gray-100 mt-1">
          <div className="h-7 w-7 rounded overflow-hidden border border-gray-200 shrink-0 bg-white">
            <img src={currentValue} className="w-full h-full object-cover" />
          </div>
          <span className="text-[9px] text-gray-400 font-mono truncate mr-2 block flex-1">
            Selected: {currentValue.startsWith('data:') ? 'Custom Private Upload' : currentValue}
          </span>
          <button
            type="button"
            onClick={() => onImageSelected('')}
            className="text-[9px] text-red-500 hover:underline uppercase tracking-wide font-black shrink-0"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default function ArtisanalAdmin({
  isOpen,
  onClose,
  serviceItems,
  onSaveItems,
  onResetDefaults,
  catalogueItems = [],
  onSaveCatalogueItems,
  onResetCatalogueItems,
  stories = [],
  onSaveStories,
  onResetStories,
  heroImages = [],
  onSaveHeroImages,
  onResetHeroImages,
  initialTab,
  initialIndex,
}: ArtisanalAdminProps) {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Security Credentials: Clear auth on every close/logout
  // DO NOT use session storage in order to enforce lock on modal close
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Default to Blueprint Guide tab to resolve user instructions and show layout positioning
  const [adminTab, setAdminTab] = useState<'blueprint' | 'frontImages' | 'contact' | 'categories' | 'catalogue' | 'stories'>('blueprint');

  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [activeCatalogueIndex, setActiveCatalogueIndex] = useState<number>(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [activeHeroIndex, setActiveHeroIndex] = useState<number>(0);

  // Sync state to focal control props when opening the admin center
  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setAdminTab(initialTab);
        if (typeof initialIndex === 'number' && initialIndex >= 0) {
          if (initialTab === 'categories') {
            setActiveCategoryIndex(initialIndex);
          } else if (initialTab === 'catalogue') {
            setActiveCatalogueIndex(initialIndex);
          } else if (initialTab === 'stories') {
            setActiveStoryIndex(initialIndex);
          } else if (initialTab === 'frontImages') {
            setActiveHeroIndex(initialIndex);
          }
        }
      }
    }
  }, [isOpen, initialTab, initialIndex]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'hamper@123321') {
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError('Access Denied: Incorrect password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAuthError(null);
  };

  const handleClose = () => {
    setPassword('');
    setAuthError(null);
    setIsAuthenticated(false); // Locks instantly on close
    onClose();
  };

  // Contacts State
  const [phone, setPhone] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hampers_phone_number') || "+1 (800) 555-4420";
    }
    return "+1 (800) 555-4420";
  });

  const [contactEmail, setContactEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hampers_contact_email') || "concierge@hampers4you.com";
    }
    return "concierge@hampers4you.com";
  });

  // Services State Form
  const activeItem = (serviceItems && serviceItems.length > 0) ? (serviceItems[activeCategoryIndex] || serviceItems[0]) : null;
  const [formData, setFormData] = useState({
    title: activeItem?.title || '',
    subtitle: activeItem?.subtitle || '',
    accentTitle: activeItem?.accentTitle || '',
    description: activeItem?.description || '',
    longCopy: activeItem?.longCopy || '',
    mainImage: activeItem?.mainImage || '',
    features: activeItem?.features?.join('\n') || '',
  });

  useEffect(() => {
    if (activeItem) {
      setFormData({
        title: activeItem.title || '',
        subtitle: activeItem.subtitle || '',
        accentTitle: activeItem.accentTitle || '',
        description: activeItem.description || '',
        longCopy: activeItem.longCopy || '',
        mainImage: activeItem.mainImage || '',
        features: activeItem.features?.join('\n') || '',
      });
    }
  }, [activeCategoryIndex, serviceItems, activeItem]);

  // Catalog State Form
  const activeCatItem = (catalogueItems && catalogueItems.length > 0) ? (catalogueItems[activeCatalogueIndex] || catalogueItems[0]) : null;
  const [catFormData, setCatFormData] = useState({
    title: activeCatItem?.title || '',
    subtitle: activeCatItem?.subtitle || '',
    description: activeCatItem?.description || '',
    image: activeCatItem?.image || '',
    tag: activeCatItem?.tag || '',
    dimensions: activeCatItem?.dimensions || '',
    medium: activeCatItem?.medium || '',
  });

  useEffect(() => {
    if (activeCatItem) {
      setCatFormData({
        title: activeCatItem.title || '',
        subtitle: activeCatItem.subtitle || '',
        description: activeCatItem.description || '',
        image: activeCatItem.image || '',
        tag: activeCatItem.tag || '',
        dimensions: activeCatItem.dimensions || '',
        medium: activeCatItem.medium || '',
      });
    }
  }, [activeCatalogueIndex, catalogueItems, activeCatItem]);

  // Stories State Form
  const activeStoryItem = (stories && stories.length > 0) ? (stories[activeStoryIndex] || stories[0]) : null;
  const [storyFormData, setStoryFormData] = useState({
    title: activeStoryItem?.title || '',
    storyImage: activeStoryItem?.storyImage || '',
    text: activeStoryItem?.text || '',
  });

  useEffect(() => {
    if (activeStoryItem) {
      setStoryFormData({
        title: activeStoryItem.title || '',
        storyImage: activeStoryItem.storyImage || '',
        text: activeStoryItem.text || '',
      });
    }
  }, [activeStoryIndex, stories, activeStoryItem]);

  // Founder/Atelier main brand profile form narrative state
  const [founderStoryFormData, setFounderStoryFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('hampers_founder_story');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {}
      }
    }
    return {
      title: "The Heart Behind HAMPERS_4_YOU",
      subtitle: "A Philosophy of Slow Gifting and Handcrafted Magic",
      quote: "Gifting is not a mere social exchange; it is the physical expression of a relationship's beauty. We make sure that your gratitude and celebration is felt in every ribbon thread, calligraphed curve, and wax seal crest.",
      paragraphs: [
        "HAMPERS_4_YOU was born out of a simple, yet powerful observation: in an increasingly digital, hyper-fast world, the deeply human act of gifting was becoming transactional. Beautiful boxes were packed on assembly lines, and greeting cards were printed in thousands with hollow sentiments. Our founder believed that a gift is more than physical content—it is a physical container of emotions, respect, and celebration.",
        "Driven by a lifelong love for classic paper calligraphies, textiles, and fine organic design, our founder set up an artisanal studio dedicated to reviving the art of customized slow-gifting. Each bespoke item—whether it is a carefully coordinated hamper box, a customized velvet ring platter, or a calligraphed sacred certificate—is designed by hand from the ground up, in close consultation with the client.",
        "Our creative workspace behaves like an haute-couture bridal house. We do not mass-produce, nor do we stock finished packages. We take time to discuss your vision, review the colors of your bridal attire, matching ribbons to the groom's sherwani, and curating elements that evoke deep nostalgic joy. It is this intense attention to detail and unyielding devotion to quality that transforms our creations into unforgettable wedding centerpieces."
      ]
    };
  });

  // Hero collage images state form
  const activeHeroCard = (heroImages && heroImages.length > 0) ? (heroImages[activeHeroIndex] || heroImages[0]) : null;
  const [heroFormData, setHeroFormData] = useState({
    title: activeHeroCard?.title || '',
    image: activeHeroCard?.image || '',
    alt: activeHeroCard?.alt || '',
  });

  useEffect(() => {
    if (activeHeroCard) {
      setHeroFormData({
        title: activeHeroCard.title || '',
        image: activeHeroCard.image || '',
        alt: activeHeroCard.alt || '',
      });
    }
  }, [activeHeroIndex, heroImages, activeHeroCard]);


  // Field Changes Handlers
  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCatFieldChange = (field: string, value: string) => {
    setCatFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStoryFieldChange = (field: string, value: string) => {
    setStoryFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleHeroFieldChange = (field: string, value: string) => {
    setHeroFormData((prev) => ({ ...prev, [field]: value }));
  };


  // Save events handles
  const handleSaveAllChanges = () => {
    // 1. Categories
    const updatedFeatures = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedList = serviceItems.map((item, idx) => {
      if (idx === activeCategoryIndex) {
        return {
          ...item,
          title: formData.title,
          subtitle: formData.subtitle,
          accentTitle: formData.accentTitle,
          description: formData.description,
          longCopy: formData.longCopy,
          mainImage: formData.mainImage,
          features: updatedFeatures,
        };
      }
      return item;
    });
    onSaveItems(updatedList);

    // 2. Catalogue
    if (onSaveCatalogueItems && activeCatItem) {
      const updatedCats = catalogueItems.map((cat, idx) => {
        if (idx === activeCatalogueIndex) {
          return {
            ...cat,
            title: catFormData.title,
            subtitle: catFormData.subtitle,
            description: catFormData.description,
            image: catFormData.image,
            tag: catFormData.tag,
            dimensions: catFormData.dimensions,
            medium: catFormData.medium,
          };
        }
        return cat;
      });
      onSaveCatalogueItems(updatedCats);
    }

    // 3. Instagram Backstage Stories
    if (onSaveStories && activeStoryItem) {
      const updatedStr = stories.map((st, idx) => {
        if (idx === activeStoryIndex) {
          return {
            ...st,
            title: storyFormData.title,
            storyImage: storyFormData.storyImage,
            text: storyFormData.text,
          };
        }
        return st;
      });
      onSaveStories(updatedStr);
    }

    // 4. Hero Collage front images
    if (onSaveHeroImages && activeHeroCard) {
      const updatedHeros = heroImages.map((card, idx) => {
        if (idx === activeHeroIndex) {
          return {
            ...card,
            title: heroFormData.title,
            image: heroFormData.image,
            alt: heroFormData.alt,
          };
        }
        return card;
      });
      onSaveHeroImages(updatedHeros);
    }

    // 5. Contact info
    localStorage.setItem('hampers_phone_number', phone);
    localStorage.setItem('hampers_contact_email', contactEmail);

    // 6. Founder / Atelier Story
    localStorage.setItem('hampers_founder_story', JSON.stringify(founderStoryFormData));

    // Force updates
    window.dispatchEvent(new Event('founder_story_updated'));

    setSuccessMsg("All changes saved safely! Reloading template details...");
    setTimeout(() => {
      setSuccessMsg(null);
      window.location.reload();
    }, 1200);
  };

  const handleAddNewCatalogueItem = () => {
    if (!onSaveCatalogueItems) return;
    const newItem: CatalogueItem = {
      id: "cat_" + Date.now(),
      title: "New Custom Product",
      subtitle: "Bespoke Creation Showcase",
      description: "Enter a brief narrative of this custom piece.",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
      tag: "Wedding Gifts",
      dimensions: "12\" x 12\" Size",
      medium: "Plush Velvet, Silk ribbons, Keepsake box"
    };
    const updated = [...catalogueItems, newItem];
    onSaveCatalogueItems(updated);
    setActiveCatalogueIndex(updated.length - 1);
    setSuccessMsg("Successfully added new product to carousel!");
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleDeleteCatalogueItem = (idx: number) => {
    if (!onSaveCatalogueItems) return;
    if (catalogueItems.length <= 1) {
      alert("At least one catalogue product is required to keep page integrity.");
      return;
    }
    if (window.confirm("Do you want to delete this product item from your website catalogue list?")) {
      const updated = catalogueItems.filter((_, i) => i !== idx);
      onSaveCatalogueItems(updated);
      setActiveCatalogueIndex(0);
      setSuccessMsg("Deleted portfolio product.");
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  const handleAddNewStoryItem = () => {
    if (!onSaveStories) return;
    const newItem: StoryItem = {
      id: "story_" + Date.now(),
      title: "New Behind Story",
      storyImage: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop",
      text: "Write standard backstage text here about your handcrafted materials, details, or choices."
    };
    const updated = [...stories, newItem];
    onSaveStories(updated);
    setActiveStoryIndex(updated.length - 1);
    setSuccessMsg("Added a new Behind-the-Scenes highlight!");
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleDeleteStoryItem = (idx: number) => {
    if (!onSaveStories) return;
    if (stories.length <= 1) {
      alert("At least one story item must be present.");
      return;
    }
    if (window.confirm("Do you want to delete this story highlight item?")) {
      const updated = stories.filter((_, i) => i !== idx);
      onSaveStories(updated);
      setActiveStoryIndex(0);
      setSuccessMsg("Erased backstage story.");
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  const handleResetToOriginal = () => {
    if (window.confirm("Revert your changes back to original defaults? All customized texts, presets, and images will be restored to template original states.")) {
      onResetDefaults();
      if (onResetCatalogueItems) onResetCatalogueItems();
      if (onResetStories) onResetStories();
      if (onResetHeroImages) onResetHeroImages();
      
      localStorage.removeItem('hampers_phone_number');
      localStorage.removeItem('hampers_contact_email');
      localStorage.removeItem('hampers_founder_story');
      localStorage.removeItem('hampers_hero_images');
      
      setSuccessMsg("Restoring default configurations...");
      setTimeout(() => {
        setSuccessMsg(null);
        window.location.reload();
      }, 1200);
    }
  };

  if (!isOpen) return null;

  // Security Wall: Pure State, clears instantly onClose
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-[#2D2A26]/85 backdrop-blur-sm" id="artisanal-admin-overlay">
        <div className="absolute inset-0 cursor-pointer" onClick={handleClose} />

        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-sm bg-[#FAF8F5] p-8 rounded border border-[#EADFC9] z-10 shadow-2xl text-center flex flex-col items-center"
        >
          <div className="p-3 bg-[#AF9467]/15 text-[#AF9467] rounded-full mb-4">
            <Lock className="h-6 w-6" />
          </div>
          
          <h2 className="font-serif text-lg font-bold tracking-[0.1em] text-[#2D2A26] uppercase mb-1">
            Studio Web Manager Login
          </h2>
          <p className="text-[10px] font-sans text-[#8C8377] uppercase tracking-wider mb-6">
            Input password to open content options
          </p>

          <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-sans tracking-widest font-bold text-[#544F49] block">
                Editor Password
              </label>
              <input
                type="password"
                required
                value={password}
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError(null);
                }}
                className="w-full text-sm font-sans px-4 py-3 bg-white border border-[#DECCB2]/80 focus:border-[#AF9467] focus:outline-hidden text-[#2D2A26] rounded-sm text-center tracking-widest font-mono font-bold"
                placeholder="••••••••••••"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-[11px] font-sans font-semibold text-red-600 text-center">
                {authError}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 bg-white hover:bg-[#FAF8F5] text-[#2D2A26] border border-[#DECCB2] text-[10px] font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-[10px] font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-sm shadow-md cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-5 text-[8px] font-sans tracking-widest text-[#8C8377]/80 uppercase">
            Passkey: hamper@123321
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" id="artisanal-admin-overlay">
      <div 
        className="absolute inset-0 bg-[#2D2A26]/80 backdrop-blur-xs transition-opacity duration-300"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 border-l border-[#EADFC9]/50 overflow-hidden">
        
        {/* Simple friendly Header layout */}
        <div className="bg-[#2D2A26] text-white px-6 py-4 flex items-center justify-between border-b border-[#AF9467]/20 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#AF9467]/20 text-[#AF9467] rounded">
              <Settings className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h2 className="font-serif text-base font-bold tracking-wider uppercase">
                Artisanal Studio Editor
              </h2>
              <p className="text-[10px] text-gray-300 font-sans tracking-wide">
                Easily change front images, contact details, stories, and showcase items
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded hover:bg-white/5 flex items-center space-x-1 py-1 px-2.5 text-[9px] uppercase tracking-wider font-sans font-bold border border-red-500/20 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out & Lock</span>
            </button>
            <button onClick={handleClose} className="p-1 text-gray-400 hover:text-[#AF9467] transition-colors rounded hover:bg-white/5 cursor-pointer">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Nav tabs keeping it very clean, spacious, and simple */}
        <div className="bg-[#F3EDE4]/60 border-b border-[#EADFC9]/40 px-6 py-3 flex space-x-2 overflow-x-auto shrink-0">
          {[
            { id: 'blueprint', title: '🗺️ Placement Blueprint' },
            { id: 'frontImages', title: '🖼️ Front Collage' },
            { id: 'stories', title: '📝 Atelier Stories' },
            { id: 'categories', title: '🌸 Main Categories' },
            { id: 'catalogue', title: '🛍️ Carousel Products' },
            { id: 'contact', title: '📞 Shop Contact' },
          ].map((tab) => {
            const isSelected = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAdminTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#2D2A26] text-white shadow-xs'
                    : 'bg-white hover:bg-gray-100 text-[#544F49] border border-gray-200'
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Main Panel Content Scroll Node */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {successMsg && (
            <div className="bg-[#AF9467]/15 border border-[#AF9467]/40 p-3 rounded text-xs text-[#8C7A5C] font-sans font-semibold flex items-center space-x-2 sticky top-0 bg-white z-10 shadow-xs">
              <Check className="h-4 w-4 text-[#AF9467]" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 0: PLACEMENT BLUEPRINT */}
          {adminTab === 'blueprint' && (
            <div className="space-y-5 text-left" id="placement-blueprint-tab">
              <div className="bg-[#AF9467]/10 p-5 rounded border border-[#AF9467]/20">
                <span className="text-xs uppercase font-sans tracking-wider font-bold text-[#AF9467] flex items-center space-x-1.5 mb-1.5">
                  <HelpCircle className="h-4 w-4 text-[#AF9467]" />
                  <span>Interactive Image Layout & Sequence Blueprint Guide</span>
                </span>
                <p className="text-[11px] text-[#544F49] font-sans leading-relaxed">
                  Welcome to the Atelier Media Guide. Every precious photograph displayed on the website catalog is structured in specific, logical order. Below is a blueprint map of the website. Select a section to jump directly to its editor or see how the image sequence flows.
                </p>
              </div>

              {/* Wireframe Diagram of Website Layout */}
              <div className="bg-[#2D2A26] rounded-lg p-5 text-white border border-[#AF9467]/30 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#AF9467]">Interactive Website Wireframe Map</span>
                  <span className="text-[8px] bg-[#AF9467] text-white px-2 py-0.5 rounded font-mono tracking-wider font-bold">LIVE ATLAS</span>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  {/* Schematic box representing Hero Section */}
                  <div className="border border-[#AF9467]/40 rounded p-3 bg-white/5 space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#AF9467] font-bold">
                      <span>1. HERO HEADER LANDING</span>
                      <span className="text-gray-400">4-Card Carousel Pile</span>
                    </div>
                    <p className="text-[10px] text-gray-300">
                      Placed at the absolute top-right of your landing dashboard. Features a classic set of overlapping polaroid cards.
                    </p>
                    <div className="grid grid-cols-4 gap-2 pt-2 text-[8px] text-center uppercase font-mono tracking-wider">
                      <div className="bg-white/10 p-2 rounded border border-white/10 text-white hover:bg-[#AF9467] hover:border-transparent transition-all cursor-pointer" onClick={() => setAdminTab('frontImages')}>
                        <span className="block font-bold">1st Slot</span>
                        <span className="text-[7px] text-gray-400">Card 1</span>
                      </div>
                      <div className="bg-white/10 p-2 rounded border border-white/10 text-white hover:bg-[#AF9467] hover:border-transparent transition-all cursor-pointer" onClick={() => setAdminTab('frontImages')}>
                        <span className="block font-bold">2nd Slot</span>
                        <span className="text-[7px] text-gray-400">Card 2</span>
                      </div>
                      <div className="bg-white/10 p-2 rounded border border-white/10 text-white hover:bg-[#AF9467] hover:border-transparent transition-all cursor-pointer" onClick={() => setAdminTab('frontImages')}>
                        <span className="block font-bold">3rd Slot</span>
                        <span className="text-[7px] text-gray-400">Card 3</span>
                      </div>
                      <div className="bg-white/10 p-2 rounded border border-white/10 text-white hover:bg-[#AF9467] hover:border-transparent transition-all cursor-pointer" onClick={() => setAdminTab('frontImages')}>
                        <span className="block font-bold">4th Slot</span>
                        <span className="text-[7px] text-gray-400">Card 4</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setAdminTab('frontImages')}
                      className="mt-2 text-[9px] text-[#AF9467] hover:underline flex items-center justify-end w-full cursor-pointer bg-transparent border-0 font-bold uppercase tracking-wider"
                    >
                      Configure Collage Images →
                    </button>
                  </div>

                  {/* Schematic box representing Categories tab deck */}
                  <div className="border border-[#AF9467]/40 rounded p-3 bg-white/5 space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#AF9467] font-bold">
                      <span>2. SPECIALTY CATEGORY DECK</span>
                      <span className="text-gray-400">5 Boutique Portfolios</span>
                    </div>
                    <p className="text-[10px] text-gray-300">
                      Located in the main middle frame. Contains full-width panorama background image banners mapping to premium services.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {serviceItems.map((item, idx) => (
                        <div 
                          key={item.id} 
                          onClick={() => { setActiveCategoryIndex(idx); setAdminTab('categories'); }}
                          className="bg-white/10 px-2 py-1 rounded text-[8px] border border-white/10 hover:bg-[#AF9467] hover:border-transparent transition-all cursor-pointer truncate max-w-[120px] font-mono text-white"
                        >
                          {idx + 1}. {item.title}
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setAdminTab('categories')}
                      className="mt-2 text-[9px] text-[#AF9467] hover:underline flex items-center justify-end w-full cursor-pointer bg-transparent border-0 font-bold uppercase tracking-wider"
                    >
                      Configure Category Artworks →
                    </button>
                  </div>

                  {/* Schematic box representing Product Showcase Carousel */}
                  <div className="border border-[#AF9467]/40 rounded p-3 bg-white/5 space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#AF9467] font-bold">
                      <span>3. ATELIER BOOK CAROUSEL SLIDER</span>
                      <span className="text-gray-400">Horizontal Sliding pages [Left-to-Right]</span>
                    </div>
                    <p className="text-[10px] text-gray-300">
                      Elegant editorial layout displaying custom-commissioned masterpieces page-by-page. Follows exact catalog list position.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2" id="blueprint-carousel-list">
                      {catalogueItems.map((item, idx) => (
                        <div 
                          key={item.id} 
                          onClick={() => { setActiveCatalogueIndex(idx); setAdminTab('catalogue'); }}
                          className="bg-white/10 px-2 py-1 rounded text-[8px] border border-white/10 hover:bg-[#AF9467] hover:border-transparent transition-all cursor-pointer truncate max-w-[150px] font-mono text-gray-200"
                        >
                          Page {idx + 1}: {item.title}
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setAdminTab('catalogue')}
                      className="mt-2 text-[9px] text-[#AF9467] hover:underline flex items-center justify-end w-full cursor-pointer bg-transparent border-0 font-bold uppercase tracking-wider"
                    >
                      Configure Showcase Slide Items →
                    </button>
                  </div>

                  {/* Schematic box representing Social / Backstage Reels */}
                  <div className="border border-[#AF9467]/40 rounded p-3 bg-white/5 space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#AF9467] font-bold">
                      <span>4. ATELIER BACKSTAGE STORY REELS</span>
                      <span className="text-gray-400">Horizontal Circles Indicator [Left-to-Right]</span>
                    </div>
                    <p className="text-[10px] text-gray-300">
                      Located in the backstage sector above the planning desk, displaying circular highlights. Plays full text on click.
                    </p>
                    <div className="flex items-center space-x-2 pt-2 overflow-x-auto pb-1">
                      {stories.map((item, idx) => (
                        <div 
                          key={item.id} 
                          onClick={() => { setActiveStoryIndex(idx); setAdminTab('stories'); }}
                          className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[8px] hover:border-[#AF9467] hover:bg-[#AF9467] transition-all cursor-pointer shrink-0 text-white font-mono"
                          title={item.title}
                        >
                          Story {idx + 1}
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setAdminTab('stories')}
                      className="mt-2 text-[9px] text-[#AF9467] hover:underline flex items-center justify-end w-full cursor-pointer bg-transparent border-0 font-bold uppercase tracking-wider"
                    >
                      Configure Highlights & Stories →
                    </button>
                  </div>
                </div>
              </div>

              {/* Complete Guideline Sequence list with strict rules */}
              <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
                <h3 className="text-xs font-sans uppercase font-bold text-[#2D2A26] border-b border-gray-100 pb-2">📋 Image Sequence & Layout Guidelines</h3>
                
                <div className="space-y-3.5 divide-y divide-gray-100 text-xs">
                  <div className="pt-1.5 space-y-1">
                    <span className="text-xs font-semibold text-[#2D2A26] block">🖼️ Section 1: Hero Front Collage (Home top-section panel)</span>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      This consists of exactly <strong>4 overlapping polaroid-concept cards</strong>.
                    </p>
                    <ul className="list-disc list-inside text-[10px] text-gray-500 pl-2 space-y-0.5">
                      <li><strong>Card #1 (Top Left slot)</strong>: Base layout, straight bounds. Holds your introductory luxury box image.</li>
                      <li><strong>Card #2 (Top Right slot)</strong>: Rotated straight. Rides overlapping adjacent cards.</li>
                      <li><strong>Card #3 (Bottom Right slot)</strong>: Styled clockwise rotated (+4deg). Sits on top of the stack.</li>
                      <li><strong>Card #4 (Bottom Left slot)</strong>: Styled counter-clockwise rotated (-6deg). Forms the foundational overlap.</li>
                    </ul>
                    <span className="text-[10px] text-[#AF9467] font-semibold block mt-1">
                      💡 Recommended: Clean portrait (3:4) or square (1:1) compositions.
                    </span>
                  </div>

                  <div className="pt-3.5 space-y-1">
                    <span className="text-xs font-semibold text-[#2D2A26] block">🌸 Section 2: Specialty Main Category Deck (Middle page tabs)</span>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      These are the interactive category slots in the center of the website. The list index dictates the ordering. Change images here to swap out background banners safely.
                    </p>
                    <span className="text-[10px] text-[#AF9467] font-semibold block mt-1">
                      💡 Recommended: Wide panoramic landscape frames (16:9 ratio) work best because text overlays rest directly over these backdrops.
                    </span>
                  </div>

                  <div className="pt-3.5 space-y-1">
                    <span className="text-xs font-semibold text-[#2D2A26] block">🛍️ Section 3: Curated Showcase Carousel (Horizontal page-book slider)</span>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      Rendered on the page as a paginated, sliding editorial book.
                    </p>
                    <ul className="list-disc list-inside text-[10px] text-gray-500 pl-2 space-y-0.5">
                      <li>The **First Item** in your item tab list always appears on <strong>Page 1</strong>.</li>
                      <li>The **Second Item** appears on <strong>Page 2</strong>.</li>
                      <li>You can rearrange, delete, or append items. They will sequentially flow left-to-right.</li>
                    </ul>
                    <span className="text-[10px] text-[#AF9467] font-semibold block mt-1">
                      💡 Recommended: Crisp portrait shots of individual components (3:4 or 4:5 ratios).
                    </span>
                  </div>

                  <div className="pt-3.5 space-y-1">
                    <span className="text-xs font-semibold text-[#2D2A26] block">📝 Section 4: Behind the Scenes Stories (Horizontal circles feed)</span>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      Rendered above the custom planner. Appears as a sequence of circular instagram-like highlights. The horizontal layout flows organically from left to right as added in the stories timeline.
                    </p>
                    <span className="text-[10px] text-[#AF9467] font-semibold block mt-1">
                      💡 Recommended: Clean lifestyle photos (vertical 9:16 portrait or tight squares) of creative processes (ribbon spools, calligraphers in action, wax stamp waxes, or fabric swatches).
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: FRONT IMAGES (Collage) */}
          {adminTab === 'frontImages' && (
            <div className="space-y-4">
              <div className="bg-[#AF9467]/10 p-4 rounded border border-[#AF9467]/20 text-left">
                <span className="text-xs uppercase font-sans tracking-wider font-bold text-[#AF9467] flex items-center space-x-1">
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>Interactive Collage Editor</span>
                </span>
                <p className="text-[10px] text-[#544F49] font-sans mt-1 leading-relaxed">
                  These 4 images make up the beautiful twisted/overlapping collage cards situated on the top right-hand side of your homepage. Select a card index below to swap its text or picture.
                </p>
              </div>

              <div className="bg-white p-4 rounded border border-gray-200 text-left">
                <span className="text-[9px] uppercase font-sans font-bold text-gray-400 tracking-wider block mb-2">Step 1: Selected card index to modify</span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { key: 0, label: "Top Left (Card 1)", val: "card1" },
                    { key: 1, label: "Top Right (Card 2)", val: "card2" },
                    { key: 2, label: "Bottom Right (Card 3)", val: "card3" },
                    { key: 3, label: "Bottom Left (Card 4)", val: "card4" }
                  ].map((card) => {
                    const isSelected = activeHeroIndex === card.key;
                    const cardData = heroImages[card.key] || { title: '', image: '' };
                    return (
                      <button
                        key={card.key}
                        type="button"
                        onClick={() => setActiveHeroIndex(card.key)}
                        className={`p-2 rounded text-center border text-[9px] font-sans font-bold uppercase transition-all flex flex-col items-center space-y-1.5 ${
                          isSelected ? 'bg-[#2D2A26] text-white border-transparent' : 'bg-[#FAF8F5] text-gray-700 border-gray-200 hover:border-[#AF9467]'
                        }`}
                      >
                        <span className="truncate w-full">{card.label}</span>
                        {cardData.image && (
                          <div className="h-6 w-10 overflow-hidden rounded bg-white border border-gray-200">
                            <img src={cardData.image} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeHeroCard && (
                <div className="bg-white p-5 rounded border border-gray-200 shadow-xs text-left space-y-4">
                  <div className="border-b border-gray-100 pb-2">
                    <h3 className="text-xs font-sans uppercase font-bold text-[#2D2A26]">🖼️ Card #{activeHeroIndex + 1} Settings - {heroFormData.title || "No Title"}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Card Slogan / Tagline</label>
                      <input
                        type="text"
                        value={heroFormData.title}
                        onChange={(e) => handleHeroFieldChange('title', e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                        placeholder="e.g. Exclusive Gifting"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Description details (Accessibility/Alt Text)</label>
                      <input
                        type="text"
                        value={heroFormData.alt}
                        onChange={(e) => handleHeroFieldChange('alt', e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#544F49] rounded focus:outline-hidden"
                        placeholder="e.g. Authentic Sealing Wax with Ribbon"
                      />
                    </div>

                    {/* Integrated Atelier Image Picker */}
                    <AtelierImagePicker
                      label="Upload Own Photo or Choose Custom Preset Image"
                      currentValue={heroFormData.image}
                      onImageSelected={(val) => handleHeroFieldChange('image', val)}
                    />
                  </div>

                  <div className="pt-2">
                    <p className="text-[9px] font-sans text-[#8C8377] pb-2">
                      💡 Click apply to instantly compile changes onto the home slideshow representation!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (!onSaveHeroImages) return;
                        const copy = [...heroImages];
                        copy[activeHeroIndex] = {
                          id: activeHeroCard.id,
                          title: heroFormData.title,
                          image: heroFormData.image,
                          alt: heroFormData.alt
                        };
                        onSaveHeroImages(copy);
                        setSuccessMsg("Collage slot updated successfully!");
                        setTimeout(() => setSuccessMsg(null), 2000);
                      }}
                      className="w-full py-2.5 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Check className="h-4 w-4" />
                      <span>Update Collage Image Slot</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* TAB 2: ATELIER STORIES */}
          {adminTab === 'stories' && (
            <div className="space-y-6">
              
              {/* SECTION A: ATELIER FOUNDER NARRATIVE BRAND STORY (requested item) */}
              <div className="bg-white p-5 rounded border border-gray-200 text-left space-y-4 shadow-sm">
                <div className="border-b border-gray-100 pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-sans uppercase font-bold text-[#2D2A26] flex items-center space-x-1.5">
                      <BookOpen className="h-4 w-4 text-[#AF9467]" />
                      <span>Edit Atelier Story & Founders Profile</span>
                    </h3>
                    <p className="text-[9px] text-[#8C8377] font-sans mt-0.5">This edits the comprehensive storytelling section located below your main specialty cards.</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49]">Main Story Heading</label>
                    <input
                      type="text"
                      value={founderStoryFormData.title}
                      onChange={(e) => setFounderStoryFormData({ ...founderStoryFormData, title: e.target.value })}
                      className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49]">Story Subtitle</label>
                    <input
                      type="text"
                      value={founderStoryFormData.subtitle}
                      onChange={(e) => setFounderStoryFormData({ ...founderStoryFormData, subtitle: e.target.value })}
                      className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49]">Founder Quote</label>
                    <textarea
                      rows={2}
                      value={founderStoryFormData.quote}
                      onChange={(e) => setFounderStoryFormData({ ...founderStoryFormData, quote: e.target.value })}
                      className="w-full text-xs font-serif italic px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#AF9467] rounded focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] block -mb-1">Narrative Paragraphs (3 brief storytelling blocks)</label>
                    {founderStoryFormData.paragraphs.map((p: string, idx: number) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[8px] uppercase tracking-wider font-bold text-gray-400">Paragraph #{idx + 1}</span>
                        <textarea
                          rows={3}
                          value={p}
                          onChange={(e) => {
                            const parCopy = [...founderStoryFormData.paragraphs];
                            parCopy[idx] = e.target.value;
                            setFounderStoryFormData({ ...founderStoryFormData, paragraphs: parCopy });
                          }}
                          className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#544F49] rounded focus:outline-hidden"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem('hampers_founder_story', JSON.stringify(founderStoryFormData));
                        window.dispatchEvent(new Event('founder_story_updated'));
                        setSuccessMsg("Atelier main brand profile narrative updated live!");
                        setTimeout(() => setSuccessMsg(null), 2000);
                      }}
                      className="w-full py-2 bg-[#AF9467] hover:bg-[#2D2A26] text-white text-[9px] font-sans font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center space-x-1"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Save Brand Story Narrative</span>
                    </button>
                  </div>
                </div>
              </div>


              {/* SECTION B: BEHIND THE SCENES INSTAGRAM STORY HIGHLIGHTS */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded border border-gray-200 text-left space-y-4 shadow-sm">
                  <div className="border-b border-gray-100 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h3 className="text-xs font-sans uppercase font-bold text-[#2D2A26] flex items-center space-x-1.5">
                        <ImageIcon className="h-4 w-4 text-[#AF9467]" />
                        <span>Edit Backstage IG highlights</span>
                      </h3>
                      <p className="text-[9px] text-[#8C8377] font-sans mt-0.5">These visual blocks reside over the Instagram custom feeds.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddNewStoryItem}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-[#AF9467]/10 text-[#AF9467] text-[8px] font-sans font-bold uppercase tracking-widest rounded border border-[#AF9467]/20 flex items-center space-x-1"
                    >
                      <Plus className="h-2.5 w-2.5" />
                      <span>New highlight</span>
                    </button>
                  </div>

                  {stories && stories.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1 bg-[#FAF8F5] p-2 rounded border border-gray-100">
                        {stories.map((str, idx) => {
                          const isSelected = idx === activeStoryIndex;
                          return (
                            <div key={str.id} className="relative group/tag">
                              <button
                                type="button"
                                onClick={() => setActiveStoryIndex(idx)}
                                className={`px-3 py-1 text-[9px] tracking-wider uppercase font-bold rounded-sm border transition-all ${
                                  isSelected ? 'bg-[#AF9467] text-white border-transparent' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                }`}
                              >
                                {str.title || `Story slot #${idx + 1}`}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteStoryItem(idx)}
                                className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity z-10"
                              >
                                <Trash2 className="h-2 w-2" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {activeStoryItem && (
                        <div className="space-y-4 pt-1">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Highlight Title</label>
                              <input
                                type="text"
                                value={storyFormData.title}
                                onChange={(e) => handleStoryFieldChange('title', e.target.value)}
                                className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              {/* Integrated Atelier Image Picker */}
                              <AtelierImagePicker
                                label="Highlight Cover Image"
                                currentValue={storyFormData.storyImage}
                                onImageSelected={(val) => handleStoryFieldChange('storyImage', val)}
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Behind Narrative Detail</label>
                            <textarea
                              rows={2.5}
                              value={storyFormData.text}
                              onChange={(e) => handleStoryFieldChange('text', e.target.value)}
                              className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                            />
                          </div>

                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (!onSaveStories) return;
                                const copy = [...stories];
                                copy[activeStoryIndex] = {
                                  id: activeStoryItem.id,
                                  title: storyFormData.title,
                                  storyImage: storyFormData.storyImage,
                                  text: storyFormData.text
                                };
                                onSaveStories(copy);
                                setSuccessMsg("Backstage highlight updated successfully!");
                                setTimeout(() => setSuccessMsg(null), 2000);
                              }}
                              className="w-full py-2 bg-[#2D2A26] text-white text-[9px] tracking-widest uppercase font-bold rounded flex items-center justify-center space-x-1"
                            >
                              <Check className="h-3.5 w-3.5" />
                              <span>Update backstage highlight card</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-[10px]">No highlight elements found.</p>
                  )}
                </div>
              </div>

            </div>
          )}


          {/* TAB 3: SERVICES MAIN CATEGORIES */}
          {adminTab === 'categories' && (
            <div className="space-y-4">
              <div className="bg-[#FAF8F5] p-3 rounded border border-gray-200 text-left">
                <span className="text-[9px] uppercase font-sans font-bold text-gray-400 tracking-wider block mb-2">Step 1: Selected main category to modify</span>
                <div className="flex flex-wrap gap-1.5">
                  {serviceItems.map((item, idx) => {
                    const isSelected = idx === activeCategoryIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveCategoryIndex(idx)}
                        className={`px-3 py-1 text-[9px] tracking-wider uppercase font-bold rounded transiton-all ${
                          isSelected ? 'bg-[#AF9467] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-[#AF9467]'
                        }`}
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeItem && (
                <div className="bg-white p-5 rounded border border-gray-200 shadow-xs text-left space-y-4">
                  <div className="border-b border-gray-100 pb-2">
                    <h3 className="text-xs font-sans uppercase font-bold text-[#2D2A26]">🌸 Category Card - {activeItem.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Collection Name</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Subtitle Tagline</label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Slogan quote banner</label>
                      <input
                        type="text"
                        value={formData.accentTitle}
                        onChange={(e) => handleFieldChange('accentTitle', e.target.value)}
                        className="w-full text-xs font-serif italic px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#AF9467] rounded focus:outline-hidden"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      {/* Integrated Atelier Image Picker */}
                      <AtelierImagePicker
                        label="Category Main Image / Artwork link"
                        currentValue={formData.mainImage}
                        onImageSelected={(val) => handleFieldChange('mainImage', val)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Brief Pitch Summary</label>
                    <textarea
                      rows={2}
                      value={formData.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#544F49] rounded focus:outline-hidden resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Detailed Craft Narrative Description</label>
                    <textarea
                      rows={3}
                      value={formData.longCopy}
                      onChange={(e) => handleFieldChange('longCopy', e.target.value)}
                      className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Specialty Specs (one specification item per line)</label>
                    <textarea
                      rows={3}
                      value={formData.features}
                      onChange={(e) => handleFieldChange('features', e.target.value)}
                      className="w-full text-xs font-mono px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                      placeholder="e.g. Silk ribbons hand-frayed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSaveAllChanges}
                      className="w-full py-2.5 bg-[#2D2A26] text-white text-[9px] tracking-widest uppercase font-bold rounded flex items-center justify-center space-x-1"
                    >
                      <Check className="h-4 w-4" />
                      <span>Update Category card details</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* TAB 4: PRODUCT CATALOG */}
          {adminTab === 'catalogue' && (
            <div className="space-y-4">
              <div className="bg-[#FAF8F5] p-3 rounded border border-gray-200 text-left flex justify-between items-center">
                <div>
                  <span className="text-[9px] uppercase font-sans font-bold text-gray-400 tracking-wider block mb-1">Step 1: Selected catalogue display item to modify</span>
                </div>
                <button
                  type="button"
                  onClick={handleAddNewCatalogueItem}
                  className="px-2.5 py-1 bg-[#AF9467] hover:bg-[#2D2A26] text-white text-[8px] font-sans font-bold uppercase tracking-widest rounded flex items-center space-x-1 shrink-0 transition-colors"
                >
                  <Plus className="h-2.5 w-2.5" />
                  <span>Add product item</span>
                </button>
              </div>

              {catalogueItems && catalogueItems.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1 bg-[#FAF8F5] p-2 rounded border border-gray-100">
                    {catalogueItems.map((item, idx) => {
                      const isSelected = idx === activeCatalogueIndex;
                      return (
                        <div key={item.id} className="relative group/tag flex items-center">
                          <button
                            type="button"
                            onClick={() => setActiveCatalogueIndex(idx)}
                            className={`px-3 py-1 text-[9px] tracking-wider uppercase font-bold rounded-sm border transition-all cursor-pointer ${
                              isSelected ? 'bg-[#AF9467] text-white border-transparent' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {item.title}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCatalogueItem(idx)}
                            className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity z-10"
                          >
                            <Trash2 className="h-2 w-2" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {activeCatItem && (
                    <div className="bg-white p-5 rounded border border-gray-200 shadow-xs text-left space-y-4">
                      <div className="border-b border-[#EADFC9]/30 pb-2 bg-[#FAF8F5] -mx-5 -mt-5 p-4 rounded-t border-b border-gray-200">
                        <h4 className="text-xs font-sans uppercase font-bold text-[#2D2A26]">🛍️ Edit Item: {activeCatItem.title}</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Product Name / Title</label>
                          <input
                            type="text"
                            value={catFormData.title}
                            onChange={(e) => handleCatFieldChange('title', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Category Category Stamp</label>
                          <input
                            type="text"
                            value={catFormData.tag}
                            onChange={(e) => handleCatFieldChange('tag', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Product subtitle</label>
                          <input
                            type="text"
                            value={catFormData.subtitle}
                            onChange={(e) => handleCatFieldChange('subtitle', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Structure size details</label>
                          <input
                            type="text"
                            value={catFormData.dimensions}
                            onChange={(e) => handleCatFieldChange('dimensions', e.target.value)}
                            className="w-full text-[11px] font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Materials texture specifications</label>
                          <input
                            type="text"
                            value={catFormData.medium}
                            onChange={(e) => handleCatFieldChange('medium', e.target.value)}
                            className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          {/* Integrated Atelier Image Picker */}
                          <AtelierImagePicker
                            label="Catalogue Showcase Photo / Artwork Link"
                            currentValue={catFormData.image}
                            onImageSelected={(val) => handleCatFieldChange('image', val)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Product Description Narratives</label>
                        <textarea
                          rows={2.5}
                          value={catFormData.description}
                          onChange={(e) => handleCatFieldChange('description', e.target.value)}
                          className="w-full text-xs font-sans px-3 py-2 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded focus:outline-hidden"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!onSaveCatalogueItems) return;
                            const copy = [...catalogueItems];
                            copy[activeCatalogueIndex] = {
                              id: activeCatItem.id,
                              title: catFormData.title,
                              subtitle: catFormData.subtitle,
                              description: catFormData.description,
                              image: catFormData.image,
                              tag: catFormData.tag,
                              dimensions: catFormData.dimensions,
                              medium: catFormData.medium
                            };
                            onSaveCatalogueItems(copy);
                            setSuccessMsg("Showcase item saved successfully!");
                            setTimeout(() => setSuccessMsg(null), 2000);
                          }}
                          className="w-full py-2.5 bg-[#2D2A26] text-white text-[9px] tracking-widest uppercase font-bold rounded flex items-center justify-center space-x-1"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Update carousel showcase product</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-xs">No catalogue assets loaded.</p>
              )}
            </div>
          )}


          {/* TAB 5: CONTACT */}
          {adminTab === 'contact' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded border border-gray-200 shadow-xs text-left space-y-4">
                <div>
                  <h3 className="text-xs font-sans uppercase font-bold text-[#2D2A26] border-b border-gray-100 pb-2 flex items-center space-x-1.5 animate-pulse">
                    <Phone className="h-3.5 w-3.5 text-[#AF9467]" />
                    <span>Manage Shop Contact Details</span>
                  </h3>
                  <p className="text-[10px] text-[#8C8377] font-sans mt-1 leading-relaxed">
                    Set up physical contact handles used inside bottom footers, custom booking brief logs, and direct chat links.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Shop Phone Number / WhatsApp</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs font-mono px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded-sm focus:outline-hidden"
                      placeholder="e.g. +1 (800) 555-4420"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans font-black text-[#544F49] tracking-wider block">Email Concierge Link</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full text-xs font-mono px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-200 focus:border-[#AF9467] text-[#2D2A26] rounded-sm focus:outline-hidden"
                      placeholder="e.g. concierge@hampers4you.com"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSaveAllChanges}
                    className="w-full py-2.5 bg-[#AF9467] hover:bg-[#2D2A26] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded transition-all duration-200 flex items-center justify-center space-x-1"
                  >
                    <Check className="h-4 w-4" />
                    <span>Save Contact Details Only</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Master Control Deck footer block */}
        <div className="bg-white border-t border-[#EADFC9]/40 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center shrink-0">
          <button
            onClick={handleResetToOriginal}
            className="w-full sm:w-auto px-4 py-2.5 border border-[#AF9467] text-[#AF9467] hover:bg-[#AF9467]/5 text-[10px] font-sans font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset Defaults</span>
          </button>
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-sans font-bold uppercase tracking-widest rounded-sm transition-colors text-center cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAllChanges}
              className="px-5 py-2.5 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Publish Live</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
