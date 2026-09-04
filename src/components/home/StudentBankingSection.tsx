import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Wallet, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Wallet,
    title: "Zero Monthly Fees",
    description: "No maintenance charges or hidden balance penalties.",
    bg: "#dcfce7",
    color: "#10b981"
  },
  {
    icon: BookOpen,
    title: "Education Micro-Credit",
    description: "Low-interest tuition support for eligible students.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: CreditCard,
    title: "Campus Debit Card",
    description: "Direct ATM withdrawals and cashless campus purchases.",
    bg: "#e0f2fe",
    color: "#0284c7"
  },
];

export function StudentBankingSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block">
              Youth & Higher Education
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Banking structured for students and campus life.
            </h2>
            <p className="text-[#0a1e3f]/80 text-base leading-relaxed">
              Designed specifically for tertiary and vocational students across Rivers State. Receive family allowances, pay tuition fees, and build early financial discipline with zero charges.
            </p>

            {/* Features (No card containers) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#e2e8f0]">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: feature.bg, color: feature.color }}
                  >
                    <feature.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-[#0a1e3f] mb-1">{feature.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-brand transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/personal-banking/student">
                  Open Student Account
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                <Link to="/contact">
                  Speak with Student Desk
                </Link>
              </Button>
            </div>
          </div>

          {/* Pricing & Eligibility Card (5 cols) */}
          <div className="lg:col-span-5 perspective-1000">
            <div className="rounded-2xl bg-gradient-to-br from-[#f0f7ff] to-white border border-[#e2e8f0] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-4 pb-5 border-b border-[#e2e8f0]">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#e2e8f0] shadow-sm flex items-center justify-center text-[#10b981]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#0a1e3f]">Campus Tier Account</h3>
                  <p className="text-xs text-[#64748b]">Ages 16 – 28 &bull; Valid Student ID</p>
                </div>
              </div>

              {/* Fee Metrics List (Clean rows without nested card boxes) */}
              <div className="divide-y divide-[#e2e8f0]">
                <div className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-[#64748b] font-medium">Opening Minimum</span>
                  <span className="font-bold text-[#0a1e3f]">₦ 0.00</span>
                </div>
                <div className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-[#64748b] font-medium">Monthly Account Maintenance</span>
                  <span className="font-bold text-[#10b981]">FREE</span>
                </div>
                <div className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-[#64748b] font-medium">SMS & Email Alerts</span>
                  <span className="font-bold text-[#0a1e3f]">Included</span>
                </div>
              </div>

              <div className="text-[11px] text-[#64748b] leading-normal pt-1 border-t border-[#e2e8f0]">
                * Requirement: Valid Student ID card from any accredited Nigerian institution or admission letter with national identification.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
