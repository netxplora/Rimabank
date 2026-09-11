import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Wallet, 
  CreditCard, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  FileText, 
  Clock, 
  HelpCircle,
  Building,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const personalAccounts = [
  {
    id: "regular-savings",
    title: "RIMA Regular Savings",
    icon: Wallet,
    category: "Everyday Growth",
    badge: "Most Popular",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-200",
    description: "An accessible savings account designed for everyday individuals, market traders, and families to save securely with monthly interest returns.",
    minBalance: "₦0 opening balance",
    interestRate: "Competitive monthly yields",
    features: [
      "Zero minimum operating balance",
      "Instant Verve debit card issuance",
      "Full mobile app and USSD (*901# style) access",
      "Qualify for micro-loans after 3 months of consistent activity",
      "Free monthly electronic account statements"
    ],
    ctaText: "Open Savings Account",
    ctaLink: "/contact"
  },
  {
    id: "current-account",
    title: "Individual Current Account",
    icon: CreditCard,
    category: "Transactional Banking",
    badge: "Salary & Business",
    bg: "bg-sky-50",
    iconColor: "text-[#0284c7]",
    borderHover: "hover:border-sky-200",
    description: "A flexible checking account tailored for salaried employees, professionals, and sole proprietors requiring frequent transactions and cheque clearings.",
    minBalance: "₦1,000 opening deposit",
    interestRate: "Standard transactional",
    features: [
      "Personalized customized cheque book",
      "Unrestricted monthly transaction turnover",
      "Eligibility for Salary Advance and overdraft facilities",
      "Instant SMS and email alert notifications",
      "Third-party clearing and inter-bank transfers"
    ],
    ctaText: "Open Current Account",
    ctaLink: "/contact"
  },
  {
    id: "student-youth",
    title: "Youth & Student Account",
    icon: GraduationCap,
    category: "Campus & Early Career",
    badge: "Zero Maintenance",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    borderHover: "hover:border-amber-200",
    description: "Tailored for undergraduates and young adults entering the workforce. Enjoy zero account maintenance charges and special student financial tools.",
    minBalance: "₦0 opening balance",
    interestRate: "High-yield savings bonus",
    features: [
      "No account maintenance fees (zero AMF)",
      "Instant debit card for POS and online payments",
      "Access to RIMA financial literacy and skill workshops",
      "Tier-1 rapid onboarding using Student ID and NIN",
      "Campus agent banking cash deposit points"
    ],
    ctaText: "Get Started as Student",
    ctaLink: "/contact"
  }
];

const kycTiers = [
  {
    tier: "Tier 1: Starter Account",
    limit: "Max Balance: ₦300,000 | Daily Transfer: ₦50,000",
    requirements: [
      "Valid National Identification Number (NIN) or BVN",
      "One passport photograph",
      "Completed basic account opening form",
      "Active mobile phone number"
    ],
    note: "Instant account setup at any branch or agent location in under 5 minutes."
  },
  {
    tier: "Tier 2: Standard Account",
    limit: "Max Balance: ₦500,000 | Daily Transfer: ₦100,000",
    requirements: [
      "All Tier 1 requirements",
      "Valid government-issued ID card (NIN slip, Voter's Card, Driver's License)",
      "Proof of address (recent utility bill within 3 months)"
    ],
    note: "Ideal for regular salaried staff and growing personal savings."
  },
  {
    tier: "Tier 3: Unlimited Account",
    limit: "Unrestricted Balance & Transaction Turnover",
    requirements: [
      "All Tier 2 requirements",
      "Physical address verification by a RIMA Field Officer",
      "Two signed reference forms (for Current Accounts)",
      "Tax Identification Number (TIN) where applicable"
    ],
    note: "Full access to commercial transfers, high-value deposits, and credit facilities."
  }
];

