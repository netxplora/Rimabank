import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, FileText, Send, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function WhistleBlowing() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Confidential report submitted to the Compliance & Audit Committee.");
    }, 1500);
  };

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#fb2d54] text-xs font-semibold uppercase tracking-ui">
              <Lock className="h-3.5 w-3.5 text-[#fb2d54]" />
              <span>Confidential Compliance Channel</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              Whistleblowing & <span className="text-[#fb2d54]">ethical reporting</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              Report financial misconduct, policy breaches, or ethical violations confidentially. Submissions go directly to the Board Audit Committee.
            </p>
          </div>
        </div>
      </section>

      {/* Main Reporting Form Section */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Info Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift space-y-4">
                <h3 className="font-heading text-lg font-semibold text-[#360802]">Reportable Issues</h3>
                <ul className="space-y-2.5 text-xs text-[#360802]/80">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb2d54]" />
                    <span>Financial fraud and unauthorized transactions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb2d54]" />
                    <span>Bribery, extortion, or conflict of interest</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb2d54]" />
                    <span>Gross violation of Central Bank regulations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb2d54]" />
                    <span>Workplace harassment or discrimination</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-cards bg-[#fdedea] border border-[#e7dcdb] shadow-lift space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#360802]">
                  <ShieldCheck className="h-4 w-4 text-[#34c771]" />
                  <span>Whistleblower Protection</span>
                </div>
                <p className="text-xs text-[#ababab] leading-relaxed">
                  You may choose to remain completely anonymous. In accordance with Central Bank of Nigeria guidelines, whistleblowers are protected against any retaliatory action.
                </p>
              </div>
            </div>

            {/* Reporting Form (8 cols) */}
            <div className="lg:col-span-8">
              <div className="p-8 lg:p-10 rounded-cards bg-white border border-[#e7dcdb] shadow-lift space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-medium text-[#360802] tracking-tight">
                    Submit a Confidential Incident Report
                  </h2>
                  <p className="text-xs text-[#ababab] mt-1">
                    Provide verifiable information to assist the internal audit committee in conducting a comprehensive review.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#360802]">Your Name (Optional)</Label>
                      <Input
                        placeholder="Leave blank for anonymity"
                        className="bg-[#fdedea]/40 border-[#e7dcdb] rounded-inputs text-xs text-[#360802] focus:border-[#fb2d54]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#360802]">Email Address (Optional)</Label>
                      <Input
                        type="email"
                        placeholder="For follow-up correspondence"
                        className="bg-[#fdedea]/40 border-[#e7dcdb] rounded-inputs text-xs text-[#360802] focus:border-[#fb2d54]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-[#360802]">Category of Violation</Label>
                    <select 
                      required
                      className="flex h-10 w-full rounded-inputs border border-[#e7dcdb] bg-[#fdedea]/40 px-3 py-2 text-xs text-[#360802] focus:outline-none focus:border-[#fb2d54]"
                    >
                      <option value="">Select violation category</option>
                      <option value="fraud">Financial Fraud & Theft</option>
                      <option value="ethics">Unethical Professional Conduct</option>
                      <option value="compliance">Regulatory & Policy Non-Compliance</option>
                      <option value="harassment">Workplace Harassment</option>
                      <option value="other">Other Incident</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-[#360802]">Incident Description & Parties Involved</Label>
                    <Textarea
                      required
                      rows={5}
                      placeholder="Detail what occurred, dates, branch or department, and persons involved..."
                      className="bg-[#fdedea]/40 border-[#e7dcdb] rounded-inputs text-xs text-[#360802] focus:border-[#fb2d54]"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs text-[#ababab] flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 text-[#fb2d54] shrink-0 mt-0.5" />
                    <span>
                      Please ensure statements are submitted in good faith. Submitting false reports maliciously is prohibited under institutional governance codes.
                    </span>
                  </div>

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      variant="pill" 
                      size="lg" 
                      className="w-full bg-[#fb2d54] hover:bg-[#fb2d54]/90 text-white shadow-brand"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Encrypting and Submitting..." : "Submit Confidential Report"}
                      <Send className="h-4 w-4 ml-1" />
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
