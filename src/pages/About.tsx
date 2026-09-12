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
  CheckCircle2,
  Building2,
  Clock,
  Sparkles,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LeadershipTeam } from "@/components/about/LeadershipTeam";
import { useCMS } from "@/context/CMSContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DownloadAppDialog } from "@/components/modals/DownloadAppDialog";

const stats = [
  { value: "15+", label: "Years of Heritage", desc: "Serving Rivers State communities since 2009" },
  { value: "50,000+", label: "Active Accountholders", desc: "Entrepreneurs, market traders & salary earners" },
  { value: "200+", label: "Agency Banking Points", desc: "Neighborhood cash-in and cash-out access" },
  { value: "₦2.5B+", label: "Credit Disbursed", desc: "Structured MSME working capital & loans" },
  { value: "100%", label: "NDIC Deposit Coverage", desc: "Protected under statutory deposit insurance" },
];

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold strict ethical banking standards, transparent fee disclosures, and rigorous compliance across all customer transactions.",
    bg: "bg-sky-50 text-[#0284c7] border-sky-200/80"
  },
  {
    icon: Handshake,
    title: "Customer Focus",
    description: "Our customers are central to every service we provide. We focus on long-term relationships, tailored advisory, and mutual growth.",
    bg: "bg-blue-50 text-blue-600 border-blue-200/80"
  },
  {
    icon: ShieldCheck,
    title: "Operational Rigor",
    description: "We implement dependable core banking systems and structured financial workflows built for transaction integrity and uptime.",
    bg: "bg-emerald-50 text-emerald-600 border-emerald-200/80"
  },
  {
    icon: Users,
    title: "Community Inclusion",
    description: "We are committed to the economic stability and growth of regional communities, artisans, and commercial markets across Rivers State.",
    bg: "bg-amber-50 text-amber-700 border-amber-200/80"
  },
  {
    icon: Award,
    title: "Service Excellence",
    description: "We maintain fast credit turnaround times, dedicated relationship managers, and prompt enquiry resolution across all touchpoints.",
    bg: "bg-indigo-50 text-indigo-600 border-indigo-200/80"
  },
  {
    icon: Heart,
    title: "Practical Empathy",
    description: "We understand the real-world cash flow realities of traders, families, students, and expanding enterprise businesses.",
    bg: "bg-rose-50 text-rose-600 border-rose-200/80"
  }
];

const operationalPillars = [
  {
    id: "governance",
    title: "Governance & Stewardship",
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
    title: "Real-Economy Finance",
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
      "An active network of accredited agency banking POS terminals for immediate cash deposits and withdrawals.",
      "Tier-1 instant account opening requiring simple verification, eliminating bureaucratic delays.",
      "Offline USSD (*966*808#) banking capabilities ensuring reliable access on any basic mobile device."
    ]
  },
  {
    id: "security",
    title: "Infrastructure & Security",
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
    tag: "CBN License",
    title: "Banking License Granted",
    event: "RIMA Microfinance Bank licensed by the Central Bank of Nigeria to commence specialized retail banking in Port Harcourt."
  },
  {
    year: "2013",
    tag: "Expansion",
    title: "Commercial Branch Network",
    event: "Expanded physical branch footprint across major high-density commercial corridors and market districts in Rivers State."
  },
  {
    year: "2016",
    tag: "Enterprise",
    title: "Commercial SME Division",
    event: "Structured a dedicated Commercial Credit desk to support trade finance, logistics, and oilfield service contractors."
  },
  {
    year: "2019",
    tag: "Payments",
    title: "NIBSS Integration",
    event: "Deployed core electronic payment infrastructure connected directly to Nigeria Inter-Bank Settlement System (NIBSS)."
  },
  {
    year: "2022",
    tag: "Scale",
    title: "50,000+ Account Milestone",
    event: "Surpassed 50,000 active individual and commercial account holders across regional branches and digital channels."
  },
  {
    year: "2025",
    tag: "Agency Network",
    title: "Agency Banking Expansion",
    event: "Continued expansion of the certified merchant agency banking network across Rivers State communities."
  }
];

