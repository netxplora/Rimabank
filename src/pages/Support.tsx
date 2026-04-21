import { Layout } from "@/components/layout/Layout";
import { HelpCircle, Mail, Phone, MapPin, ExternalLink, ShieldCheck, HeartPulse, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Support() {
  const supportChannels = [
    {
      title: "Electronic Support",
      description: "Direct your inquiries to our dedicated support desk for a response within 24 business hours.",
      contact: "support@rimabank.com",
      icon: Mail,
      link: "mailto:support@rimabank.com",
      cta: "Compose Email"
    },
    {
      title: "Support Hotline",
      description: "Access our 24/7 dedicated telephone support for immediate operational assistance.",
      contact: "+234 811 947 7050",
      icon: Phone,
      link: "tel:+2348119477050",
      cta: "Call Now"
    },
    {
        title: "Branch Network",
        description: "Engage with our relationship managers at any of our established branches.",
        contact: "11 Regional Branches",
        icon: MapPin,
        link: "/branches",
        cta: "Locate Branch"
      }
  ];

  const resources = [
    { name: "Support Knowledge Base", href: "/faq", icon: HelpCircle },
    { name: "Information Security Protocols", href: "/legal", icon: ShieldCheck },
    { name: "Formal Dispute Resolution", href: "/complaints", icon: HeartPulse },
    { name: "Operational Documents & Forms", href: "/downloads", icon: ExternalLink },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-home.png"
            alt="Rima MFB Support"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            Client <span className="text-secondary italic">Support Services</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12">
            Rima Microfinance Bank provides dedicated support infrastructure to ensure your banking operations remain uninterrupted and secure.
          </p>
          <div className="max-w-md mx-auto relative group">
            <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/20 transition-all font-medium pr-12" 
            />
            <Link to="/faq" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors">
                <HelpCircle className="h-6 w-6 text-white/70" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Support Channels */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {supportChannels.map((channel, idx) => (
              <Card key={idx} className="border-none shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] bg-white group border border-slate-100">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <channel.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl">{channel.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{channel.description}</p>
                  <p className="font-bold text-lg text-primary">{channel.contact}</p>
                  <Button variant={idx === 1 ? "hero" : "outline"} className="w-full" asChild>
                    <a href={channel.link}>{channel.cta}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
             <div className="lg:w-1/3 text-left">
                <h2 className="text-3xl font-display font-bold mb-6">Support Resources</h2>
                <p className="text-muted-foreground mb-8">Access essential documentation and technical guides for efficient account management.</p>
                <div className="space-y-3">
                    {resources.map((res, i) => (
                        <Link 
                            key={i} 
                            to={res.href} 
                            className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/50 hover:border-primary/20 transition-all font-medium group"
                        >
                            <div className="flex items-center gap-3">
                                <res.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                <span>{res.name}</span>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </div>
             </div>

             <div className="lg:w-2/3">
                <div className="bg-slate-50/50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-bold mb-8">Security & Operational Verification</h3>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="p-3 bg-red-100 text-red-600 rounded-xl w-fit">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h4 className="font-bold text-lg">Fraud Awareness</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Rima Microfinance Bank will <strong>never</strong> request your PIN, password, or BVN via telephone or electronic mail. 
                                Report suspicious interactions immediately to our fraud desk.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 bg-secondary/10 text-secondary rounded-xl w-fit">
                                <Smartphone className="h-6 w-6" />
                            </div>
                            <h4 className="font-bold text-lg">Transaction Dispute Resolution</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Failed transactions with active debits are typically reversed within 24 business hours. If the discrepancy persists, initiate a formal dispute ticket.
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" className="mt-12 w-full sm:w-auto" asChild>
                        <Link to="/complaints">Initiate Formal Complaint</Link>
                    </Button>
                </div>
             </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
