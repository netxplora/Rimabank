import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Briefcase, 
  Store, 
  Truck, 
  Wallet, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  FileCheck2, 
  HelpCircle, 
  Clock, 
  UserCheck, 
  BadgePercent,
  BadgeAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const loanProducts = [
  {
    id: "microcredit",
    title: "Micro Trader Credit",
    icon: Store,
    category: "Retailers & Market Traders",
    badge: "Fast Approval",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-200",
    description: "Rapid short-term financing designed specifically for market women, artisans, shop owners, and retail vendors needing urgent capital to restock fast-moving inventory.",
    range: "₦50,000 to ₦1,000,000",
    tenure: "1 to 6 Months",
    repayment: "Weekly or Monthly",
    features: [
      "Minimal documentation requirements",
      "Guarantor-backed security structure without heavy collateral",
      "Rapid credit disbursement within 24 to 48 hours of verification",
      "Qualify for larger credit limits upon timely repeat repayments",
      "Direct guidance from assigned RIMA market officers"
    ]
  },
  {
    id: "sme-working-capital",
    title: "SME Working Capital",
    icon: Briefcase,
    category: "Growing Businesses & LLCs",
    badge: "Flexible Terms",
    bg: "bg-sky-50",
    iconColor: "text-[#0284c7]",
    borderHover: "hover:border-sky-200",
    description: "Working capital facilities structured for registered small businesses, supply contractors, and distributors to fulfill purchase orders and manage cash cycles.",
    range: "₦500,000 to ₦10,000,000",
    tenure: "3 to 12 Months",
    repayment: "Monthly structured installments",
    features: [
      "Credit size evaluated based on verifiable bank turnover",
      "Competitive microfinance interest pricing",
      "Grace period options aligned with vendor payment cycles",
      "Dedicated relationship officer to manage renewal",
      "Transparent fee schedule with zero hidden charges"
    ]
  },
  {
    id: "asset-financing",
    title: "Asset & Equipment Financing",
    icon: Truck,
    category: "Commercial Equipment",
    badge: "Machinery & Logistics",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    borderHover: "hover:border-amber-200",
    description: "Acquire revenue-generating equipment, delivery tricycles, power generators, processing mills, or commercial transport vehicles without depleting your operating reserves.",
    range: "₦200,000 to ₦5,000,000",
    tenure: "6 to 18 Months",
    repayment: "Structured Monthly",
    features: [
      "The acquired asset acts as primary security/collateral",
      "Low equity contribution (from 20% to 30%)",
      "Direct disbursement to accredited equipment suppliers",
      "Comprehensive asset insurance coverage included in tenure",
      "Full ownership transfer upon completion of payment"
    ]
  },
  {
    id: "salary-advance",
    title: "Salary Advance & Personal Loan",
    icon: Wallet,
    category: "Salaried Employees",
    badge: "Pre-Payday Cash",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    borderHover: "hover:border-purple-200",
    description: "Short-term liquidity for employees of verified private organizations, schools, hospitals, and civil service whose salary accounts are domiciled with RIMA Bank.",
    range: "Up to 50% of Net Monthly Salary",
    tenure: "30 Days (Rollable) or up to 6 Months",
    repayment: "Auto-deducted from salary inflow",
    features: [
      "Zero physical collateral required",
      "Instant processing once employer remittance mandate is confirmed",
      "Manage emergency medical bills, school fees, or household repairs",
      "Transparent one-off management fee",
      "Simple renewal upon monthly salary liquidation"
    ]
  }
];

