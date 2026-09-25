import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { blockchains } from '@/data/blockchains';

type FilterType = 'All' | 'EVM' | 'EVM L2' | 'SVM' | 'Move' | 'Cosmos' | 'Other';

const filters: { label: string; value: FilterType }[] = [
  { label: 'All Chains', value: 'All' },
  { label: 'EVM', value: 'EVM' },
  { label: 'L2 Rollups', value: 'EVM L2' },
  { label: 'SVM', value: 'SVM' },
  { label: 'Move', value: 'Move' },
  { label: 'Cosmos', value: 'Cosmos' },
  { label: 'Other', value: 'Other' },
];

function matchesFilter(ecosystem: string, filter: FilterType): boolean {
  if (filter === 'All') return true;
  if (filter === 'Other') {
    return !['EVM', 'EVM L2', 'SVM', 'Move', 'Cosmos'].includes(ecosystem);
  }
  return ecosystem === filter;
}

function BlockchainIcon({ chain }: { chain: typeof blockchains[0] }) {
  return (
    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${chain.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
      <span className="font-display text-lg font-bold text-white">{chain.symbol.slice(0, 3)}</span>
    </div>
  );
}

export function Blockchains() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);

  const filtered = blockchains.filter(
    (c) =>
      matchesFilter(c.ecosystem, filter) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase()))
  );

  const visible = expanded ? filtered : filtered.slice(0, 12);

  return (
    <section id="blockchains" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-glow-pulse" />
            <span className="text-sm font-medium text-neutral-200">Multi-Chain Infrastructure</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Supported Across <span className="text-gradient-aurora">{blockchains.length} Blockchains</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Connect any wallet and interact with your favorite networks. AURORA bridges assets seamlessly across ecosystems.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.value
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'glass-card text-neutral-300 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blockchains..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-neutral-900/60 border border-white/5 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-primary-500/50 transition-colors"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {visible.map((chain, i) => (
            <div
              key={chain.id}
              className="glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.03}s`, animationFillMode: 'both' }}
            >
              <BlockchainIcon chain={chain} />
              <div className="min-w-0">
                <div className="font-semibold text-white text-sm truncate">{chain.name}</div>
                <div className="text-xs text-neutral-400">{chain.symbol} · {chain.ecosystem}</div>
                <div className="text-xs text-primary-400 mt-1">TVL {chain.tvl}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand */}
        {filtered.length > 12 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card glass-card-hover text-sm font-medium text-neutral-200"
            >
              {expanded ? 'Show Less' : `Show All ${filtered.length} Chains`}
              <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
