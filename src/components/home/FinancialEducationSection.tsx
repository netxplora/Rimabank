import { BookOpen, ArrowRight, ShieldCheck, TrendingUp, PiggyBank, Sparkles, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import { motion } from "framer-motion";

const defaultEducationalGuides = [
  {
    category: "Savings Strategy",
    title: "How to save consistently with irregular business income",
    excerpt: "Practical techniques for market traders and artisans to build emergency reserves and goal savings without disrupting daily operating cash flow.",
    readTime: "4 min read",
    href: "/media"
  },
  {
    category: "Business Cash Flow",
    title: "5 practical ways to manage working capital in retail operations",
    excerpt: "Learn how to forecast inventory cycles, avoid stockouts, and negotiate supplier credit terms to maintain steady business liquidity.",
    readTime: "5 min read",
    href: "/media"
  },
  {
    category: "Security & Protection",
    title: "How to bank safely on USSD and mobile smartphone apps",
    excerpt: "Essential safety habits to protect your 4-digit PIN, avoid social engineering phone scams, and report suspicious transactions immediately.",
    readTime: "3 min read",
    href: "/media"
  }
];

export function FinancialEducationSection() {
  const { siteContent } = useCMS();
  const fe = siteContent?.financialEducationSection;

  const badge = fe?.badge || "Financial Literacy & Education";
  const heading = fe?.heading || "Practical guides for your financial growth";
  const description = fe?.description || "We believe banking should empower you with practical knowledge to manage money, grow your enterprise, and safeguard your assets.";
  const guides = fe?.guides && fe.guides.length > 0 ? fe.guides : defaultEducationalGuides;
  const ctaText = fe?.ctaText || "View All Financial Guides";
  const ctaLink = fe?.ctaLink || "/media";

  return (
    <section className="relative py-16 sm:py-24 bg-[#f8fbff] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>{badge}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight">
              {heading}
            </h2>

            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          <Button
            variant="outlineNeutral"
            size="lg"
            asChild
            className="rounded-full bg-white hover:bg-slate-50 border-slate-300 text-[#0a1e3f] text-xs sm:text-sm font-semibold h-11 px-6 shrink-0 self-start md:self-auto shadow-2xs"
          >
            <Link to={ctaLink} className="inline-flex items-center gap-2">
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* 3-Column Educational Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.title}
              to={guide.href}
              className="bg-white hover:bg-white border border-slate-200/90 hover:border-[#0284c7]/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="px-3 py-1 rounded-full bg-[#f0f9ff] text-[#0284c7] border border-[#bae6fd]/80 text-[11px] font-bold">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <Clock className="h-3 w-3" />
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-[#0284c7] justify-between">
                <span className="group-hover:underline">Read Full Article</span>
                <div className="w-6 h-6 rounded-full bg-[#f0f9ff] group-hover:bg-[#0284c7] text-[#0284c7] group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

