import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { DiscordIcon } from '@/components/icons/DiscordIcon';
import { FarcasterIcon } from '@/components/icons/FarcasterIcon';
import { TelegramIcon } from '@/components/icons/TelegramIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';
import type { CommunityLink } from '@/types';

const ICONS = {
  twitter: TwitterIcon,
  discord: DiscordIcon,
  telegram: TelegramIcon,
  farcaster: FarcasterIcon,
} as const;

interface CommunityCellProps {
  item: CommunityLink;
  dark: boolean;
  index: number;
}

export function CommunityCell({ item, dark, index }: CommunityCellProps) {
  const IconComp = ICONS[item.icon];
  const cellClass = dark
    ? 'border-r border-zinc-800 bg-zinc-900 text-zinc-50 group-hover:bg-zinc-800'
    : 'border-r border-zinc-250 bg-zinc-150 text-zinc-950 group-hover:bg-zinc-250';
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-community-cell
      className={`group relative flex min-h-[180px] flex-col justify-between p-5 no-underline transition-colors duration-150 ${cellClass}`}
    >
      <div className="flex items-center justify-between">
        <span
          className="opacity-60"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <IconComp size={20} />
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: 24,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontFeatureSettings: "'case'",
          }}
        >
          {item.title}
        </div>
        <div
          className="mt-2 inline-flex items-center gap-1.5 opacity-50 transition-opacity duration-200 group-hover:opacity-100"
          style={{ fontSize: 12 }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
            {item.handle || 'Visit'}
          </span>
          <ArrowIcon size={12} />
        </div>
      </div>
    </a>
  );
}
