import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { FeaturedProductSection } from "@/components/home/FeaturedProductSection";
import { SMEBankingSection } from "@/components/home/SMEBankingSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { CardServicesSection } from "@/components/home/CardServicesSection";
import { AboutSnapshot } from "@/components/home/AboutSnapshot";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AgentBankingSection } from "@/components/home/AgentBankingSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { MobileAppCTA } from "@/components/home/MobileAppCTA";

const Index = () => {
  return (
    <Layout>
      {/* 1. Hero Section: 'The bank for all business' */}
      <HeroSection />

      {/* 2. Institutional Proof & Scale */}
      <TrustIndicators />

      {/* 3. Dedicated Flagship Product Showcase (Target Yield & Capital) */}
      <FeaturedProductSection />

      {/* 4. Business & Commercial Solutions */}
      <SMEBankingSection />

      {/* 5. Core Banking Products & Categories Overview (CMS Connected) */}
      <ServicesOverview />

      {/* 6. Digital & Payment Infrastructure (Cards, POS, Transfers) */}
      <CardServicesSection />

      {/* 7. Institutional Heritage & Governance */}
      <AboutSnapshot />

      {/* 8. Client Stories & Testimonials (CMS Connected) */}
      <TestimonialsSection />

      {/* 9. Grassroots Agent Banking Network */}
      <AgentBankingSection />

      {/* 10. Statutory Security & Regulatory Compliance */}
      <SecuritySection />

      {/* 11. High-Impact Account Opening Action */}
      <MobileAppCTA />
    </Layout>
  );
};

export default Index;

