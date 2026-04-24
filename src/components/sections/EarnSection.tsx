import { BarBadge } from '@/components/quip/BarBadge';
import { HeroBadge } from '@/components/quip/HeroBadge';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { siteData } from '@/data/siteData';

export function EarnSection() {
  return (
    <section className="bg-zinc-50 px-gutter pt-20 pb-12">
      <div className="grid grid-cols-12 gap-4 gap-y-6">
        <div className="col-start-1 col-end-7 flex flex-col items-start gap-3 max-tab:col-span-full">
          <BarBadge>Earn</BarBadge>
          <h2 className="m-0 max-w-[580px] font-heading text-[clamp(28px,1.5vw+20px,40px)] leading-[1.1] font-medium tracking-[-.02em] text-zinc-900">
            Earn <span className="font-normal italic">QUIP</span> by staking, questing, and protecting
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
