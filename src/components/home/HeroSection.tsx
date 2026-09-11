import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ShieldCheck, 
  Landmark, 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  CreditCard,
  Building2,
  Lock,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import { DownloadAppDialog } from "@/components/modals/DownloadAppDialog";

export function HeroSection() {
  const { siteContent } = useCMS();
  const [showAppDialog, setShowAppDialog] = useState(false);
  const hero = siteContent?.hero;

  const headingPart1 = hero?.headingPart1 || "The bank for all";
  const headingHighlight = hero?.headingHighlight || "business";
  const headingPart2 = hero?.headingPart2 || "";
  const eyebrow = hero?.eyebrow || "Central Bank of Nigeria Licensed • NDIC Insured";
  const description = hero?.description || "Simple banking, practical financial services and access to the funds you need to manage, grow and move your money.";
  const primaryCtaText = hero?.primaryCtaText || "Get the App";
  const primaryCtaLink = hero?.primaryCtaLink || "/contact";
  const secondaryCtaText = hero?.secondaryCtaText || "Explore Our Services";
  const secondaryCtaLink = hero?.secondaryCtaLink || "/personal-banking";

  // Staggered motion container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-6, 6, -6],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatingReverseVariants = {
    initial: { y: 0 },
    animate: {
      y: [6, -6, 6],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-72px)] flex items-center bg-[#f8fbff] text-[#0a1e3f] overflow-hidden border-b border-[#e0f2fe]">
      {/* Dynamic Background Mesh & Architectural Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle dot pattern grid */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(#0284c7 0.75px, transparent 0.75px), radial-gradient(#0a1e3f 0.75px, #f8fbff 0.75px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />

        {/* Ambient Light Orbs */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#38bdf8]/20 to-[#0284c7]/10 blur-[100px]" />
        <div className="absolute top-1/3 right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#0284c7]/15 via-[#38bdf8]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[350px] rounded-full bg-gradient-to-t from-[#bae6fd]/30 to-transparent blur-[90px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & Commands (7 cols on lg) */}
          <motion.div 
            className="lg:col-span-7 space-y-6 sm:space-y-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Regulatory Institutional Trust Badge */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-white/95 border border-[#bae6fd] hover:border-[#0284c7]/40 text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider shadow-sm backdrop-blur-md transition-all duration-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0284c7] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0284c7]" />
                </span>
                <span className="text-[11px] sm:text-xs font-medium text-slate-800">{eyebrow}</span>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 ml-0.5" />
              </div>
            </motion.div>

            {/* Primary Hero Headline */}
            <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[4.15rem] font-bold tracking-tight leading-[1.08] text-[#0a1e3f] text-balance">
                {headingPart1}{" "}
                <span className="relative inline-block text-[#0284c7]">
                  {headingHighlight}
                  {/* Subtle underline stroke */}
                  <svg 
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#38bdf8]/40 -z-10" 
                    viewBox="0 0 100 12" 
                    preserveAspectRatio="none"
                  >
                    <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                {headingPart2 ? ` ${headingPart2}` : "."}
              </h1>

              {/* Subtitle / Description */}
              <p className="font-sans text-slate-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl text-pretty">
                {description}
              </p>
            </motion.div>

            {/* Feature Highlights Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 text-xs font-medium text-slate-700 shadow-2xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 text-xs font-medium text-slate-700 shadow-2xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                <span>Fast Loan Approvals</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 text-xs font-medium text-slate-700 shadow-2xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                <span>NDIC Insured Deposits</span>
              </div>
            </motion.div>

            {/* Primary & Secondary Call to Actions */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
              {(primaryCtaText.toLowerCase().includes("app") || primaryCtaText.toLowerCase().includes("download")) ? (
                <Button
                  variant="pill"
                  size="lg"
                  onClick={() => setShowAppDialog(true)}
                  className="group relative overflow-hidden bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-semibold shadow-md hover:shadow-lg h-12 sm:h-[52px] px-7 sm:px-8 justify-center transition-all duration-200 w-full sm:w-auto text-center cursor-pointer"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>{primaryCtaText}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Button>
              ) : (
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="group relative overflow-hidden bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-semibold shadow-md hover:shadow-lg h-12 sm:h-[52px] px-7 sm:px-8 justify-center transition-all duration-200 w-full sm:w-auto text-center"
                >
                  <Link to={primaryCtaLink} className="flex items-center justify-center gap-2">
                    <span>{primaryCtaText}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}

              <Button
                variant="outlineNeutral"
                size="lg"
                asChild
                className="group rounded-full bg-white/95 backdrop-blur-md hover:bg-white text-[#0a1e3f] border-slate-300 hover:border-[#0284c7] text-sm font-semibold h-12 sm:h-[52px] px-6 sm:px-7 justify-center shadow-xs hover:shadow-sm transition-all duration-200 w-full sm:w-auto text-center"
              >
                <Link to={secondaryCtaLink} className="flex items-center justify-center gap-2">
                  <span>{secondaryCtaText}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-[#0284c7] transition-colors duration-200" />
                </Link>
              </Button>
            </motion.div>

            {/* Institutional Metrics Strip */}
            <motion.div 
              variants={itemVariants} 
              className="pt-6 sm:pt-7 border-t border-slate-200/90 w-full"
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                {/* Metric 1 */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-base font-bold text-[#0a1e3f] tracking-tight">CBN Licensed</span>
                    <span className="text-[10px] sm:text-xs text-slate-600 font-medium">NDIC Insured</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3.5 border-x border-slate-200/80 px-2 sm:px-5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                    <Landmark className="h-5 w-5 text-[#0284c7]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-base font-bold text-[#0a1e3f] tracking-tight">{hero?.ratingScore || "25+ Years"}</span>
                    <span className="text-[10px] sm:text-xs text-slate-600 font-medium">{hero?.ratingLabel || "Trusted Heritage"}</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="h-5 w-5 text-[#0284c7]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-base font-bold text-[#0a1e3f] tracking-tight">{hero?.activeUsersCount || "50,000+"}</span>
                    <span className="text-[10px] sm:text-xs text-slate-600 font-medium">{hero?.activeUsersLabel || "Active Accounts"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Showcase — Desktop only */}
          <div className="hidden lg:block lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-[440px] lg:max-w-none">
              
              {/* Main Decorative Frame: Realistic Banking Imagery */}
              <motion.div 
                className="relative rounded-3xl overflow-hidden border border-white/90 shadow-2xl bg-white aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={hero?.heroImage || "/images/hero-home.jpg"}
                  alt="RIMA Microfinance Bank customer banking online"
                  className="w-full h-full object-cover object-center lg:object-top"
                />
                
                {/* Atmospheric Gradient Wash Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f]/80 via-[#0a1e3f]/20 to-transparent" />
                
                {/* Bottom Frame Badge inside Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0284c7]/10 flex items-center justify-center text-[#0284c7]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0a1e3f]">Commercial & Personal Banking</p>
                      <p className="text-[11px] text-slate-500">Fast, reliable branch & digital access</p>
                    </div>
                  </div>
                  <Link 
                    to="/business-banking" 
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0284c7] hover:text-white flex items-center justify-center text-slate-700 transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Floating Glassmorphic Notification Card 1 (Top Left) */}
              <motion.div
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                className="absolute -top-6 -left-4 sm:-left-8 z-20 hidden sm:flex items-center gap-3 p-3.5 pr-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-xl max-w-[260px]"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Transfer Received</span>
                  <span className="text-xs font-bold text-[#0a1e3f]">₦250,000.00</span>
                  <span className="text-[10px] text-slate-500">Business Account Credit</span>
                </div>
              </motion.div>

              {/* Floating Glassmorphic Goal / Rate Card 2 (Bottom Right) */}
              <motion.div
                variants={floatingReverseVariants}
                initial="initial"
                animate="animate"
                className="absolute -bottom-6 -right-3 sm:-right-6 z-20 hidden sm:flex flex-col gap-2 p-4 rounded-2xl bg-[#0a1e3f]/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl max-w-[240px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#38bdf8]">Target Savings</span>
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">₦1,250,000.00</p>
                  <p className="text-[11px] text-slate-300">Target 92% Achieved</p>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-[#38bdf8] h-full w-[92%] rounded-full" />
                </div>
              </motion.div>

              {/* Security Trust Shield Pill (Top Right) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -top-3 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1e3f] text-white text-[11px] font-medium shadow-md border border-white/20"
              >
                <Lock className="h-3 w-3 text-emerald-400" />
                <span>256-bit Secure Banking</span>
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      {/* Download App Dialog Popup */}
      <DownloadAppDialog open={showAppDialog} onOpenChange={setShowAppDialog} />
    </section>
  );
}