export default function About() {
  const { siteContent } = useCMS();
  const [showAppDialog, setShowAppDialog] = useState(false);
  const [activePillar, setActivePillar] = useState(operationalPillars[0].id);

  const selectedPillar = operationalPillars.find(p => p.id === activePillar) || operationalPillars[0];
  const PillarIcon = selectedPillar.icon;
  const about = siteContent?.aboutSnapshot;

  return (
    <Layout
      title="About RIMA Microfinance Bank | Rivers State, Nigeria"
      description="Learn about RIMA Microfinance Bank — a CBN-licensed institution serving individuals, traders and businesses across Rivers State since 2009."
    >
      {/* ── 1. Editorial Hero Section ── */}
      <section className="relative bg-[#f8fbff] py-16 sm:py-24 border-b border-slate-200/80 overflow-hidden text-[#0a1e3f]">
        {/* Ambient lighting meshes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage: "radial-gradient(#0284c7 0.75px, transparent 0.75px), radial-gradient(#0a1e3f 0.75px, #f8fbff 0.75px)",
              backgroundSize: "32px 32px",
              backgroundPosition: "0 0, 16px 16px",
            }}
          />
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#38bdf8]/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-[#0284c7]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Central Bank of Nigeria Licensed • Est. 2009</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0a1e3f] tracking-tight leading-[1.1] text-balance">
                Empowering regional growth with <span className="text-[#0284c7]">stability</span> and <span className="text-[#0284c7]">trust</span>.
              </h1>

              <p className="font-sans text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                For over 15 years, RIMA Microfinance Bank has delivered structured, ethical, and accessible financial services to registered enterprises, small business owners, market traders, and families across Rivers State.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  variant="pill"
                  size="lg"
                  onClick={() => setShowAppDialog(true)}
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md h-12 px-7 text-xs sm:text-sm font-semibold justify-center cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Get the app</span>
                  </span>
                </Button>
                
                <Button variant="outlineNeutral" size="lg" asChild className="rounded-full bg-white hover:bg-slate-50 border-slate-300 text-xs sm:text-sm font-semibold h-12 px-6 justify-center shadow-2xs">
                  <Link to="/branches">
                    <span>Branch & ATM Directory</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Institutional Credentials Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#0a1e3f] text-white p-6 sm:p-8 shadow-2xl border border-white/10 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0284c7]/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-5 w-5 text-[#38bdf8]" />
                    <span className="font-heading text-sm sm:text-base font-bold text-white">Institutional Status</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white tracking-wider">
                    REGULATED
                  </span>
                </div>

                <div className="space-y-2.5 text-xs relative z-10">
                  <div className="flex items-start justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-300">Regulatory License:</span>
                    <span className="font-semibold text-white text-right">Central Bank of Nigeria (CBN)</span>
                  </div>
                  <div className="flex items-start justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-300">Deposit Insurance:</span>
                    <span className="font-semibold text-emerald-400 text-right">NDIC Statutory Cover</span>
                  </div>
                  <div className="flex items-start justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-300">Inter-Bank Clearing:</span>
                    <span className="font-semibold text-white text-right">NIBSS Settlement Rails</span>
                  </div>
                  <div className="flex items-start justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-300">Corporate Head Office:</span>
                    <span className="font-semibold text-white text-right">Port Harcourt, Rivers State</span>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-[#38bdf8] font-medium border-t border-white/10 relative z-10">
                  15+ Years of Disciplined Banking Operations
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Impact & Operating Numbers Strip ── */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#f8fbff] border border-slate-200/80 shadow-2xs">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1e3f] block leading-none">
                  {stat.value}
                </span>
                <span className="font-heading text-xs font-semibold text-[#0284c7] block mt-1.5 mb-1">
                  {stat.label}
                </span>
                <p className="font-sans text-[11px] text-slate-500 leading-snug">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Mission & Vision ── */}
      <section id="vision" className="scroll-mt-24 py-16 sm:py-20 bg-[#f8fbff] border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#0a1e3f]">Our Mission</h2>
              <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
                {about?.mission || "To deliver accessible, dependable, and sustainable financial services that enable individuals, small businesses, and commercial institutions to achieve financial stability and long-term economic growth."}
              </p>
            </div>
            
            <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] border border-sky-200/80 shadow-2xs flex items-center justify-center">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#0a1e3f]">Our Vision</h2>
              <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
                {about?.vision || "To be the benchmark microfinance bank in Rivers State, recognized for regulatory discipline, technological reliability, and lasting positive community impact."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Strategic Operational Pillars ── */}
      <section id="governance" className="scroll-mt-24 py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>Institutional Framework</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              How RIMA Bank operates with excellence.
            </h2>
            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
              Our banking operations are anchored on structural pillars designed to protect capital, foster commerce, and empower our host communities.
            </p>
          </div>

          {/* Interactive Selector Tabs */}
          <div className="flex flex-wrap gap-2.5 pb-6 sm:pb-8">
            {operationalPillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left flex items-center gap-2.5",
                  activePillar === pillar.id
                    ? "bg-[#0a1e3f] text-white shadow-md translate-y-[-1px]"
                    : "bg-[#f8fbff] text-slate-700 border border-slate-200/80 hover:bg-white shadow-2xs"
                )}
              >
                <pillar.icon className={cn("h-4 w-4", activePillar === pillar.id ? "text-[#38bdf8]" : "text-[#0284c7]")} />
                <span>{pillar.title}</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Details Card */}
          <div className="bg-[#f8fbff] rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0284c7] text-xs font-bold uppercase tracking-wider border border-[#bae6fd]">
                  <PillarIcon className="h-3.5 w-3.5" />
                  <span>{selectedPillar.badge}</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0a1e3f] leading-snug">
                  {selectedPillar.headline}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every decision at RIMA Bank is guided by institutional stability, regulatory compliance, and a genuine commitment to the economic prosperity of our stakeholders.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-3 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-6 lg:pt-0 lg:pl-8">
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-500">
                  Operational Standards & Safeguards
                </h4>
                <div className="space-y-2.5">
                  {selectedPillar.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="font-sans text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
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
      <section className="py-16 sm:py-24 bg-[#f8fbff] border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>Core Values</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              The principles guiding our banking operations.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coreValues.map((value) => (
              <div 
                key={value.title} 
                className="bg-white border border-slate-200/90 hover:border-[#0284c7]/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-2xs hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 shrink-0 shadow-2xs ${value.bg}`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-[#0a1e3f] group-hover:text-[#0284c7] transition-colors mb-2 leading-snug">
                    {value.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Corporate Governance & Executive Leadership ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>Corporate Governance</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              {about?.governanceHeading || "Experienced executive leadership."}
            </h2>
            <p className="font-sans text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              {about?.governanceSubheading || "Guided by experienced financial professionals with decades of combined commercial banking expertise, corporate governance rigor, and regulatory knowledge."}
            </p>
          </div>

          <LeadershipTeam />
        </div>
      </section>

      {/* ── 7. Historical Milestones ── */}
      <section className="py-16 sm:py-24 bg-[#f8fbff] text-[#0a1e3f] border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>Chronology of Growth</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              Decades of banking milestones in Rivers State.
            </h2>
            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
              From our licensing by the Central Bank of Nigeria in 2009 to a diversified financial institution serving over 50,000 customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {milestones.map((m) => (
              <div 
                key={m.year} 
                className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 space-y-3 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xl sm:text-2xl text-[#0284c7]">{m.year}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">{m.tag}</span>
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#0a1e3f] leading-snug">{m.title}</h3>
                <p className="font-sans text-xs text-slate-600 leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Regulatory Disclosure & Final Action ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f0f9ff] text-[#0284c7] mx-auto border border-[#bae6fd]">
              <Landmark className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1e3f]">
              Central Bank of Nigeria Licensed Institution
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
              RIMA Microfinance Bank is fully licensed and supervised by the Central Bank of Nigeria (CBN). All eligible customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).
            </p>
            <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3.5">
              <Button
                variant="pill"
                size="lg"
                onClick={() => setShowAppDialog(true)}
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md text-xs sm:text-sm font-semibold h-12 px-7 justify-center cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Get the app</span>
                </span>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full bg-white hover:bg-slate-50 border-slate-300 text-xs sm:text-sm font-semibold h-12 px-7 justify-center shadow-2xs">
                <Link to="/branches">
                  <span>Find a Branch</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Download App Dialog Popup */}
      <DownloadAppDialog open={showAppDialog} onOpenChange={setShowAppDialog} />
    </Layout>
  );
}
