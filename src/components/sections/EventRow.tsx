import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { WipeLink } from '@/components/quip/WipeLink';
import type { EventItem } from '@/types';

interface EventRowProps {
  item: EventItem;
  index: number;
  total: number;
}

export function EventRow({ item, index, total }: EventRowProps) {
  const parts = item.date.split(' ');
  const isLast = index === total - 1;
  return (
    <WipeLink
      href={item.url}
      data-event-row=""
      className={`items-center gap-4 border-t border-zinc-300 px-2 py-3.5${isLast ? ' border-b' : ''}`}
    >
      <div
        data-event-date
        className="flex w-12 shrink-0 flex-col items-center justify-center border-r border-zinc-300 py-1.5 group-hover:border-zinc-700"
        style={{
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
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
          className="shrink-0 border border-zinc-300 bg-zinc-150 object-cover group-hover:border-zinc-800"
          style={{ width: 80, height: 80 }}
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
            className="overflow-hidden text-ellipsis whitespace-nowrap text-zinc-500 group-hover:text-zinc-300"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.3,
            }}
          >
            {item.subtitle}
          </span>
        )}
        <span
          data-event-meta
          className="text-zinc-600 group-hover:text-zinc-300"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
          }}
        >
          {item.location ? `${item.time} · ${item.location}` : item.time}
        </span>
      </div>
      <span
        data-row-tag
        className="border border-zinc-300 bg-transparent px-2 pt-1 pb-[3px] text-zinc-600 group-hover:border-zinc-50 group-hover:text-zinc-50"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
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
