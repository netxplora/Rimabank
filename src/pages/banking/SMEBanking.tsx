import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { Briefcase } from "lucide-react";

export default function SMEBanking() {
  return (
    <BankingServiceLayout
      title="SME / Business Banking"
      subtitle="Empowering Enterprises"
      description="Fuel the growth of your business with our tailored SME solutions. We understand the local market and provide more than just banking—we provide a partnership for success."
      icon={Briefcase}
      image="https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      whoItIsFor="Small to Medium-sized Enterprises, sole traders, and startups in Rivers State."
      benefits={[
        "Quick access to SME credit facilities",
        "Business advisory and mentorship support",
        "Dedicated Relationship Manager",
        "Higher daily transaction limits",
        "POS terminals for easy collections",
        "Trade finance and payroll management"
      ]}
      requirements={[
        "CAC Registration Documents",
        "Passport photos of Directors",
        "BVN of all signatories",
        "Proof of business address",
        "TIN (Tax Identification Number)",
        "Search report from CAC"
      ]}
      fees="Competitive transaction rates"
    />
  );
}
