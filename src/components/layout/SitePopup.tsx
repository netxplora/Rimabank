import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { PopupConfig } from '@/types/cms';
import { SupabaseSync } from '@/services/supabaseSync';

// ── Local storage key helpers ────────────────────────────────────────────────
const sessionKey = (id: string) => `rima_popup_session_${id}`;
const deviceKey  = (id: string) => `rima_popup_device_${id}`;

function hasSeenSession(id: string) { return !!sessionStorage.getItem(sessionKey(id)); }
function hasSeenDevice(id: string)  { return !!localStorage.getItem(deviceKey(id));   }
function markSession(id: string)    { sessionStorage.setItem(sessionKey(id), '1');      }
function markDevice(id: string)     { localStorage.setItem(deviceKey(id), '1');         }

// ── Should the popup appear on this visit? ────────────────────────────────────
function shouldShow(popup: PopupConfig): boolean {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile  && !popup.showOnMobile)   return false;
  if (!isMobile && !popup.showOnDesktop)  return false;

  switch (popup.displayFrequency) {
    case 'every_visit':     return true;
    case 'once_session':    return !hasSeenSession(popup.id);
    case 'once_device':     return !hasSeenDevice(popup.id);
    case 'until_dismissed': return !hasSeenDevice(popup.id);
    default:                return true;
  }
}

// ── Record first impression once ──────────────────────────────────────────────
function markImpression(popup: PopupConfig) {
  if (!sessionStorage.getItem(`rima_imp_${popup.id}`)) {
    sessionStorage.setItem(`rima_imp_${popup.id}`, '1');
    SupabaseSync.trackPopupEvent(popup.id, 'impression');
  }
}

export function SitePopup() {
  const [popup, setPopup]     = useState<PopupConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [closed,  setClosed]  = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollListenerRef = useRef<(() => void) | null>(null);

  // ── Resolve popup: fetch directly from Supabase ──
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    SupabaseSync.fetchActivePopup().then(data => {
      if (!mounted) return;
      if (data && shouldShow(data)) {
        setPopup(data);
      } else {
        setPopup(null);
      }
      setIsLoading(false);
    }).catch(err => {
      console.warn("Popup fetch error:", err);
      if (mounted) {
        setPopup(null);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      if (triggerTimerRef.current)   clearTimeout(triggerTimerRef.current);
      if (scrollListenerRef.current) window.removeEventListener('scroll', scrollListenerRef.current);
    };
  }, []);

  // ── Wire trigger once popup is resolved ──────────────────────────────────
  useEffect(() => {
    if (!popup || closed) return;

    // Clear any previous timer/scroll listener
    if (triggerTimerRef.current)   clearTimeout(triggerTimerRef.current);
    if (scrollListenerRef.current) window.removeEventListener('scroll', scrollListenerRef.current);

    const show = () => {
      setVisible(true);
      markImpression(popup);
    };

    if (popup.triggerType === 'immediate') {
      show();
    } else if (popup.triggerType === 'delay') {
      triggerTimerRef.current = setTimeout(show, (popup.triggerDelaySeconds ?? 3) * 1000);
    } else if (popup.triggerType === 'scroll') {
      const onScroll = () => {
        if (window.scrollY > 300) {
          show();
          window.removeEventListener('scroll', onScroll);
        }
      };
      scrollListenerRef.current = onScroll;
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      if (triggerTimerRef.current)   clearTimeout(triggerTimerRef.current);
      if (scrollListenerRef.current) window.removeEventListener('scroll', scrollListenerRef.current);
    };
  }, [popup, closed]);

  // Focus trap — move focus to close button when popup appears
  useEffect(() => {
    if (visible && closeRef.current) closeRef.current.focus();
  }, [visible]);

  // Keyboard escape closes
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = () => {
    if (!popup) return;
    setVisible(false);
    setClosed(true);
    SupabaseSync.trackPopupEvent(popup.id, 'dismissal');
    if (popup.displayFrequency === 'once_session') markSession(popup.id);
    if (popup.displayFrequency === 'once_device' || popup.displayFrequency === 'until_dismissed') markDevice(popup.id);
  };

  const handleCta = () => {
    if (!popup) return;
    SupabaseSync.trackPopupEvent(popup.id, 'cta_click');
    if (popup.ctaUrl) {
      if (popup.ctaUrl.startsWith('http')) window.open(popup.ctaUrl, '_blank', 'noopener');
      else window.location.href = popup.ctaUrl;
    }
    handleClose();
  };

  if (isLoading || !popup || !visible) return null;

  return (
    <>
      {/* ── Overlay ── */}
      {popup.overlayEnabled && (
        <div
          className="fixed inset-0 z-[998] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* ── Modal ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-popup-title"
        className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 pointer-events-none"
      >
        <div
          className={`
            pointer-events-auto relative w-full max-w-[320px] sm:max-w-[360px]
            bg-white rounded-2xl shadow-2xl overflow-hidden
            transform transition-all duration-300 ease-out
            motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95
          `}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Featured image */}
          {popup.featuredImage && (
            <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
              <img
                src={popup.featuredImage}
                alt={popup.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="px-4 sm:px-5 pt-3.5 sm:pt-4 pb-4 sm:pb-5 space-y-2 sm:space-y-2.5">
            <h2
              id="site-popup-title"
              className="font-heading font-bold text-[#0a1e3f] text-sm sm:text-base leading-snug"
            >
              {popup.title}
            </h2>

            <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 sm:line-clamp-4">
              {popup.content}
            </p>

            {/* CTA */}
            {popup.ctaText && (
              <button
                onClick={handleCta}
                className="mt-1.5 w-full py-2 sm:py-2.5 px-4 rounded-xl bg-[#0284c7] hover:bg-sky-500 text-white font-semibold text-xs transition-colors duration-200 flex items-center justify-center gap-1.5 shadow-sm shadow-sky-900/20"
              >
                <span>{popup.ctaText}</span>
                {popup.ctaUrl?.startsWith('http') && <ExternalLink className="h-3 w-3 opacity-70" />}
              </button>
            )}

            {/* Dismiss link */}
            <button
              onClick={handleClose}
              className="w-full text-center text-[11px] text-slate-400 hover:text-slate-600 transition-colors py-0.5"
            >
              Dismiss
            </button>
          </div>

          {/* Close button */}
          {popup.showCloseButton && (
            <button
              ref={closeRef}
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-slate-900/10 sm:bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 z-10"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
