import { SiteData } from '@/types';
import { defaultSiteData } from '@/data/siteData';

const STORAGE_KEY = 'quip-linktree-data';

export function getSiteData(): SiteData {
  if (typeof window === 'undefined') {
    return defaultSiteData;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading site data:', error);
  }

  return defaultSiteData;
}

export function saveSiteData(data: SiteData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving site data:', error);
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
