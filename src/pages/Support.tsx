import { Layout } from "@/components/layout/Layout";
import { HelpCircle, Mail, Phone, MapPin, ExternalLink, ShieldCheck, HeartPulse, Smartphone, ArrowRight, MessageSquare, Clock } from "lucide-react";
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
      color: "#16a34a"
    },
    {
      title: "Branch Network Desk",
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
    { name: "Account Mandate & Download Forms", href: "/contact", icon: ExternalLink },
  ];

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              <span>Customer Help & Resolution Desk</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Customer <span className="text-[#0284c7]">support desk</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-sm sm:text-base leading-relaxed">
              We provide verified communication channels and prompt assistance to ensure your personal and business banking operations run smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Support Channels 3-Column Grid */}
      <section className="py-10 sm:py-12 md:py-16 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {supportChannels.map((channel, idx) => (
              <div 
                key={idx} 
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e2e8f0] hover:border-[#0284c7]/40 shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-xs"
                    style={{ backgroundColor: channel.bg, color: channel.color }}
                  >
                    <channel.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#0a1e3f] mb-1.5">{channel.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed mb-4">{channel.description}</p>
                  <p className="font-heading text-sm font-bold text-[#0a1e3f] mb-6">{channel.contact}</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
                  Help Center
                </span>
                <h3 className="font-heading text-2xl font-semibold text-[#0a1e3f] tracking-tight">
                  Support Resources
                </h3>
              </div>

              <div className="divide-y divide-[#e2e8f0] border-t border-b border-[#e2e8f0]">
                {resources.map((res, i) => (
                  <Link 
                    key={i} 
                    to={res.href} 
                    className="flex items-center justify-between py-4 text-xs font-semibold text-[#0a1e3f] hover:text-[#0284c7] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <res.icon className="h-4.5 w-4.5 text-[#0284c7]" />
                      <span>{res.name}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#64748b] group-hover:text-[#0284c7] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 perspective-1000">
              <div className="rounded-3xl bg-gradient-to-br from-[#0a1e3f] via-[#0f2a50] to-[#081730] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="font-heading text-lg font-bold text-white">
                    Security Guidelines & Fraud Protection
                  </h3>
                  <ShieldCheck className="h-5 w-5 text-[#4ade80]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2 text-xs p-3.5 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <ShieldCheck className="h-4 w-4 text-[#38bdf8]" />
                      <span>Protect Credentials</span>
                    </div>
                    <p className="text-blue-100/75 leading-relaxed">
                      Rima MFB will never ask for your card PIN, online passwords, or BVN via telephone, SMS, or email.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs p-3.5 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Smartphone className="h-4 w-4 text-[#4ade80]" />
                      <span>Transfer Reversals</span>
                    </div>
                    <p className="text-blue-100/75 leading-relaxed">
                      Delayed inter-bank transfer reversals are processed within 24 hours under standard Central Bank guidelines.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
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
