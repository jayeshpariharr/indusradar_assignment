import React, { useState } from 'react';
import {
  X,
  Search,
  Building2,
  FolderOpen,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
} from 'lucide-react';
import { Company } from '../types';

interface CompanyDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Company[];
  onSelectCompany: (company: Company) => void;
}

export const CompanyDirectoryModal: React.FC<CompanyDirectoryModalProps> = ({
  isOpen,
  onClose,
  companies,
  onSelectCompany,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'saas' | 'fintech' | 'unicorn' | 'bootstrapped' | 'logistics'>('all');

  if (!isOpen) return null;

  // Categorized Directory lists inspired by Owler
  const categories = [
    { id: 'all', label: 'All Indexed Entities' },
    { id: 'saas', label: 'Enterprise B2B SaaS' },
    { id: 'fintech', label: 'FinTech & Payments' },
    { id: 'unicorn', label: '$1B+ Unicorns' },
    { id: 'bootstrapped', label: 'Bootstrapped Giants' },
    { id: 'logistics', label: 'Logistics & Quick Commerce' },
  ];

  const directoryColumns = [
    {
      title: 'B2B Software & SaaS',
      companies: [
        { name: 'Zoho Corporation', id: 'zoho', detail: '₹8,700 Cr ARR • Bootstrapped' },
        { name: 'Freshworks Inc.', id: 'freshworks', detail: '₹5,120 Cr ARR • NASDAQ:FRSH' },
        { name: 'Postman India', id: 'postman', detail: '₹1,240 Cr ARR • API Platform' },
        { name: 'Darwinbox', id: 'darwinbox', detail: '₹680 Cr ARR • HCM Unicorn' },
        { name: 'BrowserStack', id: 'browserstack', detail: '₹1,380 Cr ARR • Cloud Testing' },
        { name: 'Hasura', id: 'postman', detail: 'GraphQL Data Engine' },
        { name: 'Keka HR', id: 'darwinbox', detail: 'SMB Payroll Suite' },
        { name: 'Chargebee', id: 'freshworks', detail: 'Subscription Billing' },
      ],
    },
    {
      title: 'FinTech & Payments',
      companies: [
        { name: 'Razorpay Software', id: 'razorpay', detail: '₹2,470 Cr ARR • $7.5B Val' },
        { name: 'Pine Labs India', id: 'pinelabs', detail: '₹1,890 Cr ARR • Smart POS' },
        { name: 'Cashfree Payments', id: 'razorpay', detail: '₹680 Cr ARR • Disbursals' },
        { name: 'PayU India', id: 'razorpay', detail: '₹2,100 Cr ARR • Payments' },
        { name: 'Paytm (One97)', id: 'pinelabs', detail: 'NSE:PAYTM • Soundbox & QR' },
        { name: 'Innoviti Payment', id: 'pinelabs', detail: 'Merchant Credit & EMI' },
        { name: 'PhonePe', id: 'razorpay', detail: 'UPI Consumer Ecosystem' },
        { name: 'Cred (Dreamplug)', id: 'razorpay', detail: 'Credit Card Rewards' },
      ],
    },
    {
      title: 'Supply Chain & Commerce',
      companies: [
        { name: 'Shiprocket', id: 'shiprocket', detail: '₹1,450 Cr ARR • Unicorn' },
        { name: 'Zepto', id: 'zepto', detail: '₹9,400 Cr ARR • $5.0B Val' },
        { name: 'Delhivery', id: 'shiprocket', detail: '₹8,140 Cr ARR • NSE:DELHIVERY' },
        { name: 'Blinkit (Zomato)', id: 'zepto', detail: 'Dark Store Duopoly' },
        { name: 'Swiggy Instamart', id: 'zepto', detail: 'Quick Commerce Engine' },
        { name: 'BlackBuck (Zinka)', id: 'shiprocket', detail: 'B2B Trucking SaaS' },
        { name: 'Shadowfax', id: 'shiprocket', detail: 'Hyperlocal 3PL' },
        { name: 'ElasticRun', id: 'shiprocket', detail: 'Rural B2B Distribution' },
      ],
    },
    {
      title: 'Global Rivals in India',
      companies: [
        { name: 'Workday India', id: 'darwinbox', detail: 'Enterprise HCM Standard' },
        { name: 'Salesforce India', id: 'zoho', detail: 'Enterprise Cloud CRM' },
        { name: 'Stripe India', id: 'razorpay', detail: 'Cross-Border Payments' },
        { name: 'ServiceNow', id: 'freshworks', detail: 'Enterprise ITSM' },
        { name: 'Sauce Labs', id: 'browserstack', detail: 'Selenium Cloud Testing' },
        { name: 'SAP India', id: 'darwinbox', detail: 'Legacy ERP & HCM' },
        { name: 'Zendesk', id: 'freshworks', detail: 'Customer Engagement' },
        { name: 'Kong Insomnia', id: 'postman', detail: 'API Lifecycle Client' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-6xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Indian B2B Company Directory Index</h3>
              <p className="text-xs text-slate-400">
                Modeled after Owler's Master Index • 4,200+ Verified Corporate Profiles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter 4,200+ Indian corporate profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Columns (Owler Screenshot 7 Style) */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directoryColumns.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-2.5">
                <div className="pb-1.5 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {col.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {col.companies.length} Profiles
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {col.companies
                    .filter((c) =>
                      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.detail.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item, cIdx) => {
                      const matched = companies.find((comp) => comp.id === item.id);

                      return (
                        <button
                          key={cIdx}
                          onClick={() => {
                            if (matched) {
                              onSelectCompany(matched);
                              onClose();
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-slate-50 text-left border border-transparent hover:border-slate-200 transition-all group flex items-start justify-between"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium block">
                              {item.detail}
                            </span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-0.5" />
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          {/* Industry Tags Cloud (Owler Screenshot 8 Style) */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Browse Indian Tech & Enterprise By Sector Tag
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Fintech & Payments',
                'Enterprise SaaS',
                'HR Tech & HCM',
                'Developer Tools & DevOps',
                'Cloud QA & Testing',
                'Fleet & Logistics',
                'Quick Commerce & Retail',
                'POS Merchant Banking',
                'API Infrastructure',
                'B2B E-Commerce',
                'HealthTech & Supply',
                'Agritech & Supply Chain',
                'EdTech Enterprise',
                'Cybersecurity & IAM',
                'Account Aggregator APIs',
                'GST Invoicing Software',
              ].map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer transition-colors text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Click any company to open full RoC statutory financials & 1-click sales battlecard</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors"
          >
            Close Directory
          </button>
        </div>

      </div>
    </div>
  );
};
