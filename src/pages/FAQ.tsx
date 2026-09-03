import { Layout } from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Shield, CreditCard, Building2, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const accountFaqs = [
  {
    q: "What documentation is required to open an account?",
    a: "To open a standard account with Rima MFB, you need: (1) A valid government-issued ID (NIN, Voter's Card, International Passport, or Driver's License), (2) Your Bank Verification Number (BVN), (3) A recent utility bill (not older than 3 months), and (4) Two recent passport photographs."
  },
  {
    q: "Can I initiate account opening online without visiting a branch?",
    a: "Yes. You can open a Tier 1 account online via our portal by providing your BVN and verified mobile number. To access Tier 3 unrestricted transaction limits, upload your proof of address and valid ID."
  },
  {
    q: "Are there account opening or initial maintenance fees?",
    a: "No. Opening a standard savings or basic account with Rima MFB is executed with zero administrative fees. We do not impose mandatory opening charges."
  },
  {
    q: "How do I upgrade my KYC tier for higher transfer limits?",
    a: "You can submit upgrade documents at any Rima MFB branch or through our mobile banking portal under Settings > KYC Upgrade. Our compliance desk completes verification within one business day."
  }
];

const loanFaqs = [
  {
    q: "Who is eligible to apply for personal or commercial SME loans?",
    a: "Accountholders who have maintained active account operations with consistent monthly turnover for at least 3 months are eligible for credit assessment. For SME facilities, your business must have verifiable commercial operations."
  },
  {
    q: "What are the interest rates and repayment terms?",
    a: "Our commercial and personal loan interest rates are calculated transparently based on loan duration, cash flow analysis, and collateral structure without hidden fees."
  },
  {
    q: "How long does the loan evaluation and disbursement take?",
    a: "Micro-loans are typically evaluated and disbursed within 48 hours following document completion. Larger commercial SME lines may require 5 to 7 business days for on-site assessment."
  },
  {
    q: "Can I liquidate a loan before the scheduled maturity date?",
    a: "Yes. Early liquidation is permitted upon request, allowing you to settle principal balances without unnecessary penalties."
  }
];

const digitalFaqs = [
  {
    q: "How do I reset my transaction PIN or mobile app password?",
    a: "Select 'Forgot Password' on the login screen to receive a secure OTP via your registered phone number or email. You can also visit any branch customer service desk for instant PIN resets."
  },
  {
    q: "How are digital transactions and account balances protected?",
    a: "Our electronic banking infrastructure uses TLS 256-bit encryption, continuous fraud surveillance, and two-factor authentication (2FA) conforming to Central Bank of Nigeria security mandates."
  },
  {
    q: "What should I do if a fund transfer is debited but uncredited?",
    a: "Electronic inter-bank transfer delays are automatically reversed within 24 hours under standard NIBSS rules. If not reversed after 24 hours, contact our dedicated support team with your session ID."
  }
];

export default function FAQ() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-ui">
              <span>Knowledge Base & Support</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              Frequently asked <span className="text-[#f73b20]">questions</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              Find answers regarding account documentation, loan facilities, debit card security, and regulatory deposit guarantees.
            </p>
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Category Navigation (4 cols) */}
            <div className="md:col-span-4 sticky top-28 space-y-2 hidden md:block">
              <span className="text-xs font-semibold uppercase tracking-ui text-[#ababab] block mb-4 px-4">
                Topics
              </span>
              <a href="#accounts" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#fdedea] text-[#360802] font-semibold text-xs transition-colors shadow-sm">
                <Building2 className="h-4 w-4 text-[#f73b20]" />
                <span>Account Opening & KYC</span>
              </a>
              <a href="#loans" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#fdedea] text-[#360802]/80 hover:text-[#f73b20] font-medium text-xs transition-colors">
                <CreditCard className="h-4 w-4 text-[#34c771]" />
                <span>Credit & Loan Facilities</span>
              </a>
              <a href="#digital" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#fdedea] text-[#360802]/80 hover:text-[#f73b20] font-medium text-xs transition-colors">
                <Smartphone className="h-4 w-4 text-[#477ee9]" />
                <span>Digital Banking & Security</span>
              </a>
            </div>

            {/* Accordion List (8 cols) */}
            <div className="md:col-span-8 space-y-12">
              {/* Account section */}
              <div id="accounts" className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-[#360802] flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#f73b20]" />
                  Account Opening & KYC
                </h3>
                <div className="rounded-cards bg-white border border-[#e7dcdb] p-4 shadow-lift">
                  <Accordion type="single" collapsible className="w-full">
                    {accountFaqs.map((faq, i) => (
                      <AccordionItem key={i} value={`account-${i}`} className="border-b border-[#e7dcdb]/60 last:border-b-0 px-2">
                        <AccordionTrigger className="text-left font-heading font-medium text-sm text-[#360802] hover:text-[#f73b20] py-4">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-[#ababab] leading-relaxed pb-4">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* Loans section */}
              <div id="loans" className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-[#360802] flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#34c771]" />
                  Credit & Loan Facilities
                </h3>
                <div className="rounded-cards bg-white border border-[#e7dcdb] p-4 shadow-lift">
                  <Accordion type="single" collapsible className="w-full">
                    {loanFaqs.map((faq, i) => (
                      <AccordionItem key={i} value={`loan-${i}`} className="border-b border-[#e7dcdb]/60 last:border-b-0 px-2">
                        <AccordionTrigger className="text-left font-heading font-medium text-sm text-[#360802] hover:text-[#f73b20] py-4">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-[#ababab] leading-relaxed pb-4">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* Digital section */}
              <div id="digital" className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-[#360802] flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-[#477ee9]" />
                  Digital Banking & Security
                </h3>
                <div className="rounded-cards bg-white border border-[#e7dcdb] p-4 shadow-lift">
                  <Accordion type="single" collapsible className="w-full">
                    {digitalFaqs.map((faq, i) => (
                      <AccordionItem key={i} value={`digital-${i}`} className="border-b border-[#e7dcdb]/60 last:border-b-0 px-2">
                        <AccordionTrigger className="text-left font-heading font-medium text-sm text-[#360802] hover:text-[#f73b20] py-4">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-[#ababab] leading-relaxed pb-4">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-[#fdedea]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl md:text-3xl font-medium text-[#360802]">
              Need further assistance?
            </h3>
            <p className="text-xs text-[#ababab] leading-relaxed">
              Our customer service team is ready to answer questions regarding account upgrades, credit approvals, or card issuance.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/contact">
                  Contact Customer Desk
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons bg-white">
                <Link to="/branches">
                  Visit a Branch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
