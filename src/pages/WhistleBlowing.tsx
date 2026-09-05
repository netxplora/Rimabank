import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Send, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCMS } from "@/context/CMSContext";
import { SupabaseSync } from "@/services/supabaseSync";

export default function WhistleBlowing() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addEnquiry } = useCMS();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      toast.error("Please select a violation category.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please describe the incident.");
      return;
    }

    setIsSubmitting(true);
    const subject = `[Confidential Whistleblower Report] ${formData.category.toUpperCase()}`;
    const message = `Incident Category: ${formData.category}\nReporter: ${formData.name || 'Anonymous'}\nReporter Email: ${formData.email || 'Not Provided'}\n\nDescription:\n${formData.description}`;

    try {
      addEnquiry({
        name: formData.name.trim() || "Anonymous Reporter",
        email: formData.email.trim() || "anonymous@whistleblower.internal",
        subject,
        message,
        category: "Whistleblower Report",
        status: "unread",
        priority: "urgent"
      });

      await SupabaseSync.saveContactMessage({
        name: formData.name.trim() || "Anonymous Reporter",
        email: formData.email.trim() || "anonymous@whistleblower.internal",
        subject,
        message
      });

      toast.success("Confidential incident report securely transmitted to the Compliance & Audit Committee.");
      setFormData({
        name: "",
        email: "",
        category: "",
        description: ""
      });
    } catch (err) {
      toast.error("Failed to submit report. Please contact the compliance desk directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0284c7] text-xs font-semibold uppercase tracking-wider">
              <Lock className="h-3.5 w-3.5 text-[#0284c7]" />
              <span>Confidential Compliance Channel</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Whistleblowing & <span className="text-[#0284c7]">ethical reporting</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-base sm:text-lg leading-relaxed">
              Report financial misconduct, policy breaches, or ethical violations confidentially. Submissions go directly to the Board Audit Committee.
            </p>
          </div>
        </div>
      </section>

      {/* Main Reporting Form Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Info Sidebar (4 cols) — Open Layout */}
            <div className="lg:col-span-4 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              <div className="space-y-3 pb-6 border-b border-[#e2e8f0]/80">
                <h3 className="font-heading text-lg font-semibold text-[#0a1e3f]">Reportable Issues</h3>
                <ul className="space-y-2 text-xs text-[#0a1e3f]/85">
                  <li className="flex items-center gap-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Financial fraud & unauthorized debits</span>
                  </li>
                  <li className="flex items-center gap-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Bribery, extortion, or conflicts of interest</span>
                  </li>
                  <li className="flex items-center gap-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Breach of Central Bank guidelines</span>
                  </li>
                  <li className="flex items-center gap-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Workplace harassment or discrimination</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0a1e3f]">
                  <ShieldCheck className="h-4 w-4 text-[#34c771]" />
                  <span>Whistleblower Protection</span>
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  You may choose to remain completely anonymous. In accordance with Central Bank of Nigeria guidelines, whistleblowers are protected against retaliatory action.
                </p>
              </div>
            </div>

            {/* Reporting Form (8 cols) */}
            <div className="lg:col-span-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:border-[#0284c7]/30 transition-all duration-300 p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-[#0a1e3f] tracking-tight">
                    Submit a Confidential Incident Report
                  </h2>
                  <p className="text-xs text-[#64748b] mt-1">
                    Provide verifiable information to assist the internal audit committee in conducting a comprehensive review.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#0a1e3f]">Your Name (Optional)</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Leave blank for anonymity"
                        className="bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-xs text-[#0a1e3f] focus:border-[#0284c7] h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#0a1e3f]">Email Address (Optional)</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="For follow-up correspondence"
                        className="bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-xs text-[#0a1e3f] focus:border-[#0284c7] h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-[#0a1e3f]">Category of Violation *</Label>
                    <select 
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="flex h-11 w-full rounded-xl border border-[#e2e8f0] bg-[#f0f7ff]/40 px-3 py-2 text-xs text-[#0a1e3f] focus:outline-none focus:border-[#0284c7]"
                    >
                      <option value="">Select violation category</option>
                      <option value="Financial Fraud & Theft">Financial Fraud & Theft</option>
                      <option value="Unethical Professional Conduct">Unethical Professional Conduct</option>
                      <option value="Regulatory & Policy Non-Compliance">Regulatory & Policy Non-Compliance</option>
                      <option value="Workplace Harassment">Workplace Harassment</option>
                      <option value="Other Incident">Other Incident</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-[#0a1e3f]">Incident Description & Parties Involved *</Label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detail what occurred, dates, branch or department, and persons involved..."
                      className="bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-xs text-[#0a1e3f] focus:border-[#0284c7]"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#f0f7ff] border border-[#e2e8f0] text-xs text-[#64748b] flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span>
                      Please ensure statements are submitted in good faith. Submitting false reports maliciously is prohibited under institutional governance codes.
                    </span>
                  </div>

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      variant="pill" 
                      size="lg" 
                      className="w-full bg-[#0284c7] hover:bg-[#0284c7]/90 text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Encrypting and Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Confidential Report</span>
                          <Send className="h-4 w-4 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
