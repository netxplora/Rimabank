import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PiggyBank, Info } from "lucide-react";

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [duration, setDuration] = useState(12); // months
  const [interestRate] = useState(10); // 10% annual
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

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

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl border border-[#e7dcdb] p-6 sm:p-8 lg:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#bcffbb] text-[#34c771] flex items-center justify-center shadow-xs">
          <PiggyBank className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#360802]">Savings Yield Projection</h3>
          <p className="text-[11px] text-[#ababab]">Forecast compounding returns on target and fixed deposits</p>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <Label className="text-xs font-semibold text-[#360802]">Initial Deposit</Label>
            </div>
            <Input 
              type="number" 
              value={initialDeposit} 
              onChange={(e) => setInitialDeposit(Number(e.target.value))}
              className="bg-[#fdedea]/40 border-[#e7dcdb] h-10 text-xs font-semibold rounded-xl text-[#360802] focus:border-[#34c771]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <Label className="text-xs font-semibold text-[#360802]">Monthly (₦)</Label>
              <span className="font-bold text-[#34c771]">₦{monthlyContribution.toLocaleString()}</span>
            </div>
            <Slider 
              value={[monthlyContribution]} 
              max={100000} 
              step={1000} 
              onValueChange={(val) => setMonthlyContribution(val[0])}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <Label className="text-xs font-semibold text-[#360802]">Tenor</Label>
              <span className="font-bold text-[#360802]">{duration} Mos</span>
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

        {/* Total Estimated Balance Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#fdedea] to-white border border-[#e7dcdb] space-y-4 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#360802]/70 block mb-1">
              Total Projected Balance
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl text-[#360802]/50 font-bold">₦</span>
              <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#360802]">
                {totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e7dcdb] text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#ababab] block mb-0.5">Interest Earned</span>
              <span className="font-heading text-sm sm:text-base font-bold text-[#34c771]">
                +₦{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#ababab] block mb-0.5">Annual Yield</span>
              <span className="font-heading text-sm sm:text-base font-bold text-[#360802]">
                {interestRate}% Fixed
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#ababab]">
          <Info className="h-4 w-4 text-[#34c771] shrink-0" />
          <span>Compound calculations are indicative and subject to product tier conditions.</span>
        </div>
      </div>
    </div>
  );
}
