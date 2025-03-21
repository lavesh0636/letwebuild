"use client";
import React from "react";
import dynamic from 'next/dynamic';

// Dynamically import the WavyBackground component to prevent build issues
const WavyBackground = dynamic(
  () => import('@/components/ui/wavy-background').then(mod => mod.WavyBackground),
  { ssr: false } // Disable SSR for this component
);

export default function WavyPage() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Hero waves are cool
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Leverage the power of canvas to create a beautiful hero section
      </p>
    </WavyBackground>
  );
} 