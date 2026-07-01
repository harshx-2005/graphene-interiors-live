"use client";

import React from "react";

interface VideoProtectedProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  wrapperClassName?: string;
}

export default function VideoProtected({
  src,
  className,
  wrapperClassName = "",
  ...props
}: VideoProtectedProps) {
  return (
    <div 
      className={`relative overflow-hidden select-none w-full h-full ${wrapperClassName}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <video
        src={src}
        className={`w-full h-full object-cover select-none pointer-events-none ${className || ""}`}
        autoPlay
        loop
        muted
        playsInline
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        {...props}
      />
      {/* Invisible overlay that blocks right-click context menu */}
      <div 
        className="absolute inset-0 bg-transparent z-10 select-none pointer-events-auto"
        style={{ WebkitUserSelect: "none", userSelect: "none" }}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