export default function LoanServices() {
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [loanDuration, setLoanDuration] = useState<number>(6);
  const [selectedLoanType, setSelectedLoanType] = useState<string>("microcredit");

  // Interest rate assumptions: microcredit ~ 3.5% monthly flat, SME ~ 2.8% monthly flat, Asset ~ 3.0%, Salary ~ 3.0%
  const getMonthlyRate = () => {
    if (selectedLoanType === "microcredit") return 0.035;
    if (selectedLoanType === "sme-working-capital") return 0.028;
    if (selectedLoanType === "asset-financing") return 0.03;
    return 0.03;
  };

  const calculateRepayment = () => {
    const monthlyRate = getMonthlyRate();
    const totalInterest = loanAmount * monthlyRate * loanDuration;
    const totalPayable = loanAmount + totalInterest;
    const monthlyInstallment = totalPayable / loanDuration;

    return {
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
      monthlyInstallment: Math.round(monthlyInstallment)
    };
  };

  const calculation = calculateRepayment();

  return (
    <Layout
      title="Loans & Financing | RIMA Microfinance Bank"
      description="Accessible, transparent microfinance loans for traders, small business owners, artisans, and salaried workers across Rivers State."
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
                <BadgePercent className="w-3.5 h-3.5 text-[#0284c7]" />
                Accessible Credit Solutions
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight mb-6 leading-tight">
                Practical financing to keep your business moving forward.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                We believe lack of access to fair capital should never hold your enterprise back. RIMA Microfinance Bank offers transparent credit facilities designed to match your real-world cash flow.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-7 shadow-sm" asChild>
                  <Link to="/contact">
                    Apply for a Loan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-slate-200 text-[#0a1e3f] hover:bg-slate-50 px-6" asChild>
                  <a href="#calculator">Estimate Monthly Repayment</a>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0a1e3f]">24–48h</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Rapid Micro Disbursement</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0284c7]">No Hidden</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Surprise Charges</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-600">Flexible</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Repayment Schedules</div>
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
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Credit Charter</span>
                    <h3 className="font-heading font-bold text-xl">Responsible Lending</h3>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>

                <div className="space-y-4 text-sm text-blue-100 leading-relaxed mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-xs">Clear Terms Before Signing</strong>
                      <span className="text-xs text-blue-200">Full disclosure of principal, interest, and schedule before approval.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-xs">Cash-Flow Aligned</strong>
                      <span className="text-xs text-blue-200">Repayments tailored to your real market sales or monthly payday.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-xs">Advisory & Support</strong>
                      <span className="text-xs text-blue-200">Our credit officers advise you on the right facility size to avoid over-leverage.</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold" asChild>
                  <Link to="/contact">Speak to a Credit Officer</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Products Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Financing Options
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Explore our loan packages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tailored credit options structured to support small business expansion, retail restocking, and personal liquidity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {loanProducts.map((loan) => (
              <div 
                key={loan.id}
                id={loan.id}
                className={`bg-white border border-slate-200 rounded-3xl p-7 transition-all duration-300 ${loan.borderHover} hover:shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${loan.bg} ${loan.iconColor} flex items-center justify-center shadow-sm`}>
                      <loan.icon className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {loan.badge}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#0284c7] mb-1">{loan.category}</div>
                  <h3 className="font-heading font-bold text-2xl text-[#0a1e3f] mb-3">{loan.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{loan.description}</p>

                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-6 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Facility Size:</span>
                      <strong className="text-[#0a1e3f] font-heading font-bold">{loan.range}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Tenure:</span>
                      <strong className="text-[#0a1e3f] font-heading font-bold">{loan.tenure}</strong>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Key Benefits</h4>
                    <ul className="space-y-3">
                      {loan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0a1e3f]">
                          <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${loan.iconColor}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button variant="outline" className="w-full justify-between rounded-xl group border-slate-200 text-[#0a1e3f] hover:border-[#0284c7] hover:text-[#0284c7]" asChild>
                  <Link to="/contact">
                    <span>Apply for this Facility</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-1 transition-all" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Repayment Calculator */}
      <section id="calculator" className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
                Repayment Estimator
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
                Calculate your estimated monthly installment
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Adjust the requested loan principal and repayment duration to get a clear estimate of your monthly installment before applying.
              </p>

              <div className="space-y-6">
                {/* Loan Type */}
                <div>
                  <label className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider block mb-2">
                    Select Loan Package
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "microcredit", label: "Micro Trader Credit" },
                      { id: "sme-working-capital", label: "SME Working Capital" },
                      { id: "asset-financing", label: "Asset Financing" },
                      { id: "salary-advance", label: "Salary Advance" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedLoanType(item.id)}
                        className={`p-3 rounded-xl text-xs font-bold transition-all border text-left ${
                          selectedLoanType === item.id
                            ? "bg-[#0a1e3f] text-white border-[#0a1e3f]"
                            : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider">
                      Requested Loan Amount
                    </label>
                    <span className="font-heading font-bold text-base text-[#0284c7]">
                      ₦{loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="25000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-[#0284c7] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>₦50,000</span>
                    <span>₦1,000,000</span>
                    <span>₦2,000,000</span>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#0a1e3f] uppercase tracking-wider">
                      Repayment Duration
                    </label>
                    <span className="font-heading font-bold text-base text-[#0284c7]">
                      {loanDuration} Months
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 6, 12].map((m) => (
                      <button
                        key={m}
                        onClick={() => setLoanDuration(m)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                          loanDuration === m
                            ? "bg-[#0284c7] text-white border-[#0284c7]"
                            : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {m} {m === 1 ? "Month" : "Months"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Output Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#0a1e3f] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">Repayment Estimate</h3>
                    <p className="text-xs text-blue-200">Based on standard indicative monthly terms</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-blue-200">Principal Amount</div>
                      <div className="font-heading font-bold text-lg text-white">
                        ₦{loanAmount.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400">{loanDuration} Months</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-slate-300">Estimated Total Interest</div>
                      <div className="font-heading font-bold text-lg text-blue-300">
                        ₦{calculation.totalInterest.toLocaleString()}
                      </div>
                    </div>
                    <BadgePercent className="w-5 h-5 text-blue-300 opacity-80" />
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white flex justify-between items-center shadow-md">
                    <div>
                      <div className="text-xs font-semibold text-blue-100 uppercase tracking-wider">
                        Estimated Monthly Installment
                      </div>
                      <div className="font-heading font-bold text-2xl sm:text-3xl text-white">
                        ₦{calculation.monthlyInstallment.toLocaleString()}
                        <span className="text-xs text-blue-200 font-normal"> /mo</span>
                      </div>
                    </div>
                    <Clock className="w-7 h-7 text-sky-200" />
                  </div>
                </div>

                <div className="text-[11px] text-blue-200 leading-relaxed mb-6">
                  *Disclaimer: Estimates are indicative and subject to final credit appraisal, guarantor verification, and cash-flow assessment.
                </div>

                <Button className="w-full rounded-xl bg-white text-[#0a1e3f] hover:bg-slate-100 font-bold" asChild>
                  <Link to="/contact">Proceed to Loan Application</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Application Lifecycle */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Application Lifecycle
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              How our loan process works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A transparent 4-stage process designed to get you financed promptly with clear communication throughout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Application & Discovery",
                desc: "Visit any RIMA branch or contact an officer to fill the application form and state your financial requirement."
              },
              {
                step: "02",
                title: "Business Assessment",
                desc: "Our credit officer visits your business premises or reviews your salary history to evaluate cash flow feasibility."
              },
              {
                step: "03",
                title: "Guarantor & Approval",
                desc: "Receive your clear loan offer letter detailing repayment schedule, fees, and guarantor documentation."
              },
              {
                step: "04",
                title: "Direct Disbursement",
                desc: "Upon mandate signing, the funds are credited directly to your RIMA account for immediate use."
              }
            ].map((s) => (
              <div key={s.step} className="bg-white border border-slate-200 rounded-3xl p-7 relative shadow-sm hover:shadow-md transition-all">
                <span className="font-heading font-bold text-2xl text-[#0284c7] block mb-3">{s.step}</span>
                <h3 className="font-heading font-bold text-lg text-[#0a1e3f] mb-2">{s.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Requirements Box */}
          <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-8 max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#0a1e3f]">General Loan Requirements</h3>
                <p className="text-xs text-slate-500">Documents needed for credit appraisal</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                "Duly completed RIMA Loan Application Form",
                "Valid Government ID (NIN, Voter's Card, Driver's License)",
                "Two recent passport-sized photographs",
                "Proof of residence & business premises (recent utility bill)",
                "Bank statements for the last 6 months (for SMEs/salaried staff)",
                "Completed Guarantor Form with valid identification"
              ].map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0a1e3f] bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Ready to take the next step for your business? Visit our credit desk today.
              </div>
              <Button className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shrink-0" asChild>
                <Link to="/contact">Apply for a Facility</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
