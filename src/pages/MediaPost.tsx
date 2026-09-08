import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Loader2, Facebook, Twitter, Link as LinkIcon, Newspaper } from "lucide-react";
import { toast } from "sonner";
import DOMPurify from "dompurify";
import { useCMS } from "@/context/CMSContext";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string;
  created_at: string;
  slug: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const fallbackDefaultArticles: Record<string, BlogPost> = {
  "sme-credit-growth-rivers-state": {
    id: "1",
    slug: "sme-credit-growth-rivers-state",
    title: "Expanding Commercial Credit for Regional SMEs in Rivers State",
    excerpt: "Rima Microfinance Bank announces a dedicated capital facility targeting registered retail distributors and small-scale manufacturers.",
    content: `
      <p>Rima Microfinance Bank Limited has unveiled a dedicated credit facility tailored to support small and medium-scale enterprises across Rivers State. This initiative provides working capital for inventory restocking, equipment acquisition, and business expansion.</p>
      <h3>Structured Credit for Emerging Enterprises</h3>
      <p>Under the new facility, eligible business owners can access loans up to ₦50 Million with flexible repayment terms and structured collateral arrangements. The goal is to provide timely liquidity that matches commercial cash flow cycles.</p>
      <p>Our dedicated credit advisory desk assists merchants through every step of the application process, ensuring transparent interest calculation and rapid 48-hour disbursement upon documentation verification.</p>
      <h3>Eligibility & Documentation</h3>
      <ul>
        <li>Registered business entity with verifiable operations in Nigeria</li>
        <li>Active bank account statements for the preceding 6 to 12 months</li>
        <li>Valid government-issued identification and business registration documents</li>
      </ul>
    `,
    category: "Commercial Credit",
    featured_image: "/images/media-sme.png",
    created_at: new Date().toISOString()
  },
  "youth-student-financial-inclusion": {
    id: "2",
    slug: "youth-student-financial-inclusion",
    title: "Financial Discipline and Zero-Fee Accounts for University Students",
    excerpt: "New campus banking initiative brings digital financial tools and educational savings structures to undergraduate communities.",
    content: `
      <p>In continuation of our mandate to foster financial literacy and inclusion, Rima Microfinance Bank has rolled out specialized student banking packages designed for undergraduates and young professionals.</p>
      <h3>Zero-Maintenance Campus Banking</h3>
      <p>The student account features zero monthly maintenance charges, instant debit card issuance, and full access to our mobile banking application for seamless transfers, airtime purchases, and bill payments.</p>
      <p>Through campus workshops and digital budgeting tools, students gain practical experience in managing allowances, saving consistently, and building disciplined financial habits early.</p>
    `,
    category: "Financial Inclusion",
    featured_image: "/images/media-students.png",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  "agency-banking-network-expansion": {
    id: "3",
    slug: "agency-banking-network-expansion",
    title: "Agency Banking Network Reaches 200 Certified Merchant Locations",
    excerpt: "Strategic partnership with market trade associations brings instant deposit, withdrawal, and utility payment terminals to local clusters.",
    content: `
      <p>Rima Microfinance Bank is proud to announce that its agency banking footprint has expanded to over 200 accredited locations across key commercial hubs and local communities.</p>
      <h3>Bringing Banking to the Grassroots</h3>
      <p>Each accredited agent is equipped with high-speed POS terminals that process instant cash deposits, inter-bank transfers, utility payments, and account balance inquiries with immediate NIBSS settlement.</p>
      <p>By empowering neighborhood retail store owners as certified agents, Rima MFB ensures that reliable banking services remain within walking distance of local traders and residents.</p>
    `,
    category: "Agency Banking",
    featured_image: "/images/rivers-agent-hero.png",
    created_at: new Date(Date.now() - 86400000 * 12).toISOString()
  }
};

export default function MediaPost() {
  const { slug } = useParams<{ slug: string }>();
  const { publications } = useCMS();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      // 1. Check in CMS local / published memory first
      const cmsFound = publications.find(p => p.slug === slug || p.id === slug);
      if (cmsFound) {
        setPost({
          id: cmsFound.id,
          title: cmsFound.title,
          excerpt: cmsFound.excerpt,
          content: cmsFound.content,
          category: cmsFound.category,
          featured_image: cmsFound.featuredImage || '/images/media-sme.png',
          created_at: cmsFound.publishDate || cmsFound.createdAt,
          slug: cmsFound.slug
        });
        setLoading(false);
        return;
      }

      // 2. Check in fallback default articles
      if (slug && fallbackDefaultArticles[slug]) {
        setPost(fallbackDefaultArticles[slug]);
        setLoading(false);
        return;
      }

      // 3. Otherwise query Supabase
      try {
        if (!SUPABASE_URL || !SUPABASE_KEY) {
          setLoading(false);
          return;
        }
        const response = await fetch(`${SUPABASE_URL}/rest/v1/news_articles?slug=eq.${encodeURIComponent(slug as string)}&select=*`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPost(data[0]);
          } else {
            setPost(null);
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, publications]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#0284c7]" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <Newspaper className="h-12 w-12 text-[#64748b] mb-4" />
          <h1 className="font-heading text-2xl font-semibold text-[#0a1e3f] mb-2">Article Not Found</h1>
          <p className="text-xs text-[#64748b] mb-6">The article you're seeking may have expired or moved.</p>
          <Button
            variant="pill"
            asChild
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md shadow-sky-500/20"
          >
            <Link to="/media">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Return to Media Hub
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="pb-12 bg-white">
        {/* Editorial Article Header */}
        <section className="relative bg-white pt-8 pb-10 border-b border-[#e2e8f0]/60">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Link 
              to="/media" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Publications
            </Link>

            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#f0f7ff] text-[#0284c7] border border-[#e2e8f0] inline-block">
                {post.category}
              </span>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0a1e3f] tracking-tight leading-[1.08]">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-[#64748b] pt-2 border-t border-[#e2e8f0]/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#0284c7]" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <span>&bull;</span>
                <span>Rima MFB Corporate Communications</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#e2e8f0] shadow-sm">
            <img
              src={post.featured_image || '/images/media-sme.png'}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 mt-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div 
            className="prose prose-sm max-w-none text-[#0a1e3f]/85 text-sm leading-relaxed prose-headings:font-heading prose-headings:text-[#0a1e3f] prose-a:text-[#0284c7]"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />

          {/* Social Share Bar */}
          <div className="mt-8 pt-6 border-t border-[#e2e8f0]/60 flex items-center justify-between flex-wrap gap-4">
            <span className="text-xs font-semibold text-[#0a1e3f]">Share this article</span>
            <div className="flex items-center gap-2">
              <Button 
                variant="outlineNeutral" 
                size="sm" 
                className="h-8 px-3 text-xs rounded-full" 
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              >
                <Facebook className="h-3.5 w-3.5 mr-1" />
                Facebook
              </Button>
              <Button 
                variant="outlineNeutral" 
                size="sm" 
                className="h-8 px-3 text-xs rounded-full" 
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
              >
                <Twitter className="h-3.5 w-3.5 mr-1" />
                Twitter
              </Button>
              <Button 
                variant="outlineNeutral" 
                size="sm" 
                className="h-8 px-3 text-xs rounded-full" 
                onClick={copyLink}
              >
                <LinkIcon className="h-3.5 w-3.5 mr-1" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
