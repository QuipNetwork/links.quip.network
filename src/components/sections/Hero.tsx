import { PersonaWrapper } from '@/components/quip/PersonaWrapper';

export function Hero() {
  return (
    <section
      className="relative bg-[#121218] text-zinc-50"
      style={{
        padding: '56px clamp(20px,5.45vw,78px) 48px',
        borderBottom: '1px solid #27272a',
      }}
    >
      <img
        src="/images/pattern-dark.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[.35]"
      />

      <PersonaWrapper count={6}>
        <div className="relative col-start-3 col-end-11 flex flex-col items-center gap-6 text-center max-tab:col-span-full">
          <a href="https://quip.network" className="inline-flex items-center no-underline">
            <img
              src="/images/quip-lockup-full-alt.png"
              alt="Quip Network"
              className="h-8 w-auto"
              style={{ filter: 'invert(1)' }}
            />
          </a>

          <h1
            data-hero-heading
            className="m-0 max-w-[720px] text-zinc-50"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 2vw + 18px, 44px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontFeatureSettings: "'case'",
            }}
          >
            The worldwide{' '}
            <span className="text-zinc-200" style={{ fontStyle: 'italic', fontWeight: 400 }}>quantum</span> computer
          </h1>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a
              href="https://quip.network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-zinc-50 text-zinc-950 no-underline"
              style={{
                padding: '10px 14px 8px',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                lineHeight: 1.35,
                fontFeatureSettings: "'case'",
              }}
            >
              Visit quip.network
            </a>
            <a
              href="#newsletter"
              className="inline-flex items-center bg-transparent text-zinc-50 no-underline"
              style={{
                padding: '10px 14px 8px',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                lineHeight: 1.35,
                border: '1px solid #3f3f46',
                fontFeatureSettings: "'case'",
              }}
            >
              Stay in the loop
            </a>
          </div>
        </div>
      </PersonaWrapper>
    </section>
  );
}
