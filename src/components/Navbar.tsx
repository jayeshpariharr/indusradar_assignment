import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Coffee,
  Sparkles,
  ShieldCheck,
  Building2,
  ChevronRight,
  TrendingUp,
  CreditCard,
  X,
  ExternalLink,
  FolderOpen,
  Zap,
} from 'lucide-react';
import { Company } from '../types';
import { PrimeLogo, LogoVariant } from './PrimeLogo';

interface NavbarProps {
  companies: Company[];
  creditsLeft: number;
  logoVariant: LogoVariant;
  onSelectCompany: (company: Company) => void;
  onOpenChaiDigest: () => void;
  onOpenCreditModal: () => void;
  onOpenLogoModal: () => void;
  onOpenDirectory: () => void;
  onOpenPlanModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  companies,
  creditsLeft,
  logoVariant,
  onSelectCompany,
  onOpenChaiDigest,
  onOpenCreditModal,
  onOpenLogoModal,
  onOpenDirectory,
  onOpenPlanModal,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredCompanies = query.trim()
    ? companies.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.cin.toLowerCase().includes(q) ||
          c.sector.toLowerCase().includes(q) ||
          c.subSector.toLowerCase().includes(q) ||
          c.hq.toLowerCase().includes(q)
        );
      })
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Prime Logo & Wordmark (Clickable to inspect logo philosophy) */}
          <div
            className="flex items-center cursor-pointer transition-opacity hover:opacity-95"
            onClick={onOpenLogoModal}
            title="Click to inspect Logo Design & Work Representation"
          >
            <PrimeLogo size="md" showText={true} variant={logoVariant} />
          </div>

          {/* Global Search Bar (Expansive Full-Width Ratio) */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search Indian companies, CIN (e.g. U72200), sectors..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                className="w-full pl-10 pr-9 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-subtle"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {isOpen && query.trim() !== '' && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-elevated border border-slate-200 py-2 z-50 max-h-[22rem] overflow-y-auto">
                <div className="px-3.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Found {filteredCompanies.length} Indian Entities</span>
                  <span>Press Esc to close</span>
                </div>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <button
                      key={company.id}
                      onClick={() => {
                        onSelectCompany(company);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between group transition-colors border-b border-slate-50 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold uppercase shadow-sm"
                          style={{ backgroundColor: company.brandColor }}
                        >
                          {company.name.slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {company.name}
                            </span>
                            {company.mcaVerified && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <ShieldCheck className="w-3 h-3" /> MCA Verified
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[11px] text-slate-400">{company.cin}</span>
                            <span>•</span>
                            <span>{company.sector}</span>
                            <span>•</span>
                            <span className="font-medium text-slate-700">₹{company.estimatedArrCr} Cr ARR</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-slate-500 text-xs">
                    No Indian companies found matching "<span className="font-semibold text-slate-700">{query}</span>".
                    <div className="mt-2 text-slate-400">Try searching for "Razorpay", "Zoho", or CIN "U72200"</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Browse Directory Button (Owler Master Index) */}
            <button
              onClick={onOpenDirectory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-subtle"
              title="Browse 4,200+ Indian tech entities by sector and funding"
            >
              <FolderOpen className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Directory</span>
            </button>

            {/* Morning Chai Digest Button */}
            <button
              onClick={onOpenChaiDigest}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-lg transition-colors shadow-subtle group"
              title="Daily competitive trigger digest for Indian enterprise sales"
            >
              <div className="relative">
                <Coffee className="w-3.5 h-3.5 text-amber-700 group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
              </div>
              <span>Chai Digest</span>
              <span className="px-1.5 py-0.2 bg-white/80 rounded text-[10px] text-amber-800 font-mono">
                3 New
              </span>
            </button>

            {/* Community vs Pro Plan Link */}
            <button
              onClick={onOpenPlanModal}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50/70 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
              title="Compare Community vs Pro access tiers"
            >
              <Zap className="w-3 h-3 text-blue-600" />
              <span>Community Tier</span>
            </button>

            {/* User Credit Badge */}
            <button
              onClick={onOpenCreditModal}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                creditsLeft > 1
                  ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                  : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{creditsLeft}/5 Deep-Dives</span>
              {creditsLeft <= 1 && (
                <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
