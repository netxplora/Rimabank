import { Layout } from "@/components/layout/Layout";
import { Briefcase, Building2, TrendingUp, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const businessServices = [
  {
    id: "sme",
    title: "SME Banking",
    icon: Briefcase,
    description: "Structured capital and operational tools designed to facilitate scalable and efficient business expansion for growing enterprises.",
    href: "/business-banking/sme",
    benefits: [
      "Streamlined commercial credit facilities",
      "Strategic financial advisory services",
      "Dedicated relationship management",
      "High-volume transaction capacity"
    ]
  },
  {
    id: "corporate",
    title: "Corporate Accounts",
    icon: Building2,
    description: "Institutional-grade financial infrastructure for established companies and public sector organizations requiring complex fund management.",
    href: "/business-banking/corporate",
    benefits: [
      "Advanced cash management solutions",
      "Structured trade finance & LCs",
      "Customized working capital lines",
      "Executive relationship support"
    ]
  },
  {
    id: "investments",
    title: "Commercial Treasury",
    icon: TrendingUp,
    description: "Optimize corporate liquidity with competitive fixed deposit structures and treasury instruments designed for institutional accounts.",
    href: "#",
    benefits: [
      "Competitive institutional yields",
      "Customizable maturity structures",
      "Cash backing for credit facilities",
      "On-demand liquidity management"
    ]
  }
];

export default function BusinessBanking() {
  return (
    <Layout>
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-home.png"
            alt="Business Banking Rima"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Strategic Partnership for <span className="text-secondary italic">Corporate Growth</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              From registered SMEs to large-scale corporations, Rima Microfinance Bank provides the 
              structured banking architecture and expert guidance required to operate efficiently in a dynamic economy.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Comprehensive Support for <span className="text-primary italic">Every Stage</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We offer structured commercial banking products engineered specifically for the operational 
              requirements of modern incorporated entities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {businessServices.map((service, index) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-2xl transition-all duration-500 border-none bg-card shadow-lg overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="relative pb-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Key Benefits</p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                          <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-border/50">
                    <Button variant="default" className="w-full h-12" asChild>
                      <Link to={service.href} className="flex items-center justify-center gap-2">
                        {service.id === 'investments' ? 'Coming Soon' : `Learn More about ${service.title}`}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Feature */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4" />
                Trusted by Established Businesses
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                Corporate Banking with <br />
                <span className="text-primary italic">Absolute Integrity</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                As a licensed financial institution, we combine high-level operational security with the structural 
                flexibility required by dynamic markets. Our infrastructure is designed to automate corporate 
                financial processes securely and precisely.
              </p>
              
              <ul className="space-y-5 pt-4">
                {[
                  "Automated Payroll Services",
                  "Bulk Vendor Payments & Transfers",
                  "POS Deployment with Real-time Settlement",
                  "Digital Corporate Portals for Internal Approval Flows"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-foreground/90 font-medium">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground shrink-0">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-8">
                <Button size="lg" className="h-14 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all" asChild>
                  <Link to="/contact">Open a Business Account</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="z-10 relative bg-background rounded-3xl p-4 shadow-2xl border border-border">
                <img 
                  src="/images/hero-home.png" 
                  alt="Corporate Banking with Rima Bank" 
                  className="rounded-2xl w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
