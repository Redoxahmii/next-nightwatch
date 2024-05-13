// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <main className="relative gradient-purple">
          <div className="absolute inset-0 backdrop-brightness-50"></div>
          <div className="relative z-10">{children}</div>
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
