import { Layout } from "@/components/layout/Layout";
import { Wallet, CreditCard, GraduationCap, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const personalServices = [
  {
    id: "savings",
    title: "Savings & Deposits",
    icon: Wallet,
    description: "Build financial stability with structured deposit accounts offering competitive interest yields and zero hidden maintenance fees.",
    href: "/personal-banking/savings",
    benefits: [
      "Competitive annualized interest rates",
      "No mandatory monthly maintenance fees",
      "Complimentary debit card issuance",
      "Secure 24/7 digital access"
    ]
  },
  {
    id: "current",
    title: "Retail Current Accounts",
    icon: CreditCard,
    description: "Facilitate seamless daily transactions with high-volume capacity, accessible overdraft facilities, and priority support.",
    href: "/personal-banking/current",
    benefits: [
      "Transparent transaction fee structure",
      "Personalized cheque book issuance",
      "Accessible overdraft facilities",
      "Instant transaction notifications"
    ]
  },
  {
    id: "student",
    title: "Student & Youth Banking",
    icon: GraduationCap,
    description: "Foundational financial accounts providing zero-fee structures and support for educational capital requirements.",
    href: "/personal-banking/student",
    benefits: [
      "Zero monthly maintenance fees",
      "Complimentary youth debit card",
      "Educational credit support",
      "Partner merchant discounts"
    ]
  }
];

export default function PersonalBanking() {
  return (
    <Layout>
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-home.png"
            alt="Personal Banking Rima"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Retail Banking for <span className="text-secondary italic">Your Financial Goals</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Explore our comprehensive range of retail banking products structured to provide absolute security, optimal returns on deposits, and seamless transaction execution.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Structured Products for <span className="text-primary italic">Individual Needs</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our retail offerings are engineered to provide maximum financial efficiency, whether you are managing daily expenses or accumulating long-term capital.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {personalServices.map((service, index) => (
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
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Key Highlights</p>
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
                        Explore {service.title}
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

      {/* Feature Showcase */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="z-10 relative bg-background rounded-3xl p-4 shadow-2xl border border-border">
                <img 
                  src="/images/hero-home.png" 
                  alt="Banking with Rima Bank" 
                  className="rounded-2xl w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
            </div>

            <div className="space-y-8">
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                Modern Banking for <br />
                <span className="text-primary italic">Optimal Management</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe financial management should be efficient and highly secure. Every retail account integrates our robust digital infrastructure with dedicated customer support.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="text-lg font-bold">Secure Transactions</h4>
                  <p className="text-sm text-muted-foreground">End-to-end encryption for all your financial data.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold">24/7 Access</h4>
                  <p className="text-sm text-muted-foreground">Manage your finances anytime, anywhere in the world.</p>
                </div>
              </div>

              <div className="pt-8">
                <Button size="lg" className="h-14 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all" asChild>
                  <Link to="/digital-banking">Get Started Online</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
