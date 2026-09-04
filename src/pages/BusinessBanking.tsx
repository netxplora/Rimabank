import { Layout } from "@/components/layout/Layout";
import { Briefcase, Building2, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const businessServices = [
  {
    id: "sme",
    title: "SME Commercial Banking",
    icon: Briefcase,
    category: "Growing Enterprises",
    bg: "#f0f7ff",
    accent: "#0284c7",
    description: "Structured capital, low-commission merchant POS terminals, and operational support designed for retailers, contractors, and manufacturers.",
    href: "/business-banking/sme",
    benefits: [
      "Streamlined commercial credit assessment",
      "Dedicated corporate relationship officer",
      "High-limit daily electronic transaction volume",
      "Customized working capital overdraft lines"
    ]
  },
  {
    id: "corporate",
    title: "Corporate Accounts",
    icon: Building2,
    category: "Large Operations",
    bg: "#e2e8f0",
    accent: "#0a1e3f",
    description: "Financial structure for established corporate entities and institutions requiring multi-signatory accounts and bulk cash flows.",
    href: "/business-banking/corporate",
    benefits: [
      "Automated multi-tier payroll disbursement",
      "Structured trade finance and contractor credit",
      "Customized institutional treasury terms",
      "Priority branch and executive desk support"
    ]
  },
  {
    id: "investments",
    title: "Commercial Fixed Deposits",
    icon: TrendingUp,
    category: "Treasury Yield",
    bg: "#bcffbb",
    accent: "#34c771",
    description: "Optimize corporate idle liquidity with secure, fixed-tenure deposit placements providing guaranteed yields and collateral backing.",
    href: "/personal-banking/savings",
    benefits: [
      "Competitive institutional interest yields",
      "Flexible maturity tenures (30 to 365 days)",
      "Usable as collateral for credit lines",
      "Immediate quarterly or end-of-tenure interest payouts"
    ]
  }
];

export default function BusinessBanking() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span>Commercial & Business Banking</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.05]">
              Banking partnership built for <span className="text-[#0284c7]">enterprise scale</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-base sm:text-lg leading-relaxed">
              From growing SMEs to established corporations, Rima MFB provides the structured commercial banking architecture required to operate with efficiency and financial security.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/contact">
                  Open Business Account
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                <Link to="/branches">
                  Meet a Relationship Officer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services 3-Column Grid */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
              Commercial Products
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Structured solutions for enterprise operations.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {businessServices.map((service) => (
              <div 
                key={service.id} 
                className="p-7 sm:p-8 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col justify-between hover:border-[#0284c7]/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      <service.icon className="h-6 w-6" />
                    </div>
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-black/5"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-[#0a1e3f] mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-[#e2e8f0]/60">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#0a1e3f]">
                        <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e2e8f0]">
                  <Button
                    variant="pill"
                    size="default"
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                    asChild
                  >
                    <Link to={service.href}>
                      Explore Solutions
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Capabilities 2-Column Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f0f7ff]/60 to-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Capabilities (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block">
                Operational Capabilities
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
                Corporate infrastructure designed for high transaction velocity.
              </h2>
              <p className="text-[#0a1e3f]/80 text-base leading-relaxed">
                We provide the banking tools required by medium and large enterprises to automate supplier transactions, manage staff payrolls, and maintain liquidity balances.
              </p>

              {/* 2-Column Capabilities Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Automated bulk staff payroll distribution",
                  "Fast settlement merchant POS terminal infrastructure",
                  "Direct vendor transfers with instant digital receipts",
                  "Customized trade finance and working capital"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-[#e2e8f0]/80 shadow-xs">
                    <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#0a1e3f] leading-tight">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                >
                  <Link to="/contact">
                    Open a Corporate Account
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Desk Card (5 cols) */}
            <div className="lg:col-span-5 perspective-1000">
              <div className="rounded-3xl bg-white border border-[#e2e8f0] p-7 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-[#e2e8f0]">
                  <ShieldCheck className="h-6 w-6 text-[#0284c7]" />
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#0a1e3f]">Institutional Account Desk</h4>
                    <p className="text-xs text-[#64748b]">Dedicated Relationship Management</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[#0a1e3f]/85">
                  <p>Every commercial account is assigned an accredited relationship manager based in Port Harcourt to ensure prompt resolution of trade finance and operational requests.</p>
                  <div className="p-4 rounded-xl bg-[#f0f7ff] border border-[#e2e8f0]">
                    <span className="font-semibold text-[#0a1e3f] block mb-1">Documentation Requirements:</span>
                    <ul className="list-disc pl-4 space-y-1 text-[#64748b]">
                      <li>CAC Certificate of Incorporation</li>
                      <li>Status Report / Memorandum & Articles</li>
                      <li>Board Resolution for Account Opening</li>
                      <li>Valid National ID of Authorized Signatories</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