export default function PersonalBanking() {
  const [selectedTier, setSelectedTier] = useState(0);

  return (
    <Layout
      title="Personal Banking | RIMA Microfinance Bank"
      description="Grounded personal banking designed for your everyday life. Open a savings or current account, obtain a debit card, and access credit with RIMA Microfinance Bank."
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
                <Wallet className="w-3.5 h-3.5" />
                Personal Banking Solutions
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight mb-6 leading-tight">
                Simple, reliable banking built around your daily needs.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                Whether you are saving for your family's future, receiving your monthly salary, or managing day-to-day household expenses, RIMA Microfinance Bank provides secure accounts with zero hidden fees and attentive local service.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-7 shadow-sm" asChild>
                  <Link to="/contact">
                    Open an Account Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-slate-200 text-[#0a1e3f] hover:bg-slate-50 px-6" asChild>
                  <Link to="/mobile-banking">Download Mobile App</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0a1e3f]">₦0</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Opening balance savings</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0284c7]">100%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">NDIC Insured Deposits</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-600">5 Mins</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Instant Branch Onboarding</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-100/60 relative">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Overview</span>
                    <h3 className="font-heading font-bold text-lg text-[#0a1e3f]">Personal Banking Card</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Network
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold text-sm">
                        ₦
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Monthly Interest Yield</div>
                        <div className="font-heading font-bold text-sm text-[#0a1e3f]">Calculated Daily, Paid Monthly</div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Digital Access</div>
                        <div className="font-heading font-bold text-sm text-[#0a1e3f]">Mobile, USSD & Agent Points</div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Regulatory Protection</div>
                        <div className="font-heading font-bold text-sm text-[#0a1e3f]">Licensed by CBN & NDIC Member</div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>

                <div className="bg-[#0a1e3f] rounded-2xl p-4 text-white text-center">
                  <div className="text-xs text-blue-200 font-medium mb-1">Need help deciding on an account?</div>
                  <div className="text-xs font-semibold">Visit any of our branches in Port Harcourt or call support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Account Options Grid */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Account Types
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Choose the right account for your goals
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every customer has unique financial goals. Choose an account tailored to your daily transaction patterns, savings targets, or career stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personalAccounts.map((account) => (
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
                    <span>Opening Requirement:</span>
                    <strong className="text-[#0a1e3f]">{account.minBalance}</strong>
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

      {/* Account Opening Requirements / KYC Checklist */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
                Simple Documentation
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1e3f] tracking-tight mb-4">
                What you need to open an account
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                In compliance with Central Bank of Nigeria (CBN) regulations, we operate a flexible tiered account structure that lets you start with basic identification and upgrade as your banking needs expand.
              </p>

              <div className="space-y-3">
                {kycTiers.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTier(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between ${
                      selectedTier === idx 
                        ? "bg-[#0a1e3f] text-white border-[#0a1e3f] shadow-md" 
                        : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100"
                    }`}
                  >
                    <div>
                      <div className={`font-heading font-bold text-sm ${selectedTier === idx ? "text-white" : "text-[#0a1e3f]"}`}>
                        {t.tier}
                      </div>
                      <div className={`text-xs ${selectedTier === idx ? "text-blue-200" : "text-slate-500"} mt-0.5`}>
                        {t.limit}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${selectedTier === idx ? "text-white" : "text-slate-400"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#f8fafc] border border-slate-200 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#0a1e3f]">
                      {kycTiers[selectedTier].tier}
                    </h3>
                    <p className="text-xs text-slate-500">{kycTiers[selectedTier].limit}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Required Documents</h4>
                  <ul className="space-y-3">
                    {kycTiers[selectedTier].requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#0a1e3f] bg-white p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-[#0a1e3f] leading-relaxed mb-6">
                  <span className="font-bold text-[#0284c7]">Note: </span>
                  {kycTiers[selectedTier].note}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white" asChild>
                    <Link to="/contact">Visit Nearest Branch</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full border-slate-200 text-[#0a1e3f]" asChild>
                    <Link to="/branches">Find Branch Directory</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Channels Banner */}
      <section className="py-16 bg-[#0a1e3f] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-300 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/60 inline-block mb-3">
                Omnichannel Access
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Bank on your terms, from any location.
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed max-w-xl">
                Every RIMA personal account connects seamlessly to our mobile banking application, USSD service, instant debit cards, and neighborhood agent banking kiosks across Rivers State.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <Button className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white w-full" asChild>
                <Link to="/cards">Get a Verve Debit Card</Link>
              </Button>
              <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 w-full" asChild>
                <Link to="/agent-banking">Locate Cash Agents</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
