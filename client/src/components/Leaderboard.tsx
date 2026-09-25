import { useState, useMemo } from 'react';
import { Trophy, Medal, Award, Search, Crown, TrendingUp, Users, ChevronUp, ChevronDown, Minus, ArrowUp, ArrowDown, Minus as MinusIcon } from 'lucide-react';
import { leaderboardData, type LeaderboardEntry } from '@/data/leaderboard';

const tierStyles: Record<LeaderboardEntry['tier'], string> = {
  'Tier 1': 'text-primary-400 bg-primary-500/10 border-primary-500/20',
  'Tier 2': 'text-secondary-400 bg-secondary-500/10 border-secondary-500/20',
  'Tier 3': 'text-accent-400 bg-accent-500/10 border-accent-500/20',
  'Tier 4': 'text-neutral-400 bg-neutral-500/10 border-neutral-500/20',
};

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="w-5 h-5 text-accent-400" fill="currentColor" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-neutral-300" fill="currentColor" />;
  if (rank === 3) return <Award className="w-5 h-5 text-orange-400" fill="currentColor" />;
  return <span className="font-display text-sm font-bold text-neutral-400">{rank}</span>;
}

function getRankBg(rank: number) {
  if (rank === 1) return 'bg-gradient-to-r from-accent-500/10 to-transparent border-accent-500/20';
  if (rank === 2) return 'bg-gradient-to-r from-neutral-400/10 to-transparent border-neutral-400/20';
  if (rank === 3) return 'bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/20';
  return 'border-white/5';
}

function TrendIcon({ trend }: { trend: LeaderboardEntry['trend'] }) {
  if (trend === 'up') return <ArrowUp className="w-3 h-3 text-success-400" />;
  if (trend === 'down') return <ArrowDown className="w-3 h-3 text-error-400" />;
  return <MinusIcon className="w-3 h-3 text-neutral-600" />;
}

type SortKey = 'rank' | 'points' | 'tasksCompleted' | 'referrals';

