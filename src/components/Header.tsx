'use client';

import Image from 'next/image';
import { SiteConfig } from '@/types';

interface HeaderProps {
  config: SiteConfig;
}

export function Header({ config }: HeaderProps) {
  return (
    <header className="text-center mb-8 pt-8 pb-4">
      <a
        href={config.mainWebsiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl"
      >
        <div className="flex items-center justify-center">
          {/* Quip lockup logo */}
          <div className="relative">
            <Image
              src="/images/Quiplockup.png"
              alt="Quip Network"
              width={140}
              height={42}
              className="h-auto w-auto max-h-[42px]"
              unoptimized
            />
          </div>
        </div>
      </a>

      {config.tagline && (
        <p className="text-[14px] text-[#89839c] mt-3 max-w-sm mx-auto leading-relaxed">
          {config.tagline}
        </p>
      )}
    </header>
  );
}
