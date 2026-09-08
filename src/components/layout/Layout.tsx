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
import { MaintenanceView } from "./MaintenanceView";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { systemSettings } = useCMS();
  const { isAuthenticated } = useAuth();

  // If maintenance mode is active and visitor is not authenticated as staff/admin
  if (systemSettings?.maintenanceMode && !isAuthenticated) {
    return <MaintenanceView />;
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#f8fafc]">
      <ScrollToTop />
      <PageLoadingBar />
      <AnnouncementBanner />
      <Header />
      <main className="flex-1 w-full flex flex-col bg-white">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <SitePopup />
    </div>
  );
}
