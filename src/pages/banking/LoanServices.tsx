import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { TrendingUp, Users, Briefcase, CreditCard, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LoanCalculator } from "@/components/tools/LoanCalculator";
import SavingsCalculator from "@/components/tools/SavingsCalculator";

export default function LoanServices() {
  const loanTypes = [
    {
      id: "microloan",
      title: "Micro-Credit Facilities",
      icon: Users,
      description: "Accessible credit designed for individuals and sole proprietors requiring immediate liquidity without complex collateral structures.",
      benefits: [
        "Streamlined collateral requirements",
        "Expedited 24-hour approval processing",
        "Structured weekly/monthly repayment cycles",
        "Dynamic limit increases based on repayment accuracy"
      ],
      whoItIsFor: "Independent traders, artisans, and sole proprietorships."
    },
    {
      id: "business",
      title: "Commercial Loans",
      icon: Briefcase,
      description: "Strategic commercial financing engineered for registered enterprises to optimize working capital and acquire operational assets.",
      benefits: [
        "Substantial credit limits up to ₦10 million",
        "Extended repayment tenors up to 24 months",
        "Integrated financial advisory support",
        "Competitive commercial interest rates"
      ],
      whoItIsFor: "Registered SMEs, corporate entities, and expanding ventures."
    },
    {
      id: "personal",
      title: "Retail Credit",
      icon: CreditCard,
      description: "Customized personal credit structures for formally employed individuals to manage unbudgeted expenses and personal objectives.",
      benefits: [
        "Structured salary advance frameworks",
        "Automated direct debit repayment",
        "Transparent processing fees",
        "Flexible refinancing alternatives"
      ],
      whoItIsFor: "Verified public and private sector salary earners."
    }
  ];

  return (
    <BankingServiceLayout
      title="Credit & Loan Services"
      subtitle="Strategic Capital Solutions"
      description="Whether you require working capital to expand commercial operations or structured financing for personal commitments, our credit facilities are engineered to be accessible, transparent, and highly responsive."
      icon={TrendingUp}
      image="/images/hero-home.png"
      whoItIsFor="Formally employed professionals, registered businesses, and active Rima Bank accountholders."
      benefits={[
        "Expedited processing within 24-48 hours",
        "Streamlined documentation requirements",
        "Customizable repayment structures (up to 24 months)",
        "Competitive annualized interest rates",
        "Absolute transparency in fee structures",
        "Automated direct debit integration"
      ]}
      requirements={[
        "3 months bank statements",
        "Valid identification (NIN, PVC, Passport)",
        "BVN enrollment",
        "Executed loan application form",
        "Personal guarantee or collateral (depending on amount)"
      ]}
      fees="Interest from 2% monthly"
    >
      <div className="mt-16 space-y-16">
        <section id="loan-types">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">Comprehensive Credit Facilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {loanTypes.map((loan) => (
              <Card key={loan.id} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <loan.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{loan.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{loan.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Key Benefits</p>
                    <ul className="space-y-1">
                      {loan.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-secondary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <img 
                      src="/images/hero-home.png" 
                      alt="Institutional Strategy Session" 
                      className="rounded-2xl shadow-xl w-full"
                    />
                  </div>
                  <p className="text-xs italic text-muted-foreground pt-4 border-t border-border/50">
                    Target: {loan.whoItIsFor}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="loan-calculators">
          <h2 className="text-3xl font-display font-bold mb-8 text-center text-foreground">Financial Projection Utilities</h2>
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-stretch">
            <LoanCalculator />
            <SavingsCalculator />
          </div>
        </section>

        <section id="loan-faq" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">Loan FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does it take to get a loan?</AccordionTrigger>
              <AccordionContent>
                Most of our loans are disbursed within 24 to 48 hours after all required documents have been verified.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What do I need as collateral?</AccordionTrigger>
              <AccordionContent>
                Collateral requirements vary by loan type and amount. Microloans often require only a personal guarantor, while larger business loans may require tangible assets.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I pay back early?</AccordionTrigger>
              <AccordionContent>
                Yes, we allow early repayment without any extra penalty fees. In fact, it improves your credit rating with us for future higher limits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </BankingServiceLayout>
  );
}
