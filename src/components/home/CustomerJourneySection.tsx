import { UserPlus, Wallet, Smartphone, Landmark, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useCMS } from "@/context/CMSContext";

const defaultJourneySteps = [
  {
    step: "01",
    title: "Open an Account",
    desc: "Register online in minutes or visit any RIMA branch with your valid ID and proof of address.",
    icon: UserPlus
  },
  {
    step: "02",
    title: "Fund Account",
    desc: "Deposit funds via interbank transfer, neighborhood agent cash deposit, or mobile banking.",
    icon: Wallet
  },
  {
    step: "03",
    title: "Manage Money",
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

const stepIcons = [UserPlus, Wallet, Smartphone, Landmark, TrendingUp];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function CustomerJourneySection() {
  const { siteContent } = useCMS();
  const cj = siteContent?.customerJourney;

  const badge = cj?.badge || "Simple & Transparent Process";
  const heading = cj?.heading || "How banking works with RIMA";
  const description = cj?.description || "From your very first deposit to accessing business financing, we keep every step clear, accessible, and supportive of your personal and business milestones.";
  const ctaText = cj?.ctaText || "Start Your Journey Today";
  const ctaLink = cj?.ctaLink || "/contact";
  const steps = cj?.steps && cj.steps.length > 0 ? cj.steps : defaultJourneySteps;

  return (
    <section className="py-12 sm:py-20 bg-[#f8fafc]/50 border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
            {badge}
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* 5-Step Compact Responsive Grid (2 cols on mobile, 2 cols on tablet, 5 cols on desktop) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-4 relative"
        >
          {steps.map((item, idx) => {
            const Icon = (item as any).icon || stepIcons[idx % stepIcons.length] || UserPlus;
            const isLastOddOnMobile = idx === 4 && steps.length === 5;
            
            return (
              <motion.div
                key={item.step}
                variants={cardVariants}
                className={`bg-[#f0f9ff]/70 hover:bg-[#f0f9ff] border border-[#bae6fd]/60 hover:border-[#bae6fd] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between group ${
                  isLastOddOnMobile ? "col-span-2 sm:col-span-1 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
                    <span className="font-heading font-bold text-sm sm:text-lg text-[#0284c7]">
                      {item.step}
                    </span>
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-white text-[#0284c7] flex items-center justify-center border border-[#bae6fd]/60 shadow-2xs group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-200">
                      <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#0a1e3f] mb-1 group-hover:text-[#0284c7] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2.5 sm:pt-2.5 sm:mt-3 border-t border-[#bae6fd]/40 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#0284c7]">
                    Step {item.step}
                  </span>
                  <ArrowRight className="h-3 w-3 text-[#0284c7]/70 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <Button
            variant="pill"
            size="default"
            asChild
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-11 px-7 shadow-brand"
          >
            <Link to={ctaLink} className="inline-flex items-center gap-2">
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
