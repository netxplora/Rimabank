import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Globe, 
  Phone, 
  Users, 
  CreditCard, 
  Store, 
  MapPin, 
  ArrowRight,
  Headphones,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";

const channels = [
  {
    icon: Smartphone,
    title: "Mobile Banking App",
    desc: "Instant transfers, airtime top-up, bill payments, and biometric login directly on iOS and Android.",
    href: "/mobile-banking",
    badge: "Most Popular",
    badgeColor: "bg-[#0284c7] text-white",
    iconBg: "bg-sky-50 text-[#0284c7] border-sky-200/80 group-hover:bg-[#0284c7] group-hover:text-white"
  },
  {
    icon: Globe,
    title: "Internet Banking",
    desc: "Manage commercial or personal accounts, generate e-statements, and initiate bulk payments via web browser.",
    href: "/internet-banking",
    badge: "Web Access",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white"
  },
  {
    icon: Phone,
    title: "USSD Code Banking",
    desc: "Bank securely on any mobile phone without data or internet connection. Dial *966*808# instantly.",
    href: "/ussd-banking",
    badge: "*966*808#",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white"
  },
  {
    icon: Users,
    title: "Agency Banking Network",
    desc: "Deposit and withdraw cash conveniently at authorized RIMA banking agent outlets across your neighborhood.",
    href: "/agent-banking",
    badge: "Community",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    iconBg: "bg-amber-50 text-amber-700 border-amber-200/80 group-hover:bg-amber-700 group-hover:text-white"
  },
  {
    icon: CreditCard,
    title: "ATM & Debit Cards",
    desc: "Chip-and-PIN protected debit cards for seamless nationwide ATM cash withdrawals and POS card payments.",
    href: "/cards",
    badge: "Chip & PIN",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white"
  },
  {
    icon: Store,
    title: "Merchant POS Terminals",
    desc: "Fast, reliable point-of-sale terminals designed for retailers, supermarket checkouts, and business merchants.",
    href: "/agent-banking",
    badge: "For Merchants",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    iconBg: "bg-cyan-50 text-cyan-700 border-cyan-200/80 group-hover:bg-cyan-700 group-hover:text-white"
  },
  {
    icon: MapPin,
    title: "Branch Network",
    desc: "Visit our physical branch locations in Rivers State for face-to-face advisory, cashier deposits, and support.",
    href: "/branches",
    badge: "In-Person",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    iconBg: "bg-slate-100 text-slate-700 border-slate-200 group-hover:bg-[#0a1e3f] group-hover:text-white"
  },
  {
    icon: Headphones,
    title: "Customer Helpdesk",
    desc: "Direct support via phone lines, email, and dedicated WhatsApp channels for prompt dispute resolution.",
    href: "/contact",
    badge: "24/7 Support",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.06,
      delayChildren: 0.1
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.45, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

export function WaysToBankSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#f8fbff] border-b border-slate-200/80 overflow-hidden text-[#0a1e3f]">
      {/* Dynamic Background Glows & Grid Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(#0284c7 0.75px, transparent 0.75px), radial-gradient(#0a1e3f 0.75px, #f8fbff 0.75px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span>Omnichannel Banking Network</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight">
            Bank your way, anywhere.
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            Convenient digital, remote, agent, and in-person touchpoints designed around your daily lifestyle and enterprise needs.
          </p>
        </div>

        {/* 8-Card High-End Interactive Channels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <motion.div 
                key={ch.title} 
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Link
                  to={ch.href}
                  className="group relative h-full flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white hover:bg-white border border-slate-200/90 hover:border-[#0284c7]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle top edge hover gradient light sweep */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0284c7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Bar: Icon & Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-2xs ${ch.iconBg}`}>
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${ch.badgeColor}`}>
                        {ch.badge}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors leading-tight">
                      {ch.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-[13px] text-slate-600 mt-2 leading-relaxed">
                      {ch.desc}
                    </p>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0284c7]">
                    <span className="group-hover:underline">Access Channel</span>
                    <div className="w-6 h-6 rounded-full bg-[#f0f9ff] group-hover:bg-[#0284c7] text-[#0284c7] group-hover:text-white flex items-center justify-center transition-all duration-200">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Security & Regulatory Assurance Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-[#0a1e3f]">256-Bit Encrypted Banking Network</p>
              <p className="text-[11px] text-slate-500">Regulated by the Central Bank of Nigeria & Insured by NDIC</p>
            </div>
          </div>

          <Link
            to="/security"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] hover:underline shrink-0"
          >
            <span>Learn about our security standards</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

