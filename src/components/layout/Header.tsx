import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, ArrowRight, Shield } from "lucide-react";
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
    ],
  },
  {
    name: "Business",
    href: "/business-banking",
    children: [
      { name: "SME Banking", href: "/business-banking/sme", desc: "Working capital and commercial accounts" },
      { name: "Corporate Accounts", href: "/business-banking/corporate", desc: "Institutional-grade financial support" },
    ],
  },
  {
    name: "Loans",
    href: "/loans",
    children: [
      { name: "Micro Loans", href: "/loans#loan-types", desc: "Quick capital for daily operations" },
      { name: "Business Loans", href: "/loans#loan-types", desc: "Expansion funding for enterprises" },
      { name: "Personal Loans", href: "/loans#loan-types", desc: "Structured personal financing" },
    ],
  },
  { name: "Digital", href: "/digital-banking" },
  { name: "Agent Banking", href: "/agent-banking" },
  {
    name: "Company",
    href: "/about",
    children: [
      { name: "About Rima MFB", href: "/about", desc: "Our heritage and mission" },
      { name: "Branch Network", href: "/branches", desc: "Locate our regional branches" },
      { name: "Media & Press", href: "/media", desc: "Latest corporate announcements" },
      { name: "Careers", href: "/careers", desc: "Join our professional team" },
    ],
  },
  { name: "Support", href: "/support" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobile(null);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <>
      {/* Slim Regulatory Top Bar */}
      <div className="bg-[#360802] text-white py-1.5 text-[11px] tracking-wide hidden md:block border-b border-black/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-5 text-white/75">
            <span className="flex items-center gap-1.5 text-white/90">
              <Shield className="h-3 w-3 text-[#f73b20]" />
              CBN Licensed &bull; NDIC Insured
            </span>
            <a href="tel:+2348119477050" className="flex items-center gap-1.5 hover:text-[#f73b20] transition-colors">
              <Phone className="h-3 w-3 text-[#f73b20]" />
              +234 811 947 7050
            </a>
          </div>
          <div className="flex items-center gap-4 text-white/75">
            <Link to="/branches" className="hover:text-[#f73b20] transition-colors">Find Branch</Link>
            <span className="text-white/30">|</span>
            <Link to="/faq" className="hover:text-[#f73b20] transition-colors">Help & FAQ</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-white/97 backdrop-blur-md border-b border-[#e7dcdb]",
          isScrolled ? "shadow-sm py-0" : "py-0"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex h-[60px] items-center justify-between gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="h-9 w-9 rounded-xl bg-[#fdedea] flex items-center justify-center border border-[#e7dcdb] group-hover:border-[#f73b20]/30 transition-colors p-1.5">
                <img src="/rima-logo.png" alt="Rima MFB Logo" className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-base font-bold text-[#360802] tracking-tight">
                  Rima MFB
                </span>
                <span className="text-[10px] text-[#ababab] font-medium uppercase tracking-widest mt-0.5">
                  Microfinance Bank
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                      isActive(item.href)
                        ? "text-[#f73b20] bg-[#fdedea]"
                        : "text-[#360802] hover:text-[#f73b20] hover:bg-[#fdedea]/70"
                    )}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 opacity-50 transition-transform duration-200",
                          openDropdown === item.name && "rotate-180 opacity-100 text-[#f73b20]"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && openDropdown === item.name && (
                    <div
                      className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.10)] border border-[#e7dcdb] p-1.5 z-50"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-3 py-2.5 rounded-lg hover:bg-[#fdedea] transition-colors group"
                        >
                          <div className="text-sm font-semibold text-[#360802] group-hover:text-[#f73b20] flex items-center justify-between">
                            {child.name}
                            <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#f73b20]" />
                          </div>
                          {child.desc && (
                            <p className="text-[11px] text-[#ababab] mt-0.5 leading-snug">{child.desc}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA — Desktop only */}
            <div className="hidden lg:flex items-center shrink-0">
              <Button variant="pill" size="sm" asChild className="font-semibold shadow-brand">
                <Link to="/contact">
                  Open Account
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-xl border border-[#e7dcdb] text-[#360802] hover:bg-[#fdedea] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#e7dcdb] shadow-xl overflow-y-auto max-h-[80vh]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        className={cn(
                          "w-full flex items-center justify-between py-3 px-2 text-base font-semibold rounded-lg transition-colors",
                          isActive(item.href) ? "text-[#f73b20]" : "text-[#360802]"
                        )}
                        onClick={() =>
                          setExpandedMobile(expandedMobile === item.name ? null : item.name)
                        }
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform text-[#ababab]",
                            expandedMobile === item.name && "rotate-180 text-[#f73b20]"
                          )}
                        />
                      </button>
                      {expandedMobile === item.name && (
                        <div className="pl-4 pb-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              className="block py-2 px-2 text-sm text-[#360802]/70 hover:text-[#f73b20] rounded-lg hover:bg-[#fdedea]/60 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "block py-3 px-2 text-base font-semibold rounded-lg transition-colors",
                        isActive(item.href) ? "text-[#f73b20] bg-[#fdedea]" : "text-[#360802] hover:bg-[#fdedea]/50"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-3 pb-2">
                <Button variant="pill" size="lg" className="w-full" asChild>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Open Account
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <div className="flex justify-center items-center gap-4 text-[10px] text-[#ababab] mt-4 pt-3 border-t border-[#e7dcdb]">
                  <span>CBN Licensed</span>
                  <span className="text-[#e7dcdb]">•</span>
                  <span>NDIC Insured</span>
                  <span className="text-[#e7dcdb]">•</span>
                  <a href="tel:+2348119477050" className="hover:text-[#f73b20]">+234 811 947 7050</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
