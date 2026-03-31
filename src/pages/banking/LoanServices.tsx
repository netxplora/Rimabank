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
      title: "Microloans",
      icon: Users,
      description: "Quick, low-collateral loans for individuals and small traders to manage immediate financial needs or grow small-scale businesses.",
      benefits: [
        "No heavy collateral required",
        "Approval within 24 hours",
        "Weekly or monthly repayment options",
        "Progressive loan limits based on repayment history"
      ],
      whoItIsFor: "Market traders, artisans, and small-scale entrepreneurs."
    },
    {
      id: "business",
      title: "Business Loans",
      icon: Briefcase,
      description: "Strategic financing for SMEs to scale operations, acquire assets, or manage working capital efficiently.",
      benefits: [
        "Higher credit limits up to ₦10 million",
        "Flexible tenors up to 24 months",
        "Injective business advisory services",
        "Competitive interest rates"
      ],
      whoItIsFor: "Registered SMEs, corporate organizations, and expanding businesses."
    },
    {
      id: "personal",
      title: "Personal Loans",
      icon: CreditCard,
      description: "Tailored credit facilities for salary earners and individuals to meet personal goals and handle emergencies.",
      benefits: [
        "Salary advance options",
        "Automated monthly deductions",
        "No hidden processing fees",
        "Refinancing options available"
      ],
      whoItIsFor: "Public and private sector salary earners."
    }
  ];

  return (
    <BankingServiceLayout
      title="Loan Services"
      subtitle="Financial Empowerment"
      description="Whether you're starting a business, scaling one, or meeting personal commitments, our credit solutions are designed to be fast, fair, and flexible."
      icon={TrendingUp}
      image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      whoItIsFor="Salary earners, registered businesses, and active Rima bank account holders."
      benefits={[
        "Quick approval in 24-48 hours",
        "Minimal documentation",
        "Flexible repayment plans (up to 24 months)",
        "Competitive interest rates",
        "No hidden processing fees",
        "Automated repayment options"
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
          <h2 className="text-3xl font-display font-bold mb-8 text-center">Our Loan Categories</h2>
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
          <h2 className="text-3xl font-display font-bold mb-8 text-center text-foreground">Fast Loan Estimator & Savings Forecast</h2>
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
