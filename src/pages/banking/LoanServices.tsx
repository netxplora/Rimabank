import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { TrendingUp } from "lucide-react";

export default function LoanServices() {
  return (
    <BankingServiceLayout
      title="Loan Services"
      subtitle="Financial Support"
      description="Quick, accessible, and affordable credit facilities designed to give you the boost you need. Whether for personal emergencies or business expansion, we are here."
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
        "Letter of employment (for salary earners)",
        "Valid identification",
        "Executed loan application form",
        "Personal guarantee or collateral (depending on amount)"
      ]}
      fees="Interest from 2% monthly"
    />
  );
}
