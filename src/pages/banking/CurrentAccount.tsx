import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { CreditCard } from "lucide-react";

export default function CurrentAccount() {
  return (
    <BankingServiceLayout
      title="Current Account"
      subtitle="Everyday Banking"
      description="The perfect companion for your daily financial transactions. Flexible, reliable, and designed to keep your money moving as fast as you do."
      icon={CreditCard}
      image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      whoItIsFor="Individuals, sole traders, and professionals who require frequent access to their funds and more advanced banking features."
      benefits={[
        "No monthly maintenance fees (for minimum balance)",
        "Zero hidden charges on transfers",
        "Free personalized cheque book on request",
        "Access to overdraft facilities",
        "Unlimited monthly withdrawals",
        "Real-time SMS and Email alerts"
      ]}
      requirements={[
        "Valid Government ID (NIN, PVC, Passport)",
        "Proof of address (Utility bill)",
        "Two (2) external references",
        "Two (2) passport photographs",
        "Initial opening deposit"
      ]}
      fees="No monthly maintenance fee"
    />
  );
}
