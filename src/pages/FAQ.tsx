import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CreditCard, Building2, Smartphone, ArrowRight, Search, HelpCircle, Phone, Globe, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    id: "accounts",
    title: "Account Opening & KYC",
    icon: Building2,
    color: "#0284c7",
    faqs: [
      {
        q: "What documentation is required to open an account?",
        a: "You need: (1) A valid government-issued ID (NIN, Voter's Card, Passport, or Driver's License), (2) Your Bank Verification Number (BVN), (3) A recent utility bill not older than 3 months, and (4) Two recent passport photographs."
      },
      {
        q: "Can I open an account without visiting a branch?",
        a: "A Tier 1 account can be opened with just your BVN and a verified mobile number. For full account access and higher transaction limits, you will need to complete KYC at any RIMA branch."
      },
      {
        q: "Are there account opening fees?",
        a: "No. Opening a standard savings account with RIMA MFB carries no administrative fees or mandatory opening charges."
      },
      {
        q: "How do I upgrade my KYC tier for higher transfer limits?",
        a: "Submit your documents at any RIMA branch. Our compliance desk processes upgrades within one business day."
      }
    ]
  },
  {
    id: "savings",
    title: "Savings & Deposits",
    icon: CreditCard,
    color: "#16a34a",
    faqs: [
      {
        q: "What types of savings accounts does RIMA offer?",
        a: "We offer Regular Savings accounts for everyday use, Target Savings for specific goals, and Fixed Deposit accounts for customers who want to lock funds away for a fixed period to earn higher returns."
      },
      {
        q: "Is there a minimum balance required?",
        a: "Our basic savings accounts require no mandatory minimum balance. Please contact us or visit a branch for specific product terms."
      },
      {
        q: "How is interest on savings calculated and paid?",
        a: "Interest is calculated on your daily ledger balance and credited to your account on a monthly or quarterly basis depending on your account type."
      }
    ]
  },
  {
    id: "loans",
    title: "Loans & Financing",
    icon: CreditCard,
    color: "#8b5cf6",
    faqs: [
      {
        q: "Who is eligible to apply for a loan?",
        a: "Customers who have maintained an active account with consistent transactions for at least 3 months are typically eligible for credit assessment. Business loan eligibility also considers your operating history and cash flow."
      },
      {
        q: "What loan products are available?",
        a: "We offer Microcredit for market traders, SME Working Capital for businesses, Commercial Asset Financing for equipment and vehicles, and Salary Advance for eligible employees."
      },
      {
        q: "How long does loan approval take?",
        a: "Micro-loans are typically reviewed within 48 hours following document completion. Larger SME facilities may take up to 5 business days for full assessment."
      },
      {
        q: "Can I repay a loan early?",
        a: "Yes. Early repayment is permitted upon request. Contact your account officer or visit any branch to arrange early settlement."
      }
    ]
  },
  {
    id: "mobile",
    title: "Mobile App & Internet Banking",
    icon: Smartphone,
    color: "#0284c7",
    faqs: [
      {
        q: "What can I do on the RIMA Mobile Banking App?",
        a: "You can check your balance, transfer funds to any Nigerian bank, pay bills, buy airtime and data, manage your savings, and download account statements."
      },
      {
        q: "How do I reset my mobile app password or PIN?",
        a: "Select 'Forgot Password' on the login screen. A secure OTP will be sent to your registered phone number. You can also visit any branch for an instant reset."
      },
      {
        q: "Is the mobile app secure?",
        a: "Yes. The app uses PIN and OTP authentication, device verification, and encrypted connections to protect your account and transactions."
      }
    ]
  },
  {
    id: "ussd",
    title: "USSD Banking",
    icon: Phone,
    color: "#0a1e3f",
    faqs: [
      {
        q: "What is the RIMA USSD code?",
        a: "The official RIMA USSD code is *966*808#. Dial this from the mobile number registered to your RIMA account to access banking services without internet."
      },
      {
        q: "What services are available on USSD?",
        a: "You can check your account balance, transfer money to any bank, buy airtime and data, pay utility bills, and make other everyday banking transactions."
      },
      {
        q: "Does USSD banking work on any phone?",
        a: "Yes. USSD works on any mobile phone — smartphone or basic feature phone — as long as you have a SIM card registered to your RIMA account."
      }
    ]
  },
  {
    id: "agent",
    title: "Agent Banking",
    icon: Users,
    color: "#16a34a",
    faqs: [
      {
        q: "What can I do at a RIMA Agent Banking outlet?",
        a: "At a RIMA agent location you can deposit cash, withdraw cash using your debit card, open a basic account, and make bill payments."
      },
      {
        q: "How do I find a RIMA Agent near me?",
        a: "Visit our Branches page or contact us directly to find the nearest RIMA agent location in your area."
      },
      {
        q: "How do I become a RIMA Banking Agent?",
        a: "You need a verifiable commercial premises, valid ID, BVN, proof of address, and adequate operational float. Visit our Agent Banking page or any RIMA branch to apply."
      }
    ]
  },
  {
    id: "cards",
    title: "ATM & Debit Cards",
    icon: CreditCard,
    color: "#d97706",
    faqs: [
      {
        q: "How do I get a RIMA debit card?",
        a: "Your Verve debit card is issued at any RIMA branch upon account opening. Bring your valid ID and account details."
      },
      {
        q: "Where can I use my RIMA debit card?",
        a: "Your card works at all Nigerian ATMs and POS terminals nationwide through the Verve network."
      },
      {
        q: "What should I do if I lose my card?",
        a: "Contact our customer support immediately or visit any branch to block your card and request a replacement."
      }
    ]
  },
  {
    id: "security",
    title: "Security & Fraud",
    icon: Globe,
    color: "#dc2626",
    faqs: [
      {
        q: "What should I do if I suspect unauthorized access to my account?",
        a: "Contact our customer support team immediately. You can also visit the nearest RIMA branch to freeze your account and initiate an investigation."
      },
      {
        q: "How does RIMA protect my transactions?",
        a: "All electronic transactions are secured with OTP verification, PIN authentication, and encrypted connections. We also monitor accounts for unusual activity."
      },
      {
        q: "Will RIMA ever ask for my PIN or password?",
        a: "No. RIMA Bank will never call, email, or message you asking for your PIN, password, or OTP. Never share these with anyone — including people claiming to be RIMA staff."
      }
    ]
  },
  {
    id: "branches",
    title: "Branches & Support",
    icon: MapPin,
    color: "#0284c7",
    faqs: [
      {
        q: "Where are RIMA branches located?",
        a: "Our branches are located in Port Harcourt and across Rivers State. Visit our Branches page for the full list of locations and operating hours."
      },
      {
        q: "What are RIMA's banking hours?",
        a: "Branch hours vary by location. Most branches operate Monday to Friday from 8:00am to 4:00pm. Contact us or visit the Branches page for specific hours."
      },
      {
        q: "How do I contact RIMA Bank customer support?",
        a: "You can reach us by phone, email, or by visiting any branch. All contact details are available on our Contact page."
      }
    ]
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("accounts");

  const activeCategoryData = faqCategories.find(c => c.id === activeCategory) || faqCategories[0];

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return activeCategoryData.faqs;
    return faqCategories.flatMap(c => c.faqs).filter(f =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeCategory, activeCategoryData]);

  const isSearching = searchQuery.length > 0;
  const displayFaqs = isSearching
    ? faqCategories.flatMap(c => c.faqs).filter(f =>
        f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeCategoryData.faqs;

  return (
    <Layout
      title="FAQ | RIMA Microfinance Bank"
      description="Find answers to common questions about RIMA Microfinance Bank accounts, savings, loans, mobile banking, USSD, agent banking, cards and security."
    >
      {/* Hero */}
      <section className="relative bg-white py-14 sm:py-20 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block">
              Help & Support
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0a1e3f] tracking-tight">
              Frequently asked questions.
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Find answers to common questions about accounts, savings, loans, and the ways to bank with RIMA.
            </p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search questions (e.g. open account, USSD, PIN reset)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 rounded-full border-slate-200 bg-[#f8fafc] text-sm text-[#0a1e3f] focus:bg-white focus:border-[#0284c7] transition-all"
              />
              {searchQuery && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  {displayFaqs.length} {displayFaqs.length === 1 ? "result" : "results"}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left — Category Nav */}
            {!isSearching && (
              <div className="lg:col-span-3 lg:sticky lg:top-24">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3 px-1">
                  Categories
                </span>
                <nav className="space-y-1">
                  {faqCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                          activeCategory === cat.id
                            ? "bg-[#f0f9ff] text-[#0284c7] border border-[#bae6fd] font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-[#0a1e3f]"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" style={{ color: activeCategory === cat.id ? cat.color : undefined }} />
                        {cat.title}
                      </button>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Right — FAQ Accordion */}
            <div className={`${isSearching ? "lg:col-span-12" : "lg:col-span-9"} space-y-4`}>
              {!isSearching && (
                <h2 className="font-heading text-xl font-bold text-[#0a1e3f] pb-3 border-b border-slate-100">
                  {activeCategoryData.title}
                </h2>
              )}
              {isSearching && (
                <p className="text-sm text-slate-500 pb-3 border-b border-slate-100">
                  Showing {displayFaqs.length} result{displayFaqs.length !== 1 ? "s" : ""} for "{searchQuery}"
                </p>
              )}

              {displayFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full divide-y divide-slate-100">
                  {displayFaqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-b-0 py-1">
                      <AccordionTrigger className="text-left font-heading font-semibold text-sm text-[#0a1e3f] hover:text-[#0284c7] py-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-600 leading-relaxed pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-16 bg-[#f8fafc] rounded-2xl border border-slate-100 space-y-3">
                  <HelpCircle className="h-8 w-8 text-slate-300 mx-auto" />
                  <h4 className="font-heading font-semibold text-[#0a1e3f]">No results found</h4>
                  <p className="text-xs text-slate-400">Try a different term or contact our support team.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl font-bold text-[#0a1e3f]">
              Still have questions?
            </h3>
            <p className="text-sm text-slate-500">
              Our customer support team is available to help with account questions, loan applications, and technical issues.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button variant="pill" size="lg" asChild className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md">
                <Link to="/contact">
                  Contact Support
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outlineNeutral" size="lg" asChild className="rounded-full">
                <Link to="/branches">Visit a Branch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
