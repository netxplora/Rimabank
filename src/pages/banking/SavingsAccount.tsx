import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { Wallet } from "lucide-react";

export default function SavingsAccount() {
  return (
    <BankingServiceLayout
      title="Savings Accounts"
      subtitle="Personal Banking"
      description="Start your journey towards financial freedom. Our savings accounts are designed to help you grow your wealth with competitive interest rates and zero hidden charges."
      icon={Wallet}
      image="https://images.unsplash.com/photo-1579621909532-6720d293d0bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      whoItIsFor="Individuals, families, and goal-oriented savers residing in Rivers State."
      benefits={[
        "Up to 4% p.a. interest rate",
        "Zero account maintenance fees",
        "Free instant debit card on issuance",
        "24/7 Mobile and Internet Banking access",
        "Quarterly interest payment to your account",
        "Access to emergency loan facilities"
      ]}
      requirements={[
        "Completed Account Opening Form",
        "Two (2) recent Passport Photographs",
        "Valid ID (National ID, International Passport, or Voter's Card)",
        "Utility Bill (not older than 3 months)",
        "Minimum opening balance of ₦2,000"
      ]}
      fees="No monthly maintenance fees"
    />
  );
}
