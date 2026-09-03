import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Wallet,
  Building2,
  CreditCard,
  TrendingUp,
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle2,
  Percent,
  Clock,
  Shield,
  Store
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
    accent: "#360802"
  },
  {
    name: "Target Savings Account",
    description: "Automate recurring savings towards business expansion or family goals",
    features: ["Automated standing orders", "Structured savings timeline", "Zero monthly maintenance fee", "Completion bonus rates"],
    rate: "6.5% p.a.",
    icon: Shield,
    category: "Target",
    bg: "#fdedea",
    accent: "#f73b20"
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
    bg: "#fdedea",
    accent: "#fb2d54"
  },
  {
    name: "Salary Advance",
    description: "Short-term emergency cash advance against upcoming monthly payroll",
    features: ["Up to 50% of net monthly salary", "Same-day approval & credit", "Automatic payroll repayment", "Zero physical collateral"],
    rate: "From 3% flat",
    icon: Clock,
    category: "Advance",
    bg: "#e7dcdb",
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
    bg: "#fdedea",
    accent: "#f73b20"
  },
  {
    name: "Campus Student Account",
    description: "Zero maintenance fee banking package for tertiary students",
    features: ["₦0 Monthly maintenance charges", "Free debit card issuance", "Mobile app banking access", "Eligible for student loans"],
    minBalance: "₦0",
    icon: GraduationCap,
    category: "Student",
    bg: "#f5ffbb",
    accent: "#360802"
  }
];

export default function Products() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-ui">
              <span>Complete Product Catalog</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              Banking solutions for <span className="text-[#f73b20]">every requirement</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              Explore structured personal deposit accounts, commercial working capital lines, and agency banking infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Tabbed Products Section */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <Tabs defaultValue="savings" className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="bg-[#fdedea] p-1.5 rounded-pills border border-[#e7dcdb] h-auto flex flex-wrap gap-1">
                <TabsTrigger value="savings" className="rounded-pills px-6 py-2.5 text-xs font-semibold uppercase tracking-ui data-[state=active]:bg-[#360802] data-[state=active]:text-white transition-colors">
                  Savings & Deposits
                </TabsTrigger>
                <TabsTrigger value="loans" className="rounded-pills px-6 py-2.5 text-xs font-semibold uppercase tracking-ui data-[state=active]:bg-[#360802] data-[state=active]:text-white transition-colors">
                  Credit & Loans
                </TabsTrigger>
                <TabsTrigger value="accounts" className="rounded-pills px-6 py-2.5 text-xs font-semibold uppercase tracking-ui data-[state=active]:bg-[#360802] data-[state=active]:text-white transition-colors">
                  Checking Accounts
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="savings" className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savingsProducts.map((product) => (
                  <div key={product.name} className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: product.bg, color: product.accent }}
                        >
                          <product.icon className="h-6 w-6" />
                        </div>
                        <span className="font-heading font-bold text-xs text-[#34c771] bg-[#bcffbb] px-2.5 py-1 rounded-pills">
                          {product.rate}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-medium text-[#360802] mb-2">{product.name}</h3>
                      <p className="text-xs text-[#ababab] leading-relaxed mb-6">{product.description}</p>

                      <ul className="space-y-2.5 mb-8 pt-4 border-t border-[#e7dcdb]/60">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-xs text-[#360802]">
                            <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#e7dcdb]">
                      <Button variant="pill" size="default" className="w-full shadow-brand" asChild>
                        <Link to="/contact">
                          Open Account
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="loans" className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loanProducts.map((product) => (
                  <div key={product.name} className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: product.bg, color: product.accent }}
                        >
                          <product.icon className="h-6 w-6" />
                        </div>
                        <span className="font-heading font-bold text-xs text-[#fb2d54] bg-[#fdedea] px-2.5 py-1 rounded-pills">
                          {product.rate}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-medium text-[#360802] mb-2">{product.name}</h3>
                      <p className="text-xs text-[#ababab] leading-relaxed mb-6">{product.description}</p>

                      <ul className="space-y-2.5 mb-8 pt-4 border-t border-[#e7dcdb]/60">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-xs text-[#360802]">
                            <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#e7dcdb]">
                      <Button variant="pill" size="default" className="w-full shadow-brand" asChild>
                        <Link to="/loans">
                          Apply for Facility
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accounts" className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {accountTypes.map((product) => (
                  <div key={product.name} className="p-8 rounded-cards bg-white border border-[#e7dcdb] shadow-lift flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: product.bg, color: product.accent }}
                        >
                          <product.icon className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-[#ababab]">
                          Min. Balance: {product.minBalance}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-medium text-[#360802] mb-2">{product.name}</h3>
                      <p className="text-xs text-[#ababab] leading-relaxed mb-6">{product.description}</p>

                      <ul className="space-y-2.5 mb-8 pt-4 border-t border-[#e7dcdb]/60">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-xs text-[#360802]">
                            <CheckCircle2 className="h-4 w-4 text-[#34c771] shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#e7dcdb]">
                      <Button variant="pill" size="default" className="w-full shadow-brand" asChild>
                        <Link to="/contact">
                          Open Account
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
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
