import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { GraduationCap } from "lucide-react";

export default function StudentBanking() {
  return (
    <BankingServiceLayout
      title="Foundational Financial Solutions"
      subtitle="Retail Banking Services"
      description="Modern banking infrastructure for the next generation of professionals. Manage educational capital and daily operational costs with a structured, zero-fee environment."
      icon={GraduationCap}
      image="/images/hero-home.png"
      whoItIsFor="Full-time students in tertiary institutions seeking financial autonomy."
      benefits={[
        "Zero recurring maintenance or administrative fees",
        "Complimentary student debit card issuance",
        "Exclusive access to educational support credit",
        "Digital expenditure tracking via mobile app",
        "Eligibility for youth entrepreneurship grants",
        "Quarterly financial literacy Masterclasses"
      ]}
      requirements={[
        "Valid Institutional Identification card",
        "Verified Proof of Admission (Current Session)",
        "Two (2) recent biometric passport photographs",
        "Personal BVN enrollment",
        "Zero initial capital deposit required"
      ]}
      fees="No recurring maintenance/administrative fees"
    />
  );
}
