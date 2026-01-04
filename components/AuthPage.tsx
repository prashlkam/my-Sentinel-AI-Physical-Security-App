
import React, { useState } from 'react';
import { ShieldAlert, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

interface AuthPageProps {
  onLogin: (userData: { name: string; email: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mocking an API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: formData.name || 'Security Officer',
        email: formData.email,
      });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600/10 rounded-3xl mb-4 border border-blue-500/20">
            <ShieldAlert className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter">SENTINEL</h1>
          <p className="text-slate-400 font-medium">Physical Security Management System</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-2xl space-y-6">
          <div className="flex bg-slate-950 p-1 rounded-xl mb-2">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                name="email"
                placeholder="Work Email Address"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                name="password"
                placeholder="Access Password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black tracking-widest text-white shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'AUTHORIZE ACCESS' : 'CREATE ACCOUNT'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {isLogin && (
            <button className="w-full text-center text-xs text-slate-500 hover:text-blue-400 transition-colors font-medium">
              Forgot security credentials?
            </button>
          )}
        </div>

        <div className="text-center px-8">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest leading-relaxed">
            Authorized Personnel Only. All activities are logged and monitored in accordance with corporate security policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
