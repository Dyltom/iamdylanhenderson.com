'use client';

import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip, Stack } from '@mui/material';
import { Grain, BlurOn, GridView, Tv } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import ParticleBackground from '../Particles';
import MatrixRain from '../MatrixRain';
import CRTEffect from '../CRTEffect';

type BackgroundEffect = 'particles' | 'matrix' | 'none';

export default function BackgroundEffects() {
  const theme = useTheme();

  // Initialize from localStorage to avoid flashing
  const [currentEffect, setCurrentEffect] = useState<BackgroundEffect>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('backgroundEffect');
      // Validate that saved value is one of the allowed effects
      if (saved === 'particles' || saved === 'matrix' || saved === 'none') {
        return saved;
      }
    }
    return 'particles';
  });

  const [crtEnabled, setCrtEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crtEffect');
      return saved === 'true';
    }
    return false;
  });

  // Sync with localStorage on mount
  useEffect(() => {
    const syncFromStorage = () => {
      const savedEffect = localStorage.getItem('backgroundEffect');
      if (savedEffect === 'particles' || savedEffect === 'matrix' || savedEffect === 'none') {
        setCurrentEffect(savedEffect);
      }

      const savedCrt = localStorage.getItem('crtEffect');
      setCrtEnabled(savedCrt === 'true');
    };

    // Sync on mount
    syncFromStorage();

    // Listen for storage events from other tabs
    window.addEventListener('storage', syncFromStorage);

    return () => {
      window.removeEventListener('storage', syncFromStorage);
    };
  }, []);

  const handleToggle = () => {
    setCurrentEffect((prevEffect) => {
      const effects: BackgroundEffect[] = ['particles', 'matrix', 'none'];
      const currentIndex = effects.indexOf(prevEffect);
      const nextEffect = effects[(currentIndex + 1) % effects.length];

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('backgroundEffect', nextEffect);
      }

      return nextEffect;
    });
  };

  const toggleCRT = () => {
    setCrtEnabled((prevValue) => {
      const newValue = !prevValue;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('crtEffect', String(newValue));
      }

      return newValue;
    });
  };

  const getIcon = () => {
    switch (currentEffect) {
      case 'particles':
        return <BlurOn />;
      case 'matrix':
        return <GridView />;
      default:
        return <Grain />;
    }
  };

  const getTooltip = () => {
    switch (currentEffect) {
      case 'particles':
        return 'Switch to Matrix Rain';
      case 'matrix':
        return 'Disable Background Effects';
      default:
        return 'Enable Particle Effects';
    }
  };

  return (
    <>
      {/* Background Effects */}
      {currentEffect === 'particles' && <ParticleBackground key="particles" />}
      {currentEffect === 'matrix' && <MatrixRain key="matrix" />}
      <CRTEffect active={crtEnabled} key={`crt-${crtEnabled}`} />

      {/* Toggle Buttons */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Stack direction="column" spacing={1}>
          {/* CRT Effect Toggle */}
          <Tooltip title={crtEnabled ? 'Disable CRT Effect' : 'Enable CRT Effect'} arrow placement="left">
            <IconButton
              onClick={toggleCRT}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: crtEnabled ? '#ff5f56' : theme.palette.secondary.main,
                border: `1px solid ${crtEnabled ? '#ff5f56' : theme.palette.secondary.main}`,
                '&:hover': {
                  backgroundColor: crtEnabled ? 'rgba(255, 95, 86, 0.1)' : 'rgba(50, 205, 50, 0.1)',
                  boxShadow: `0 0 10px ${crtEnabled ? '#ff5f56' : theme.palette.secondary.main}`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Tv />
            </IconButton>
          </Tooltip>

          {/* Background Effect Toggle */}
          <Tooltip title={getTooltip()} arrow placement="left">
            <IconButton
              onClick={handleToggle}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: currentEffect === 'none' ? theme.palette.primary.contrastText : theme.palette.secondary.main,
                border: `1px solid ${currentEffect === 'none' ? theme.palette.primary.contrastText : theme.palette.secondary.main}`,
                opacity: currentEffect === 'none' ? 0.5 : 1,
                '&:hover': {
                  backgroundColor: 'rgba(50, 205, 50, 0.1)',
                  boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
                  opacity: 1,
                },
                transition: 'all 0.3s ease',
              }}
            >
              {getIcon()}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </>
  );
}