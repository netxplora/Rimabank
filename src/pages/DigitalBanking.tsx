import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Smartphone,
  Shield,
  Zap,
  Download,
  CheckCircle2,
  WalletCards,
  ReceiptText,
  HandCoins,
  ArrowRight,
  ShieldCheck,
  SmartphoneNfc,
  Apple
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

export default function DigitalBanking() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-ui">
              <span>Digital Banking Platform</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              Banking operations from your <span className="text-[#f73b20]">mobile phone</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              Instant fund transfers, automatic bill payments, and secure account management accessible 24 hours a day on iOS and Android.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <a href="#download">
                  Download Mobile App
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons">
                <Link to="/contact">
                  Speak with Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
              Core Capabilities
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
              Everything you need to manage your money.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: WalletCards,
                title: "Instant Inter-Bank Transfers",
                description: "Execute real-time electronic fund transfers to any licensed commercial bank or microfinance institution in Nigeria.",
                bg: "#e7dcdb",
                color: "#477ee9"
              },
              {
                icon: ReceiptText,
                title: "Utility & Bill Settlements",
                description: "Pay recurring electricity bills (PHED), purchase internet data top-ups, and settle cable TV subscriptions with instant receipt generation.",
                bg: "#bcffbb",
                color: "#34c771"
              },
              {
                icon: HandCoins,
                title: "Mobile Micro-Credit",
                description: "Apply for and receive approved short-term personal credit directly into your Rima MFB account based on your transaction history.",
                bg: "#fdedea",
                color: "#fb2d54"
              },
              {
                icon: SmartphoneNfc,
                title: "Instant Debit Card Controls",
                description: "Block, unblock, or set transaction spending limits on your linked debit card directly from within the mobile app.",
                bg: "#fdedea",
                color: "#f73b20"
              },
              {
                icon: ShieldCheck,
                title: "Biometric Sign-In Security",
                description: "Sign in with Touch ID or Face ID for fast, biometric authentication with 256-bit encryption protecting all sessions.",
                bg: "#f5ffbb",
                color: "#360802"
              },
              {
                icon: Zap,
                title: "Electronic Bank Statements",
                description: "Generate and export official stamped PDF bank statements directly to your email for visa or official documentation purposes.",
                bg: "#e7dcdb",
                color: "#477ee9"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift hover:border-[#f73b20]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: feature.bg, color: feature.color }}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#360802] mb-2">{feature.title}</h3>
                  <p className="text-xs text-[#ababab] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="py-24 bg-[#fdedea] border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
              Simple Setup
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
              Get started in three straightforward steps.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift space-y-4">
              <div className="text-2xl font-heading font-bold text-[#f73b20]">01</div>
              <h3 className="font-heading text-base font-semibold text-[#360802]">Download the App</h3>
              <p className="text-xs text-[#ababab] leading-relaxed">
                Download the Rima MFB Mobile Banking application from Google Play or the iOS App Store.
              </p>
            </div>

            <div className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift space-y-4">
              <div className="text-2xl font-heading font-bold text-[#f73b20]">02</div>
              <h3 className="font-heading text-base font-semibold text-[#360802]">Verify Credentials</h3>
              <p className="text-xs text-[#ababab] leading-relaxed">
                Enter your registered BVN and National Identification Number (NIN) to verify your account in minutes.
              </p>
            </div>

            <div className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift space-y-4">
              <div className="text-2xl font-heading font-bold text-[#f73b20]">03</div>
              <h3 className="font-heading text-base font-semibold text-[#360802]">Begin Banking</h3>
              <p className="text-xs text-[#ababab] leading-relaxed">
                Set your secure transaction PIN, fund your balance, and begin executing instant transfers immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Banner */}
      <section id="download" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-[#360802] text-white rounded-cards p-8 lg:p-16 shadow-soft relative overflow-hidden">
            <div className="max-w-2xl space-y-6 relative z-10">
              <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block">
                Mobile Banking App
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.05]">
                Download Rima MFB Mobile for iOS and Android.
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Access your accounts, track spending, and send payments securely from your mobile device.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Button variant="pill" size="lg" asChild className="bg-[#f73b20] hover:bg-[#f84d35]">
                  <a href="#playstore" className="flex items-center gap-2">
                    <PlayStoreIcon />
                    <span>Google Play</span>
                  </a>
                </Button>
                <Button variant="whiteGhost" size="lg" asChild className="rounded-buttons">
                  <a href="#appstore" className="flex items-center gap-2">
                    <Apple className="h-5 w-5" />
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
