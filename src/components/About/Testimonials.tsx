'use client';

import { Box, Typography, Paper } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import React, { useEffect, useState } from 'react';
import { underLineHeaders } from '../../utils/styles';
import { Testimonial } from '../../utils/types';

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(33, 150, 243, 0.05)',
  border: `1px solid ${theme.palette.secondary.main}20`,
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderColor: theme.palette.secondary.main,
    boxShadow: `0 12px 48px ${theme.palette.secondary.main}30`,
    '& .quote-icon': {
      transform: 'rotate(-15deg) scale(1.1)',
      opacity: 0.3,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, transparent)`,
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover::before': {
    transform: 'translateX(0)',
  },
}));

type TestimonialsProps = {
  title: string;
};

const Testimonials: React.FC<TestimonialsProps> = ({ title }) => {
  const theme = useTheme();
  const [testimonials, setTestimonials] = useState<Testimonial[] | undefined>(
    undefined
  );

  useEffect(() => {
    // Real testimonials from colleagues
    const staticTestimonials: Testimonial[] = [
      {
        attributes: {
          author: 'Alex Johnson',
          quote: 'Dylan\'s work on our Vue.js project was outstanding. He delivered high-quality code on time and exceeded our expectations.',
          role: 'CTO at Virtech'
        }
      },
      {
        attributes: {
          author: 'Marco Muscat',
          quote: 'As a full-stack expert, Dylan Henderson delivers end-to-end solutions with unmatched proficiency. From initial concept to final execution, his skills ensure seamless and efficient project completion.',
          role: 'Principal Engineer @ etika'
        }
      }
    ];
    setTestimonials(staticTestimonials);
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{
          ...underLineHeaders(theme),
          textAlign: 'center',
          mb: 4
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: theme.spacing(3),
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} elevation={0}>
            <Box sx={{ position: 'relative' }}>
              <FormatQuoteIcon
                className="quote-icon"
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: -10,
                  fontSize: 60,
                  color: theme.palette.secondary.main,
                  opacity: 0.2,
                  transform: 'rotate(-15deg)',
                  transition: 'all 0.3s ease',
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  fontFamily: 'monospace',
                  lineHeight: 1.8,
                  position: 'relative',
                  zIndex: 1,
                  fontStyle: 'italic',
                }}
              >
                {testimonial.attributes.quote}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.secondary.main,
                  fontFamily: 'monospace',
                }}
              >
                — {testimonial.attributes.author}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  fontFamily: 'monospace',
                }}
              >
                {testimonial.attributes.role}
              </Typography>
            </Box>
          </TestimonialCard>
        ))}
    </Box>
  );
};

export default Testimonials;
