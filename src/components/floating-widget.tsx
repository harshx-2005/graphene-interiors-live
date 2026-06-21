"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FreeQuoteForm } from "./lead-forms";

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Global event listener to open quote modal from any page button
  useEffect(() => {
    const handleOpenQuote = () => setIsQuoteOpen(true);
    window.addEventListener("open-quote-modal", handleOpenQuote);
    return () => window.removeEventListener("open-quote-modal", handleOpenQuote);
  }, []);

  return (
    <>
      {/* Floating CTA Buttons Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 pointer-events-none">
        
        {/* Expanded Info Widget */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto bg-primary border border-accent/30 rounded-2xl shadow-2xl p-5 w-80 text-secondary glass-panel-dark"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-serif text-lg font-semibold text-accent">Graphene Interiors</h4>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                Transform your home with Leicester's premium joinery & renovations experts. Contact us directly or get a quote online.
              </p>
              <div className="space-y-2.5">
                <a
                  href="tel:+447775099710"
                  className="flex items-center space-x-3 bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-lg text-sm transition-colors text-white"
                >
                  <i className="fa-solid fa-phone text-accent"></i>
                  <span>Call: +44 7775 099710</span>
                </a>
                <a
                  href="https://wa.me/447775099710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 px-4 py-2.5 rounded-lg text-sm transition-colors text-white border border-[#25D366]/20"
                >
                  <i className="fa-brands fa-whatsapp text-lg text-[#25D366]"></i>
                  <span>WhatsApp Chat</span>
                </a>
                <button
                  onClick={() => {
                    setIsQuoteOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-accent hover:bg-accent-hover text-primary font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  <i className="fa-regular fa-file-lines"></i>
                  <span>Request Free Quote</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Triggers */}
        <div className="flex flex-col space-y-3 pointer-events-auto items-end">
          {/* Quick Call Button */}
          <a
            href="tel:+447775099710"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary border border-accent/30 text-accent hover:bg-accent hover:text-primary transition-all shadow-xl hover:scale-110 cursor-pointer animate-none"
            title="Call Graphene Interiors"
          >
            <i className="fa-solid fa-phone text-lg"></i>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/447775099710"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all shadow-xl hover:scale-110 cursor-pointer"
            title="Chat on WhatsApp"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
            <i className="fa-brands fa-whatsapp text-2xl relative z-10"></i>
          </a>

          {/* Quick Widget Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-primary hover:bg-accent-hover transition-all shadow-2xl hover:scale-105 cursor-pointer border border-accent/20"
            title="Contact & Quote Menu"
          >
            {isOpen ? <i className="fa-solid fa-xmark text-xl"></i> : <i className="fa-regular fa-file-lines text-xl"></i>}
          </button>
        </div>
      </div>

      {/* Global Quote Request Modal */}
      <AnimatePresence>
        {isQuoteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteOpen(false)}
              className="absolute inset-0 bg-primary/70 backdrop-blur-md"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] z-10 border border-gray-100"
            >
              <button
                onClick={() => setIsQuoteOpen(false)}
                className="absolute top-6 right-6 text-text-charcoal/55 hover:text-primary transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>

              <div className="mb-6 pr-8">
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-primary">Request a Free Quote</h3>
                <p className="text-sm text-text-charcoal mt-1">
                  Share details about your custom interior project. We'll design a personalized estimate.
                </p>
              </div>

              <FreeQuoteForm onSuccess={() => setIsQuoteOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// Simple client-side helper to open the quote modal
export function openQuoteModal() {
  const event = new CustomEvent("open-quote-modal");
  window.dispatchEvent(event);
}
