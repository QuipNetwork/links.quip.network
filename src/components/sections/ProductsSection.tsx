import { BarBadge } from '@/components/quip/BarBadge';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { siteData } from '@/data/siteData';

export function ProductsSection() {
  // Titles are nouns naming the surface; the CTA on each card carries the verb.
  const [account, swap, node, qvrf] = siteData.products;

  return (
    <section className="bg-zinc-50 px-gutter pt-20 pb-12">
      <div className="grid grid-cols-12 gap-4 gap-y-6">
        <div className="col-start-1 col-end-8 flex flex-col items-start gap-3 max-tab:col-span-full">
          <BarBadge>Start here</BarBadge>
          <h2 className="m-0 max-w-[620px] font-heading text-[clamp(28px,1.5vw+20px,40px)] leading-[1.1] font-medium tracking-[-.02em] text-zinc-900">
            Protect, swap and earn on the{' '}
            <span className="font-normal text-zinc-600 italic">worldwide quantum computer</span>
          </h2>
        </div>

        {/* Two by two down to phone width: four cards across the twelve
            columns would squeeze "Post-quantum Accounts" onto three lines,
            and four stacked cards on a tablet is a long scroll. */}
        <div className="col-span-6 max-phone:col-span-full">
          <FeatureCard item={account} dark />
        </div>
        <div className="col-span-6 max-phone:col-span-full">
          <FeatureCard item={swap} dark />
        </div>
        <div className="col-span-6 max-phone:col-span-full">
          <FeatureCard item={node} dark />
        </div>
        <div className="col-span-6 max-phone:col-span-full">
          <FeatureCard item={qvrf} dark />
        </div>
      </div>
    </section>
  );
}
