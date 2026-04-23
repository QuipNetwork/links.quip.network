import { useState } from 'react';
import { BarBadge, Icon, WipeLink } from '@/components/quip/Primitives';
import type { LinkItem } from '@/types';

interface LinkRowProps {
  item: LinkItem;
  index: number;
  total: number;
}

function LinkRow({ item, index, total }: LinkRowProps) {
  const [h, setH] = useState(false);
  return (
    <WipeLink
      href={item.url}
      wiped={h}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        borderTop: '1px solid #c9c9cb',
        borderBottom: index === total - 1 ? '1px solid #c9c9cb' : 'none',
        padding: '20px 8px',
        alignItems: 'center',
        gap: 16,
        color: h ? '#fafafa' : '#09090b',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.4px',
          width: 32,
          opacity: 0.6,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: 20,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            fontFeatureSettings: "'case'",
          }}
        >
          {item.title}
        </span>
        {item.description && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.4,
              color: h ? '#c9c9cb' : '#52525c',
            }}
          >
            {item.description}
          </span>
        )}
      </div>
      {item.tag && (
        <span
          data-row-tag
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            padding: '4px 8px 3px',
            background: h ? '#27272a' : '#e4e4e7',
            color: h ? '#fafafa' : '#09090b',
          }}
        >
          {item.tag}
        </span>
      )}
      <span style={{ display: 'inline-flex', opacity: 0.7 }}>
        <Icon name="arrow" size={18} />
      </span>
    </WipeLink>
  );
}

interface LinkSectionBlockProps {
  eyebrow: string;
  heading: string;
  italic?: string;
  links: LinkItem[];
}

export function LinkSectionBlock({ eyebrow, heading, italic, links }: LinkSectionBlockProps) {
  return (
    <section style={{ padding: '64px clamp(20px,5.45vw,78px)', background: '#fafafa' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16, alignItems: 'stretch' }}>
        <div style={{ gridColumn: '1 / 4', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <BarBadge>{eyebrow}</BarBadge>
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
            {heading}
            {italic && (
              <>
                <br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#52525c' }}>{italic}</span>
              </>
            )}
          </h2>
        </div>
        <div style={{ gridColumn: '5 / 13' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map((l, i) => (
              <li key={l.id}>
                <LinkRow item={l} index={i} total={links.length} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
