import { Layout } from "@/components/layout/Layout";
import { Store, Users, DollarSign, Smartphone, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AgentBanking() {
  const agentBenefits = [
    {
      title: "Direct Commission Revenue",
      description: "Earn consistent transaction fee commissions on every cash deposit, withdrawal, and utility bill processed.",
      icon: DollarSign,
      bg: "#bcffbb",
      color: "#34c771"
    },
    {
      title: "Increased Store Footfall",
      description: "Attract more neighborhood customers to your retail premises as an authorized financial service center.",
      icon: Store,
      bg: "#f0f7ff",
      color: "#0284c7"
    },
    {
      title: "Community Service Hub",
      description: "Provide vital cash and payment access in residential clusters distant from commercial bank branches.",
      icon: Users,
      bg: "#e2e8f0",
      color: "#477ee9"
    },
    {
      title: "Certified POS Infrastructure",
      description: "Receive a robust, NIBSS-connected POS device with high transaction reliability and prompt technical support.",
      icon: Smartphone,
      bg: "#f5ffbb",
      color: "#0a1e3f"
    },
  ];

  return (
    <Layout>
      {/* Editorial Hero with Real Image */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
                <span>Agency Banking Network</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.05]">
                Become an authorized <span className="text-[#0284c7]">Rima MFB Agent</span>.
              </h1>

              <p className="text-[#0a1e3f]/80 text-base sm:text-lg leading-relaxed">
                Partner with a CBN-licensed microfinance bank to deliver cash deposits, withdrawals, and bill settlements within your local community while earning steady commission income.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                >
                  <Link to="/contact">
                    Apply for POS Terminal
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                  <Link to="/branches">
                    Locate Branch Agent Desk
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Real Agent Showcase Image (5 cols) */}
            <div className="lg:col-span-5 perspective-1000">
              <div className="rounded-3xl overflow-hidden shadow-md border border-[#e2e8f0] bg-[#f0f7ff] group">
                <img
                  src="/images/rivers-agent-hero.png"
                  alt="Rima MFB Agent Banking"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hero-about.png";
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Partner Advantages Grid — Mobile-First */}
      <section className="py-10 md:py-20 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-7 md:mb-12">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0284c7] block mb-1.5">
              Partner Advantages
            </span>
            <h2 className="font-heading text-xl sm:text-3xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Commercial benefits of partnering with Rima MFB.
            </h2>
          </div>

          {/* Mobile: 2-col compact grid */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {agentBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white border border-[#e2e8f0] p-3.5 flex flex-col gap-2.5"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: benefit.bg, color: benefit.color }}
                >
                  <benefit.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-heading text-[11px] font-semibold text-[#0a1e3f] leading-snug mb-0.5">{benefit.title}</h3>
                  <p className="text-[10px] text-[#64748b] leading-snug">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet / Desktop: 4-col rich cards */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5">
            {agentBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#0284c7]/30 flex flex-col gap-4"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: benefit.bg, color: benefit.color }}
                >
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-[#0a1e3f] mb-1.5">{benefit.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authorized Services & Eligibility 2-Column Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f0f7ff]/40 to-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Services Menu (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block">
                Transaction Menu
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
                Services you will offer to your customers.
              </h2>
              <p className="text-[#0a1e3f]/80 text-base leading-relaxed">
                As a certified agent, you will be equipped with a high-speed terminal configured for immediate settlement across all major payment types.
              </p>

              {/* 2-Column Responsive Services Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Cash deposits into any Nigerian bank account",
                  "Instant cash withdrawals via Debit Card PIN",
                  "Inter-bank fund transfers with printed confirmation",
                  "PHED electricity bill settlement & meter tokens",
                  "Airtime, data, and Cable TV recharge",
                  "Customer balance inquiries & mini-statements"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-[#e2e8f0]/80 shadow-xs">
                    <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#0a1e3f] leading-tight">{service}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  variant="pill"
                  size="lg"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                >
                  <Link to="/contact">
                    Become an Agent Now
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Eligibility 3D Card (5 cols) */}
            <div className="lg:col-span-5 perspective-1000">
              <div className="rounded-3xl bg-white border border-[#e2e8f0] p-7 sm:p-8 shadow-md space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-[#e2e8f0]">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center font-bold">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#0a1e3f]">
                    Agent Eligibility Criteria
                  </h3>
                </div>

                <ul className="space-y-3.5 text-xs text-[#0a1e3f]/85">
                  <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f0f7ff]/40">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0 mt-1" />
                    <span>Existing physical commercial premise, shop, or retail outlet.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f0f7ff]/40">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0 mt-1" />
                    <span>Valid National Identification Number (NIN) or Voter's Card.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f0f7ff]/40">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0 mt-1" />
                    <span>Recent utility bill (Electricity or Water) of the business location.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f0f7ff]/40">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0 mt-1" />
                    <span>Minimum working float capital for daily cash operations.</span>
                  </li>
                </ul>

                <div className="pt-2 text-center border-t border-[#e2e8f0]">
                  <span className="text-[11px] font-semibold text-[#0284c7] uppercase tracking-wider">
                    Fast 48-Hour Onboarding Review
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
