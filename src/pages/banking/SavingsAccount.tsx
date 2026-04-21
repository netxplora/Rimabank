import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { Wallet } from "lucide-react";

export default function SavingsAccount() {
  return (
    <BankingServiceLayout
      title="Structured Savings Solutions"
      subtitle="Retail Banking Services"
      description="Secure your financial future with our range of personal savings repositories. Rima Bank delivers competitive, reliable interest yields paired with absolute transparency in account management."
      icon={Wallet}
      image="/images/hero-home.png"
      whoItIsFor="Individuals, households, and goal-oriented savers seeking a reliable financial foundation."
      benefits={[
        "Tiered interest yields up to 4% per annum",
        "Zero hidden maintenance or administrative fees",
        "Complimentary electronic debit card issuance",
        "24/7 Access via Web and Mobile App infrastructure",
        "Automated quarterly interest crediting",
        "Expedited eligibility for retail credit facilities"
      ]}
      requirements={[
        "Duly executed Personal Account Opening Form",
        "Two (2) recent biometric passport photographs",
        "Valid Government Issue ID (NIN, PVC, or Passport)",
        "Proof of Residence (Utility Bill < 3 Months)",
        "Initial deposit of ₦2,000 for account activation"
      ]}
      fees="No recurring maintenance or debit fees"
    />
  );
}
