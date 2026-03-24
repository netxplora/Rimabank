import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, ArrowLeft, Loader2, Share2, Facebook, Twitter, Link as LinkIcon, Newspaper } from "lucide-react";
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
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center p-4">
                    <Newspaper className="h-16 w-16 text-muted-foreground mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
                    <p className="text-muted-foreground mb-6">The article you're looking for might have been moved or deleted.</p>
                    <Button asChild>
                        <Link to="/media">Back to News</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <article className="pb-20">
                {/* Header Section */}
                <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
                    <img
                        src={post.featured_image || 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
                        <div className="container mx-auto">
                            <Link to="/media" className="inline-flex items-center text-sm font-medium text-primary-foreground/80 hover:text-white mb-6 transition-colors">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Media
                            </Link>
                            <div className="max-w-4xl">
                                <Badge className="mb-4" variant="secondary">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {post.category}
                                </Badge>
                                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                    {post.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-primary-foreground/90 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        <span>{formatDate(post.created_at)}</span>
                                    </div>
                                    <div className="hidden sm:block">
                                        <span>By Rivers MFB Communications</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 mt-8 md:mt-12">
                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-primary prose-a:text-primary">
                                {/* 
                  The content comes from React Quill, so we must sanitize it
                  to prevent Cross-Site Scripting (XSS) vulnerabilities.
                */}
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
                            </div>

                            {/* Share Section */}
                            <div className="mt-12 pt-8 border-t">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <h3 className="font-bold text-lg">Share this story</h3>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="icon" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
                                            <Facebook className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}>
                                            <Twitter className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={copyLink}>
                                            <LinkIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="hidden lg:block space-y-8">
                            <div className="sticky top-24">
                                <div className="p-6 bg-muted/30 rounded-xl border">
                                    <h3 className="font-bold text-lg mb-4">Latest from {post.category}</h3>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        Stay up to date with the latest developments in {post.category.toLowerCase()}.
                                    </p>
                                    <Button className="w-full" asChild>
                                        <Link to="/media">Browse All</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
}
