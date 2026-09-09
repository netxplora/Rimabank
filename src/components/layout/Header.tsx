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
  LogIn
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
  summary: "Comprehensive savings, credit facilities, business banking, and payment solutions designed around everyday customer needs.",
  groups: [
    {
      title: "Personal Banking",
      icon: User,
      items: [
        { name: "Savings Accounts", href: "/personal-banking#savings", desc: "Guaranteed interest yields with zero ledger maintenance fees" },
        { name: "Personal Accounts", href: "/personal-banking#personal", desc: "Day-to-day transaction accounts with debit card access" },
        { name: "Current Accounts", href: "/personal-banking#current", desc: "Flexible checking with personalized chequebook facilities" },
        { name: "Target Yield Savings", href: "/personal-banking#target", desc: "Disciplined goal savings with high annual returns" },
        { name: "Debit & Verve Cards", href: "/digital-banking#cards", desc: "Secure chip & PIN cards for nationwide ATM and POS transactions" },
        { name: "Digital Banking", href: "/digital-banking", desc: "24/7 balance checks, transfers, and transaction monitoring" },
      ],
    },
    {
      title: "Business Banking",
      icon: Briefcase,
      items: [
        { name: "Business Accounts", href: "/business-banking#corporate", desc: "Dedicated commercial checking with multi-signatory governance" },
        { name: "SME Banking Packages", href: "/business-banking#sme", desc: "Tailored operational support for growing enterprises" },
        { name: "Business Loans", href: "/loans#business", desc: "Structured credit facilities for inventory and business expansion" },
        { name: "Working Capital Facilities", href: "/loans#working-capital", desc: "Flexible liquidity to maintain steady operational cash flow" },
        { name: "Payments & Collections", href: "/business-banking#payments", desc: "Streamlined multi-channel client payment collection" },
        { name: "Merchant POS Terminals", href: "/business-banking#merchant", desc: "Reliable POS terminals for physical store settlements" },
      ],
    },
    {
      title: "Access & Payments",
      icon: Smartphone,
      items: [
        { name: "USSD Banking (*966*808#)", href: "/digital-banking#ussd", desc: "Bank instantly from any mobile phone without internet connection" },
        { name: "Instant Transfers", href: "/digital-banking#transfers", desc: "Fast interbank and intra-bank electronic settlements" },
        { name: "Agent Banking Network", href: "/agent-banking", desc: "Cash deposits, withdrawals, and account opening across Rivers State" },
        { name: "Become an Agent", href: "/agent-banking#join", desc: "Earn recurring commissions as a certified banking agent" },
        { name: "Cards & Electronic Channels", href: "/digital-banking#cards", desc: "Verve cards and ATM network access nationwide" },
      ],
    },
    {
      title: "Financing & Credit",
      icon: TrendingUp,
      items: [
        { name: "Business Expansion Loans", href: "/loans#business", desc: "Medium-term capital for scaling commercial operations" },
        { name: "SME Working Capital", href: "/loans#working-capital", desc: "Quick-turnaround credit for stock purchases and payroll" },
        { name: "Microcredit Facilities", href: "/loans#microcredit", desc: "Accessible group and individual credit for market traders" },
        { name: "Asset Financing", href: "/loans#asset", desc: "Financing for machinery, commercial vehicles, and equipment" },
        { name: "Salary Advance", href: "/loans#salary", desc: "Short-term liquidity for verified salary earners" },
      ],
    },
  ],
  featured: {
    tag: "Goal Savings",
    title: "Target Yield Savings",
    description: "Save consistently toward business expansion, school fees, or emergencies with guaranteed annual interest.",
    ctaText: "Explore Target Savings",
    ctaHref: "/personal-banking#savings",
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
        { name: "About Us", href: "/about", desc: "Our 25-year heritage, financial strength, and community mission" },
        { name: "Our Mission & Vision", href: "/about#vision", desc: "Core principles guiding our microfinance stewardship" },
        { name: "Institutional Values", href: "/about#values", desc: "Integrity, transparency, accessibility, and client growth" },
      ],
    },
    {
      title: "Leadership & Stewardship",
      icon: Users,
      items: [
        { name: "Board of Directors", href: "/about#board", desc: "Experienced fiduciaries ensuring regulatory compliance" },
        { name: "Executive Management", href: "/about#management", desc: "Seasoned banking professionals driving operational excellence" },
      ],
    },
    {
      title: "Corporate Information",
      icon: Newspaper,
      items: [
        { name: "Corporate Governance", href: "/about#governance", desc: "Statutory risk frameworks, compliance, and auditing" },
        { name: "News & Bulletins", href: "/media", desc: "Official public notices, press statements, and updates" },
        { name: "Financial Guides & Tips", href: "/media", desc: "Practical guidance on cash flow, savings, and debt management" },
        { name: "Careers at RIMA Bank", href: "/about#careers", desc: "Join our dynamic team dedicated to financial inclusion" },
      ],
    },
    {
      title: "Contact & Locations",
      icon: MapPin,
      items: [
        { name: "Contact Us", href: "/contact", desc: "Reach our customer service desk via telephone, email, or visit" },
        { name: "Branches & Locations", href: "/branches", desc: "Locate our Head Office and regional banking centers in Rivers State" },
        { name: "Customer Support & FAQs", href: "/faq", desc: "Answers to common account and transaction questions" },
        { name: "Whistleblowing Channel", href: "/whistle-blowing", desc: "Confidential ethics and compliance reporting desk" },
      ],
    },
  ],
  featured: {
    tag: "Licensed & Protected",
    title: "Institutional Safety",
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
          <div className="flex items-center gap-6 text-blue-100/80">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Shield className="h-3.5 w-3.5 text-[#38bdf8]" />
              Central Bank of Nigeria Licensed &bull; NDIC Insured &bull; Rivers State, Nigeria
            </span>
          </div>
          <div className="flex items-center gap-5 text-blue-100/75">
            <Link to="/branches" className="hover:text-[#38bdf8] transition-colors">
              Branches & Locations
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/faq" className="hover:text-[#38bdf8] transition-colors">
              Help & FAQs
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
          "sticky top-0 z-50 w-full transition-all duration-200 bg-white border-b border-[#e2e8f0]",
          isScrolled ? "shadow-sm border-[#cbd5e1]" : "border-[#e2e8f0]"
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

            {/* Desktop Navigation Links */}
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
                    "flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 outline-none",
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

              {/* Direct Link 3: Agency Banking */}
              <Link
                to="/agent-banking"
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150",
                  location.pathname === "/agent-banking"
                    ? "text-[#0284c7] bg-[#f0f7ff]"
                    : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f7ff]/70"
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
                    ? "text-[#0284c7] bg-[#f0f7ff]"
                    : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f7ff]/70"
                )}
              >
                Media & News
              </Link>

              {/* Direct Link 5: Contact */}
              <Link
                to="/contact"
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150",
                  location.pathname === "/contact"
                    ? "text-[#0284c7] bg-[#f0f7ff]"
                    : "text-[#0a1e3f] hover:text-[#0284c7] hover:bg-[#f0f7ff]/70"
                )}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Action: Create Account CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Button
                variant="pill"
                size="default"
                asChild
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-brand text-xs font-semibold px-5 h-9"
              >
                <Link to="/contact">
                  <span>Create Account</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile Header Right: Create Account CTA + Menu Trigger */}
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
                className="p-2 rounded-xl border border-[#e2e8f0] text-[#0a1e3f] bg-white hover:bg-[#f0f7ff] active:scale-95 transition-all shadow-xs"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 text-[#0284c7]" /> : <Menu className="h-5 w-5" />}
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

      {/* ── 4. Mobile Menu Drawer ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[62px] sm:top-[68px] z-40 bg-white lg:hidden flex flex-col overflow-y-auto animate-in slide-in-from-bottom-2 duration-200">
          <div className="p-4 space-y-4 pb-24">
            {/* Category 1: What We Offer */}
            <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden bg-[#f8fafc]">
              <button
                type="button"
                className="w-full p-4 flex items-center justify-between text-left font-heading font-bold text-sm text-[#0a1e3f] bg-white border-b border-[#e2e8f0]"
                onClick={() =>
                  setExpandedMobileCategory(
                    expandedMobileCategory === "offer" ? null : "offer"
                  )
                }
              >
                <span>What We Offer</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-500 transition-transform duration-200",
                    expandedMobileCategory === "offer" && "rotate-180 text-[#0284c7]"
                  )}
                />
              </button>

              {expandedMobileCategory === "offer" && (
                <div className="p-3 space-y-4 bg-white">
                  {whatWeOfferMenu.groups.map((group) => {
                    const GroupIcon = group.icon || Layers;
                    const isGroupExpanded = expandedMobileGroup === group.title;
                    return (
                      <div key={group.title} className="border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between text-left font-semibold text-xs text-[#0a1e3f]"
                          onClick={() => setExpandedMobileGroup(isGroupExpanded ? null : group.title)}
                        >
                          <span className="flex items-center gap-2">
                            <GroupIcon className="h-3.5 w-3.5 text-[#0284c7]" />
                            {group.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 text-slate-400 transition-transform duration-200",
                              isGroupExpanded && "rotate-180"
                            )}
                          />
                        </button>

                        {isGroupExpanded && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200 space-y-1">
                            {group.items.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="block py-1.5 px-2 rounded-lg text-xs text-slate-700 hover:text-[#0284c7] hover:bg-sky-50 font-medium"
                              >
                                {item.name}
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

            {/* Category 2: Who We Are */}
            <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden bg-[#f8fafc]">
              <button
                type="button"
                className="w-full p-4 flex items-center justify-between text-left font-heading font-bold text-sm text-[#0a1e3f] bg-white border-b border-[#e2e8f0]"
                onClick={() =>
                  setExpandedMobileCategory(
                    expandedMobileCategory === "about" ? null : "about"
                  )
                }
              >
                <span>Who We Are</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-500 transition-transform duration-200",
                    expandedMobileCategory === "about" && "rotate-180 text-[#0284c7]"
                  )}
                />
              </button>

              {expandedMobileCategory === "about" && (
                <div className="p-3 space-y-4 bg-white">
                  {whoWeAreMenu.groups.map((group) => {
                    const GroupIcon = group.icon || Layers;
                    const isGroupExpanded = expandedMobileGroup === group.title;
                    return (
                      <div key={group.title} className="border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between text-left font-semibold text-xs text-[#0a1e3f]"
                          onClick={() => setExpandedMobileGroup(isGroupExpanded ? null : group.title)}
                        >
                          <span className="flex items-center gap-2">
                            <GroupIcon className="h-3.5 w-3.5 text-[#0284c7]" />
                            {group.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 text-slate-400 transition-transform duration-200",
                              isGroupExpanded && "rotate-180"
                            )}
                          />
                        </button>

                        {isGroupExpanded && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200 space-y-1">
                            {group.items.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="block py-1.5 px-2 rounded-lg text-xs text-slate-700 hover:text-[#0284c7] hover:bg-sky-50 font-medium"
                              >
                                {item.name}
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

            {/* Mobile Direct Action Button */}
            <div className="pt-2">
              <Button
                variant="pill"
                size="lg"
                asChild
                className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold h-11 justify-center shadow-brand"
              >
                <Link to="/contact">
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
