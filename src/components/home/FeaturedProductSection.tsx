import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Wallet,
  Clock,
  ChevronRight,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedProductSection() {
  const [savingsAmount, setSavingsAmount] = useState<number>(500000);
  const [tenureMonths, setTenureMonths] = useState<number>(12);

  // Interest rate calculation (12.5% per annum)
  const annualRate = 0.125;
  const estimatedReturn = Math.round((savingsAmount * (annualRate * (tenureMonths / 12))));
  const totalMaturity = savingsAmount + estimatedReturn;

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f7ff] text-[#0284c7] text-xs font-semibold uppercase tracking-wider">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Flagship Deposit Solution</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              Target Yield Savings Account
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Accelerate personal reserves or commercial retained earnings with structured returns up to 12.5% per annum, credited monthly.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/personal-banking#savings"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0284c7] hover:text-[#0369a1] transition-colors"
            >
              <span>Compare All Savings Accounts</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Showcase Banner Container (Lightweight Soft Brand Ice-Blue Wash) */}
        <div className="rounded-3xl bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe]/50 to-[#f0f9ff] text-[#0a1e3f] overflow-hidden border border-[#bae6fd] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">

                {/* Rates Callout Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-baseline gap-1 bg-[#0284c7] text-white px-3.5 py-1.5 rounded-xl font-heading font-bold text-lg sm:text-xl shadow-xs">
                    <span>Up to 12.5%</span>
                    <span className="text-xs font-medium text-blue-100 uppercase ml-1">p.a.</span>
                  </div>
                  <span className="text-xs text-[#0a1e3f]/85 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Monthly Automated Interest Credits
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a1e3f] leading-snug">
                    Predictable wealth growth with zero maintenance deductions.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                    Whether setting aside funds for commercial inventory, tax provisions, or corporate expansion, Target Yield gives you guaranteed returns with capital preservation backed by statutory NDIC insurance.
                  </p>
                </div>

                {/* Feature Bullet Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-700 pt-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-white border border-[#bae6fd] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7]" />
                    </div>
                    <span>Zero account maintenance or monthly ledger fees</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-white border border-[#bae6fd] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7]" />
                    </div>
                    <span>Flexible investment tenures from 3 to 24 months</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-white border border-[#bae6fd] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7]" />
                    </div>
                    <span>Direct collateral eligibility for commercial credit lines</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-white border border-[#bae6fd] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7]" />
                    </div>
                    <span>Dedicated relationship officer support for business accounts</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons & Security Assurance */}
              <div className="pt-6 border-t border-[#bae6fd]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs px-6 h-11 shadow-brand"
                  >
                    <Link to="/contact">
                      <span>Open Target Yield Account</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="default"
                    asChild
                    className="bg-white border-[#cbd5e1] hover:bg-slate-50 text-[#0a1e3f] font-semibold text-xs px-5 h-11"
                  >
                    <Link to="/personal-banking#savings">
                      View Account Terms
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>NDIC Insured &bull; CBN Regulated</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Yield Calculator Column (5 cols) */}
            <div className="lg:col-span-5 bg-white/80 p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-[#bae6fd]/80 flex flex-col justify-center">
              <div className="space-y-6">

                <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                    <Calculator className="h-4 w-4" />
                    <span>Instant Yield Estimate</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">12.5% p.a. Indicative</span>
                </div>

                {/* Amount Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Principal Deposit Amount</span>
                    <span className="font-heading font-bold text-[#0a1e3f] text-sm sm:text-base">
                      {formatNaira(savingsAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={10000000}
                    step={50000}
                    value={savingsAmount}
                    onChange={(e) => setSavingsAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0284c7]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>₦50,000</span>
                    <span>₦10,000,000+</span>
                  </div>
                </div>

                {/* Tenure Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Investment Horizon</span>
                    <span className="font-heading font-bold text-[#0a1e3f] text-sm">
                      {tenureMonths} Months
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 12, 24].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTenureMonths(m)}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                          tenureMonths === m
                            ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {m}M
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Result Card */}
                <div className="p-4 rounded-2xl bg-[#f0f7ff] border border-[#bae6fd] space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-600">
                    <span>Estimated Interest Return:</span>
                    <span className="font-heading font-bold text-emerald-600 text-sm sm:text-base">
                      +{formatNaira(estimatedReturn)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#bae6fd]/70 flex justify-between items-center">
                    <span className="text-xs font-semibold text-[#0a1e3f]">Estimated Total at Maturity:</span>
                    <span className="font-heading font-bold text-[#0284c7] text-base sm:text-lg">
                      {formatNaira(totalMaturity)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="w-full bg-[#0284c7] text-white hover:bg-[#0369a1] text-xs font-bold h-11 shadow-brand"
                >
                  <Link to="/contact">
                    <span>Lock In This Rate Today</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
