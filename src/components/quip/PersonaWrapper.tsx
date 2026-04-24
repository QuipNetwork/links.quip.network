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
  mobileCount?: number;
  children: ReactNode;
}

export function PersonaWrapper({ count, mobileCount = count, children }: PersonaWrapperProps) {
  const total = Math.max(count, mobileCount);
  const indices = Array.from({ length: total }, (_, i) => i);
  const columnBase =
    'relative flex flex-row justify-between text-zinc-500 tab:flex-col';
  const visibilityClass = (i: number) =>
    i >= count ? 'tab:hidden' : i >= mobileCount ? 'max-tab:hidden' : '';
  return (
    <div className="relative flex flex-col gap-10 tab:grid tab:grid-cols-12 tab:gap-4">
      <div data-hero-aside className={`${columnBase} tab:col-start-1 tab:col-end-2`}>
        {indices.map((i) => (
          <PersonaIcon
            key={i}
            shape={shapeAt('left', i)}
            delay={delayAt('left', i)}
            className={visibilityClass(i)}
          />
        ))}
      </div>
      {children}
      <div data-hero-aside className={`${columnBase} tab:col-start-12 tab:col-end-13 tab:items-end`}>
        {indices.map((i) => (
          <PersonaIcon
            key={i}
            shape={shapeAt('right', i)}
            delay={delayAt('right', i)}
            className={visibilityClass(i)}
          />
        ))}
      </div>
    </div>
  );
}
