import { useState, type FormEvent } from 'react';
import { BarBadge } from '@/components/quip/BarBadge';
import { PersonaWrapper } from '@/components/quip/PersonaWrapper';

const personas = ['Consumer', 'Enterprise', 'Operator', 'Developer'];

// Stamped on every submission so link-page leads are separable from the ones
// the footer form on quip.network collects. Both feed the same "contact" form,
// so without this they are indistinguishable in the Netlify inbox.
const SOURCE = 'links.quip.network';

// Ported from quip-website's ContactCta/ContactForm. Both submissions are
// proxied (see netlify.toml) to quip.network so this page feeds the SAME funnel
// as the main site's footer form rather than a second one:
//   POST /__contact             -> https://www.quip.network/  (Netlify Forms, form "contact")
//   POST /api/contact-subscribe -> the main site's Listmonk edge function
// The form deliberately carries no data-netlify attribute: form detection here
// would register a second, permanently empty "contact" form on this site.
// Keep the field names capitalised; the main site's handlers read them.
const fieldClass =
  'w-full border-0 border-b border-zinc-700 bg-transparent p-3 text-[16px] leading-[1.35] text-zinc-50 transition-colors duration-150 outline-none placeholder:text-zinc-50 placeholder:opacity-50 focus:border-b-zinc-500';

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [persona, setPersona] = useState('Consumer');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('Email') ?? '');
    const name = String(data.get('Name') ?? '');

    const submitNetlify = fetch('/__contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
    });

    const submitListmonk = fetch('/api/contact-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // `source` is ignored by the edge function today; it is sent so the field
      // is already in place when contact-subscribe learns to record it.
      body: JSON.stringify({ email, name, persona, source: SOURCE }),
    });

    try {
      const [netlify] = await Promise.allSettled([submitNetlify, submitListmonk]);
      if (netlify.status === 'fulfilled' && netlify.value.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t border-zinc-800 bg-[#121218] px-gutter py-10 tab:py-24 text-zinc-50"
    >
      <img
        src="/images/pattern-dark.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <PersonaWrapper count={7} mobileCount={11}>
        <div className="col-start-4 col-end-10 flex flex-col items-center gap-6 text-center max-tab:col-span-full">
          <BarBadge variant="light">Contact</BarBadge>
          <h2 className="m-0 font-heading text-[clamp(32px,2.25vw+20px,52px)] leading-[1.1] font-medium tracking-[-.02em] text-zinc-50">
            Get in touch
          </h2>
          <p className="m-0 max-w-[420px] text-[14px] leading-[1.35] text-zinc-400">
            Whether you're a developer, infrastructure provider, or protocol foundation, we would
            love to learn more about your needs in the time of quantum supremacy and work together
            to ensure the transition to a world with quantum computers.
          </p>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center gap-2 text-center text-zinc-50">
              <p className="m-0 text-[18px] leading-[1.4]">Thank you.</p>
              <p className="m-0 text-[14px] text-zinc-400">Your submission has been received.</p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              onSubmit={handleSubmit}
              data-contact-form
              className="flex w-[418px] max-w-full flex-col gap-6 text-left"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input
                type="text"
                name="bot-field"
                aria-hidden="true"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <input type="hidden" name="persona" value={persona} />
              <input type="hidden" name="source" value={SOURCE} />

              <div className="flex flex-col gap-2">
                <span className="text-[14px] text-zinc-50 opacity-50">I am...</span>
                <div className="grid grid-cols-4 gap-2">
                  {personas.map((p) => {
                    const active = persona === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPersona(p)}
                        className={`inline-flex cursor-pointer items-center justify-center border-0 px-2 pt-1 pb-0.5 text-[14px] leading-[1.35] transition-colors duration-150 ${
                          active
                            ? 'bg-zinc-700 text-zinc-50'
                            : 'bg-zinc-800 text-zinc-500 hover:text-zinc-50'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="Name"
                  placeholder="Name"
                  required
                  autoComplete="name"
                  maxLength={128}
                  className={fieldClass}
                />
                <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  maxLength={256}
                  className={fieldClass}
                />
                <input
                  type="text"
                  name="Organization"
                  placeholder="Organization"
                  required
                  autoComplete="organization"
                  maxLength={256}
                  className={fieldClass}
                />
                <textarea
                  name="Message"
                  placeholder="Tell us why you are getting in touch"
                  required
                  rows={3}
                  maxLength={512}
                  className={`${fieldClass} min-h-[88px] resize-y`}
                />
              </div>

              <div className="flex items-center">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex cursor-pointer items-center justify-center border-0 bg-zinc-700 px-4 pt-3 pb-2.5 text-[14px] leading-[1.15] tracking-[0.4px] text-zinc-50 capitalize transition-colors duration-150 hover:bg-[#56565c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Please wait...' : 'Send'}
                </button>
                {status === 'error' && (
                  <span className="inline-flex items-center px-4 pt-3 pb-2.5 text-[14px] leading-[1.15] tracking-[0.4px] text-[#ff6467]">
                    Something went wrong. Please try again.
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </PersonaWrapper>
    </section>
  );
}
