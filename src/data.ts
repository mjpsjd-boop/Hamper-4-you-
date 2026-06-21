import { ServiceItem, ColorThemeOption, Testimonial, CatalogueItem, StoryItem } from './types';

import luxuryHamperImg from './assets/images/luxury_hamper_1782028572273.jpg';
import bespokeRingPlatterImg from './assets/images/bespoke_ring_platter_1782028587949.jpg';
import nikahCertificateImg from './assets/images/nikah_certificate_1782028604455.jpg';
import thumbBoardPensImg from './assets/images/thumb_board_pens_1782028620453.jpg';


export const BRAND_NAME = "HAMPERS_4_YOU";
export const INSTAGRAM_HANDLE = "@hampers_4_you_by_tasdiqa";

const getSavedPhone = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('hampers_phone_number') || "+1 (800) 555-4420";
  }
  return "+1 (800) 555-4420";
};

const getSavedEmail = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('hampers_contact_email') || "concierge@hampers4you.com";
  }
  return "concierge@hampers4you.com";
};

export const PHONE_NUMBER = getSavedPhone();
export const CONTACT_EMAIL = getSavedEmail();

export const COLOR_THEMES: ColorThemeOption[] = [
  {
    id: "royal_ivory",
    name: "Royal Ivory & Gilded Antique",
    hex: "#FDFBF7",
    accentHex: "#D4AF37",
    description: "Our signature signature palette—creamy whites, luxurious textured linen fabrics, and brassy antique gold details representing pure timeless grace."
  },
  {
    id: "crimson_silk",
    name: "Crimson Silk & Gold-Dust",
    hex: "#7A1C1C",
    accentHex: "#E6C653",
    description: "Deep passionate scarlet red velvets accompanied by rich satin ribbons and shimmering raw gold metallic highlights."
  },
  {
    id: "emerald_leaf",
    name: "Imperial Emerald & Brass",
    hex: "#0F4C3A",
    accentHex: "#C5A059",
    description: "An incredibly rich forest green base matching with delicate gold filigree and brushed brass hardware, evoking royal heritage."
  },
  {
    id: "soft_sage",
    name: "Sage Blush & Dried Jasmine",
    hex: "#D3DCD0",
    accentHex: "#BCA374",
    description: "Whimsical pastel sage greens alongside pale peach wrappers and actual dried jasmine sprigs, perfect for organic luxury lovers."
  },
  {
    id: "dusky_rose",
    name: "Dusky Rose & Mother-of-Pearl",
    hex: "#E5C2C4",
    accentHex: "#E1D5C9",
    description: "Delicate dusty rose fabrics blended seamlessly with gleaming pearl embellishments and romantic cream-colored lace finishes."
  }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: "hampers",
    title: "Luxury Customized Hampers",
    subtitle: "Artisanal Curated Gift Chests",
    accentTitle: "Curated with Intent",
    description: "Bespoke gift boxes configured with handpicked premium delicacies, premium body cares, customized message books, and floral decorations tucked elegantly inside wooden chests.",
    longCopy: "A HAMPERS_4_YOU custom hamper is far more than a collection of items—it is a carefully composed symphonic experience. Tailored precisely to standard themes like milestone birthdays, corporate achievements, wedding anniversaries, or exclusive bridal showers, we source each element with extreme care. Whether it is premium handcrafted chocolates wrapped in custom gold foils, rare artisanal candles, or custom-engraved keepsake boxes, everything is coordinated visually. We build each hamper to reflect the recipient's character and your high regard for them.",
    mainImage: luxuryHamperImg,
    category: "hamper",
    features: [
      "Custom hand-crafted solid or acrylic keepsake chests",
      "Sought-after gourmet delicacies & premium wellness goods",
      "Individually hand-written calligraphed scrolls",
      "Stunning fresh or meticulously dried floral arrangements",
      "Full color-palette customization matching your official event theme"
    ]
  },
  {
    id: "platters",
    title: "Bespoke Ceremony Ring Platters",
    subtitle: "Luxe Frameworks for Sacred Vows",
    accentTitle: "Elevating the Ring Exchange",
    description: "Elegant, premium customized ring displays and platters featuring plush velvets, fresh roses, and gold ring mounts designed to amplify engagement and wedding details.",
    longCopy: "The ring exchange is a pivotal chapter in your love story. Our ring platters are designed to serve as the perfect visual backdrop for that exact moment. Crafted by hand, each platter features layers of premium fabrics (such as fine silk or heavy royal velvet), bordered by bespoke metallic trims and decorated with delicate accents of glass, porcelain, and pearl. We customize the layout to arrange your ring trays alongside calligraphed couple tags, making the platter both a high-fidelity ceremony prop and a beautiful keepsake drawer item you'll treasure forever.",
    mainImage: bespokeRingPlatterImg,
    category: "platter",
    features: [
      "Plush hand-lined premium velvet or pure silk bases",
      "Bespoke laser-cut couple nameplates in mirrored acrylic or solid brass",
      "Secure custom ring cushions or brass jewelry cups",
      "Coordinated premium floral borders matching the bride's bouquet",
      "Dust-free elegant glass protective casing options"
    ]
  },
  {
    id: "certificates",
    title: "Premium Nikah Certificates",
    subtitle: "Custom Keepsake Marriage Deeds",
    accentTitle: "Written in Golden Arabesque",
    description: "Exquisite Nikah contracts printed on heavy archival stock and illuminated with beautiful Islamic geometric gold-dust margins and customized calligraphic text.",
    longCopy: "A Nikah ceremony is a monumental covenant. Our Premium Nikah Certificates turn this high-importance paper into a magnificent work of art. We design these keepsake deeds with heavy textured fine-art parchment paper. The borders are decorated with intricate hand-painted or printed arabesque, floral patterns, and delicate gold foiling. Our professional caligraphers custom format your details, signatures, and witnesses into timeless script. Ready for framing, it stands as an enduring beautiful accent for your new home.",
    mainImage: nikahCertificateImg,
    category: "certificate",
    features: [
      "Heavy 300gsm archival cotton rag parchment",
      "Gilded gold foil arabesque margins & geometric borders",
      "Beautiful classical Naskh or Thuluth calligraphy rendering of custom text",
      "Complete personalization of vows, dates, and signee titles",
      "Shipped in heavy-duty signature leather seal boxes or glass frames"
    ]
  },
  {
    id: "boards",
    title: "Nikkah Thumb Boards & Pens",
    subtitle: "Keepsake Commemoratives for the Signature Day",
    accentTitle: "The Signature Moment Redefined",
    description: "Elegant custom boards for capturing signature thumbprints paired with luxury gold-trimmed signature pens decorated with ribbons and dried botanical sprays.",
    longCopy: "The moment you put ink to paper (or thumbprint to canvas) represents the beginning of a lifelong union. Our customized Nikkah Thumb Signature Boards and matching luxury pens are designed specifically to cherish and showcase this ritual. The boards are customized with high-visibility calligraphed details and customized coordinate slots for signatures. Accompanied by our custom-crafted deluxe pens—wrapped with silk thread and topped with ostrich feathers or preserved blossom boutonnières—the entire signature setup turns a fleeting protocol into an unforgettable photo-op.",
    mainImage: thumbBoardPensImg,
    category: "board",
    features: [
      "Rigid satin-covered signature boards or premium canvas panels",
      "Premium, skin-safe, fade-proof metallic pigment ink pads included",
      "Signature pens wrapped fully in silk cords with genuine feather or dried rosebuds",
      "Aesthetic customizable frame sizes suitable for wedding reception displays",
      "Individually matching storage chests to keep pens intact"
    ]
  },
  {
    id: "elements",
    title: "Specialized Gifting Accents",
    subtitle: "The Magic of Micro-Details",
    accentTitle: "Ribbons, Seals & Fine Calligraphy",
    description: "Artisanal details including hand-frayed raw silk ribbons, actual hot wax seal stamp closures, and hand-lettered cards that wrap your gifts in pure luxury.",
    longCopy: "At HAMPERS_4_YOU, we strongly believe that luxury lies entirely within the fine details. We do not use generic tags or synthetic ribbons. Instead, we elevate your custom packages with hand-dyed crinkled silk ribbons, premium sealing wax melt stamps with our custom crest, and thick cotton gift tags lettered individually by hand. Each element is coordinated to match the exact thematic colors of your order, ensuring that from the moment your recipient touches the parcel, they feel the texture of meticulous craftsmanship.",
    mainImage: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop",
    category: "elements",
    features: [
      "Hand-dyed, frayed-edge silk ribbons in custom-blended hues",
      "Bespoke hot wax seals stamped by hand onto envelopes & parcel ties",
      "Thick watercolor paper card stock with customized calligraphy greetings",
      "Dried lavender, rose petals, or cotton boll fillers for physical sensory delight",
      "Premium, reusable linen wraps or magnetic leather clasp boxes"
    ]
  }
];

