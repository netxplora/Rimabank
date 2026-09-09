import { UserPlus, Wallet, Smartphone, Landmark, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const journeySteps = [
  {
    step: "01",
    title: "Open an Account",
    desc: "Register online in minutes or visit any RIMA branch with your valid ID and proof of address.",
    icon: UserPlus
  },
  {
    step: "02",
    title: "Fund Your Account",
    desc: "Deposit funds via interbank transfer, neighborhood agent cash deposit, or mobile banking.",
    icon: Wallet
  },
  {
    step: "03",
    title: "Manage Your Money",
    desc: "Transact seamlessly with your Verve debit card, mobile app, or offline USSD (*966*808#).",
    icon: Smartphone
  },
  {
    step: "04",
    title: "Access Financing",
    desc: "Qualify for flexible business working capital or microcredit facilities based on your savings history.",
    icon: Landmark
  },
  {
    step: "05",
    title: "Grow Your Goals",
    desc: "Expand your enterprise, build emergency reserves, and achieve long-term financial security.",
    icon: TrendingUp
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function CustomerJourneySection() {
  return (
    <section className="py-16 sm:py-24 bg-[#f8fafc]/50 border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3.5">
            Simple & Transparent Process
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            How banking works with RIMA
          </h2>
          <p className="text-xs sm:text-base text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed">
            From your very first deposit to accessing business financing, we keep every step clear, accessible, and supportive of your personal and business milestones.
          </p>
        </div>

        {/* 5-Step Responsive Grid Design */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 relative"
        >
          {journeySteps.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                variants={cardVariants}
                className="bg-[#f0f9ff]/70 hover:bg-[#f0f9ff] border border-[#bae6fd]/60 hover:border-[#bae6fd] rounded-2xl p-5 transition-all duration-300 shadow-2xs hover:shadow-sm flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-white text-[#0284c7] flex items-center justify-center font-bold border border-[#bae6fd]/60 shadow-2xs group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-heading font-bold text-[11px] text-[#0284c7] bg-white px-2.5 py-1 rounded-full border border-[#bae6fd]/60 shadow-2xs">
                      Step {item.step}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#0a1e3f] mb-2 group-hover:text-[#0284c7] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#bae6fd]/50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#0284c7]">
                    Clear Guidance
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#0284c7]/70 group-hover:text-[#0284c7] group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="pill"
            size="lg"
            asChild
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-12 px-8 shadow-brand"
          >
            <Link to="/contact">
              <span>Start Your Journey Today</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}

