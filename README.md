# IndusRadar Prime 🇮🇳🌍 — India & Global B2B Competitive Intelligence Platform

**IndusRadar Prime** is an authoritative competitive intelligence and sales signal platform tailored for the Indian enterprise market while commanding global B2B prestige (an "Owler + PitchBook" calibrated for Bharat & beyond).

It connects official statutory filings from the **Ministry of Corporate Affairs (MCA-21)**, **Registrar of Companies (RoC)**, and **GSTN** with live sales trigger alerts, crowdsourced ARR consensus benchmarks, and 1-click executive battlecards.

---

## 🏛️ Brand Identity & Logo Philosophy

- **Name: IndusRadar**
  - **"Indus"**: The historic and global root of India (the Indus River and Civilization gave birth to the very name *India*). Globally recognized, deeply rooted in heritage, and resonant from Silicon Valley to Singapore and Bengaluru.
  - **"Radar"**: Authoritative B2B SaaS terminology representing early-warning competitive sweeps, tender monitoring, leadership changes, and statutory signal detection.
- **Prime Logo**:
  - Precision faceted deep navy crest (`#0B132B`) with dynamic concentric radar grid rings.
  - Saffron/amber faceted compass needle pointing northward towards growth.
  - Emerald statutory radar sweep dot representing real-time MCA-21 and RoC verification.
  - Sleek modern wordmark with "PRIME" badge.

---

## ⚡ Tech Stack & Architecture

- **Core Framework**: React 18 with TypeScript & Vite 5
- **Styling**: Tailwind CSS with custom slate/white surface palette, deep navy accents, subtle emerald statutory badges, and saffron/amber highlights
- **Data Visualizations**: Recharts (`ResponsiveContainer`, `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, `CartesianGrid`)
- **Icons**: Lucide React
- **Confetti Celebration**: Canvas Confetti for crowdsource verification unlocks

### Project Structure
```
bharatpulse/
├── src/
│   ├── components/
│   │   ├── PrimeLogo.tsx              # Bespoke SVG Radar Shield & Prime Monogram
│   │   ├── Navbar.tsx                 # Top navigation, global CIN/sector command search, credit counter
│   │   ├── SidebarWatchlist.tsx       # "My Watchlist", quick follow toggles, and signal filter pills
│   │   ├── TriggerFeed.tsx            # Real-time trigger cards with AI sales implications
│   │   ├── TrendingSectors.tsx        # Trending Indian sectors leaderboard (B2B SaaS, FinTech, etc.)
│   │   ├── GiveToGetPoll.tsx          # Interactive "Give-to-Get" verification poll widget
│   │   ├── CompanyProfileModal.tsx    # Comprehensive deep-dive modal (Financials, Competitors, Statutory)
│   │   ├── SalesBattlecardModal.tsx   # Printable 1-click executive sales battlecard
│   │   ├── WhatsAppShareModal.tsx     # Formatted WhatsApp B2B sales dispatch preview
│   │   ├── MorningChaiDigestModal.tsx # Daily 3-minute morning competitive briefing
│   │   ├── CreditUnlockModal.tsx      # Paywall unlock flow when deep-dive credits hit 0
│   │   └── Toast.tsx                  # Action notifications (CRM sync, Watchlist updates)
│   ├── data/
│   │   ├── mockCompanies.ts           # 9 realistic Indian tech giants (Razorpay, Zoho, Postman, Darwinbox, etc.)
│   │   └── mockTriggers.ts            # Sales triggers, trending sectors, poll questions, morning digest
│   ├── types/
│   │   └── index.ts                   # Strongly-typed TypeScript interfaces
│   ├── App.tsx                        # Master app container and state orchestration
│   ├── main.tsx                       # React DOM root entrypoint
│   └── index.css                      # Tailwind base & custom animations
```

---

## 🏃 Running the Prototype

The Vite dev server is running on the host machine:
- **Local URL**: `http://localhost:5173/`
