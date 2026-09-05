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
  Building2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LeadershipTeam } from "@/components/about/LeadershipTeam";

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest ethical standards, compliance rigor, and complete transparency across all operations.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: Handshake,
    title: "Customer Focus",
    description: "Our customers are central to every service we provide. We focus on long-term relationships and mutual growth.",
    bg: "#e2e8f0",
    color: "#477ee9"
  },
  {
    icon: ShieldCheck,
    title: "Operational Rigor",
    description: "We implement dependable digital infrastructure and structured financial workflows tested for stability.",
    bg: "#bcffbb",
    color: "#16a34a"
  },
  {
    icon: Users,
    title: "Community Inclusion",
    description: "We are committed to the economic stability and growth of regional communities across Rivers State.",
    bg: "#f5ffbb",
    color: "#0a1e3f"
  },
  {
    icon: Award,
    title: "Service Excellence",
    description: "We maintain consistent turnaround times, dedicated relationship managers, and prompt resolution.",
    bg: "#f0f7ff",
    color: "#0284c7"
  },
  {
    icon: Heart,
    title: "Practical Empathy",
    description: "We understand the real-world operational challenges of traders, families, and enterprise businesses.",
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
      <section className="relative bg-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-[#0a1e3f]/5 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
                <span>Established 2009 • Port Harcourt</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
                Empowering regional growth with <span className="text-[#0284c7]">stability</span> and <span className="text-[#0284c7]">trust</span>.
              </h1>

              <p className="text-[#0a1e3f]/80 text-sm sm:text-base leading-relaxed">
                Founded on the belief that every hardworking individual, student, trader, and registered enterprise deserves accessible, structured, and ethical banking services.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
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

            {/* Right 3D Verified Credentials Box */}
            <div className="lg:col-span-5 perspective-1000 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="rounded-3xl bg-gradient-to-br from-[#0a1e3f] via-[#0f2a50] to-[#081730] text-white p-6 sm:p-8 shadow-xl border border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-[#38bdf8]" />
                    <span className="font-heading text-sm font-bold text-white">Institutional Credentials</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#16a34a] text-white">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white/60">Regulatory License:</span>
                    <span className="font-semibold text-white text-right">Central Bank of Nigeria (CBN)</span>
                  </div>
                  <div className="flex items-start justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white/60">Deposit Insurance:</span>
                    <span className="font-semibold text-[#4ade80] text-right">NDIC Insured</span>
                  </div>
                  <div className="flex items-start justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white/60">Settlement Network:</span>
                    <span className="font-semibold text-white text-right">NIBSS Real-Time Settlement</span>
                  </div>
                  <div className="flex items-start justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white/60">Headquarters:</span>
                    <span className="font-semibold text-white text-right">Port Harcourt, Rivers State</span>
                  </div>
                </div>

                <div className="pt-2 text-center text-[10px] text-blue-200/80 border-t border-white/10">
                  Over 15 Years of Disciplined Banking Operations
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-10 sm:py-12 md:py-16 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#bcffbb] text-[#16a34a] flex items-center justify-center shadow-xs">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-[#0a1e3f]">Our Mission</h2>
              <p className="text-[#0a1e3f]/75 text-xs sm:text-sm leading-relaxed">
                To deliver accessible, dependable, and sustainable financial services that enable individuals, small businesses, and commercial institutions to achieve financial stability and economic growth.
              </p>
            </div>
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f0f7ff] text-[#0284c7] flex items-center justify-center shadow-xs">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-[#0a1e3f]">Our Vision</h2>
              <p className="text-[#0a1e3f]/75 text-xs sm:text-sm leading-relaxed">
                To be the primary microfinance bank in Rivers State, recognized for regulatory discipline, technological stability, and lasting positive community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Values */}
      <section className="py-10 sm:py-12 md:py-16 bg-[#f8fafc] border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Institutional Values
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
              The principles guiding our banking operations.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
              <div 
                key={value.title} 
                className="p-6 rounded-3xl bg-white border border-[#e2e8f0] hover:border-[#0284c7]/40 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-xs"
                    style={{ backgroundColor: value.bg, color: value.color }}
                  >
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-[#0a1e3f] mb-1.5">{value.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Governance */}
      <section className="py-10 sm:py-12 md:py-16 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Corporate Governance
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.1]">
              Experienced executive leadership.
            </h2>
            <p className="text-[#0a1e3f]/70 text-xs sm:text-sm mt-1.5 max-w-2xl">
              Guided by experienced financial professionals with decades of combined commercial banking expertise and regulatory knowledge.
            </p>
          </div>

          <LeadershipTeam />
        </div>
      </section>

      {/* Historical Milestones 3-Column Grid */}
      <section className="py-12 sm:py-14 md:py-16 bg-[#0a1e3f] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8] block mb-1.5">
              Chronology of Growth
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.1]">
              Decades of banking milestones in Rivers State.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div 
                key={m.year} 
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#38bdf8]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-[#38bdf8] block mb-2">{m.year}</span>
                  <p className="text-xs text-blue-100/80 leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Disclosure */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-[#0a1e3f]">
              Central Bank of Nigeria Licensed Institution
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Rima Microfinance Bank is fully licensed and supervised by the Central Bank of Nigeria (CBN). All eligible customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3.5">
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
