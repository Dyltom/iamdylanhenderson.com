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
    // Static testimonials - we can add real ones later
    const staticTestimonials: Testimonial[] = [
      {
        attributes: {
          author: 'Colleague',
          quote: 'Dylan is a talented developer who brings creativity and technical expertise to every project.',
          role: 'Senior Developer'
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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: theme.spacing(2),
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={underLineHeaders(theme)}
      >
        {title}
      </Typography>
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
  );
};

export default Testimonials;
