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
  index: number;
}

export function CommunityCell({ item, index }: CommunityCellProps) {
  const IconComp = ICONS[item.icon];
  const cellClass = [
    // base = light
    'border-r border-zinc-250 bg-zinc-150 text-zinc-950 group-hover:bg-zinc-250',
    // mobile (≤ tab, 2-col grid): checkerboard — items 1 & 4 (4n+1, 4n) go dark
    'max-tab:nth-[4n+1]:border-zinc-800 max-tab:nth-[4n+1]:bg-zinc-900 max-tab:nth-[4n+1]:text-zinc-50 max-tab:nth-[4n+1]:group-hover:bg-zinc-800',
    'max-tab:nth-[4n]:border-zinc-800 max-tab:nth-[4n]:bg-zinc-900 max-tab:nth-[4n]:text-zinc-50 max-tab:nth-[4n]:group-hover:bg-zinc-800',
    // desktop (≥ tab, 4-col grid): odd children go dark
    'tab:odd:border-zinc-800 tab:odd:bg-zinc-900 tab:odd:text-zinc-50 tab:odd:group-hover:bg-zinc-800',
  ].join(' ');
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-community-cell
      className={`group relative flex min-h-[180px] flex-col justify-between p-5 no-underline transition-colors duration-150 ${cellClass}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-[.4px] uppercase opacity-60">
          {String(index + 1).padStart(2, '0')}
        </span>
        <IconComp size={20} />
      </div>
      <div>
        <div className="font-heading text-2xl leading-[1.05] font-medium tracking-[-.02em]">
          {item.title}
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 text-xs opacity-50 transition-opacity duration-200 group-hover:opacity-100">
          <span className="font-mono tracking-[.4px] uppercase">
            {item.handle || 'Visit'}
          </span>
          <ArrowIcon size={12} />
        </div>
      </div>
    </a>
  );
}
