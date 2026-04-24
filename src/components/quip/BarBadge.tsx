import type { ReactNode } from 'react';

interface BarBadgeProps {
  children: ReactNode;
  variant?: 'dark' | 'light';
}

export function BarBadge({ children, variant = 'dark' }: BarBadgeProps) {
  const isDark = variant === 'dark';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'stretch', gap: 4 }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '5px 8px 4px',
          background: isDark ? '#09090b' : '#fafafa',
          color: isDark ? '#fafafa' : '#09090b',
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
      <span style={{ width: 4, background: isDark ? '#09090b' : '#fafafa' }} />
    </div>
  );
}
