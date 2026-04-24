import { BarBadge } from '@/components/quip/BarBadge';
import { LinkRow } from '@/components/sections/LinkRow';
import type { LinkItem } from '@/types';

interface LinkSectionBlockProps {
  eyebrow: string;
  heading: string;
  italic?: string;
  links: LinkItem[];
}

export function LinkSectionBlock({ eyebrow, heading, italic, links }: LinkSectionBlockProps) {
  return (
    <section style={{ padding: '64px clamp(20px,5.45vw,78px)', background: '#fafafa' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16, alignItems: 'stretch' }}>
        <div style={{ gridColumn: '1 / 4', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <BarBadge>{eyebrow}</BarBadge>
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
            {heading}
            {italic && (
              <>
                <br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#52525c' }}>{italic}</span>
              </>
            )}
          </h2>
        </div>
        <div style={{ gridColumn: '5 / 13' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map((l, i) => (
              <li key={l.id}>
                <LinkRow item={l} index={i} total={links.length} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
