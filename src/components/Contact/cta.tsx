'use client';

import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import theme from '../ThemeRegistry/theme';

const ContactCTA: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ textAlign: 'center', paddingTop: isMobile ? 4 : 8 }}>
      <Typography variant="h6" color="primary.contrastText" gutterBottom>
        Ready to work together?
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        component={Link}
        href="/contact"
      >
        Get In Touch
      </Button>
    </Box>
  );
};

export default ContactCTA;