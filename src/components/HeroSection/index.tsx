'use client';

import { Box, Typography, useMediaQuery } from '@mui/material';
import { CV_DATA } from '../../utils/cvTypes';
import theme from '../ThemeRegistry/theme';
import GlitchText from '../GlitchText';

const HeroSection: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        marginTop: isMobile ? 2 : 4,
        color: 'primary.contrastText',
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
      <Typography variant="h6" align="center" sx={{ mt: 3, mb: 2 }}>
        {CV_DATA.experience[0].title} | {CV_DATA.personalInfo.location}
      </Typography>
      <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto', px: 2 }}>
        {CV_DATA.summary}
      </Typography>
    </Box>
  );
};

export default HeroSection;