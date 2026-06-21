import React, { useState, useEffect } from 'react';
import { X, Save, Check, Image as ImageIcon, Settings, Phone, Mail, Lock, LogOut, Plus, Trash2, Edit3, ChevronRight, Layout, BookOpen, ShoppingBag, Grid } from 'lucide-react';
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
  initialTab?: string;
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

// Simplified Image Picker with clear visual feedback
function SimpleImagePicker({ value, onChange, label }: { value: string; onChange: (val: string) => void; label: string }) {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">{label}</label>
      <div className="flex items-start space-x-4">
        <div className="relative group w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
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
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-[#AF9467] outline-none"
            placeholder="Paste image URL here..."
          />
          <div className="flex space-x-2">
            <button
              onClick={() => setShowGallery(true)}
              className="px-3 py-1.5 bg-[#AF9467] text-white text-[10px] font-bold uppercase rounded hover:bg-[#8C7A5C] transition-colors"
            >
              Choose from Gallery
            </button>
            {value && (
              <button
                onClick={() => onChange('')}
                className="px-3 py-1.5 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded hover:bg-red-100 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showGallery && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800">Select an Image</h3>
                <button onClick={() => setShowGallery(false)} className="p-1 hover:bg-gray-200 rounded-full">
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
                    className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-[#AF9467] transition-all"
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

  // Form states
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
      if (props.initialTab) setActiveTab(props.initialTab);
    }
  }, [isOpen, heroImages, stories, serviceItems, catalogueItems, props.initialTab]);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2A26]/90 backdrop-blur-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-[#AF9467]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-[#AF9467]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Admin Access</h2>
          <p className="text-gray-500 text-sm mb-8">Enter your password to manage your studio website.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-4 bg-gray-50 border ${authError ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#AF9467] outline-none transition-all text-center text-lg tracking-widest`}
              placeholder="••••••••"
              autoFocus
            />
            {authError && <p className="text-red-500 text-xs font-bold">Incorrect password. Please try again.</p>}
            <div className="flex space-x-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 p-4 text-gray-500 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
              <button type="submit" className="flex-1 p-4 bg-[#2D2A26] text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg hover:bg-[#AF9467] transition-all">Unlock</button>
            </div>
          </form>
          <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest">Hint: hamper@123321</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ x: '100%' }} 
        animate={{ x: 0 }} 
        exit={{ x: '100%' }}
        className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#2D2A26] rounded-lg text-white">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-900">Studio Manager</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Simplified Editor</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleSave} className="flex items-center space-x-2 px-4 py-2 bg-[#2D2A26] text-white rounded-lg hover:bg-[#AF9467] transition-all shadow-md group">
              <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">Save All</span>
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[110] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Changes Saved!</h3>
              <p className="text-gray-500">Refreshing your studio website...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!activeTab ? (
            /* Dashboard Menu */
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DashboardCard icon={<Grid />} title="Front Collage" desc="Edit the 4 hero images" onClick={() => setActiveTab('frontImages')} />
              <DashboardCard icon={<Layout />} title="Main Categories" desc="Manage your service items" onClick={() => setActiveTab('categories')} />
              <DashboardCard icon={<ShoppingBag />} title="Product Carousel" desc="Update showcase items" onClick={() => setActiveTab('catalogue')} />
              <DashboardCard icon={<BookOpen />} title="Atelier Stories" desc="Behind the scenes content" onClick={() => setActiveTab('stories')} />
              <DashboardCard icon={<Phone />} title="Contact Info" desc="Phone, Email, and Social" onClick={() => setActiveTab('contact')} />
              <div className="sm:col-span-2 mt-8 pt-8 border-t border-gray-100">
                <button onClick={onResetDefaults} className="w-full p-4 border-2 border-dashed border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest">
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset Website to Defaults</span>
                </button>
              </div>
            </div>
          ) : (
            /* Tab Content */
            <div className="p-8 space-y-8">
              <button onClick={() => setActiveTab(null)} className="flex items-center space-x-2 text-[#AF9467] hover:text-[#2D2A26] transition-colors mb-4">
                <ChevronRight className="h-4 w-4 rotate-180" />
                <span className="text-xs font-bold uppercase tracking-widest">Back to Dashboard</span>
              </button>

              {activeTab === 'frontImages' && (
                <div className="space-y-12">
                  <SectionHeader title="Hero Collage" desc="Select which card you want to change" />
                  <div className="grid grid-cols-2 gap-6">
                    {localHeroImages.map((hero, idx) => (
                      <div key={hero.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Card #{idx + 1}</span>
                          <span className="text-[10px] font-bold text-[#AF9467] uppercase tracking-widest">{hero.id}</span>
                        </div>
                        <SimpleImagePicker 
                          label="Card Image" 
                          value={hero.image} 
                          onChange={(val) => {
                            const copy = [...localHeroImages];
                            copy[idx] = { ...copy[idx], image: val };
                            setLocalHeroImages(copy);
                          }} 
                        />
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Title / Slogan</label>
                          <input 
                            type="text" 
                            value={hero.title} 
                            onChange={(e) => {
                              const copy = [...localHeroImages];
                              copy[idx] = { ...copy[idx], title: e.target.value };
                              setLocalHeroImages(copy);
                            }}
                            className="w-full p-2 text-sm bg-white border border-gray-200 rounded focus:ring-1 focus:ring-[#AF9467] outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="space-y-8">
                  <SectionHeader title="Main Categories" desc="Update your primary service portfolios" />
                  {localCategories.map((item, idx) => (
                    <div key={item.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-6">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <h3 className="font-bold text-gray-800 uppercase tracking-wider">{item.title}</h3>
                        <div className="flex space-x-2">
                          <button onClick={() => {
                            const copy = localCategories.filter((_, i) => i !== idx);
                            setLocalCategories(copy);
                          }} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Input label="Category Title" value={item.title} onChange={(v) => {
                            const copy = [...localCategories];
                            copy[idx] = { ...copy[idx], title: v };
                            setLocalCategories(copy);
                          }} />
                          <Input label="Subtitle" value={item.subtitle} onChange={(v) => {
                            const copy = [...localCategories];
                            copy[idx] = { ...copy[idx], subtitle: v };
                            setLocalCategories(copy);
                          }} />
                        </div>
                        <SimpleImagePicker label="Main Banner Image" value={item.mainImage} onChange={(v) => {
                          const copy = [...localCategories];
                          copy[idx] = { ...copy[idx], mainImage: v };
                          setLocalCategories(copy);
                        }} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Long Description</label>
                        <textarea 
                          value={item.longCopy} 
                          onChange={(e) => {
                            const copy = [...localCategories];
                            copy[idx] = { ...copy[idx], longCopy: e.target.value };
                            setLocalCategories(copy);
                          }}
                          rows={3}
                          className="w-full p-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#AF9467] outline-none"
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
                  }} className="w-full p-4 border-2 border-dashed border-[#AF9467]/20 text-[#AF9467] hover:bg-[#AF9467]/5 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest">
                    <Plus className="h-4 w-4" />
                    <span>Add New Category</span>
                  </button>
                </div>
              )}

              {activeTab === 'catalogue' && (
                <div className="space-y-8">
                  <SectionHeader title="Product Carousel" desc="The editorial book slider on your homepage" />
                  <div className="grid grid-cols-1 gap-6">
                    {localCatalogue.map((item, idx) => (
                      <div key={item.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-6">
                        <div className="w-full sm:w-48 shrink-0">
                          <SimpleImagePicker label="Product Image" value={item.image} onChange={(v) => {
                            const copy = [...localCatalogue];
                            copy[idx] = { ...copy[idx], image: v };
                            setLocalCatalogue(copy);
                          }} />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <Input label="Product Name" value={item.title} onChange={(v) => {
                                const copy = [...localCatalogue];
                                copy[idx] = { ...copy[idx], title: v };
                                setLocalCatalogue(copy);
                              }} />
                              <Input label="Category Tag" value={item.tag} onChange={(v) => {
                                const copy = [...localCatalogue];
                                copy[idx] = { ...copy[idx], tag: v };
                                setLocalCatalogue(copy);
                              }} />
                            </div>
                            <button onClick={() => {
                              const copy = localCatalogue.filter((_, i) => i !== idx);
                              setLocalCatalogue(copy);
                            }} className="ml-4 p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                          </div>
                          <Input label="Short Description" value={item.description} onChange={(v) => {
                            const copy = [...localCatalogue];
                            copy[idx] = { ...copy[idx], description: v };
                            setLocalCatalogue(copy);
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
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
                  }} className="w-full p-4 border-2 border-dashed border-[#AF9467]/20 text-[#AF9467] hover:bg-[#AF9467]/5 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest">
                    <Plus className="h-4 w-4" />
                    <span>Add New Product to Carousel</span>
                  </button>
                </div>
              )}

              {activeTab === 'stories' && (
                <div className="space-y-8">
                  <SectionHeader title="Atelier Stories" desc="Circular highlights for behind-the-scenes" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {localStories.map((story, idx) => (
                      <div key={story.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
                        <div className="flex justify-between items-center">
                          <Input label="Story Title" value={story.title} onChange={(v) => {
                            const copy = [...localStories];
                            copy[idx] = { ...copy[idx], title: v };
                            setLocalStories(copy);
                          }} />
                          <button onClick={() => {
                            const copy = localStories.filter((_, i) => i !== idx);
                            setLocalStories(copy);
                          }} className="ml-4 p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                        <SimpleImagePicker label="Story Cover" value={story.storyImage} onChange={(v) => {
                          const copy = [...localStories];
                          copy[idx] = { ...copy[idx], storyImage: v };
                          setLocalStories(copy);
                        }} />
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Story Narrative</label>
                          <textarea 
                            value={story.text} 
                            onChange={(e) => {
                              const copy = [...localStories];
                              copy[idx] = { ...copy[idx], text: e.target.value };
                              setLocalStories(copy);
                            }}
                            rows={2}
                            className="w-full p-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#AF9467] outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => {
                    const newItem: StoryItem = {
                      id: 'story_' + Date.now(),
                      title: 'New Story',
                      storyImage: GALLERY_PRESETS[2].url,
                      text: 'Share a moment from your studio...'
                    };
                    setLocalStories([...localStories, newItem]);
                  }} className="w-full p-4 border-2 border-dashed border-[#AF9467]/20 text-[#AF9467] hover:bg-[#AF9467]/5 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest">
                    <Plus className="h-4 w-4" />
                    <span>Add New Story Highlight</span>
                  </button>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-8">
                  <SectionHeader title="Contact Details" desc="Update how clients reach you" />
                  <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                          <Phone className="h-4 w-4 text-[#AF9467]" />
                          <span>WhatsApp / Phone</span>
                        </label>
                        <input 
                          type="text" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AF9467] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                          <Mail className="h-4 w-4 text-[#AF9467]" />
                          <span>Concierge Email</span>
                        </label>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AF9467] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions when in a tab */}
        {activeTab && (
          <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
              Unsaved changes will be lost if you close without saving.
            </p>
            <div className="flex space-x-3">
              <button onClick={() => setActiveTab(null)} className="px-6 py-2.5 text-gray-500 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-8 py-2.5 bg-[#2D2A26] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#AF9467] transition-all shadow-lg">Save & Update Site</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function DashboardCard({ icon, title, desc, onClick }: { icon: React.ReactNode; title: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group p-6 bg-white border border-gray-100 rounded-2xl text-left hover:border-[#AF9467] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all text-[#2D2A26]">
        {React.cloneElement(icon as React.ReactElement, { size: 80 })}
      </div>
      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-[#AF9467] group-hover:bg-[#AF9467] group-hover:text-white transition-colors">
        {React.cloneElement(icon as React.ReactElement, { size: 24 })}
      </div>
      <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500">{desc}</p>
    </button>
  );
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border-b border-gray-100 pb-4">
      <h2 className="text-2xl font-serif font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1 flex-1">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#AF9467] outline-none transition-all"
      />
    </div>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
