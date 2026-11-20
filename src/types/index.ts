export type SignalType = 'all' | 'funding' | 'leadership' | 'mca' | 'tender';

export interface RevenueHistoryPoint {
  year: string;
  revenueCr: number;
  ebitdaCr?: number;
  headcount: number;
}

export interface CompetitorComparison {
  id: string;
  name: string;
  type: 'indian' | 'global';
  arrCr: string;
  headcount: string;
  keyDifferentiator: string;
  headToHeadWinRate: string;
}

export interface DirectorInfo {
  name: string;
  din: string;
  designation: string;
  appointmentDate: string;
}

export interface BattlecardData {
  primaryRival: string;
  rivalType: string;
  ourStrengths: string[];
  rivalWeaknesses: string[];
  winningPitchAngle: string;
  objectionHandling: { objection: string; counter: string }[];
  keyLandmines: string[];
}

export interface Company {
  id: string;
  name: string;
  brandColor: string;
  tagline: string;
  hq: string;
  foundedYear: number;
  cin: string;
  mcaVerified: boolean;
  sector: string;
  subSector: string;
  estimatedArrCr: number;
  employeeCount: number;
  employeeGrowthYoY: number;
  totalFunding: string;
  valuation: string;
  revenueHistory: RevenueHistoryPoint[];
  crowdsourcedRevenueEstimate: number;
  crowdsourcedHeadcountEstimate: number;
  crowdsourcedVoteCount: number;
  directCompetitors: CompetitorComparison[];
  directors: DirectorInfo[];
  gstStatesCount: number;
  gstStatus: string;
  creditRating: string;
  creditAgency: string;
  battlecard: BattlecardData;
  isFollowing?: boolean;
}

export interface TriggerSignal {
  id: string;
  companyId: string;
  companyName: string;
  companySector: string;
  type: 'funding' | 'leadership' | 'mca' | 'tender';
  badgeLabel: string;
  badgeStyle: 'emerald' | 'indigo' | 'amber' | 'sky';
  headline: string;
  summaryBullets: [string, string];
  timestamp: string;
  verifiedOfficial: boolean;
  sourceDocRef?: string;
  crmPayload: {
    leadTitle: string;
    recommendedAction: string;
    dealValueEstimate: string;
  };
  whatsappSnippet: string;
}

export interface SectorTrend {
  id: string;
  name: string;
  growth: string;
  dealCount: number;
  hotDeal: string;
  momentum: 'high' | 'surge' | 'steady';
}

export interface GiveToGetPoll {
  id: string;
  companyId: string;
  companyName: string;
  question: string;
  options: string[];
  category: string;
  rewardCredits: number;
}
