import type { ReactNode } from 'react';
import { PersonaIcon } from '@/components/icons/PersonaIcon';

type Shape = 'square' | 'plus' | 'circle' | 'diamond';
type Side = 'left' | 'right';

const CYCLE: readonly Shape[] = ['square', 'plus', 'circle', 'diamond'];
const PULSE_DURATION = 4.2;

const shapeAt = (side: Side, i: number): Shape =>
  CYCLE[(i + (side === 'right' ? 2 : 0)) % CYCLE.length];

const delayAt = (side: Side, i: number): number =>
  (i * 1.618 + (side === 'right' ? 1.3 : 0.7)) % PULSE_DURATION;

interface PersonaWrapperProps {
  count: number;
  children: ReactNode;
}

export function PersonaWrapper({ count, children }: PersonaWrapperProps) {
  const indices = Array.from({ length: count }, (_, i) => i);
  const columnBase = 'relative flex flex-col justify-between text-zinc-500';
  return (
    <div className="relative grid grid-cols-12 gap-4">
      <div data-hero-aside className={`${columnBase} col-start-1 col-end-2`}>
        {indices.map((i) => (
          <PersonaIcon key={i} shape={shapeAt('left', i)} delay={delayAt('left', i)} />
        ))}
      </div>
      {children}
      <div data-hero-aside className={`${columnBase} col-start-12 col-end-13 items-end`}>
        {indices.map((i) => (
          <PersonaIcon key={i} shape={shapeAt('right', i)} delay={delayAt('right', i)} />
        ))}
      </div>
    </div>
  );
}
