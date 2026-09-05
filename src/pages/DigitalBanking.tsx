import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Zap,
  WalletCards,
  ReceiptText,
  HandCoins,
  ArrowRight,
  ShieldCheck,
  SmartphoneNfc,
  Apple,
  Smartphone,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PlayStoreIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.18.18-.313.407-.384.656L14.94 12.35 15.908 11.382l4.475-2.557c.75-.429.75-1.221 0-1.65L15.908 4.618l-.968-.968L3.226 1.158c.071.25.204.477.383.656z" />
  </svg>
);

const features = [
  {
    icon: WalletCards,
    title: "Instant Inter-Bank Transfers",
    description: "Execute real-time electronic fund transfers to any licensed commercial bank or microfinance institution in Nigeria.",
    bg: "#e2e8f0",
    color: "#477ee9"
  },
  {
    icon: ReceiptText,
    title: "Utility & Bill Settlements",
    description: "Pay recurring electricity bills (PHED), purchase internet data top-ups, and settle cable TV subscriptions with instant receipt generation.",
    bg: "#bcffbb",
    color: "#16a34a"
  },
  {
    icon: HandCoins,
    title: "Mobile Micro-Credit",
    description: "Apply for and receive approved short-term personal credit directly into your Rima MFB account based on your transaction history.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: SmartphoneNfc,
    title: "Instant Debit Card Controls",
    description: "Block, unblock, or set transaction spending limits on your linked debit card directly from within the mobile app.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: ShieldCheck,
    title: "Biometric Sign-In Security",
    description: "Sign in with Touch ID or Face ID for fast, biometric authentication with 256-bit encryption protecting all sessions.",
    bg: "#f5ffbb",
    color: "#0a1e3f"
  },
  {
    icon: Zap,
    title: "Electronic Bank Statements",
    description: "Generate and export official stamped PDF bank statements directly to your email for official documentation purposes.",
    bg: "#e2e8f0",
    color: "#477ee9"
  }
];

