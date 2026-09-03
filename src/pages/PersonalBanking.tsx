import { Layout } from "@/components/layout/Layout";
import { Wallet, CreditCard, GraduationCap, CheckCircle2, ArrowRight, ShieldCheck, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const personalServices = [
  {
    id: "savings",
    title: "Savings & Fixed Deposits",
    icon: Wallet,
    category: "Yield & Accumulation",
    bg: "#bcffbb",
    accent: "#34c771",
    description: "Build capital with structured deposit plans offering competitive annualized interest yields and zero hidden maintenance fees.",
    href: "/personal-banking/savings",
    benefits: [
      "Competitive annual interest rates",
      "Zero mandatory monthly maintenance charges",
      "Free instant debit card issuance at branch",
      "Immediate liquidity and flexible tenure"
    ]
  },
  {
    id: "current",
    title: "Personal Current Accounts",
    icon: CreditCard,
    category: "Daily Liquidity",
    bg: "#e7dcdb",
    accent: "#477ee9",
    description: "Designed for day-to-day liquidity, salary deposits, personalized cheque books, and seamless digital transaction capacity.",
    href: "/personal-banking/current",
    benefits: [
      "Transparent schedule of banking fees",
      "Personalized cheque book provision",
      "Eligible for overdraft facilities",
      "Instant SMS and email notifications"
    ]
  },
  {
    id: "student",
    title: "Student & Campus Accounts",
    icon: GraduationCap,
    category: "Youth & Study",
    bg: "#f5ffbb",
    accent: "#360802",
    description: "Foundational banking accounts for secondary and university students with zero maintenance fees and study loan access.",
    href: "/personal-banking/student",
    benefits: [
      "₦0 Monthly maintenance charges",
      "Free student debit card",
      "Access to educational micro-credit",
      "Mobile banking on iOS and Android"
    ]
  }
];

export default function PersonalBanking() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-ui">
              <span>Personal Banking Services</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              Personal accounts structured for <span className="text-[#f73b20]">clarity</span> and <span className="text-[#f73b20]">security</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              Explore our range of personal deposit and checking accounts structured with zero hidden charges, competitive interest yields, and instant digital transfers.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/contact">
                  Open an Account
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons">
                <Link to="/branches">
                  Locate Nearest Branch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Account Products Grid */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
              Product Portfolio
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
              Choose the account matching your lifestyle.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {personalServices.map((service) => (
              <div 
                key={service.id} 
                className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      <service.icon className="h-6 w-6" />
                    </div>
                    <span 
                      className="text-[10px] font-semibold uppercase tracking-ui px-2.5 py-1 rounded-pills"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-medium text-[#360802] mb-3">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#ababab] leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-[#e7dcdb]/60">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#360802]">
                        <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e7dcdb]">
                  <Button variant="pill" size="default" className="w-full shadow-brand" asChild>
                    <Link to={service.href}>
                      Explore Account Details
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-20 bg-[#fdedea] border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-[#34c771] shrink-0 mt-1" />
              <div>
                <h4 className="font-heading text-base font-semibold text-[#360802] mb-1">Central Bank Licensed</h4>
                <p className="text-xs text-[#ababab]">Strict adherence to CBN financial safety ratios and consumer protection guidelines.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Landmark className="h-6 w-6 text-[#477ee9] shrink-0 mt-1" />
              <div>
                <h4 className="font-heading text-base font-semibold text-[#360802] mb-1">NDIC Insured</h4>
                <p className="text-xs text-[#ababab]">Eligible customer deposits insured up to the maximum regulatory thresholds.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CreditCard className="h-6 w-6 text-[#f73b20] shrink-0 mt-1" />
              <div>
                <h4 className="font-heading text-base font-semibold text-[#360802] mb-1">Nationwide Interoperability</h4>
                <p className="text-xs text-[#ababab]">Direct card and POS settlement across all Nigerian commercial bank ATMs and switches.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
