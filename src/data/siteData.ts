import { SiteData } from '@/types';

export const siteData: SiteData = {
  vault: [
    {
      id: 'vault',
      title: 'Protect',
      url: 'https://account.quip.network/',
      description: 'Deposit and earn QUIP while protecting your assets from quantum threats',
      image: '/images/safe.png',
      cta: 'Deposit & Protect',
    },
    {
      id: 'quest',
      title: 'Quests',
      url: 'https://quest.quip.network/',
      description: 'Earn points to become eligible for the Quip Network Airdrop',
      image: '/images/chest.png',
      cta: 'Start Earning',
    },
  ],
  // Hosted events are sourced live from the Luma API (see EventsSection). No static
  // fallback — on fetch failure we fall through to the empty-state acknowledgment.
  events: [],
  // Events we're attending/sponsoring but not hosting. Rendered alongside hosted
  // events; the `badge` highlights our role (e.g. "Official Sponsor") next to the title.
  featuredEvents: [
    {
      id: 'quantum-tech-world-2026',
      title: 'Quantum Tech World 2026',
      subtitle: 'Encore Boston Harbor',
      url: 'https://www.alphaevents.com/events-quantumtechus',
      date: 'Jun 25',
      time: 'Jun 25–26, 2026',
      location: 'Boston',
      tag: 'IRL',
      badge: 'Official Sponsor',
    },
  ],
  community: [
    { id: 'twitter', title: 'X', url: 'https://x.com/quipnetwork', icon: 'twitter', handle: 'Follow' },
    { id: 'discord', title: 'Discord', url: 'https://discord.gg/quipnetwork', icon: 'discord', handle: 'Join server' },
    { id: 'telegram', title: 'Telegram', url: 'https://t.me/+Pbld47s3BO44YmUx', icon: 'telegram', handle: 'Join chat' },
    { id: 'farcaster', title: 'Farcaster', url: 'https://warpcast.com/quipnetwork.eth', icon: 'farcaster', handle: 'Follow' },
  ],
  developers: [
    {
      id: 'docs',
      title: 'Documentation',
      url: 'https://quip.gitbook.io/docs',
      description: 'Learn how Quip Network works',
      tag: 'Docs',
    },
    {
      id: 'github',
      title: 'GitHub',
      url: 'https://github.com/quipnetwork',
      description: 'Explore our open source repos',
      tag: 'Code',
    },
  ],
  resources: [
    {
      id: 'whitepaper',
      title: 'Whitepaper',
      url: 'https://cdn.prod.website-files.com/67f69c3ffe99cd671ac1ac6d/6800338329944a905dc8dc17_Quip-Whitepaper.pdf',
      description: 'Read our technical whitepaper',
      tag: 'PDF',
    },
    {
      id: 'doomclock',
      title: 'Quantum Doomsday Clock',
      url: 'https://quantumdoomclock.com/',
      description: 'How long until Q-Day?',
      tag: 'Countdown',
    },
  ],
};
