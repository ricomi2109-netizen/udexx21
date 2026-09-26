import { BarChart3, CheckCircle2, Clock3, Gift, PieChart, RotateCcw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { airdropTasks, type AirdropTask } from '@/data/tasks';
import { useWallet } from '@/context/WalletContext';
import { useTaskProgress } from '@/context/TaskProgressContext';

const categories: AirdropTask['type'][] = ['social', 'onchain', 'community', 'quiz', 'referral', 'liquidity', 'staking', 'verification'];

export function ProgressDashboard() {
  const { connected, address, openModal } = useWallet();
  const { completedTaskIds, completedAt, completedCount, totalReward, resetProgress } = useTaskProgress();
  const completionRate = Math.round((completedCount / airdropTasks.length) * 100);
  const recentTasks = [...airdropTasks]
    .filter((task) => completedTaskIds.has(task.id))
    .sort((a, b) => (completedAt[b.id] ?? '').localeCompare(completedAt[a.id] ?? ''))
    .slice(0, 4);

  const handleReset = () => {
    resetProgress();
    toast.success('Task progress reset');
  };

  return (
    <section id="progress" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[15%] left-[8%] h-[360px] w-[360px] rounded-full bg-secondary-500/10 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="glass-card mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <BarChart3 className="h-4 w-4 text-secondary-400" />
            <span className="text-sm font-medium text-neutral-200">Personal analytics</span>
          </div>
          <h2 className="font-display mb-3 text-3xl font-bold text-white sm:text-4xl">
            Your <span className="text-gradient-aurora">Airdrop Progress</span>
          </h2>
          <p className="mx-auto max-w-xl text-neutral-400">Track completed tasks, reward potential, and the categories where you can make the biggest progress next.</p>
        </div>

        {!connected ? (
          <div className="glass-card mx-auto max-w-md rounded-3xl p-10 text-center">
            <PieChart className="mx-auto mb-4 h-10 w-10 text-secondary-400" />
            <h3 className="font-display mb-2 text-xl font-bold text-white">Connect to see your dashboard</h3>
            <p className="mb-6 text-sm text-neutral-400">Your analytics are private and scoped to the connected wallet address.</p>
            <button onClick={openModal} className="rounded-xl bg-secondary-500 px-6 py-3 font-semibold text-neutral-950 transition hover:bg-secondary-400 active:scale-[0.98]">Connect Wallet</button>
          </div>
        ) : (
          <>
            <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: 'Tasks completed', value: `${completedCount}/${airdropTasks.length}`, icon: CheckCircle2, color: 'text-primary-400' },
                { label: 'Completion rate', value: `${completionRate}%`, icon: BarChart3, color: 'text-secondary-400' },
                { label: 'Reward unlocked', value: `${totalReward.toLocaleString()} AUR`, icon: Gift, color: 'text-accent-400' },
                { label: 'Wallet status', value: address ? `${address.slice(0, 6)}…${address.slice(-4)}` : 'Connected', icon: Sparkles, color: 'text-violet-400' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="glass-card rounded-2xl p-4 sm:p-5">
                  <Icon className={`mb-3 h-5 w-5 ${color}`} />
                  <p className="text-xs text-neutral-500">{label}</p>
                  <p className="mt-1 truncate font-display text-lg font-bold text-white sm:text-xl">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="glass-card rounded-2xl p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Category breakdown</h3>
                    <p className="mt-1 text-xs text-neutral-500">Completed tasks by reward type</p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-neutral-600" />
                </div>
                <div className="space-y-4">
                  {categories.map((category) => {
                    const total = airdropTasks.filter((task) => task.type === category).length;
                    const completed = airdropTasks.filter((task) => task.type === category && completedTaskIds.has(task.id)).length;
                    const width = total ? (completed / total) * 100 : 0;
                    return (
                      <div key={category}>
                        <div className="mb-1.5 flex justify-between text-xs">
                          <span className="capitalize text-neutral-300">{category}</span>
                          <span className="text-neutral-500">{completed}/{total}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                          <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500" style={{ width: `${width}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Recent completions</h3>
                    <p className="mt-1 text-xs text-neutral-500">Your latest verified progress</p>
                  </div>
                  <Clock3 className="h-5 w-5 text-neutral-600" />
                </div>
                {recentTasks.length ? (
                  <div className="space-y-3">
                    {recentTasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-400" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-neutral-200">{task.title}</p>
                          <p className="text-xs text-neutral-500">{completedAt[task.id] ? new Date(completedAt[task.id]).toLocaleDateString() : 'Previously completed'}</p>
                        </div>
                        <span className="shrink-0 text-xs font-semibold text-accent-400">{task.reward}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-white/10 p-6 text-center">
                    <p className="text-sm text-neutral-400">No completed tasks yet.</p>
                    <p className="mt-1 text-xs text-neutral-600">Start with an easy social task to unlock your first reward.</p>
                  </div>
                )}
                {completedCount > 0 && (
                  <button onClick={handleReset} className="mt-5 inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-white">
                    <RotateCcw className="h-3.5 w-3.5" /> Reset local progress
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
