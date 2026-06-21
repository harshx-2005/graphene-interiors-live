"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ConsultationForm } from "./lead-forms";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run if not already shown in current session
    const isShown = sessionStorage.getItem("exit_intent_shown");
    if (isShown === "true") return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves past the top of the screen (typically to close tab/change URL)
      if (e.clientY < 10) {
        setIsVisible(true);
        sessionStorage.setItem("exit_intent_shown", "true");
        // Remove listener after trigger
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="absolute inset-0 bg-primary/70 backdrop-blur-md"
          />

          {/* Premium Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-100 p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-6 right-6 text-text-charcoal/50 hover:text-primary transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Offer Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-3">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-primary">
                Wait! Before You Go...
              </h3>
              <p className="text-sm text-text-charcoal mt-1.5 max-w-sm mx-auto">
                Request a **Free 3D Design Consultation** for your new kitchen or bedroom transformation. No obligation.
              </p>
            </div>

            {/* Injected Form */}
            <ConsultationForm onSuccess={() => setIsVisible(false)} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
