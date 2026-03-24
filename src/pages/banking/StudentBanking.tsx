import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { GraduationCap } from "lucide-react";

export default function StudentBanking() {
  return (
    <BankingServiceLayout
      title="Student Banking"
      subtitle="The Future Starts Now"
      description="Modern banking for the modern student. Manage your allowance, pay for studies, and build your financial literacy before you even graduate."
      icon={GraduationCap}
      image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      whoItIsFor="Full-time students in tertiary institutions across Rivers State."
      benefits={[
        "Zero monthly maintenance fees",
        "Free student debit card",
        "Campus-only discounts and deals",
        "Access to educational support loans",
        "Mobile app with spending tracker",
        "Financial literacy workshops"
      ]}
      requirements={[
        "Valid Student ID card",
        "Proof of admission",
        "Passport photograph",
        "Zero minimum balance required",
        "BVN enrollment"
      ]}
      fees="₦0 Monthly Fees"
    />
  );
}
