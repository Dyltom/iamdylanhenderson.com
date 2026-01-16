'use client';

import { Box, Typography, useMediaQuery } from '@mui/material';
import theme from '../ThemeRegistry/theme';
import GlitchText from '../GlitchText';

const HeroSection: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Static content
  const staticContent = "I'm a Fullstack Developer with expertise in React, TypeScript, and building RESTful APIs using Node.js and Koa. This website pays tribute to one of my favorite university assignments — a retro-style terminal coded in C.\n\nWhen I'm not coding, you can find me walking, gaming, or attending PAX Aus, which I've been doing since the first PAX in 2013.";

  return (
    <Box
      sx={{
        marginTop: isMobile ? 2 : 4,
        color: 'primary.contrastText',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Hello, my name is
      </Typography>
      <GlitchText
        text="Dylan Henderson"
        variant="h3"
        align="center"
        color="secondary"
        gutterBottom
        glitchIntensity="medium"
        glitchOnHover
      />
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body1" paragraph>
          {staticContent.split('\n\n')[0]}
        </Typography>
        <Typography variant="body1" paragraph>
          {staticContent.split('\n\n')[1]}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
