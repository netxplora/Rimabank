import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { TrendingUp, Users, Briefcase, CreditCard, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LoanCalculator } from "@/components/tools/LoanCalculator";
import SavingsCalculator from "@/components/tools/SavingsCalculator";

export default function LoanServices() {
  const loanTypes = [
    {
      id: "microloan",
      title: "Micro-Credit Facilities",
      icon: Users,
      bg: "#bcffbb",
      accent: "#34c771",
      description: "Accessible short-term credit designed for independent retailers and artisans requiring immediate liquidity without complex collateral.",
      benefits: [
        "Minimal collateral hurdles",
        "Fast 24 to 48-hour approval processing",
        "Structured weekly or monthly repayment cycles",
        "Credit limit increases upon prompt liquidation"
      ],
      whoItIsFor: "Independent traders, artisans, and sole proprietors."
    },
    {
      id: "business",
      title: "Commercial SME Loans",
      icon: Briefcase,
      bg: "#fdedea",
      accent: "#f73b20",
      description: "Structured commercial funding engineered for registered enterprises to optimize working capital and acquire operational assets.",
      benefits: [
        "Substantial credit facilities up to ₦50 Million",
        "Extended repayment tenors up to 24 months",
        "Dedicated commercial credit analyst assigned",
        "Transparent monthly interest calculation"
      ],
      whoItIsFor: "Registered SMEs, corporate contractors, and commercial ventures."
    },
    {
      id: "personal",
      title: "Personal Salary Advance",
      icon: CreditCard,
      bg: "#e7dcdb",
      accent: "#477ee9",
      description: "Fast personal credit for formally employed salary earners to address immediate household expenses prior to payday.",
      benefits: [
        "Up to 50% of net verified monthly salary",
        "Automated direct payroll deduction",
        "Same-day approval and fund disbursement",
        "Zero physical asset collateral required"
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
      <div className="mt-12 space-y-16">
        {/* Credit Facilities Grid */}
        <section id="loan-types">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-1">
              Credit Categories
            </span>
            <h2 className="text-2xl lg:text-3xl font-heading font-medium text-[#360802]">
              Structured Credit Facilities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {loanTypes.map((loan) => (
              <div 
                key={loan.id} 
                className="p-6 rounded-cards bg-white border border-[#e7dcdb] shadow-lift flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: loan.bg, color: loan.accent }}
                  >
                    <loan.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#360802] mb-2">{loan.title}</h3>
                  <p className="text-xs text-[#ababab] leading-relaxed mb-6">{loan.description}</p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-[#e7dcdb]/60">
                    {loan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#360802]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#34c771] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e7dcdb] text-[11px] text-[#ababab]">
                  <span className="font-semibold text-[#360802]">Eligibility: </span>{loan.whoItIsFor}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Calculators */}
        <section id="loan-calculators">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-1">
              Interactive Tools
            </span>
            <h2 className="text-2xl lg:text-3xl font-heading font-medium text-[#360802]">
              Financial Projection Calculators
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <LoanCalculator />
            <SavingsCalculator />
          </div>
        </section>

        {/* Loan FAQ */}
        <section id="loan-faq" className="space-y-4">
          <h2 className="text-2xl font-heading font-medium text-[#360802]">Credit & Loan FAQs</h2>
          <div className="rounded-cards bg-white border border-[#e7dcdb] p-4 shadow-lift">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-[#e7dcdb]/60 px-2">
                <AccordionTrigger className="font-heading text-sm font-medium text-[#360802] hover:text-[#f73b20] py-4">
                  How long does loan evaluation and disbursement take?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#ababab] leading-relaxed pb-4">
                  Personal microloans and salary advances are disbursed within 24 to 48 hours of document verification. Commercial SME loans may require 5 business days for facility inspection.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-[#e7dcdb]/60 px-2">
                <AccordionTrigger className="font-heading text-sm font-medium text-[#360802] hover:text-[#f73b20] py-4">
                  What is required as collateral security?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#ababab] leading-relaxed pb-4">
                  Collateral terms depend on loan volume. Salary advances require only employer payroll standing orders; microloans require a verifiable guarantor, while commercial facilities use commercial equipment or property debentures.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0 px-2">
                <AccordionTrigger className="font-heading text-sm font-medium text-[#360802] hover:text-[#f73b20] py-4">
                  Can I liquidate early without extra charges?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#ababab] leading-relaxed pb-4">
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
