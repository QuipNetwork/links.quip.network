import { BarBadge } from '@/components/quip/BarBadge';
import { CommunityCell } from '@/components/sections/CommunityCell';
import { siteData } from '@/data/siteData';

export function CommunitySection() {
  return (
    <section className="border-y border-zinc-150 bg-zinc-100 px-gutter py-16">
      <div className="grid grid-cols-12 gap-4 gap-y-5">
        <div className="col-start-1 col-end-4 flex flex-col items-start gap-4 max-tab:col-span-full">
          <BarBadge>Community</BarBadge>
          <h2 className="m-0 font-heading text-[clamp(28px,1.5vw+20px,40px)] leading-[1.1] font-medium tracking-[-.02em] text-zinc-900">
            Follow us on
            <br />
            <span className="font-normal text-zinc-600 italic">every channel</span>
          </h2>
        </div>
        <div className="col-start-5 col-end-13 max-tab:col-span-full">
          <div className="grid grid-cols-4 gap-0 max-tab:grid-cols-2">
            {siteData.community.map((it, i) => (
              <CommunityCell key={it.id} item={it} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
