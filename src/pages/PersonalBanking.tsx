import { Layout } from "@/components/layout/Layout";
import { Wallet, CreditCard, GraduationCap, CheckCircle2, ArrowRight, ShieldCheck, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const personalServices = [
  {
    id: "savings",
    title: "Savings & Fixed Deposits",
    icon: Wallet,
    category: "Yield & Accumulation",
    bg: "#bcffbb",
    accent: "#34c771",
    description: "Build capital with structured deposit plans offering competitive annualized interest yields and zero hidden maintenance fees.",
    href: "/personal-banking#savings",
    benefits: [
      "Competitive annual interest yields calculated daily and credited quarterly",
      "Zero mandatory minimum operating balance requirements",
      "Instant debit card issuance for nationwide ATM and POS access",
      "24/7 Mobile app and online banking platform access",
      "Automated standing orders for structured monthly savings",
      "Direct qualification for retail credit and salary advance facilities"
    ],
    requirements: [
      "Duly completed Account Opening Form",
      "Valid Government ID (NIN, Voter's Card, Driver's License, or Passport)",
      "Bank Verification Number (BVN)",
      "Recent Utility Bill (Electricity, Water, or Waste not older than 3 months)",
      "Two (2) recent passport photographs"
    ],
    fees: "Zero monthly maintenance fees"
  },
  {
    id: "current",
    title: "Personal Current Accounts",
    icon: CreditCard,
    category: "Daily Liquidity",
    bg: "#e2e8f0",
    accent: "#477ee9",
    description: "Designed for day-to-day liquidity, salary deposits, personalized cheque books, and seamless digital transaction capacity.",
    href: "/personal-banking#current",
    benefits: [
      "Unrestricted monthly transaction volume and deposit frequency",
      "Personalized cheque book issuance and third-party clearing",
      "Eligibility for personal overdrafts and short-term lines of credit",
      "Instant debit card linkage for nationwide ATM, POS, and online checkout",
      "Direct NIBSS instant settlement with real-time SMS/Email alerts",
      "Priority branch customer desk assistance"
    ],
    requirements: [
      "Duly completed Current Account Opening Form",
      "Valid Government Identification (NIN, Voter's Card, Driver's License, or Passport)",
      "Two (2) independent external account references",
      "Proof of Residential Address (Utility Bill not older than 3 months)",
      "Two (2) recent passport photographs"
    ],
    fees: "Transparent tariff aligned with Central Bank of Nigeria guidelines"
  },
  {
    id: "student",
    title: "Student & Campus Accounts",
    icon: GraduationCap,
    category: "Youth & Study",
    bg: "#f5ffbb",
    accent: "#0a1e3f",
    description: "Foundational banking accounts for secondary and university students with zero maintenance fees and study loan access.",
    href: "/personal-banking#student",
    benefits: [
      "Zero monthly maintenance or administrative fees",
      "Complimentary student Verve/Mastercard debit card",
      "24/7 Mobile app banking for instant transfers",
      "Exclusive eligibility for educational support micro-credit",
      "Transparent zero-hidden-fee transaction terms",
      "Campus financial literacy workshops and budgeting tools"
    ],
    requirements: [
      "Valid Student Identification Card or Admission Letter",
      "National Identity Number (NIN) or BVN",
      "Two (2) recent passport photographs",
      "Verified residential or campus hostel address",
      "Zero initial deposit required to open"
    ],
    fees: "₦0 Monthly maintenance charges"
  }
];

export default function PersonalBanking() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span>Personal Banking Services</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Personal accounts structured for <span className="text-[#0284c7]">clarity</span> and <span className="text-[#0284c7]">security</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-sm sm:text-base leading-relaxed">
              Explore our range of personal deposit and checking accounts structured with zero hidden charges, competitive interest yields, and instant digital transfers.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <Button
                variant="pill"
                size="default"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/contact">
                  Open an Account
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="default" asChild className="rounded-full">
                <Link to="/branches">
                  Locate Nearest Branch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Account Products 3-Column Grid */}
      <section className="py-8 sm:py-10 md:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Product Portfolio
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
              Choose the account matching your lifestyle.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {personalServices.map((service, index) => (
              <div 
                key={service.id} 
                className="p-6 sm:p-7 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col justify-between hover:border-[#0284c7]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      <service.icon className="h-5 w-5" />
                    </div>
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-black/5"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-[#0a1e3f] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#64748b] leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-4 pt-3.5 border-t border-[#e2e8f0]/60">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#0a1e3f]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#34c771] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Accordion type="single" collapsible className="w-full mb-6">
                    <AccordionItem value="requirements" className="border-[#e2e8f0]/60">
                      <AccordionTrigger className="py-2.5 text-xs font-semibold text-[#0a1e3f] hover:no-underline">
                        Opening Requirements
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-[#64748b]">
                          {service.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="fees" className="border-[#e2e8f0]/60">
                      <AccordionTrigger className="py-2.5 text-xs font-semibold text-[#0a1e3f] hover:no-underline">
                        Fees & Charges
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-[#64748b]">
                        {service.fees}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="pt-3.5 border-t border-[#e2e8f0]">
                  <Button
                    variant="pill"
                    size="default"
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                    asChild
                  >
                    <Link to={service.href}>
                      Explore Account Details
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner — Open Divided Layout (No card containers) */}
      <section className="py-8 sm:py-10 bg-white border-b border-[#e2e8f0]/60 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]/80 border-t border-b border-[#e2e8f0]/80 py-2">
            <div className="py-4 md:p-4 lg:p-5 flex items-start gap-3.5">
              <ShieldCheck className="h-5 w-5 text-[#34c771] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-sm font-semibold text-[#0a1e3f] mb-0.5">Central Bank Licensed</h4>
                <p className="text-xs text-[#64748b] leading-relaxed">Strict adherence to CBN financial safety ratios and consumer protection guidelines.</p>
              </div>
            </div>
            <div className="py-4 md:p-4 lg:p-5 flex items-start gap-3.5">
              <Landmark className="h-5 w-5 text-[#477ee9] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-sm font-semibold text-[#0a1e3f] mb-0.5">NDIC Insured</h4>
                <p className="text-xs text-[#64748b] leading-relaxed">Eligible customer deposits insured up to the maximum regulatory thresholds.</p>
              </div>
            </div>
            <div className="py-4 md:p-4 lg:p-5 flex items-start gap-3.5">
              <CreditCard className="h-5 w-5 text-[#0284c7] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-sm font-semibold text-[#0a1e3f] mb-0.5">Nationwide Interoperability</h4>
                <p className="text-xs text-[#64748b] leading-relaxed">Direct card and POS settlement across all Nigerian commercial bank ATMs and switches.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
