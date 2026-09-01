import { SiteData } from '@/types';

export const siteData: SiteData = {
  // The three surfaces we want people to land on, in the order you meet them:
  // an account is the prerequisite for swapping, and running a node comes later.
  products: [
    {
      id: 'account',
      title: 'Post-quantum Accounts',
      url: 'https://account.quip.network/',
      description: 'Deposit and earn QUIP while protecting your assets from quantum threats',
      // "wrap": a core asset held inside nested, counter-rotating shells. The
      // locking-up counterpart to the swap backdrop next to it.
      pattern: {
        mode: 'wrap',
        colorScheme: 'BrandCyan',
        pixelShape: 'diamond',
        pixelSize: 3,
        opacity: 1,
      },
      cta: 'Open an Account',
    },
    {
      id: 'quipswap',
      title: 'QuipSwap',
      url: 'https://www.quip.network/quipswap/',
      description: 'Post-quantum swaps anywhere to anywhere',
      // The same backdrop the QuipSwap hero on quip.network runs: two colour
      // families trading places across the grid.
      pattern: {
        mode: 'swap',
        colorScheme: 'Violet',
        pixelShape: 'square',
        pixelSize: 3,
        p1: 0.85,
        p2: 0.4,
        p3: 0.5,
        p4: 0.5,
        opacity: 1,
        insetX: 14,
      },
      cta: 'Explore QuipSwap',
    },
    {
      id: 'node',
      title: 'Nodes',
      url: 'https://quip.gitbook.io/docs/nodes/run-a-node-testnet',
      description: 'Put CPUs, GPUs, ASICs or QPUs to work and earn QUIP',
      // "lattice": blocks filling a grid, for compute coming online.
      pattern: {
        mode: 'lattice',
        colorScheme: 'Sage',
        pixelShape: 'square',
        pixelSize: 3,
        p1: 0.05,
        p3: 0.3,
        opacity: 0.9,
      },
      cta: 'Run a Node',
    },
  ],
  // Quests sits below Community as a single row. Points and the airdrop matter,
  // but they are not what a first-time visitor should land on.
  earn: [
    {
      id: 'quest',
      title: 'Quests',
      url: 'https://quest.quip.network/',
      description: 'Earn points to become eligible for the Quip Network Airdrop',
      tag: 'Points',
    },
  ],
  // Hosted events are sourced live from the Luma API (see EventsSection). No static
  // fallback — on fetch failure we fall through to the empty-state acknowledgment.
  events: [],
  // Conferences we're attending or sponsoring but not hosting. Rendered under the
  // live Luma feed as the "Where we'll be" schedule so people know where to find us
  // even when no Quip-hosted event is confirmed. `badge` names our role; entries
  // drop off automatically the day after `endsAt`, sorted by `startsAt`.
  featuredEvents: [
    {
      id: 'korea-blockchain-week-2026',
      title: 'Korea Blockchain Week',
      url: 'https://koreablockchainweek.com/',
      date: 'Sep 29',
      time: 'Sep 29 – Oct 1, 2026',
      location: 'Seoul, South Korea',
      tag: 'IRL',
      badge: 'Attending',
      startsAt: '2026-09-29',
      endsAt: '2026-10-01',
    },
    {
      id: 'token2049-singapore-2026',
      title: 'TOKEN2049 Singapore',
      url: 'https://www.token2049.com/singapore',
      date: 'Oct 7',
      time: 'Oct 7–8, 2026',
      location: 'Singapore',
      tag: 'IRL',
      badge: 'Attending',
      startsAt: '2026-10-07',
      endsAt: '2026-10-08',
    },
    {
      id: 'sigma-world-2026',
      title: 'SiGMA World',
      url: 'https://sigma.world/summits/world/',
      date: 'Nov 2',
      time: 'Nov 2-5, 2026',
      // Per Brent. sigma.world sits behind a Cloudflare challenge that blocks
      // curl and headless Chrome alike, so this was not read from source.
      location: 'Rome, Italy',
      tag: 'IRL',
      badge: 'Attending',
      startsAt: '2026-11-02',
      endsAt: '2026-11-05',
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
      id: 'github',
      title: 'GitHub',
      url: 'https://github.com/quipnetwork',
      description: 'Explore our open source repos',
      tag: 'View',
    },
    {
      id: 'docs',
      title: 'Documentation',
      url: 'https://quip.gitbook.io/docs',
      description: 'Learn how Quip Network works',
      tag: 'Read',
    },
    {
      id: 'research',
      title: 'Research Forum',
      url: 'https://research.quip.network',
      description: 'A community for developers, researchers and node operators',
      tag: 'Join',
    },
    {
      id: 'feedback',
      title: 'Feature Requests',
      url: 'https://feedback.quip.network',
      description: 'Guide community development',
      tag: 'Vote',
    },
  ],
  resources: [
    {
      id: 'whitepaper',
      title: 'Whitepaper',
      url: 'https://www.quip.network/documents/Quip-Whitepaper.pdf',
      description: 'Read our technical whitepaper',
      tag: 'Read',
    },
    {
      id: 'blog',
      title: 'Blog',
      url: 'https://www.quip.network/blog',
      description: 'Protocol updates and research notes',
      tag: 'Read',
    },
    {
      id: 'doomclock',
      title: 'Quantum Doomsday Clock',
      url: 'https://quantumdoomclock.com/',
      description: 'How long until Q-Day?',
      tag: 'Visit',
    },
  ],
};
