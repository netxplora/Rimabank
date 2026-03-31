import { BankingServiceLayout } from "@/components/layout/BankingServiceLayout";
import { Building2, Globe, TrendingUp, ShieldCheck, Users, Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CorporateBanking() {
  const corporateBenefits = [
    {
      title: "Customized Financing",
      description: "Tailored credit facilities designed for large-scale operations and projects.",
      icon: TrendingUp,
    },
    {
      title: "Cash Management",
      description: "Optimized liquidity and multi-level transaction approvals for tight control.",
      icon: ShieldCheck,
    },
    {
      title: "Trade Finance",
      description: "Import/Export support, Letters of Credit, and specialized trade advisory.",
      icon: Globe,
    },
    {
      title: "Payroll & Collections",
      description: "Seamless payroll automation and efficient revenue collection systems.",
      icon: Building2,
    },
  ];

  return (
    <BankingServiceLayout
      title="Corporate Banking"
      subtitle="Institutional Excellence"
      description="Fueling the engines of Rivers State's economy. We offer enterprise-grade financial solutions for established corporations, public sector institutions, and large-scale developers."
      icon={Briefcase}
      image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      whoItIsFor="Large corporations, government agencies, multi-national firms, and major development projects."
      benefits={[
        "Dedicated Corporate Relationship Manager",
        "High-volume transaction processing capabilities",
        "Preferential interest rates on deposits and loans",
        "Integration with corporate ERP systems",
        "Specialized treasury and investment services",
        "Priority branch service and board-level advisory"
      ]}
      requirements={[
        "Board Resolution to open account",
        "Constitutional documents (CAC Form 1.1, Article of Association)",
        "TIN and VAT certificates",
        "Valid IDs of Directors and Signatories",
        "Search report from CAC",
        "Evidence of registration with SCUML (as applicable)"
      ]}
      fees="Custom fee structure based on volume"
    >
      <div className="mt-16 space-y-16">
        <section id="corporate-services">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Enterprise-Ready Solutions</h2>
            <p className="text-muted-foreground">We understand the complexities of corporate operations and provide the stability you need to succeed.</p>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Dedicated Support</h2>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                As a corporate partner, you gain direct access to our senior management team and a dedicated Relationship Manager 
                who understands your industry's specific challenges and opportunities.
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
                  src="https://images.unsplash.com/photo-1600880212319-7524e2d20a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Business Meeting" 
                  className="rounded-2xl shadow-xl w-full"
                />
            </div>
          </div>
        </section>
      </div>
    </BankingServiceLayout>
  );
}
