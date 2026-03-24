import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PiggyBank, TrendingUp, Info } from "lucide-react";

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [duration, setDuration] = useState(12); // months
  const [interestRate, setInterestRate] = useState(10); // 10% annual
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
    <Card className="flex flex-col h-full w-full border-none shadow-2xl bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground p-8">
        <div className="flex items-center gap-3 mb-2">
          <PiggyBank className="h-8 w-8 text-secondary" />
          <CardTitle className="text-2xl font-display">Savings Growth Forecast</CardTitle>
        </div>
        <CardDescription className="text-primary-foreground/70 text-lg">
          See how your money grows over time with Rivers MFB high-yield accounts.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8 flex-1 flex flex-col">
        <div className="space-y-10 flex-1 flex flex-col">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Initial Deposit</Label>
                <span className="font-bold text-primary">₦{initialDeposit.toLocaleString()}</span>
              </div>
              <Input 
                type="number" 
                value={initialDeposit} 
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                className="bg-muted/50 border-none h-12 text-lg font-bold rounded-xl"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Monthly Contribution</Label>
                <span className="font-bold text-primary">₦{monthlyContribution.toLocaleString()}</span>
              </div>
              <Slider 
                value={[monthlyContribution]} 
                max={100000} 
                step={1000} 
                onValueChange={(val) => setMonthlyContribution(val[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-3 sm:col-span-2 lg:col-span-1">
              <div className="flex justify-between">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Duration ({duration}mo)</Label>
                <span className="font-bold text-primary">{duration} Months</span>
              </div>
              <Slider 
                value={[duration]} 
                max={60} 
                min={3} 
                step={3} 
                onValueChange={(val) => setDuration(val[0])}
                className="py-4"
              />
            </div>
          </div>

          <div className="flex-1 bg-primary/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between border border-primary/10 relative overflow-hidden min-h-[300px]">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrendingUp className="h-48 w-48 rotate-12" />
            </div>
            
            <div className="space-y-8 relative z-10 w-full">
              <div className="text-center md:text-left">
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Total Estimated Balance</p>
                <p className="text-4xl sm:text-5xl lg:text-7xl font-display font-black text-primary leading-none">
                  ₦{totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Total Interest</p>
                  <p className="text-2xl sm:text-3xl font-bold text-secondary">
                    +₦{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Annual Rate</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">{interestRate}%</p>
                    <span className="text-[10px] font-bold text-muted-foreground px-1.5 py-0.5 bg-primary/10 rounded-md">Fixed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-start gap-3 text-xs text-muted-foreground bg-white/40 p-5 rounded-2xl border border-white/60">
              <Info className="h-5 w-5 shrink-0 text-primary" />
              <p className="leading-relaxed">This projection uses annual compounding. Actual returns may vary slightly based on specific account terms.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
