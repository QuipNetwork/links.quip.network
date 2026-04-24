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
    background:
      'linear-gradient(to right,#FEF278 0%,#FFDE53 32.69%,#EEFF64 59.9%,#CAFDFB 75.42%,#BCF4FF 86.91%,#E6D7FF 100%)',
    textDecoration: 'none',
  };
  const text = (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        fontSize: 13,
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        color: '#fff',
        mixBlendMode: 'difference',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-hero-badge style={containerStyle}>
        {text}
      </a>
    );
  }
  return (
    <div data-hero-badge style={containerStyle}>
      {text}
    </div>
  );
}
