import { SiteConfig } from '@/types';

interface HeaderProps {
  config: SiteConfig;
}

export function Header({ config }: HeaderProps) {
  return (
    <header className="text-center mb-8 pt-8 pb-4">
      <img
        src="/images/quiplogo.png"
        alt="Quip Network"
        width={80}
        height={80}
        className="h-auto w-auto max-h-[80px] mx-auto drop-shadow-[0_2px_12px_rgba(0,212,255,0.15)]"
      />

      <h1 className="text-[22px] font-bold text-white mt-4">Quip Network</h1>

      {config.tagline && (
        <p className="text-[15px] text-[#b4bedd] mt-1 max-w-sm mx-auto">
          {config.tagline}
        </p>
      )}

      <a
        href={config.mainWebsiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-5 px-6 py-2.5 text-[14px] font-semibold text-[#020204] bg-gradient-to-r from-[#00d4ff] to-[#00ffff] rounded-full hover:shadow-[0_0_20px_rgba(0,212,255,0.35)] transition-all duration-300"
      >
        Visit Our Website
      </a>
    </header>
  );
}
