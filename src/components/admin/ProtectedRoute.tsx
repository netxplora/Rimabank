import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/cms';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: {
    action: 'create' | 'read' | 'update' | 'delete' | 'publish' | 'manage_staff' | 'manage_settings' | 'manage_audit';
    resource: string;
  };
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermission
}) => {
  const { user, isAuthenticated, can } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#e2e8f0] p-8 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-heading font-semibold text-[#0a1e3f] mb-2">
            Restricted Privilege
          </h2>
          <p className="text-xs text-[#64748b] leading-relaxed mb-6">
            Your current role (<span className="font-semibold capitalize text-[#0a1e3f]">{user.role}</span>) does not have sufficient permissions to access this governance module.
          </p>
          <a
            href="/admin"
            className="inline-block px-5 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold tracking-wide transition-all"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  if (requiredPermission && !can(requiredPermission.action, requiredPermission.resource)) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#e2e8f0] p-8 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-heading font-semibold text-[#0a1e3f] mb-2">
            Action Unauthorized
          </h2>
          <p className="text-xs text-[#64748b] leading-relaxed mb-6">
            You do not have the required permission ({requiredPermission.action} on {requiredPermission.resource}) to view this resource.
          </p>
          <a
            href="/admin"
            className="inline-block px-5 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold tracking-wide transition-all"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
