import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { underLineHeaders } from '../../utils/styles';
import { Testimonial } from '../../utils/types';

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
          <Box
            key={index}
            sx={{
              padding: theme.spacing(2),
              borderLeft: `2px solid ${theme.palette.secondary.main}`,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontFamily: 'monospace',
            }}
          >
            <Typography
              variant="body1"
              sx={{ mb: 1, color: theme.palette.secondary.light }}
            >
              "{testimonial.attributes.quote}"
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {testimonial.attributes.author}
            </Typography>
            <Typography variant="caption">
              {testimonial.attributes.role}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Testimonials;