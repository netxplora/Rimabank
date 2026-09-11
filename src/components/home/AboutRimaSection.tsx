import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShieldCheck, Building2, Award, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import { motion } from "framer-motion";

const highlights = [
  "Licensed and regulated by the Central Bank of Nigeria",
  "Customer deposits fully protected by NDIC insurance",
  "Transparent terms with zero hidden charges or fees",
  "Accessible personal, trader, and commercial financing",
];

export function AboutRimaSection() {
  const { siteContent } = useCMS();
  const about = siteContent?.aboutSnapshot;

  const heading = about?.heading || "Banking with purpose.";
  const description1 = about?.description1 || "RIMA Microfinance Bank is a CBN-licensed institution providing practical banking services to individuals, entrepreneurs, traders and small businesses across Rivers State. We offer savings, loans, everyday banking and access to the financial tools you need to manage your money and grow.";
  const description2 = about?.description2 || "Our branches, agent network, mobile app and USSD channel put accessible banking within reach for every customer.";
  const featuredImage = about?.featuredImage || "/images/about-rima.jpg";

  return (
    <section className="relative py-16 sm:py-24 bg-[#ffffff] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Image with Floating Stat Badges */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-100 group aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
              <img
                src={featuredImage}
                alt="Nigerian entrepreneur managing business accounts with RIMA Microfinance Bank"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f]/70 via-transparent to-transparent" />
              
              {/* Bottom Institutional Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0a1e3f] block">Head Office & Branches</span>
                    <span className="text-[10px] text-slate-500">Port Harcourt, Rivers State</span>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-emerald-700 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  CBN Licensed
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-7 order-1 lg:order-2 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] text-xs font-semibold uppercase tracking-wider shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                <span>About RIMA Bank</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                {heading}
              </h2>
            </div>

            <div className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
              <p>{description1}</p>
              {description2 && <p>{description2}</p>}
            </div>

            {/* Structured Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {highlights.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8fbff] border border-slate-200/80"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#0a1e3f] leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md h-12 px-7 text-xs sm:text-sm font-semibold"
              >
                <Link to="/about" className="inline-flex items-center gap-2">
                  <span>Learn More About Us</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

