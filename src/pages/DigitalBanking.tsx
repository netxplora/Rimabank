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
    color: "#34c771"
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
  return (
    <Layout>
      {/* Editorial Hero with Real Image Showcase */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
                <span>Digital Banking Platform</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.05]">
                Banking operations directly from your <span className="text-[#0284c7]">mobile phone</span>.
              </h1>

              <p className="text-[#0a1e3f]/80 text-base sm:text-lg leading-relaxed">
                Instant fund transfers, automatic bill payments, and secure account management accessible 24 hours a day on iOS and Android.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                >
                  <a href="#download">
                    Download Mobile App
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </a>
                </Button>
                <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                  <Link to="/contact">
                    Speak with Support
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Real Digital Showcase Image (5 cols) */}
            <div className="lg:col-span-5 perspective-1000">
              <div className="rounded-3xl overflow-hidden shadow-md border border-[#e2e8f0] bg-[#f0f7ff] group">
                <img
                  src="/images/hero-digital.png"
                  alt="Rima Digital Banking"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/Mobile-App.png";
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3-Column Core Capabilities Grid — Open Layout */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
              Core Capabilities
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Everything you need to manage your money.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-[#e2e8f0]/80 pt-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: feature.bg, color: feature.color }}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-[#0a1e3f] mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Setup Open Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f0f7ff]/40 to-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">
              Simple Setup
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Get started in three straightforward steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]/80 border-t border-b border-[#e2e8f0]/80 py-2">
            <div className="py-6 md:p-6 space-y-3">
              <div className="text-2xl font-heading font-bold text-[#0284c7]">01</div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f]">Download the App</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Download the Rima MFB Mobile Banking application from Google Play or the iOS App Store.
              </p>
            </div>

            <div className="py-6 md:p-6 space-y-3">
              <div className="text-2xl font-heading font-bold text-[#0284c7]">02</div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f]">Verify Credentials</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Enter your registered BVN and National Identification Number (NIN) to verify your account in minutes.
              </p>
            </div>

            <div className="py-6 md:p-6 space-y-3">
              <div className="text-2xl font-heading font-bold text-[#0284c7]">03</div>
              <h3 className="font-heading text-base font-semibold text-[#0a1e3f]">Begin Banking</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Set your secure transaction PIN, fund your balance, and begin executing instant transfers immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Banner */}
      <section id="download" className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#0a1e3f] via-[#450b03] to-[#250501] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-md relative overflow-hidden border border-white/15">
            <div className="max-w-2xl space-y-6 relative z-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block">
                Mobile Banking App
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.08]">
                Download Rima MFB Mobile for iOS and Android.
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Access your accounts, track spending, and send payments securely from your mobile device.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                >
                  <a href="#playstore" className="flex items-center gap-2">
                    <PlayStoreIcon />
                    <span>Google Play</span>
                  </a>
                </Button>
                <Button variant="whiteGhost" size="lg" asChild className="rounded-full border border-white/30 hover:bg-white/15">
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
