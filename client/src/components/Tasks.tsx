import { useState, useMemo } from 'react';
import {
  Twitter, MessageCircle, MessageSquare, Heart, GraduationCap, ArrowLeftRight,
  Droplets, Lock, UserPlus, BadgeCheck, Star, Network, Trophy, Image,
  PlayCircle, PenTool, Clock, Users, Gift, Check, Loader2, ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { airdropTasks, type AirdropTask } from '@/data/tasks';
import { useWallet } from '@/context/WalletContext';

const iconMap: Record<string, LucideIcon> = {
  Twitter, MessageCircle, MessageSquare, Heart, GraduationCap, ArrowLeftRight,
  Droplets, Lock, UserPlus, BadgeCheck, Star, Network, Trophy, Image,
  PlayCircle, PenTool,
};

const typeLabels: Record<AirdropTask['type'], string> = {
  social: 'Social',
  onchain: 'On-Chain',
  community: 'Community',
  quiz: 'Quiz',
  referral: 'Referral',
  liquidity: 'Liquidity',
  staking: 'Staking',
  verification: 'Verification',
};

const typeColors: Record<AirdropTask['type'], string> = {
  social: 'text-secondary-400 bg-secondary-500/10',
  onchain: 'text-primary-400 bg-primary-500/10',
  community: 'text-accent-400 bg-accent-500/10',
  quiz: 'text-warning-400 bg-warning-500/10',
  referral: 'text-pink-400 bg-pink-500/10',
  liquidity: 'text-sky-400 bg-sky-500/10',
  staking: 'text-violet-400 bg-violet-500/10',
  verification: 'text-emerald-400 bg-emerald-500/10',
};

const difficultyColors: Record<AirdropTask['difficulty'], string> = {
  Easy: 'text-success-400',
  Medium: 'text-warning-400',
  Hard: 'text-error-400',
};

type FilterType = 'All' | AirdropTask['type'];
const taskFilters: FilterType[] = ['All', 'social', 'onchain', 'community', 'quiz', 'staking', 'liquidity', 'referral'];

function TaskCard({ task, onComplete }: { task: AirdropTask; onComplete: (id: string) => void }) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'done'>('idle');
  const Icon = iconMap[task.icon] || Gift;

  const handleClick = () => {
    if (status !== 'idle') return;
    setStatus('pending');
    setTimeout(() => {
      setStatus('done');
      onComplete(task.id);
    }, 2000);
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${typeColors[task.type]} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${typeColors[task.type]}`}>
          {typeLabels[task.type]}
        </span>
      </div>

      <h3 className="font-semibold text-white text-base mb-2 leading-snug">{task.title}</h3>
      <p className="text-sm text-neutral-400 mb-4 flex-1 leading-relaxed">{task.description}</p>

      <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{task.timeToComplete}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{task.participants}</span>
        </div>
        <div className={`flex items-center gap-1 font-medium ${difficultyColors[task.difficulty]}`}>
          {task.difficulty}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <Gift className="w-4 h-4 text-accent-400" />
          <span className="font-display font-bold text-gradient-gold text-lg">{task.reward}</span>
        </div>
        <button
          onClick={handleClick}
          disabled={status !== 'idle'}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            status === 'done'
              ? 'bg-success-500/20 text-success-400 cursor-default'
              : status === 'pending'
              ? 'bg-neutral-800 text-neutral-400 cursor-wait'
              : 'bg-primary-500 hover:bg-primary-400 text-white shadow-lg shadow-primary-500/20 hover:scale-105'
          }`}
        >
          {status === 'done' ? (
            <>
              <Check className="w-4 h-4" strokeWidth={3} />
              Done
            </>
          ) : status === 'pending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying
            </>
          ) : (
            <>
              Start
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function Tasks() {
  const { connected, openModal } = useWallet();
  const [filter, setFilter] = useState<FilterType>('All');
  const [completedCount, setCompletedCount] = useState(0);
  const [totalReward, setTotalReward] = useState(0);

  const filtered = useMemo(
    () => (filter === 'All' ? airdropTasks : airdropTasks.filter((t) => t.type === filter)),
    [filter]
  );

  const handleComplete = (id: string) => {
    const task = airdropTasks.find((t) => t.id === id);
    if (task) {
      setCompletedCount((c) => c + 1);
      setTotalReward((r) => r + parseInt(task.reward.replace(/[^0-9]/g, '')));
    }
  };

  return (
    <section id="tasks" className="relative py-20 sm:py-28">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
            <Gift className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-medium text-neutral-200">{airdropTasks.length} Tasks Available</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Complete Tasks, <span className="text-gradient-aurora">Earn Rewards</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Each task rewards you with AUR tokens. Complete more tasks to increase your yield and unlock premium airdrops.
          </p>
        </div>

        {/* Progress bar (only if connected) */}
        {connected && (
          <div className="glass-card rounded-2xl p-5 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-neutral-300">Your Progress</span>
              <span className="text-sm font-semibold text-white">
                {completedCount}/{airdropTasks.length} tasks · {totalReward.toLocaleString()} AUR
              </span>
            </div>
            <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / airdropTasks.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {taskFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                filter === f
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'glass-card text-neutral-300 hover:text-white'
              }`}
            >
              {f === 'All' ? 'All Tasks' : typeLabels[f as AirdropTask['type']]}
            </button>
          ))}
        </div>

        {/* Tasks grid */}
        {!connected ? (
          <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
            <p className="text-sm text-neutral-400 mb-6">Connect a wallet to start completing tasks and earning AUR token rewards.</p>
            <button
              onClick={openModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/20 transition-all hover:scale-105"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((task, i) => (
              <div key={task.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.04}s`, animationFillMode: 'both' }}>
                <TaskCard task={task} onComplete={handleComplete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
