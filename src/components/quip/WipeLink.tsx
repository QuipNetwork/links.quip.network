import { useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';

interface WipeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLAnchorElement>) => void;
  wiped?: boolean;
  [key: `data-${string}`]: string | undefined;
}

export function WipeLink({ href, children, className, style, onMouseEnter, onMouseLeave, wiped, ...rest }: WipeLinkProps) {
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
      className={`flex cursor-pointer bg-transparent no-underline${className ? ` ${className}` : ''}`}
      style={{
        fontFamily: 'var(--font-body)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        backgroundSize: on ? '100% 100%' : '0% 100%',
        transition: 'background-size .3s var(--ease), color .3s var(--ease)',
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
