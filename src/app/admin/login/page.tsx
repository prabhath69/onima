"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to admin dashboard
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050508] relative overflow-hidden">
      {/* Background glowing spheres */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-indigo-500/20 glow-sphere" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-cyan-500/15 glow-sphere" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-3">
            <span className="font-['Outfit'] font-bold text-2xl tracking-wider text-white">
              ONIMA
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <p className="text-zinc-400 text-sm font-light">
            Authorized Personnel Only
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/[0.06] shadow-2xl relative z-10">
          <h2 className="text-xl font-bold text-zinc-100 font-outfit mb-6 text-center">
            Access Portal
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-zinc-100 placeholder-zinc-600 text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl text-xs"
              >
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center text-zinc-950 shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            &larr; Return to main site
          </a>
        </div>
      </motion.div>
    </div>
  );
}
