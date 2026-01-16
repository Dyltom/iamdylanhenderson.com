import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { underLineHeaders } from '../../utils/styles';
import { Testimonial } from '../../utils/types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

type TestimonialsProps = {
  title: string;
};

const Testimonials: React.FC<TestimonialsProps> = ({ title }) => {
  const theme = useTheme();
  const [testimonials, setTestimonials] = useState<Testimonial[] | undefined>(
    undefined
  );
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

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
      ref={ref}
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-out',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{
          ...underLineHeaders(theme),
          textAlign: 'center',
          mb: 4,
          color: theme.palette.secondary.contrastText
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: theme.spacing(4),
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {testimonials.map((testimonial, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              padding: theme.spacing(3),
              paddingLeft: theme.spacing(4),
              backgroundColor: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.light}`,
              borderLeft: `4px solid ${theme.palette.secondary.main}`,
              borderRadius: '4px',
              fontFamily: 'monospace',
              transition: 'all 0.3s ease',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: isVisible ? `${index * 0.2}s` : '0s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 4px 12px ${theme.palette.background.paper}`,
                borderLeftWidth: '6px',
              },
              '&::before': {
                content: '"\u201C"',
                position: 'absolute',
                top: '10px',
                left: '10px',
                fontSize: '3rem',
                color: theme.palette.secondary.dark,
                opacity: 0.3,
                fontFamily: 'serif',
              }
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: theme.palette.secondary.light,
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}
            >
              {testimonial.attributes.quote}
            </Typography>
            <Box sx={{ borderTop: `1px solid ${theme.palette.primary.light}`, pt: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.secondary.main,
                  mb: 0.5
                }}
              >
                — {testimonial.attributes.author}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.primary.contrastText,
                  opacity: 0.8
                }}
              >
                {testimonial.attributes.role}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Testimonials;