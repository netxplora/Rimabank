import { Link } from "react-router-dom";
import { Shield, Zap, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cardFeatures = [
  {
    icon: Zap,
    title: "Instant Branch Issuance",
    description: "Receive and activate your debit card immediately upon account opening at any branch.",
    color: "#0284c7",
    bg: "#f0f7ff"
  },
  {
    icon: Shield,
    title: "EMV Chip & PIN Security",
    description: "Industry-standard cryptographic microchip protecting against unauthorized card cloning.",
    color: "#10b981",
    bg: "#dcfce7"
  },
  {
    icon: Smartphone,
    title: "Nationwide ATM & POS Access",
    description: "Withdraw cash and make merchant purchases across all Nigerian commercial banks and retail POS terminals.",
    color: "#0284c7",
    bg: "#e0f2fe"
  },
];

export function CardServicesSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Official ATM Card Photo (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-2xl bg-gradient-to-br from-[#f0f7ff] to-white border border-[#e2e8f0] p-6 sm:p-8 flex flex-col items-center text-center">
              <div className="relative group w-full max-w-sm">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-sky-100/60 blur-2xl scale-90 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/images/atm-card.jpg"
                  alt="Rima MFB Official Debit Card"
                  className="w-full h-auto object-contain drop-shadow-xl transform group-hover:-rotate-1 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="space-y-1 mt-6 pt-4 border-t border-[#e2e8f0] w-full">
                <div className="text-xs font-semibold text-[#0a1e3f]">Linked to Personal or Business Accounts</div>
                <p className="text-[11px] text-[#64748b]">Zero annual card maintenance charge on basic savings tier.</p>
              </div>
            </div>
          </div>

          {/* Content Column (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block">
              Payment Instruments
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Secure payment access whenever and wherever you need it.
            </h2>
            <p className="text-[#0a1e3f]/80 text-base leading-relaxed">
              Rima MFB debit cards allow seamless in-store purchases, utility settlements, and cash withdrawals across all ATMs throughout Nigeria.
            </p>

            {/* Feature List (No card containers) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#e2e8f0]">
              {cardFeatures.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-xs font-semibold text-[#0a1e3f] mb-1">{item.title}</h3>
                  <p className="text-[11px] text-[#64748b] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-brand transform hover:-translate-y-0.5 transition-all"
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
