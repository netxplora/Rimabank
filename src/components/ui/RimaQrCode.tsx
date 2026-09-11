import React from 'react';
import QRCode from 'react-qr-code';

interface RimaQrCodeProps {
  size?: number;
  className?: string;
  url?: string;
}

export function RimaQrCode({ size = 180, className = '', url }: RimaQrCodeProps) {
  // Use the canonical /app destination for all QR codes, unless explicitly overridden
  const canonicalUrl = url || `${window.location.origin}/app`;

  return (
    <div className={`bg-white p-3 rounded-2xl border border-slate-200 shadow-sm inline-flex flex-col items-center justify-center ${className}`}>
      <QRCode
        value={canonicalUrl}
        size={size}
        level="Q"
        bgColor="#ffffff"
        fgColor="#0a1e3f"
        className="rounded-lg"
      />
      <div className="mt-2 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
        Scan to Download
      </div>
    </div>
  );
}
