"use client";

import { usePathname } from "next/navigation";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // PDP routes have a 4-part structure, e.g. /products/whole-spices/red-chilli
  // Category routes have 3: /products/whole-spices
  // Base route has 2: /products
  const isPDP = pathname.split('/').filter(Boolean).length >= 3;

  return (
    <div className="relative w-full min-h-screen">
      {!isPDP && (
        <div className="fixed inset-0 z-[-1]">
          <LiquidBackground />
        </div>
      )}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
