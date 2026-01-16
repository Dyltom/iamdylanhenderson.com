'use client';

import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import theme from '../ThemeRegistry/theme';
import { STATIC_CTA } from '../../utils/staticPageContent';

const ContactCTA: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ textAlign: 'center', paddingTop: isMobile ? 4 : 8 }}>
      <Typography variant="h6" color="primary.contrastText" gutterBottom>
        {STATIC_CTA.text}
      </Typography>
      <Button variant="outlined" color="secondary" href="/contact">
        {STATIC_CTA.buttonText}
      </Button>
      <Typography
        sx={{
          fontFamily: 'monospace',
          color: 'secondary.light',
          fontSize: '0.85rem',
          mt: 4,
          opacity: 0.6,
        }}
      >
        Pro tip: Press {isMobile ? 'Ctrl' : 'Cmd'}+K to open command palette
      </Typography>
    </Box>
  );
};

export default ContactCTA;
