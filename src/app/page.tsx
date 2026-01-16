'use client';

import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import FeaturedBlogPosts from '../components/Blog/FeaturedBlogPosts';
import ContactCTA from '../components/Contact/cta';
import HeroSection from '../components/HeroSection';

import { getArticles } from '../fetchers/article';
import { Article } from '../utils/types';

export default function HomePage() {
  // Static blog post for now
  const staticPosts: Article[] = [
    {
      id: '1',
      title: 'From Setback to Success: My Career Transformation Story',
      content: [],
      shortDescription: 'How I turned a career setback into an opportunity for growth and landed my dream role in tech.',
      publishedAt: '2023-11-16T00:00:00.000Z',
      date: '2023-11-16T00:00:00.000Z',
      readTime: 3,
      views: 33,
      slug: 'from-setback-to-success-career-transformation',
      createdAt: new Date('2023-11-16'),
      updatedAt: new Date('2023-11-16'),
      categories: ['Career', 'Personal Growth']
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeroSection />
      <FeaturedBlogPosts blogPosts={staticPosts} />
      <ContactCTA />
    </Box>
  );
}
