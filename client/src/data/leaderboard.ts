export interface LeaderboardEntry {
  rank: number;
  address: string;
  points: number;
  tasksCompleted: number;
  referrals: number;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';
  multiplier: number;
  reward: string;
  badge?: string;
  trend: 'up' | 'down' | 'same';
}

function shortAddr(hex: string): string {
  return `${hex.slice(0, 6)}...${hex.slice(-4)}`;
}

function getTier(rank: number): { tier: LeaderboardEntry['tier']; multiplier: number } {
  if (rank <= 100) return { tier: 'Tier 1', multiplier: 10 };
  if (rank <= 200) return { tier: 'Tier 2', multiplier: 6 };
  if (rank <= 5200) return { tier: 'Tier 3', multiplier: 3 };
  return { tier: 'Tier 4', multiplier: 1.5 };
}

function getReward(rank: number): string {
  if (rank === 1) return '50,000 AUR';
  if (rank === 2) return '35,000 AUR';
  if (rank === 3) return '25,000 AUR';
  if (rank <= 5) return '15,000 AUR';
  if (rank <= 10) return '10,000 AUR';
  if (rank <= 20) return '5,000 AUR';
  if (rank <= 50) return '2,500 AUR';
  if (rank <= 100) return '1,000 AUR';
  return '500 AUR';
}

const addresses: string[] = [
  '0x4f2a8b1c3d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
  '0x8a3b9c2d7e1f4a5b6c8d9e0f1a2b3c4d5e6f7a8b',
  '0x2c5d8e1f3a6b9c0d2e4f5a6b7c8d9e0f1a2b3c4d',
  '0x6e9f2a5b8c1d3e4f6a7b9c0d1e2f3a4b5c6d7e8f',
  '0x1a4b7c0d2e5f8a1b3c4d6e7f9a0b1c2d3e4f5a6b',
  '0x9c2f5a8b1d3e6f0a2b4c5d7e8f9a0b1c2d3e4f5a',
  '0x3e6b9c1d4f7a0b2c5d8e1f3a4b6c7d8e9f0a1b2c',
  '0x5a8d1f3b6c9e0d2a4f7b0c1d3e5f8a1b2c4d6e7f',
  '0x7b0e3a5c8d1f4a6b9c2d5e7f0a1b3c4d6e8f9a0b',
  '0x0d4f7a1b3c6e9d2f5a8b0c1d4e6f7a9b2c3d5e8f',
  '0xc3f6a9b2d5e8c1f4a7b0d3e6f9a2c5b8d1e4f7a0',
  '0xf1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8',
  '0x2b5e8a1c3f6d9b2e5a8c1f4b7d0e3a6c9f2b5e8a',
  '0x6d9f2a5b8c1e4d7a0b3c6f9e2a5b8d1c4f7a0e3b',
  '0x4a7c0f3b6e9d2a5c8f1b4e7a0d3c6f9b2e5a8d1c',
  '0x9e2f5a8b1d4c7f0a3b6e9d2c5f8a1b4e7d0c3f6a',
  '0x1d4a7b0c3f6e9d2a5b8c1f4e7a0d3b6c9f2e5a8b',
  '0x8b1e4a7c0d3f6b9e2a5c8d1f4b7e0a3c6d9f2b5e',
  '0x3f6b9e2a5d8c1f4b7e0a3d6c9f2b5e8a1d4c7f0b',
  '0x5c8f1b4e7a0d3b6e9f2a5d8c1f4b7e0a3d6c9f2b',
  '0xa2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0',
  '0xd1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f',
  '0x0f1e2d3c4b5a6968776859a4b3c2d1e0f9a8b7c6d',
  '0xe5f4e3d2c1b0a9f8e7d6c5b4a3928170f6e5d4c3b',
  '0xb1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
];

const badges = ['Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Genesis', 'OG', 'Whale'];
const trends: ('up' | 'down' | 'same')[] = ['up', 'down', 'same'];

export const leaderboardData: LeaderboardEntry[] = addresses.map((addr, i) => {
  const rank = i + 1;
  const { tier, multiplier } = getTier(rank);
  const basePoints = Math.floor(180000 - rank * 2800 + Math.random() * 2000);
  return {
    rank,
    address: shortAddr(addr),
    points: Math.max(basePoints, 1500),
    tasksCompleted: Math.floor(16 - rank * 0.4 + Math.random() * 2),
    referrals: Math.floor(320 - rank * 7 + Math.random() * 15),
    tier,
    multiplier,
    reward: getReward(rank),
    badge: rank <= 8 ? badges[i % badges.length] : undefined,
    trend: trends[i % 3],
  };
});
