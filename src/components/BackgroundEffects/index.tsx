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
  const [currentEffect, setCurrentEffect] = useState<BackgroundEffect>('particles');
  const [crtEnabled, setCrtEnabled] = useState(false);

  // Remember user preference
  useEffect(() => {
    const savedEffect = localStorage.getItem('backgroundEffect') as BackgroundEffect;
    if (savedEffect) setCurrentEffect(savedEffect);

    const savedCrt = localStorage.getItem('crtEffect');
    if (savedCrt !== null) setCrtEnabled(savedCrt === 'true');
  }, []);

  const handleToggle = () => {
    const effects: BackgroundEffect[] = ['particles', 'matrix', 'none'];
    const currentIndex = effects.indexOf(currentEffect);
    const nextEffect = effects[(currentIndex + 1) % effects.length];
    setCurrentEffect(nextEffect);
    localStorage.setItem('backgroundEffect', nextEffect);
  };

  const toggleCRT = () => {
    const newValue = !crtEnabled;
    setCrtEnabled(newValue);
    localStorage.setItem('crtEffect', String(newValue));
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
      {currentEffect === 'particles' && <ParticleBackground />}
      {currentEffect === 'matrix' && <MatrixRain />}
      <CRTEffect active={crtEnabled} />

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
                color: crtEnabled ? '#ff5f56' : theme.palette.primary.main,
                border: `1px solid ${crtEnabled ? '#ff5f56' : theme.palette.primary.main}`,
                '&:hover': {
                  backgroundColor: crtEnabled ? 'rgba(255, 95, 86, 0.1)' : 'rgba(50, 205, 50, 0.1)',
                  boxShadow: `0 0 10px ${crtEnabled ? '#ff5f56' : theme.palette.primary.main}`,
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
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  backgroundColor: 'rgba(50, 205, 50, 0.1)',
                  boxShadow: `0 0 10px ${theme.palette.primary.main}`,
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