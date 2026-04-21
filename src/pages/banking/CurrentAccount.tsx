import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { CreditCard } from "lucide-react";

export default function CurrentAccount() {
  return (
    <BankingServiceLayout
      title="Strategic Liquidity Accounts"
      subtitle="Retail Banking Services"
      description="Optimized infrastructure for your daily financial operations. Flexible, reliable, and engineered to facilitate seamless capital movement for individuals and sole practitioners."
      icon={CreditCard}
      image="/images/hero-home.png"
      whoItIsFor="Professionals, sole-proprietors, and individuals requiring an unrestricted, high-velocity transaction environment."
      benefits={[
        "Zero recurring maintenance fees (subject to minimum balance)",
        "Flat-rate transaction settlement with no hidden charges",
        "Complimentary personalized cheque book issuance",
        "Eligibility for structured overdraft facilities",
        "Unrestricted monthly transaction frequency",
        "Real-time electronic alerts via SMS and Email"
      ]}
      requirements={[
        "Valid Government Issue ID (NIN, PVC, or Passport)",
        "Verified Proof of Residence (Utility Bill < 3 Months)",
        "Two (2) independent external references",
        "Two (2) recent biometric passport photographs",
        "Initial capital deposit for account activation"
      ]}
      fees="No monthly maintenance/administrative fees"
    />
  );
}
