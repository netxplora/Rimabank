import { Link } from "react-router-dom";
import { 
  PiggyBank, 
  Landmark, 
  Briefcase, 
  ArrowLeftRight, 
  Smartphone, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Save",
    badge: "High Yield",
    desc: "Earn structured interest with tailored fixed and target savings plans.",
    icon: PiggyBank,
    color: "from-emerald-500/10 to-teal-500/5",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    href: "/savings",
  },
  {
    title: "Borrow",
    badge: "Fast Approval",
    desc: "Access working capital and personal credit tailored to your cash flow.",
    icon: Landmark,
    color: "from-sky-500/10 to-blue-500/5",
    iconBg: "bg-sky-50 text-[#0284c7] border-sky-200/80 group-hover:bg-[#0284c7] group-hover:text-white",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    href: "/loans",
  },
  {
    title: "Bank",
    badge: "Everyday",
    desc: "Open individual or business accounts with zero maintenance hassles.",
    icon: Briefcase,
    color: "from-blue-500/10 to-indigo-500/5",
    iconBg: "bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    href: "/personal-banking",
  },
  {
    title: "Pay",
    badge: "Instant",
    desc: "Send money, settle vendor invoices, and manage utility bills seamlessly.",
    icon: ArrowLeftRight,
    color: "from-cyan-500/10 to-sky-500/5",
    iconBg: "bg-cyan-50 text-cyan-700 border-cyan-200/80 group-hover:bg-cyan-700 group-hover:text-white",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    href: "/mobile-banking",
  },
  {
    title: "Grow",
    badge: "SME Advisory",
    desc: "Empower your enterprise with dedicated merchant solutions and tools.",
    icon: TrendingUp,
    color: "from-amber-500/10 to-orange-500/5",
    iconBg: "bg-amber-50 text-amber-700 border-amber-200/80 group-hover:bg-amber-700 group-hover:text-white",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    href: "/business-banking",
  },
  {
    title: "Access",
    badge: "Omnichannel",
    desc: "Bank anywhere via mobile app, USSD codes, branch desks, and agency points.",
    icon: Smartphone,
    color: "from-indigo-500/10 to-purple-500/5",
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    href: "/agent-banking",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

export function CoreBankingActions() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#ffffff] border-b border-slate-200/70 overflow-hidden">
      {/* Subtle architectural background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-blue-50/50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Eyebrow Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span>Direct Financial Services</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            What can we help you do today?
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            Direct access to everyday banking, high-yield savings, fast financing, and practical tools to build your financial future.
          </p>
        </div>

        {/* 6 High-End Interactive Banking Action Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5"
        >
          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.title} 
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Link
                  to={item.href}
                  className="group relative h-full p-5 sm:p-6 rounded-2xl bg-white hover:bg-white border border-slate-200/90 hover:border-[#0284c7]/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top edge gradient highlight on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0284c7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Bar: Icon & Micro-Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-2xs ${item.iconBg}`}>
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="font-sans text-xs sm:text-[13px] text-slate-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0284c7]">
                    <span className="group-hover:underline">Explore Option</span>
                    <div className="w-6 h-6 rounded-full bg-[#f0f9ff] group-hover:bg-[#0284c7] text-[#0284c7] group-hover:text-white flex items-center justify-center transition-all duration-200">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Trust Assurance Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 sm:mt-12 p-3 sm:p-4 rounded-xl bg-[#f8fbff] border border-slate-200/80 max-w-2xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-xs text-slate-600 text-center"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>All deposit accounts and loan products are regulated by the Central Bank of Nigeria and insured by NDIC.</span>
        </motion.div>

      </div>
    </section>
  );
}

