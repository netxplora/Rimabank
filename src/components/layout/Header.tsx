import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Shield,
  Briefcase,
  User,
  CreditCard,
  Building2,
  HelpCircle,
  Newspaper,
  MapPin,
  Lock,
  ChevronRight,
  TrendingUp,
  Wallet,
  Store,
  Layers,
  PhoneCall,
  Users,
  FileText,
  BadgePercent,
  Smartphone,
  Sparkles,
  PiggyBank,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DownloadAppDialog } from "@/components/modals/DownloadAppDialog";

interface NavSubItem {
  name: string;
  href: string;
  desc?: string;
  badge?: string;
}

interface NavGroup {
  title: string;
  icon?: React.ElementType;
  items: NavSubItem[];
}

interface MegaMenuCategory {
  name: string;
  href: string;
  summary: string;
  groups: NavGroup[];
  featured?: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    tag?: string;
  };
}

const whatWeOfferMenu: MegaMenuCategory = {
  name: "What We Offer",
  href: "/personal-banking",
  summary: "Comprehensive savings accounts, loans and financing, business banking, and flexible payment channels designed for real life.",
  groups: [
    {
      title: "Personal Banking",
      icon: User,
      items: [
        { name: "Personal Banking", href: "/personal-banking", desc: "Everyday banking for individuals" },
        { name: "Savings Accounts", href: "/savings", desc: "Regular savings, target savings and fixed deposits" },
        { name: "Loans & Financing", href: "/loans", desc: "Micro-loans and personal salary advance" },
        { name: "ATM & Debit Cards", href: "/cards", desc: "Secure chip & PIN Verve cards for ATM and POS" },
      ],
    },
    {
      title: "Business Banking",
      icon: Briefcase,
      items: [
        { name: "Business Banking", href: "/business-banking", desc: "SME and corporate accounts" },
        { name: "SME & Retail Accounts", href: "/business-banking#sme", desc: "For traders, shop owners and small enterprises" },
        { name: "Business Loans", href: "/loans", desc: "Working capital and asset financing" },
        { name: "POS & Payment Solutions", href: "/agent-banking", desc: "Merchant POS terminals and collections" },
      ],
    },
    {
      title: "Ways to Bank",
      icon: Smartphone,
      items: [
        { name: "Mobile App", href: "/mobile-banking", desc: "Bank from your smartphone 24/7", badge: "Primary" },
        { name: "Internet Banking", href: "/internet-banking", desc: "Secure access from any browser" },
        { name: "USSD Banking", href: "/ussd-banking", desc: "Bank without internet — dial *966*808#" },
        { name: "Agent Banking", href: "/agent-banking", desc: "Cash services through local agents" },
        { name: "Branches", href: "/branches", desc: "Find a RIMA branch near you" },
      ],
    },
    {
      title: "Loans & Financing",
      icon: TrendingUp,
      items: [
        { name: "All Loans", href: "/loans", desc: "Explore our financing options" },
        { name: "Microcredit for Traders", href: "/loans#microcredit", desc: "Fast accessible loans for market traders" },
        { name: "SME Working Capital", href: "/loans#sme", desc: "Short-term liquidity for registered businesses" },
        { name: "Asset Financing", href: "/loans#asset", desc: "Equipment and logistics financing" },
        { name: "Salary Advance", href: "/loans#salary", desc: "Short-term personal loans for salary earners" },
      ],
    },
  ],
  featured: {
    tag: "Mobile Banking",
    title: "The RIMA Mobile App",
    description: "Your bank, in your hands. Transfer money, save, and pay bills 24/7.",
    ctaText: "Learn More",
    ctaHref: "/mobile-banking",
  },
};

