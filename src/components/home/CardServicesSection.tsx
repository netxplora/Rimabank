import { Link } from "react-router-dom";
import { Shield, Zap, Smartphone, ArrowRight, Wifi } from "lucide-react";
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
    <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* 3D Visual Card Showcase (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1 perspective-1000">
            <div className="rounded-2xl bg-gradient-to-br from-[#fdedea] to-white border border-[#e7dcdb] p-6 sm:p-8 shadow-3d-lift flex flex-col items-center text-center">
              
              {/* Realistic 3D Debit Card with Tilt */}
              <div className="w-full max-w-sm rounded-2xl bg-gradient-to-tr from-[#360802] via-[#4a0d06] to-[#250501] p-6 text-white text-left shadow-2xl relative overflow-hidden transform-3d-card border border-white/20">
                {/* Metallic holographic sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <span className="text-[10px] text-white/60 uppercase tracking-widest block font-medium">
                      Rima Microfinance Bank
                    </span>
                    <span className="font-heading text-sm font-semibold tracking-wide text-white">
                      Debit Card
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#f73b20] flex items-center justify-center font-bold text-xs shadow-md">
                    R
                  </div>
                </div>

                {/* EMV Chip & Contactless */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-10 h-7 rounded-md bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 border border-amber-600/40 shadow-inner flex items-center justify-center">
                    <div className="w-7 h-4 border border-black/30 rounded-xs grid grid-cols-2 gap-0.5">
                      <div className="border-r border-black/20"></div>
                      <div></div>
                    </div>
                  </div>
                  <Wifi className="h-5 w-5 text-white/70 rotate-90" />
                </div>

                {/* Card Number */}
                <div className="font-mono text-sm sm:text-base tracking-[0.2em] text-white/95 mb-5 relative z-10 drop-shadow-sm font-medium">
                  5399 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 8821
                </div>

                {/* Card Holder & Expiry */}
                <div className="flex justify-between items-end text-[10px] text-white/70 relative z-10 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-white/50 block">Card Holder</span>
                    <span className="font-semibold text-white/90">E. OKONKWO</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] uppercase tracking-widest text-white/50 block">Expires</span>
                    <span className="font-semibold text-white/90">12/28</span>
                  </div>
                  <span className="font-bold text-white tracking-widest text-sm bg-white/15 px-2 py-0.5 rounded">
                    VERVE
                  </span>
                </div>
              </div>

              <div className="space-y-1 mt-6 pt-4 border-t border-[#e7dcdb] w-full">
                <div className="text-xs font-semibold text-[#360802]">Linked to Personal or Business Accounts</div>
                <p className="text-[11px] text-[#ababab]">Zero annual card maintenance charge on basic savings tier.</p>
              </div>
            </div>
          </div>

          {/* Content Column (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block">
              Payment Instruments
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Secure payment access whenever and wherever you need it.
            </h2>
            <p className="text-[#360802]/80 text-base leading-relaxed">
              Rima MFB debit cards allow seamless in-store purchases, utility settlements, and cash withdrawals across all ATMs throughout Nigeria.
            </p>

            {/* Feature List (No card containers) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#e7dcdb]/60">
              {cardFeatures.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-xs font-semibold text-[#360802] mb-1">{item.title}</h3>
                  <p className="text-[11px] text-[#ababab] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/contact">
                  Request Card at Branch
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
