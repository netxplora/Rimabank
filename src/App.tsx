import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import DigitalBanking from "./pages/DigitalBanking";
import Media from "./pages/Media";
import MediaPost from "./pages/MediaPost";
import Contact from "./pages/Contact";
import Branches from "./pages/Branches";
import WhistleBlowing from "./pages/WhistleBlowing";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import BusinessBanking from "./pages/BusinessBanking";
import LoanServices from "./pages/banking/LoanServices";
import PersonalBanking from "./pages/PersonalBanking";
import AgentBanking from "./pages/AgentBanking";
import Support from "./pages/Support";

// CMS Context & Auth
import { CMSProvider } from "./context/CMSContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/layout/AdminLayout";

// Admin CMS Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LandingPageEditor from "./pages/admin/LandingPageEditor";
import PromotionsManager from "./pages/admin/PromotionsManager";
import AnnouncementsManager from "./pages/admin/AnnouncementsManager";
import PublicationsManager from "./pages/admin/PublicationsManager";
import EnquiriesManager from "./pages/admin/EnquiriesManager";
import MediaLibrary from "./pages/admin/MediaLibrary";
import StaffManager from "./pages/admin/StaffManager";
import AuditLogsView from "./pages/admin/AuditLogsView";
import SystemSettingsView from "./pages/admin/SystemSettingsView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CMSProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              {/* Public Website Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/personal-banking" element={<PersonalBanking />} />
              <Route path="/business-banking" element={<BusinessBanking />} />
              <Route path="/loans" element={<LoanServices />} />
              <Route path="/agent-banking" element={<AgentBanking />} />
              <Route path="/digital-banking" element={<DigitalBanking />} />
              <Route path="/media" element={<Media />} />
              <Route path="/media/:slug" element={<MediaPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/whistle-blowing" element={<WhistleBlowing />} />

              {/* Legal & Information Routes */}
              <Route path="/privacy" element={<Legal />} />
              <Route path="/terms" element={<Legal />} />
              <Route path="/cookies" element={<Legal />} />
              <Route path="/complaints" element={<Legal />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/support" element={<Support />} />

              {/* Administrative CMS Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="content" element={<LandingPageEditor />} />
                <Route path="promotions" element={<PromotionsManager />} />
                <Route path="announcements" element={<AnnouncementsManager />} />
                <Route path="publications" element={<PublicationsManager />} />
                <Route path="enquiries" element={<EnquiriesManager />} />
                <Route path="media" element={<MediaLibrary />} />

                {/* Governance (Admin Only) */}
                <Route
                  path="staff"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <StaffManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="audit-logs"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AuditLogsView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <SystemSettingsView />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CMSProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
