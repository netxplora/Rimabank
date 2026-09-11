import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutRimaSection } from "@/components/home/AboutRimaSection";
import { CoreBankingActions } from "@/components/home/CoreBankingActions";
import { FeaturedProductSection } from "@/components/home/FeaturedProductSection";
import { SavingsSection } from "@/components/home/SavingsSection";
import { FinancingSection } from "@/components/home/FinancingSection";
import { SMEBankingSection } from "@/components/home/SMEBankingSection";
import { MobileAppSection } from "@/components/home/MobileAppCTA";
import { WaysToBankSection } from "@/components/home/WaysToBankSection";
import { CustomerJourneySection } from "@/components/home/CustomerJourneySection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { FinancialEducationSection } from "@/components/home/FinancialEducationSection";
import { NewsSection } from "@/components/home/NewsSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

const Index = () => {
  return (
    <Layout
      title="RIMA Microfinance Bank | Save, Borrow, Bank in Rivers State"
      description="RIMA Microfinance Bank offers savings accounts, personal and business loans, agent banking, mobile banking and everyday banking services in Rivers State, Nigeria."
    >
      {/* 01. HERO — "The bank for all business" */}
      <HeroSection />

      {/* 02. ABOUT RIMA — "Banking with purpose." */}
      <AboutRimaSection />

      {/* 03. WHAT CAN WE HELP YOU DO? — Save / Borrow / Bank / Pay / Grow / Access */}
      <CoreBankingActions />

      {/* 04. FEATURED PRODUCT */}
      <FeaturedProductSection />

      {/* 05. SAVINGS — "Save with confidence." */}
      <SavingsSection />

      {/* 06. LOANS & FINANCING — "Need funds to move forward?" */}
      <FinancingSection />

      {/* 07. BUSINESS BANKING — "Built around your business." */}
      <SMEBankingSection />

      {/* 08. MOBILE BANKING APP — "Your bank, in your hands." */}
      <MobileAppSection />

      {/* 09. WAYS TO BANK — All 7 channels */}
      <WaysToBankSection />

      {/* 10. BANKING DESIGNED AROUND YOU — Simple & Transparent Process */}
      <CustomerJourneySection />

      {/* 11. TRUST & SECURITY */}
      <SecuritySection />

      {/* 12. MONEY & BUSINESS — Financial Education */}
      <FinancialEducationSection />

      {/* 13. NEWS & ANNOUNCEMENTS */}
      <NewsSection />

      {/* 14. FINAL CTA — "Ready to start banking with RIMA?" */}
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
