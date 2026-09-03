import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Loader2, Tag } from "lucide-react";
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export default function Media() {
  const [newsArticles, setNewsArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/news_articles?order=created_at.desc&select=*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNewsArticles(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const featuredArticle = newsArticles.length > 0 ? newsArticles[0] : null;
  const otherArticles = newsArticles.length > 1 ? newsArticles.slice(1) : [];

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-ui">
              <span>Press & Corporate Communications</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium text-[#360802] tracking-tight leading-[0.98]">
              News & <span className="text-[#f73b20]">announcements</span>.
            </h1>

            <p className="text-[#360802]/80 text-lg md:text-xl font-normal leading-relaxed">
              Institutional updates, regulatory notices, community outreach initiatives, and strategic milestones from Rima Microfinance Bank.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-white border-b border-[#e7dcdb]/60">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="rounded-cards bg-white border border-[#e7dcdb] shadow-lift overflow-hidden grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-6 aspect-video lg:aspect-auto overflow-hidden">
                <Link to={`/media/${featuredArticle.slug}`}>
                  <img
                    src={featuredArticle.featured_image || 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80'}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </Link>
              </div>

              <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-ui px-2.5 py-1 rounded-pills bg-[#fdedea] text-[#f73b20]">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#ababab]">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(featuredArticle.created_at)}</span>
                  </div>
                </div>

                <Link to={`/media/${featuredArticle.slug}`}>
                  <h2 className="font-heading text-2xl lg:text-3xl font-medium text-[#360802] mb-3 hover:text-[#f73b20] transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                </Link>

                <p className="text-xs text-[#ababab] leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>

                <div>
                  <Button variant="pill" size="default" asChild className="shadow-brand">
                    <Link to={`/media/${featuredArticle.slug}`}>
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-24 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-ui text-[#f73b20] block mb-2">
              Recent Coverage
            </span>
            <h2 className="font-heading text-3xl font-medium text-[#360802]">
              Latest Publications
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#f73b20]" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="rounded-cards bg-white border border-[#e7dcdb] shadow-lift overflow-hidden flex flex-col justify-between hover:border-[#f73b20]/30 transition-all duration-300 group"
                >
                  <div>
                    <div className="h-48 overflow-hidden bg-[#fdedea]">
                      <Link to={`/media/${article.slug}`}>
                        <img
                          src={article.featured_image || 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80'}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase font-semibold tracking-ui px-2 py-0.5 rounded-pills bg-[#fdedea] text-[#f73b20]">
                          {article.category}
                        </span>
                        <span className="text-[11px] text-[#ababab]">
                          {formatDate(article.created_at)}
                        </span>
                      </div>

                      <Link to={`/media/${article.slug}`}>
                        <h3 className="font-heading text-lg font-semibold text-[#360802] group-hover:text-[#f73b20] transition-colors leading-snug line-clamp-2 mb-2">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#ababab] leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-[#e7dcdb]/60">
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
          )}
        </div>
      </section>

      {/* Media Inquiries CTA */}
      <section className="py-20 bg-[#fdedea]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl md:text-3xl font-medium text-[#360802]">
              Media & Press Inquiries
            </h3>
            <p className="text-xs text-[#ababab] leading-relaxed">
              For official press statements, executive interviews, or brand assets, contact our corporate communications desk.
            </p>
            <div className="pt-2">
              <Button variant="pill" size="lg" asChild className="shadow-brand">
                <a href="mailto:info@rimamfb.com">
                  Contact Media Desk
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
