import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import NextTopLoader from "nextjs-toploader";

// Use subsets to reduce font size
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Optimize font display
  preload: true,
});

export const metadata: Metadata = {
  title: "LetWeHire | The Modern Tech Hiring Platform",
  description: "Connect with top tech talent and leading companies for freelance, contract, and full-time roles.",
  keywords: [
    "tech hiring", "developer jobs", "designer jobs", 
    "remote work", "freelance platform", "tech recruitment"
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <NextTopLoader color="#3b82f6" showSpinner={false} />
            <Navbar />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
