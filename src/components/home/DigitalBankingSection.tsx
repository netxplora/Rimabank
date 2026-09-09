import { Smartphone, CheckCircle2, ArrowRight, ShieldCheck, ArrowLeftRight, FileText, CreditCard, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";

const defaultCapabilities = [
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
    title: "Bill Payments & Airtime",
    desc: "Pay electricity bills (PHED, IKEDC, EKEDC), renew DSTV/GOtv subscriptions, and buy airtime with zero delays.",
    icon: Zap
  },
  {
    title: "Biometric & 2FA Security",
    desc: "Log in with Face ID or fingerprint recognition protected by multi-factor authentication protocols.",
    icon: ShieldCheck
  }
];

const capIcons = [ArrowLeftRight, Smartphone, FileText, CreditCard, Zap, ShieldCheck];

export function DigitalBankingSection() {
  const { siteContent } = useCMS();
  const db = siteContent?.digitalBankingSection;

  const badge = db?.badge || "Digital Channels & Mobility";
  const heading = db?.heading || "Manage your money wherever you are";
  const description = db?.description || "Experience fast, reliable banking on your smartphone or web browser. Enjoy 24/7 access to transfers, bill payments, and financial management.";
  const capabilities = db?.capabilities && db.capabilities.length > 0 ? db.capabilities : defaultCapabilities;
  const ctaText = db?.ctaText || "Explore Digital Banking Features";
  const ctaLink = db?.ctaLink || "/digital-banking";

  return (
    <section className="py-12 sm:py-20 bg-[#f8fafc]/50 border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-3">
            {badge}
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Feature Grid - Responsive 2-column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5">
          {capabilities.map((cap, idx) => {
            const Icon = (cap as any).icon || capIcons[idx % capIcons.length] || Smartphone;
            return (
              <div
                key={cap.title}
                className="bg-[#f0f9ff]/70 hover:bg-[#f0f9ff] border border-[#bae6fd]/60 hover:border-[#bae6fd] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-white text-[#0284c7] border border-[#bae6fd]/60 shadow-2xs flex items-center justify-center mb-2.5 sm:mb-3.5 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-200">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-xs sm:text-base text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors leading-snug mb-1">
                    {cap.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-4">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Pathway */}
        <div className="mt-8 sm:mt-12 text-center">
          <Button
            variant="pill"
            size="default"
            asChild
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-semibold h-11 px-7 shadow-brand"
          >
            <Link to={ctaLink} className="inline-flex items-center gap-2">
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
