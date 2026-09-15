import type {
  ColorSchemeName,
  PatternMode,
  PixelShape,
} from '@/lib/pattern-gen/types';

/** A backdrop rendered by the vendored pattern-gen canvas (src/lib/pattern-gen). */
export interface PatternBackdrop {
  mode: PatternMode;
  colorScheme: ColorSchemeName;
  pixelShape?: PixelShape;
  pixelSize?: number;
  p1?: number;
  p2?: number;
  p3?: number;
  p4?: number;
  /** Canvas opacity over the card background. */
  opacity?: number;
  /** Horizontal inset in px. Pulls edge-anchored motifs (the swap chains) in
   *  off the card border instead of running flush to it. */
  insetX?: number;
}

export interface ProductItem {
  id: string;
  title: string;
  url: string;
  description: string;
  /** Product artwork. Cards without it fall back to `pattern`, then the dot grid. */
  image?: string;
  /** Animated pixel backdrop, in place of static artwork. */
  pattern?: PatternBackdrop;
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
  badge?: string;
  /** ISO date the event starts. Used to sort the "Where we'll be" schedule. */
  startsAt?: string;
  /** ISO date the event ends. Entries drop off the day after this date. */
  endsAt?: string;
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

/** A time-boxed feature placed above the products: a drop, a launch, a
 *  campaign. One at a time, and removed by deleting the entry. */
export interface SpotlightItem {
  id: string;
  /** Eyebrow label, e.g. "Now minting". */
  eyebrow: string;
  title: string;
  /** Second, italic half of the heading. */
  subtitle: string;
  /** Short facts rendered as a mono strip, e.g. "Free open edition". */
  facts: string[];
  /** Looping backdrop. `poster` doubles as the reduced-motion still. */
  video: string;
  poster: string;
  /** Small square mark shown beside the eyebrow. */
  mark?: string;
  primary: { label: string; url: string };
  secondary?: { label: string; url: string };
}

export interface SiteData {
  spotlight?: SpotlightItem;
  products: ProductItem[];
  earn: LinkItem[];
  events: EventItem[];
  featuredEvents: EventItem[];
  community: CommunityLink[];
  developers: LinkItem[];
  resources: LinkItem[];
}
