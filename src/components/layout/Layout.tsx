import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { PageLoadingBar } from "./PageLoadingBar";
import { PageTransition } from "./PageTransition";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { SitePopup } from "./SitePopup";
import { useCMS } from "@/context/CMSContext";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { systemSettings } = useCMS();
  const { isAuthenticated, isAdmin, isStaff } = useAuth();

  // If maintenance mode is active and visitor is not authenticated as staff/admin
  if (systemSettings?.maintenanceMode && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <header className="py-5 px-6 border-b border-[#e2e8f0] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-lg text-[#0a1e3f]">
              RIMA MICROFINANCE BANK
            </span>
          </div>
          <Link
            to="/admin/login"
            className="text-xs font-semibold text-slate-500 hover:text-[#0284c7]"
          >
            Staff & Portal Sign In
          </Link>
        </header>

        <main className="flex-1 max-w-2xl mx-auto px-4 py-16 flex flex-col items-center text-center justify-center space-y-6">
          <div className="h-16 w-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#0a1e3f]">
              Scheduled System Maintenance
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
              {systemSettings.maintenanceMessage ||
                "Our online banking systems are currently undergoing scheduled infrastructure upgrades to enhance service performance. Full service will resume shortly."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] w-full text-xs space-y-3 text-left">
            <h3 className="font-heading font-bold text-xs text-[#0a1e3f] uppercase tracking-wider">
              Emergency Customer Support Channels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#0284c7]" />
                <span>+234 800 000 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#0284c7]" />
                <span>support@rimamfb.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#0284c7]" />
                <span>Available 24/7 for Card Security</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-4 text-center text-xs text-slate-400 border-t border-[#e2e8f0] bg-white">
          © {new Date().getFullYear()} Rima Microfinance Bank Ltd. Licensed by the Central Bank of Nigeria.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      <ScrollToTop />
      <PageLoadingBar />
      <AnnouncementBanner />
      <Header />
      <main className="flex-1 w-full flex flex-col">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <SitePopup />
    </div>
  );
}
