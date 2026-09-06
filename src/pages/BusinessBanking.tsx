import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Briefcase,
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Store,
  ChevronRight,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const businessServices = [
  {
    id: "sme",
    title: "SME Commercial Banking",
    icon: Briefcase,
    category: "Growing Enterprises",
    rate: "Credit to ₦50M",
    bg: "#f0f7ff",
    accent: "#0284c7",
    description: "Structured capital, low-commission merchant POS terminals, and operational support designed for retailers, contractors, and manufacturers.",
    href: "/business-banking#sme",
    benefits: [
      "Commercial working capital facilities up to ₦50 Million",
      "Dedicated Business Banking Relationship Manager",
      "Point-of-Sale (POS) terminal issuance for merchant payment collection",
      "Higher daily electronic transfer thresholds for supplier payments",
      "Direct NIBSS payroll automation for staff salary settlement",
      "Business advisory, cash flow structuring, and financial audits"
    ],
    requirements: [
      "CAC Business Registration / Incorporation Documents (Status Report or Certificate)",
      "Tax Identification Number (TIN) Verification",
      "Valid Government ID and BVN for all Directors and Signatories",
      "Proof of Business Operational Address (Utility Bill not older than 3 months)",
      "Two (2) external corporate account references"
    ],
    fees: "Transparent commercial transaction fees in line with CBN standards"
  },
  {
    id: "corporate",
    title: "Corporate Checking Accounts",
    icon: Building2,
    category: "Large Operations",
    rate: "Multi-Signatory",
    bg: "#f8fafc",
    accent: "#0a1e3f",
    description: "Financial structure for established corporate entities and institutions requiring multi-signatory accounts and bulk cash flows.",
    href: "/business-banking#corporate",
    benefits: [
      "Automated multi-tier payroll disbursement",
      "Structured trade finance and contractor credit",
      "Customized institutional treasury terms",
      "Priority branch and executive desk support"
    ],
    requirements: [
      "Board Resolution authorizing account opening",
      "CAC Incorporation Documents (Status Report / Form 1.1)",
      "Tax Identification Number (TIN) and VAT certificate",
      "Valid IDs and BVN for all Directors and Authorized Signatories",
      "Two independent corporate bank reference forms",
      "SCUML certificate (for designated non-financial businesses)"
    ],
    fees: "Competitive corporate tariff per CBN guidelines"
  },
  {
    id: "investments",
    title: "Commercial Fixed Deposits",
    icon: TrendingUp,
    category: "Treasury Yield",
    rate: "Up to 13.0% p.a.",
    bg: "#f0fdf4",
    accent: "#16a34a",
    description: "Optimize corporate idle liquidity with secure, fixed-tenure deposit placements providing guaranteed yields and collateral backing.",
    href: "/personal-banking#savings",
    benefits: [
      "Competitive institutional interest yields",
      "Flexible maturity tenures (30 to 365 days)",
      "Usable as collateral for credit lines",
      "Immediate quarterly or end-of-tenure interest payouts"
    ],
    requirements: [
      "Active corporate or SME operating account",
      "Signed fixed deposit mandate letter",
      "Minimum placement of ₦1,000,000"
    ],
    fees: "No placement fees (penalties apply for premature liquidation)"
  }
];

