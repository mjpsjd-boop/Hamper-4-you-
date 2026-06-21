export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accentTitle: string;
  longCopy: string;
  mainImage: string;
  features: string[];
  category: 'hamper' | 'platter' | 'certificate' | 'board' | 'elements';
}

export interface PlannerState {
  serviceType: string;
  colorTheme: string;
  wrappingStyle: string;
  additionalAccents: string[];
  recipientNames: string;
  customEngravingText: string;
  estimatedBudget: string;
  notes: string;
}

export interface SavedConcept {
  id: string;
  timestamp: string;
  plannerState: PlannerState;
}

export interface ColorThemeOption {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
  description: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  event: string;
  quote: string;
  avatarPlaceholder: string;
}

export interface CatalogueItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  dimensions?: string;
  medium?: string;
}

export interface StoryItem {
  id: string;
  title: string;
  storyImage: string;
  text: string;
}

export interface HeroImageItem {
  id: string;
  title: string;
  image: string;
  alt: string;
}


