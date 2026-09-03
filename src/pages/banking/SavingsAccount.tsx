import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { Wallet } from "lucide-react";

export default function SavingsAccount() {
  return (
    <BankingServiceLayout
      title="Personal Savings Account"
      subtitle="Retail Banking Services"
      description="Build personal and household reserves with structured interest returns, debit card convenience, and guaranteed capital protection under the NDIC."
      icon={Wallet}
      image="/images/hero-home.png"
      whoItIsFor="Individuals, families, and salary earners seeking a reliable, interest-yielding account."
      benefits={[
        "Competitive annual interest yields calculated daily and credited quarterly",
        "Zero mandatory minimum operating balance requirements",
        "Instant debit card issuance for nationwide ATM and POS access",
        "24/7 Mobile app and online banking platform access",
        "Automated standing orders for structured monthly savings",
        "Direct qualification for retail credit and salary advance facilities"
      ]}
      requirements={[
        "Duly completed Account Opening Form",
        "Valid Government ID (NIN, Voter's Card, Driver's License, or Passport)",
        "Bank Verification Number (BVN)",
        "Recent Utility Bill (Electricity, Water, or Waste not older than 3 months)",
        "Two (2) recent passport photographs"
      ]}
      fees="Zero monthly maintenance fees"
      ctaText="Open Savings Account"
    />
  );
}
