import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Shield,
  Handshake,
  ShieldCheck,
  ArrowRight,
  Landmark,
  Scale,
  Lock,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LeadershipTeam } from "@/components/about/LeadershipTeam";
import { useCMS } from "@/context/CMSContext";
import { cn } from "@/lib/utils";

const stats = [
  { value: "15+", label: "Years of Operations", desc: "Serving Port Harcourt and Rivers State since 2009" },
  { value: "50,000+", label: "Active Customers", desc: "Entrepreneurs, market traders, civil servants & families" },
  { value: "200+", label: "Agency Banking Points", desc: "Verified neighborhood merchant cash-in/cash-out access" },
  { value: "₦2.5B+", label: "Credit Disbursed", desc: "Structured working capital and MSME micro-facilities" },
  { value: "100%", label: "NDIC Deposit Coverage", desc: "Eligible deposits protected under statutory insurance" },
];

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold strict ethical banking standards, transparent fee disclosures, and rigorous compliance across all customer transactions.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: Handshake,
    title: "Customer Focus",
    description: "Our customers are central to every service we provide. We focus on long-term relationships, tailored advisory, and mutual growth.",
    bg: "#e2e8f0",
    color: "#477ee9"
  },
  {
    icon: ShieldCheck,
    title: "Operational Rigor",
    description: "We implement dependable core banking systems and structured financial workflows built for transaction integrity and uptime.",
    bg: "#bcffbb",
    color: "#16a34a"
  },
  {
    icon: Users,
    title: "Community Inclusion",
    description: "We are committed to the economic stability and growth of regional communities, artisans, and commercial markets across Rivers State.",
    bg: "#f5ffbb",
    color: "#0a1e3f"
  },
  {
    icon: Award,
    title: "Service Excellence",
    description: "We maintain fast credit turnaround times, dedicated relationship managers, and prompt enquiry resolution across all touchpoints.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: Heart,
    title: "Practical Empathy",
    description: "We understand the real-world cash flow realities of traders, families, students, and expanding enterprise businesses.",
    bg: "#f0f7ff",
    color: "#0284c7"
  }
];

const operationalPillars = [
  {
    id: "governance",
    title: "Governance & Capital Stewardship",
    badge: "Regulatory Discipline",
    icon: Scale,
    headline: "Conservative balance sheet management with strict Central Bank of Nigeria oversight.",
    points: [
      "Full compliance with Central Bank of Nigeria (CBN) microfinance banking regulations and statutory liquidity ratios.",
      "Independent Board of Directors overseeing Credit, Audit, Risk, and Executive Management Committees.",
      "Transparent statutory reporting and audited financial disclosures adhering to IFRS guidelines."
    ]
  },
  {
    id: "commercial",
    title: "Real-Economy Commercial Finance",
    badge: "SME Enablement",
    icon: Landmark,
    headline: "Fueling the daily operations of traders, contractors, and growing regional businesses.",
    points: [
      "Structured short-term inventory loans, purchase order financing, and invoice discounting for local suppliers.",
      "Flexible collateral frameworks tailored to small enterprises, registered cooperatives, and market trade associations.",
      "Dedicated relationship officers stationed across Port Harcourt commercial hubs for rapid credit assessments."
    ]
  },
  {
    id: "inclusion",
    title: "Grassroots Financial Inclusion",
    badge: "Neighborhood Access",
    icon: Users,
    headline: "Extending modern banking services to retail markets and underbanked communities.",
    points: [
      "Extensive network of over 200 accredited agency banking POS terminals for immediate cash deposits and withdrawals.",
      "Tier-1 instant account opening requiring simple verification, eliminating bureaucratic delays.",
      "Offline USSD (*723#) banking capabilities ensuring reliable access on any basic mobile device."
    ]
  },
  {
    id: "security",
    title: "Infrastructure & Security Controls",
    badge: "Digital Integrity",
    icon: Lock,
    headline: "Enterprise-grade financial infrastructure connected directly to national settlement rails.",
    points: [
      "Direct integration with NIBSS Instant Payments (NIP) for immediate, 24/7 inter-bank funds transfers.",
      "Multi-factor authentication, biometric transaction verification, and 256-bit SSL data encryption.",
      "Proactive fraud monitoring algorithms and strict Anti-Money Laundering (AML/CFT) controls."
    ]
  }
];

