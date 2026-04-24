import { useState, type FormEvent } from 'react';
import { BarBadge, Icon, PersonaIcon } from '@/components/quip/Primitives';

const LEFT_SHAPES = ['plus', 'diamond', 'circle', 'square', 'plus', 'diamond', 'circle'] as const;
const RIGHT_SHAPES = ['circle', 'square', 'plus', 'diamond', 'circle', 'square', 'plus'] as const;
const LEFT_DELAYS = [3.2, 1.1, 2.8, 0.3, 2.0, 3.8, 0.7];
const RIGHT_DELAYS = [0.9, 2.4, 3.5, 1.7, 2.9, 0.1, 3.3];

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      // Submit via hidden form/iframe to avoid CORS
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://listmonk.quip.network/subscription/form';
      form.target = 'listmonk-frame';
      const fields = { email, name: '', l: '7da41db0-e463-4b00-8ce7-71d3c77f3cad' };
      for (const [k, v] of Object.entries(fields)) {
        const i = document.createElement('input');
        i.type = 'hidden';
        i.name = k;
        i.value = v;
        form.appendChild(i);
      }
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3500);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3500);
    }
  };

  return (
    <section
      id="newsletter"
      style={{
        position: 'relative',
        background: '#121218',
        color: '#fafafa',
        padding: '96px clamp(20px,5.45vw,78px)',
        borderTop: '1px solid #27272a',
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
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16 }}>
        <div
          data-hero-aside
          style={{
            gridColumn: '1 / 2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: '#71717b',
          }}
        >
          {LEFT_SHAPES.map((s, i) => (
            <PersonaIcon key={i} shape={s} delay={LEFT_DELAYS[i]} />
          ))}
        </div>
        <div
          style={{
            gridColumn: '4 / 10',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <BarBadge variant="dark">Newsletter</BarBadge>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 2.25vw + 20px, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#fafafa',
            }}
          >
            Stay in the loop
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#9f9fa9' }}>ahead of Q‑Day</span>
          </h2>

          {status === 'success' ? (
            <div style={{ padding: '12px 16px', border: '1px solid #3f3f46', color: '#fafafa', fontSize: 14 }}>
              Thank you — check your inbox to confirm.
            </div>
          ) : (
            <form
              onSubmit={submit}
              data-newsletter-form
              style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 520, marginTop: 8 }}
            >
              <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 12,
                    color: '#71717b',
                    display: 'flex',
                    alignItems: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <Icon name="mail" size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="me@email.com"
                  style={{
                    all: 'unset',
                    flex: 1,
                    boxSizing: 'border-box',
                    width: '100%',
                    padding: '12px 12px 10px 36px',
                    borderBottom: '1px solid #3f3f46',
                    color: '#fafafa',
                    fontSize: 14,
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  padding: '12px 16px 10px',
                  background: status === 'loading' ? '#27272a' : '#fafafa',
                  color: status === 'loading' ? '#71717b' : '#09090b',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontFeatureSettings: "'case'",
                  transition: 'background .15s',
                }}
              >
                {status === 'loading' ? 'Sending…' : 'Subscribe'}
              </button>
            </form>
          )}
          <iframe id="listmonk-frame" name="listmonk-frame" style={{ display: 'none' }} />
        </div>
        <div
          data-hero-aside
          style={{
            gridColumn: '12 / 13',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#71717b',
          }}
        >
          {RIGHT_SHAPES.map((s, i) => (
            <PersonaIcon key={i} shape={s} delay={RIGHT_DELAYS[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
