import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@rimamfb.com');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>('admin');
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
      const result = await login(email, role);
      if (result.success) {
        toast.success(`Welcome to RIMA Bank CMS (${role === 'admin' ? 'Super Administrator' : 'Staff Officer'})`);
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } else {
        setError(result.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during authentication.');
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
        <h2 className="text-center text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
          RIMA BANK CMS
        </h2>
        <p className="mt-1.5 text-center text-xs text-slate-300">
          Authorized Banking Content Management Portal
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
                Official Staff Email
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@rimamfb.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-xs sm:text-sm text-[#0a1e3f] focus:border-[#0284c7] outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1.5">
                Password / Secure Passcode
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

            {/* Role Persona Choice (For testing ease) */}
            <div>
              <label className="block text-xs font-semibold text-[#0a1e3f] mb-1.5">
                Target Role Session
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRole('admin');
                    setEmail('admin@rimamfb.com');
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                    role === 'admin'
                      ? 'bg-sky-50 border-[#0284c7] text-[#0284c7] font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole('staff');
                    setEmail('sarah.danladi@rimamfb.com');
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                    role === 'staff'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700 font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Staff Officer
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs tracking-wide shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Administration'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Institutional Compliance Notice */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted Banking Administration</span>
            </div>
          </div>
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
