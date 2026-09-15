import { useEffect, useRef } from 'react';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { HeroBadge } from '@/components/quip/HeroBadge';
import { Button } from '@/components/quip/Button';
import { useReducedMotion } from '@/lib/pattern-gen/useReducedMotion';
import type { SpotlightItem } from '@/types';

interface SpotlightSectionProps {
  item: SpotlightItem;
}

/**
 * A short banner under the hero: one line of heading, one of copy, and the
 * buttons on the right. The artwork runs behind the whole strip, so the
 * copy sits over a scrim on the left and the loop is left alone on the right.
 */
export function SpotlightSection({ item }: SpotlightSectionProps) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // React does not serialise `muted` into the prerendered HTML, so on a
  // hydrated page Chrome sees an unmuted video and refuses to autoplay it.
  // Mute it on the DOM node and ask for playback ourselves.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reducedMotion]);

  return (
    <section className="bg-zinc-50 px-gutter pt-6 pb-2 tab:pt-8">
      {/* The primary link is stretched over the whole strip (its ::after
          covers the frame) so nested anchors never happen; the secondary link
          sits above it with a z-index. */}
      <div className="group relative flex flex-wrap items-center justify-between gap-x-6 gap-y-5 overflow-hidden border border-zinc-800 bg-zinc-950 px-5 py-5 text-zinc-50 tab:px-7">
        {reducedMotion ? (
          <img
            src={item.poster}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            src={item.video}
            poster={item.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Scrim: solid behind the copy on the left and the buttons on the
            right, with the artwork left alone in between. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 max-tab:hidden"
          style={{
            background:
              'linear-gradient(to right, rgba(9,9,11,.92) 0%, rgba(9,9,11,.8) 40%, rgba(9,9,11,.2) 62%, rgba(9,9,11,.2) 74%, rgba(9,9,11,.88) 100%)',
          }}
        />
        {/* Stacked on a phone, the copy spans the full width, so the scrim
            runs bottom-up instead and leaves only the top edge of the art clear. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 tab:hidden"
          style={{
            background:
              'linear-gradient(to top, rgba(9,9,11,.94) 0%, rgba(9,9,11,.82) 55%, rgba(9,9,11,.35) 100%)',
          }}
        />

        <div className="relative flex min-w-0 items-center gap-4">
          {item.mark && (
            <img
              src={item.mark}
              alt=""
              aria-hidden
              className="size-14 shrink-0 object-contain max-phone:hidden"
            />
          )}
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <HeroBadge>{item.eyebrow}</HeroBadge>
              {/* Dot-separated so the facts read as a list, not a sentence. */}
              <ul className="m-0 flex list-none flex-wrap items-center p-0 font-mono text-[11px] font-medium tracking-[.4px] uppercase text-zinc-400 max-tab:hidden">
                {item.facts.map((f, i) => (
                  <li key={f} className="flex items-center">
                    {i > 0 && <span aria-hidden className="mx-2.5 inline-block size-[3px] bg-zinc-500" />}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <h2 className="m-0 font-heading text-[clamp(22px,1.2vw+16px,32px)] leading-[1.1] font-medium tracking-[-.02em]">
              {item.title}
              <br />
              <span className="font-normal text-zinc-300 italic">{item.subtitle}</span>
            </h2>
          </div>
        </div>

        <div className="relative flex shrink-0 flex-wrap items-center gap-3 max-phone:gap-2">
          <a
            href={item.primary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-50 px-3.5 pt-2.5 pb-2 text-[13px] leading-[1.35] text-zinc-950 no-underline transition-transform duration-200 ease-brand group-hover:-translate-x-px group-hover:-translate-y-px after:absolute after:inset-0 after:content-[''] max-phone:px-3"
          >
            {item.primary.label}
            <ArrowIcon size={14} />
          </a>
          {item.secondary && (
            <Button
              href={item.secondary.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="relative z-10 bg-zinc-950/80 px-3.5 pt-2.5 pb-2 text-[13px] leading-[1.35] backdrop-blur-sm max-phone:px-3"
            >
              {item.secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
