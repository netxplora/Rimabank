import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  PiggyBank, 
  Target, 
  CalendarClock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Calculator, 
  TrendingUp, 
  Coins, 
  Sparkles,
  Lock,
  Percent,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DownloadAppDialog } from "@/components/modals/DownloadAppDialog";

const savingsProducts = [
  {
    id: "regular-savings",
    icon: PiggyBank,
    title: "RIMA Regular Savings",
    category: "Everyday Flexibility",
    badge: "Daily Access",
    desc: "A hassle-free personal savings account offering instant liquidity, monthly interest credits, and zero maintenance charges.",
    interest: "Up to 4.5% p.a.",
    features: [
      "Zero minimum operating balance",
      "Instant access to funds anytime via ATM, POS, or App",
      "Interest calculated on daily balance and paid monthly",
      "Free instant Verve debit card on account opening",
      "No monthly account maintenance fee"
    ],
    color: "text-[#0284c7]",
    bg: "bg-sky-50",
    borderHover: "hover:border-sky-200"
  },
  {
    id: "target-savings",
    icon: Target,
    title: "RIMA Target Savings",
    category: "Goal-Oriented Discipline",
    badge: "Disciplined Growth",
    desc: "Save toward rent, school fees, business expansion, or festive celebrations with structured automated deductions and bonus yields.",
    interest: "Up to 8.0% p.a.",
    features: [
      "Set automated daily, weekly, or monthly savings frequency",
      "Custom maturity dates from 3 to 12 months",
      "Penalty-free withdrawal upon reaching target goal date",
      "Bonus interest yield on consistent non-withdrawal",
      "Direct milestone notifications via SMS & Mobile App"
    ],
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    borderHover: "hover:border-emerald-200"
  },
  {
    id: "fixed-deposit",
    icon: CalendarClock,
    title: "Fixed Term Deposit",
    category: "High-Yield Placement",
    badge: "Maximum Return",
    desc: "Lock away surplus capital for fixed durations between 30 and 365 days to lock in guaranteed premium interest returns.",
    interest: "Up to 12.5% p.a.",
    features: [
      "Tenure options: 30, 60, 90, 180, or 365 days",
      "Guaranteed upfront or maturity interest payout",
      "Fixed deposit certificate of investment issued immediately",
      "Can serve as cash collateral for emergency credit facilities",
      "Flexible rollover options upon tenure maturity"
    ],
    color: "text-purple-600",
    bg: "bg-purple-50",
    borderHover: "hover:border-purple-200"
  },
  {
    id: "market-esusu",
    icon: Coins,
    title: "Daily Market Sweep (Esusu)",
    category: "Traders & Artisans",
    badge: "Field Collector",
    desc: "A daily doorstep collection service tailored for market traders, food sellers, and artisans with instant digital SMS receipts.",
    interest: "Guaranteed Security",
    features: [
      "Daily doorstep cash collection by accredited RIMA field agents",
      "Instant SMS confirmation with unique reference code",
      "Protection from market theft and informal thrift risks",
      "Direct end-of-month transfer into main savings account",
      "No cumbersome paperwork required"
    ],
    color: "text-amber-600",
    bg: "bg-amber-50",
    borderHover: "hover:border-amber-200"
  }
];

