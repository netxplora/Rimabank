import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight, 
  PiggyBank, 
  CheckCircle2, 
  HelpCircle, 
  Lock, 
  Smartphone, 
  Coins, 
  GraduationCap,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const modules = [
  {
    id: "savings-discipline",
    icon: PiggyBank,
    title: "Savings & Wealth Building",
    category: "Personal Finance",
    badge: "Essential Guide",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    borderHover: "hover:border-emerald-200",
    summary: "Master the fundamentals of cash reserves, emergency safety nets, and goal-oriented savings.",
    lessons: [
      "The 50/30/20 Rule: Balancing daily living costs, reinvestment, and emergency savings.",
      "Target Goal Savings: How automating deduction dates removes impulse spending.",
      "Compound Yields: Understanding how monthly interest calculation multiplies your capital.",
      "Avoiding Unregulated Schemes: Why banking with a CBN-licensed institution protects your principal."
    ]
  },
  {
    id: "responsible-borrowing",
    icon: TrendingUp,
    title: "Borrowing & Credit Management",
    category: "Credit Advisory",
    badge: "Smart Financing",
    color: "text-[#0284c7]",
    bg: "bg-sky-50",
    borderHover: "hover:border-sky-200",
    summary: "Learn how to assess loan affordability, calculate real repayment burdens, and protect your credit rating.",
    lessons: [
      "Evaluating Debt Capacity: Ensuring loan installments do not exceed 33% of verified monthly profits.",
      "Interest Rate Transparency: Understanding flat monthly rates vs. annual reducing balance terms.",
      "Working Capital vs. Asset Loans: Choosing the right facility for inventory restock vs. machinery.",
      "Guarantor Responsibilities: What every guarantor must verify before endorsing a loan application."
    ]
  },
  {
    id: "sme-cashflow",
    icon: Briefcase,
    title: "Small Business Financial Management",
    category: "Enterprise Growth",
    badge: "For Traders & SMEs",
    color: "text-amber-600",
    bg: "bg-amber-50",
    borderHover: "hover:border-amber-200",
    summary: "Practical accounting habits for shop owners, traders, and registered small enterprises.",
    lessons: [
      "Separating Personal & Business Cash: Why paying yourself a fixed salary preserves business capital.",
      "Daily POS & Cash Reconciliation: Tracking daily register receipts to prevent leakage.",
      "Supplier Negotiations: Using prompt payment discounts to reduce inventory costs.",
      "CAC Registration Benefits: How formalized business records unlock commercial credit lines."
    ]
  },
  {
    id: "digital-safety",
    icon: ShieldCheck,
    title: "Digital Safety & Fraud Prevention",
    category: "Cyber Awareness",
    badge: "Security Protocol",
    color: "text-purple-600",
    bg: "bg-purple-50",
    borderHover: "hover:border-purple-200",
    summary: "Protect your accounts, ATM cards, and mobile banking sessions from fraud and social engineering.",
    lessons: [
      "PIN & OTP Confidentiality: Why no genuine bank staff will ever request your 4-digit PIN or OTP.",
      "Fake Credit Alerts: How to verify actual ledger balance updates on the mobile app or USSD.",
      "Phishing SMS & Fake Calls: Identifying scam messages pretending to be BVN validation updates.",
      "Immediate Card Blocking: How to freeze lost or stolen cards instantly via *966*808#."
    ]
  }
];

const glossaryTerms = [
  { term: "BVN (Bank Verification Number)", desc: "A unique 11-digit biometric identifier issued by the Central Bank of Nigeria to protect account holders against identity theft across all financial institutions." },
  { term: "KYC (Know Your Customer)", desc: "The regulatory process of verifying customer identity and address, categorized into Tier 1 (basic), Tier 2 (standard), and Tier 3 (unlimited)." },
  { term: "NDIC Insurance", desc: "Nigeria Deposit Insurance Corporation coverage that safeguards depositor funds in licensed banks up to statutory guaranteed limits." },
  { term: "NIBSS Instant Payment (NIP)", desc: "The electronic payment switch enabling immediate, real-time fund transfers between different Nigerian financial institutions." }
];

export default function FinancialEducation() {
  return (
    <Layout
      title="Financial Education | RIMA Microfinance Bank"
      description="Practical, grounded financial education for individuals, market traders, and small business owners in Rivers State."
    >
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-5">
                <BookOpen className="w-3.5 h-3.5" />
                Financial Literacy & Guidance
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight mb-6 leading-tight">
                Practical financial knowledge to build lasting stability.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                Empowering individuals, families, and business owners across Rivers State with simple, actionable insights into smart budgeting, responsible credit, enterprise accounting, and fraud defense.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-4">
                <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-7" asChild>
                  <a href="#modules">Explore Learning Modules</a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-slate-200 text-[#0a1e3f] hover:bg-slate-50 px-6" asChild>
                  <Link to="/contact">Speak to a Banking Advisor</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section id="modules" className="py-12 sm:py-16 lg:py-20 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Knowledge Hub
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Essential Financial Literacy Modules
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Curated practical guidance designed to help you make sound, grounded decisions in your personal and commercial life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {modules.map((m) => (
              <div 
                key={m.id}
                className={`bg-white border border-slate-200 rounded-3xl p-8 transition-all duration-300 ${m.borderHover} hover:shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${m.bg} ${m.color} flex items-center justify-center shadow-sm`}>
                      <m.icon className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {m.badge}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#0284c7] mb-1">{m.category}</div>
                  <h3 className="font-heading font-bold text-2xl text-[#0a1e3f] mb-3">{m.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{m.summary}</p>

                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Key Lessons</h4>
                    <ul className="space-y-3">
                      {m.lessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0a1e3f]">
                          <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${m.color}`} />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Free Educational Resource</span>
                  <Link to="/contact" className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1">
                    <span>Ask an Advisor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banking Glossary */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Banking Terminology
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Clear terms for everyday banking
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We believe in total transparency. Here is a clear guide to common financial and regulatory terms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {glossaryTerms.map((item, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-200">
                <h3 className="font-heading font-bold text-base text-[#0a1e3f] mb-2">{item.term}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 bg-[#0a1e3f] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">Have specific questions regarding your finances?</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Our customer care team and branch credit officers are always ready to answer your questions and help you plan effectively.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-8" asChild>
                <Link to="/contact">Contact Our Team</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/20 text-white hover:bg-white/10" asChild>
                <Link to="/faq">Read Common FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
