import type { ReactNode } from 'react';

interface BarBadgeProps {
  children: ReactNode;
  variant?: 'dark' | 'light';
}

export function BarBadge({ children, variant = 'dark' }: BarBadgeProps) {
  const tone = variant === 'dark' ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-950';
  const bar = variant === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'stretch', gap: 4 }}>
      <span
        className={tone}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '5px 8px 4px',
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
      <span className={bar} style={{ width: 4 }} />
    </div>
  );
}
