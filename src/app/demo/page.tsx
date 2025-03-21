'use client';

import dynamic from 'next/dynamic';

// Dynamically import the BeamsBackground component to prevent build issues
const BeamsBackground = dynamic(
  () => import('@/components/ui/beams-background').then(mod => mod.BeamsBackground),
  { ssr: false } // Disable SSR for this component
);

export default function DemoPage() {
    return (
        <BeamsBackground intensity="strong">
            {/* You can add your content here */}
        </BeamsBackground>
    );
} 