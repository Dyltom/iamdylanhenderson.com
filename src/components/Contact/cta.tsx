'use client';

import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import theme from '../ThemeRegistry/theme';

const ContactCTA: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Static CTA content
  const cta = {
    text: "Ready to work together?",
    buttonText: "Get In Touch"
  };

  return (
    <Box sx={{ textAlign: 'center', paddingTop: isMobile ? 4 : 8 }}>
      <Typography variant="h6" color="primary.contrastText" gutterBottom>
        {cta.text}
      </Typography>
      <Button variant="outlined" color="secondary" href="/contact">
        {cta.buttonText}
      </Button>
    </Box>
  );
};

export default ContactCTA;
