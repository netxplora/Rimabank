import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  CheckCircle2, 
  Shield, 
  ArrowRight, 
  Lock, 
  Bell, 
  CreditCard,
  ArrowLeftRight,
  PiggyBank,
  FileText, 
  Fingerprint, 
  Download,
  Zap,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import { motion } from "framer-motion";

const appFeatures = [
  { 
    icon: ArrowLeftRight, 
    title: "Instant Inter-Bank Transfers", 
    desc: "Send funds directly to any commercial or microfinance bank in Nigeria in seconds with immediate receipt generation.",
    color: "text-[#0284c7]",
    bg: "bg-sky-50"
  },
  { 
    icon: PiggyBank, 
    title: "Target Savings & Vaults", 
    desc: "Create and automate goal-based savings, track daily interest yields, and lock away funds with zero temptation.",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  { 
    icon: CreditCard, 
    title: "Bills & Instant Airtime", 
    desc: "Recharge phone airtime/data, pay PHED electricity bills, and renew DSTV/GOTV subscriptions with zero surcharge.",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  { 
    icon: FileText, 
    title: "Instant Account Statements", 
    desc: "Generate official, stamped PDF account statements directly on your phone for visa, business, or audit needs.",
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  { 
    icon: Fingerprint, 
    title: "Biometric Security", 
    desc: "Log in swiftly and authorize daily transactions using your phone's fingerprint sensor or Face Recognition.",
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  { 
    icon: Bell, 
    title: "Real-time Push Notifications", 
    desc: "Receive instant push alerts for every debit and credit so you stay in total control of your money 24/7.",
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
];

const onboardingSteps = [
  { step: "01", title: "Download the App", desc: "Get the RIMA Mobile Banking App from the Google Play Store or App Store." },
  { step: "02", title: "Provide Account Details", desc: "Enter your registered RIMA account number, BVN, and registered mobile number." },
  { step: "03", title: "Set Secure PIN & Biometrics", desc: "Create a private 4-digit transaction PIN and activate biometric fingerprint login." },
  { step: "04", title: "Start Banking Instantly", desc: "Transfer money, buy airtime, pay bills, and monitor your savings on the go." },
];

export default function MobileBanking() {
  const { siteContent } = useCMS();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appLinks = (siteContent as any)?.appLinks;

  return (
    <Layout
      title="Mobile Banking App | RIMA Microfinance Bank"
      description="Bank anytime, anywhere with the RIMA Mobile Banking App. Instant transfers, bill payments, savings management, and 24/7 account monitoring."
    >
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284c7] text-xs font-semibold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                RIMA Digital Banking
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                Your bank in the palm of your hand.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Experience seamless 24/7 banking with the RIMA Mobile App. Transfer funds instantly to any bank, settle utility bills, monitor target savings, and download official statements anytime.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                {appLinks?.googlePlay ? (
                  <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md px-7" asChild>
                    <a href={appLinks.googlePlay} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Get on Google Play
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" className="rounded-full bg-[#0a1e3f] text-white cursor-default opacity-90 px-7" disabled>
                    <Download className="mr-2 h-4 w-4" />
                    Android & iOS App — Coming Soon
                  </Button>
                )}
                <Button variant="outline" size="lg" className="rounded-full border-slate-200 text-[#0a1e3f] hover:bg-slate-50 px-6" asChild>
                  <Link to="/contact">Request Mobile Access</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0a1e3f]">24/7</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Uninterrupted Access</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0284c7]">0 Sec</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Instant Settlement</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-600">Encrypted</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Biometric Protected</div>
                </div>
              </div>
            </motion.div>

            {/* Official Mobile App Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative group max-w-[320px] w-full">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-sky-100/60 blur-2xl scale-90 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/images/mobile-app.jpg"
                  alt="Rima MFB Mobile Banking App"
                  className="w-full h-auto object-contain drop-shadow-2xl transform group-hover:-rotate-1 group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#64748b] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                  Available on iOS &amp; Android
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Comprehensive App Suite
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Everything you need for everyday banking
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Designed for speed, clarity, and rock-solid reliability on any smartphone connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appFeatures.map((f) => (
              <div 
                key={f.title}
                className="bg-white border border-slate-200 rounded-3xl p-7 hover:border-sky-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-5 shadow-sm`}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0a1e3f] mb-2">{f.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Onboarding */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Simple Setup
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Get started with mobile banking in 4 steps
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Activate your mobile banking profile within minutes using your registered RIMA account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {onboardingSteps.map((s) => (
              <div key={s.step} className="bg-[#f8fafc] border border-slate-200 rounded-3xl p-6 relative shadow-sm hover:shadow-md transition-all">
                <span className="font-heading font-bold text-2xl text-[#0284c7] block mb-3">{s.step}</span>
                <h3 className="font-heading font-bold text-base text-[#0a1e3f] mb-2">{s.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Protection Section */}
      <section className="py-16 bg-[#0a1e3f] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-300 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/60 inline-block mb-3">
                Security Architecture
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Multi-layered protection on every transaction
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed max-w-2xl mb-6">
                Your mobile banking session is safeguarded with end-to-end 256-bit encryption, dynamic one-time passwords (OTP), device binding, and automated anomaly monitoring.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Biometric Fingerprint & PIN Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hardware Device Binding Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant SMS and In-App Fraud Alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automatic Idle Session Termination</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white w-full" asChild>
                <Link to="/contact">Contact Support Helpdesk</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/20 text-white hover:bg-white/10 w-full" asChild>
                <Link to="/ussd-banking">Try USSD Banking Instead</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
