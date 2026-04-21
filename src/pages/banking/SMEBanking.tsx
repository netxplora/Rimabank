import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { Briefcase } from "lucide-react";

export default function SMEBanking() {
  return (
    <BankingServiceLayout
      title="SME & Enterprise Banking"
      subtitle="Strategic Business Support"
      description="Fuel the expansion of your business with our structured SME solutions. Rima Bank integrates deep local market expertise with institucional-grade financial infrastructure to provide a sustainable partnership for enterprise growth."
      icon={Briefcase}
      image="/images/hero-home.png"
      whoItIsFor="Small to Medium-sized Enterprises, sole proprietorships, and established startups in Rivers State."
      benefits={[
        "Structured access to SME liquid credit facilities",
        "Strategic business advisory and mentorship support",
        "Dedicated Enterprise Relationship Management",
        "Enhanced daily transaction limits for high-volume operations",
        "Secure POS terminals for efficient revenue collection",
        "Consolidated trade finance and payroll settlement"
      ]}
      requirements={[
        "Valid CAC Registration Documents (Form 1.1 / Form CO7 / Form CO2)",
        "Certified passport photographs of Directors/Signatories",
        "Verified BVN for all Account Signatories",
        "Proof of Business Operational Address (Utility Bill < 3 Months)",
        "Verified Tax Identification Number (TIN)",
        "Current CAC Status Search Report"
      ]}
      fees="Custom-tailored commercial transaction rates"
    />
  );
}
