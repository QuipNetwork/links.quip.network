import type { ReactNode } from 'react';

interface WipeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  [key: `data-${string}`]: string | undefined;
}

const WIPE_CLASSES =
  'group flex cursor-pointer bg-transparent bg-left bg-no-repeat bg-linear-to-r from-zinc-950 to-zinc-950 text-zinc-950 transition-all duration-300 ease-brand no-underline ' +
  '[background-size:0%_100%] hover:[background-size:100%_100%] hover:text-zinc-50';

export function WipeLink({ href, children, className, ...rest }: WipeLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? `${WIPE_CLASSES} ${className}` : WIPE_CLASSES}
      {...rest}
    >
      {children}
    </a>
  );
}
