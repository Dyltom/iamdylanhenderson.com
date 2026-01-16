'use client';

import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import FeaturedBlogPosts from '../components/Blog/FeaturedBlogPosts';
import ContactCTA from '../components/Contact/cta';
import HeroSection from '../components/HeroSection';
import CommandPalette from '../components/CommandPalette';

import { STATIC_BLOG_POSTS } from '../utils/staticBlogPosts';

export default function HomePage() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <CommandPalette
        open={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />
      <HeroSection />
      <FeaturedBlogPosts blogPosts={STATIC_BLOG_POSTS} />
      <ContactCTA />
    </Box>
  );
}
