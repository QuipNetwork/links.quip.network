import type { CSSProperties, ReactNode } from 'react';

interface HeroBadgeProps {
  children: ReactNode;
  href?: string;
}

export function HeroBadge({ children, href }: HeroBadgeProps) {
  const containerStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 12px 4px',
    textDecoration: 'none',
  };
  const text = (
    <span
      className="text-white"
      style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        fontSize: 13,
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        mixBlendMode: 'difference',
        whiteSpace: 'nowrap',
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
        className="bg-hero-gradient"
        style={containerStyle}
      >
        {text}
      </a>
    );
  }
  return (
    <div data-hero-badge className="bg-hero-gradient" style={containerStyle}>
      {text}
    </div>
  );
}
