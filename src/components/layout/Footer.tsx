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
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Financial Education", href: "/education" },
  { name: "Support Hub", href: "/support" },
  { name: "Locate Branches", href: "/branches" },
  { name: "Downloads", href: "/downloads" },
  { name: "FAQ", href: "/faq" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "News & Media", href: "/media" },
  { name: "Support", href: "/support" },
  { name: "Branches", href: "/branches" },
];

const products = [
  { name: "Savings Account", href: "/personal-banking/savings" },
  { name: "Current Account", href: "/personal-banking/current" },
  { name: "SME Banking", href: "/business-banking/sme" },
  { name: "Personal Loans", href: "/loans" },
  { name: "Agent Banking", href: "/agent-banking" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Complaints", href: "/complaints" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">
              Stay Updated with Rivers MFB
            </h3>
            <p className="text-primary-foreground/70 mb-6">
              Subscribe to our newsletter for the latest news, updates, and financial tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
              />
              <Button variant="accent" className="shrink-0">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/rima-logo.png" alt="Rivers MFB Logo" className="h-12 w-auto object-contain bg-white/10 rounded-lg p-1" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-primary-foreground">Rivers MFB</span>
                <span className="text-xs text-primary-foreground/60">Microfinance Bank</span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Empowering Rivers Dreams, One Banking Solution at a Time. A CBN-licensed microfinance bank serving individuals, students, traders, SMEs, and communities across Rivers State.
            </p>
            <div className="space-y-3">
              <a href="tel:+2348119477050" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                <Phone className="h-5 w-5" />
                <span>+234 811 947 7050</span>
              </a>
              <a href="mailto:info@riversmfb.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
                <span>info@riversmfb.com</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>No. 3 Evo Crescent, New GRA, Port Harcourt, Rivers State, Nigeria</span>
              </div>
              <a href="https://wa.me/2348119477050" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-secondary font-bold hover:text-secondary/80 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Rivers Microfinance Bank. All rights reserved. Licensed by the Central Bank of Nigeria.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
