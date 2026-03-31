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
    description: "Tailored for success. From micro-enterprises to growing SMEs, we provide the capital and tools you need to scale your business in Rivers State.",
    href: "/business-banking/sme",
    benefits: [
      "Quick SME credit facilities",
      "Business advisory & mentorship",
      "Dedicated Relationship Managers",
      "Higher transaction limits"
    ]
  },
  {
    id: "corporate",
    title: "Corporate Accounts",
    icon: Building2,
    description: "Enterprise-grade solutions for established corporations and public sector institutions. Secure, reliable, and integrated financial services.",
    href: "/business-banking/corporate",
    benefits: [
      "Institutional cash management",
      "Trade finance & LCs",
      "Customized credit lines",
      "Expert relationship support"
    ]
  },
  {
    id: "investments",
    title: "Business Investments",
    icon: TrendingUp,
    description: "Make your idle business funds work harder with our competitive fixed deposit and treasury bills options tailored for business accounts.",
    href: "#",
    benefits: [
      "Competitive ROI",
      "Flexible tenors",
      "Collateral for loans",
      "Instant liquidity options"
    ]
  }
];

export default function BusinessBanking() {
  return (
    <Layout>
      <section className="bg-gradient-hero text-primary-foreground py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Partnering for Your <span className="text-secondary italic">Business Success</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              From local startups to large scale corporations, Rivers Microfinance Bank provides the 
              strategic banking solutions and expert guidance needed to thrive in Nigeria's dynamic economy.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Empowering Enterprises at <span className="text-primary italic">Every Scale</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We offer comprehensive business banking products designed specifically for the unique 
              challenges faced by businesses across Rivers State.
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
                Trusted by 5,000+ Rivers Businesses
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                Corporate Banking with <br />
                <span className="text-primary italic">Absolute Integrity</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                As a CBN-Licensed Microfinance Bank, we combine high-level security with the flexibility 
                needed to support fast-moving businesses. Our solutions are designed to automate your 
                financial processes and minimize risks.
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
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Business Planning" 
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
