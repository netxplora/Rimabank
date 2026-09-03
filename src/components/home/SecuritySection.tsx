import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "CBN Regulatory License",
    description: "Fully licensed by the Central Bank of Nigeria under statutory microfinance guidelines.",
    bg: "#fdedea",
    color: "#f73b20"
  },
  {
    icon: Lock,
    title: "TLS 256-Bit Data Encryption",
    description: "All electronic banking data transmissions are protected using standard cryptographic protocols.",
    bg: "#bcffbb",
    color: "#34c771"
  },
  {
    icon: Eye,
    title: "Fraud Surveillance",
    description: "24/7 transaction monitoring to prevent unauthorized access and suspicious withdrawals.",
    bg: "#e7dcdb",
    color: "#477ee9"
  },
  {
    icon: FileCheck,
    title: "NDIC Deposit Guarantee",
    description: "Customer savings and fixed deposits are insured by the Nigeria Deposit Insurance Corporation.",
    bg: "#f5ffbb",
    color: "#360802"
  },
];

export function SecuritySection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-12">
          <div className="md:col-span-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
              Safety & Protection
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Security standards that protect your funds and data.
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-[#ababab] text-sm leading-relaxed">
              Strict compliance protocols to maintain full deposit security and transaction confidentiality.
            </p>
          </div>
        </div>

        {/* 4-Column Responsive 3D Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="card-3d rounded-2xl bg-white border border-[#e7dcdb] p-6 shadow-3d hover:border-[#f73b20]/30 flex flex-col justify-between"
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: feature.bg, color: feature.color }}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-semibold text-[#360802] mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#ababab] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Badges 4-Column Grid Strip */}
        <div className="mt-12 pt-8 border-t border-[#e7dcdb] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-[#fdedea]/60 border border-[#e7dcdb] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#e7dcdb] flex items-center justify-center font-bold text-[#f73b20] text-sm shadow-xs shrink-0">
              CBN
            </div>
            <div>
              <div className="text-xs font-bold text-[#360802]">Central Bank</div>
              <div className="text-[10px] text-[#ababab]">Licensed MFB</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#bcffbb]/30 border border-[#e7dcdb] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#e7dcdb] flex items-center justify-center font-bold text-[#34c771] text-sm shadow-xs shrink-0">
              NDIC
            </div>
            <div>
              <div className="text-xs font-bold text-[#360802]">Insured Deposits</div>
              <div className="text-[10px] text-[#ababab]">Statutory Cover</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#e7dcdb]/40 border border-[#e7dcdb] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#e7dcdb] flex items-center justify-center font-bold text-[#477ee9] text-sm shadow-xs shrink-0">
              PCI
            </div>
            <div>
              <div className="text-xs font-bold text-[#360802]">DSS Standard</div>
              <div className="text-[10px] text-[#ababab]">Card Security</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#f5ffbb]/40 border border-[#e7dcdb] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#e7dcdb] flex items-center justify-center font-bold text-[#360802] text-sm shadow-xs shrink-0">
              NIBSS
            </div>
            <div>
              <div className="text-xs font-bold text-[#360802]">Instant Settle</div>
              <div className="text-[10px] text-[#ababab]">Real-Time Switching</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
