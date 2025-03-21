"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

// Avoiding unnecessary re-renders with optimized theme provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Use forcedTheme system to avoid initial flicker
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange={false}
      storageKey="letwebuild-theme"
    >
      {children}
    </NextThemesProvider>
  );
} 