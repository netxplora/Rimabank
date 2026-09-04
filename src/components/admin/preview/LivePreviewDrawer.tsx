import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LivePreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LivePreviewDrawer: React.FC<LivePreviewDrawerProps> = ({ isOpen, onClose }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  if (!isOpen) return null;

  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="h-14 bg-[#0a1e3f] text-white px-6 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-sm tracking-tight text-white">
            RIMA Bank CMS
          </span>
          <span className="text-xs text-sky-400 font-semibold px-2 py-0.5 rounded-md bg-white/10">
            Live Landing Page Preview
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              device === 'desktop' ? 'bg-[#0284c7] text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Desktop (Full)</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              device === 'tablet' ? 'bg-[#0284c7] text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Tablet (768px)</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              device === 'mobile' ? 'bg-[#0284c7] text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Mobile (375px)</span>
          </button>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIframeKey(prev => prev + 1)}
            className="h-8 text-xs text-slate-300 hover:text-white hover:bg-white/10"
            title="Reload Preview"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Reload
          </Button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="h-8 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white inline-flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open in Tab
          </a>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 flex items-center justify-center">
        <div className={`h-full w-full ${deviceWidths[device]} bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700 transition-all duration-300 flex flex-col`}>
          <iframe
            key={iframeKey}
            src="/"
            title="RIMA Bank Live Preview"
            className="w-full flex-1 border-0"
          />
        </div>
      </div>
    </div>
  );
};
