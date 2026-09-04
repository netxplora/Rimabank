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
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-wider">
              <span>Customer Service & Inquiries</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#360802] tracking-tight leading-[1.05]">
              Contact our <span className="text-[#f73b20]">banking team</span>.
            </h1>

            <p className="text-[#360802]/80 text-base sm:text-lg leading-relaxed">
              Whether opening an account, requesting commercial credit, or seeking operational support, our relationship officers are available to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#e7dcdb] space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-[#360802] tracking-tight">
                    Submit an Inquiry
                  </h2>
                  <p className="text-xs text-[#ababab] mt-1">
                    Fill out your details below and a relationship officer will get in touch within one business day.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-semibold text-[#360802]">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g. Chukwuemeka Briggs"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-[#fdedea]/40 border-[#e7dcdb] rounded-xl text-[#360802] focus:border-[#f73b20] text-xs h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-semibold text-[#360802]">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-[#fdedea]/40 border-[#e7dcdb] rounded-xl text-[#360802] focus:border-[#f73b20] text-xs h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-semibold text-[#360802]">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0801 234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-[#fdedea]/40 border-[#e7dcdb] rounded-xl text-[#360802] focus:border-[#f73b20] text-xs h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="text-xs font-semibold text-[#360802]">Subject of Inquiry</Label>
                      <select 
                        id="subject"
                        className="flex h-11 w-full rounded-xl border border-[#e7dcdb] bg-[#fdedea]/40 px-3 py-2 text-xs text-[#360802] focus:outline-none focus:border-[#f73b20]"
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

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-semibold text-[#360802]">Message Details</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details regarding your banking inquiry..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-[#fdedea]/40 border-[#e7dcdb] rounded-xl text-[#360802] focus:border-[#f73b20] text-xs"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="pill"
                      size="lg"
                      className="w-full bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
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
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Info Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#360802] via-[#450b03] to-[#250501] text-white space-y-6 border border-white/15">
                <h3 className="font-heading text-lg font-semibold text-white pb-4 border-b border-white/15">
                  Head Office Channels
                </h3>

                <div className="space-y-4 text-xs text-white/85">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-[#f73b20] shrink-0 mt-0.5" />
                    <span>No. 3 Evo Crescent, New GRA, Port Harcourt, Rivers State, Nigeria</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#f73b20] shrink-0" />
                    <a href="tel:+2348119477050" className="hover:text-[#f73b20] transition-colors">
                      +234 811 947 7050
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#f73b20] shrink-0" />
                    <a href="mailto:info@rimamfb.com" className="hover:text-[#f73b20] transition-colors">
                      info@rimamfb.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-[#34c771] shrink-0" />
                    <span>Monday &ndash; Friday: 8:00 AM &ndash; 4:00 PM</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15">
                  <a
                    href="https://wa.me/2348119477050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#34c771]/20 text-[#34c771] border border-[#34c771]/40 text-xs font-semibold hover:bg-[#34c771]/30 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Direct WhatsApp Chat
                  </a>
                </div>
              </div>

              {/* Regulatory Assurance Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#e7dcdb] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#360802]">
                  <ShieldCheck className="h-4 w-4 text-[#34c771]" />
                  <span>Regulatory Protection</span>
                </div>
                <p className="text-xs text-[#ababab] leading-relaxed">
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
