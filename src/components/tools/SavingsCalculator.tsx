import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PiggyBank, Info, TrendingUp } from "lucide-react";

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(20000);
  const [duration, setDuration] = useState(12); // months
  const [interestRate] = useState(11.5); // 11.5% annual yield
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const initialPresets = [
    { label: "₦20k", value: 20000 },
    { label: "₦50k", value: 50000 },
    { label: "₦100k", value: 100000 },
    { label: "₦500k", value: 500000 },
    { label: "₦1M", value: 1000000 },
  ];

  const tenorPresets = [3, 6, 12, 18, 24];

  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    let total = initialDeposit;
    let interestEarned = 0;

    for (let i = 0; i < duration; i++) {
      const interest = total * monthlyRate;
      interestEarned += interest;
      total += interest + monthlyContribution;
    }

    setTotalSavings(total);
    setTotalInterest(interestEarned);
  }, [initialDeposit, monthlyContribution, duration, interestRate]);

  const totalDeposited = initialDeposit + (monthlyContribution * duration);
  const returnRatePercent = totalDeposited > 0 ? (totalInterest / totalDeposited) * 100 : 0;

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm transition-all">
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#bcffbb] text-[#16a34a] flex items-center justify-center shadow-xs">
            <PiggyBank className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-[#0a1e3f]">Savings Yield Projection</h3>
            <p className="text-[11px] text-[#64748b]">Forecast compounding returns on target and fixed deposits</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#bcffbb]/50 text-[#16a34a] border border-[#16a34a]/30">
          11.5% p.a.
        </span>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Initial Deposit */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-[#0a1e3f]">Initial Deposit</Label>
              <span className="text-sm font-heading font-bold text-[#16a34a]">
                ₦{initialDeposit.toLocaleString()}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#0a1e3f]">₦</span>
              <Input 
                type="number" 
                value={initialDeposit} 
                onChange={(e) => setInitialDeposit(Math.max(1000, Number(e.target.value)))}
                className="pl-8 h-10 text-xs font-semibold bg-[#f8fafc] border-[#e2e8f0] rounded-xl text-[#0a1e3f] focus:border-[#16a34a]"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {initialPresets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setInitialDeposit(p.value)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                    initialDeposit === p.value
                      ? "bg-[#16a34a] text-white shadow-xs font-semibold"
                      : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Contribution & Tenor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label className="text-xs font-semibold text-[#0a1e3f]">Monthly Top-Up</Label>
                <span className="font-bold text-[#16a34a]">₦{monthlyContribution.toLocaleString()}</span>
              </div>
              <Slider 
                value={[monthlyContribution]} 
                max={200000} 
                step={5000} 
                onValueChange={(val) => setMonthlyContribution(val[0])}
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label className="text-xs font-semibold text-[#0a1e3f]">Tenor (Months)</Label>
                <span className="font-bold text-[#0a1e3f]">{duration} Mos</span>
              </div>
              <Slider 
                value={[duration]} 
                max={36} 
                min={3} 
                step={3} 
                onValueChange={(val) => setDuration(val[0])}
                className="py-2"
              />
            </div>
          </div>
        </div>

        {/* 3D Elevated Yield Box */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0a1e3f] via-[#0b2940] to-[#043424] text-white p-5 sm:p-6 shadow-xl border border-white/10 overflow-hidden transform hover:-translate-y-0.5 transition-all">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#16a34a]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4ade80] block mb-1">
                Total Projected Balance
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl text-white/50 font-bold">₦</span>
                <span className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                  {totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold text-white/50 block mb-0.5">Total Deposits</span>
                <span className="font-heading text-sm font-semibold text-white">
                  ₦{totalDeposited.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-white/50 block mb-0.5">Earned Interest</span>
                <span className="font-heading text-sm font-semibold text-[#4ade80]">
                  +₦{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
          <Info className="h-4 w-4 text-[#16a34a] shrink-0" />
          <span>Compound calculations are indicative and subject to product tier conditions.</span>
        </div>
      </div>
    </div>
  );
}
