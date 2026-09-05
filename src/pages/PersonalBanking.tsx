import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Wallet,
  CreditCard,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Landmark,
  TrendingUp,
  Wifi,
  Sparkles,
  ChevronRight,
  Calculator,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const personalServices = [
  {
    id: "savings",
    title: "Savings & Fixed Deposits",
    icon: Wallet,
    category: "Yield & Accumulation",
    rate: "Up to 12.5% p.a.",
    bg: "#f0fdf4",
    accent: "#16a34a",
    description: "Build capital with structured deposit plans offering competitive annualized interest yields and zero hidden maintenance fees.",
    href: "/personal-banking#savings",
    benefits: [
      "Competitive annual interest yields calculated daily and credited quarterly",
      "Zero mandatory minimum operating balance requirements",
      "Instant debit card issuance for nationwide ATM and POS access",
      "24/7 Mobile app and online banking platform access",
      "Automated standing orders for structured monthly savings",
      "Direct qualification for retail credit and salary advance facilities"
    ],
    requirements: [
      "Duly completed Account Opening Form",
      "Valid Government ID (NIN, Voter's Card, Driver's License, or Passport)",
      "Bank Verification Number (BVN)",
      "Recent Utility Bill (Electricity, Water, or Waste not older than 3 months)",
      "Two (2) recent passport photographs"
    ],
    fees: "Zero monthly maintenance fees"
  },
  {
    id: "current",
    title: "Personal Current Accounts",
    icon: CreditCard,
    category: "Daily Liquidity",
    rate: "Zero Limits",
    bg: "#f0f7ff",
    accent: "#0284c7",
    description: "Designed for day-to-day liquidity, salary deposits, personalized cheque books, and seamless digital transaction capacity.",
    href: "/personal-banking#current",
    benefits: [
      "Unrestricted monthly transaction volume and deposit frequency",
      "Personalized cheque book issuance and third-party clearing",
      "Eligibility for personal overdrafts and short-term lines of credit",
      "Instant debit card linkage for nationwide ATM, POS, and online checkout",
      "Direct NIBSS instant settlement with real-time SMS/Email alerts",
      "Priority branch customer desk assistance"
    ],
    requirements: [
      "Duly completed Current Account Opening Form",
      "Valid Government Identification (NIN, Voter's Card, Driver's License, or Passport)",
      "Two (2) independent external account references",
      "Proof of Residential Address (Utility Bill not older than 3 months)",
      "Two (2) recent passport photographs"
    ],
    fees: "Transparent tariff aligned with Central Bank of Nigeria guidelines"
  },
  {
    id: "student",
    title: "Student & Campus Accounts",
    icon: GraduationCap,
    category: "Youth & Study",
    rate: "Zero Fees",
    bg: "#f8fafc",
    accent: "#0a1e3f",
    description: "Foundational banking accounts for secondary and university students with zero maintenance fees and study loan access.",
    href: "/personal-banking#student",
    benefits: [
      "Zero monthly maintenance or administrative fees",
      "Complimentary student Verve/Mastercard debit card",
      "24/7 Mobile app banking for instant transfers",
      "Exclusive eligibility for educational support micro-credit",
      "Transparent zero-hidden-fee transaction terms",
      "Campus financial literacy workshops and budgeting tools"
    ],
    requirements: [
      "Valid Student Identification Card or Admission Letter",
      "National Identity Number (NIN) or BVN",
      "Two (2) recent passport photographs",
      "Verified residential or campus hostel address",
      "Zero initial deposit required to open"
    ],
    fees: "₦0 Monthly maintenance charges"
  }
];

