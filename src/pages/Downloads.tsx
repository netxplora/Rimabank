import { Layout } from "@/components/layout/Layout";
import { Download, FileText, Smartphone, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Downloads() {
  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#e7dcdb]/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fdedea] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdedea] border border-[#e7dcdb] text-[#360802] text-xs font-semibold uppercase tracking-wider">
              <span>Official Resources</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#360802] tracking-tight leading-[1.05]">
              Forms, documents & <span className="text-[#f73b20]">downloads</span>.
            </h1>

            <p className="text-[#360802]/80 text-base sm:text-lg leading-relaxed">
              Access official account opening packages, loan application mandates, and regulatory policy documents.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Column Responsive Downloads Grid */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e7dcdb]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Mobile Applications 3D Card */}
            <div className="card-3d p-7 sm:p-8 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d hover:border-[#f73b20]/40 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e7dcdb] text-[#477ee9] flex items-center justify-center mb-6 shadow-sm">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#360802] mb-2">Mobile Applications</h3>
                <p className="text-xs text-[#ababab] leading-relaxed mb-6">
                  Direct installers for mobile banking on iOS and Android smartphones.
                </p>

                <div className="space-y-3">
                  <a
                    href="#download-android"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold text-[#360802] hover:border-[#f73b20] transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-[#f73b20]" />
                      Android Package (APK)
                    </span>
                    <span className="text-[10px] text-[#ababab]">v2.4.1</span>
                  </a>

                  <a
                    href="#download-ios"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold text-[#360802] hover:border-[#f73b20] transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-[#f73b20]" />
                      Apple iOS App Store
                    </span>
                    <span className="text-[10px] text-[#ababab]">iOS 13+</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Account Opening Forms 3D Card */}
            <div className="card-3d p-7 sm:p-8 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d hover:border-[#f73b20]/40 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#bcffbb] text-[#34c771] flex items-center justify-center mb-6 shadow-sm">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#360802] mb-2">Account Opening Forms</h3>
                <p className="text-xs text-[#ababab] leading-relaxed mb-6">
                  Printable forms for offline branch account origination and mandate changes.
                </p>

                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold text-[#360802] hover:border-[#f73b20] transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#34c771]" />
                      Individual Account Form (PDF)
                    </span>
                    <span className="text-[10px] text-[#ababab]">1.2 MB</span>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold text-[#360802] hover:border-[#f73b20] transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#34c771]" />
                      Corporate Account Form (PDF)
                    </span>
                    <span className="text-[10px] text-[#ababab]">1.8 MB</span>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold text-[#360802] hover:border-[#f73b20] transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#34c771]" />
                      Mandate Update Form (PDF)
                    </span>
                    <span className="text-[10px] text-[#ababab]">0.8 MB</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Regulatory Disclosures 3D Card */}
            <div className="card-3d p-7 sm:p-8 rounded-2xl bg-white border border-[#e7dcdb] shadow-3d hover:border-[#f73b20]/40 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#fdedea] text-[#f73b20] flex items-center justify-center mb-6 shadow-sm">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#360802] mb-2">Policies & Disclosures</h3>
                <p className="text-xs text-[#ababab] leading-relaxed mb-6">
                  Statutory customer protection frameworks and regulatory guidelines.
                </p>

                <div className="space-y-3">
                  <Link
                    to="/terms"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold text-[#360802] hover:border-[#f73b20] transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#f73b20]" />
                      General Terms & Conditions
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#f73b20]" />
                  </Link>

                  <Link
                    to="/privacy"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold text-[#360802] hover:border-[#f73b20] transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#f73b20]" />
                      Privacy & Data Protection Policy
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#f73b20]" />
                  </Link>

                  <a
                    href="#"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#fdedea] border border-[#e7dcdb] text-xs font-semibold text-[#360802] hover:border-[#f73b20] transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#f73b20]" />
                      CBN Consumer Protection Guide
                    </span>
                    <span className="text-[10px] text-[#ababab]">2.1 MB</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
