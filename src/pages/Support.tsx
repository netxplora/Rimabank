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
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-wider">
              <span>Customer Help & Resolution</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#360802] tracking-tight leading-[1.05]">
              Customer <span className="text-[#f73b20]">support desk</span>.
            </h1>

            <p className="text-[#360802]/80 text-base sm:text-lg leading-relaxed">
              We provide direct channels and verified assistance to ensure your personal and business banking operations run smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Support Channels 3-Column Grid */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {supportChannels.map((channel, idx) => (
              <div 
                key={idx} 
                className="card-3d p-7 sm:p-8 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm"
                    style={{ backgroundColor: channel.bg, color: channel.color }}
                  >
                    <channel.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[#360802] mb-2">{channel.title}</h3>
                  <p className="text-xs text-[#ababab] leading-relaxed mb-4">{channel.description}</p>
                  <p className="font-heading text-sm font-bold text-[#360802] mb-6">{channel.contact}</p>
                </div>
                <div>
                  <Button 
                    variant={idx === 1 ? "pill" : "outlineNeutral"} 
                    className={`w-full text-xs ${idx === 1 ? "bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange" : "rounded-full"}`} 
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
                <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
                  Help Center
                </span>
                <h3 className="font-heading text-2xl font-semibold text-[#360802] tracking-tight">
                  Support Resources
                </h3>
              </div>

              <div className="space-y-3">
                {resources.map((res, i) => (
                  <Link 
                    key={i} 
                    to={res.href} 
                    className="card-3d flex items-center justify-between p-4 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d hover:border-[#f73b20]/30 transition-all text-xs font-semibold text-[#360802] group"
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

            <div className="lg:col-span-7 perspective-1000">
              <div className="rounded-3xl bg-gradient-to-br from-[#fdedea] to-white border border-[#e7dcdb] p-6 sm:p-10 shadow-3d-lift space-y-6">
                <h3 className="font-heading text-xl font-bold text-[#360802] pb-4 border-b border-[#e7dcdb]">
                  Security Guidelines & Fraud Prevention
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#360802]">
                      <ShieldCheck className="h-4 w-4 text-[#f73b20]" />
                      <span>Protect Credentials</span>
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

                <div className="pt-2 border-t border-[#e7dcdb]">
                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
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
