"use client";

import { LiquidBackground } from "@/components/ui/LiquidBackground";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed inset-0 z-[-1]">
        <LiquidBackground />
      </div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
