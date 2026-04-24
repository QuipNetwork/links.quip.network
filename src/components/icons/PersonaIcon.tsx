import type { CSSProperties } from 'react';

type Shape = 'square' | 'plus' | 'circle' | 'diamond';

interface PersonaIconProps {
  shape: Shape;
  size?: number;
  color?: string;
  delay?: number;
  className?: string;
}

const PULSE_CLASSES =
  'inline-block shrink-0 will-change-[opacity] animate-persona-pulse motion-reduce:animate-none motion-reduce:opacity-55';

export function PersonaIcon({ shape, size = 10, color = 'currentColor', delay = 0, className = '' }: PersonaIconProps) {
  const base: CSSProperties = { color, animationDelay: `${delay}s` };
  if (shape === 'diamond')
    return (
      <span
        aria-hidden
        className={`${PULSE_CLASSES} bg-current [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] ${className}`}
        style={{ ...base, width: size * 0.7, height: size * 1.1 }}
      />
    );
  if (shape === 'square')
    return (
      <span
        aria-hidden
        className={`${PULSE_CLASSES} bg-current ${className}`}
        style={{ ...base, width: size, height: size }}
      />
    );
  if (shape === 'circle')
    return (
      <span
        aria-hidden
        className={`${PULSE_CLASSES} rounded-full bg-current ${className}`}
        style={{ ...base, width: size, height: size }}
      />
    );
  return (
    <span
      aria-hidden
      className={`${PULSE_CLASSES} relative ${className}`}
      style={{ ...base, width: size, height: size }}
    >
      <span
        className="absolute right-0 left-0 bg-current"
        style={{ top: size * 0.45, height: size * 0.18 }}
      />
      <span
        className="absolute top-0 bottom-0 bg-current"
        style={{ left: size * 0.41, width: size * 0.18 }}
      />
    </span>
  );
}
