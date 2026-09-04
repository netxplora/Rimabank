import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Loader2, Facebook, Twitter, Link as LinkIcon, Newspaper } from "lucide-react";
import { toast } from "sonner";
import DOMPurify from "dompurify";

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

export default function MediaPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
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
  }, [slug]);

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
      <article className="pb-20 bg-white">
        {/* Editorial Article Header */}
        <section className="relative bg-white pt-10 pb-12 border-b border-[#e2e8f0]/60">
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
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#e2e8f0] shadow-sm">
            <img
              src={post.featured_image || '/images/media-sme.png'}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 mt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div 
            className="prose prose-sm max-w-none text-[#0a1e3f]/85 text-sm leading-relaxed prose-headings:font-heading prose-headings:text-[#0a1e3f] prose-a:text-[#0284c7]"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />

          {/* Social Share Bar */}
          <div className="mt-12 pt-6 border-t border-[#e2e8f0]/60 flex items-center justify-between flex-wrap gap-4">
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
