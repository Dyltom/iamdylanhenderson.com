'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Lazy load the ParticleBackground component
const ParticleBackground = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => null, // No loading indicator to prevent flashing
});

export default function LazyParticles() {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Delay particle initialization to prioritize page content
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!showParticles) return null;

  return <ParticleBackground />;
}