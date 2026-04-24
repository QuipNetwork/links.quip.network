import { useState } from 'react';
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
  const [h, setH] = useState(false);
  const IconComp = ICONS[item.icon];
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      data-community-cell
      style={{
        position: 'relative',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        minHeight: 180,
        background: dark ? (h ? '#27272a' : '#18181b') : h ? '#d4d4d8' : '#e4e4e7',
        color: dark ? '#fafafa' : '#09090b',
        transition: 'background .15s',
        borderRight: '1px solid',
        borderColor: dark ? '#27272a' : '#d4d4d8',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            opacity: 0.6,
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
          style={{
            marginTop: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            opacity: h ? 1 : 0.5,
            transition: 'opacity .2s',
          }}
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
