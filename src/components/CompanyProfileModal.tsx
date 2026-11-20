import React, { useState } from 'react';
import {
  X,
  Building2,
  MapPin,
  Calendar,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  Swords,
  Copy,
  Check,
  ExternalLink,
  Sliders,
  Sparkles,
  BarChart2,
  FileText,
  BadgeAlert,
  ArrowUpRight,
  Send,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
  ComposedChart,
} from 'recharts';
import { Company } from '../types';

interface CompanyProfileModalProps {
  company: Company;
  onClose: () => void;
  onToggleFollow: (companyId: string) => void;
  onOpenBattlecard: (company: Company) => void;
  onUpdateCrowdsourced: (companyId: string, newRevCr: number, newHeadcount: number) => void;
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({
  company,
  onClose,
  onToggleFollow,
  onOpenBattlecard,
  onUpdateCrowdsourced,
}) => {
  const [activeTab, setActiveTab] = useState<'financials' | 'competitors' | 'statutory'>('financials');
  const [copiedCin, setCopiedCin] = useState(false);
  const [competitorFilter, setCompetitorFilter] = useState<'all' | 'indian' | 'global'>('all');

  // Crowdsourced Estimate Form state
  const [userRevEstimate, setUserRevEstimate] = useState<string>(
    String(company.crowdsourcedRevenueEstimate || company.estimatedArrCr)
  );
  const [userHeadcountEstimate, setUserHeadcountEstimate] = useState<string>(
    String(company.crowdsourcedHeadcountEstimate || company.employeeCount)
  );
  const [submittedEstimate, setSubmittedEstimate] = useState(false);

  const handleCopyCin = () => {
    navigator.clipboard.writeText(company.cin);
    setCopiedCin(true);
    setTimeout(() => setCopiedCin(false), 2000);
  };

  const handleEstimateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rev = parseFloat(userRevEstimate);
    const hc = parseInt(userHeadcountEstimate, 10);
    if (!isNaN(rev) && !isNaN(hc)) {
      onUpdateCrowdsourced(company.id, rev, hc);
      setSubmittedEstimate(true);
      setTimeout(() => setSubmittedEstimate(false), 3000);
    }
  };