export const FOUNDER_STORY = {
  title: "The Heart Behind HAMPERS_4_YOU",
  subtitle: "A Philosophy of Slow Gifting and Handcrafted Magic",
  paragraphs: [
    "HAMPERS_4_YOU was born out of a simple, yet powerful observation: in an increasingly digital, hyper-fast world, the deeply human act of gifting was becoming transactional. Beautiful boxes were packed on assembly lines, and greeting cards were printed in thousands with hollow sentiments. Our founder believed that a gift is more than physical content—it is a physical container of emotions, respect, and celebration.",
    "Driven by a lifelong love for classic paper calligraphies, textiles, and fine organic design, our founder set up an artisanal studio dedicated to reviving the art of customized slow-gifting. Each bespoke item—whether it is a carefully coordinated hamper box, a customized velvet ring platter, or a calligraphed sacred certificate—is designed by hand from the ground up, in close consultation with the client.",
    "Our creative workspace behaves like an haute-couture bridal house. We do not mass-produce, nor do we stock finished packages. We take time to discuss your vision, review the colors of your bridal attire, matching ribbons to the groom's sherwani, and curating elements that evoke deep nostalgic joy. It is this intense attention to detail and unyielding devotion to quality that transforms our creations into unforgettable wedding centerpieces."
  ],
  quote: "Gifting is not a mere social exchange; it is the physical expression of a relationship's beauty. We make sure that your gratitude and celebration is felt in every ribbon thread, calligraphed curve, and wax seal crest."
};

