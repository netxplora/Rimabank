import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { AboutSnapshot } from "@/components/home/AboutSnapshot";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { AgentBankingSection } from "@/components/home/AgentBankingSection";
import { CardServicesSection } from "@/components/home/CardServicesSection";
import { StudentBankingSection } from "@/components/home/StudentBankingSection";
import { SMEBankingSection } from "@/components/home/SMEBankingSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { MobileAppCTA } from "@/components/home/MobileAppCTA";
import { TrustIndicators } from "@/components/home/TrustIndicators";

import { AccountRecommendationTool } from "@/components/tools/AccountRecommendationTool";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustIndicators />
      <QuickActions />
      <AboutSnapshot />
      <ServicesOverview />
      <div className="py-12" />

      <AccountRecommendationTool />
      <AgentBankingSection />
      <CardServicesSection />
      <StudentBankingSection />
      <SMEBankingSection />
      <TestimonialsSection />
      <SecuritySection />
      <MobileAppCTA />
    </Layout>
  );
};

export default Index;
