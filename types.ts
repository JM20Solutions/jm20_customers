
export interface StoreItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface AIAgent {
  id: string;
  title: string;
  description: string[];
  icon: string;
}

export interface Content {
  nav: {
    logo: string;
    langLabel: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    cta: string;
  };
  categories: {
    seasonal: StoreItem;
    artisan: StoreItem;
    eco: StoreItem;
    wellness: StoreItem;
    subscription: StoreItem;
  };
  process: {
    title: string;
    steps: ProcessStep[];
  };
  impact: {
    title: string;
    stats: { label: string; value: string }[];
  };
  support: {
    title: string;
    tagline: string;
    description: string;
    cta: string;
    agents: AIAgent[];
    image: string;
  };
  footer: {
    copyright: string;
    tag: string;
  };
  widget: {
    label: string;
    greeting: string;
    placeholder: string;
  };
}

export type Language = 'EN' | 'ES';

export interface BilingualContent {
  EN: Content;
  ES: Content;
}
