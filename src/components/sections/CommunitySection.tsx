import { useState } from 'react';
import { BarBadge, Icon } from '@/components/quip/Primitives';
import { siteData } from '@/data/siteData';
import type { CommunityLink } from '@/types';

interface CommunityCellProps {
  item: CommunityLink;
  dark: boolean;
  index: number;
}

function CommunityCell({ item, dark, index }: CommunityCellProps) {
  const [h, setH] = useState(false);
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
        <Icon name={item.icon} size={20} />
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
          <Icon name="arrow" size={12} />
        </div>
      </div>
    </a>
  );
}

export function CommunitySection() {
  return (
    <section
      style={{
        padding: '64px clamp(20px,5.45vw,78px)',
        background: '#f4f4f5',
        borderTop: '1px solid #e4e4e7',
        borderBottom: '1px solid #e4e4e7',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16, rowGap: 20 }}>
        <div style={{ gridColumn: '1 / 4', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <BarBadge>Community</BarBadge>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 1.5vw + 20px, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#18181b',
            }}
          >
            Follow us on
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#52525c' }}>every channel</span>
          </h2>
        </div>
        <div style={{ gridColumn: '5 / 13' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {siteData.community.map((it, i) => (
              <CommunityCell key={it.id} item={it} dark={i % 2 === 0} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
