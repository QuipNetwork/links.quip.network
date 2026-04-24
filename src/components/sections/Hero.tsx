import { PersonaWrapper } from '@/components/quip/PersonaWrapper';

export function Hero() {
  return (
    <section
      className="bg-[#121218] text-zinc-50"
      style={{
        position: 'relative',
        padding: '56px clamp(20px,5.45vw,78px) 48px',
        borderBottom: '1px solid #27272a',
      }}
    >
      <img
        src="/images/pattern-dark.svg"
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      <PersonaWrapper count={6}>
        <div
          style={{
            gridColumn: '3 / 11',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            textAlign: 'center',
          }}
        >
          <a href="https://quip.network" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/images/quip-lockup-full-alt.png"
              alt="Quip Network"
              style={{ height: 32, width: 'auto', filter: 'invert(1)' }}
            />
          </a>

          <h1
            data-hero-heading
            className="text-zinc-50"
            style={{
              margin: 0,
              maxWidth: 720,
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

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
            <a
              href="https://quip.network"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-50 text-zinc-950"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 14px 8px',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                lineHeight: 1.35,
                textDecoration: 'none',
                fontFeatureSettings: "'case'",
              }}
            >
              Visit quip.network
            </a>
            <a
              href="#newsletter"
              className="bg-transparent text-zinc-50"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 14px 8px',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                lineHeight: 1.35,
                textDecoration: 'none',
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
