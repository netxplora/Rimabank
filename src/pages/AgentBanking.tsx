import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Store, Users, DollarSign, Smartphone, CheckCircle2, ArrowRight, ShieldCheck, Calculator, Wifi, BatteryMedium, CreditCard, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

export default function AgentBanking() {
  const [dailyVolume, setDailyVolume] = useState<number>(500000);
  const [dailyTransactions, setDailyTransactions] = useState<number>(45);

  // Approximate agent commission model: ~0.5% average blend on withdrawals/bills/transfers
  const estimatedDailyEarnings = Math.round((dailyVolume * 0.005) + (dailyTransactions * 15));
  const estimatedMonthlyEarnings = estimatedDailyEarnings * 26; // 26 operating days

  const agentBenefits = [
    {
      title: "Direct Commission Revenue",
      description: "Earn consistent transaction fee commissions on every cash deposit, withdrawal, and utility bill processed.",
      icon: DollarSign,
      bg: "#bcffbb",
      color: "#16a34a"
    },
    {
      title: "Increased Store Footfall",
      description: "Attract more neighborhood customers to your retail premises as an authorized financial service center.",
      icon: Store,
      bg: "#f0f7ff",
      color: "#0284c7"
    },
    {
      title: "Community Service Hub",
      description: "Provide vital cash and payment access in residential clusters distant from commercial bank branches.",
      icon: Users,
      bg: "#e2e8f0",
      color: "#477ee9"
    },
    {
      title: "Certified POS Infrastructure",
      description: "Receive a robust, NIBSS-connected POS device with high transaction reliability and prompt technical support.",
      icon: Smartphone,
      bg: "#f5ffbb",
      color: "#0a1e3f"
    },
  ];

  return (
    <Layout>
      {/* Editorial Hero with 3D POS Device Showcase */}
      <section className="relative bg-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-[#bcffbb]/20 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                <span>Authorized Agency Banking Network</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
                Become an authorized <span className="text-[#0284c7]">Rima MFB Agent</span>.
              </h1>

              <p className="text-[#0a1e3f]/80 text-sm sm:text-base leading-relaxed">
                Partner with a licensed microfinance bank to deliver cash deposits, withdrawals, and bill settlements within your local community while earning steady monthly commission income.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                >
                  <Link to="/contact">
                    Apply for POS Terminal
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button variant="outlineNeutral" size="default" asChild className="rounded-full">
                  <Link to="/branches">
                    Locate Agency Support Desk
                  </Link>
                </Button>
              </div>

              {/* Agent Benefits Stats */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#e2e8f0]">
                <div>
                  <span className="font-heading text-lg sm:text-xl font-bold text-[#0a1e3f]">200+</span>
                  <span className="block text-[11px] text-[#64748b]">Active Agent Hubs</span>
                </div>
                <div>
                  <span className="font-heading text-lg sm:text-xl font-bold text-[#16a34a]">Instant</span>
                  <span className="block text-[11px] text-[#64748b]">Wallet Settlement</span>
                </div>
                <div>
                  <span className="font-heading text-lg sm:text-xl font-bold text-[#0284c7]">48 Hours</span>
                  <span className="block text-[11px] text-[#64748b]">Terminal Deployment</span>
                </div>
              </div>
            </div>

            {/* Right 3D Interactive Smart POS Mockup (5 cols) */}
            <div className="lg:col-span-5 perspective-1000 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="relative mx-auto max-w-[320px] rounded-[36px] bg-[#0a1e3f] p-5 shadow-2xl border-4 border-[#1e293b] transform hover:-rotate-1 transition-transform duration-500">
                {/* POS Receipt Paper Slot */}
                <div className="w-28 h-2 bg-[#1e293b] rounded-full mx-auto mb-4" />
                
                {/* POS Screen */}
                <div className="rounded-[24px] bg-gradient-to-b from-[#0f2a50] to-[#081730] p-4 text-white space-y-4 border border-white/10">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[10px] text-white/70 pb-2 border-b border-white/10">
                    <span className="font-bold text-[#38bdf8]">RIMA POS #8042</span>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="h-3 w-3 text-[#4ade80]" />
                      <BatteryMedium className="h-3.5 w-3.5 text-white/80" />
                    </div>
                  </div>

                  {/* Ready for Transaction */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                    <span className="text-[10px] text-white/60 uppercase tracking-wider block">Terminal Ready</span>
                    <div className="font-heading text-xl font-bold text-[#4ade80]">
                      Insert or Tap Card
                    </div>
                    <span className="text-[10px] text-white/50 block">Supports Verve • Mastercard • Visa</span>
                  </div>

                  {/* Service Shortcut Chips */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/10 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-[#38bdf8]" />
                      <span className="font-medium text-[11px]">Withdrawal</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-[#facc15]" />
                      <span className="font-medium text-[11px]">Bill Payment</span>
                    </div>
                  </div>

                  {/* Today's Commission Summary */}
                  <div className="p-3 rounded-xl bg-[#0284c7]/20 border border-[#0284c7]/40 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-blue-200">Today's Commission:</span>
                    <span className="font-heading font-bold text-[#38bdf8]">₦8,450.00</span>
                  </div>
                </div>

                {/* EMV Chip Card Inset Mockup */}
                <div className="mt-3 p-2 rounded-xl bg-[#1e293b] flex items-center justify-center gap-2 text-[10px] text-white/60">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                  <span>Contactless NFC & EMV Enabled</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Partner Advantages Grid */}
      <section className="py-10 sm:py-12 md:py-16 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Partner Advantages
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
              Commercial benefits of partnering with Rima MFB.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agentBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-[#e2e8f0] hover:border-[#0284c7]/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-xs"
                    style={{ backgroundColor: benefit.bg, color: benefit.color }}
                  >
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-[#0a1e3f] mb-1.5">{benefit.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Agent Commission Estimator */}
      <section className="py-10 sm:py-12 md:py-16 bg-[#f8fafc] border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Revenue Potential
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
              Estimate your monthly agency commissions.
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] mt-1">
              Adjust your anticipated daily transaction volume to calculate your estimated revenue stream.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Sliders Box (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e8f0] shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Daily Volume Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0a1e3f]">Expected Daily Cash Turnover</span>
                    <span className="font-heading text-sm font-bold text-[#0284c7]">₦{dailyVolume.toLocaleString()}</span>
                  </div>
                  <Slider 
                    value={[dailyVolume]} 
                    min={100000} 
                    max={3000000} 
                    step={50000} 
                    onValueChange={(val) => setDailyVolume(val[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-[10px] text-[#64748b]">
                    <span>₦100,000 / day</span>
                    <span>₦3,000,000 / day</span>
                  </div>
                </div>

                {/* Daily Transaction Count */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0a1e3f]">Daily Transaction Volume</span>
                    <span className="font-heading text-sm font-bold text-[#0a1e3f]">{dailyTransactions} transactions</span>
                  </div>
                  <Slider 
                    value={[dailyTransactions]} 
                    min={10} 
                    max={200} 
                    step={5} 
                    onValueChange={(val) => setDailyTransactions(val[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-[10px] text-[#64748b]">
                    <span>10 / day</span>
                    <span>200 / day</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#64748b] pt-4 border-t border-[#e2e8f0]">
                <ShieldCheck className="h-4 w-4 text-[#16a34a] shrink-0" />
                <span>Commission estimates reflect standard combined POS cashout, transfer, and bill fees.</span>
              </div>
            </div>

            {/* 3D Result Box (5 cols) */}
            <div className="lg:col-span-5 relative rounded-3xl bg-gradient-to-br from-[#0a1e3f] via-[#0f2a50] to-[#081730] text-white p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#16a34a]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-5">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4ade80] block mb-1">
                    Estimated Monthly Earnings
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl text-white/50 font-bold">₦</span>
                    <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                      {estimatedMonthlyEarnings.toLocaleString()}
                    </span>
                    <span className="text-xs text-white/60">/month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-white/50 block mb-0.5">Daily Commission</span>
                    <span className="font-heading text-sm font-semibold text-[#38bdf8]">
                      ₦{estimatedDailyEarnings.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-white/50 block mb-0.5">Annual Projected</span>
                    <span className="font-heading text-sm font-semibold text-[#4ade80]">
                      ₦{(estimatedMonthlyEarnings * 12).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                  >
                    <Link to="/contact">
                      Register as an Agent
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Menu & Eligibility Criteria */}
      <section className="py-10 sm:py-12 md:py-16 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Services Menu (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block">
                Transaction Menu
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
                Services you will offer to your customers.
              </h2>
              <p className="text-[#0a1e3f]/80 text-xs sm:text-sm leading-relaxed">
                As a certified agent, you will be equipped with a high-speed terminal configured for immediate settlement across all major payment types.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  "Cash deposits into any Nigerian bank account",
                  "Instant cash withdrawals via Debit Card PIN",
                  "Inter-bank fund transfers with printed confirmation",
                  "PHED electricity bill settlement & meter tokens",
                  "Airtime, data, and Cable TV recharge",
                  "Customer balance inquiries & mini-statements"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                    <CheckCircle2 className="h-4 w-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#0a1e3f] leading-snug">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Eligibility 3D Card (5 cols) */}
            <div className="lg:col-span-5 perspective-1000">
              <div className="rounded-3xl bg-[#f8fafc] border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#e2e8f0]">
                  <div className="w-10 h-10 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#0a1e3f]">
                      Agent Eligibility Criteria
                    </h3>
                    <p className="text-[10px] text-[#64748b]">Basic requirements to get deployed</p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-[#0a1e3f]/85">
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#e2e8f0]">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0 mt-1" />
                    <span>Existing physical commercial premise, shop, or retail outlet.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#e2e8f0]">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0 mt-1" />
                    <span>Valid National Identification Number (NIN) or Voter's Card.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#e2e8f0]">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0 mt-1" />
                    <span>Recent utility bill (Electricity or Water) of the business location.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#e2e8f0]">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0 mt-1" />
                    <span>Minimum working float capital for daily cash operations.</span>
                  </li>
                </ul>

                <div className="pt-2 text-center">
                  <span className="text-[10px] font-semibold text-[#0284c7] uppercase tracking-wider">
                    Fast 48-Hour Onboarding Review
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
