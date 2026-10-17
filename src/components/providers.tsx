"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type ToastType = "success" | "error" | "loading";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => string;
  dismiss: (id: string) => void;
  success: (message: string) => string;
  error: (message: string) => string;
  loading: (message: string) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function Providers({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => {
      // Limit to 3 toasts at a time
      const filtered = prev.filter((t) => t.type !== "loading" || type === "loading");
      return [...filtered, { id, message, type }];
    });

    if (type !== "loading") {
      setTimeout(() => {
        dismiss(id);
      }, 4000);
    }

    return id;
  }, [dismiss]);

  const success = useCallback((message: string) => toast(message, "success"), [toast]);
  const error = useCallback((message: string) => toast(message, "error"), [toast]);
  const loading = useCallback((message: string) => toast(message, "loading"), [toast]);

  return (
    <ToastContext.Provider value={{ toast, dismiss, success, error, loading }}>
      {children}
      
      {/* Toast Render Overlay */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-2xl text-white font-sans text-sm font-medium tracking-wide pointer-events-auto border transition-all duration-300 transform translate-y-0 animate-slide-up ${
              t.type === "success"
                ? "bg-[#1f2e1c]/95 border-[#748f6e]/30 text-accent"
                : t.type === "error"
                ? "bg-[#2c1c1c]/95 border-red-900/30 text-red-400"
                : "bg-primary/95 border-accent/20 text-white"
            }`}
          >
            {t.type === "success" && <CheckCircle className="w-5 h-5 text-accent shrink-0" />}
            {t.type === "error" && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
            {t.type === "loading" && <Loader2 className="w-5 h-5 text-accent shrink-0 animate-spin" />}
            
            <span className="flex-grow">{t.message}</span>
            
            {t.type !== "loading" && (
              <button
                onClick={() => dismiss(t.id)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-xs font-bold font-sans ml-2 shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
