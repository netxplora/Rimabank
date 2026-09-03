import { useState } from "react";
import { ArrowRight, User, Briefcase, GraduationCap, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const recommendations = [
  {
    id: "student",
    title: "Student Savings Account",
    match: "Student",
    description: "Designed for youth & university students with zero maintenance fees, campus debit card, and study financing access.",
    benefits: ["₦0 Monthly maintenance charges", "Free instant debit card", "Access to educational financing", "Digital mobile banking"],
    icon: GraduationCap,
    ctaLink: "/personal-banking/student",
    color: "#34c771",
    bg: "#f5ffbb"
  },
  {
    id: "sme",
    title: "SME Commercial Account",
    match: "Business Owner",
    description: "Built for traders, enterprise owners, and growing businesses needing high limit transactions and fast working capital loans.",
    benefits: ["Dedicated relationship manager", "High-volume POS terminal provision", "Fast-track loan assessment", "Payroll processing support"],
    icon: Briefcase,
    ctaLink: "/business-banking/sme",
    color: "#f73b20",
    bg: "#fdedea"
  },
  {
    id: "current",
    title: "Standard Personal Current",
    match: "Salary Earner / Professional",
    description: "Structured for employed individuals and professionals desiring frictionless salary deposits, cheque facilities, and overdrafts.",
    benefits: ["Direct salary direct-deposit", "Cheque book issuance", "Eligible for salary advance loans", "Free digital statement dispatch"],
    icon: User,
    ctaLink: "/personal-banking/current",
    color: "#477ee9",
    bg: "#e7dcdb"
  }
];

export function AccountRecommendationTool() {
  const [selectedProfile, setSelectedProfile] = useState<string>("Student");

  const activeRec = recommendations.find(r => r.match === selectedProfile) || recommendations[0];

  return (
    <section className="py-24 bg-[#fdedea]/40 border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
            Account Selector
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-[#360802] tracking-tight leading-tight">
            Find the right banking solution for your situation.
          </h2>
          <p className="text-[#360802]/70 text-sm mt-2">
            Select your primary profile to view the recommended account structure and terms.
          </p>
        </div>

        {/* Interactive Selector Card */}
        <div className="rounded-cards bg-white border border-[#e7dcdb] p-8 lg:p-12 shadow-lift">
          {/* Profile Selection Tabs */}
          <div className="flex flex-wrap gap-3 pb-8 border-b border-[#e7dcdb]">
            {recommendations.map((item) => (
              <button
                key={item.match}
                onClick={() => setSelectedProfile(item.match)}
                className={`px-5 py-3 rounded-pills text-xs font-semibold uppercase tracking-ui transition-all duration-200 flex items-center gap-2 ${
                  selectedProfile === item.match
                    ? "bg-[#360802] text-white shadow-sm"
                    : "bg-[#fdedea] text-[#360802] hover:bg-[#e7dcdb]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.match}</span>
              </button>
            ))}
          </div>

          {/* Result Showcase */}
          <div className="pt-8 grid lg:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pills text-xs font-semibold" style={{ backgroundColor: activeRec.bg, color: activeRec.color }}>
                <span>Recommended Package</span>
              </div>

              <h3 className="font-heading text-2xl lg:text-3xl font-medium text-[#360802] tracking-tight">
                {activeRec.title}
              </h3>

              <p className="text-[#360802]/80 text-sm leading-relaxed max-w-xl">
                {activeRec.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {activeRec.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                    <span className="text-xs font-medium text-[#360802]">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button variant="pill" size="lg" asChild className="shadow-brand">
                  <a href={activeRec.ctaLink}>
                    Open This Account
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
                <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons">
                  <a href="/contact">
                    Speak with an Advisor
                  </a>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#fdedea] rounded-2xl p-8 border border-[#e7dcdb] text-center flex flex-col items-center justify-center">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 shadow-sm"
                style={{ backgroundColor: activeRec.bg, color: activeRec.color }}
              >
                <activeRec.icon className="h-10 w-10" />
              </div>
              <div className="text-sm font-bold text-[#360802] mb-1">Instant Opening</div>
              <p className="text-xs text-[#ababab] mb-4">Valid National ID & Utility document required.</p>
              <span className="text-[11px] font-semibold text-[#f73b20] uppercase tracking-ui">
                CBN Compliant Process
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
