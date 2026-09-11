import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Calculator, TrendingUp, Lock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { DownloadAppDialog } from "@/components/modals/DownloadAppDialog";

export function FeaturedProductSection() {
  const [showAppDialog, setShowAppDialog] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(50000);
  const [months, setMonths] = useState<number>(12);

  const annualRate = 0.125;
  const principal = monthlyAmount * months;
  const estimatedInterest = Math.round(principal * (annualRate * (months / 12) * 0.55));
  const estimatedTotal = principal + estimatedInterest;

  return (
    <section className="relative py-16 sm:py-24 bg-[#f8fbff] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Content Column (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>Featured Savings Plan</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                A structured savings account built around your milestones
              </h2>
              <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Save consistently toward your business inventory, rent, or family goals with automated standing orders and guaranteed daily interest accrual.
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-heading font-bold text-[#0a1e3f] block text-sm">Up to 12.5% p.a. Yield</span>
                  <span className="font-sans text-xs text-slate-600 leading-relaxed">Interest calculated daily and credited directly to your balance.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-heading font-bold text-[#0a1e3f] block text-sm">Flexible Tenures</span>
                  <span className="font-sans text-xs text-slate-600 leading-relaxed">Choose 3, 6, 12, or 24 month structured durations.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-heading font-bold text-[#0a1e3f] block text-sm">Zero Maintenance Fees</span>
                  <span className="font-sans text-xs text-slate-600 leading-relaxed">No monthly ledger deductions, card dues, or account keeping fees.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-heading font-bold text-[#0a1e3f] block text-sm">NDIC Insured</span>
                  <span className="font-sans text-xs text-slate-600 leading-relaxed">100% statutory deposit protection under CBN regulatory rules.</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto">
              <Button
                variant="pill"
                size="lg"
                onClick={() => setShowAppDialog(true)}
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-12 px-7 shadow-md w-full sm:w-auto text-center cursor-pointer"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Get the App</span>
                </span>
              </Button>

              <Button
                variant="outlineNeutral"
                size="lg"
                asChild
                className="rounded-full border-slate-300 bg-white hover:bg-slate-50 text-[#0a1e3f] text-xs sm:text-sm font-semibold h-12 px-6 w-full sm:w-auto text-center shadow-2xs"
              >
                <Link to="/savings" className="inline-flex items-center justify-center">
                  <span>View All Savings Plans</span>
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Interactive Yield Calculator Console (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl border border-slate-200/90 relative overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0a1e3f]" />

              <div className="space-y-1 relative z-10 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#0284c7] flex items-center gap-1.5">
                    <Calculator className="h-4 w-4" />
                    Interactive Yield Calculator
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    12.5% p.a.
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0a1e3f]">
                  Calculate your return
                </h3>
              </div>

              {/* Interactive Sliders */}
              <div className="space-y-4 relative z-10">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Monthly Contribution:</span>
                    <span className="font-mono font-bold text-sm text-[#0284c7] bg-[#f0f9ff] px-3 py-1 rounded-lg border border-[#bae6fd]">
                      ₦{monthlyAmount.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[monthlyAmount]}
                    min={10000}
                    max={500000}
                    step={5000}
                    onValueChange={(vals) => setMonthlyAmount(vals[0])}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <span className="block text-xs text-slate-600 font-medium">Savings Duration:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 12, 24].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMonths(m)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                          months === m
                            ? "bg-[#0a1e3f] text-white border-[#0a1e3f] shadow-sm"
                            : "bg-[#f8fbff] text-slate-700 border-slate-200 hover:bg-white"
                        }`}
                      >
                        {m} Months
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Console */}
              <div className="space-y-2.5 bg-[#f8fbff] rounded-2xl p-4 border border-slate-200/80 relative z-10 text-xs shadow-2xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Total Capital Saved:</span>
                  <span className="font-bold text-[#0a1e3f] font-mono text-sm">₦{principal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-700 font-semibold">Estimated Interest Yield:</span>
                  <span className="font-bold text-emerald-700 font-mono text-sm">+₦{estimatedInterest.toLocaleString()}</span>
                </div>
                <div className="pt-2.5 border-t border-slate-200/80 flex justify-between items-center">
                  <span className="text-[#0a1e3f] font-bold text-xs">Maturity Payout:</span>
                  <span className="text-lg sm:text-xl font-bold text-[#0284c7] font-mono">
                    ₦{estimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 relative z-10">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Approved rates under CBN microfinance guidelines.</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Download App Dialog Popup */}
      <DownloadAppDialog open={showAppDialog} onOpenChange={setShowAppDialog} />
    </section>
  );
}



