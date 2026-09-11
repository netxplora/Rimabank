import React, { useEffect, useState } from 'react';
import { useCMS } from '@/context/CMSContext';
import { RimaQrCode } from '@/components/ui/RimaQrCode';
import { ShieldCheck, ArrowRight, Download, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function AppDistribution() {
  const { systemSettings } = useCMS();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');

  const androidUrl = systemSettings?.androidAppUrl || 'https://play.google.com';
  const iosUrl = systemSettings?.iosAppUrl || 'https://apps.apple.com';
  const fallbackWebUrl = systemSettings?.appWebUrl || '/mobile-banking';

  useEffect(() => {
    // Basic user agent detection for routing purposes
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

    // Track analytics event safely (console.log for demo purposes)
    console.log(`[Analytics] app_qr_scan: detected platform = ${detectedDevice}`);

    // Execute Smart Routing
    if (detectedDevice === 'ios') {
      console.log('[Analytics] app_ios_redirect');
      window.location.replace(iosUrl);
      setHasRedirected(true);
    } else if (detectedDevice === 'android') {
      console.log('[Analytics] app_android_redirect');
      window.location.replace(androidUrl);
      setHasRedirected(true);
    } else if (detectedDevice === 'unknown') {
      console.log('[Analytics] app_web_fallback');
      // If we don't know the device, redirect safely to the mobile banking info page
      window.location.replace(fallbackWebUrl);
      setHasRedirected(true);
    }
    // Desktop simply renders the QR code UI below without redirecting.
  }, [androidUrl, iosUrl, fallbackWebUrl]);

  // If redirecting, we show a minimalist loading state to prevent flash of wrong content
  if (hasRedirected || (deviceType === 'ios' || deviceType === 'android')) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <RefreshCcw className="h-8 w-8 text-[#0284c7] animate-spin mb-4" />
        <h1 className="text-lg font-heading font-bold text-[#0a1e3f] mb-2">
          Opening App Store...
        </h1>
        <p className="text-sm text-slate-500">
          You are being redirected to download the RIMA Mobile App.
        </p>
      </div>
    );
  }

  // Desktop Experience
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center relative">
        <div className="bg-[#0a1e3f] p-8 pb-10 text-white relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-3 relative z-10">
            Your bank, in your hands.
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed max-w-[280px] mx-auto relative z-10">
            Scan this QR code with your phone's camera to instantly download the RIMA Mobile App.
          </p>
        </div>

        <div className="px-8 pb-8 pt-0 relative z-20">
          <div className="flex justify-center -mt-6 mb-8">
            <RimaQrCode size={160} />
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0a1e3f]">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Official RIMA Application</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <a
              href={androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black hover:bg-zinc-900 transition-colors border border-zinc-800 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="shrink-0">
                <path fill="#4285F4" d="M3 1.16A1 1 0 001.5 2.07v19.86a1 1 0 001.5.91l11-6.34L3 1.16z"/>
                <path fill="#EA4335" d="M21.5 10.73l-3.12-1.8-3.23 3.07 3.23 3.07 3.14-1.81a1.5 1.5 0 000-2.53z"/>
                <path fill="#FBBC05" d="M3 22.84l10.63-10.6L3 1.16 14.15 12z"/>
                <path fill="#34A853" d="M3 1.16l11.15 10.88L18.38 8.93 4.5.25A1 1 0 003 1.16z"/>
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[9px] text-zinc-400 uppercase tracking-wide">Get it on</div>
                <div className="text-white font-bold text-[12px]">Google Play</div>
              </div>
            </a>

            <a
              href={iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black hover:bg-zinc-900 transition-colors border border-zinc-800 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white" className="shrink-0">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.79 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zm-2.37-16c-.73.83-1.94 1.46-2.94 1.5-.13-1.17.34-2.35 1.04-3.19.69-.85 1.83-1.51 2.95-1.42.15 1.15-.41 2.35-1.05 3.11z"/>
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[9px] text-zinc-400 uppercase tracking-wide">Download on the</div>
                <div className="text-white font-bold text-[12px]">App Store</div>
              </div>
            </a>
          </div>

          <Button variant="ghost" className="w-full text-slate-500 hover:bg-slate-100 hover:text-[#0a1e3f]" asChild>
            <Link to={fallbackWebUrl}>Continue to RIMA Website</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
