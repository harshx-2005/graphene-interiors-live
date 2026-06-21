"use client";

import React, { useState } from "react";
import ImageProtected from "./image-protected";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before Transformation",
  afterAlt = "After Luxury Renovation",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className={`relative w-full aspect-[4/3] md:aspect-video overflow-hidden rounded-2xl border border-accent/20 shadow-2xl ${className}`}>
      {/* Before Image (left side) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <ImageProtected
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-6 left-6 bg-primary/95 text-secondary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/10 shadow-lg z-20">
          Before
        </div>
      </div>

      {/* After Image (right side) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
      >
        <ImageProtected
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-6 right-6 bg-accent text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-accent/20 shadow-lg z-20">
          Luxury After
        </div>
      </div>

      {/* Slider Split Divider Line and Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize select-none pointer-events-none z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Glowing handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary border-2 border-accent text-accent rounded-full shadow-2xl flex items-center justify-center select-none transition-transform hover:scale-110">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"/>
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </div>
      </div>

      {/* Hidden input overlay that handles mouse and touch drag events */}
      <input 
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 select-none"
        aria-label="Before and after image comparison slider"
      />
    </div>
  );
}
