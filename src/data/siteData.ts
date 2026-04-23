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
  events: [
    {
      id: 'ev1',
      title: 'Superposition: Yoga at Sunrise',
      subtitle: 'Consensus Miami 2026',
      url: 'https://luma.com/lhs39op2',
      date: 'May 5',
      time: 'Tue · 7:30 AM ET',
      tag: 'IRL',
      cover_url: '/images/events/yoga-may5.png',
    },
    {
      id: 'ev2',
      title: 'Superposition: Yoga at Sunrise',
      subtitle: 'Consensus Miami 2026',
      url: 'https://luma.com/b6k0clv3',
      date: 'May 6',
      time: 'Wed · 7:30 AM ET',
      tag: 'IRL',
      cover_url: '/images/events/yoga-may6.png',
    },
    {
      id: 'ev3',
      title: 'Quipicnic: Touch Grass',
      subtitle: 'Consensus Miami 2026',
      url: 'https://luma.com/ikn18tjc',
      date: 'May 6',
      time: 'Wed · 4:00 PM ET',
      tag: 'IRL',
      cover_url: '/images/events/quipicnic.png',
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
