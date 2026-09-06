import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { TrendingUp, Users, Briefcase, CreditCard, CheckCircle2, ShieldCheck, Clock, FileCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LoanCalculator } from "@/components/tools/LoanCalculator";
import SavingsCalculator from "@/components/tools/SavingsCalculator";

export default function LoanServices() {
  const loanTypes = [
    {
      id: "microloan",
      title: "Micro-Credit Facilities",
      icon: Users,
      badge: "Fast 24-48h Approval",
      bg: "#bcffbb",
      accent: "#16a34a",
      description: "Accessible short-term credit designed for independent retailers and artisans requiring immediate working capital without complex collateral.",
      benefits: [
        "Minimal collateral requirements",
        "Fast 24 to 48-hour approval turnaround",
        "Structured weekly or monthly repayment cycles",
        "Automatic credit limit upgrades upon timely repayment"
      ],
      whoItIsFor: "Independent traders, artisans, and sole proprietors."
    },
    {
      id: "business",
      title: "Commercial SME Loans",
      icon: Briefcase,
      badge: "Up to ₦50 Million",
      bg: "#f0f7ff",
      accent: "#0284c7",
      description: "Structured commercial funding engineered for registered enterprises to purchase inventory, expand capacity, and acquire capital assets.",
      benefits: [
        "Credit lines up to ₦50 Million",
        "Flexible repayment terms up to 24 months",
        "Dedicated commercial loan relationship manager",
        "Direct trade and equipment financing options"
      ],
      whoItIsFor: "Registered SMEs, corporate contractors, and commercial businesses."
    },
    {
      id: "personal",
      title: "Personal Salary Advance",
      icon: CreditCard,
      badge: "Same-Day Liquidity",
      bg: "#e2e8f0",
      accent: "#477ee9",
      description: "Short-term personal credit for formally employed salary earners to address immediate household expenses prior to payday.",
      benefits: [
        "Up to 50% of verified monthly salary",
        "Automated direct payroll repayment",
        "Same-day approval and disbursement",
        "Zero physical asset pledge required"
      ],
      whoItIsFor: "Verified public and private sector salary earners."
    }
  ];

  return (
    <BankingServiceLayout
      title="Credit & Loan Facilities"
      subtitle="Structured Commercial Capital"
      description="Whether you require working capital to scale business inventory or financing for personal requirements, our credit facilities are accessible, transparent, and prompt."
      icon={TrendingUp}
      image="/images/hero-home.png"
      whoItIsFor="Formally employed professionals, registered SMEs, and active Rima MFB accountholders."
      benefits={[
        "Fast credit review within 24 to 48 hours",
        "Streamlined documentation requirements",
        "Flexible repayment terms up to 24 months",
        "Competitive, transparent interest rates",
        "Zero hidden documentation charges",
        "Automated direct debit integration"
      ]}
      requirements={[
        "Duly completed Loan Application Form",
        "3 to 6 months verified bank statement",
        "Valid Identification (NIN, Voter's Card, or Passport)",
        "Verified BVN enrollment",
        "Guarantor documentation or commercial asset (depending on amount)"
      ]}
      fees="Interest from 2.5% monthly"
      ctaText="Apply for Credit"
    >
      <div className="mt-6 space-y-10 sm:space-y-12">
        
        {/* Credit Facilities (Minimal Open Layout) */}
        <section id="loan-types">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
                Credit Categories
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-[#0a1e3f]">
                Structured Credit Facilities
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748b]">
              <ShieldCheck className="h-4 w-4 text-[#16a34a]" />
              <span>CBN Regulated Interest Structures</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-b border-slate-200">
            {loanTypes.map((loan) => (
              <div 
                key={loan.id} 
                className="py-8 md:p-6 lg:p-8 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: loan.bg, color: loan.accent }}
                    >
                      <loan.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f8fafc] text-[#0a1e3f] border border-[#e2e8f0]">
                      {loan.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-semibold text-[#0a1e3f] mb-1.5">{loan.title}</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">{loan.description}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#e2e8f0]">
                    {loan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#0a1e3f]">
                        <CheckCircle2 className="h-4 w-4 text-[#16a34a] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-[#e2e8f0] text-[11px] text-[#64748b]">
                  <span className="font-semibold text-[#0a1e3f]">Eligibility: </span>{loan.whoItIsFor}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Calculators 2-Column Grid */}
        <section id="loan-calculators">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Interactive Tools
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-[#0a1e3f]">
              Financial Projection Calculators
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] mt-1">
              Simulate monthly loan repayments or forecast compound interest returns on term deposits.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="h-full">
              <LoanCalculator />
            </div>
            <div className="h-full">
              <SavingsCalculator />
            </div>
          </div>
        </section>

        {/* 4-Step Loan Application Workflow (Minimal Open Layout) */}
        <section className="bg-[#0a1e3f] text-white rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0284c7]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8] block mb-1">
                Application Workflow
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-white">
                How Our Credit Approval Process Works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-widest">Step 01</div>
                <h4 className="font-heading text-sm font-semibold text-white">Submit Request</h4>
                <p className="text-xs text-blue-100/75 leading-relaxed">Complete the credit application online or at any branch customer desk.</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-widest">Step 02</div>
                <h4 className="font-heading text-sm font-semibold text-white">Document Review</h4>
                <p className="text-xs text-blue-100/75 leading-relaxed">Provide 3-6 months bank statement and valid identification documents.</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-widest">Step 03</div>
                <h4 className="font-heading text-sm font-semibold text-white">Credit Assessment</h4>
                <p className="text-xs text-blue-100/75 leading-relaxed">Credit analysts evaluate turnover and determine optimum facility terms.</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#4ade80] uppercase tracking-widest">Step 04</div>
                <h4 className="font-heading text-sm font-semibold text-white">Fast Disbursement</h4>
                <p className="text-xs text-blue-100/75 leading-relaxed">Approved loan funds are credited directly to your verified Rima MFB account.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Loan FAQ Card */}
        <section id="loan-faq" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-heading font-semibold text-[#0a1e3f]">Credit & Loan FAQs</h2>
          <div className="rounded-3xl bg-white border border-[#e2e8f0] p-4 sm:p-6 shadow-sm">
            <Accordion type="single" collapsible className="w-full divide-y divide-[#e2e8f0]">
              <AccordionItem value="item-1" className="border-b-0 py-2">
                <AccordionTrigger className="font-heading text-sm font-medium text-[#0a1e3f] hover:text-[#0284c7] text-left">
                  How long does loan evaluation and disbursement take?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#64748b] leading-relaxed pt-2">
                  Personal microloans and salary advances are disbursed within 24 to 48 hours of document verification. Commercial SME loans may require 5 business days for facility inspection.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-0 py-2">
                <AccordionTrigger className="font-heading text-sm font-medium text-[#0a1e3f] hover:text-[#0284c7] text-left">
                  What is required as collateral security?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#64748b] leading-relaxed pt-2">
                  Collateral terms depend on loan volume. Salary advances require only employer payroll standing orders; microloans require a verifiable guarantor, while commercial facilities use commercial equipment or property debentures.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0 py-2">
                <AccordionTrigger className="font-heading text-sm font-medium text-[#0a1e3f] hover:text-[#0284c7] text-left">
                  Can I liquidate early without extra charges?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#64748b] leading-relaxed pt-2">
                  Yes. Accountholders can liquidate principal balances early at any time without penalty, improving their credit scoring for future higher credit limits.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </BankingServiceLayout>
  );
}
