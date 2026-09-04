import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface StaffProtectedRouteProps {
  children: React.ReactNode;
}

export const StaffProtectedRoute: React.FC<StaffProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/staff/login" state={{ from: location }} replace />;
  }

  // Strict portal isolation: Admin is redirected to the Executive Admin portal
  if (user.role !== 'staff') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#e2e8f0] p-8 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            i
          </div>
          <h2 className="text-xl font-heading font-semibold text-[#0a1e3f] mb-2">
            Staff Portal Restricted
          </h2>
          <p className="text-xs text-[#64748b] leading-relaxed mb-6">
            You are currently authenticated as an <span className="font-semibold text-[#0a1e3f]">Executive Administrator</span>. This portal is tailored exclusively for Branch & Operations Staff.
          </p>
          <a
            href="/admin"
            className="inline-block px-5 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            Go to Executive Admin Portal →
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
