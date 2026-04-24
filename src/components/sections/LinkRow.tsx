import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { WipeLink } from '@/components/quip/WipeLink';
import type { LinkItem } from '@/types';

interface LinkRowProps {
  item: LinkItem;
  index: number;
  total: number;
}

export function LinkRow({ item, index, total }: LinkRowProps) {
  const isLast = index === total - 1;
  return (
    <WipeLink
      href={item.url}
      className={`items-center gap-4 border-t border-zinc-300 px-2 py-5${isLast ? ' border-b' : ''}`}
    >
      <span
        className="w-8 opacity-60"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.4px',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: 20,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            fontFeatureSettings: "'case'",
          }}
        >
          {item.title}
        </span>
        {item.description && (
          <span
            className="text-zinc-600 group-hover:text-zinc-300"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.4,
            }}
          >
            {item.description}
          </span>
        )}
      </div>
      {item.tag && (
        <span
          data-row-tag
          className="bg-zinc-150 px-2 pt-1 pb-[3px] text-zinc-950 group-hover:bg-zinc-800 group-hover:text-zinc-50"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
          }}
        >
          {item.tag}
        </span>
      )}
      <span className="inline-flex opacity-70">
        <ArrowIcon size={18} />
      </span>
    </WipeLink>
  );
}
