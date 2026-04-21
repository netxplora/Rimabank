import { Layout } from "@/components/layout/Layout";
import { BookOpen, TrendingUp, Lightbulb, Shield, ArrowRight, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const categories = [
  "All Topics",
  "Personal Finance",
  "SME Growth",
  "Savings Strategies",
  "Loan Advice",
  "Entrepreneurship"
];

const articles = [
  {
    title: "5 Tips for Managing Your Personal Finances in 2024",
    description: "Learn how to budget effectively and save for the future with these practical tips from our financial advisors.",
    category: "Personal Finance",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: TrendingUp
  },
  {
    title: "How to Scale Your SME: A Local Guide",
    description: "Scaling a business in Rivers State requires unique strategies. We break down the steps to sustainable growth.",
    category: "SME Growth",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Lightbulb
  },
  {
    title: "Understanding Loan Eligibility: What Banks Look For",
    description: "Demystifying the loan application process. Find out what documents and criteria are essential for a successful application.",
    category: "Loan Advice",
    date: "March 5, 2024",
    image: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Shield
  },
  {
    title: "Simple Savings Strategies for Students",
    description: "It's never too early to start saving. Discover how students can manage their allowance and build a safety net.",
    category: "Savings Strategies",
    date: "February 28, 2024",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: BookOpen
  }
];

export default function FinancialEducation() {
  return (
    <Layout>
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-home.png"
            alt="Rima MFB Financial Education"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Financial <span className="text-secondary">Literacy</span> Hub
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Knowledge is the best investment. Explore our curated guides and articles designed to help you make informed financial decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    idx === 0 ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-10 bg-card" />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {articles.map((article, idx) => (
              <Card key={idx} className="group overflow-hidden border-none shadow-none bg-transparent">
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-primary">
                      {article.category}
                    </div>
                  </div>
                </div>
                <CardHeader className="p-0 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <article.icon className="h-4 w-4 text-secondary" />
                    <span>{article.date}</span>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <div className="pt-6">
                  <Button variant="ghost" className="p-0 text-primary font-bold hover:bg-transparent hover:text-primary/80 group/btn" asChild>
                    <Link to="#" className="flex items-center gap-2">
                      Read Full Article
                      <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="p-12 rounded-[3rem] bg-muted/50 border border-border max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Subscribe for Weekly Tips</h3>
              <p className="text-muted-foreground mb-8">Get the latest financial education content delivered straight to your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input placeholder="Your email address" className="bg-card py-6" />
                <Button size="lg" className="px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90">Join Now</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
