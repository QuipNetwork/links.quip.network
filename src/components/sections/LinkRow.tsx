import { useState } from 'react';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { WipeLink } from '@/components/quip/WipeLink';
import type { LinkItem } from '@/types';

interface LinkRowProps {
  item: LinkItem;
  index: number;
  total: number;
}

export function LinkRow({ item, index, total }: LinkRowProps) {
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
        <ArrowIcon size={18} />
      </span>
    </WipeLink>
  );
}
