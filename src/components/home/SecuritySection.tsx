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
    description: "All electronic banking data transmissions are protected using bank-grade cryptographic protocols.",
    bg: "#bcffbb",
    color: "#34c771"
  },
  {
    icon: Eye,
    title: "Continuous Fraud Surveillance",
    description: "24/7 transaction anomaly detection to prevent unauthorized access and suspicious withdrawals.",
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
    <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
            Safety & Protection
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
            Security standards that protect your funds and data.
          </h2>
          <p className="text-[#360802]/70 text-sm mt-3">
            We operate strict compliance protocols to maintain full deposit security and transaction confidentiality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-cards bg-white border border-[#e7dcdb] p-8 shadow-lift hover:border-[#f73b20]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
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

        {/* Regulatory Badges Strip */}
        <div className="mt-16 pt-8 border-t border-[#e7dcdb] flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3 text-xs font-semibold text-[#360802]">
            <div className="w-9 h-9 rounded-lg bg-[#fdedea] border border-[#e7dcdb] flex items-center justify-center font-bold text-[#f73b20]">
              CBN
            </div>
            <span>Central Bank of Nigeria</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-[#360802]">
            <div className="w-9 h-9 rounded-lg bg-[#bcffbb] border border-[#e7dcdb] flex items-center justify-center font-bold text-[#34c771]">
              NDIC
            </div>
            <span>Insured Deposits</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-[#360802]">
            <div className="w-9 h-9 rounded-lg bg-[#e7dcdb] border border-[#e7dcdb] flex items-center justify-center font-bold text-[#477ee9]">
              PCI
            </div>
            <span>DSS Compliant</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-[#360802]">
            <div className="w-9 h-9 rounded-lg bg-[#f5ffbb] border border-[#e7dcdb] flex items-center justify-center font-bold text-[#360802]">
              NIBSS
            </div>
            <span>Instant Settlement</span>
          </div>
        </div>
      </div>
    </section>
  );
}
