import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { GraduationCap } from "lucide-react";

export default function StudentBanking() {
  return (
    <BankingServiceLayout
      title="Student Campus Account"
      subtitle="Retail Banking Services"
      description="Tailored banking package for university and polytechnic students across Rivers State. Manage allowances, fees, and daily expenses with zero maintenance charges."
      icon={GraduationCap}
      image="/images/hero-home.png"
      whoItIsFor="Full-time and part-time students in accredited tertiary institutions."
      benefits={[
        "Zero monthly maintenance or administrative fees",
        "Complimentary student Verve/Mastercard debit card",
        "24/7 Mobile app banking for instant transfers",
        "Exclusive eligibility for educational support micro-credit",
        "Transparent zero-hidden-fee transaction terms",
        "Campus financial literacy workshops and budgeting tools"
      ]}
      requirements={[
        "Valid Student Identification Card or Admission Letter",
        "National Identity Number (NIN) or BVN",
        "Two (2) recent passport photographs",
        "Verified residential or campus hostel address",
        "Zero initial deposit required to open"
      ]}
      fees="₦0 Monthly maintenance charges"
      ctaText="Open Student Account"
    />
  );
}
