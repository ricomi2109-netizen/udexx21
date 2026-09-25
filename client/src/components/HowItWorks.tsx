import { Wallet, ListChecks, Coins, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Your Wallet',
    description: 'Link MetaMask, Phantom, Trust Wallet, Coinbase, Exodus, or any of 10+ supported wallets. Your keys, your crypto.',
    color: 'from-primary-400 to-primary-600',
    step: '01',
  },
  {
    icon: ListChecks,
    title: 'Complete Airdrop Tasks',
    description: 'Finish social, on-chain, and community tasks across 26 blockchains. Each task rewards you with AUR tokens.',
    color: 'from-secondary-400 to-secondary-600',
    step: '02',
  },
  {
    icon: Coins,
    title: 'Earn AUR Tokens',
    description: 'Accumulate AUR tokens for every completed task. Track your earnings in real-time from your dashboard.',
    color: 'from-accent-400 to-accent-600',
    step: '03',
  },
  {
    icon: TrendingUp,
    title: 'Generate Yield Automatically',
    description: 'Your AUR tokens are automatically staked in our yield protocol, earning up to 24% APY. Watch your rewards grow.',
    color: 'from-success-400 to-success-600',
    step: '04',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            How AURORA Works
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Four simple steps from connecting your wallet to earning yield on your crypto rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                )}
                <div className="glass-card glass-card-hover rounded-2xl p-6 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-display text-2xl font-bold text-white/10">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
