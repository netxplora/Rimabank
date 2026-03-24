import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Personal Banking",
    href: "/personal-banking",
    children: [
      { name: "Savings Accounts", href: "/personal-banking/savings" },
      { name: "Current Accounts", href: "/personal-banking/current" },
      { name: "Student Banking", href: "/personal-banking/student" },
    ]
  },
  {
    name: "Business Banking",
    href: "/business-banking",
    children: [
      { name: "SME Banking", href: "/business-banking" },
      { name: "Corporate Accounts", href: "/business-banking" },
    ]
  },
  {
    name: "Loans",
    href: "/loans",
    children: [
      { name: "Micro Loans", href: "/loans" },
      { name: "Business Loans", href: "/loans" },
      { name: "Personal Loans", href: "/loans" },
    ]
  },
  { name: "Digital Banking", href: "/digital-banking" },
  { name: "Agent Banking", href: "/agent-banking" },
  {
    name: "About RIMA",
    href: "/about",
    children: [
      { name: "Who We Are", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Media & Press", href: "/media" },
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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="w-full px-4 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+2348119477050" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span>+234 811 947 7050</span>
            </a>
            <a href="mailto:info@riversmfb.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@riversmfb.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-foreground/70">CBN Licensed Microfinance Bank</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/60 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-background"
        )}
      >
        <div className="w-full px-4 md:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 mr-12">
              <img src="/rima-logo.png" alt="Rivers MFB Logo" className="h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-primary">Rivers MFB</span>
                <span className="text-xs text-muted-foreground">Microfinance Bank</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 items-center justify-between">
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
                      "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/5"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {item.name}
                    {item.children && <ChevronDown className="h-4 w-4" />}
                  </Link>

                  {/* Dropdown */}
                  {item.children && openDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-card rounded-lg shadow-lg border border-border overflow-hidden animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-3 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-md text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/5"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
