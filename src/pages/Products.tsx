import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Wallet,
  Building2,
  CreditCard,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const savingsProducts = [
  {
    name: "Regular Savings Account",
    description: "Build capital with structured deposit yields and zero hidden charges",
    features: ["No mandatory minimum balance", "Free instant debit card", "24/7 mobile banking access", "Interest calculated daily & paid quarterly"],
    rate: "Up to 5% p.a.",
    icon: Wallet,
    category: "Savings",
    bg: "#bcffbb",
    accent: "#34c771"
  },
  {
    name: "Fixed Deposit Placement",
    description: "Lock in guaranteed annualized returns on corporate and personal liquidity",
    features: ["Competitive interest rates", "Flexible tenure (30 to 365 days)", "Principal guaranteed by NDIC", "Immediate interest dispatch"],
    rate: "Up to 12.5% p.a.",
    icon: TrendingUp,
    category: "Term Deposit",
    bg: "#f5ffbb",
    accent: "#0a1e3f"
  },
  {
    name: "Target Savings Account",
    description: "Automate recurring savings towards business expansion or family goals",
    features: ["Automated standing orders", "Structured savings timeline", "Zero monthly maintenance fee", "Completion bonus rates"],
    rate: "6.5% p.a.",
    icon: Shield,
    category: "Target",
    bg: "#f0f7ff",
    accent: "#0284c7"
  }
];

const loanProducts = [
  {
    name: "Commercial SME Loan",
    description: "Working capital facilities to restock inventory and scale regional operations",
    features: ["Facilities up to ₦50 Million", "Structured repayment schedules", "Transparent interest calculation", "Dedicated credit analyst"],
    rate: "From 2.5% monthly",
    icon: Building2,
    category: "Commercial",
    bg: "#bcffbb",
    accent: "#34c771"
  },
  {
    name: "Personal Credit Facility",
    description: "Short-term personal financing for salary earners and professionals",
    features: ["Fast documentation review", "Disbursement within 48 hours", "Direct salary deduction", "No hidden origination fees"],
    rate: "From 3% monthly",
    icon: CreditCard,
    category: "Personal",
    bg: "#f0f7ff",
    accent: "#0284c7"
  },
  {
    name: "Salary Advance",
    description: "Short-term emergency cash advance against upcoming monthly payroll",
    features: ["Up to 50% of net monthly salary", "Same-day approval & credit", "Automatic payroll repayment", "Zero physical collateral"],
    rate: "From 3% flat",
    icon: Clock,
    category: "Advance",
    bg: "#e2e8f0",
    accent: "#477ee9"
  }
];

const accountTypes = [
  {
    name: "Commercial Current Account",
    description: "For corporate checking, vendor transfers, and high transaction limits",
    features: ["Unlimited monthly transactions", "Customized corporate cheque book", "Overdraft line eligibility", "Priority branch teller access"],
    minBalance: "₦10,000",
    icon: Building2,
    category: "Business",
    bg: "#f0f7ff",
    accent: "#0284c7"
  },
  {
    name: "Campus Student Account",
    description: "Zero maintenance fee banking package for tertiary students",
    features: ["₦0 Monthly maintenance charges", "Free debit card issuance", "Mobile app banking access", "Eligible for student loans"],
    minBalance: "₦0",
    icon: GraduationCap,
    category: "Student",
    bg: "#f5ffbb",
    accent: "#0a1e3f"
  }
];

