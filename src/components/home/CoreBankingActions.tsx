import { Link } from "react-router-dom";
import { PiggyBank, Landmark, Briefcase, ArrowLeftRight, Smartphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ActionItem {
  title: string;
  desc: string;
  icon: React.ElementType;
  href: string;
  colorClass: string;
}

const actions: ActionItem[] = [
  {
    title: "Save Money",
    desc: "Guaranteed interest yields designed around your personal goals.",
    icon: PiggyBank,
    href: "/personal-banking#savings",
    colorClass: "bg-sky-50 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white",
  },
  {
    title: "Get a Loan",
    desc: "Working capital and commercial credit for business expansion.",
    icon: Landmark,
    href: "/loans",
    colorClass: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    title: "Bank Business",
    desc: "Checking accounts, merchant settlement, and cash flow tools.",
    icon: Briefcase,
    href: "/business-banking",
    colorClass: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
  },
  {
    title: "Move Money",
    desc: "Instant NIBSS electronic transfers and utility settlements.",
    icon: ArrowLeftRight,
    href: "/digital-banking",
    colorClass: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
  },
  {
    title: "Bank Your Way",
    desc: "USSD (*966*808#), Verve debit cards, and neighborhood agents.",
    icon: Smartphone,
    href: "/agent-banking",
    colorClass: "bg-blue-50 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function CoreBankingActions() {
  return (
    <section className="py-10 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Clean & Open */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50/80 px-3 py-1 rounded-full border border-sky-100/60 inline-block mb-2.5">
            Practical Financial Services
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1e3f] tracking-tight">
            What can we help you do?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Direct access to everyday banking, growth capital, and personal savings solutions.
          </p>
        </div>

        {/* Mobile-first Open Grid (Clean, Lightweight, No heavy card borders) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6"
        >
          {actions.map((item, idx) => {
            const Icon = item.icon;
            const isLastOdd = idx === 4;

            return (
              <motion.div 
                key={item.title} 
                variants={itemVariants}
                className={isLastOdd ? "col-span-2 sm:col-span-1" : ""}
              >
                <Link
                  to={item.href}
                  className="group h-full p-4 sm:p-5 rounded-2xl bg-[#f0f9ff]/70 hover:bg-[#f0f9ff] border border-[#bae6fd]/60 hover:border-[#bae6fd] transition-all duration-300 shadow-2xs hover:shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white text-[#0284c7] border border-[#bae6fd]/60 shadow-2xs flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#bae6fd]/50 flex items-center justify-between text-xs font-semibold text-[#0284c7]">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}


