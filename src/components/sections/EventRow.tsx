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
      className="items-center gap-4 px-2 py-3.5"
      style={{
        borderTop: '1px solid #c9c9cb',
        borderBottom: index === total - 1 ? '1px solid #c9c9cb' : 'none',
        color: h ? '#fafafa' : '#09090b',
      }}
    >
      <div
        data-event-date
        className="flex w-12 shrink-0 flex-col items-center justify-center py-1.5"
        style={{
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
          className="shrink-0 bg-zinc-150 object-cover"
          style={{
            width: thumb,
            height: thumb,
            border: '1px solid',
            borderColor: h ? '#27272a' : '#c9c9cb',
          }}
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span
          data-event-title
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: 19,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            fontFeatureSettings: "'case'",
          }}
        >
          {item.title}
        </span>
        {item.subtitle && (
          <span
            data-event-subtitle
            className="overflow-hidden text-ellipsis whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.3,
              color: h ? '#c9c9cb' : '#71717b',
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
        className="bg-transparent px-2 pt-1 pb-[3px]"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          color: h ? '#fafafa' : '#52525c',
          border: '1px solid',
          borderColor: h ? '#fafafa' : '#c9c9cb',
        }}
      >
        {item.tag}
      </span>
      <span className="inline-flex opacity-70">
        <ArrowIcon size={18} />
      </span>
    </WipeLink>
  );
}
