import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Loader2,
  MapPin,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Smartphone,
  CheckCircle2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCMS } from "@/context/CMSContext";
import { SupabaseSync } from "@/services/supabaseSync";
import { Link } from "react-router-dom";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { siteContent, systemSettings, addEnquiry } = useCMS();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const contactInfo = siteContent?.contactInfo;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Add to CMS real-time state store
      addEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        category: 'General Support',
        status: 'unread',
        priority: 'normal'
      });

      // Persist to Supabase
      await SupabaseSync.saveContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });

      toast({
        title: "Inquiry Submitted Successfully",
        description: "Thank you for contacting Rima Microfinance Bank. A customer relationship officer will contact you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Submission Error",
        description: err.message || "Failed to submit inquiry. Please reach us via our direct telephone lines.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const supportChannels = [
    {
      title: "Direct Support Hotline",
      description: "Immediate telephone assistance with transaction or card queries.",
      contact: contactInfo?.phone || systemSettings?.contactPhone || "+234 811 947 7050",
      link: `tel:${(contactInfo?.phone || systemSettings?.contactPhone || "+2348119477050").replace(/\s+/g, '')}`,
      cta: "Call Directly",
      icon: Phone,
      color: "#0284c7",
      bg: "#f0f7ff"
    },
    {
      title: "Email Support Desk",
      description: "Formal written requests and enquiries resolved within 24 business hours.",
      contact: contactInfo?.email || systemSettings?.contactEmail || "info@rimamfb.com",
      link: `mailto:${contactInfo?.email || systemSettings?.contactEmail || "info@rimamfb.com"}`,
      cta: "Send Email",
      icon: Mail,
      color: "#16a34a",
      bg: "#f0fdf4"
    },
    {
      title: "Direct WhatsApp Support",
      description: "Quick live messaging and customer guidance during business hours.",
      contact: "Chat with Banking Officer",
      link: `https://wa.me/${(contactInfo?.whatsapp || "2348119477050").replace(/[^0-9]/g, '')}`,
      cta: "Open WhatsApp",
      icon: MessageSquare,
      color: "#25d366",
      bg: "#f0fdf4"
    }
  ];

  const quickResources = [
    { name: "Frequently Asked Questions (FAQ)", href: "/faq", desc: "Common answers regarding savings, transfers, and accounts" },
    { name: "Branch & ATM Network Locations", href: "/branches", desc: "Locate regional banking centers and ATM terminals" },
    { name: "Whistleblowing & Governance Desk", href: "/whistle-blowing", desc: "Confidential channel for reporting compliance concerns" },
    { name: "Complaints & Dispute Resolution", href: "/complaints", desc: "Formal electronic dispute resolution procedures" },
  ];

  return (
    <Layout>
      {/* ── 1. Editorial Hero ── */}
      <section className="relative bg-white pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-10 lg:pb-12 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-600">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Customer Help & Resolution Desk</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              Customer Support & <span className="text-[#0284c7]">Contact Channels</span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
              We provide verified communication channels, prompt customer assistance, and dedicated relationship officers to support your personal and commercial banking.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Direct Support Channels (3-Column Fast Cards) ── */}
      <section className="py-6 sm:py-8 bg-slate-50/70 border-b border-[#e2e8f0]/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {supportChannels.map((channel, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#0284c7]/40 shadow-xs flex flex-col justify-between group transition-all"
              >
                <div className="space-y-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: channel.bg, color: channel.color }}
                  >
                    <channel.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-heading text-sm sm:text-base font-semibold text-[#0a1e3f]">
                    {channel.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {channel.description}
                  </p>
                  <p className="font-heading text-xs sm:text-sm font-bold text-[#0a1e3f]">
                    {channel.contact}
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-semibold rounded-xl border-[#e2e8f0] group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] transition-all"
                    asChild
                  >
                    <a href={channel.link} target={channel.link.startsWith("http") ? "_blank" : undefined} rel={channel.link.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {channel.cta}
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Main Ticket Form & Institutional Details ── */}
      <section className="py-8 sm:py-10 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left: Contact Form / Ticket Submission (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-5 sm:p-7 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs space-y-4">
                <div>
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-[#0a1e3f] tracking-tight">
                    Submit a Banking Inquiry or Support Ticket
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill out the form below. A customer care representative will follow up within one business day.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-xs font-semibold text-[#0a1e3f]">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g. Chukwuemeka Briggs"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-[#0a1e3f] focus:border-[#0284c7] text-xs h-10"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-xs font-semibold text-[#0a1e3f]">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-[#0a1e3f] focus:border-[#0284c7] text-xs h-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-xs font-semibold text-[#0a1e3f]">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0801 234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-[#0a1e3f] focus:border-[#0284c7] text-xs h-10"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="subject" className="text-xs font-semibold text-[#0a1e3f]">Nature of Inquiry</Label>
                      <select 
                        id="subject"
                        className="flex h-10 w-full rounded-xl border border-[#e2e8f0] bg-[#f0f7ff]/40 px-3 py-2 text-xs text-[#0a1e3f] focus:outline-none focus:border-[#0284c7]"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="Savings Account">Opening a Savings Account</option>
                        <option value="Current Account">Opening a Current Account</option>
                        <option value="SME Loan">Commercial / SME Loan</option>
                        <option value="Agency Banking">Agency Banking POS Terminal</option>
                        <option value="Card Issues">Debit Card or PIN Issue</option>
                        <option value="Transaction Dispute">Transaction or Transfer Dispute</option>
                        <option value="General Inquiry">General Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-xs font-semibold text-[#0a1e3f]">Message Details</Label>
                    <Textarea
                      id="message"
                      placeholder="Please specify account details or transaction reference numbers if applicable..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-[#0a1e3f] focus:border-[#0284c7] text-xs"
                    />
                  </div>

                  <div className="pt-1">
                    <Button
                      type="submit"
                      variant="pill"
                      size="default"
                      className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs h-10 shadow-sm"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Submit Inquiry
                          <ArrowRight className="h-4 w-4 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Head Office Channels & Fraud Security Notice (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Head Office Channels Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1e3f] text-white space-y-3.5 border border-white/10 shadow-sm">
                <h3 className="font-heading text-sm sm:text-base font-semibold text-white pb-2.5 border-b border-white/10">
                  Head Office Banking Hall
                </h3>

                <div className="space-y-3 text-xs text-white/85">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span>{contactInfo?.headquarters || systemSettings?.headquartersAddress || "No. 3 Evo Crescent, New GRA, Port Harcourt, Rivers State, Nigeria"}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-[#38bdf8] shrink-0" />
                    <a href={`tel:${(contactInfo?.phone || systemSettings?.contactPhone || "+2348119477050").replace(/\s+/g, '')}`} className="hover:text-[#38bdf8] transition-colors">
                      {contactInfo?.phone || systemSettings?.contactPhone || "+234 811 947 7050"}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[#38bdf8] shrink-0" />
                    <a href={`mailto:${contactInfo?.email || systemSettings?.contactEmail || "info@rimamfb.com"}`} className="hover:text-[#38bdf8] transition-colors">
                      {contactInfo?.email || systemSettings?.contactEmail || "info@rimamfb.com"}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-[#34c771] shrink-0" />
                    <span>{contactInfo?.supportHours || systemSettings?.supportHours || "Monday – Friday: 8:00 AM – 4:00 PM"}</span>
                  </div>
                </div>
              </div>

              {/* Fraud & Security Advice */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <ShieldAlert className="h-4 w-4 text-amber-600" />
                  <span>Security & Fraud Advisory</span>
                </div>
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  Rima Microfinance Bank will never request your PIN, online banking passwords, or OTP via phone, SMS, or email. Never disclose sensitive credentials to anyone.
                </p>
              </div>

              {/* Regulatory Protection Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-[#e2e8f0] flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium text-[#0a1e3f]">CBN Licensed &bull; NDIC Insured</span>
                </div>
                <Link to="/about" className="text-[#0284c7] hover:underline text-[11px] font-semibold">
                  Learn more &rarr;
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Quick Help Resources Strip ── */}
      <section className="py-6 sm:py-8 bg-slate-50 border-b border-[#e2e8f0]/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-4">
            <h3 className="font-heading text-sm sm:text-base font-bold text-[#0a1e3f]">
              Frequently Requested Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickResources.map((res, i) => (
              <Link
                key={i}
                to={res.href}
                className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] hover:border-[#0284c7]/50 shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-heading text-xs font-semibold text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors mb-1">
                    {res.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {res.desc}
                  </p>
                </div>
                <div className="pt-2 flex items-center text-[10px] font-semibold text-[#0284c7]">
                  <span>Access page</span>
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
