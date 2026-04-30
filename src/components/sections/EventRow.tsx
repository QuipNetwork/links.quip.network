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
      className={`items-center gap-4 border-t border-zinc-300 px-2 py-3.5 ${isLast ? 'border-b' : ''}`}
    >
      <div
        data-event-date
        className="flex w-12 shrink-0 flex-col items-center justify-center border-r border-zinc-300 py-1.5 font-mono tracking-[.4px] uppercase group-hover:border-zinc-700"
      >
        <span className="text-[10px] leading-[1.2] opacity-55">{parts[0]}</span>
        <span data-event-date-day className="text-[22px] leading-none font-medium">
          {(parts[1] || '').replace(',', '')}
        </span>
      </div>
      {item.cover_url && (
        <img
          src={item.cover_url}
          alt=""
          data-event-cover
          className="h-20 w-20 shrink-0 border border-zinc-300 bg-zinc-150 object-cover group-hover:border-zinc-800"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span
          data-event-title
          className="overflow-hidden font-heading text-[19px] leading-[1.2] font-medium tracking-[-.01em] text-ellipsis whitespace-nowrap"
        >
          {item.title}
        </span>
        {item.subtitle && (
          <span
            data-event-subtitle
            className="overflow-hidden text-[13px] leading-[1.3] text-ellipsis whitespace-nowrap text-zinc-500 group-hover:text-zinc-300"
          >
            {item.subtitle}
          </span>
        )}
        <span
          data-event-meta
          className="font-mono text-[11px] tracking-[.4px] text-zinc-600 uppercase group-hover:text-zinc-300"
        >
          {item.location ? `${item.time} · ${item.location}` : item.time}
        </span>
      </div>
      <span
        data-row-tag
        className="border border-zinc-300 bg-transparent px-2 pt-1 pb-[3px] font-mono text-xs font-medium tracking-[.4px] text-zinc-600 uppercase group-hover:border-zinc-50 group-hover:text-zinc-50"
      >
        {item.tag}
      </span>
      <span className="inline-flex opacity-70">
        <ArrowIcon size={18} />
      </span>
    </WipeLink>
  );
}
