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
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message,
          status: 'open',
          priority: 'medium'
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Message Submitted",
        description: "Thank you for contacting Rima Microfinance Bank. A relationship officer will contact you shortly.",
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
        description: err.message || "Failed to submit inquiry. Please reach us via our official telephone lines.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span>Customer Service & Inquiries</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Contact our <span className="text-[#0284c7]">banking team</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-sm sm:text-base leading-relaxed">
              Whether opening an account, requesting commercial credit, or seeking operational support, our relationship officers are available to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-8 sm:py-10 md:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            
            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              <div className="p-5 sm:p-7 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:border-[#0284c7]/30 transition-all duration-300 space-y-4">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#0a1e3f] tracking-tight">
                    Submit an Inquiry
                  </h2>
                  <p className="text-xs text-[#64748b] mt-0.5">
                    Fill out your details below and a relationship officer will get in touch within one business day.
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
                      <Label htmlFor="subject" className="text-xs font-semibold text-[#0a1e3f]">Subject of Inquiry</Label>
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
                        <option value="General Inquiry">General Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-xs font-semibold text-[#0a1e3f]">Message Details</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details regarding your banking inquiry..."
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
                      className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
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

            {/* Direct Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Direct Info Card */}
              <div className="p-6 rounded-2xl bg-[#0a1e3f] text-white space-y-4 border border-white/10">
                <h3 className="font-heading text-base font-semibold text-white pb-3 border-b border-white/10">
                  Head Office Channels
                </h3>

                <div className="space-y-3 text-xs text-white/85">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span>No. 3 Evo Crescent, New GRA, Port Harcourt, Rivers State, Nigeria</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-[#38bdf8] shrink-0" />
                    <a href="tel:+2348119477050" className="hover:text-[#38bdf8] transition-colors">
                      +234 811 947 7050
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[#38bdf8] shrink-0" />
                    <a href="mailto:info@rimamfb.com" className="hover:text-[#38bdf8] transition-colors">
                      info@rimamfb.com
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-[#34c771] shrink-0" />
                    <span>Monday &ndash; Friday: 8:00 AM &ndash; 4:00 PM</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <a
                    href="https://wa.me/2348119477050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#34c771]/20 text-[#34c771] border border-[#34c771]/40 text-xs font-semibold hover:bg-[#34c771]/30 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Direct WhatsApp Chat
                  </a>
                </div>
              </div>

              {/* Regulatory Assurance Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e2e8f0] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0a1e3f]">
                  <ShieldCheck className="h-4 w-4 text-[#34c771]" />
                  <span>Regulatory Protection</span>
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Central Bank of Nigeria (CBN) licensed microfinance institution. All eligible customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
