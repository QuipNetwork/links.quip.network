'use client';

import { useEffect, useState } from 'react';
import { SiteData } from '@/types';
import { getSiteData } from '@/lib/storage';
import { defaultSiteData } from '@/data/siteData';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { Footer } from '@/components/Footer';
import { GradientWave } from '@/components/GradientWave';

function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="text-center mb-14 pt-16 pb-6">
        <div className="flex flex-col items-center gap-6">
          <div className="w-[72px] h-[72px] rounded-full bg-surface-elevated" />
          <div className="flex flex-col items-center gap-3">
            <div className="h-7 w-36 rounded-lg bg-surface-elevated" />
            <div className="h-3 w-16 rounded bg-surface-elevated" />
          </div>
        </div>
        <div className="h-5 w-64 mx-auto mt-8 rounded bg-surface-elevated" />
      </div>
      {/* Section skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-10">
          <div className="h-4 w-28 rounded bg-surface-elevated mb-5" />
          <div className="space-y-3">
            {[1, 2].map((j) => (
              <div key={j} className="h-[72px] rounded-2xl bg-surface-elevated" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSiteData(getSiteData());
    setIsLoaded(true);
  }, []);

  const sortedSections = [...siteData.sections].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-background">
      <GradientWave />
      <div className="max-w-link-page mx-auto px-5 sm:px-4 relative z-10">
        {!isLoaded ? (
          <LoadingSkeleton />
        ) : (
          <>
            <Header config={siteData.config} />
            <div className="transition-opacity duration-300 ease-out">
              {sortedSections.map((section) => (
                <Section key={section.id} section={section} />
              ))}
            </div>
            {siteData.config.showFooter && <Footer />}
          </>
        )}
      </div>
    </main>
  );
}
