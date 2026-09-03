import { Link } from "react-router-dom";
import { CreditCard, Shield, Zap, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const cardFeatures = [
  {
    icon: Zap,
    title: "Instant Branch Issuance",
    description: "Receive and activate your debit card immediately upon account opening at any branch.",
    color: "#f73b20",
    bg: "#fdedea"
  },
  {
    icon: Shield,
    title: "EMV Chip & PIN Security",
    description: "Industry-standard cryptographic microchip protecting against unauthorized card cloning.",
    color: "#34c771",
    bg: "#bcffbb"
  },
  {
    icon: Smartphone,
    title: "Nationwide ATM & POS Access",
    description: "Withdraw cash and make merchant purchases across all Nigerian commercial banks and retail POS terminals.",
    color: "#477ee9",
    bg: "#e7dcdb"
  },
];

export function CardServicesSection() {
  return (
    <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Card Showcase (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-cards bg-[#fdedea] border border-[#e7dcdb] p-8 shadow-lift flex flex-col items-center text-center">
              {/* Card visual container */}
              <div className="w-full max-w-sm rounded-2xl bg-[#360802] p-6 text-white text-left shadow-soft relative overflow-hidden mb-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest block">Rima Bank</span>
                    <span className="font-heading text-base font-medium">Debit Card</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#f73b20] flex items-center justify-center font-bold text-xs">
                    R
                  </div>
                </div>

                <div className="w-9 h-7 rounded bg-amber-400/80 mb-6 flex items-center justify-center">
                  <div className="w-6 h-4 border border-black/40 rounded-sm"></div>
                </div>

                <div className="font-mono text-sm tracking-widest text-white/90 mb-4">
                  5399 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 8821
                </div>

                <div className="flex justify-between items-end text-[10px] text-white/60">
                  <span>VALID THRU: 12/28</span>
                  <span className="font-bold text-white tracking-widest text-xs">VERVE</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#360802]">Linked to Personal or Business Accounts</div>
                <p className="text-xs text-[#ababab]">Zero annual card maintenance charge on basic savings tier.</p>
              </div>
            </div>
          </div>

          {/* Content Column (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block">
              Payment Instruments
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
              Secure payment access whenever and wherever you need it.
            </h2>
            <p className="text-[#360802]/80 text-base leading-relaxed">
              Rima MFB debit cards allow seamless in-store purchases, utility settlements, and cash withdrawals across all ATMs throughout Nigeria.
            </p>

            <div className="space-y-4 pt-2">
              {cardFeatures.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#e7dcdb] shadow-lift">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#360802]">{item.title}</h3>
                    <p className="text-xs text-[#ababab] mt-0.5 leading-normal">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/contact">
                  Request Card at Branch
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
