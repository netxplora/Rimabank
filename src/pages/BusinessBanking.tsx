import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Briefcase, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  Store, 
  Users, 
  FileCheck2, 
  BadgePercent,
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const businessAccounts = [
  {
    id: "sme-trader",
    title: "SME & Retail Business Account",
    icon: Store,
    category: "Sole Traders & Retailers",
    badge: "Most Popular",
    bg: "bg-sky-50",
    iconColor: "text-[#0284c7]",
    borderHover: "hover:border-sky-200",
    description: "Designed for supermarket owners, market vendors, pharmacy retailers, and independent service providers looking for effortless daily operations and POS pairing.",
    minDeposit: "₦5,000 opening deposit",
    features: [
      "Low initial opening requirements for enterprise traders",
      "Instant issuance of merchant POS terminal",
      "Daily cash deposit support via neighborhood RIMA agents",
      "Direct qualification for working capital stock-restocking loans",
      "Customized SMS & email transaction reconciliation"
    ],
    ctaText: "Open SME Account",
    ctaLink: "/contact"
  },
  {
    id: "corporate-commercial",
    title: "Corporate Commercial Account",
    icon: Building2,
    category: "Registered Companies & LLCs",
    badge: "Structured Business",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    borderHover: "hover:border-indigo-200",
    description: "Structured corporate banking for incorporated companies requiring multi-signatory authorization, structured payroll processing, and high-volume limits.",
    minDeposit: "₦10,000 opening deposit",
    features: [
      "Multi-signatory governance (Category A & B mandates)",
      "Bulk automated staff payroll disbursement",
      "High daily transfer thresholds for vendor payments",
      "Access to structured asset and equipment financing",
      "Dedicated corporate relationship officer"
    ],
    ctaText: "Open Corporate Account",
    ctaLink: "/contact"
  },
  {
    id: "cooperative-club",
    title: "Cooperative & Association Account",
    icon: Users,
    category: "Groups & Unions",
    badge: "Community Group",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-200",
    description: "Specialized accounts tailored for trade associations, market unions, community development groups, and cooperative thrift societies.",
    minDeposit: "₦5,000 opening deposit",
    features: [
      "Multi-executive mandate approval structures",
      "Dual or triple signatory verification for all withdrawals",
      "Special group savings dividend options",
      "Group micro-lending facilities for verified members",
      "Detailed periodic financial audit statements"
    ],
    ctaText: "Open Group Account",
    ctaLink: "/contact"
  }
];

const businessRequirements = [
  {
    title: "Sole Proprietorships / Business Names",
    items: [
      "Certificate of Business Name Registration (CAC/BN)",
      "Application Form for Registration (Form BN 1)",
      "Valid National ID (NIN, Voter's Card, or Passport) of the Proprietor",
      "Bank Verification Number (BVN) & Tax Identification Number (TIN)",
      "Recent utility bill of business premises (within 3 months)",
      "Two passport photographs of the proprietor"
    ]
  },
  {
    title: "Incorporated Companies (Limited Liability)",
    items: [
      "Certificate of Incorporation (CAC/RC) & Status Report",
      "Memorandum and Articles of Association (MEMART)",
      "Board Resolution authorising the opening of the account and specifying signatories",
      "Valid government-issued IDs of all Directors and Signatories",
      "Tax Identification Number (TIN) & SCUML Certificate (where applicable)",
      "Two signed corporate reference forms"
    ]
  },
  {
    title: "Registered Cooperatives & Associations",
    items: [
      "Certificate of Registration from Ministry of Commerce/Cooperative",
      "Constitution and Bye-Laws of the Cooperative/Association",
      "Minutes of Meeting where decision to open account with RIMA Bank was resolved",
      "Valid IDs and passport photographs of principal officers (President, Secretary, Treasurer)",
      "Proof of registered operating address"
    ]
  }
];

