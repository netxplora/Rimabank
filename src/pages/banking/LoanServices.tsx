import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { TrendingUp, Users, Briefcase, CreditCard, CheckCircle2, ShieldCheck, Clock, FileCheck, Building2, Store, Truck, Wallet } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LoanCalculator } from "@/components/tools/LoanCalculator";
import SavingsCalculator from "@/components/tools/SavingsCalculator";

export default function LoanServices() {
  const loanTypes = [
    {
      id: "sme",
      title: "SME Working Capital Facility",
      icon: Briefcase,
      badge: "Fast 24-48h Review",
      bg: "#f0f7ff",
      accent: "#0284c7",
      description: "Structured short-term liquidity for registered enterprises to purchase commercial stock, fulfill orders, and maintain operational cash flow.",
      benefits: [
        "Credit limits tailored to business turnover",
        "Flexible repayment terms from 1 to 6 months",
        "Dedicated commercial loan relationship manager",
        "Rapid credit review and transparent interest terms"
      ],
      whoItIsFor: "Registered businesses, contractors, distributors, and retail enterprises."
    },
    {
      id: "expansion",
      title: "Business Expansion Loans",
      icon: Building2,
      badge: "Up to 24 Months",
      bg: "#f8fafc",
      accent: "#0a1e3f",
      description: "Medium-term capital engineered to open new branch outlets, acquire commercial property, or invest in significant business scaling.",
      benefits: [
        "Structured loan tenures up to 24 months",
        "Customized amortization schedule aligned with revenue cycles",
        "Advisory support for commercial expansion",
        "Opportunity to refinance existing expensive supplier debt"
      ],
      whoItIsFor: "Established companies with minimum 1-year verifiable trading history."
    },
    {
      id: "microcredit",
      title: "Microcredit for Market Traders",
      icon: Store,
      badge: "Accessible Retail Credit",
      bg: "#bcffbb",
      accent: "#16a34a",
      description: "Fast, accessible micro-facilities designed for market women, shopkeepers, and artisans requiring immediate working capital without complex bureaucracy.",
      benefits: [
        "Minimal documentation and simplified KYC verification",
        "Weekly or monthly repayment options matching market cycles",
        "Automatic credit limit increases upon timely liquidation",
        "Guarantor-backed security structure"
      ],
      whoItIsFor: "Market stall operators, artisans, commercial drivers, and neighborhood retailers."
    },
    {
      id: "asset",
      title: "Commercial Asset Financing",
      icon: Truck,
      badge: "Equipment & Logistics",
      bg: "#fef3c7",
      accent: "#d97706",
      description: "Hire-purchase and lease financing to acquire delivery tricycles, power generators, commercial vehicles, and essential light machinery.",
      benefits: [
        "Low equity contribution starting from 20%",
        "Asset serves as primary collateral security",
        "Tenures structured from 6 to 24 months",
        "Direct vendor disbursement to approved equipment dealers"
      ],
      whoItIsFor: "Logistics operators, manufacturers, printing presses, and commercial vendors."
    },
    {
      id: "salary",
      title: "Personal Salary Advance",
      icon: Wallet,
      badge: "Same-Day Liquidity",
      bg: "#e2e8f0",
      accent: "#477ee9",
      description: "Short-term personal liquidity for verified civil servants and private sector employees to address pressing domestic obligations prior to payday.",
      benefits: [
        "Up to 50% of verified net monthly salary",
        "Automated direct payroll deduction upon salary credit",
        "Same-day approval and disbursement",
        "Zero physical asset pledge required"
      ],
      whoItIsFor: "Verified public and private sector salary earners."
    }
  ];

  return (
    <BankingServiceLayout
      title="Credit & Financing Facilities"
      subtitle="Accessible Capital for Growth"
      description="Whether you require working capital to scale business inventory or financing for personal requirements, our credit facilities are accessible, transparent, and prompt."
      icon={TrendingUp}
      image="/images/hero-home.png"
      whoItIsFor="Formally employed professionals, registered SMEs, market traders, and active RIMA Bank accountholders."
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
        "Guarantor documentation or commercial asset (depending on facility)"
      ]}
      fees="Transparent approved interest structures"
      ctaText="Apply for Credit"
    >
      <div className="mt-6 space-y-10 sm:space-y-12">
        
        {/* Credit Facilities Grid */}
        <section id="loan-types">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
                Credit Categories
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-[#0a1e3f]">
                Structured Financing Facilities
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748b]">
              <ShieldCheck className="h-4 w-4 text-[#16a34a]" />
              <span>CBN Regulated Interest Structures</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanTypes.map((loan) => (
              <div 
                key={loan.id} 
                className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between hover:border-[#0284c7]/40 hover:shadow-md transition-all duration-200"
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
                    <h3 className="font-heading text-base font-bold text-[#0a1e3f] mb-1.5">{loan.title}</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">{loan.description}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#e2e8f0]">
                    {loan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#0a1e3f]">
                        <CheckCircle2 className="h-4 w-4 text-[#16a34a] shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-[#e2e8f0] text-[11px] text-[#64748b]">
                  <span className="font-semibold text-[#0a1e3f]">Target: </span>{loan.whoItIsFor}
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

        {/* 5-Step Loan Application Workflow */}
        <section className="bg-[#0a1e3f] text-white rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0284c7]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8] block mb-1">
                Credit Lifecycle
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-white">
                How Our Credit Approval Process Works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-widest">Step 01</div>
                <h4 className="font-heading text-sm font-semibold text-white">Apply</h4>
                <p className="text-xs text-blue-100/75 leading-relaxed">Submit your financing request online or at your nearest branch.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-widest">Step 02</div>
                <h4 className="font-heading text-sm font-semibold text-white">Assessment</h4>
                <p className="text-xs text-blue-100/75 leading-relaxed">Credit officers review bank statements and business operations.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-widest">Step 03</div>
                <h4 className="font-heading text-sm font-semibold text-white">Approval</h4>
                <p className="text-xs text-blue-100/75 leading-relaxed">Receive formal facility offer letter with transparent interest terms.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-xs font-bold text-[#4ade80] uppercase tracking-widest">Step 04</div>
                <h4 className="font-heading text-sm font-semibold text-white">Disbursement</h4>
                <p className="text-xs text-blue-100/75 leading-relaxed">Approved loan funds are credited directly to your RIMA Bank account.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-widest">Step 05</div>
                <h4 className="font-heading text-sm font-semibold text-white">Repayment</h4>
                <p className="text-xs text-blue-100/75 leading-relaxed">Convenient weekly or monthly deductions aligned with revenue.</p>
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
                  Personal microloans and salary advances are disbursed within 24 to 48 hours of document verification. Commercial SME loans may require 3 to 5 business days for facility and store inspection.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-0 py-2">
                <AccordionTrigger className="font-heading text-sm font-medium text-[#0a1e3f] hover:text-[#0284c7] text-left">
                  What is required as collateral security?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#64748b] leading-relaxed pt-2">
                  Collateral terms depend on loan volume. Salary advances require employer payroll standing orders; microloans require verifiable trade guarantors, while commercial facilities use commercial equipment or asset debentures.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0 py-2">
                <AccordionTrigger className="font-heading text-sm font-medium text-[#0a1e3f] hover:text-[#0284c7] text-left">
                  Can I liquidate early without extra penalty charges?
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
