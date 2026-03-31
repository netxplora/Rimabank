import { Layout } from "@/components/layout/Layout";
import { Wallet, CreditCard, GraduationCap, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const personalServices = [
  {
    id: "savings",
    title: "Savings Accounts",
    icon: Wallet,
    description: "Grow your wealth with competitive interest rates and zero hidden charges. Perfect for reaching your long-term goals.",
    href: "/personal-banking/savings",
    benefits: [
      "Up to 4% p.a. interest rate",
      "Zero maintenance fees",
      "Free instant debit card",
      "24/7 Mobile access"
    ]
  },
  {
    id: "current",
    title: "Current Accounts",
    icon: CreditCard,
    description: "Seamless daily banking with unlimited transactions, overdraft facilities, and professional support.",
    href: "/personal-banking/current",
    benefits: [
      "Zero hidden transfer charges",
      "Personalized cheque books",
      "Overdraft facilities",
      "Real-time SMS/Email alerts"
    ]
  },
  {
    id: "student",
    title: "Student Banking",
    icon: GraduationCap,
    description: "Empowering the next generation with zero-fee accounts, study loans, and campus-focused benefits.",
    href: "/personal-banking/student",
    benefits: [
      "₦0 monthly maintenance fees",
      "Free student debit card",
      "Educational support loans",
      "Campus discounts"
    ]
  }
];

export default function PersonalBanking() {
  return (
    <Layout>
      <section className="bg-gradient-hero text-primary-foreground py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Banking Built for <span className="text-secondary italic">Your Lifestyle</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Explore our range of personalized banking solutions designed to help you save, 
              spend, and thrive in every stage of your life.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Tailored Solutions for Your <span className="text-primary italic">Personal Needs</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you're starting your financial journey or looking for premium banking services, 
              we have the right account for you.
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
                        Expolore {service.title}
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
                  src="https://images.unsplash.com/photo-1563906267088-b029e7101114?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Banking App" 
                  className="rounded-2xl w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
            </div>

            <div className="space-y-8">
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                Modern Banking for the <br />
                <span className="text-primary italic">Modern Life</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe banking should be effortless. That's why every personal account comes with
                world-class digital tools and exceptional support.
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
