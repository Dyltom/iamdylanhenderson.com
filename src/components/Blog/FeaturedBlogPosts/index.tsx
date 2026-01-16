'use client';

import { useState } from 'react';
import { Box, Container, Typography, useMediaQuery, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TerminalIcon from '@mui/icons-material/Terminal';
import { Article } from '../../../utils/types';
import TerminalBlogCard from '../TerminalBlogCard';

type FeaturedBlogPostsType = {
  blogPosts: Article[];
};

const FeaturedBlogPosts: React.FC<FeaturedBlogPostsType> = ({ blogPosts }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  if (blogPosts.length === 0) {
    return null;
  }

  // Show fewer posts for better spacing
  const postsToShow = isMobile ? 2 : isTablet ? 3 : 4;
  const displayPosts = blogPosts.slice(0, postsToShow);

  return (
    <Box
      sx={{
        py: isMobile ? 4 : 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}40, transparent)`,
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TerminalIcon sx={{ color: theme.palette.secondary.main }} />
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: 'monospace',
              }}
            >
              ~/recent_posts
            </Typography>
          </Box>
          <Button
            onClick={() => router.push('/blog')}
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: theme.palette.secondary.main,
              fontFamily: 'monospace',
              '&:hover': {
                backgroundColor: `${theme.palette.secondary.main}10`,
              },
            }}
          >
            view all
          </Button>
        </Box>

        {/* Posts Grid */}
        <Grid container spacing={isMobile ? 2 : 3}>
          {displayPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={post.id || index}>
              <Box
                sx={{
                  height: '100%',
                  opacity: 0,
                  animation: 'fadeInUp 0.6s forwards',
                  animationDelay: `${index * 0.1}s`,
                  '@keyframes fadeInUp': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(20px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <TerminalBlogCard post={post} index={index} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Terminal-style status line */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: theme.palette.primary.contrastText,
              opacity: 0.6,
            }}
          >
            [{displayPosts.length} of {blogPosts.length} posts loaded]
          </Typography>
          <Box
            sx={{
              width: '8px',
              height: '8px',
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '50%',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  opacity: 1,
                  transform: 'scale(1)',
                },
                '50%': {
                  opacity: 0.5,
                  transform: 'scale(0.8)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'scale(1)',
                },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedBlogPosts;