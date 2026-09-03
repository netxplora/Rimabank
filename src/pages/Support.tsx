import { Layout } from "@/components/layout/Layout";
import { HelpCircle, Mail, Phone, MapPin, ExternalLink, ShieldCheck, HeartPulse, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Support() {
  const supportChannels = [
    {
      title: "Email Support Desk",
      description: "Submit written inquiries or formal account requests for resolution within 24 business hours.",
      contact: "info@rimamfb.com",
      icon: Mail,
      link: "mailto:info@rimamfb.com",
      cta: "Send Email",
      bg: "#fdedea",
      color: "#f73b20"
    },
    {
      title: "Direct Support Hotline",
      description: "Speak with a customer care representative for immediate assistance with transaction queries.",
      contact: "+234 811 947 7050",
      icon: Phone,
      link: "tel:+2348119477050",
      cta: "Call Directly",
      bg: "#bcffbb",
      color: "#34c771"
    },
    {
      title: "Branch Network",
      description: "Visit any of our regional branch locations in Rivers State for in-person account operations.",
      contact: "Port Harcourt & Regional Hubs",
      icon: MapPin,
      link: "/branches",
      cta: "View Locations",
      bg: "#e7dcdb",
      color: "#477ee9"
    }
  ];

  const resources = [
    { name: "Frequently Asked Questions", href: "/faq", icon: HelpCircle },
    { name: "Regulatory Disclosures & Privacy", href: "/privacy", icon: ShieldCheck },
    { name: "Official Dispute & Complaints", href: "/complaints", icon: HeartPulse },
    { name: "Account Mandate & Download Forms", href: "/downloads", icon: ExternalLink },
  ];

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-ui">
              <span>Customer Help & Resolution</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              Customer <span className="text-[#f73b20]">support desk</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              We provide direct channels and verified assistance to ensure your personal and business banking operations run smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Support Channels Grid */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {supportChannels.map((channel, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: channel.bg, color: channel.color }}
                  >
                    <channel.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-medium text-[#360802] mb-2">{channel.title}</h3>
                  <p className="text-xs text-[#ababab] leading-relaxed mb-4">{channel.description}</p>
                  <p className="font-heading text-sm font-bold text-[#360802] mb-6">{channel.contact}</p>
                </div>
                <div>
                  <Button 
                    variant={idx === 1 ? "pill" : "outlineNeutral"} 
                    className="w-full text-xs shadow-brand" 
                    asChild
                  >
                    <a href={channel.link}>
                      {channel.cta}
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Support Directory & Security Advice */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
                  Help Center
                </span>
                <h3 className="font-heading text-2xl font-medium text-[#360802] tracking-tight">
                  Support Resources
                </h3>
              </div>

              <div className="space-y-3">
                {resources.map((res, i) => (
                  <Link 
                    key={i} 
                    to={res.href} 
                    className="flex items-center justify-between p-4 rounded-cards bg-white border border-[#e7dcdb] shadow-lift hover:border-[#f73b20]/30 transition-all text-xs font-semibold text-[#360802] group"
                  >
                    <div className="flex items-center gap-3">
                      <res.icon className="h-4 w-4 text-[#f73b20]" />
                      <span>{res.name}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#ababab] group-hover:text-[#f73b20] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-8 lg:p-10 rounded-cards bg-[#fdedea] border border-[#e7dcdb] shadow-lift space-y-6">
                <h3 className="font-heading text-xl font-bold text-[#360802] pb-4 border-b border-[#e7dcdb]">
                  Security Guidelines & Fraud Prevention
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#360802]">
                      <ShieldCheck className="h-4 w-4 text-[#f73b20]" />
                      <span>Protect Sensitive Credentials</span>
                    </div>
                    <p className="text-[#ababab] leading-relaxed">
                      Rima MFB will never ask for your card PIN, online passwords, or BVN via telephone, SMS, or email.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#360802]">
                      <Smartphone className="h-4 w-4 text-[#34c771]" />
                      <span>Transaction Reversals</span>
                    </div>
                    <p className="text-[#ababab] leading-relaxed">
                      Delayed inter-bank transfer reversals are processed within 24 hours under standard Central Bank guidelines.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e7dcdb]">
                  <Button variant="pill" size="default" asChild className="shadow-brand">
                    <Link to="/contact">
                      Submit Customer Ticket
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
