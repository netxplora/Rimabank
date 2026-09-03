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
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { name: "About Rima MFB", href: "/about" },
  { name: "Branch Network", href: "/branches" },
  { name: "Careers", href: "/careers" },
  { name: "Financial Education", href: "/education" },
  { name: "Customer Support", href: "/support" },
  { name: "Forms & Downloads", href: "/downloads" },
  { name: "Frequently Asked Questions", href: "/faq" },
];

const products = [
  { name: "Savings Accounts", href: "/personal-banking/savings" },
  { name: "Current Accounts", href: "/personal-banking/current" },
  { name: "Student Banking", href: "/personal-banking/student" },
  { name: "SME Commercial Banking", href: "/business-banking/sme" },
  { name: "Corporate Accounts", href: "/business-banking/corporate" },
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
    <footer className="bg-[#360802] text-white pt-20 pb-12 border-t border-black/20 selection:bg-[#f73b20] selection:text-white">
      {/* Editorial Newsletter & Direct Inquiries Strip */}
      <div className="max-w-[1200px] mx-auto px-6 mb-20">
        <div className="bg-white/5 border border-white/10 rounded-cards p-8 md:p-12 backdrop-blur-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-lift">
          <div className="max-w-xl">
            <span className="text-[#f73b20] text-xs font-semibold tracking-ui uppercase block mb-2">
              Stay Informed
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-medium text-white tracking-tight leading-tight mb-2">
              Financial insights and banking announcements.
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Subscribe to official periodic updates, interest rate notices, and community investment reports.
            </p>
          </div>
          
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[340px] md:min-w-[420px]"
          >
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full h-12 bg-white/10 border border-white/20 rounded-inputs px-5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#f73b20] focus:ring-1 focus:ring-[#f73b20] transition-colors"
              />
            </div>
            <Button variant="pill" size="lg" type="submit" className="shrink-0 bg-[#f73b20] hover:bg-[#f84d35]">
              Subscribe
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Regulatory Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 p-1.5">
                <img src="/rima-logo.png" alt="Rima MFB" className="h-full w-auto object-contain brightness-0 invert" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-white tracking-tight flex items-center gap-1">
                  Rima MFB
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f73b20]"></span>
                </span>
                <span className="text-[11px] text-white/50 uppercase tracking-ui">Microfinance Bank</span>
              </div>
            </Link>

            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Rima Microfinance Bank is a licensed financial institution regulated by the Central Bank of Nigeria (CBN). All eligible customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC).
            </p>

            <div className="space-y-3 pt-2 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#f73b20] shrink-0 mt-1" />
                <span>No. 3 Evo Crescent, New GRA, Port Harcourt, Rivers State, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#f73b20] shrink-0" />
                <a href="tel:+2348119477050" className="hover:text-[#f73b20] transition-colors">
                  +234 811 947 7050
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#f73b20] shrink-0" />
                <a href="mailto:info@rimamfb.com" className="hover:text-[#f73b20] transition-colors">
                  info@rimamfb.com
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/2348119477050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-pills bg-[#34c771]/15 text-[#34c771] border border-[#34c771]/30 hover:bg-[#34c771]/25 transition-colors text-xs font-semibold tracking-ui"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Direct Support
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-ui text-white mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-[#f73b20] text-sm transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-ui text-white mb-6">
              Banking Solutions
            </h4>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-[#f73b20] text-sm transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regulatory & Compliance */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-ui text-white mb-6">
              Compliance & Legal
            </h4>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-[#f73b20] text-sm transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                <Shield className="h-4 w-4 text-[#f73b20]" />
                <span>CBN Regulated</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                <Lock className="h-4 w-4 text-[#34c771]" />
                <span>NDIC Deposit Insurance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Regulatory Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Rima Microfinance Bank. All rights reserved. Licensed by the Central Bank of Nigeria.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#f73b20] hover:border-[#f73b20] transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#f73b20] hover:border-[#f73b20] transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#f73b20] hover:border-[#f73b20] transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#f73b20] hover:border-[#f73b20] transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
