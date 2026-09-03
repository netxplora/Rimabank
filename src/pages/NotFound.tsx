import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route accessed:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-white py-24">
        <div className="text-center max-w-md mx-auto px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pills bg-[#fdedea] border border-[#e7dcdb] text-[#f73b20] text-xs font-semibold uppercase tracking-ui">
            <span>HTTP Status 404</span>
          </div>

          <div className="font-heading text-8xl font-bold text-[#360802]/10 tracking-tighter leading-none">
            404
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-medium text-[#360802] tracking-tight">
            Page Not Found
          </h1>

          <p className="text-xs text-[#ababab] leading-relaxed">
            The banking page or document requested does not exist or may have been relocated.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <Button variant="pill" size="default" asChild className="shadow-brand">
              <Link to="/">
                <Home className="mr-1.5 h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button variant="outlineNeutral" size="default" asChild className="rounded-buttons">
              <Link to="/contact">
                Contact Desk
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
