import { useState } from 'react';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import type { VaultItem } from '@/types';

interface FeatureCardProps {
  item: VaultItem;
  dark: boolean;
}

export function FeatureCard({ item, dark }: FeatureCardProps) {
  const [h, setH] = useState(false);
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="relative flex min-h-[280px] flex-col justify-end overflow-hidden p-6 no-underline"
      style={{
        background: dark ? '#09090b' : '#e4e4e7',
        color: dark ? '#fafafa' : '#09090b',
        transition: 'background .2s',
        border: dark ? '1px solid #27272a' : '1px solid #d4d4d8',
      }}
    >
      <img
        src={item.image}
        alt=""
        aria-hidden
        data-feature-image
        className="pointer-events-none absolute -right-5 -bottom-2.5 h-[92%] w-auto max-w-[60%] object-contain"
        style={{
          opacity: h ? 0.55 : dark ? 0.35 : 0.4,
          filter: dark ? 'none' : 'saturate(0.7)',
          transition: 'opacity .4s, transform .4s',
          transform: h ? 'translateY(-4px)' : 'none',
        }}
      />

      <div className="relative flex max-w-[70%] flex-col gap-3">
        <h3
          className="m-0"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: 'clamp(28px, 1.5vw + 20px, 40px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: dark ? '#fafafa' : '#09090b',
            fontFeatureSettings: "'case'",
          }}
        >
          {item.title}
        </h3>
        <p
          className="m-0 max-w-[280px]"
          style={{ fontSize: 14, lineHeight: 1.4, color: dark ? '#9f9fa9' : '#52525c' }}
        >
          {item.description}
        </p>
        <div
          className="mt-2 inline-flex items-center gap-2"
          style={{
            fontSize: 14,
            color: dark ? '#fafafa' : '#09090b',
          }}
        >
          <span
            className="px-2.5 pt-1.5 pb-1"
            style={{
              background: dark ? (h ? '#fafafa' : 'transparent') : h ? '#09090b' : '#fafafa',
              color: dark ? (h ? '#09090b' : '#fafafa') : h ? '#fafafa' : '#09090b',
              border: dark ? '1px solid #fafafa' : 'none',
              transition: 'all .2s',
              fontFamily: 'var(--font-body)',
              fontFeatureSettings: "'case'",
            }}
          >
            {item.cta}
          </span>
          <ArrowIcon size={16} />
        </div>
      </div>
    </a>
  );
}
