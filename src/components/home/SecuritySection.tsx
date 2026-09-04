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
    <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
              Safety & Protection
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Security standards that protect your funds and data.
            </h2>
          </div>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-sm md:text-right">
            Strict compliance protocols to maintain full deposit security and transaction confidentiality.
          </p>
        </div>

        {/* 4-Column Open Minimal Grid (No card containers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#e2e8f0] pt-10">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col justify-start"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: feature.bg, color: feature.color }}
              >
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f] mb-1.5">
                {feature.title}
              </h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Regulatory Strip - Clean minimal divider row */}
        <div className="mt-12 pt-8 border-t border-[#e2e8f0] grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center font-bold text-xs shrink-0">
              CBN
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0a1e3f]">Central Bank</div>
              <div className="text-[10px] text-[#64748b]">Licensed MFB</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center font-bold text-xs shrink-0">
              NDIC
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0a1e3f]">Insured Deposits</div>
              <div className="text-[10px] text-[#64748b]">Statutory Cover</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f0f7ff] text-[#0369a1] flex items-center justify-center font-bold text-xs shrink-0">
              PCI
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0a1e3f]">DSS Standard</div>
              <div className="text-[10px] text-[#64748b]">Card Security</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f8fafc] text-[#0a1e3f] flex items-center justify-center font-bold text-xs shrink-0">
              NIBSS
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0a1e3f]">Instant Settle</div>
              <div className="text-[10px] text-[#64748b]">Real-Time Switching</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
