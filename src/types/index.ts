export interface SiteConfig {
  tagline: string | null;
  showFooter: boolean;
  logoUrl: string;
  mainWebsiteUrl: string;
}

export interface Link {
  id: string;
  sectionId: string;
  title: string;
  url: string;
  description: string | null;
  icon: string | null;
  order: number;
}

export interface Section {
  id: string;
  title: string;
  icon: string | null;
  order: number;
  isCollapsible: boolean;
  defaultExpanded: boolean;
  links: Link[];
}

export interface SiteData {
  config: SiteConfig;
  sections: Section[];
}

export type IconName =
  // Social
  | 'twitter'
  | 'discord'
  | 'telegram'
  | 'github'
  | 'youtube'
  | 'medium'
  // Resources
  | 'documentation'
  | 'whitepaper'
  | 'blog'
  | 'faq'
  | 'roadmap'
  // Actions
  | 'launch'
  | 'wallet'
  | 'download'
  | 'email'
  | 'external'
  // Categories
  | 'users'
  | 'code'
  | 'news'
  | 'tools'
  | 'partners'
  | 'book'
  | 'link';
