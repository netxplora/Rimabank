import { Layout } from "@/components/layout/Layout";
import { Store, Users, DollarSign, Smartphone, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function AgentBanking() {
  const agentBenefits = [
    {
      title: "Extra Income",
      description: "Earn attractive commissions on every transaction performed at your location.",
      icon: DollarSign,
    },
    {
      title: "Business Growth",
      description: "Increase foot traffic to your existing business as customers come in for banking services.",
      icon: Store,
    },
    {
      title: "Community Impact",
      description: "Help provide essential financial services to your community members.",
      icon: Users,
    },
    {
      title: "Simple Technology",
      description: "Our easy-to-use POS terminals and mobile apps make transactions a breeze.",
      icon: Smartphone,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Agent Banking"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
            <Store className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">Earn as you serve</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            Rima Agent Banking
          </h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8">
            Become a Rivers MFB Agent today and bring banking closer to your community while earning extra income.
          </p>
          <Button size="xl" className="px-10" asChild>
            <Link to="/contact">Join the Network</Link>
          </Button>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why Become a Rima Agent?</h2>
            <p className="text-muted-foreground">Joining our agent network is a smart business move with multiple growth paths and guaranteed support.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agentBenefits.map((benefit, idx) => (
              <Card key={idx} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-muted/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Services You Can Provide</h2>
              <div className="space-y-4">
                {[
                  "Account Opening for new customers",
                  "Cash Deposits and Withdrawals",
                  "Funds Transfers (Local & Interbank)",
                  "Bill Payments (Electricity, Cable TV, etc.)",
                  "Airtime and Data Top-up",
                  "BVN Enrollment support"
                ].map((service, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8" size="lg" asChild>
                <Link to="/contact"> Get Started <ArrowRight className="ml-2 h-4 w-4" /> </Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="POS Terminal" 
                  className="w-full transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/How it works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">How to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
              <h3 className="font-bold mb-2">Apply</h3>
              <p className="text-sm text-muted-foreground">Fill our agent application form at any branch or online.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
              <h3 className="font-bold mb-2">Verify</h3>
              <p className="text-sm text-muted-foreground">Our team will visit your location for verification and KYC setup.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
              <h3 className="font-bold mb-2">Transact</h3>
              <p className="text-sm text-muted-foreground">Receive your POS and materials and start earning immediately.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
