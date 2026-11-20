import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { PlatformMetricsBar } from './components/PlatformMetricsBar';
import { RecentDealsHeroStrip } from './components/RecentDealsHeroStrip';
import { SidebarWatchlist } from './components/SidebarWatchlist';
import { TriggerFeed } from './components/TriggerFeed';
import { TrendingSectors } from './components/TrendingSectors';
import { GiveToGetPollWidget } from './components/GiveToGetPoll';
import { StatutoryRoCTicker } from './components/StatutoryRoCTicker';
import { DealCalculatorWidget } from './components/DealCalculatorWidget';
import { QuickBattlecardPills } from './components/QuickBattlecardPills';
import { CompanyProfileModal } from './components/CompanyProfileModal';
import { SalesBattlecardModal } from './components/SalesBattlecardModal';
import { WhatsAppShareModal } from './components/WhatsAppShareModal';
import { MorningChaiDigestModal } from './components/MorningChaiDigestModal';
import { CreditUnlockModal } from './components/CreditUnlockModal';
import { LogoPhilosophyModal } from './components/LogoPhilosophyModal';
import { CompanyDirectoryModal } from './components/CompanyDirectoryModal';
import { PlanComparisonModal } from './components/PlanComparisonModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { LogoVariant } from './components/PrimeLogo';

import { mockCompanies } from './data/mockCompanies';
import { mockTriggers, mockTrendingSectors, mockPolls } from './data/mockTriggers';
import { Company, TriggerSignal, SignalType } from './types';

