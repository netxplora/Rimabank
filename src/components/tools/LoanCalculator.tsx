import { useState, useEffect } from "react";
import { Calculator, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function LoanCalculator() {
  const [amount, setAmount] = useState<number>(500000);
  const [months, setMonths] = useState<number>(12);
  const [rate] = useState<number>(2.5); // Monthly rate
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  useEffect(() => {
    const r = rate / 100;
    const payment = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    setMonthlyPayment(isNaN(payment) ? 0 : payment);
  }, [amount, months, rate]);

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 lg:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center shadow-xs">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#0a1e3f]">Credit Payment Estimator</h3>
          <p className="text-[11px] text-[#64748b]">Estimate monthly principal and interest commitments</p>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2.5">
            <Label htmlFor="amount" className="text-xs font-semibold text-[#0a1e3f]">
              Loan Amount (₦)
            </Label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#0a1e3f]">₦</span>
              <Input 
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pl-8 h-10 text-xs font-semibold bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-[#0a1e3f] focus:border-[#0284c7]"
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
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="months" className="text-xs font-semibold text-[#0a1e3f]">
              Tenor (Months)
            </Label>
            <div className="relative">
              <Input 
                id="months"
                type="number"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="h-10 text-xs font-semibold bg-[#f0f7ff]/40 border-[#e2e8f0] rounded-xl text-[#0a1e3f] focus:border-[#0284c7]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#64748b]">Months</span>
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
          </div>
        </div>

        {/* Repayment Breakdown Display */}
        <div className="bg-gradient-to-br from-[#0a1e3f] to-[#450b03] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md space-y-5 border border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] block mb-1">
              Estimated Monthly Repayment
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl text-white/50 font-bold">₦</span>
              <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-white/50 block mb-0.5">Total Repayment</span>
              <span className="font-heading text-sm sm:text-base font-bold text-white">
                ₦{(monthlyPayment * months).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-white/50 block mb-0.5">Total Interest Cost</span>
              <span className="font-heading text-sm sm:text-base font-bold text-[#34c771]">
                +₦{((monthlyPayment * months) - amount).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="pill"
              size="default"
              className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
              asChild
            >
              <Link to="/contact">
                Apply for Facility
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
          <ShieldCheck className="h-4 w-4 text-[#34c771] shrink-0" />
          <span>Calculations assume standard 2.5% monthly commercial interest rate.</span>
        </div>
      </div>
    </div>
  );
}
