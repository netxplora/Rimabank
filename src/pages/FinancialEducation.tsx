import { Layout } from "@/components/layout/Layout";
import { BookOpen, TrendingUp, Lightbulb, Shield, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const categories = [
  "All Topics",
  "Personal Finance",
  "SME Growth",
  "Savings Strategies",
  "Loan Guidance"
];

const articles = [
  {
    title: "Structuring Your Personal Cash Flow & Emergency Reserves",
    description: "Learn how to allocate monthly income into structured liquidity, savings yield accounts, and emergency cushions.",
    category: "Personal Finance",
    date: "March 15, 2024",
    icon: TrendingUp,
    bg: "#bcffbb",
    color: "#34c771"
  },
  {
    title: "Working Capital Optimization for Commercial Retailers",
    description: "Managing inventory turnaround, merchant POS reconciliation, and vendor trade financing in regional markets.",
    category: "SME Growth",
    date: "March 10, 2024",
    icon: Lightbulb,
    bg: "#fdedea",
    color: "#f73b20"
  },
  {
    title: "Understanding Microfinance Credit Evaluation Standards",
    description: "An overview of documentation, bank statements, and debt-service ratios evaluated during loan approval.",
    category: "Loan Guidance",
    date: "March 5, 2024",
    icon: Shield,
    bg: "#e7dcdb",
    color: "#477ee9"
  },
  {
    title: "Foundational Savings Discipline for Tertiary Students",
    description: "Practical steps for university students to manage allowances, avoid avoidable fees, and build credit history.",
    category: "Savings Strategies",
    date: "February 28, 2024",
    icon: BookOpen,
    bg: "#f5ffbb",
    color: "#360802"
  }
];

export default function FinancialEducation() {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(a => {
    const matchesCategory = activeCategory === "All Topics" || a.category === activeCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-wider">
              <span>Financial Literacy Hub</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#360802] tracking-tight leading-[1.05]">
              Practical financial <span className="text-[#f73b20]">guides & insights</span>.
            </h1>

            <p className="text-[#360802]/80 text-base sm:text-lg leading-relaxed">
              Curated articles and advisory guides on budgeting, SME capital management, and commercial loan planning from our banking team.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-6 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-[#360802] text-white shadow-xs"
                      : "bg-[#fdedea] text-[#360802] hover:bg-[#e7dcdb]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ababab]" />
              <Input
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-[#fdedea]/40 border-[#e7dcdb] rounded-xl text-xs text-[#360802] focus:border-[#f73b20]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Open 2-Column Articles Layout (No heavy card containers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {filteredArticles.map((article, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between group border-t border-[#e7dcdb]/80 pt-6"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#fdedea] text-[#f73b20]">
                    {article.category}
                  </span>
                  <span className="text-xs text-[#ababab]">{article.date}</span>
                </div>

                <div className="flex items-start gap-3.5 mb-3">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: article.bg, color: article.color }}
                  >
                    <article.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#360802] group-hover:text-[#f73b20] transition-colors leading-snug">
                    {article.title}
                  </h3>
                </div>

                <p className="text-xs text-[#ababab] leading-relaxed mb-5">
                  {article.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e7dcdb]/60">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#f73b20] group-hover:text-[#f84d35]">
                  Read Full Article <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </Layout>
  );
}
