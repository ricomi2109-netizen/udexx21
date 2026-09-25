import { useEffect, useRef, useState } from 'react';
import { Users, DollarSign, Zap, Globe } from 'lucide-react';

interface Stat {
  icon: typeof Users;
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  decimals?: number;
}

const stats: Stat[] = [
  { icon: Users, label: 'Active Participants', value: 74000, prefix: '', suffix: '+' },
  { icon: DollarSign, label: 'Total Rewards Distributed', value: 18.9, prefix: '$', suffix: 'M', decimals: 1 },
  { icon: Zap, label: 'AUR Tokens Staked', value: 12.6, prefix: '', suffix: 'M', decimals: 1 },
  { icon: Globe, label: 'Blockchains Supported', value: 26, prefix: '', suffix: '' },
];

function useCountUp(end: number, duration: number = 2000, decimals: number = 0, start: boolean = false) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(end * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, end, duration]);

  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();
}

function StatCard({ stat, start }: { stat: Stat; start: boolean }) {
  const display = useCountUp(stat.value, 2000, stat.decimals || 0, start);
  const Icon = stat.icon;

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-primary-400" />
      </div>
      <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">
        {stat.prefix}{display}{stat.suffix}
      </div>
      <div className="text-sm text-neutral-400">{stat.label}</div>
    </div>
  );
}

export function Stats() {
  const [start, setStart] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Trusted by a Global Community</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">Real numbers from a platform that has been delivering value since day one.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} start={start} />
          ))}
        </div>
      </div>
    </section>
  );
}
