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
  ShieldCheck,
  Percent,
  BadgeCheck,
  ChevronRight,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS } from "@/context/CMSContext";

interface LoanOption {
  id: string;
  name: string;
  purpose: string;
  tenure: string;
  badge: string;
  requirements: string[];
  icon: React.ElementType;
}

const defaultLoanOptions: LoanOption[] = [
  {
    id: "sme",
    name: "SME Working Capital",
    badge: "Popular for Businesses",
    purpose: "Support immediate operational cash flow, purchase commercial inventory, and fulfill urgent supplier orders.",
    tenure: "1 to 6 Months",
    requirements: [
      "Registered business enterprise with valid CAC documentation",
      "6 months active commercial bank turnover statement",
      "Valid Government ID & 2 verifiable business guarantors",
      "Proof of continuous business operating address"
    ],
    icon: Briefcase
  },
  {
    id: "expansion",
    name: "Business Expansion Loan",
    badge: "Medium Term",
    purpose: "Dedicated capital to open new retail locations, renovate commercial premises, or scale operating capacity.",
    tenure: "6 to 18 Months",
    requirements: [
      "Minimum 1 year verifiable commercial trading history",
      "Audited accounts or structured daily cash flow ledger",
      "Acceptable pledgeable business or personal asset",
      "Board resolution or owner authorization mandate"
    ],
    icon: Building2
  },
  {
    id: "microcredit",
    name: "Microcredit for Market Traders",
    badge: "Fast Turnaround",
    purpose: "Accessible fast-track loans for daily market traders, artisans, and neighborhood retail shop owners.",
    tenure: "1 to 3 Months",
    requirements: [
      "Active market stall or shop identity in Port Harcourt",
      "Consistent transaction record with RIMA Bank",
      "Cross-guarantee from recognized trader union or trade group",
      "Daily or weekly flexible repayment commitment"
    ],
    icon: Store
  },
  {
    id: "asset",
    name: "Equipment & Asset Financing",
    badge: "Asset Backed",
    purpose: "Acquire commercial power generators, delivery vans, POS payment terminals, and machinery.",
    tenure: "6 to 24 Months",
    requirements: [
      "Pro-forma invoice from an authorized equipment vendor",
      "20% equity contribution deposit with RIMA Bank",
      "Proof of ongoing cash flow to service amortized payments",
      "Comprehensive asset insurance during the facility term"
    ],
    icon: Truck
  },
  {
    id: "salary",
    name: "Salary Advance Facility",
    badge: "For Employees",
    purpose: "Emergency short-term financing for verified civil servants and private sector corporate employees.",
    tenure: "1 to 3 Months",
    requirements: [
      "Salary account domiciled with RIMA Microfinance Bank",
      "Official confirmation letter from current employer",
      "3 months recent payslips & valid corporate staff ID",
      "Direct salary deduction mandate authorization"
    ],
    icon: Wallet
  }
];

const defaultWorkflowSteps = [
  { step: "01", name: "Application", desc: "Submit your financing request online or at any RIMA branch office." },
  { step: "02", name: "Assessment", desc: "Our credit analysts review business turnover and trading records." },
  { step: "03", name: "Offer & Terms", desc: "Receive transparent credit terms, interest rates, and fee schedules." },
  { step: "04", name: "Disbursement", desc: "Approved funds are credited directly to your RIMA Bank account." },
  { step: "05", name: "Structured Repayment", desc: "Flexible weekly or monthly deductions matched to your cash cycle." },
];

const facilityIcons = [Briefcase, Building2, Store, Truck, Landmark];

