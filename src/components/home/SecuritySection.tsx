import { Shield, Lock, Eye, FileCheck, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const securityFeatures = [
  {
    icon: Shield,
    title: "Central Bank of Nigeria Regulation",
    description: "Fully licensed by the Central Bank of Nigeria under statutory microfinance bank regulations and guidelines.",
    bg: "bg-sky-50 text-[#0284c7] border-sky-200/80"
  },
  {
    icon: Lock,
    title: "256-Bit Bank Grade Encryption",
    description: "All electronic data transmissions and account transactions are safeguarded with standard cryptographic protocols.",
    bg: "bg-blue-50 text-[#0369a1] border-blue-200/80"
  },
  {
    icon: Eye,
    title: "Continuous Fraud Surveillance",
    description: "24/7 automated transaction monitoring to prevent unauthorized withdrawals, suspicious logins, and identity theft.",
    bg: "bg-emerald-50 text-emerald-600 border-emerald-200/80"
  },
  {
    icon: FileCheck,
    title: "NDIC Statutory Deposit Insurance",
    description: "Customer savings, target deposits, and fixed term deposits are insured by the Nigeria Deposit Insurance Corporation.",
    bg: "bg-amber-50 text-amber-700 border-amber-200/80"
  },
];

export function SecuritySection() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#ffffff] border-b border-slate-200/80 overflow-hidden text-[#0a1e3f]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>Safety & Statutory Protection</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              Rigorous security protocols protecting your funds and privacy.
            </h2>
          </div>

          <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed max-w-md md:text-right">
            We adhere to strict regulatory compliance standards to guarantee the confidentiality and protection of every deposit.
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#f8fbff] hover:bg-white border border-slate-200/90 hover:border-[#0284c7]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-xl group"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300 ${feature.bg}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                
                <h3 className="font-heading text-base font-bold text-[#0a1e3f] mb-2 leading-snug group-hover:text-[#0284c7] transition-colors">
                  {feature.title}
                </h3>
                
                <p className="font-sans text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Verified Compliance</span>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Strip */}
        <div className="mt-12 sm:mt-16 p-6 rounded-3xl bg-[#f8fbff] border border-slate-200/80 shadow-2xs grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0284c7] flex items-center justify-center font-bold text-xs shrink-0 border border-[#bae6fd] shadow-2xs">
              CBN
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#0a1e3f]">Central Bank</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500">Licensed Microfinance Bank</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200 shadow-2xs">
              NDIC
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#0a1e3f]">Insured Deposits</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500">Statutory Protection</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0369a1] flex items-center justify-center font-bold text-xs shrink-0 border border-sky-200 shadow-2xs">
              NIBSS
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#0a1e3f]">Instant Transfer</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500">Direct Clearing Network</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0a1e3f] flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200 shadow-2xs">
              256b
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#0a1e3f]">TLS Protected</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500">Encrypted Communication</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

