import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Landmark, Users, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";

export function HeroSection() {
  const { siteContent } = useCMS();
  const hero = siteContent?.hero;

  if (!hero) return null;

  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center bg-[#f0f9ff] text-[#0a1e3f] overflow-hidden border-b border-[#bae6fd]/60">
      {/* Background Editorial Canvas with Light Sky Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.heroImage || "/images/hero-home.png"}
          alt={hero.headingPart1}
          className="w-full h-full object-cover object-center"
        />
        {/* Light Brand Sky Blue Overlay: keeps hero image visible while preserving crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0f9ff]/95 via-[#e0f2fe]/80 to-[#38bdf8]/25 lg:from-[#f0f9ff]/92 lg:via-[#e0f2fe]/75 lg:to-[#38bdf8]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#e0f2fe]/90 via-transparent to-transparent lg:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl space-y-6 sm:space-y-8 animate-fade-in-up">

          {/* Institutional Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#cbd5e1] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider shadow-xs backdrop-blur-md bg-white/70">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Primary Hero Headline */}
          <div className="space-y-3">
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-snug sm:leading-[1.15] text-[#0a1e3f] text-balance">
              {hero.headingPart1} <span className="text-[#0284c7]">{hero.headingHighlight}</span> {hero.headingPart2}
            </h1>

            {/* Editorial Sub-copy */}
            <p className="text-slate-700 text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed max-w-2xl">
              {hero.description}
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Button
              variant="pill"
              size="lg"
              asChild
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold shadow-brand h-11 sm:h-12 px-6 justify-center transition-all duration-150"
            >
              <Link to={hero.primaryCtaLink}>
                <span>{hero.primaryCtaText}</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>

            <Button
              variant="outlineNeutral"
              size="lg"
              asChild
              className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white text-[#0a1e3f] border-[#cbd5e1] hover:border-[#0a1e3f] text-xs sm:text-sm font-semibold h-11 sm:h-12 px-6 justify-center shadow-xs transition-all duration-150"
            >
              <Link to={hero.secondaryCtaLink}>
                <span>{hero.secondaryCtaText}</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Institutional Highlights (Text Only, Horizontal Form, No Container, No Border) */}
          <div className="pt-4 flex flex-row flex-wrap items-center gap-6 sm:gap-10 text-[#0a1e3f]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-semibold text-[#0a1e3f]">CBN Licensed</span>
                <span className="text-[11px] text-slate-500 font-normal">Regulatory Assurance</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-[#0284c7] shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-semibold text-[#0a1e3f]">{hero.ratingScore || "99.8%"}</span>
                <span className="text-[11px] text-slate-500 font-normal">{hero.ratingLabel || "Uptime & Reliability"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#0284c7] shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-semibold text-[#0a1e3f]">{hero.activeUsersCount || "50,000+"}</span>
                <span className="text-[11px] text-slate-500 font-normal">{hero.activeUsersLabel || "Active Accountholders"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

