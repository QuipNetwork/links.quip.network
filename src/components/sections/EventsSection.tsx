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
        if (!data || !data.entries) return;
        const mapped: EventItem[] = data.entries.map((e) => {
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
      .catch(() => {});
  }, []);

  const source = liveEvents && liveEvents.length ? liveEvents : siteData.events;
  const events = source.slice(0, 3);
  if (!events.length) return null;

  return (
    <section style={{ padding: '56px clamp(20px,5.45vw,78px)', background: '#fafafa' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16, rowGap: 20 }}>
        <div style={{ gridColumn: '1 / 4', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <BarBadge>Events</BarBadge>
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
            Meet us
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#52525c' }}>in person</span>
          </h2>
          <a
            href="https://lu.ma/quipnetwork"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              color: '#09090b',
              textDecoration: 'none',
              padding: '6px 10px 5px',
              border: '1px solid #09090b',
            }}
          >
            <CalendarIcon size={14} />
            <span>lu.ma/quipnetwork</span>
          </a>
        </div>
        <div style={{ gridColumn: '5 / 13' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {events.map((l, i) => (
              <li key={l.id}>
                <EventRow item={l} index={i} total={events.length} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
