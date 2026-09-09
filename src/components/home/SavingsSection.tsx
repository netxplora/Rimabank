import { useState } from "react";
import { Link } from "react-router-dom";
import { PiggyBank, Target, Calendar, Coins, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SavingsProduct {
  id: string;
  name: string;
  tagline: string;
  targetAudience: string;
  benefits: string[];
  requirements: string[];
  icon: React.ElementType;
}

const savingsProducts: SavingsProduct[] = [
  {
    id: "regular",
    name: "Regular Savings Account",
    tagline: "Everyday secure savings with full liquidity and zero ledger maintenance charges.",
    targetAudience: "Individuals, salary earners, artisans, and students who need accessible daily banking.",
    benefits: [
      "Interest credited directly to your account balance monthly",
      "Free mobile banking and USSD transaction access",
      "Verve debit card for nationwide ATM and POS transactions",
      "No hidden maintenance deductions"
    ],
    requirements: [
      "Valid Government ID (NIN, Voter's Card, or Driver's License)",
      "Recent passport photograph",
      "Proof of address (Utility bill)"
    ],
    icon: PiggyBank
  },
  {
    id: "target",
    name: "Target Goal Savings",
    tagline: "Disciplined recurring savings structured for rent, inventory purchase, or school fees.",
    targetAudience: "Traders, parents, and professionals saving toward a specific milestone.",
    benefits: [
      "High competitive interest yields on locked balances",
      "Automated standing order deposits from your primary account",
      "Flexible durations: 3, 6, 9, or 12 months",
      "Guaranteed maturity payout without unexpected deductions"
    ],
    requirements: [
      "Active RIMA Bank savings or current account",
      "Defined goal amount and completion timeline",
      "Automated deposit schedule authorization"
    ],
    icon: Target
  },
  {
    id: "fixed",
    name: "Fixed Term Deposit",
    tagline: "Maximize capital growth with guaranteed premium returns for set investment tenures.",
    targetAudience: "Entrepreneurs, cooperatives, and individuals with idle funds seeking maximum security.",
    benefits: [
      "Fixed, guaranteed interest rates insulated from market volatility",
      "Tenure options from 30, 60, 90, 180 to 365 days",
      "Can serve as cash collateral for credit facilities",
      "Comprehensive certificate of deposit issued"
    ],
    requirements: [
      "Minimum deposit balance starting from ₦50,000",
      "Completed fixed deposit mandate form",
      "Standard KYC identity verification"
    ],
    icon: Calendar
  },
  {
    id: "esusu",
    name: "Daily Contribution (Esusu / Ajo)",
    tagline: "Convenient daily and weekly cash collections directly at your market stall or shop.",
    targetAudience: "Market traders, shop owners, commercial drivers, and neighborhood retailers.",
    benefits: [
      "Bank relationship officers collect deposits directly from your shop",
      "Instant SMS and receipt confirmation for every contribution",
      "Seamless access to microcredit after consistent savings",
      "Zero risk of community fund loss — 100% bank secured"
    ],
    requirements: [
      "Basic shop or stall identity registration",
      "Daily or weekly contribution commitment",
      "Passport photograph & contact number"
    ],
    icon: Coins
  }
];

export function SavingsSection() {
  const [activeTab, setActiveTab] = useState<string>("regular");
  const selectedProduct = savingsProducts.find((p) => p.id === activeTab) || savingsProducts[0];
  const Icon = selectedProduct.icon;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
            Savings & Wealth Accumulation
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            Make your money work toward your goals
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            Whether you are saving for business expansion, unexpected family emergencies, children's education, or long-term financial security, RIMA provides safe, high-yield deposit accounts.
          </p>
        </div>

        {/* Product Selection Tabs - Clean pill row */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-14">
          {savingsProducts.map((p) => {
            const TabIcon = p.icon;
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#0284c7] text-white shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                <TabIcon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Product Detailed View - Clean Open Editorial Grid */}
        <div className="border-t border-slate-100 pt-8 sm:pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
            >
              {/* Left: Overview & Benefits (7 cols) - Clean Open Typography */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 border border-sky-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#0a1e3f]">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {selectedProduct.tagline}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Who it is for
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {selectedProduct.targetAudience}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Key Features & Advantages
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Requirements & Action (5 cols) */}
              <div className="lg:col-span-5 bg-[#f0f9ff] p-6 sm:p-8 rounded-3xl border border-[#bae6fd]/70 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#bae6fd]/50">
                  <h4 className="font-heading font-bold text-sm text-[#0a1e3f]">
                    Account Requirements
                  </h4>
                  <span className="text-[10px] uppercase font-bold text-[#0284c7] bg-white px-2 py-0.5 rounded border border-[#bae6fd]/60">
                    Instant KYC
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  {selectedProduct.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-sky-100 text-[#0284c7] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-slate-200/60 space-y-2.5">
                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-11 shadow-brand justify-center"
                  >
                    <Link to="/contact">
                      <span>Open {selectedProduct.name}</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>NDIC Deposit Insured &bull; Zero Hidden Deductions</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

