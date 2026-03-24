import { useState, useEffect } from "react";
import { Calculator, Landmark, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoanCalculator() {
  const [amount, setAmount] = useState<number>(500000);
  const [months, setMonths] = useState<number>(12);
  const [rate, setRate] = useState<number>(2.5); // Monthly rate
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  useEffect(() => {
    const r = rate / 100;
    const payment = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    setMonthlyPayment(isNaN(payment) ? 0 : payment);
  }, [amount, months, rate]);

  return (
    <div className="w-full h-full flex flex-col bg-card rounded-3xl border border-border p-8 lg:p-12 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
          <Calculator className="h-5 w-5 text-secondary" />
        </div>
        <h3 className="font-display text-2xl font-bold">Fast Loan Estimator</h3>
      </div>

      <div className="space-y-10 flex-1 flex flex-col">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label htmlFor="amount" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Loan Amount (₦)</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground font-bold">₦</span>
              <Input 
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pl-10 h-14 text-lg font-bold bg-muted/30 border-none rounded-xl"
              />
            </div>
            <input 
              type="range"
              min="50000"
              max="5000000"
              step="50000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="months" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Repayment Period (Months)</Label>
            <div className="relative">
              <Input 
                id="months"
                type="number"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="h-14 text-lg font-bold bg-muted/30 border-none rounded-xl"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">Months</span>
            </div>
            <input 
              type="range"
              min="3"
              max="24"
              step="1"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
          <p className="text-sm text-muted-foreground font-medium">
            Estimate based on <span className="text-primary font-bold">2.5% monthly interest</span>. Fixed rates apply.
          </p>
        </div>

        <div className="flex-1 bg-primary text-primary-foreground rounded-[2.5rem] p-8 md:p-12 flex flex-col items-stretch text-left relative overflow-hidden shadow-2xl border border-white/10 min-h-[400px]">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Landmark className="h-64 w-64 rotate-12" />
          </div>
          
          <div className="relative z-10 w-full flex flex-col justify-between h-full space-y-12">
            <div>
              <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.3em] text-secondary/90 mb-8 block">
                Estimated Monthly Payment
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-light text-white/50">₦</span>
                <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black tracking-tighter leading-none text-white">
                  {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="h-2 w-24 bg-secondary mt-10 rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 gap-10 w-full pt-10 border-t border-white/10 text-white/90">
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Total Repayment</div>
                <div className="text-3xl font-bold flex items-baseline gap-2">
                  <span className="text-xl font-medium opacity-30">₦</span>
                  <span>{(monthlyPayment * months).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Total Interest Cost</div>
                <div className="text-3xl font-bold text-secondary flex items-baseline gap-2">
                  <span className="text-2xl mr-1 text-secondary/60">+</span>
                  <span className="text-xl font-medium opacity-60">₦</span>
                  <span>{((monthlyPayment * months) - amount).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Button 
                variant="secondary" 
                size="xl" 
                className="w-full font-bold h-16 rounded-2xl bg-white text-primary hover:bg-secondary hover:text-white transition-all shadow-xl group active:scale-95 text-lg" 
                asChild
              >
                <a href="/contact?reason=loan" className="flex items-center justify-center gap-3">
                  Apply for this Loan
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
