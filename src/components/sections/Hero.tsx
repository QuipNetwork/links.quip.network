import { Button } from '@/components/quip/Button';
import { PersonaWrapper } from '@/components/quip/PersonaWrapper';

export function Hero() {
  return (
    <section className="relative border-b border-zinc-800 bg-[#121218] px-gutter py-10 tab:pt-14 tab:pb-12 text-zinc-50">
      <img
        src="/images/pattern-dark.svg"
        alt=""
        width={1612}
        height={809}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[.35]"
      />

      <PersonaWrapper count={6} mobileCount={11}>
        <div className="relative col-start-3 col-end-11 flex flex-col items-center gap-6 text-center max-tab:col-span-full">
          <a href="https://quip.network" className="inline-flex items-center no-underline">
            <picture>
              <source srcSet="/images/quip-lockup-full-alt.webp" type="image/webp" />
              <img
                src="/images/quip-lockup-full-alt.png"
                alt="Quip Network"
                width={705}
                height={105}
                className="h-8 w-auto invert"
              />
            </picture>
          </a>

          <h1
            data-hero-heading
            className="m-0 max-w-[720px] font-heading text-[clamp(28px,2vw+18px,44px)] leading-[1.05] font-medium tracking-[-.02em] text-zinc-50"
          >
            The worldwide{' '}
            <span className="font-normal text-zinc-200 italic">quantum</span> computer
          </h1>

          <p className="m-0 max-w-[540px] text-sm leading-[1.4] text-zinc-300">
            Find Quip Network products, developer tools, research, events, and community links.
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button
              href="https://quip.network"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 pt-2.5 pb-2 text-[13px] leading-[1.35]"
            >
              Visit quip.network
            </Button>
            <Button
              href="#contact"
              variant="outline"
              className="px-3.5 pt-2.5 pb-2 text-[13px] leading-[1.35]"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </PersonaWrapper>
    </section>
  );
}