export default function Savings() {
  const [showAppDialog, setShowAppDialog] = useState(false);
  // Calculator state
  const [depositAmount, setDepositAmount] = useState<number>(20000);
  const [durationMonths, setDurationMonths] = useState<number>(6);
  const [productType, setProductType] = useState<string>("target");

  const getInterestRate = () => {
    if (productType === "regular") return 0.045;
    if (productType === "target") return 0.08;
    return 0.125; // fixed deposit
  };

  const calculateEstimate = () => {
    const rate = getInterestRate();
    if (productType === "fixed") {
      // Fixed deposit single deposit compounding
      const interest = depositAmount * rate * (durationMonths / 12);
      return {
        totalSaved: depositAmount,
        interestEarned: Math.round(interest),
        totalPayout: Math.round(depositAmount + interest)
      };
    } else {
      // Recurring monthly contribution
      const totalContributed = depositAmount * durationMonths;
      // Approximation of recurring deposit interest
      const interest = totalContributed * (rate / 2) * (durationMonths / 12);
      return {
        totalSaved: totalContributed,
        interestEarned: Math.round(interest),
        totalPayout: Math.round(totalContributed + interest)
      };
    }
  };

  const estimate = calculateEstimate();

  return (
    <Layout
      title="Savings Accounts | RIMA Microfinance Bank"
      description="Grow your money safely with RIMA Microfinance Bank. Explore regular savings, target savings, fixed deposits, and daily market sweeps."
    >
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-5">
                <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
                Guaranteed Wealth Preservation
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight mb-6 leading-tight">
                Save with confidence. Grow with security.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                Whether you are building an emergency reserve, setting money aside for your children's education, or growing your business surplus, our savings plans offer competitive returns and rock-solid safety.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
                <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-7 shadow-sm" asChild>
                  <Link to="/contact">
                    Open a Savings Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-slate-200 text-[#0a1e3f] hover:bg-slate-50 px-6" asChild>
                  <a href="#calculator">Calculate Estimated Returns</a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 pt-6 border-t border-slate-100 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  NDIC Insured Protection
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7]" />
                  CBN Licensed Microfinance Bank
                </span>
                <span className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-purple-600" />
                  Zero Hidden Account Deductions
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Savings Products Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Savings Plans
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Explore our savings and investment plans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every plan is built to offer transparency, safety, and straightforward terms with no surprise maintenance deductions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {savingsProducts.map((p) => (
              <div 
                key={p.id}
                className={`bg-white border border-slate-200 rounded-3xl p-6 transition-all duration-300 ${p.borderHover} hover:shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center shadow-sm`}>
                      <p.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {p.badge}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#0284c7] mb-1">{p.category}</div>
                  <h3 className="font-heading font-bold text-xl text-[#0a1e3f] mb-2">{p.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">{p.desc}</p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-5">
                    <span className="text-[11px] text-slate-500 block">Indicative Rate:</span>
                    <strong className="text-sm text-[#0a1e3f] font-heading font-bold">{p.interest}</strong>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {p.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#0a1e3f]">
                          <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${p.color}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Savings Estimator */}
      <section id="calculator" className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
                Interactive Tool
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
                Calculate your projected savings growth
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Use our simple estimator to see how consistent contributions and interest accumulation can build your financial reserve over time.
              </p>

              <div className="space-y-6">
                {/* Product Selection */}
                <div>
                  <label className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider block mb-2">
                    Select Savings Plan
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "target", label: "Target Goal (8% p.a.)" },
                      { id: "regular", label: "Regular (4.5% p.a.)" },
                      { id: "fixed", label: "Fixed Deposit (12.5% p.a.)" }
                    ].map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setProductType(plan.id)}
                        className={`p-3 rounded-xl text-xs font-bold transition-all border text-left ${
                          productType === plan.id
                            ? "bg-[#0a1e3f] text-white border-[#0a1e3f]"
                            : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {plan.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider">
                      {productType === "fixed" ? "Deposit Principal" : "Monthly Contribution"}
                    </label>
                    <span className="font-heading font-bold text-base text-[#0284c7]">
                      ₦{depositAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full accent-[#0284c7] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>₦5,000</span>
                    <span>₦250,000</span>
                    <span>₦500,000</span>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider">
                      Savings Duration
                    </label>
                    <span className="font-heading font-bold text-base text-[#0284c7]">
                      {durationMonths} Months
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 9, 12].map((months) => (
                      <button
                        key={months}
                        onClick={() => setDurationMonths(months)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                          durationMonths === months
                            ? "bg-[#0284c7] text-white border-[#0284c7]"
                            : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {months} Months
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Estimator Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#0a1e3f] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">Projected Returns Summary</h3>
                    <p className="text-xs text-blue-200">Based on standard indicative annual yield</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-blue-200">Total Principal Saved</div>
                      <div className="font-heading font-bold text-lg text-white">
                        ₦{estimate.totalSaved.toLocaleString()}
                      </div>
                    </div>
                    <PiggyBank className="w-6 h-6 text-blue-300 opacity-60" />
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-emerald-300">Estimated Interest Yield</div>
                      <div className="font-heading font-bold text-lg text-emerald-400">
                        + ₦{estimate.interestEarned.toLocaleString()}
                      </div>
                    </div>
                    <TrendingUp className="w-6 h-6 text-emerald-400 opacity-80" />
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white flex justify-between items-center shadow-md">
                    <div>
                      <div className="text-xs font-semibold text-blue-100 uppercase tracking-wider">
                        Estimated Total Payout
                      </div>
                      <div className="font-heading font-bold text-2xl sm:text-3xl text-white">
                        ₦{estimate.totalPayout.toLocaleString()}
                      </div>
                    </div>
                    <Sparkles className="w-7 h-7 text-yellow-300" />
                  </div>
                </div>

                <div className="text-[11px] text-blue-200 leading-relaxed mb-6">
                  *Disclaimer: Estimates are for illustration purposes based on prevailing interest rates and non-breakage of tenure. Terms & conditions apply.
                </div>

                <Button className="w-full rounded-xl bg-white text-[#0a1e3f] hover:bg-slate-100 font-bold" asChild>
                  <Link to="/contact">Lock in This Savings Plan</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps to start saving */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Simple Process
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              How to start saving with RIMA Bank
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Open your savings account in three straightforward steps and start building your financial future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                step: "01",
                title: "Choose Your Savings Plan",
                desc: "Select whether you want everyday flexibility, a disciplined target goal, or high-yield fixed placement."
              },
              {
                step: "02",
                title: "Provide Basic Identification",
                desc: "Complete the account opening form with your NIN, BVN, phone number, and passport photograph."
              },
              {
                step: "03",
                title: "Make Your First Deposit",
                desc: "Fund your account at any branch, agent kiosk, or via direct mobile bank transfer to start earning interest."
              }
            ].map((s) => (
              <div key={s.step} className="bg-white border border-slate-200 rounded-3xl p-8 relative shadow-sm hover:shadow-md transition-all">
                <span className="font-heading font-bold text-3xl text-[#0284c7] block mb-4">{s.step}</span>
                <h3 className="font-heading font-bold text-lg text-[#0a1e3f] mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              size="lg"
              onClick={() => setShowAppDialog(true)}
              className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-8 cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Get the App to Save</span>
              </span>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full border-slate-300 text-[#0a1e3f] px-7" asChild>
              <Link to="/branches">Locate a Branch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Download App Dialog Popup */}
      <DownloadAppDialog open={showAppDialog} onOpenChange={setShowAppDialog} />
    </Layout>
  );
}
