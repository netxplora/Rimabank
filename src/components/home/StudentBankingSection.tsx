import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Wallet, CreditCard, ArrowRight } from "lucide-react";
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
    <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block">
              Youth & Higher Education
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Banking structured for students and campus life.
            </h2>
            <p className="text-[#360802]/80 text-base leading-relaxed">
              Designed specifically for tertiary and vocational students across Rivers State. Receive family allowances, pay tuition fees, and build early financial discipline with zero charges.
            </p>

            {/* Features (No card containers) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#e7dcdb]/60">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: feature.bg, color: feature.color }}
                  >
                    <feature.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-[#360802] mb-1">{feature.title}</h3>
                  <p className="text-xs text-[#ababab] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
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

          {/* Pricing & Eligibility 3D Card (5 cols) */}
          <div className="lg:col-span-5 perspective-1000">
            <div className="rounded-2xl bg-gradient-to-br from-[#fdedea] to-white border border-[#e7dcdb] p-6 sm:p-8 shadow-3d-lift space-y-6">
              <div className="flex items-center gap-4 pb-5 border-b border-[#e7dcdb]">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#e7dcdb] shadow-sm flex items-center justify-center text-[#34c771]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#360802]">Campus Tier Account</h3>
                  <p className="text-xs text-[#ababab]">Ages 16 – 28 &bull; Valid Student ID</p>
                </div>
              </div>

              {/* Fee Metrics List (Clean rows without nested card boxes) */}
              <div className="divide-y divide-[#e7dcdb]/80">
                <div className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-[#ababab] font-medium">Opening Minimum</span>
                  <span className="font-bold text-[#360802]">₦ 0.00</span>
                </div>
                <div className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-[#ababab] font-medium">Monthly Account Maintenance</span>
                  <span className="font-bold text-[#34c771]">FREE</span>
                </div>
                <div className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-[#ababab] font-medium">SMS & Email Alerts</span>
                  <span className="font-bold text-[#360802]">Included</span>
                </div>
              </div>

              <div className="text-[11px] text-[#ababab] leading-normal pt-1 border-t border-[#e7dcdb]/60">
                * Requirement: Valid Student ID card from any accredited Nigerian institution or admission letter with national identification.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
