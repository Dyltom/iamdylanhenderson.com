'use client';

import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import FeaturedBlogPosts from '../components/Blog/FeaturedBlogPosts';
import ContactCTA from '../components/Contact/cta';
import HeroSection from '../components/HeroSection';

import { STATIC_BLOG_POSTS } from '../utils/staticBlogPosts';

export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeroSection />
      <FeaturedBlogPosts blogPosts={STATIC_BLOG_POSTS} />
      <ContactCTA />
    </Box>
  );
}
