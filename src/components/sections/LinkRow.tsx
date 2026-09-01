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
      className={`items-center gap-4 border-t border-zinc-300 px-2 py-5 ${isLast ? 'border-b' : ''}`}
    >
      {/* A one-item list is not a numbered list. */}
      {total > 1 && (
        <span className="w-8 font-mono text-xs font-medium tracking-[.4px] opacity-60">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-heading text-xl leading-[1.2] font-medium tracking-[-.01em]">
          {item.title}
        </span>
        {item.description && (
          <span className="text-[13px] leading-[1.4] text-zinc-600 group-hover:text-zinc-300">
            {item.description}
          </span>
        )}
      </div>
      {item.tag && (
        <span
          data-row-tag
          className="bg-zinc-150 px-2 pt-1 pb-[3px] font-mono text-xs font-medium tracking-[.4px] text-zinc-950 uppercase group-hover:bg-zinc-800 group-hover:text-zinc-50"
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