export default function Products() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-[#e2e8f0]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f7ff] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f7ff] border border-[#e2e8f0] text-[#0a1e3f] text-xs font-semibold uppercase tracking-wider">
              <span>Financial Products & Accounts</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
              Banking solutions for <span className="text-[#0284c7]">every requirement</span>.
            </h1>

            <p className="text-[#0a1e3f]/80 text-base sm:text-lg leading-relaxed">
              Explore structured personal deposit accounts, commercial working capital lines, and agency banking infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Tabbed Products Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-white border-b border-[#e2e8f0]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Tabs defaultValue="savings" className="w-full">
            <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              <TabsList className="bg-[#f0f7ff] p-1.5 rounded-full border border-[#e2e8f0] h-auto flex flex-wrap gap-1">
                <TabsTrigger value="savings" className="rounded-full px-5 sm:px-6 py-2.5 text-xs font-semibold uppercase tracking-wider data-[state=active]:bg-[#0a1e3f] data-[state=active]:text-white transition-all">
                  Savings & Deposits
                </TabsTrigger>
                <TabsTrigger value="loans" className="rounded-full px-5 sm:px-6 py-2.5 text-xs font-semibold uppercase tracking-wider data-[state=active]:bg-[#0a1e3f] data-[state=active]:text-white transition-all">
                  Credit & Loans
                </TabsTrigger>
                <TabsTrigger value="accounts" className="rounded-full px-5 sm:px-6 py-2.5 text-xs font-semibold uppercase tracking-wider data-[state=active]:bg-[#0a1e3f] data-[state=active]:text-white transition-all">
                  Checking Accounts
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="savings" className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {savingsProducts.map((product, idx) => (
                  <div key={product.name} className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col justify-between hover:border-[#0284c7]/30 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${(idx + 1) * 120}ms` }}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: product.bg, color: product.accent }}
                        >
                          <product.icon className="h-6 w-6" />
                        </div>
                        <span className="font-heading font-bold text-xs text-[#34c771] bg-[#bcffbb] px-3 py-1 rounded-full border border-black/5">
                          {product.rate}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-semibold text-[#0a1e3f] mb-2">{product.name}</h3>
                      <p className="text-xs text-[#64748b] leading-relaxed mb-6">{product.description}</p>

                      <ul className="space-y-2 mb-5 pt-3 border-t border-[#e2e8f0]/60">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-xs text-[#0a1e3f]">
                            <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#e2e8f0]">
                      <Button
                        variant="pill"
                        size="default"
                        className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                        asChild
                      >
                        <Link to="/contact">
                          Open Account
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="loans" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {loanProducts.map((product) => (
                  <div key={product.name} className="p-7 sm:p-8 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col justify-between hover:border-[#0284c7]/30 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: product.bg, color: product.accent }}
                        >
                          <product.icon className="h-6 w-6" />
                        </div>
                        <span className="font-heading font-bold text-xs text-[#0284c7] bg-[#f0f7ff] px-3 py-1 rounded-full border border-black/5">
                          {product.rate}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-semibold text-[#0a1e3f] mb-2">{product.name}</h3>
                      <p className="text-xs text-[#64748b] leading-relaxed mb-6">{product.description}</p>

                      <ul className="space-y-2 mb-5 pt-3 border-t border-[#e2e8f0]/60">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-xs text-[#0a1e3f]">
                            <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#e2e8f0]">
                      <Button
                        variant="pill"
                        size="default"
                        className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                        asChild
                      >
                        <Link to="/loans">
                          Apply for Facility
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accounts" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                {accountTypes.map((product) => (
                  <div key={product.name} className="p-7 sm:p-8 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col justify-between hover:border-[#0284c7]/30 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: product.bg, color: product.accent }}
                        >
                          <product.icon className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-[#64748b] bg-[#f0f7ff] px-2.5 py-1 rounded-full">
                          Min. Balance: {product.minBalance}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-semibold text-[#0a1e3f] mb-2">{product.name}</h3>
                      <p className="text-xs text-[#64748b] leading-relaxed mb-6">{product.description}</p>

                      <ul className="space-y-2 mb-5 pt-3 border-t border-[#e2e8f0]/60">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-xs text-[#0a1e3f]">
                            <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#e2e8f0]">
                      <Button
                        variant="pill"
                        size="default"
                        className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all"
                        asChild
                      >
                        <Link to="/contact">
                          Open Account
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
