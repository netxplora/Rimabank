import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { CreditCard } from "lucide-react";

export default function CurrentAccount() {
  return (
    <BankingServiceLayout
      title="Individual Checking Account"
      subtitle="Retail Banking Services"
      description="Unrestricted transactional capability for working professionals, consultants, and sole practitioners requiring high-frequency transfers, cheque clearing, and overdraft access."
      icon={CreditCard}
      image="/images/hero-home.png"
      whoItIsFor="Professionals, consultants, and sole proprietors requiring unrestricted transaction operations."
      benefits={[
        "Unrestricted monthly transaction volume and deposit frequency",
        "Personalized cheque book issuance and third-party clearing",
        "Eligibility for personal overdrafts and short-term lines of credit",
        "Instant debit card linkage for nationwide ATM, POS, and online checkout",
        "Direct NIBSS instant settlement with real-time SMS/Email alerts",
        "Priority branch customer desk assistance"
      ]}
      requirements={[
        "Duly completed Current Account Opening Form",
        "Valid Government Identification (NIN, Voter's Card, Driver's License, or Passport)",
        "Two (2) independent external account references",
        "Proof of Residential Address (Utility Bill not older than 3 months)",
        "Two (2) recent passport photographs"
      ]}
      fees="Transparent tariff aligned with Central Bank of Nigeria guidelines"
      ctaText="Open Checking Account"
    />
  );
}
