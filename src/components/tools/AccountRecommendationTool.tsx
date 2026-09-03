import { useState } from "react";
import { ArrowRight, User, Briefcase, GraduationCap, CheckCircle2, ShieldCheck } from "lucide-react";
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
    bg: "#bcffbb"
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
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#fdedea]/40 to-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-10">
          <div className="md:col-span-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
              Account Selector
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Find the right banking solution for your situation.
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-[#ababab] text-sm leading-relaxed">
              Select your profile to view tailored account features and regulatory terms.
            </p>
          </div>
        </div>

        {/* 3D Interactive Selector Container */}
        <div className="rounded-3xl bg-white border border-[#e7dcdb] p-6 sm:p-10 shadow-3d-lift">
          
          {/* Profile Selection Tabs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-8 border-b border-[#e7dcdb]">
            {recommendations.map((item) => (
              <button
                key={item.match}
                onClick={() => setSelectedProfile(item.match)}
                className={`p-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xs ${
                  selectedProfile === item.match
                    ? "bg-[#360802] text-white shadow-md transform -translate-y-0.5"
                    : "bg-[#fdedea] text-[#360802] hover:bg-[#e7dcdb]/80"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.match}</span>
              </button>
            ))}
          </div>

          {/* Result Showcase Grid */}
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="lg:col-span-8 space-y-5">
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs" 
                style={{ backgroundColor: activeRec.bg, color: activeRec.color }}
              >
                <span>Recommended Package</span>
              </div>

              <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-[#360802] tracking-tight">
                {activeRec.title}
              </h3>

              <p className="text-[#360802]/80 text-sm leading-relaxed max-w-xl">
                {activeRec.description}
              </p>

              {/* 2-Column Responsive Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeRec.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#fdedea]/40">
                    <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                    <span className="text-xs font-medium text-[#360802]">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
                >
                  <a href={activeRec.ctaLink}>
                    Open This Account
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </a>
                </Button>
                <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                  <a href="/contact">
                    Speak with an Advisor
                  </a>
                </Button>
              </div>
            </div>

            {/* 3D Recommendation Badge Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#fdedea] to-white rounded-2xl p-7 border border-[#e7dcdb] text-center flex flex-col items-center justify-center shadow-3d">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md transition-transform hover:scale-110"
                style={{ backgroundColor: activeRec.bg, color: activeRec.color }}
              >
                <activeRec.icon className="h-8 w-8" />
              </div>
              <div className="text-base font-bold text-[#360802] mb-1">Instant Account Opening</div>
              <p className="text-xs text-[#ababab] mb-4">Valid National ID & Utility document required.</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#f73b20] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#e7dcdb]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#34c771]" /> CBN Compliant
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
