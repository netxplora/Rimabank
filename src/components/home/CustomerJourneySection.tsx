import { UserPlus, Wallet, Smartphone, Landmark, TrendingUp, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useCMS } from "@/context/CMSContext";

const defaultJourneySteps = [
  {
    step: "01",
    title: "Open Your Account",
    desc: "Register online in minutes or visit any RIMA branch with your valid ID and proof of address.",
    icon: UserPlus
  },
  {
    step: "02",
    title: "Fund & Deposit",
    desc: "Deposit cash via interbank transfer, neighborhood agent cash-in, or mobile banking app.",
    icon: Wallet
  },
  {
    step: "03",
    title: "Transact & Pay",
    desc: "Transact seamlessly with your Verve debit card, mobile app, or offline USSD code (*966*808#).",
    icon: Smartphone
  },
  {
    step: "04",
    title: "Access Financing",
    desc: "Qualify for flexible business working capital or personal credit facilities based on transaction history.",
    icon: Landmark
  },
  {
    step: "05",
    title: "Grow Your Capital",
    desc: "Expand your enterprise, build structured goal savings, and secure your financial future.",
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
      delayChildren: 0.1
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CustomerJourneySection() {
  const { siteContent } = useCMS();
  const cj = siteContent?.customerJourney;

  const badge = cj?.badge || "Simple & Transparent Process";
  const heading = cj?.heading || "How banking works with RIMA";
  const description = cj?.description || "From your initial deposit to accessing commercial financing, we keep every step straightforward, transparent, and supportive of your goals.";
  const ctaText = cj?.ctaText || "Start Your Journey Today";
  const ctaLink = cj?.ctaLink || "/contact";
  const steps = cj?.steps && cj.steps.length > 0 ? cj.steps : defaultJourneySteps;

  return (
    <section className="relative py-16 sm:py-24 bg-[#f8fbff] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span>{badge}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight">
            {heading}
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* 5-Step Sequential Card Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative"
        >
          {steps.map((item, idx) => {
            const Icon = (item as any).icon || stepIcons[idx % stepIcons.length] || UserPlus;
            const isLastOddOnMobile = idx === 4 && steps.length === 5;
            
            return (
              <motion.div
                key={item.step}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`bg-white hover:bg-white border border-slate-200/90 hover:border-[#0284c7]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group ${
                  isLastOddOnMobile ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-bold text-base sm:text-lg text-[#0284c7] bg-[#f0f9ff] px-2.5 py-0.5 rounded-lg border border-[#bae6fd]">
                      {item.step}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-slate-50 text-[#0a1e3f] flex items-center justify-center border border-slate-200 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#0a1e3f] mb-1.5 group-hover:text-[#0284c7] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="font-sans text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Phase {item.step}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#f0f9ff] text-[#0284c7] flex items-center justify-center group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            variant="pill"
            size="lg"
            asChild
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-12 px-8 shadow-md"
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

