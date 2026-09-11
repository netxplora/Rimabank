import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  Laptop, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Users, 
  FileSpreadsheet, 
  Building, 
  Key, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const portalFeatures = [
  {
    icon: Building,
    title: "Multi-User Corporate Governance",
    desc: "Assign distinct maker and checker roles, dual-signatory mandates, and custom approval workflows for corporate payments.",
    color: "text-[#0284c7]",
    bg: "bg-sky-50"
  },
  {
    icon: FileSpreadsheet,
    title: "Bulk Salary & Vendor Disbursal",
    desc: "Upload Excel/CSV schedules for automated payroll execution and multi-account supplier settlement in a single batch.",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    icon: FileText,
    title: "Audit & Tax Statements",
    desc: "Download official account histories in Excel or certified PDF formats, formatted specifically for accounting and tax compliance.",
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    icon: Key,
    title: "Two-Factor Token Authentication",
    desc: "Every sensitive high-value transaction requires mandatory 2FA OTP or hardware token authorization for ironclad protection.",
    color: "text-amber-600",
    bg: "bg-amber-50"
  }
];

export default function InternetBanking() {
  return (
    <Layout
      title="Internet Banking Portal | RIMA Microfinance Bank"
      description="Secure web banking portal for personal and corporate customers. Manage bulk transfers, staff payroll, and corporate treasury from your browser."
    >
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284c7] text-xs font-semibold uppercase tracking-wider">
                <Laptop className="w-3.5 h-3.5" />
                Enterprise & Retail Web Portal
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                Complete financial control directly from your browser.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Manage high-volume corporate payments, schedule staff payroll, generate detailed financial statements, and monitor account liquidity with RIMA Internet Banking.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md px-7" asChild>
                  <Link to="/contact">
                    Request Portal Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-slate-200 text-[#0a1e3f] hover:bg-slate-50 px-6" asChild>
                  <Link to="/business-banking">Explore SME Accounts</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0a1e3f]">256-bit</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">SSL Encryption</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#0284c7]">Batch</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Automated Payroll</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-600">Dual</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Signatory Mandates</div>
                </div>
              </div>
            </motion.div>

            {/* Desktop Portal Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="w-full bg-[#0a1e3f] rounded-3xl p-6 text-white shadow-2xl border border-blue-400/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#0284c7]/20 rounded-full blur-2xl pointer-events-none" />

                {/* Browser Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 text-xs text-blue-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-white/90 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    ebank.rimabank.com
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">256-BIT SSL</span>
                </div>

                {/* Dashboard Snapshot */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
                  <span className="text-[10px] text-blue-200 uppercase font-bold block">Enterprise Treasury Overview</span>
                  <div className="font-heading font-bold text-2xl text-white my-1">
                    ₦12,450,800.00
                  </div>
                  <div className="flex justify-between text-[11px] text-blue-200 pt-2 border-t border-white/10">
                    <span>Rivers State Commercial Mandate</span>
                    <span className="text-emerald-400 font-semibold">Reconciled</span>
                  </div>
                </div>

                {/* Batch Actions */}
                <div className="space-y-2.5 mb-6 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet className="w-4 h-4 text-[#38bdf8]" />
                      <span>Monthly Staff Payroll Batch (48 Staff)</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Approved</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Building className="w-4 h-4 text-amber-400" />
                      <span>Vendor Clearance Settlement</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Pending Signatory B</span>
                  </div>
                </div>

                <Button className="w-full rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold" asChild>
                  <Link to="/contact">Log in to Internet Banking</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block mb-3">
              Portal Capabilities
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0a1e3f] tracking-tight mb-4">
              Enterprise tools designed for speed and accountability
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Equipped with corporate governance features to streamline operations for medium enterprises, churches, schools, and institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {portalFeatures.map((f) => (
              <div 
                key={f.title}
                className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-sky-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-5 shadow-sm`}>
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0a1e3f] mb-3">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Sign-Up & Security Charter */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-[#0a1e3f] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-300 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/60 inline-block mb-3">
                  Account Activation
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  How to activate internet banking for your organization
                </h2>
                <p className="text-blue-100 text-sm leading-relaxed max-w-2xl mb-6">
                  Internet banking credentials and hardware OTP tokens are issued upon submission of the standard E-Banking Mandate Form signed by authorized board signatories.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Duly executed E-Banking Corporate Mandate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Designation of Maker and Checker Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Issuance of Encrypted 2FA Security Tokens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom Daily Transaction Limit Setup</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <Button size="lg" className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white w-full" asChild>
                  <Link to="/contact">Request Corporate Mandate Form</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-white/20 text-white hover:bg-white/10 w-full" asChild>
                  <Link to="/branches">Visit Branch Operations</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