export const App: React.FC = () => {
  // Master State
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [selectedFilter, setSelectedFilter] = useState<SignalType>('all');
  const [creditsLeft, setCreditsLeft] = useState<number>(4);
  const [logoVariant, setLogoVariant] = useState<LogoVariant>('radar-graph');
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);
  const [rightRailTab, setRightRailTab] = useState<'tools' | 'market'>('tools');

  // Modals & Active Selections
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [battlecardCompany, setBattlecardCompany] = useState<Company | null>(null);
  const [whatsAppTrigger, setWhatsAppTrigger] = useState<TriggerSignal | null>(null);
  const [isChaiDigestOpen, setIsChaiDigestOpen] = useState<boolean>(false);
  const [isCreditUnlockOpen, setIsCreditUnlockOpen] = useState<boolean>(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState<boolean>(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);

  // Active Poll
  const [currentPollIndex, setCurrentPollIndex] = useState<number>(0);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Signal Counts
  const signalCounts = useMemo(() => {
    const counts: Record<SignalType, number> = {
      all: mockTriggers.length,
      funding: 0,
      leadership: 0,
      mca: 0,
      tender: 0,
    };
    mockTriggers.forEach((t) => {
      if (counts[t.type] !== undefined) {
        counts[t.type]++;
      }
    });
    return counts;
  }, []);

  // Filtered Triggers
  const filteredTriggers = useMemo(() => {
    if (selectedFilter === 'all') return mockTriggers;
    return mockTriggers.filter((t) => t.type === selectedFilter);
  }, [selectedFilter]);

  // Company Follow Toggle
  const handleToggleFollow = (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === companyId) {
          const nextState = !c.isFollowing;
          addToast(
            nextState ? 'success' : 'info',
            nextState ? `Added ${c.name} to Watchlist` : `Removed ${c.name} from Watchlist`,
            nextState ? 'You will receive real-time RoC & MCA filing alerts for this company.' : undefined
          );
          return { ...c, isFollowing: nextState };
        }
        return c;
      })
    );
  };

  // Open Company Profile with functional credit decrement
  const handleOpenCompanyProfile = (company: Company) => {
    if (creditsLeft <= 0) {
      addToast(
        'warning',
        '0 Deep-Dive Credits Remaining',
        'Please answer 1 quick crowdsourced question to instantly unlock +5 company profiles.'
      );
      setIsCreditUnlockOpen(true);
      return;
    }

    setCreditsLeft((prev) => Math.max(0, prev - 1));
    setSelectedCompany(company);

    if (creditsLeft - 1 === 1) {
      addToast('info', '1 Deep-Dive Credit Left', 'Contribute insight or answer a poll to earn more.');
    }
  };

  // CRM Push Action
  const handlePushToCRM = (trigger: TriggerSignal) => {
    addToast(
      'success',
      'Synced Trigger Alert to Zoho CRM & HubSpot',
      `Lead "${trigger.crmPayload.leadTitle}" tagged with recommended action: "${trigger.crmPayload.recommendedAction.slice(0, 75)}..."`
    );
  };

  // WhatsApp Share Action
  const handleShareWhatsApp = (trigger: TriggerSignal) => {
    setWhatsAppTrigger(trigger);
  };

  // Live Crowdsourced Update
  const handleUpdateCrowdsourced = (companyId: string, newRevCr: number, newHeadcount: number) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === companyId) {
          const votes = c.crowdsourcedVoteCount + 1;
          const avgRev = Math.round((c.crowdsourcedRevenueEstimate * c.crowdsourcedVoteCount + newRevCr) / votes);
          const avgHc = Math.round((c.crowdsourcedHeadcountEstimate * c.crowdsourcedVoteCount + newHeadcount) / votes);

          const updated = {
            ...c,
            crowdsourcedRevenueEstimate: avgRev,
            crowdsourcedHeadcountEstimate: avgHc,
            crowdsourcedVoteCount: votes,
          };

          if (selectedCompany && selectedCompany.id === companyId) {
            setSelectedCompany(updated);
          }

          return updated;
        }
        return c;
      })
    );

    setCreditsLeft((prev) => prev + 1);
    addToast(
      'success',
      'Consensus Benchmark Updated (+1 Credit Earned)',
      `Your estimate has been merged into the verified community consensus benchmark.`
    );
  };

  // Give to Get Poll completion
  const handlePollVoteComplete = (creditsEarned: number) => {
    setCreditsLeft((prev) => prev + creditsEarned);
    addToast(
      'success',
      `+${creditsEarned} Profile Credits Added!`,
      `Your contribution is verified. Your balance is now ${creditsLeft + creditsEarned} deep-dives.`
    );
  };

  // Unlock Credits modal completion
  const handleUnlockCredits = (creditsToAdd: number) => {
    setCreditsLeft((prev) => prev + creditsToAdd);
    addToast(
      'success',
      `Unlocked +${creditsToAdd} Free Deep-Dives!`,
      `Thank you for contributing verified intelligence to IndusRadar.`
    );
  };

  // Upgrade to Pro Action
  const handleUpgradeToPro = () => {
    setCreditsLeft(999);
    addToast(
      'success',
      'Upgraded to IndusRadar Pro Tier!',
      'Unlimited profile deep-dives, automated CRM sync & export features unlocked.'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navbar */}
      <Navbar
        companies={companies}
        creditsLeft={creditsLeft}
        logoVariant={logoVariant}
        onSelectCompany={handleOpenCompanyProfile}
        onOpenChaiDigest={() => setIsChaiDigestOpen(true)}
        onOpenCreditModal={() => setIsCreditUnlockOpen(true)}
        onOpenLogoModal={() => setIsLogoModalOpen(true)}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenPlanModal={() => setIsPlanModalOpen(true)}
      />

      {/* Owler-Style Platform Metrics Strip */}
      <PlatformMetricsBar />

      {/* Main Container - Complete Full Screen Fluid Ratio (Edge-to-Edge) */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-5">
        
        {/* Recently Funded & Recent M&A Strip (Owler Hero Dual-Card Style) */}
        <RecentDealsHeroStrip
          companies={companies}
          onSelectCompany={handleOpenCompanyProfile}
        />

        <div className="flex flex-col lg:flex-row gap-6 items-start w-full mt-4">
          
          {/* Left Sidebar: My Watchlist & Signal Filters */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-20">
            <SidebarWatchlist
              companies={companies}
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              onSelectCompany={handleOpenCompanyProfile}
              onToggleFollow={handleToggleFollow}
              signalCounts={signalCounts}
            />
          </div>

          {/* Center Feed: Real-time Trigger Cards */}
          <div className="flex-1 min-w-0">
            <TriggerFeed
              triggers={filteredTriggers}
              companies={companies}
              isExpandedView={isExpandedView}
              onToggleExpandedView={() => setIsExpandedView(!isExpandedView)}
              onSelectCompany={handleOpenCompanyProfile}
              onPushToCRM={handlePushToCRM}
              onShareWhatsApp={handleShareWhatsApp}
            />
          </div>

          {/* Right Rail: Compact, Tabbed, Sticky */}
          {!isExpandedView && (
            <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 lg:sticky lg:top-20 flex flex-col gap-4">
              
              {/* Segmented Switcher */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setRightRailTab('tools')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    rightRailTab === 'tools'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>⚡ Sales Tools</span>
                </button>
                <button
                  onClick={() => setRightRailTab('market')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    rightRailTab === 'market'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🏛️ RoC & Market</span>
                </button>
              </div>

              {/* TAB 1: SALES TOOLS */}
              {rightRailTab === 'tools' && (
                <>
                  {/* 1. Give-to-Get Verification Poll */}
                  <GiveToGetPollWidget
                    poll={mockPolls[currentPollIndex]}
                    onVoteComplete={handlePollVoteComplete}
                  />

                  {/* 2. Enterprise Deal ACV Sizing Calculator */}
                  <DealCalculatorWidget
                    onPushToCRM={(dealTitle, dealValue) => {
                      addToast(
                        'success',
                        'Sizing Quote Saved to CRM',
                        `${dealTitle} estimated at ${dealValue} sent to pipeline.`
                      );
                    }}
                  />

                  {/* 3. Quick 1-Click Battlecard Matchups */}
                  <QuickBattlecardPills
                    companies={companies}
                    onOpenBattlecard={(comp) => setBattlecardCompany(comp)}
                  />
                </>
              )}

              {/* TAB 2: ROC & MARKET INTEL */}
              {rightRailTab === 'market' && (
                <>
                  {/* 1. Live Statutory RoC Filing Ticker */}
                  <StatutoryRoCTicker
                    companies={companies}
                    onSelectCompany={handleOpenCompanyProfile}
                  />

                  {/* 2. Trending Indian Sectors Leaderboard */}
                  <TrendingSectors
                    sectors={mockTrendingSectors}
                    onSelectSector={(sectorName) => {
                      addToast('info', `Sector Focus: ${sectorName}`, 'Showing top enterprise signals in this sector.');
                    }}
                  />

                  {/* 3. Strategic Sales Playbook Tip Banner */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-subtle flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono">
                        Enterprise Sales Playbook
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">GeM & RoC Timing</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Indian PSU & conglomerate tender wins (like Adani & SBI) trigger a 60–90 day subcontractor buying cycle. Push alerts directly to your CRM to notify your AE team before rivals pitch.
                    </p>
                  </div>
                </>
              )}

            </aside>
          )}

        </div>
      </main>

      {/* Footer (Full Width Edge-to-Edge with Directory links) */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-black text-slate-900 tracking-tight text-sm">Indus<span className="text-blue-600">Radar</span></span>
            <span>•</span>
            <button
              onClick={() => setIsDirectoryOpen(true)}
              className="text-blue-600 hover:underline font-semibold"
            >
              Browse 4,200+ Indian Entity Directory
            </button>
            <span>•</span>
            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Community vs Pro Pricing
            </button>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>RoC Data Integrity: Active</span>
            <span>•</span>
            <span>MCA-21 & GSTN Synced</span>
            <span>•</span>
            <span className="font-mono text-slate-600">v1.3.0</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      
      {/* 1. Company Profile Modal */}
      {selectedCompany && (
        <CompanyProfileModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onToggleFollow={handleToggleFollow}
          onOpenBattlecard={(comp) => {
            setBattlecardCompany(comp);
          }}
          onUpdateCrowdsourced={handleUpdateCrowdsourced}
        />
      )}

      {/* 2. Sales Battlecard Modal */}
      {battlecardCompany && (
        <SalesBattlecardModal
          company={battlecardCompany}
          onClose={() => setBattlecardCompany(null)}
        />
      )}

      {/* 3. WhatsApp Share Modal */}
      {whatsAppTrigger && (
        <WhatsAppShareModal
          trigger={whatsAppTrigger}
          onClose={() => setWhatsAppTrigger(null)}
          onCopySuccess={() => {
            addToast('success', 'Copied to Clipboard!', 'Formatted WhatsApp snippet ready to paste.');
          }}
        />
      )}

      {/* 4. Morning Chai Digest Modal */}
      {isChaiDigestOpen && (
        <MorningChaiDigestModal
          onClose={() => setIsChaiDigestOpen(false)}
          onCopyDigest={() => {
            addToast('success', 'Digest Copied!', 'Morning competitive standup briefing copied.');
          }}
        />
      )}

      {/* 5. Give-to-Get Credit Unlock Modal */}
      <CreditUnlockModal
        isOpen={isCreditUnlockOpen}
        onClose={() => setIsCreditUnlockOpen(false)}
        onUnlockCredits={handleUnlockCredits}
      />

      {/* 6. Logo Design & Work Representation Philosophy Modal */}
      <LogoPhilosophyModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        activeVariant={logoVariant}
        onSelectVariant={(v) => {
          setLogoVariant(v);
          addToast('success', 'Logo Archetype Updated!', `Applied "${v}" identity across IndusRadar.`);
        }}
      />

      {/* 7. Owler-Style Master Company Directory Index Modal */}
      <CompanyDirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        companies={companies}
        onSelectCompany={handleOpenCompanyProfile}
      />

      {/* 8. Owler Community vs Pro Plan Comparison Modal */}
      <PlanComparisonModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onUpgradeToPro={handleUpgradeToPro}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
