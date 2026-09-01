import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { WipeLink } from '@/components/quip/WipeLink';
import type { EventItem } from '@/types';

interface EventRowProps {
  item: EventItem;
  index: number;
  total: number;
}

interface DateCell {
  month?: string;
  day: string;
}

function buildDateCell(item: EventItem, month: string, day: string): DateCell {
  const { startsAt, endsAt } = item;
  if (startsAt && endsAt && endsAt !== startsAt) {
    const start = new Date(`${startsAt}T00:00:00`);
    const end = new Date(`${endsAt}T00:00:00`);
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short' });
    const startMonth = fmt(start);
    const endMonth = fmt(end);
    const month =
      startMonth === endMonth ? startMonth : `${startMonth}-${endMonth}`;
    return { month, day: `${start.getDate()}-${end.getDate()}` };
  }
  return day ? { month, day: day.replace(',', '') } : { day: month };
}

export function EventRow({ item, index, total }: EventRowProps) {
  // The date cell shows the whole run of an event, not just its first day:
  // "OCT / 7-8" inside a month, "SEP-OCT / 29-1" across one. Single-day events
  // (and live Luma entries, which carry no ISO dates) keep month over day.
  const isLast = index === total - 1;
  const [month, day] = item.date.split(' ');
  const cell = buildDateCell(item, month, day);
  const meta = [item.startsAt ? null : item.time, item.location].filter(Boolean).join(' · ');
  return (
    <WipeLink
      href={item.url}
      data-event-row=""
      className={`items-center gap-4 border-t border-zinc-300 px-2 py-3.5 ${isLast ? 'border-b' : ''}`}
    >
      <div
        data-event-date
        className="flex w-16 shrink-0 flex-col items-center justify-center border-r border-zinc-300 py-1.5 font-mono tracking-[.4px] uppercase group-hover:border-zinc-700"
      >
        {cell.month && <span className="text-[10px] leading-[1.2] opacity-55">{cell.month}</span>}
        <span
          data-event-date-day
          className={`${cell.day.length > 2 ? 'text-[17px]' : 'text-[22px]'} leading-none font-medium`}
        >
          {cell.day}
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
        <div className="flex min-w-0 items-center gap-2">
          <span
            data-event-title
            className="overflow-hidden font-heading text-[19px] leading-[1.2] font-medium tracking-[-.01em] text-ellipsis whitespace-nowrap"
          >
            {item.title}
          </span>
          {item.badge && (
            <span
              data-event-badge
              className="shrink-0 bg-accent px-1.5 pt-[3px] pb-[2px] font-mono text-[10px] leading-none font-medium tracking-[.4px] text-white uppercase"
            >
              {item.badge}
            </span>
          )}
        </div>
        {item.subtitle && (
          <span
            data-event-subtitle
            className="overflow-hidden text-[13px] leading-[1.3] text-ellipsis whitespace-nowrap text-zinc-500 group-hover:text-zinc-300"
          >
            {item.subtitle}
          </span>
        )}
        {meta && (
          <span
            data-event-meta
            className="font-mono text-[11px] tracking-[.4px] text-zinc-600 uppercase group-hover:text-zinc-300"
          >
            {meta}
          </span>
        )}
      </div>
      <span
        data-row-tag
        className="bg-zinc-150 px-2 pt-1 pb-[3px] font-mono text-xs font-medium tracking-[.4px] text-zinc-950 uppercase group-hover:bg-zinc-800 group-hover:text-zinc-50"
      >
        {item.tag}
      </span>
      <span className="inline-flex opacity-70">
        <ArrowIcon size={18} />
      </span>
    </WipeLink>
  );
}
