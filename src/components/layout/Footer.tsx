import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Shield,
  MessageCircle,
  Lock,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCMS } from "@/context/CMSContext";
import { SupabaseSync } from "@/services/supabaseSync";

const quickLinks = [
  { name: "About Rima MFB", href: "/about" },
  { name: "Branch Network", href: "/branches" },
  { name: "Media & News", href: "/media" },
  { name: "Contact & Support", href: "/contact" },
  { name: "Help & FAQ", href: "/faq" },
  { name: "Whistleblowing", href: "/whistle-blowing" },
];

const products = [
  { name: "Savings Accounts", href: "/personal-banking#savings" },
  { name: "Current Accounts", href: "/personal-banking#current" },
  { name: "Student Banking", href: "/personal-banking#student" },
  { name: "SME Banking", href: "/business-banking#sme" },
  { name: "Corporate Accounts", href: "/business-banking#corporate" },
  { name: "Credit Facilities", href: "/loans" },
  { name: "Agency Banking", href: "/agent-banking" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Preferences", href: "/cookies" },
  { name: "Whistleblowing", href: "/whistle-blowing" },
  { name: "Complaints Desk", href: "/complaints" },
];

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { siteContent, addEnquiry, subscribeNewsletter } = useCMS();
  const footer = siteContent?.footer;
  const contactInfo = siteContent?.contactInfo;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribing(true);
    try {
      await subscribeNewsletter(newsletterEmail.trim(), 'Website Footer');

      addEnquiry({
        name: "Newsletter Subscriber",
        email: newsletterEmail.trim(),
        subject: "[Newsletter Subscription] Official Banking Notices",
        message: `Customer subscribed to bank newsletter: ${newsletterEmail.trim()}`,
        category: "General Support",
        status: "unread",
        priority: "low"
      });

      await SupabaseSync.saveContactMessage({
        name: "Newsletter Subscriber",
        email: newsletterEmail.trim(),
        subject: "[Newsletter Subscription] Official Banking Notices",
        message: `Customer subscribed to bank newsletter: ${newsletterEmail.trim()}`
      });

      toast.success("Thank you for subscribing to Rima MFB official updates.");
      setNewsletterEmail("");
    } catch {
      toast.success("Thank you for subscribing to Rima MFB updates.");
      setNewsletterEmail("");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="w-full mt-auto bg-[#f8fafc] text-[#0a1e3f] pt-10 sm:pt-14 pb-6 sm:pb-8 border-t border-[#e2e8f0] selection:bg-[#0284c7] selection:text-white">
      
      {/* Stay Informed Newsletter Banner (Lightweight Soft Ice-Blue Wash) */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="rounded-3xl bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe]/50 to-[#f0f9ff] p-6 sm:p-8 lg:p-10 border border-[#bae6fd] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-2 sm:space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#0284c7] border border-[#bae6fd] text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <Shield className="h-3 w-3" />
                Stay Informed
              </div>
              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a1e3f] tracking-tight leading-tight">
                Official banking notices and updates.
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                Subscribe to periodic announcements, interest rate notices, and community financial reports.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-0.5 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Zero spam
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Unsubscribe anytime
                </span>
              </div>
            </div>
            
            {/* Right Form */}
            <div className="lg:col-span-5 w-full">
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full h-10 sm:h-11 bg-white border border-[#cbd5e1] rounded-xl px-3.5 text-xs sm:text-sm text-[#0a1e3f] placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all shadow-xs"
                  />
                  <Button
                    variant="pill"
                    size="default"
                    type="submit"
                    disabled={isSubscribing}
                    className="h-10 sm:h-11 px-5 shrink-0 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-brand transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                  >
                    {isSubscribing ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
                  By submitting, you agree to receive official communications in accordance with our{" "}
                  <Link to="/privacy" className="text-[#0284c7] underline hover:text-[#0369a1]">
                    Privacy Policy
                  </Link>.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>


      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-[#e2e8f0]">
          
          {/* Brand & Contact Column (Desktop: 4 cols, Mobile: full width) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center border border-[#e2e8f0] p-1.5 shadow-xs">
                <img src="/rima-logo.png" alt="Rima MFB" className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-lg font-bold text-[#0a1e3f] tracking-tight flex items-center gap-1">
                  Rima MFB
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0284c7]"></span>
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">Microfinance Bank</span>
              </div>
            </Link>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              Rima Microfinance Bank is licensed by the Central Bank of Nigeria (CBN). Eligible deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).
            </p>

            {/* Contact Details & Quick Links (Horizontal on mobile/tablet) */}
            <div className="space-y-2.5 text-xs text-slate-700 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#0284c7] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">{contactInfo?.headquarters || "No. 3 Evo Crescent, New GRA, Port Harcourt, Rivers State"}</span>
              </div>

              {/* Responsive Horizontal Contact Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px]">
                <a href={`tel:${(contactInfo?.phone || "+2348119477050").replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-[#0284c7] transition-colors">
                  <Phone className="h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                  <span>{contactInfo?.phone || "+234 811 947 7050"}</span>
                </a>
                <span className="text-slate-300 hidden sm:inline">&bull;</span>
                <a href={`mailto:${contactInfo?.email || "info@rimamfb.com"}`} className="flex items-center gap-1.5 hover:text-[#0284c7] transition-colors">
                  <Mail className="h-3.5 w-3.5 text-[#0284c7] shrink-0" />
                  <span>{contactInfo?.email || "info@rimamfb.com"}</span>
                </a>
              </div>

              {/* Action & Regulatory Badges Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1.5">
                <a
                  href={`https://wa.me/${(contactInfo?.whatsapp || "2348119477050").replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0] hover:bg-[#bbf7d0] transition-all text-[10px] font-semibold shadow-2xs"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp Support</span>
                </a>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#e2e8f0] text-[10px] font-medium text-slate-700 shadow-2xs">
                  <Shield className="h-3 w-3 text-[#0284c7]" />
                  <span>CBN Regulated</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#e2e8f0] text-[10px] font-medium text-slate-700 shadow-2xs">
                  <Lock className="h-3 w-3 text-emerald-600" />
                  <span>NDIC Insured</span>
                </span>
              </div>
            </div>
          </div>

          {/* Links Grid — Multi-Column Horizontal Spread for Mobile & Tablet (8 cols on desktop) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-2 sm:pt-0">
            
            {/* Column 1: Company */}
            <div className="space-y-3">
              <h4 className="font-heading text-[11px] font-bold uppercase tracking-widest text-[#0284c7]">
                Company
              </h4>
              <ul className="space-y-1.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-[#0284c7] text-xs transition-colors block py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Banking Solutions */}
            <div className="space-y-3">
              <h4 className="font-heading text-[11px] font-bold uppercase tracking-widest text-[#0284c7]">
                Banking Solutions
              </h4>
              <ul className="space-y-1.5">
                {products.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-[#0284c7] text-xs transition-colors block py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Compliance & Legal */}
            <div className="col-span-2 sm:col-span-1 space-y-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#e2e8f0]">
              <h4 className="font-heading text-[11px] font-bold uppercase tracking-widest text-[#0284c7]">
                Compliance & Legal
              </h4>
              <ul className="space-y-1.5 grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-1.5">
                {legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-[#0284c7] text-xs transition-colors block py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Social Icons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Rima Microfinance Bank. All rights reserved. Regulated by the Central Bank of Nigeria.
          </p>

          <div className="flex items-center gap-2.5">
            {[
              { platform: "facebook", url: footer?.facebookUrl || "#", Icon: Facebook },
              { platform: "twitter", url: footer?.twitterUrl || "#", Icon: Twitter },
              { platform: "instagram", url: footer?.instagramUrl || "#", Icon: Instagram },
              { platform: "linkedin", url: footer?.linkedinUrl || "#", Icon: Linkedin },
            ].map(({ platform, url, Icon }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={platform}
                className="w-7 h-7 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#0284c7] hover:border-[#0284c7] transition-colors shadow-2xs"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