export default function BusinessBanking() {
  const [turnover, setTurnover] = useState<number>(5000000);
  const [facilityType, setFacilityType] = useState<string>("working-capital");

  const eligibleCredit = Math.round(turnover * 0.35);

  const formatNaira = (val: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <Layout>
      <section className="relative bg-[#f8fafc] text-[#0a1e3f] pt-10 pb-14 sm:pt-14 sm:pb-20 border-b border-[#e2e8f0] overflow-hidden">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#0284c7]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#cbd5e1] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider shadow-xs">
                <Briefcase className="h-3.5 w-3.5 text-[#0284c7]" />
                <span>Commercial Banking & SME Finance</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-[1.08]">
                Commercial banking built for <span className="text-[#0284c7]">business scale</span>.
              </h1>

              <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                We empower manufacturers, retailers, logistics operators, and contractors with structured working capital, high-limit merchant POS terminals, and dedicated relationship managers.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs px-6 h-11 shadow-brand justify-center"
                >
                  <Link to="/contact">
                    <span>Open Business Account</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="border-slate-300 hover:bg-slate-100 text-[#0a1e3f] font-semibold text-xs px-5 h-11 justify-center"
                >
                  <Link to="/loans">
                    Apply for Commercial Credit
                  </Link>
                </Button>
              </div>

              <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold text-[#0a1e3f]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ₦5.2B+ Disbursed
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 font-semibold text-[#0a1e3f]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  2,400+ Enterprises Supported
                </span>
                <span>&bull;</span>
                <span className="text-slate-500">Rivers State & Niger Delta</span>
              </div>
            </div>

            <div className="lg:col-span-5 perspective-1000 relative">
              <div className="rounded-3xl bg-[#0a1e3f] text-white p-7 border border-blue-900 shadow-2xl space-y-6 transform-3d-card">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-[#38bdf8] font-bold uppercase tracking-widest block">
                      Commercial Facility
                    </span>
                    <div className="text-xl font-heading font-bold text-white mt-0.5">
                      SME Working Capital
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    ₦50M
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-blue-200/60 uppercase font-semibold block">Turnaround</span>
                    <span className="font-heading font-bold text-white text-sm mt-0.5 block">24 – 48 Hours</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-blue-200/60 uppercase font-semibold block">Interest Rate</span>
                    <span className="font-heading font-bold text-emerald-400 text-sm mt-0.5 block">From 2.5% Monthly</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-blue-100/75 border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    NDIC Insured Bank
                  </span>
                  <Link
                    to="/loans"
                    className="text-[#38bdf8] font-semibold hover:text-white flex items-center gap-1 transition-colors"
                  >
                    View Terms <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-3 sm:-right-4 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2.5 animate-float-slow hidden sm:flex">
                <div className="w-7 h-7 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center font-bold text-xs">
                  <Store className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#0a1e3f] block leading-tight">Same-Day Settlement</span>
                  <span className="text-slate-500 text-[10px]">Merchant POS Terminals</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-[#0a1e3f] text-white p-6 sm:p-10 lg:p-12 border border-blue-900 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#38bdf8] text-xs font-semibold uppercase tracking-wider">
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Commercial Credit Estimator</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Estimate your enterprise borrowing capacity.
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/75 leading-relaxed max-w-xl">
                  Slide your verified average monthly business turnover to estimate eligible working capital credit limits.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-100/70">Average Monthly Business Turnover</span>
                      <span className="font-heading font-bold text-white text-sm">{formatNaira(turnover)}</span>
                    </div>
                    <input
                      type="range"
                      min={500000}
                      max={50000000}
                      step={500000}
                      value={turnover}
                      onChange={(e) => setTurnover(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                    />
                    <div className="flex justify-between text-[10px] text-blue-200/50">
                      <span>₦500,000</span>
                      <span>₦50,000,000+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0c2445] p-6 sm:p-8 rounded-2xl border border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <span className="text-blue-200/60 font-semibold uppercase">Indicative Credit Limit</span>
                  <span className="text-emerald-400 font-bold">Fast Approval</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center text-blue-100/70">
                    <span>Working Capital Line:</span>
                    <span className="font-heading font-bold text-[#38bdf8] text-base sm:text-xl">{formatNaira(eligibleCredit)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs text-blue-100/70">
                    <span>Repayment Horizon:</span>
                    <span className="font-semibold text-white">Up to 24 Months</span>
                  </div>
                </div>

                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs h-11 shadow-brand"
                >
                  <Link to="/contact">
                    <span>Apply with Relationship Manager</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Corporate Solutions (Minimal Open Editorial Layout) ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
                Corporate Solutions
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                Commercial accounts tailored to your industry.
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm md:text-right leading-relaxed">
              Structured checking accounts, corporate treasury placements, and dedicated credit facilities for regional enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-b border-slate-200">
            {businessServices.map((service) => (
              <div
                key={service.id}
                className="py-8 md:p-6 lg:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      <service.icon className="h-5 w-5" />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      {service.rate}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#0a1e3f] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {service.benefits.slice(0, 4).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#0a1e3f]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 mb-6 pt-3 border-t border-slate-100">
                    <div className="font-semibold text-[#0a1e3f] text-[11px] uppercase tracking-wider">CAC Documentation:</div>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-500">
                      {service.requirements.slice(0, 3).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button
                    variant="pill"
                    size="default"
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 shadow-xs"
                    asChild
                  >
                    <Link to="/contact">
                      <span>Open Commercial Account</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Advisory & Governance Section */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Capabilities (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block">
                Commercial Infrastructure
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
                Enterprise cash flow & merchant settlement.
              </h2>
              <p className="text-[#0a1e3f]/80 text-sm sm:text-base leading-relaxed">
                Connect your business to instant settlement payment infrastructure with multi-signatory governance, automated bulk payroll, and dedicated credit lines.
              </p>

              {/* Open 2-Column Capabilities Checklist (No Box Containers) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Automated bulk staff payroll distribution",
                  "Fast settlement merchant POS terminal infrastructure",
                  "Direct vendor transfers with instant digital receipts",
                  "Customized trade finance and working capital"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#f0f7ff]/70 transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#0a1e3f] leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  variant="pill"
                  size="default"
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

            {/* Right Desk Summary (5 cols) */}
            <div className="lg:col-span-5 perspective-1000">
              <div className="rounded-2xl bg-gradient-to-br from-[#f0f7ff] to-white border border-[#e2e8f0] p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#e2e8f0]">
                  <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#0a1e3f]">Institutional Account Desk</h4>
                    <p className="text-[10px] text-[#64748b]">Dedicated Relationship Management</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[#0a1e3f]/85">
                  <p>Every commercial account is assigned an accredited relationship manager based in Port Harcourt to ensure prompt resolution of trade finance and operational requests.</p>
                  <div className="pt-2 border-t border-[#e2e8f0]">
                    <span className="font-semibold text-[#0a1e3f] block mb-1 text-[11px] uppercase tracking-wider">Required Corporate Records:</span>
                    <ul className="list-disc pl-4 space-y-1 text-[#64748b] text-[11px]">
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
