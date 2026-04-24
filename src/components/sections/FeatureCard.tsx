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
      style={{
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: 280,
        padding: '24px',
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
        style={{
          position: 'absolute',
          right: -20,
          bottom: -10,
          height: '92%',
          width: 'auto',
          maxWidth: '60%',
          objectFit: 'contain',
          opacity: h ? 0.55 : dark ? 0.35 : 0.4,
          filter: dark ? 'none' : 'saturate(0.7)',
          transition: 'opacity .4s, transform .4s',
          transform: h ? 'translateY(-4px)' : 'none',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: '70%' }}>
        <h3
          style={{
            margin: 0,
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
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.4, color: dark ? '#9f9fa9' : '#52525c', maxWidth: 280 }}>
          {item.description}
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 8,
            fontSize: 14,
            color: dark ? '#fafafa' : '#09090b',
          }}
        >
          <span
            style={{
              padding: '6px 10px 4px',
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
