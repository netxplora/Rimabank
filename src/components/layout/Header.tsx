import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Personal",
    href: "/personal-banking",
    children: [
      { name: "Savings Accounts", href: "/personal-banking/savings", desc: "Structured savings with guaranteed growth" },
      { name: "Current Accounts", href: "/personal-banking/current", desc: "Daily banking with zero hidden fees" },
      { name: "Student Banking", href: "/personal-banking/student", desc: "Zero fees and educational financing" },
    ]
  },
  {
    name: "Business",
    href: "/business-banking",
    children: [
      { name: "SME Banking", href: "/business-banking/sme", desc: "Working capital and commercial accounts" },
      { name: "Corporate Accounts", href: "/business-banking/corporate", desc: "Institutional-grade financial support" },
    ]
  },
  {
    name: "Credit & Loans",
    href: "/loans",
    children: [
      { name: "Micro Loans", href: "/loans#loan-types", desc: "Quick capital for daily operations" },
      { name: "Business Loans", href: "/loans#loan-types", desc: "Expansion funding for enterprises" },
      { name: "Personal Loans", href: "/loans#loan-types", desc: "Structured personal financing" },
    ]
  },
  { name: "Digital Banking", href: "/digital-banking" },
  { name: "Agent Banking", href: "/agent-banking" },
  {
    name: "Company",
    href: "/about",
    children: [
      { name: "About Rima MFB", href: "/about", desc: "Our 25+ year heritage and mission" },
      { name: "Branch Network", href: "/branches", desc: "Locate our regional branches" },
      { name: "Media & Press", href: "/media", desc: "Latest corporate announcements" },
      { name: "Careers", href: "/careers", desc: "Join our professional team" },
    ]
  },
  { name: "Support", href: "/support" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Editorial Top Regulatory Bar */}
      <div className="bg-[#360802] text-white py-2 text-xs tracking-ui hidden md:block border-b border-black/10">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 text-white/80">
            <span className="flex items-center gap-1.5 text-white/90">
              <Shield className="h-3.5 w-3.5 text-[#f73b20]" />
              CBN Licensed Microfinance Bank &bull; NDIC Insured
            </span>
            <span className="text-white/30">|</span>
            <a href="tel:+2348119477050" className="flex items-center gap-1.5 hover:text-[#f73b20] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[#f73b20]" />
              <span>+234 811 947 7050</span>
            </a>
            <a href="mailto:info@rimamfb.com" className="flex items-center gap-1.5 hover:text-[#f73b20] transition-colors">
              <Mail className="h-3.5 w-3.5 text-[#f73b20]" />
              <span>info@rimamfb.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/branches" className="hover:text-[#f73b20] transition-colors">
              Find a Branch
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/faq" className="hover:text-[#f73b20] transition-colors">
              Help & FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Main Editorial Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b",
          isScrolled
            ? "border-[#e7dcdb] shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-1"
            : "border-[#e7dcdb]/60 py-2.5"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex h-16 items-center justify-between gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="h-10 w-10 rounded-xl bg-[#fdedea] flex items-center justify-center border border-[#e7dcdb] group-hover:border-[#f73b20]/30 transition-colors p-1.5">
                <img src="/rima-logo.png" alt="Rima MFB Logo" className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold text-[#360802] tracking-tight leading-tight flex items-center gap-1">
                  Rima MFB
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f73b20]"></span>
                </span>
                <span className="text-[11px] text-[#ababab] font-medium uppercase tracking-ui">Microfinance Bank</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 rounded-links text-sm font-medium tracking-ui transition-all duration-200",
                      isActive(item.href)
                        ? "text-[#f73b20] bg-[#fdedea]"
                        : "text-[#360802] hover:text-[#f73b20] hover:bg-[#fdedea]/60"
                    )}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                          openDropdown === item.name && "transform rotate-180 text-[#f73b20]"
                        )}
                      />
                    )}
                  </Link>

                  {/* Editorial Dropdown Card */}
                  {item.children && openDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-cards shadow-lift border border-[#e7dcdb] p-2 animate-fade-in z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block p-3 rounded-lg hover:bg-[#fdedea] transition-colors group"
                        >
                          <div className="text-sm font-semibold text-[#360802] group-hover:text-[#f73b20] flex items-center justify-between">
                            {child.name}
                            <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#f73b20]" />
                          </div>
                          {child.desc && (
                            <p className="text-xs text-[#ababab] mt-0.5 leading-normal">{child.desc}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/personal-banking"
                className="text-xs font-semibold uppercase tracking-ui text-[#ababab] hover:text-[#360802] px-3 py-1.5 transition-colors"
              >
                Personal
              </Link>
              <span className="text-[#e7dcdb]">/</span>
              <Link
                to="/business-banking"
                className="text-xs font-semibold uppercase tracking-ui text-[#ababab] hover:text-[#360802] px-3 py-1.5 transition-colors mr-2"
              >
                Business
              </Link>

              <Button
                variant="pill"
                size="default"
                asChild
                className="font-medium shadow-brand"
              >
                <Link to="/contact">
                  Open Account
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 rounded-xl border border-[#e7dcdb] text-[#360802] hover:bg-[#fdedea] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#e7dcdb] animate-fade-in shadow-xl">
            <div className="max-w-[1200px] mx-auto px-6 py-6 space-y-3">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-[#e7dcdb]/50 pb-2">
                  <Link
                    to={item.href}
                    className={cn(
                      "block py-2 text-base font-semibold transition-colors",
                      isActive(item.href) ? "text-[#f73b20]" : "text-[#360802]"
                    )}
                    onClick={() => !item.children && setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-3 py-1 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block py-1.5 text-sm text-[#360802]/70 hover:text-[#f73b20] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Button variant="pill" size="lg" className="w-full" asChild>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Open Account
                  </Link>
                </Button>
                <div className="flex justify-between items-center text-xs text-[#ababab] pt-2">
                  <span>CBN Licensed Bank</span>
                  <span>NDIC Insured</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
