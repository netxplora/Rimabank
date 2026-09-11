import React, { useEffect, useState } from 'react';
import { useCMS } from '@/context/CMSContext';
import { RimaQrCode } from '@/components/ui/RimaQrCode';
import { ShieldCheck, RefreshCcw, QrCode, Smartphone, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function AppDistribution() {
  const { systemSettings } = useCMS();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');

  const androidUrl = systemSettings?.androidAppUrl || 'https://play.google.com';
  const iosUrl = systemSettings?.iosAppUrl || 'https://apps.apple.com';
  const fallbackWebUrl = systemSettings?.appWebUrl || '/mobile-banking';
  const ussdCode = systemSettings?.ussdCode || '*966*808#';

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    let detectedDevice: 'ios' | 'android' | 'desktop' | 'unknown' = 'unknown';

    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
      detectedDevice = 'ios';
    } else if (/android/i.test(ua)) {
      detectedDevice = 'android';
    } else if (/Windows|Macintosh|Linux/.test(ua)) {
      detectedDevice = 'desktop';
    }

    setDeviceType(detectedDevice);
    console.log(`[Analytics] app_qr_scan: detected platform = ${detectedDevice}`);

    if (detectedDevice === 'ios') {
      window.location.replace(iosUrl);
      setHasRedirected(true);
    } else if (detectedDevice === 'android') {
      window.location.replace(androidUrl);
      setHasRedirected(true);
    } else if (detectedDevice === 'unknown') {
      window.location.replace(fallbackWebUrl);
      setHasRedirected(true);
    }
  }, [androidUrl, iosUrl, fallbackWebUrl]);

  // ── Redirecting state ──────────────────────────────────────────────────────
  if (hasRedirected || deviceType === 'ios' || deviceType === 'android') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 w-full max-w-xs mx-auto">
          <RefreshCcw className="h-8 w-8 text-[#0284c7] animate-spin mx-auto mb-4" />
          <h1 className="text-base font-heading font-bold text-[#0a1e3f] mb-1.5">
            Opening the app store...
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            You are being redirected to download the RIMA Mobile Banking App.
          </p>
        </div>
      </div>
    );
  }

  // ── Desktop / large screen ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">

      {/* Top brand header */}
      <header className="w-full bg-[#0a1e3f] px-4 py-3 flex items-center justify-between shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/rima-logo.png"
            alt="RIMA MFB"
            className="h-6 sm:h-7 w-auto object-contain brightness-200"
          />
        </Link>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-sky-200 font-medium">
          <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400 shrink-0" />
          <span>CBN Licensed · NDIC Insured</span>
        </div>
      </header>

      {/* Main — vertically centred, fills remaining space */}
      <main className="flex-1 flex items-start sm:items-center justify-center px-3 py-6 sm:px-4 sm:py-10">
        <div className="w-full max-w-[360px] sm:max-w-md lg:max-w-lg mx-auto">

          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">

            {/* ── Card dark header ── */}
            <div className="bg-[#0a1e3f] px-5 py-6 sm:px-8 sm:py-8 relative overflow-hidden">
              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#0284c7]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {/* Badge pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 mb-3">
                  <Smartphone className="h-3 w-3 text-sky-300" />
                  <span className="text-sky-200 text-[10px] font-semibold uppercase tracking-wider">
                    RIMA Mobile App
                  </span>
                </div>

                {/* ── HEADING — explicit text-white ── */}
                <h1 className="text-white font-heading text-lg sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug mb-2">
                  Download the RIMA Mobile Banking App
                </h1>

                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  Scan the QR code with your phone camera to go directly to the official
                  app download page on Google Play or the App Store.
                </p>
              </div>
            </div>

            {/* ── Card body ── */}
            <div className="px-4 pb-5 sm:px-7 sm:pb-7 pt-5 space-y-5">

              {/* QR Code */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0284c7]">
                  <QrCode className="h-3.5 w-3.5" />
                  <span>Point your phone camera at the code below</span>
                </div>

                {/* Responsive QR size: smaller on xs, larger on sm+ */}
                <div className="block sm:hidden">
                  <RimaQrCode size={140} />
                </div>
                <div className="hidden sm:block">
                  <RimaQrCode size={172} />
                </div>

                <p className="text-[11px] text-slate-400 text-center max-w-[220px] leading-relaxed">
                  Works with Android and iPhone camera apps. No separate QR scanner needed.
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <div className="flex-1 border-t border-slate-100" />
                <span>or download directly</span>
                <div className="flex-1 border-t border-slate-100" />
              </div>

              {/* ── Store badges — always side by side ── */}
              <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
                <a
                  href={androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-10 sm:h-11 w-auto"
                  />
                </a>
                <a
                  href={iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="h-10 sm:h-11 w-auto"
                  />
                </a>
              </div>

              {/* Trust chips — 2-column grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                {[
                  '256-bit encryption',
                  'Biometric login',
                  '24/7 instant transfers',
                  'Bill payments',
                ].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-2"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* USSD fallback */}
              <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-[#f0f7ff] border border-sky-100">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#0284c7] shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">No smartphone? Use USSD</div>
                    <div className="font-mono text-sm font-bold text-[#0a1e3f]">{ussdCode}</div>
                  </div>
                </div>
                <a
                  href={`tel:${encodeURIComponent(ussdCode)}`}
                  className="text-[11px] font-semibold text-[#0284c7] hover:underline shrink-0"
                >
                  Dial now
                </a>
              </div>

              {/* Back to website */}
              <Button
                variant="ghost"
                className="w-full text-xs text-slate-500 hover:bg-slate-50 hover:text-[#0a1e3f] h-9"
                asChild
              >
                <Link to={fallbackWebUrl}>Continue to RIMA Website</Link>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-[11px] text-slate-400 mt-4">
            © {new Date().getFullYear()} RIMA Microfinance Bank Ltd. CBN Licensed.
          </p>
        </div>
      </main>
    </div>
  );
}
