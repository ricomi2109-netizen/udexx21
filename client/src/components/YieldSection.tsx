import { TrendingUp, Lock, Coins, Zap } from 'lucide-react';

const tiers = [
  { label: '7-Day Lock', apy: '8.5%', min: '100 AUR', color: 'from-primary-400 to-primary-600', icon: Zap },
  { label: '30-Day Lock', apy: '14.2%', min: '500 AUR', color: 'from-secondary-400 to-secondary-600', icon: Coins },
  { label: '90-Day Lock', apy: '19.8%', min: '1,000 AUR', color: 'from-accent-400 to-accent-600', icon: TrendingUp },
  { label: '180-Day Lock', apy: '24.0%', min: '5,000 AUR', color: 'from-success-400 to-success-600', icon: Lock },
];

export function YieldSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-secondary-500/10 blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
            <TrendingUp className="w-4 h-4 text-success-400" />
            <span className="text-sm font-medium text-neutral-200">Yield Protocol</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Earn Up to <span className="text-gradient-aurora">24% APY</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Your AUR tokens don't just sit idle. Stake them in our yield protocol and watch your rewards compound automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <div
                key={i}
                className="glass-card glass-card-hover rounded-2xl p-6 text-center relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tier.color}`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{tier.label}</h3>
                <div className="font-display text-3xl font-bold text-gradient-aurora mb-3">{tier.apy}</div>
                <div className="text-xs text-neutral-400">
                  <span className="text-neutral-300">Min. </span>{tier.min}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
