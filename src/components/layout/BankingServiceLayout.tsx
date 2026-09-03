import { ReactNode, useEffect } from "react";
import { Layout } from "./Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, LucideIcon, ShieldCheck, HelpCircle } from "lucide-react";
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
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold uppercase tracking-ui text-[#360802]">
              <Icon className="h-3.5 w-3.5 text-[#f73b20]" />
              <span>{subtitle}</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-[#360802] tracking-tight leading-[1.02]">
              {title}
            </h1>

            <p className="text-[#360802]/80 text-lg leading-relaxed">
              {description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/contact">
                  {ctaText}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons">
                <Link to="/branches">
                  Locate Branch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Product Overview */}
              <div className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift space-y-4">
                <h2 className="font-heading text-2xl font-medium text-[#360802] tracking-tight">
                  Product Overview
                </h2>
                <p className="text-[#360802]/80 text-sm leading-relaxed">
                  {description}
                </p>
                <div className="pt-2 p-4 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs text-[#360802]">
                  <span className="font-bold">Target Customer: </span>
                  {whoItIsFor}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-medium text-[#360802] tracking-tight">
                  Key Features & Advantages
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="p-5 rounded-cards bg-white border border-[#e7dcdb] shadow-lift flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#34c771] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-[#360802] leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Children custom page slots */}
              {children}

              {/* Action Banner */}
              <div className="p-8 md:p-10 rounded-cards bg-[#360802] text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-md">
                  <h3 className="font-heading text-xl font-semibold text-white mb-1">
                    Ready to open your account?
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Visit any of our regional branches with your identification documents or submit an inquiry online.
                  </p>
                </div>
                <Button variant="pill" size="lg" asChild className="bg-[#f73b20] hover:bg-[#f84d35] shrink-0">
                  <Link to="/contact">
                    {ctaText}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Requirements Card */}
              <div className="rounded-cards bg-white border border-[#e7dcdb] p-6 shadow-lift lg:sticky lg:top-24">
                <div className="flex items-center gap-2 pb-4 border-b border-[#e7dcdb] mb-6">
                  <ShieldCheck className="h-5 w-5 text-[#f73b20]" />
                  <h4 className="font-heading text-base font-semibold text-[#360802]">
                    Requirements
                  </h4>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#360802]/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f73b20] shrink-0 mt-1.5" />
                      {req}
                    </li>
                  ))}
                </ul>

                {fees && (
                  <div className="pt-4 pb-6 border-t border-[#e7dcdb]">
                    <div className="text-xs text-[#ababab] font-medium uppercase tracking-ui">Schedule of Fees</div>
                    <div className="text-xl font-heading font-bold text-[#360802] mt-0.5">{fees}</div>
                  </div>
                )}

                <Button variant="outlineNeutral" className="w-full rounded-buttons text-xs" asChild>
                  <Link to="/downloads">
                    Download Account Application Forms
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
