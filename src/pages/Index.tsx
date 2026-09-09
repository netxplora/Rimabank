import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CoreBankingActions } from "@/components/home/CoreBankingActions";
import { FeaturedProductSection } from "@/components/home/FeaturedProductSection";
import { SavingsSection } from "@/components/home/SavingsSection";
import { FinancingSection } from "@/components/home/FinancingSection";
import { SMEBankingSection } from "@/components/home/SMEBankingSection";
import { AgentBankingSection } from "@/components/home/AgentBankingSection";
import { USSDBankingSection } from "@/components/home/USSDBankingSection";
import { DigitalBankingSection } from "@/components/home/DigitalBankingSection";
import { FinancialInclusionSection } from "@/components/home/FinancialInclusionSection";
import { CustomerJourneySection } from "@/components/home/CustomerJourneySection";
import { FinancialEducationSection } from "@/components/home/FinancialEducationSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { MobileAppCTA } from "@/components/home/MobileAppCTA";

const Index = () => {
  return (
    <Layout>
      {/* 1. Hero: 'The bank for all business' */}
      <HeroSection />

      {/* 2. Core Actions: 'What can we help you do?' */}
      <CoreBankingActions />

      {/* 3. Featured Strategic Product: 'A savings account built around your goals' */}
      <FeaturedProductSection />

      {/* 4. Savings Pillar: 'Make your money work toward your goals' */}
      <SavingsSection />

      {/* 5. Loans & Credit: 'Need funds to move forward?' (5-step process) */}
      <FinancingSection />

      {/* 6. Business Banking: 'Built around your business' */}
      <SMEBankingSection />

      {/* 7. Agent Banking: 'Banking, closer to you' & 'Become an Agent' */}
      <AgentBankingSection />

      {/* 8. USSD Banking: 'Bank without internet' (*966*808#) */}
      <USSDBankingSection />

      {/* 9. Digital Banking: 'Manage your money wherever you are' */}
      <DigitalBankingSection />

      {/* 10. Financial Inclusion: 'Banking that works for real life' */}
      <FinancialInclusionSection />

      {/* 11. Customer Experience Roadmap: 'How banking works with RIMA' */}
      <CustomerJourneySection />

      {/* 12. Financial Education & Guides */}
      <FinancialEducationSection />

      {/* 13. Customer Proof & Testimonials */}
      <TestimonialsSection />

      {/* 14. Regulatory Compliance & Security (CBN & NDIC) */}
      <SecuritySection />

      {/* 15. Final Account Opening Action */}
      <MobileAppCTA />
    </Layout>
  );
};

export default Index;
