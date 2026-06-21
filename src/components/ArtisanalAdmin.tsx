import React, { useState, useEffect } from 'react';
import { X, Save, Check, Image as ImageIcon, Settings, Phone, Mail, Lock, LogOut, Plus, Trash2, Edit3, ChevronRight, Layout, BookOpen, ShoppingBag, Grid, RefreshCw } from 'lucide-react';
import { ServiceItem, CatalogueItem, StoryItem, HeroImageItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

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

function SimpleImagePicker({ value, onChange, label }: { value: string; onChange: (val: string) => void; label: string }) {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">{label}</label>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="relative group w-full sm:w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="h-8 w-8 text-gray-300" />
          )}
          <button
            onClick={() => setShowGallery(true)}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold"
          >
            Change Image
          </button>
        </div>
        <div className="flex-1 w-full space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-xs p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AF9467] outline-none"
            placeholder="Paste image URL here..."
          />
          <div className="flex space-x-2">
            <button
              onClick={() => setShowGallery(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#AF9467] text-white text-[10px] font-bold uppercase rounded-lg hover:bg-[#8C7A5C] transition-colors"
            >
              Gallery
            </button>
            {value && (
              <button
                onClick={() => onChange('')}
                className="px-4 py-2 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded-lg hover:bg-red-100 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showGallery && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800">Select an Image</h3>
                <button onClick={() => setShowGallery(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
                {GALLERY_PRESETS.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onChange(img.url);
                      setShowGallery(false);
                    }}
                    className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-[#AF9467] transition-all"
                  >
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-black/60 text-white text-[10px] font-medium truncate">
                      {img.name}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ArtisanalAdmin(props: ArtisanalAdminProps) {
  const { isOpen, onClose, serviceItems, onSaveItems, onResetDefaults, catalogueItems = [], onSaveCatalogueItems, stories = [], onSaveStories, heroImages = [], onSaveHeroImages } = props;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [phone, setPhone] = useState(() => localStorage.getItem('hampers_phone_number') || "+1 (800) 555-4420");
  const [email, setEmail] = useState(() => localStorage.getItem('hampers_contact_email') || "concierge@hampers4you.com");
  
  const [localHeroImages, setLocalHeroImages] = useState(heroImages);
  const [localStories, setLocalStories] = useState(stories);
  const [localCategories, setLocalCategories] = useState(serviceItems);
  const [localCatalogue, setLocalCatalogue] = useState(catalogueItems);

  useEffect(() => {
    if (isOpen) {
      setLocalHeroImages(heroImages);
      setLocalStories(stories);
      setLocalCategories(serviceItems);
      setLocalCatalogue(catalogueItems);
      // Always open to dashboard first
      setActiveTab(null);
    }
  }, [isOpen, heroImages, stories, serviceItems, catalogueItems]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'hamper@123321') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleSave = () => {
    localStorage.setItem('hampers_phone_number', phone);
    localStorage.setItem('hampers_contact_email', email);
    onSaveHeroImages?.(localHeroImages);
    onSaveStories?.(localStories);
    onSaveItems(localCategories);
    onSaveCatalogueItems?.(localCatalogue);
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      window.location.reload();
    }, 1500);
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#FAF8F5]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-gray-100">
          <div className="w-20 h-20 bg-[#AF9467]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="h-10 w-10 text-[#AF9467]" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Studio Access</h2>
          <p className="text-gray-500 text-sm mb-10">Manage your premium portfolio and website content.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-left ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-5 bg-gray-50 border ${authError ? 'border-red-500' : 'border-gray-100'} rounded-2xl focus:ring-2 focus:ring-[#AF9467] outline-none transition-all text-center text-xl tracking-widest font-mono`}
                placeholder="••••••••"
                autoFocus
              />
            </div>
            {authError && <p className="text-red-500 text-xs font-bold">Incorrect password. Access denied.</p>}
            <div className="flex flex-col space-y-3 pt-4">
              <button type="submit" className="w-full p-5 bg-[#2D2A26] text-white font-bold uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:bg-[#AF9467] transition-all">Unlock Dashboard</button>
              <button type="button" onClick={onClose} className="w-full p-4 text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-gray-600 transition-colors">Return to Website</button>
            </div>
          </form>
          <p className="mt-12 text-[9px] text-gray-300 uppercase tracking-[0.2em]">Authorized Access Only</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[150] bg-[#FAF8F5] flex flex-col overflow-hidden">
      {/* Full Screen Header */}
      <div className="p-6 border-b bg-white flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-2.5 bg-[#2D2A26] rounded-xl text-white">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">Studio Dashboard</h2>
            <div className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Live Editor Active</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handleSave} className="flex items-center space-x-2 px-6 py-3 bg-[#2D2A26] text-white rounded-xl hover:bg-[#AF9467] transition-all shadow-lg group">
            <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Save Changes</span>
          </button>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-7 w-7 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center">
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </motion.div>
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Changes Applied</h3>
            <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Refreshing your studio experience...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50">
        <div className="max-w-5xl mx-auto w-full px-6 py-12">
          {!activeTab ? (
            /* Full Screen Dashboard Grid */
            <div className="space-y-12">
              <div className="text-center space-y-2">
                <h3 className="text-sm font-bold text-[#AF9467] uppercase tracking-[0.3em]">Welcome Back</h3>
                <h2 className="text-4xl font-serif font-bold text-gray-900">What would you like to edit?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard icon={<Grid />} title="Hero Collage" desc="The 4 overlapping front images" onClick={() => setActiveTab('frontImages')} />
                <DashboardCard icon={<Layout />} title="Service Categories" desc="Manage main service portfolios" onClick={() => setActiveTab('categories')} />
                <DashboardCard icon={<ShoppingBag />} title="Masterpiece Carousel" desc="Homepage editorial book slider" onClick={() => setActiveTab('catalogue')} />
                <DashboardCard icon={<BookOpen />} title="Atelier Stories" desc="Behind the scenes circular feed" onClick={() => setActiveTab('stories')} />
                <DashboardCard icon={<Phone />} title="Contact & Social" desc="WhatsApp, Email, and Links" onClick={() => setActiveTab('contact')} />
                <DashboardCard icon={<RefreshCw />} title="Reset Site" desc="Revert to original template" onClick={onResetDefaults} variant="danger" />
              </div>
            </div>
          ) : (
            /* Detailed Editor View */
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8 border-b bg-gray-50/50 flex items-center justify-between">
                <button onClick={() => setActiveTab(null)} className="flex items-center space-x-2 text-gray-400 hover:text-[#AF9467] transition-colors group">
                  <ChevronRight className="h-5 w-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Back to Dashboard</span>
                </button>
                <div className="text-right">
                  <h4 className="text-[10px] font-bold text-[#AF9467] uppercase tracking-widest">Currently Editing</h4>
                  <p className="font-serif text-lg font-bold text-gray-900 capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</p>
                </div>
              </div>

              <div className="p-8 space-y-12">
                {activeTab === 'frontImages' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {localHeroImages.map((hero, idx) => (
                      <div key={hero.id} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100">Card {idx + 1}</span>
                        </div>
                        <SimpleImagePicker 
                          label="Display Image" 
                          value={hero.image} 
                          onChange={(val) => {
                            const copy = [...localHeroImages];
                            copy[idx] = { ...copy[idx], image: val };
                            setLocalHeroImages(copy);
                          }} 
                        />
                        <Input label="Title / Tagline" value={hero.title} onChange={(v) => {
                          const copy = [...localHeroImages];
                          copy[idx] = { ...copy[idx], title: v };
                          setLocalHeroImages(copy);
                        }} />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'categories' && (
                  <div className="space-y-10">
                    {localCategories.map((item, idx) => (
                      <div key={item.id} className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 space-y-8">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xs font-bold text-[#AF9467] border border-gray-100">{idx + 1}</div>
                            <h3 className="font-serif text-xl font-bold text-gray-800">{item.title}</h3>
                          </div>
                          <button onClick={() => {
                            const copy = localCategories.filter((_, i) => i !== idx);
                            setLocalCategories(copy);
                          }} className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="h-5 w-5" /></button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                          <div className="space-y-6">
                            <Input label="Category Title" value={item.title} onChange={(v) => {
                              const copy = [...localCategories];
                              copy[idx] = { ...copy[idx], title: v };
                              setLocalCategories(copy);
                            }} />
                            <Input label="Boutique Subtitle" value={item.subtitle} onChange={(v) => {
                              const copy = [...localCategories];
                              copy[idx] = { ...copy[idx], subtitle: v };
                              setLocalCategories(copy);
                            }} />
                          </div>
                          <SimpleImagePicker label="Main Portfolio Image" value={item.mainImage} onChange={(v) => {
                            const copy = [...localCategories];
                            copy[idx] = { ...copy[idx], mainImage: v };
                            setLocalCategories(copy);
                          }} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Service Narrative</label>
                          <textarea 
                            value={item.longCopy} 
                            onChange={(e) => {
                              const copy = [...localCategories];
                              copy[idx] = { ...copy[idx], longCopy: e.target.value };
                              setLocalCategories(copy);
                            }}
                            rows={4}
                            className="w-full p-4 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AF9467] outline-none transition-all leading-relaxed"
                            placeholder="Describe this service in detail..."
                          />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => {
                      const newItem: ServiceItem = {
                        id: 'service_' + Date.now(),
                        title: 'New Specialty',
                        subtitle: 'Bespoke Craftsmanship',
                        description: 'Short description',
                        longCopy: 'Detailed narrative about this service...',
                        accentTitle: 'Artisanal Focus',
                        mainImage: GALLERY_PRESETS[0].url,
                        features: ['Premium Quality', 'Handcrafted'],
                        category: 'hamper'
                      };
                      setLocalCategories([...localCategories, newItem]);
                    }} className="w-full p-6 border-2 border-dashed border-[#AF9467]/20 text-[#AF9467] hover:bg-[#AF9467]/5 rounded-2xl transition-all flex items-center justify-center space-x-3 text-sm font-bold uppercase tracking-widest">
                      <Plus className="h-5 w-5" />
                      <span>Add New Category</span>
                    </button>
                  </div>
                )}

                {activeTab === 'catalogue' && (
                  <div className="space-y-8">
                    {localCatalogue.map((item, idx) => (
                      <div key={item.id} className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 flex flex-col lg:flex-row gap-10">
                        <div className="w-full lg:w-64 shrink-0">
                          <SimpleImagePicker label="Product Shot" value={item.image} onChange={(v) => {
                            const copy = [...localCatalogue];
                            copy[idx] = { ...copy[idx], image: v };
                            setLocalCatalogue(copy);
                          }} />
                        </div>
                        <div className="flex-1 space-y-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <Input label="Masterpiece Name" value={item.title} onChange={(v) => {
                                const copy = [...localCatalogue];
                                copy[idx] = { ...copy[idx], title: v };
                                setLocalCatalogue(copy);
                              }} />
                              <Input label="Editorial Tag" value={item.tag} onChange={(v) => {
                                const copy = [...localCatalogue];
                                copy[idx] = { ...copy[idx], tag: v };
                                setLocalCatalogue(copy);
                              }} />
                            </div>
                            <button onClick={() => {
                              const copy = localCatalogue.filter((_, i) => i !== idx);
                              setLocalCatalogue(copy);
                            }} className="ml-6 p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="h-5 w-5" /></button>
                          </div>
                          <Input label="Brief Highlight" value={item.description} onChange={(v) => {
                            const copy = [...localCatalogue];
                            copy[idx] = { ...copy[idx], description: v };
                            setLocalCatalogue(copy);
                          }} />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => {
                      const newItem: CatalogueItem = {
                        id: 'cat_' + Date.now(),
                        title: 'New Masterpiece',
                        subtitle: 'Custom Creation',
                        description: 'Short highlight of this piece',
                        image: GALLERY_PRESETS[1].url,
                        tag: 'New Arrival',
                        dimensions: 'Standard',
                        medium: 'Luxury Materials'
                      };
                      setLocalCatalogue([...localCatalogue, newItem]);
                    }} className="w-full p-6 border-2 border-dashed border-[#AF9467]/20 text-[#AF9467] hover:bg-[#AF9467]/5 rounded-2xl transition-all flex items-center justify-center space-x-3 text-sm font-bold uppercase tracking-widest">
                      <Plus className="h-5 w-5" />
                      <span>Add New Product to Carousel</span>
                    </button>
                  </div>
                )}

                {activeTab === 'stories' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {localStories.map((story, idx) => (
                      <div key={story.id} className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 space-y-6">
                        <div className="flex justify-between items-center">
                          <Input label="Story Title" value={story.title} onChange={(v) => {
                            const copy = [...localStories];
                            copy[idx] = { ...copy[idx], title: v };
                            setLocalStories(copy);
                          }} />
                          <button onClick={() => {
                            const copy = localStories.filter((_, i) => i !== idx);
                            setLocalStories(copy);
                          }} className="ml-4 p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="h-5 w-5" /></button>
                        </div>
                        <SimpleImagePicker label="Story Cover" value={story.storyImage} onChange={(v) => {
                          const copy = [...localStories];
                          copy[idx] = { ...copy[idx], storyImage: v };
                          setLocalStories(copy);
                        }} />
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Backstage Narrative</label>
                          <textarea 
                            value={story.text} 
                            onChange={(e) => {
                              const copy = [...localStories];
                              copy[idx] = { ...copy[idx], text: e.target.value };
                              setLocalStories(copy);
                            }}
                            rows={3}
                            className="w-full p-4 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AF9467] outline-none transition-all"
                            placeholder="Share a studio moment..."
                          />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => {
                      const newItem: StoryItem = {
                        id: 'story_' + Date.now(),
                        title: 'New Story',
                        storyImage: GALLERY_PRESETS[2].url,
                        text: 'Share a moment from your studio...'
                      };
                      setLocalStories([...localStories, newItem]);
                    }} className="md:col-span-2 p-8 border-2 border-dashed border-[#AF9467]/20 text-[#AF9467] hover:bg-[#AF9467]/5 rounded-2xl transition-all flex items-center justify-center space-x-3 text-sm font-bold uppercase tracking-widest">
                      <Plus className="h-5 w-5" />
                      <span>Add New Story Highlight</span>
                    </button>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="max-w-2xl mx-auto w-full py-10 space-y-10">
                    <div className="bg-gray-50/50 p-10 rounded-3xl border border-gray-100 space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 uppercase tracking-widest">
                            <Phone className="h-5 w-5 text-[#AF9467]" />
                            <span>WhatsApp / Business Phone</span>
                          </label>
                          <input 
                            type="text" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#AF9467] outline-none transition-all text-lg shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 uppercase tracking-widest">
                            <Mail className="h-5 w-5 text-[#AF9467]" />
                            <span>Concierge Email</span>
                          </label>
                          <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#AF9467] outline-none transition-all text-lg shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Editor Footer */}
              <div className="p-8 border-t bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest text-center sm:text-left">
                  Review your changes carefully before updating the live site.
                </p>
                <div className="flex space-x-4 w-full sm:w-auto">
                  <button onClick={() => setActiveTab(null)} className="flex-1 sm:flex-none px-8 py-3.5 text-gray-500 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 rounded-xl transition-colors">Discard</button>
                  <button onClick={handleSave} className="flex-1 sm:flex-none px-10 py-3.5 bg-[#2D2A26] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#AF9467] transition-all shadow-xl">Apply Changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, desc, onClick, variant = 'default' }: { icon: React.ReactNode; title: string; desc: string; onClick: () => void; variant?: 'default' | 'danger' }) {
  return (
    <button 
      onClick={onClick} 
      className={`group p-8 bg-white border ${variant === 'danger' ? 'border-red-50 hover:border-red-200' : 'border-gray-100 hover:border-[#AF9467]'} rounded-3xl text-left hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all ${variant === 'danger' ? 'text-red-500' : 'text-[#2D2A26]'}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 100 })}
      </div>
      <div className={`w-14 h-14 ${variant === 'danger' ? 'bg-red-50 text-red-400 group-hover:bg-red-500' : 'bg-gray-50 text-[#AF9467] group-hover:bg-[#AF9467]'} rounded-2xl flex items-center justify-center mb-6 group-hover:text-white transition-all duration-300 shadow-sm`}>
        {React.cloneElement(icon as React.ReactElement, { size: 28 })}
      </div>
      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </button>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2 flex-1">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AF9467] outline-none transition-all shadow-sm"
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    </div>
  );
}
