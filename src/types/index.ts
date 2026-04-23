export interface VaultItem {
  id: string;
  title: string;
  url: string;
  description: string;
  image: string;
  cta: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  date: string;
  time: string;
  tag: string;
  cover_url?: string;
  location?: string;
}

export interface CommunityLink {
  id: string;
  title: string;
  url: string;
  icon: 'twitter' | 'discord' | 'telegram' | 'farcaster';
  handle: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  tag: string;
}

export interface SiteData {
  vault: VaultItem[];
  events: EventItem[];
  community: CommunityLink[];
  developers: LinkItem[];
  resources: LinkItem[];
}
