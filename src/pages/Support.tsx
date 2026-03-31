import { Layout } from "@/components/layout/Layout";
import { HelpCircle, Mail, Phone, MapPin, ExternalLink, ShieldCheck, HeartPulse, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Support() {
  const supportChannels = [
    {
      title: "Email Support",
      description: "Send us a message and we'll get back to you within 24 hours.",
      contact: "info@riversmfb.com",
      icon: Mail,
      link: "mailto:info@riversmfb.com",
      cta: "Email Us"
    },
    {
      title: "Customer Hotline",
      description: "Call our 24/7 support line for immediate assistance.",
      contact: "+234 811 947 7050",
      icon: Phone,
      link: "tel:+2348119477050",
      cta: "Call Now"
    },
    {
        title: "Visit a Branch",
        description: "Speak directly with our team at any of our branches.",
        contact: "11 Branches across Rivers State",
        icon: MapPin,
        link: "/branches",
        cta: "Locate Branch"
      }
  ];

  const resources = [
    { name: "Frequently Asked Questions", href: "/faq", icon: HelpCircle },
    { name: "Security Tips", href: "/legal", icon: ShieldCheck },
    { name: "Report a Problem", href: "/complaints", icon: HeartPulse },
    { name: "Download Forms", href: "/downloads", icon: ExternalLink },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            How can we help?
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12">
            Our support team is here to ensure you have a seamless banking experience with Rivers MFB. 
            Choose a channel that works best for you.
          </p>
          <div className="max-w-md mx-auto relative group">
            <input 
                type="text" 
                placeholder="Search for answers..." 
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
                <h2 className="text-3xl font-display font-bold mb-6">Quick Resources</h2>
                <p className="text-muted-foreground mb-8">Access helpful guides and tools to manage your account efficiently.</p>
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
                    <h3 className="text-2xl font-bold mb-8">Security & Verification</h3>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="p-3 bg-red-100 text-red-600 rounded-xl w-fit">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h4 className="font-bold text-lg">Phishing Alerts</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Rivers MFB will <strong>never</strong> ask for your PIN, password, or BVN over the phone or email. 
                                Report any suspicious calls immediately.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 bg-secondary/10 text-secondary rounded-xl w-fit">
                                <Smartphone className="h-6 w-6" />
                            </div>
                            <h4 className="font-bold text-lg">Transaction Disputes</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                If you experience a failed transaction but were debited, don't worry. 
                                Most reversals happen within 24 hours. If not, log a ticket below.
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" className="mt-12 w-full sm:w-auto" asChild>
                        <Link to="/complaints">Log a Complaint</Link>
                    </Button>
                </div>
             </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
