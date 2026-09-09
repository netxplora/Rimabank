import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Landmark,
  Briefcase,
  Store,
  Truck,
  Wallet,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Clock,
  Send,
  CreditCard,
  Building2,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface LoanOption {
  id: string;
  name: string;
  purpose: string;
  tenure: string;
  requirements: string[];
  icon: React.ElementType;
}

const loanOptions: LoanOption[] = [
  {
    id: "sme",
    name: "SME Working Capital Facility",
    purpose: "Support immediate operational cash flow, purchase commercial stock, and fulfill urgent customer orders.",
    tenure: "1 to 6 Months",
    requirements: [
      "Registered business enterprise with valid CAC certificate",
      "6 months active commercial bank statement",
      "Valid Government ID & 2 reliable guarantors"
    ],
    icon: Briefcase
  },
  {
    id: "expansion",
    name: "Business Expansion Loan",
    purpose: "Medium-term capital to open a new retail branch, renovate commercial shop space, or scale operations.",
    tenure: "6 to 18 Months",
    requirements: [
      "Minimum 1 year verifiable business trading history",
      "Audited accounts or structured cash flow ledger",
      "Acceptable pledgeable business or personal asset"
    ],
    icon: Building2
  },
  {
    id: "microcredit",
    name: "Microcredit for Market Traders",
    purpose: "Accessible fast-track loans for daily market traders, artisans, and neighborhood retailers.",
    tenure: "1 to 3 Months",
    requirements: [
      "Verifiable retail stall or shop location in Rivers State",
      "Active daily contribution or trade membership",
      "Valid identification & trade guarantor"
    ],
    icon: Store
  },
  {
    id: "asset",
    name: "Commercial Asset Financing",
    purpose: "Purchase delivery tricycles, power generators, commercial vehicles, and essential machinery.",
    tenure: "6 to 24 Months",
    requirements: [
      "Proforma invoice from an accredited equipment vendor",
      "20% to 30% equity contribution deposit",
      "Commercial viability assessment of asset"
    ],
    icon: Truck
  },
  {
    id: "salary",
    name: "Salary Advance Facility",
    purpose: "Emergency short-term financing for verified civil servants and private sector corporate employees.",
    tenure: "1 to 3 Months",
    requirements: [
      "Salary account domiciled with RIMA Bank",
      "Confirmation of employment letter from employer",
      "3 months recent payslips & staff ID card"
    ],
    icon: Wallet
  }
];

const workflowSteps = [
  { step: "01", name: "Apply", desc: "Submit your financing request online or at your nearest RIMA Bank branch." },
  { step: "02", name: "Assessment", desc: "Our credit committee reviews your business cash flow and documentation." },
  { step: "03", name: "Approval", desc: "Receive transparent credit terms, interest rates, and repayment schedule." },
  { step: "04", name: "Disbursement", desc: "Funds are credited directly to your RIMA Bank account upon acceptance." },
  { step: "05", name: "Repayment", desc: "Flexible monthly or weekly deductions structured around your sales cycle." },
];

export function FinancingSection() {
  const [activeLoan, setActiveLoan] = useState<string>("sme");
  const selectedLoan = loanOptions.find((l) => l.id === activeLoan) || loanOptions[0];
  const LoanIcon = selectedLoan.icon;

  return (
    <section className="relative py-16 sm:py-24 bg-[#f0f9ff] text-[#0a1e3f] overflow-hidden border-b border-[#bae6fd]/60">
      {/* Background Image with Blue Frosted Glass Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/media-sme.png"
          alt="Commercial & Personal Financing"
          className="w-full h-full object-cover object-center"
        />
        {/* Skyblue Brand Frosted Glass Overlay with Lower Opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f2fe]/75 via-[#f0f9ff]/60 to-[#bae6fd]/45 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-white/90 px-3.5 py-1.5 rounded-full border border-sky-200/80 shadow-2xs backdrop-blur-md inline-block mb-3.5">
            Commercial & Personal Financing
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            Need funds to move forward?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Transparent, accessible credit facilities designed to keep your business operating, support inventory purchases, and finance personal requirements.
          </p>
        </div>

        {/* 5-Step Visual Process Pipeline - Clean Open Linear Flow (No heavy outer card) */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center justify-between pb-3 mb-6 sm:mb-8 border-b border-slate-200/60">
            <h3 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-[#0a1e3f] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Transparent 5-Step Credit Lifecycle
            </h3>
            <span className="text-xs text-slate-500 hidden sm:inline-block">
              Fast assessment turnaround within 48-72 hours
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-4 relative">
            {workflowSteps.map((item, idx) => (
              <motion.div 
                key={item.step} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative flex flex-col items-start sm:items-center text-left sm:text-center p-3 sm:p-2"
              >
                <div className="flex items-center gap-3 sm:flex-col mb-2">
                  <span className="h-8 w-8 rounded-full bg-sky-100 text-[#0284c7] border border-sky-200 font-heading font-bold text-xs flex items-center justify-center shadow-xs group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-[#0a1e3f] flex items-center gap-1.5">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Financing Options Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Product Selector Tabs (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
              Select Financing Facility
            </span>
            {loanOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeLoan === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveLoan(opt.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 flex items-center gap-3.5 ${
                    isActive
                      ? "bg-[#0284c7] text-white shadow-md shadow-sky-500/20"
                      : "bg-white/85 backdrop-blur-md text-slate-700 hover:bg-white border border-white/80 shadow-2xs"
                  }`}
                >
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? "bg-white/20 text-white" : "bg-sky-50 text-[#0284c7]"
                  }`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-heading font-bold text-xs sm:text-sm block truncate">
                      {opt.name}
                    </span>
                    <span className={`text-[11px] block truncate ${isActive ? "text-sky-100" : "text-slate-400"}`}>
                      Tenure: {opt.tenure}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Loan Details & Requirements (8 cols) - Frosted Glass Container */}
          <div className="lg:col-span-8 bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/80 shadow-lg space-y-6 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLoan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                      <LoanIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0a1e3f]">
                        {selectedLoan.name}
                      </h3>
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                        <Clock className="h-3.5 w-3.5" />
                        Tenure: {selectedLoan.tenure}
                      </span>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-[#0284c7] border border-sky-100">
                    Competitive Rates
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Facility Purpose
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {selectedLoan.purpose}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Standard Eligibility & Required Documentation
                  </span>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    {selectedLoan.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#0284c7] shrink-0" />
                    <span>Subject to formal credit review & cash flow assessment.</span>
                  </div>

                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-11 px-7 shadow-brand"
                  >
                    <Link to="/contact">
                      <span>Apply for {selectedLoan.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

