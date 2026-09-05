import { useState, useEffect } from "react";
import { Calculator, ShieldCheck, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function LoanCalculator() {
  const [amount, setAmount] = useState<number>(500000);
  const [months, setMonths] = useState<number>(12);
  const [rate] = useState<number>(2.5); // Monthly rate
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  const presets = [
    { label: "₦100k", value: 100000 },
    { label: "₦500k", value: 500000 },
    { label: "₦1M", value: 1000000 },
    { label: "₦3M", value: 3000000 },
    { label: "₦5M", value: 5000000 },
    { label: "₦10M", value: 10000000 },
  ];

  const tenorPresets = [3, 6, 12, 18, 24];

  useEffect(() => {
    const r = rate / 100;
    const payment = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    setMonthlyPayment(isNaN(payment) ? 0 : payment);
  }, [amount, months, rate]);

  const totalRepayment = monthlyPayment * months;
  const totalInterest = Math.max(0, totalRepayment - amount);
  const principalPercent = totalRepayment > 0 ? (amount / totalRepayment) * 100 : 80;
  const interestPercent = 100 - principalPercent;

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm transition-all">
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center shadow-xs">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-[#0a1e3f]">Credit Payment Estimator</h3>
            <p className="text-[11px] text-[#64748b]">Estimate monthly principal and interest commitments</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#f0f7ff] text-[#0284c7] border border-[#e2e8f0]">
          2.5% Monthly
        </span>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Amount Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="amount" className="text-xs font-semibold text-[#0a1e3f]">
                Required Loan Amount
              </Label>
              <span className="text-sm font-heading font-bold text-[#0284c7]">
                ₦{amount.toLocaleString()}
              </span>
            </div>
            
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#0a1e3f]">₦</span>
              <Input 
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(10000, Number(e.target.value)))}
                className="pl-8 h-10 text-xs font-semibold bg-[#f8fafc] border-[#e2e8f0] rounded-xl text-[#0a1e3f] focus:border-[#0284c7]"
              />
            </div>

            <input 
              type="range"
              min="50000"
              max="10000000"
              step="50000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#0284c7]"
            />

            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setAmount(p.value)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                    amount === p.value
                      ? "bg-[#0284c7] text-white shadow-xs font-semibold"
                      : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tenor Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="months" className="text-xs font-semibold text-[#0a1e3f]">
                Repayment Period
              </Label>
              <span className="text-sm font-heading font-bold text-[#0a1e3f]">
                {months} Months
              </span>
            </div>

            <input 
              type="range"
              min="3"
              max="24"
              step="1"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#0284c7]"
            />

            {/* Quick tenor chips */}
            <div className="flex flex-wrap gap-1.5">
              {tenorPresets.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMonths(t)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                    months === t
                      ? "bg-[#0a1e3f] text-white shadow-xs font-semibold"
                      : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                  }`}
                >
                  {t} Mos
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Elevated Repayment Display */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0a1e3f] via-[#0f2a50] to-[#081730] text-white p-5 sm:p-6 shadow-xl border border-white/10 overflow-hidden transform hover:-translate-y-0.5 transition-all">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#0284c7]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#38bdf8] block mb-1">
                Estimated Monthly Repayment
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl text-white/50 font-bold">₦</span>
                <span className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                  {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
                <span className="text-xs text-white/60">/month</span>
              </div>
            </div>

            {/* Principal vs Interest Distribution Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[10px] text-white/70">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                  Principal ({principalPercent.toFixed(0)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#34c771]" />
                  Interest ({interestPercent.toFixed(0)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex">
                <div 
                  className="h-full bg-[#38bdf8] transition-all duration-300" 
                  style={{ width: `${principalPercent}%` }} 
                />
                <div 
                  className="h-full bg-[#34c771] transition-all duration-300" 
                  style={{ width: `${interestPercent}%` }} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold text-white/50 block mb-0.5">Total Repayment</span>
                <span className="font-heading text-sm font-semibold text-white">
                  ₦{totalRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-white/50 block mb-0.5">Total Interest Cost</span>
                <span className="font-heading text-sm font-semibold text-[#34c771]">
                  +₦{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="pill"
                size="default"
                className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                asChild
              >
                <Link to="/contact">
                  Apply for Facility
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
          <ShieldCheck className="h-4 w-4 text-[#34c771] shrink-0" />
          <span>Transparent calculation. No hidden account opening or appraisal surcharges.</span>
        </div>
      </div>
    </div>
  );
}
