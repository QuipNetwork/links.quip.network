import { Button } from '@/components/quip/Button';
import { PersonaWrapper } from '@/components/quip/PersonaWrapper';

export function Hero() {
  return (
    <section className="relative border-b border-zinc-800 bg-[#121218] px-gutter py-10 tab:pt-14 tab:pb-12 text-zinc-50">
      <img
        src="/images/pattern-dark.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[.35]"
      />

      <PersonaWrapper count={6} mobileCount={11}>
        <div className="relative col-start-3 col-end-11 flex flex-col items-center gap-6 text-center max-tab:col-span-full">
          <a href="https://quip.network" className="inline-flex items-center no-underline">
            <img
              src="/images/quip-lockup-full-alt.png"
              alt="Quip Network"
              className="h-8 w-auto invert"
            />
          </a>

          <h1
            data-hero-heading
            className="m-0 max-w-[720px] font-heading text-[clamp(28px,2vw+18px,44px)] leading-[1.05] font-medium tracking-[-.02em] text-zinc-50"
          >
            The worldwide{' '}
            <span className="font-normal text-zinc-200 italic">quantum</span> computer
          </h1>

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
              href="#newsletter"
              variant="outline"
              className="px-3.5 pt-2.5 pb-2 text-[13px] leading-[1.35]"
            >
              Stay in the loop
            </Button>
          </div>
        </div>
      </PersonaWrapper>
    </section>
  );
}
