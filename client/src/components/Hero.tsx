import { ArrowRight, Check, CircleDollarSign, Gem, Shield, Sparkles, Trophy, Wallet, Zap } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

const particles = [
  { top: '16%', left: '12%', size: 3, delay: '0s', duration: '8s' },
  { top: '24%', left: '86%', size: 4, delay: '1.1s', duration: '11s' },
  { top: '48%', left: '7%', size: 2, delay: '2.4s', duration: '9s' },
  { top: '62%', left: '92%', size: 3, delay: '0.7s', duration: '12s' },
  { top: '76%', left: '18%', size: 4, delay: '3.2s', duration: '10s' },
  { top: '82%', left: '76%', size: 2, delay: '1.8s', duration: '7s' },
  { top: '35%', left: '52%', size: 2, delay: '4.1s', duration: '13s' },
  { top: '14%', left: '66%', size: 3, delay: '2.7s', duration: '9s' },
];

export function Hero() {
  const { connected, openModal } = useWallet();

  const scrollToTasks = () => document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 left-[3%] h-[32rem] w-[32rem] rounded-full bg-primary-500/15 blur-[130px] animate-aurora-1" />
        <div className="absolute top-[20%] right-[-5%] h-[38rem] w-[38rem] rounded-full bg-secondary-500/12 blur-[150px] animate-aurora-2" />
        <div className="absolute bottom-[4%] left-[34%] h-[26rem] w-[26rem] rounded-full bg-accent-500/7 blur-[120px] animate-aurora-3" />
        <div className="absolute inset-0 bg-grid opacity-80" />
        {particles.map((particle, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-primary-400/40"
            style={{ top: particle.top, left: particle.left, width: particle.size, height: particle.size, animation: `float ${particle.duration} ease-in-out ${particle.delay} infinite` }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 sm:px-6 sm:pb-28 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-8 lg:pb-32">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary-400/20 bg-primary-400/7 px-3.5 py-2 text-xs font-semibold tracking-wide text-primary-300 animate-fade-in">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-400/15"><Sparkles className="h-3 w-3" /></span>
            SEASON 01 · GENESIS ALLOCATION
            <span className="rounded-full bg-accent-400/15 px-2 py-0.5 text-[10px] text-accent-300">LIVE</span>
          </div>

          <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-6xl lg:text-[5.4rem] animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
            Your wallet is
            <br />
            <span className="text-gradient-aurora">already earning.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg animate-fade-in-up" style={{ animationDelay: '0.16s' }}>
            Turn on-chain activity into a compounding advantage. Complete quests across 26 networks, collect AUR, and climb into higher reward tiers.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.24s' }}>
            <button
              onClick={connected ? scrollToTasks : openModal}
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-primary-400 px-5 py-3.5 text-sm font-bold text-[#062018] shadow-[0_14px_34px_rgba(32,217,143,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-300 active:scale-[0.98]"
            >
              <Wallet className="h-4 w-4" />
              {connected ? 'Open quests' : 'Connect wallet'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToTasks}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-primary-400/30 hover:bg-white/[0.06] active:scale-[0.98]"
            >
              Explore live quests
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-500 animate-fade-in" style={{ animationDelay: '0.36s' }}>
            <span className="inline-flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-primary-400" /> Non-custodial by design</span>
            <span className="inline-flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-accent-400" /> Rewards settle instantly</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[31rem] animate-fade-in-up" style={{ animationDelay: '0.18s' }}>
          <div className="absolute -inset-8 rounded-[2.5rem] bg-primary-400/8 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b171e]/90 p-4 shadow-[0_32px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-5">
            <div className="flex items-center justify-between border-b border-white/8 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-300 to-secondary-500 text-[#05241a] shadow-lg shadow-primary-500/20"><Zap className="h-5 w-5" fill="currentColor" /></div>
                <div>
                  <div className="font-display text-sm font-semibold tracking-wide text-white">AURORA / cockpit</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_#58f0b4]" /> synced 14 sec ago</div>
                </div>
              </div>
              <span className="rounded-full border border-primary-400/20 bg-primary-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-300">Live</span>
            </div>

            <div className="mt-5 rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.07] to-transparent p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-500">Estimated season rewards</div>
                  <div className="mt-2 font-display text-4xl font-semibold tracking-tight text-white">18,640 <span className="text-lg text-primary-300">AUR</span></div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-300"><span className="rounded-full bg-primary-400/10 px-1.5 py-0.5">+12.8%</span> this week</div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent-400/20 bg-accent-400/10 text-accent-300"><CircleDollarSign className="h-5 w-5" /></div>
              </div>
              <div className="mt-5 flex h-20 items-end gap-1.5">
                {[28, 38, 34, 52, 47, 62, 58, 72, 66, 84, 76, 96].map((height, index) => (
                  <span key={index} className={`flex-1 rounded-t-md ${index > 8 ? 'bg-gradient-to-t from-primary-500 to-secondary-300' : 'bg-primary-400/20'}`} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-slate-600"><span>Sep 18</span><span>Today</span></div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/7 bg-white/[0.035] p-4"><div className="flex items-center justify-between"><span className="text-xs text-slate-500">Quest progress</span><Trophy className="h-4 w-4 text-accent-300" /></div><div className="mt-2 font-display text-2xl font-semibold text-white">68<span className="text-sm text-slate-500">%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8"><span className="block h-full w-[68%] rounded-full bg-gradient-to-r from-primary-400 to-secondary-400" /></div></div>
              <div className="rounded-xl border border-white/7 bg-white/[0.035] p-4"><div className="flex items-center justify-between"><span className="text-xs text-slate-500">Current tier</span><Gem className="h-4 w-4 text-primary-300" /></div><div className="mt-2 font-display text-2xl font-semibold text-white">Tier 2</div><div className="mt-2 text-[11px] font-semibold text-accent-300">6× reward multiplier</div></div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-primary-400/12 bg-primary-400/5 px-4 py-3"><div className="flex items-center gap-2 text-xs text-slate-300"><Check className="h-4 w-4 text-primary-300" /> Next unlock: 3 quests</div><ArrowRight className="h-4 w-4 text-primary-300" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