const milestones = [
  {
    year: "2009",
    title: "Banking License Granted",
    event: "Rima Microfinance Bank licensed by the Central Bank of Nigeria to commence specialized retail banking in Port Harcourt."
  },
  {
    year: "2013",
    title: "Commercial Branch Network",
    event: "Expanded physical branch footprint across major high-density commercial corridors and market districts in Rivers State."
  },
  {
    year: "2016",
    title: "Commercial SME Division",
    event: "Structured a dedicated Commercial Credit desk to support trade finance, logistics, and oilfield service contractors."
  },
  {
    year: "2019",
    title: "NIBSS Integration",
    event: "Deployed core electronic payment infrastructure connected directly to Nigeria Inter-Bank Settlement System (NIBSS)."
  },
  {
    year: "2022",
    title: "50,000+ Account Milestone",
    event: "Surpassed 50,000 active individual and commercial account holders across regional branches and digital channels."
  },
  {
    year: "2025",
    title: "Agency Banking Scale",
    event: "Expanded neighborhood agency banking network to 200+ certified merchant POS locations across Rivers State communities."
  }
];

export default function About() {
  const { siteContent } = useCMS();
  const [activePillar, setActivePillar] = useState(operationalPillars[0].id);

  const selectedPillar = operationalPillars.find(p => p.id === activePillar) || operationalPillars[0];
  const PillarIcon = selectedPillar.icon;
  const about = siteContent?.aboutSnapshot;

  return (
    <Layout>
      {/* ── 1. Editorial Hero Section ── */}
      <section className="relative bg-white pt-6 pb-8 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[350px] h-[350px] bg-[#0a1e3f]/5 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
                <span>Central Bank of Nigeria Licensed • Est. 2009</span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
                Empowering regional growth with <span className="text-[#0284c7]">stability</span> and <span className="text-[#0284c7]">trust</span>.
              </h1>

              <p className="text-[#0a1e3f]/80 text-xs sm:text-sm leading-relaxed max-w-xl">
                For over 15 years, Rima Microfinance Bank has delivered structured, ethical, and accessible financial services to registered enterprises, small business owners, market traders, and families across Rivers State.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all text-xs h-10 px-5"
                >
                  <Link to="/contact">
                    <span>Open an Account</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                </Button>
                <Button variant="outlineNeutral" size="default" asChild className="rounded-full text-xs h-10 px-5">
                  <Link to="/branches">
                    <span>Branch & ATM Directory</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right 3D Institutional Credentials Card */}
            <div className="lg:col-span-5 perspective-1000 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="rounded-2xl bg-gradient-to-br from-[#0a1e3f] via-[#0f2a50] to-[#081730] text-white p-5 sm:p-6 shadow-xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#38bdf8]" />
                    <span className="font-heading text-xs sm:text-sm font-bold text-white">Institutional Credentials</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#16a34a] text-white tracking-wider">
                    REGULATED
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-white/60">Regulatory License:</span>
                    <span className="font-semibold text-white text-right">Central Bank of Nigeria (CBN)</span>
                  </div>
                  <div className="flex items-start justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-white/60">Deposit Insurance:</span>
                    <span className="font-semibold text-[#4ade80] text-right">NDIC Insured</span>
                  </div>
                  <div className="flex items-start justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-white/60">Inter-Bank Routing:</span>
                    <span className="font-semibold text-white text-right">NIBSS Code: 090547</span>
                  </div>
                  <div className="flex items-start justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-white/60">Head Office:</span>
                    <span className="font-semibold text-white text-right">Port Harcourt, Rivers State</span>
                  </div>
                </div>

                <div className="pt-1.5 text-center text-[10px] text-blue-200/80 border-t border-white/10">
                  Over 15 Years of Disciplined Banking Operations
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Impact & Operating Numbers Strip (Compact Divided Layout) ── */}
      <section className="py-6 sm:py-8 bg-slate-50 border-b border-[#e2e8f0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {stats.map((stat, idx) => (
              <div key={idx} className={cn("pt-3 sm:pt-0 sm:px-3 first:pt-0 first:pl-0", idx > 0 && "sm:pl-5")}>
                <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a1e3f] block leading-none">
                  {stat.value}
                </span>
                <span className="font-heading text-[11px] sm:text-xs font-semibold text-[#0284c7] block mt-1 mb-0.5">
                  {stat.label}
                </span>
                <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Mission & Vision (Clean Divided Layout) ── */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-b border-slate-200">
            <div className="py-6 md:p-6 lg:p-8 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#bcffbb] text-[#16a34a] flex items-center justify-center">
                <Target className="h-4.5 w-4.5" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-[#0a1e3f]">Our Mission</h2>
              <p className="text-[#0a1e3f]/75 text-xs sm:text-sm leading-relaxed">
                To deliver accessible, dependable, and sustainable financial services that enable individuals, small businesses, and commercial institutions to achieve financial stability and long-term economic growth.
              </p>
            </div>
            
            <div className="py-6 md:p-6 lg:p-8 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center">
                <Eye className="h-4.5 w-4.5" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-[#0a1e3f]">Our Vision</h2>
              <p className="text-[#0a1e3f]/75 text-xs sm:text-sm leading-relaxed">
                To be the benchmark microfinance bank in Rivers State, recognized for regulatory discipline, technological reliability, and lasting positive community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Strategic Operational Pillars (Interactive Blueprint) ── */}
      <section className="py-8 sm:py-12 bg-slate-50/70 border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Institutional Framework
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0a1e3f] tracking-tight leading-tight">
              How RIMA Bank operates with excellence.
            </h2>
            <p className="text-[#0a1e3f]/70 text-xs sm:text-sm mt-1.5">
              Our banking operations are anchored on structural pillars designed to protect capital, foster commerce, and empower our host communities.
            </p>
          </div>

          {/* Interactive Selector Chips */}
          <div className="flex flex-wrap gap-2 pb-4 sm:pb-6">
            {operationalPillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2",
                  activePillar === pillar.id
                    ? "bg-[#0a1e3f] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                )}
              >
                <pillar.icon className={cn("h-3.5 w-3.5", activePillar === pillar.id ? "text-[#38bdf8]" : "text-[#0284c7]")} />
                <span>{pillar.title}</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Details Card */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 lg:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-5 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f0f7ff] text-[#0284c7] text-[10px] font-bold uppercase tracking-wider">
                  <PillarIcon className="h-3 w-3" />
                  <span>{selectedPillar.badge}</span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0a1e3f] leading-snug">
                  {selectedPillar.headline}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every decision at RIMA Bank is guided by institutional stability, regulatory compliance, and a genuine commitment to the economic prosperity of our stakeholders.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-2.5 border-t lg:border-t-0 lg:border-l border-slate-200 pt-5 lg:pt-0 lg:pl-6">
                <h4 className="font-heading text-[11px] font-bold uppercase tracking-wider text-[#0a1e3f]">
                  Operational Standards & Safeguards
                </h4>
                <div className="space-y-2">
                  {selectedPillar.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a] shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Institutional Values ── */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Institutional Values
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0a1e3f] tracking-tight leading-tight">
              The principles guiding our banking operations.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 border-t border-[#e2e8f0] pt-6">
            {coreValues.map((value) => (
              <div 
                key={value.title} 
                className="flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: value.bg, color: value.color }}
                  >
                    <value.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-heading text-sm sm:text-base font-semibold text-[#0a1e3f] mb-1">{value.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Corporate Governance & Executive Leadership ── */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Corporate Governance
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0a1e3f] tracking-tight leading-tight">
              {about?.governanceHeading || "Experienced executive leadership."}
            </h2>
            <p className="text-[#0a1e3f]/70 text-xs sm:text-sm mt-1 max-w-2xl">
              {about?.governanceSubheading || "Guided by experienced financial professionals with decades of combined commercial banking expertise, corporate governance rigor, and regulatory knowledge."}
            </p>
          </div>

          <LeadershipTeam />
        </div>
      </section>

      {/* ── 7. Historical Milestones & Chronology of Growth ── */}
      <section className="py-8 sm:py-12 bg-[#0a1e3f] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8] block mb-1">
              Chronology of Growth
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight leading-tight">
              Decades of banking milestones in Rivers State.
            </h2>
            <p className="text-blue-100/70 text-xs sm:text-sm mt-1">
              From our licensing by the Central Bank of Nigeria in 2009 to a diversified financial institution serving over 50,000 customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {milestones.map((m) => (
              <div 
                key={m.year} 
                className="space-y-1.5 border-l-2 border-[#38bdf8]/40 pl-3.5"
              >
                <span className="font-heading text-xl sm:text-2xl font-bold text-[#38bdf8] block">{m.year}</span>
                <h4 className="font-heading text-xs sm:text-sm font-bold text-white">{m.title}</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Regulatory Disclosure & Direct Action ── */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#0284c7] mx-auto mb-1">
              <Landmark className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#0a1e3f]">
              Central Bank of Nigeria Licensed Institution
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Rima Microfinance Bank is fully licensed and supervised by the Central Bank of Nigeria (CBN). All eligible customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Button
                variant="pill"
                size="default"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all text-xs h-10 px-5"
              >
                <Link to="/contact">
                  <span>Open an Account</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="default" asChild className="rounded-full text-xs h-10 px-5">
                <Link to="/branches">
                  <span>Find a Branch</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
