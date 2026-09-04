import { ReactNode, useEffect } from "react";
import { Layout } from "./Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, LucideIcon, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface BankingServiceLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  image: string;
  whoItIsFor: string;
  benefits: string[];
  requirements: string[];
  fees?: string;
  ctaText?: string;
  children?: ReactNode;
}

export function BankingServiceLayout({
  title,
  subtitle,
  description,
  icon: Icon,
  image,
  whoItIsFor,
  benefits,
  requirements,
  fees,
  ctaText = "Open Account",
  children
}: BankingServiceLayoutProps) {
  useEffect(() => {
    document.title = `${title} | Rima Microfinance Bank`;
  }, [title]);

  return (
    <Layout>
      {/* Editorial Service Hero */}
      <section className="relative bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-xs font-semibold uppercase tracking-wider text-[#0a1e3f]">
              <Icon className="h-3.5 w-3.5 text-[#0284c7]" />
              <span>{subtitle}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              {title}
            </h1>

            <p className="text-[#0a1e3f]/80 text-sm sm:text-base leading-relaxed">
              {description}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <Button
                variant="pill"
                size="default"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/contact">
                  {ctaText}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="default" asChild className="rounded-full">
                <Link to="/branches">
                  Locate Branch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8 sm:py-10 md:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* Product Overview Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e2e8f0] space-y-3">
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0a1e3f] tracking-tight">
                  Product Overview
                </h2>
                <p className="text-[#0a1e3f]/80 text-xs sm:text-sm leading-relaxed">
                  {description}
                </p>
                <div className="p-3.5 rounded-xl bg-[#f0f7ff] border border-[#e2e8f0] text-xs text-[#0a1e3f]">
                  <span className="font-bold">Target Customer: </span>
                  {whoItIsFor}
                </div>
              </div>

              {/* Key Benefits 2-Column Responsive Grid */}
              <div className="space-y-3.5">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#0a1e3f] tracking-tight">
                  Key Features & Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-[#e2e8f0] flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-[#0a1e3f] leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Children custom page slots */}
              {children}

              {/* Action Banner */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a1e3f] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-white/10">
                <div className="max-w-md">
                  <h3 className="font-heading text-lg font-semibold text-white mb-1">
                    Ready to open your account?
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Visit any of our regional branches with your identification documents or submit an inquiry online.
                  </p>
                </div>
                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all shrink-0"
                >
                  <Link to="/contact">
                    {ctaText}
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Requirements Card */}
              <div className="rounded-2xl bg-white border border-[#e2e8f0] p-6 sm:p-7 lg:sticky lg:top-24">
                <div className="flex items-center gap-2 pb-4 border-b border-[#e2e8f0] mb-5">
                  <ShieldCheck className="h-5 w-5 text-[#0284c7]" />
                  <h4 className="font-heading text-base font-semibold text-[#0a1e3f]">
                    Requirements
                  </h4>
                </div>

                <ul className="space-y-3 mb-6">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#0a1e3f]/85 leading-relaxed p-1.5 rounded-lg bg-[#f0f7ff]/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0 mt-1.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                {fees && (
                  <div className="pt-4 pb-5 border-t border-[#e2e8f0]">
                    <div className="text-xs text-[#64748b] font-medium uppercase tracking-wider">Schedule of Fees</div>
                    <div className="text-xl font-heading font-bold text-[#0a1e3f] mt-0.5">{fees}</div>
                  </div>
                )}

                <Button variant="outlineNeutral" className="w-full rounded-full text-xs" asChild>
                  <Link to="/contact">
                    Download Account Forms
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
