import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { Building2, Globe, TrendingUp, ShieldCheck, Users, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CorporateBanking() {
  const corporateBenefits = [
    {
      title: "Commercial Credit Facilities",
      description: "Structured commercial debt financing for large-scale operations, supply contracts, and asset acquisitions.",
      icon: TrendingUp,
      bg: "#bcffbb",
      accent: "#34c771"
    },
    {
      title: "Corporate Liquidity Management",
      description: "Optimized corporate treasury yield placements with dual-signatory authorization and sweep accounts.",
      icon: ShieldCheck,
      bg: "#fdedea",
      accent: "#f73b20"
    },
    {
      title: "Trade & Vendor Financing",
      description: "Local invoice discounting, contractor performance guarantees, and supplier advance financing.",
      icon: Globe,
      bg: "#e7dcdb",
      accent: "#477ee9"
    },
    {
      title: "Corporate Payroll & Collections",
      description: "Automated NIBSS bulk payroll execution, statutory tax remittances, and structured merchant collections.",
      icon: Building2,
      bg: "#f5ffbb",
      accent: "#360802"
    },
  ];

  return (
    <BankingServiceLayout
      title="Corporate & Commercial Banking"
      subtitle="Institutional Banking Solutions"
      description="Supporting registered enterprises and corporate contractors across Rivers State with structured liquidity management, high-volume settlement rails, and commercial credit."
      icon={Briefcase}
      image="/images/hero-home.png"
      whoItIsFor="Registered limited liability companies, commercial contractors, and institutional employers."
      benefits={[
        "Assigned Senior Corporate Relationship Manager",
        "High-volume inter-bank settlement capabilities",
        "Negotiated yield placements on corporate deposits",
        "Customized corporate cheque books and clearing",
        "Multi-user corporate online banking portal",
        "Fast-track credit review for government contractor facilities"
      ]}
      requirements={[
        "Board Resolution authorizing account opening",
        "CAC Incorporation Documents (Status Report / Form 1.1)",
        "Tax Identification Number (TIN) and VAT certificate",
        "Valid IDs and BVN for all Directors and Authorized Signatories",
        "Two independent corporate bank reference forms",
        "SCUML certificate (for designated non-financial businesses)"
      ]}
      fees="Competitive corporate tariff per CBN guidelines"
      ctaText="Open Corporate Account"
    >
      <div className="mt-12 space-y-16">
        {/* Corporate Services Grid */}
        <section id="corporate-services">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-1">
              Institutional Capabilities
            </span>
            <h2 className="text-2xl lg:text-3xl font-heading font-medium text-[#360802]">
              Corporate Banking Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporateBenefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-cards bg-white border border-[#e7dcdb] shadow-lift flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: benefit.bg, color: benefit.accent }}
                  >
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#360802] mb-2">{benefit.title}</h3>
                  <p className="text-xs text-[#ababab] leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dedicated Corporate Advisory Card */}
        <section id="relationship-management">
          <div className="p-8 lg:p-12 rounded-cards bg-[#fdedea] border border-[#e7dcdb] shadow-lift">
            <div className="max-w-3xl space-y-6">
              <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block">
                Executive Partnership
              </span>

              <h2 className="font-heading text-2xl lg:text-3xl font-medium text-[#360802] tracking-tight leading-tight">
                Dedicated Commercial Relationship Management
              </h2>

              <p className="text-xs text-[#360802]/80 leading-relaxed">
                Every corporate client is paired with an experienced commercial banker who acts as a single point of contact for credit restructuring, trade documentation, and operational escalations.
              </p>

              <div className="pt-2">
                <Button variant="pill" size="default" asChild className="shadow-brand">
                  <Link to="/contact">
                    Speak with Corporate Banking Desk
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BankingServiceLayout>
  );
}