  const filteredCompetitors = company.directCompetitors.filter((c) => {
    if (competitorFilter === 'all') return true;
    return c.type === competitorFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header Bar */}
        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="uppercase tracking-wider">Company Profile Deep-Dive</span>
            <span>•</span>
            <span className="font-mono text-slate-400">RoC ID: {company.cin.slice(0, 10)}...</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-6">
          
          {/* Header Card */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-card flex-shrink-0"
                style={{ backgroundColor: company.brandColor }}
              >
                {company.name.slice(0, 2)}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {company.name}
                  </h1>
                  {company.mcaVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified MCA RoC Data
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {company.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {company.hq}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Founded {company.foundedYear}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200/70 px-2 py-0.5 rounded border border-slate-200 transition-colors">
                    <span className="font-mono text-[11px] text-slate-700">CIN: {company.cin}</span>
                    <button
                      onClick={handleCopyCin}
                      title="Copy Corporate Identification Number"
                      className="text-slate-400 hover:text-slate-700 p-0.5 ml-1"
                    >
                      {copiedCin ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2.5 self-start">
              {/* Follow Toggle */}
              <button
                onClick={() => onToggleFollow(company.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  company.isFollowing
                    ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {company.isFollowing ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>Follow Company</span>
                  </>
                )}
              </button>

              {/* Generate 1-Click Sales Battlecard */}
              <button
                onClick={() => onOpenBattlecard(company)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-card"
              >
                <Swords className="w-4 h-4 text-amber-400" />
                <span>1-Click Sales Battlecard</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-500">Estimated ARR (Run-rate)</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-900">₹{company.estimatedArrCr} Cr</span>
                <span className="text-xs font-bold text-emerald-600">MCA Verified</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">FY24 Statutory Filing</span>
            </div>

            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-500">Total Workforce</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-900">{company.employeeCount.toLocaleString()}</span>
                <span className="text-xs font-bold text-emerald-600">+{company.employeeGrowthYoY}% YoY</span>
              </div>
              <span className="text-[11px] text-slate-400">PF active subscribers base</span>
            </div>

            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-500">Total Capital Raised</span>
              <span className="text-xl font-black text-slate-900">{company.totalFunding}</span>
              <span className="text-[11px] text-slate-400">Equity & debt rounds</span>
            </div>

            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-500">Latest Valuation</span>
              <span className="text-xl font-black text-slate-900">{company.valuation}</span>
              <span className="text-[11px] text-slate-400">Institutional round benchmark</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-4 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('financials')}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                activeTab === 'financials'
                  ? 'text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span>Overview & Financials</span>
              {activeTab === 'financials' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('competitors')}
              className={`pb-3 text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
                activeTab === 'competitors'
                  ? 'text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span>Competitor Graph</span>
              <span className="px-1.5 py-0.2 bg-slate-100 rounded-full text-[11px] text-slate-600 font-mono">
                {company.directCompetitors.length}
              </span>
              {activeTab === 'competitors' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('statutory')}
              className={`pb-3 text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
                activeTab === 'statutory'
                  ? 'text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span>Statutory & Directors (MCA)</span>
              <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                India Official
              </span>
              {activeTab === 'statutory' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
              )}
            </button>
          </div>

          {/* TAB 1: Financials & Crowdsourced Estimates */}
          {activeTab === 'financials' && (
            <div className="flex flex-col gap-6">
              
              {/* Financial Chart */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      4-Year Financial Growth Trajectory (₹ in Crores)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Audited RoC Financial Statements filed under Companies Act 2013
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-slate-700">
                      <span className="w-3 h-3 rounded bg-slate-900 inline-block"></span> Revenue (₹ Cr)
                    </span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span> EBITDA (₹ Cr)
                    </span>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={company.revenueHistory}
                      margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                      <YAxis tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          border: 'none',
                          fontSize: '12px',
                        }}
                        itemStyle={{ color: '#FFFFFF' }}
                        formatter={(val: number) => [`₹${val} Cr`, '']}
                      />
                      <Bar dataKey="revenueCr" name="Revenue" fill="#0F172A" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="ebitdaCr" name="EBITDA" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Crowdsourced Estimate Widget */}
              <div className="bg-gradient-to-br from-blue-50/70 via-white to-slate-50 p-5 rounded-xl border border-blue-200/80 shadow-subtle flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    <span>Crowdsourced Intelligence Engine</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Community Estimates for {company.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Official MCA filings have a 6–9 month lag. Sales leaders contribute their current estimated ARR and headcount to maintain real-time accuracy.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                      <span className="text-[11px] text-slate-500 font-medium">Community Consensus ARR</span>
                      <div className="text-lg font-black text-slate-900 mt-0.5">
                        ₹{company.crowdsourcedRevenueEstimate} Cr
                      </div>
                      <span className="text-[10px] text-slate-400">Based on {company.crowdsourcedVoteCount} verified submissions</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                      <span className="text-[11px] text-slate-500 font-medium">Community Headcount</span>
                      <div className="text-lg font-black text-slate-900 mt-0.5">
                        {company.crowdsourcedHeadcountEstimate.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-400">Linked to LinkedIn & PF delta</span>
                    </div>
                  </div>
                </div>

                {/* Submission Form */}
                <form
                  onSubmit={handleEstimateSubmit}
                  className="w-full md:w-80 bg-white p-4 rounded-xl border border-slate-200 shadow-card flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Submit Your Estimate</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      +1 Deep-Dive Credit
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">
                      Current ARR Estimate (₹ in Cr)
                    </label>
                    <input
                      type="number"
                      value={userRevEstimate}
                      onChange={(e) => setUserRevEstimate(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      placeholder="e.g. 2600"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">
                      Estimated Active Employee Headcount
                    </label>
                    <input
                      type="number"
                      value={userHeadcountEstimate}
                      onChange={(e) => setUserHeadcountEstimate(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      placeholder="e.g. 3950"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit & Update Benchmark</span>
                  </button>

                  {submittedEstimate && (
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center text-[11px] font-semibold text-emerald-800">
                      Thank you! Consensus benchmark updated live.
                    </div>
                  )}
                </form>
              </div>

            </div>
          )}

          {/* TAB 2: Competitor Graph & Comparison Cards */}
          {activeTab === 'competitors' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Direct Indian & Global Competitor Matrix
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time market overlap, revenue comparisons, and head-to-head win rates
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                  <button
                    onClick={() => setCompetitorFilter('all')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      competitorFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({company.directCompetitors.length})
                  </button>
                  <button
                    onClick={() => setCompetitorFilter('indian')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      competitorFilter === 'indian'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Domestic Indian
                  </button>
                  <button
                    onClick={() => setCompetitorFilter('global')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      competitorFilter === 'global'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Global MNCs
                  </button>
                </div>
              </div>

              {/* Competitor Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCompetitors.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 shadow-subtle transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{comp.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                              comp.type === 'indian'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                            }`}
                          >
                            {comp.type === 'indian' ? 'Indian Native' : 'Global MNC'}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Estimated Scale / ARR</span>
                          <span className="font-bold text-slate-800 font-mono">{comp.arrCr}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Team Size</span>
                          <span className="font-bold text-slate-800 font-mono">{comp.headcount}</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 leading-relaxed mb-2">
                        <strong className="text-slate-800 font-semibold">Key Differentiator:</strong>{' '}
                        {comp.keyDifferentiator}
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{comp.headToHeadWinRate}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Head-to-Head Angle</span>
                      <button
                        onClick={() => onOpenBattlecard(company)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                      >
                        <Swords className="w-3.5 h-3.5" />
                        <span>Compare in Battlecard</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Statutory & Directors (India-Specific) */}
          {activeTab === 'statutory' && (
            <div className="flex flex-col gap-6">
              
              {/* Statutory Summary Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-medium">Corporate Identification (CIN)</span>
                  <span className="font-mono text-xs font-bold text-slate-900">{company.cin}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3" /> Ministry of Corporate Affairs (RoC)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-medium">Active GST State Registrations</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-slate-900">{company.gstStatesCount} States</span>
                    <span className="text-[11px] text-emerald-600 font-semibold">Active & Compliant</span>
                  </div>
                  <span className="text-[10px] text-slate-400">GSTN Master Registry Sync</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-medium">Credit Rating & Solvency</span>
                  <span className="text-sm font-black text-slate-900">{company.creditRating}</span>
                  <span className="text-[10px] text-slate-400">{company.creditAgency}</span>
                </div>
              </div>

              {/* Directors Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-subtle">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Key Registered Board of Directors (MCA Form DIR-12)
                    </h4>
                    <p className="text-[11px] text-slate-500">Official DIN numbers registered with MCA-21</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{company.directors.length} Directors Active</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2.5 font-semibold">Director Name</th>
                        <th className="px-4 py-2.5 font-semibold">DIN (Director ID Number)</th>
                        <th className="px-4 py-2.5 font-semibold">Designation</th>
                        <th className="px-4 py-2.5 font-semibold">Appointment Date</th>
                        <th className="px-4 py-2.5 font-semibold">RoC Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {company.directors.map((director, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3 font-semibold text-slate-900">{director.name}</td>
                          <td className="px-4 py-3 font-mono text-slate-600">{director.din}</td>
                          <td className="px-4 py-3 text-slate-700">{director.designation}</td>
                          <td className="px-4 py-3 text-slate-500 font-mono">{director.appointmentDate}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <ShieldCheck className="w-3 h-3" /> Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* GST Compliance Note */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>GST Filings & Statutory Standing: {company.gstStatus}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Registered entities maintain monthly GSTR-1 and GSTR-3B filings without default notice under Central Goods and Services Tax Act 2017. Input Tax Credit (ITC) reconciliation certified.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
