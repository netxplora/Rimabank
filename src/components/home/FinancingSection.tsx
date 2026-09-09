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
import { useCMS } from "@/context/CMSContext";

interface LoanOption {
  id: string;
  name: string;
  purpose: string;
  tenure: string;
  requirements: string[];
  icon: React.ElementType;
}

const defaultLoanOptions: LoanOption[] = [
  {
    id: "sme",
    name: "SME Working Capital",
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
      "Active market stall or shop identity in Port Harcourt",
      "Regular cash flow history with RIMA Bank",
      "Cross-guarantee from recognized trader union or association"
    ],
    icon: Store
  },
  {
    id: "asset",
    name: "Equipment & Asset Financing",
    purpose: "Acquire commercial generators, delivery vehicles, POS terminals, and essential machinery.",
    tenure: "6 to 24 Months",
    requirements: [
      "Pro-forma invoice from authorized equipment vendor",
      "20% equity contribution deposit",
      "Proof of continuous business operations"
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

const defaultWorkflowSteps = [
  { step: "01", name: "Apply", desc: "Submit your financing request online or at your nearest RIMA Bank branch." },
  { step: "02", name: "Assessment", desc: "Our credit team reviews your business turnover and trading history." },
  { step: "03", name: "Approval", desc: "Receive transparent credit terms, fee details, and repayment schedule." },
  { step: "04", name: "Disbursement", desc: "Funds are credited directly to your RIMA Bank checking or savings account." },
  { step: "05", name: "Repayment", desc: "Flexible weekly or monthly deductions structured around your sales cycle." },
];

const facilityIcons = [Briefcase, Building2, Store, Truck, Landmark];

export function FinancingSection() {
  const { siteContent } = useCMS();
  const fs = siteContent?.financingSection;

  const badge = fs?.badge || "Commercial & Personal Financing";
  const heading = fs?.heading || "Need funds to move forward?";
  const description = fs?.description || "Transparent, accessible credit facilities designed to keep your business operating, support inventory purchases, and finance personal requirements.";
  const bgImage = fs?.backgroundImage || "/images/media-sme.png";
  const workflow = fs?.workflowSteps && fs.workflowSteps.length > 0 ? fs.workflowSteps : defaultWorkflowSteps;

  const loanList: LoanOption[] = fs?.facilities && fs.facilities.length > 0
    ? fs.facilities.map((f: any, i: number) => ({
        id: f.id,
        name: f.name,
        purpose: f.tagline,
        tenure: f.tenure,
        requirements: f.requirements || ["Valid Identification & Proof of Address", "Active bank account history"],
        icon: facilityIcons[i % facilityIcons.length]
      }))
    : defaultLoanOptions;

  const [activeLoan, setActiveLoan] = useState<string>(loanList[0]?.id || "sme");
  const selectedLoan = loanList.find((l) => l.id === activeLoan) || loanList[0];
  const LoanIcon = selectedLoan.icon;

  return (
    <section className="relative py-12 sm:py-20 bg-[#f0f9ff] text-[#0a1e3f] overflow-hidden border-b border-[#bae6fd]/60">
      {/* Background Image with Blue Frosted Glass Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Commercial & Personal Financing"
          className="w-full h-full object-cover object-center"
        />
        {/* Skyblue Brand Frosted Glass Overlay with Lower Opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f2fe]/85 via-[#f0f9ff]/70 to-[#bae6fd]/55 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-white/95 px-3.5 py-1.5 rounded-full border border-sky-200/80 shadow-2xs backdrop-blur-md inline-block mb-3">
            {badge}
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* 5-Step Visual Process Pipeline - Responsive Grid (2 cols on mobile, 5 cols on desktop) */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center justify-between pb-2.5 mb-4 sm:mb-6 border-b border-slate-200/60">
            <h3 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-[#0a1e3f] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Transparent 5-Step Credit Lifecycle
            </h3>
            <span className="text-xs text-slate-500 hidden sm:inline-block">
              Assessment turnaround within 48-72 hours
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 relative">
            {workflow.map((item, idx) => {
              const isLastOnMobile = idx === 4 && workflow.length === 5;
              return (
                <div 
                  key={item.step} 
                  className={`bg-white/80 backdrop-blur-sm border border-sky-100 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between ${
                    isLastOnMobile ? "col-span-2 sm:col-span-1 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-sky-100 text-[#0284c7] border border-sky-200 font-heading font-bold text-[10px] sm:text-xs flex items-center justify-center">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#0a1e3f]">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Financing Options Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Left: Product Selector Tabs (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2 px-1">
              Select Financing Facility
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {loanList.map((opt) => {
                const Icon = opt.icon;
                const isActive = activeLoan === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setActiveLoan(opt.id)}
                    className={`w-full text-left p-3 rounded-xl sm:rounded-2xl transition-all duration-200 flex items-center gap-3 ${
                      isActive
                        ? "bg-[#0284c7] text-white shadow-sm"
                        : "bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white border border-white/80 shadow-2xs"
                    }`}
                  >
                    <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? "bg-white/20 text-white" : "bg-sky-50 text-[#0284c7]"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-heading font-bold text-xs sm:text-sm block truncate">
                        {opt.name}
                      </span>
                      <span className={`text-[10px] sm:text-[11px] block truncate ${isActive ? "text-sky-100" : "text-slate-500"}`}>
                        Tenure: {opt.tenure}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Loan Details & Requirements (8 cols) - Frosted Glass Container */}
          <div className="lg:col-span-8 bg-white/90 backdrop-blur-md p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/80 shadow-sm space-y-5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLoan.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="flex items-start justify-between gap-4 pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-sky-50 text-[#0284c7] border border-sky-100 flex items-center justify-center shrink-0">
                      <LoanIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f]">
                        {selectedLoan.name}
                      </h3>
                      <span className="text-xs text-[#0284c7] font-semibold flex items-center gap-1 mt-0.5">
                        <Clock className="h-3.5 w-3.5" />
                        Tenure: {selectedLoan.tenure}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Facility Purpose & Deployment
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {selectedLoan.purpose}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Documentation & Eligibility Requirements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedLoan.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-[#f0f9ff]/60 p-2.5 rounded-lg border border-[#bae6fd]/50">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-[#0284c7]" />
                    <span>No hidden administrative fees</span>
                  </div>

                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 px-6 shadow-brand w-full sm:w-auto text-center"
                  >
                    <Link to="/contact" className="inline-flex items-center justify-center gap-1.5">
                      <span>Apply for {selectedLoan.name.split(' ')[0]} Facility</span>
                      <ArrowRight className="h-3.5 w-3.5" />
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
