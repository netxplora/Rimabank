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
      bg: "#f0f7ff",
      color: "#0284c7"
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
      bg: "#e2e8f0",
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
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span>Customer Help & Resolution</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.05]">
              Customer <span className="text-[#0284c7]">support desk</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-base sm:text-lg leading-relaxed">
              We provide direct channels and verified assistance to ensure your personal and business banking operations run smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Support Channels 3-Column Grid */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Support Channels — Open 3-Column Layout (No heavy card containers) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]/80 border-t border-b border-[#e2e8f0]/80 py-4 mb-16">
            {supportChannels.map((channel, idx) => (
              <div 
                key={idx} 
                className="py-8 md:p-6 lg:p-8 flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: channel.bg, color: channel.color }}
                  >
                    <channel.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#0a1e3f] mb-1.5">{channel.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed mb-3">{channel.description}</p>
                  <p className="font-heading text-sm font-bold text-[#0a1e3f] mb-5">{channel.contact}</p>
                </div>
                <div>
                  <Button 
                    variant={idx === 1 ? "pill" : "outlineNeutral"} 
                    className={`w-full text-xs ${idx === 1 ? "bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20" : "rounded-full"}`} 
                    asChild
                  >
                    <a href={channel.link}>
                      {channel.cta}
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Support Directory & Security Advice Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
                  Help Center
                </span>
                <h3 className="font-heading text-2xl font-semibold text-[#0a1e3f] tracking-tight">
                  Support Resources
                </h3>
              </div>

              <div className="divide-y divide-[#e2e8f0]/70 border-t border-b border-[#e2e8f0]/70">
                {resources.map((res, i) => (
                  <Link 
                    key={i} 
                    to={res.href} 
                    className="flex items-center justify-between py-3.5 text-xs font-semibold text-[#0a1e3f] hover:text-[#0284c7] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <res.icon className="h-4 w-4 text-[#0284c7]" />
                      <span>{res.name}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#64748b] group-hover:text-[#0284c7] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 perspective-1000">
              <div className="rounded-3xl bg-gradient-to-br from-[#f0f7ff] to-white border border-[#e2e8f0] p-6 sm:p-10 shadow-md space-y-6">
                <h3 className="font-heading text-xl font-bold text-[#0a1e3f] pb-4 border-b border-[#e2e8f0]">
                  Security Guidelines & Fraud Prevention
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#0a1e3f]">
                      <ShieldCheck className="h-4 w-4 text-[#0284c7]" />
                      <span>Protect Credentials</span>
                    </div>
                    <p className="text-[#64748b] leading-relaxed">
                      Rima MFB will never ask for your card PIN, online passwords, or BVN via telephone, SMS, or email.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#0a1e3f]">
                      <Smartphone className="h-4 w-4 text-[#34c771]" />
                      <span>Transaction Reversals</span>
                    </div>
                    <p className="text-[#64748b] leading-relaxed">
                      Delayed inter-bank transfer reversals are processed within 24 hours under standard Central Bank guidelines.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#e2e8f0]">
                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                  >
                    <Link to="/contact">
                      Submit Customer Ticket
                      <ArrowRight className="h-4 w-4 ml-1.5" />
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
