"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable body scroll when loading
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const duration = 1500; // Total loading time in ms
    const intervalTime = 15;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(
        Math.round((step / steps) * 100),
        100
      );

      setProgress(currentProgress);

      if (step >= steps) {
        clearInterval(timer);
        // Delay hiding the loader slightly to let 100% state be visible
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = "unset";
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] 
            }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary select-none pointer-events-auto"
        >
          {/* Subtle Ambient Light Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

          {/* Logo & Content Container */}
          <div className="relative flex flex-col items-center space-y-8 z-10 px-6">
            
            {/* Animated Logo Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-24 h-24 flex items-center justify-center bg-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-accent/20 p-2"
            >
              <img
                src="/images/logo.png"
                alt="Graphene Interiors"
                className="w-full h-full object-contain pointer-events-none select-none"
              />
              
              {/* Spinner Border effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-accent/20 border-t-accent pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </motion.div>

            {/* Typography */}
            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-serif text-2xl md:text-3xl font-bold tracking-[0.25em] text-white"
              >
                GRAPHENE
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[9px] md:text-xs font-sans tracking-[0.4em] text-accent uppercase font-medium"
              >
                Bespoke Carpentry & Joinery
              </motion.p>
            </div>

            {/* Interactive Progress Indicators */}
            <div className="w-48 md:w-56 space-y-3 pt-4">
              {/* Loading Bar Track */}
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>

              {/* Progress Numbers */}
              <div className="flex justify-between items-center text-[10px] tracking-widest text-white/50 font-light font-sans">
                <span className="uppercase">Loading</span>
                <span className="font-semibold text-accent">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
