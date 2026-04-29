import type { ReactNode, MouseEvent } from 'react';

type Variant = 'solid' | 'outline';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  disabled?: boolean;
}

interface AnchorButtonProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  type?: never;
}

interface NativeButtonProps extends BaseProps {
  href?: never;
  target?: never;
  rel?: never;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

type ButtonProps = AnchorButtonProps | NativeButtonProps;

const SHARED =
  'inline-flex items-center no-underline ' +
  'shadow-[3px_3px_0_rgb(250_250_250/0.55)] hover:shadow-[5px_5px_0_rgb(250_250_250/0.85)] ' +
  'hover:-translate-x-px hover:-translate-y-px ' +
  'transition-[box-shadow,transform,color,background-color] duration-200 ease-brand';

function fillClass(variant: Variant, disabled: boolean): string {
  if (variant === 'solid') {
    return disabled ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-50 text-zinc-950';
  }
  return disabled
    ? 'border border-zinc-800 bg-transparent text-zinc-600'
    : 'border border-zinc-700 bg-transparent text-zinc-50';
}

export function Button(props: ButtonProps) {
  const { children, variant = 'solid', className = '', disabled = false } = props;
  const cls = `${SHARED} ${fillClass(variant, disabled)} ${className}`.trim();

  if ('href' in props && props.href) {
    const { href, target, rel, onClick } = props;
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={cls}>
        {children}
      </a>
    );
  }
  const { type = 'button', onClick } = props as NativeButtonProps;
  const buttonReset = variant === 'solid' ? 'border-0 ' : '';
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${cls} ${buttonReset}cursor-pointer appearance-none outline-none`}
    >
      {children}
    </button>
  );
}
