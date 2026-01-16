'use client';

import React, { useState, useEffect } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

interface GlitchTextProps extends TypographyProps {
  text: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
  glitchOnHover?: boolean;
}

const glitchAnimation1 = keyframes`
  0%, 100% {
    text-shadow:
      0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  14% {
    text-shadow:
      0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  15% {
    text-shadow:
      -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% {
    text-shadow:
      -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% {
    text-shadow:
      0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75),
      0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% {
    text-shadow:
      0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75),
      0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
`;

const glitchAnimation2 = keyframes`
  0%, 100% {
    text-shadow:
      0 0 0 transparent,
      0 0 0 transparent,
      0 0 0 transparent;
  }
  14% {
    text-shadow:
      0 0 0 transparent,
      0 0 0 transparent,
      0 0 0 transparent;
  }
  15% {
    text-shadow:
      -0.2em 0 0 #32CD32,
      0.2em 0 0 #ff00de,
      0 0 0 transparent;
  }
  49% {
    text-shadow:
      -0.2em 0 0 #32CD32,
      0.2em 0 0 #ff00de,
      0 0 0 transparent;
  }
  50% {
    text-shadow:
      0.2em 0 0 #32CD32,
      -0.2em 0 0 #00ffff,
      0 0 0 transparent;
  }
  99% {
    text-shadow:
      0.2em 0 0 #32CD32,
      -0.2em 0 0 #00ffff,
      0 0 0 transparent;
  }
`;

const StyledGlitchText = styled(Typography, {
  shouldForwardProp: (prop) => !['glitchIntensity', 'glitchOnHover', 'isGlitching'].includes(prop as string),
})<{ glitchIntensity: string; glitchOnHover: boolean; isGlitching: boolean }>(
  ({ theme, glitchIntensity, glitchOnHover, isGlitching }) => {
    const animationDuration = glitchIntensity === 'high' ? '0.5s' : glitchIntensity === 'medium' ? '1s' : '2s';

    return {
      position: 'relative',
      display: 'inline-block',
      fontFamily: '"Fira Code", monospace',
      animation: isGlitching && !glitchOnHover ? `${glitchAnimation1} ${animationDuration} infinite` : 'none',
      '&:hover': glitchOnHover ? {
        animation: `${glitchAnimation1} 0.3s infinite`,
      } : {},
      '&::before, &::after': {
        content: 'attr(data-text)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: theme.palette.background.default,
      },
      '&::before': {
        animation: isGlitching && !glitchOnHover ? `${glitchAnimation2} ${animationDuration} infinite` : 'none',
        color: theme.palette.primary.main,
        zIndex: -1,
        '&:hover': glitchOnHover ? {
          animation: `${glitchAnimation2} 0.3s infinite`,
        } : {},
      },
      '&::after': {
        animation: isGlitching && !glitchOnHover ? `${glitchAnimation2} ${animationDuration} infinite reverse` : 'none',
        color: '#ff00de',
        zIndex: -2,
        '&:hover': glitchOnHover ? {
          animation: `${glitchAnimation2} 0.3s infinite reverse`,
        } : {},
      },
    };
  }
);

export default function GlitchText({
  text,
  glitchIntensity = 'medium',
  glitchOnHover = false,
  ...props
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(!glitchOnHover);

  useEffect(() => {
    if (glitchOnHover) return;

    // Random glitch effect
    if (glitchIntensity === 'high') {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
      }, 3000 + Math.random() * 2000);

      return () => clearInterval(interval);
    } else if (glitchIntensity === 'medium') {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }, 5000 + Math.random() * 3000);

      return () => clearInterval(interval);
    }
  }, [glitchIntensity, glitchOnHover]);

  return (
    <StyledGlitchText
      data-text={text}
      glitchIntensity={glitchIntensity}
      glitchOnHover={glitchOnHover}
      isGlitching={isGlitching}
      {...props}
    >
      {text}
    </StyledGlitchText>
  );
}