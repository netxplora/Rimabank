import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { Briefcase } from "lucide-react";

export default function SMEBanking() {
  return (
    <BankingServiceLayout
      title="SME Commercial Banking"
      subtitle="Business Banking Services"
      description="Tailored commercial banking services for registered small and medium enterprises across Rivers State. Access working capital loans, POS merchant terminals, and dedicated relationship management."
      icon={Briefcase}
      image="/images/hero-home.png"
      whoItIsFor="Registered SMEs, commercial merchants, distributors, and growing enterprises in Rivers State."
      benefits={[
        "Commercial working capital facilities up to ₦50 Million",
        "Dedicated Business Banking Relationship Manager",
        "Point-of-Sale (POS) terminal issuance for merchant payment collection",
        "Higher daily electronic transfer thresholds for supplier payments",
        "Direct NIBSS payroll automation for staff salary settlement",
        "Business advisory, cash flow structuring, and financial audits"
      ]}
      requirements={[
        "CAC Business Registration / Incorporation Documents (Status Report or Certificate)",
        "Tax Identification Number (TIN) Verification",
        "Valid Government ID and BVN for all Directors and Signatories",
        "Proof of Business Operational Address (Utility Bill not older than 3 months)",
        "Two (2) external corporate account references"
      ]}
      fees="Transparent commercial transaction fees in line with CBN standards"
      ctaText="Open SME Account"
    />
  );
}