export default function DigitalBanking() {
  const [activeTab, setActiveTab] = useState<"app" | "ussd" | "web">("app");

  return (
    <Layout>
      {/* Editorial Hero with 3D Interactive Device Showcase */}
      <section className="relative bg-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-[#bcffbb]/20 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                <span>24/7 Digital Banking Platform</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
                Banking operations directly from your <span className="text-[#0284c7]">mobile device</span>.
              </h1>

              <p className="text-[#0a1e3f]/80 text-sm sm:text-base leading-relaxed">
                Instant inter-bank transfers, automated utility settlements, debit card controls, and mobile account management accessible 24 hours a day on iOS, Android, and USSD.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                >
                  <a href="#download">
                    Download Mobile App
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </a>
                </Button>
                <Button variant="outlineNeutral" size="default" asChild className="rounded-full">
                  <a href="#ussd-section">
                    Explore USSD (*723#)
                  </a>
                </Button>
              </div>

              {/* Regulatory Trust Metrics */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#e2e8f0]">
                <div>
                  <span className="font-heading text-lg sm:text-xl font-bold text-[#0a1e3f]">99.9%</span>
                  <span className="block text-[11px] text-[#64748b]">NIBSS Uptime</span>
                </div>
                <div>
                  <span className="font-heading text-lg sm:text-xl font-bold text-[#16a34a]">&lt; 3 Sec</span>
                  <span className="block text-[11px] text-[#64748b]">Transfer Speed</span>
                </div>
                <div>
                  <span className="font-heading text-lg sm:text-xl font-bold text-[#0284c7]">256-Bit</span>
                  <span className="block text-[11px] text-[#64748b]">TLS Encryption</span>
                </div>
              </div>
            </div>

            {/* Right 3D Interactive App Mockup (5 cols) */}
            <div className="lg:col-span-5 perspective-1000 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="relative mx-auto max-w-[340px] rounded-[36px] bg-[#0a1e3f] p-4 shadow-2xl border-4 border-[#1e293b] transform hover:rotate-1 transition-transform duration-500">
                {/* Phone Speaker Notch */}
                <div className="w-24 h-4 bg-[#1e293b] rounded-full mx-auto mb-3" />
                
                {/* Simulated App Screen */}
                <div className="rounded-[28px] bg-gradient-to-b from-[#0f2a50] to-[#081730] p-4 text-white space-y-4 border border-white/10">
                  {/* Account Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] text-white/60 uppercase tracking-wider block">Rima Premium Account</span>
                      <span className="text-xs font-bold text-white">0123 •••• 890</span>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
                  </div>

                  {/* Balance Display */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] text-white/60">Available Balance</span>
                    <div className="font-heading text-2xl font-bold text-white tracking-tight">
                      ₦2,450,800.00
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#4ade80]">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>+₦350,000 received today</span>
                    </div>
                  </div>

                  {/* Quick Action Grid */}
                  <div className="grid grid-cols-4 gap-2 text-center text-[9px]">
                    <div className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer space-y-1">
                      <ArrowUpRight className="h-4 w-4 mx-auto text-[#38bdf8]" />
                      <span>Send</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer space-y-1">
                      <ArrowDownLeft className="h-4 w-4 mx-auto text-[#4ade80]" />
                      <span>Receive</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer space-y-1">
                      <ReceiptText className="h-4 w-4 mx-auto text-[#facc15]" />
                      <span>Bills</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer space-y-1">
                      <Lock className="h-4 w-4 mx-auto text-[#f43f5e]" />
                      <span>Cards</span>
                    </div>
                  </div>

                  {/* Recent Activity Live Card */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] text-white/60 font-semibold block">Recent Transactions</span>
                    
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center font-bold text-[10px]">
                          PH
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-white">PHED Token</div>
                          <div className="text-[9px] text-white/50">Electricity Bill</div>
                        </div>
                      </div>
                      <span className="font-semibold text-white/90 text-[11px]">-₦15,000</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#4ade80]/20 text-[#4ade80] flex items-center justify-center font-bold text-[10px]">
                          TX
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-white">Salary Credit</div>
                          <div className="text-[9px] text-white/50">Direct Deposit</div>
                        </div>
                      </div>
                      <span className="font-semibold text-[#4ade80] text-[11px]">+₦350,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3-Column Core Capabilities Grid */}
      <section className="py-10 sm:py-12 md:py-16 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Core Capabilities
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
              Everything you need to manage your money.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-3xl bg-white border border-[#e2e8f0] hover:border-[#0284c7]/40 shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-xs"
                    style={{ backgroundColor: feature.bg, color: feature.color }}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-[#0a1e3f] mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Onboarding Progression */}
      <section className="py-10 sm:py-12 md:py-16 bg-[#f8fafc] border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Simple Setup
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
              Get started in three straightforward steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0284c7] text-white font-heading font-bold text-base flex items-center justify-center">
                01
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f]">Download the Mobile App</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Download the Rima MFB Mobile Banking application from Google Play or Apple App Store.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0284c7] text-white font-heading font-bold text-base flex items-center justify-center">
                02
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f]">Verify Credentials</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Enter your registered BVN and National Identification Number (NIN) to verify your account in minutes.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#16a34a] text-white font-heading font-bold text-base flex items-center justify-center">
                03
              </div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f]">Begin Banking</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Set your secure transaction PIN, fund your balance, and begin executing instant transfers immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated USSD Banking Section (*723#) */}
      <section id="ussd-section" className="py-10 sm:py-12 md:py-16 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a1e3f] via-[#0f2d59] to-[#0369a1] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-white/10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Details (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-semibold uppercase tracking-wider">
                  <span>Offline USSD Banking</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.1]">
                  Bank anywhere without internet. Dial <span className="text-[#38bdf8] font-mono">*723#</span>.
                </h2>

                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Enjoy reliable offline banking from any basic feature phone or smartphone on all Nigerian cellular networks (MTN, Airtel, Glo, 9mobile).
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="block text-[10px] text-blue-200 uppercase font-bold">Check Balance</span>
                    <span className="font-mono text-xs text-white font-bold">*723*0#</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="block text-[10px] text-blue-200 uppercase font-bold">Transfer Money</span>
                    <span className="font-mono text-xs text-white font-bold">*723*1#</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="block text-[10px] text-blue-200 uppercase font-bold">Airtime Top-Up</span>
                    <span className="font-mono text-xs text-white font-bold">*723*2#</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="block text-[10px] text-blue-200 uppercase font-bold">Pay Bills</span>
                    <span className="font-mono text-xs text-white font-bold">*723*3#</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="bg-[#38bdf8] hover:bg-[#0284c7] text-[#0a1e3f] hover:text-white font-heading text-xs font-bold transition-all shadow-md"
                  >
                    <a href="tel:*723%23">
                      Dial *723# on Mobile
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Steps (5 cols) */}
              <div className="lg:col-span-5 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/15 space-y-4">
                <h3 className="font-heading text-base font-bold text-white border-b border-white/15 pb-2">
                  How to Register for USSD:
                </h3>
                <ul className="space-y-3 text-xs text-blue-100/90">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#38bdf8] text-[#0a1e3f] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Dial <strong>*723#</strong> from your mobile phone number registered with Rima MFB.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#38bdf8] text-[#0a1e3f] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>Enter your 10-digit Rima MFB Account Number or BVN.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#38bdf8] text-[#0a1e3f] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>Create your 4-digit secret Transaction PIN to authorize future operations.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* App Download Banner */}
      <section id="download" className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-[#0a1e3f] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden border border-white/10">
            <div className="max-w-2xl space-y-4 relative z-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8] block">
                Mobile Banking App
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.1]">
                Download Rima MFB Mobile for iOS and Android.
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Access your accounts, track spending, and send payments securely from your mobile device.
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                >
                  <a href="#playstore" className="flex items-center gap-2">
                    <PlayStoreIcon />
                    <span>Google Play</span>
                  </a>
                </Button>
                <Button variant="whiteGhost" size="default" asChild className="rounded-full border border-white/30 hover:bg-white/15">
                  <a href="#appstore" className="flex items-center gap-2">
                    <Apple className="h-4 w-4" />
                    <span>App Store</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
