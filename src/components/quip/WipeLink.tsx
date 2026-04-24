import { useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';

interface WipeLinkProps {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLAnchorElement>) => void;
  wiped?: boolean;
  [key: `data-${string}`]: string | undefined;
}

export function WipeLink({ href, children, style, onMouseEnter, onMouseLeave, wiped, ...rest }: WipeLinkProps) {
  const [h, setH] = useState(false);
  const on = wiped !== undefined ? wiped : h;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={(e) => {
        setH(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setH(false);
        onMouseLeave?.(e);
      }}
      style={{
        display: 'flex',
        textDecoration: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        backgroundSize: on ? '100% 100%' : '0% 100%',
        transition: 'background-size .3s var(--ease), color .3s var(--ease)',
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(#09090b,#09090b)',
        color: on ? '#fafafa' : '#09090b',
        ...style,
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
