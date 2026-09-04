import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminLogin() {
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
      const result = await login(email, 'admin', password, 'admin');
      if (result.success) {
        toast.success('Authenticated successfully. Welcome, Executive Administrator.');
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } else {
        setError(result.message || 'Authentication failed. Please verify administrator credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during administrator authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1e3f] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0284c7]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#0284c7] flex items-center justify-center font-heading font-bold text-white text-2xl shadow-lg shadow-sky-500/30">
            R
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-[#38bdf8] text-[11px] font-semibold uppercase tracking-wider border border-sky-400/30">
            <Shield className="h-3 w-3" />
            Executive Administration
          </span>
        </div>
        <h2 className="text-center text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
          Admin CMS Portal
        </h2>
        <p className="mt-1.5 text-center text-xs text-slate-300">
          Super Administrator Content & Governance Gateway
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
                Administrator Email Address
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-xs sm:text-sm text-[#0a1e3f] focus:border-[#0284c7] outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1.5">
                Administrator Secure Passcode
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-xs sm:text-sm text-[#0a1e3f] focus:border-[#0284c7] outline-none transition-all font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs tracking-wide shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Authenticating Admin...' : 'Sign In as Administrator'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-xs text-sky-300 hover:text-white font-medium transition-all"
          >
            ← Return to Rima Bank Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
