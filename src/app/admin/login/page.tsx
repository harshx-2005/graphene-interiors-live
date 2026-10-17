"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, Sparkles } from "lucide-react";
import { loginAction } from "@/actions/auth";
import { useToast } from "@/components/providers";

export default function LoginPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      success("Welcome back! Redirecting...");
      router.push("/admin");
      router.refresh();
    } else if (state?.error) {
      error(state.error);
    }
  }, [state, router, success, error]);

  return (
    <div className="min-h-screen bg-[#070a13] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Login Card */}
      <div className="max-w-md w-full bg-[#0d1222] border border-white/5 shadow-2xl rounded-3xl p-8 z-10 relative backdrop-blur-md">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center p-2 mb-4 shadow-xl">
            <img src="/images/logo.png" alt="Graphene Interiors" className="object-contain" />
          </div>
          <span className="inline-flex items-center space-x-1.5 bg-[#748f6e]/10 border border-[#748f6e]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#92ab8d] mb-2 select-none">
            <Sparkles className="w-3 h-3" />
            <span>Secure CMS Access</span>
          </span>
          <h1 className="font-serif text-2xl font-bold text-white text-center">Graphene Admin</h1>
          <p className="text-gray-400 text-xs text-center mt-1">
            Sign in to manage your website content.
          </p>
        </div>

        {/* Login Form */}
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="admin@example.com"
                className="w-full bg-[#090c16] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-[#090c16] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-accent hover:bg-accent-hover disabled:bg-accent/50 text-[#070a13] font-bold text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center space-x-2.5 shadow-xl transition-all cursor-pointer hover:shadow-accent/5"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Help footer */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-[10px] text-gray-500">
          This system is protected by secure session cookies.
        </div>
      </div>
    </div>
  );
}
