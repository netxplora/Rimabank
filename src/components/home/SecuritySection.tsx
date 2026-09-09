import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "CBN Regulatory License",
    description: "Fully licensed by the Central Bank of Nigeria under statutory microfinance guidelines.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: Lock,
    title: "TLS 256-Bit Encryption",
    description: "All electronic banking data transmissions are protected using standard cryptographic protocols.",
    bg: "#e0f2fe",
    color: "#0369a1"
  },
  {
    icon: Eye,
    title: "Fraud Surveillance",
    description: "24/7 transaction monitoring to prevent unauthorized access and suspicious withdrawals.",
    bg: "#f0fdf4",
    color: "#16a34a"
  },
  {
    icon: FileCheck,
    title: "NDIC Deposit Guarantee",
    description: "Customer savings and fixed deposits are insured by the Nigeria Deposit Insurance Corporation.",
    bg: "#f8fafc",
    color: "#0a1e3f"
  },
];

export function SecuritySection() {
  return (
    <section className="py-12 sm:py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
              Safety & Protection
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              Security standards that protect your funds and data.
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm md:text-right">
            Strict compliance protocols to maintain full deposit security and transaction confidentiality.
          </p>
        </div>

        {/* 4-Column Responsive Grid (2 cols on mobile, 2 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 border-t border-[#bae6fd]/60 pt-6 sm:pt-10">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#f0f9ff]/40 hover:bg-[#f0f9ff] border border-[#bae6fd]/50 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col justify-start transition-colors"
            >
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-2.5 sm:mb-3.5 shrink-0"
                style={{ backgroundColor: feature.bg, color: feature.color }}
              >
                <feature.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="font-heading text-xs sm:text-base font-bold text-[#0a1e3f] mb-1 leading-snug">
                {feature.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Regulatory Strip - Clean minimal divider row */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#bae6fd]/60 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 border border-sky-100">
              CBN
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-[#0a1e3f]">Central Bank</div>
              <div className="text-[9px] sm:text-[10px] text-slate-500">Licensed MFB</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 border border-emerald-100">
              NDIC
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-[#0a1e3f]">Insured Deposits</div>
              <div className="text-[9px] sm:text-[10px] text-slate-500">Statutory Cover</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#f0f7ff] text-[#0369a1] flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 border border-sky-100">
              NIBSS
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-[#0a1e3f]">Instant Transfer</div>
              <div className="text-[9px] sm:text-[10px] text-slate-500">Direct Settlement</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#f8fafc] text-[#0a1e3f] flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 border border-slate-200">
              256b
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-[#0a1e3f]">TLS Protected</div>
              <div className="text-[9px] sm:text-[10px] text-slate-500">Encrypted Data</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
