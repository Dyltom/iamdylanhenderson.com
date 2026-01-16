'use client';

import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import theme from '../ThemeRegistry/theme';
import { STATIC_CTA } from '../../utils/staticPageContent';

const ContactCTA: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        textAlign: 'center',
        paddingTop: isMobile ? 4 : 8,
        position: 'relative',
      }}
    >
      {/* Terminal prompt */}
      <Typography
        sx={{
          fontFamily: 'monospace',
          color: 'secondary.main',
          fontSize: '0.875rem',
          mb: 2,
          opacity: 0.8,
        }}
      >
        dylan@portfolio:~$ echo "Let's work together!"
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: 'primary.contrastText',
          mb: 3,
          fontFamily: 'monospace',
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: showCursor ? '"_"' : '""',
            position: 'absolute',
            right: '-10px',
            color: 'secondary.main',
          },
        }}
      >
        {STATIC_CTA.text}
      </Typography>

      <Box>
        <Button
          variant="outlined"
          color="secondary"
          href="/contact"
          sx={{
            fontFamily: 'monospace',
            textTransform: 'none',
            borderStyle: 'dashed',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '"$ "',
              position: 'absolute',
              left: '16px',
              color: 'secondary.main',
            },
            '&:hover': {
              borderStyle: 'solid',
              bgcolor: 'rgba(0, 255, 0, 0.1)',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.2), transparent)',
                animation: 'sweep 0.5s forwards',
              },
            },
            '@keyframes sweep': {
              to: { left: '100%' },
            },
            pl: 4,
          }}
        >
          {STATIC_CTA.buttonText}
        </Button>
      </Box>

      {/* Command palette hint */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          mx: 'auto',
          maxWidth: '300px',
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          border: '1px dashed',
          borderColor: 'secondary.main',
          borderRadius: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'monospace',
            color: 'secondary.light',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              px: 1,
              py: 0.5,
              bgcolor: 'rgba(0, 255, 0, 0.2)',
              border: '1px solid',
              borderColor: 'secondary.main',
              borderRadius: '4px',
              fontSize: '0.7rem',
            }}
          >
            {isMobile ? 'Ctrl' : 'Cmd'}+K
          </Box>
          Command Palette
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactCTA;
