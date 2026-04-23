import { useState, type CSSProperties, type ReactNode, type MouseEvent } from 'react';

type Shape = 'square' | 'plus' | 'circle' | 'diamond';

interface PersonaIconProps {
  shape: Shape;
  size?: number;
  color?: string;
}

export function PersonaIcon({ shape, size = 10, color = 'currentColor' }: PersonaIconProps) {
  const s: CSSProperties = { display: 'inline-block', flexShrink: 0, color };
  if (shape === 'diamond')
    return (
      <span
        style={{
          ...s,
          width: size * 0.7,
          height: size * 1.1,
          background: 'currentColor',
          clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
        }}
        aria-hidden
      />
    );
  if (shape === 'square')
    return <span style={{ ...s, width: size, height: size, background: 'currentColor' }} aria-hidden />;
  if (shape === 'circle')
    return (
      <span style={{ ...s, width: size, height: size, background: 'currentColor', borderRadius: '50%' }} aria-hidden />
    );
  return (
    <span style={{ ...s, position: 'relative', width: size, height: size }} aria-hidden>
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: size * 0.45,
          height: size * 0.18,
          background: 'currentColor',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: size * 0.41,
          width: size * 0.18,
          background: 'currentColor',
        }}
      />
    </span>
  );
}

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

interface HeroBadgeProps {
  children: ReactNode;
}

export function HeroBadge({ children }: HeroBadgeProps) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 12px 4px',
        background:
          'linear-gradient(to right,#FEF278 0%,#FFDE53 32.69%,#EEFF64 59.9%,#CAFDFB 75.42%,#BCF4FF 86.91%,#E6D7FF 100%)',
      }}
    >
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
    </div>
  );
}

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

export type IconName =
  | 'twitter'
  | 'discord'
  | 'telegram'
  | 'farcaster'
  | 'github'
  | 'arrow'
  | 'mail'
  | 'calendar'
  | 'pin';

interface IconProps {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 18 }: IconProps) {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const filled = { fill: 'currentColor' };

  switch (name) {
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} {...filled}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} {...filled}>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25A19.736 19.736 0 0 0 3.677 4.37C.533 9.046-.32 13.58.099 18.057a19.9 19.9 0 0 0 6.077 3.087 14.09 14.09 0 0 0 1.226-1.994 13.107 13.107 0 0 1-1.872-.892c.158-.115.313-.234.463-.354 3.928 1.793 8.18 1.793 12.062 0 .152.12.307.239.465.354a12.299 12.299 0 0 1-1.873.892c.36.698.772 1.362 1.225 1.993a19.839 19.839 0 0 0 6.086-3.084c.5-5.177-.838-9.674-3.549-13.66zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} {...filled}>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      );
    case 'farcaster':
      return (
        <svg viewBox="0 0 1000 1000" width={size} height={size} {...filled}>
          <path d="M257.778 155.556H742.222V844.444H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.444H257.778V155.556Z" />
          <path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.444H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z" />
          <path d="M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.444H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.939 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} {...filled}>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case 'arrow':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} {...stroke}>
          <path d="M7 17L17 7" />
          <path d="M8 7h9v9" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} {...stroke}>
          <rect x="2" y="4" width="20" height="16" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} {...stroke}>
          <rect x="3" y="5" width="18" height="16" />
          <path d="M3 10h18" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
        </svg>
      );
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} {...stroke}>
          <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    default:
      return null;
  }
}
