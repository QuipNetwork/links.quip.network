import type { CSSProperties } from 'react';

type Shape = 'square' | 'plus' | 'circle' | 'diamond';

interface PersonaIconProps {
  shape: Shape;
  size?: number;
  color?: string;
  delay?: number;
}

export function PersonaIcon({ shape, size = 10, color = 'currentColor', delay = 0 }: PersonaIconProps) {
  const s: CSSProperties = {
    display: 'inline-block',
    flexShrink: 0,
    color,
    animation: 'persona-pulse 4.2s ease-in-out infinite both',
    animationDelay: `${delay}s`,
    willChange: 'opacity',
  };
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