export function Leaderboard() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sorted = useMemo(() => {
    const filtered = leaderboardData.filter((e) =>
      e.address.toLowerCase().includes(search.toLowerCase())
    );
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sortKey === 'rank') return (a.rank - b.rank) * dir;
      return (a[sortKey] - b[sortKey]) * dir;
    });
  }, [search, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'rank' ? 'asc' : 'desc');
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <Minus className="w-3 h-3 text-neutral-600" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-primary-400" /> : <ChevronDown className="w-3 h-3 text-primary-400" />;
  };

  const podium = leaderboardData.slice(0, 3);

  return (
    <section id="leaderboard" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent-500/10 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-primary-500/10 blur-[110px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
            <Trophy className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-medium text-neutral-200">Live Leaderboard</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Global <span className="text-gradient-aurora">Airdrop Rankings</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Compete with participants worldwide. Complete tasks and refer friends to climb the ranks and unlock higher reward tiers.
          </p>
        </div>

        {/* Tier multiplier info */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { tier: 'Tier 1', range: 'Top 100', mult: '10x', color: 'from-primary-400 to-primary-600', icon: Crown },
            { tier: 'Tier 2', range: '101-200', mult: '6x', color: 'from-secondary-400 to-secondary-600', icon: Medal },
            { tier: 'Tier 3', range: '201-5,200', mult: '3x', color: 'from-accent-400 to-accent-600', icon: Award },
            { tier: 'Tier 4', range: '5,201+', mult: '1.5x', color: 'from-neutral-400 to-neutral-600', icon: Users },
          ].map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="glass-card glass-card-hover rounded-xl p-4 text-center">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold text-white text-sm">{t.tier}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{t.range}</div>
                <div className="text-lg font-bold text-gradient-aurora mt-1">{t.mult}</div>
              </div>
            );
          })}
        </div>

        {/* Podium - Top 3 */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 max-w-2xl mx-auto">
          {[1, 0, 2].map((idx) => {
            const entry = podium[idx];
            if (!entry) return null;
            const heights = ['h-32', 'h-40', 'h-28'];
            return (
              <div key={entry.rank} className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-display font-bold text-white text-lg shadow-xl ${
                    entry.rank === 1 ? 'bg-gradient-to-br from-accent-400 to-accent-600 shadow-accent-500/30' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-neutral-300 to-neutral-500 shadow-neutral-500/20' :
                    'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/20'
                  }`}>
                    {entry.rank}
                  </div>
                  {entry.rank === 1 && (
                    <Crown className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 text-accent-400" fill="currentColor" />
                  )}
                </div>
                <div className={`glass-card rounded-xl ${heights[idx]} w-full flex flex-col items-center justify-center px-2 pt-3 pb-4 ${entry.rank === 1 ? 'border-accent-500/30' : ''}`}>
                  <span className="text-xs font-mono text-neutral-300 mb-1">{entry.address}</span>
                  <span className="font-display text-base sm:text-lg font-bold text-gradient-aurora">{entry.points.toLocaleString()}</span>
                  <span className="text-[10px] text-neutral-500 mt-0.5">CZR EXP</span>
                  {entry.badge && (
                    <span className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary-500/20 text-primary-400 uppercase tracking-wide">
                      {entry.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search wallet address..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-neutral-900/60 border border-white/5 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-primary-500/50 transition-colors"
          />
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    <button onClick={() => toggleSort('rank')} className="flex items-center gap-1 hover:text-white transition-colors">
                      Rank <SortIcon col="rank" />
                    </button>
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Participant</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    <button onClick={() => toggleSort('points')} className="flex items-center gap-1 hover:text-white transition-colors ml-auto">
                      Points <SortIcon col="points" />
                    </button>
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    <button onClick={() => toggleSort('tasksCompleted')} className="flex items-center gap-1 hover:text-white transition-colors ml-auto">
                      Tasks <SortIcon col="tasksCompleted" />
                    </button>
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    <button onClick={() => toggleSort('referrals')} className="flex items-center gap-1 hover:text-white transition-colors ml-auto">
                      Referrals <SortIcon col="referrals" />
                    </button>
                  </th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Tier</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Reward</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry) => (
                  <tr
                    key={entry.rank}
                    className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${getRankBg(entry.rank)}`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <TrendIcon trend={entry.trend} />
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center text-xs font-bold text-white">
                          {entry.address.slice(2, 4).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-mono text-sm text-neutral-200">{entry.address}</div>
                          {entry.badge && (
                            <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wide">{entry.badge}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="font-display font-bold text-gradient-aurora">{entry.points.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3 text-right text-sm text-neutral-300">{entry.tasksCompleted}/16</td>
                    <td className="px-5 py-3 text-right text-sm text-neutral-300">{entry.referrals}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${tierStyles[entry.tier]}`}>
                        {entry.tier}
                        <span className="text-[10px] opacity-70">{entry.multiplier}x</span>
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-sm font-semibold text-accent-400">{entry.reward}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-white/5">
            {sorted.map((entry) => (
              <div key={entry.rank} className={`p-4 ${getRankBg(entry.rank)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getRankIcon(entry.rank)}
                    <TrendIcon trend={entry.trend} />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center text-xs font-bold text-white">
                      {entry.address.slice(2, 4).toUpperCase()}
                    </div>
                    <span className="font-mono text-sm text-neutral-200">{entry.address}</span>
                  </div>
                  {entry.badge && (
                    <span className="text-[9px] font-bold text-primary-400 uppercase tracking-wide">{entry.badge}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex gap-3">
                    <div>
                      <span className="text-neutral-500">Points: </span>
                      <span className="font-bold text-gradient-aurora">{entry.points.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Tasks: </span>
                      <span className="text-neutral-300">{entry.tasksCompleted}/16</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${tierStyles[entry.tier]}`}>
                    {entry.tier} {entry.multiplier}x
                  </span>
                </div>
                <div className="text-right mt-1.5">
                  <span className="text-sm font-semibold text-accent-400">{entry.reward}</span>
                </div>
              </div>
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="py-12 text-center text-neutral-500 text-sm">No participants found.</div>
          )}
        </div>

        {/* Footer note */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-neutral-500">
          <TrendingUp className="w-4 h-4 text-primary-500" />
          <span>Points updated daily · Rankings refresh every 24 hours</span>
        </div>
      </div>
    </section>
  );
}
