import { Link } from "react-router-dom";
import { ArrowRight, Newspaper, Clock } from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import { Button } from "@/components/ui/button";

export function NewsSection() {
  const { siteContent, publications } = useCMS();

  // Show up to 3 most recent published articles
  const recentPubs = publications
    .filter((p) => p.status === "published")
    .slice(0, 3);

  if (recentPubs.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-24 bg-[#ffffff] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>News & Announcements</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight">
              Latest from RIMA
            </h2>
          </div>
          <Button variant="outlineNeutral" size="lg" asChild className="rounded-full bg-white hover:bg-slate-50 border-slate-300 text-xs sm:text-sm font-semibold h-11 px-6 shrink-0 shadow-2xs">
            <Link to="/media" className="inline-flex items-center gap-2">
              <span>All News & Media</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {recentPubs.map((pub) => (
            <Link
              key={pub.id}
              to={`/media/${pub.slug}`}
              className="group bg-white border border-slate-200/90 rounded-3xl overflow-hidden hover:border-[#0284c7]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div>
                {pub.featuredImage ? (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={pub.featuredImage}
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] w-full bg-[#f0f9ff] flex items-center justify-center border-b border-slate-100">
                    <Newspaper className="h-10 w-10 text-[#0284c7]/40" />
                  </div>
                )}
                
                <div className="p-6">
                  {pub.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] bg-[#f0f9ff] px-2.5 py-0.5 rounded-full border border-[#bae6fd]">
                      {pub.category}
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#0a1e3f] mt-2.5 mb-2 leading-snug group-hover:text-[#0284c7] transition-colors line-clamp-2">
                    {pub.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {pub.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0284c7]">
                <span className="group-hover:underline">Read Story</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

