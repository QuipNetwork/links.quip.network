import type { ReactNode } from 'react';

interface HeroBadgeProps {
  children: ReactNode;
  href?: string;
}

export function HeroBadge({ children, href }: HeroBadgeProps) {
  const containerClass =
    'relative inline-flex items-center justify-center bg-hero-gradient px-3 pt-[5px] pb-1 no-underline';
  const inner = (
    <span className="font-mono text-[13px] font-medium tracking-[.4px] whitespace-nowrap text-white uppercase mix-blend-difference">
      {children}
    </span>
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
