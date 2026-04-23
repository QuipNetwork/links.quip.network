import { useEffect, useState } from 'react';
import { BarBadge, Icon, WipeLink } from '@/components/quip/Primitives';
import { siteData } from '@/data/siteData';
import type { EventItem } from '@/types';

const LUMA_API = '/api/luma/calendar/get-items?calendar_api_id=cal-ByIDA5W5e1B4mpO&period=future';

interface EventRowProps {
  item: EventItem;
  index: number;
  total: number;
}

function EventRow({ item, index, total }: EventRowProps) {
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
        <Icon name="arrow" size={18} />
      </span>
    </WipeLink>
  );
}

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
            <Icon name="calendar" size={14} />
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
