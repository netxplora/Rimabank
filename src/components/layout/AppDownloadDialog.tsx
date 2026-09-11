import React, { useState } from 'react';
import { X } from 'lucide-react';
import { appStoreLinks } from '@/config/appStoreLinks';

interface AppDownloadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AppDownloadDialog({ open, onClose }: AppDownloadDialogProps) {
  const [selected, setSelected] = useState<'android' | 'ios' | null>(null);

  if (!open) return null;

  const handleInstall = () => {
    if (selected === 'android' && appStoreLinks.android) {
      window.open(appStoreLinks.android, '_blank', 'noopener');
    } else if (selected === 'ios' && appStoreLinks.ios) {
      window.open(appStoreLinks.ios, '_blank', 'noopener');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Download the App</h2>
        <p className="mb-4 text-sm text-gray-600">Select your device type:</p>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelected('android')}
            className={`flex-1 py-2 px-3 border rounded ${selected === 'android' ? 'border-[#0284c7] text-[#0284c7]' : 'border-gray-300 text-gray-700'}`}
          >
            Android
          </button>
          <button
            onClick={() => setSelected('ios')}
            className={`flex-1 py-2 px-3 border rounded ${selected === 'ios' ? 'border-[#0284c7] text-[#0284c7]' : 'border-gray-300 text-gray-700'}`}
          >
            iOS
          </button>
        </div>
        <button
          onClick={handleInstall}
          disabled={!selected || (selected === 'android' && !appStoreLinks.android) || (selected === 'ios' && !appStoreLinks.ios)}
          className="w-full py-2 bg-[#0284c7] text-white rounded disabled:opacity-50"
        >
          Install or Get app
        </button>
      </div>
    </div>
  );
}
