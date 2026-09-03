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
    bg: "#fdedea",
    color: "#f73b20"
  },
  {
    icon: Handshake,
    title: "Customer Focus",
    description: "Our customers are central to every service we provide. We focus on long-term relationships.",
    bg: "#e7dcdb",
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
    color: "#360802"
  },
  {
    icon: Award,
    title: "Service Excellence",
    description: "We maintain consistent turnaround times and professional relationship management.",
    bg: "#fdedea",
    color: "#fb2d54"
  },
  {
    icon: Heart,
    title: "Practical Empathy",
    description: "We understand the real-world operational challenges of traders, families, and entrepreneurs.",
    bg: "#fdedea",
    color: "#f73b20"
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
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-wider">
              <span>About Rima Microfinance Bank</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#360802] tracking-tight leading-[1.05]">
              Empowering regional growth with <span className="text-[#f73b20]">stability</span> and <span className="text-[#f73b20]">trust</span>.
            </h1>

            <p className="text-[#360802]/80 text-base sm:text-lg leading-relaxed">
              Founded on the belief that every hardworking individual, student, trader, and entrepreneur deserves accessible, structured, and ethical banking services.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
              >
                <Link to="/contact">
                  Open an Account
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                <Link to="/branches">
                  Find Branch Location
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision — Mobile-First */}
      <section className="py-10 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Mobile: stacked compact cards */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="rounded-xl bg-white border border-[#e7dcdb] p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#bcffbb] text-[#34c771] flex items-center justify-center shrink-0">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-heading text-sm font-semibold text-[#360802] mb-1">Our Mission</h2>
                <p className="text-[#360802]/75 text-[11px] leading-relaxed">
                  To deliver accessible, dependable, and sustainable financial services that enable individuals, small businesses, and institutions to achieve financial stability and economic growth.
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-[#e7dcdb] p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#fdedea] text-[#f73b20] flex items-center justify-center shrink-0">
                <Eye className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-heading text-sm font-semibold text-[#360802] mb-1">Our Vision</h2>
                <p className="text-[#360802]/75 text-[11px] leading-relaxed">
                  To be the primary microfinance bank in Rivers State, recognized for regulatory discipline, technological stability, and lasting community impact.
                </p>
              </div>
            </div>
          </div>
          {/* Desktop: side-by-side 3D cards */}
          <div className="hidden sm:grid grid-cols-2 gap-5 lg:gap-8">
            <div className="card-3d p-7 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d">
              <div className="w-11 h-11 rounded-xl bg-[#bcffbb] text-[#34c771] flex items-center justify-center mb-5 shadow-sm">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-xl lg:text-2xl font-semibold text-[#360802] mb-2.5">Our Mission</h2>
              <p className="text-[#360802]/75 text-sm leading-relaxed">
                To deliver accessible, dependable, and sustainable financial services that enable individuals, small businesses, and institutions to achieve financial stability and economic growth.
              </p>
            </div>
            <div className="card-3d p-7 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d">
              <div className="w-11 h-11 rounded-xl bg-[#fdedea] text-[#f73b20] flex items-center justify-center mb-5 shadow-sm">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-xl lg:text-2xl font-semibold text-[#360802] mb-2.5">Our Vision</h2>
              <p className="text-[#360802]/75 text-sm leading-relaxed">
                To be the primary microfinance bank in Rivers State, recognized for regulatory discipline, technological stability, and lasting community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Values — Mobile-First */}
      <section className="py-10 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-6 md:mb-12">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#f73b20] block mb-1.5">
              Institutional Values
            </span>
            <h2 className="font-heading text-xl sm:text-3xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              The principles guiding our banking operations.
            </h2>
          </div>

          {/* Mobile: 2-column compact grid */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {coreValues.map((value) => (
              <div key={value.title} className="rounded-xl bg-white border border-[#e7dcdb] p-3.5 flex flex-col gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: value.bg, color: value.color }}
                >
                  <value.icon className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-heading text-[11px] font-semibold text-[#360802] leading-snug">{value.title}</h3>
                <p className="text-[10px] text-[#ababab] leading-snug">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Tablet / Desktop: 3-column rich cards */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((value) => (
              <div key={value.title} className="card-3d p-6 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d hover:border-[#f73b20]/30 flex flex-col gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: value.bg, color: value.color }}
                >
                  <value.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-[#360802] mb-1.5">{value.title}</h3>
                  <p className="text-xs text-[#ababab] leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Governance — Mobile-First */}
      <section className="py-10 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-6 md:mb-12">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#f73b20] block mb-1.5">
              Corporate Governance
            </span>
            <h2 className="font-heading text-xl sm:text-3xl lg:text-5xl font-semibold text-[#360802] tracking-tight leading-[1.08]">
              Experienced executive leadership.
            </h2>
            <p className="text-[#360802]/70 text-xs sm:text-sm mt-2">
              Guided by experienced financial professionals with decades of combined banking expertise and regulatory knowledge.
            </p>
          </div>

          <LeadershipTeam />
        </div>
      </section>

      {/* Historical Milestones 3-Column Grid */}
      <section className="py-16 md:py-20 bg-[#360802] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
              Chronology of Growth
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.08]">
              Over 25 years of steady milestones.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-md hover:bg-white/10 transition-all">
                <div className="text-2xl font-heading font-bold text-[#f73b20] mb-2">{m.year}</div>
                <p className="text-xs text-white/80 leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Disclosure */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-[#360802]">
              Central Bank of Nigeria Licensed Institution
            </h3>
            <p className="text-xs text-[#ababab] leading-relaxed">
              Rima Microfinance Bank is fully licensed and supervised by the Central Bank of Nigeria (CBN). All eligible customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button
                variant="pill"
                size="default"
                asChild
                className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
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
