'use client';

import { SiteConfig } from '@/types';

interface HeaderProps {
  config: SiteConfig;
}

export function Header({ config }: HeaderProps) {
  return (
    <header className="text-center mb-14 pt-16 pb-6">
      <a
        href={config.mainWebsiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl"
      >
        <div className="flex items-center justify-center gap-3">
          {/* Logo icon */}
          <div className="relative">
            <img
              src="/images/icon.png"
              alt="Quip Network"
              className="w-10 h-10"
            />
          </div>

          {/* Text logo */}
          <span className="text-[24px] font-medium tracking-tight text-white group-hover:text-[#00e5ff] transition-colors duration-300">
            quip<span className="text-[#89839c] font-normal">.network</span>
          </span>
        </div>
      </a>

      {config.tagline && (
        <p className="text-[14px] text-[#89839c] mt-6 max-w-sm mx-auto leading-relaxed">
          {config.tagline}
        </p>
      )}
    </header>
  );
}
