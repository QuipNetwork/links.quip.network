import { CSSProperties } from 'react';
import { IconName } from '@/types';

interface IconProps {
  name: IconName | string | null;
  className?: string;
  size?: number;
  style?: CSSProperties;
}

export function Icon({ name, className = '', size = 20, style }: IconProps) {
  if (!name) return null;

  // Common stroke props for Lucide-style icons
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const iconMap: Record<string, React.ReactNode> = {
    // Brand icons (keep original brand-specific designs)
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    discord: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
    telegram: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    farcaster: (
      <svg viewBox="0 0 1000 1000" fill="currentColor" width={size} height={size} className={className}>
        <path d="M257.778 155.556H742.222V844.444H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.444H257.778V155.556Z"/>
        <path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.444H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z"/>
        <path d="M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.444H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.939 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    medium: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ),

    // Lucide Icons - Finance
    vault: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="12" cy="12" r="1"/>
        <path d="M12 3v1"/>
        <path d="M12 20v1"/>
        <path d="M3 12h1"/>
        <path d="M20 12h1"/>
        <path d="M21 17h1v4h-2"/>
        <path d="M3 17H2v4h2"/>
      </svg>
    ),

    token: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9"/>
        <path d="M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4"/>
      </svg>
    ),

    // Lucide Icons - Resources
    book: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    ),
    bookOpen: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    fileText: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" x2="8" y1="13" y2="13"/>
        <line x1="16" x2="8" y1="17" y2="17"/>
        <line x1="10" x2="8" y1="9" y2="9"/>
      </svg>
    ),
    scroll: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/>
        <path d="M19 17V5a2 2 0 0 0-2-2H4"/>
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
        <line x1="16" x2="16" y1="2" y2="6"/>
        <line x1="8" x2="8" y1="2" y2="6"/>
        <line x1="3" x2="21" y1="10" y2="10"/>
      </svg>
    ),
    helpCircle: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
      </svg>
    ),
    map: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
        <line x1="9" x2="9" y1="3" y2="18"/>
        <line x1="15" x2="15" y1="6" y2="21"/>
      </svg>
    ),

    // Lucide Icons - Actions
    arrowRight: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
      </svg>
    ),
    externalLink: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" x2="21" y1="14" y2="3"/>
      </svg>
    ),
    download: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" x2="12" y1="15" y2="3"/>
      </svg>
    ),
    mail: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    wallet: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
      </svg>
    ),

    // Lucide Icons - Categories
    users: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    newspaper: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/>
        <path d="M15 18h-5"/>
        <path d="M10 6h8v4h-8V6Z"/>
      </svg>
    ),
    wrench: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      </svg>
    ),
    link: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    layers: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),

    // Lucide Icons - UI
    chevronDown: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="m6 9 6 6 6-6"/>
      </svg>
    ),
    chevronRight: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="m9 18 6-6-6-6"/>
      </svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
      </svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M5 12h14"/>
        <path d="M12 5v14"/>
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    eye: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    gripVertical: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <circle cx="9" cy="12" r="1"/>
        <circle cx="9" cy="5" r="1"/>
        <circle cx="9" cy="19" r="1"/>
        <circle cx="15" cy="12" r="1"/>
        <circle cx="15" cy="5" r="1"/>
        <circle cx="15" cy="19" r="1"/>
      </svg>
    ),
    trash: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M3 6h18"/>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        <line x1="10" x2="10" y1="11" y2="17"/>
        <line x1="14" x2="14" y1="11" y2="17"/>
      </svg>
    ),
    edit: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
      </svg>
    ),
    save: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 7 8 15 8"/>
      </svg>
    ),

    // Lucide Icons - Quantum/Tech themed
    cpu: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <rect width="16" height="16" x="4" y="4" rx="2"/>
        <rect width="6" height="6" x="9" y="9" rx="1"/>
        <path d="M15 2v2"/>
        <path d="M15 20v2"/>
        <path d="M2 15h2"/>
        <path d="M2 9h2"/>
        <path d="M20 15h2"/>
        <path d="M20 9h2"/>
        <path d="M9 2v2"/>
        <path d="M9 20v2"/>
      </svg>
    ),
    activity: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    sparkles: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    ),

    // Aliases for backward compatibility
    documentation: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    ),
    whitepaper: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" x2="8" y1="13" y2="13"/>
        <line x1="16" x2="8" y1="17" y2="17"/>
        <line x1="10" x2="8" y1="9" y2="9"/>
      </svg>
    ),
    blog: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    faq: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
      </svg>
    ),
    roadmap: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
        <line x1="9" x2="9" y1="3" y2="18"/>
        <line x1="15" x2="15" y1="6" y2="21"/>
      </svg>
    ),
    launch: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
      </svg>
    ),
    external: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" x2="21" y1="14" y2="3"/>
      </svg>
    ),
    email: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    news: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/>
        <path d="M15 18h-5"/>
        <path d="M10 6h8v4h-8V6Z"/>
      </svg>
    ),
    tools: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    partners: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      </svg>
    ),
    drag: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <circle cx="9" cy="12" r="1"/>
        <circle cx="9" cy="5" r="1"/>
        <circle cx="9" cy="19" r="1"/>
        <circle cx="15" cy="12" r="1"/>
        <circle cx="15" cy="5" r="1"/>
        <circle cx="15" cy="19" r="1"/>
      </svg>
    ),
    pulse: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...stroke}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
      </svg>
    ),
  };

  const icon = iconMap[name] || iconMap.link;

  if (style) {
    return <span style={style}>{icon}</span>;
  }

  return icon;
}

export const iconOptions: { value: string; label: string }[] = [
  // Social
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'discord', label: 'Discord' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'farcaster', label: 'Farcaster' },
  { value: 'github', label: 'GitHub' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'medium', label: 'Medium' },
  // Resources
  { value: 'book', label: 'Book' },
  { value: 'bookOpen', label: 'Book Open' },
  { value: 'fileText', label: 'Document' },
  { value: 'scroll', label: 'Scroll/Whitepaper' },
  { value: 'clock', label: 'Clock' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'helpCircle', label: 'Help/FAQ' },
  { value: 'map', label: 'Map/Roadmap' },
  { value: 'newspaper', label: 'News' },
  // Actions
  { value: 'arrowRight', label: 'Arrow Right' },
  { value: 'externalLink', label: 'External Link' },
  { value: 'download', label: 'Download' },
  { value: 'mail', label: 'Email' },
  { value: 'wallet', label: 'Wallet' },
  // Categories
  { value: 'users', label: 'Users/Community' },
  { value: 'code', label: 'Code/Developers' },
  { value: 'wrench', label: 'Tools' },
  { value: 'shield', label: 'Shield/Security' },
  { value: 'link', label: 'Link' },
  { value: 'layers', label: 'Layers' },
  { value: 'globe', label: 'Globe' },
  // Tech/Quantum
  { value: 'cpu', label: 'CPU/Processor' },
  { value: 'activity', label: 'Activity/Pulse' },
  { value: 'sparkles', label: 'Sparkles' },
  { value: 'zap', label: 'Zap/Lightning' },
];
