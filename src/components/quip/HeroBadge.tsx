import type { ReactNode } from 'react';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

interface HeroBadgeProps {
  children: ReactNode;
  href?: string;
}

export function HeroBadge({ children, href }: HeroBadgeProps) {
  const containerClass =
    'group relative inline-flex items-center justify-center bg-hero-gradient px-3 pt-[5px] pb-1 no-underline';
  const inner = (
    <>
      <span className="font-mono text-[13px] font-medium tracking-[.4px] whitespace-nowrap text-white uppercase mix-blend-difference">
        {children}
      </span>
      {href && (
        <span
          aria-hidden
          className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-zinc-950 text-zinc-50"
        >
          <span className="absolute inset-0 inline-flex items-center justify-center transition-transform duration-300 ease-brand group-hover:translate-x-2.5 group-hover:-translate-y-2.5">
            <ArrowIcon size={10} strokeWidth={2.5} />
          </span>
          <span className="absolute inset-0 inline-flex -translate-x-2.5 translate-y-2.5 items-center justify-center transition-transform duration-300 ease-brand group-hover:translate-x-0 group-hover:translate-y-0">
            <ArrowIcon size={10} strokeWidth={2.5} />
          </span>
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-hero-badge
        className={containerClass}
      >
        {inner}
      </a>
    );
  }
  return (
    <div data-hero-badge className={containerClass}>
      {inner}
    </div>
  );
}
