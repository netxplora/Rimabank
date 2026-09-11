import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Shield, CheckCircle2, Smartphone, Lock, RotateCcw, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadAppDialog } from "@/components/modals/DownloadAppDialog";

const quickCodes = [
  { label: "Main Menu",      code: "*966*808#",   prompt: "Welcome to RIMA Bank MFB\n1. Check Balance\n2. Transfer Money\n3. Buy Airtime/Data\n4. Pay Utilities" },
  { label: "Check Balance",  code: "*966*808*0#", prompt: "RIMA Bank Balance:\nAccount: 0123****89\nAvailable: ₦145,250.00\nLedger: ₦145,250.00" },
  { label: "Transfer Funds", code: "*966*808*1#", prompt: "RIMA Instant Transfer:\nEnter Recipient Account No\nor Select Saved Beneficiary:" },
  { label: "Buy Airtime",    code: "*966*808*2#", prompt: "Airtime Top-Up:\n1. For Self\n2. For Third Party\nEnter Amount (₦50 - ₦50,000):" },
  { label: "Pay Bills",      code: "*966*808*3#", prompt: "Utility Bill Settlement:\n1. PHED Electricity\n2. DSTV / GOTV\n3. Waste Management" },
];

const ussdMatrix = [
  { code: "*966*808#",   desc: "Main menu" },
  { code: "*966*808*0#", desc: "Check balance" },
  { code: "*966*808*1#", desc: "Transfer funds" },
  { code: "*966*808*2#", desc: "Buy airtime" },
  { code: "*966*808*3#", desc: "Pay bills" },
  { code: "*966*808*4#", desc: "Mini statement" },
  { code: "*966*808*5#", desc: "Change PIN" },
  { code: "*966*808*6#", desc: "Account opening" },
];

const USSD_CODE = "*966*808#";

