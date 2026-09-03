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
    <div className="w-full h-full flex flex-col bg-white rounded-cards border border-[#e7dcdb] p-8 lg:p-10 shadow-lift">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#fdedea] text-[#f73b20] flex items-center justify-center">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-medium text-[#360802]">Credit Payment Estimator</h3>
          <p className="text-[11px] text-[#ababab]">Estimate monthly principal and interest commitments</p>
        </div>
      </div>

      <div className="space-y-8 flex-1 flex flex-col justify-between">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-xs font-semibold text-[#360802]">
              Loan Amount (₦)
            </Label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#360802]">₦</span>
              <Input 
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pl-8 h-11 text-sm font-semibold bg-[#fdedea]/40 border-[#e7dcdb] rounded-inputs text-[#360802] focus:border-[#f73b20]"
              />
            </div>
            <input 
              type="range"
              min="50000"
              max="10000000"
              step="50000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-[#e7dcdb] rounded-lg appearance-none cursor-pointer accent-[#f73b20]"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="months" className="text-xs font-semibold text-[#360802]">
              Tenor (Months)
            </Label>
            <div className="relative">
              <Input 
                id="months"
                type="number"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="h-11 text-sm font-semibold bg-[#fdedea]/40 border-[#e7dcdb] rounded-inputs text-[#360802] focus:border-[#f73b20]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#ababab]">Months</span>
            </div>
            <input 
              type="range"
              min="3"
              max="24"
              step="1"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-1.5 bg-[#e7dcdb] rounded-lg appearance-none cursor-pointer accent-[#f73b20]"
            />
          </div>
        </div>

        {/* Repayment Breakdown Display */}
        <div className="bg-[#360802] text-white rounded-2xl p-8 flex flex-col justify-between shadow-soft space-y-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
              Estimated Monthly Repayment
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-white/50">₦</span>
              <span className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-white">
                {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-white/40 block mb-1">Total Repayment</span>
              <span className="font-heading text-base font-semibold text-white">
                ₦{(monthlyPayment * months).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-white/40 block mb-1">Total Interest Cost</span>
              <span className="font-heading text-base font-semibold text-[#34c771]">
                +₦{((monthlyPayment * months) - amount).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="pill" size="default" className="w-full shadow-brand" asChild>
              <Link to="/contact">
                Apply for Facility
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#ababab]">
          <ShieldCheck className="h-4 w-4 text-[#34c771] shrink-0" />
          <span>Calculations assume standard 2.5% monthly commercial interest rate.</span>
        </div>
      </div>
    </div>
  );
}