export function FinancingSection() {
  const { siteContent } = useCMS();
  const fs = siteContent?.financingSection;

  const badge = fs?.badge || "Commercial & Personal Financing";
  const heading = fs?.heading || "Need funds to move forward?";
  const description = fs?.description || "Transparent, structured credit facilities designed to keep your business operating, support inventory purchases, and finance personal requirements.";
  const bgImage = fs?.backgroundImage || "/images/loans-activity.jpg";
  const workflow = fs?.workflowSteps && fs.workflowSteps.length > 0 ? fs.workflowSteps : defaultWorkflowSteps;

  const loanList: LoanOption[] = fs?.facilities && fs.facilities.length > 0
    ? fs.facilities.map((f: any, i: number) => ({
        id: f.id,
        name: f.name,
        badge: f.badge || "Verified Facility",
        purpose: f.tagline || f.purpose,
        tenure: f.tenure,
        requirements: f.requirements || ["Valid Identification & Proof of Address", "Active bank account history"],
        icon: facilityIcons[i % facilityIcons.length]
      }))
    : defaultLoanOptions;

  const [activeLoan, setActiveLoan] = useState<string>(loanList[0]?.id || "sme");
  const selectedLoan = loanList.find((l) => l.id === activeLoan) || loanList[0];
  const LoanIcon = selectedLoan.icon;

  return (
    <section className="relative py-16 sm:py-24 bg-[#f8fbff] text-[#0a1e3f] overflow-hidden border-b border-[#e2e8f0]">
      {/* Background Lighting & Dot Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(#0284c7 0.75px, transparent 0.75px), radial-gradient(#0a1e3f 0.75px, #f8fbff 0.75px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />
        <div className="absolute top-10 right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#38bdf8]/15 via-[#0284c7]/10 to-transparent blur-[100px]" />
        <div className="absolute bottom-10 left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#bae6fd]/25 to-transparent blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span>{badge}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight">
            {heading}
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* 5-Step Visual Process Pipeline */}
        <div className="mb-12 sm:mb-16 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#0a1e3f] tracking-tight">
                Transparent 5-Step Credit Lifecycle
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#0284c7]" />
              Average decision turnaround within 48 to 72 hours
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 relative">
            {workflow.map((item, idx) => (
              <div 
                key={item.step} 
                className="group relative bg-[#f8fbff] hover:bg-white border border-slate-200/80 hover:border-[#0284c7]/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 shadow-2xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="h-8 w-8 rounded-xl bg-white group-hover:bg-[#0284c7] text-[#0284c7] group-hover:text-white border border-slate-200 group-hover:border-[#0284c7] font-heading font-bold text-xs flex items-center justify-center transition-colors duration-200 shadow-2xs">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step {idx + 1}</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors">
                    {item.name}
                  </h4>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Financing Facility Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left: Facility Selector Tabs (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Financing Facility
              </span>
              <span className="text-[11px] text-[#0284c7] font-semibold">{loanList.length} Options</span>
            </div>

            <div className="space-y-2.5">
              {loanList.map((opt) => {
                const Icon = opt.icon;
                const isActive = activeLoan === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setActiveLoan(opt.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 flex items-center gap-3.5 border ${
                      isActive
                        ? "bg-[#0a1e3f] text-white border-[#0a1e3f] shadow-lg translate-x-1"
                        : "bg-white hover:bg-white/90 text-slate-700 border-slate-200/90 shadow-2xs hover:shadow-sm"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? "bg-[#0284c7] text-white" : "bg-sky-50 text-[#0284c7]"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`font-heading font-bold text-sm block truncate ${isActive ? "text-white" : "text-[#0a1e3f]"}`}>
                          {opt.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[11px] block truncate ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                          Tenure: {opt.tenure}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isActive ? "text-[#38bdf8] translate-x-0.5" : "text-slate-400"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Facility Dossier Console (8 cols on lg) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            
            {/* Top decorative accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0a1e3f]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLoan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="h-12 w-12 rounded-2xl bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center shrink-0 border border-[#0284c7]/20">
                      <LoanIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0a1e3f]">
                          {selectedLoan.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs">
                        <span className="text-[#0284c7] font-semibold flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Tenure: {selectedLoan.tenure}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {selectedLoan.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Regulated Rates</span>
                  </div>
                </div>

                {/* Facility Deployment Purpose */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <span>Facility Purpose & Commercial Use</span>
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed bg-[#f8fbff] p-4 rounded-2xl border border-slate-200/80">
                    {selectedLoan.purpose}
                  </p>
                </div>

                {/* Requirements Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Eligibility & Documentation Checklist
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedLoan.requirements.map((req, i) => (
                      <div 
                        key={i} 
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#0284c7]/40 transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <BadgeCheck className="h-4 w-4 text-[#0284c7]" />
                    <span>No hidden administrative surcharges</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                      variant="pill"
                      size="lg"
                      asChild
                      className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-11 px-7 shadow-md w-full sm:w-auto justify-center text-center"
                    >
                      <Link to="/contact" className="inline-flex items-center justify-center gap-2">
                        <span>Apply for {selectedLoan.name.split(' ')[0]} Loan</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}

