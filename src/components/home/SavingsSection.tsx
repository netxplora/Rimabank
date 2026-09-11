import { useState } from "react";
import { Link } from "react-router-dom";
import { PiggyBank, Target, Calendar, Coins, CheckCircle2, ArrowRight, ShieldCheck, Wallet, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS } from "@/context/CMSContext";

const SAVINGS_IMG = "/images/savings-section.jpg";
const SAVINGS_IMG_ALT = "Nigerian woman reviewing her savings and finances at home";

interface SavingsProduct {
  id: string;
  name: string;
  tagline: string;
  targetAudience: string;
  benefits: string[];
  requirements: string[];
  icon: React.ElementType;
}

const defaultSavingsProducts: SavingsProduct[] = [
  {
    id: "regular",
    name: "Regular Savings Account",
    tagline: "Everyday secure savings with full liquidity and zero ledger maintenance charges.",
    targetAudience: "Individuals, salary earners, artisans, and students who need accessible daily banking.",
    benefits: [
      "Interest calculated daily and credited directly to your balance monthly",
      "Free mobile banking and USSD transaction access",
      "Verve debit card for nationwide ATM and POS transactions",
      "Zero ledger maintenance charges or unexpected deductions"
    ],
    requirements: [
      "Valid Government ID (NIN, Voter's Card, or Driver's License)",
      "Recent passport photograph",
      "Proof of residential address (Utility bill)"
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
      "Active RIMA Bank savings or checking account",
      "Defined milestone goal and completion timeline",
      "Automated recurring deposit authorization"
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

const savingsIcons = [PiggyBank, Target, Calendar, Coins, Wallet];

export function SavingsSection() {
  const { siteContent } = useCMS();
  const ss = siteContent?.savingsSection;

  const badge = ss?.badge || "Savings & Wealth Accumulation";
  const heading = ss?.heading || "Make your money work toward your goals";
  const description = ss?.description || "Whether you are saving for business expansion, unexpected family emergencies, children's education, or long-term financial security, RIMA provides safe, high-yield deposit accounts.";

  const productList: SavingsProduct[] = ss?.products && ss.products.length > 0
    ? ss.products.map((p, i) => ({
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        targetAudience: p.targetAudience,
        benefits: p.benefits || [],
        requirements: p.requirements || [],
        icon: savingsIcons[i % savingsIcons.length]
      }))
    : defaultSavingsProducts;

  const [activeTab, setActiveTab] = useState<string>(productList[0]?.id || "regular");
  const selectedProduct = productList.find((p) => p.id === activeTab) || productList[0];
  const Icon = selectedProduct.icon;

  return (
    <section className="relative py-16 sm:py-24 bg-[#ffffff] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Editorial Header — Image + Text split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-12 sm:mb-16">

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>{badge}</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              {heading}
            </h2>
            
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              {description}
            </p>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 h-56 sm:h-72 lg:h-80"
          >
            <img
              src={SAVINGS_IMG}
              alt={SAVINGS_IMG_ALT}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f]/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
              <span className="text-xs font-bold text-[#0a1e3f]">100% Capital Protection</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                NDIC Insured
              </span>
            </div>
          </motion.div>

        </div>

        {/* Product Selection Tabs - Clean pill row */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 sm:mb-12">
          {productList.map((p) => {
            const TabIcon = p.icon;
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#0a1e3f] text-white shadow-md translate-y-[-1px]"
                    : "bg-[#f8fbff] text-slate-700 hover:bg-white border border-slate-200/80 shadow-2xs"
                }`}
              >
                <TabIcon className={`h-4 w-4 ${isActive ? "text-[#38bdf8]" : "text-[#0284c7]"}`} />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Product Detailed View Console */}
        <div className="bg-[#f8fbff] rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left: Overview & Benefits (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80">
                  <div className="h-12 w-12 rounded-2xl bg-white text-[#0284c7] flex items-center justify-center shrink-0 border border-[#bae6fd] shadow-2xs">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#0a1e3f]">
                      {selectedProduct.name}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 mt-0.5">
                      {selectedProduct.tagline}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Target Customer
                  </span>
                  <p className="font-sans text-sm text-slate-700 leading-relaxed font-normal bg-white p-3.5 rounded-xl border border-slate-200/80">
                    {selectedProduct.targetAudience}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Key Features & Advantages
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProduct.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Requirements & Action Console (5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-md space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-heading font-bold text-sm text-[#0a1e3f]">
                    Account Documentation
                  </h4>
                  <span className="text-[10px] uppercase font-bold text-[#0284c7] bg-[#f0f9ff] px-2.5 py-0.5 rounded-full border border-[#bae6fd]">
                    Fast KYC
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {selectedProduct.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f8fbff] border border-slate-100">
                      <span className="h-5 w-5 rounded-full bg-[#0284c7] text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-snug">{req}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <Button
                    variant="pill"
                    size="lg"
                    asChild
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-11 shadow-md justify-center"
                  >
                    <Link to="/contact">
                      <span>Open {selectedProduct.name.split(' ')[0]} Account</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>NDIC Deposit Insured • No Hidden Charges</span>
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