export const VALUE_PROPOSITIONS = [
  {
    title: "Artisanal Customization",
    description: "Every single detail of your order is built according to your custom instructions. You determine the fabrics, the wood finishes, the color schemes, and the calligraphy content."
  },
  {
    title: "Sourcing Premium Materials",
    description: "We use only premium materials—from 300gsm cotton rag paper, heavy royal velvets, mirrored high-gloss acrylics, premium natural silks, to gourmet chocolates."
  },
  {
    title: "Rigorous Flawless Execution",
    description: "We execute each creation with meticulous craftsmanship. Each certificate border is drawn beautifully, ribbons are frayed by hand, and wax seals have immaculate shape."
  }
];

export const BOOKING_STEPS = [
  {
    number: "01",
    title: "Browse & Speculate",
    description: "Explore our rich premium portfolio and service list here to understand our aesthetics and get inspired by our previous wedding and bridal creations."
  },
  {
    number: "02",
    title: "Connect with Our Studio",
    description: "Click any inquiry button to message us via WhatsApp or Instagram. Share your date, theme colors, estimated budget ideas, and general requirements with us."
  },
  {
    number: "03",
    title: "Custom Concept Session",
    description: "Our founder will work with you to draft a personalized concept structure, selecting precise fabrics, paper styles, and decorations that match your ideas."
  },
  {
    number: "04",
    title: "Creation & Secure Transport",
    description: "We construct your order with absolute precision and handcrafting. Your finalized masterpieces are packed with multiple layers of protection and delivered safely to you."
  }
];

