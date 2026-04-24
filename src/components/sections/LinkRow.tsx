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
      className="items-center gap-4 px-2 py-5"
      style={{
        borderTop: '1px solid #c9c9cb',
        borderBottom: index === total - 1 ? '1px solid #c9c9cb' : 'none',
        color: h ? '#fafafa' : '#09090b',
      }}
    >
      <span
        className="w-8 opacity-60"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.4px',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
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
      <span className="inline-flex opacity-70">
        <ArrowIcon size={18} />
      </span>
    </WipeLink>
  );
}
