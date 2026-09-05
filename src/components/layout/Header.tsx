import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
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
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  summary: "Comprehensive commercial accounts, high-yield deposits, working capital, and retail payments designed for businesses and individuals.",
  groups: [
    {
      title: "Business Banking",
      icon: Briefcase,
      items: [
        { name: "Business Accounts", href: "/business-banking#corporate", desc: "Corporate checking with multi-signatory governance" },
        { name: "Commercial & SME Loans", href: "/loans", desc: "Structured credit facilities for inventory and expansion" },
        { name: "Working Capital Facilities", href: "/business-banking#sme", desc: "Flexible liquidity to support operational cash flow" },
        { name: "SME Starter Package", href: "/business-banking", desc: "Tailored banking for registered emerging enterprises" },
      ],
    },
    {
      title: "Personal Banking",
      icon: User,
      items: [
        { name: "Savings Accounts", href: "/personal-banking#savings", desc: "Guaranteed interest yields with zero ledger fees" },
        { name: "Current Accounts", href: "/personal-banking#current", desc: "Convenient daily banking with personalized chequebooks" },
        { name: "Target Yield Savings", href: "/personal-banking#savings", desc: "Structured recurring savings up to 12.5% p.a." },
        { name: "Student Banking", href: "/personal-banking#student", desc: "Zero-maintenance accounts for undergraduates" },
      ],
    },
    {
      title: "Payments & Merchant Services",
      icon: CreditCard,
      items: [
        { name: "Digital Banking & App", href: "/digital-banking", desc: "Instant transfers and 24/7 account monitoring" },
        { name: "Debit & Verve Cards", href: "/digital-banking#cards", desc: "Chip & PIN cards for nationwide ATM and POS access" },
        { name: "Merchant Collections & POS", href: "/business-banking", desc: "Reliable POS terminals for physical store settlements" },
      ],
    },
    {
      title: "Agent Banking Network",
      icon: Store,
      items: [
        { name: "Agency Banking Overview", href: "/agent-banking", desc: "Grassroots financial access across 200+ partner locations" },
        { name: "Become a Certified Agent", href: "/agent-banking#join", desc: "Monetize your commercial retail outlet with RIMA Bank" },
        { name: "Agent Portal & Support", href: "/contact", desc: "Dedicated merchant resolution and float management" },
      ],
    },
  ],
  featured: {
    tag: "Commercial Focus",
    title: "SME Working Capital Facility",
    description: "Access competitive interest credit lines with flexible collateral options to scale your trading inventory.",
    ctaText: "Apply for Business Credit",
    ctaHref: "/loans",
  },
};