export default function BusinessBanking() {
  const [activeReqTab, setActiveReqTab] = useState(0);

  return (
    <Layout
      title="Business Banking | RIMA Microfinance Bank"
      description="Reliable business banking accounts, merchant POS terminals, and working capital loans for small businesses, retailers, and corporations across Rivers State."
    >
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-5">
                <Briefcase className="w-3.5 h-3.5" />
                Commercial & SME Solutions
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight mb-6 leading-tight">
                Empowering businesses with dependable banking and working capital.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                From neighbourhood shops and market traders to registered commercial enterprises, RIMA Microfinance Bank provides the operational accounts, payment terminals, and financing to keep your cash flow moving.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-7 shadow-sm" asChild>
                  <Link to="/contact">
                    Open a Business Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-slate-200 text-[#0a1e3f] hover:bg-slate-50 px-6" asChild>
                  <Link to="/loans">Explore SME Loans</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0a1e3f]">Instant</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">POS Terminal Issuance</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0284c7]">24/7</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Automated Settlements</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-600">Local</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Relationship Officers</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-[#0a1e3f] rounded-3xl p-6 sm:p-8 text-white relative shadow-xl overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div>
                      <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Merchant Suite</span>
                      <h3 className="font-heading font-bold text-xl">RIMA Business Hub</h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active Merchant
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center">
                          <Receipt className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-blue-200">Point-of-Sale (POS)</div>
                          <div className="text-sm font-semibold">Fast Card Processing</div>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 font-medium">Available</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-blue-200">Daily Cash Collection</div>
                          <div className="text-sm font-semibold">Field Agent Sweeps</div>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 font-medium">Daily</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                          <BadgePercent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-blue-200">Working Capital Loans</div>
                          <div className="text-sm font-semibold">Inventory Restocking</div>
                        </div>
                      </div>
                      <span className="text-xs text-amber-300 font-medium">Low Interest</span>
                    </div>
                  </div>

                  <Button className="w-full rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white border-none py-3" asChild>
                    <Link to="/contact">Request Merchant POS</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Account Types */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Commercial Products
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Tailored banking structures for every business size
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Select an account configuration that fits your corporate structure, legal status, and transaction volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessAccounts.map((account) => (
              <div 
                key={account.id} 
                id={account.id}
                className={`bg-white border border-slate-200 rounded-3xl p-7 transition-all duration-300 ${account.borderHover} hover:shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${account.bg} ${account.iconColor} flex items-center justify-center shadow-sm`}>
                      <account.icon className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {account.badge}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#0284c7] mb-1">{account.category}</div>
                  <h3 className="font-heading font-bold text-2xl text-[#0a1e3f] mb-3">{account.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{account.description}</p>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 mb-6 flex items-center justify-between text-xs font-medium text-slate-700">
                    <span>Minimum Opening Deposit:</span>
                    <strong className="text-[#0a1e3f]">{account.minDeposit}</strong>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Account Features</h4>
                    <ul className="space-y-3">
                      {account.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0a1e3f]">
                          <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${account.iconColor}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button variant="outline" className="w-full justify-between rounded-xl group border-slate-200 text-[#0a1e3f] hover:border-[#0284c7] hover:text-[#0284c7]" asChild>
                  <Link to={account.ctaLink}>
                    <span>{account.ctaText}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-1 transition-all" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POS Terminal & Merchant Solutions Highlight */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
                Merchant Payment Terminal
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
                Accept card payments without interruptions
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Never lose a retail sale due to network failures. RIMA Bank issues high-speed, dual-SIM POS terminals that settle directly into your business account.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-heading font-bold text-sm text-[#0a1e3f] mb-1">Dual Network Roaming</div>
                  <div className="text-xs text-slate-500">Auto-switches between telecom networks for 99.8% uptime.</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-heading font-bold text-sm text-[#0a1e3f] mb-1">Instant Settlement</div>
                  <div className="text-xs text-slate-500">Funds reflect in your RIMA bank account with zero delays.</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-heading font-bold text-sm text-[#0a1e3f] mb-1">Low MDR Fees</div>
                  <div className="text-xs text-slate-500">Industry-standard transaction fees with transparent reports.</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-heading font-bold text-sm text-[#0a1e3f] mb-1">Dedicated Support</div>
                  <div className="text-xs text-slate-500">Prompt physical maintenance and paper roll replacements.</div>
                </div>
              </div>

              <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white" asChild>
                <Link to="/contact">Apply for POS Terminal</Link>
              </Button>
            </div>

            {/* Right — Official POS Terminal Photo */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative group max-w-[380px] w-full">
                {/* Ambient glow */}
                <img
                  src="/images/pos-terminal.jpg"
                  alt="Rima MFB Official Merchant POS Terminal"
                  className="w-full h-auto object-contain mix-blend-multiply transform group-hover:scale-[1.02] group-hover:-rotate-1 transition-transform duration-500"
                  style={{ filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.10)) drop-shadow(0px 6px 12px rgba(0,0,0,0.07))' }}
                />
                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  NIBSS-certified • Dual-SIM • Instant Settlement
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding / CAC Requirements */}
      <section className="py-20 bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Compliance & Onboarding
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Documentation required for business registration
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Ensure you have the following documents ready when applying for a business or corporate account at any of our branches.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {businessRequirements.map((req, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReqTab(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeReqTab === idx
                    ? "bg-[#0a1e3f] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {req.title}
              </button>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#0a1e3f]">
                  {businessRequirements[activeReqTab].title}
                </h3>
                <p className="text-xs text-slate-500">Official checklist for account opening</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {businessRequirements[activeReqTab].items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#0a1e3f] bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Need assistance with corporate documentation? Our branch team is ready to guide you.
              </div>
              <Button className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shrink-0" asChild>
                <Link to="/branches">Locate Nearest Branch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
