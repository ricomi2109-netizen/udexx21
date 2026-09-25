import { WalletProviderContext } from '@/context/WalletContext';
import { WalletModal } from '@/components/WalletModal';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { HowItWorks } from '@/components/HowItWorks';
import { Tasks } from '@/components/Tasks';
import { YieldSection } from '@/components/YieldSection';
import { Blockchains } from '@/components/Blockchains';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Leaderboard } from '@/components/Leaderboard';
import { ReferralSection } from '@/components/ReferralSection';

function App() {
  return (
    <WalletProviderContext>
      <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
        <WalletModal />
        <Header />
        <main>
          <Hero />
          <Stats />
          <HowItWorks />
          <Tasks />
          <Leaderboard />
          <ReferralSection />
          <YieldSection />
          <Blockchains />
          <FAQ />
        </main>
        <Footer />
      </div>
    </WalletProviderContext>
  );
}

export default App;
