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
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LeadershipTeam } from "@/components/about/LeadershipTeam";

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest ethical standards, compliance rigor, and complete transparency.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: Handshake,
    title: "Customer Focus",
    description: "Our customers are central to every service we provide. We focus on long-term relationships.",
    bg: "#e2e8f0",
    color: "#477ee9"
  },
  {
    icon: ShieldCheck,
    title: "Operational Rigor",
    description: "We implement dependable digital infrastructure and structured financial workflows.",
    bg: "#bcffbb",
    color: "#34c771"
  },
  {
    icon: Users,
    title: "Community Inclusion",
    description: "We are committed to the economic stability and growth of regional communities.",
    bg: "#f5ffbb",
    color: "#0a1e3f"
  },
  {
    icon: Award,
    title: "Service Excellence",
    description: "We maintain consistent turnaround times and professional relationship management.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: Heart,
    title: "Practical Empathy",
    description: "We understand the real-world operational challenges of traders, families, and entrepreneurs.",
    bg: "#f0f7ff",
    color: "#0284c7"
  }
];

const milestones = [
  { year: "2009", event: "Rima Microfinance Bank licensed by Central Bank of Nigeria in Port Harcourt." },
  { year: "2013", event: "Expanded branch presence to major commercial corridors across Rivers State." },
  { year: "2016", event: "Structured dedicated Commercial SME Banking & Working Capital division." },
  { year: "2019", event: "Integrated NIBSS instant settlement electronic payment infrastructure." },
  { year: "2022", event: "Reached over 50,000 active individual and commercial account holders." },
  { year: "2025", event: "Expanded agency banking network to 200+ neighborhood merchant outlets." }
];

export default function About() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-[#e2e8f0]/60 overflow-hidden">
        {/* Animated Floating Background Orbs */}
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-sky-200/50 rounded-full blur-3xl -z-10 opacity-70 pointer-events-none animate-pulse duration-[3000ms]" />
        <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-[#0a1e3f]/10 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none animate-pulse delay-1000 duration-[4000ms]" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span>About Rima Microfinance Bank</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Empowering regional growth with <span className="text-[#0284c7]">stability</span> and <span className="text-[#0284c7]">trust</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-sm sm:text-base leading-relaxed">
              Founded on the belief that every hardworking individual, student, trader, and entrepreneur deserves accessible, structured, and ethical banking services.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <Button
                variant="pill"
                size="default"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/contact">
                  Open an Account
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="default" asChild className="rounded-full">
                <Link to="/branches">
                  Find Branch Location
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision — Mobile-First */}
      <section className="py-8 sm:py-10 md:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Mobile: stacked compact cards */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="rounded-xl bg-white border border-[#e2e8f0] p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#bcffbb] text-[#34c771] flex items-center justify-center shrink-0">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-heading text-sm font-semibold text-[#0a1e3f] mb-1">Our Mission</h2>
                <p className="text-[#0a1e3f]/75 text-[11px] leading-relaxed">
                  To deliver accessible, dependable, and sustainable financial services that enable individuals, small businesses, and institutions to achieve financial stability and economic growth.
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-[#e2e8f0] p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center shrink-0">
                <Eye className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-heading text-sm font-semibold text-[#0a1e3f] mb-1">Our Vision</h2>
                <p className="text-[#0a1e3f]/75 text-[11px] leading-relaxed">
                  To be the primary microfinance bank in Rivers State, recognized for regulatory discipline, technological stability, and lasting community impact.
                </p>
              </div>
            </div>
          </div>
          {/* Desktop: side-by-side cards */}
          <div className="hidden sm:grid grid-cols-2 gap-5 lg:gap-8">
            <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-lift transform hover:-translate-y-1 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
              <div className="w-10 h-10 rounded-xl bg-[#bcffbb] text-[#34c771] flex items-center justify-center mb-4 shadow-sm">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-[#0a1e3f] mb-2">Our Mission</h2>
              <p className="text-[#0a1e3f]/75 text-xs sm:text-sm leading-relaxed">
                To deliver accessible, dependable, and sustainable financial services that enable individuals, small businesses, and institutions to achieve financial stability and economic growth.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-lift transform hover:-translate-y-1 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: '150ms' }}>
              <div className="w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center mb-4 shadow-sm">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-[#0a1e3f] mb-2">Our Vision</h2>
              <p className="text-[#0a1e3f]/75 text-xs sm:text-sm leading-relaxed">
                To be the primary microfinance bank in Rivers State, recognized for regulatory discipline, technological stability, and lasting community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Values — Mobile-First */}
      <section className="py-8 sm:py-10 md:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Institutional Values
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
              The principles guiding our banking operations.
            </h2>
          </div>

          {/* Mobile: 2-column compact grid */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {coreValues.map((value, idx) => (
              <div 
                key={value.title} 
                className="rounded-xl bg-white border border-[#e2e8f0] p-3.5 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: value.bg, color: value.color }}
                >
                  <value.icon className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-heading text-[11px] font-semibold text-[#0a1e3f] leading-snug">{value.title}</h3>
                <p className="text-[10px] text-[#64748b] leading-snug">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Tablet / Desktop: 3-column rich cards */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((value, idx) => (
              <div 
                key={value.title} 
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#0284c7]/30 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-500 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: value.bg, color: value.color }}
                >
                  <value.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-[#0a1e3f] mb-1">{value.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Governance — Mobile-First */}
      <section className="py-8 sm:py-10 md:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Corporate Governance
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
              Experienced executive leadership.
            </h2>
            <p className="text-[#0a1e3f]/70 text-xs sm:text-sm mt-1.5">
              Guided by experienced financial professionals with decades of combined banking expertise and regulatory knowledge.
            </p>
          </div>

          <LeadershipTeam />
        </div>
      </section>

      {/* Historical Milestones 3-Column Grid */}
      <section className="py-10 sm:py-12 md:py-14 bg-[#0a1e3f] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1.5">
              Chronology of Growth
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.1]">
              Decades of banking milestones in Rivers State.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {milestones.map((m, idx) => (
              <div 
                key={m.year} 
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0284c7]/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span className="font-heading text-xl sm:text-2xl font-bold text-[#38bdf8] block mb-1.5">{m.year}</span>
                <p className="text-xs text-blue-100/80 leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Disclosure */}
      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-[#0a1e3f]">
              Central Bank of Nigeria Licensed Institution
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Rima Microfinance Bank is fully licensed and supervised by the Central Bank of Nigeria (CBN). All eligible customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button
                variant="pill"
                size="default"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/contact">Contact Head Office</Link>
              </Button>
              <Button variant="outlineNeutral" size="default" asChild className="rounded-full">
                <Link to="/privacy">Regulatory Compliance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
