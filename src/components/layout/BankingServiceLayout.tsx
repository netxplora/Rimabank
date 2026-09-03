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
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold uppercase tracking-wider text-[#360802]">
              <Icon className="h-3.5 w-3.5 text-[#f73b20]" />
              <span>{subtitle}</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#360802] tracking-tight leading-[1.05]">
              {title}
            </h1>

            <p className="text-[#360802]/80 text-base sm:text-lg leading-relaxed">
              {description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/contact">
                  {ctaText}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Product Overview 3D Card */}
              <div className="card-3d p-6 sm:p-8 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d space-y-4">
                <h2 className="font-heading text-2xl font-semibold text-[#360802] tracking-tight">
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

              {/* Key Benefits 2-Column Responsive Grid */}
              <div className="space-y-5">
                <h3 className="font-heading text-2xl font-semibold text-[#360802] tracking-tight">
                  Key Features & Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="card-3d p-4 sm:p-5 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#34c771] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-[#360802] leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Children custom page slots */}
              {children}

              {/* Action 3D Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#360802] via-[#450b03] to-[#250501] text-white shadow-3d-lift flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/15">
                <div className="max-w-md">
                  <h3 className="font-heading text-xl font-semibold text-white mb-1">
                    Ready to open your account?
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Visit any of our regional branches with your identification documents or submit an inquiry online.
                  </p>
                </div>
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all shrink-0"
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
              {/* Requirements 3D Card */}
              <div className="card-3d rounded-2xl bg-white border border-[#e7dcdb] p-6 sm:p-7 shadow-3d lg:sticky lg:top-24">
                <div className="flex items-center gap-2 pb-4 border-b border-[#e7dcdb] mb-5">
                  <ShieldCheck className="h-5 w-5 text-[#f73b20]" />
                  <h4 className="font-heading text-base font-semibold text-[#360802]">
                    Requirements
                  </h4>
                </div>

                <ul className="space-y-3 mb-6">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#360802]/85 leading-relaxed p-1.5 rounded-lg bg-[#fdedea]/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f73b20] shrink-0 mt-1.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                {fees && (
                  <div className="pt-4 pb-5 border-t border-[#e7dcdb]">
                    <div className="text-xs text-[#ababab] font-medium uppercase tracking-wider">Schedule of Fees</div>
                    <div className="text-xl font-heading font-bold text-[#360802] mt-0.5">{fees}</div>
                  </div>
                )}

                <Button variant="outlineNeutral" className="w-full rounded-full text-xs" asChild>
                  <Link to="/downloads">
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
