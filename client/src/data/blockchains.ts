export interface Blockchain {
  id: string;
  name: string;
  symbol: string;
  color: string;
  gradient: string;
  tvl: string;
  ecosystem: string;
}

export const blockchains: Blockchain[] = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', color: '#627EEA', gradient: 'from-blue-500 to-indigo-600', tvl: '$58.2B', ecosystem: 'EVM' },
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', color: '#F7931A', gradient: 'from-orange-400 to-amber-600', tvl: '$1.2T', ecosystem: 'UTXO' },
  { id: 'solana', name: 'Solana', symbol: 'SOL', color: '#9945FF', gradient: 'from-purple-500 to-fuchsia-600', tvl: '$12.1B', ecosystem: 'SVM' },
  { id: 'bsc', name: 'BNB Chain', symbol: 'BNB', color: '#F0B90B', gradient: 'from-yellow-400 to-amber-500', tvl: '$8.5B', ecosystem: 'EVM' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', color: '#8247E5', gradient: 'from-violet-500 to-purple-600', tvl: '$5.3B', ecosystem: 'EVM' },
  { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', color: '#E84142', gradient: 'from-red-500 to-rose-600', tvl: '$4.7B', ecosystem: 'EVM' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB', color: '#28A0F0', gradient: 'from-sky-400 to-blue-600', tvl: '$15.8B', ecosystem: 'EVM L2' },
  { id: 'optimism', name: 'Optimism', symbol: 'OP', color: '#FF0420', gradient: 'from-red-500 to-red-700', tvl: '$8.9B', ecosystem: 'EVM L2' },
  { id: 'base', name: 'Base', symbol: 'BASE', color: '#0052FF', gradient: 'from-blue-500 to-blue-700', tvl: '$7.2B', ecosystem: 'EVM L2' },
  { id: 'ton', name: 'Toncoin', symbol: 'TON', color: '#0098EA', gradient: 'from-sky-400 to-cyan-500', tvl: '$3.4B', ecosystem: 'TON' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', color: '#0033AD', gradient: 'from-blue-600 to-blue-800', tvl: '$2.1B', ecosystem: 'eUTXO' },
  { id: 'sui', name: 'Sui', symbol: 'SUI', color: '#4DA2FF', gradient: 'from-sky-400 to-indigo-500', tvl: '$2.8B', ecosystem: 'Move' },
  { id: 'aptos', name: 'Aptos', symbol: 'APT', color: '#06B6D4', gradient: 'from-cyan-400 to-teal-500', tvl: '$1.9B', ecosystem: 'Move' },
  { id: 'near', name: 'NEAR Protocol', symbol: 'NEAR', color: '#00C08B', gradient: 'from-emerald-400 to-teal-500', tvl: '$1.5B', ecosystem: 'NEAR' },
  { id: 'injective', name: 'Injective', symbol: 'INJ', color: '#00D2FF', gradient: 'from-cyan-400 to-blue-500', tvl: '$1.2B', ecosystem: 'Cosmos' },
  { id: 'cosmos', name: 'Cosmos', symbol: 'ATOM', color: '#2E3148', gradient: 'from-slate-500 to-slate-700', tvl: '$3.1B', ecosystem: 'Cosmos' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', color: '#E6007A', gradient: 'from-pink-500 to-rose-600', tvl: '$2.5B', ecosystem: 'Substrate' },
  { id: 'tron', name: 'Tron', symbol: 'TRX', color: '#FF060A', gradient: 'from-red-500 to-red-700', tvl: '$7.8B', ecosystem: 'EVM' },
  { id: 'fantom', name: 'Fantom', symbol: 'FTM', color: '#13B5EC', gradient: 'from-sky-400 to-blue-600', tvl: '$1.1B', ecosystem: 'EVM' },
  { id: 'linea', name: 'Linea', symbol: 'LNA', color: '#121212', gradient: 'from-gray-700 to-gray-900', tvl: '$1.4B', ecosystem: 'EVM L2' },
  { id: 'zksync', name: 'zkSync', symbol: 'ZK', color: '#4A22E5', gradient: 'from-violet-500 to-indigo-700', tvl: '$1.3B', ecosystem: 'ZK L2' },
  { id: 'stellar', name: 'Stellar', symbol: 'XLM', color: '#7D00FF', gradient: 'from-purple-500 to-violet-700', tvl: '$0.9B', ecosystem: 'Stellar' },
  { id: 'algorand', name: 'Algorand', symbol: 'ALGO', color: '#000000', gradient: 'from-slate-600 to-slate-800', tvl: '$0.7B', ecosystem: 'Algorand' },
  { id: 'sei', name: 'Sei', symbol: 'SEI', color: '#9E1F19', gradient: 'from-red-700 to-rose-900', tvl: '$0.8B', ecosystem: 'EVM' },
  { id: 'blast', name: 'Blast', symbol: 'BLST', color: '#FFCC00', gradient: 'from-yellow-400 to-amber-500', tvl: '$1.6B', ecosystem: 'EVM L2' },
  { id: 'mantle', name: 'Mantle', symbol: 'MNT', color: '#000000', gradient: 'from-gray-700 to-gray-900', tvl: '$1.0B', ecosystem: 'EVM L2' },
];
