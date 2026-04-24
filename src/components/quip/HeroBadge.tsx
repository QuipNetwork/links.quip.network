import type { CSSProperties, ReactNode } from 'react';

interface HeroBadgeProps {
  children: ReactNode;
  href?: string;
}

export function HeroBadge({ children, href }: HeroBadgeProps) {
  const containerClass =
    'relative inline-flex items-center justify-center bg-hero-gradient no-underline';
  const containerStyle: CSSProperties = { padding: '5px 12px 4px' };
  const text = (
    <span
      className="whitespace-nowrap text-white"
      style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        fontSize: 13,
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        mixBlendMode: 'difference',
      }}
    >
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
        style={containerStyle}
      >
        {text}
      </a>
    );
  }
  return (
    <div data-hero-badge className={containerClass} style={containerStyle}>
      {text}
    </div>
  );
}
