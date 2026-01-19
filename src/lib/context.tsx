'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { SiteData, Section, Link } from '@/types';
import { getSiteData, saveSiteData, generateId } from '@/lib/storage';
import { defaultSiteData } from '@/data/siteData';

interface SiteDataContextType {
  siteData: SiteData;
  isLoaded: boolean;
  updateConfig: (config: Partial<SiteData['config']>) => void;
  addSection: (title: string, icon?: string) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (sections: Section[]) => void;
  addLink: (sectionId: string, title: string, url: string, description?: string, icon?: string) => void;
  updateLink: (linkId: string, updates: Partial<Link>) => void;
  deleteLink: (linkId: string) => void;
  moveLink: (linkId: string, toSectionId: string) => void;
  reorderLinks: (sectionId: string, links: Link[]) => void;
  resetToDefault: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = getSiteData();
    setSiteData(data);
    setIsLoaded(true);
  }, []);

  const save = useCallback((data: SiteData) => {
    setSiteData(data);
    saveSiteData(data);
  }, []);

  const updateConfig = useCallback((config: Partial<SiteData['config']>) => {
    save({
      ...siteData,
      config: { ...siteData.config, ...config },
    });
  }, [siteData, save]);

  const addSection = useCallback((title: string, icon?: string) => {
    const maxOrder = Math.max(0, ...siteData.sections.map((s) => s.order));
    const newSection: Section = {
      id: generateId(),
      title,
      icon: icon || null,
      order: maxOrder + 1,
      isCollapsible: false,
      defaultExpanded: true,
      links: [],
    };
    save({
      ...siteData,
      sections: [...siteData.sections, newSection],
    });
  }, [siteData, save]);

  const updateSection = useCallback((sectionId: string, updates: Partial<Section>) => {
    save({
      ...siteData,
      sections: siteData.sections.map((s) =>
        s.id === sectionId ? { ...s, ...updates } : s
      ),
    });
  }, [siteData, save]);

  const deleteSection = useCallback((sectionId: string) => {
    save({
      ...siteData,
      sections: siteData.sections.filter((s) => s.id !== sectionId),
    });
  }, [siteData, save]);

  const reorderSections = useCallback((sections: Section[]) => {
    save({
      ...siteData,
      sections: sections.map((s, index) => ({ ...s, order: index + 1 })),
    });
  }, [siteData, save]);

  const addLink = useCallback((
    sectionId: string,
    title: string,
    url: string,
    description?: string,
    icon?: string
  ) => {
    const section = siteData.sections.find((s) => s.id === sectionId);
    if (!section) return;

    const maxOrder = Math.max(0, ...section.links.map((l) => l.order));
    const newLink: Link = {
      id: generateId(),
      sectionId,
      title,
      url,
      description: description || null,
      icon: icon || null,
      order: maxOrder + 1,
    };

    save({
      ...siteData,
      sections: siteData.sections.map((s) =>
        s.id === sectionId ? { ...s, links: [...s.links, newLink] } : s
      ),
    });
  }, [siteData, save]);

  const updateLink = useCallback((linkId: string, updates: Partial<Link>) => {
    save({
      ...siteData,
      sections: siteData.sections.map((s) => ({
        ...s,
        links: s.links.map((l) => (l.id === linkId ? { ...l, ...updates } : l)),
      })),
    });
  }, [siteData, save]);

  const deleteLink = useCallback((linkId: string) => {
    save({
      ...siteData,
      sections: siteData.sections.map((s) => ({
        ...s,
        links: s.links.filter((l) => l.id !== linkId),
      })),
    });
  }, [siteData, save]);

  const moveLink = useCallback((linkId: string, toSectionId: string) => {
    // Find the link to move
    let foundLink: Link | undefined;
    for (const section of siteData.sections) {
      const link = section.links.find((l) => l.id === linkId);
      if (link) {
        foundLink = link;
        break;
      }
    }

    if (!foundLink) return;

    // Remove from old section, add to new
    const sectionsWithoutLink = siteData.sections.map((s) => ({
      ...s,
      links: s.links.filter((l) => l.id !== linkId),
    }));

    // Calculate new order
    const targetSection = sectionsWithoutLink.find((s) => s.id === toSectionId);
    const linkOrders = targetSection?.links.map((l) => l.order) || [];
    const maxOrder = linkOrders.length > 0 ? Math.max(...linkOrders) : 0;

    const updatedLink: Link = {
      id: foundLink.id,
      sectionId: toSectionId,
      title: foundLink.title,
      url: foundLink.url,
      description: foundLink.description,
      icon: foundLink.icon,
      order: maxOrder + 1,
    };

    save({
      ...siteData,
      sections: sectionsWithoutLink.map((s) =>
        s.id === toSectionId ? { ...s, links: [...s.links, updatedLink] } : s
      ),
    });
  }, [siteData, save]);

  const reorderLinks = useCallback((sectionId: string, links: Link[]) => {
    save({
      ...siteData,
      sections: siteData.sections.map((s) =>
        s.id === sectionId
          ? { ...s, links: links.map((l, index) => ({ ...l, order: index + 1 })) }
          : s
      ),
    });
  }, [siteData, save]);

  const resetToDefault = useCallback(() => {
    save(defaultSiteData);
  }, [save]);

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        isLoaded,
        updateConfig,
        addSection,
        updateSection,
        deleteSection,
        reorderSections,
        addLink,
        updateLink,
        deleteLink,
        moveLink,
        reorderLinks,
        resetToDefault,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
