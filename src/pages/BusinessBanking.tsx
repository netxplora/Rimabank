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
    bg: "#fdedea",
    accent: "#f73b20",
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
    bg: "#e7dcdb",
    accent: "#360802",
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
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-ui">
              <span>Commercial & Business Banking</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              Banking partnership built for <span className="text-[#f73b20]">enterprise scale</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              From growing SMEs to established corporations, Rima MFB provides the structured commercial banking architecture required to operate with efficiency and financial security.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/contact">
                  Open Business Account
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons">
                <Link to="/branches">
                  Meet a Relationship Officer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
              Commercial Products
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
              Structured solutions for enterprise operations.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {businessServices.map((service) => (
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
                      Explore Solutions
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Capabilities Section */}
      <section className="py-24 bg-[#fdedea] border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block">
                Operational Capabilities
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
                Corporate infrastructure designed for high transaction velocity.
              </h2>
              <p className="text-[#360802]/80 text-sm leading-relaxed">
                We provide the banking tools required by medium and large enterprises to automate supplier transactions, manage staff payrolls, and maintain liquidity balances.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Automated bulk staff payroll distribution",
                  "Fast settlement merchant POS terminal infrastructure",
                  "Direct vendor transfers with instant digital receipts",
                  "Customized trade finance and short-term working capital"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-medium text-[#360802]">
                    <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button variant="pill" size="lg" asChild className="shadow-brand">
                  <Link to="/contact">
                    Open a Corporate Account
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-cards bg-white border border-[#e7dcdb] p-8 shadow-lift space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#e7dcdb]">
                <ShieldCheck className="h-6 w-6 text-[#f73b20]" />
                <div>
                  <h4 className="font-heading text-base font-bold text-[#360802]">Institutional Account Desk</h4>
                  <p className="text-xs text-[#ababab]">Dedicated Relationship Management</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#360802]/80">
                <p>Every commercial account is assigned an accredited relationship manager based in Port Harcourt to ensure prompt resolution of trade finance and operational requests.</p>
                <div className="p-4 rounded-xl bg-[#fdedea] border border-[#e7dcdb]">
                  <span className="font-semibold text-[#360802] block mb-1">Documentation Requirements:</span>
                  <ul className="list-disc pl-4 space-y-1 text-[#ababab]">
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
      </section>
    </Layout>
  );
}
