import { useState } from "react";
import { Phone, ShieldAlert, CheckCircle2, ArrowRight, Smartphone, Lock, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const quickCodes = [
  { label: "Main Menu", code: "*966*808#", prompt: "Welcome to RIMA Bank MFB\n1. Check Balance\n2. Transfer Money\n3. Buy Airtime/Data\n4. Pay Utilities" },
  { label: "Check Balance", code: "*966*808*0#", prompt: "RIMA Bank Balance:\nAccount: 0123****89\nAvailable: ₦145,250.00\nLedger: ₦145,250.00" },
  { label: "Transfer Funds", code: "*966*808*1#", prompt: "RIMA Instant Transfer:\nEnter Recipient Account No or Select Saved Beneficiary:" },
  { label: "Buy Airtime", code: "*966*808*2#", prompt: "Airtime Top-Up:\n1. For Self\n2. For Third Party\nEnter Amount (₦50 - ₦50,000):" },
  { label: "Pay Bills", code: "*966*808*3#", prompt: "Utility Bill Settlement:\n1. PHED Electricity\n2. DSTV / GOTV\n3. Waste Management" },
];

export function USSDBankingSection() {
  const [activeCode, setActiveCode] = useState(quickCodes[0]);
  const [dialing, setDialing] = useState(false);

  const handleSelectCode = (item: typeof quickCodes[0]) => {
    setDialing(true);
    setTimeout(() => {
      setActiveCode(item);
      setDialing(false);
    }, 250);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lightweight Skyblue Container (No heavy navyblue) */}
        <div className="bg-[#f0f9ff] text-[#0a1e3f] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#bae6fd]/70 shadow-xs relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center relative z-10">
            
            {/* Left Content (7 cols) */}
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
                  Access essential banking services directly from your mobile phone anytime, anywhere — even when you do not have data, internet access, or a smartphone.
                </p>
              </div>

              {/* Code Banner */}
              <div className="bg-white rounded-2xl p-5 border border-sky-100 flex flex-col sm:flex-row items-center gap-5 shadow-2xs">
                <div className="text-center sm:text-left">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-medium">
                    Official USSD Banking Code
                  </span>
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-[#0284c7] tracking-wider">
                    *966*808#
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

            {/* Right: Interactive 3D Phone Simulator (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              {/* Phone Frame */}
              <div 
                className="w-full max-w-[320px] rounded-[36px] bg-slate-900 p-4 border-4 border-slate-700/80 shadow-xl relative"
              >
                {/* Phone Speaker & Camera Notch */}
                <div className="h-4 w-24 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                  <div className="h-1 w-10 bg-slate-700 rounded-full" />
                </div>

                {/* Simulated Screen */}
                <div className="bg-[#0f172a] rounded-2xl p-4 text-white min-h-[280px] flex flex-col justify-between border border-slate-700/50">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pb-2 border-b border-slate-800 font-mono">
                    <span>RIMA USSD</span>
                    <span>SIM1 &bull; 4G</span>
                  </div>

                  {/* USSD Prompt Display */}
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

                  {/* Simulated Action Button */}
                  <div className="pt-2 border-t border-slate-800 flex gap-2">
                    <button 
                      onClick={() => handleSelectCode(quickCodes[0])}
                      className="flex-1 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 font-mono flex items-center justify-center gap-1"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset
                    </button>
                    <Link
                      to="/ussd-banking"
                      className="flex-1 py-1.5 rounded-lg bg-[#0284c7] text-white text-xs font-semibold text-center hover:bg-[#0369a1] transition-colors"
                    >
                      Full Matrix
                    </Link>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="h-1 w-24 bg-slate-700 rounded-full mx-auto mt-3" />
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