export const FAQS = [
  {
    question: "Do you have ready-made hampers or products I can buy immediately?",
    answer: "No, we do not operate as an off-the-shelf catalog shop. Because we believe in true luxury, every single gift hamper, ring platter, or certificate is custom-tailored to order. This guarantees that your gift is completely unique and matches your exact celebration event theme."
  },
  {
    question: "How far in advance should I book my order?",
    answer: "Given the handcrafted nature of our designs (specifically handbinding velvet platters, custom mirroring acrylic, and written calligraphic sheets), we strongly recommend placing orders 2 to 3 weeks before your ceremony. For urgent orders, please contact us directly on WhatsApp as we occasionally have rush design slots."
  },
  {
    question: "How does shipping work, and is it secure for fragile items?",
    answer: "We ship all custom orders utilizing premium courier options with bubble wrapping and heavy double-walled boxing. Elegant glass domes, mirror platters, and frames are packaged carefully inside shock-resistant liners to ensure they arrive at your doorstep in pristine condition."
  },
  {
    question: "Can I customize the wording on the Nikah certificates?",
    answer: "Absolutely. You can provide your custom religious vows, specific translation preferences, names, and witness labels. We format your exact words into classical elegant calligraphy templates before finalizing."
  },
  {
    question: "What is the role of the Personal Gifting Planner?",
    answer: "Our Personal Gifting Planner is a curated digital workspace that acts as your private consultation advisor. It allows you to select customized boutique services, specify event themes/color palettes, choose exquisite packaging materials, and add bespoke calligraphed details. This generates a cohesive digital concept sheet that acts as our literal layout brief. When you reach out to our studio, our Master Planner reviews this concept sheet with you in a dedicated 1-on-1 session to perfect every real-world fabric ribbon, wax seal, and floral detail."
  }
];

export const DEFAULT_CATALOGUE_ITEMS: CatalogueItem[] = [
  {
    id: "cat_1",
    title: "The Regal Empress Chest",
    subtitle: "Ornate Gilded Bridal Hamper",
    description: "Features custom ivory velvet lining, hand-tied gold silk bows, customized botanical glass bottle, dual gold compartments, and premium wax seal monogramming.",
    image: luxuryHamperImg,
    tag: "Luxury Gift Chests",
    dimensions: "16\" x 12\" x 8\"",
    medium: "Crafted Solid Pine wood, Velvet, Hand-dyed Silk"
  },
  {
    id: "cat_2",
    title: "Classic Royal Velvet Platter",
    subtitle: "Handcrafted Ceremonial Wedding Ring Display",
    description: "Draped in luxury rose-champagne velvet, centered by dynamic silk blossoms and mirror-polished gold ring stems to frame your sacred tokens.",
    image: bespokeRingPlatterImg,
    tag: "Ring Platters",
    dimensions: "12\" Diameter",
    medium: "Curved Wood foundation, Royal Velvet, Gilded Steel Stems"
  },
  {
    id: "cat_3",
    title: "Illuminated Floral Nikah Scroll",
    subtitle: "Custom Hand-Lettered Traditional Bound Certificate",
    description: "Fine archival calligraphic ink on premium 300gsm textured watercolor stock, adorned with golden botanical filigree borders and matching royal satin ties.",
    image: nikahCertificateImg,
    tag: "Traditional Certificates",
    dimensions: "11.7\" x 16.5\" (A3 size)",
    medium: "Archival Ink, 300gsm Textured Pulp, Gold Leaf Foil"
  },
  {
    id: "cat_4",
    title: "Gilded Signature Plume & Guest Board",
    subtitle: "Luxury Acrylic Signing Keepsake & Writing Tray",
    description: "A signature guest book board decorated with delicate golden leaf patterns, complete with a personalized ivory plume pen stand and custom guest sign sections.",
    image: thumbBoardPensImg,
    tag: "Signature Boards",
    dimensions: "14\" x 18\"",
    medium: "Crystal Glass Acrylic, Polished Brass accents, White Goose Plume"
  }
];

export const DEFAULT_STORIES: StoryItem[] = [
  {
    id: 'story_ribbons',
    title: 'The Ribbons',
    storyImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop',
    text: 'Raw crinkled silk textures undergoing hand-fraying protocols. Organic plant pigments create our signature muted sage, blush, and royal ivory tones.'
  },
  {
    id: 'story_wax',
    title: 'Hot Wax Dies',
    storyImage: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600&auto=format&fit=crop',
    text: 'Formulating authentic sealing wax discs with bronze powder elements. Sealed with custom hand-carved copper matrices featuring couple monograms.'
  },
  {
    id: 'story_woodlands',
    title: 'Teak Cabinets',
    storyImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    text: 'Reviewing joinery of our signature solid-wood and premium heavy pine souvenir cabinet boxes. Hand-sanded and coated in natural non-toxic beeswax polish.'
  },
  {
    id: 'story_callig',
    title: 'The Inkwell',
    storyImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop',
    text: 'Traditional Arabesque curves and English Copperplate lettering dried slowly under high-importance cotton tissue blotting sheets.'
  }
];