const whoWeAreMenu: MegaMenuCategory = {
  name: "Who We Are",
  href: "/about",
  summary: "A Central Bank of Nigeria licensed microfinance institution providing secure banking and economic empowerment since 1999.",
  groups: [
    {
      title: "Institutional Heritage",
      icon: Building2,
      items: [
        { name: "About RIMA Bank", href: "/about", desc: "Our 25-year history, capital strength, and institutional mission" },
        { name: "Mission, Vision & Values", href: "/about#vision", desc: "Core principles guiding our financial stewardship" },
        { name: "Corporate Governance", href: "/about#governance", desc: "Regulatory oversight, compliance standards, and leadership" },
      ],
    },
    {
      title: "News & Publications",
      icon: Newspaper,
      items: [
        { name: "Media & Press Releases", href: "/media", desc: "Official press statements and community outreach updates" },
        { name: "Bank Operational Bulletins", href: "/media", desc: "System maintenance schedules and regulatory announcements" },
        { name: "Financial Literacy & Guides", href: "/media", desc: "Practical guidance for managing personal and enterprise cash" },
      ],
    },
    {
      title: "Branch Network & Support",
      icon: MapPin,
      items: [
        { name: "Find Branches & ATMs", href: "/branches", desc: "Locate regional banking centers and ATM terminals" },
        { name: "Customer Help & FAQ Desk", href: "/faq", desc: "Answers to common account and transaction inquiries" },
        { name: "Contact Relationship Officer", href: "/contact", desc: "Direct telephone and email support from our banking team" },
        { name: "Whistleblowing & Compliance", href: "/whistle-blowing", desc: "Confidential channel for reporting ethical concerns" },
      ],
    },
  ],
  featured: {
    tag: "Governance & Safety",
    title: "Licensed & Insured",
    description: "Fully licensed by the Central Bank of Nigeria (CBN). All eligible deposits are insured by the NDIC.",
    ctaText: "Read Institutional Profile",
    ctaHref: "/about",
  },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(null);
  const location = useLocation();
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDesktopMenu(null);
    setExpandedMobileCategory(null);
    setExpandedMobileGroup(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is active
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

  const handleMouseEnter = (name: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveDesktopMenu(name);
  };

  const handleMouseLeave = () => {
    menuTimeout.current = setTimeout(() => {
      setActiveDesktopMenu(null);
    }, 180);
  };

  const isCategoryActive = (category: MegaMenuCategory) => {
    return category.groups.some((group) =>
      group.items.some((item) => {
        if (item.href === "/" && location.pathname === "/") return true;
        const cleanHref = item.href.split("#")[0];
        return cleanHref !== "/" && location.pathname.startsWith(cleanHref);
      })
    );
  };

  return (
    <>
      {/* ── 1. Slim Institutional Top Bar ── */}
      <div className="bg-[#0a1e3f] text-white py-1.5 text-[11px] font-medium tracking-wide hidden md:block border-b border-blue-950/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 text-blue-100/75">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Shield className="h-3.5 w-3.5 text-[#38bdf8]" />
              Central Bank of Nigeria Licensed &bull; NDIC Insured
            </span>
            <span className="text-white/20">|</span>
            <a
              href="tel:+2348119477050"
              className="flex items-center gap-1.5 hover:text-[#38bdf8] transition-colors"
            >
              <Phone className="h-3 w-3 text-[#38bdf8]" />
              +234 811 947 7050
            </a>
          </div>
          <div className="flex items-center gap-5 text-blue-100/75">
            <Link to="/branches" className="hover:text-[#38bdf8] transition-colors">
              Branch & ATM Network
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/faq" className="hover:text-[#38bdf8] transition-colors">
              Help Center
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/whistle-blowing" className="hover:text-[#38bdf8] transition-colors">
              Whistleblowing
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. Primary Navigation Bar ── */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200 bg-white border-b",
          isScrolled
            ? "border-[#cbd5e1] shadow-[0_4px_20px_rgba(10,30,63,0.06)]"
            : "border-[#e2e8f0]"
        )}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-all duration-200",
              isScrolled ? "h-[62px]" : "h-[68px]"
            )}
          >
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="h-10 w-10 rounded-xl bg-[#f0f7ff] flex items-center justify-center border border-[#e2e8f0] group-hover:border-[#0284c7]/40 transition-colors p-1.5 shadow-xs">
                <img
                  src="/rima-logo.png"
                  alt="RIMA Microfinance Bank Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading text-lg font-bold text-[#0a1e3f] tracking-tight">
                  RIMA Bank
                </span>
                <span className="text-[9px] text-[#64748b] font-semibold uppercase tracking-widest">
                  Microfinance Bank
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Only 2 Primary Mega Menus) */}
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
                    "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 outline-none",
                    activeDesktopMenu === "offer" || isCategoryActive(whatWeOfferMenu)
                      ? "text-[#0284c7] bg-[#f0f7ff]"
                      : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f7ff]/70"
                  )}
                  aria-expanded={activeDesktopMenu === "offer"}
                >
                  <span>What We Offer</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      activeDesktopMenu === "offer" ? "rotate-180 text-[#0284c7]" : "text-[#64748b]"
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
                    "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 outline-none",
                    activeDesktopMenu === "about" || isCategoryActive(whoWeAreMenu)
                      ? "text-[#0284c7] bg-[#f0f7ff]"
                      : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f7ff]/70"
                  )}
                  aria-expanded={activeDesktopMenu === "about"}
                >
                  <span>Who We Are</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      activeDesktopMenu === "about" ? "rotate-180 text-[#0284c7]" : "text-[#64748b]"
                    )}
                  />
                </button>
              </div>
            </nav>

            {/* Desktop Actions: Sign In + Create Account */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                to="/digital-banking"
                className="text-xs font-semibold text-[#0a1e3f] hover:text-[#0284c7] px-3.5 py-2 rounded-xl hover:bg-[#f0f7ff] transition-colors"
              >
                Sign In
              </Link>

              <Button
                variant="pill"
                size="default"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-brand text-xs font-semibold px-5 h-10"
              >
                <Link to="/contact">
                  <span>Create Account</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile Header Right: Create Account Shortcut + Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="pill"
                size="sm"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-[11px] font-semibold px-3 h-8 shadow-xs"
              >
                <Link to="/contact">Create Account</Link>
              </Button>

              <button
                type="button"
                className="p-2 rounded-xl border border-[#e2e8f0] text-[#0a1e3f] hover:bg-[#f0f7ff] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                                className="block p-2 rounded-xl hover:bg-[#f0f7ff] transition-all group"
                              >
                                <div className="text-xs font-semibold text-[#0a1e3f] group-hover:text-[#0284c7] flex items-center justify-between">
                                  <span>{item.name}</span>
                                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0284c7]" />
                                </div>
                                {item.desc && (
                                  <p className="text-[11px] text-[#64748b] mt-0.5 leading-snug">
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

                {/* Featured Side Panel (3 cols) */}
                {whatWeOfferMenu.featured && (
                  <div className="col-span-3 bg-[#0a1e3f] text-white rounded-2xl p-5 flex flex-col justify-between h-full border border-blue-900 shadow-sm">
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-[#38bdf8] border border-white/10">
                        {whatWeOfferMenu.featured.tag}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-white leading-snug">
                        {whatWeOfferMenu.featured.title}
                      </h4>
                      <p className="text-xs text-blue-100/70 leading-relaxed">
                        {whatWeOfferMenu.featured.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10">
                      <Link
                        to={whatWeOfferMenu.featured.ctaHref}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38bdf8] hover:text-white transition-colors"
                      >
                        <span>{whatWeOfferMenu.featured.ctaText}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
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
                {/* 3 Group Columns (9 cols) */}
                <div className="col-span-9 grid grid-cols-3 gap-6">
                  {whoWeAreMenu.groups.map((group) => {
                    const GroupIcon = group.icon || Building2;
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
                                  <p className="text-[11px] text-[#64748b] mt-0.5 leading-snug">
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

                {/* Featured Side Panel (3 cols) */}
                {whoWeAreMenu.featured && (
                  <div className="col-span-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-5 flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {whoWeAreMenu.featured.tag}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-[#0a1e3f] leading-snug">
                        {whoWeAreMenu.featured.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {whoWeAreMenu.featured.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-200">
                      <Link
                        to={whoWeAreMenu.featured.ctaHref}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] transition-colors"
                      >
                        <span>{whoWeAreMenu.featured.ctaText}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── 4. Mobile Navigation Drawer ── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-[#e2e8f0] shadow-2xl overflow-y-auto max-h-[calc(100vh-68px)] animate-in slide-in-from-top-1 fade-in duration-200">
            <div className="px-4 py-5 space-y-4">
              {/* Category 1: What We Offer Accordion */}
              <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedMobileCategory(
                      expandedMobileCategory === "offer" ? null : "offer"
                    )
                  }
                  className="w-full flex items-center justify-between p-4 text-left font-heading font-bold text-sm text-[#0a1e3f] bg-slate-50/70 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="h-4 w-4 text-[#0284c7]" />
                    <span>What We Offer</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-slate-500 transition-transform",
                      expandedMobileCategory === "offer" && "rotate-180 text-[#0284c7]"
                    )}
                  />
                </button>

                {expandedMobileCategory === "offer" && (
                  <div className="p-3 space-y-3 bg-white divide-y divide-slate-100">
                    {whatWeOfferMenu.groups.map((group) => (
                      <div key={group.title} className="pt-2 first:pt-0">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedMobileGroup(
                              expandedMobileGroup === group.title ? null : group.title
                            )
                          }
                          className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-[#0a1e3f]"
                        >
                          <span>{group.title}</span>
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 text-slate-400 transition-transform",
                              expandedMobileGroup === group.title && "rotate-180"
                            )}
                          />
                        </button>

                        {(expandedMobileGroup === group.title || true) && (
                          <ul className="space-y-1 pt-1 pl-1">
                            {group.items.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-2 px-2.5 rounded-lg text-xs font-medium text-slate-700 hover:text-[#0284c7] hover:bg-[#f0f7ff]"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category 2: Who We Are Accordion */}
              <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedMobileCategory(
                      expandedMobileCategory === "about" ? null : "about"
                    )
                  }
                  className="w-full flex items-center justify-between p-4 text-left font-heading font-bold text-sm text-[#0a1e3f] bg-slate-50/70 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="h-4 w-4 text-[#0284c7]" />
                    <span>Who We Are</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-slate-500 transition-transform",
                      expandedMobileCategory === "about" && "rotate-180 text-[#0284c7]"
                    )}
                  />
                </button>

                {expandedMobileCategory === "about" && (
                  <div className="p-3 space-y-3 bg-white divide-y divide-slate-100">
                    {whoWeAreMenu.groups.map((group) => (
                      <div key={group.title} className="pt-2 first:pt-0">
                        <span className="block py-1 text-xs font-bold uppercase tracking-wider text-[#0a1e3f]">
                          {group.title}
                        </span>
                        <ul className="space-y-1 pt-1 pl-1">
                          {group.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 px-2.5 rounded-lg text-xs font-medium text-slate-700 hover:text-[#0284c7] hover:bg-[#f0f7ff]"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Direct Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <Button
                  variant="pill"
                  size="default"
                  className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-11"
                  asChild
                >
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  className="w-full border-slate-300 text-[#0a1e3f] text-xs font-semibold h-11"
                  asChild
                >
                  <Link to="/digital-banking" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In to Digital Banking
                  </Link>
                </Button>
              </div>

              {/* Quick Contacts Footer */}
              <div className="pt-4 border-t border-[#e2e8f0] text-center space-y-1.5 text-[11px] text-slate-500">
                <p className="font-semibold text-[#0a1e3f]">RIMA Microfinance Bank</p>
                <p>Licensed by the Central Bank of Nigeria &bull; NDIC Insured</p>
                <div className="pt-1 flex items-center justify-center gap-4 text-xs font-semibold text-[#0284c7]">
                  <a href="tel:+2348119477050">+234 811 947 7050</a>
                  <span>&bull;</span>
                  <Link to="/branches" onClick={() => setIsMobileMenuOpen(false)}>
                    Branches
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

