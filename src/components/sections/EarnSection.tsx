import { BarBadge } from '@/components/quip/BarBadge';
import { HeroBadge } from '@/components/quip/HeroBadge';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { siteData } from '@/data/siteData';

export function EarnSection() {
  return (
    <section className="bg-zinc-50" style={{ padding: '80px clamp(20px,5.45vw,78px) 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16, rowGap: 24 }}>
        <div style={{ gridColumn: '1 / 7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
          <BarBadge>Earn</BarBadge>
          <h2
            className="text-zinc-900"
            style={{
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 1.5vw + 20px, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 580,
            }}
          >
            Earn <span style={{ fontStyle: 'italic', fontWeight: 400 }}>QUIP</span> by staking, questing, and protecting
            your assets
          </h2>
        </div>
        <div
          data-airdrop-wrap
          style={{ gridColumn: '8 / 13', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
        >
          <HeroBadge href="https://quest.quip.network/airdrop">Airdrop Eligible · Participate to Qualify</HeroBadge>
        </div>

        <div style={{ gridColumn: '1 / 7' }}>
          <FeatureCard item={siteData.vault[0]} dark />
        </div>
        <div style={{ gridColumn: '7 / 13' }}>
          <FeatureCard item={siteData.vault[1]} dark={false} />
        </div>
      </div>
    </section>
  );
}