export default function PersonalBanking() {
  const [depositAmount, setDepositAmount] = useState<number>(300000);
  const [tenure, setTenure] = useState<number>(12);

  const annualRate = 0.125;
  const estimatedReturn = Math.round(depositAmount * (annualRate * (tenure / 12)));
  const totalMaturity = depositAmount + estimatedReturn;

  const formatNaira = (val: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <Layout>
      {/* ── 1. Editorial Hero with 3D Floating Showcase ── */}
      <section className="relative bg-[#f8fafc] text-[#0a1e3f] pt-10 pb-14 sm:pt-14 sm:pb-20 border-b border-[#e2e8f0] overflow-hidden">
        {/* Soft Ambient Background Wash */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#0284c7]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#cbd5e1] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Personal Financial Services</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-[1.08]">
                Personal accounts structured for <span className="text-[#0284c7]">clarity</span> and <span className="text-[#0284c7]">growth</span>.
              </h1>

              <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                Experience dependable retail banking with zero hidden ledger fees, predictable deposit interest, instant debit card issuance, and 24/7 digital access.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs px-6 h-11 shadow-brand justify-center"
                >
                  <Link to="/contact">
                    <span>Open an Account</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="border-slate-300 hover:bg-slate-100 text-[#0a1e3f] font-semibold text-xs px-5 h-11 justify-center"
                >
                  <Link to="/branches">
                    Locate Nearest Branch
                  </Link>
                </Button>
              </div>

              {/* Regulatory Assurance Strip */}
              <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold text-[#0a1e3f]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Central Bank Licensed
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 font-semibold text-[#0a1e3f]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  NDIC Insured Deposits
                </span>
                <span>&bull;</span>
                <span className="text-slate-500">Zero opening fee</span>
              </div>
            </div>

            {/* Right 3D Perspective Card Showcase (5 cols) */}
            <div className="lg:col-span-5 perspective-1000 relative">
              <div className="relative rounded-3xl bg-gradient-to-tr from-[#0a1e3f] via-[#0f2a50] to-[#081730] p-7 text-white shadow-2xl border border-blue-400/20 transform-3d-card overflow-hidden">
                {/* Metallic Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <span className="text-[10px] text-blue-200/70 uppercase tracking-widest font-semibold block">
                      RIMA Microfinance Bank
                    </span>
                    <span className="font-heading text-sm font-bold tracking-wide text-white">
                      Target Yield & Debit Account
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#0284c7] flex items-center justify-center font-bold text-xs shadow-md">
                    R
                  </div>
                </div>

                {/* EMV Chip & Contactless */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-10 h-7 rounded-md bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 border border-amber-600/40 shadow-inner flex items-center justify-center">
                    <div className="w-7 h-4 border border-black/30 rounded-xs grid grid-cols-2 gap-0.5">
                      <div className="border-r border-black/20"></div>
                      <div></div>
                    </div>
                  </div>
                  <Wifi className="h-5 w-5 text-blue-200/70 rotate-90" />
                </div>

                {/* Account Number */}
                <div className="font-mono text-base tracking-[0.2em] text-white/95 mb-5 relative z-10 font-medium">
                  5399 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 8821
                </div>

                {/* Card Bottom Row */}
                <div className="flex justify-between items-end text-[10px] text-blue-200/80 relative z-10 pt-3 border-t border-white/10">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-blue-200/50 block">Account Holder</span>
                    <span className="font-semibold text-white/90 text-xs">C. BRIGGS</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] uppercase tracking-widest text-blue-200/50 block">Tier Status</span>
                    <span className="font-bold text-emerald-400 text-xs">TIER 3 FULL KYC</span>
                  </div>
                  <span className="font-bold text-white tracking-widest text-xs bg-white/15 px-2 py-0.5 rounded">
                    VERVE
                  </span>
                </div>
              </div>

              {/* Floating Interest Chip */}
              <div className="absolute -bottom-4 -left-3 sm:-left-4 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2.5 animate-float-slow">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#0a1e3f] block leading-tight">12.5% Annual Yield</span>
                  <span className="text-slate-500 text-[10px]">Quarterly Payouts</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Interactive 3D Deposit & Yield Calculator ── */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-[#0a1e3f] text-white p-6 sm:p-10 lg:p-12 border border-blue-900 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#38bdf8] text-xs font-semibold uppercase tracking-wider">
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Interactive Yield Estimator</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Calculate your quarterly savings returns.
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/75 leading-relaxed max-w-xl">
                  Adjust the deposit amount and tenure to estimate your interest earnings on RIMA Bank Target Yield savings accounts.
                </p>

                {/* Sliders */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-100/70">Deposit Principal</span>
                      <span className="font-heading font-bold text-white text-sm">{formatNaira(depositAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min={50000}
                      max={5000000}
                      step={50000}
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-100/70">Tenure</span>
                      <span className="font-heading font-bold text-white text-sm">{tenure} Months</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[3, 6, 12, 24].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setTenure(m)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                            tenure === m
                              ? "bg-[#0284c7] text-white border-[#38bdf8]"
                              : "bg-white/5 text-blue-100/70 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {m} Months
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculated Results Card */}
              <div className="lg:col-span-5 bg-[#0c2445] p-6 sm:p-8 rounded-2xl border border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <span className="text-blue-200/60 font-semibold uppercase">Estimated Output</span>
                  <span className="text-emerald-400 font-bold">12.5% Indicative</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center text-blue-100/70">
                    <span>Estimated Total Interest:</span>
                    <span className="font-heading font-bold text-emerald-400 text-sm">+{formatNaira(estimatedReturn)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Estimated Maturity:</span>
                    <span className="font-heading font-bold text-[#38bdf8] text-base sm:text-lg">{formatNaira(totalMaturity)}</span>
                  </div>
                </div>

                <Button
                  variant="pill"
                  size="default"
                  asChild
                  className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs h-11 shadow-brand"
                >
                  <Link to="/contact">
                    <span>Open Yield Account</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Account Products Portfolio Grid ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] block mb-1">
              Account Categories
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
              Choose the personal account tailored to your life.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personalServices.map((service) => (
              <div
                key={service.id}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      <service.icon className="h-5 w-5" />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-black/5"
                      style={{ backgroundColor: service.bg, color: service.accent }}
                    >
                      {service.rate}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#0a1e3f] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-4 pt-3.5 border-t border-slate-100">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#0a1e3f]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Accordion type="single" collapsible className="w-full mb-6">
                    <AccordionItem value="requirements" className="border-slate-200">
                      <AccordionTrigger className="py-2 text-xs font-semibold text-[#0a1e3f] hover:no-underline">
                        Opening Documentation Requirements
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                          {service.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="fees" className="border-slate-200">
                      <AccordionTrigger className="py-2 text-xs font-semibold text-[#0a1e3f] hover:no-underline">
                        Tariff & Fee Schedule
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-slate-600">
                        {service.fees}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button
                    variant="pill"
                    size="default"
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 shadow-xs"
                    asChild
                  >
                    <Link to="/contact">
                      <span>Apply for Account</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Statutory Protection Banner ── */}
      <section className="py-10 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-b border-slate-200 py-3">
            <div className="py-4 md:px-5 flex items-start gap-3.5">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-sm font-bold text-[#0a1e3f] mb-0.5">Central Bank Licensed</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Full compliance with CBN statutory capital ratios and customer protection standards.</p>
              </div>
            </div>
            <div className="py-4 md:px-5 flex items-start gap-3.5">
              <Landmark className="h-5 w-5 text-[#0284c7] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-sm font-bold text-[#0a1e3f] mb-0.5">NDIC Insured</h4>
                <p className="text-xs text-slate-600 leading-relaxed">All eligible customer deposits insured by the Nigeria Deposit Insurance Corporation.</p>
              </div>
            </div>
            <div className="py-4 md:px-5 flex items-start gap-3.5">
              <CreditCard className="h-5 w-5 text-[#0284c7] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-sm font-bold text-[#0a1e3f] mb-0.5">Nationwide Interoperability</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Inter-bank switching and card settlements supported across all Nigerian commercial ATMs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

