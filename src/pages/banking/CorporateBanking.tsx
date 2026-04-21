import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { Building2, Globe, TrendingUp, ShieldCheck, Users, Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CorporateBanking() {
  const corporateBenefits = [
    {
      title: "Strategic Credit Facilities",
      description: "Customized institutional-grade financing engineered for large-scale operations and capital projects.",
      icon: TrendingUp,
    },
    {
      title: "Liquidity Management",
      description: "Optimized corporate treasury solutions with multi-level approval hierarchies for precise control.",
      icon: ShieldCheck,
    },
    {
      title: "Trade & Supply Chain",
      description: "Comprehensive import/export support, Letters of Credit, and specialized trade advisory services.",
      icon: Globe,
    },
    {
      title: "Institution Collections",
      description: "Streamlined payroll automation and efficient revenue collection systems for public and private sectors.",
      icon: Building2,
    },
  ];

  return (
    <BankingServiceLayout
      title="Corporate & Institutional Banking"
      subtitle="Institutional Excellence"
      description="Powering the structural engines of the regional economy. Rima Bank delivers enterprise-grade financial infrastructure for established corporations, public sector institutions, and large-scale developers."
      icon={Briefcase}
      image="/images/hero-home.png"
      whoItIsFor="Registered corporations, government agencies, multi-national firms, and major infrastructure projects."
      benefits={[
        "Dedicated Corporate Relationship Management",
        "High-volume electronic fund settlement",
        "Preferential interest structures on deposits and credit",
        "Strategic integration with corporate ERP systems",
        "Advanced treasury and investment advisory",
        "Executive-level priority banking services"
      ]}
      requirements={[
        "Board Resolution authorizing account opening",
        "Constitutional status documents (CAC Form 1.1, Memorandum & Articles of Association)",
        "Tax Identification Number (TIN) & VAT Documentation",
        "Valid Identification for Directors and Authorized Signatories",
        "Verified CAC Search Report",
        "Evidence of SCUML registration (where mandatory)"
      ]}
      fees="Custom fee structure based on volume"
    >
      <div className="mt-16 space-y-16">
        <section id="corporate-services">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Institutional-Grade Solutions</h2>
            <p className="text-muted-foreground">We recognize the complexities of corporate operations and provide the stable financial infrastructure necessary for institutional success.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {corporateBenefits.map((benefit, idx) => (
              <Card key={idx} className="border-none shadow-lg bg-background/50 backdrop-blur-sm transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="relationship-management" className="bg-primary/5 rounded-[3rem] p-8 md:p-16 border border-primary/10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Strategic Relationship Management</h2>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                As a corporate partner, your institution receives specialized attention from our executive management and dedicated relationship managers equipped to navigate industry-specific challenges.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-secondary rounded-full p-1 h-6 w-6 shrink-0 mt-1 flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <p className="font-medium italic">"We provide more than just a bank account; we provide strategic partnership for institutional growth."</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
               <img 
                  src="/images/hero-home.png" 
                  alt="Institutional Strategy Session" 
                  className="rounded-2xl shadow-xl w-full"
                />
            </div>
          </div>
        </section>
      </div>
    </BankingServiceLayout>
  );
}
