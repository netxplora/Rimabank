import { Layout } from "@/components/layout/Layout";
import { BookOpen, TrendingUp, Lightbulb, Shield, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
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
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: TrendingUp
  },
  {
    title: "Working Capital Optimization for Commercial Retailers",
    description: "Managing inventory turnaround, merchant POS reconciliation, and vendor trade financing in regional markets.",
    category: "SME Growth",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Lightbulb
  },
  {
    title: "Understanding Microfinance Credit Evaluation Standards",
    description: "An overview of documentation, bank statements, and debt-service ratios evaluated during loan approval.",
    category: "Loan Guidance",
    date: "March 5, 2024",
    image: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Shield
  },
  {
    title: "Foundational Savings Discipline for Tertiary Students",
    description: "Practical steps for university students to manage allowances, avoid avoidable fees, and build credit history.",
    category: "Savings Strategies",
    date: "February 28, 2024",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: BookOpen
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
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-ui">
              <span>Financial Literacy Hub</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              Practical financial <span className="text-[#f73b20]">guides & insights</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              Curated articles and advisory guides on budgeting, SME capital management, and commercial loan planning from our banking team.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-pills text-xs font-semibold uppercase tracking-ui transition-colors ${
                    activeCategory === cat
                      ? "bg-[#360802] text-white"
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
                className="pl-10 h-10 bg-[#fdedea]/40 border-[#e7dcdb] rounded-inputs text-xs text-[#360802] focus:border-[#f73b20]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredArticles.map((article, idx) => (
              <div
                key={idx}
                className="rounded-cards bg-white border border-[#e7dcdb] shadow-lift p-6 md:p-8 hover:border-[#f73b20]/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#e7dcdb]/60 mb-6">
                    <span className="text-[10px] uppercase font-semibold tracking-ui px-2.5 py-1 rounded-pills bg-[#fdedea] text-[#f73b20]">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#ababab]">{article.date}</span>
                  </div>

                  <h3 className="font-heading text-xl font-medium text-[#360802] mb-3 group-hover:text-[#f73b20] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#ababab] leading-relaxed mb-6">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e7dcdb]/60">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-ui text-[#f73b20] group-hover:text-[#f84d35]">
                    Read Full Article <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
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
