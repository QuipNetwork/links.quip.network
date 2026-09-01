import { useEffect, useState } from 'react';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { BarBadge } from '@/components/quip/BarBadge';
import { EventRow } from '@/components/sections/EventRow';
import { siteData } from '@/data/siteData';
import type { EventItem } from '@/types';

const LUMA_API = '/api/luma/calendar/get-items?calendar_api_id=cal-ByIDA5W5e1B4mpO&period=future';

interface LumaEntry {
  event: {
    api_id?: string;
    name: string;
    url: string;
    start_at: string;
    cover_url?: string;
    geo_address_info?: { city_state?: string; full_address?: string };
  };
}

export function EventsSection() {
  const [liveEvents, setLiveEvents] = useState<EventItem[] | null>(null);

  useEffect(() => {
    fetch(LUMA_API)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { entries?: LumaEntry[] } | null) => {
        const entries = data?.entries ?? [];
        const mapped: EventItem[] = entries.map((e) => {
          const ev = e.event;
          const d = new Date(ev.start_at);
          return {
            id: ev.api_id || ev.url,
            title: ev.name,
            url: `https://lu.ma/${ev.url}`,
            date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            location: ev.geo_address_info?.city_state || ev.geo_address_info?.full_address || '',
            tag: 'IRL',
            cover_url: ev.cover_url,
          };
        });
        setLiveEvents(mapped);
      })
      .catch(() => setLiveEvents([]));
  }, []);

  const loaded = liveEvents !== null;
  // Hosted (live Luma) events lead the section.
  const events = (liveEvents ?? []).slice(0, 4);
  // Conferences we're attending. Shown as a standing schedule below the hosted
  // events so people know where to find us even when nothing is on Luma yet.
  const today = new Date().toISOString().slice(0, 10);
  const schedule = siteData.featuredEvents
    .filter((e) => !e.endsAt || e.endsAt >= today)
    .sort((a, b) => (a.startsAt ?? '').localeCompare(b.startsAt ?? ''));

  return (
    <section className="bg-zinc-50 px-gutter py-14">
      <div className="grid grid-cols-12 gap-4 gap-y-5">
        <div className="col-start-1 col-end-4 flex flex-col items-start gap-4 max-tab:col-span-full">
          <BarBadge>Events</BarBadge>
          <h2 className="m-0 font-heading text-[clamp(28px,1.5vw+20px,40px)] leading-[1.1] font-medium tracking-[-.02em] text-zinc-900">
            Meet us
            <br />
            <span className="font-normal text-zinc-600 italic">in person</span>
          </h2>
          <a
            href="https://lu.ma/quipnetwork"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-zinc-950 px-2.5 pt-1.5 pb-[5px] font-mono text-xs tracking-[.4px] text-zinc-950 uppercase no-underline"
          >
            <CalendarIcon size={14} />
            <span>lu.ma/quipnetwork</span>
          </a>
        </div>
        <div className="col-start-5 col-end-13 max-tab:col-span-full">
          {events.length ? (
            <ul className="m-0 list-none p-0">
              {events.map((l, i) => (
                <li key={l.id}>
                  <EventRow item={l} index={i} total={events.length} />
                </li>
              ))}
            </ul>
          ) : loaded ? (
            <div className="flex flex-col items-start gap-2 border-y border-zinc-300 px-2 py-7">
              <p className="m-0 font-heading text-[19px] leading-[1.2] font-medium tracking-[-.01em] text-zinc-900">
                No Quip-hosted event on the calendar right now.
              </p>
              <p className="m-0 font-mono text-[11px] tracking-[.4px] text-zinc-600 uppercase">
                Here is where you can find us in the meantime.
              </p>
            </div>
          ) : null}

          {schedule.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex flex-col gap-1 px-2">
                <span className="font-mono text-[11px] tracking-[.4px] text-zinc-600 uppercase">
                  Where we'll be
                </span>
                <p className="m-0 max-w-[520px] text-[13px] leading-[1.35] text-zinc-500">
                  Conferences we're attending. We haven't confirmed a Quip event at any of them
                  yet, and anything we host will show up on Luma.
                </p>
                <a
                  href="#contact"
                  className="mt-1 inline-flex w-fit items-center gap-2 border border-zinc-950 px-2.5 pt-1.5 pb-[5px] font-mono text-xs tracking-[.4px] text-zinc-950 uppercase no-underline transition-colors duration-150 hover:bg-zinc-950 hover:text-zinc-50"
                >
                  Reach out to meet up
                </a>
              </div>
              <ul className="m-0 list-none p-0">
                {schedule.map((l, i) => (
                  <li key={l.id}>
                    <EventRow item={l} index={i} total={schedule.length} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
