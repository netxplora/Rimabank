import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { PageLoadingBar } from "./PageLoadingBar";
import { PageTransition } from "./PageTransition";
import { AnnouncementBanner } from "./AnnouncementBanner";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
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
    </div>
  );
}
