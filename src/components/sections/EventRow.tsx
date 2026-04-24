import { useState } from 'react';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { WipeLink } from '@/components/quip/WipeLink';
import type { EventItem } from '@/types';

interface EventRowProps {
  item: EventItem;
  index: number;
  total: number;
}

export function EventRow({ item, index, total }: EventRowProps) {
  const [h, setH] = useState(false);
  const parts = item.date.split(' ');
  const thumb = 80;
  return (
    <WipeLink
      href={item.url}
      wiped={h}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      data-event-row=""
      style={{
        borderTop: '1px solid #c9c9cb',
        borderBottom: index === total - 1 ? '1px solid #c9c9cb' : 'none',
        padding: '14px 8px',
        alignItems: 'center',
        gap: 16,
        color: h ? '#fafafa' : '#09090b',
      }}
    >
      <div
        data-event-date
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          padding: '6px 0',
          flexShrink: 0,
          borderRight: '1px solid',
          borderColor: h ? '#3f3f46' : '#c9c9cb',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          color: h ? '#fafafa' : '#09090b',
        }}
      >
        <span style={{ fontSize: 10, opacity: 0.55, lineHeight: 1.2 }}>{parts[0]}</span>
        <span data-event-date-day style={{ fontSize: 22, fontWeight: 500, lineHeight: 1 }}>
          {(parts[1] || '').replace(',', '')}
        </span>
      </div>
      {item.cover_url && (
        <img
          src={item.cover_url}
          alt=""
          data-event-cover
          style={{
            width: thumb,
            height: thumb,
            objectFit: 'cover',
            flexShrink: 0,
            border: '1px solid',
            borderColor: h ? '#27272a' : '#c9c9cb',
            background: '#e4e4e7',
          }}
        />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 0 }}>
        <span
          data-event-title
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: 19,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            fontFeatureSettings: "'case'",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.title}
        </span>
        {item.subtitle && (
          <span
            data-event-subtitle
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.3,
              color: h ? '#c9c9cb' : '#71717b',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {item.subtitle}
          </span>
        )}
        <span
          data-event-meta
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            color: h ? '#c9c9cb' : '#52525c',
          }}
        >
          {item.location ? `${item.time} · ${item.location}` : item.time}
        </span>
      </div>
      <span
        data-row-tag
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          padding: '4px 8px 3px',
          background: 'transparent',
          color: h ? '#fafafa' : '#52525c',
          border: '1px solid',
          borderColor: h ? '#fafafa' : '#c9c9cb',
        }}
      >
        {item.tag}
      </span>
      <span style={{ display: 'inline-flex', opacity: 0.7 }}>
        <ArrowIcon size={18} />
      </span>
    </WipeLink>
  );
}
