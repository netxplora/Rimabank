import { Layout } from "@/components/layout/Layout";
import { useLocation } from "react-router-dom";
import { ShieldAlert, BookOpen, AlertCircle, MessageSquare, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const legalContent = {
  privacy: {
    title: "Privacy & Data Protection Policy",
    icon: <ShieldAlert className="h-6 w-6 text-[#f73b20]" />,
    content: (
      <div className="space-y-6 text-[#360802]/80 text-xs leading-relaxed">
        <p className="text-[11px] text-[#ababab] font-medium pb-4 border-b border-[#e7dcdb]/60">
          Last updated: September 2026 &bull; Compliant with Nigeria Data Protection Act (NDPA)
        </p>

        <section>
          <p className="text-sm font-normal text-[#360802] leading-relaxed">
            At Rima Microfinance Bank ("Rima MFB", "we", "us", or "our"), safeguarding your personal and financial data is fundamental to our banking mandate. This Privacy Policy details how we collect, process, and protect your information across our digital platforms, branch offices, and agency banking locations.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-base font-semibold text-[#360802] flex items-center gap-2">
            <span className="bg-[#fdedea] text-[#f73b20] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            Information We Collect
          </h3>
          <p>We collect essential customer data to provide secure banking operations and comply with regulatory directives:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#360802]/70">
            <li><strong>Personal Identity:</strong> Full Name, Date of Birth, Gender, Marital Status, and Nationality.</li>
            <li><strong>Contact Details:</strong> Verified Residential Address, Email Address, and Mobile Phone Numbers.</li>
            <li><strong>KYC Verification:</strong> Bank Verification Number (BVN), National Identity Number (NIN), Government ID (Voter's Card, Passport, Driver's License), and utility proofs.</li>
            <li><strong>Financial Records:</strong> Transaction ledger history, loan repayment status, credit bureau records, and deposit balances.</li>
            <li><strong>Technical Telemetry:</strong> IP addresses, operating device identifiers, login timestamps, and session logs.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-base font-semibold text-[#360802] flex items-center gap-2">
            <span className="bg-[#fdedea] text-[#f73b20] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Purposes of Data Processing
          </h3>
          <p>Customer data is processed strictly for legitimate financial service delivery:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#360802]/70">
            <li><strong>Account Administration:</strong> Account origination, transaction settlement, and card lifecycle management.</li>
            <li><strong>Regulatory Compliance:</strong> Fulfilling statutory Anti-Money Laundering (AML) and Combating the Financing of Terrorism (CFT) mandates of the Central Bank of Nigeria (CBN).</li>
            <li><strong>Fraud Prevention:</strong> Real-time transaction surveillance and unauthorized access mitigation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-base font-semibold text-[#360802] flex items-center gap-2">
            <span className="bg-[#fdedea] text-[#f73b20] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Data Protection Rights Under the NDPA
          </h3>
          <p>As a data subject under the Nigeria Data Protection Act, you possess the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#360802]/70">
            <li>Request full disclosure of personal records retained in our database.</li>
            <li>Request rectification of inaccurate KYC information.</li>
            <li>Object to non-essential commercial or marketing communications.</li>
          </ul>
        </section>

        <div className="p-6 rounded-2xl bg-[#fdedea] border border-[#e7dcdb] mt-8">
          <h4 className="font-heading text-xs font-bold text-[#360802] mb-1">Data Protection Officer</h4>
          <p className="text-[11px] text-[#ababab]">
            Direct inquiries regarding your privacy rights to <a href="mailto:dpo@rimamfb.com" className="text-[#f73b20] font-semibold underline">dpo@rimamfb.com</a>.
          </p>
        </div>
      </div>
    )
  },
  terms: {
    title: "General Terms of Service",
    icon: <BookOpen className="h-6 w-6 text-[#f73b20]" />,
    content: (
      <div className="space-y-6 text-[#360802]/80 text-xs leading-relaxed">
        <p className="text-[11px] text-[#ababab] font-medium pb-4 border-b border-[#e7dcdb]/60">
          Effective Date: September 2026 &bull; Regulated by the Central Bank of Nigeria (CBN)
        </p>

        <section>
          <p className="text-sm font-normal text-[#360802] leading-relaxed">
            By operating an account or accessing digital banking services with Rima Microfinance Bank, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-base font-semibold text-[#360802] flex items-center gap-2">
            <span className="bg-[#fdedea] text-[#f73b20] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            Account Operation & Maintenance
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-[#360802]/70">
            <li><strong>Eligibility:</strong> Account holders must be at least 18 years of age. Minor accounts are operated through legal guardians.</li>
            <li><strong>Accuracy of Records:</strong> You agree to provide authentic identification and update residential details within 30 days of changes.</li>
            <li><strong>Security Obligations:</strong> You are solely responsible for safeguarding your confidential transaction PINs, passwords, and one-time passwords (OTP).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-base font-semibold text-[#360802] flex items-center gap-2">
            <span className="bg-[#fdedea] text-[#f73b20] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Transaction Limits & AML Compliance
          </h3>
          <p>
            Transactions are governed by statutory limits based on your verified KYC Tier. We reserve the authority to hold or decline transactions flagged by automated anti-fraud mechanisms.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-base font-semibold text-[#360802] flex items-center gap-2">
            <span className="bg-[#fdedea] text-[#f73b20] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Fees, Charges & Tariffs
          </h3>
          <p>
            Banking operations are executed according to the approved CBN Guide to Bank Charges. Tariff modifications are communicated via official electronic mail at least 30 calendar days in advance.
          </p>
        </section>
      </div>
    )
  },
  cookies: {
    title: "Cookie & Tracking Policy",
    icon: <AlertCircle className="h-6 w-6 text-[#f73b20]" />,
    content: (
      <div className="space-y-6 text-[#360802]/80 text-xs leading-relaxed">
        <p className="text-[11px] text-[#ababab] font-medium pb-4 border-b border-[#e7dcdb]/60">
          Last updated: September 2026
        </p>

        <section>
          <p className="text-sm font-normal text-[#360802] leading-relaxed">
            Rima Microfinance Bank uses encrypted cookies and session tokens to ensure website security, prevent session hijacking, and maintain authentication integrity.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-base font-semibold text-[#360802]">Cookie Classifications</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#fdedea] border border-[#e7dcdb]">
              <strong className="text-[#360802] block mb-1">Essential Security Cookies</strong>
              Required for session management, internet banking encryption, and CSRF token validation.
            </div>
            <div className="p-4 rounded-xl bg-[#fdedea] border border-[#e7dcdb]">
              <strong className="text-[#360802] block mb-1">Performance & Telemetry Cookies</strong>
              Enable our technical team to monitor system latency, page load metrics, and UI responsiveness.
            </div>
          </div>
        </section>
      </div>
    )
  },
  complaints: {
    title: "Dispute Resolution & Complaints Framework",
    icon: <MessageSquare className="h-6 w-6 text-[#f73b20]" />,
    content: (
      <div className="space-y-6 text-[#360802]/80 text-xs leading-relaxed">
        <p className="text-[11px] text-[#ababab] font-medium pb-4 border-b border-[#e7dcdb]/60">
          In compliance with the CBN Consumer Protection Framework
        </p>

        <section>
          <p className="text-sm font-normal text-[#360802] leading-relaxed">
            We are dedicated to resolving all customer disputes efficiently and transparently through a structured escalation process.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-base font-semibold text-[#360802]">Resolution Timelines</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-[#360802]/70">
            <li><strong>Failed ATM / POS Dispense Errors:</strong> Resolved within 24 to 48 business hours.</li>
            <li><strong>Interbank Electronic Transfer Inquiries:</strong> Reconciled within 72 hours via NIBSS.</li>
            <li><strong>Account & Credit Discrepancies:</strong> Investigated and answered within 5 business days.</li>
          </ul>
        </section>

        <div className="p-6 rounded-2xl bg-white border border-[#e7dcdb] shadow-lift space-y-2 mt-6">
          <h4 className="font-heading text-xs font-bold text-[#360802]">Escalation Contact</h4>
          <p className="text-[11px] text-[#ababab]">
            If a dispute remains unresolved after 14 days, you may escalate the matter directly to the Central Bank of Nigeria Consumer Protection Department via <a href="mailto:cpd@cbn.gov.ng" className="text-[#f73b20] underline">cpd@cbn.gov.ng</a>.
          </p>
        </div>
      </div>
    )
  }
};

type TabKey = keyof typeof legalContent;

export default function Legal() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("privacy");

  useEffect(() => {
    const path = location.pathname.replace('/', '') as TabKey;
    if (['privacy', 'terms', 'cookies', 'complaints'].includes(path)) {
      setActiveTab(path);
    }
  }, [location.pathname]);

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-wider">
              <span>Regulatory Governance</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#360802] tracking-tight leading-[1.05]">
              Legal & <span className="text-[#f73b20]">regulatory disclosures</span>.
            </h1>

            <p className="text-[#360802]/80 text-base sm:text-lg leading-relaxed">
              Statutory operational policies, data protection frameworks, and customer dispute resolution standards.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Sidebar Tabs (4 cols) */}
            <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#ababab] block mb-3 px-3">
                Legal Documents
              </span>
              {(Object.keys(legalContent) as TabKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center justify-between w-full px-5 py-3.5 rounded-2xl text-xs font-semibold transition-all ${
                    activeTab === key
                      ? "bg-[#360802] text-white shadow-md transform -translate-y-0.5"
                      : "bg-white text-[#360802]/80 hover:bg-[#fdedea] border border-[#e7dcdb]"
                  }`}
                >
                  <span className="capitalize">{legalContent[key].title}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </button>
              ))}
            </div>

            {/* Content Display (8 cols) */}
            <div className="lg:col-span-8">
              <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-[#e7dcdb] space-y-6">
                <div className="flex items-center gap-3 pb-5 border-b border-[#e7dcdb]/60">
                  <div className="w-10 h-10 rounded-xl bg-[#fdedea] flex items-center justify-center shadow-xs">
                    {legalContent[activeTab].icon}
                  </div>
                  <h2 className="font-heading text-2xl font-semibold text-[#360802]">
                    {legalContent[activeTab].title}
                  </h2>
                </div>

                <div>
                  {legalContent[activeTab].content}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
