import { BookOpen, ArrowRight, ShieldCheck, TrendingUp, PiggyBank, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const educationalGuides = [
  {
    category: "Savings Strategy",
    title: "How to save consistently with irregular business income",
    excerpt: "Practical techniques for market traders and artisans to build emergency funds and goal savings without disrupting daily cash flow.",
    readTime: "4 min read",
    href: "/media"
  },
  {
    category: "Business Cash Flow",
    title: "5 practical ways to manage working capital in retail operations",
    excerpt: "Learn how to forecast inventory cycles, avoid stockouts, and negotiate supplier credit to maintain business liquidity.",
    readTime: "5 min read",
    href: "/media"
  },
  {
    category: "Security & Protection",
    title: "How to bank safely on USSD and mobile phones",
    excerpt: "Essential safety habits to protect your 4-digit PIN, avoid social engineering phone scams, and report suspicious transactions immediately.",
    readTime: "3 min read",
    href: "/media"
  }
];

export function FinancialEducationSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-3">
              Financial Literacy & Education
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
              Practical guides for your financial growth
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              We believe banking should empower you with practical knowledge to manage money, grow your enterprise, and safeguard your assets.
            </p>
          </div>

          <Button
            variant="outline"
            size="default"
            asChild
            className="rounded-full border-slate-300 text-[#0a1e3f] hover:bg-slate-50 text-xs font-semibold h-10 px-5 shrink-0 self-start md:self-auto"
          >
            <Link to="/media">
              <span>View All Financial Guides</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

        {/* Responsive Grid Design for Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-4">
          {educationalGuides.map((guide) => (
            <Link
              key={guide.title}
              to={guide.href}
              className="bg-[#f0f9ff]/70 hover:bg-[#f0f9ff] border border-[#bae6fd]/60 hover:border-[#bae6fd] rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-sm flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span className="px-2.5 py-1 rounded-full bg-white text-[#0284c7] border border-[#bae6fd]/60 shadow-2xs">
                    {guide.category}
                  </span>
                  <span>{guide.readTime}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-[#bae6fd]/50 flex items-center text-xs font-semibold text-[#0284c7] gap-1 group-hover:gap-1.5 transition-all">
                <span>Read Full Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
