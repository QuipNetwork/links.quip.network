import { PersonaIcon } from '@/components/icons/PersonaIcon';

const SHAPES = ['square', 'plus', 'circle', 'diamond', 'square', 'plus'] as const;
const LEFT_DELAYS = [2.7, 0.4, 3.9, 1.3, 2.1, 0.8];
const RIGHT_DELAYS = [1.6, 3.1, 0.2, 2.5, 0.9, 3.7];

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#121218',
        color: '#fafafa',
        display: 'grid',
        gridTemplateColumns: 'repeat(12,1fr)',
        gap: 16,
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

      <div
        data-hero-aside
        style={{
          gridColumn: '1 / 2',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#71717b',
        }}
      >
        {SHAPES.map((sh, i) => (
          <PersonaIcon key={i} shape={sh} delay={LEFT_DELAYS[i]} />
        ))}
      </div>

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
          style={{
            margin: 0,
            maxWidth: 720,
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: 'clamp(28px, 2vw + 18px, 44px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#fafafa',
            fontFeatureSettings: "'case'",
          }}
        >
          The worldwide{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#dbdbde' }}>quantum</span> computer
        </h1>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          <a
            href="https://quip.network"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 14px 8px',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.35,
              background: '#fafafa',
              color: '#09090b',
              textDecoration: 'none',
              fontFeatureSettings: "'case'",
            }}
          >
            Visit quip.network
          </a>
          <a
            href="#newsletter"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 14px 8px',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.35,
              background: 'transparent',
              color: '#fafafa',
              textDecoration: 'none',
              border: '1px solid #3f3f46',
              fontFeatureSettings: "'case'",
            }}
          >
            Stay in the loop
          </a>
        </div>
      </div>

      <div
        data-hero-aside
        style={{
          gridColumn: '12 / 13',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          color: '#71717b',
        }}
      >
        {SHAPES.map((sh, i) => (
          <PersonaIcon key={i} shape={sh} delay={RIGHT_DELAYS[i]} />
        ))}
      </div>
    </section>
  );
}
