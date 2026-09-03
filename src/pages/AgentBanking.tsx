import { Layout } from "@/components/layout/Layout";
import { Store, Users, DollarSign, Smartphone, CheckCircle2, ArrowRight } from "lucide-react";
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
      bg: "#fdedea",
      color: "#f73b20"
    },
    {
      title: "Community Service Hub",
      description: "Provide vital cash and payment access in residential clusters distant from commercial bank branches.",
      icon: Users,
      bg: "#e7dcdb",
      color: "#477ee9"
    },
    {
      title: "Certified POS Infrastructure",
      description: "Receive a robust, NIBSS-connected POS device with high transaction reliability and prompt technical support.",
      icon: Smartphone,
      bg: "#f5ffbb",
      color: "#360802"
    },
  ];

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-ui">
              <span>Agency Banking Network</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              Become an authorized <span className="text-[#f73b20]">Rima MFB Agent</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              Partner with a CBN-licensed microfinance bank to deliver cash deposits, withdrawals, and bill settlements within your local community while earning steady commission income.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <Link to="/contact">
                  Apply for POS Terminal
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-buttons">
                <Link to="/branches">
                  Locate Branch Agent Desk
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
              Partner Advantages
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
              Commercial benefits of partnering with Rima MFB.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agentBenefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift hover:border-[#f73b20]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: benefit.bg, color: benefit.color }}
                  >
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#360802] mb-2">{benefit.title}</h3>
                  <p className="text-xs text-[#ababab] leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authorized Services Section */}
      <section className="py-24 bg-[#fdedea] border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block">
                Transaction Menu
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-medium text-[#360802] tracking-tight leading-[1.05]">
                Services you will offer to your customers.
              </h2>
              <p className="text-[#360802]/80 text-sm leading-relaxed">
                As a certified agent, you will be equipped with a high-speed terminal configured for immediate settlement across all major payment types.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Cash deposits into any Nigerian bank account",
                  "Instant cash withdrawals via Debit Card PIN",
                  "Inter-bank fund transfers with printed confirmation",
                  "PHED electricity bill settlement and meter token generation",
                  "Airtime, data, and Cable TV recharge",
                  "Customer balance inquiries and mini-statements"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-medium text-[#360802]">
                    <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button variant="pill" size="lg" asChild className="shadow-brand">
                  <Link to="/contact">
                    Become an Agent Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-cards bg-white border border-[#e7dcdb] p-8 shadow-lift space-y-6">
                <h3 className="font-heading text-lg font-bold text-[#360802] pb-4 border-b border-[#e7dcdb]">
                  Agent Eligibility Criteria
                </h3>
                <ul className="space-y-3 text-xs text-[#360802]/80">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f73b20] shrink-0 mt-1.5" />
                    <span>Existing physical commercial premise, shop, or retail outlet.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f73b20] shrink-0 mt-1.5" />
                    <span>Valid National Identification Number (NIN) or Voter's Card.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f73b20] shrink-0 mt-1.5" />
                    <span>Recent utility bill (Electricity or Water) of the business location.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f73b20] shrink-0 mt-1.5" />
                    <span>Minimum working float capital for daily cash operations.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
