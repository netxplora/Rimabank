import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
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

          {/* Legal / Info Routes */}
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/cookies" element={<Legal />} />
          <Route path="/complaints" element={<Legal />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
