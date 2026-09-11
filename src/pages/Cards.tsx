import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  CreditCard, 
  Wifi,
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Smartphone, 
  HelpCircle,
  Clock,
  Sparkles,
  BadgeAlert,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const cardTypes = [
  {
    id: "verve-classic",
    title: "RIMA Verve Debit Card",
    category: "Everyday Personal Use",
    badge: "Instant Issuance",
    desc: "The standard debit card paired with your personal savings or current account. Accepted across all ATMs, POS points, and online merchants nationwide in Nigeria.",
    color: "from-[#0a1e3f] via-[#112d5e] to-[#061329]",
    accent: "text-[#0284c7]",
    features: [
      "Instant issuance and PIN setup at any RIMA branch",
      "Accepted at all ATMs and POS terminals across Nigeria",
      "EMV Chip & PIN security + Contactless Tap-to-Pay",
      "Zero annual card maintenance fee on basic savings",
      "Direct pairing with the RIMA Mobile Banking App"
    ]
  },
  {
    id: "verve-business",
    title: "RIMA Business Debit Card",
    category: "Commercial & SME Enterprises",
    badge: "High Limits",
    desc: "Tailored for business owners, corporate executives, and procurement officers requiring higher daily POS expenditure limits and separate expense tracking.",
    color: "from-[#0c2444] via-[#0284c7] to-[#0a1e3f]",
    accent: "text-amber-400",
    features: [
      "Higher daily POS and ATM transaction thresholds",
      "Itemized corporate expenditure accounting on monthly statements",
      "Multi-card issuance for designated company staff/drivers",
      "24/7 dedicated merchant card support desk",
      "Customizable daily spending caps per cardholder"
    ]
  }
];

const capabilities = [
  { 
    icon: CreditCard, 
    title: "ATM Cash Access", 
    desc: "Withdraw cash 24/7 at any Interswitch-connected ATM across all 36 Nigerian states." 
  },
  { 
    icon: ShoppingBag, 
    title: "POS Store Payments", 
    desc: "Pay seamlessly at supermarkets, pharmacies, fuel stations, and restaurants nationwide." 
  },
  { 
    icon: Wifi, 
    title: "Contactless Tap-to-Pay", 
    desc: "Speed through retail checkouts by tapping your card on enabled POS terminals for quick purchases." 
  },
  { 
    icon: Smartphone, 
    title: "Online Web Checkout", 
    desc: "Shop securely on Nigerian e-commerce platforms with one-time SMS OTP verification." 
  },
];

export default function Cards() {
  const [selectedCard, setSelectedCard] = useState<string>("verve-classic");

  return (
    <Layout
      title="ATM & Debit Cards | RIMA Microfinance Bank"
      description="Enjoy nationwide cash access and secure payments with RIMA Verve Debit Cards. Instant issuance at all branches in Port Harcourt."
    >
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-5">
                <CreditCard className="w-3.5 h-3.5" />
                Verve EMV Debit Cards
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight mb-6 leading-tight">
                Your money, securely within reach whenever you need it.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                Experience instant branch card issuance, contactless tap-to-pay convenience, and nationwide acceptance at over 20,000 ATMs and hundreds of thousands of POS terminals across Nigeria.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-7 shadow-sm" asChild>
                  <Link to="/branches">
                    Get Your Card at a Branch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-slate-200 text-[#0a1e3f] hover:bg-slate-50 px-6" asChild>
                  <Link to="/contact">Card Support Desk</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0a1e3f]">Instant</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Over-the-Counter Issuance</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0284c7]">100%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Nationwide Acceptance</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-600">Chip & PIN</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">EMV Protected</div>
                </div>
              </div>
            </motion.div>

            {/* Official ATM Card Photo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative group max-w-[400px] w-full">
                <img
                  src="/images/atm-card.jpg"
                  alt="Rima MFB Official Debit Card"
                  className="w-full h-auto object-contain mix-blend-multiply transform group-hover:-rotate-1 group-hover:scale-[1.02] transition-transform duration-500"
                  style={{ filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.10)) drop-shadow(0px 6px 12px rgba(0,0,0,0.07))' }}
                />
                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                  EMV Chip &amp; PIN Protected • Nationwide Acceptance
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Card Options */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Card Options
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Select the card designed for your lifestyle
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether for day-to-day family purchases or high-volume business expenditure, we provide secure debit solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {cardTypes.map((card) => (
              <div 
                key={card.id}
                className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-[#0284c7] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center shadow-sm">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {card.badge}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#0284c7] mb-1">{card.category}</div>
                  <h3 className="font-heading font-bold text-2xl text-[#0a1e3f] mb-3">{card.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{card.desc}</p>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Card Benefits</h4>
                    <ul className="space-y-3">
                      {card.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0a1e3f]">
                          <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-emerald-600" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button className="w-full rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white" asChild>
                  <Link to="/branches">Request at Nearest Branch</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Versatile Utility
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              What your RIMA Card can do
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Engineered with modern payment standards to support your everyday transactions smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-[#f8fafc] border border-slate-200 rounded-3xl p-6 hover:border-sky-200 hover:shadow-md transition-all text-center">
                <div className="h-14 w-14 rounded-2xl bg-white text-[#0284c7] flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                  <c.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0a1e3f] mb-2">{c.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Safety & Hotlist Notice */}
      <section className="py-16 bg-[#0a1e3f] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wider border border-red-500/30 mb-3">
                <Lock className="w-3.5 h-3.5" />
                Card Security & Emergency Hotlist
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Lost or misplaced your card? Block it immediately.
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed max-w-2xl">
                If your card is stolen, misplaced, or compromised, dial our emergency USSD code <strong className="text-white">*966*808*7#</strong> from your registered phone number, or call our 24/7 card operations desk right away to prevent unauthorized charges.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Button className="rounded-full bg-red-600 hover:bg-red-700 text-white w-full" asChild>
                <Link to="/contact">Emergency Card Hotline</Link>
              </Button>
              <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 w-full" asChild>
                <Link to="/ussd-banking">Learn USSD Blocking</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
