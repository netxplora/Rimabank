import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Landmark, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";

export function HeroSection() {
  const { siteContent } = useCMS();
  const hero = siteContent?.hero;

  const headingPart1 = hero?.headingPart1 || "The bank for all";
  const headingHighlight = hero?.headingHighlight || "business";
  const headingPart2 = hero?.headingPart2 || "";
  const eyebrow = hero?.eyebrow || "Central Bank of Nigeria Licensed • NDIC Insured";
  const description = hero?.description || "Simple banking, practical financial services and access to the funds you need to manage, grow and move your money.";
  const primaryCtaText = hero?.primaryCtaText || "Create Account";
  const primaryCtaLink = hero?.primaryCtaLink || "/contact";
  const secondaryCtaText = hero?.secondaryCtaText || "Explore Our Services";
  const secondaryCtaLink = hero?.secondaryCtaLink || "/personal-banking";

  return (
    <section className="relative min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-72px)] flex items-center bg-[#f0f9ff] text-[#0a1e3f] overflow-hidden border-b border-[#bae6fd]/60">
      {/* Background Editorial Canvas with Skyblue Atmospheric Overlay (Reduced Opacity) */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero?.heroImage || "/images/hero-home.png"}
          alt="RIMA Microfinance Bank - The bank for all business"
          className="w-full h-full object-cover object-center lg:object-right"
        />
        {/* Distinct Skyblue Brand Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#e0f2fe]/92 via-[#bae6fd]/65 to-transparent lg:from-[#e0f2fe]/90 lg:via-[#bae6fd]/50 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#e0f2fe]/85 via-[#bae6fd]/40 to-transparent sm:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-10 pl-7 sm:pl-10 lg:pl-12 py-14 sm:py-20 lg:py-24 my-auto flex flex-col justify-center">
        <div className="max-w-3xl space-y-6 sm:space-y-8 animate-fade-in-up">

          {/* Institutional Trust Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#cbd5e1] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider shadow-2xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse shrink-0" />
              <span>{eyebrow}</span>
            </div>
          </div>

          {/* Primary Hero Headline */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.06] text-[#0a1e3f] text-balance">
              {headingPart1} <span className="text-[#0284c7]">{headingHighlight}</span>{headingPart2 ? ` ${headingPart2}` : "."}
            </h1>

            {/* Editorial Sub-copy */}
            <p className="text-slate-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {/* Interactive CTAs - Horizontal Placement */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <Button
              variant="pill"
              size="lg"
              asChild
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold shadow-xs h-11 sm:h-12 px-6 sm:px-7 justify-center transition-all duration-150 shrink-0"
            >
              <Link to={primaryCtaLink}>
                <span>{primaryCtaText}</span>
                <ArrowRight className="h-4 w-4 ml-1.5 sm:ml-2" />
              </Link>
            </Button>

            <Button
              variant="outlineNeutral"
              size="lg"
              asChild
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-[#0a1e3f] border-[#cbd5e1] hover:border-[#0a1e3f] text-xs sm:text-sm font-semibold h-11 sm:h-12 px-5 sm:px-6 justify-center shadow-2xs transition-all duration-150 shrink-0"
            >
              <Link to={secondaryCtaLink}>
                <span>{secondaryCtaText}</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Grounded Institutional Metrics */}
          <div className="pt-6 sm:pt-8 border-t border-slate-200/80 flex flex-row flex-wrap items-center gap-6 sm:gap-10 text-[#0a1e3f]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-semibold text-[#0a1e3f]">CBN Licensed</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal">Regulatory Assurance</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Landmark className="h-4 w-4 sm:h-5 sm:w-5 text-[#0284c7] shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-semibold text-[#0a1e3f]">{hero?.ratingScore || "25+ Years"}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal">{hero?.ratingLabel || "Serving Rivers State"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#0284c7] shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-semibold text-[#0a1e3f]">{hero?.activeUsersCount || "50,000+"}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal">{hero?.activeUsersLabel || "Active Accountholders"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}