export default function UssdBanking() {
  const [activeCode, setActiveCode] = useState(quickCodes[0]);
  const [dialing, setDialing] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showAppDialog, setShowAppDialog] = useState(false);

  const handleSelectCode = (item: typeof quickCodes[0]) => {
    setDialing(true);
    setTimeout(() => {
      setActiveCode(item);
      setDialing(false);
    }, 280);
  };

  return (
    <Layout
      title="USSD Banking | RIMA Microfinance Bank"
      description={`Bank without internet using RIMA USSD code ${USSD_CODE}. Transfer money, check balance, and pay bills from any phone.`}
    >

      {/* ── 1. Hero ── */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-4">
              USSD Banking
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight mb-5">
              Bank without internet.
            </h1>
            <p className="text-slate-600 text-base leading-relaxed max-w-2xl mb-8">
              No data? No smartphone? No problem. Access your RIMA account directly from any mobile phone using our official USSD code. Works on any network, anywhere in Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="pill" 
                size="lg" 
                onClick={() => setShowAppDialog(true)}
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md cursor-pointer"
              >
                <Download className="mr-2 h-4 w-4" />
                <span>Get the App</span>
              </Button>
              <Button variant="outlineNeutral" size="lg" className="rounded-full" asChild>
                <Link to="/mobile-banking">Explore App Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Getting Started Steps ── */}
      <section className="py-16 sm:py-20 bg-[#f8fafc] border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-2">Getting Started</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1e3f] tracking-tight">How to use USSD banking</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 relative">
            <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            {[
              { step: "01", title: "Dial",    desc: `Dial ${USSD_CODE} from the phone number linked to your RIMA account.` },
              { step: "02", title: "Select",  desc: "Choose the service you need from the on-screen menu." },
              { step: "03", title: "Confirm", desc: "Enter your secure 4-digit USSD PIN to authorize the transaction." },
              { step: "04", title: "Done",    desc: "Receive an instant SMS confirmation of your completed transaction." }
            ].map((s) => (
              <div key={s.step} className="bg-white border border-slate-200 rounded-2xl p-6 relative z-10 shadow-sm text-center">
                <span className="font-heading font-bold text-xl text-[#0284c7] block mb-2">{s.step}</span>
                <h3 className="font-heading font-bold text-sm text-[#0a1e3f] mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Zero Internet Banking — Interactive Simulator ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f0f9ff] text-[#0a1e3f] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#bae6fd]/70 shadow-xs relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center relative z-10">

              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0284c7] text-xs font-semibold uppercase tracking-wider border border-sky-200 shadow-2xs">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Zero Internet Banking</span>
                </div>

                <div className="space-y-3">
                  <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
                    Bank without internet
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                    Access essential banking services directly from your mobile phone — even when you do not have data, internet access, or a smartphone.
                  </p>
                </div>

                {/* USSD Code Banner */}
                <div className="bg-white rounded-2xl p-5 border border-sky-100 flex flex-col sm:flex-row items-center gap-5 shadow-2xs">
                  <div className="text-center sm:text-left">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-medium">
                      Official USSD Banking Code
                    </span>
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-[#0284c7] tracking-wider">
                      {USSD_CODE}
                    </span>
                  </div>
                  <div className="hidden sm:block h-12 w-px bg-slate-200" />
                  <span className="text-xs text-slate-600 max-w-[220px] text-center sm:text-left leading-relaxed">
                    Works on MTN, Airtel, Glo, and 9mobile across Rivers State and Nigeria.
                  </span>
                </div>

                {/* Quick Dial Shortcuts */}
                <div className="space-y-2 pt-1">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Test Quick USSD Codes:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickCodes.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => handleSelectCode(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                          activeCode.code === item.code
                            ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                            : "bg-white text-slate-700 border-sky-200/70 hover:bg-sky-50"
                        }`}
                      >
                        {item.code} ({item.label})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Security Advisory */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <Lock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Confidentiality Notice:</strong> Your 4-digit USSD PIN is strictly private. RIMA Bank staff will never call or message you requesting your PIN, BVN, or OTP.
                  </p>
                </div>
              </motion.div>

              {/* Right: Interactive Phone Simulator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-5 flex justify-center"
              >
                <div className="w-full max-w-[300px] rounded-[36px] bg-slate-900 p-4 border-4 border-slate-700/80 shadow-2xl relative">
                  {/* Notch */}
                  <div className="h-4 w-24 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <div className="h-1 w-10 bg-slate-700 rounded-full" />
                  </div>

                  {/* Screen */}
                  <div className="bg-[#0f172a] rounded-2xl p-4 text-white min-h-[280px] flex flex-col justify-between border border-slate-700/50">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 pb-2 border-b border-slate-800 font-mono">
                      <span>RIMA USSD</span>
                      <span>SIM1 &bull; 4G</span>
                    </div>

                    <div className="my-auto py-3">
                      <AnimatePresence mode="wait">
                        {dialing ? (
                          <motion.div
                            key="dialing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-6 space-y-2"
                          >
                            <div className="h-6 w-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
                            <span className="text-xs text-sky-300 font-mono">USSD code running...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key={activeCode.code}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-800/90 rounded-xl p-3.5 border border-sky-500/30 text-left space-y-2"
                          >
                            <div className="flex items-center justify-between text-[11px] text-sky-400 font-mono">
                              <span>{activeCode.code}</span>
                              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                                Active
                              </span>
                            </div>
                            <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                              {activeCode.prompt}
                            </pre>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex gap-2">
                      <button
                        onClick={() => handleSelectCode(quickCodes[0])}
                        className="flex-1 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 font-mono flex items-center justify-center gap-1 transition-colors"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Reset
                      </button>
                      <button
                        onClick={() => setShowMatrix(!showMatrix)}
                        className="flex-1 py-1.5 rounded-lg bg-[#0284c7] text-white text-xs font-semibold text-center hover:bg-[#0369a1] transition-colors"
                      >
                        Full Matrix
                      </button>
                    </div>
                  </div>

                  <div className="h-1 w-24 bg-slate-700 rounded-full mx-auto mt-3" />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      <div>
        <AnimatePresence>
          {showMatrix && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#0a1e3f] overflow-hidden"
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block mb-1">Full Code Directory</span>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">All USSD shortcodes</h2>
                  </div>
                  <button
                    onClick={() => setShowMatrix(false)}
                    className="text-xs text-sky-400 border border-sky-800 rounded-full px-4 py-1.5 hover:bg-sky-900/30 transition-colors"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {ussdMatrix.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        handleSelectCode({ label: item.desc, code: item.code, prompt: `Dialing ${item.code}\n${item.desc}...` });
                        setShowMatrix(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all"
                    >
                      <span className="font-mono text-sm text-sky-300 font-bold block mb-1">{item.code}</span>
                      <span className="text-xs text-slate-300 capitalize">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* ── 5. What you can do ── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1e3f] tracking-tight">What you can do on USSD</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Check your account balance",
              "Transfer money to any Nigerian bank",
              "Buy airtime and data bundles",
              "Pay electricity and utility bills",
              "Open a basic RIMA account",
              "Generate your mini statement",
              "Change your USSD PIN",
              "Block your debit card"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-[#f0f9ff]/60 border border-[#bae6fd]/60 rounded-xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-sm text-[#0a1e3f] font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Security Notice ── */}
      <section className="py-10 bg-amber-50 border-t border-amber-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-4 max-w-3xl">
            <Shield className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-amber-900 mb-1">Security Notice</h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                Your 4-digit USSD PIN is confidential. RIMA Bank will never call, text, or email you to request your PIN, BVN, or OTP. If anyone contacts you claiming to be RIMA staff and asks for these details, do not share them — report immediately to our customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download App Dialog Popup */}
      <DownloadAppDialog open={showAppDialog} onOpenChange={setShowAppDialog} />
    </Layout>
  );
}
