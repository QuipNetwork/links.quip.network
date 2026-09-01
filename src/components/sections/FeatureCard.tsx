import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { PatternCanvas } from '@/lib/pattern-gen/PatternCanvas';
import type { ProductItem } from '@/types';

interface FeatureCardProps {
  item: ProductItem;
  dark: boolean;
}

export function FeatureCard({ item, dark }: FeatureCardProps) {
  const cardClass = dark
    ? 'border border-zinc-800 bg-zinc-950 text-zinc-50'
    : 'border border-zinc-250 bg-zinc-150 text-zinc-950';
  const imgOpacity = dark
    ? 'opacity-35 group-hover:opacity-55'
    : 'opacity-40 saturate-[.7] group-hover:opacity-55';
  const ctaClass = dark
    ? 'border border-zinc-50 bg-transparent text-zinc-50 group-hover:bg-zinc-50 group-hover:text-zinc-950'
    : 'bg-zinc-50 text-zinc-950 group-hover:bg-zinc-950 group-hover:text-zinc-50';
  const pColor = dark ? 'text-zinc-400' : 'text-zinc-600';
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex min-h-[280px] flex-col justify-end overflow-hidden p-6 no-underline transition-colors duration-200 ${cardClass}`}
    >
      {item.pattern ? (
        <div
          aria-hidden
          data-feature-pattern
          className="pointer-events-none absolute inset-y-0"
          style={{
            opacity: item.pattern.opacity ?? 0.5,
            left: item.pattern.insetX ?? 0,
            right: item.pattern.insetX ?? 0,
          }}
        >
          <PatternCanvas
            mode={item.pattern.mode}
            colorScheme={item.pattern.colorScheme}
            pixelShape={item.pattern.pixelShape ?? 'square'}
            pixelSize={item.pattern.pixelSize ?? 4}
            colorVariation="noise"
            p1={item.pattern.p1 ?? 0.5}
            p2={item.pattern.p2 ?? 0.5}
            p3={item.pattern.p3 ?? 0.5}
            p4={item.pattern.p4 ?? 0.5}
            animate
            transparentBg
          />
        </div>
      ) : item.image ? (
        <img
          src={item.image}
          alt=""
          aria-hidden
          data-feature-image
          className={`pointer-events-none absolute -right-5 -bottom-2.5 h-[92%] w-auto max-w-[60%] object-contain transition duration-[400ms] group-hover:-translate-y-1 ${imgOpacity}`}
        />
      ) : null}

      {/* Scrim: keeps the heading, copy and CTA legible over a moving backdrop. */}
      {item.pattern && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: dark
              ? 'linear-gradient(to top, rgba(9,9,11,.9) 16%, rgba(9,9,11,.55) 46%, rgba(9,9,11,0) 100%)'
              : 'linear-gradient(to top, rgba(228,228,231,.9) 16%, rgba(228,228,231,.55) 46%, rgba(228,228,231,0) 100%)',
          }}
        />
      )}

      <div className="relative flex max-w-[78%] flex-col gap-3">
        <h3 className="m-0 font-heading text-[clamp(28px,1.5vw+20px,40px)] leading-[1.05] font-medium tracking-[-.02em]">
          {item.title}
        </h3>
        <p className={`m-0 max-w-[280px] text-sm leading-[1.4] ${pColor}`}>
          {item.description}
        </p>
        <div className="mt-2 inline-flex items-center gap-2 text-sm">
          <span className={`px-2.5 pt-1.5 pb-1 transition-all duration-200 ${ctaClass}`}>
            {item.cta}
          </span>
          <ArrowIcon size={16} />
        </div>
      </div>
    </a>
  );
}
