import { BarBadge } from '@/components/quip/BarBadge';
import { LinkRow } from '@/components/sections/LinkRow';
import type { LinkItem } from '@/types';

interface LinkSectionBlockProps {
  eyebrow: string;
  heading: string;
  italic?: string;
  links: LinkItem[];
}

export function LinkSectionBlock({ eyebrow, heading, italic, links }: LinkSectionBlockProps) {
  return (
    <section className="bg-zinc-50" style={{ padding: '64px clamp(20px,5.45vw,78px)' }}>
      <div className="grid grid-cols-12 items-stretch gap-4">
        <div className="col-start-1 col-end-4 flex flex-col flex-wrap items-start gap-4 max-tab:col-span-full">
          <BarBadge>{eyebrow}</BarBadge>
          <h2
            className="m-0 text-zinc-900"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 1.5vw + 20px, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {heading}
            {italic && (
              <>
                <br />
                <span className="text-zinc-600" style={{ fontStyle: 'italic', fontWeight: 400 }}>{italic}</span>
              </>
            )}
          </h2>
        </div>
        <div className="col-start-5 col-end-13 max-tab:col-span-full">
          <ul className="m-0 list-none p-0">
            {links.map((l, i) => (
              <li key={l.id}>
                <LinkRow item={l} index={i} total={links.length} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
