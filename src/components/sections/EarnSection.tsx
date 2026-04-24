import { BarBadge } from '@/components/quip/BarBadge';
import { HeroBadge } from '@/components/quip/HeroBadge';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { siteData } from '@/data/siteData';

export function EarnSection() {
  return (
    <section className="bg-zinc-50" style={{ padding: '80px clamp(20px,5.45vw,78px) 48px' }}>
      <div className="grid grid-cols-12 gap-4 gap-y-6">
        <div className="col-start-1 col-end-7 flex flex-col items-start gap-3 max-tab:col-span-full">
          <BarBadge>Earn</BarBadge>
          <h2
            className="m-0 max-w-[580px] text-zinc-900"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 1.5vw + 20px, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Earn <span style={{ fontStyle: 'italic', fontWeight: 400 }}>QUIP</span> by staking, questing, and protecting
            your assets
          </h2>
        </div>
        <div
          data-airdrop-wrap
          className="col-start-8 col-end-13 flex items-end justify-end max-tab:col-span-full"
        >
          <HeroBadge href="https://quest.quip.network/airdrop">Airdrop Eligible · Participate to Qualify</HeroBadge>
        </div>

        <div className="col-start-1 col-end-7 max-tab:col-span-full">
          <FeatureCard item={siteData.vault[0]} dark />
        </div>
        <div className="col-start-7 col-end-13 max-tab:col-span-full">
          <FeatureCard item={siteData.vault[1]} dark={false} />
        </div>
      </div>
    </section>
  );
}
