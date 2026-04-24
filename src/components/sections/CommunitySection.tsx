import { BarBadge } from '@/components/quip/BarBadge';
import { CommunityCell } from '@/components/sections/CommunityCell';
import { siteData } from '@/data/siteData';

export function CommunitySection() {
  return (
    <section
      className="bg-zinc-100"
      style={{
        padding: '64px clamp(20px,5.45vw,78px)',
        borderTop: '1px solid #e4e4e7',
        borderBottom: '1px solid #e4e4e7',
      }}
    >
      <div className="grid grid-cols-12 gap-4 gap-y-5">
        <div className="col-start-1 col-end-4 flex flex-col items-start gap-4 max-tab:col-span-full">
          <BarBadge>Community</BarBadge>
          <h2
            className="m-0 text-zinc-900"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 1.5vw + 20px, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Follow us on
            <br />
            <span className="text-zinc-600" style={{ fontStyle: 'italic', fontWeight: 400 }}>every channel</span>
          </h2>
        </div>
        <div className="col-start-5 col-end-13 max-tab:col-span-full">
          <div className="grid grid-cols-4 gap-0 max-tab:grid-cols-2">
            {siteData.community.map((it, i) => (
              <CommunityCell key={it.id} item={it} dark={i % 2 === 0} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