const whoWeAreMenu: MegaMenuCategory = {
  name: "Who We Are",
  href: "/about",
  summary: "A Central Bank of Nigeria licensed microfinance institution providing practical banking and economic empowerment since 1999.",
  groups: [
    {
      title: "About RIMA Bank",
      icon: Building2,
      items: [
        { name: "About Us & Heritage", href: "/about", desc: "Our 25-year heritage, financial strength, and community mission" },
        { name: "Our Mission & Vision", href: "/about#vision", desc: "Core principles guiding our microfinance stewardship" },
        { name: "Institutional Values", href: "/about#values", desc: "Integrity, transparency, accessibility, and client growth" },
        { name: "Corporate Governance", href: "/about#governance", desc: "Statutory risk frameworks, compliance, and auditing" },
      ],
    },
    {
      title: "Leadership & Stewardship",
      icon: Users,
      items: [
        { name: "Board of Directors", href: "/about#board", desc: "Experienced fiduciaries ensuring regulatory compliance" },
        { name: "Executive Management", href: "/about#management", desc: "Seasoned banking professionals driving operational excellence" },
        { name: "Careers at RIMA Bank", href: "/about#careers", desc: "Join our team dedicated to grassroots financial inclusion" },
      ],
    },
    {
      title: "News & Publications",
      icon: Newspaper,
      items: [
        { name: "News & Official Bulletins", href: "/media", desc: "Public notices, press statements, and regulatory updates" },
        { name: "Financial Literacy Guides", href: "/media", desc: "Practical guidance on cash flow, savings, and budgeting" },
        { name: "Annual Statements & Reports", href: "/media#reports", desc: "Audited institutional financial statements and disclosures" },
      ],
    },
    {
      title: "Contact & Branches",
      icon: MapPin,
      items: [
        { name: "Contact Customer Desk", href: "/contact", desc: "Reach our support desk via phone (+234 811 947 7050) or email" },
        { name: "Branch Locations & Hours", href: "/branches", desc: "Locate our Head Office and regional banking centers in Rivers State" },
        { name: "Customer Support & FAQs", href: "/faq", desc: "Answers to common account opening and transaction questions" },
        { name: "Whistleblowing Channel", href: "/whistle-blowing", desc: "Confidential ethics and compliance reporting desk" },
      ],
    },
  ],
  featured: {
    tag: "Institutional Trust",
    title: "Licensed & Insured",
    description: "Fully licensed by the Central Bank of Nigeria and insured by the Nigeria Deposit Insurance Corporation (NDIC).",
    ctaText: "Learn About RIMA Bank",
    ctaHref: "/about",
  },
};

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAppDialog, setShowAppDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>("offer");
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>("Personal Banking");
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDesktopMenu(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Efficient scroll detection with requestAnimationFrame for smooth sticky transition
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    // Initial check on mount
    updateScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDesktopMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDesktopMenu(null);
    }, 150);
  };

  const isCategoryActive = (category: MegaMenuCategory) => {
    return category.groups.some((group) =>
      group.items.some((item) => location.pathname === item.href.split("#")[0])
    );
  };

  return (
    <>
      {/* ── 1. Top Utility Regulatory Bar ── */}
      <div className="bg-[#0a1e3f] text-white text-[11px] py-1.5 px-4 sm:px-6 border-b border-white/10 hidden md:block">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Shield className="h-3 w-3 text-[#38bdf8]" />
              <span>CBN Licensed Microfinance Bank • NDIC Insured</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-300">
              USSD Banking: <strong className="text-white font-mono">*966*808#</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="text-slate-400">Head Office: No. 3 Evo Crescent, GRA Phase 2, Port Harcourt</span>
            <span className="text-white/20">|</span>
            <Link to="/whistle-blowing" className="hover:text-[#38bdf8] transition-colors">
              Whistleblowing Desk
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. Primary Sticky / Fixed Navigation Bar ── */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 motion-reduce:transition-none",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#bae6fd]/80 supports-[backdrop-filter]:bg-white/90"
            : "bg-white border-b border-[#bae6fd]/60"
        )}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-all duration-300 motion-reduce:transition-none",
              isScrolled ? "h-[58px] sm:h-[60px]" : "h-[66px] sm:h-[70px]"
            )}
          >
            {/* Brand Logo - Aligned Left */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
              <div
                className={cn(
                  "rounded-xl bg-[#f0f9ff] flex items-center justify-center border border-[#bae6fd]/70 group-hover:border-[#0284c7]/40 transition-all duration-300 p-1.5 shadow-2xs shrink-0",
                  isScrolled ? "h-9 w-9" : "h-10 w-10"
                )}
              >
                <img
                  src="/rima-logo.png"
                  alt="RIMA Microfinance Bank Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading text-base sm:text-lg font-bold text-[#0a1e3f] tracking-tight">
                  RIMA Bank
                </span>
                <span className="text-[8px] sm:text-[9px] text-slate-500 font-semibold uppercase tracking-widest">
                  Microfinance Bank
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Center) */}
            <nav className="hidden lg:flex items-center gap-1.5 flex-1 justify-center">
              {/* Category 1: What We Offer */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("offer")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDesktopMenu(activeDesktopMenu === "offer" ? null : "offer")
                  }
                  className={cn(
                    "flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 outline-none",
                    activeDesktopMenu === "offer" || isCategoryActive(whatWeOfferMenu)
                      ? "text-[#0284c7] bg-[#f0f9ff]"
                      : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f9ff]/70"
                  )}
                  aria-expanded={activeDesktopMenu === "offer"}
                >
                  <span>What We Offer</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      activeDesktopMenu === "offer" ? "rotate-180 text-[#0284c7]" : "text-slate-400"
                    )}
                  />
                </button>
              </div>

              {/* Category 2: Who We Are */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDesktopMenu(activeDesktopMenu === "about" ? null : "about")
                  }
                  className={cn(
                    "flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 outline-none",
                    activeDesktopMenu === "about" || isCategoryActive(whoWeAreMenu)
                      ? "text-[#0284c7] bg-[#f0f9ff]"
                      : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f9ff]/70"
                  )}
                  aria-expanded={activeDesktopMenu === "about"}
                >
                  <span>Who We Are</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      activeDesktopMenu === "about" ? "rotate-180 text-[#0284c7]" : "text-slate-400"
                    )}
                  />
                </button>
              </div>

              {/* Direct Link 3: Agency Banking */}
              <Link
                to="/agent-banking"
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150",
                  location.pathname === "/agent-banking"
                    ? "text-[#0284c7] bg-[#f0f9ff]"
                    : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f9ff]/70"
                )}
              >
                Agency Banking
              </Link>

              {/* Direct Link 4: Media & News */}
              <Link
                to="/media"
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150",
                  location.pathname.startsWith("/media")
                    ? "text-[#0284c7] bg-[#f0f9ff]"
                    : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f9ff]/70"
                )}
              >
                News & Guides
              </Link>

              {/* Direct Link 5: Contact */}
              <Link
                to="/contact"
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150",
                  location.pathname === "/contact"
                    ? "text-[#0284c7] bg-[#f0f9ff]"
                    : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f9ff]/70"
                )}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Action: Download App CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Button
                variant="pill"
                size="default"
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-brand text-xs font-semibold px-5 h-9"
                onClick={() => setShowAppDialog(true)}
              >
                <span>Get the App</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>

            {/* Mobile Header Right: Hamburger Menu Trigger Strictly Positioned on Far Right */}
            <div className="flex items-center lg:hidden ml-auto">
              <button
                type="button"
                className="p-2 rounded-xl border border-[#bae6fd]/80 text-[#0a1e3f] bg-white hover:bg-[#f0f9ff] active:scale-95 transition-all shadow-2xs"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-5 w-5 text-[#0a1e3f]" />
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. Desktop Mega Menu Panels ── */}
        {/* Panel 1: What We Offer */}
        {activeDesktopMenu === "offer" && (
          <div
            className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-[#e2e8f0] shadow-[0_24px_48px_rgba(10,30,63,0.12)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => handleMouseEnter("offer")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8">
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* 4 Group Columns (9 cols) */}
                <div className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-6">
                  {whatWeOfferMenu.groups.map((group) => {
                    const GroupIcon = group.icon || Layers;
                    return (
                      <div key={group.title} className="space-y-3">
                        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                          <GroupIcon className="h-4 w-4 text-[#0284c7]" />
                          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0a1e3f]">
                            {group.title}
                          </h3>
                        </div>
                        <ul className="space-y-1">
                          {group.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className="block p-2 rounded-xl hover:bg-[#f0f9ff] transition-all group"
                              >
                                <div className="text-xs font-semibold text-[#0a1e3f] group-hover:text-[#0284c7] flex items-center justify-between">
                                  <span>{item.name}</span>
                                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0284c7]" />
                                </div>
                                {item.desc && (
                                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                    {item.desc}
                                  </p>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Featured Product Promo Card (3 cols) */}
                {whatWeOfferMenu.featured && (
                  <div className="col-span-3 bg-gradient-to-br from-[#0a1e3f] to-[#1e3a8a] text-white p-5 rounded-2xl shadow-md flex flex-col justify-between h-full min-h-[320px] relative overflow-hidden">
                    <div className="space-y-3 relative z-10">
                      {whatWeOfferMenu.featured.tag && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30">
                          {whatWeOfferMenu.featured.tag}
                        </span>
                      )}
                      <h4 className="font-heading font-bold text-sm tracking-tight text-white">
                        {whatWeOfferMenu.featured.title}
                      </h4>
                      <p className="text-xs text-blue-100/80 leading-relaxed">
                        {whatWeOfferMenu.featured.description}
                      </p>
                    </div>

                    <div className="pt-4 relative z-10">
                      <Button
                        variant="pill"
                        size="sm"
                        asChild
                        className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-brand"
                      >
                        <Link to={whatWeOfferMenu.featured.ctaHref}>
                          <span>{whatWeOfferMenu.featured.ctaText}</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Panel 2: Who We Are */}
        {activeDesktopMenu === "about" && (
          <div
            className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-[#e2e8f0] shadow-[0_24px_48px_rgba(10,30,63,0.12)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8">
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* 4 Group Columns (9 cols) */}
                <div className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-6">
                  {whoWeAreMenu.groups.map((group) => {
                    const GroupIcon = group.icon || Layers;
                    return (
                      <div key={group.title} className="space-y-3">
                        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                          <GroupIcon className="h-4 w-4 text-[#0284c7]" />
                          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0a1e3f]">
                            {group.title}
                          </h3>
                        </div>
                        <ul className="space-y-1">
                          {group.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className="block p-2 rounded-xl hover:bg-[#f0f7ff] transition-all group"
                              >
                                <div className="text-xs font-semibold text-[#0a1e3f] group-hover:text-[#0284c7] flex items-center justify-between">
                                  <span>{item.name}</span>
                                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0284c7]" />
                                </div>
                                {item.desc && (
                                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                    {item.desc}
                                  </p>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Institutional Featured Card (3 cols) */}
                {whoWeAreMenu.featured && (
                  <div className="col-span-3 bg-gradient-to-br from-[#0a1e3f] to-[#1e3a8a] text-white p-5 rounded-2xl shadow-md flex flex-col justify-between h-full min-h-[320px] relative overflow-hidden">
                    <div className="space-y-3 relative z-10">
                      {whoWeAreMenu.featured.tag && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                          {whoWeAreMenu.featured.tag}
                        </span>
                      )}
                      <h4 className="font-heading font-bold text-sm tracking-tight text-white">
                        {whoWeAreMenu.featured.title}
                      </h4>
                      <p className="text-xs text-blue-100/80 leading-relaxed">
                        {whoWeAreMenu.featured.description}
                      </p>
                    </div>

                    <div className="pt-4 relative z-10">
                      <Button
                        variant="pill"
                        size="sm"
                        asChild
                        className="w-full bg-white text-[#0a1e3f] hover:bg-blue-50 text-xs font-semibold shadow-xs"
                      >
                        <Link to={whoWeAreMenu.featured.ctaHref}>
                          <span>{whoWeAreMenu.featured.ctaText}</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── 4. Right-Side Sliding Mobile Navigation Drawer ── */}

      {/* Backdrop overlay — click to close */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isMobileMenuOpen
            ? "bg-[#0a1e3f]/50 backdrop-blur-sm pointer-events-auto"
            : "bg-transparent pointer-events-none"
        )}
        aria-hidden="true"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Right-side slide-in drawer panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[82vw] max-w-sm bg-white flex flex-col shadow-[−20px_0_60px_rgba(10,30,63,0.18)] lg:hidden transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Mobile navigation menu"
      >
        {/* ── Drawer Header ── */}
        <div className="h-[64px] px-4 flex items-center justify-between border-b border-[#bae6fd]/60 bg-white shrink-0">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group"
          >
            <div className="h-8 w-8 rounded-xl bg-[#f0f9ff] flex items-center justify-center border border-[#bae6fd]/70 p-1 shadow-2xs">
              <img
                src="/rima-logo.png"
                alt="RIMA Microfinance Bank"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-sm font-bold text-[#0a1e3f] tracking-tight">
                RIMA Bank
              </span>
              <span className="text-[8px] text-slate-500 font-semibold uppercase tracking-widest">
                Microfinance Bank
              </span>
            </div>
          </Link>

          {/* Close button — right aligned */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#f0f9ff] hover:border-[#bae6fd] active:scale-95 transition-all"
            aria-label="Close navigation menu"
          >
            <X className="h-4.5 w-4.5 text-[#0a1e3f]" />
          </button>
        </div>

        {/* ── Scrollable Drawer Body ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain py-4 px-4 space-y-3 pb-24">

          {/* Primary CTA */}
          <Button
            variant="pill"
            size="default"
            className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-10 justify-center shadow-xs"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setShowAppDialog(true);
            }}
          >
            <span>Get the App</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>

          {/* Section divider label */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1 pt-1">
            Navigation
          </p>

          {/* Accordion: What We Offer */}
          <div className="border border-[#bae6fd]/70 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              className={cn(
                "w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm transition-colors",
                expandedMobileCategory === "offer"
                  ? "text-[#0284c7] bg-[#f0f9ff]"
                  : "text-[#0a1e3f] bg-white"
              )}
              onClick={() =>
                setExpandedMobileCategory(
                  expandedMobileCategory === "offer" ? null : "offer"
                )
              }
            >
              <span className="flex items-center gap-2.5">
                <Wallet className="h-4 w-4 text-[#0284c7] shrink-0" />
                What We Offer
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0",
                  expandedMobileCategory === "offer" && "rotate-180 text-[#0284c7]"
                )}
              />
            </button>

            {expandedMobileCategory === "offer" && (
              <div className="border-t border-[#bae6fd]/40 divide-y divide-slate-100">
                {whatWeOfferMenu.groups.map((group) => {
                  const GroupIcon = group.icon || Layers;
                  const isGroupExpanded = expandedMobileGroup === group.title;
                  return (
                    <div key={group.title} className="bg-white">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-[#f8fafc]"
                        onClick={() =>
                          setExpandedMobileGroup(isGroupExpanded ? null : group.title)
                        }
                      >
                        <span className="flex items-center gap-2">
                          <GroupIcon className="h-3.5 w-3.5 text-[#0284c7]" />
                          {group.title}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 text-slate-400 transition-transform duration-200",
                            isGroupExpanded && "rotate-180 text-[#0284c7]"
                          )}
                        />
                      </button>
                      {isGroupExpanded && (
                        <div className="pb-2 bg-[#f8fafc]">
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between py-2 pl-9 pr-4 text-xs text-slate-600 hover:text-[#0284c7] hover:bg-[#f0f9ff] font-medium transition-colors"
                            >
                              <span>{item.name}</span>
                              <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Accordion: Who We Are */}
          <div className="border border-[#bae6fd]/70 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              className={cn(
                "w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm transition-colors",
                expandedMobileCategory === "about"
                  ? "text-[#0284c7] bg-[#f0f9ff]"
                  : "text-[#0a1e3f] bg-white"
              )}
              onClick={() =>
                setExpandedMobileCategory(
                  expandedMobileCategory === "about" ? null : "about"
                )
              }
            >
              <span className="flex items-center gap-2.5">
                <Building2 className="h-4 w-4 text-[#0284c7] shrink-0" />
                Who We Are
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0",
                  expandedMobileCategory === "about" && "rotate-180 text-[#0284c7]"
                )}
              />
            </button>

            {expandedMobileCategory === "about" && (
              <div className="border-t border-[#bae6fd]/40 divide-y divide-slate-100">
                {whoWeAreMenu.groups.map((group) => {
                  const GroupIcon = group.icon || Layers;
                  const isGroupExpanded = expandedMobileGroup === group.title;
                  return (
                    <div key={group.title} className="bg-white">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-[#f8fafc]"
                        onClick={() =>
                          setExpandedMobileGroup(isGroupExpanded ? null : group.title)
                        }
                      >
                        <span className="flex items-center gap-2">
                          <GroupIcon className="h-3.5 w-3.5 text-[#0284c7]" />
                          {group.title}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 text-slate-400 transition-transform duration-200",
                            isGroupExpanded && "rotate-180 text-[#0284c7]"
                          )}
                        />
                      </button>
                      {isGroupExpanded && (
                        <div className="pb-2 bg-[#f8fafc]">
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between py-2 pl-9 pr-4 text-xs text-slate-600 hover:text-[#0284c7] hover:bg-[#f0f9ff] font-medium transition-colors"
                            >
                              <span>{item.name}</span>
                              <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Direct Links */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-2xs divide-y divide-slate-100">
            {[
              { label: "Agency Banking", to: "/agent-banking" },
              { label: "News & Publications", to: "/media" },
              { label: "Branches & Locations", to: "/branches" },
              { label: "Customer Support Desk", to: "/contact" },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-xs font-semibold text-[#0a1e3f] hover:bg-[#f0f9ff] hover:text-[#0284c7] transition-colors"
              >
                <span>{label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </Link>
            ))}
          </div>

          {/* Regulatory footer pill */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-center space-y-0.5">
            <p className="text-[10px] font-bold text-[#0a1e3f]">CBN Licensed Microfinance Bank</p>
            <p className="text-[10px] text-slate-500">Deposits insured by NDIC</p>
            <p className="text-[10px] font-mono text-[#0284c7] font-semibold pt-0.5">USSD: *966*808#</p>
          </div>

        </div>
      </div>

      {/* Download App Dialog Popup */}
      <DownloadAppDialog open={showAppDialog} onOpenChange={setShowAppDialog} />
    </>
  );
}
