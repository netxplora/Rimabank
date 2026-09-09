import { Smartphone, CheckCircle2, ArrowRight, ShieldCheck, ArrowLeftRight, FileText, CreditCard, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const digitalCapabilities = [
  {
    title: "Instant Interbank Transfers",
    desc: "Send money to any commercial or microfinance bank account in Nigeria with immediate electronic confirmation.",
    icon: ArrowLeftRight
  },
  {
    title: "Account Balance & History",
    desc: "Check real-time balances, view detailed transaction ledgers, and track everyday income and expenditures.",
    icon: Smartphone
  },
  {
    title: "E-Statements on Demand",
    desc: "Generate and download official, stamped account statements for business verification or loan records.",
    icon: FileText
  },
  {
    title: "Card Controls & Security",
    desc: "Temporarily lock your Verve card, reset your transaction PIN, or adjust daily ATM withdrawal limits instantly.",
    icon: CreditCard
  },
  {
    title: "Bill Payments & Utility Tokens",
    desc: "Pay electricity bills (PHED, IKEDC, EKEDC), renew DSTV/GOtv subscriptions, and buy airtime with zero delays.",
    icon: Zap
  },
  {
    title: "Biometric & 2FA Security",
    desc: "Log in with Face ID or fingerprint recognition protected by multi-factor authentication protocols.",
    icon: ShieldCheck
  }
];

export function DigitalBankingSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#f8fafc]/50 border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-3">
            Digital Channels & Mobility
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            Manage your money wherever you are
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Experience fast, reliable banking on your smartphone or web browser. Enjoy 24/7 access to transfers, bill payments, and financial management.
          </p>
        </div>

        {/* Feature Grid - Responsive Grid Cards for Mobile Portability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {digitalCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="bg-[#f0f9ff]/70 hover:bg-[#f0f9ff] border border-[#bae6fd]/60 hover:border-[#bae6fd] rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-white text-[#0284c7] border border-[#bae6fd]/60 shadow-2xs flex items-center justify-center mb-4 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors mb-1.5">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Pathway */}
        <div className="mt-10 text-center">
          <Button
            variant="pill"
            size="default"
            asChild
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-11 px-7 shadow-brand"
          >
            <Link to="/digital-banking">
              <span>Explore Digital Banking Features</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
