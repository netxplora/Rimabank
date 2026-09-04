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
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useCMS } from "@/context/CMSContext";

const quickLinks = [
  { name: "About Rima MFB", href: "/about" },
  { name: "Branch Network", href: "/branches" },
  { name: "Media & News", href: "/media" },
  { name: "Customer Support", href: "/support" },
  { name: "Forms & Downloads", href: "/contact" },
  { name: "Frequently Asked Questions", href: "/faq" },
];

const products = [
  { name: "Savings Accounts", href: "/personal-banking#savings" },
  { name: "Current Accounts", href: "/personal-banking#current" },
  { name: "Student Banking", href: "/personal-banking#student" },
  { name: "SME Commercial Banking", href: "/business-banking#sme" },
  { name: "Corporate Accounts", href: "/business-banking#corporate" },
  { name: "Micro & Business Credit", href: "/loans" },
  { name: "Agency Banking Network", href: "/agent-banking" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Preferences", href: "/cookies" },
  { name: "Whistleblowing Portal", href: "/whistle-blowing" },
  { name: "Complaints Procedure", href: "/complaints" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a1e3f] text-white pt-16 pb-12 border-t border-blue-950 selection:bg-[#0284c7] selection:text-white">
      
      {/* Unclustered Spacious Stay Informed Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-16">
        <div className="glass-3d-dark rounded-2xl p-6 sm:p-10 lg:p-12 border border-blue-400/20 shadow-glass-3d">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#38bdf8] text-xs font-semibold uppercase tracking-wider">
                <Shield className="h-3.5 w-3.5" />
                Stay Informed
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight">
                Official banking notices and updates.
              </h3>
              <p className="text-blue-100/75 text-sm sm:text-base leading-relaxed max-w-xl">
                Subscribe to periodic announcements, interest rate notices, and community financial reports directly to your inbox.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-blue-200/60">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981]" /> Zero spam
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981]" /> Unsubscribe anytime
                </span>
              </div>
            </div>
            
            {/* Right Form (5 cols) - Unclustered & Generous Spacing */}
            <div className="lg:col-span-5 w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for subscribing to Rima MFB updates.");
                }}
                className="space-y-3"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="w-full h-12 bg-white/10 border border-blue-300/20 rounded-xl px-4 text-sm text-white placeholder:text-blue-200/50 focus:outline-none focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]/40 transition-all"
                  />
                  <Button
                    variant="pill"
                    size="lg"
                    type="submit"
                    className="h-12 px-6 shrink-0 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold shadow-brand transform hover:-translate-y-0.5 transition-all"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
                <p className="text-[11px] text-blue-200/50 leading-relaxed">
                  By submitting, you agree to receive official communications in accordance with our{" "}
                  <Link to="/privacy" className="text-white/80 underline hover:text-[#38bdf8]">
                    Privacy Policy
                  </Link>.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links - Clean 5-Column Responsive Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          
          {/* Brand & Regulatory Column (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 p-1.5">
                <img src="/rima-logo.png" alt="Rima MFB" className="h-full w-auto object-contain brightness-0 invert" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-xl font-bold text-white tracking-tight flex items-center gap-1">
                  Rima MFB
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
                </span>
                <span className="text-[10px] text-blue-200/60 uppercase tracking-widest mt-1">Microfinance Bank</span>
              </div>
            </Link>

            <p className="text-blue-100/70 text-sm leading-relaxed max-w-sm">
              Rima Microfinance Bank is a licensed financial institution regulated by the Central Bank of Nigeria (CBN). All eligible deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-blue-100/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <span>No. 3 Evo Crescent, New GRA, Port Harcourt, Rivers State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#38bdf8] shrink-0" />
                <a href="tel:+2348119477050" className="hover:text-[#38bdf8] transition-colors">
                  +234 811 947 7050
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#38bdf8] shrink-0" />
                <a href="mailto:info@rimamfb.com" className="hover:text-[#38bdf8] transition-colors">
                  info@rimamfb.com
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/2348119477050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 hover:bg-[#10b981]/25 transition-all text-xs font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Direct Support
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white/90">
              Company
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-blue-100/70 hover:text-[#38bdf8] text-sm transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white/90">
              Banking Solutions
            </h4>
            <ul className="space-y-2.5">
              {products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-blue-100/70 hover:text-[#38bdf8] text-sm transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Regulatory */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white/90">
              Compliance & Legal
            </h4>
            <ul className="space-y-2.5">
              {legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-blue-100/70 hover:text-[#38bdf8] text-sm transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2 space-y-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-white/90">
                <Shield className="h-4 w-4 text-[#38bdf8]" />
                <span>CBN Regulated</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-white/90">
                <Lock className="h-4 w-4 text-[#10b981]" />
                <span>NDIC Insured</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-200/50 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Rima Microfinance Bank. All rights reserved. Licensed by the Central Bank of Nigeria.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-200/70 hover:text-white hover:bg-[#0284c7] hover:border-[#0284c7] transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-200/70 hover:text-white hover:bg-[#0284c7] hover:border-[#0284c7] transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-200/70 hover:text-white hover:bg-[#0284c7] hover:border-[#0284c7] transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-200/70 hover:text-white hover:bg-[#0284c7] hover:border-[#0284c7] transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
