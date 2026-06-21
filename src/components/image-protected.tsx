"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

interface ImageProtectedProps extends Omit<ImageProps, "onContextMenu" | "onDragStart"> {
  wrapperClassName?: string;
}

export default function ImageProtected({
  src,
  alt,
  className,
  wrapperClassName = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: ImageProtectedProps) {
  const isFill = !!props.fill;

  return (
    <div 
      className={`relative overflow-hidden select-none ${isFill ? "w-full h-full" : ""} ${wrapperClassName}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <Image
        src={src}
        alt={alt}
        className={`select-none pointer-events-none no-save-image ${className || ""}`}
        draggable={false}
        sizes={sizes}
        {...props}
      />
      {/* Invisible overlay that blocks right-click image-save and dragging */}
      <div 
        className="absolute inset-0 bg-transparent z-10 select-none pointer-events-auto"
        style={{ WebkitUserSelect: "none", userSelect: "none" }}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
