import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  featured_image: string;
  created_at: string;
}

const defaultArticles: BlogPost[] = [
  {
    id: "1",
    slug: "sme-credit-growth-rivers-state",
    title: "Expanding Commercial Credit for Regional SMEs in Rivers State",
    excerpt: "Rima Microfinance Bank announces a dedicated capital facility targeting registered retail distributors and small-scale manufacturers.",
    category: "Commercial Credit",
    featured_image: "/images/media-sme.png",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    slug: "youth-student-financial-inclusion",
    title: "Financial Discipline and Zero-Fee Accounts for University Students",
    excerpt: "New campus banking initiative brings digital financial tools and educational savings structures to undergraduate communities.",
    category: "Financial Inclusion",
    featured_image: "/images/media-students.png",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "3",
    slug: "agency-banking-network-expansion",
    title: "Agency Banking Network Reaches 200 Certified Merchant Locations",
    excerpt: "Strategic partnership with market trade associations brings instant deposit, withdrawal, and utility payment terminals to local clusters.",
    category: "Agency Banking",
    featured_image: "/images/rivers-agent-hero.png",
    created_at: new Date(Date.now() - 86400000 * 12).toISOString()
  }
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export default function Media() {
  const [newsArticles, setNewsArticles] = useState<BlogPost[]>(defaultArticles);

  const fetchPosts = async () => {
    try {
      if (!SUPABASE_URL || !SUPABASE_KEY) return;
      const response = await fetch(`${SUPABASE_URL}/rest/v1/news_articles?order=created_at.desc&select=*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setNewsArticles(data);
        }
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const featuredArticle = newsArticles[0];
  const otherArticles = newsArticles.length > 1 ? newsArticles.slice(1) : defaultArticles.slice(1);

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-wider">
              <span>Press & Corporate Communications</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#360802] tracking-tight leading-[1.05]">
              News & <span className="text-[#f73b20]">announcements</span>.
            </h1>

            <p className="text-[#360802]/80 text-base sm:text-lg leading-relaxed">
              Institutional updates, regulatory notices, community outreach initiatives, and strategic milestones from Rima Microfinance Bank.
            </p>
          </div>
        </div>
      </section>

      {/* 3D Featured Article */}
      {featuredArticle && (
        <section className="py-12 sm:py-16 bg-white border-b border-[#e7dcdb]/60">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="card-3d rounded-3xl bg-white border border-[#e7dcdb] shadow-3d-lift overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-6 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#fdedea]">
                <Link to={`/media/${featuredArticle.slug}`}>
                  <img
                    src={featuredArticle.featured_image || '/images/media-sme.png'}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/media-sme.png";
                    }}
                  />
                </Link>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#fdedea] text-[#f73b20] border border-[#e7dcdb]">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#ababab]">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(featuredArticle.created_at)}</span>
                  </div>
                </div>

                <Link to={`/media/${featuredArticle.slug}`}>
                  <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-[#360802] hover:text-[#f73b20] transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-[#360802]/70 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2">
                  <Button
                    variant="pill"
                    size="default"
                    asChild
                    className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
                  >
                    <Link to={`/media/${featuredArticle.slug}`}>
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3-Column News Grid */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f73b20] block mb-2">
              Recent Coverage
            </span>
            <h2 className="font-heading text-3xl font-semibold text-[#360802]">
              Latest Publications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {otherArticles.map((article) => (
              <div 
                key={article.id} 
                className="card-3d rounded-2xl bg-white border border-[#e7dcdb] shadow-3d overflow-hidden flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300 group"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-[#fdedea]">
                    <Link to={`/media/${article.slug}`}>
                      <img
                        src={article.featured_image || '/images/media-students.png'}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/media-students.png";
                        }}
                      />
                    </Link>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#fdedea] text-[#f73b20]">
                        {article.category}
                      </span>
                      <span className="text-[11px] text-[#ababab]">
                        {formatDate(article.created_at)}
                      </span>
                    </div>

                    <Link to={`/media/${article.slug}`}>
                      <h3 className="font-heading text-base font-semibold text-[#360802] group-hover:text-[#f73b20] transition-colors leading-snug line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#ababab] leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#e7dcdb]/60">
                  <Link 
                    to={`/media/${article.slug}`} 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f73b20] hover:text-[#f84d35]"
                  >
                    Read Full Story
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Inquiries CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#fdedea] to-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-[#360802]">
              Media & Press Inquiries
            </h3>
            <p className="text-xs sm:text-sm text-[#ababab] leading-relaxed">
              For official press statements, executive interviews, or brand assets, contact our corporate communications desk.
            </p>
            <div className="pt-2">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#f73b20] hover:bg-[#f84d35] text-white shadow-3d-orange transform hover:-translate-y-0.5 transition-all"
              >
                <a href="mailto:info@rimamfb.com">
                  Contact Media Desk
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
