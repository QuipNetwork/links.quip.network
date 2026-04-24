import { BarBadge } from '@/components/quip/BarBadge';
import { CommunityCell } from '@/components/sections/CommunityCell';
import { siteData } from '@/data/siteData';

export function CommunitySection() {
  return (
    <section
      style={{
        padding: '64px clamp(20px,5.45vw,78px)',
        background: '#f4f4f5',
        borderTop: '1px solid #e4e4e7',
        borderBottom: '1px solid #e4e4e7',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16, rowGap: 20 }}>
        <div style={{ gridColumn: '1 / 4', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <BarBadge>Community</BarBadge>
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
            Follow us on
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#52525c' }}>every channel</span>
          </h2>
        </div>
        <div style={{ gridColumn: '5 / 13' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {siteData.community.map((it, i) => (
              <CommunityCell key={it.id} item={it} dark={i % 2 === 0} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
