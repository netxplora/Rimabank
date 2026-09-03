import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Wallet, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Wallet,
    title: "Zero Monthly Fees",
    description: "No maintenance charges or hidden balance penalties.",
    bg: "#bcffbb",
    color: "#34c771"
  },
  {
    icon: BookOpen,
    title: "Education Micro-Credit",
    description: "Low-interest tuition support for eligible students.",
    bg: "#fdedea",
    color: "#f73b20"
  },
  {
    icon: CreditCard,
    title: "Campus Debit Card",
    description: "Direct ATM withdrawals and cashless campus purchases.",
    bg: "#e7dcdb",
    color: "#477ee9"
  },
];

export function StudentBankingSection() {
  return (
    <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block">
              Youth & Higher Education
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
              Banking structured for students and campus life.
            </h2>
            <p className="text-[#360802]/80 text-base leading-relaxed">
              Designed specifically for tertiary and vocational students across Rivers State. Receive family allowances, pay tuition fees, and build early financial discipline with zero charges.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-5 rounded-cards bg-white border border-[#e7dcdb] shadow-lift"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: feature.bg, color: feature.color }}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-[#360802] mb-1">{feature.title}</h3>
                  <p className="text-xs text-[#ababab] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/personal-banking/student">
                  Open Student Account
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons">
                <Link to="/contact">
                  Speak with Student Desk
                </Link>
              </Button>
            </div>
          </div>

          {/* Pricing & Eligibility Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-cards bg-[#fdedea] border border-[#e7dcdb] p-8 shadow-lift">
              <div className="flex items-center gap-4 pb-6 border-b border-[#e7dcdb] mb-6">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#e7dcdb] flex items-center justify-center text-[#34c771]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#360802]">Campus Tier Account</h3>
                  <p className="text-xs text-[#ababab]">Ages 16 – 28 &bull; Valid Student ID</p>
                </div>
              </div>

              <div className="space-y-3.5 mb-6">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-[#e7dcdb] text-xs">
                  <span className="text-[#ababab]">Opening Minimum</span>
                  <span className="font-bold text-[#360802]">₦ 0.00</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-[#e7dcdb] text-xs">
                  <span className="text-[#ababab]">Monthly Account Maintenance</span>
                  <span className="font-bold text-[#34c771]">FREE</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-[#e7dcdb] text-xs">
                  <span className="text-[#ababab]">SMS & Email Alerts</span>
                  <span className="font-bold text-[#360802]">Included</span>
                </div>
              </div>

              <div className="text-[11px] text-[#ababab] leading-normal pt-2">
                * Requirement: Valid Student ID card from any accredited Nigerian institution or admission letter with national identification.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
