'use client';

import { Box, Typography, useMediaQuery, Container } from '@mui/material';
import theme from '../ThemeRegistry/theme';
import GlitchText from '../GlitchText';
import InteractiveTerminal from './InteractiveTerminal';

const HeroSection: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        marginTop: isMobile ? 2 : 4,
        marginBottom: 4,
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
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
          <Typography
            variant="subtitle1"
            sx={{
              color: 'secondary.light',
              fontFamily: 'monospace',
              mt: 2
            }}
          >
            &gt; Senior Fullstack Developer | Problem Solver | Terminal Enthusiast
          </Typography>
        </Box>

        <InteractiveTerminal />
      </Container>
    </Box>
  );
};

export default HeroSection;
