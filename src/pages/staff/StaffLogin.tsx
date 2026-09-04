import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Briefcase, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, 'staff', password, 'staff');
      if (result.success) {
        toast.success('Staff officer authenticated successfully');
        const from = (location.state as any)?.from?.pathname || '/staff';
        navigate(from, { replace: true });
      } else {
        setError(result.message || 'Authentication failed. Please verify staff credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during staff authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Emerald Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-xl border border-white/20 hover:scale-105 transition-transform duration-200"
            title="Return to Public Website"
          >
            <img
              src="/rima-logo.png"
              alt="Rima Microfinance Bank"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = 'none';
                el.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center font-heading font-bold text-white text-xl hidden">
              R
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-[11px] font-semibold uppercase tracking-wider border border-emerald-400/30">
            <Briefcase className="h-3 w-3" />
            Branch & Operations Desk
          </span>
        </div>
        <h2 className="text-center text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
          Staff Operations Portal
        </h2>
        <p className="mt-1.5 text-center text-xs text-emerald-100/70">
          Authorized Customer Support & Operations Access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-2xl rounded-2xl border border-white/20">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-xs sm:text-sm text-[#0a1e3f] focus:border-emerald-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1.5">
                Staff Passcode
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-xs sm:text-sm text-[#0a1e3f] focus:border-emerald-600 outline-none transition-all font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Authenticating Staff...' : 'Sign In to Operations Desk'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-xs text-emerald-200 hover:text-white font-medium transition-all"
          >
            ← Return to Rima Bank Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
