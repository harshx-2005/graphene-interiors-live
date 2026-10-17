"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <main className={isAdmin ? "" : "min-h-screen pt-[73px] md:pt-[81px]"}>
      {children}
    </main>
  );
}
