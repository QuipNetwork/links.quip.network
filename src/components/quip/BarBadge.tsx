import type { ReactNode } from 'react';

interface BarBadgeProps {
  children: ReactNode;
  variant?: 'dark' | 'light';
}

export function BarBadge({ children, variant = 'dark' }: BarBadgeProps) {
  const tone = variant === 'dark' ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-950';
  const bar = variant === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50';
  return (
    <div className="inline-flex items-stretch gap-1">
      <span
        className={`inline-flex items-center px-2 pt-[5px] pb-1 ${tone}`}
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          lineHeight: 1.15,
        }}
      >
        {children}
      </span>
      <span className={`w-1 ${bar}`} />
    </div>
  );
}
